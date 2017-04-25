"use strict";
const myConnect=require("./config");
let perOrder={
    showOrder:function (req,res) {
        let login_tel=parseInt(req.query.login_tel);
        let everyPage=parseInt(req.query.everyPage);
        let pageNum=req.query.pageNum;
        let ispay=req.query.ispay;
        let changeDate=req.query.changeDate;
        let param=[login_tel];
        let mysql="SELECT * FROM orders od,addres ad WHERE od.user_id=(SELECT user_id FROM users WHERE login_tel=?) and ad.address_id=od.address_id";
        /*判断日期*/
        if(changeDate==0){
            mysql+="";
        }else{
            mysql+=" AND order_data>DATE_SUB(CURDATE(),INTERVAL ? MONTH)";
            param.push(changeDate);
        }
        /*判断是否付款*/
        if(ispay=="2"){
            mysql+="";
        }else {
            mysql+=" and order_ispay=?"
            param.push(ispay);
        }
        if(pageNum!=""){
            mysql+=" ORDER BY order_data DESC limit ?,?";
            param.push((pageNum-1)*everyPage);
            param.push(everyPage);
        }
        console.log(mysql);
        myConnect.connection(mysql,param,function (err,data) {
            console.log(err);
            if(data.length>0&&data!=undefined){
                res.send(data);
            }
        })
    },
    selectPro:function (req,res) {    /*再查找到订单号之后*/
        let order_id=req.query.order_id;
        let mysql="SELECT * FROM product_details pd,orders od,order_product_details opd WHERE od.order_id=? AND od.order_id=opd.order_id AND opd.prd_id=pd.prd_id";
        myConnect.connection(mysql,[order_id],function (err,data) {
            /*console.log(data);
             console.log(err);*/
            if(data.length>0&&data!=undefined){
                res.send(data);
            }
        })
    },
    deleteOrder:function (req,res) {
        let order_id=req.query.order_id;
        let mysql1="DELETE FROM order_product_details WHERE order_id=?";
        let mysql2="DELETE FROM orders WHERE order_id=?"
        myConnect.connection(mysql1,[order_id],function (err,data) {
            if(err==null||err==undefined){
                myConnect.connection(mysql2,[order_id],function (err,data) {
                    if(err==null||err==undefined){
                        res.send("success");
                    }
                })
            }
        })
    }
}
module.exports=perOrder;