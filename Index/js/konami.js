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
  var audio = new Audio('Index/media/cheats.mp3');
  audio.play();

  audio.onended=function(){
    Array.from(document.querySelectorAll("body")).forEach(el => el.classList.toggle("konami"));
    Array.from(document.querySelectorAll("body")).forEach(el => el.classList.remove("darling"));
    Array.from(document.querySelectorAll(".text1")).forEach(el => el.classList.add("transparent"));
    Array.from(document.querySelectorAll(".text2")).forEach(el => el.classList.add("pink"));
    Array.from(document.querySelectorAll(".button1")).forEach(el => el.classList.add("pink"));
    alert("Cheats Activated");
 }
}
