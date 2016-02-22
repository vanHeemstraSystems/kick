var express = require('express');
var logger = require('morgan');
var server = express();

server.use(express.static(__dirname + '/public'));
server.use(logger("combined"));

server.get('/', function(req, res) {    
    res.end('Hello word!');
});

server.get('*', function(req, res) {
    res.send('Not Found!', 404);
});

server.use(function(err, req, res, next) {      
    res.send(500, 'Something broke!');
    console.error(err.stack);
});

var host = process.argv[2] || '0.0.0.0';
var port = process.argv[3] || '5000';

server.listen(port, host);
console.log('Listening on port ' + port);