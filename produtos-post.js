var http = require('http');

var config = {
  hostname: 'localhost',
  port: 3000,
  path: '/produtos',
  method: 'post',
  headers:{
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }
};

var client = http.request(config, function(res) {
  console.log(res.statusCode);

  res.on('data', function(body) {
    console.log('body'+ body);
  });
});

var produto = {
  'titulo': 'Nosso novo livrinho UHUUUUL',
  'preco': 130,
  'descricao': 'Nosso novo livrinho por post'
};

client.end(JSON.stringify(produto));
