'use strict';

var http = require("http");
var koa = require('koa');
var path = require('path');
var render = require('koa-ejs');
var wait = require('co-wait');
var app = koa();

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

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: true,
  locals: locals,
  filters: filters
});

app.use(function *() {
  yield this.render('reading_list');
});

app.listen(3000);
