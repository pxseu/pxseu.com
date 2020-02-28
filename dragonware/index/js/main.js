//yeah coding

unhide();

function scroll1() {
  $("html, body").animate({ scrollTop: $('#software1').offset().top }, 1000);
}

function unhide() {
  $(".hidden").addClass("slow_show");
  setTimeout(function(){$(".hidden").removeClass("hidden"); },200);
  setTimeout(function(){$(".slow_show").removeClass("slow_show"); },1300);
}
