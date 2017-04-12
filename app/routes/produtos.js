function produtos(app) {
  app.get('/produtos', function(req, res) {
    // express load libera dessa forma as coisas que são carregadas nele
    var connection = app.infra.connectionFactory();
    var produtosDAO = new app.infra.ProdutosDAO(connection);

    produtosDAO.lista(function(err, results) {
      // res.send(results);
      var result = {
        lista: results
      };
      res.render('produtos/lista',result);
    });

    connection.end();
  });

  app.get('/produtos/add', function(req, res) {

    res.render('produtos/form');
  });

  app.post('/produtos/add', function(req, res) {

    var produto = req.body;
    console.log('produto', produto);

    var connection = app.infra.connectionFactory();
    var produtosDAO = new app.infra.ProdutosDAO(connection);
    produtosDAO.save(produto, function(req, res) {
        console.log('res',res);
        res.render("produtos/lista");
    });

    connection.end();
  });

  return app;
}

module.exports = produtos;
