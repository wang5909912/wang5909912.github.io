"use strict";
/***********渲染详情******************/
const db = require("./config.js");
exports.checkDetails = function(req,resp){
    let prd_id=req.query.prd_id;
    console.log(prd_id)
    let sql = "select * from product_details pd join functional_categories fc on pd.fuc_id=fc.fuc_id join "+
    "style_function sf on sf.sf_id=fc.sf_id join product_category pc on fc.pc_id=pc.pc_id join "+
    "supplier sup on sup.sup_id=pc.sup_id where pd.prd_id=?;"
    db.connection(sql,[prd_id],function(err,data){
        console.log(err)
        //console.log(data);
        resp.render("product-details",{
            data:data
        })
    })
}
/***************m模态框*******************/
exports.showProductinfo = function(req,resp){
    let prd_id = req.query.prd_id;
    console.log(prd_id)
    let sql = "select * from product_details where prd_id=?"
    db.connection(sql,[prd_id],function(err,data){
        //console.log(data)
        resp.send(data);

    })
}

/*******************同类商品*********************/
exports.similarGoods = function(req,resp){
    let prd_id = req.query.prd_id;
    let sql = "SELECT * FROM product_details WHERE ts_id=(SELECT ts_id FROM product_details WHERE prd_id=?) AND prd_id!=?"
    db.connection(sql,[prd_id,prd_id],function(err,data){
        console.log(err)
        //console.log(data)
        resp.send(data);
    })
}

/**********************oldPRICE**************************/
exports.oldPrice = function(req,resp){
    let prd_id = req.query.prd_id;
    let sql = "SELECT * FROM product_details WHERE prd_id=?"
    db.connection(sql,[prd_id],function(err,data){
        console.log(err)
        console.log(data)
        //console.log(data)
        resp.send(data);
    })
}

