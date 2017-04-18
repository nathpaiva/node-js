var express = require('../config/express')();
var request = require('supertest')(express);

describe('#Produtos Controller', function() {

  it('#Lista o Json de produto', function(done) {
    request
      .get('/produtos')
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .expect(200, done);
  });

});
