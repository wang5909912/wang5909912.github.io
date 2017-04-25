queryGoods();
var num;
var money=0;

/*//添加购物车
 function addCartInfo(){
 $.ajax({
 type:"post",
 url:"deleteGoods.do",
 data:{
 loginTel:sessionStorage.myTel,//登录或注册的电话号码
 prd_id:,//产品Id
 goods_num://商品数量
 },
 success:function(data){}
 });
 }*/
/*增减商品数量*/
countAll();
/*页面加载全部购物车数据*/
function queryGoods(){
    $.ajax({
        type:"post",
        url:"queryGoods.do",
        data:{
            //goodsId:""
            loginTel:sessionStorage.myTel
        },success:function(data){
            console.log(data);
            if(data.length==0){

            }else{
                for(let i=0;i<data.length;i++){
                    let cartHtml='<div class="col-lg-12 col-md-12 col-sm-12 cart-information"> ' +
                        '<img src="../'+data[i].prd_char+'" alt="" class="col-lg-2 col-md-2 col-sm-2"/> ' +
                        '<p class="col-lg-3 col-md-3 col-sm-3 cart-goodsMessage">'+data[i].prd_name+'</p> ' +
                        '<p class="col-lg-1 col-md-1 col-sm-1 cart-messageEdit"> ' +
                        '<span onclick="cartEditColor(this)">修改</span></p> ' +
                        '<p class="col-lg-1 col-md-1 col-sm-1 cart-goodsSale">￥<span>'+data[i].prd_money+'</span></p> ' +
                        '<p class="col-lg-2 col-md-2 col-sm-2 cart-goodsNum"> ' +
                        '<span class="row"> <span class="col-lg-3 col-md-3 col-sm-4 cart-minus" onclick="cartNumDes(this)"><i class="iconfont icon-minus"></i></span> ' +
                        '<span class="cart-num col-lg-6 col-md-6 col-sm-4" contenteditable="true" onfocus="cartNumFocus(this)" onblur="cartNumBlur(this)">'+parseInt(data[i].goods_num)+'</span> ' +
                        '<span class="col-lg-3 col-md-3 col-sm-4 cart-plus" onclick="cartNumUp(this)"><i class="iconfont icon-plus"></i></span></p> ' +
                        '<p class="col-lg-1 col-md-1 col-sm-1 cart-goodsCount">￥<span>'+parseInt(data[i].prd_money)*parseInt(data[i].goods_num)+'</span></p> ' +
                        '<span class="cart-delete" onclick="cartDelete(this)"><i class="iconfont icon-delete"></i></span> </div>';
                    $(".cart-countDiv").before(cartHtml);
                }
                countMoney();
            }

        },
        dataType:"json"
    })
    /* //加入购物车事件
     $.ajax({
     type:"post",
     url:"addShoppingCart.do",
     data:{
     shoppingId:1,
     userId:sessionStorage.myTel
     },
     success:function(data){
     console.log(data)
     },
     dataType:"json"
     })*/
}
/*直接编辑产品数量 focus事件*/
function cartNumFocus(obj){
    $(obj).css({"box-shadow":"none","outline":"none","border":"none"});
    num=$(obj).html();
}
/*直接编辑产品数量 blur事件*/
function cartNumBlur(obj){
    if($(obj).html()>1){
        num=$(obj).html();
        $(obj).html(num);
        cartNumChange(obj);
    }else{
        $(obj).html(num);
    }
    countMoney(obj);
    console.log(num)
}
/*通过减号编辑数量*/
function cartNumDes(obj){
    num=$(obj).siblings(".cart-num").html();
    if(num>1){
        num--;
    }
    cartNumChange(obj);
    $(obj).siblings(".cart-num").html(num);
    countMoney(obj);
}
/*通过加号编辑数量*/
function cartNumUp(obj){
    num=$(obj).siblings(".cart-num").html();
    num++;
    cartNumChange(obj);
    $(obj).siblings(".cart-num").html(num);
    countMoney(obj);
}
/*编辑数量并传num给数据库的ajax*/
function cartNumChange(obj){
    let str=$(obj).parents(".cart-goodsNum").siblings("img").get(0).src;
    $.ajax({
        type:"post",
        url:"cartUpdateManyGoods.do",
        data:{
            goodsNum:num,
            goodsSrc:imgSrcSplit(str)
        },
        success:function(data){
            console.log(data);
        }
    });
}
/*计算单个商品价格*/
function countMoney(obj){
    let goods=$(obj).parents(".cart-goodsNum");
    let sale=goods.siblings(".cart-goodsSale").children().html()*num;
    $(obj).parent().children(".cart-num").html(num);
    console.log(obj);
    goods.siblings(".cart-goodsCount").children().html(sale);
    countAll();
}
/*计算整个订单价格*/
function countAll(){
    money=0;
    $(".cart-goodsCount span").each(function(){
        money+=parseInt($(this).html());
    });
    $(".cart-countAll").html("￥<span>"+money+"</span>");
}
/*点击修改出现的弹窗*/
function cartEditColor(obj){
    $(".cart-edit").remove();
    $(obj).before('<div class="container-fluid cart-edit"> ' +
        '<div class="row"> <div class="col-lg-12 col-md-12 col-sm-12"> ' +
        '<span class="cart-edit-del" onclick="cartEditDelete(this)"><i class="iconfont icon-delete" ></i></span>'+
        '<img src="" alt="" class="col-lg-3 col-md-3 col-sm-3" id="cart_edit_img"/>' +
        ' <div class="cart-edit-info col-lg-7 col-md-7 col-sm-7">' +
        ' <p class="col-lg-12 col-md-12 col-sm-12">￥<span>'+$(obj).parent().siblings(".cart-goodsSale").children().html()+'</span></p> ' +
        '<p class="col-lg-11 col-md-11 col-sm-11">今天下单，将于<span>2017-03-13</span>前发货，大件家具会致电确认</p> ' +
        '<p class="col-lg-12 col-md-12 col-sm-12 colorOfGoods">' +
        '<span class="col-lg-3 col-md-3 col-sm-4">面料颜色 :</span></p>' +
        ' <div class="col-lg-11 col-md-11 col-sm-11 cart-edit-prim" onclick="cartPrim(this)">确 认 修 改</div> ' +
        '</div></div></div></div>');
    var str=$(obj).parent().siblings("img").get(0).src;
    var result=str.split('/');
    var real=result[result.length-1];
    //imgSrcSplit(str)
    console.log(real);
    /*通过现在的图片路径去找他的其他颜色图片*/
    $("#cart_edit_img").get(0).src="../images/"+real;
    $.ajax({
        type:"post",
        url:"getGoodsColor.do",
        data:{
            cartColorImgSrc:"images/"+real
        },
        success:function(data){
            console.log(data.length);
            $(".cart-edit-color").remove();
            for(let i=0;i<data.length;i++){
                $(".colorOfGoods span:first-child").after('<span class="cart-edit-color col-lg-1 col-md-2 col-sm-3" onclick="getImg(this)"><img src="../'+data[i].col_url+'"alt=""/></span>')
            }
        }
    });

    $(document).on("click",function (){
        $(".cart-edit").remove();
    });
    event.stopPropagation();//阻止事件向上冒泡
    $(".cart-edit").on("click",function(event){
        event.stopPropagation();//阻止事件向上冒泡
    });
}
/*得到该商品的所有颜色*/
function getImg(obj){
    $(obj).parent().children(".cart-edit-color").attr("id","");
    $(obj).attr("id","cart_active");
    var str=$(obj).children().get(0).src;
    $.ajax({
        type:"post",
        url:"getColor.do",
        data:{
            colorSrc:imgSrcSplit(str)
        },
        success:function(data){
            console.log(data);
            let src=data[0].prd_char;
            $("#cart_edit_img").get(0).src="../"+imgSrcSplit(src);
        },
        dataType:'json'
    })
}
/*remove修改弹窗*/
function cartEditDelete(){
    $(".cart-edit").remove();
}
/*确认修改*/
function cartPrim(obj){
    console.log();
    console.log($(obj).parent().prev().get(0).src);
    let str=$(obj).parent().prev().get(0).src;
    let pri=$(obj).parents(".cart-messageEdit").siblings("img").get(0).src;

    $.ajax({
        type:"post",
        url:"primEdit.do",
        data:{
            prdImg:imgSrcSplit(str),//现在的图片路径
            goodsImg:imgSrcSplit(pri)//修改前的图片路径
        },
        success:function(data){
            console.log(data);
        }
    });
    $(obj).parents(".cart-messageEdit").siblings("img").get(0).src="../"+imgSrcSplit(str);
    $(".cart-edit").remove();
}
/*删除一条购物车商品数据*/
function cartDelete(obj){
    let str=$(obj).siblings("img")[0].src;
    $.ajax({
        type:"post",
        url:"deleteGoods.do",
        data:{
            prdImg:imgSrcSplit(str)//现在的图片路径
        },
        success:function(data){
            $(obj).parents(".cart-information").remove();
            countAll();
        }
    });
}
/*截取图片路径*/
function imgSrcSplit(str){
    var result=str.split('/');
    var real="images/"+result[result.length-1];
    return real;
}
