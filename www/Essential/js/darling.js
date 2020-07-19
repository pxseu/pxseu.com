//copyright@pxseu.cc  all rights reserved

var darlingKeys = {
  68: 'd',
  65: 'a',
  82: 'r',
  76: 'l',
  73: 'i',
  78: 'n',
  71: 'g'
};
var darlingCode = ['d', 'a', 'r', 'l', 'i', 'n', 'g'];
var darlingCodePosition = 0;

document.addEventListener('keydown', function(e) {
  var key = darlingKeys[e.keyCode];
  var requiredKey = darlingCode[darlingCodePosition];

  if (key == requiredKey) {

    darlingCodePosition++;

    if (darlingCodePosition == darlingCode.length) {
      darlingCodePassed();
      darlingCodePosition = 0;
    }
  } else {
    darlingCodePosition = 0;
  }
});

function darlingCodePassed() {
  if ($("body").hasClass("monika")){
  	alert("Do not even try!");
  }
  else {
  	var audio2 = new Audio('../Essential/media/darling.mp3');
  	audio2.play();
  	audio2.onended=function(){
		$(".uicolor, .uicolormenu").removeClass("uicolor","uicolormenu");
  		alert("Darling I found you!");
 		pinker1();
  		$('#clickmebtn').html("Darling!");
 	}
 }
}


var audioditfx = new Audio('../Essential/media/ditfx.mp3');

function ditfxpause(){
    audioditfx.pause();
    document.getElementById( "clickmebtn" ).setAttribute( "onClick", "ditfxunpause()" );
}
function ditfxunpause(){
    audioditfx.volume = 0.1;
    audioditfx.play();
    document.getElementById( "clickmebtn" ).setAttribute( "onClick", "ditfxpause()" );
}
function pinker1(){
  $('body').css("background-image", "");
  if ($(window).width() < 800) {
    Array.from(document.querySelectorAll("body")).forEach(el => el.classList.add("darlingm"));
    Array.from(document.querySelectorAll("body")).forEach(el => el.classList.remove("darling"));
  }
  else { 
    Array.from(document.querySelectorAll("body")).forEach(el => el.classList.add("darling"));
    Array.from(document.querySelectorAll("body")).forEach(el => el.classList.remove("darlingm"));
  }
    Array.from(document.querySelectorAll("body")).forEach(el => el.classList.remove("konami","monika"));
    Array.from(document.querySelectorAll(".text1")).forEach(el => el.classList.add("transparent"));
    Array.from(document.querySelectorAll(".text2,.email, .discord, .twitter, .steam, h1 strong, button, .btn, .menubtn, li a, .box h2, .apply, .clock, .box, .playlist, ul")).forEach(el => el.classList.add("pink"));
    $('#clickmebtn').attr("onClick", "ditfxunpause()" );
    $('#gifbox').remove();
    $(".text1").css("background", "rgba(0, 0, 0, 0.4)");
    if (($('#clickmebtn').length)&&($(window).width() > 800)) {
          var zrtsugifmake = document.createElement("IMG");
          zrtsugifmake.id = "gifbox";
          zrtsugifmake.src='../Essential/media/zrtsu_static.gif';
          zrtsugifmake.setAttribute( "onClick", "zrtsu_change()" );
          zrtsugifmake.classList.add("gifbox");
          document.body.appendChild(zrtsugifmake);
  
 } 
}
function zrtsu_change(){
  var zrtsugifbox = document.getElementById('gifbox');
  zrtsugifbox.src='../Essential/media/zrtsu.gif';
  zrtsugifbox.setAttribute( "onClick", "" );
  zrtsugifbox.classList.add("pinkshadow");
}
