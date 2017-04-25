function hideUrlBar() {
    // hide URL field on the iPhone/iPod touch
    var p = String(navigator.platform);

    container = document.getElementById("container");
    if( p === 'iPad' || p === 'iPhone' || p === 'iPod touch' ){
        var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
        if (parseInt(v[1], 10)>=7) {
            // iOS >=7
            if (container) {
                container.style.top=(0) + "px";
                container.style.left=(0) + "px";
                container.style.width=(window.innerWidth) + "px";
                container.style.height=(window.innerHeight) + "px";
                if (pano) {
                    pano.setViewerSize(window.innerWidth, window.innerHeight);
                }						}
            window.scrollTo(0, 0);
        } else {
            if (container) {
                var cheight;
                switch(window.innerHeight) {
                    case 208:cheight=268; break; // landscape
                    case 260:cheight=320; break; // landscape, fullscreen
                    case 336:cheight=396; break; // portrait, in call status bar
                    case 356:cheight=416; break; // portrait
                    case 424:cheight=484; break; // portrait iPhone5, in call status bar
                    case 444:cheight=504; break; // portrait iPhone5
                    default: cheight=window.innerHeight;
                }
                if ((cheight) && ((container.offsetHeight!=cheight) || (window.innerHeight!=cheight))) {
                    container.style.height=cheight + "px";
                }
            }
            document.getElementsByTagName("body")[0].style.marginTop="1px";
            window.scrollTo(0, 1);
        }
    }
}
if (window.addEventListener) {
    window.addEventListener("load", hideUrlBar);
    window.addEventListener("resize", hideUrlBar);
    window.addEventListener("orientationchange", hideUrlBar);
}



// check for CSS3 3D transformations and WebGL
if (ggHasHtml5Css3D() || ggHasWebGL()) {
    // use HTML5 panorama

    // create the panorama player with the container
    pano=new pano2vrPlayer("container");
    pano.readConfigUrl("../idea/ktx_o_800_out.xml");
    // hide the URL bar on the iPhone
    setTimeout(function() { hideUrlBar(); }, 10);
} else
if (swfobject.hasFlashPlayerVersion("10.0.0")) {
    var flashvars = {};
    var params = {};
    // enable javascript interface
    flashvars.externalinterface="1";
    params.quality = "high";
    params.bgcolor = "#ffffff";
    params.allowscriptaccess = "sameDomain";
    params.allowfullscreen = "true";
    var attributes = {};
    attributes.id = "pano";
    attributes.name = "pano";
    attributes.align = "middle";
    flashvars.panoxml="../idea/ktx_o_800_out.xml";
    params.base=".";
    swfobject.embedSWF(
        "../font/pano2vr_player.swf", "container",
        "100%", "100%",
        "9.0.0", "",
        flashvars, params, attributes);

}
