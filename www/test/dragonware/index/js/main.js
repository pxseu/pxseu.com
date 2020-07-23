function moreaboutus() { window.location.href = "o_nas.html";}
$( window ).resize(function() {widthchck();});
$( window ).ready(function() {widthchck();});
widthchck()
function widthchck() {
	if ($( window ).width() < 1400) {	$(".product").css({"width":"800px"});	}
	else {	$(".product").removeAttr("style");	}
}