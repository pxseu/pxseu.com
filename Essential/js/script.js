// copyright@modman276.github.io  all rights reserved
hidden();
$('.btn').click(function(){
  $(".box").toggleClass("box-show");
});

$('#hex').keyup(function(){
  $('.prev').css("background",$('#hex').val());
});

function colorpicker(){

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
    $('body, .text1, .button1:active, li a:hover').css("background",$('#hex').val());
    $(".box").toggleClass("box-show");
}
}
function menubtn(){
    Array.from(document.querySelectorAll("ul")).forEach(el => el.classList.toggle("show"));
}
function hidden() {
  Array.from(document.querySelectorAll(".hidden")).forEach(el => el.classList.add("slowmoshow"));  
  setTimeout(function(){Array.from(document.querySelectorAll(".hidden")).forEach(el => el.classList.remove("hidden")); },200);
  setTimeout(function(){Array.from(document.querySelectorAll(".slowmoshow")).forEach(el => el.classList.remove("slowmoshow")); },1300);
}

function imgchck(){
if (document.getElementById("checkbox").checked == true){
    $('.apply').attr("onClick", "imgshow()");
    document.getElementById("hex").placeholder = "https://somewebsite/image.png";
  } else {
    $('.apply').attr("onClick", "colorpicker()");
    document.getElementById("hex").placeholder = "#000000";
  }
}

function imgshow(){ 
    var imgurl = 'url("' + document.getElementById("hex").value + '")';
    $('body').css("background-image", imgurl);
    $('.text1').css("background-color", "rgba(0,0,0,0)");
    $(".box").toggleClass("box-show");
} 

var velocity = 0.2;
function update(){ 
    var pos = $(window).scrollTop(); 
    $('body').each(function() { 
        var $element = $(this);
        var height = $element.height()-18;
        $(this).css('backgroundPosition', '50% ' + Math.round((height - pos) * velocity) + 'px'); 
    }); 
};

$(window).bind('scroll', update); 


/* seemes useless ngl
document.addEventListener("keyup", event => {
  if (event.iscomposing || event.keyCode === 83) {
  	if ($('#video').length) {alert("Do not disturb!");}
	else {Array.from(document.querySelectorAll(".box")).forEach(el => el.classList.toggle("box-show"));   }
  } 
});
document.addEventListener("keyup", event => {
  if (event.iscomposing || event.keyCode === 88) {
  	if ($('#video').length) {alert("Do not disturb!");}
	else {Array.from(document.querySelectorAll("ul")).forEach(el => el.classList.toggle("show"));   }
  } 
});
*/