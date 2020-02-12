// copyright@modman276.github.io  all rights reserved

// usfl alert(localStorage.getItem("bgimgsave"))

var sheet = (function() {
  var style = document.createElement("style");
  style.appendChild(document.createTextNode(""));
  document.head.appendChild(style);
  return style.sheet;
})();

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

function colorchck() {
  if (document.getElementById("checkbox3").checked == true){
    $("#checkbox").prop("checked", false);
    $("#checkbox2").prop("checked", false);
    $('.apply').attr("onClick", "colorpicker()");
    document.getElementById("hex").placeholder = "#000000";
    document.getElementById("hex").defaultValue = '';
  }
  else { $('.apply').attr("onClick", "alert('No option selected')");}

}
function colorpicker(){

  var restrictedWords = new Array("white","rgb(255,255,255)","#ffffff","rgba(255,255,255,1)","rgba(0,0,0,0)", localStorage.getItem("uicolorsave"));
  var txtInput = document.getElementById("hex").value;
  var error = 0;
  for (var i = 0; i < restrictedWords.length; i++) {
      var val = restrictedWords[i];
      if ((txtInput.toLowerCase()).indexOf(val.toString()) > -1) {
          error = error + 1;
      }
  }

  if (error > 0) {
      alert("White Theme or thesame color as ui can brake the websites look!")
  }
  else {
    localStorage.setItem("bgcolorsave", document.getElementById('hex').value);
    localStorage.setItem("imgchecksave", "0");
    location.reload();
}
}
function menubtn(){
    Array.from(document.querySelectorAll("ul")).forEach(el => el.classList.toggle("show"));
}
function hidden() {
 $(".hidden").addClass("slowmoshow");  
  setTimeout(function(){$(".hidden").removeClass("hidden"); },200);
  setTimeout(function(){$(".slowmoshow").removeClass("slowmoshow"); },1300);
}

function imgchck(){
  if (document.getElementById("checkbox").checked == true){
    $("#checkbox2").prop("checked", false);
    $("#checkbox3").prop("checked", false);
    $('.apply').attr("onClick", "imgshow()");
    document.getElementById("hex").placeholder = "https://somewebsite/image.png";
    document.getElementById("hex").defaultValue = 'https://w.wallhaven.cc/full/lm/wallhaven-lm9oqy.jpg';
    localStorage.setItem("imgchecksave", "1");	
  }
  else { $('.apply').attr("onClick", "alert('No option selected')");}
}

function imgshow(){ 
    var imgurl = 'url("' + document.getElementById("hex").value + '")';
    localStorage.setItem("bgimgsave", document.getElementById('hex').value);
    location.reload();
} 

function uicolorchck(){
  if (document.getElementById("checkbox2").checked == true){
    $("#checkbox").prop("checked", false);
    $("#checkbox3").prop("checked", false);
    $('.apply').attr("onClick", "uichange()");
    document.getElementById("hex").placeholder = "#000000";
    document.getElementById("hex").defaultValue = '';
    localStorage.setItem("uichecksave", "1");	
  }
  else { $('.apply').attr("onClick", "alert('No option selected')");}
}

function uichange() {
  var restrictedWords = new Array("black","rgb(0,0,0)","#000000","rgba(0,0,0,1)","rgba(0,0,0,1)", localStorage.getItem("bgcolorsave"));
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
   localStorage.setItem("uicolorsave", document.getElementById('hex').value);
   $(".box").toggleClass("box-show");
   location.reload();
  }
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
  uiload();
} else {}
function bgload() {
  if (localStorage.getItem("imgchecksave") == 1) {
    var imgurl = 'url("' + localStorage.getItem("bgimgsave") + '")';
    $("body").removeAttr("style");
    $('body').css("background-image", imgurl);
    $('.text1, .text2, .aboutme').addClass("pic");
    $('.container').css("width", "auto");
    }
   else {
   $('body, .text1, .button1:active, li a:hover').css("background", localStorage.getItem("bgcolorsave"));
   }
}
function uiload() {
 if (localStorage.getItem("uichecksave") == 1) {
   sheet.insertRule(".uicolor {color:" + localStorage.getItem("uicolorsave") + "; }", 0);
   sheet.insertRule(".uicolormenu:hover {background-color:" + localStorage.getItem("uicolorsave") + "; }", 0);
   sheet.insertRule("ul.uicolor, .box {box-shadow: 0 0px 40px 0 " + localStorage.getItem("uicolorsave") + ",0 0px 100px 10px " + localStorage.getItem("uicolorsave") +";  }", 0);
   sheet.insertRule("h2.uicolor, .apply.uicolorapply {background-color:" + localStorage.getItem("uicolorsave") + "; }" , 0);
   sheet.insertRule(".button.uicolor {color:" + localStorage.getItem("uicolorsave") + "; }" , 0);
   sheet.insertRule(".button.uicolor::before {background-color:" + localStorage.getItem("uicolorsave") + "; }" , 0);
   sheet.insertRule(".button.uicolor:active {box-shadow: 0 0px 40px 0 " + localStorage.getItem("uicolorsave") + ",0 0px 100px 10px " + localStorage.getItem("uicolorsave") +";  }" , 0);
   sheet.insertRule(".button.uicolor:hover {color: white;}" , 0);

   $('.text2, .button1, .btn, .menubtn, ul, .box h2, .box, strong, .text1, .playlist').addClass("uicolor");
   $('.box .apply').addClass("uicolorapply");
   $('ul a').addClass("uicolormenu");
   }
 else {}
}
$('.restore').click(function(e) {
    e.preventDefault();
    if (window.confirm("This action will restore the page to it's original state. Do you wish to proceed?")) {
    localStorage.setItem("imgchecksave", "0");
    localStorage.setItem("uicolorsave", "0");
    localStorage.setItem("bgcolorsave", "#000000");
    localStorage.setItem("uichecksave", "0");
    localStorage.setItem("bgcolorsave", "black")
    location.reload();
   }
  });
