//copyright@modman276.github.io  all rights reserved

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
  var audio2 = new Audio('Essential/media/darling.mp3');
  audio2.play();
  audio2.onended=function(){
  alert("Darling I found you!");
  pinker1();
  document.getElementById( "clickmebtn" ).innerHTML = "Darling!";  
 }
}


var audioditfx = new Audio('Essential/media/ditfx.mp3');

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
  Array.from(document.querySelectorAll("body")).forEach(el => el.classList.add("darling"));
  Array.from(document.querySelectorAll("body")).forEach(el => el.classList.remove("konami","monika"));
  Array.from(document.querySelectorAll(".text1")).forEach(el => el.classList.add("transparent"));
  Array.from(document.querySelectorAll(".text2, p a strong, h1 strong, button, .btn, .menubtn, li a, .box h2, .apply, .clock")).forEach(el => el.classList.add("pink"));
  document.getElementById( "clickmebtn" ).setAttribute( "onClick", "ditfxunpause()" );
}
