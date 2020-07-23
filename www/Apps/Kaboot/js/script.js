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
function ogredirect(){
  window.open("https://www.vektrix.cc/kahoot");
}
function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

