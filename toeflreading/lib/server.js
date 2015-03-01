'use strict';

var render = require('./render').render;
var router = require('./routers').router;

var koa = require('koa');
var serve = require('koa-static');

var app = koa();

render(app);

app
  .use(router.routes())
  .use(serve('static'))
  .use(serve('bower_components'))
  .use(router.allowedMethods());

module.exports = app;

