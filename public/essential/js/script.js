console.log("%cWARNING!","color: red; font-size: 40px;");
console.log("%cTHIS CONSOLE CAN BE USED FOR SELF XSS.","color: BLACK; font-size: 25px;");
console.log("%cIF YOU DO NOT KNOW WHAT YOU ARE DOING DO NOT PASTE ANYTHING HERE!","color: BLACK; font-size: 25px;");

if(document.addEventListener){
	document.addEventListener("DOMContentLoaded", function(){
		loaded();
	});
} else if(document.attachEvent){
	document.attachEvent("onreadystatechange", function(){
		loaded();
	});
}

function loaded(){	
	setInterval(loop, 800);
}

var x = 0;

var titleText = [ "I","I l", "I lo", "I lov", "I love", "I love y", "I love yo","I love you","I love you <", "I love you <3", "(⁄˘⁄ ⁄ ω⁄ ⁄ ˘⁄)"];

function loop(){
	document.getElementsByTagName("title")[0].innerHTML = titleText[x++%titleText.length];
}