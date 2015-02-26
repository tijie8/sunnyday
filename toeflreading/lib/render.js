'use strict';

var path = require('path');
var render = require('koa-ejs');

var locals = {
    version: '0.0.1',
    now: function () {
      return new Date();
    }
};

var filters = {
  format: function (time) {
    return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
  }
};

exports.render = function(app) {
  render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: true,
    locals: locals,
    filters: filters
  });
};

