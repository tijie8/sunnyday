'use strict';

var fs = require('co-fs');
var path = require('path');

var cachedTpoNames_;
var cachedParagraphs_ = {};
var cachedTitles_ = {};
var cachedQuestions_ = {};

var loader = module.exports = {
  loadTpoNames: function *() {
    if (cachedTpoNames_) {
      return cachedTpoNames_;
    }
    var files = yield fs.readdir(__dirname + '/data/reading/');
    var retFiles = [];
    files.forEach(function(file) {
      var fileName = path.basename(file);
      if (fileName.startsWith('reading_tpo')) {
        retFiles.push(fileName.substring(
            'reading_'.length, fileName.indexOf('.')));
      }
    });
    retFiles.sort(compareTpoName_);
    cachedTpoNames_ = retFiles;
    return retFiles;
  },

  getTitle: function*(name) {
    if (!cachedTitles_[name]) {
      yield loadArticle_(name);
    }
    return cachedTitles_[name];
  },

  getParagraphs: function *(name) {
    if (!cachedParagraphs_[name]) {
      yield loadArticle_(name); 
    }
    return cachedParagraphs_[name];
  },

  getQuestions: function *(name) {
    if (!cachedQuestions_[name]) {
      yield loadQuestions_(name);
    }
    return cachedQuestions_[name];
  },
};

function *loadQuestions_(name) {
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
  cachedQuestions_[name] = questions;
};

function *loadArticle_(name) {
  var data = yield fs.readFile(
    __dirname  + '/data/reading/reading_' + name + '.data',
    {encoding: 'utf-8'});
  var lines = data.split('\n');
  var title = lines[0];
  var paragraphs = lines.slice(1, lines.length);
  cachedParagraphs_[name] = paragraphs;
  cachedTitles_[name] = title;
};

var filePattern = /tpo(\d+)-(\d+)/;
function compareTpoName_(file1, file2) {
  var m1 = file1.match(filePattern);
  var m2 = file2.match(filePattern);
  var n1 = m1[1];
  var n2 = m2[1];
  var n1_1 = m1[2];
  var n2_1 = m2[2];
  if (n1 == n2) {
    return n1_1 - n2_1;
  }
  return n1 - n2;
};


