$('.btn').click(function(){
  $(".box").toggleClass("box-show");
});

//to have a preview of color
$('#hex').keyup(function(){
  $('.prev').css("background",$('#hex').val());
});

//to apply color
$('.apply').click(function(){
  $('body').css("background",$('#hex').val());
  $('.text1').css("background",$('#hex').val());
  $('.button1:active').css("background-color",$('#hex').val());
  $('li a:hover').css("background-color",$('#hex').val());
    $(".box").toggleClass("box-show");
})
