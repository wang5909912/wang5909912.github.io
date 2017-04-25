var address=$("#shopProAddress_id");
$(queryAll());
$('select').on('focus',shopProFocus);
$('select').on('blur',shopProBlur);
$('input').on('focus',shopProFocus);
$('input').on('blur',shopProBlur);
function shopProFocus(){
    $(this).css({"box-shadow": "0 0 0 2px #fc6","border":"none"});
}
function shopProBlur(){
    $(this).css({"box-shadow": "none","border":"1px solid rgba(0,0,0,0.28)"});
}

$("#shopProName_id").on("blur",function(){
    console.log($(this).val());
});
var shopGoodsCount=0;
var payMoney=0;
//console.log($('.shopGoodsInformation>div').slice(1,3).children(".shopGoodsMoney").children("p"));


/*地址更改及添加*/
if(address.val()==0){
    $(".cart-pay").on("click",function(){
        if(address.val()==0){
            if($("#shopProName_id").val()&&$("#province").val()&&$("#city").val()&&$("#shopProPhone_id").val()&&$("#shopProAddress_info_id").val()){
                $.ajax({
                    type:"post",
                    url:"addAddress.do",
                    data:{
                        loginTel:sessionStorage.myTel,
                        //loginTel:2147483647,
                        name:$("#shopProName_id").val(),
                        province:$("#province").val(),
                        city:$("#city").val(),
                        area:$("#county").val(),
                        phone:$("#shopProPhone_id").val(),
                        shopProNum:$("#shopProNum_id").val(),
                        addressInfo:$("#shopProAddress_info_id").val()
                    },
                    success:function(data){
                        //console.log(data);
                        getAddressIdOfOder();
                    },
                    dataType:"json"
                });
                saveObject();
            }else{
                alert("请输入正确的地址")
            }

        }else {
            if ($("#shopProName_id").val() && $("#province").val() && $("#city").val() && $("#shopProPhone_id").val() && $("#shopProAddress_info_id").val()) {
                $.ajax({
                    type: "post",
                    url: "editAddress.do",
                    data: {
                        addressId: $("#shopProAddress_id").val(),
                        name: $("#shopProName_id").val(),
                        province: $("#province").val(),
                        city: $("#city").val(),
                        area: $("#county").val(),
                        phone: $("#shopProPhone_id").val(),
                        shopProNum: $("#shopProNum_id").val(),
                        addressInfo: $("#shopProAddress_info_id").val()
                    },
                    success: function (data) {
                        sessionStorage.myAddress = $("#shopProAddress_id").val();
                        addOder();
                    },
                    dataType: "json"
                });
                saveObject();
            }else{
                alert("请输入正确的地址")
            }
        }
    })

}else{
    showAllAddress();
}
/*点击地址下拉框*/
address.on("click",function(){
    //queryAll();
    if($(this).val()==0){
        $("#shopProName_id").val('');
        $("#province").val('');
        $("#city").empty().attr("disabled",true);
        $("#county").empty().attr("disabled",true);
        $("#shopProPhone_id").val('');
        $("#shopProNum_id").val('');
        $("#shopProAddress_info_id").val('');
    }else{
        showAllAddress();
        console.log("showAllAddress");
    }
});
/*显示地址信息*/
function showAllAddress(){
    $.ajax({
        type:"post",
        url:"showAddress.do",
        data:{
            addressId:$("#shopProAddress_id").val()
        },
        success:function(data){
            console.log(data);
            $("#shopProName_id").val(data[0].address_name);
            $("#province").val(data[0].address_pre);
            $("#province").trigger("change");
            $("#city").val(data[0].address_city);
            $("#city").trigger("change");
            $("#county").val(data[0].address_area);
            $("#shopProPhone_id").val(data[0].address_tel);
            $("#shopProNum_id").val(data[0].address_number);
            $("#shopProAddress_info_id").val(data[0].address_concrete);
        },
        dataType:"json"
    })
}
function queryAll(){//加载时查询所有地址
    console.log("queryall");
    $.ajax({
        type:"post",
        url:"queryAddress.do",
        data:{
            loginTel:sessionStorage.myTel
        },
        success:function(data){
            console.log("queryall2222");
            address.children("option:not(option:first)").remove();
            for(let i=0;i<data.length;i++){
                //console.log(data[i].address_city);
                if(!data[i].address_area){
                    address.append(
                        '<option value='+data[i].address_id+'>' +data[i].address_name+'&nbsp;&nbsp;&nbsp;'+data[i].address_pre+'市'
                        +data[i].address_city+data[i].address_concrete
                        +'</option>')
                }else{
                    address.append(
                        '<option value='+data[i].address_id+'>' +data[i].address_name+'&nbsp;&nbsp;&nbsp;'+data[i].address_pre+'省'
                        +data[i].address_city+data[i].address_area+data[i].address_concrete
                        +'</option>')
                }

            }
            if(sessionStorage.myAddress!=""&&sessionStorage.myAddress!=undefined){
                console.log(111111111111);
                address.val(sessionStorage.myAddress);
                showAllAddress();
            }
        },
        dataType:"json"
    });
    $.ajax({
        type:"post",
        url:"queryShopGoods.do",
        data:{
            loginTel:sessionStorage.myTel
        },
        success:function(data){
            $(".shopActive").remove();
            for(let i=0;i<data.length;i++){
                $(".shopPro-attention").before(
                    '<div class="col-lg-12 col-md-12 col-sm-12 shopActive"> ' +
                    '<div class="shopGoodsImg"> ' +
                    '<img src="../'+data[i].prd_char+'" alt="" class="img-responsive" name="prd_img"/></div> ' +
                    '<div class="shopGoodsDes"> <p>'+data[i].prd_name+'</p> </div> ' +
                    '<div class="shopGoodsNum"> <p  name="prd_number">'+data[i].goods_num+'</p> </div> ' +
                    '<div class="shopGoodsMoney">￥<p>'+data[i].goods_num*data[i].prd_money+'</p> </div> </div>');
            }
            console.log($('.shopActive'));
            $('.shopActive').each(function(){
                console.log($(this).children(".shopGoodsMoney").children("p").html());
                shopGoodsCount+=parseInt($(this).children(".shopGoodsMoney").children("p").html());
            });
            payMoney=shopGoodsCount+parseInt($(".shopGoodsTrans span").html());
            $(".shopGoodsCount span").html(shopGoodsCount);
            $(".shopGoodsSum span").html(payMoney);
        },
        dataType:"json"
    });
}
/*把现在页面的值传入session*/
function saveObject(){
    console.log(123456789);
    var name=document.getElementById("shopProName_id").value;
    var province=document.getElementById("province").value;
    var phone=document.getElementById("shopProPhone_id").value;
    var address=document.getElementById("shopProAddress_info_id").value;
    var obj={
        name:name,
        province:province,
        city:$("#city").val(),
        area:$("#county").val(),
        phone:phone,
        address:address
    };
    var addressMessage=JSON.stringify(obj);
    sessionStorage.myObj=addressMessage;
}

function getAddressIdOfOder(){
    $.ajax({
        type:"post",
        url:"getAddressId.do",
        data:{
            loginTel:sessionStorage.myTel
        },
        success:function(data){
            console.log(data[0].myId);
            sessionStorage.myAddress = data[0].myId;
            addOder();
        },
        dataType:"json"
    });
}

//订单信息添加
function addOder(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    mydate = year+'-'+month+'-'+day;
    newdate = String(year)+String(month)+String(day)+String(hour)+String(minute)+String(second);

    console.log(newdate);
    console.log('添加订单');
    console.log(mydate);
    $.ajax({
        type:'post',
        url:'addorder.do',
        data:{
            loginTel:sessionStorage.myTel,
            //loginTel:2147483647,
            date:mydate,
            address:sessionStorage.myAddress,
            number:newdate,
            order_price:$(".shopGoodsSum span").html()
        },
        success:function (data) {
            console.log(123);
            wang(newdate);
            getOrderId(newdate);
        }
    })
}

/*获取订单Id*/

function getOrderId(e) {
    $.ajax({
        type:'post',
        url:'getOrderId.do',
        data:{
            new_number:e//订单编号
        },
        success:function (data) {
            console.log("获取订单Id");
            console.log(data);
            sessionStorage.myOrderId=data[0].order_id;
        }

    })
}

function wang(z) {
    console.log("zz");
    $.ajax({
        type:'post',
        url:'adddetails.do',
        data:{
            new_number:z//订单编号
        },
        success:function (data) {
            console.log(11112222);
            deleteCart();
            location.href='pay';
        }

    })
}

function imgSrcSplit(str){
    var result=str.split('/');
    var real="images/"+result[result.length-1];
    return real;
}
/*清除购物车数据库*/
function deleteCart(){
    $.ajax({
        type:'post',
        url:'deleteCart.do',
        data:{
            loginTel:sessionStorage.myTel
        },
        success:function (data) {}
    })
}



