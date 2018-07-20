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
function getNativeScrollbarWidth (container) {
  container = container || document.body;

  let fullWidth = 0;
  let barWidth = 0;

  let wrapper = document.createElement('div');
  let child = document.createElement('div');

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
function throttle (fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  let last,
    deferTimer;
  return function () {
    let context = scope || this;

    let now = +new Date(),
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
  }
}

/** 
 * Debounce Helper
 * https://remysharp.com/2010/07/21/throttling-function-calls
 */
function debounce (fn, delay) {
  let timer = null;
  return function () {
    let context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
};

let timer;
let timeout = false;
let delta = 200;
function resizeEnd() {
  if (new Date() - timer < delta) {
    setTimeout(resizeEnd, delta);
  } else {
    timeout = false;
    $(window).trigger('resizeend');
  }
}

function toggleClassIf(el, cond, toggledClass){
	if(cond){
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
function toggleElementClassOnScroll(el, scrollValue = 0, toggledClass = 'scrolled'){
	if(el.length == 0) {
		//console.error("Необходимо передать объект, с которым вы хотите взаимодействовать");
		return false;
	}
	
	if(scrollValue == 'this') {
		scrollValue = el.offset().top - $(window).outerHeight() / 2;
	}
	
	$(window).on('scroll', function(e){
		if($(window).scrollTop() > scrollValue){
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
function init(){
  
  toggleElementClassOnScroll($('.header'), 50);
  
  $('.js-hide-block').on('click', function(){
    let block = $(this).data('target') === 'self' ? $(this).parent() : $(this).data('target');
    block.fadeOut(500);
  });
  
  $(window).on('resize', function () {
    timer = new Date();
    if (timeout === false) {
      timeout = true;
      setTimeout(resizeEnd, delta);
    }
  });
  
  $('.btn-menu').on('click', function(){
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
  
  $(window).scroll($.debounce(250, true, function() {
    $('html').addClass('is-scrolling');
  }));
  $(window).scroll($.debounce(250, function() {
    $('html').removeClass('is-scrolling');
  }));
  
}

module.exports = {init, toggleClassIf, toggleElementClassOnScroll};