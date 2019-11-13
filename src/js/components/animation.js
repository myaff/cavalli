/**
 * Переключение классов по различным событиям
 * @module Animation
 */

function clearStyle (el) {
  $(el).css({"transform": ""});
}

function init () {
  let controller = new ScrollMagic.Controller();
  let tl = new TimelineMax()
    // .screen--0 stage 1
    .set(".screen--0 .anim-img", {className: "+=stage-1"}, "+=1")
    .set(".screen--0 .dot--0", {className: "-=active"})
    .set(".screen--0 .dot--1", {className: "+=active"})
    .to(".screen--0 .anim-title", 1, 
      {y: "-300%", ease: Linear.easeNone}, '-=1')
    .to(".header__text, .header__icon", 0.3, 
      {opacity: 0, ease: Linear.easeNone}, '-=1')
    .to(".screen--0 .anim-text", 3, 
      {y: "0%", ease: Linear.easeNone}, '+=2')
    .to(".anim-bg.ll", 3, 
      {opacity: 1, ease: Linear.ease}, '-=2')
    .to(".screen--0 .anim-text", 3,
      {y: "-150%", ease: Linear.easeNone})
    .to(".anim-bg.ll", 3, 
      {opacity: 0, ease: Linear.ease}, '-=2')
    .set(".screen--0 .anim-img", {className: "+=stage-out"})
    .set(".screen--0 .slide--0 .js-tp", {className: "+=active"})
    .set(".screen--0 .slide--0 .js-tp", {className: "-=active"}, '+=2')
    .to(".screen--0", 2, 
      {y: "-100%", ease: Linear.easeNone})
    .to(".screen--0 .anim-img", 2, 
      {scale: 1.1, y: "0%", ease: Linear.easeNone, onReverseComplete: clearStyle, onReverseCompleteParams: ['.screen--0 .anim-img']}, '-=2')
    // .screen--1 stage 1
    .set(".screen--1 .anim-img", {className: "+=stage-1"}, "+=1")
    .set(".screen--1 .dot--0", {className: "-=active"})
    .set(".screen--1 .dot--1", {className: "+=active"})
    .to(".screen--1 .slide--0 .anim-text", 3, 
      {y: "0%", ease: Linear.easeNone}, "+=2")
    .to(".anim-bg.ll", 3, 
      {opacity: 1, ease: Linear.ease}, '-=2')
    .to(".screen--1 .slide--0 .anim-text", 3,
      {y: "-150%", ease: Linear.easeNone})
    .to(".anim-bg.ll", 3, 
      {opacity: 0, ease: Linear.ease}, '-=2')
    .set(".screen--1 .slide--0 .js-tp", {className: "+=active"})
    .set(".screen--1 .slide--0 .js-tp", {className: "-=active"}, '+=2')
    // .screen--1 stage 2
    .set(".screen--1 .anim-img", {className: "+=stage-2"}, "+=1")
    .set(".screen--1 .dot--1", {className: "-=active"})
    .set(".screen--1 .dot--2", {className: "+=active"})
    .to(".screen--1 .slide--1 .anim-text", 3, 
      {y: "0%", ease: Linear.easeNone}, "+=2")
    .to(".anim-bg.br", 3, 
      {opacity: 1, ease: Linear.ease}, '-=2')
    .to(".screen--1 .slide--1 .anim-text", 3,
      {y: "-150%", ease: Linear.easeNone})
    .to(".anim-bg.br", 3, 
      {opacity: 0, ease: Linear.ease}, '-=2')
    .set(".screen--1 .anim-img", {className: "+=stage-out"})
    .set(".screen--1 .slide--1 .js-tp", {className: "+=active"})
    .set(".screen--1 .slide--1 .js-tp", {className: "-=active"}, '+=2')
    .to(".screen--1", 2, 
      {y: "-100%", ease: Linear.easeNone})
    .to(".screen--1 .anim-img", 2, 
      {y: "70%", ease: Linear.easeNone, onReverseComplete: clearStyle, onReverseCompleteParams: ['.screen--1 .anim-img']}, '-=2')
    // .screen--2 stage 1
    .set(".screen--2 .anim-img", {className: "+=stage-1"}, "+=1")
    .set(".screen--2 .dot--0", {className: "-=active"})
    .set(".screen--2 .dot--1", {className: "+=active"})
    .to(".screen--2 .anim-text", 3, 
      {y: "0%", ease: Linear.easeNone}, "+=2")
    .to(".anim-bg.ll", 3, 
      {opacity: 1, ease: Linear.ease}, '-=2')
    .to(".screen--2 .anim-text", 3,
      {y: "-150%", ease: Linear.easeNone})
    .to(".anim-bg.ll", 3, 
      {opacity: 0, ease: Linear.ease}, '-=2')
    .set(".screen--2 .anim-img", {className: "+=stage-out"})
    .set(".screen--2 .slide--0 .js-tp", {className: "+=active"})
    .set(".screen--2 .slide--0 .js-tp", {className: "-=active"}, '+=2')
    .to(".screen--2", 2, 
      {y: "-100%", ease: Linear.easeNone})
    .to(".screen--2 .anim-img", 2, 
      {scale: 1.1, x: "-50%", y: "-50%", ease: Linear.easeNone, onReverseComplete: clearStyle, onReverseCompleteParams: ['.screen--2 .anim-img']}, '-=2')
    // .screen--3 stage 1
    .set(".screen--3 .anim-img", {className: "+=stage-1"}, "+=1")
    .set(".screen--3 .dot--0", {className: "-=active"})
    .set(".screen--3 .dot--1", {className: "+=active"})
    .to(".screen--3 .slide--0 .anim-text", 3, 
      {y: "0%", ease: Linear.easeNone}, "+=2")
    .to(".anim-bg.bl", 3, 
      {opacity: 1, ease: Linear.ease}, '-=2')
    .to(".screen--3 .slide--0 .anim-text", 3,
      {y: "-530%", ease: Linear.easeNone})
    .to(".anim-bg.bl", 3, 
      {opacity: 0, ease: Linear.ease}, '-=2')
    .set(".screen--3 .slide--0 .js-tp", {className: "+=active"})
    .set(".screen--3 .slide--0 .js-tp", {className: "-=active"}, '+=2')
    // .screen--3 stage 2
    .set(".screen--3 .anim-img", {className: "+=stage-2"}, "+=1")
    .set(".screen--3 .dot--1", {className: "-=active"})
    .set(".screen--3 .dot--2", {className: "+=active"})
    .to(".screen--3 .slide--1 .anim-text", 3, 
      {y: "0%", ease: Linear.easeNone}, "+=2")
    .to(".anim-bg.lr", 3, 
      {opacity: 1, ease: Linear.ease}, '-=2')
    .to(".screen--3 .slide--1 .anim-text", 3,
      {y: "-150%", ease: Linear.easeNone})
    .to(".anim-bg.lr", 3, 
      {opacity: 0, ease: Linear.ease}, '-=2')
    .set(".screen--3 .anim-img", {className: "+=stage-out"})
    .set(".screen--3 .slide--1 .js-tp", {className: "+=active"})
    .set(".screen--3 .slide--1 .js-tp", {className: "-=active"}, '+=2')
    .to(".screen--3", 2, 
      {y: "-100%", ease: Linear.easeNone})
    .to(".screen--3 .anim-img", 2, 
      {scale: 2, y: "75%", ease: Linear.easeNone, onReverseComplete: clearStyle, onReverseCompleteParams: ['.screen--3 .anim-img']}, '-=2')
    // .screen--4 stage 1
    .set(".screen--4 .anim-img", {className: "+=stage-1"}, "+=1")
    .set(".screen--4 .dot--0", {className: "-=active"})
    .set(".screen--4 .dot--1", {className: "+=active"})
    .to(".screen--4 .anim-text", 3, 
      {y: "0%", ease: Linear.easeNone}, "+=2")
    .to(".anim-bg.bl", 3, 
      {opacity: 1, ease: Linear.ease}, '-=2')
    .to(".screen--4 .anim-text", 3,
      {y: "-150%", ease: Linear.easeNone})
    .to(".anim-bg.bl", 3, 
      {opacity: 0, ease: Linear.ease}, '-=2')
    .set(".screen--4 .anim-img", {className: "+=stage-out"})
    .set(".screen--4 .slide--0 .js-tp", {className: "+=active"})
    .set(".screen--4 .slide--0 .js-tp", {className: "-=active"}, '+=2')
    .to(".screen--4", 2, 
      {y: "-100%", ease: Linear.easeNone})
    .to(".screen--4 .anim-img", 2, 
      {scale: 1.1, ease: Linear.easeNone, onReverseComplete: clearStyle, onReverseCompleteParams: ['.screen--4 .anim-img']}, '-=2')
    // .screen--5 stage 1
    .set(".screen--5 .anim-img", {className: "+=stage-1"}, "+=1")
    .set(".screen--5 .dot--0", {className: "-=active"})
    .set(".screen--5 .dot--1", {className: "+=active"})
    .to(".screen--5 .slide--0 .anim-text", 3, 
      {y: "0%", ease: Linear.easeNone}, "+=2")
    .to(".anim-bg.br", 3.5, 
      {opacity: 1, ease: Linear.ease}, '-=2.5')
    .to(".screen--5 .slide--0 .anim-text", 3.5,
      {y: "-170%", ease: Linear.easeNone})
    .to(".anim-bg.br", 3.5, 
      {opacity: 0, ease: Linear.ease}, '-=2.5')
    .set(".screen--5 .slide--0 .js-tp", {className: "+=active"})
    .set(".screen--5 .slide--0 .js-tp", {className: "-=active"}, '+=2')
    // .screen--5 stage 2
    .set(".screen--5 .anim-img", {className: "+=stage-2"}, "+=1")
    .set(".screen--5 .dot--1", {className: "-=active"})
    .set(".screen--5 .dot--2", {className: "+=active"})
    .to(".screen--5 .slide--1 .anim-text", 3, 
      {y: "0%", ease: Linear.easeNone}, "+=2")
    .to(".anim-bg.ll", 4, 
      {opacity: 1, ease: Linear.ease}, '-=2')
    .to(".screen--5 .slide--1 .anim-text", 4,
      {y: "-200%", ease: Linear.easeNone})
    .to(".anim-bg.ll", 4, 
      {opacity: 0, ease: Linear.ease}, '-=2')
    .set(".screen--5 .slide--1 .js-tp", {className: "+=active"})
    .set(".screen--5 .slide--1 .js-tp", {className: "-=active"}, '+=2');
  
  new ScrollMagic.Scene({
    triggerElement: '.page',
    triggerHook: "onLeave",
    duration: "2800%"
  })
    .setPin(".page")
    .setTween(tl)
    .addTo(controller);
  
  $('.js-trigger').hover(function(){
    $(this).siblings('.js-product').addClass('open');
  });
}

module.exports = {init};