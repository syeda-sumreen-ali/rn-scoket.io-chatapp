const io = require("socket.io")();
io.on("connection", function () {
	console.log("user is connected...")
});

io.listen(3001);