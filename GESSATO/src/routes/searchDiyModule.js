"use strict";
const db = require ("./config.js");
let searchM = {
    pageCount:4,        //每一页显示的条数
    /*-----------样板间素材sql-------------*/
    searchTemplateMaterial:function(req,resp){
        /*console.log(req.body.studentGong);
        console.log(req.body.studentFeng);*/
        let studentGong = req.body.studentGong;
        let studentFeng = req.body.studentFeng;
        let sql="SELECT tm_char FROM template_material WHERE prsm_id=(SELECT prsm_id FROM product_style_m WHERE ts_id=(SELECT ts_id FROM template_style WHERE ts_stname=?) AND sf_id=(SELECT sf_id FROM style_function WHERE sf_name=?))";
        let param=[studentFeng,studentGong];
        console.log(sql);
        db.connection(sql,param,function(err,data){
            console.log(data);
            resp.send(data);
        })
    },
    /*-----------产品素材sql-------------*/
    searchFurniture:function(req,resp){
   /*     console.log(req.body.furnitureFeng);
        console.log(req.body.furnitureGong);*/
        let pageNum = req.query.pageNum;    //页码
        let furnitureFeng = req.body.furnitureFeng;
        let furnitureGong = req.body.furnitureGong;
        let sql="SELECT * FROM product_details WHERE fuc_id=(SELECT fuc_id FROM functional_categories WHERE sf_id=(SELECT sf_id FROM style_function WHERE sf_name=?) AND pc_id=(SELECT pc_id FROM product_category WHERE pc_stname=?)) GROUP BY prd_name limit ?,?";
        let param=[furnitureFeng,furnitureGong,(pageNum-1)*searchM.pageCount, searchM.pageCount];
        /*console.log((pageNum-1)*searchM.pageCount+"这是素材加载的个数统计？");
        console.log(searchM.pageCount+"这是每页加载在多少个");
        console.log(param+"真是不容易啊 ");*/
        console.log(sql);
        db.connection(sql,param,function(err,data){
            console.log(data);
            resp.send(data);
        })
    },

    /*   素材分页*/
    pageNumCount:function(req,resp){
        let furnitureFeng = req.body.furnitureFeng;
        let furnitureGong = req.body.furnitureGong;
      /*  console.log(req.body.furnitureFeng+"素材分页");
        console.log(req.body.furnitureGong);*/
        /* let pageNum = req.query.pageNum;    //页码*/
        //let pageCount=3;
        let sql="select count(*) as myCount from product_details WHERE fuc_id=(SELECT fuc_id FROM functional_categories WHERE sf_id=(SELECT sf_id FROM style_function WHERE sf_name=?) AND pc_id=(SELECT pc_id FROM product_category WHERE pc_stname=?)) ";
        let param=[furnitureFeng,furnitureGong];
        console.log(sql);
        db.connection(sql,param,function(err,data){
            //console.log(this);
            /*  let data1 = JSON.stringify(data);*/
           /* console.log(data+"这个数组是个啥");
            console.log(data[0].myCount+"这到底是个啥？");
            console.log(data[0].myCount/searchM.pageCount+"这就是传说中的页数？");*/
            //如果send第一个参数是Number类型，他就会覆盖返回默认的status
            //第二个参数作为要返回的内容
            //resp.send(200,5);
            resp.send(String(Math.ceil(data[0].myCount/searchM.pageCount)));
        })
    },
    /*-----------产品素材对应颜色sql-------------*/
    searchColor:function(req,resp){
        console.log(req.body.studentColor);
        let studentColor = req.body.studentColor;
        let sql="SELECT *  FROM colors WHERE col_id=ANY(SELECT col_id FROM colors_details WHERE prd_id=ANY(SELECT prd_id FROM  product_details WHERE prd_name=? ))";
        let param=[studentColor];
       /* console.log(sql+"哎？握草我颜色哪去了");*/
        db.connection(sql,param,function(err,data){
            console.log(data+"你看嘛");
            resp.send(data);
        })
    },
    /*-----------打印diy订单sql-------------*/
    collectionProduct:function (req,resp) {
       /* console.log("哇啊哇哇哇哇，，，终于等到你了,妈蛋快哭了")
        console.log(req.body.arr);*/
        let arr = req.body.arr;
        let arr2=new Array();
        arr2=[ ];
        arr2=arr.split(",");
        let param=arr2[0];
      /*  console.log(arr2.length+"这个数组的对吗？"+arr2[0]+"初始化的param"+param);*/
        let sql=" SELECT prd_name,prd_money FROM product_details WHERE prd_char IN('"+arr2[0]+"')";
        for(var i=1;i<arr2.length;i++){
            sql=sql+" OR prd_char IN ('"+arr2[i]+"')";
            param=param+","+arr2[i];
           /* console.log(param+"这是什么鬼");*/
        }
        console.log(sql);
        db.connection(sql,param,function(err,data){
            console.log(data);
            resp.send(data);
        })

    },
    /*-----------查询产品素材换了颜色sql-------------*/
    searchColorProduct:function (req,resp) {
        let studentColorProduct = req.body.studentColorProduct;

        let sql = "SELECT * FROM product_details WHERE prd_id=(SELECT prd_id FROM colors_details WHERE col_id=?)";
        let param = [studentColorProduct];
      /*  console.log(param + "这里进来了，换颜色的？ ");*/
        console.log(sql);
        db.connection(sql, param, function (err, data) {
            console.log(data);
            resp.send(data);
        })
    },

    //添加Diy订单表
    addDiyOrder:function (req,resp) {
        console.log('添加订单');
        let date = req.body.date;//订单产生时间
        let newdate = req.body.number;//订单编号
        let tel=req.body.loginTel
      /*  let addressId=req.body.address;//地址ID*/

        let sql ='INSERT INTO diy_order (user_id,do_date,do_number,do_ispay)SELECT user_id,?,?,0 FROM users WHERE login_tel=?;';
        let param = [date,newdate,tel];
        db.connection(sql,param,function (err,data) {
            if(err==null&&err==undefined){
                console.log("修改成功");
                resp.send("修改成功")
            }
        })
    },
//添加Diy订单明细表
    addDiyOrderGoods:function (req,resp) {
        let number = req.body.prd_number;//产品数量
        let prd_id = req.body.prd_id;//产品id
        let new_number = req.body.do_id;//订单编号
        let sql='INSERT INTO diy_order_goods (prd_id,do_id,prd_num)SELECT ?,do_id,? FROM diy_order WHERE do_number=?';
        let param = [prd_id,number,new_number];
        db.connection(sql,param,function (err,data) {
            console.log(data);
            console.log(err);
            if(err==null&&err==undefined){
                console.log("");
                resp.send(data);
            }
        })
    }
};



module.exports=searchM;



