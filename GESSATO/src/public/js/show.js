var _index7=0;
$(".flash4 ul li").mouseenter(function(){
    _index7=$(this).index();
    $(this).stop().stop().animate({width:538},500).siblings("li").stop().animate({width:159},500);
    $(".imgCen").eq(_index7).css("display","block").siblings(".imgCen").css("display","none");
    $("p.bt_2").eq(_index7).css("display","block").siblings("p.bt_2").css("display","none");
    $(".imgTop img").eq(_index7).addClass("tm").siblings(".imgTop img").removeClass("tm");
});
$(".flash4 ul li").mouseleave(function(){
    $(".imgCen").css("display","none");
    $("p.bt_2").css("display","none");
    $(".imgTop img").eq(_index7).removeClass("tm");
    //event.stopPropagation();
});
$(".flash4").mouseleave(function(){
    console.log(111111)
    $(".imgTop img").eq(_index7).addClass("tm");

});

/*************tab***************/
$("#myTab a").click(function (e){
    e.preventDefault();
    $("#myTab a:first").tab("show");
});
/******************Modal***********/
//$("#productModel").modal(options);
/*******************�۸�Χ*****************/

$( function() {
    //console.log(11111);
    $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: 9999,
        values: [ 0, 9999 ],
        slide: function( event, ui ) {
            $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
        }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
    " - $" + $( "#slider-range" ).slider( "values", 1 ) );
} );
/*************************zoom********************************/
//if (document.getElementsByClassName) {
//    var zoom = document.getElementsByClassName("zoom")[0];
//    zoom.onclick = function() {
//        var img = this.getElementsByTagName("img")[0], cl = this.className;
//        if (/in/.test(cl)) {
//            img.src = img.src.replace("s380", "s0");
//            this.className = "zoom zoom-out";
//        } else {
//            img.src = img.src.replace("s440", "s380");
//            this.className = "zoom zoom-in";
//        }
//        return false;
//    };
//}
/*****************��Ʒ�Ŵ�Ч��******************/
$(document).ready(function(){
    $(".jqzoom").imagezoom();
    $("#thumblist .owl-stage-outer .owl-stage .owl-item li a").click(function(){
        //���ӵ����li��class:tb-selected��ȥ��������tb-selecte
        $(this).parents("li").addClass("tb-selected").siblings().removeClass("tb-selected");
        //��ֵ����
        $(".jqzoom").prop('src',$(this).find("img").prop("src"));
        $(".jqzoom").attr('rel',$(this).find("img").attr("src"));
    });
});

$('.details-tab').owlCarousel({
    loop:false,
    nav:true,
    margin:10,
    navText:['<i class="fa fa-long-arrow-left"></i>','<i class="fa fa-long-arrow-right"></i>'],
    responsive:{
        0:{
            items:2
        },
        767:{
            items:3
        },
        1000:{
            items:4
        }
    }
})
/*************************��ѯ�������class************/
// $(".space").click(function(){
//
//     if($(this).hasClass("ps_active")){
//         $(this).removeClass("ps_active")
//     }
//     else{
//         $(this).parent().parent().find(".ps_active").removeClass("ps_active")
//         $(this).addClass("ps_active")
//     }
// })
//****************ģ̬��***********/



/*****************old price*********************/

