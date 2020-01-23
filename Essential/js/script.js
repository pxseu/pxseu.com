// copyright@modman276.github.io  all rights reserved

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
      alert("Wybranie koloru białego może utrudnić prawidłowe używanie strony!")
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
