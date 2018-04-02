	var socket = io();
		socket.on('connect', () => {
			console.log('Connected to server')
		});
		socket.on('disconnect', () => {
			console.log("disconnected from server")
		});

		// socket.emit('createMessage', {
		// 	from:"ahmed@gmail.com",
		// 	text:"Hello everybody"
		// })

		socket.on("newMessage", function(msg) {
			console.log(msg);
		})
