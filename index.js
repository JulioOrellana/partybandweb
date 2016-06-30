'use strict'

let express = require('express');
let app = express();
const bodyParser  = require('body-parser');


let usuarioRouter = require('./src/route/usuarioRoute');
let usuarioClienteRouter = require('./src/route/usuarioClienteRoute');
let locatarioRouter = require('./src/route/usuarioLocatarioRoute');
let localRouter = require('./src/route/localRoute');



app.set('views', './src/views');
app.set('view engine', 'jade');
app.set('json spaces 40');



app.get('/', function (req, res) {
      res.render('index',{
        usuarios_activo:false,
        dataP : {nombre : 'ad', codus:1, tipousuario: 'ads', activo:false},
        dataL : {nombre : 'asd', codus:1, numero: 'asd', activo:false}

      });
});



app.use(bodyParser.urlencoded({extended: true}));
app.use('/Usuarios',usuarioRouter);
app.use('/UsuarioP',usuarioClienteRouter);
app.use('/UsuarioL',locatarioRouter);
app.use('/Local',localRouter);


let port = process.env.PORT || 3000;


app.listen(port, function (err) {

});
