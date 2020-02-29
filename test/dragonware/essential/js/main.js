function link1() { window.location.href = "index.html";}
function link2() { window.location.href = "programy.html";}
function link3() { window.location.href = "o_nas.html";}
function link4() { window.location.href = "kontakt.html";}

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}
