var express = require('express');
var path = require('path');
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, '')));

app.use(express.static("."));
app.get('/', function (req, res) {
  res.redirect('index.html');
});


var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
