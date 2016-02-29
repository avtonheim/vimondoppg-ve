var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');

var debug = require('debug')('expressapp');

var app = express();

var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);



app.io = io;

var renderers = {};

io.on('connection', function(socket) {
  console.log('a user connected: ' + socket);

  socket.on('msg', function (data) {
    console.log(data);
    socket.broadcast.emit('msg', data);
 });

});

app.set('port', process.env.PORT || 8000);

app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

server.listen(app.get('port'));
