/**
 * Created by Administrator on 2017/3/9 0009.
 */

$(document).ready(function () {
    perShowInfo();
    $(".per_nav_header div a").text(sessionStorage.myTel)
})

$("#change_header .my_sure_btn" ).on("click",function () {
    perShowInfo();
    window.location.reload();
})

/*申请售后所有事件*/
/*选择改变样式*/
$("#customer_service ul li").on("click",function () {
    $("#customer_service ul li").css({outline:"1px solid rgba(0,0,0,.2)"});
    $(this).css({outline:"1px solid #ffcc66"})

})


/*在个人信息页面点击地址的时候进行跳转*/
$(".per_info_address").on("click",function () {
    showAddress()
    $(".per_information").css({display:"none"});
    $(".per_address").css({display:"block"});
})


/*输入框友好提示*/
$(".per_describe_text").on("input",function () {
    var theLength=200-parseInt($(this).val().length);
    /*console.log(theLength);*/
    $(".per_describe").html("描述最多输入"+theLength+"字");    /*友好型提示*/
    if(theLength<=0){
        $(this).css({borderColor:"red"});
    }else if(theLength>0){
        $(this).css({borderColor:"rgba(169,169,169,1)"});
    }
})

/*售后中选择商品的下拉框*/
function perApplyAdd(i) {
    $(".per_choose_thing select").html("<option>全部商品</option>");
    console.log($(i).parentsUntil("tr"));
    var allInfo=$(i).parentsUntil("tr").prevAll(".col-lg-6").find("span").text();/*获取到所有的值*/
    var getAllInfo=allInfo.split(" ");
    getAllInfo.pop();
    console.log(getAllInfo);
    for(var i=0;i<getAllInfo.length;i++){
        $(".per_choose_thing select").html($(".per_choose_thing select").html()+"<option>"+getAllInfo[i]+"</option>")
    }
}

$(".per_order_time p").on("mouseover",function () {
    $(".per_order_time_choose ul").css({display:"block"});
})

/*订单表个人地址的显示*/
/*
 $(".per_order_body tr:nth-of-type(3) td:nth-of-type(2)>p").on("mouseover",function () {
 $(this).next().css({display:"block"});
 })

 $(".per_order_body tr:nth-of-type(3) td:nth-of-type(2)>p").on("mouseout",function () {
 $(this).next().css({display:"none"});
 })

 */



/*
 $(".change_head").on("click",function () {
 var options =
 {
 thumbBox: '.thumbBox',
 spinner: '.spinner',
 imgSrc: 'images/avatar.png'
 }
 var cropper = $('.imageBox').cropbox(options);
 $('#upload-file').on('change', function(){
 var reader = new FileReader();
 reader.onload = function(e) {
 options.imgSrc = e.target.result;
 cropper = $('.imageBox').cropbox(options);
 }
 reader.readAsDataURL(this.files[0]);
 this.files = [];
 })
 $('#btnCrop').on('click', function(){
 var img = cropper.getDataURL();
 $('.cropped').html('');
 $('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:64px;margin-top:4px;border-radius:64px;box-shadow:0px 0px 12px #7E7E7E;" ><p>64px*64px</p>');
 $('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:128px;margin-top:4px;border-radius:128px;box-shadow:0px 0px 12px #7E7E7E;"><p>128px*128px</p>');
 $('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:180px;margin-top:4px;border-radius:180px;box-shadow:0px 0px 12px #7E7E7E;"><p>180px*180px</p>');
 })
 $('#btnZoomIn').on('click', function(){
 cropper.zoomIn();
 })
 $('#btnZoomOut').on('click', function(){
 cropper.zoomOut();
 })
 })
 */








/*--------用户信息有关的--------*/
/*在页面加载之后，获取用户的资料，第一次若没有，则不显示，并提示用户去完善信息*/
function perShowInfo() {
    $.ajax({
        url:"showInfo.do",
        type:"get",
        data:{
            login_tel:sessionStorage.myTel    /*通过login_id去判断账号*/
        },
        success:function (data) {
            if(data!=null){
                let theDate=new Date(data[0].user_birth);
                let theYear=theDate.getFullYear();
                let theMonth=theDate.getMonth()+1;
                let theDay=theDate.getDay();
                $("#per_name").val(data[0].user_name);
                $("#per_email").val(data[0].user_email);
                $(".per_avatar img").attr("src","../images/personal/"+data[0].user_url);
                $("#per_bir").val(theYear+"年"+theMonth+"月"+theDay+"日");
                $("#per_tel").val(data[0].login_tel);
                $("#per_pro").val(data[0].user_profession);
                $(".per_choose_sex").each(function (i) {    /*性别的设置   0为男 1为女  循环去判断*/
                    if($(this).val()==data[0].user_sex){
                        $(this).attr("checked","checked");
                    }
                })
            }
        }
    })
}

/*$(".my_sure_btn").on("click")*/

$(".per_information_li").on("click",function () {
    $(".per_content>.container>div:not(:first-of-type)").css({display:"none"});
    perShowInfo();
    $(".per_information").css({display:"block"});
})

function showtsxx() {
    $("#pay_hei").fadeIn(100);
    $(".test").slideDown(500);
    $("#pay_hei").fadeOut(1800);
}

/*用户信息的修改或者增加。在后台判断为增加或者修改*/
$(".per_inf_sub").on("click",function () {
    $.ajax({
        url:"saveInfo.do",
        type:"post",
        data:{
            user_name:$("#per_name").val(),
            user_email:$("#per_email").val(),
            user_birth:$("#per_bir").val(),
            user_sex:$("input.per_choose_sex:checked").val(),
            user_profession:$("#per_pro").val(),
            login_tel:sessionStorage.myTel    /*通过login_id去判断账号*/
        },
        success:function (data) {
            /*console.log(data);*/
            perShowInfo();
            showtsxx();
        }
    })
})

/*修改密码*/
$("#change_pwd .my_sure_btn").on("click",function () {
    $.ajax({
        url:"changePwd.do",
        type:"post",
        data:{
            oldPwd:$("#per_old_pwd").val(),
            newPwd:$("#per_sure_pwd").val(),
            login_tel:sessionStorage.myTel    /*通过login_id去判断账号*/
        },
        success:function (data) {
            /*console.log(data);*/
            showtsxx();
        }
    })
    $(this).parentsUntil(".modal").parent().modal('hide');
})

/*修改密码模态框在隐藏时把所有的清空*/
$("#change_pwd").on("hidden.bs.modal",function () {
    /*    console.log($(this).find("input"));*/
    $(this).find("input").val("");
    /*$("form").data('bootstrapValidator').resetForm();*/
    $("#registerFormPwd").data('bootstrapValidator').destroy();
    $('#registerFormPwd').data('bootstrapValidator', null);
    checkForm();
});
$(".my_sure_btn").on("click",function () {
    setTimeout("$(this).parentsUntil('.modal').parent().modal.get(0).('hide')",300);
})

/*头像上传*/
$("#change_header .my_sure_btn").on("click",function () {
    var imgDataUrl=$(".cropped img").get(0).src;
    /* console.log(imgDataUrl);*/
    $.ajax({
        type:"post",
        url:"change_header.do",
        data:{
            imgData:imgDataUrl,
            login_tel:sessionStorage.myTel
        },
        success:function (data) {
            /*console.log(data);*/
        }
    })
})








/*--------地址有关的--------*/
/*显示地址的数据*/
function showAddress() {
    console.log("进来了。。。。。。。。。。。。。")
    $.ajax({
        url:"showAddress.do",
        type:"get",
        data:{
            login_tel:sessionStorage.myTel    /*通过login_id去判断账号*/
        },
        success:function (data) {
            /*console.log(data)*/
            $(".per_address_show").html("");
            for(var i=0;i<data.length;i++){
                $(".per_address_show").html($(".per_address_show").html()+
                    "<div class='col-lg-4 col-md-4 col-sm-4'> " +
                    "<div class='per_address_show_name'> " +
                    "<p>"+data[i].address_pre+data[i].address_city+"("+data[i].address_name+")</p> " +
                    "</div> " +
                    "<div class='per_address_show_address'> " +
                    "<p>地址："+data[i].address_pre+data[i].address_city+data[i].address_area+data[i].address_concrete+"</p> " +
                    "</div> " +
                    "<div class='er_address_show_tel'> " +
                    "<p>电话："+data[i].address_tel+"</p> " +
                    "</div> " +
                    "<strong onclick='deleteAddress("+data[i].address_id+")'>&#xe609;</strong> " +
                    "<button class='change_address btn' data-toggle='modal' data-target='#change_address' onclick='insertAddressId(0,"+JSON.stringify(data[i])+")'>修改地址</button>"+       /*直接传data[i]传过去接受时会出错  一定要转格式！！！！*/
                    "</div>")
            }
            /*长度为获取过来的data的长度。*/
            $(".per_address>header>div:nth-of-type(2)").html("<p>您已创建"+data.length+"个地址，最多可创建40个地址！</p>");
        }
    })
}

$(".change_address").on("click",function () {
    $("#change_address .my_sure_btn").on("click",callAddAddress);
})

/*删除事件*/
function deleteAddress(i) {
    $.ajax({
        url:"deleteAddress.do",
        type:"get",
        data:{
            address_id:i
        },
        success:function (data) {
            $(".per_address_li").trigger("click");
            showAddress();
            showtsxx();
        }
    })
}

/*传address_id和区分修改新增的值*/
function insertAddressId(z,x) {
    var i=z;
    var newObj=x;
    var j=newObj.address_id;
    /* console.log(newObj);*/
    /*    console.log(i,j);*/
    /*把所有的值全部赋进去*/
    $("#per_address_name").val(newObj.address_name);
    $("#per_choose_s").val(newObj.address_pre);
    $("#per_choose_s").trigger("change");
    $("#per_choose_c").val(newObj.address_city);
    $("#per_choose_c").trigger("change");
    $("#per_choose_q").val(newObj.address_area);
    $("#per_address_tel").val(newObj.address_tel);
    $("#per_address_specific").val(newObj.address_concrete);
    $(".my_sure_btn").on("click",function () {
        addAddress(i,j);
        showAddress();
    })
}

/*添加或者修改，用i的传值去区分   为1的时候新增 0的时候修改     j则为传入的id，在新增的时候没有id,传的是null*/
function addAddress(i,j) {
    $.ajax({
        url:"peraddAddress.do",
        type:"post",
        data:{
            login_tel:sessionStorage.myTel,
            whichfun:i,
            address_id:j,
            address_name:$("#per_address_name").val(),
            address_pre:$("#per_choose_s").val(),
            address_city:$("#per_choose_c").val(),
            address_area:$("#per_choose_q").val(),
            address_tel:$("#per_address_tel").val(),
            address_concrete:$("#per_address_specific").val()
        },
        success:function (data) {
            /*console.log(data);*/
            $("#change_address .my_sure_btn").off("click",callAddAddress);
            showtsxx();
        }
    })
}

/*在先点击了添加按钮然后再点击确定的时候为增加*/
$(".add_address").on("click",function () {
    /*setTimeout("$('#change_address .my_sure_btn').parentsUntil('.modal').parent().modal.get(0).('hide')",300);*/
    /*$("#change_address .my_sure_btn").on("click",callAddAddress);*/
    $("#change_address .my_sure_btn").on("click",callAddAddress);
})
/*通过这个函数去调用*/
function callAddAddress() {
    addAddress(1,null);
}

/*再点击我的地址的时候进行显示*/
$(".per_address_li").on("click",function () {
    $(".per_content>.container>div:not(:first-of-type)").css({display:"none"});
    showAddress();
    $(".per_address").css({display:"block"});
})

$("#change_address .my_sure_btn").on("click",function () {
    $("#change_address").modal('hide');
})

/*改变地址模态框在隐藏时把所有的清空*/
$("#change_address").on("hidden.bs.modal",function () {
    $(this).find("input").val("");
    $(".per_address_li").trigger("click");
    $("#registerFormAdd").data('bootstrapValidator').destroy();
    $('#registerFormAdd').data('bootstrapValidator', null);
    checkForm();
})









/*--------订单有关的--------*/
/*再点击的时候触发的函数   先把订单id和订单的个数找出来*/

var pageTotal;
/*订单的页数显示*/
let everyPage=4;
let pageNum=1;
function perOrderPage() {
    var newArray=[];
    /*传入是否付款的值*/
    $(".per_order_state ul li").each(function () {
        /*根据颜色去判断现在选择的是哪一个*/
        if($(this).css("color")=="rgb(255, 204, 102)"){
            newArray.push($(this).val());
        }
    });
    /*传入时间差值*/
    newArray.push($(".per_order_time button").val());
    /*传入具体搜索的值*/
    newArray.push($("#per_choose_prd").val());
    $.ajax({
        type:"get",
        url:"showOrder.do",
        data:{
            login_tel:sessionStorage.myTel,
            ispay:newArray[0],
            changeDate:newArray[1],
            searchVal:newArray[2],
            todayData:new Date(),
            pageNum:"",
            everyPage:""
        },
        success:function (data) {
            pageTotal=Math.ceil(parseInt(data.length)/everyPage);
            showOrder();
        }
    })
}

function showOrder() {
    var newArray=[];
    /*传入是否付款的值*/
    $(".per_order_state ul li").each(function () {
        /*根据颜色去判断现在选择的是哪一个*/
        if($(this).css("color")=="rgb(255, 204, 102)"){
            newArray.push($(this).val());
        }
    });
    /*传入时间差值*/
    newArray.push($(".per_order_time button").val());
    /*传入具体搜索的值*/
    newArray.push($("#per_choose_prd").val());
    /*console.log(newArray);*/
    /*重置页面*/
    $.ajax({
        type:"get",
        url:"showOrder.do",
        data:{
            login_tel:sessionStorage.myTel,
            pageNum:pageNum,
            everyPage:everyPage,
            ispay:newArray[0],
            changeDate:newArray[1],
            searchVal:newArray[2],
            todayData:new Date(),
        },
        success:function (data) {
            $(".per_order_body").remove();
            for(var z=0;z<data.length;z++){
                let theYear=new Date(data[z].order_data).getFullYear();
                let theMonth=new Date(data[z].order_data).getMonth()+1;
                let theDay=new Date(data[z].order_data).getDate();
                let theHours=new Date(data[z].order_data).getHours();
                let theMin=new Date(data[z].order_data).getMinutes();
                let theSec=new Date(data[z].order_data).getSeconds();
                let firstTime=theYear+"-"+theMonth+"-"+theDay;
                let secondTime=theHours+":"+theMin+":"+theSec;
                $(".per_order_con thead").after("<tbody class='per_order_body'><tr> " +
                    "<td class='col-lg-6 col-md-6 col-sm-6'>" +
                    "<span>"+firstTime+"</span> <span>"+secondTime+"</span><p>订单编号："+data[z].order_num+"</p> " +
                    "</td> <td class='col-lg-2 col-md-2 col-sm-2'><p>GESSATO'<strong class='per_con_icon'>&#xe6e5;</strong></p> " +
                    "</td><td class='col-lg-1 col-md-1 col-sm-1'></td> <td class='col-lg-3 col-md-3 col-sm-3'> <strong class='per_delet_icon' onclick='deleteOrder("+data[z].order_id+")'>&#xe609;</strong> </td> </tr><tr class='row finish_order'></tr>" +
                    "<tr><td class='col-lg-6 col-md-6 col-sm-6 order_pro_info'></td><td class='col-lg-2 col-md-2 col-sm-2'> <p>"+data[z].address_name+"<strong>&#xe65e;</strong></p> " +
                    "<div class='per_order_info'> <div class='per_show_info'> <p>"+data[z].address_name+"</p> <p>地址："+data[z].address_concrete+"</p> <p>电话："+data[z].address_tel+"</p> " +
                    "</div> <div class='per_triangle''> </div> </div> </td> <td class='col-lg-1 col-md-1 col-sm-1'> <div> <p>总价</p> " +
                    "<span>$"+data[z].order_price+"</span> </div> </td> <td class='col-lg-3 col-md-3 col-sm-3'> <div> <p  data-toggle='modal' data-target='#customer_service' class='per_apply' onclick='perApplyAdd(this)'>申请售后</p> " +
                    "<span>订单详情</span> </div> </td></tr></tbody>");
                console.log(z);
            }
            $(".per_pagination").html("<li onclick='per_lastpage()'> <a href='#' aria-label='Previous'> <span aria-hidden='true'>&laquo;</span> </a> </li>");
            for(var i=1;i<=pageTotal;i++){
                $(".per_pagination").html($(".per_pagination").html()+"<li class='per_thepage' onclick='changeOrderNum("+i+")'><a href='#'>"+i+"</a></li>")
            }
            $(".per_pagination").html($(".per_pagination").html()+"<li onclick='per_nextpage()'> <a href='#' aria-label='Next'> <span aria-hidden='true'>&raquo;</span> </a> </li>")
            for(var j=0;j<data.length;j++){
                selectPro(data[j].order_id,j+1);
            }
        }
    })
};
/*上一页*/
function per_lastpage() {
    pageNum--;
    if(pageNum<=0){
        pageNum=1;
    }else {
        perOrderPage();
    }
}
/*下一页*/
function per_nextpage() {
    pageNum++;
    if(pageNum>pageTotal){
        pageNum=pageTotal;
    }else {
        perOrderPage();
    }
}

/*根据订单id去查询商品*/
/*i是订单id   j 是当前的哪个一个。  num是当前的长度*/
function selectPro(i,j) {
    $.ajax({
        type:"get",
        url:"selectPro.do",
        data:{
            order_id:i
        },
        success:function (data) {
            for(var c=0;c<data.length;c++){
                $(".per_order_body:nth-of-type("+j+") .order_pro_info").append("<div class='row'> " +
                    "<ul> <li class='col-lg-6 col-sm-6 col-md-6'><img src='"+data[c].prd_char+"'></li> <li class='col-lg-4 col-sm-4 col-md-4'><p>商品信息</p><span>"+data[c].prd_name+" </span></li> " +
                    "<li class='col-lg-2 col-sm-2 col-md-2'><p>x1</p></li> </ul> </div>");
            }
        }
    })
}

function changeOrderNum(z) {
    pageNum=z;
    perOrderPage();
}

function deleteOrder(i) {
    $.ajax({
        type:"get",
        url:"deleteOrder.do",
        data:{
            order_id:i
        },
        success:function (data) {
            /*console.log(data);*/
            perOrderPage();
            showtsxx();
        }
    })
}

/*显示出所有的订单*/
$(".per_order_li").on("click",function () {
    $(".per_content>.container>div:not(:first-of-type)").css({display:"none"});
    perOrderPage();
    $(".per_order").css({display:"block"});
})


/*点击时间的时候的改变*/
$(".per_order_time ul li").on("click",function () {
    /* console.log("zz");*/
    $(".per_order_time button").html($(this).text()+"<span class='caret'></span>");/*修改最上面的内容*/
    $(".per_order_time button").val($(this).val());
    perOrderPage();
})

/*点击是否付款的位子的改变*/
$(".per_order_state ul li").on("click",function () {
    $(".per_order_state ul li").css({color:"#333",border:"none"})
    $(this).css({color:"#ffcc66",borderBottom:"2px solid #ffcc66"})
    perOrderPage();
})

/*-------售后-------*/
/*
 $("#customer_service .my_sure_btn").on("click",function () {
 let arr=[];
 $("#customer_service ul li").each(function () {
 if($(this).css("outline")=="rgb(255, 204, 102) solid 1px"){
 arr.push($(this).text());
 }
 })

 $.ajax({
 type:"post",
 url:"customer_service.do",
 data:{
 csstyle:arr[0],

 }
 })
 })

 */








/*我的设计*/
$(".per_design_li").on("click",function () {
    $(".per_content>.container>div:not(:first-of-type)").css({display:"none"});
    showDesign();
    $(".per_design").css({display:"block"});
})

function showDesign() {
    $.ajax({
        type:"get",
        url:"showDesign.do",
        data:{
            login_tel:sessionStorage.myTel
        },
        success:function (data) {
            /*console.log(data);*/
            $(".per_design_con").html("");
            for(var i=0;i<data.length;i++){
                let theYear=new Date(data[i].do_date).getFullYear();
                let theMonth=new Date(data[i].do_date).getMonth()+1;
                let theDay=new Date(data[i].do_date).getDate();
                let theHours=new Date(data[i].do_date).getHours();
                let theMin=new Date(data[i].do_date).getMinutes();
                let theSec=new Date(data[i].do_date).getSeconds();
                let firstTime=theYear+"-"+theMonth+"-"+theDay;
                let secondTime=theHours+":"+theMin+":"+theSec;
                $(".per_design_con").html($(".per_design_con").html()+"<div class='per_design_specific'> <header> <p>这是您的第"+parseInt(i+1)+"个设计所用到的物品</p> " +
                    "<strong onclick='perDeleteDo("+data[i].do_id+")'>&#xe609;</strong></header> <footer class='row'> <span class='col-lg-3 col-md-3 col-sm-3'>设计完成时间："+firstTime+"</span> " +
                    "<span class='col-lg-1 col-md-1 col-sm-1'>"+secondTime+"</span> <button class='btn per_design_shop' onclick='addDesignShop("+i+")'>添加购物车</button> " +
                    "</footer> </div>");
                selectDesignPro(data[i].do_id,i+1);
            }
        }
    })
}
function perDeleteDo(i) {
    $.ajax({
        type:"get",
        url:"perDeleteDo.do",
        data:{
            do_id:i
        },
        success:function (data) {
            showDesign();
            showtsxx();
        }
    })
}

/*num是当前的do_id  i当前所在的哪一个*/
function selectDesignPro(do_id,i) {
    $.ajax({
        type:"get",
        url:"selectDesignPro.do",
        data:{
            do_id:do_id
        },
        success:function (data) {
            console.log(data);
            for(var z=0;z<data.length;z++){
                $(".per_design_con .per_design_specific:nth-of-type("+i+") footer").before("<ul class='row'> " +
                    "<li class='col-lg-4 col-md-4 col-sm-4'><img src='"+data[z].prd_char+"'></li> <li class='col-lg-1 col-md-1 col-sm-1 design_prd_num'><p>x"+data[z].prd_num+"</p></li> " +
                    "<li class='col-lg-3 col-md-3 col-sm-3'>"+data[z].prd_name+"</li> <li class='col-lg-3 col-md-3 col-sm-3'>价格:$"+data[z].prd_money+"</li> " +
                    "<li class='col-lg-1 col-md-1 col-sm-1'><input type='checkbox' value='"+data[z].prd_id+"'></li> </ul>");
            }
        }
    })
}
function addDesignShop(i) {
    let param=[];
    let prdNum=[]
    let zz=$(".per_design_specific").get(i);
    $(zz).find("input:checked").each(function () {
        param.push($(this).val());
        prdNum.push(parseInt($(this).parent().siblings(".design_prd_num").children().text().replace("x",'')));
    })
    /*console.log(prdNum);*/
    $.ajax({
        type:"get",
        url:"addDesignShop.do",
        data:{
            prd_id_arr:param,
            prdNum:prdNum,
            login_tel:sessionStorage.myTel
        },
        success:function (data) {
            showtsxx();
        }
    })
}





/*用户收藏*/
/*用户收藏显示函数*/
function showCollect(i,j) {
    $.ajax({
        type:"get",
        url:"showCollect.do",
        data:{
            login_tel:sessionStorage.myTel,
            is_expired:j
        },
        success:function (data) {
            $(".per_collect_con").html("");
            /*console.log(data);*/
            for(var i=0;i<data.length;i++){
                let date = new Date(data[i].collect_data);
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                let day = date.getDate();
                console.log(data[i].prd_char)
                let onlyDate = year + '-' + month + '-' + day;
                $(".per_collect_con").html($(".per_collect_con").html()+"<div class='col-lg-3 col-md-3 col-sm-3'> <div class='per_collect_show'> " +
                    "<strong onclick='deleteCollect("+data[i].collect_id+")'>&#xe609;</strong> <img src='"+data[i].prd_char+"'> <figcaption><div class='perCollectCircle'></div> <p>"+data[i].prd_name+"</p> <p>"+onlyDate+"</p> " +
                    "<p>$"+data[i].prd_money+"</p> </figcaption> <div> <button class='btn per_btn' onclick='perAddShoppingCart("+data[i].prd_id+",this)'>添加购物车</button> </div> </div> </div>")
            }
        }
    })
}
function perAddShoppingCart(proId,obj) {
    var cart = $('.shopping-cart');
    var imgtodrag = $(obj).parents(".per_collect_show").find("img").eq(0);
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
        url:"addShoppingCart.do",
        data:{
            shoppingId:proId,
            login_tel:sessionStorage.myTel
        },
        success:function(data){
            /*console.log(data)*/
        },
        dataType:"json"
    })
}
function deleteCollect(i) {
    $.ajax({
        type:"get",
        url:"deleteCollect.do",
        data:{
            collect_id:i
        },
        success:function (data) {
            console.log(data);
            showtsxx();
            var zz;
            $(".per_collect header ul li p").each(function (i) {
                console.log("zzz");
                console.log($(this).css("color"));
                console.log(i)
                if($(this).css("cloor")=='rgb(255, 204, 102)'){
                    zz=$(this).index();
                }
            })
            showCollect(1,zz);
        }
    })
}
/*在点击收藏的时候显示*/
$(".per_collect_li").on("click",function () {
    $(".per_content>.container>div:not(:first-of-type)").css({display:"none"});
    showCollect(1,0);
    $(".per_collect").css({display:"block"});
})

$(".per_collect header ul li p").on("click",function () {
    $(".per_collect header ul li p").css({color:"#333",borderBottom:"none"});
    $(this).css({color:"#ffcc66",borderBottom:"2px solid #ffcc66"})
})

/*点击全部收藏的时候显示全部。传入的为id和1*/
$(".per_collect header ul li:last-of-type p").on("click",function () {
    showCollect(1,1);
})

/*点击全部收藏的时候显示全部。传入的为id和0*/
$(".per_collect header ul li:first-of-type p").on("click",function () {
    showCollect(1,0);
})

/*$(".per_collect_search").on("click",function () {
 $.ajax({
 type:"get",
 url:"per_collect_search.do",
 data:{
 prd_name:$("#per_collect_value").val(),
 login_id:1
 },
 success:{

 }
 })
 })*/


$(".per_nav_con ul li").on("click",function () {
    $(".per_nav_con ul li a").css({color:"#333"});
    $(this).find("a").css({color:"#ffcc66"})
})



