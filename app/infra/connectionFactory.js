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

  return mysql.createConnection(config);
}

module.exports = function() {
  return _connectionMYSQL;
};
