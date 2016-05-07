var io = require('socket.io-client')();

console.log('Caro es muy cool', io);

io.on('hola', function (data) {
  console.log('desde /', data);
});


io.on('serverReady', function(data) {
  io.emit('caro', {
    path: window.location.pathname,
    data: 'esta cosa esta muy cooooool ! \\m/'
  })
});

