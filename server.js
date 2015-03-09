'use strict';

var app = require('./lib/server');
var port = 8080;
console.log('Starting server on port:' + port);
app.listen(port);

