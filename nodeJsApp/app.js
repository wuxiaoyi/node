
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

//var MongoStore = require('connect-mongo')(express);
//var setting = require('./setting');
var flash = require('connect-flash');
//var partials = require('express-partials');
//var redis = require("redis");

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  //使用layout模板
 // app.use(partials());
  app.use(flash());
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
/*
  app.use(express.session({
      secret: setting.cookieSecret,
      store:  new  MongoStore({
        db: setting.db
      })
  }));

    app.use(function (req, res, next) {
        res.locals.user=req.session.user;
        res.locals.onlineUsers = req.session.onlineUsers;
        var err = req.flash('error');
        res.locals.error = err.length ? err : null;
        var sucess = req.flash('success');
        res.locals.sucess = sucess.length ? sucess : null;
        next();
    });
*/
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.all('/reg',routes.reg);
app.post('/regdo',routes.regdo);
app.all('/login',routes.login);
app.all('/loginout',routes.loginout);
app.post('/logindo',routes.logindo);


var appServer = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
//var userListRedis = redis.createClient();
var io = require('socket.io').listen(appServer);
io.sockets.on('connection', function(socket){
    console.log("Connection " + socket.id + " accepted.");
    socket.on('message', function(message){
        console.log("Received message: " + message + " - from client " + socket.id);
        socket.broadcast.emit('message', message);
    });


    userListRedis.subscribe("loginUserList");
    userListRedis.on('message',function(channel,message){
        socket.broadcast.emit('loginUser', message);
    });
    socket.on('disconnect', function(){
        console.log("Connection " + socket.id + " terminated.");
    });
});


