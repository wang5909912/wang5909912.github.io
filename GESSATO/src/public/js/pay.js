/**
 * Created by lenovo on 2017/3/10.
 */
//console.log($('input[type="radio"]:checked'));
var shopGoodsCount=0;
var payMoney=0;
queryAll();


$(".paypal label").css("display","block");
$('input[type="radio"]').parent().on("click",function(){
    $("label").css("display","none");
    $('input[type="radio"]').removeAttr("checked");
    $(this).find("label").css("display","block");
    $(this).attr("checked","checked");
    //console.log("111");
});
$('.shopPro-address>div').slice(2,5).children("span").on("click",function(){
    $("label").css("display","none");
    $('input[type="radio"]').removeAttr("checked");
    $(this).prev().children("input").attr("checked","checked");
    $(this).prev().children("label").css("display","block");
});

$(document).ready(function() {
    pay_Alipay();

});
function pay_Alipay(){
    var checkM=document.getElementsByClassName("checkM")[0];
    var paypal_id=document.getElementById("paypal_id");
    var pay_Alipay=document.getElementById("pay_Alipay");
    var pay_Wechat=document.getElementById("pay_Wechat");
    var pay_Unionpay=document.getElementById("pay_Unionpay");
    checkM.style.display="block";
    pay_Alipay.style.display="block";
    pay_Wechat.style.display="none";
    pay_Unionpay.style.display="none";
}
function pay_Wechat() {
    var checkM=document.getElementsByClassName("checkM")[0];
    var paypal_id=document.getElementById("paypal_id");
    var pay_Alipay=document.getElementById("pay_Alipay");
    var pay_Wechat=document.getElementById("pay_Wechat");
    var pay_Unionpay=document.getElementById("pay_Unionpay");
    checkM.style.display="block";
    pay_Alipay.style.display="none";
    pay_Wechat.style.display="block";
    pay_Unionpay.style.display="none";
}
function pay_Unionpay() {
    var checkM=document.getElementsByClassName("checkM")[0];
    var paypal_id=document.getElementById("paypal_id");
    var pay_Alipay=document.getElementById("pay_Alipay");
    var pay_Wechat=document.getElementById("pay_Wechat");
    var pay_Unionpay=document.getElementById("pay_Unionpay");
    checkM.style.display="block";
    pay_Alipay.style.display="none";
    pay_Wechat.style.display="none";
    pay_Unionpay.style.display="block";
}

function queryAll(){//加载时查询所有地址
    $.ajax({
        type:"post",
        url:"queryOderGoods.do",
        data:{
            order_id:sessionStorage.myOrderId,
            loginTel:sessionStorage.myTel
        },
        success:function(data){
            $(".shopActive").remove();
            for(let i=0;i<data.length;i++){
                $(".shopProInput").parent().before(
                    '<div class="col-lg-12 col-md-12 col-sm-12 shopActive"> ' +
                    '<div class="shopGoodsImg"> ' +
                    '<img src="../'+data[i].prd_char+'" alt="" class="img-responsive"/> ' +
                    '</div> ' +
                    '<div class="shopGoodsDes"> <p>'+data[i].prd_name+'</p> </div> ' +
                    '<div class="shopGoodsNum"> <p>'+data[i].prd_num+'</p> </div> ' +
                    '<div class="shopGoodsMoney">￥<p>'+data[i].prd_num*data[i].prd_money+'</p> </div> </div>');
            }
            //console.log($('.shopActive'));
            $('.shopActive').each(function(){
                console.log($(this).children(".shopGoodsMoney").children("p").html());
                shopGoodsCount+=parseInt($(this).children(".shopGoodsMoney").children("p").html());
            });
            payMoney=shopGoodsCount+parseInt($(".shopGoodsTrans span").html());
            $(".shopGoodsCount span").html(shopGoodsCount);
            $(".payMoney span:last-child").html("￥"+payMoney);
        },
        dataType:"json"
    });
}

//console.log($('.shopGoodsInformation>div').slice(1,3).children(".shopGoodsMoney").children("p"));
$('.shopGoodsInformation>div').slice(1,3).children(".shopGoodsMoney").children("p").each(function(){
    shopGoodsCount+=parseInt($(this).html());
});
payMoney=shopGoodsCount+parseInt($(".shopGoodsTrans span").html());
$(".shopGoodsCount span").html(shopGoodsCount);
$(".payMoney span:last-child").html("￥"+payMoney);
//获取sessionStorage订单地址
getSession();
function getSession(){
    var getObj=sessionStorage.myObj;
    var realObj=JSON.parse(getObj);
    console.log(realObj);
    $(".payAddress-info span").html(realObj.province+"省&nbsp;&nbsp;"+realObj.city+"市&nbsp;&nbsp;"+realObj.area+"&nbsp;&nbsp;"+realObj.phone);
    $(".payName span").html(realObj.name);
    $(".payPhone span").html(realObj.address);
}
$(".cart-pay").on("click",function(){
    $.ajax({
        type:"post",
        url:"changeIsPay.do",
        data:{
            order_id:sessionStorage.myOrderId
        },
        success:function(data){
            $(".test").append('<p>付款成功</p>');
            $("#pay_hei").fadeIn(100);
            $(".test").slideDown(500);
            setTimeout('location.href="index"',2400)
        }
    })
});



