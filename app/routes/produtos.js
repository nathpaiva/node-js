function produtos(app) {

  var listaDeLivros = function(req, res) {
    // express load libera dessa forma as coisas que são carregadas nele
    var connection = app.infra.connectionFactory();
    var produtosDAO = new app.infra.ProdutosDAO(connection);

    produtosDAO.lista(function(err, results) {

      res.format({
        html: function() {
          // res.send(results);
          res.render('produtos/lista', {
            lista: results
          });
        },
        json: function() {
          // console.log('OI.... ');
          res.json(results);
        },
      });

    });

    connection.end();
  };

  app.get('/produtos', listaDeLivros);

  app.get('/produtos/add', function(req, res) {
    res.render('produtos/form', {
      validationError: {},
      produto: {},
    });
  });

  app.post('/produtos', function(req, res) {

    var produto = req.body;

    req.assert('titulo', 'O título deve ser preenchido').notEmpty();
    req.assert('preco', 'Formato inválido').isFloat();

    var errors = req.validationErrors();
    if (errors) {

      res.format({
        html: function() {
          res.status(400).render('produtos/form', {
            validationError: errors,
            produto: produto,
          });
        },
        json: function() {
          res.status(400).json(errors);
        },
      });

      return;
    }

    var connection = app.infra.connectionFactory();
    var produtosDAO = new app.infra.ProdutosDAO(connection);
    produtosDAO.save(produto, function(err, resust) {
      res.redirect('/produtos');
    });

    connection.end();
  });

  return app;
}

module.exports = produtos;
