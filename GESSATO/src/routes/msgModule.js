"use strict";
const mysql = require("mysql");
const db = require("./config.js");
/*短信模块*/
/*=======发送短信==========
 * npm install leanengine --save-dev
 * */
/*APPID: W2vxVsNd7Nyj7y18dp8v4Syh-gzGzoHsz
 * APPKey: 91fUwVvu18dPFlS7nVgO4oMj
 * */
const AV = require("leanengine");
/*1.配置AV模块*/
AV.init({
    appId:"JsO8OtzoshGGnfeHm0uCBJRl-gzGzoHsz",
    appKey:"9a9efLDqiUepSd2217yuEGSL"
});

let msgModule={
    sendMsg:function(req,resp){
        let phone = req.body.phone;
        console.log("phone获取到了")
        /*调用requestSmsCode接口*/
        AV.Cloud.requestSmsCode({
            mobilePhoneNumber:phone,
            name:"long",    //使用XX服务
            op:"账号注册",  //进行XX操作
            ttl:10  //验证码过期时间，单位是分钟
        }).then(function(data){
            //发送成功
            console.log(data);
            resp.send("验证码已发送");
        },function(err){
            //发送失败
            console.log(err);
            resp.send("发送失败");
        });
    },
    verifySms:function(req,resp){
        let phone = req.body.phone;
        let smscode = req.body.smscode;
        /*调用验证接口 verifySmsCode(验证码,手机号)*/
        AV.Cloud.verifySmsCode(smscode,phone).then(function(){
            //验证成功
            resp.send('1');
        },function(err){
            console.log(err+"-------------");
            resp.send('2');
        })
    },
    sy_product_show: function (req, resp) {
        db.connection("SELECT * FROM product_details LIMIT 8,8",[],
            function(err,data){
                console.log(err);
                console.log(data);//json对象
                //console.log("查询mysql完毕调用的回调函数");
                if(data.length>0&&data!=undefined){
                    resp.send(data);
                    // data = JSON.stringify(data)  //把JSON对象转换成json数据格式的字符串。
                }else{
                    resp.send("error")
                }
            })
    },
    sy_hot_sale_middle: function (req, resp) {
        db.connection("SELECT * FROM product_details WHERE prd_id=28",[],
            function(err,data){
                console.log(err);
                console.log(data);//json对象
                if(data.length>0&&data!=undefined){
                    resp.send(data);
                    // data = JSON.stringify(data)  //把JSON对象转换成json数据格式的字符串。
                }else{
                    resp.send("error")
                }
            })
    }
};
module.exports=msgModule;