"use strict"
const myConnect=require("./config");
let perAddress={
    showAddress:function (req,res) {
        let login_tel=req.query.login_tel;
        let mysql="SELECT * FROM addres ad,users us,login lo WHERE ad.user_id=us.user_id && us.login_tel=lo.login_tel && us.login_tel=?";
        myConnect.connection(mysql,[login_tel],function (err,data) {
            if(data.length>0&&data!=undefined){
                res.send(data);
            }
        })
    },
    deleteAddress:function (req,res) {
        let address_id=req.query.address_id;
        console.log(address_id);
        let mysql="delete from addres where address_id=?";
        myConnect.connection(mysql,[address_id],function (err,data) {
            if(err==null&&err==undefined){
                res.send("success");
            }else {
                res.send("erro")
            }
        })
    },
    peraddAddress:function (req,res) {
        /*获取所有的信息*/
        let address_name=req.body.address_name;
        let address_pre=req.body.address_pre;
        let address_city=req.body.address_city;
        let address_area=req.body.address_area;
        let address_tel=req.body.address_tel;
        let address_concrete=req.body.address_concrete;
        let address_num=1;
        let login_tel=req.body.login_tel;
        let whichfun=req.body.whichfun;
        let address_id=req.body.address_id;
        console.log(address_tel);
        if(whichfun==1){
            let mysql="insert into addres values(null,(select user_id from users where login_tel=?),?,?,?,?,?,?,?)";
            myConnect.connection(mysql,[login_tel,address_name,address_concrete,address_tel,address_pre,address_city,address_area,address_num],
                function (err,data) {
                    console.log(err);
                    if(err==null&&err==undefined){
                        res.send("success");
                    }
                })
        }
        else{
            let mysql="update addres set address_name=?,address_concrete=?,address_tel=?,address_pre=?,address_city=?,address_area=? where address_id=?";
            myConnect.connection(mysql,[address_name,address_concrete,address_tel,address_pre,address_city,address_area,address_id],
                function (err,data) {
                    console.log(err);
                    if(err==null&&err==undefined){
                        res.send("success");
                    }
                })
        }
    }
}

module.exports=perAddress;

