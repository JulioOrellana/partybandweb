'use strict'

let express = require('express');
let locatarioRouter = express.Router();

let db = require('../../config');
let routes = function(){

      locatarioRouter.route('/').get(function(req,res,next){
        res.setHeader('Content-Type', 'application/json');
        res.json({"Title":"Raiz para /Locatarios"});
      });
      locatarioRouter.route('/signin').get(function(req,res,next){

      });
      locatarioRouter.route('/signout').get(function(req,res,next){

      });
      locatarioRouter.route('/buscar/:id').get(function(req,res){

      });
      locatarioRouter.route('/agregar/usuarioL').post(function(req,res){

      });

      return locatarioRouter;
}


module.exports = routes;
