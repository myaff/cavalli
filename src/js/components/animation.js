/**
 * Переключение классов по различным событиям
 * @module Animation
 */

function init () {
  let controller = new ScrollMagic.Controller();
  let tl = new TimelineMax()
    .to(".screen--0 .anim-img", 1, 
      {scale: 1.5, x: "-55%", y: "-70%", ease: Linear.easeNone})
    .to(".screen--0 .anim-title", 1, 
      {y: "-300%", ease: Linear.easeNone}, '-=1')
    .to(".header__text", 0.3, 
      {opacity: 0, ease: Linear.easeNone}, '-=1')
    .to(".screen--0 .anim-text", 1, 
      {y: "0%", ease: Linear.easeNone})
    .to(".anim-bg.ll", 1, 
      {opacity: 1, ease: Linear.ease}, '-=0.7')
    .to(".screen--0 .anim-text", 1,
      {y: "-130%", ease: Linear.easeNone})
    .to(".anim-bg.ll", 1, 
      {opacity: 0, ease: Linear.ease}, '-=0.7')
    .to(".screen--0", 1, 
      {y: "-100%", ease: Linear.easeNone})
    .to(".screen--0 .anim-img", 1, 
      {scale: 1.1, ease: Linear.easeNone}, '-=1')
    .to(".screen--1 .anim-img", 1, 
      {scale: 2, x: "0%", y: "0%", ease: Linear.easeNone})
    .to(".screen--1 .slide--0 .anim-text", 1, 
      {y: "0%", ease: Linear.easeNone})
    .to(".anim-bg.ll", 1, 
      {opacity: 1, ease: Linear.ease}, '-=0.7')
    .to(".screen--1 .slide--0 .anim-text", 1,
      {y: "-130%", ease: Linear.easeNone})
    .to(".anim-bg.ll", 1, 
      {opacity: 0, ease: Linear.ease}, '-=0.7')
    .to(".screen--1 .anim-img", 1, 
      {scale: 1.8, x: "-95%", y: "-15%", ease: Linear.easeNone})
    .to(".screen--1 .slide--1 .anim-text", 1, 
      {y: "0%", ease: Linear.easeNone})
    .to(".anim-bg.br", 1, 
      {opacity: 1, ease: Linear.ease}, '-=0.7')
    .to(".screen--1 .slide--1 .anim-text", 1,
      {y: "-130%", ease: Linear.easeNone})
    .to(".anim-bg.br", 1, 
      {opacity: 0, ease: Linear.ease}, '-=0.7')
    .to(".screen--1", 1, 
      {y: "-100%", ease: Linear.easeNone})
    .to(".screen--1 .anim-img", 1, 
      {y: "90%", ease: Linear.easeNone}, '-=1')
    .to(".screen--2 .anim-img", 1, 
      {scale: 1.5, x: "-25%", y: "-25%", ease: Linear.easeNone})
    .to(".screen--2 .anim-text", 1, 
      {y: "0%", ease: Linear.easeNone})
    .to(".anim-bg.ll", 1, 
      {opacity: 1, ease: Linear.ease}, '-=0.7')
    .to(".screen--2 .anim-text", 1,
      {y: "-130%", ease: Linear.easeNone})
    .to(".anim-bg.ll", 1, 
      {opacity: 0, ease: Linear.ease}, '-=0.7')
    .to(".screen--2", 1, 
      {y: "-100%", ease: Linear.easeNone})
    .to(".screen--2 .anim-img", 1, 
      {scale: 1.1, x: "-50%", y: "-50%", ease: Linear.easeNone}, '-=1')
    .to(".screen--3 .anim-img", 1, 
      {scale: 1.9, x: "-2%", y: "-30%", ease: Linear.easeNone})
    .to(".screen--3 .slide--0 .anim-text", 1, 
      {y: "0%", ease: Linear.easeNone})
    .to(".anim-bg.bl", 1, 
      {opacity: 1, ease: Linear.ease}, '-=0.7')
    .to(".screen--3 .slide--0 .anim-text", 1,
      {y: "-130%", ease: Linear.easeNone})
    .to(".anim-bg.bl", 1, 
      {opacity: 0, ease: Linear.ease}, '-=0.7')
    .to(".screen--3 .anim-img", 1, 
      {scale: 2.1, x: "-106%", y: "-5%", ease: Linear.easeNone})
    .to(".screen--3 .slide--1 .anim-text", 1, 
      {y: "0%", ease: Linear.easeNone})
    .to(".anim-bg.lr", 1, 
      {opacity: 1, ease: Linear.ease}, '-=0.7')
    .to(".screen--3 .slide--1 .anim-text", 1,
      {y: "-130%", ease: Linear.easeNone})
    .to(".anim-bg.lr", 1, 
      {opacity: 0, ease: Linear.ease}, '-=0.7')
    .to(".screen--3", 1, 
      {y: "-100%", ease: Linear.easeNone})
    .to(".screen--3 .anim-img", 1, 
      {scale: 2, y: "75%", ease: Linear.easeNone}, '-=1')
    .to(".screen--4 .anim-img", 1, 
      {scale: 1.8, x: "-50%", y: "-15%", ease: Linear.easeNone})
    .to(".screen--4 .anim-text", 1, 
      {y: "0%", ease: Linear.easeNone})
    .to(".anim-bg.bl", 1, 
      {opacity: 1, ease: Linear.ease}, '-=0.7')
    .to(".screen--4 .anim-text", 1,
      {y: "-130%", ease: Linear.easeNone})
    .to(".anim-bg.bl", 1, 
      {opacity: 0, ease: Linear.ease}, '-=0.7')
    .to(".screen--4", 1, 
      {y: "-100%", ease: Linear.easeNone})
    .to(".screen--4 .anim-img", 1, 
      {scale: 1.1, ease: Linear.easeNone}, '-=1')
    .to(".screen--5 .anim-img", 1, 
      {scale: 2, x: "3%", y: "-55%", ease: Linear.easeNone})
    .to(".screen--5 .slide--0 .anim-text", 1, 
      {y: "0%", ease: Linear.easeNone})
    .to(".anim-bg.br", 1, 
      {opacity: 1, ease: Linear.ease}, '-=0.7')
    .to(".screen--5 .slide--0 .anim-text", 1,
      {y: "-130%", ease: Linear.easeNone})
    .to(".anim-bg.br", 1, 
      {opacity: 0, ease: Linear.ease}, '-=0.7')
    .to(".screen--5 .anim-img", 1, 
      {scale: 2.2, x: "-105%", y: "-15%", ease: Linear.easeNone})
    .to(".screen--5 .slide--1 .anim-text", 1, 
      {y: "0%", ease: Linear.easeNone})
    .to(".anim-bg.ll", 1, 
      {opacity: 1, ease: Linear.ease}, '-=0.7')
    .to(".screen--5 .slide--1 .anim-text", 1,
      {y: "-130%", ease: Linear.easeNone})
    .to(".anim-bg.ll", 1, 
      {opacity: 0, ease: Linear.ease}, '-=0.7');
  
  new ScrollMagic.Scene({
    triggerElement: '.page',
    triggerHook: "onLeave",
    duration: "500%"
  })
    .setPin(".page")
    .setTween(tl)
    .addTo(controller);
}

module.exports = {init};