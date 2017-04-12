var http = require('http');

http.createServer(showPage).listen(3000);

function showPage (req, res) {
  if (req.url === '/produtos') {
    res.end('<html><body><h1>Listando os produtos</h1></body></html>')
  } else{
    res.end('<html><body><h1>Home</h1></body></html>')
  }
}

console.log('Servidor está rodando');
