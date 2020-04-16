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
setInputFilter(document.getElementById("soucetxt"), function(value) {
  return /^\d*\.?\d*$/.test(value);
});

 function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}