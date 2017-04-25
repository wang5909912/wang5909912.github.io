
"use strict";
const mysql = require("mysql");
const db = require("./config.js");
/*1.配置mysql*/
exports.loginPhoneCheck=function (req,resp) {
    let tel = req.body.phone;
    console.log(tel);
    db.connection("SELECT login_tel FROM login where login_tel=?",[tel],function(err,data){
        console.log(data);
        console.log(err);
        console.log(data.length);
        if (data!=undefined&&data!=null){
            if(data.length>0){
                console.log("此用户已经被注册");
                resp.send("此用户已经被注册");
            }else{
                console.log("1111111");
                resp.send('1');
            }
        }

            // }
            //     }
            })
};
exports.sy_login=function(req,resp) {
    /*通过req.body获取表单传过来的值*/
    let tel = req.body.login_tel;
    let pwd = req.body.login_pwd;
    console.log(tel);
    console.log(pwd);
    db.connection("select * from login where login_tel=? and login_pwd=?", [tel, pwd], function (err, data) {
        //console.log(err);
        console.log(data.length);
        if (data.length > 0 && data != undefined) {
            console.log("登录成功！！");
            req.session.tel=data[0].login_tel;
            resp.send(tel);
        } else {
            resp.send('2');
        }
    })
};
exports.sy_reg=function(req,resp) {
    /*通过req.body获取表单传过来的值*/
    let phone= req.body.phone;
    let password = req.body.password;
    console.log(phone);
    console.log(password);
    let mysql="INSERT INTO users(login_tel) VALUE(?)"
    db.connection("INSERT INTO login VALUES(?,?) ",[phone,password],function(err,data){
        //console.log(err);
        console.log(data);
        if (data != undefined) {
            db.connection(mysql,[phone],function (err,data) {
                console.log("注册成功");
                req.session.tel=phone;
                resp.send(phone);
            })

        } else {
            resp.send('2');
        }
        console.log(phone+"这是注册后的电话号码")
    })
};
