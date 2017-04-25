"use strict"
const myConnect=require("./config");
var fs=require("fs");
let personal={
    showInfo:function (req,res) {   /*显示信息函数*/
        let login_tel=req.query.login_tel;    /*获取现在的登录的id*/
        let mysql="select * from users us join login lg on us.login_tel=lg.login_tel where us.login_tel=?";
        myConnect.connection(mysql,[login_tel],function (err,data) {
            if(data.length>0&&data!=undefined){
                res.send(data);
                /*                console.log(data);*/
            }
        })
    },
    saveInfo:function (req,res) {
        /*获取到值*/
        let user_name=req.body.user_name;
        let user_email=req.body.user_email;
        let user_birth=req.body.user_birth;
        let user_sex=req.body.user_sex;
        let user_profession=req.body.user_profession;
        let login_tel=req.body.login_tel;
        let mysql="select count(*) a from users where login_tel=?";  /*判断是增加或者修改*/
        let mysql1="update users set user_name=?,user_sex=?,user_email=?,user_birth=?,user_profession=? where login_tel=?";    /*修改的语句*/
        let mysql2="insert into users values (null,?,?,?,?,?,default,?)";   /*增加的语句*/
        myConnect.connection(mysql,[login_tel],function (err,data) {
            if(data.length>0&&data!=undefined){
                /*console.log(data)*/
                if(data[0].a>0){
                    myConnect.connection(mysql1,[user_name,user_sex,user_email,user_birth,user_profession,login_tel],function (err,data) {
                        /*console.log(data);*/
                        if(err==null||err==undefined){    /*判断成功*/
                            res.send("success");
                        }else {
                            res.send("defeated");
                        }
                    })
                }else {
                    myConnect.connection(mysql2,[user_name,user_sex,user_email,user_birth,user_profession,login_tel],function (err,data) {
                        /*console.log(data);*/
                        if(err==null||err==undefined){    /*成功*/
                            res.send("success");
                        }else {
                            res.send("defeated")
                        }
                    })
                }
            }
        })
    },
    changePwd:function (req,res) {
        /*获取传过来的值*/
        let oldPwd=req.body.oldPwd;
        let newPwd=req.body.newPwd;
        console.log(oldPwd);
        console.log(newPwd);
        let login_tel=req.body.login_tel;
        let mysql="select * from login where login_tel=? && login_pwd=?";
        myConnect.connection(mysql,[login_tel,oldPwd],function (err,data) {
            console.log(data);
            if(data.length>0&&data!=undefined){
                /*如果输入的密码和真实密码相等，能够修改*/
                let mysql1="update login set login_pwd=? where login_tel=?";
                myConnect.connection(mysql1,[newPwd,login_tel],function () {
                    if(err==null||err==undefined){
                        res.send("success");
                    }
                })
            }else {
                res.send("defeated");
            }
        })
    },
    change_header:function (req,res) {
        let imgData = req.body.imgData;
        let login_tel=req.body.login_tel;
        /*console.log(imgData);*/
        //imgData base64
        /*把所有的空格替换成+号*/
        var base64Data = imgData.replace(/data:image\/png;base64,/,"").replace(/\s/g,"+");
        /*写入缓冲区*/
        var dataBuffer = new Buffer(base64Data,"base64");
        /*console.log(dataBuffer);*/
        /*通过文件模块writeFile把缓冲区的代码写成文档*/
        var filename = new Date().getTime()+"_header.png";   //避免文件覆盖加上当前时间
        let mysql="update users set user_url=? where login_tel=?"
        fs.writeFile("../GESSATO/src/public/images/personal/"+filename,dataBuffer,function(err){
            if(err){
                console.log(err);
                res.send(err);
            }else{
                myConnect.connection(mysql,[filename,login_tel],function (err,data) {
                    console.log(data);
                    console.log(err);
                    if(data.length>0&&data!=undefined){
                        res.send("zz");
                    }
                })
            }
        })
    }
}
module.exports=personal;