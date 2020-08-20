const DarlingKeys = {
  68: 'd',
  65: 'a',
  82: 'r',
  76: 'l',
  73: 'i',
  78: 'n',
  71: 'g'
};
const DarlingCode = ['d', 'a', 'r', 'l', 'i', 'n', 'g'];
let darlingCodePosition = 0;

document.addEventListener('keydown', function(e) {
  const key = DarlingKeys[e.keyCode];
  const requiredKey = DarlingCode[darlingCodePosition];

  if (key == requiredKey) {
    darlingCodePosition++;
    if (darlingCodePosition == DarlingCode.length) {
      darlingCodePassed();
      darlingCodePosition = 0;
    }
  } else {
    darlingCodePosition = 0;
  }
});

function darlingCodePassed() {
  const DarlingCodePassedAudio = new Audio('../Essential/media/darling.mp3');
  DarlingCodePassedAudio.play();
  DarlingCodePassedAudio.onended=function(){
  $(".uicolor, .uicolormenu").removeClass("uicolor","uicolormenu");
    alert("Darling I found you!");
  pinker1();
    $('#clickmebtn').html("Darling!");
 }
}

const audioditfx = new Audio('../Essential/media/ditfx.mp3');