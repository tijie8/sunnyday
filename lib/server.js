'use strict';

var render = require('./render').render;
var router = require('./routers').router;

var koa = require('koa');
var serve = require('koa-static');
var staticCache = require('koa-static-cache')

var app = koa();

render(app);

var cacheOption = {maxAge: 365 * 24 * 60 * 60};
app
  .use(router.routes())
  .use(staticCache('static', cacheOption))
  .use(staticCache('bower_components', cacheOption))
  .use(router.allowedMethods());

module.exports = app;

