'use strict'

let express = require('express');
let app = express();
const bodyParser  = require('body-parser');



let usuarioRouter = require('./src/route/usuarioClienteRoute');
let locatarioRouter = require('./src/route/usuarioLocatarioRoute');

app.set('json spaces 40');
app.get('/', function (req, res) {
      res.json({"Titulo":"Página principal"});
});

app.use(bodyParser.urlencoded({extended: true}));
app.use('/UsuarioP',usuarioRouter);
app.use('/UsuarioL',locatarioRouter);


let port = process.env.PORT || 3000;


app.listen(port, function (err) {

});
