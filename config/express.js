var express = require('express');
var load = require('express-load');

var bodyParser = require('body-parser');

function config() {

  var app = express();

  // criar variaveis para o express, para passar para o sistema
  app.set('view engine','ejs');
  app.set('views','./app/views');

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  load('routes', {cwd: 'app'})
    .then('infra')
    .into(app);

  return app;
}


module.exports = config;
