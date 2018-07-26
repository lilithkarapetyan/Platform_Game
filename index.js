var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(express.static("."));
app.get('/', function (req, res) {
   res.redirect('index.html');
});
server.listen(3000);
io.on('connection', function(socket){
    console.log("hello")
    socket.on('save', function(data){
        console.log(data)
    })
})