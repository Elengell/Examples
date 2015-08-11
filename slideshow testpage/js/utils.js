function RANDOM(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function RANDOM_F(min, max) {
    return (max - min) * (Math.random() /*/ Math.max*/ ) + min;
}

function PROPORTION_RATIO(from, to, fitInside) {
    from = from || [];
    to = to || [];
    fitInside = fitInside === undefined ? true : fitInside;

    return fitInside ? Math.max(from[0] / to[0], from[1] / to[1]) : Math.min(from[0] / to[0], from[1] / to[1]);
}

function PROPORTION_POINT(from, to, fitInside) {
    from = from || [];
    to = to || [];
    fitInside = fitInside === undefined ? true : fitInside;

    var ratio = PROPORTION_RATIO(from, to, fitInside);

    return [from[0] / ratio, from[1] / ratio];
}

function INTERPOLATE_POINT(x1, y1, x2, y2, i) {
    return  [x1 + (x2 - x1) * i, y1 + (y2 - y1) * i];
}

function INTERPOLATE_RECT(r1, r2, i) {
    var p1 = INTERPOLATE_POINT(r1[0], r1[1], r2[0], r2[1], i);
    var p2 = INTERPOLATE_POINT(r1[2], r1[3], r2[2], r2[3], i);

    return [p1[0], p1[1], p2[0], p2[1]];
}

function SCALE_RECT(r, scale) {
    // Scale a rect around its center
    var w = r[2] - r[0];
    var h = r[3] - r[1];
    var cx = (r[2] + r[0]) / 2;
    var cy = (r[3] + r[1]) / 2;
    var scalew = w * scale;
    var scaleh = h * scale;

    return [cx - scalew / 2, cy - scaleh / 2, cx + scalew / 2, cy + scaleh / 2];
}

//image change style
function changeImageStyle(className) {
  var allSlides = $('#slides');
  allSlides.removeClass('i-grayscale');
  allSlides.removeClass('i-sepia');
  allSlides.removeClass('i-brightness');
  allSlides.removeClass('i-contrast');
  if (className != 'default') {
    allSlides.addClass(className);
  }
}