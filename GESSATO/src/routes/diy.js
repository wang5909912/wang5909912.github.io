"use strict";
const db = require("./config.js");
/*样板素材图片*/
exports.checkProduct=function(req,resp){
    db.connection("select * from template_material where sf_id=?",[1],function(err,data){
        console.log(data);
        /*resp.send(data) ===> xhr.responseText */

        /*拿到数据了，渲染视图
         * */
        resp.render("diyM",{
            ModelList:data      /*xhr.responseText ===> data */
        })
    })
};
/*样板素材详情*/
exports.getDetail=function(req,resp){
    console.log(req.query.id);
    db.connection("select * from template_material where tm_id=?",[req.query.id],function(err,data){
        console.log(data);
        let productDetail = data[0];
        console.log(typeof productDetail);
        resp.render("detail",productDetail);
    })
};

/*家具素材图片*/
exports.checkProduct=function(req,resp){
    db.connection("select * from template_material",[],function(err,data){
        console.log(data);
        /*resp.send(data) ===> xhr.responseText */

        /*拿到数据了，渲染视图
         * */
        resp.render("diyM",{
            ModelList:data      /*xhr.responseText ===> data */
        })
    })
};
/*家具素材详情*/
exports.getDetail=function(req,resp){
    console.log(req.query.id);
    db.connection("select * from template_material where tm_id=?",[req.query.id],function(err,data){
        console.log(data);
        let productDetail = data[0];
        console.log(typeof productDetail);
        resp.render("detail",productDetail);
    })
};
