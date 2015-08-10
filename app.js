var winHeight = $(window).height();
var winWidth = $(window).width();
var shadowHeight = (winHeight*2)/3;

$(window).resize(function() {
  winHeight = $(window).height();
  winWidth = $(window).width();
  shadowHeight = (winHeight*2)/3;
});

var mobilecheck = false;
var odnoklassnikicheck = false;


function mobileCheck() {
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    mobilecheck = true;
  }
}
function odnoklassnikiCheck() {
  var curUrl = document.URL;
  if (curUrl.indexOf("app.minutta") > -1) {
    console.log('images from odnoklassniki');
    odnoklassnikicheck = true;
  }
}

var firstAfter;

$('body').css({maxWidth:winWidth});

$('#bibTitle').text($('#title').text());
var allsec = $('#created').text();
timeConverter(allsec);
$('#date').text(allsec);

if ($('#location').text() != "") {
  $('#locate').text(" at " + $('#location').text());
}
if ($('#user_name').text() != "") {
  $('#name').text($('#user_name').text());
  $('#nameChar').text($('#user_name').text().slice(0,1));
} else {
  $('#nameChar').text("M");
}
if ($('#user_avatar').text().indexOf("apidata") > -1) {
  $('#nameChar').text(" ").css({background: "url("+$('#user_avatar').text()+")", backgroundSize: "cover"});
} else {
}

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp  * 1000);
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  allsec = month + ' ' + date + ', ' + year;
}


var dd = false;

var firstImg;

var firstImgW;
var firstImgH;

$(document).ready(function () {
  odnoklassnikiCheck();
  mobileCheck();

  if (!odnoklassnikicheck) {
    $('#locate').text($('#location').text());
  }

  var ua = navigator.userAgent.toLowerCase();
  var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
  if(isAndroid) {
    mobilecheck = true;
  }
  firstImg = $('#firstImg');
  prID = $('#enc').text();

  if (($.cookie(prID) == true)) {
    $('.Icon--like').css({color: "red"});
  } else {
    if (($.cookie(prID) == false) || !($.cookie(prID))) {
      $('.Icon--like').css({color: "black"});
    }
  }
  likesCount = parseInt($('#likes').text());
  if (likesCount != 0) {
    $('.viewer-InfoLike-likeCount').text(likesCount);
  } else {
    $('.viewer-InfoLike-likeCount').text("");
  }


  var url = window.location;

  firstImgW = parseInt($('#firstW').text());
  firstImgH = parseInt($('#firstH').text());

  if (winWidth > winHeight) {
    $('#disp').css({width:winWidth-40, height:winHeight-40});

    //horizontal display
    if (firstImgW > firstImgH) {
      firstImg.css({height: "auto", width: "100%"});
    } else {
      firstImg.css({height: "auto", width: "100%"});
      var k = winWidth/firstImgW;
      var newW = firstImgW * k;
      var newH = firstImgH * k;
      var mtop = (newH-newW)/1;
//      firstImg.css({'margin-top':'-'+mtop+"px"});


      var fif = JSON.parse($('#first_image_faces').text());
      var minY = firstImgH;
      for(var i = 0; i < fif.length; i++) {
        //var x = fif[i][0];
        var y = firstImgH-fif[i][1];
        //var w = fif[i][2];
        var h = fif[i][3];
        y=y-h;
//        alert(x+"x"+y+"x"+w+"x"+h);
        //верх макушки
        var Y = y - 1.3*h;
        if (Y<minY) minY=Y;

//        $("body").prepend("<div id='test' border='1' style=\"position: absolute;top:"+(y*k)+"px; left:"+(x*k)+"px;border: 2px solid red;width: "+(w*k)+"px;height: "+(h)*k+"px;  z-index: 1000;\"></div>");

      }

      /*      var newW = firstImgW * k;
       var newH = firstImgH * k;
       var mtop = (newH-newW)/1;*/
      minY*=k;
//      alert(mtop+"x"+minY);
      if (mtop>minY) mtop=minY;

      firstImg.css({'margin-top':'-'+mtop+"px"});
//          for(var j = 0; j < fif[i].length; j++)
//      alert(fif);
    }
  } else {
    //vertical display
    $('.title-area').css({display: "none"});


    if (firstImgW > firstImgH) {
      var nH = 400;
      var nW = (nH*firstImgW)/firstImgH;
      var marg = (nW - winWidth)/2;
      $('#qqwwq').css({width:winWidth, overflowX: "hidden"});
      $('#firstImgCont').css({height: nH +"px", width: nW +"px",  marginLeft: "-"+marg+"px", marginRight: "-"+marg+"px"});
      firstImg.css({height: "100%", width: "100%"});
      //$('.row').css({marginTop:"-68px"});


    } else {
      firstImg.css({height: "auto", width: "100%"});
    }

    if ($('#bibTitle').text().length > 9) {
      $('#bibTitle').css({fontSize: "12vw"});
    } else {
      $('#bibTitle').css({fontSize: "40pt"});
    }
  }


  //firstImg.attr('src', $('img:eq(' + eqq + ')').attr('src'));
  firstImg.attr('src', $('.baseImages:first').attr('src'));

  $('a.TwitterShareBtn').attr('href', "https://twitter.com/intent/tweet?url=" + url + "&amp;text=My Story on Minutta");

  firstImg.prevAll('br').remove();

  /*  eqq--;
   $('.lineObject:eq(' + eqq + ')').remove();*/
  $('.lineObject:first').remove();
});



$('#firstImg').load(function() {
  $('#blurDiv').css({height:firstImg.height()});
  firstImg.after('<div class="firstAfter"></div>');
  var firstAfterShadow  = getAverageRGB(document.getElementById('firstImg'), 1);
  $('.firstAfter').css({background:'rgb('+firstAfterShadow.r+','+firstAfterShadow.g+','+firstAfterShadow.b+')', height: shadowHeight, width:winWidth, position: 'absolute', opacity: 0, 'pointer-events': 'none', zIndex: 9999});

  firstAfter = $('.firstAfter');

  if (winWidth>winHeight) {
    $('#locate').css({marginTop: winHeight-190 + "px", fontWeight: 300 });
  } else {
    var ih = firstImg.height();
    $('#locate').css({marginTop: ih-240 + "px", fontWeight: 300 });
  }

});


if (winWidth < winHeight) {
  $('.hrr').css({width: "100px"});
}

var titlesArray = window.textsArr;
console.log(titlesArray);

for (var ii = 0; ii < titlesArray.length; ii++) {
  var curText = titlesArray[ii];
  if (curText == null || curText == "") {
    curText = "";
    //$('label:eq('+ii+')').after("<br>");
  } else {


    var x = curText;
    var r = /\\u([\d\w]{4})/gi;
    x = x.replace(r, function (match, grp) {
      return String.fromCharCode(parseInt(grp, 16)); } );
    x = unescape(x);
    $('label:eq('+ii+')').text(x);
    console.log('11111');
    $('label:eq('+ii+')').after('<hr class="hrr" style="width: 200px; height: 1px; color: gray; background: gray; box-shadow: none; margin: -15px auto -8px auto; opacity: 0.5; border: none;">');
  }
}


//likes
var likesCount;
var prID;

$('.Btn--like').click(function() {
  if ($.cookie(prID) == true) {
    console.log('dislike');
    $.post("http://minutta.com/light/index.php?id="+prID+"&action=like&like=-10");
    $.cookie(prID, false, {expires:100, path:'/'});
    if (likesCount>0) {likesCount--;}
    if (likesCount==0) {$('.viewer-InfoLike-likeCount').text("");} else {$('.viewer-InfoLike-likeCount').text(likesCount);}
    $('.Icon--like').css({color: "black"});
  } else {
    if (($.cookie(prID) == false) || !($.cookie(prID))) {
      console.log('like');
      $.post("http://minutta.com/light/index.php?id="+prID+"&action=like&like=10");
      $.cookie(prID, true, {expires:100, path:'/'});
      likesCount++;
      $('.viewer-InfoLike-likeCount').text(likesCount);
      $('.Icon--like').css({color: "red"});
    }
  }
});



$(window).load(function() {

  if (!mobilecheck) {
    var v = 0;
    var h = 0;
    for (var i = 0; i < $('.baseImages').length; i++) {
      if ($('.baseImages:eq('+i+')').height() > $('.baseImages:eq('+i+')').width()) {
        h=0;
        v++;
        if (v==3) {
          v=0;
          var cur = i, prev =i-1;
          $('.lineObject:eq('+ prev +')').css({width:'49%', display:'inline-block', float:'left'});
          $('.lineObject:eq('+ cur +')').css({width:'49%', display:'inline-block', float:'right'});
        }
      } else {
        v=0;
        h++;
        if (h==3) {
          h=0;
          prev = i-1;

          $('.lineObject:eq('+ prev +')').css({width: winWidth, marginLeft: -(winWidth-980)/2});
          $('.baseImages:eq('+prev+')').addClass('needGrad');
        }
      }
    }

    if (!odnoklassnikicheck) {
      var shadowsIndex = 0;
      var elements = document.getElementsByClassName('needGrad');
      for (var zz = 0; zz < elements.length; zz++) {
        $(elements[zz]).after('<div class="after"></div>');
        $(elements[zz]).before('<div class="before"></div>');
        var beforeShadow = getAverageRGB(elements[zz], 0);
        var afterShadow  = getAverageRGB(elements[zz], 1);
        console.log(beforeShadow, afterShadow);
        $('.before:eq('+shadowsIndex+')').css({background:'rgb('+beforeShadow.r+','+beforeShadow.g+','+beforeShadow.b+')'});
        $('.after:eq('+shadowsIndex+')').css({background:'rgb('+afterShadow.r+','+afterShadow.g+','+afterShadow.b+')'});
        shadowsIndex++;
      }
      $('.before').css({height: shadowHeight, width:winWidth, position: 'absolute', marginTop:'-'+shadowHeight+'px', opacity: 0, 'pointer-events': 'none'});
      $('.after').css({height: shadowHeight, width:winWidth, position: 'absolute', opacity: 0, 'pointer-events': 'none'});
    }
  }
});


jQuery.fx.interval = 10;
$('.baseImages').click(function() {
  if (!mobilecheck) {
    $('#disp').css({backgroundImage:'url('+this.src+')', backgroundSize:'contain', backgroundRepeat:'no-repeat', backgroundPosition: 'center', display:'block'});
    $('#whiter').fadeIn(150);
  }
});
$('#whiter').click(function() {
  $(this).fadeOut(150);
});


$(window).scroll(function() {
  if (!mobilecheck) {
    $('#whiter').fadeOut(150);
    //console.log($('.before').offset().top - $(window).scrollTop());

    $('.before').each(function() {
      var htzBefore = $(this).offset().top - $(window).scrollTop();
      if (htzBefore<0) {
        var needOpacity = (-(htzBefore)/ (shadowHeight/1.5)).toFixed(2);
        if (needOpacity>=0) {
          $(this).css({opacity:needOpacity});
        }
      } else {
        $(this).css({opacity:0});
      }
    });

    $('.after').each(function () {
      var htzAfter = $(this).offset().top - $(window).scrollTop() - winHeight;
      if (htzAfter < 0) {
        var needOpacity = (1 + htzAfter / (shadowHeight)).toFixed(2);
        if (needOpacity<=1) {
          $(this).css({opacity: needOpacity});
        }
      } else {
        $(this).css({opacity: 0});
      }
    });

    /*    var htzFirstAfter = firstAfter.offset().top - $(window).scrollTop() - winHeight;
     if (htzFirstAfter < 0) {
     var fNeedOpacity = (1 + (htzFirstAfter) / (shadowHeight)).toFixed(2);
     if (fNeedOpacity<=1) {
     firstAfter.css({opacity: fNeedOpacity});
     }
     } else {
     firstAfter.css({opacity: 0});
     }*/
  }

});


/*
 $("#top, #bottom").on("vmousedown", function (e) {
 e.preventDefault();
 this.content.trigger(e);
 }.bind(this));
 */


function getAverageRGB(imgEl, position) {
  var blockSize = 5, // visit every 5 pixels
    defaultRGB = {r:0,g:0,b:0},
    canvas = document.createElement('canvas'),
    context = canvas.getContext && canvas.getContext('2d'),
    data, width, height,
    i = -4,
    length,
    rgb = {r:0,g:0,b:0},
    count = 0;
  if (!context) {
    console.log('!context');
    return defaultRGB;
  }
  height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
  width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
  context.drawImage(imgEl, 0, 0);
  try {

    if (position==0) {
      data = context.getImageData(0, 0, width, 100);
    } else {
      data = context.getImageData(0, height-100, width, 100);
    }
  } catch(e) {
    console.log('error', e);
    return defaultRGB;
  }
  length = data.data.length;
  while ( (i += blockSize * 4) < length ) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i+1];
    rgb.b += data.data[i+2];
  }
  rgb.r = ~~(rgb.r/count);
  rgb.g = ~~(rgb.g/count);
  rgb.b = ~~(rgb.b/count);
  return rgb;
}




