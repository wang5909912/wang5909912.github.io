"use strict";
const db = require("./config.js");
exports.checkProduct = function(req,resp){

    db.connection("select * from product_details",[],function(err,data){
        //console.log(data);
        resp.render("product",{
                data:data
        })
    })
}
