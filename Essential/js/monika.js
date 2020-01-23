//copyright@modman276.github.io  all rights reserved

var monikaKeys = {
  77: 'm',
  79: 'o',
  78: 'n',
  73: 'i',
  75: 'k',
  65: 'a'
};
var monikaCode = ['m','o','n','i','k','a'];
var monikaCodePosition = 0;

document.addEventListener('keydown', function(e) {
  var key = monikaKeys[e.keyCode];
  var requiredKey = monikaCode[monikaCodePosition];

  if (key == requiredKey) {

    monikaCodePosition++;

    if (monikaCodePosition == monikaCode.length) {
      monikaCodePassed();
      monikaCodePosition = 0;
    }
  } else {
    monikaCodePosition = 0;
  }
});
var monikaAudio = new Audio("Essential/media/monika.mp3");
function monikaCodePassed() { 
  Array.from(document.querySelectorAll(".video")).forEach(el => el.classList.add("videoshow"));
  Array.from(document.querySelectorAll("body")).forEach(el => el.classList.add("videoplay"));
  setTimeout(function(){document.getElementById("video").play();},130);
  document.getElementById("video").muted = true;
  monikaAudio.volume = 0.5;  
  monikaAudio.play();
  Array.from(document.querySelectorAll(".btn , .menubtn , button , .container")).forEach(el => el.classList.add("hideall","slowmoshow"));


  document.getElementById("video").onended = function(){
    alert("Just Monika.");
    pinker2();
    document.getElementById( "clickmebtn" ).innerHTML = "Just Monika.";  
    Array.from(document.querySelectorAll(".button1")).forEach(el => el.classList.add("monikabtn"));
    Array.from(document.querySelectorAll(".btn , .menubtn , .apply , .container , body")).forEach(el => el.classList.remove("hideall"));
    Array.from(document.querySelectorAll(".video")).forEach(el => el.classList.remove("videoshow"));

    setTimeout(function(){
      Array.from(document.querySelectorAll(".btn, .menubtn, button1, .container")).forEach(el => el.classList.remove("slowmoshow"));
    },2300);
  }
}
function pinker2() {
  Array.from(document.querySelectorAll("body")).forEach(el => el.classList.remove("darling","konami"));
  Array.from(document.querySelectorAll("body")).forEach(el => el.classList.add("monika"));
  Array.from(document.querySelectorAll(".text1")).forEach(el => el.classList.add("transparent"));
  Array.from(document.querySelectorAll(".text2, p a strong, h1 strong, button, .btn, .menubtn, li a, .box h2, .apply")).forEach(el => el.classList.add("pink"));
  document.getElementById( "clickmebtn" ).setAttribute( "onClick", "monikamusicstop()" );
}
function monikamusicplay() {
  monikaAudio.play();
  document.getElementById( "clickmebtn" ).setAttribute( "onClick", "monikamusicstop()" );
}
function monikamusicstop() {
  monikaAudio.pause();
  document.getElementById( "clickmebtn" ).setAttribute( "onClick", "monikamusicplay()" );
}

//proba wczytania pliku video
document.onload = function(){ 
  document.getElementById("video").muted = true;
  document.getElementById("video").play();
  setTimeout(function(){
    document.getElementById("video").pause(); 
    document.getElementById("video").currentTime=0;
    },230);
}
