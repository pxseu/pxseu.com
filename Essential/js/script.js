// copyright@modman276.github.io  all rights reserved

// usfl alert(localStorage.getItem("bgimgsave"))
hidden();
$('.btn').click(function(){
  $(".box").toggleClass("box-show");
});

$('#hex').keyup(function(){
  $('.prev').css("background",$('#hex').val());
});
function inputselect() {
  document.getElementById('hex').focus();
  document.getElementById('hex').select();
}
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
    $("body").removeAttr("style");
    $('body, .text1, .button1:active, li a:hover').css("background",$('#hex').val());
    $(".box").toggleClass("box-show");
    localStorage.setItem("bgcolorsave", document.getElementById('hex').value);
    localStorage.setItem("imgchecksave", "0");
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
    document.getElementById("hex").defaultValue = 'https://w.wallhaven.cc/full/lm/wallhaven-lm9oqy.jpg';
    localStorage.setItem("imgchecksave", "1");	
  } else {
    $('.apply').attr("onClick", "colorpicker()");
    document.getElementById("hex").placeholder = "#000000";
    document.getElementById("hex").defaultValue = '';
  }
}

function imgshow(){ 
    var imgurl = 'url("' + document.getElementById("hex").value + '")';
    localStorage.setItem("bgimgsave", document.getElementById('hex').value);
    $("body").removeAttr("style");
    $('body').css("background-image", imgurl);
    $('.text1').css("background-image", "");$('.text1, .text2').addClass("pic");   
    $('.container').css("width", "auto");
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
document.addEventListener("keyup", event => {
  if (event.iscomposing || event.keyCode === 123) {
    console.log("%cWARNING!","color: red; font-size: 40px;");
    console.log("%cTHIS CONSOLE CAN BE USED FOR SELF XSS.","color: BLACK; font-size: 25px;");
    console.log("%cIF YOU DO NOT KNOW WHAT YOU ARE DOING DO NOT PASTE ANYTHING HERE!","color: BLACK; font-size: 25px;");
  } 
});
if (typeof(Storage) !== "undefined") {
  bgload();
} else {}
function bgload() {
  if (localStorage.getItem("imgchecksave") == 1) {
    var imgurl = 'url("' + localStorage.getItem("bgimgsave") + '")';
    $("body").removeAttr("style");
    $('body').css("background-image", imgurl);
    $('.text1, .text2').addClass("pic");
    $('.container').css("width", "auto");
    }


   else {
   $("body").removeAttr("style");
   $('body, .text1, .button1:active, li a:hover').css("background", localStorage.getItem("bgcolorsave"));
  }
$(".box").removeClass("box-show");
}