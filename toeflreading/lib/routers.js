'use strict';

var router = require('koa-router')();
var fs = require('co-fs');

router.get('/toefl/reading', function *(next) {
  var names = [];
  for (var i = 1; i <= 25; i++) {
    for (var j = 1; j <= 4; j++) {
      names.push('tpo'+i+'-'+j);
    }
  }
  yield this.render('reading_list', {
    names: names 
  });
});

router.get('/toefl/reading/:name', function *(next) {
  var name = this.params['name'];
  var data = yield fs.readFile(
      'data/reading/reading_' + name + '.data',
      {encoding: 'utf-8'});
  var lines = data.split('\n');
  var title = lines[0];
  var paragraphs = lines.slice(1, lines.length);

  data = yield fs.readFile(
    'data/reading/reading_question_' + name + '.data',
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

