var port = process.env.PORT || 3000;

var app = require('http').createServer(handler),
	io = require('socket.io').listen(app),
	static = require('node-static');
var fileServer = new static.Server('./');
app.listen(port);
function handler (request, response) {
	request.addListener('end', function () {
        fileServer.serve(request, response);
    });
}
io.set('log level', 1);
io.sockets.on('connection', function (socket) {
	socket.on('mousemove', function (data) {
		socket.broadcast.emit('moving', data);
	});
});
