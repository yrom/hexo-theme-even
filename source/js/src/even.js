(function (window) {
  'use strict';

  var Even = {};

  Even.backToTop = function () {
    var $backToTop = $('#back-to-top');

    $(window).scroll(function () {
      if ($(window).scrollTop() > 100) {
        $backToTop.fadeIn(1000);
      } else {
        $backToTop.fadeOut(1000);
      }
    });

    $backToTop.click(function () {
      $('body,html').animate({ scrollTop: 0 });
    });
  };

  Even.mobileNavbar = function () {
    var $mobileNav = $('#mobile-navbar');
    var $mobileNavIcon = $('.mobile-navbar-icon');
    var slideout = new Slideout({
      'panel': document.getElementById('mobile-panel'),
      'menu': document.getElementById('mobile-menu'),
      'padding': 180,
      'tolerance': 70
    });
    slideout.disableTouch();

    $mobileNavIcon.click(function () {
      slideout.toggle();
    });

    slideout.on('beforeopen', function () {
      $mobileNav.addClass('fixed-open');
      $mobileNavIcon.addClass('icon-click').removeClass('icon-out');
    });

    slideout.on('beforeclose', function () {
      $mobileNav.removeClass('fixed-open');
      $mobileNavIcon.addClass('icon-out').removeClass('icon-click');
    });

    $('#mobile-panel').on('touchend', function () {
      slideout.isOpen() && $mobileNavIcon.click();
    });
  };

  Even.toc = function () {
    var $toc = $('.post-toc'),
      $footer = $('.post-footer');

    if (!$toc.length) {
      return
    }
    var SPACING = 20;
    var minScrollTop = $toc.offset().top - SPACING;
    var maxScrollTop = $footer.offset().top - $toc.height() - SPACING;

    var tocState = {
      start: {
        'position': 'absolute',
        'top': minScrollTop
      },
      process: {
        'position': 'fixed',
        'top': SPACING
      },
      end: {
        'position': 'absolute',
        'top': maxScrollTop
      }
    }

    $(window).scroll(function () {
      var scrollTop = $(window).scrollTop();

      if (scrollTop < minScrollTop) {
        $toc.css(tocState.start);
      } else if (scrollTop > maxScrollTop) {
        $toc.css(tocState.end);
      } else {
        $toc.css(tocState.process);
      }
    })

    var HEADERFIX = 30;
    var $toclink = $('.toc-link'),
      $headerlink = $('.headerlink');

    var headerlinkTop = $.map($headerlink, function (link) {
      return $(link).offset().top;
    });

    $(window).scroll(function () {
      var scrollTop = $(window).scrollTop();

      for (var i = 0; i < $toclink.length; i++) {
        var isLastOne = i + 1 === $toclink.length,
          currentTop = headerlinkTop[i] - HEADERFIX,
          nextTop = isLastOne ? Infinity : headerlinkTop[i + 1] - HEADERFIX;

        if (currentTop < scrollTop && scrollTop <= nextTop) {
          $($toclink[i]).addClass('active');
        } else {
          $($toclink[i]).removeClass('active');
        }
      }
    });
  };

  Even.fancybox = function () {
    if ($.fancybox) {
      $('.post').each(function (i) {
        $(this).find('img').each(function () {
          var is7niu = this.src.indexOf('imageView2/2/w') !== -1
          var src = this.src
          var srcset = undefined
          if (is7niu) {
            var p = /(imageView2\/2\/w\/)\d+/
            var set = [1600, 1280, 960, 640]
            var srcs = []
            srcset = ''
            for (var index = 0; index < set.length; index++) {
              var s = set[index];
              var l = this.src.replace(p, '$1' + s)
              srcs.push(l)
              srcset += l + ' ' + s + 'w'
              if (index < set.length - 1) {
                srcset += ', '
              }
            }
            src = srcs[0]
          }
          $(this).wrap('<a href="' + src + '" data-caption="' + this.alt + '" data-type="image" data-fancybox="gallery' + i + '"'+(srcset? ' data-srcset="'+srcset+'"': '')+'></a>'
        );          
        });
      });
    }
  };

  window.Even = Even;
})(window);
