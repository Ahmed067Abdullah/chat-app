	var socket = io();
		socket.on('connect', () => {
			console.log('Connected to server')
		});
		socket.on('disconnect', () => {
			console.log("disconnected from server")
		});

		socket.emit('createMessage', {
			from:"ahmed@gmail.com",
			text:"Hello everybody"
		},function(msg) {
			console.log("Roger That",msg);
		})

		socket.on("newMessage", function(msg) {
			console.log(msg);
		});

		jQuery("#form").on('submit', function(e){
			e.preventDefault();

			socket.emit('createMessage',{
				from:'User',
				text:jQuery('[name=message]').val()}
			,function(){ 
				console.log("huh")
			})
		});
