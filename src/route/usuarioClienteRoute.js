'use strict'

let express = require('express');
let usuarioRouter = express.Router();
let db = require('../../config');

usuarioRouter.route('/').get(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.json({
        "Title": "Raiz para /UsuariosP"
    });
});
usuarioRouter.route('/signin').get(function(req, res, next) {

});
usuarioRouter.route('/signout').get(function(req, res, next) {

});
usuarioRouter.route('/:id').get(function(req, res) {
    var usuarioID = parseInt(req.params.id);
    db.one('select * from usuario where codus = $1', usuarioID)
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Recuperado 1 usuario'
                });
        })
        .catch(function(err) {
            return next(err);
        });
});
usuarioRouter.route('/agregar/usuarioP').post(function(req, res, next) {



    db.none("insert into usuario (nombre,contraseña,edad,alias,correo,fecharegistro,telefono,activo) values($1,$2,$3,$4,$5,$6,$7,$8)", [
            req.body.nombre,
            req.body.contrasena,
            parseInt(req.body.edad),
            req.body.alias,
            req.body.correo,
            new Date(),
            req.body.telefono,
            true
        ])
        .then(function() {
            console.log("inserción correcta");
            res.status(200)
                .json({
                    "status": "Insertado",
                    "mensaje": "Usuario Insertado correctamente"
                });
        })
        .catch(function(error) {
            console.log("Error al insertar:" + error);
        });

});

usuarioRouter.route('/eliminar/usuarioP/:id').delete(function(req, res, next) {

    var usuarioID = parseInt(req.params.id);
    db.result('delete from usuario where codus = $1', usuarioID)
        .then(function(result) {
            /* jshint ignore:start */
            res.status(200)
                .json({
                    status: 'success',
                    message: `Removed ${result.rowCount} usuario`
                });
            /* jshint ignore:end */
        })
        .catch(function(err) {
            return next(err);
        });

});



module.exports = usuarioRouter;
