'use strict';

var router = require('koa-router')();
var fs = require('co-fs');
var toeflloader = require('../lib/toeflreading');

router.get('/toefl/reading', function *(next) {
  var names = yield toeflloader.loadTpoNames(); 
  yield this.render('reading_list', {
    names: names,
    pageName: "reading_list"
  });
});

router.get('/toefl/reading/:name', function *(next) {
  var name = this.params['name'];
  var title = yield toeflloader.getTitle(name); 
  var paragraphs = yield toeflloader.getParagraphs(name); 
  var questions = yield toeflloader.getQuestions(name);

  yield this.render('reading', {
    title: title,
    paragraphs: paragraphs,
    questions: questions,
    pageName: "reading"
  });
});

router.redirect('/', '/toefl/reading');

exports.router = router; 

