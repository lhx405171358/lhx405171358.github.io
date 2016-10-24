;$(function () {
  $('#content').fullpage({
    menu: '#top-menu',
    anchors: ["page1","page2","page3","page4","page5"],
    verticalCentered: false,
    paddingTop: "100px",
    css3: true,
    scrollingSpeed: 700,
    afterRender: function () {
      //第一页的文字逐渐显示效果
      $('.one .inner').fadeIn(1500,function () {
        $('.one .inner p:first').fadeIn(700,function () {
          $(this).next().fadeIn(500,function () {
            $(this).next().fadeIn(500,function () {
              $(this).next().fadeIn(500, function () {
                $(this).next().fadeIn(500);
              });
            });
          });
        });
      });
      //分割线初始化设置
      $('.two .hr').css({width:"0px"});
      $('.three .hr').css({width:"0px"});
      //计算并设置slide与其子元素的宽度
      var slideWidth = $('#slide-lists>li').length + '00%';
      var childWidth = 1/$('#slide-lists>li').length * 100 + '%';
      $('#slide-lists').css({width:slideWidth});
      $('#slide-lists>li').css({width:childWidth});
    },
    afterLoad: function (link, index) {
      switch (index){
        case 1:
          $('.one .inner').fadeIn(100, function () {
            move('.one .inner').set('top', '160px').end();
          });
          break;
        case 2:
          move('.two .wrapper h2').scale(1.2).end();
          $('.two .hr').animate({width:"80%"});
          break;
        case 3:
          move('.three .wrapper h2').scale(1.2).end();
          $('.three .hr').animate({width:"80%"});
          break;
        case 4:
          move('.four .wrapper h2').scale(1.2).end();
          $('.four .hr').animate({width:"80%"});
          break;
        case 5:
          move('.five .wrapper h2').scale(1.2).end();
          $('.five .hr').animate({width:"80%"});
          break;
        default:
          break;
      }
    },
    onLeave: function (index, nextIndex, direction) {
      switch (index){
        case 1:
          $('.one .inner').fadeOut(100, function () {
            $('.one .inner').css('top', '800px');
          })
          break;
        case 2:
          move('.two .wrapper h2').scale(1).end();
          $('.two .hr').animate({width:"0px"});
          break;
        case 3:
          move('.three .wrapper h2').scale(1).end();
          $('.three .hr').animate({width:"0px"});
          break;
        case 4:
          move('.four .wrapper h2').scale(1).end();
          $('.four .hr').animate({width:"0px"});
          break;
        case 5:
          move('.five .wrapper h2').scale(1).end();
          $('.five .hr').animate({width:"0px"});
          break;
        default:
          break;
      }
      if (index === 1 && direction === 'down'){
        $('.menu-bg').animate({top:"50px"}, 700);
        $('#top-menu li').animate({top:"0px"}, 700);
      }else if(nextIndex === 1 && direction === 'up'){
        $('.menu-bg').animate({top:"0px"}, 700);
        $('#top-menu li').animate({top:"100px"}, 700);
      }
    },
  });
  
//第三页幻灯片切换效果
  var slideBox = {
    next : $('#next'),
    prev : $('#prev'),
    box : $('#slide-box'),
    list : $('#slide-lists'),
    buttons : $('#slide-buttons span'),
    index : 1,
    len : $('#slide-lists>li').length -2,
  };

  function slide (offset) {
    var left = parseInt(slideBox.list.css('left')) + offset;
    if (offset > 0){
      offset = '+=' + offset;
    } else {
      offset = '-=' + Math.abs(offset);
    }
    slideBox.list.animate({'left': offset}, 300, function () {
      //循环轮播
      if (slideBox.index == 0) {
        slideBox.index = slideBox.len;
        slideBox.list.css('left', -parseInt(slideBox.box.css('width')) * slideBox.len);
      } else if(slideBox.index == slideBox.len + 1) {
        slideBox.index = 1;
        slideBox.list.css('left', -parseInt(slideBox.box.css('width')));
      }
      showButton();
    });
  }

  slideBox.next.click(function () {
    if(slideBox.list.is(':animated')) {
      return;
    }
    slideBox.index += 1;
    slide(-parseInt(slideBox.box.css('width')));
  });

  slideBox.prev.click(function () {
    if(slideBox.list.is(':animated')) {
      return;
    }
    slideBox.index -= 1;
    slide(parseInt(slideBox.box.css('width')));
  });

  //给每个圆点button添加点击事件
  slideBox.buttons.each(function () {
    $(this).on('click', function () {
      if (slideBox.list.is(':animated') || $(this).attr('class')=='on') {
        return;
      }
      var targetIndex = parseInt($(this).attr('index'));
      var offset = (slideBox.index - targetIndex) * parseInt(slideBox.box.css('width'));
      slide(offset);
      slideBox.index = targetIndex;
      showButton();
    })
  });

  //当前index圆点变色
  function showButton() {
    slideBox.buttons.eq(slideBox.index - 1).addClass('on').siblings().removeClass('on');
  }

//第四页点击title动画效果
  $('.four .card h3').each(function () {
    $(this).on('click', function () {
      var title = $(this);
      var para = $(this).next();

      //设置disable标记，使得title每1000ms只响应一次点击事件
      if (title.attr('disabled')) {
        return;
      } else {
        title.attr('disabled', 'true')
      }
      setTimeout(function () {
        title.removeAttr('disabled');
      }, 1000);

      if (title.css('bottom') == '100px') {
        para.fadeOut(function () {
          move(title[0]).scale(1).end();
          move(title[0]).set('bottom', '0').end();
        });
      } else {
        console.log('title toggle');
        move(title[0]).scale(0.8).end();
        move(title[0]).set('bottom', '50%').end(function () {
          para.fadeIn();
        });
      }
    })
  })
  
//第五页旋转效果
  $('.five li a').each(function () {
    $(this).hover(function () {
      move(this).rotate(360).duration(700).end();
    }, function () {
      move(this).rotate(0).duration(700).end();
    });
  })


  // 节流函数
  var throttle = function (fn, delay, atleast) {
    var timer = null;
    var previous = null;

    return function () {
      var now = +new Date();

      if ( !previous ) previous = now;

      if ( now - previous > atleast ) {
        fn();
        // 重置上一次开始时间为本次结束时间
        previous = now;
      } else {
        clearTimeout(timer);
        timer = setTimeout(function() {
          fn();
        }, delay);
      }
    }
  };

  //调整窗口大小后重新设置slide偏移量，确保不会错位
  function resizeBox() {
    var boxwidth = parseInt(slideBox.box.css('width'));
    var offset = -(boxwidth * slideBox.index);
    slideBox.list.css({'left': offset});
    console.log('resized!')
  }

  $(window).resize(throttle(resizeBox, 500, 200));
});