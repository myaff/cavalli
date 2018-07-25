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
	  Share.init();

	  $.afterlag(function () {
	    $('html').addClass('is-loaded');
	  });

	  $('html').addClass('is-animating');

	  if (!DeviceDetection.isMobileVersion()) {
	    Animation.init();
	  }
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
	  .set(".screen--5 .anim-img", { className: "+=stage-2" }, "+=1").set(".screen--5 .dot--1", { className: "-=active" }).set(".screen--5 .dot--2", { className: "+=active" }).to(".screen--5 .slide--1 .anim-text", 3, { y: "0%", ease: Linear.easeNone }, "+=2").to(".anim-bg.ll", 4, { opacity: 1, ease: Linear.ease }, '-=2').to(".screen--5 .slide--1 .anim-text", 4, { y: "-200%", ease: Linear.easeNone }).to(".anim-bg.ll", 4, { opacity: 0, ease: Linear.ease }, '-=2').set(".screen--5 .slide--1 .js-tp", { className: "+=active" }).set(".screen--5 .slide--1 .js-tp", { className: "-=active" }, '+=2');

	  new ScrollMagic.Scene({
	    triggerElement: '.page',
	    triggerHook: "onLeave",
	    duration: "2800%"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzNWJkOGRlNjdlOTU4NTUxMGI1NSIsIndlYnBhY2s6Ly8vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2FuaW1hdGlvbi5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL2NvbXBvbmVudHMvY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL3NoYXJlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9rZW56by9idWlsZC9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzNWJkOGRlNjdlOTU4NTUxMGI1NSIsImxldCBEZXZpY2VEZXRlY3Rpb24gPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb25cIik7XHJcbmxldCBIZWxwZXJzID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9oZWxwZXJzXCIpO1xyXG5sZXQgQW5pbWF0aW9uID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9hbmltYXRpb25cIik7XHJcbmxldCBDYXJvdXNlbCA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvY2Fyb3VzZWxcIik7XHJcbmxldCBTaGFyZSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvc2hhcmVcIik7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gIFxyXG4gIERldmljZURldGVjdGlvbi5ydW4oKTtcclxuICBIZWxwZXJzLmluaXQoKTtcclxuICBTaGFyZS5pbml0KCk7XHJcbiAgXHJcbiAgJC5hZnRlcmxhZyhmdW5jdGlvbigpe1xyXG4gICAgJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1sb2FkZWQnKTtcclxuICB9KTtcclxuICBcclxuICAkKCdodG1sJykuYWRkQ2xhc3MoJ2lzLWFuaW1hdGluZycpO1xyXG4gIFxyXG4gIGlmICghRGV2aWNlRGV0ZWN0aW9uLmlzTW9iaWxlVmVyc2lvbigpKSB7XHJcbiAgICBBbmltYXRpb24uaW5pdCgpO1xyXG4gIH1cclxuICBcclxufSk7XHJcblxyXG5cclxuLyoqXHJcbiAqINCh0L/QuNGB0L7QuiDRjdC60YHQv9C+0YDRgtC40YDRg9C10LzRi9GFINC80L7QtNGD0LvQtdC5LCDRh9GC0L7QsdGLINC40LzQtdGC0Ywg0Log0L3QuNC8INC00L7RgdGC0YPQvyDQuNC30LLQvdC1XHJcbiAqIEBleGFtcGxlXHJcbiAqIE1haW4uRm9ybS5pc0Zvcm1WYWxpZCgpO1xyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgRGV2aWNlRGV0ZWN0aW9uLFxyXG4gIEhlbHBlcnMsXHJcblx0Q2Fyb3VzZWwsXHJcbiAgU2hhcmUsXHJcbiAgQW5pbWF0aW9uXHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9tYWluLmpzIiwibGV0IGJyZWFrcG9pbnRzID0ge1xyXG4gIHNtOiA3NjcsXHJcbiAgbWQ6IDEwMjQsXHJcbiAgbGc6IDEyODAsXHJcbiAgeGw6IDE2MDBcclxufTtcclxuXHJcbmZ1bmN0aW9uIGlzTW9iaWxlKCl7XHJcbiAgcmV0dXJuICgkKHdpbmRvdykud2lkdGgoKSA8PSBicmVha3BvaW50cy5zbSk7XHJcbn1cclxuZnVuY3Rpb24gaXNUYWJsZXQoKXtcclxuICByZXR1cm4gKCQod2luZG93KS53aWR0aCgpID4gYnJlYWtwb2ludHMuc20gJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gYnJlYWtwb2ludHMubWQpXHJcbn1cclxuZnVuY3Rpb24gaXNEZXNrdG9wRXh0KCl7XHJcbiAgcmV0dXJuICgkKHdpbmRvdykud2lkdGgoKSA+PSBicmVha3BvaW50cy5tZClcclxufVxyXG5mdW5jdGlvbiBpc0Rlc2t0b3AoKXtcclxuICByZXR1cm4gKCQod2luZG93KS53aWR0aCgpID4gYnJlYWtwb2ludHMubWQpXHJcbn1cclxuZnVuY3Rpb24gaXNUb3VjaCgpe1xyXG4gIHJldHVybiAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgfHwgbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzO1xyXG59XHJcbmZ1bmN0aW9uIGlzTW9iaWxlVmVyc2lvbigpe1xyXG4gIHJldHVybiAhIX53aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKFwiL21vYmlsZS9cIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJ1bigpe1xyXG4gIGlmKGlzVG91Y2goKSl7XHJcbiAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ25vLXRvdWNoJykuYWRkQ2xhc3MoJ3RvdWNoJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygndG91Y2gnKS5hZGRDbGFzcygnbm8tdG91Y2gnKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge3J1biwgaXNUb3VjaCwgaXNNb2JpbGUsIGlzVGFibGV0LCBpc0Rlc2t0b3AsIGlzRGVza3RvcEV4dCwgaXNNb2JpbGVWZXJzaW9ufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvZGV2aWNlLWRldGVjdGlvbi5qcyIsIi8qKlxyXG4gKiBIZWxwZXJzXHJcbiAqIEBtb2R1bGUgSGVscGVyc1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBDYWxjdWxhdGUgc2Nyb2xsYmFyIHdpZHRoIGluIGVsZW1lbnRcclxuICogLSBpZiB0aGUgd2lkdGggaXMgMCBpdCBtZWFucyB0aGUgc2Nyb2xsYmFyIGlzIGZsb2F0ZWQvb3ZlcmxheWVkXHJcbiAqIC0gYWNjZXB0cyBcImNvbnRhaW5lclwiIHBhcmVtZXRlciBiZWNhdXNlIGllICYgZWRnZSBjYW4gaGF2ZSBkaWZmZXJlbnRcclxuICogICBzY3JvbGxiYXIgYmVoYXZpb3JzIGZvciBkaWZmZXJlbnQgZWxlbWVudHMgdXNpbmcgJy1tcy1vdmVyZmxvdy1zdHlsZSdcclxuICovXHJcbmZ1bmN0aW9uIGdldE5hdGl2ZVNjcm9sbGJhcldpZHRoIChjb250YWluZXIpIHtcclxuICBjb250YWluZXIgPSBjb250YWluZXIgfHwgZG9jdW1lbnQuYm9keTtcclxuXHJcbiAgbGV0IGZ1bGxXaWR0aCA9IDA7XHJcbiAgbGV0IGJhcldpZHRoID0gMDtcclxuXHJcbiAgbGV0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBsZXQgY2hpbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgd3JhcHBlci5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgd3JhcHBlci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xyXG4gIHdyYXBwZXIuc3R5bGUuYm90dG9tID0gJzAnO1xyXG4gIHdyYXBwZXIuc3R5bGUucmlnaHQgPSAnMCc7XHJcbiAgd3JhcHBlci5zdHlsZS53aWR0aCA9ICcxMDBweCc7XHJcbiAgd3JhcHBlci5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cclxuICB3cmFwcGVyLmFwcGVuZENoaWxkKGNoaWxkKTtcclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQod3JhcHBlcik7XHJcblxyXG4gIGZ1bGxXaWR0aCA9IGNoaWxkLm9mZnNldFdpZHRoO1xyXG4gIHdyYXBwZXIuc3R5bGUub3ZlcmZsb3dZID0gJ3Njcm9sbCc7XHJcbiAgYmFyV2lkdGggPSBmdWxsV2lkdGggLSBjaGlsZC5vZmZzZXRXaWR0aDtcclxuXHJcbiAgY29udGFpbmVyLnJlbW92ZUNoaWxkKHdyYXBwZXIpO1xyXG5cclxuICByZXR1cm4gYmFyV2lkdGg7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaHJvdHRsZSBIZWxwZXJcclxuICogaHR0cHM6Ly9yZW15c2hhcnAuY29tLzIwMTAvMDcvMjEvdGhyb3R0bGluZy1mdW5jdGlvbi1jYWxsc1xyXG4gKi9cclxuZnVuY3Rpb24gdGhyb3R0bGUgKGZuLCB0aHJlc2hob2xkLCBzY29wZSkge1xyXG4gIHRocmVzaGhvbGQgfHwgKHRocmVzaGhvbGQgPSAyNTApO1xyXG4gIGxldCBsYXN0LFxyXG4gICAgZGVmZXJUaW1lcjtcclxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGNvbnRleHQgPSBzY29wZSB8fCB0aGlzO1xyXG5cclxuICAgIGxldCBub3cgPSArbmV3IERhdGUoKSxcclxuICAgICAgYXJncyA9IGFyZ3VtZW50cztcclxuICAgIGlmIChsYXN0ICYmIG5vdyA8IGxhc3QgKyB0aHJlc2hob2xkKSB7XHJcbiAgICAgIC8vIGhvbGQgb24gdG8gaXRcclxuICAgICAgY2xlYXJUaW1lb3V0KGRlZmVyVGltZXIpO1xyXG4gICAgICBkZWZlclRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGFzdCA9IG5vdztcclxuICAgICAgICBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgICAgfSwgdGhyZXNoaG9sZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsYXN0ID0gbm93O1xyXG4gICAgICBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKiBcclxuICogRGVib3VuY2UgSGVscGVyXHJcbiAqIGh0dHBzOi8vcmVteXNoYXJwLmNvbS8yMDEwLzA3LzIxL3Rocm90dGxpbmctZnVuY3Rpb24tY2FsbHNcclxuICovXHJcbmZ1bmN0aW9uIGRlYm91bmNlIChmbiwgZGVsYXkpIHtcclxuICBsZXQgdGltZXIgPSBudWxsO1xyXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICBjbGVhclRpbWVvdXQodGltZXIpO1xyXG4gICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XHJcbiAgICB9LCBkZWxheSk7XHJcbiAgfTtcclxufTtcclxuXHJcbmxldCB0aW1lcjtcclxubGV0IHRpbWVvdXQgPSBmYWxzZTtcclxubGV0IGRlbHRhID0gMjAwO1xyXG5mdW5jdGlvbiByZXNpemVFbmQoKSB7XHJcbiAgaWYgKG5ldyBEYXRlKCkgLSB0aW1lciA8IGRlbHRhKSB7XHJcbiAgICBzZXRUaW1lb3V0KHJlc2l6ZUVuZCwgZGVsdGEpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aW1lb3V0ID0gZmFsc2U7XHJcbiAgICAkKHdpbmRvdykudHJpZ2dlcigncmVzaXplZW5kJyk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVDbGFzc0lmKGVsLCBjb25kLCB0b2dnbGVkQ2xhc3Mpe1xyXG5cdGlmKGNvbmQpe1xyXG5cdFx0ZWwuYWRkQ2xhc3ModG9nZ2xlZENsYXNzKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0ZWwucmVtb3ZlQ2xhc3ModG9nZ2xlZENsYXNzKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQpNGD0L3QutGG0LjRjyDQtNC+0LHQsNCy0LvRj9C10YIg0Log0Y3Qu9C10LzQtdC90YLRgyDQutC70LDRgdGBLCDQtdGB0LvQuCDRgdGC0YDQsNC90LjRhtCwINC/0YDQvtC60YDRg9GH0LXQvdCwINCx0L7Qu9GM0YjQtSwg0YfQtdC8INC90LAg0YPQutCw0LfQsNC90L3QvtC1INC30L3QsNGH0LXQvdC40LUsIFxyXG4gKiDQuCDRg9Cx0LjRgNCw0LXRgiDQutC70LDRgdGBLCDQtdGB0LvQuCDQt9C90LDRh9C10L3QuNC1INC80LXQvdGM0YjQtVxyXG4gKiBAcGFyYW0ge29iamVjdH0gZWwgLSDRjdC70LXQvNC10L3Rgiwg0YEg0LrQvtGC0L7RgNGL0Lwg0LLQt9Cw0LjQvNC+0LTQtdC50YHRgtCy0YPQtdC8XHJcbiAqIEBwYXJhbSB7bWl4ZWR9IFtzY3JvbGxWYWx1ZT0wXSAtINC30L3QsNGH0LXQvdC40LUg0L/RgNC+0LrRgNGD0YLQutC4LCDQvdCwINC60L7RgtC+0YDQvtC8INC80LXQvdGP0LXQvCBjc3Mt0LrQu9Cw0YHRgSwg0L7QttC40LTQsNC10LzQvtC1INC30L3QsNGH0LXQvdC40LUgLSDRh9C40YHQu9C+INC40LvQuCDQutC70Y7Rh9C10LLQvtC1INGB0LvQvtCy0L4gJ3RoaXMnLiDQldGB0LvQuCDQv9C10YDQtdC00LDQvdC+ICd0aGlzJywg0L/QvtC00YHRgtCw0LLQu9GP0LXRgtGB0Y8g0L/QvtC70L7QttC10L3QuNC1IGVsLm9mZnNldCgpLnRvcCDQvNC40L3Rg9GBINC/0L7Qu9C+0LLQuNC90LAg0LLRi9GB0L7RgtGLINGN0LrRgNCw0L3QsFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW3RvZ2dsZWRDbGFzcz1zY3JvbGxlZF0gLSBjc3Mt0LrQu9Cw0YHRgSwg0LrQvtGC0L7RgNGL0Lkg0L/QtdGA0LXQutC70Y7Rh9Cw0LXQvFxyXG4gKi9cclxuZnVuY3Rpb24gdG9nZ2xlRWxlbWVudENsYXNzT25TY3JvbGwoZWwsIHNjcm9sbFZhbHVlID0gMCwgdG9nZ2xlZENsYXNzID0gJ3Njcm9sbGVkJyl7XHJcblx0aWYoZWwubGVuZ3RoID09IDApIHtcclxuXHRcdC8vY29uc29sZS5lcnJvcihcItCd0LXQvtCx0YXQvtC00LjQvNC+INC/0LXRgNC10LTQsNGC0Ywg0L7QsdGK0LXQutGCLCDRgSDQutC+0YLQvtGA0YvQvCDQstGLINGF0L7RgtC40YLQtSDQstC30LDQuNC80L7QtNC10LnRgdGC0LLQvtCy0LDRgtGMXCIpO1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHRcclxuXHRpZihzY3JvbGxWYWx1ZSA9PSAndGhpcycpIHtcclxuXHRcdHNjcm9sbFZhbHVlID0gZWwub2Zmc2V0KCkudG9wIC0gJCh3aW5kb3cpLm91dGVySGVpZ2h0KCkgLyAyO1xyXG5cdH1cclxuXHRcclxuXHQkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0aWYoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gc2Nyb2xsVmFsdWUpe1xyXG5cdFx0XHRlbC5hZGRDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZWwucmVtb3ZlQ2xhc3ModG9nZ2xlZENsYXNzKTtcclxuXHRcdH1cclxuXHR9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuSDQtNC70Y8g0L/QtdGA0LXQutC70Y7Rh9Cw0YLQtdC70LXQuSDQutC70LDRgdGB0L7QslxyXG4gKiBAZXhhbXBsZVxyXG4gKiBIZWxwZXJzLmluaXQoKTtcclxuICovXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuICBcclxuICB0b2dnbGVFbGVtZW50Q2xhc3NPblNjcm9sbCgkKCcuaGVhZGVyJyksIDUwKTtcclxuICBcclxuICAkKCcuanMtaGlkZS1ibG9jaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgYmxvY2sgPSAkKHRoaXMpLmRhdGEoJ3RhcmdldCcpID09PSAnc2VsZicgPyAkKHRoaXMpLnBhcmVudCgpIDogJCh0aGlzKS5kYXRhKCd0YXJnZXQnKTtcclxuICAgIGJsb2NrLmZhZGVPdXQoNTAwKTtcclxuICB9KTtcclxuICBcclxuICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgIHRpbWVyID0gbmV3IERhdGUoKTtcclxuICAgIGlmICh0aW1lb3V0ID09PSBmYWxzZSkge1xyXG4gICAgICB0aW1lb3V0ID0gdHJ1ZTtcclxuICAgICAgc2V0VGltZW91dChyZXNpemVFbmQsIGRlbHRhKTtcclxuICAgIH1cclxuICB9KTtcclxuICBcclxuICAkKCcuYnRuLW1lbnUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgJCh0aGlzKS50b2dnbGVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgJCgnLmhlYWRlcicpLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAkKCcubWFpbi1uYXYnKS5mYWRlVG9nZ2xlKDUwMCk7XHJcbiAgICBpZiAoTWFpbi5EZXZpY2VEZXRlY3Rpb24uaXNEZXNrdG9wRXh0KCkpIHtcclxuICAgICAgJCgnLm1haW4tbmF2LW9wcG9zaXRlJykuZmFkZVRvZ2dsZSg1MDApO1xyXG4gICAgfVxyXG4gICAgaWYgKE1haW4uRGV2aWNlRGV0ZWN0aW9uLmlzTW9iaWxlKCkgfHwgTWFpbi5EZXZpY2VEZXRlY3Rpb24uaXNUYWJsZXQoKSkge1xyXG4gICAgICBpZiAoJCgnLmhlYWRlcicpLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJ2hpZGRlbicpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuICBcclxuICAkKHdpbmRvdykuc2Nyb2xsKCQuZGVib3VuY2UoMjUwLCB0cnVlLCBmdW5jdGlvbigpIHtcclxuICAgICQoJ2h0bWwnKS5hZGRDbGFzcygnaXMtc2Nyb2xsaW5nJyk7XHJcbiAgfSkpO1xyXG4gICQod2luZG93KS5zY3JvbGwoJC5kZWJvdW5jZSgyNTAsIGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCdpcy1zY3JvbGxpbmcnKTtcclxuICB9KSk7XHJcbiAgXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXQsIHRvZ2dsZUNsYXNzSWYsIHRvZ2dsZUVsZW1lbnRDbGFzc09uU2Nyb2xsfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvaGVscGVycy5qcyIsIi8qKlxyXG4gKiDQn9C10YDQtdC60LvRjtGH0LXQvdC40LUg0LrQu9Cw0YHRgdC+0LIg0L/QviDRgNCw0LfQu9C40YfQvdGL0Lwg0YHQvtCx0YvRgtC40Y/QvFxyXG4gKiBAbW9kdWxlIEFuaW1hdGlvblxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIGNsZWFyU3R5bGUgKGVsKSB7XHJcbiAgJChlbCkuY3NzKHtcInRyYW5zZm9ybVwiOiBcIlwifSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXQgKCkge1xyXG4gIGxldCBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcclxuICBsZXQgdGwgPSBuZXcgVGltZWxpbmVNYXgoKVxyXG4gICAgLy8gLnNjcmVlbi0tMCBzdGFnZSAxXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMCAuYW5pbS1pbWdcIiwge2NsYXNzTmFtZTogXCIrPXN0YWdlLTFcIn0sIFwiKz0xXCIpXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMCAuZG90LS0wXCIsIHtjbGFzc05hbWU6IFwiLT1hY3RpdmVcIn0pXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMCAuZG90LS0xXCIsIHtjbGFzc05hbWU6IFwiKz1hY3RpdmVcIn0pXHJcbiAgICAudG8oXCIuc2NyZWVuLS0wIC5hbmltLXRpdGxlXCIsIDEsIFxyXG4gICAgICB7eTogXCItMzAwJVwiLCBlYXNlOiBMaW5lYXIuZWFzZU5vbmV9LCAnLT0xJylcclxuICAgIC50byhcIi5oZWFkZXJfX3RleHRcIiwgMC4zLCBcclxuICAgICAge29wYWNpdHk6IDAsIGVhc2U6IExpbmVhci5lYXNlTm9uZX0sICctPTEnKVxyXG4gICAgLnRvKFwiLnNjcmVlbi0tMCAuYW5pbS10ZXh0XCIsIDMsIFxyXG4gICAgICB7eTogXCIwJVwiLCBlYXNlOiBMaW5lYXIuZWFzZU5vbmV9LCAnKz0yJylcclxuICAgIC50byhcIi5hbmltLWJnLmxsXCIsIDMsIFxyXG4gICAgICB7b3BhY2l0eTogMSwgZWFzZTogTGluZWFyLmVhc2V9LCAnLT0yJylcclxuICAgIC50byhcIi5zY3JlZW4tLTAgLmFuaW0tdGV4dFwiLCAzLFxyXG4gICAgICB7eTogXCItMTUwJVwiLCBlYXNlOiBMaW5lYXIuZWFzZU5vbmV9KVxyXG4gICAgLnRvKFwiLmFuaW0tYmcubGxcIiwgMywgXHJcbiAgICAgIHtvcGFjaXR5OiAwLCBlYXNlOiBMaW5lYXIuZWFzZX0sICctPTInKVxyXG4gICAgLnNldChcIi5zY3JlZW4tLTAgLmFuaW0taW1nXCIsIHtjbGFzc05hbWU6IFwiKz1zdGFnZS1vdXRcIn0pXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMCAuc2xpZGUtLTAgLmpzLXRwXCIsIHtjbGFzc05hbWU6IFwiKz1hY3RpdmVcIn0pXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMCAuc2xpZGUtLTAgLmpzLXRwXCIsIHtjbGFzc05hbWU6IFwiLT1hY3RpdmVcIn0sICcrPTInKVxyXG4gICAgLnRvKFwiLnNjcmVlbi0tMFwiLCAyLCBcclxuICAgICAge3k6IFwiLTEwMCVcIiwgZWFzZTogTGluZWFyLmVhc2VOb25lfSlcclxuICAgIC50byhcIi5zY3JlZW4tLTAgLmFuaW0taW1nXCIsIDIsIFxyXG4gICAgICB7c2NhbGU6IDEuMSwgeTogXCIwJVwiLCBlYXNlOiBMaW5lYXIuZWFzZU5vbmUsIG9uUmV2ZXJzZUNvbXBsZXRlOiBjbGVhclN0eWxlLCBvblJldmVyc2VDb21wbGV0ZVBhcmFtczogWycuc2NyZWVuLS0wIC5hbmltLWltZyddfSwgJy09MicpXHJcbiAgICAvLyAuc2NyZWVuLS0xIHN0YWdlIDFcclxuICAgIC5zZXQoXCIuc2NyZWVuLS0xIC5hbmltLWltZ1wiLCB7Y2xhc3NOYW1lOiBcIis9c3RhZ2UtMVwifSwgXCIrPTFcIilcclxuICAgIC5zZXQoXCIuc2NyZWVuLS0xIC5kb3QtLTBcIiwge2NsYXNzTmFtZTogXCItPWFjdGl2ZVwifSlcclxuICAgIC5zZXQoXCIuc2NyZWVuLS0xIC5kb3QtLTFcIiwge2NsYXNzTmFtZTogXCIrPWFjdGl2ZVwifSlcclxuICAgIC50byhcIi5zY3JlZW4tLTEgLnNsaWRlLS0wIC5hbmltLXRleHRcIiwgMywgXHJcbiAgICAgIHt5OiBcIjAlXCIsIGVhc2U6IExpbmVhci5lYXNlTm9uZX0sIFwiKz0yXCIpXHJcbiAgICAudG8oXCIuYW5pbS1iZy5sbFwiLCAzLCBcclxuICAgICAge29wYWNpdHk6IDEsIGVhc2U6IExpbmVhci5lYXNlfSwgJy09MicpXHJcbiAgICAudG8oXCIuc2NyZWVuLS0xIC5zbGlkZS0tMCAuYW5pbS10ZXh0XCIsIDMsXHJcbiAgICAgIHt5OiBcIi0xNTAlXCIsIGVhc2U6IExpbmVhci5lYXNlTm9uZX0pXHJcbiAgICAudG8oXCIuYW5pbS1iZy5sbFwiLCAzLCBcclxuICAgICAge29wYWNpdHk6IDAsIGVhc2U6IExpbmVhci5lYXNlfSwgJy09MicpXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMSAuc2xpZGUtLTAgLmpzLXRwXCIsIHtjbGFzc05hbWU6IFwiKz1hY3RpdmVcIn0pXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMSAuc2xpZGUtLTAgLmpzLXRwXCIsIHtjbGFzc05hbWU6IFwiLT1hY3RpdmVcIn0sICcrPTInKVxyXG4gICAgLy8gLnNjcmVlbi0tMSBzdGFnZSAyXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMSAuYW5pbS1pbWdcIiwge2NsYXNzTmFtZTogXCIrPXN0YWdlLTJcIn0sIFwiKz0xXCIpXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMSAuZG90LS0xXCIsIHtjbGFzc05hbWU6IFwiLT1hY3RpdmVcIn0pXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMSAuZG90LS0yXCIsIHtjbGFzc05hbWU6IFwiKz1hY3RpdmVcIn0pXHJcbiAgICAudG8oXCIuc2NyZWVuLS0xIC5zbGlkZS0tMSAuYW5pbS10ZXh0XCIsIDMsIFxyXG4gICAgICB7eTogXCIwJVwiLCBlYXNlOiBMaW5lYXIuZWFzZU5vbmV9LCBcIis9MlwiKVxyXG4gICAgLnRvKFwiLmFuaW0tYmcuYnJcIiwgMywgXHJcbiAgICAgIHtvcGFjaXR5OiAxLCBlYXNlOiBMaW5lYXIuZWFzZX0sICctPTInKVxyXG4gICAgLnRvKFwiLnNjcmVlbi0tMSAuc2xpZGUtLTEgLmFuaW0tdGV4dFwiLCAzLFxyXG4gICAgICB7eTogXCItMTUwJVwiLCBlYXNlOiBMaW5lYXIuZWFzZU5vbmV9KVxyXG4gICAgLnRvKFwiLmFuaW0tYmcuYnJcIiwgMywgXHJcbiAgICAgIHtvcGFjaXR5OiAwLCBlYXNlOiBMaW5lYXIuZWFzZX0sICctPTInKVxyXG4gICAgLnNldChcIi5zY3JlZW4tLTEgLmFuaW0taW1nXCIsIHtjbGFzc05hbWU6IFwiKz1zdGFnZS1vdXRcIn0pXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMSAuc2xpZGUtLTEgLmpzLXRwXCIsIHtjbGFzc05hbWU6IFwiKz1hY3RpdmVcIn0pXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMSAuc2xpZGUtLTEgLmpzLXRwXCIsIHtjbGFzc05hbWU6IFwiLT1hY3RpdmVcIn0sICcrPTInKVxyXG4gICAgLnRvKFwiLnNjcmVlbi0tMVwiLCAyLCBcclxuICAgICAge3k6IFwiLTEwMCVcIiwgZWFzZTogTGluZWFyLmVhc2VOb25lfSlcclxuICAgIC50byhcIi5zY3JlZW4tLTEgLmFuaW0taW1nXCIsIDIsIFxyXG4gICAgICB7eTogXCI3MCVcIiwgZWFzZTogTGluZWFyLmVhc2VOb25lLCBvblJldmVyc2VDb21wbGV0ZTogY2xlYXJTdHlsZSwgb25SZXZlcnNlQ29tcGxldGVQYXJhbXM6IFsnLnNjcmVlbi0tMSAuYW5pbS1pbWcnXX0sICctPTInKVxyXG4gICAgLy8gLnNjcmVlbi0tMiBzdGFnZSAxXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMiAuYW5pbS1pbWdcIiwge2NsYXNzTmFtZTogXCIrPXN0YWdlLTFcIn0sIFwiKz0xXCIpXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMiAuZG90LS0wXCIsIHtjbGFzc05hbWU6IFwiLT1hY3RpdmVcIn0pXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMiAuZG90LS0xXCIsIHtjbGFzc05hbWU6IFwiKz1hY3RpdmVcIn0pXHJcbiAgICAudG8oXCIuc2NyZWVuLS0yIC5hbmltLXRleHRcIiwgMywgXHJcbiAgICAgIHt5OiBcIjAlXCIsIGVhc2U6IExpbmVhci5lYXNlTm9uZX0sIFwiKz0yXCIpXHJcbiAgICAudG8oXCIuYW5pbS1iZy5sbFwiLCAzLCBcclxuICAgICAge29wYWNpdHk6IDEsIGVhc2U6IExpbmVhci5lYXNlfSwgJy09MicpXHJcbiAgICAudG8oXCIuc2NyZWVuLS0yIC5hbmltLXRleHRcIiwgMyxcclxuICAgICAge3k6IFwiLTE1MCVcIiwgZWFzZTogTGluZWFyLmVhc2VOb25lfSlcclxuICAgIC50byhcIi5hbmltLWJnLmxsXCIsIDMsIFxyXG4gICAgICB7b3BhY2l0eTogMCwgZWFzZTogTGluZWFyLmVhc2V9LCAnLT0yJylcclxuICAgIC5zZXQoXCIuc2NyZWVuLS0yIC5hbmltLWltZ1wiLCB7Y2xhc3NOYW1lOiBcIis9c3RhZ2Utb3V0XCJ9KVxyXG4gICAgLnNldChcIi5zY3JlZW4tLTIgLnNsaWRlLS0wIC5qcy10cFwiLCB7Y2xhc3NOYW1lOiBcIis9YWN0aXZlXCJ9KVxyXG4gICAgLnNldChcIi5zY3JlZW4tLTIgLnNsaWRlLS0wIC5qcy10cFwiLCB7Y2xhc3NOYW1lOiBcIi09YWN0aXZlXCJ9LCAnKz0yJylcclxuICAgIC50byhcIi5zY3JlZW4tLTJcIiwgMiwgXHJcbiAgICAgIHt5OiBcIi0xMDAlXCIsIGVhc2U6IExpbmVhci5lYXNlTm9uZX0pXHJcbiAgICAudG8oXCIuc2NyZWVuLS0yIC5hbmltLWltZ1wiLCAyLCBcclxuICAgICAge3NjYWxlOiAxLjEsIHg6IFwiLTUwJVwiLCB5OiBcIi01MCVcIiwgZWFzZTogTGluZWFyLmVhc2VOb25lLCBvblJldmVyc2VDb21wbGV0ZTogY2xlYXJTdHlsZSwgb25SZXZlcnNlQ29tcGxldGVQYXJhbXM6IFsnLnNjcmVlbi0tMiAuYW5pbS1pbWcnXX0sICctPTInKVxyXG4gICAgLy8gLnNjcmVlbi0tMyBzdGFnZSAxXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMyAuYW5pbS1pbWdcIiwge2NsYXNzTmFtZTogXCIrPXN0YWdlLTFcIn0sIFwiKz0xXCIpXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMyAuZG90LS0wXCIsIHtjbGFzc05hbWU6IFwiLT1hY3RpdmVcIn0pXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tMyAuZG90LS0xXCIsIHtjbGFzc05hbWU6IFwiKz1hY3RpdmVcIn0pXHJcbiAgICAudG8oXCIuc2NyZWVuLS0zIC5zbGlkZS0tMCAuYW5pbS10ZXh0XCIsIDMsIFxyXG4gICAgICB7eTogXCIwJVwiLCBlYXNlOiBMaW5lYXIuZWFzZU5vbmV9LCBcIis9MlwiKVxyXG4gICAgLnRvKFwiLmFuaW0tYmcuYmxcIiwgMywgXHJcbiAgICAgIHtvcGFjaXR5OiAxLCBlYXNlOiBMaW5lYXIuZWFzZX0sICctPTInKVxyXG4gICAgLnRvKFwiLnNjcmVlbi0tMyAuc2xpZGUtLTAgLmFuaW0tdGV4dFwiLCAzLFxyXG4gICAgICB7eTogXCItNTMwJVwiLCBlYXNlOiBMaW5lYXIuZWFzZU5vbmV9KVxyXG4gICAgLnRvKFwiLmFuaW0tYmcuYmxcIiwgMywgXHJcbiAgICAgIHtvcGFjaXR5OiAwLCBlYXNlOiBMaW5lYXIuZWFzZX0sICctPTInKVxyXG4gICAgLnNldChcIi5zY3JlZW4tLTMgLnNsaWRlLS0wIC5qcy10cFwiLCB7Y2xhc3NOYW1lOiBcIis9YWN0aXZlXCJ9KVxyXG4gICAgLnNldChcIi5zY3JlZW4tLTMgLnNsaWRlLS0wIC5qcy10cFwiLCB7Y2xhc3NOYW1lOiBcIi09YWN0aXZlXCJ9LCAnKz0yJylcclxuICAgIC8vIC5zY3JlZW4tLTMgc3RhZ2UgMlxyXG4gICAgLnNldChcIi5zY3JlZW4tLTMgLmFuaW0taW1nXCIsIHtjbGFzc05hbWU6IFwiKz1zdGFnZS0yXCJ9LCBcIis9MVwiKVxyXG4gICAgLnNldChcIi5zY3JlZW4tLTMgLmRvdC0tMVwiLCB7Y2xhc3NOYW1lOiBcIi09YWN0aXZlXCJ9KVxyXG4gICAgLnNldChcIi5zY3JlZW4tLTMgLmRvdC0tMlwiLCB7Y2xhc3NOYW1lOiBcIis9YWN0aXZlXCJ9KVxyXG4gICAgLnRvKFwiLnNjcmVlbi0tMyAuc2xpZGUtLTEgLmFuaW0tdGV4dFwiLCAzLCBcclxuICAgICAge3k6IFwiMCVcIiwgZWFzZTogTGluZWFyLmVhc2VOb25lfSwgXCIrPTJcIilcclxuICAgIC50byhcIi5hbmltLWJnLmxyXCIsIDMsIFxyXG4gICAgICB7b3BhY2l0eTogMSwgZWFzZTogTGluZWFyLmVhc2V9LCAnLT0yJylcclxuICAgIC50byhcIi5zY3JlZW4tLTMgLnNsaWRlLS0xIC5hbmltLXRleHRcIiwgMyxcclxuICAgICAge3k6IFwiLTE1MCVcIiwgZWFzZTogTGluZWFyLmVhc2VOb25lfSlcclxuICAgIC50byhcIi5hbmltLWJnLmxyXCIsIDMsIFxyXG4gICAgICB7b3BhY2l0eTogMCwgZWFzZTogTGluZWFyLmVhc2V9LCAnLT0yJylcclxuICAgIC5zZXQoXCIuc2NyZWVuLS0zIC5hbmltLWltZ1wiLCB7Y2xhc3NOYW1lOiBcIis9c3RhZ2Utb3V0XCJ9KVxyXG4gICAgLnNldChcIi5zY3JlZW4tLTMgLnNsaWRlLS0xIC5qcy10cFwiLCB7Y2xhc3NOYW1lOiBcIis9YWN0aXZlXCJ9KVxyXG4gICAgLnNldChcIi5zY3JlZW4tLTMgLnNsaWRlLS0xIC5qcy10cFwiLCB7Y2xhc3NOYW1lOiBcIi09YWN0aXZlXCJ9LCAnKz0yJylcclxuICAgIC50byhcIi5zY3JlZW4tLTNcIiwgMiwgXHJcbiAgICAgIHt5OiBcIi0xMDAlXCIsIGVhc2U6IExpbmVhci5lYXNlTm9uZX0pXHJcbiAgICAudG8oXCIuc2NyZWVuLS0zIC5hbmltLWltZ1wiLCAyLCBcclxuICAgICAge3NjYWxlOiAyLCB5OiBcIjc1JVwiLCBlYXNlOiBMaW5lYXIuZWFzZU5vbmUsIG9uUmV2ZXJzZUNvbXBsZXRlOiBjbGVhclN0eWxlLCBvblJldmVyc2VDb21wbGV0ZVBhcmFtczogWycuc2NyZWVuLS0zIC5hbmltLWltZyddfSwgJy09MicpXHJcbiAgICAvLyAuc2NyZWVuLS00IHN0YWdlIDFcclxuICAgIC5zZXQoXCIuc2NyZWVuLS00IC5hbmltLWltZ1wiLCB7Y2xhc3NOYW1lOiBcIis9c3RhZ2UtMVwifSwgXCIrPTFcIilcclxuICAgIC5zZXQoXCIuc2NyZWVuLS00IC5kb3QtLTBcIiwge2NsYXNzTmFtZTogXCItPWFjdGl2ZVwifSlcclxuICAgIC5zZXQoXCIuc2NyZWVuLS00IC5kb3QtLTFcIiwge2NsYXNzTmFtZTogXCIrPWFjdGl2ZVwifSlcclxuICAgIC50byhcIi5zY3JlZW4tLTQgLmFuaW0tdGV4dFwiLCAzLCBcclxuICAgICAge3k6IFwiMCVcIiwgZWFzZTogTGluZWFyLmVhc2VOb25lfSwgXCIrPTJcIilcclxuICAgIC50byhcIi5hbmltLWJnLmJsXCIsIDMsIFxyXG4gICAgICB7b3BhY2l0eTogMSwgZWFzZTogTGluZWFyLmVhc2V9LCAnLT0yJylcclxuICAgIC50byhcIi5zY3JlZW4tLTQgLmFuaW0tdGV4dFwiLCAzLFxyXG4gICAgICB7eTogXCItMTUwJVwiLCBlYXNlOiBMaW5lYXIuZWFzZU5vbmV9KVxyXG4gICAgLnRvKFwiLmFuaW0tYmcuYmxcIiwgMywgXHJcbiAgICAgIHtvcGFjaXR5OiAwLCBlYXNlOiBMaW5lYXIuZWFzZX0sICctPTInKVxyXG4gICAgLnNldChcIi5zY3JlZW4tLTQgLmFuaW0taW1nXCIsIHtjbGFzc05hbWU6IFwiKz1zdGFnZS1vdXRcIn0pXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tNCAuc2xpZGUtLTAgLmpzLXRwXCIsIHtjbGFzc05hbWU6IFwiKz1hY3RpdmVcIn0pXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tNCAuc2xpZGUtLTAgLmpzLXRwXCIsIHtjbGFzc05hbWU6IFwiLT1hY3RpdmVcIn0sICcrPTInKVxyXG4gICAgLnRvKFwiLnNjcmVlbi0tNFwiLCAyLCBcclxuICAgICAge3k6IFwiLTEwMCVcIiwgZWFzZTogTGluZWFyLmVhc2VOb25lfSlcclxuICAgIC50byhcIi5zY3JlZW4tLTQgLmFuaW0taW1nXCIsIDIsIFxyXG4gICAgICB7c2NhbGU6IDEuMSwgZWFzZTogTGluZWFyLmVhc2VOb25lLCBvblJldmVyc2VDb21wbGV0ZTogY2xlYXJTdHlsZSwgb25SZXZlcnNlQ29tcGxldGVQYXJhbXM6IFsnLnNjcmVlbi0tNCAuYW5pbS1pbWcnXX0sICctPTInKVxyXG4gICAgLy8gLnNjcmVlbi0tNSBzdGFnZSAxXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tNSAuYW5pbS1pbWdcIiwge2NsYXNzTmFtZTogXCIrPXN0YWdlLTFcIn0sIFwiKz0xXCIpXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tNSAuZG90LS0wXCIsIHtjbGFzc05hbWU6IFwiLT1hY3RpdmVcIn0pXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tNSAuZG90LS0xXCIsIHtjbGFzc05hbWU6IFwiKz1hY3RpdmVcIn0pXHJcbiAgICAudG8oXCIuc2NyZWVuLS01IC5zbGlkZS0tMCAuYW5pbS10ZXh0XCIsIDMsIFxyXG4gICAgICB7eTogXCIwJVwiLCBlYXNlOiBMaW5lYXIuZWFzZU5vbmV9LCBcIis9MlwiKVxyXG4gICAgLnRvKFwiLmFuaW0tYmcuYnJcIiwgMy41LCBcclxuICAgICAge29wYWNpdHk6IDEsIGVhc2U6IExpbmVhci5lYXNlfSwgJy09Mi41JylcclxuICAgIC50byhcIi5zY3JlZW4tLTUgLnNsaWRlLS0wIC5hbmltLXRleHRcIiwgMy41LFxyXG4gICAgICB7eTogXCItMTcwJVwiLCBlYXNlOiBMaW5lYXIuZWFzZU5vbmV9KVxyXG4gICAgLnRvKFwiLmFuaW0tYmcuYnJcIiwgMy41LCBcclxuICAgICAge29wYWNpdHk6IDAsIGVhc2U6IExpbmVhci5lYXNlfSwgJy09Mi41JylcclxuICAgIC5zZXQoXCIuc2NyZWVuLS01IC5zbGlkZS0tMCAuanMtdHBcIiwge2NsYXNzTmFtZTogXCIrPWFjdGl2ZVwifSlcclxuICAgIC5zZXQoXCIuc2NyZWVuLS01IC5zbGlkZS0tMCAuanMtdHBcIiwge2NsYXNzTmFtZTogXCItPWFjdGl2ZVwifSwgJys9MicpXHJcbiAgICAvLyAuc2NyZWVuLS01IHN0YWdlIDJcclxuICAgIC5zZXQoXCIuc2NyZWVuLS01IC5hbmltLWltZ1wiLCB7Y2xhc3NOYW1lOiBcIis9c3RhZ2UtMlwifSwgXCIrPTFcIilcclxuICAgIC5zZXQoXCIuc2NyZWVuLS01IC5kb3QtLTFcIiwge2NsYXNzTmFtZTogXCItPWFjdGl2ZVwifSlcclxuICAgIC5zZXQoXCIuc2NyZWVuLS01IC5kb3QtLTJcIiwge2NsYXNzTmFtZTogXCIrPWFjdGl2ZVwifSlcclxuICAgIC50byhcIi5zY3JlZW4tLTUgLnNsaWRlLS0xIC5hbmltLXRleHRcIiwgMywgXHJcbiAgICAgIHt5OiBcIjAlXCIsIGVhc2U6IExpbmVhci5lYXNlTm9uZX0sIFwiKz0yXCIpXHJcbiAgICAudG8oXCIuYW5pbS1iZy5sbFwiLCA0LCBcclxuICAgICAge29wYWNpdHk6IDEsIGVhc2U6IExpbmVhci5lYXNlfSwgJy09MicpXHJcbiAgICAudG8oXCIuc2NyZWVuLS01IC5zbGlkZS0tMSAuYW5pbS10ZXh0XCIsIDQsXHJcbiAgICAgIHt5OiBcIi0yMDAlXCIsIGVhc2U6IExpbmVhci5lYXNlTm9uZX0pXHJcbiAgICAudG8oXCIuYW5pbS1iZy5sbFwiLCA0LCBcclxuICAgICAge29wYWNpdHk6IDAsIGVhc2U6IExpbmVhci5lYXNlfSwgJy09MicpXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tNSAuc2xpZGUtLTEgLmpzLXRwXCIsIHtjbGFzc05hbWU6IFwiKz1hY3RpdmVcIn0pXHJcbiAgICAuc2V0KFwiLnNjcmVlbi0tNSAuc2xpZGUtLTEgLmpzLXRwXCIsIHtjbGFzc05hbWU6IFwiLT1hY3RpdmVcIn0sICcrPTInKTtcclxuICBcclxuICBuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoe1xyXG4gICAgdHJpZ2dlckVsZW1lbnQ6ICcucGFnZScsXHJcbiAgICB0cmlnZ2VySG9vazogXCJvbkxlYXZlXCIsXHJcbiAgICBkdXJhdGlvbjogXCIyODAwJVwiXHJcbiAgfSlcclxuICAgIC5zZXRQaW4oXCIucGFnZVwiKVxyXG4gICAgLnNldFR3ZWVuKHRsKVxyXG4gICAgLmFkZFRvKGNvbnRyb2xsZXIpO1xyXG4gIFxyXG4gICQoJy5qcy10cmlnZ2VyJykuaG92ZXIoZnVuY3Rpb24oKXtcclxuICAgICQodGhpcykuc2libGluZ3MoJy5qcy1wcm9kdWN0JykuYWRkQ2xhc3MoJ29wZW4nKTtcclxuICB9KTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL2FuaW1hdGlvbi5qcyIsIi8qKlxyXG4gKiDQmtCw0YDRg9GB0LXQu9GMXHJcbiAqIEBtb2R1bGUgQ2Fyb3VzZWxcclxuICovXHJcblxyXG5sZXQgY2Fyb3VzZWw7XHJcblxyXG4vKipcclxuICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0LrQsNGA0YPRgdC10LvQuFxyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gIGNhcm91c2VsID0gJChcIi5vd2wtY2Fyb3VzZWwuY2Fyb3VzZWwtLWRlZmF1bHRcIik7XHJcblxyXG4gIGNhcm91c2VsLm93bENhcm91c2VsKHtcclxuICAgIGl0ZW1zOiAxLFxyXG4gICAgbmF2OiB0cnVlLFxyXG4gICAgbmF2VGV4dDogWyc8c3ZnIGNsYXNzPVwiaWNvblwiPjx1c2UgeGxpbms6aHJlZj1cIiNhcnItcHJldlwiLz48L3N2Zz4nLCAnPHN2ZyBjbGFzcz1cImljb25cIj48dXNlIHhsaW5rOmhyZWY9XCIjYXJyLW5leHRcIi8+PC9zdmc+J10sXHJcbiAgICBkb3RzOiB0cnVlLFxyXG4gICAgbG9vcDogdHJ1ZSxcclxuICAgIG1vdXNlRHJhZzogZmFsc2UsXHJcbiAgICBhbmltYXRlT3V0OiAnZmFkZU91dCdcclxuICB9KTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL2Nhcm91c2VsLmpzIiwiZnVuY3Rpb24gZ2V0SWNvbihlbCkge1xyXG4gIGxldCBpY29uID0gJyc7XHJcbiAgaWYgKGVsLmhhc0NsYXNzKCd5YS1zaGFyZTJfX2l0ZW1fc2VydmljZV92a29udGFrdGUnKSkge1xyXG4gICAgaWNvbiA9ICd2ayc7XHJcbiAgfVxyXG4gIGlmIChlbC5oYXNDbGFzcygneWEtc2hhcmUyX19pdGVtX3NlcnZpY2VfZmFjZWJvb2snKSkge1xyXG4gICAgaWNvbiA9ICdmYic7XHJcbiAgfVxyXG4gIGlmIChlbC5oYXNDbGFzcygneWEtc2hhcmUyX19pdGVtX3NlcnZpY2VfdHdpdHRlcicpKSB7XHJcbiAgICBpY29uID0gJ3R3JztcclxuICB9XHJcbiAgcmV0dXJuICc8c3ZnIGNsYXNzPVwiaWNvbiBzb2NpYWwtaWNvblwiPjx1c2UgeGxpbms6aHJlZj1cIiMnICsgaWNvbiArICdcIi8+PC9zdmc+JztcclxufVxyXG5mdW5jdGlvbiBmaWxsSWNvbnMoKSB7XHJcbiAgJCgnI3NoYXJlIC55YS1zaGFyZTJfX2l0ZW0nKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAkKHRoaXMpLmZpbmQoJy55YS1zaGFyZTJfX2ljb24nKS5odG1sKGdldEljb24oJCh0aGlzKSkpO1xyXG4gIH0pO1xyXG59XHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgWWEuc2hhcmUyKCdzaGFyZScsIHtcclxuICAgIGNvbnRlbnQ6IHtcclxuICAgICAgdXJsOiB3aW5kb3cubG9jYXRpb24uaHJlZixcclxuICAgICAgdGl0bGU6ICdBcXVhIEtlbnpvJyxcclxuICAgICAgZGVzY3JpcHRpb246IFwiXCIsXHJcbiAgICAgIC8vaW1hZ2U6ICdidWlsZC9pbWcvc2hhcmUuanBnJ1xyXG4gICAgICBpbWFnZTogJ2h0dHA6Ly9uaW94aW4zMGRheXMuZWxsZS5ydS9idWlsZC9pbWcvc2hhcmUuanBnJ1xyXG4gICAgfSxcclxuICAgIHRoZW1lOiB7XHJcbiAgICAgIHNlcnZpY2VzOiAndmtvbnRha3RlLGZhY2Vib29rLHR3aXR0ZXInLFxyXG4gICAgICBiYXJlOiB0cnVlLFxyXG4gICAgICBsYW5nOiAncnUnXHJcbiAgICB9LFxyXG4gICAgaG9va3M6IHtcclxuICAgICAgb25yZWFkeTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZmlsbEljb25zKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvc2hhcmUuanMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBOzs7Ozs7OztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDakNBOzs7OztBQUtBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBT0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOzs7Ozs7Ozs7QUM3S0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBd0JBO0FBeEJBO0FBc0NBO0FBdENBO0FBeURBO0FBekRBO0FBNEVBO0FBNUVBO0FBMEZBO0FBMUZBO0FBNkdBO0FBN0dBO0FBZ0lBO0FBaElBO0FBOElBO0FBOUlBO0FBQ0E7QUE0SkE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDckxBOzs7OztBQUtBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBU0E7QUFDQTs7Ozs7Ozs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBYkE7QUFtQkE7Ozs7Iiwic291cmNlUm9vdCI6IiJ9