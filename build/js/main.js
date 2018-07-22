var Main =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/kenzo/build/js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var DeviceDetection = __webpack_require__(1);
	var Helpers = __webpack_require__(2);
	var Animation = __webpack_require__(3);
	var Carousel = __webpack_require__(4);
	var Share = __webpack_require__(5);

	$(document).ready(function () {

	  DeviceDetection.run();
	  Helpers.init();
	  Carousel.init();
	  Share.init();
	  Animation.init();

	  $.afterlag(function () {
	    $('html').addClass('is-loaded');
	  });

	  $('html').addClass('is-animating');
	});

	/**
	 * Список экспортируемых модулей, чтобы иметь к ним доступ извне
	 * @example
	 * Main.Form.isFormValid();
	 */
	module.exports = {
	  DeviceDetection: DeviceDetection,
	  Helpers: Helpers,
	  Carousel: Carousel,
	  Share: Share,
	  Animation: Animation
		};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	var breakpoints = {
	  sm: 767,
	  md: 1024,
	  lg: 1280,
	  xl: 1600
	};

	function isMobile() {
	  return $(window).width() <= breakpoints.sm;
	}
	function isTablet() {
	  return $(window).width() > breakpoints.sm && $(window).width() <= breakpoints.md;
	}
	function isDesktopExt() {
	  return $(window).width() >= breakpoints.md;
	}
	function isDesktop() {
	  return $(window).width() > breakpoints.md;
	}
	function isTouch() {
	  return 'ontouchstart' in window || navigator.maxTouchPoints;
	}
	function isMobileVersion() {
	  return !!~window.location.href.indexOf("/mobile/");
	}

	function run() {
	  if (isTouch()) {
	    $('html').removeClass('no-touch').addClass('touch');
	  } else {
	    $('html').removeClass('touch').addClass('no-touch');
	  }
	}

	module.exports = { run: run, isTouch: isTouch, isMobile: isMobile, isTablet: isTablet, isDesktop: isDesktop, isDesktopExt: isDesktopExt, isMobileVersion: isMobileVersion };

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Helpers
	 * @module Helpers
	 */

	/**
	 * Calculate scrollbar width in element
	 * - if the width is 0 it means the scrollbar is floated/overlayed
	 * - accepts "container" paremeter because ie & edge can have different
	 *   scrollbar behaviors for different elements using '-ms-overflow-style'
	 */
	function getNativeScrollbarWidth(container) {
	  container = container || document.body;

	  var fullWidth = 0;
	  var barWidth = 0;

	  var wrapper = document.createElement('div');
	  var child = document.createElement('div');

	  wrapper.style.position = 'absolute';
	  wrapper.style.pointerEvents = 'none';
	  wrapper.style.bottom = '0';
	  wrapper.style.right = '0';
	  wrapper.style.width = '100px';
	  wrapper.style.overflow = 'hidden';

	  wrapper.appendChild(child);
	  container.appendChild(wrapper);

	  fullWidth = child.offsetWidth;
	  wrapper.style.overflowY = 'scroll';
	  barWidth = fullWidth - child.offsetWidth;

	  container.removeChild(wrapper);

	  return barWidth;
	}

	/**
	 * Throttle Helper
	 * https://remysharp.com/2010/07/21/throttling-function-calls
	 */
	function throttle(fn, threshhold, scope) {
	  threshhold || (threshhold = 250);
	  var last = void 0,
	      deferTimer = void 0;
	  return function () {
	    var context = scope || this;

	    var now = +new Date(),
	        args = arguments;
	    if (last && now < last + threshhold) {
	      // hold on to it
	      clearTimeout(deferTimer);
	      deferTimer = setTimeout(function () {
	        last = now;
	        fn.apply(context, args);
	      }, threshhold);
	    } else {
	      last = now;
	      fn.apply(context, args);
	    }
	  };
	}

	/** 
	 * Debounce Helper
	 * https://remysharp.com/2010/07/21/throttling-function-calls
	 */
	function debounce(fn, delay) {
	  var timer = null;
	  return function () {
	    var context = this,
	        args = arguments;
	    clearTimeout(timer);
	    timer = setTimeout(function () {
	      fn.apply(context, args);
	    }, delay);
	  };
	};

	var timer = void 0;
	var timeout = false;
	var delta = 200;
	function resizeEnd() {
	  if (new Date() - timer < delta) {
	    setTimeout(resizeEnd, delta);
	  } else {
	    timeout = false;
	    $(window).trigger('resizeend');
	  }
	}

	function toggleClassIf(el, cond, toggledClass) {
	  if (cond) {
	    el.addClass(toggledClass);
	  } else {
	    el.removeClass(toggledClass);
	  }
	}

	/**
	 * Функция добавляет к элементу класс, если страница прокручена больше, чем на указанное значение, 
	 * и убирает класс, если значение меньше
	 * @param {object} el - элемент, с которым взаимодействуем
	 * @param {mixed} [scrollValue=0] - значение прокрутки, на котором меняем css-класс, ожидаемое значение - число или ключевое слово 'this'. Если передано 'this', подставляется положение el.offset().top минус половина высоты экрана
	 * @param {string} [toggledClass=scrolled] - css-класс, который переключаем
	 */
	function toggleElementClassOnScroll(el) {
	  var scrollValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  var toggledClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'scrolled';

	  if (el.length == 0) {
	    //console.error("Необходимо передать объект, с которым вы хотите взаимодействовать");
	    return false;
	  }

	  if (scrollValue == 'this') {
	    scrollValue = el.offset().top - $(window).outerHeight() / 2;
	  }

	  $(window).on('scroll', function (e) {
	    if ($(window).scrollTop() > scrollValue) {
	      el.addClass(toggledClass);
	    } else {
	      el.removeClass(toggledClass);
	    }
	  });
	};

	/**
	 * инициализация событий для переключателей классов
	 * @example
	 * Helpers.init();
	 */
	function init() {

	  toggleElementClassOnScroll($('.header'), 50);

	  $('.js-hide-block').on('click', function () {
	    var block = $(this).data('target') === 'self' ? $(this).parent() : $(this).data('target');
	    block.fadeOut(500);
	  });

	  $(window).on('resize', function () {
	    timer = new Date();
	    if (timeout === false) {
	      timeout = true;
	      setTimeout(resizeEnd, delta);
	    }
	  });

	  $('.btn-menu').on('click', function () {
	    $(this).toggleClass('is-open');
	    $('.header').toggleClass('is-open');
	    $('.main-nav').fadeToggle(500);
	    if (Main.DeviceDetection.isDesktopExt()) {
	      $('.main-nav-opposite').fadeToggle(500);
	    }
	    if (Main.DeviceDetection.isMobile() || Main.DeviceDetection.isTablet()) {
	      if ($('.header').hasClass('is-open')) {
	        $('html, body').css('overflow-y', 'hidden');
	      } else {
	        $('html, body').css('overflow-y', '');
	      }
	    }
	  });

	  $(window).scroll($.debounce(250, true, function () {
	    $('html').addClass('is-scrolling');
	  }));
	  $(window).scroll($.debounce(250, function () {
	    $('html').removeClass('is-scrolling');
	  }));
	}

	module.exports = { init: init, toggleClassIf: toggleClassIf, toggleElementClassOnScroll: toggleElementClassOnScroll };

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Переключение классов по различным событиям
	 * @module Animation
	 */

	function clearStyle(el) {
	  $(el).css({ "transform": "" });
	}

	function init() {
	  var controller = new ScrollMagic.Controller();
	  var tl = new TimelineMax()
	  // .screen--0 stage 1
	  .set(".screen--0 .anim-img", { className: "+=stage-1" }, "+=1").set(".screen--0 .dot--0", { className: "-=active" }).set(".screen--0 .dot--1", { className: "+=active" }).to(".screen--0 .anim-title", 1, { y: "-300%", ease: Linear.easeNone }, '-=1').to(".header__text", 0.3, { opacity: 0, ease: Linear.easeNone }, '-=1').to(".screen--0 .anim-text", 3, { y: "0%", ease: Linear.easeNone }, '+=2').to(".anim-bg.ll", 3, { opacity: 1, ease: Linear.ease }, '-=2').to(".screen--0 .anim-text", 3, { y: "-150%", ease: Linear.easeNone }).to(".anim-bg.ll", 3, { opacity: 0, ease: Linear.ease }, '-=2').set(".screen--0 .anim-img", { className: "+=stage-out" }).set(".screen--0 .slide--0 .js-tp", { className: "+=active" }).set(".screen--0 .slide--0 .js-tp", { className: "-=active" }, '+=2').to(".screen--0", 2, { y: "-100%", ease: Linear.easeNone }).to(".screen--0 .anim-img", 2, { scale: 1.1, y: "0%", ease: Linear.easeNone, onReverseComplete: clearStyle, onReverseCompleteParams: ['.screen--0 .anim-img'] }, '-=2')
	  // .screen--1 stage 1
	  .set(".screen--1 .anim-img", { className: "+=stage-1" }, "+=1").set(".screen--1 .dot--0", { className: "-=active" }).set(".screen--1 .dot--1", { className: "+=active" }).to(".screen--1 .slide--0 .anim-text", 3, { y: "0%", ease: Linear.easeNone }, "+=2").to(".anim-bg.ll", 3, { opacity: 1, ease: Linear.ease }, '-=2').to(".screen--1 .slide--0 .anim-text", 3, { y: "-150%", ease: Linear.easeNone }).to(".anim-bg.ll", 3, { opacity: 0, ease: Linear.ease }, '-=2').set(".screen--1 .slide--0 .js-tp", { className: "+=active" }).set(".screen--1 .slide--0 .js-tp", { className: "-=active" }, '+=2')
	  // .screen--1 stage 2
	  .set(".screen--1 .anim-img", { className: "+=stage-2" }, "+=1").set(".screen--1 .dot--1", { className: "-=active" }).set(".screen--1 .dot--2", { className: "+=active" }).to(".screen--1 .slide--1 .anim-text", 3, { y: "0%", ease: Linear.easeNone }, "+=2").to(".anim-bg.br", 3, { opacity: 1, ease: Linear.ease }, '-=2').to(".screen--1 .slide--1 .anim-text", 3, { y: "-150%", ease: Linear.easeNone }).to(".anim-bg.br", 3, { opacity: 0, ease: Linear.ease }, '-=2').set(".screen--1 .anim-img", { className: "+=stage-out" }).set(".screen--1 .slide--1 .js-tp", { className: "+=active" }).set(".screen--1 .slide--1 .js-tp", { className: "-=active" }, '+=2').to(".screen--1", 2, { y: "-100%", ease: Linear.easeNone }).to(".screen--1 .anim-img", 2, { y: "70%", ease: Linear.easeNone, onReverseComplete: clearStyle, onReverseCompleteParams: ['.screen--1 .anim-img'] }, '-=2')
	  // .screen--2 stage 1
	  .set(".screen--2 .anim-img", { className: "+=stage-1" }, "+=1").set(".screen--2 .dot--0", { className: "-=active" }).set(".screen--2 .dot--1", { className: "+=active" }).to(".screen--2 .anim-text", 3, { y: "0%", ease: Linear.easeNone }, "+=2").to(".anim-bg.ll", 3, { opacity: 1, ease: Linear.ease }, '-=2').to(".screen--2 .anim-text", 3, { y: "-150%", ease: Linear.easeNone }).to(".anim-bg.ll", 3, { opacity: 0, ease: Linear.ease }, '-=2').set(".screen--2 .anim-img", { className: "+=stage-out" }).set(".screen--2 .slide--0 .js-tp", { className: "+=active" }).set(".screen--2 .slide--0 .js-tp", { className: "-=active" }, '+=2').to(".screen--2", 2, { y: "-100%", ease: Linear.easeNone }).to(".screen--2 .anim-img", 2, { scale: 1.1, x: "-50%", y: "-50%", ease: Linear.easeNone, onReverseComplete: clearStyle, onReverseCompleteParams: ['.screen--2 .anim-img'] }, '-=2')
	  // .screen--3 stage 1
	  .set(".screen--3 .anim-img", { className: "+=stage-1" }, "+=1").set(".screen--3 .dot--0", { className: "-=active" }).set(".screen--3 .dot--1", { className: "+=active" }).to(".screen--3 .slide--0 .anim-text", 3, { y: "0%", ease: Linear.easeNone }, "+=2").to(".anim-bg.bl", 3, { opacity: 1, ease: Linear.ease }, '-=2').to(".screen--3 .slide--0 .anim-text", 3, { y: "-530%", ease: Linear.easeNone }).to(".anim-bg.bl", 3, { opacity: 0, ease: Linear.ease }, '-=2').set(".screen--3 .slide--0 .js-tp", { className: "+=active" }).set(".screen--3 .slide--0 .js-tp", { className: "-=active" }, '+=2')
	  // .screen--3 stage 2
	  .set(".screen--3 .anim-img", { className: "+=stage-2" }, "+=1").set(".screen--3 .dot--1", { className: "-=active" }).set(".screen--3 .dot--2", { className: "+=active" }).to(".screen--3 .slide--1 .anim-text", 3, { y: "0%", ease: Linear.easeNone }, "+=2").to(".anim-bg.lr", 3, { opacity: 1, ease: Linear.ease }, '-=2').to(".screen--3 .slide--1 .anim-text", 3, { y: "-150%", ease: Linear.easeNone }).to(".anim-bg.lr", 3, { opacity: 0, ease: Linear.ease }, '-=2').set(".screen--3 .anim-img", { className: "+=stage-out" }).set(".screen--3 .slide--1 .js-tp", { className: "+=active" }).set(".screen--3 .slide--1 .js-tp", { className: "-=active" }, '+=2').to(".screen--3", 2, { y: "-100%", ease: Linear.easeNone }).to(".screen--3 .anim-img", 2, { scale: 2, y: "75%", ease: Linear.easeNone, onReverseComplete: clearStyle, onReverseCompleteParams: ['.screen--3 .anim-img'] }, '-=2')
	  // .screen--4 stage 1
	  .set(".screen--4 .anim-img", { className: "+=stage-1" }, "+=1").set(".screen--4 .dot--0", { className: "-=active" }).set(".screen--4 .dot--1", { className: "+=active" }).to(".screen--4 .anim-text", 3, { y: "0%", ease: Linear.easeNone }, "+=2").to(".anim-bg.bl", 3, { opacity: 1, ease: Linear.ease }, '-=2').to(".screen--4 .anim-text", 3, { y: "-150%", ease: Linear.easeNone }).to(".anim-bg.bl", 3, { opacity: 0, ease: Linear.ease }, '-=2').set(".screen--4 .anim-img", { className: "+=stage-out" }).set(".screen--4 .slide--0 .js-tp", { className: "+=active" }).set(".screen--4 .slide--0 .js-tp", { className: "-=active" }, '+=2').to(".screen--4", 2, { y: "-100%", ease: Linear.easeNone }).to(".screen--4 .anim-img", 2, { scale: 1.1, ease: Linear.easeNone, onReverseComplete: clearStyle, onReverseCompleteParams: ['.screen--4 .anim-img'] }, '-=2')
	  // .screen--5 stage 1
	  .set(".screen--5 .anim-img", { className: "+=stage-1" }, "+=1").set(".screen--5 .dot--0", { className: "-=active" }).set(".screen--5 .dot--1", { className: "+=active" }).to(".screen--5 .slide--0 .anim-text", 3, { y: "0%", ease: Linear.easeNone }, "+=2").to(".anim-bg.br", 3.5, { opacity: 1, ease: Linear.ease }, '-=2.5').to(".screen--5 .slide--0 .anim-text", 3.5, { y: "-170%", ease: Linear.easeNone }).to(".anim-bg.br", 3.5, { opacity: 0, ease: Linear.ease }, '-=2.5').set(".screen--5 .slide--0 .js-tp", { className: "+=active" }).set(".screen--5 .slide--0 .js-tp", { className: "-=active" }, '+=2')
	  // .screen--5 stage 2
	  .set(".screen--5 .anim-img", { className: "+=stage-2" }, "+=1").set(".screen--5 .dot--1", { className: "-=active" }).set(".screen--5 .dot--2", { className: "+=active" }).to(".screen--5 .slide--1 .anim-text", 3, { y: "0%", ease: Linear.easeNone }, "+=2").to(".anim-bg.ll", 3, { opacity: 1, ease: Linear.ease }, '-=2').to(".screen--5 .slide--1 .anim-text", 3, { y: "-150%", ease: Linear.easeNone }).to(".anim-bg.ll", 3, { opacity: 0, ease: Linear.ease }, '-=2').set(".screen--5 .slide--1 .js-tp", { className: "+=active" });

	  new ScrollMagic.Scene({
	    triggerElement: '.page',
	    triggerHook: "onLeave",
	    duration: "2700%"
	  }).setPin(".page").setTween(tl).addTo(controller);

	  $('.js-trigger').hover(function () {
	    $(this).siblings('.js-product').addClass('open');
	  });
	}

	module.exports = { init: init };

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Карусель
	 * @module Carousel
	 */

	var carousel = void 0;

	/**
	 * Инициализация карусели
	 */
	function init() {
	  carousel = $(".owl-carousel.carousel--default");

	  carousel.owlCarousel({
	    items: 1,
	    nav: true,
	    navText: ['<svg class="icon"><use xlink:href="#arr-prev"/></svg>', '<svg class="icon"><use xlink:href="#arr-next"/></svg>'],
	    dots: true,
	    loop: true,
	    mouseDrag: false,
	    animateOut: 'fadeOut'
	  });
	}

	module.exports = { init: init };

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	function getIcon(el) {
	  var icon = '';
	  if (el.hasClass('ya-share2__item_service_vkontakte')) {
	    icon = 'vk';
	  }
	  if (el.hasClass('ya-share2__item_service_facebook')) {
	    icon = 'fb';
	  }
	  if (el.hasClass('ya-share2__item_service_twitter')) {
	    icon = 'tw';
	  }
	  return '<svg class="icon social-icon"><use xlink:href="#' + icon + '"/></svg>';
	}
	function fillIcons() {
	  $('#share .ya-share2__item').each(function () {
	    $(this).find('.ya-share2__icon').html(getIcon($(this)));
	  });
	}
	function init() {
	  Ya.share2('share', {
	    content: {
	      url: window.location.href,
	      title: 'Aqua Kenzo',
	      description: "",
	      //image: 'build/img/share.jpg'
	      image: 'http://nioxin30days.elle.ru/build/img/share.jpg'
	    },
	    theme: {
	      services: 'vkontakte,facebook,twitter',
	      bare: true,
	      lang: 'ru'
	    },
	    hooks: {
	      onready: function onready() {
	        fillIcons();
	      }
	    }
	  });
	}
	module.exports = { init: init };

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2NTQxNTI0MGJkYjhkZWMxYzZhMiIsIndlYnBhY2s6Ly8vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2FuaW1hdGlvbi5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL2NvbXBvbmVudHMvY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL3NoYXJlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9rZW56by9idWlsZC9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2NTQxNTI0MGJkYjhkZWMxYzZhMiIsImxldCBEZXZpY2VEZXRlY3Rpb24gPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb25cIik7XHJcbmxldCBIZWxwZXJzID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9oZWxwZXJzXCIpO1xyXG5sZXQgQW5pbWF0aW9uID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9hbmltYXRpb25cIik7XHJcbmxldCBDYXJvdXNlbCA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvY2Fyb3VzZWxcIik7XHJcbmxldCBTaGFyZSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvc2hhcmVcIik7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gIFxyXG4gIERldmljZURldGVjdGlvbi5ydW4oKTtcclxuICBIZWxwZXJzLmluaXQoKTtcclxuICBDYXJvdXNlbC5pbml0KCk7XHJcbiAgU2hhcmUuaW5pdCgpO1xyXG4gIEFuaW1hdGlvbi5pbml0KCk7XHJcbiAgXHJcbiAgJC5hZnRlcmxhZyhmdW5jdGlvbigpe1xyXG4gICAgJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1sb2FkZWQnKTtcclxuICB9KTtcclxuICBcclxuICAkKCdodG1sJykuYWRkQ2xhc3MoJ2lzLWFuaW1hdGluZycpO1xyXG4gIFxyXG59KTtcclxuXHJcblxyXG4vKipcclxuICog0KHQv9C40YHQvtC6INGN0LrRgdC/0L7RgNGC0LjRgNGD0LXQvNGL0YUg0LzQvtC00YPQu9C10LksINGH0YLQvtCx0Ysg0LjQvNC10YLRjCDQuiDQvdC40Lwg0LTQvtGB0YLRg9C/INC40LfQstC90LVcclxuICogQGV4YW1wbGVcclxuICogTWFpbi5Gb3JtLmlzRm9ybVZhbGlkKCk7XHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBEZXZpY2VEZXRlY3Rpb24sXHJcbiAgSGVscGVycyxcclxuXHRDYXJvdXNlbCxcclxuICBTaGFyZSxcclxuICBBbmltYXRpb25cclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL21haW4uanMiLCJsZXQgYnJlYWtwb2ludHMgPSB7XHJcbiAgc206IDc2NyxcclxuICBtZDogMTAyNCxcclxuICBsZzogMTI4MCxcclxuICB4bDogMTYwMFxyXG59O1xyXG5cclxuZnVuY3Rpb24gaXNNb2JpbGUoKXtcclxuICByZXR1cm4gKCQod2luZG93KS53aWR0aCgpIDw9IGJyZWFrcG9pbnRzLnNtKTtcclxufVxyXG5mdW5jdGlvbiBpc1RhYmxldCgpe1xyXG4gIHJldHVybiAoJCh3aW5kb3cpLndpZHRoKCkgPiBicmVha3BvaW50cy5zbSAmJiAkKHdpbmRvdykud2lkdGgoKSA8PSBicmVha3BvaW50cy5tZClcclxufVxyXG5mdW5jdGlvbiBpc0Rlc2t0b3BFeHQoKXtcclxuICByZXR1cm4gKCQod2luZG93KS53aWR0aCgpID49IGJyZWFrcG9pbnRzLm1kKVxyXG59XHJcbmZ1bmN0aW9uIGlzRGVza3RvcCgpe1xyXG4gIHJldHVybiAoJCh3aW5kb3cpLndpZHRoKCkgPiBicmVha3BvaW50cy5tZClcclxufVxyXG5mdW5jdGlvbiBpc1RvdWNoKCl7XHJcbiAgcmV0dXJuICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyB8fCBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHM7XHJcbn1cclxuZnVuY3Rpb24gaXNNb2JpbGVWZXJzaW9uKCl7XHJcbiAgcmV0dXJuICEhfndpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoXCIvbW9iaWxlL1wiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcnVuKCl7XHJcbiAgaWYoaXNUb3VjaCgpKXtcclxuICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygnbm8tdG91Y2gnKS5hZGRDbGFzcygndG91Y2gnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCd0b3VjaCcpLmFkZENsYXNzKCduby10b3VjaCcpO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7cnVuLCBpc1RvdWNoLCBpc01vYmlsZSwgaXNUYWJsZXQsIGlzRGVza3RvcCwgaXNEZXNrdG9wRXh0LCBpc01vYmlsZVZlcnNpb259O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9kZXZpY2UtZGV0ZWN0aW9uLmpzIiwiLyoqXHJcbiAqIEhlbHBlcnNcclxuICogQG1vZHVsZSBIZWxwZXJzXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZSBzY3JvbGxiYXIgd2lkdGggaW4gZWxlbWVudFxyXG4gKiAtIGlmIHRoZSB3aWR0aCBpcyAwIGl0IG1lYW5zIHRoZSBzY3JvbGxiYXIgaXMgZmxvYXRlZC9vdmVybGF5ZWRcclxuICogLSBhY2NlcHRzIFwiY29udGFpbmVyXCIgcGFyZW1ldGVyIGJlY2F1c2UgaWUgJiBlZGdlIGNhbiBoYXZlIGRpZmZlcmVudFxyXG4gKiAgIHNjcm9sbGJhciBiZWhhdmlvcnMgZm9yIGRpZmZlcmVudCBlbGVtZW50cyB1c2luZyAnLW1zLW92ZXJmbG93LXN0eWxlJ1xyXG4gKi9cclxuZnVuY3Rpb24gZ2V0TmF0aXZlU2Nyb2xsYmFyV2lkdGggKGNvbnRhaW5lcikge1xyXG4gIGNvbnRhaW5lciA9IGNvbnRhaW5lciB8fCBkb2N1bWVudC5ib2R5O1xyXG5cclxuICBsZXQgZnVsbFdpZHRoID0gMDtcclxuICBsZXQgYmFyV2lkdGggPSAwO1xyXG5cclxuICBsZXQgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIGxldCBjaGlsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICB3cmFwcGVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICB3cmFwcGVyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XHJcbiAgd3JhcHBlci5zdHlsZS5ib3R0b20gPSAnMCc7XHJcbiAgd3JhcHBlci5zdHlsZS5yaWdodCA9ICcwJztcclxuICB3cmFwcGVyLnN0eWxlLndpZHRoID0gJzEwMHB4JztcclxuICB3cmFwcGVyLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblxyXG4gIHdyYXBwZXIuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcclxuXHJcbiAgZnVsbFdpZHRoID0gY2hpbGQub2Zmc2V0V2lkdGg7XHJcbiAgd3JhcHBlci5zdHlsZS5vdmVyZmxvd1kgPSAnc2Nyb2xsJztcclxuICBiYXJXaWR0aCA9IGZ1bGxXaWR0aCAtIGNoaWxkLm9mZnNldFdpZHRoO1xyXG5cclxuICBjb250YWluZXIucmVtb3ZlQ2hpbGQod3JhcHBlcik7XHJcblxyXG4gIHJldHVybiBiYXJXaWR0aDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRocm90dGxlIEhlbHBlclxyXG4gKiBodHRwczovL3JlbXlzaGFycC5jb20vMjAxMC8wNy8yMS90aHJvdHRsaW5nLWZ1bmN0aW9uLWNhbGxzXHJcbiAqL1xyXG5mdW5jdGlvbiB0aHJvdHRsZSAoZm4sIHRocmVzaGhvbGQsIHNjb3BlKSB7XHJcbiAgdGhyZXNoaG9sZCB8fCAodGhyZXNoaG9sZCA9IDI1MCk7XHJcbiAgbGV0IGxhc3QsXHJcbiAgICBkZWZlclRpbWVyO1xyXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgY29udGV4dCA9IHNjb3BlIHx8IHRoaXM7XHJcblxyXG4gICAgbGV0IG5vdyA9ICtuZXcgRGF0ZSgpLFxyXG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgaWYgKGxhc3QgJiYgbm93IDwgbGFzdCArIHRocmVzaGhvbGQpIHtcclxuICAgICAgLy8gaG9sZCBvbiB0byBpdFxyXG4gICAgICBjbGVhclRpbWVvdXQoZGVmZXJUaW1lcik7XHJcbiAgICAgIGRlZmVyVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsYXN0ID0gbm93O1xyXG4gICAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgICB9LCB0aHJlc2hob2xkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxhc3QgPSBub3c7XHJcbiAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqIFxyXG4gKiBEZWJvdW5jZSBIZWxwZXJcclxuICogaHR0cHM6Ly9yZW15c2hhcnAuY29tLzIwMTAvMDcvMjEvdGhyb3R0bGluZy1mdW5jdGlvbi1jYWxsc1xyXG4gKi9cclxuZnVuY3Rpb24gZGVib3VuY2UgKGZuLCBkZWxheSkge1xyXG4gIGxldCB0aW1lciA9IG51bGw7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcclxuICAgIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgIH0sIGRlbGF5KTtcclxuICB9O1xyXG59O1xyXG5cclxubGV0IHRpbWVyO1xyXG5sZXQgdGltZW91dCA9IGZhbHNlO1xyXG5sZXQgZGVsdGEgPSAyMDA7XHJcbmZ1bmN0aW9uIHJlc2l6ZUVuZCgpIHtcclxuICBpZiAobmV3IERhdGUoKSAtIHRpbWVyIDwgZGVsdGEpIHtcclxuICAgIHNldFRpbWVvdXQocmVzaXplRW5kLCBkZWx0YSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRpbWVvdXQgPSBmYWxzZTtcclxuICAgICQod2luZG93KS50cmlnZ2VyKCdyZXNpemVlbmQnKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZUNsYXNzSWYoZWwsIGNvbmQsIHRvZ2dsZWRDbGFzcyl7XHJcblx0aWYoY29uZCl7XHJcblx0XHRlbC5hZGRDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRlbC5yZW1vdmVDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqINCk0YPQvdC60YbQuNGPINC00L7QsdCw0LLQu9GP0LXRgiDQuiDRjdC70LXQvNC10L3RgtGDINC60LvQsNGB0YEsINC10YHQu9C4INGB0YLRgNCw0L3QuNGG0LAg0L/RgNC+0LrRgNGD0YfQtdC90LAg0LHQvtC70YzRiNC1LCDRh9C10Lwg0L3QsCDRg9C60LDQt9Cw0L3QvdC+0LUg0LfQvdCw0YfQtdC90LjQtSwgXHJcbiAqINC4INGD0LHQuNGA0LDQtdGCINC60LvQsNGB0YEsINC10YHQu9C4INC30L3QsNGH0LXQvdC40LUg0LzQtdC90YzRiNC1XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBlbCAtINGN0LvQtdC80LXQvdGCLCDRgSDQutC+0YLQvtGA0YvQvCDQstC30LDQuNC80L7QtNC10LnRgdGC0LLRg9C10LxcclxuICogQHBhcmFtIHttaXhlZH0gW3Njcm9sbFZhbHVlPTBdIC0g0LfQvdCw0YfQtdC90LjQtSDQv9GA0L7QutGA0YPRgtC60LgsINC90LAg0LrQvtGC0L7RgNC+0Lwg0LzQtdC90Y/QtdC8IGNzcy3QutC70LDRgdGBLCDQvtC20LjQtNCw0LXQvNC+0LUg0LfQvdCw0YfQtdC90LjQtSAtINGH0LjRgdC70L4g0LjQu9C4INC60LvRjtGH0LXQstC+0LUg0YHQu9C+0LLQviAndGhpcycuINCV0YHQu9C4INC/0LXRgNC10LTQsNC90L4gJ3RoaXMnLCDQv9C+0LTRgdGC0LDQstC70Y/QtdGC0YHRjyDQv9C+0LvQvtC20LXQvdC40LUgZWwub2Zmc2V0KCkudG9wINC80LjQvdGD0YEg0L/QvtC70L7QstC40L3QsCDQstGL0YHQvtGC0Ysg0Y3QutGA0LDQvdCwXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdG9nZ2xlZENsYXNzPXNjcm9sbGVkXSAtIGNzcy3QutC70LDRgdGBLCDQutC+0YLQvtGA0YvQuSDQv9C10YDQtdC60LvRjtGH0LDQtdC8XHJcbiAqL1xyXG5mdW5jdGlvbiB0b2dnbGVFbGVtZW50Q2xhc3NPblNjcm9sbChlbCwgc2Nyb2xsVmFsdWUgPSAwLCB0b2dnbGVkQ2xhc3MgPSAnc2Nyb2xsZWQnKXtcclxuXHRpZihlbC5sZW5ndGggPT0gMCkge1xyXG5cdFx0Ly9jb25zb2xlLmVycm9yKFwi0J3QtdC+0LHRhdC+0LTQuNC80L4g0L/QtdGA0LXQtNCw0YLRjCDQvtCx0YrQtdC60YIsINGBINC60L7RgtC+0YDRi9C8INCy0Ysg0YXQvtGC0LjRgtC1INCy0LfQsNC40LzQvtC00LXQudGB0YLQstC+0LLQsNGC0YxcIik7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdFxyXG5cdGlmKHNjcm9sbFZhbHVlID09ICd0aGlzJykge1xyXG5cdFx0c2Nyb2xsVmFsdWUgPSBlbC5vZmZzZXQoKS50b3AgLSAkKHdpbmRvdykub3V0ZXJIZWlnaHQoKSAvIDI7XHJcblx0fVxyXG5cdFxyXG5cdCQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oZSl7XHJcblx0XHRpZigkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiBzY3JvbGxWYWx1ZSl7XHJcblx0XHRcdGVsLmFkZENsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlbC5yZW1vdmVDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INC00LvRjyDQv9C10YDQtdC60LvRjtGH0LDRgtC10LvQtdC5INC60LvQsNGB0YHQvtCyXHJcbiAqIEBleGFtcGxlXHJcbiAqIEhlbHBlcnMuaW5pdCgpO1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gIFxyXG4gIHRvZ2dsZUVsZW1lbnRDbGFzc09uU2Nyb2xsKCQoJy5oZWFkZXInKSwgNTApO1xyXG4gIFxyXG4gICQoJy5qcy1oaWRlLWJsb2NrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIGxldCBibG9jayA9ICQodGhpcykuZGF0YSgndGFyZ2V0JykgPT09ICdzZWxmJyA/ICQodGhpcykucGFyZW50KCkgOiAkKHRoaXMpLmRhdGEoJ3RhcmdldCcpO1xyXG4gICAgYmxvY2suZmFkZU91dCg1MDApO1xyXG4gIH0pO1xyXG4gIFxyXG4gICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24gKCkge1xyXG4gICAgdGltZXIgPSBuZXcgRGF0ZSgpO1xyXG4gICAgaWYgKHRpbWVvdXQgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRpbWVvdXQgPSB0cnVlO1xyXG4gICAgICBzZXRUaW1lb3V0KHJlc2l6ZUVuZCwgZGVsdGEpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIFxyXG4gICQoJy5idG4tbWVudScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAkKCcuaGVhZGVyJykudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICQoJy5tYWluLW5hdicpLmZhZGVUb2dnbGUoNTAwKTtcclxuICAgIGlmIChNYWluLkRldmljZURldGVjdGlvbi5pc0Rlc2t0b3BFeHQoKSkge1xyXG4gICAgICAkKCcubWFpbi1uYXYtb3Bwb3NpdGUnKS5mYWRlVG9nZ2xlKDUwMCk7XHJcbiAgICB9XHJcbiAgICBpZiAoTWFpbi5EZXZpY2VEZXRlY3Rpb24uaXNNb2JpbGUoKSB8fCBNYWluLkRldmljZURldGVjdGlvbi5pc1RhYmxldCgpKSB7XHJcbiAgICAgIGlmICgkKCcuaGVhZGVyJykuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnaGlkZGVuJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cteScsICcnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG4gIFxyXG4gICQod2luZG93KS5zY3JvbGwoJC5kZWJvdW5jZSgyNTAsIHRydWUsIGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1zY3JvbGxpbmcnKTtcclxuICB9KSk7XHJcbiAgJCh3aW5kb3cpLnNjcm9sbCgkLmRlYm91bmNlKDI1MCwgZnVuY3Rpb24oKSB7XHJcbiAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ2lzLXNjcm9sbGluZycpO1xyXG4gIH0pKTtcclxuICBcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdCwgdG9nZ2xlQ2xhc3NJZiwgdG9nZ2xlRWxlbWVudENsYXNzT25TY3JvbGx9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9oZWxwZXJzLmpzIiwiLyoqXHJcbiAqINCf0LXRgNC10LrQu9GO0YfQtdC90LjQtSDQutC70LDRgdGB0L7QsiDQv9C+INGA0LDQt9C70LjRh9C90YvQvCDRgdC+0LHRi9GC0LjRj9C8XHJcbiAqIEBtb2R1bGUgQW5pbWF0aW9uXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gY2xlYXJTdHlsZSAoZWwpIHtcclxuICAkKGVsKS5jc3Moe1widHJhbnNmb3JtXCI6IFwiXCJ9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdCAoKSB7XHJcbiAgbGV0IGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xyXG4gIGxldCB0bCA9IG5ldyBUaW1lbGluZU1heCgpXHJcbiAgICAvLyAuc2NyZWVuLS0wIHN0YWdlIDFcclxuICAgIC5zZXQoXCIuc2NyZWVuLS0wIC5hbmltLWltZ1wiLCB7Y2xhc3NOYW1lOiBcIis9c3RhZ2UtMVwifSwgXCIrPTFcIilcclxuICAgIC5zZXQoXCIuc2NyZWVuLS0wIC5kb3QtLTBcIiwge2NsYXNzTmFtZTogXCItPWFjdGl2ZVwifSlcclxuICAgIC5zZXQoXCIuc2NyZWVuLS0wIC5kb3QtLTFcIiwge2NsYXNzTmFtZTogXCIrPWFjdGl2ZVwifSlcclxuICAgIC50byhcIi5zY3JlZW4tLTAgLmFuaW0tdGl0bGVcIiwgMSwgXHJcbiAgICAgIHt5OiBcIi0zMDAlXCIsIGVhc2U6IExpbmVhci5lYXNlTm9uZX0sICctPTEnKVxyXG4gICAgLnRvKFwiLmhlYWRlcl9fdGV4dFwiLCAwLjMsIFxyXG4gICAgICB7b3BhY2l0eTogMCwgZWFzZTogTGluZWFyLmVhc2VOb25lfSwgJy09MScpXHJcbiAgICAudG8oXCIuc2NyZWVuLS0wIC5hbmltLXRleHRcIiwgMywgXHJcbiAgICAgIHt5OiBcIjAlXCIsIGVhc2U6IExpbmVhci5lYXNlTm9uZX0sICcrPTInKVxyXG4gICAgLnRvKFwiLmFuaW0tYmcubGxcIiwgMywgXHJcbiAgICAgIHtvcGFjaXR5OiAxLCBlYXNlOiBMaW5lYXIuZWFzZX0sICctPTInKVxyXG4gICAgLnRvKFwiLnNjcmVlbi0tMCAuYW5pbS10ZXh0XCIsIDMsXHJcbiAgICAgIHt5OiBcIi0xNTAlXCIsIGVhc2U6IExpbmVhci5lYXNlTm9uZX0pXHJcbiAgICAudG8oXCIuYW5pbS1iZy5sbFwiLCAzLCBcclxuICAgICAge29wYWNpdHk6IDAsIGVhc2U6IExpbmVhci5lYXNlfSwgJy09MicpXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMCAuYW5pbS1pbWdcIiwge2NsYXNzTmFtZTogXCIrPXN0YWdlLW91dFwifSlcclxuICAgIC5zZXQoXCIuc2NyZWVuLS0wIC5zbGlkZS0tMCAuanMtdHBcIiwge2NsYXNzTmFtZTogXCIrPWFjdGl2ZVwifSlcclxuICAgIC5zZXQoXCIuc2NyZWVuLS0wIC5zbGlkZS0tMCAuanMtdHBcIiwge2NsYXNzTmFtZTogXCItPWFjdGl2ZVwifSwgJys9MicpXHJcbiAgICAudG8oXCIuc2NyZWVuLS0wXCIsIDIsIFxyXG4gICAgICB7eTogXCItMTAwJVwiLCBlYXNlOiBMaW5lYXIuZWFzZU5vbmV9KVxyXG4gICAgLnRvKFwiLnNjcmVlbi0tMCAuYW5pbS1pbWdcIiwgMiwgXHJcbiAgICAgIHtzY2FsZTogMS4xLCB5OiBcIjAlXCIsIGVhc2U6IExpbmVhci5lYXNlTm9uZSwgb25SZXZlcnNlQ29tcGxldGU6IGNsZWFyU3R5bGUsIG9uUmV2ZXJzZUNvbXBsZXRlUGFyYW1zOiBbJy5zY3JlZW4tLTAgLmFuaW0taW1nJ119LCAnLT0yJylcclxuICAgIC8vIC5zY3JlZW4tLTEgc3RhZ2UgMVxyXG4gICAgLnNldChcIi5zY3JlZW4tLTEgLmFuaW0taW1nXCIsIHtjbGFzc05hbWU6IFwiKz1zdGFnZS0xXCJ9LCBcIis9MVwiKVxyXG4gICAgLnNldChcIi5zY3JlZW4tLTEgLmRvdC0tMFwiLCB7Y2xhc3NOYW1lOiBcIi09YWN0aXZlXCJ9KVxyXG4gICAgLnNldChcIi5zY3JlZW4tLTEgLmRvdC0tMVwiLCB7Y2xhc3NOYW1lOiBcIis9YWN0aXZlXCJ9KVxyXG4gICAgLnRvKFwiLnNjcmVlbi0tMSAuc2xpZGUtLTAgLmFuaW0tdGV4dFwiLCAzLCBcclxuICAgICAge3k6IFwiMCVcIiwgZWFzZTogTGluZWFyLmVhc2VOb25lfSwgXCIrPTJcIilcclxuICAgIC50byhcIi5hbmltLWJnLmxsXCIsIDMsIFxyXG4gICAgICB7b3BhY2l0eTogMSwgZWFzZTogTGluZWFyLmVhc2V9LCAnLT0yJylcclxuICAgIC50byhcIi5zY3JlZW4tLTEgLnNsaWRlLS0wIC5hbmltLXRleHRcIiwgMyxcclxuICAgICAge3k6IFwiLTE1MCVcIiwgZWFzZTogTGluZWFyLmVhc2VOb25lfSlcclxuICAgIC50byhcIi5hbmltLWJnLmxsXCIsIDMsIFxyXG4gICAgICB7b3BhY2l0eTogMCwgZWFzZTogTGluZWFyLmVhc2V9LCAnLT0yJylcclxuICAgIC5zZXQoXCIuc2NyZWVuLS0xIC5zbGlkZS0tMCAuanMtdHBcIiwge2NsYXNzTmFtZTogXCIrPWFjdGl2ZVwifSlcclxuICAgIC5zZXQoXCIuc2NyZWVuLS0xIC5zbGlkZS0tMCAuanMtdHBcIiwge2NsYXNzTmFtZTogXCItPWFjdGl2ZVwifSwgJys9MicpXHJcbiAgICAvLyAuc2NyZWVuLS0xIHN0YWdlIDJcclxuICAgIC5zZXQoXCIuc2NyZWVuLS0xIC5hbmltLWltZ1wiLCB7Y2xhc3NOYW1lOiBcIis9c3RhZ2UtMlwifSwgXCIrPTFcIilcclxuICAgIC5zZXQoXCIuc2NyZWVuLS0xIC5kb3QtLTFcIiwge2NsYXNzTmFtZTogXCItPWFjdGl2ZVwifSlcclxuICAgIC5zZXQoXCIuc2NyZWVuLS0xIC5kb3QtLTJcIiwge2NsYXNzTmFtZTogXCIrPWFjdGl2ZVwifSlcclxuICAgIC50byhcIi5zY3JlZW4tLTEgLnNsaWRlLS0xIC5hbmltLXRleHRcIiwgMywgXHJcbiAgICAgIHt5OiBcIjAlXCIsIGVhc2U6IExpbmVhci5lYXNlTm9uZX0sIFwiKz0yXCIpXHJcbiAgICAudG8oXCIuYW5pbS1iZy5iclwiLCAzLCBcclxuICAgICAge29wYWNpdHk6IDEsIGVhc2U6IExpbmVhci5lYXNlfSwgJy09MicpXHJcbiAgICAudG8oXCIuc2NyZWVuLS0xIC5zbGlkZS0tMSAuYW5pbS10ZXh0XCIsIDMsXHJcbiAgICAgIHt5OiBcIi0xNTAlXCIsIGVhc2U6IExpbmVhci5lYXNlTm9uZX0pXHJcbiAgICAudG8oXCIuYW5pbS1iZy5iclwiLCAzLCBcclxuICAgICAge29wYWNpdHk6IDAsIGVhc2U6IExpbmVhci5lYXNlfSwgJy09MicpXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMSAuYW5pbS1pbWdcIiwge2NsYXNzTmFtZTogXCIrPXN0YWdlLW91dFwifSlcclxuICAgIC5zZXQoXCIuc2NyZWVuLS0xIC5zbGlkZS0tMSAuanMtdHBcIiwge2NsYXNzTmFtZTogXCIrPWFjdGl2ZVwifSlcclxuICAgIC5zZXQoXCIuc2NyZWVuLS0xIC5zbGlkZS0tMSAuanMtdHBcIiwge2NsYXNzTmFtZTogXCItPWFjdGl2ZVwifSwgJys9MicpXHJcbiAgICAudG8oXCIuc2NyZWVuLS0xXCIsIDIsIFxyXG4gICAgICB7eTogXCItMTAwJVwiLCBlYXNlOiBMaW5lYXIuZWFzZU5vbmV9KVxyXG4gICAgLnRvKFwiLnNjcmVlbi0tMSAuYW5pbS1pbWdcIiwgMiwgXHJcbiAgICAgIHt5OiBcIjcwJVwiLCBlYXNlOiBMaW5lYXIuZWFzZU5vbmUsIG9uUmV2ZXJzZUNvbXBsZXRlOiBjbGVhclN0eWxlLCBvblJldmVyc2VDb21wbGV0ZVBhcmFtczogWycuc2NyZWVuLS0xIC5hbmltLWltZyddfSwgJy09MicpXHJcbiAgICAvLyAuc2NyZWVuLS0yIHN0YWdlIDFcclxuICAgIC5zZXQoXCIuc2NyZWVuLS0yIC5hbmltLWltZ1wiLCB7Y2xhc3NOYW1lOiBcIis9c3RhZ2UtMVwifSwgXCIrPTFcIilcclxuICAgIC5zZXQoXCIuc2NyZWVuLS0yIC5kb3QtLTBcIiwge2NsYXNzTmFtZTogXCItPWFjdGl2ZVwifSlcclxuICAgIC5zZXQoXCIuc2NyZWVuLS0yIC5kb3QtLTFcIiwge2NsYXNzTmFtZTogXCIrPWFjdGl2ZVwifSlcclxuICAgIC50byhcIi5zY3JlZW4tLTIgLmFuaW0tdGV4dFwiLCAzLCBcclxuICAgICAge3k6IFwiMCVcIiwgZWFzZTogTGluZWFyLmVhc2VOb25lfSwgXCIrPTJcIilcclxuICAgIC50byhcIi5hbmltLWJnLmxsXCIsIDMsIFxyXG4gICAgICB7b3BhY2l0eTogMSwgZWFzZTogTGluZWFyLmVhc2V9LCAnLT0yJylcclxuICAgIC50byhcIi5zY3JlZW4tLTIgLmFuaW0tdGV4dFwiLCAzLFxyXG4gICAgICB7eTogXCItMTUwJVwiLCBlYXNlOiBMaW5lYXIuZWFzZU5vbmV9KVxyXG4gICAgLnRvKFwiLmFuaW0tYmcubGxcIiwgMywgXHJcbiAgICAgIHtvcGFjaXR5OiAwLCBlYXNlOiBMaW5lYXIuZWFzZX0sICctPTInKVxyXG4gICAgLnNldChcIi5zY3JlZW4tLTIgLmFuaW0taW1nXCIsIHtjbGFzc05hbWU6IFwiKz1zdGFnZS1vdXRcIn0pXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMiAuc2xpZGUtLTAgLmpzLXRwXCIsIHtjbGFzc05hbWU6IFwiKz1hY3RpdmVcIn0pXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMiAuc2xpZGUtLTAgLmpzLXRwXCIsIHtjbGFzc05hbWU6IFwiLT1hY3RpdmVcIn0sICcrPTInKVxyXG4gICAgLnRvKFwiLnNjcmVlbi0tMlwiLCAyLCBcclxuICAgICAge3k6IFwiLTEwMCVcIiwgZWFzZTogTGluZWFyLmVhc2VOb25lfSlcclxuICAgIC50byhcIi5zY3JlZW4tLTIgLmFuaW0taW1nXCIsIDIsIFxyXG4gICAgICB7c2NhbGU6IDEuMSwgeDogXCItNTAlXCIsIHk6IFwiLTUwJVwiLCBlYXNlOiBMaW5lYXIuZWFzZU5vbmUsIG9uUmV2ZXJzZUNvbXBsZXRlOiBjbGVhclN0eWxlLCBvblJldmVyc2VDb21wbGV0ZVBhcmFtczogWycuc2NyZWVuLS0yIC5hbmltLWltZyddfSwgJy09MicpXHJcbiAgICAvLyAuc2NyZWVuLS0zIHN0YWdlIDFcclxuICAgIC5zZXQoXCIuc2NyZWVuLS0zIC5hbmltLWltZ1wiLCB7Y2xhc3NOYW1lOiBcIis9c3RhZ2UtMVwifSwgXCIrPTFcIilcclxuICAgIC5zZXQoXCIuc2NyZWVuLS0zIC5kb3QtLTBcIiwge2NsYXNzTmFtZTogXCItPWFjdGl2ZVwifSlcclxuICAgIC5zZXQoXCIuc2NyZWVuLS0zIC5kb3QtLTFcIiwge2NsYXNzTmFtZTogXCIrPWFjdGl2ZVwifSlcclxuICAgIC50byhcIi5zY3JlZW4tLTMgLnNsaWRlLS0wIC5hbmltLXRleHRcIiwgMywgXHJcbiAgICAgIHt5OiBcIjAlXCIsIGVhc2U6IExpbmVhci5lYXNlTm9uZX0sIFwiKz0yXCIpXHJcbiAgICAudG8oXCIuYW5pbS1iZy5ibFwiLCAzLCBcclxuICAgICAge29wYWNpdHk6IDEsIGVhc2U6IExpbmVhci5lYXNlfSwgJy09MicpXHJcbiAgICAudG8oXCIuc2NyZWVuLS0zIC5zbGlkZS0tMCAuYW5pbS10ZXh0XCIsIDMsXHJcbiAgICAgIHt5OiBcIi01MzAlXCIsIGVhc2U6IExpbmVhci5lYXNlTm9uZX0pXHJcbiAgICAudG8oXCIuYW5pbS1iZy5ibFwiLCAzLCBcclxuICAgICAge29wYWNpdHk6IDAsIGVhc2U6IExpbmVhci5lYXNlfSwgJy09MicpXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMyAuc2xpZGUtLTAgLmpzLXRwXCIsIHtjbGFzc05hbWU6IFwiKz1hY3RpdmVcIn0pXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMyAuc2xpZGUtLTAgLmpzLXRwXCIsIHtjbGFzc05hbWU6IFwiLT1hY3RpdmVcIn0sICcrPTInKVxyXG4gICAgLy8gLnNjcmVlbi0tMyBzdGFnZSAyXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMyAuYW5pbS1pbWdcIiwge2NsYXNzTmFtZTogXCIrPXN0YWdlLTJcIn0sIFwiKz0xXCIpXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMyAuZG90LS0xXCIsIHtjbGFzc05hbWU6IFwiLT1hY3RpdmVcIn0pXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMyAuZG90LS0yXCIsIHtjbGFzc05hbWU6IFwiKz1hY3RpdmVcIn0pXHJcbiAgICAudG8oXCIuc2NyZWVuLS0zIC5zbGlkZS0tMSAuYW5pbS10ZXh0XCIsIDMsIFxyXG4gICAgICB7eTogXCIwJVwiLCBlYXNlOiBMaW5lYXIuZWFzZU5vbmV9LCBcIis9MlwiKVxyXG4gICAgLnRvKFwiLmFuaW0tYmcubHJcIiwgMywgXHJcbiAgICAgIHtvcGFjaXR5OiAxLCBlYXNlOiBMaW5lYXIuZWFzZX0sICctPTInKVxyXG4gICAgLnRvKFwiLnNjcmVlbi0tMyAuc2xpZGUtLTEgLmFuaW0tdGV4dFwiLCAzLFxyXG4gICAgICB7eTogXCItMTUwJVwiLCBlYXNlOiBMaW5lYXIuZWFzZU5vbmV9KVxyXG4gICAgLnRvKFwiLmFuaW0tYmcubHJcIiwgMywgXHJcbiAgICAgIHtvcGFjaXR5OiAwLCBlYXNlOiBMaW5lYXIuZWFzZX0sICctPTInKVxyXG4gICAgLnNldChcIi5zY3JlZW4tLTMgLmFuaW0taW1nXCIsIHtjbGFzc05hbWU6IFwiKz1zdGFnZS1vdXRcIn0pXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMyAuc2xpZGUtLTEgLmpzLXRwXCIsIHtjbGFzc05hbWU6IFwiKz1hY3RpdmVcIn0pXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMyAuc2xpZGUtLTEgLmpzLXRwXCIsIHtjbGFzc05hbWU6IFwiLT1hY3RpdmVcIn0sICcrPTInKVxyXG4gICAgLnRvKFwiLnNjcmVlbi0tM1wiLCAyLCBcclxuICAgICAge3k6IFwiLTEwMCVcIiwgZWFzZTogTGluZWFyLmVhc2VOb25lfSlcclxuICAgIC50byhcIi5zY3JlZW4tLTMgLmFuaW0taW1nXCIsIDIsIFxyXG4gICAgICB7c2NhbGU6IDIsIHk6IFwiNzUlXCIsIGVhc2U6IExpbmVhci5lYXNlTm9uZSwgb25SZXZlcnNlQ29tcGxldGU6IGNsZWFyU3R5bGUsIG9uUmV2ZXJzZUNvbXBsZXRlUGFyYW1zOiBbJy5zY3JlZW4tLTMgLmFuaW0taW1nJ119LCAnLT0yJylcclxuICAgIC8vIC5zY3JlZW4tLTQgc3RhZ2UgMVxyXG4gICAgLnNldChcIi5zY3JlZW4tLTQgLmFuaW0taW1nXCIsIHtjbGFzc05hbWU6IFwiKz1zdGFnZS0xXCJ9LCBcIis9MVwiKVxyXG4gICAgLnNldChcIi5zY3JlZW4tLTQgLmRvdC0tMFwiLCB7Y2xhc3NOYW1lOiBcIi09YWN0aXZlXCJ9KVxyXG4gICAgLnNldChcIi5zY3JlZW4tLTQgLmRvdC0tMVwiLCB7Y2xhc3NOYW1lOiBcIis9YWN0aXZlXCJ9KVxyXG4gICAgLnRvKFwiLnNjcmVlbi0tNCAuYW5pbS10ZXh0XCIsIDMsIFxyXG4gICAgICB7eTogXCIwJVwiLCBlYXNlOiBMaW5lYXIuZWFzZU5vbmV9LCBcIis9MlwiKVxyXG4gICAgLnRvKFwiLmFuaW0tYmcuYmxcIiwgMywgXHJcbiAgICAgIHtvcGFjaXR5OiAxLCBlYXNlOiBMaW5lYXIuZWFzZX0sICctPTInKVxyXG4gICAgLnRvKFwiLnNjcmVlbi0tNCAuYW5pbS10ZXh0XCIsIDMsXHJcbiAgICAgIHt5OiBcIi0xNTAlXCIsIGVhc2U6IExpbmVhci5lYXNlTm9uZX0pXHJcbiAgICAudG8oXCIuYW5pbS1iZy5ibFwiLCAzLCBcclxuICAgICAge29wYWNpdHk6IDAsIGVhc2U6IExpbmVhci5lYXNlfSwgJy09MicpXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tNCAuYW5pbS1pbWdcIiwge2NsYXNzTmFtZTogXCIrPXN0YWdlLW91dFwifSlcclxuICAgIC5zZXQoXCIuc2NyZWVuLS00IC5zbGlkZS0tMCAuanMtdHBcIiwge2NsYXNzTmFtZTogXCIrPWFjdGl2ZVwifSlcclxuICAgIC5zZXQoXCIuc2NyZWVuLS00IC5zbGlkZS0tMCAuanMtdHBcIiwge2NsYXNzTmFtZTogXCItPWFjdGl2ZVwifSwgJys9MicpXHJcbiAgICAudG8oXCIuc2NyZWVuLS00XCIsIDIsIFxyXG4gICAgICB7eTogXCItMTAwJVwiLCBlYXNlOiBMaW5lYXIuZWFzZU5vbmV9KVxyXG4gICAgLnRvKFwiLnNjcmVlbi0tNCAuYW5pbS1pbWdcIiwgMiwgXHJcbiAgICAgIHtzY2FsZTogMS4xLCBlYXNlOiBMaW5lYXIuZWFzZU5vbmUsIG9uUmV2ZXJzZUNvbXBsZXRlOiBjbGVhclN0eWxlLCBvblJldmVyc2VDb21wbGV0ZVBhcmFtczogWycuc2NyZWVuLS00IC5hbmltLWltZyddfSwgJy09MicpXHJcbiAgICAvLyAuc2NyZWVuLS01IHN0YWdlIDFcclxuICAgIC5zZXQoXCIuc2NyZWVuLS01IC5hbmltLWltZ1wiLCB7Y2xhc3NOYW1lOiBcIis9c3RhZ2UtMVwifSwgXCIrPTFcIilcclxuICAgIC5zZXQoXCIuc2NyZWVuLS01IC5kb3QtLTBcIiwge2NsYXNzTmFtZTogXCItPWFjdGl2ZVwifSlcclxuICAgIC5zZXQoXCIuc2NyZWVuLS01IC5kb3QtLTFcIiwge2NsYXNzTmFtZTogXCIrPWFjdGl2ZVwifSlcclxuICAgIC50byhcIi5zY3JlZW4tLTUgLnNsaWRlLS0wIC5hbmltLXRleHRcIiwgMywgXHJcbiAgICAgIHt5OiBcIjAlXCIsIGVhc2U6IExpbmVhci5lYXNlTm9uZX0sIFwiKz0yXCIpXHJcbiAgICAudG8oXCIuYW5pbS1iZy5iclwiLCAzLjUsIFxyXG4gICAgICB7b3BhY2l0eTogMSwgZWFzZTogTGluZWFyLmVhc2V9LCAnLT0yLjUnKVxyXG4gICAgLnRvKFwiLnNjcmVlbi0tNSAuc2xpZGUtLTAgLmFuaW0tdGV4dFwiLCAzLjUsXHJcbiAgICAgIHt5OiBcIi0xNzAlXCIsIGVhc2U6IExpbmVhci5lYXNlTm9uZX0pXHJcbiAgICAudG8oXCIuYW5pbS1iZy5iclwiLCAzLjUsIFxyXG4gICAgICB7b3BhY2l0eTogMCwgZWFzZTogTGluZWFyLmVhc2V9LCAnLT0yLjUnKVxyXG4gICAgLnNldChcIi5zY3JlZW4tLTUgLnNsaWRlLS0wIC5qcy10cFwiLCB7Y2xhc3NOYW1lOiBcIis9YWN0aXZlXCJ9KVxyXG4gICAgLnNldChcIi5zY3JlZW4tLTUgLnNsaWRlLS0wIC5qcy10cFwiLCB7Y2xhc3NOYW1lOiBcIi09YWN0aXZlXCJ9LCAnKz0yJylcclxuICAgIC8vIC5zY3JlZW4tLTUgc3RhZ2UgMlxyXG4gICAgLnNldChcIi5zY3JlZW4tLTUgLmFuaW0taW1nXCIsIHtjbGFzc05hbWU6IFwiKz1zdGFnZS0yXCJ9LCBcIis9MVwiKVxyXG4gICAgLnNldChcIi5zY3JlZW4tLTUgLmRvdC0tMVwiLCB7Y2xhc3NOYW1lOiBcIi09YWN0aXZlXCJ9KVxyXG4gICAgLnNldChcIi5zY3JlZW4tLTUgLmRvdC0tMlwiLCB7Y2xhc3NOYW1lOiBcIis9YWN0aXZlXCJ9KVxyXG4gICAgLnRvKFwiLnNjcmVlbi0tNSAuc2xpZGUtLTEgLmFuaW0tdGV4dFwiLCAzLCBcclxuICAgICAge3k6IFwiMCVcIiwgZWFzZTogTGluZWFyLmVhc2VOb25lfSwgXCIrPTJcIilcclxuICAgIC50byhcIi5hbmltLWJnLmxsXCIsIDMsIFxyXG4gICAgICB7b3BhY2l0eTogMSwgZWFzZTogTGluZWFyLmVhc2V9LCAnLT0yJylcclxuICAgIC50byhcIi5zY3JlZW4tLTUgLnNsaWRlLS0xIC5hbmltLXRleHRcIiwgMyxcclxuICAgICAge3k6IFwiLTE1MCVcIiwgZWFzZTogTGluZWFyLmVhc2VOb25lfSlcclxuICAgIC50byhcIi5hbmltLWJnLmxsXCIsIDMsIFxyXG4gICAgICB7b3BhY2l0eTogMCwgZWFzZTogTGluZWFyLmVhc2V9LCAnLT0yJylcclxuICAgIC5zZXQoXCIuc2NyZWVuLS01IC5zbGlkZS0tMSAuanMtdHBcIiwge2NsYXNzTmFtZTogXCIrPWFjdGl2ZVwifSk7XHJcbiAgXHJcbiAgbmV3IFNjcm9sbE1hZ2ljLlNjZW5lKHtcclxuICAgIHRyaWdnZXJFbGVtZW50OiAnLnBhZ2UnLFxyXG4gICAgdHJpZ2dlckhvb2s6IFwib25MZWF2ZVwiLFxyXG4gICAgZHVyYXRpb246IFwiMjcwMCVcIlxyXG4gIH0pXHJcbiAgICAuc2V0UGluKFwiLnBhZ2VcIilcclxuICAgIC5zZXRUd2Vlbih0bClcclxuICAgIC5hZGRUbyhjb250cm9sbGVyKTtcclxuICBcclxuICAkKCcuanMtdHJpZ2dlcicpLmhvdmVyKGZ1bmN0aW9uKCl7XHJcbiAgICAkKHRoaXMpLnNpYmxpbmdzKCcuanMtcHJvZHVjdCcpLmFkZENsYXNzKCdvcGVuJyk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9hbmltYXRpb24uanMiLCIvKipcclxuICog0JrQsNGA0YPRgdC10LvRjFxyXG4gKiBAbW9kdWxlIENhcm91c2VsXHJcbiAqL1xyXG5cclxubGV0IGNhcm91c2VsO1xyXG5cclxuLyoqXHJcbiAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINC60LDRgNGD0YHQtdC70LhcclxuICovXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuICBjYXJvdXNlbCA9ICQoXCIub3dsLWNhcm91c2VsLmNhcm91c2VsLS1kZWZhdWx0XCIpO1xyXG5cclxuICBjYXJvdXNlbC5vd2xDYXJvdXNlbCh7XHJcbiAgICBpdGVtczogMSxcclxuICAgIG5hdjogdHJ1ZSxcclxuICAgIG5hdlRleHQ6IFsnPHN2ZyBjbGFzcz1cImljb25cIj48dXNlIHhsaW5rOmhyZWY9XCIjYXJyLXByZXZcIi8+PC9zdmc+JywgJzxzdmcgY2xhc3M9XCJpY29uXCI+PHVzZSB4bGluazpocmVmPVwiI2Fyci1uZXh0XCIvPjwvc3ZnPiddLFxyXG4gICAgZG90czogdHJ1ZSxcclxuICAgIGxvb3A6IHRydWUsXHJcbiAgICBtb3VzZURyYWc6IGZhbHNlLFxyXG4gICAgYW5pbWF0ZU91dDogJ2ZhZGVPdXQnXHJcbiAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9jYXJvdXNlbC5qcyIsImZ1bmN0aW9uIGdldEljb24oZWwpIHtcclxuICBsZXQgaWNvbiA9ICcnO1xyXG4gIGlmIChlbC5oYXNDbGFzcygneWEtc2hhcmUyX19pdGVtX3NlcnZpY2VfdmtvbnRha3RlJykpIHtcclxuICAgIGljb24gPSAndmsnO1xyXG4gIH1cclxuICBpZiAoZWwuaGFzQ2xhc3MoJ3lhLXNoYXJlMl9faXRlbV9zZXJ2aWNlX2ZhY2Vib29rJykpIHtcclxuICAgIGljb24gPSAnZmInO1xyXG4gIH1cclxuICBpZiAoZWwuaGFzQ2xhc3MoJ3lhLXNoYXJlMl9faXRlbV9zZXJ2aWNlX3R3aXR0ZXInKSkge1xyXG4gICAgaWNvbiA9ICd0dyc7XHJcbiAgfVxyXG4gIHJldHVybiAnPHN2ZyBjbGFzcz1cImljb24gc29jaWFsLWljb25cIj48dXNlIHhsaW5rOmhyZWY9XCIjJyArIGljb24gKyAnXCIvPjwvc3ZnPic7XHJcbn1cclxuZnVuY3Rpb24gZmlsbEljb25zKCkge1xyXG4gICQoJyNzaGFyZSAueWEtc2hhcmUyX19pdGVtJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgJCh0aGlzKS5maW5kKCcueWEtc2hhcmUyX19pY29uJykuaHRtbChnZXRJY29uKCQodGhpcykpKTtcclxuICB9KTtcclxufVxyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gIFlhLnNoYXJlMignc2hhcmUnLCB7XHJcbiAgICBjb250ZW50OiB7XHJcbiAgICAgIHVybDogd2luZG93LmxvY2F0aW9uLmhyZWYsXHJcbiAgICAgIHRpdGxlOiAnQXF1YSBLZW56bycsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxyXG4gICAgICAvL2ltYWdlOiAnYnVpbGQvaW1nL3NoYXJlLmpwZydcclxuICAgICAgaW1hZ2U6ICdodHRwOi8vbmlveGluMzBkYXlzLmVsbGUucnUvYnVpbGQvaW1nL3NoYXJlLmpwZydcclxuICAgIH0sXHJcbiAgICB0aGVtZToge1xyXG4gICAgICBzZXJ2aWNlczogJ3Zrb250YWt0ZSxmYWNlYm9vayx0d2l0dGVyJyxcclxuICAgICAgYmFyZTogdHJ1ZSxcclxuICAgICAgbGFuZzogJ3J1J1xyXG4gICAgfSxcclxuICAgIGhvb2tzOiB7XHJcbiAgICAgIG9ucmVhZHk6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGZpbGxJY29ucygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL3NoYXJlLmpzIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBOzs7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDakNBOzs7OztBQUtBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBT0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOzs7Ozs7Ozs7QUM3S0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBd0JBO0FBeEJBO0FBc0NBO0FBdENBO0FBeURBO0FBekRBO0FBNEVBO0FBNUVBO0FBMEZBO0FBMUZBO0FBNkdBO0FBN0dBO0FBZ0lBO0FBaElBO0FBOElBO0FBOUlBO0FBQ0E7QUEySkE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDcExBOzs7OztBQUtBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBU0E7QUFDQTs7Ozs7Ozs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBYkE7QUFtQkE7Ozs7Iiwic291cmNlUm9vdCI6IiJ9