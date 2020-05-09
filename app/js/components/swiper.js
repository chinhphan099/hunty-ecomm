(function(root, factory) {
  const pluginName = 'Swiperjs';

  if (typeof define === 'function' && define.amd) {
    define([], factory(pluginName));
  } else if (typeof exports === 'object') {
    module.exports = factory(pluginName);
  } else {
    root[pluginName] = factory(pluginName);
  }
}((window || module || {}), function() {
  'use strict';

  const resize = ('onorientationchange' in window) ? 'orientationchange' : 'resize';
  let timeResize;
  const defaults = {
    banner: {
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    },
    productoneline: {
      slidesPerView: 'auto',
      spaceBetween: 20,
      slidesPerGroup: 2,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    },
    promotion: {
      slidesPerView: 'auto',
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    },
    tworow: {
      slidesPerView: 2,
      slidesPerColumn: 2,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    }
  };

  function Plugin(options) {
    this.element = options.element;
    this.options = {
      ...JSON.parse(options.element.dataset.swiper),
      ...defaults
    };

    this.init();
  }

  const isNoSlide = function() {
    this.element.classList.add('no-slide');
  };
  const isSlide = function() {
    this.element.classList.remove('no-slide');
  };

  Plugin.prototype = {
    init: function() {
      if (this.options.initUnder) {
        if (window.innerWidth < this.options.initUnder) {
          this.initialize();
        } else {
          isNoSlide.apply(this);
        }
      } else {
        this.initialize();
      }
      this.listener();
    },
    listener: function() {
      window.addEventListener(resize, () => {
        if (timeResize) {
          clearTimeout(timeResize);
        }
        timeResize = setTimeout(() => {
          if (window.innerWidth >= this.options.initUnder) {
            if (this.element.classList.contains('swiper-container-initialized')) {
              this.destroy();
            }
            return;
          }
          if (this.element.classList.contains('swiper-container-initialized')) {
            this.setPositionArrows();
          } else {
            this.initialize();
          }
        }, 600);
      });
    },
    initialize: function() {
      if (this.element.querySelectorAll('img').length) {
        this.checkImgLoad();
      } else {
        this.initSlider();
      }
    },
    checkImgLoad: function() {
      const fakeSrc = this.element.querySelector('img');
      const objImg = new Image();
      objImg.src = fakeSrc;
      objImg.onLoad = () => {
        this.initSlider();
      };
      if (!objImg.complete) {
        this.initSlider();
      }
    },
    initSlider: function() {
      let finalOptions = this.options[this.options.type];
      isSlide.apply(this);
      finalOptions = Object.assign(finalOptions, {
        on: {
          init: () => {
            this.setPositionArrows();
          }
        }
      });

      this.slide = new Swiper(this.element, finalOptions);
      this.slide.on('slideChange', () => {
        this.setPositionArrows();
      });

      // check No Slide
      this.checkIsNoSlide();
    },
    setPositionArrows: function() {
      var arrowControls = this.element.querySelectorAll('.swiper-button'),
        imgVisible = this.element.querySelector('.swiper-slide-active .img-view'),
        posTop = 0;

      if (this.options.setPositionArrows) {
        const maxHeight = imgVisible.clientHeight;
        posTop = (maxHeight / 2);
        Array.prototype.slice.call(arrowControls).forEach(arrowControl => {
          arrowControl.style.top = posTop + 'px';
        });
      }
    },
    checkIsNoSlide: function() {
      console.log(this.slide);
      // isNoSlide.apply(this);
      if (this.slide.passedParams.slidesPerView >= this.slide.slides.length) {
        this.destroy();
      } else {
        isSlide.apply(this);
      }
    },
    destroy: function() {
      isNoSlide.apply(this);
      this.slide.destroy();
    }
  };

  return Plugin;
}));

const sliders = document.querySelectorAll('[data-swiper]');
for (var i = 0; i < sliders.length; i++) {
  new Swiperjs({
    element: sliders[i]
  });
}
