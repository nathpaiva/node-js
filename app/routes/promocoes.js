function promocoes(app) {

  app.get('/promocoes/add', function(req, res) {
    var connection = app.infra.connectionFactory();
    var produtosDAO = new app.infra.ProdutosDAO(connection);

    produtosDAO.lista(function(err, results) {
      res.format({
        html: function() {
          // res.send(results);
          res.render('promocoes/form', {
            lista: results
          });
        },
        json: function() {
          res.json(results);
        },
      });
    });

    connection.end();
  });

  app.post('/promocoes', function(req, res) {
    var produto = req.body;
    app.get('io').emit('novaPromocão', produto);
    res.redirect('promocoes/add');
  });

}
module.exports = promocoes;
