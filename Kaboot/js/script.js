function search() {
  var url = 'https://www.vektrix.cc/kahoot/start?pin=' + document.getElementById("soucetxt").value;
  if (document.getElementById("soucetxt").value < 1 )  {
    alert("No pin entered");
  }  
  else {
    $.ajax({
      type: "POST",
      url: url
    });
  $(".mainbody").addClass("hidden");
  $(".done").addClass("afterpost");
  }
}
function modman276(){
  window.open("https://pxseu.cc");
}
