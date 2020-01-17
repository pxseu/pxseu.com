$('.btn').click(function(){
  $(".box").toggleClass("box-show");
});

//to have a preview of color
$('#hex').keyup(function(){
  $('.prev').css("background",$('#hex').val());
});

//to apply color
$('.apply').click(function(){
  $('html').css("background",$('#hex').val());
  $('li a:hover').css("background-color",$('#hex').val());
    $(".box").toggleClass("box-show");
})
function menubtn(){
    Array.from(document.querySelectorAll("ul")).forEach(el => el.classList.toggle("show"));
}
