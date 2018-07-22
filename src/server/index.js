var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = module.exports.io = require('socket.io')(server)
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3231

const SocketManager = require('./SocketManager')

io.on('connection', SocketManager)

server.listen(PORT, ()=>{
	console.log("Connected to port:" + PORT);
})

app.get('/webhooks/api', (req, res) => {
		console.log("Sub", req.query['hub.challenge'])
		res.send(req.query['hub.challenge'])
})
app.post('/webhooks/api', (req, res) => {
	console.log("Yay!", req.body.data)
	io.emit('new_follower', req.body.data)
	res.sendStatus(200)
})