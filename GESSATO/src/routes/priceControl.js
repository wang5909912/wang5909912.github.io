
"use strict";
const db = require("./config.js");
let priceM ={
    priceControl:function(req,resp){
        let prd_money1=req.query.prd_money1;
        console.log(prd_money1)
        let prd_money2=req.query.prd_money1;
        let sql;
        sql="SELECT * FROM product_details WHERE prd_money BETWEEN ? AND ?;";
        db.connection(sql,[prd_money1,prd_money2],function(err,data){
            if(err==undefined&&err==null){
                resp.send(data);
                console.log(data)
            }
        })
    }
}
module.exports = priceM;
