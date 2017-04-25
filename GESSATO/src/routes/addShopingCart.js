"use strict";
const db = require("./config.js");
let addM ={
    addCartInfo:function(req,resp){
        console.log("zzzzzzzz")
        let prd_id=req.query.prd_id;
        let loginTel=req.query.loginTel;
        let goods_num=req.query.goods_num;
        console.log(prd_id);
        console.log(loginTel);
        console.log(goods_num);
        let sql;
        sql="insert into shopping (user_id,prd_id,goods_num) select user_id,?,? from users where login_tel=?";
        db.connection(sql,[prd_id,goods_num,loginTel],function(err,data){
            console.log(err)
            if(err==undefined&&err==null){
                resp.send(data);
            }
        })
    }
}
module.exports = addM;

