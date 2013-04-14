//var User = require('../models/user');
//var OnlineUser = require('../models/onlineUser');


//起始页
exports.index = function(req, res){
  res.render('index', {layout:'layout' });
};

//跳转注册
exports.reg = function(req,res){
    res.render('reg',{title:'用户注册',layout:'layout' });
};

//进行注册
exports.regdo = function(req,res){
/*
    if(req.body['password-repeat'] != req.body['password']){
        req.flash('error','两次输入密码不一致');
        console.log('err:两次输入密码不一致');
        return res.redirect('/reg');
    }
    var newUser = new User(req.body.username,req.body.password);
    User.get(newUser.name,function(err,user){
        if(user){
            err = 'already exists';
        }
        if(err){
            req.flash('error',err);
            return res.redirect('/reg');
        }
        newUser.save(function(err){
            if(err){
                req.flash('error',err);
                return res.redirect('/reg');
            }
            req.session.user = newUser;
            req.flash('success','注册成功');
            console.log('success:注册成功');
            res.redirect('/');
        });
    });
*/
};

//跳转登录
exports.login = function(req,res){
    res.render('login',{title:'用户登录',layout:'layout'});
};
//登出
exports.loginout = function(req,res){
/*
    var redis = require('redis');
    var userListRedis = redis.createClient();
    //用户下线推送消息
    userListRedis.publish('loginUserList',req.session.user.name+"下线了");
    OnlineUser.delete(req.session.user.name,function(err){
        if(err){
            console.log('delete onlineuser err:'+err);
        }else{
            console.log('delete onlineuser success');
        }
    });
    req.session.user = null;
*/
    return res.redirect('/');
};

exports.logindo = function(req,res){
/*
    var redis = require('redis');
    var userListRedis = redis.createClient();
    if(req.body.username == ''){
        req.flash('error','请输入用户名');
        return res.redirect('/login');
    }
    if(req.body.password == ''){
        req.flash('error','请输入密码');
        return res.redirect('/login');
    }

    User.get(req.body.username,function(err,user){
        if(user && user.password == req.body.password){
            //将新登录用户存入数据库
            var newOnlineUser = new OnlineUser(user.name);
            newOnlineUser.save(function(err){
                if(err){
                    console.log('save onlineuser err:'+err);
                }else{
                    console.log(user.name+'save onlineuser success');
                    //获取在线用户
                    OnlineUser.getOnline(function(err,onlineuser){
                        if(err){
                            console.log(user.name+'get onlineuser err:'+err);
                        }else{
                            console.log(user.name+'get onlineuser success'+onlineuser);
                            req.session.onlineUsers = onlineuser;
                            console.log(user.name +"login");
                            res.redirect('/');
                        }
                    });
                }
            });
            //用户上线推送消息
            userListRedis.publish('loginUserList',user.name);
            req.session.user = user;


        }else{
            req.flash('error','请检查用户名密码是否正确');
            return res.redirect('/login');
        }

    });
*/
};