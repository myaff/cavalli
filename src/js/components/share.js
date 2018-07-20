function getIcon(el) {
  let icon = '';
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
  $('#share .ya-share2__item').each(function(){
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
      onready: function() {
        fillIcons();
      }
    }
  });
}
module.exports = {init};