var mysql = require('mysql');

var _connectionMYSQL = function() {
  var config = {
    host: 'localhost',
    user: 'root',
    password: ''
  };

  if (!process.env.NODE_ENV) {
    config.database = 'alura_casadocodigo';
  }

  if (process.env.NODE_ENV === 'test') {
    config.database = 'alura_casadocodigo_test';
  }

  if (process.env.NODE_ENV === 'production') {
    var urlDeConexao = process.env.CLEARDB_DATABASE_URL;
    // mysql://b0b1f27be5870f:9cd4b731@us-cdbr-iron-east-03.cleardb.net/heroku_c165ec7ef5cd023?reconnect=true
    var grupos = urlDeConexao.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?reconnect=true/);
    config.host = grupos[3];
    config.user = grupos[1];
    config.password = grupos[2];
    config.database = grupos[4];
  }

  return mysql.createConnection(config);
}

module.exports = function() {
  return _connectionMYSQL;
};
