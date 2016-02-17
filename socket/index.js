var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log('a user connected');
});

server.listen(7000, function(){
  console.log('listening on *:7000');
});