function img(x) {
  var element = ".img" + x;
  localStorage.setItem("bgimgsave", $(element).attr('src'));
  localStorage.setItem("imgchecksave", "1");
  localStorage.setItem("uicolorsave", $(element).attr('title'));
  localStorage.setItem("uichecksave", "1");
  location.reload();
}
$( document ).ready(function() {
  $(".presetsbox, .titlebox").addClass("loaded");

$(".text1").addClass("loaded");


});
