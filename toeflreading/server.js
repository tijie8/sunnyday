'use strict';

var koa = require('koa');
var render = require('./lib/render').render;
var serve = require('koa-static');
var router = require('./lib/routers').router;

var app = koa();

render(app);

app
  .use(router.routes())
  .use(serve('static'))
  .use(router.allowedMethods());

app.listen(8080);
