"use strict";
const myexpress =require("express"); //加载express的资源
/*使用路由文件*/
/*session cookie*/
//npm install express-session --save-dev
//npm install cookie-parser --save-dev

const session = require("express-session");
const cookieParser = require("cookie-parser");

const ejs=require("ejs");
const app = myexpress(); //执行express的全局函数，返回一个express的服务器对象
const diy=require("./src/routes/diy.js");
const searchDiyM=require("./src/routes/searchDiyModule.js");
const fileDiyM = require("./src/routes/fileDiyModule.js");
const shopProModule=require("./src/routes/shopProModule.js");
const cartModule=require("./src/routes/cartModule.js");
const userM= require("./src/routes/userModule.js");
const msgM = require("./src/routes/msgModule.js");
const personalInfo=require("./src/routes/personalInfo");    /*个人信息*/
const perAddress=require("./src/routes/perAddress");    /*个人地址*/
const perOrder=require("./src/routes/perOrder");    /*个人订单*/
const perCollect=require("./src/routes/perCollect");    /*个人收藏*/
const perDesign=require("./src/routes/perDesign");
const searchM = require("./src/routes/searchModule.js");
const productM = require("./src/routes/product.js");
const detailsM= require("./src/routes/product-details.js");
const pageM = require("./src/routes/pageModule.js");
const addM = require("./src/routes/addShopingCart.js");
const priceM = require("./src/routes/priceControl.js");
const addCollectionM = require("./src/routes/addCollectionInfo.js");
const stylist=require("./src/routes/sjsstylist");
const production=require("./src/routes/sjswork.js");

app.configure(function(){

    /*1.调用cookieParser()*/
    app.use(cookieParser());
    /*2.Session配置*/
    app.use(session({
        secret:"1234",  //秘钥
        name:"gessatoCookie",   //cookie名称
        cookie:{maxAge:300000},
        rolling:true,
        resave:true,
    }));
    // 配置EJS
    app.set("views",__dirname+"/src/views");//视图模板位置，视图文件夹位置
    app.set("view engine","ejs");//设置模板引擎
    //__dirname :全局变量，代表的是项目根路径
    app.use(myexpress.logger("dev"));   //日志
    app.use(myexpress.bodyParser()); //把提交的数据，封装到request中的body里
    app.use(myexpress.methodOverride()); //非get请求转换为post请求 如：put , head , delete
    app.use(app.router);//先执行用户设置的，在访问静态页面，这一个配置写在静态资源配置的前面
    app.use(myexpress.static(__dirname+"/src/public")); //设置静态资源路径
    app.use(myexpress.favicon(__dirname+"/src/public/images/D-6.jpg"));   //小图标*
    //设置错误模块
    app.use(myexpress.errorHandler());
});
//  默认跳转的页面
app.get("/",function(request,response){
    //console.log("/拦截");
    response.redirect("index");
    //http://localhost:8888/pages/login.html
});
// Error: listen EADDRINUSE :::8888 端口号被占用
//通过命令行来运行node - cd 到app.js的根目录， 然后输入命令 node app.js

/*加了()代表函数执行*/

   app.set("port",8889);
   app.listen(app.get("port"),function(){
    console.log("服务器已经启动");
});
   //龙太明
app.get("/diy",diy.checkProduct);
app.post("/sy_reg.do",userM.sy_reg);
app.post("/sendMsg.do",msgM.sendMsg);
app.post("/verifySms.do",msgM.verifySms);
app.post("/loginPhoneCheck.do",userM.loginPhoneCheck);
app.post("/sy_login.do",userM.sy_login);
app.post("/sy_product_show.do",msgM.sy_product_show);
app.post("/sy_hot_sale_middle.do",msgM.sy_hot_sale_middle);
app.post("/sy_login.do",function(req,resp){
    console.log(req.session.myuser);
    let myuser = req.session.myuser;
    resp.send(myuser);
});

//谭洁
/*加了()代表函数执行*/
app.post("/addAddress.do",shopProModule.addAddress);//添加地址
app.post("/queryAddress.do",shopProModule.queryAddress);//点击获取地址
app.post("/showAddress.do",shopProModule.showAddress);//显示地址信息
app.post("/getAddressId.do",shopProModule.getAddressId);//查询地址Id
app.post("/editAddress.do",shopProModule.editAddress);//修改地址信息
app.post("/queryShopGoods.do",shopProModule.queryShopGoods);//加载购物车数据到订单提交页面
app.post("/addorder.do",shopProModule.addorder);//添加订单信息
app.post("/adddetails.do",shopProModule.adddetails);//添加订单详细
app.post("/deleteCart.do",shopProModule.deleteCart);//清空购物车
app.post("/getOrderId.do",shopProModule.getOrderId);//清空购物车
app.post("/changeIsPay.do",shopProModule.changeIsPay);//清空购物车
/*3.22修改*/
app.post("/queryOderGoods.do",shopProModule.queryOderGoods);//加载购物车数据到订单提交页面
app.post("/getOrderId.do",shopProModule.getOrderId);//
app.post("/getColor.do",cartModule.getGoodsImg);//购物车点击颜色换图片
app.post("/queryGoods.do",cartModule.queryGoodsCart);//从商城加入购物车
app.post("/getGoodsColor.do",cartModule.getGoodsColor);//点击修改后获得该商品的各种颜色
app.post("/primEdit.do",cartModule.primEdit);//点击确认修改后更改商品Id
app.post("/deleteGoods.do",cartModule.deleteGoods);//删除购物车数据
app.post("/cartUpdateManyGoods.do",cartModule.cartUpdateManyGoods);//直接购物车编辑产品数量



//蔡伟
app.post("/searchTemplateMaterial.do",searchDiyM.searchTemplateMaterial);//查询样板间
app.post("/searchFurniture.do",searchDiyM.searchFurniture);//查询产品素材
app.post("/searchColor.do",searchDiyM.searchColor);//查询产品配色
app.post("/collectionProduct.do",searchDiyM.collectionProduct);//打印diy订单信息
app.post("/searchColorProduct.do",searchDiyM.searchColorProduct);//更换产品颜色：画布中更换产品
app.post("/addOrderGoods.do",searchDiyM.addDiyOrderGoods);//添加diy订单详细表
app.post("/addDiyOrder.do",searchDiyM.addDiyOrder);//添加diy订单详细表
app.get("/diy",diy.checkProduct);
app.post("/getPageTotal.do",searchDiyM.pageNumCount);//素材分页
app.post("/uploadImg.do",fileDiyM.uploadImg);//上传图片

//郑皓灵

app.get("/showInfo.do",personalInfo.showInfo);
app.post("/saveInfo.do",personalInfo.saveInfo);
app.post("/changePwd.do",personalInfo.changePwd);
app.post("/change_header.do",personalInfo.change_header);
app.get("/showAddress.do",perAddress.showAddress);
app.get("/deleteAddress.do",perAddress.deleteAddress);
app.post("/peraddAddress.do",perAddress.peraddAddress);
app.get("/showOrder.do",perOrder.showOrder);
app.get("/selectPro.do",perOrder.selectPro);
app.get("/deleteOrder.do",perOrder.deleteOrder);
app.get("/showCollect.do",perCollect.showCollect);
app.get("/deleteCollect.do",perCollect.deleteCollect);
app.get("/addShoppingCart.do",perCollect.addShoppingCart);
app.get("/showDesign.do",perDesign.showDesign);
app.get("/selectDesignPro.do",perDesign.selectDesignPro);
app.get("/addDesignShop.do",perDesign.addDesignShop);
app.get("/perDeleteDo.do",perDesign.perDeleteDo);
//郭袁
app.get("/search.do",searchM.search);
app.get("/product",productM.checkProduct);
app.get("/product-details",detailsM.checkDetails);
app.get("/getpageTotal.do",pageM.pageNumCount);
app.get("/listall.do",pageM.queryAll);
app.get("/addShoppingCartPro.do",addM.addCartInfo);
app.get("/showProdutinfo.do",detailsM.showProductinfo);
app.get("/similarGoods.do",detailsM.similarGoods);
app.get("/priceControl.do",priceM.priceControl);
app.post("/addCollectionInfo.do",addCollectionM.addCollectionInfo);
app.get("/oldPrice.do",detailsM.oldPrice);
//王雎
app.get("/sjswork",production.showwork);
app.get("/sjsstylist",stylist.showstylist);


// ejs的拦截路径
app.get("/index",function(req,resp){
    resp.render("index",{});
});
app.get("/diyM",function(req,resp){
    resp.render("diyM",{});
});
app.get("/3DExhibition",function(req,resp){
    resp.render("3DExhibition",{});
});
app.get("/about",function(req,resp){
    resp.render("about",{});
});
app.get("/myCart",function(req,resp){
    resp.render("myCart",{});
});
app.get("/pay",function(req,resp){
    resp.render("pay",{});
});
app.get("/shoppingProcess",function(req,resp){
    resp.render("shoppingProcess",{});
});
app.get("/personal",function(req,resp){
    resp.render("personal",{});
});
app.get("/global",function(req,resp){
    resp.render("global",{});
});





/*
/!*测试数据*!/
app.get("/vip",productM.checkProduct);*/
