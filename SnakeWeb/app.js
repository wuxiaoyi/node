
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
 // app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.all('/', routes.index);

var appServer = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var io = require('socket.io').listen(appServer);
var userReady = 0;
var userSocket = new Array();
var foodCount = 0;
io.sockets.on('connection', function(socket){
    console.log("newuser:"+socket.handshake.address.address );
    var userIp = socket.handshake.address.address;
    var playerName = '';
    //设置名称
    socket.on('setNameAndReady',function(username){
        //保存用户socket
        userSocket[username] = socket;
        socket.broadcast.emit('living', username);
        console.log("setNameAndReady:"+username);
        playerName = username;
    });
    //发送邀请
    socket.on('getBegin',function(data){
        var userData = eval(data);
        console.log("from"+userData.from);
        console.log("to"+userData.to);
        userSocket[userData.to].emit('beginRequest',userData.from);
    });
    //确认开始游戏
    socket.on('beginGame',function(toUser){
        userSocket[toUser].emit('beginGame',1);
        console.log("begingame:"+toUser);
    });
    //发送对方移动状态
    socket.on('sendEnemyDirection',function(data){

        var userData = eval(data);
        console.log('sendEnemyDirection-data===='+userData.to+"-----"+userData.direction);
        userSocket[userData.to].emit('enemyDirection',userData.direction);
        console.log("Directionchange-----"+userData.direction);
    });
    //接收创建食物请求
    socket.on('createFoodRequest',function(data){
        var userData = eval(data);
        //舞台宽
        var STAGE_WIDTH = 295;
        //舞台高
        var STAGE_HEIGHT = 145;
        var SNAKE_ELEMENT_WIDTH = 5,SNAKE_ELEMENT_HEIGHT = 5;
        var widthCount = STAGE_WIDTH/SNAKE_ELEMENT_WIDTH -1;
        var heightCount = STAGE_HEIGHT/SNAKE_ELEMENT_HEIGHT -1;
        var x = (Math.round((Math.random()*1000)%widthCount))*SNAKE_ELEMENT_WIDTH;
        var y = (Math.round((Math.random()*900)%heightCount))*SNAKE_ELEMENT_HEIGHT;
        console.log('foodInfo='+x+","+y);
        if(foodCount == 0){
            foodCount = 1;
            userSocket[userData.one].emit('createFoodResponse',{'x':x,'y':y});
            userSocket[userData.two].emit('createFoodResponse',{'x':x,'y':y});

        }
    });
    //删除食物请求
    socket.on('deleteFoodRequest',function(to){
        foodCount = 0;
        userSocket[to].emit('deleteFoodResponse',1);
        console.log("deleteFood------"+to);
    });
    //表示失败请求
    socket.on('sendMyLoseRequest',function(to){
        console.log("sendMyLoseResponse------"+to);
        userSocket[to].emit('sendMyLoseResponse',1);
    });

    socket.on('disconnect',function(){
        console.log("disconnect"+playerName);
        socket.broadcast.emit('offline',playerName);

    });
});


