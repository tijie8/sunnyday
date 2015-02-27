'use strict';

var expect = require('chai').expect
var co = require('co');
var toelfloader = require('../lib/toelfreading');

describe('#loadTpoNames', function() {
  it('should load 72 tpo data', function() {
    console.log('Got files...');
    return co(function *() {
      var files = yield toelfloader.loadTpoNames();
      expect(files.length).equals(72)
      expect(files.slice(0, 5)).eql(['tpo1-1',
        'tpo1-2',
        'tpo1-3',
        'tpo2-1',
        'tpo2-2']);
    });
  });
  it('should only contains "/^tpo\d+-\d+$/"', function() {
    return co(function *() {
      var files = yield toelfloader.loadTpoNames();
      files.forEach(function (file) {
        expect(file.match(/^tpo\d+-\d+$/)[0]).equals(file);
      });
    });
  });
});
