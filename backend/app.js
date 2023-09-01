var express = require('express');
var consign = require('consign');

var app = express();

consign()
    .include('src/routes')
    .then('src/repositories')
    .then('src/controllers')
    .into(app);

app.listen(3000, function(){
    console.log('APP rodando na porta 3000');
});