var express = require('express');
var app = express();
app.use(express.static("."));
app.get('/', function (req, res) {
   res.redirect('index.html');
});
var server = require('http').Server(app);
/*var io = require('socket.io')(server);

*/
server.listen(3000);
