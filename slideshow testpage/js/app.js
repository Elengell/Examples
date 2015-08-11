$(document).ready(function () {
  var playing = false;
  var duration = 4000;

  function slideNext() {
    if (playing) {
      console.log('sliding next');
      var current = $('.current');
      var next;
      if (current.next().length) {
        next = current.next();
      } else {
        next = $('#photos img:eq(0)');
        showTexts();
      }
      //next = current.next().length ? current.next() : $('#photos img:eq(0)');

      calc(next);
      //show the next one
      showing(next);
      //hide the current image
      current.removeClass('current');
      setTimeout(function () {
        hidding(current);
      }, 1200);
    }

  }

  function slidePrev() {
    var current = $('.current');
    var next = current.prev().length ? current.prev() : $('#photos img:eq(0)');

    calc(next);
    //show the next one
    showing(next);
    //hide the current image
    current.removeClass('current');
    setTimeout(function () {
      hidding(current);
    }, 1200);
  }

  function hidding(img) {
    img.css({'-webkit-transform': 'none', 'transform': 'none', opacity: 0});
  }

  function showing(img) {
    img.animate({opacity: 1}, 1000).addClass('current');
  }

  var cycle;
  function startShow() {
    if ($("#photos > img").length == 1) {
      var firstUrl = $('#photos img:first-child').attr('src');
      $('#photos').append('<img src=' + firstUrl + '>');
    }
    console.log('startShow');
    playing = true;
    var timeout = 1;



    console.log(duration);
    setTimeout(function () {
      $('#startCover').fadeOut(100);
      slideNext();
      cycle = setInterval(slideNext, duration);
    }, timeout);
    //here show must go on!
  }

  var container;
  var containerW;
  var containerH;

  $(window).resize(function () {
    container = $('body');
    containerW = container.width();
    containerH = container.height();
  });

  var firstTime = true;

  function calc(img) {
    container = $('body');
    containerW = container.width();
    containerH = container.height();
    var imageRation = img.width() / img.height();
    var containerRation = containerW / containerH;
    var effects;
    var effect;
    //['toTop', 'toBottom', 'toLeft', 'toRight', 'zoomIn', 'zoomOut', 'toFace'];

    if (imageRation > containerRation) {
      effects = ['toLeft', 'toRight', 'zoomIn', 'zoomOut'];
      effect = effects[Math.floor(Math.random() * effects.length)];
      // console.log('изображение шире', effect);
    } else if (imageRation < containerRation) {
      effects = ['toTop', 'toBottom', 'zoomIn', 'zoomOut'];
      effect = effects[Math.floor(Math.random() * effects.length)];
      // console.log('изображение выше', effect);
    } else {
      effects = ['zoomIn', 'zoomOut'];
      effect = effects[Math.floor(Math.random() * effects.length)];
      // console.log('изображение пропорционально', effect);
    }

    if (firstTime) {
      firstTime = false;
      effect = 'zoomIn';
    }

    var size = PROPORTION_POINT([img.width(), img.height()], [containerW, containerH], false);
    var rect1 = [0, 0, size[0], size[1]];
    var rect2 = SCALE_RECT(rect1, RANDOM_F(1.2, 1.5));
    var fromX = 0, fromY = 0, toX = 0, toY = 0, fromWidth = 0, fromHeight = 0, toWidth = 0, toHeight = 0;

    switch (effect) {
      case 'toTop':
        fromWidth = rect1[2];
        fromHeight = rect1[3];

        toWidth = fromWidth;
        toHeight = fromHeight;

        fromX = -(toWidth - containerW) / 2;
        toX = 0;

        fromY = -(toHeight - containerH) * .2;
        toY = -(toHeight - containerH) * .6;


        break;
      case 'toBottom':
        fromWidth = rect1[2];
        fromHeight = rect1[3];

        toWidth = fromWidth;
        toHeight = fromHeight;

        fromX = -(toWidth - containerW) / 2;
        fromY = -(toHeight - containerH) * .8;

        toX = 0;
        toY = -fromY * .8;

        break;
      case 'toLeft':
        fromWidth = rect1[2];
        fromHeight = rect1[3];

        toWidth = fromWidth;
        toHeight = fromHeight;

        fromX = 0;
        fromY = -(toHeight - containerH) / 2;

        toX = -(toWidth - containerW) / 2;
        toY = 0;
        break;
      case 'toRight':
        fromWidth = rect1[2];
        fromHeight = rect1[3];

        toWidth = fromWidth;
        toHeight = fromHeight;

        fromX = -(toWidth - containerW);
        fromY = -(toHeight - containerH) / 2;

        toX = -fromX;
        toY = 0;
        break;
      case 'zoomIn':
        fromWidth = rect1[2];
        fromHeight = rect1[3];

        toWidth = rect2[2];
        toHeight = rect2[3];

        fromX = (containerW - fromWidth) / 2;
        fromY = (containerH - fromHeight) / 2;

        toX = 0;
        toY = 0;
        break;
      case 'zoomOut':
        fromWidth = rect2[2];
        fromHeight = rect2[3];

        toWidth = rect1[2];
        toHeight = rect1[3];

        fromX = (containerW - fromWidth) / 2;
        fromY = (containerH - fromHeight) / 2;

        toX = 0;
        toY = 0;
        break;
      case 'toFace':

        break;
    }

    img.css({
      'width': fromWidth + 'px',
      'height': fromHeight + 'px',
      'left': fromX + 'px',
      'top': fromY + 'px'
    });

    img.transition({
      x: toX + 'px',
      y: toY + 'px',
      scale: toWidth / fromWidth,
      queue: false,
      duration: duration
    });
  }

  function showTexts() {
    $('#texts').fadeIn(500);
    setTimeout(function () {
      $('#texts').fadeOut(500)
    }, duration);
  }


  document.addEventListener('touchmove', function(e) {e.preventDefault();}, false);
  $(window).swipe({
    swipeLeft:function(event, direction, distance, duration, fingerCount) {
      leftSlide();
    },
    swipeRight:function(event, direction, distance, duration, fingerCount) {
      rightSlide();
    }
  });


  //api with outside
  window.initial = true;
  starting = function () {
    startShow();
  };

  pausing = function () {
    console.log('pausing click, playing', playing);
    if (playing) {
      clearInterval(cycle);
      playing = false;
    } else {
      slideNext();
      cycle = setInterval(slideNext, duration);
      playing = true;
    }
  };

  leftSlide = function () {
    if (playing) {
      clearInterval(cycle);
      slideNext();
      cycle = setInterval(slideNext, duration);
    } else {
      slideNext();
    }
  };

  rightSlide = function () {
    if (playing) {
      clearInterval(cycle);
      slidePrev();
      cycle = setInterval(slideNext, duration);
    } else {
      slidePrev();
    }
  };

  currentPhoto = function () {
    var cur;
    if ($('.current').index() == -1) {
      cur = 0
    } else {
      cur = $('.current').index()
    }
    return cur;
  };
  numPhotos = function () {
    return $("#photos > img").length;
  };

  $(window).load(function() {
    startShow();

  });

  $('#pauseButton').click(function() {
    console.log('pause clicked');
    if (playing) {pausing()}
    else {starting()}

  });
});


