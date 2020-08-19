const style1 = `text-align: center; color: red; font-size: 40px; background-color: #fff; padding: 10px; border: 4px solid red; border-radius: 25px;`;
const style2 = `text-align: center; color: BLACK; font-size: 25px;  background-color: #fff; padding: 10px; border: 4px solid black; border-radius: 25px`;

console.log("%cWARNING!", style1);
console.log("%cTHIS CONSOLE CAN BE USED FOR SELF XSS.", style2);
console.log("%cIF YOU DO NOT KNOW WHAT YOU ARE DOING DO NOT PASTE ANYTHING HERE!", style2);

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