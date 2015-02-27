'use strict';

var chai = require('chai');
var expect = require('chai').expect
var co = require('co');
var sw = require('selenium-webdriver');
var driver = new sw.Builder()
    .withCapabilities(sw.Capabilities.firefox())
    .build()
var chaiWebdriver = require('chai-webdriver');

chai.use(chaiWebdriver(driver));

var app = require('../lib/server');
app.listen(8080);

describe('Get /toefl/reading', function() {
  it('shoud contain 72 tpo items', function() {
    return co(function *() {
      driver.get('http://localhost:8080/toefl/reading');
      expect('tpo-reading').dom.to.have.count(72);
    });
  });
});

