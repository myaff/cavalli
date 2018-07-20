/**
 * Карусель
 * @module Carousel
 */

let carousel;

/**
 * Инициализация карусели
 */
function init(){
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

module.exports = {init};