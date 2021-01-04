const io = require("socket.io")();
console.log("app is running...");
io.on("connection", socket => {
	// console.log(socket)
	console.log("user is connected...");
	socket.on("message", message => {
		console.log(message);
		io.emit("message", message)
	})
});

// io.on("connection", function () {
// 	console.log("user is connected")
// })

io.listen(4000);