"use strict";
const myConfig=require("./config.js");
var cartModule= {
    //添加地址
    getGoodsImg: function (req, resp) {
        console.log("正在通过颜色查找图片");
        let sql,arr=[];
        let colorSrc = req.body.colorSrc;
        arr.push(colorSrc);
        console.log(arr);
        sql = "SELECT prd_char FROM product_details WHERE prd_id=( SELECT prd_id FROM colors_details WHERE col_id=(SELECT col_id FROM colors WHERE col_url=?))";
        myConfig.connection(sql, arr, function (err, data) {
            console.log(err);
            //console.log(data);
            if (err == null && err == undefined) {
                console.log(data);
                resp.send(data)
            }
        })
    },
    cartUpdateManyGoods:function(req,resp){
        console.log("正在更改购物车商品数量");
        let goodsNum=req.body.goodsNum;
        let goodsSrc=req.body.goodsSrc;
        let sql;
        sql="update shopping set goods_num=? where prd_id=(select prd_id from product_details where prd_char=?)";
        myConfig.connection(sql,[goodsNum,goodsSrc],function(err,data){
            if(err==undefined&&err==null){
                resp.send("已经在购物车表单添加数据");
            }
        })
    },
    queryGoodsCart:function(req,resp){
        console.log("正在加载购物车");
        //let goodsID=req.body.goodsId;
        //let goodsID=3;
        let login_tel=req.body.loginTel;
        let sql;
        sql="SELECT * FROM product_details pro JOIN shopping shop where pro.prd_id=shop.prd_id and user_id=(select user_id from users where login_tel=?)";
        myConfig.connection(sql,[login_tel],function(err,data){
            if(err==undefined&&err==null){
                resp.send(data);
            }
        })
    },
    getGoodsColor:function(req,resp){
        console.log("正在查找颜色");
        //let goodsID=req.body.goodsId;
        let cartColorImgSrc=req.body.cartColorImgSrc;
        let sql;
        sql="SELECT col_url FROM colors WHERE col_id IN (SELECT col_id FROM colors_details WHERE prd_id IN (SELECT prd_id FROM product_details WHERE prd_name=(SELECT prd_name FROM product_details WHERE prd_char=?)))";
        myConfig.connection(sql,[cartColorImgSrc],function(err,data){
            if(err==undefined&&err==null){
                resp.send(data);
            }
        })
    },
    deleteGoods:function(req,resp){
        console.log("删除购物车数据");
        //let goodsID=req.body.goodsId;
        let login_tel=req.body.loginTel;
        let prdImg=req.body.prdImg;
        let sql;
        sql="delete from shopping where prd_id=(select prd_id from product_details where prd_char=?) and user_id=(select user_id from users where login_tel=?)";
        myConfig.connection(sql,[prdImg,login_tel],function(err,data){
            if(err==undefined&&err==null){
                resp.send(data);
            }
        })
    },
    primEdit:function(req,resp){
        console.log("点击确认修改后更改商品Id");
        //let goodsID=req.body.goodsId;
        let prdImg=req.body.prdImg;
        let goodsImg=req.body.goodsImg;
        let sql;
        sql="update shopping set prd_id=(select prd_id from product_details where prd_char=?) where prd_id=(select prd_id from product_details where prd_char=?)";
        myConfig.connection(sql,[prdImg,goodsImg],function(err,data){
            if(err==undefined&&err==null){
                resp.send(data);
            }
        })
    },
    //加入购物车
    addShoppingCart:function(req,resp){
        let prd_id=req.body.prd_id;
        let loginTel=req.body.loginTel;
        let goods_num=req.body.goods_num;
        let sql;
        sql="insert into shopping (prd_id,user_id,goods_num) select user_id,?,? from users where login_tel=?";
        myConfig.connection(sql,[prd_id,goods_num,loginTel],function(err,data){
            if(err==undefined&&err==null){
                resp.send(data);
            }
        })
    }
};
module.exports=cartModule;
