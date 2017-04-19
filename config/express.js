var express = require('express');
var load = require('express-load');

var bodyParser = require('body-parser');
var validator = require('express-validator');

function config() {

  var app = express();

  // criar variaveis para o express, para passar para o sistema
  app.set('view engine', 'ejs');
  app.set('views', './app/views');

  app.use(express.static('./app/public'));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(validator());

  load('routes', {
      cwd: 'app'
    })
    .then('infra')
    .into(app);

  app.use(function(req, res, next) {
    res.status(404).render('error/404');
    next();
  });

  app.use(function(error, req, res, next) {
    console.log('process.env.NODE_ENV', process.env.NODE_ENV);
    if (process.env.NODE_ENV == 'production') {
      res.status(500).render('error/500');
      return;
    }
    next(error);
  });

  return app;
}

module.exports = config;
