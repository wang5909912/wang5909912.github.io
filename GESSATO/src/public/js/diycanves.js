/**
 * Created by user on 2017/3/16.
 */


//点击图片添加图片
function add(obj) {
    $('#canvasFather div').attr('id','')
    var m=obj.src.split("/");
    let  q="images/"+m[4];
    $('#canvasFather').append("<div class='cover' id='myImg'><img onmousewheel='return bbimg(this)' src='../"+q+"' name=q ></div>");
    $('.cover').append(' <i class="iconfont icon-x remove"  onclick="myRemove(this);" style="cursor:pointer;" >&#xe60c</i>');
    $('#myImg').append(' <i class="iconfont icon-x remove"  onclick="myRemove(this);" style="cursor:pointer;" >&#xe60c</i>');
    mydrag();
}
//拖拽图片移动
function mydrag() {
    //绘制图片坐标
    //	绘制图片坐标
    var X=0;
    var Y=0;
//	js部分
    var divObj=document.getElementById("myImg");
    var moveFlag=false;
//区别moueseup与click的标志
    var clickFlag=false;
//	拖拽函数
    divObj.onmousedown=function(e){
        moveFlag=true;
        clickFlag=true;
        var clickEvent=window.event||e;
        var mwidth=clickEvent.clientX-divObj.offsetLeft;
        var mheight=clickEvent.clientY-divObj.offsetTop;
        document.onmousemove=function(e){
            clickFlag=false;
            var moveEvent=window.event||e;
            if(moveFlag){
                divObj.style.left=moveEvent.clientX-mwidth+"px";
                divObj.style.top=moveEvent.clientY-mheight+"px";
////			  将鼠标坐标传给Canvas中的图像
                X=moveEvent.clientX-mwidth;
                Y=moveEvent.clientY-mheight;
////			  下面四个条件为限制div以及图像的活动边界
                if(moveEvent.clientX<=mwidth){
                    divObj.style.left=0+"px";
                    X=0;
                }
                if(parseInt(divObj.style.left)+divObj.offsetWidth >=560){
                    divObj.style.left=560 - divObj.offsetWidth+"px";
                    X=560 - divObj.offsetWidth;
                }
                if(moveEvent.clientY<=mheight){
                    divObj.style.top=0+"px";
                    Y=0;
                }
                if(parseInt(divObj.style.top)+divObj.offsetHeight>=350){
                    divObj.style.top=350-divObj.offsetHeight+"px";
                    Y=350 - divObj.offsetHeight;
                }
                divObj.onmouseup=function(){
                    moveFlag=false;
                    if(clickFlag){
                        console.log("点击生效");
                    }
                }
            }
        }
    };
}
//删除照片功能
function myRemove(obj) {
    $(obj).parent().remove();
}
//滚轮放大缩小
function bbimg(obj){
    var zoom=parseInt(obj.style.zoom, 10)||100;
    zoom+=event.wheelDelta/12;
    if (zoom>0) obj.style.zoom=zoom+'%';
    return false;
}
//添加背景图片
function addtwo(obj) {
    document.getElementById('canvasFather').style.backgroundImage="url("+obj.src+")";
}





