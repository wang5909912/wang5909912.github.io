/*查询函数ajax*/
"use strict"
var pageCount=3;
let pageNum=1;//当前在第几页
var pageTotal;//总页数
var id;
var prdId;
var pageId;
$(".space").click(function(){
    if($(this).hasClass("ps_active")){
        $(this).removeClass("ps_active")
    }
    else{
        $(this).parent().parent().find(".ps_active").removeClass("ps_active")
        $(this).addClass("ps_active")
    }
   pageShow();
});
function pageShow(){
    var param=[]
    //console.log($("#menu2").find("a").hasClass("ps_active"))
    for(var i=2;i<9;i++){
        if($("#menu"+i).find("a").hasClass("ps_active")){
            param.push($("#menu"+i).find(".ps_active").html());
        }else{
            param.push(null);
        }
    }
    $.ajax({
        type:"get",
        url:"/search.do",
        data:{
            spaceStyle :param,
            pageNum:null,
            pageCount:null,
            prdOrderBy:$("select[name='select']").val(),
            prd_money1:$( "#slider-range" ).slider( "values", 0 ),
            prd_money2:$( "#slider-range" ).slider( "values", 1 )
        },
        success:function(data){
            //let data1 = JSON.parse(data);
            //console.log(data);
            let zzz=data.length;
            pageTotal = Math.ceil(zzz/pageCount);
            console.log(pageTotal)
            show(pageNum,param,pageCount);
            $(".shop-page").html("");
            $(".shop-page").html("<li id='arrowAfter'><a href='javascript:void(0)' class='arrow'  onclick='prevPage();'>&#xe62c;</a></li>")
            for(var i=parseInt(pageTotal);i>=1;i--){
                $("#arrowAfter").after("<li><a href='javascript:void(0)' onclick='pageControl("+i+");'>"+i+"</a></li>")
                $(".product-count").html("显示1-"+parseInt(pageTotal)+"")
            }
            $(".shop-page").html($(".shop-page").html()+"<li><a href='javascript:void(0)' class='arrow'  onclick='nextPage();'>&#xe77b;</a></li>")
        }
    })
}

function show(pageNum,arr,pageCount){
    $.ajax({
        type:"get",
        url:"/search.do",
        data:{
            spaceStyle:arr,
            pageNum:pageNum,
            pageCount:pageCount,
            prdOrderBy:$("select[name='select']").val(),
            prd_money1:$( "#slider-range" ).slider( "values", 0 ),
            prd_money2:$( "#slider-range" ).slider( "values", 1 )
        },
        success:function(data){
            //console.log(data);

            $("#ajaxSuccess").html("");
            $("#profile").html("");
            for(let i=0;i<data.length;i++){
                var id=data[i].prd_id;
                $("#ajaxSuccess").html($("#ajaxSuccess").html()+
                "<div class='col-md-4 col-sm-6'>"+
                "<div class='product-wrapper mb-40'>"+
                "<div class='product-img'>"+
                "<a href=product-details?prd_id="+data[i].prd_id+"><img src="+data[i].prd_char+" alt=''/></a>"+
                "<span class='new-label'>NEW</span>"+
                "<div class='product-action'>"+
                "<a href='javascript:void(0)'>"+
                "<span class='iconfont' aria-hidden='true' onclick='addShopInfo("+data[i].prd_id+",this)'>&#xe6e4;</span>"+
                "</a>"+
                "<a href='javascript:void(0)'>"+
                "<span class='iconfont' aria-hidden='true' onclick='addCollectionInfo("+data[i].prd_id+")'>&#xe641;</span>"+
                "</a>"+
                "<a href='javascript:void(0)' class='cut-off' data-toggle='modal' data-target='#productModal'><span class='iconfont' aria-hidden='true' onclick='showProductinfo("+data[i].prd_id+");'>&#xe60f;</span>"+
                "</a>"+
                "</div>"+
                "</div>"+
                "<div class='product-content'>"+
                "<div class='pro-title'>"+
                "<h3><a href=product-details?prd_id="+data[i].prd_id+">"+data[i].prd_name+"</a>"+
                "</h3>"+
                "</div>"+
                "<div class='price-reviews'>"+
                "<div class='price-box'>"+
                "<span class='price product-price'>$"+data[i].prd_money+".00</span>"+
                "<span class='old-price product-price'>$"+parseInt(parseInt(data[i].prd_money)+parseInt(200))+".00</span>"+
                "</div>"+
                "<div class='pro-rating'>"+
                "<a href='#'><i class='fa fa-star-o'></i></a>"+
                "<a href='#'><i class='fa fa-star-o'></i></a>"+
                "<a href='#'><i class='fa fa-star-o'></i></a>"+
                "<a href='#'><i class='fa fa-star-o'></i></a>"+
                "<a href='#'><i class='fa fa-star-o'></i></a>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div>")
                $("#profile").html( $("#profile").html()+
                "<div class='row mb-50' >"+
                "<div class='col-xs-5 col-sm-5 col-md-4'>"+
                "<div class='product-wrapper'>"+
                "<div class='product-img'>"+
                "<a href=product-details?prd_id="+data[i].prd_id+"><img src="+data[i].prd_char+" alt=''></a>"+
                "<span class='new-label'>New</span>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "<div class='col-xs-7 col-sm-7 col-md-8'>"+
                "<div class='product-content product-list'>"+
                "<div class='pro-title'>"+
                "<h3><a href=product-details?prd_id="+data[i].prd_id+">"+data[i].prd_name+" </a></h3>"+
                "</div>"+
                "<div class='price-reviews'>"+
                "<div class='price-box'>"+
                "<span class='price product-price'>$"+data[i].prd_money+"</span>"+
                "</div>"+
                "</div>"+
                "<p>"+data[i].prd_text+"</p>"+
                "<div class='product-action'>"+
                "<a class='cart' href='javascript:void(0)'><span onclick='addShopInfo("+data[i].prd_id+",this)'>加入购物车</span></a>"+
                "<a href='javascript:void(0)'><span class='iconfont colorfont' onclick='addCollectionInfo("+data[i].prd_id+")'>&#xe667;</span></a>"+
                "<a href='javascript:void(0)'><span class='iconfont colorfont' onclick='addCollectionInfo("+data[i].prd_id+")'>&#xe641;</span></a>"+
                "<a href='javascript:void(0)' class='cut-off' data-toggle='modal' data-target='#productModal'><span class='iconfont colorfont' onclick='showProductinfo("+data[i].prd_id+");'>&#xe60f;</span></a>"+
                "</div>"+
                "<div class='color-list'>"+
                "<a href='#'></a>"+
                "<a href='#'></a>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div>")
            }
        }
    })
}
/***************分页*****************/

  //当前在第几页
window.onload=function(){
    getPageTotal();
    listAll();
}
/*求得总页数*/
function getPageTotal(){
    var obj = {
        test:1,
        test2:function(){
            console.log(this);
        }
    };
    obj.test2();

    var xhr;
    if(window.XMLHttpRequest){
//            console.log(window.XMLHttpRequest);
        xhr = new XMLHttpRequest();
    }else if(window.ActiveXObject){
//            console.log(window.ActiveXObject);  //6以下
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            //console.log(xhr.responseText);
            pageTotal = xhr.responseText;
            $("#arrowAfter").after("");
            for(var i=parseInt(pageTotal);i>=1;i--){
                $("#arrowAfter").after("<li><a href='javascript:void(0)' onclick='pageControl("+i+");'>"+i+"</a></li>")
                $(".product-count").html("显示1-"+parseInt(pageTotal)+"")
            }
        }

    }
    xhr.open("get","/getPageTotal.do");
    xhr.send(null);
}

/*显示每一页的内容*/
function listAll(){
    var tab = document.getElementById("ajaxSuccess");
    var tabpanel=document.getElementById("profile");
    var xhr;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else if(window.ActiveXObject){
        xhr=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200) {
            let data = JSON.parse(xhr.responseText);
            //console.log(data);
            $("#ajaxSuccess").html("");
            $("#profile").html("");
            for (let i = 0; i < data.length; i++) {
                tab.innerHTML += "<div class='col-md-4 col-sm-6'>" +
                "<div class='product-wrapper mb-40'>" +
                "<div class='product-img'>" +
                "<a href=product-details?prd_id="+data[i].prd_id+"><img src=" + data[i].prd_char + " alt=''/></a>" +
                "<span class='new-label'>NEW</span>" +
                "<div class='product-action'>" +
                "<a href='javascript:void(0)'>" +
                "<span class='iconfont' aria-hidden='true' onclick='addShopInfo("+data[i].prd_id+",this)'>&#xe6e4;</span>" +
                "</a>" +
                "<a href='javascript:void(0)'>" +
                "<span class='iconfont' aria-hidden='true' onclick='addCollectionInfo("+data[i].prd_id+")'>&#xe641;</span>" +
                "</a>" +
                "<a href='javascript:void(0)' class='cut-off' data-toggle='modal' data-target='#productModal'><span class='iconfont' aria-hidden='true' onclick='showProductinfo("+data[i].prd_id+");'>&#xe60f;</span>" +
                "</a>" +
                "</div>" +
                "</div>" +
                "<div class='product-content'>" +
                "<div class='pro-title'>" +
                "<h3><a href=product-details?prd_id="+data[i].prd_id+">" + data[i].prd_name + "</a>" +
                "</h3>" +
                "</div>" +
                "<div class='price-reviews'>" +
                "<div class='price-box'>" +
                "<span class='price product-price'>$" + data[i].prd_money + ".00</span>" +
                "<span class='old-price product-price'>$"+parseInt(parseInt(data[i].prd_money)+parseInt(200))+".00</span>" +
                "</div>" +
                "<div class='pro-rating'>"+
                "<a href='#'><i class='fa fa-star-o'></i></a>"+
                "<a href='#'><i class='fa fa-star-o'></i></a>"+
                "<a href='#'><i class='fa fa-star-o'></i></a>"+
                "<a href='#'><i class='fa fa-star-o'></i></a>"+
                "<a href='#'><i class='fa fa-star-o'></i></a>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div>"
                tabpanel.innerHTML +=
                "<div class='row mb-50' >"+
                "<div class='col-xs-5 col-sm-5 col-md-4'>"+
                "<div class='product-wrapper'>"+
                "<div class='product-img'>"+
                "<a href=product-details?prd_id="+data[i].prd_id+"><img src="+data[i].prd_char+" alt=''></a>"+
                "<span class='new-label'>New</span>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "<div class='col-xs-7 col-sm-7 col-md-8'>"+
                "<div class='product-content product-list'>"+
                "<div class='pro-title'>"+
                "<h3><a href=product-details?prd_id="+data[i].prd_id+">"+data[i].prd_name+" </a></h3>"+
                "</div>"+
                "<div class='price-reviews'>"+
                "<div class='price-box'>"+
                "<span class='price product-price'>$"+data[i].prd_money+"</span>"+
                "</div>"+
                "</div>"+
                "<p>"+data[i].prd_text+"</p>"+
                "<div class='product-action'>"+
                "<a class='cart' href='javascript:void(0)'><span onclick='addShopInfo("+data[i].prd_id+",this)'>加入购物车</span></a>"+
                "<a href='javascript:void(0)'><span class='iconfont colorfont' onclick='addCollectionInfo("+data[i].prd_id+")'>&#xe667;</span></a>"+
                "<a href='javascript:void(0)'><span class='iconfont colorfont'>&#xe641;</span></a>"+
                "<a href='javascript:void(0)' class='cut-off' data-toggle='modal' data-target='#productModal'><span class='iconfont colorfont' onclick='showProductinfo("+data[i].prd_id+");'>&#xe60f;</span></a>"+
                "</div>"+
                "<div class='color-list'>"+
                "<a href='#'></a>"+
                "<a href='#'></a>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div>"
            }
        }
        }
    xhr.open("get","/listall.do?pageNum="+pageNum+"",true);
    xhr.send(null);
}

function nextPage(){
    pageNum++;
    if(pageNum>pageTotal){
//            alert("这是最后一页了");
        pageNum--;
    }else{
        pageShow();
    }
}

function prevPage(){
    pageNum--;
    if(pageNum<=0){
        pageNum=1;
    }
    pageShow();
}

function pageControl(pageId){
    pageNum = pageId;
    //$(".pageControl").addClass("pageActive").siblings(".pageControl").removeClass("pageActive");
    pageShow();
}


//加入购物车事件
    function addCartInfo(id){


        if(sessionStorage.myTel){

            var cart = $('.shopping-cart');
            var imgtodrag = $(".tb-pic").find("img").eq(0);
            if (imgtodrag) {
                var imgclone = imgtodrag.clone()
                    .offset({
                        top: imgtodrag.offset().top,
                        left: imgtodrag.offset().left
                    })
                    .css({
                        'opacity': '0.5',
                        'position': 'absolute',
                        'height': '150px',
                        'width': '150px',
                        'z-index': '100000'
                    })
                    .appendTo($('body'))
                    .animate({
                        'top': cart.offset().top + 10,
                        'left': cart.offset().left + 10,
                        'width': 75,
                        'height': 75
                    }, 1000,'');

                imgclone.animate({
                    'width': 0,
                    'height': 0
                }, function () {
                    $(this).detach()
                });
            }

            var num =$(".goods_number").val();
            console.log(num)
            $.ajax({
                type:"get",
                url:"addShoppingCartPro.do",
                data:{
                    loginTel:sessionStorage.myTel,//登录或注册的电话号码
                    prd_id:id,//产品Id
                    goods_num:num//商品数量
                },
                success:function(data){}
            });
         }else{
             cambiar_login();
         }
    }

/**222加入购物车*/
 function addShopInfo(id,obj){


    console.log("jinlail")
     if(sessionStorage.myTel){

         var cart = $('.shopping-cart');
         var imgtodrag = $(obj).parents(".product-img").find("img").eq(0);
         console.log(imgtodrag)
         if (imgtodrag) {
             var imgclone = imgtodrag.clone()
                 .offset({
                     top: imgtodrag.offset().top,
                     left: imgtodrag.offset().left
                 })
                 .css({
                     'opacity': '0.5',
                     'position': 'absolute',
                     'height': '150px',
                     'width': '150px',
                     'z-index': '100000'
                 })
                 .appendTo($('body'))
                 .animate({
                     'top': cart.offset().top + 10,
                     'left': cart.offset().left + 10,
                     'width': 75,
                     'height': 75
                 }, 1000,'');

             imgclone.animate({
                 'width': 0,
                 'height': 0
             }, function () {
                 $(this).detach()
             });
         }

         $.ajax({
            type:"get",
            url:"addShoppingCartPro.do",
            data:{
                loginTel:sessionStorage.myTel,//登录或注册的电话号码
                prd_id:id,//产品Id
                goods_num:1//商品数量
            },
            success:function(data){}
        });
      }else{
          cambiar_login();
      }
}

/********加入收藏夹*/
function addCollectionInfo(id){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var mydate = year+'-'+month+'-'+day;
    if(sessionStorage.myTel){
        $.ajax({
            type:"post",
            url:"addCollectionInfo.do",
            data:{
                loginTel:sessionStorage.myTel,//登录或注册的电话号码
                prd_id:id,//产品Id
                collect_data:mydate,
                is_expired:0
            },
            success:function(data){}
        });
    }else{
        cambiar_login();
    }

}

/************************排序*********************/

$("select[name='select']").on("change",function(){
    pageShow();
})

$("select[name='select2']").on("change",function(){
    pageCount=$("select[name='select2']").val();
    pageShow();

})
/****************模态框*******************/
function showProductinfo(prdId){
//console.log(prdId)
    $.ajax({
        type:"get",
        url:"showProdutinfo.do",
        data:{
            prd_id:prdId
        },
        success:function(data){
            console.log(data);
            $(".modal-img img").attr('src',data[0].prd_char);
            $(".modal-pro-content a").eq(0).html(data[0].prd_name);
            $(".price span").eq(0).html("$"+data[0].prd_money);
            $(".old").eq(0).html("$"+parseInt(parseInt(data[0].prd_money)+parseInt(200)))
            $(".modal-body p").html(data[0].prd_text);
            $(".cart-car").click(function(){
                addCartInfo(prdId);
            })
        }
    })
}


/**************同类商品*******************/
//window.onload =function(){
//    similarGoods(prdId);
//}
function similarGoods(prdId){
    $.ajax({
        type:"get",
        url:"similarGoods.do",
        data:{
            prd_id:prdId
        },
        success:function(data){
            $("#similarGoods").html("");
            for(let i=0;i<=data.length;i++){
                $("#similarGoods").html($("#similarGoods").html()+
                "<div class='owl-item active' style='width:292.5px;margin-right:0;'>"+
                "<div class='col-md-12'>"+
                "<div class='product-wrapper mb-40 mrg-nn-xs'>"+
                "<div class='product-img'><a href=product-details?prd_id="+data[i].prd_id+"><img src="+data[i].prd_char+" /></a>"+
                "<span class='new-label'>New</span>"+
                "<div class='product-action'>"+
                "<a href='javascript:void(0)'>"+
                "<span class='iconfont' aria-hidden='true' onclick='addShopInfo("+data[i].prd_id+",this)'>&#xe6e4;</span>"+
                "</a>"+
                "<a href='javascript:void(0)'>"+
                "<span class='iconfont' aria-hidden='true' onclick='addCollectionInfo("+data[i].prd_id+")'>&#xe641;</span>"+
                "</a>"+
                "<a href='javascript:void(0)' class='cut-off' data-toggle='modal' data-target='#productModal'>" +
                "<span class='iconfont' aria-hidden='true' onclick='showProductinfo("+data[i].prd_id+");'>&#xe60f;</span>"+
                "</a>"+
                "</div>"+
                "</div>"+
                "<div class='product-content'>"+
                "<div class='pro-title'>"+
                "<h3><a href=product-details?prd_id="+data[i].prd_id+">"+data[i].prd_name+"</a></h3>"+
                "</div>"+
                "<div class='price-reviews'>"+
                "<div class='price-box'>"+
                "<span class='price product-price'>$"+data[i].prd_money+".00</span>"+
                "<span class='old-price product-price'>$"+parseInt(parseInt(data[i].prd_money)+parseInt(200))+".00</span>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div>")
            }
        }
    })
}

/*******************oldPrice*******************/
function oldPrice(prdId){
    $.ajax({
        type: "get",
        url: "oldPrice.do",
        data: {
            prd_id: prdId
        },
        success: function (data) {
            console.log(data)
            $("#oldPrice").html("$"+parseInt(parseInt(data[0].prd_money)+parseInt(200))+".00")
        }
    })
}
/***************价格范围*******************/
    $("#slider-range span").mouseup(function(){
        var left = $( "#slider-range" ).slider( "values", 0 );
        var right = $( "#slider-range" ).slider( "values", 1 );
       pageShow();
    })
