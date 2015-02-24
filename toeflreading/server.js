'use strict';

var http = require("http");
var koa = require('koa');
var path = require('path');
var render = require('koa-ejs');
var wait = require('co-wait');
var serve = require('koa-static');
var router = require('koa-router')();
var fs = require('co-fs');


var locals = {
    version: '0.0.1',
    now: function () {
      return new Date();
    },
    ip: function *() {
      yield wait(100);
      return this.ip;
    },
};

var filters = {
  format: function (time) {
    return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
  }
};

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

var app = koa();

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: true,
  locals: locals,
  filters: filters
});

app
  .use(router.routes())
  .use(serve('static'))
  .use(router.allowedMethods());

app.listen(3000);
