'use strict';

var expect = require('chai').expect
var co = require('co');
var toelfloader = require('../lib/toelfreading');

describe('#loadTpoNames', function() {
  it('should load 72 tpo data', function() {
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
describe('#getTitle', function() {
  it('shoud return GROUNDWATER for tpo1-1', function() {
    return co(function *() {
      var title = yield toelfloader.getTitle('tpo1-1');
      expect(title).equals('GROUNDWATER');
    });
  });
});
describe('#getParagraphs', function() {
  it('shoud return 10 paragraphs for tpo1-1', function() {
    return co(function *() {
      var paragraphs = yield toelfloader.getParagraphs('tpo1-1');
      expect(paragraphs.length).equals(10);
    });
  });
});
