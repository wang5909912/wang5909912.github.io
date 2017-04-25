"use strict";
const myconnect=require("./config.js");
let production= {
    showwork: function (req, resp) {
        var id = req.query.id;
        var sttp = req.query.o;
        var tp = req.query.tp;
        var nm = req.query.nm;
        console.log("vvv:" + req.query.id);
        let mysql = "SELECT * FROM production pd WHERE pd.production_id=ANY(SELECT production_id FROM stylist_production sp WHERE sp.stylist_id=?)";
        myconnect.connection(mysql, [id], function (err, data) {
                console.log(err);
                console.log(data);
                if (data != null && data != undefined) {
                    //res.send(data);
                    resp.render("sjswork", {
                        wook:sttp,
                        tp:tp,
                        nm:nm,
                        goodsList: data      /*xhr.responseText ===> data */
                    })
                }
            }
        )
        }
    //work:function (req,resp){
    //    var id=req.query.id;
    //    console.log("vvv:"+req.query.id);
    //    let mysql="SELECT * FROM stylist_production sp JOIN stylist st ON sp.stylist_id=st.stylist_id JOIN production pd ON pd.production_id=sp.production_id;SELECT * FROM stylist_production sp JOIN stylist st WHERE sp.stylist_id=st.stylist_id";
    //    myconnect.connection(mysql,[id],function(err,data) {
    //            console.log(err);
    //            console.log(data);
    //            if (data!=null && data!= undefined) {
    //                //res.send(data);
    //                resp.render("work",{
    //                    goodsList:data      /*xhr.responseText ===> data */
    //                })
    //            }
    //        }
    //    )
    //}
};

module.exports=production;
