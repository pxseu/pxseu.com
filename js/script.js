function  click1(){
alert("S U C C");
window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
}
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
    $(".box").toggleClass("box-show");
})
