var http = require('http');//32
var log = require('winston');

var server = http.createServer();

server.on('request', require('./request'));
	
server.listen(7777);

log.debug('Начинается прослушивание по порту 7777...');