"use strict"
const myConnect=require("./config");
let perCollect={
    showCollect:function (req,res) {
        let login_tel=req.query.login_tel;
        let is_expired=req.query.is_expired;
        /*console.log(login_tel);*/
        let mysql="SELECT co.collect_id,co.collect_data,pd.* FROM collect co,product_details pd WHERE co.prd_id=pd.prd_id and co.user_id=(select user_id from users where login_tel=?)";
        if(is_expired==1){
            mysql+=" and is_expired=1";
        }
        myConnect.connection(mysql,[login_tel],function (err,data) {
            /* console.log(data);
             console.log(err);*/
            if(data.length>0&&data!=undefined){
                res.send(data);
            }
        })
    },
    deleteCollect:function (req,res) {
        let collect_id=req.query.collect_id;
        let mysql="delete from collect where collect_id=?";
        myConnect.connection(mysql,[collect_id],function (err,data) {
            if(err==null&&err==undefined){
                res.send("success");
            }
        })
    },
    addShoppingCart:function (req,res) {
        let shoppingId=req.query.shoppingId;
        let login_tel=req.query.login_tel;
        let sql="INSERT INTO shopping VALUE(NULL,?,(select user_id from users where login_tel=?),1)";
        myConnect.connection(sql,[shoppingId,login_tel],function(err,data){
            console.log(err);
            if(err==undefined&&err==null){
                res.send("已经在购物车表单添加数据");
            }
        })
    },
    /*per_collect_search:function (req,res) {
     let prd_name=req.query.prd_name;
     let login_id=req.query.login_id;
     let sql="SELECT co.collect_id,co.collect_data,pd.* FROM collect co,product_details pd WHERE co.prd_id=pd.prd_id and co.user_id=(select user_id from users where login_id=?) and pd.prd_name like "%"+?+"%"";
     myConnect.connection(sql,[login_id,prd_name],function (err,data) {
     console.log(err);
     if(data.length>0&&data!=undefined){
     res.send(data);
     }
     })
     }*/
};

module.exports=perCollect;