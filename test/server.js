'use strict';

var chai = require('chai');
var expect = require('chai').expect
var chaiWebdriver = require('chai-webdriver');
var co = require('co');
var sw = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').util,
    SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;
var cp = require('child_process');

var fs = require('fs');

var driver;

var webdriverio = require('webdriverio');
var webserver;

// Init webdriver client.
function buildDriver() {
  return new sw.Builder()
      .usingServer('http://127.0.0.1:4444/wd/hub')
      .withCapabilities(sw.Capabilities.phantomjs())
      .build();
};

// Start titcool server.
function startWebServer() {
  webserver = cp.spawn('node', ['--harmony', 'server.js']);
  webserver.on('exit', function(code) {
    console.log('Titicool web server exited with code: ' + code);
  });
  webserver.stdout.on('data', function(data) {
    console.log('Titicool stdout: ' + data);
  });
  webserver.stderr.on('data', function(data) {
    console.log('Titicool stderr: ' + data);
  });
};

describe('Get /toefl/reading', function() {
  it('title of Google.com', function() {
    return co(function *() {
      // TODO(nicholas): figure out how to write webdriver test.
      /*
      startWebServer();
      var driver = buildDriver();

      yield driver.get('http://localhost:8080/toefl/reading');

      var title = yield driver.getTitle();
      expect(title).equals('TOEFL Reading');
      webserver.kill();
      */
    });
  });
});

