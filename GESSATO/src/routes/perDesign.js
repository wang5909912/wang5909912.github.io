"use strict"
const myConnect=require("./config");
let showDesign={
    showDesign:function (req,res) {
        let login_tel=req.query.login_tel;
        let mysql="select * from diy_order where user_id=(select user_id from users where login_tel=?)";
        myConnect.connection(mysql,[login_tel],function (err,data) {
            if(data.length>0&&data!=undefined){
                res.send(data);
            }
        })
    },
    selectDesignPro:function (req,res) {
        let do_id=req.query.do_id;
        let mysql="SELECT dog.prd_num,pd.* FROM diy_order_goods dog,product_details pd WHERE pd.prd_id=dog.prd_id AND dog.do_id=?"
        myConnect.connection(mysql,[do_id],function (err,data) {
            if(data.length>0&&data!=undefined){
                res.send(data);
            }
        })
    },
    addDesignShop:function (req,res) {
        let prd_id_arr=req.query.prd_id_arr;
        let prdNum=req.query.prdNum;
        let login_tel=req.query.login_tel;
        let mysql="INSERT INTO shopping VALUES(NULL,?,(SELECT user_id FROM users WHERE login_tel=?),?)"
        for(var i=0;i<prd_id_arr.length;i++){
            myConnect.connection(mysql,[prd_id_arr[i],login_tel,prdNum[i]],function (err,data) {
                if(err==null||err==undefined){
                    res.send("success");
                }
            })
        }
    },
    perDeleteDo:function (req,res) {
        let do_id=req.query.do_id;
        let mysql="delete from diy_order_goods where do_id=?";
        let mysql2="delete from diy_order where do_id=?";
        myConnect.connection(mysql,[do_id],function (err,data) {
            console.log("删除了这个设计东西")
            /*删除。。。。。。。。。。。。。*/
            if(err==null&&err==undefined){
                myConnect.connection(mysql2,[do_id],function (err,data) {
                    if(err==null||err==undefined){
                        res.send("success");
                    }
                })
            }
        })

    }
};

module.exports=showDesign;
