'use strict'

let express = require('express');
let localRouter = express.Router();
let db = require('../../config');
let prodCon = require('../controller/productosController');

localRouter.route('/').get(function(req, res, next) {

    res.render('productos', {
        title: "Productos"
    });

});
localRouter.route('/signin').get(function(req, res, next) {

});
localRouter.route('/signout').get(function(req, res, next) {

});
localRouter.route('/buscarUsuario/:numPulsera').get(function(req, res, next) {

    db.one('select 	u.nombre, s.saldoactual from pulsera p,	clientepulsera cp,	usuario u,	saldo s	where p.numero = $1 AND p.codcp=cp.codcp AND u.codus=cp.codus AND cp.codcp=s.codcp;', req.params.numPulsera)
        .then(function(data) {
          let arrdata = [data.nombre,data.saldoactual];

          console.log(arrdata[0]+" "+arrdata[1])

            res.render('productos', {
                title: "Productos",
                data: arrdata
            })
        })
        .catch(function(err) {
            console.log("Error al intentar recuperar datos para el usuario pulsera número " + req.params.numPulsera);
            return next(err);
        });
});


localRouter.route('/productos/comprar').put(function(req, res, next) {

    db.none('update saldo set activo=$1 where codus=$2', [
        false,
        req.body.id
    ])
    .then(function() {
        res.status(200)
            .json({
                status: 'success',
                message: 'Usuario Eliminado'
            });
    })
    .catch(function(err) {
        return next(err);
    });

});


module.exports = localRouter;
