// copyright@modman276.github.io  all rights reserved
hidden();
$('.btn').click(function(){
  $(".box").toggleClass("box-show");
});

$('#hex').keyup(function(){
  $('.prev').css("background",$('#hex').val());
});

$('.apply').click(function(){
  var restrictedWords = new Array("white","rgb(255,255,255)","#ffffff","rgba(255,255,255,1)","rgba(0,0,0,0)");
  var txtInput = document.getElementById("hex").value;
  var error = 0;
  for (var i = 0; i < restrictedWords.length; i++) {
      var val = restrictedWords[i];
      if ((txtInput.toLowerCase()).indexOf(val.toString()) > -1) {
          error = error + 1;
      }
  }

  if (error > 0) {
      alert("White Theme can brake the websites look!")
  }
  else {
  $('body').css("background",$('#hex').val());
  $('.text1').css("background",$('#hex').val());
  $('.button1:active').css("background-color",$('#hex').val());
  $('li a:hover').css("background-color",$('#hex').val());
  $(".box").toggleClass("box-show");
  }
})
function menubtn(){
    Array.from(document.querySelectorAll("ul")).forEach(el => el.classList.toggle("show"));
}
function hidden() {
  Array.from(document.querySelectorAll(".hidden")).forEach(el => el.classList.add("slowmoshow"));  
  setTimeout(function(){Array.from(document.querySelectorAll(".hidden")).forEach(el => el.classList.remove("hidden")); },200);
  setTimeout(function(){Array.from(document.querySelectorAll(".slowmoshow")).forEach(el => el.classList.remove("slowmoshow")); },1300);
}
/*
document.addEventListener("keydown", event => {
  if (event.isComposing || event.keyCode === 83) {
    Array.from(document.querySelectorAll(".box")).forEach(el => el.classList.toggle("box-show"));   
  } 
});
*/