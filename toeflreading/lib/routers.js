'use strict';

var router = require('koa-router')();
var fs = require('co-fs');
var toeflloader = require('../lib/toelfreading');

router.get('/toefl/reading', function *(next) {
  var names = yield toeflloader.loadTpoNames(); 
  yield this.render('reading_list', {
    names: names 
  });
});

router.get('/toefl/reading/:name', function *(next) {
  var name = this.params['name'];
  var title = yield toeflloader.getTitle(name); 
  var paragraphs = yield toeflloader.getParagraphs(name); 

  // TODO(nicholas): load actual data in toelfreading.js.
  var data = yield fs.readFile(
    'lib/data/reading/reading_question_' + name + '.data',
    {encoding: 'utf-8'});
  var lines = data.split('\n'); 
  var questions = [];
  var question = '';
  lines.map(function(line) {
    if (line.trim().length == 0) {
      if (question.trim().length > 0) {
        questions.push(question.trim());
        question = '';
      }
    } else {
      question = question + line;
    }
  });
  if (question.length > 0) {
    questions.push(question);
  }
  yield this.render('reading', {
    title: title,
    paragraphs: paragraphs,
    questions: questions
  });
});

exports.router = router; 

