//copyright@modman276.github.io  all rights reserved
var konamiKeys = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  65: 'a',
  66: 'b'
};
var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
var konamiCodePosition = 0;

document.addEventListener('keydown', function(e) {
  var key = konamiKeys[e.keyCode];
  var requiredKey = konamiCode[konamiCodePosition];

  if (key == requiredKey) {

    konamiCodePosition++;

    if (konamiCodePosition == konamiCode.length) {
      konamiCodePassed();
      konamiCodePosition = 0;
    }
  } else {
    konamiCodePosition = 0;
  }
});

function konamiCodePassed() {
  if ($("body").hasClass("monika")){
  	alert("Do not even try!");
  }
  else {
  	var audio = new Audio('Essential/media/cheats.mp3');
 	 audio.play();

 	 audio.onended=function(){
	   $(".uicolor, .uicolormenu").removeClass("uicolor","uicolormenu");
 	   $('body').css("background-image", "");
  	  if ($(window).width() < 800) {
   	   Array.from(document.querySelectorAll("body")).forEach(el => el.classList.add("konamim"));
     	 Array.from(document.querySelectorAll("body")).forEach(el => el.classList.remove("konami"));
   	 }
   	 else { 
   	   Array.from(document.querySelectorAll("body")).forEach(el => el.classList.add("konami"));
   	   Array.from(document.querySelectorAll("body")).forEach(el => el.classList.remove("konamim"));
   	 }
    	Array.from(document.querySelectorAll("body")).forEach(el => el.classList.remove("darling","darlingm","monika"));
   	 Array.from(document.querySelectorAll("body")).forEach(el => el.classList.remove("monika"));
   	 Array.from(document.querySelectorAll(".text1")).forEach(el => el.classList.add("transparent"));
   	 Array.from(document.querySelectorAll(".text2, .email, .discord, h1 strong, button, .btn, .menubtn, li a, .box h2, .apply, .clock, .box, .playlist, ul")).forEach(el => el.classList.add("pink"));
   	 alert("Cheats Activated");
    	$('#clickmebtn').attr("onClick", "dvabtn()");
   	 $('#clickmebtn').innerHTML = "D.Va";  
    	$('#gifbox').remove();
   	 if (($('#clickmebtn').length)&&($(window).width() > 800)) {
  		var gifmake = document.createElement("IMG");
  		gifmake.id = "gifbox";
  		gifmake.src='Essential/media/dva_static.gif';
  		gifmake.setAttribute( "onClick", "dva_change()" );
  		gifmake.classList.add("gifbox");
  		document.body.appendChild(gifmake);
  	}
  }
 }
}
function dvabtn() {
  window.location.replace("https://www.youtube.com/embed/fDwItecEzFk");
}
function dva_change(){
  var zrtsugifbox = document.getElementById('gifbox');
  zrtsugifbox.src='Essential/media/dva.gif';
  zrtsugifbox.setAttribute( "onClick", "" );
  zrtsugifbox.classList.add("pinkshadow");
}

