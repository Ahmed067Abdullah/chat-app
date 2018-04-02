var path = require('path');
var express = require('express');
var socketIO = require('socket.io');
var http = require('http');

var publicPath = path.join(__dirname,"../public")
var port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server)

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log("new user added");

	socket.on('createMessage', (msg) => {
		console.log("createMessage",msg);
		io.emit('newMessage',{
			from: msg.from,
			text: msg.text,
			createdAt: new Date().getTime()
	})
	})
	socket.on('disconnect', () => {
		console.log('User disconnected');	
	
	})

	// socket.emit('newMessage',{
	// 	to:"ahmed@hotmail.com",
	// 	text:"Hello from server"
	// })
});

server.listen(port, ()=> {

	console.log("Server is up on port ",port);
});