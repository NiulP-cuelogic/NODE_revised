var http = require('http');
var app = require('./app');
var server = http.createServer(app);

var port = process.env.PORT || 3000;


server.listen(port);