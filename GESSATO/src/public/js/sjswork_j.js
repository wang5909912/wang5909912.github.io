//$(document).ready(function(){
//    showwork();
//});
//function showwork(){
//    console.log("Zzz");
//    $.ajax({
//        type:"post",
//        url:"showwork.do",
//        success:function(data){
//            //for(var i=0;i<data.length;i++){
//            //    $('.sjs_bose').html( $('.sjs_bose').html()+"<div class='col-lg-10'>" +
//            //    " <h3>"+data[i].stylist_name+" </h3> <p>"+data[i].stylist_introduce+"</p> " +
//            //    "<button class='"+data[i].production_id+"'><a href=''../pages/sjswork.html'>²é¿´ÏêÇé</a></button> " +
//            //    "<div> <img src='"+data[i].stylist_print+"'/> </div>)</div> ");
//            //}
//            var sjs_all=document.getElementsByClassName("sjs_all")[0];
//             var i=0;{
//                sjs_all.innerHTML='' +
//                '<div id="sjs_work07" class="col-lg-10"><img src="../images/personal/'+data[0].production_print+'"><div id="sjs_work02" class="col-lg-2"><h2>'+data[0].production_name+'</h2><p>'+data[0].production_text+'</p></div></div>' +
//                '<div id="sjs_work03" class="col-lg-10"><img src="../images/personal/'+data[1].production_print+'"><div id="sjs_work031" class="col-lg-5"><h2>'+data[1].production_name+'</h2><p>'+data[1].production_text+'</p></div></div>' +
//                '<div id="sjs_work04" class="col-lg-10"><img src="../images/personal/'+data[2].production_print+'"><div id="sjs_work041" class="col-lg-10"><h2>'+data[2].production_name+'</h2><p>'+data[2].production_text+'</p></div></div>' +
//                '<div id="sjs_work05" class="col-lg-10"><img src="../images/personal/'+data[3].production_print+'"><div id="sjs_work051" class="col-lg-5"><h2>'+data[3].production_name+'</h2><p>'+data[3].production_text+'</p></div></div>'}}})}