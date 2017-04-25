/**
 * Created by Administrator on 2017/3/10.
 */
"use strict";
function cambiar_login() {
    if(sessionStorage.myTel){
        document.getElementById("sy_login").style.display="none";
        document.querySelector('.cont_form_login').style.display = "none";
    }else{
        document.getElementById("sy_login").style.display="block";
        document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";
        document.querySelector('.cont_form_login').style.display = "block";
        document.querySelector('.cont_form_sign_up').style.opacity = "0";
        setTimeout(function(){  document.querySelector('.cont_form_login').style.opacity = "1"; },400);
        setTimeout(function(){
            document.querySelector('.cont_form_sign_up').style.display = "none";
        },200);
    }
}
function cambiar_sign_up() {
    document.getElementById("sy_login").style.display="block";
    document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
    document.querySelector('.cont_form_sign_up').style.display = "block";
    document.querySelector('.cont_form_login').style.opacity = "0";

    setTimeout(function(){  document.querySelector('.cont_form_sign_up').style.opacity = "1";
    },100);

    setTimeout(function(){   document.querySelector('.cont_form_login').style.display = "none";
    },400);
}
function ocultar_login_sign_up() {

    document.getElementById("sy_login").style.display="none";
    document.querySelector('.cont_forms').className = "cont_forms";
    document.querySelector('.cont_form_sign_up').style.opacity = "0";
    document.querySelector('.cont_form_login').style.opacity = "0";
    document.querySelector("#line_1").style.transform="translateX(0) rotate(0)";
    document.querySelector("#line_1").style.width="30px";
    document.querySelector("#line_3").style.transform="translateX(0) rotate(0)";
    document.querySelector("#line_3").style.width="30px";
    setTimeout(function(){
        document.querySelector('.cont_form_sign_up').style.display = "none";
        document.querySelector('.cont_form_login').style.display = "none";
    },500);

}
//页面加载执行
$(document).ready(function() {
    $(".hamburger").click(function(){
        $(this).toggleClass("is-active");
    });
    $("#sy_video1").css("display", "block");
    $("#login").mouseenter(function () {
        $(".cont_ba_opcitiy").css("display", "block");
    });
    // 登录状态的判定
    pd_login();
    NavCartClick();
// 回到顶部
    $("#to_top").click(function () {
        $("body").animate({scrollTop:0},1000)

    });
    //判断是否已经登录
    function pd_login() {
        var sy_logout = document.getElementById("sy_logout");
        var login_tel_ts=document.getElementById("login_tel_ts");
        var  login_name=document.getElementById("login_name");
        var cf=document.getElementsByClassName("cf")[0];
        var sy_login=document.getElementById("sy_login");
        if((sessionStorage.myTel!="")&&(sessionStorage.myTel!=undefined)){
            cf.style.display = "none";
            login_name.innerHTML = "<p>" + "欢迎你！"+sessionStorage.myTel+ "</p>";
            login_name.style.display="block";
            sy_login.style.display="none";
        }
        // else if (sessionStorage.myTel = "undefined") {
        //     sessionStorage.removeItem("myTel");
        //     cf.style.display = "block";
        //     sy_logout.style.display = "none";
        //     login_name.style.display = "none";
        // }
    }
});

// 发送短信
function sendMsg(){
    $.ajax({
        url:"/sendMsg.do",
        type:"post",
        data:{
            phone:$("#phone").val()
        },
        success:function(data){
            console.log(data);
        }
    })
}
/*验证*/
function checkCode(){
    var smscode=document.getElementById("smscode").value;
    var smscode_ts=document.getElementById("login_tel_ts");
    if(!(/\d{6}/.test(smscode))){
        smscode_ts.innerHTML="<p>"+"验证码为6位数字"+"</p>";
        smscode_ts.style.display="block";
        $(".btn_sign_up").attr('disabled', 'true')
    }else {
        smscode_ts.style.display="none";
        $(".btn_sign_up").removeAttr("disabled");
        $.ajax({
            url:"/verifySms.do",
            type:"post",
            data:{
                phone:$("#phone").val(),
                smscode:$("#smscode").val()
            },
            success:function(data){
                if (data==1){
                    $(".btn_sign_up").removeAttr("disabled");
                }else {
                    $(".btn_sign_up").attr('disabled', 'true');
                }
            }
        })
    }

}
// //鼠标滚动事件  导航固定在顶部
// window.onscroll=function(){//滚轮事件
//     var top=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;//滚轮滚动的距离
//     var node=document.getElementById('sy_nav');//变化的菜单模块
//     if(top>240){//就是滚动条滚动到440px位置，显示菜单，并且可以修改它的样式。
//         node.style.position='fixed';
//         node.style.top='0';
//         node.style.display='block';
//         node.style.background='white';
//         node.style.zIndex="109";
//     }else{//当鼠标滚动回初始位子样式变回。
//         node.style.position='fixed';
//         node.style.top='0';
//         node.style.display='block';
//         node.style.zIndex="9999";
//     }
// };
// 注册的正则或者功能判定
function checkPhone() {
    var phone = document.getElementById('phone').value;
    var phone_ts = document.getElementById("phone_ts");
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
        phone_ts.innerHTML = "<p>" + "请输入正确的11位电话号码" + "</p>";
        phone_ts.style.display = "block";
        $(".btn_sign_up").attr('disabled', 'true')
    } else {
        phone_ts.style.display = "none";
        $(".btn_sign_up").removeAttr("disabled");
        $.ajax({
            url: "/loginPhoneCheck.do",
            type: "post",
            data: {
                phone: $("#phone").val()
            },
            success: function (data) {
                console.log(data);
                if (data != 1) {
                    phone_ts.innerHTML = "<p>" + "此用户已经被注册" + "</p>";
                    phone_ts.style.display = "block";
                    $(".btn_sign_up").attr('disabled', 'true')
                } else {
                    phone_ts.style.display = "none";
                    $(".btn_sign_up").removeAttr("disabled")
                }
            }
        })
    }
}
function checkPwd() {
    var password = document.getElementById('password').value;
    var password_ts = document.getElementById("password_ts");
    if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(password))) {
        password_ts.innerHTML = "<p>" + "密码为6-12位的数字字母的组合" + "</p>";
        password_ts.style.display = "block";
        $(".btn_sign_up").attr('disabled', 'true')
    } else {
        password_ts.style.display = "none";
        $(".btn_sign_up").removeAttr("disabled");
    }
}
// 登录时候的正则或者状态判断
function checktel(){
    var login_tel = document.getElementById('login_tel').value;
    var login_tel_ts=document.getElementById("login_tel_ts");
    if(!(/^1(3|4|5|7|8)\d{9}$/.test(login_tel))){
        login_tel_ts.innerHTML="<p>"+"请输入正确的11位电话号码"+"</p>";
        login_tel_ts.style.display="block";
        $(".btn_login").attr('disabled', 'true')
    }else {
        login_tel_ts.style.display="none";
        $(".btn_login").removeAttr("disabled");
    }

}
function checkloginPwd() {
    var login_pwd = document.getElementById('login_pwd').value;
    var login_pwd_ts = document.getElementById("login_pwd_ts");
    if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(login_pwd))) {
        login_pwd_ts.innerHTML = "<p>" + "密码为6-12位的数字字母的组合" + "</p>";
        login_pwd_ts.style.display = "block";
        $(".btn_login").attr('disabled', 'true')
    } else {
        login_pwd_ts.style.display = "none";
        $(".btn_login").removeAttr("disabled");
    }
}
// 登录的事件判断
function sy_login() {
    var login_tel_ts=document.getElementById("login_tel_ts");
    var  login_name=document.getElementById("login_name");
    var cf=document.getElementsByClassName("cf")[0];
    var sy_login=document.getElementById("sy_login");
    $.ajax({
        url: "/sy_login.do",
        type: "post",
        data: {
            login_tel: $("#login_tel").val(),
            login_pwd:$("#login_pwd").val(),
        },
        success: function (data) {
            if (data!=2) {
                sessionStorage.myTel=data;
                cf.style.display = "none";
                login_name.innerHTML = "<p>" + "欢迎你！"+data+ "</p>";
                console.log("登陆的是"+data);
                login_name.style.display="block";
                login_tel_ts.style.display = "block";
                sy_login.style.display="none";
                $(".btn_login").removeAttr("disabled");
                NavCartClick();
            }
            else {
                login_tel_ts.innerHTML = "<p>" + "登录失败！信息不正确或用户不存在！" + "</p>";
                login_tel_ts.style.display = "block";
                $(".btn_login").attr('disabled', 'true');
            }
        }
    })
}
// 注册的提交事件判断
function sy_reg(){
    var phone_ts=document.getElementById("phone_ts");
    var cf=document.getElementsByClassName("cf")[0];
    var  login_name=document.getElementById("login_name");
    var sy_login=document.getElementById("sy_login");
    $.ajax({
        url: "/sy_reg.do",
        type: "post",
        data: {
            phone: $("#phone").val(),
            password:$("#password").val(),
        },
        success: function (data) {
            console.log(data);
            if (data!=2) {
                sessionStorage.myTel=data;
                cf.style.display = "none";
                login_name.innerHTML = "<p><" + "欢迎你！"+data+ "</p>";
                login_name.style.display="block";
                phone_ts.style.display = "block";
                sy_login.style.display="none";
                $(".btn_sign_up").removeAttr("disabled");
                NavCartClick();
            }
            else {
                phone_ts.style.display = "block";
                $(".btn_sign_up").attr('disabled', 'true')
            }
        }
    })
}
//进入个人中心或者注销
function pd_sy_logout_show() {
    var sy_logout=document.getElementById("sy_logout");
    if(sy_logout.style.display == "block"){
        sy_logout.style.display = "none";
}
    else
    {
        sy_logout.style.display = "block";
}
}
function sy_out_login() {
    sessionStorage.removeItem("myTel");
    var sy_logout=document.getElementById("sy_logout");
    var cf=document.getElementsByClassName("cf")[0];
    var  login_name=document.getElementById("login_name");
    cf.style.display="block";
    sy_logout.style.display="none";
    login_name.style.display="none";
    if(sessionStorage.myTel="undefined"){
        sessionStorage.removeItem("myTel");
        cf.style.display="block";
        sy_logout.style.display="none";
        login_name.style.display="none";
    }
    NavCartClick();
}

/*点击购物车图标判断是否登陆，登陆后跳转，3。21添加*/
function NavCartClick(){
    console.log("拦截成功");
    var cartA=document.getElementById("cartA");
    cartA.removeEventListener("onclick",cartClick);
    if(sessionStorage.myTel){
        $("#cartA").attr("href","myCart");
        cartA.removeEventListener("onclick",cartClick);
    }else{
        $("#cartA").removeAttr("href");
        cartA.onclick=cartClick;

    }
}
function cartClick(){
    cambiar_login();
}
