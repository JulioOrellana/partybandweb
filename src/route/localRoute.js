'use strict'

let express = require('express');
let localRouter = express.Router();
let db = require('../../config');

localRouter.route('/').get(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.json({
        "Title": "Raiz para /UsuariosP"
    });
});
localRouter.route('/signin').get(function(req, res, next) {
    let dato = prompt("Acerque su pulsera:","asd");
    alert(dato);
});
localRouter.route('/signout').get(function(req, res, next) {

});
localRouter.route('/buscarUsuario/:numPulsera').get(function(req, res, next) {

    db.one('select 	u.nombre,s.saldoactual from pulsera p,	clientepulsera cp,	usuario u,	saldo s	where p.numero = $1 AND p.codcp=cp.codcp AND u.codus=cp.codus AND cp.codcp=s.codcp;', req.params.numPulsera)
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Recuperado 1 usuario por la pulsera número:' + req.params.numPulsera + ", nombre " + data.nombre
                });
        })
        .catch(function(err) {
            console.log("Error al intentar recuperar datos para el usuario pulsera número " + req.params.numPulsera);
            return next(err);
        });
});


module.exports = localRouter;
