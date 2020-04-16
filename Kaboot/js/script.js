function search() {
  var userinput = document.getElementById("soucetxt").value
  var url = 'https://www.vektrix.cc/kahoot/start?pin=' + userinput;
  if (document.getElementById("soucetxt").value < 1 )  {
    alert("No pin entered");
  }  
  else {
    var para = document.createElement("P");
    para.innerHTML = "-$ Your kahoot game code is: "+ userinput;
    document.getElementById("terminal").appendChild(para);
	setTimeout(function(){
		var para = document.createElement("P");
		para.innerHTML = ".";
		document.getElementById("terminal").appendChild(para);
		setTimeout(function(){para.innerHTML = "..";}, 1000);
		setTimeout(function(){para.innerHTML = "...";}, 2000);
		setTimeout(function(){para.innerHTML = "....";}, 3000);
		setTimeout(function(){para.innerHTML = ".....";}, 4000);
		setTimeout(function(){para.innerHTML = "......";}, 5000);
	 }, 1000);
	setTimeout(function(){
		 var para = document.createElement("P");
         para.innerHTML = "-$ Initializing bots";
         document.getElementById("terminal").appendChild(para);
		 $.ajax({
			type: "POST",
			url: url
		});
		setTimeout(function(){ 
            var para = document.createElement("P");
            para.innerHTML = "-$ Bots have been sent";
            document.getElementById("terminal").appendChild(para);}, 1000);
    }, 6000);
	
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

