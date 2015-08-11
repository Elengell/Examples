function ADDPHOTO(url) {
  $('#photos').append('<img src="' + url + '">');
}

function ADDTEXT(title, location) {
  $('#texts').append('<div id="tl" data-index="first"><div id="t"></div><br><div id="l"></div></div>');
  if (title) {$('#t').text(title);}
  if (location) {$('#l').text(location).css({fontSize: "26px"});}
}

function SETSOUND(sid) {
  window.currentSound = sid;
}

function CLEARIMG() {
  $('#slides').empty();
}
