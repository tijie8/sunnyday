'use strict';

var fs = require('co-fs');
var path = require('path');

var loader = module.exports = {
  loadTpoNames: function *() {
    var files = yield fs.readdir(__dirname + '/data/reading/');
    var retFiles = [];
    files.forEach(function(file) {
      var fileName = path.basename(file);
      if (fileName.startsWith('reading_tpo')) {
        retFiles.push(fileName.substring(
            'reading_'.length, fileName.indexOf('.')));
      }
    });
    // TODO(nicholas): sort file names.
    return retFiles;
  }
};


