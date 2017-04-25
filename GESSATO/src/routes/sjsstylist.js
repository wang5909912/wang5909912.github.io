"use strict";
const myconnect=require("./config.js");
let stylist={
    showstylist:function (req,resp){
        let mysql="select * from stylist";
        myconnect.connection(mysql,[],function(err,data) {
                console.log(err);
                console.log(data);
                if (data!=null && data!= undefined) {
                    //res.send(data);
                    resp.render("sjsstyle",{
                        goodsList:data
                    });
                }
            }
        )
    }
};
module.exports=stylist;
//路由层
//let mysql=function(req,res){
//    console.log(req.query.id);
//    myconnect.getConnectionSql(mysql,[],function(err,data) {
//        console.log(err);
//        let productDetail = data[0];
//        console.log(typeof productDetail);
//        res.render("sjsstyle",productDetail);
//    })
//};

