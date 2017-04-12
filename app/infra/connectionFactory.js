var mysql = require('mysql');

var _connectionMYSQL = function() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'alura_casadocodigo'
  });
}

module.exports = function () {
  return _connectionMYSQL;
};
