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
  pinker();
 }
}


var audioditfx = new Audio('Essential/media/ditfx.mp3');

function ditfx(){
    audioditfx.play();
    audioditfx.volume = 0.3;
    document.getElementById( "clickmebtn" ).setAttribute( "onClick", "ditfxpause()" );
    document.getElementById( "clickmebtn" ).innerHTML = "Darling!";
}
function ditfxpause(){
    audioditfx.pause();
    document.getElementById( "clickmebtn" ).setAttribute( "onClick", "ditfxunpause()" );
}
function ditfxunpause(){
    audioditfx.play();
    document.getElementById( "clickmebtn" ).setAttribute( "onClick", "ditfxpause()" );
}

function pinker(){
  Array.from(document.querySelectorAll("body")).forEach(el => el.classList.add("darling"));
  Array.from(document.querySelectorAll("body")).forEach(el => el.classList.remove("konami"));
  Array.from(document.querySelectorAll(".text1")).forEach(el => el.classList.add("transparent"));
  Array.from(document.querySelectorAll(".text2")).forEach(el => el.classList.add("pink"));
  Array.from(document.querySelectorAll("p a strong")).forEach(el => el.classList.add("pink"));
  Array.from(document.querySelectorAll("h1 strong")).forEach(el => el.classList.add("pink"));
  Array.from(document.querySelectorAll("button")).forEach(el => el.classList.add("pink"));
  Array.from(document.querySelectorAll(".btn")).forEach(el => el.classList.add("pink"));
  Array.from(document.querySelectorAll(".menubtn")).forEach(el => el.classList.add("pink"));
  Array.from(document.querySelectorAll("li a")).forEach(el => el.classList.add("pink"));
  Array.from(document.querySelectorAll(".box h2")).forEach(el => el.classList.add("pink"));
  Array.from(document.querySelectorAll(".apply")).forEach(el => el.classList.add("pink"));
  document.getElementById( "clickmebtn" ).setAttribute( "onClick", "ditfx()" );
}
