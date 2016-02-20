var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('message', function(message) {
    console.log(message);
  });
  
  socket.on('boom', function(message) {
      console.log(message);
  });
  
  socket.on('disconnect', function() {
      console.log('a user disconnected');
  });
});

var ping = io.of('/pings').on('connection', function(socket) {
	socket.emit('ping', { userName: 'Railsass Bitch', userColor: '#FFF',track: 1, tick: 400})
    });

server.listen(7000, function(){
  console.log('listening on *:7000');
});