'use strict'

let express = require('express');
let app = express();
const bodyParser  = require('body-parser');



let usuarioRouter = require('./src/route/usuarioClienteRoute');
let locatarioRouter = require('./src/route/usuarioLocatarioRoute');
let localRouter = require('./src/route/localRoute');

app.set('json spaces 40');
app.get('/', function (req, res) {
      res.json({"Titulo":"Página principal"});
});

app.use(bodyParser.urlencoded({extended: true}));
app.use('/UsuarioP',usuarioRouter);
app.use('/UsuarioL',locatarioRouter);
app.use('/Local',localRouter);


let port = process.env.PORT || 3000;


app.listen(port, function (err) {

});
