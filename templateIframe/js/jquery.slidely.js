var console=console||{"log":function(){}};
(function($) {
    "use strict";

    /**
     * effect:
     *
     * auto,
     *
     * point,
     *
     * zoomIn,
     * zoomOut,
     *
     * zoomInRotate,
     * zoomOutRotate,
     *
     * leftTop,
     * rightTop,
     * leftBottom,
     * rightBottom,
     *
     * leftRightTop,
     * leftRightCenter,
     * leftRightBottom,
     *
     * rightLeftTop,
     * rightLeftCenter,
     * rightLeftBottom,
     *
     * topBottomLeft,
     * topBottomCenter,
     * topBottomRight,
     *
     * bottomTopLeft,
     * bottomTopCenter,
     * bottomTopRight,
     *
     * random
     *
     * @param {object} config
     */
    $.fn.slidely = function(config) {
        config = config || {};

        // ---

        var self = this;

        // ---

        var _effectsList = [
            'auto',
            'point',
            'zoomIn',
            'zoomOut',
            'zoomInRotate',
            'zoomOutRotate',
            'leftTop',
            'rightTop',
            'leftBottom',
            'rightBottom',
            'leftRightTop',
            'leftRightCenter',
            'leftRightBottom',
            'rightLeftTop',
            'rightLeftCenter',
            'rightLeftBottom',
            'topBottomLeft',
            'topBottomCenter',
            'topBottomRight',
            'bottomTopLeft',
            'bottomTopCenter',
            'bottomTopRight',
            'random'
        ];

        var _config = {
            container: 'body',
            preload: 4,
            randomize: false,
            loop: true,
            autoplay: true,
            autoload: true,
            effects: [],
            loopEffects: true,
            effect: {
                name: 'auto',
                fadeInSpeed: 1000,
                fadeOutSpeed: 1000,
                animationSpeedMin: 4999,
                animationSpeedMax: 5000,
                minScale: 1.2,
                maxScale: 1.5,
                minAngle: 0,
                maxAngle: 10,
                reverse: false,
                rotate: false,
                boost: false,
                boostPoints: [],
                scale: false,
                delay: 0,
                sleep: 0
            },
            loaded: function() {
            },
            beforeFadeIn: function() {
            },
            afterFadeIn: function() {
            },
            beforeFadeOut: function() {
            },
            afterFadeOut: function() {
            },
            start: function() {
            },
            end: function() {
            }
        };

        // ---

        $.extend(_config, config);

        // --- variables

        var beforeTransition = null;

        var currentTransition = null;

        var css3 = $.support.cssProperty('transition') && $.support.cssProperty('transform');

        var _images = [];
        var _container = $(_config.container);
        var _preload = _config.preload;
        var _randomize = _config.randomize;
        var _loop = _config.loop;
        var _autoplay = _config.autoplay;
        var _autoload = _config.autoload;
        var _effects = _config.effects || [];
        var _effect = _config.effect || {};
        var _loopEffects = _config._loopEffects;

        var _index = 0;
        var _playing = false;
        var _loaded = false;
        var _faces = window.faces;

        // --- functions

        var _load = function(index, img) {
            _images[index] = {
                img: img,
                w: img.naturalWidth,
                h: img.naturalHeight,
                success: img.naturalWidth > 0 && img.naturalHeight > 0
            };

            var count = 0, len = self.length;

            for (var i = 0; i < len; i++) {
                if (_images[i]) {
                    $(_images[i].img).remove();

                    count++;
                }
            }

            if ((_preload === 0 && count === _images.length) || _preload <= count || _preload >= self.length) {
                if (!_loaded && _config && _config.loaded) {
                    _loaded = true;

                    _config.loaded.call(self, _images);
                }

                if (_autoplay) {
                    _playing = true;

                    _check();
                }
            }
        };


        var _check = function(firststamp) {
          console.log('===================================================CHECK');

          if (checkInterval) {
            console.log('checkInterval fail');
            return;
          }
            if (!_playing) {
              console.log('_playing fail');

              return;
            }

            if (!_images || !_images.length) {
              console.log('_images fail');

              return;
            }

            // ---

            var index = _index;

            var image = _images[index];

            var img = $(image.img);
            var imageWidth = image.w;
            var imageHeight = image.h;

            var imageRation = imageWidth / imageHeight;

            var containerWidth = _container.width();
            var containerHeight = _container.height();

            var containerRation = containerWidth / containerHeight;

            if (currentTransition) {
                beforeTransition = currentTransition;
            }

            currentTransition = {
                index: index,
                img: img
            };

            /*
             * effect:
             *
             * auto,
             *
             * point,
             *
             * zoomIn,
             * zoomOut,
             *
             * leftTop,
             * rightTop,
             * leftBottom,
             * rightBottom,
             *
             * leftRightTop,
             * leftRightCenter,
             * leftRightBottom,
             *
             * rightLeftTop,
             * rightLeftCenter,
             * rightLeftBottom,
             *
             * topBottomLeft,
             * topBottomCenter,
             * topBottomRight,
             *
             * bottomTopLeft,
             * bottomTopCenter,
             * bottomTopRight,
             *
             * random
             */

            var effect = $.extend({}, _effect, (_effects && _effects.length && index < _effects.length) ? _effects[index] : _loopEffects && _effects && _effects.length ? _effects[index % _effects.length] : _effect);

            console.log('effect', effect);

            effect = (effect.name === 'random' || _effectsList.indexOf(effect.name) === -1) ? $.extend({}, effect, {name: _effectsList[RANDOM(0, _effectsList.length)]}) : effect;

            console.log('effect.name', effect.name);

          var sizeImg = PROPORTION_POINT([imageWidth, imageHeight], [containerWidth, containerHeight], false);


          if (_faces[index] && _faces[index][0] != 0 && _faces[index][1] != 0 && _faces[index][2] != 0 && _faces[index][3] != 0) {
            console.log('FAAAAAAAAAAAAAAAAAAAAACEEEEEEEEEEEEEEE', _faces[index]);

              if (imageRation > containerRation) { // изображение шире области отрисовки
                if (imageWidth/2 > _faces[index][0]) {
                  console.log('left');
                  effect.name = ['leftRightTop', 'leftRightCenter', 'leftRightBottom', 'zoomOut'][RANDOM(0, 3)];
                } else {
                  console.log('right');
                  effect.name = ['rightLeftTop', 'rightLeftCenter', 'rightLeftBottom', 'zoomOut'][RANDOM(0, 3)];
                }

              } else if (imageRation < containerRation) { // изображение выше области отрисовки
                if (sizeImg[1]/2 > _faces[index][1]) {
                  console.log('top');
                  effect.name = ['topBottomLeft', 'topBottomCenter', 'topBottomRight', 'zoomOut'][RANDOM(0, 3)];
                } else {
                  console.log('bottom');
                  effect.name = ['bottomTopLeft', 'bottomTopCenter', 'bottomTopRight', 'zoomOut'][RANDOM(0, 3)];
                }
              } else { // изображение и область имеют пропорциональное совпадение
                effect.name = 'zoomOut';
              }


          } else {
            if (effect.name === 'auto') {
              if (imageRation > containerRation) { // изображение шире области отрисовки
                effect.name = ['leftRightTop', 'leftRightCenter', 'leftRightBottom', 'zoomIn', 'zoomOut', 'rightLeftTop', 'rightLeftCenter', 'rightLeftBottom'][RANDOM(0, 6)];
              } else if (imageRation < containerRation) { // изображение выше области отрисовки
                effect.name = ['topBottomLeft', 'topBottomCenter', 'topBottomRight', 'zoomIn', 'zoomOut', 'bottomTopLeft', 'bottomTopCenter', 'bottomTopRight'][RANDOM(0, 6)];
              } else { // изображение и область имеют пропорциональное совпадение
                effect.name = 'zoomOut';
              }
            }
          }

            console.log('effect', effect, 'imageRation', imageRation, 'containerRation', containerRation);

            var _name = effect.name; // use
            var _reverse = effect.reverse; // not use
            var _rotate = effect.rotate; // not use
            var _boost = effect.boost; // not use
            var _boostPoints = effect.boostPoints || []; // not use
            var _delay = effect.delay; // not use
            var _sleep = effect.sleep; // not use
            var _fadeInSpeed = effect.fadeInSpeed; // use
            var _fadeOutSpeed = effect.fadeOutSpeed; // use
            var _animationSpeedMin = effect.animationSpeedMin; // use
            var _animationSpeedMax = effect.animationSpeedMax; // use
            var _minScale = effect.minScale; // use
            var _maxScale = effect.maxScale; // use
            var _minAngle = effect.minAngle; // not use
            var _maxAngle = effect.maxAngle; // not use

            // --- Scale, Move, Rotate, ... options

            var size = PROPORTION_POINT([imageWidth, imageHeight], [containerWidth, containerHeight], false);

            //var k = PROPORTION_RATIO([imageWidth, imageHeight], [containerWidth, containerHeight], false);
            //console.log(k, imageWidth / k, imageHeight / k);

            var rect1 = [0, 0, size[0], size[1]];
            var rect2 = SCALE_RECT(rect1, RANDOM_F(_minScale, _maxScale));

            var rotate = RANDOM_F(_minAngle, _maxAngle);

            // ---

            var lenX = 0, lenY = 0, fromX = 0, fromY = 0, toX = 0, toY = 0, fromWidth = 0, fromHeight = 0, toWidth = 0, toHeight = 0;

            // ---

            //var _name = 'zoomOut';

            switch (_name) {
                case 'point':
                    break;

                case 'zoomIn':
                case 'zoomInRotate':
                    fromWidth = rect1[2];
                    fromHeight = rect1[3];

                    toWidth = rect2[2];
                    toHeight = rect2[3];

                    fromX = (containerWidth - fromWidth) / 2;
                    fromY = (containerHeight - fromHeight) / 2;

                    toX = 0;
                    toY = 0;
                    break;
                case 'zoomOut':
                case 'zoomOutRotate':
                    fromWidth = rect2[2];
                    fromHeight = rect2[3];

                    toWidth = rect1[2];
                    toHeight = rect1[3];

                    fromX = (containerWidth - fromWidth) / 2;
                    fromY = (containerHeight - fromHeight) / 2;

                    toX = 0;
                    toY = 0;
                    break;

                case 'leftTop':
                    break;
                case 'rightTop':
                    break;
                case 'leftBottom':
                    break;
                case 'rightBottom':
                    break;

                case 'leftRightTop':
                case 'leftRightCenter':
                case 'leftRightBottom':
                    fromWidth = rect1[2];
                    fromHeight = rect1[3];

                    toWidth = fromWidth;
                    toHeight = fromHeight;

                    if (effect === 'leftRightTop') {
                        fromY = 0;
                    } else if (effect === 'leftRightCenter') {
                        fromY = -(toHeight - containerHeight) / 2;
                    } else if (effect === 'leftRightBottom') {
                        fromY = -(toHeight - containerHeight);
                    }

                    fromX = -(toWidth - containerWidth);

                    toX = -fromX;
                    toY = 0;
                    break;

                case 'rightLeftTop':
                case 'rightLeftCenter':
                case 'rightLeftBottom':
                    fromWidth = rect1[2];
                    fromHeight = rect1[3];

                    toWidth = fromWidth;
                    toHeight = fromHeight;

                    if (effect === 'rightLeftTop') {
                        fromY = 0;
                    } else if (effect === 'rightLeftCenter') {
                        fromY = -(toHeight - containerHeight) / 2;
                    } else if (effect === 'rightLeftBottom') {
                        fromY = -(toHeight - containerHeight);
                    }

                    fromX = 0;

                    toX = -(toWidth - containerWidth) / 2;
                    toY = 0;
                    break;

                case 'topBottomLeft':
                case 'topBottomCenter':
                case 'topBottomRight':
                    fromWidth = rect1[2];
                    fromHeight = rect1[3];

                    toWidth = fromWidth;
                    toHeight = fromHeight;

                    if (effect === 'topBottomLeft') {
                        fromX = 0;
                    } else if (effect === 'topBottomCenter') {
                        fromX = -(toWidth - containerWidth) / 2;
                    } else if (effect === 'topBottomRight') {
                        fromX = -(toWidth - containerWidth);
                    }

                    fromY = -(toHeight - containerHeight)*.8;

                    toX = 0;
                    toY = -fromY*.8;



                  //toY = -(toHeight - containerHeight)*.6;
                  //fromY = -(toHeight - containerHeight)*.2;

                    break;

                case 'bottomTopLeft':
                case 'bottomTopCenter':
                case 'bottomTopRight':
                    fromWidth = rect1[2];
                    fromHeight = rect1[3];

                    toWidth = fromWidth;
                    toHeight = fromHeight;

                    if (effect === 'bottomTopLeft') {
                        fromX = 0;
                    } else if (effect === 'bottomTopCenter') {
                        fromX = -(toWidth - containerWidth) / 2;
                    } else if (effect === 'bottomTopRight') {
                        fromX = -(toWidth - containerWidth);
                    }

                    //fromY = 0;
///////////////////////////////////
                    toX = 0;
                    fromY = -(toHeight - containerHeight)*.2;
                    toY = -(toHeight - containerHeight)*.6;


                break;
                default:
                    break;
            }

            lenX = fromWidth - containerWidth;
            lenY = fromHeight - containerHeight;

            if (index === 0) {

              console.log('START =================EEE');
                if (_config && _config.start) {
                    _config.start.call(self, _images);
                }
            }

            console.log('index', index, 'size', size, 'containerWidth', containerWidth, 'containerHeight', containerHeight, 'fromWidth', fromWidth, 'fromHeight', fromHeight, 'toWidth', toWidth, 'toHeight', toHeight, 'fromX', fromX, 'fromY', fromY, 'toX', toX, 'toY', toY);

            // ---

            var fadeInComplete = function() {
              console.log('fadeInComplete!!!!!!!!!!!!!!');

              if (!_playing) {
                console.log('fadeInComplete      return');

                return;
                }

                self.not(img).remove();

                if (_config && _config.afterFadeIn) {
                  console.log('afterFadeIn in fadeInComplete      ======');

                  _config.afterFadeIn.call(self, _images, image, index);
                }

         //     var duration = _animationSpeedMax/*RANDOM(Math.max(Math.max(lenX, lenY) * 10, _animationSpeedMin), _animationSpeedMax)*/; 6900



              var duration = 5000;
              var timeout = 1;
              switch  (window.currentSound) {
                case '1':
                  duration = 3700;
                  console.log('duration was changed!!!    1');
                  break;
                case '2':
                  duration = 1920-500; //2800    1920-500
                  timeout = 300;

                  console.log('duration was changed!!!    2');
                  break;
                case '3':
                  duration = 3057-500; //6100    3057-500
                  timeout = 600+1500;
                  console.log('duration was changed!!!    3');
                  break;
                case '4':
                  duration = 1000-500;
                  console.log('duration was changed!!!    4');
                  break;
                case '5':
                  duration = 3000;
                  console.log('duration was changed!!!    5');
                  break;
                case '6':
                  duration = 5825;
                  console.log('duration was changed!!!    6');
                  break;

              }


              console.log(duration);
              if (firststamp) {
                console.log('TIMEOUT SOON');
                setTimeout(function() {
                  console.log('TIMEOUT DONE');

                  if (css3) {
                  img.transition({
                  x: toX + 'px',
                  y: toY + 'px',
                  scale: toWidth / fromWidth,
                  queue: false,
                  duration: duration,
                  //easing: 'in-out',
                  complete: transitionComplete
                });
              } else {
                var tween = TweenMax.fromTo(img[0], duration / 1000, {
                  width: fromWidth,
                  height: fromHeight,
                  left: fromX,
                  top: fromY
                }, {
                  width: toWidth,
                  height: toHeight,
                  left: fromX - (toWidth - fromWidth) / 2,
                  top: fromY - (toHeight - fromHeight) / 2,
                  onComplete: transitionComplete
                });

                currentTransition.tween = tween;
              }}, timeout);} else {
                if (css3) {
                img.transition({
                  x: toX + 'px',
                  y: toY + 'px',
                  scale: toWidth / fromWidth,
                  queue: false,
                  duration: duration,
                  //easing: 'in-out',
                  complete: transitionComplete
                });
              } else {
                var tween = TweenMax.fromTo(img[0], duration / 1000, {
                  width: fromWidth,
                  height: fromHeight,
                  left: fromX,
                  top: fromY
                }, {
                  width: toWidth,
                  height: toHeight,
                  left: fromX - (toWidth - fromWidth) / 2,
                  top: fromY - (toHeight - fromHeight) / 2,
                  onComplete: transitionComplete
                });

                currentTransition.tween = tween;
              }}




            };

            var fadeOutComplete = function() {
              console.log('fadeOutComplete!!!!!!!!!!!!!!');

              if (!_playing) {
                console.log('fadeOutComplete      return');

                return;
                }

                if (_config && _config.afterFadeOut) {
                  console.log('afterFadeOut in fadeOutComplete      ======');

                  _config.afterFadeOut.call(self, _images, image, index);
                }

                img.removeAttr('style').remove().hide();
            };

            var transitionComplete = function() {
              console.log('transitionComplete!!!!!!!!!!!!!!');
                if (!_playing) {
                    return;
                }

                if (_loop || index !== _images.length - 1) {
                    if (_config && _config.beforeFadeOut) {
                        _config.beforeFadeOut.call(self, _images, image, index);
                    }
                    img.css({
                        'z-index': '-2'
                    });

                    if (css3) {
                        img.transition({
                            opacity: 0,
                            duration: _fadeOutSpeed,
                            complete: fadeOutComplete
                        });
                    } else {
                        var tweenFadeOut = TweenMax.fromTo(img[0], _fadeOutSpeed / 1000, {
                            opacity: 1
                        }, {
                            opacity: 0,
                            onComplete: fadeOutComplete
                        });

                        currentTransition.tweenFadeOut = tweenFadeOut;
                    }

                    if (_playing) {
                        _check();
                    }
                } else {
                    if (_config && _config.end) {
                        _playing = false;

                        _config.end.call(self, _images);
                    }
                }
            };

            // ---

            if (_config && _config.beforeFadeIn) {
                _config.beforeFadeIn.call(self, _images, image, index);
            }



            img.css({
                'width': fromWidth + 'px',
                'height': fromHeight + 'px',
                'left': fromX + 'px',
                'top': fromY + 'px',
                'z-index': '-1',
                'position': 'absolute',
                'opacity': '0'
            }).appendTo(_container);



            if (css3) {
                img.show().transition({
                    opacity: 1,
                    duration: _fadeInSpeed,
                    complete: fadeInComplete
                });
            } else {
                var tweenFadeIn = TweenMax.fromTo(img[0], _fadeOutSpeed / 1000, {
                    opacity: 0,
                    display: 'block'
                }, {
                    opacity: 1,
                    onComplete: fadeInComplete
                });

                currentTransition.tweenFadeIn = tweenFadeIn;
            }

            // ---

            _index = (_index + 1) % _images.length;
        }; // check

        // --- methods


      var timeTrigger;
      var checkInterval = false;
      var first = true;
        self.start = function() {

            if (_playing) {
                return false;
            }

            var ok = false;

            if (css3) {
              if (beforeTransition) {
                ok = true;
                    if (beforeTransition.transform) {
                      beforeTransition.img.css('transform', beforeTransition.transform);
                    }
                }

                if (currentTransition) {
                  console.log('CSS33333333333333');

                  ok = true;

                    if (currentTransition.transform) {
                        currentTransition.img.css('transform', currentTransition.transform);
                    }
                }
            } else {

              if (beforeTransition) {
                    ok = true;

                    if (beforeTransition.tween) {
                        beforeTransition.tween.resume();
                    }

                    if (beforeTransition.tweenFadeIn) {
                        beforeTransition.tweenFadeIn.resume();
                    }

                    if (beforeTransition.tweenFadeOut) {
                        beforeTransition.tweenFadeOut.resume();
                    }
                }

                if (currentTransition) {
                    ok = true;

                    if (currentTransition.tween) {
                        currentTransition.tween.resume();
                    }

                    if (currentTransition.tweenFadeIn) {
                        currentTransition.tweenFadeIn.resume();
                    }

                    if (currentTransition.tweenFadeOut) {
                        currentTransition.tweenFadeOut.resume();
                    }
                }
            }

            _playing = true;
          console.log('TIME TRIGGER', timeTrigger);

          if (first) {
            _check(first);
            first = false;
            console.log('first');
            return
          }

          if (timeTrigger > 4) {ok = false; timeTrigger = 0;}

          if (!ok && !first) {
            console.log('kostil');
              if (!checkInterval) {
                _check();
                checkInterval = true;
                if (window.currentSound == '3') {
                  setTimeout(function() {checkInterval = false; _check(); console.log('check done');}, 7600)
                } else {
                  setTimeout(function() {checkInterval = false; _check(); console.log('check done');}, 7100)
                }
              }
          }

            return true;
        };
        self.stop = function() {
          timeTrigger = 0;
          setInterval(function() {
            timeTrigger++;
          },500);
            if (!_playing) {
                return false;
            }

            if (css3) {
                if (beforeTransition) {
                    beforeTransition.transform = beforeTransition.img.css('transform');
                    beforeTransition.transition = beforeTransition.img.css('transition');

                    beforeTransition.img.css('transform', '');
                }

                if (currentTransition) {
                    currentTransition.transform = currentTransition.img.css('transform');
                    currentTransition.transition = currentTransition.img.css('transition');

                    currentTransition.img.css('transform', '');
                }
            } else {
                if (beforeTransition) {
                    if (beforeTransition.tween) {
                        beforeTransition.tween.pause();
                    }

                    if (beforeTransition.tweenFadeIn) {
                        beforeTransition.tweenFadeIn.pause();
                    }

                    if (beforeTransition.tweenFadeOut) {
                        beforeTransition.tweenFadeOut.pause();
                    }
                }

                if (currentTransition) {
                    if (currentTransition.tween) {
                        currentTransition.tween.pause();
                    }

                    if (currentTransition.tweenFadeIn) {
                        currentTransition.tweenFadeIn.pause();
                    }

                    if (currentTransition.tweenFadeOut) {
                        currentTransition.tweenFadeOut.pause();
                    }
                }
            }

            _playing = false;

            return true;
        };

        self.isPlaying = function() {
            return _playing;
        };

        self.isLoaded = function() {
            return _loaded;
        };

        self.next = function() {
          console.log('NEEEEEEEXT');
          console.log(self);

        };

        self.prev = function() {


        };

        self.currentPhoto = function() {
            return currentTransition ? currentTransition.index : 0;
        };

        self.numPhotos = function() {
            return self.length;
        };

        self.load = function() {
            self.each(function(index, img) {
                if (img.complete) {
                    _load(index, img);
                } else {
                    $(img).one('load', function() {
                        _load(index, img);
                    });
                }
            });
        };

        // ---

        _container.css({
            'position': 'relative',
            'overflow': 'hidden'
        });

        if (_randomize) {
            self.sort(function() {
                return 0.5 - Math.random();
            });
        }

        self.hide();

        if (_autoload) {
            self.load();
        }

        // ---

        return self;
    };

}(jQuery));