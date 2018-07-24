let DeviceDetection = require("./components/device-detection");
let Helpers = require("./components/helpers");
let Animation = require("./components/animation");
let Carousel = require("./components/carousel");
let Share = require("./components/share");

$(document).ready(function(){
  
  DeviceDetection.run();
  Helpers.init();
  Share.init();
  
  $.afterlag(function(){
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
  DeviceDetection,
  Helpers,
	Carousel,
  Share,
  Animation
};