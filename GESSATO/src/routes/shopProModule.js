"use strict";
const myConfig=require("./config.js");
var userModule={
    //添加地址
    addAddress:function(req,resp){
        console.log("正在添加地址");
        let sql,arr=[];

        let name=req.body.name;
        let loginTel=req.body.loginTel;//tel
        //let loginTel=2147483647;
        let addressInfo=req.body.addressInfo;
        let phone=req.body.phone;
        let province=req.body.province;
        let city=req.body.city;
        let area=req.body.area;
        let shopProNum=req.body.shopProNum;
        arr=[name,addressInfo,phone,province,city];
        sql='INSERT INTO addres (user_id,address_name,address_concrete,address_tel,address_pre,address_city,address_area,address_num)SELECT user_id,?,?,?,?,?,?,? FROM users WHERE login_tel=?';
        if(!area){
            console.log(1111);
            arr.push(null);
        }else{
            arr.push(area);
        }
        if(!shopProNum){
            arr.push(null);
        }else{
            arr.push(shopProNum);
        }
        arr.push(loginTel);
        console.log(arr);
        myConfig.connection(sql,arr,function(err,data){
            console.log(err);
            console.log(data);
            if(err==null&&err==undefined){
                console.log("添加成功11111111111111");
                resp.send(data);
            }

        })
    },
    queryAddress:function(req,resp){
        let login_tel=req.body.loginTel;
        let sql="SELECT * FROM addres where user_id=(select user_id from users where login_tel=?)";
        myConfig.connection(sql,[login_tel],function(err,data){
            if(err==undefined&&err==null){
                resp.send(data);
            }
        })
    },
    getAddressId:function(req,resp){
        console.log("正在查询地址");
        let login_tel=req.body.loginTel;
        let sql="SELECT MAX(address_id) as myId FROM addres where user_id=(select user_id from users where login_tel=?)";
        myConfig.connection(sql,[login_tel],function(err,data){
            if(err==undefined&&err==null){
                console.log(data+"11111111111111111");
                resp.send(data);
            }
        })
    },
    queryShopGoods:function(req,resp){
        let login_tel=req.body.loginTel;
        let sql="SELECT * FROM product_details pro JOIN shopping shop WHERE shop.prd_id=pro.prd_id and user_id=(select user_id from users where login_tel=?)";
        myConfig.connection(sql,[login_tel],function(err,data){
            if(err==undefined&&err==null){
                resp.send(data);
            }
        })
    },
    queryOderGoods:function(req,resp){
        let order_id=req.body.order_id;
        let login_tel=req.body.loginTel;
        let sql="SELECT * FROM orders od JOIN order_product_details opd ON od.order_id=opd.order_id JOIN product_details pd ON opd.prd_id=pd.prd_id WHERE od.user_id=(SELECT user_id FROM users WHERE login_tel=?) AND od.order_id=?";
        myConfig.connection(sql,[login_tel,order_id],function(err,data){
            if(err==undefined&&err==null){
                resp.send(data);
            }
        })
    },
    showAddress:function(req,resp){
        let sql="SELECT * FROM addres where address_id=?";
        let addressId=req.body.addressId;
        myConfig.connection(sql,[addressId],function(err,data){
            if(err==undefined&&err==null){
                resp.send(data);
            }
        })
    },
    editAddress:function(req,resp){
        console.log("正在修改地址");
        let sql,arr=[];
        let addressId=req.body.addressId;
        let name=req.body.name;
        let addressInfo=req.body.addressInfo;
        let phone=req.body.phone;
        let province=req.body.province;
        let city=req.body.city;
        let area=req.body.area;
        let shopProNum=req.body.shopProNum;
        arr=[name,phone,addressInfo,province,city];
        sql="update addres set address_name=?,address_tel=?,address_concrete=?,address_pre=?,address_city=?,address_area=?,address_num=? where address_id=?";
        if(!area){
            arr.push(null);
        }else{
            arr.push(area);
        }
        if(!shopProNum){
            arr.push(null);
        }else{
            arr.push(shopProNum);
        }
        arr.push(addressId);
        console.log(arr);
        myConfig.connection(sql,arr,function(err,data){
            console.log(err);
            console.log(data);
            if(err==null&&err==undefined){
                console.log("修改成功");
                resp.send(data);
            }
        })
    },
    addorder:function (req,resp) {
        let order_price = req.body.order_price;
        console.log('添加订单');
        let date = req.body.date;
        let loginTel=req.body.loginTel;//tel
        let newdate = req.body.number;
        let addressId=req.body.address;
        console.log(date);
        console.log(newdate);
        console.log(addressId+"我的地址ID");
        console.log(order_price);
        console.log(loginTel);
        let sql ='INSERT INTO orders (user_id,order_data,order_ispay,order_num,address_id,order_price)SELECT user_id,?,?,?,?,? FROM users WHERE login_tel=?';
        myConfig.connection(sql,[date,0,newdate,addressId,order_price,loginTel],function (err,data) {
            if(err==null&&err==undefined){
                console.log("添加订单成功");
                resp.send("修改成功");
            }
        })
    },
    adddetails:function (req,resp) {
        let new_number = req.body.new_number;
        let sql='INSERT INTO order_product_details (prd_id,order_id,prd_num) SELECT prd_id,(SELECT order_id FROM orders WHERE order_num=?),goods_num FROM shopping';
        myConfig.connection(sql,[new_number],function (err,data) {
            console.log(data);
            console.log(err);
            if(err==null&&err==undefined){
                console.log("修改成功11234");
                resp.send(data);
            }
        })
    },
    deleteCart:function (req,resp) {
        let login_tel=req.body.loginTel;
        let sql='DELETE FROM shopping where user_id=(select user_id from users where login_tel=?)';
        myConfig.connection(sql,[login_tel],function (err,data) {
            console.log(data);
            console.log(err);
            if(err==null&&err==undefined){
                console.log("购物车已清空");
                resp.send(data);
            }
        })
    },
    changeIsPay:function (req,resp) {
        let order_id=req.body.order_id;
        let sql='update orders set order_ispay=1 where order_id=?';
        myConfig.connection(sql,[order_id],function (err,data) {
            console.log(data);
            console.log(err);
            if(err==null&&err==undefined){
                console.log("您已付款成功");
                resp.send(data);
            }
        })
    },
    getOrderId:function (req,resp) {
        let new_number=req.body.new_number;
        console.log(new_number);
        let sql='select order_id from orders where order_num=?';
        myConfig.connection(sql,[new_number],function (err,data) {
            console.log(data);
            console.log(err);
            if(err==null&&err==undefined){
                resp.send(data);
            }
        })
    }
};
module.exports=userModule;