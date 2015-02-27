'use strict';

var expect = require('chai').expect
var co = require('co');
var toeflloader = require('../lib/toeflreading');

describe('#loadTpoNames', function() {
  it('should load 72 tpo data', function() {
    return co(function *() {
      var files = yield toeflloader.loadTpoNames();
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
      var files = yield toeflloader.loadTpoNames();
      files.forEach(function (file) {
        expect(file.match(/^tpo\d+-\d+$/)[0]).equals(file);
      });
    });
  });
});
describe('#getTitle', function() {
  it('shoud return GROUNDWATER for tpo1-1', function() {
    return co(function *() {
      var title = yield toeflloader.getTitle('tpo1-1');
      expect(title).equals('GROUNDWATER');
    });
  });
});
describe('#getParagraphs', function() {
  it('shoud return 10 paragraphs for tpo1-1', function() {
    return co(function *() {
      var paragraphs = yield toeflloader.getParagraphs('tpo1-1');
      expect(paragraphs.length).equals(10);
    });
  });
});
describe('#getQuestions', function() {
  it('shoud return 14 questions for tpo1-1', function() {
    return co(function *() {
      var questions = yield toeflloader.getQuestions('tpo1-1');
      expect(questions.length).equals(14);
    });
  });
});
