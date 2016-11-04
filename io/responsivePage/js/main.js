$(document).ready(function () {
  var owl = $('.owl-carousel');
  owl.owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    lazyLoad: true,
  });
  //PC端hover暂停效果
  $(".ad").hover(function () {
    owl.trigger('stop.owl.autoplay');
  }, function () {
    owl.trigger('play.owl.autoplay', [3000]);
  });
  //手机端实现hover暂停效果
  $(".ad").on('touchstart', function () {
    owl.trigger('stop.owl.autoplay');
  });
  $(".ad").on('touchend', (function () {
    owl.trigger('play.owl.autoplay', [3000]);
  }));


});