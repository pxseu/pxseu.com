function product1() { $( ".productimg1" ).toggleClass("productimgzoomed"); }
function product2() { $( ".productimg2" ).toggleClass("productimgzoomed"); }
function product3() { $( ".productimg3" ).toggleClass("productimgzoomed"); }
function product4() { $( ".productimg4" ).toggleClass("productimgzoomed"); }
function product5() { $( ".productimg5" ).toggleClass("productimgzoomed"); }
function product6() { $( ".productimg6" ).toggleClass("productimgzoomed"); }

function productid1() { alert("id = 9457372"); }
function productid2() { alert("id = 2145632"); }
function productid3() { alert("id = 2154666"); }
function productid4() { alert("id = 5623521"); }
function productid5() { alert("id = 2345567"); }
function productid6() { alert("id = 8453514"); }


$( window ).resize(function() {widthchck();});
$( window ).ready(function() {widthchck();});
function widthchck() {
	if ($( window ).width() < 1400) {
		$(".product").css({"width":"500px"});
		$(".product1, .product3, .product5").css({"left":"22%"});
		$(".product2, .product4, .product6").css({"left":"78%"});
	}
	else {	$(".product, .softwaredispaly").removeAttr("style");}
}



