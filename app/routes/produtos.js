function produtos(app) {

  var listaDeLivros = function(req, res) {
    // express load libera dessa forma as coisas que são carregadas nele
    var connection = app.infra.connectionFactory();
    var produtosDAO = new app.infra.ProdutosDAO(connection);

    produtosDAO.lista(function(err, results) {

      res.format({
        html: function() {
          // res.send(results);
          res.render('produtos/lista',{lista: results});
        },
        json: function() {
          res.json(results);
        }
      });

    });

    connection.end();
  };

  app.get('/produtos', listaDeLivros);

  app.get('/produtos/add', function(req, res) {

    res.render('produtos/form');
  });

  app.post('/produtos', function(req, res) {

    var produto = req.body;
    console.log('produto', produto);

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
