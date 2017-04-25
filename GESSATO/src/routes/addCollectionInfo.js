"use strict";
const db = require("./config.js");
let addCollectionM ={
    addCollectionInfo:function(req,resp){
        let prd_id=req.body.prd_id;
        let loginTel=req.body.loginTel;
        let collect_data=req.body.collect_data;
        let is_expired=req.body.is_expired;
        let sql;
        sql="insert into collect (user_id,prd_id,collect_data,is_expired) select user_id,?,?,? from users where login_tel=?";
        db.connection(sql,[prd_id, collect_data,is_expired,loginTel],function(err,data){
            if(err==undefined&&err==null){
                resp.send(data);
            }
        })
    }
}
module.exports =addCollectionM;

