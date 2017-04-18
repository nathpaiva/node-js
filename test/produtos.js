var express = require('../config/express')();
var request = require('supertest')(express);

describe('#Produtos Controller', function() {

  it('#Lista o Json de produto', function(done) {
    request.get('/produtos')
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .expect(200, done);
  });

  it('#Renderiza o HTML de produto', function(done) {
    request.get('/produtos')
      .expect('Content-type', /html/)
      .expect(200, done);
  });

  it('#Cadastrado produto invalido', function(done) {
    request.post('/produtos')
      .send({
        titulo: '',
        descricao: 'novo livro',
        preco: ''
      })
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .expect(400, done);
  });

  it('#Cadastrado produto valido', function(done) {
    request.post('/produtos')
      .send({
        titulo: 'Meu Produto',
        descricao: 'novo livro',
        preco: 20.5
      })
      .expect(302, done);
  });

});
