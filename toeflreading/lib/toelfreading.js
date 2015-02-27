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
    retFiles.sort(compareTpoName_);
    return retFiles;
  }
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


