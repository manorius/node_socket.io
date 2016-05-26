var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var temp = "";


// view engine setup
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname, 'public'));


// ROOT DOMAIN
app.get('/', function(req, res){
  // FOR SENDING A STRING
  //res.send('Hello World!');
  // FOR LOADING A HTML FILE
  res.render('index.html');
  // SENDING JSON
  // res.json({ status:"ALL OK" });
// REDIRECTING TO A NEW PAGE
// res.redirect("/blog");
// DOWNLOADING A FILE
// res.download('/directory/file.ext');
});




// RECEIVEING AND SENDING DATA THROUGH WEBSOCKETS
io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        console.log("received: " + msg);
        temp = msg;
        // SENDING AN OBJECT BACK
      io.sockets.emit('reply message',{"value":temp,"data":99999});
    });
})


// READING GET REQUEST AND RESPONDING
app.get('/getReq', function(req, res){
  console.log(req.query.q);
  res.send("received");
});


// SENDING WESOCKET DATA
app.get('/send-data-over-socket',function(req, res){


res.send('SENDING DATA');


io.sockets.emit('reply message',{"value":temp,"data":99999});


});


module.exports = app;


server.listen(4567, function(){
  var host = server.address().address
   var port = server.address().port


  console.log('Example app listening at http://%s:%s', host, port)


});