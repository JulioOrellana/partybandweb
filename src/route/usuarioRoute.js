'use strict'

let express = require('express');
let usuarioRouter = express.Router();

let db = require('../../config');




usuarioRouter.route('/').get(function(req, res, next) {
    let dataL = db.many('select u.codus, u.nombre, u.activo, tipo.tipousuario from tipousuario tipo,usuario u,clientelocatario l where u.codus=tipo.codus AND u.codus=l.codus')
        .then(function(dataL) {
            db.many('select u.codus,u.activo, u.nombre, p.numero, p.pin from tipousuario tipo, usuario u, clientepulsera cp, pulsera p where u.codus=tipo.codus AND u.codus=cp.codus AND p.codcp=cp.codcp order by 1;')
                .then(function(dataP) {

                    res.render('index', {
                        usuarios_activo: true,
                        dataL: dataL,
                        dataP: dataP
                    });

                })
        });
    /*res.render('index', {
        activo: true,
        dataL : dataL,
        dataP : dataP
    });*/
});
usuarioRouter.route('/modificarUsuario').post(function(req, res, next) {
    console.log('Entra aquí al menos esta wea?'+req.body.id);
    db.none('update usuario set nombre=$1, contraseña=$2, edad=$3, alias=$4 , correo=$5, fecharegistro=$6, telefono=$7, activo=$8 where codus=$9', [req.body.nombre,
            req.body.contraseña,
            req.body.edad,
            req.body.alias,
            req.body.correo,
            req.body.fecharegistro,
            req.body.telefono,
            req.body.activo,
            req.body.codus
        ])
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Usuario Modificado'
                });
        })
        .catch(function(err) {
            return next(err);
        });
});
usuarioRouter.route('/eliminarUsuario/:id').get(function(req, res, next) {
    db.none('update usuario set activo=$1 where codus=$2', [
            false,
            parseInt(req.params.id)
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
usuarioRouter.route('/buscar/:id').get(function(req, res, next) {

    var usuarioID = parseInt(req.params.id);
    db.one('select * from usuario where codus = $1', usuarioID)
        .then(function(data) {
            res.render('modificarUsuario', {
                data: data
            })
        })

    .catch(function(err) {
        return next(err);
    });

});

usuarioRouter.route('/buscarPorPulsera').post(function(req, res, next) {

    var usuarioID = req.body.buscarPulsera;
    db.one('select u.codus,u.nombre,u.contraseña,u.edad,u.alias,u.correo,u.fecharegistro,u.telefono,u.activo,p.numero, s.saldoactual from usuario u, clientepulsera cp, pulsera p, saldo s where u.codus=cp.codus AND p.codcp=cp.codcp AND s.codcp=cp.codcp AND p.numero=$1 ; ', usuarioID)
        .then(function(data) {
            res.render('modificarUsuario', {
                data: data
            })
        })

    .catch(function(err) {
        return next(err);
    });

});


usuarioRouter.route('/agregar/usuarioL').post(function(req, res) {

});




module.exports = usuarioRouter;
