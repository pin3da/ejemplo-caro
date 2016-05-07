var express = require('express');
var router = express.Router();

function handleIndex (coolSocket, data) {
  coolSocket.emit('hola', 'echo : ' + data);
}

function handleCaro (coolSocket, data) {
  coolSocket.emit('hola', 'desde Carooooo : ' + data.toUpperCase());
}

module.exports = function (app, mountPoint) {
  router.get('/', function (req, res, next) {
    res.render('index');
  });

  router.get('/caro', function (req, res) {
    res.render('index');
  });

  var io = app.io;
  io.on('connection', function (socket) {
    console.log('new user fom io');
    socket.emit('serverReady', '(:');
    socket.on('caro', function (info) {
      var path = info.path;
      var data = info.data;
      if (path === '/') {
        handleIndex(socket, data);
      } else if (path === '/caro') {
        handleCaro(socket, data);
      }
    })
  });
  app.use(mountPoint, router);
}
