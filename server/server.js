var path = require('path');
var express = require('express');
var socketIO = require('socket.io');
var http = require('http');

var {generateMessage} = require("./utils/message.js")

var publicPath = path.join(__dirname,"../public")
var port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server)

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log("new user added");

	socket.emit('newMessage', generateMessage("Admin","Welcome to the chat app"));

	socket.broadcast.emit('newMessage',generateMessage("Admin","New User Joined Chat"));

	socket.emit('createMessage', (msg) => {
		console.log("createMessage",msg);
		io.emit('newMessage', generateMessage(msg.from,msg.text));
	
	});

	socket.on('disconnet', ()=> {
		console.log("User disconneted")
	})
	// socket.emit('newMessage',{
	// 	to:"ahmed@hotmail.com",
	// 	text:"Hello from server"
	// })
});

server.listen(port, ()=> {

	console.log("Server is up on port ",port);
});