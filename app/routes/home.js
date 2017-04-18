function home(app) {

  app.get('/', function(req, res) {
    var connection = app.infra.connectionFactory();
    var produtosDAO = new app.infra.ProdutosDAO(connection);

    produtosDAO.lista(function(err, results) {
      res.format({
        html: function() {
          // res.send(results);
          res.render('home/index', {
            livros: results
          });
        },
        json: function() {
          console.log('OI....');
          res.json(results);
        },
      });
    });

    connection.end();
  });

}
module.exports = home;
