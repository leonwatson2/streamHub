var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = (module.exports.io = require('socket.io')(server));
var bodyParser = require('body-parser');
var twitchClient = require('./twitchbot');
var Events = require('../Events');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3231;
const connectToTwitch = connectToTwitchOnce('lfurleon');
const { SocketManager } = require('./SocketManager');
io.on('connection', socket => {
  SocketManager(socket);
  connectToTwitch(socket);
});

function connectToTwitchOnce(channel) {
  let twitchConnected = false;

  return socket => {
    setTimeout(() => {
      if (!twitchConnected) {
        twitchConnected = true;
        twitchClient(socket, channel);
      }
    }, 2000);
  };
}

server.listen(PORT, () => {
  console.log('Connected to port:' + PORT);
});
