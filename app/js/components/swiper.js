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
      slidesPerView: 1,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
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
      slidesPerView: 'auto',
      slidesPerColumn: 2,
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    },
    categoryicons: {
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true
      },
      slidesPerView: 'auto',
      slidesPerGroup: 2,
      slidesPerColumn: 2,
      spaceBetween: 15,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        992: {
          spaceBetween: 20,
          slidesPerView: 'auto',
          slidesPerGroup: 2,
          slidesPerColumn: 2
        }
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
      this.slide = this.element;
      if (this.options.initUnder) {
        if (window.innerWidth < this.options.initUnder) {
          this.initialize();
        }
        else {
          isNoSlide.apply(this);
        }
      }
      else {
        this.initialize();
      }
      this.listener();
    },
    listener: function() {
      this.resizeEvent = this.resizeEvent.bind(this);
      window.addEventListener(resize, this.resizeEvent);
    },
    resizeEvent: function() {
      if (!timeResize) {
        clearTimeout(timeResize);
      }
      timeResize = setTimeout(() => {
        if (!!this.options.initUnder && window.innerWidth >= this.options.initUnder) {
          if (this.element.classList.contains('swiper-container-initialized')) {
            this.destroy();
          }
          return;
        }
        if (this.slide.destroyed !== true) {
          this.checkIsNoSlide();
        }
        if (this.element.classList.contains('swiper-container-initialized')) {
          this.setPositionArrows();
        }
        else {
          this.initialize();
        }
      }, 600);
    },
    initialize: function() {
      if (this.element.querySelectorAll('img').length) {
        this.checkImgLoad();
      }
      else {
        this.initSlider();
      }
    },
    checkImgLoad: function() {
      const fakeSrc = this.element.querySelector('img').src;
      const objImg = new Image();
      objImg.onload = () => {
        this.initSlider();
      };
      objImg.src = fakeSrc;
    },
    initSlider: function() {
      console.log(this.options);
      let finalOptions = this.options[this.options.type];
      isSlide.apply(this);
      finalOptions = Object.assign(finalOptions, {
        init: false
      });

      this.slide = new Swiper(this.element, finalOptions);
      this.slide.on('init', () => {
        this.setPositionArrows();
        this.checkIsNoSlide();
      });
      this.slide.on('slideChange', () => {
        this.setPositionArrows();
      });
      this.slide.init();
    },
    setPositionArrows: function() {
      var arrowControls = this.element.querySelectorAll('.swiper-button'),
        imgVisible = this.element.querySelector('.swiper-slide-active .img-view'),
        posTop = 0;

      if (!!imgVisible && this.options.setPositionArrows) {
        const maxHeight = imgVisible.clientHeight;
        posTop = (maxHeight / 2);
        Array.prototype.slice.call(arrowControls).forEach(arrowControl => {
          arrowControl.style.top = posTop + 'px';
        });
      }
    },
    checkIsNoSlide: function() {
      if (!!this.slide.slides && (this.slide.slides.length === 0 || this.slide.params.slidesPerView >= this.slide.slides.length)) {
        this.destroy();
      } else {
        isSlide.apply(this);
      }
    },
    destroy: function() {
      this.slide.destroy();
      isNoSlide.apply(this);
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
