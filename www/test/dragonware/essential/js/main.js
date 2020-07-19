function link1() { window.location.href = "index.html";}
function link2() { window.location.href = "programy.html";}
function link3() { window.location.href = "o_nas.html";}
function link4() { window.location.href = "kontakt.html";}

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

$(window).scroll(function() {    
var scroll = $(window).scrollTop();
if (scroll > 160) {
    $(".taskbar").addClass("fixed");
    $(".taskbarbg").addClass("showing");
} else {
    $(".taskbar").removeClass("fixed");
    $(".taskbarbg").removeClass("showing");
}
});


$( window ).resize(function() {widthchck2();});
$( window ).ready(function() {widthchck2();});
function widthchck2() {
	if ($( window ).width() < 1400) {
		$(".topbar").css({"width":"800px"});
		$(".midline2").css({"width":"900px"});
	}
	else {	$(".topbar, .midline2").removeAttr("style");}
}
