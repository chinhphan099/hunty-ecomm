;(function(root, factory) {
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

    const defaults = {
        banner: {
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
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

    Plugin.prototype = {
        init: function() {
            this.initSlider(this.element);
        },
        initSlider: function(elm) {
            let finalOptions = this.options[this.options.type];
            new Swiper(elm, finalOptions);
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
