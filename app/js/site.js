/**
 * @name Site
 * @description Global variables and functions
 * @version 1.0
 */

(function(global, undefined) {
  'use strict';

  function scrollTopAfterCollapse(elmScroll, handle, isPos) {
    var spaceToTop = 0,
      offsetHandle = isPos ? handle.position().top : handle.offset().top;

    if(!isPos) {
      spaceToTop = 50;
    }

    elmScroll.stop().animate({
      scrollTop: offsetHandle - spaceToTop
    }, 400);
  }

  function searchIndex() {
    const searchBtn = document.querySelector('.header__search-btn');
    if(searchBtn) {
      searchBtn.addEventListener('click', () => {
        document.querySelector('body').classList.add('open-search');
      });
    }

    const backBtn = document.querySelector('.header__btn-back');
    if(!!backBtn) {
      backBtn.addEventListener('click', () => {
        document.querySelector('body').classList.remove('open-search');
      });
    }
  }

  function listener() {
    searchIndex();
  }

  function init() {}

  window.addEventListener('DOMContentLoaded', () => {
    init();
  });

  window.addEventListener('load', () => {
    listener();
  });

  global.Site = {
    scrollTopAfterCollapse: scrollTopAfterCollapse
  };
})(window);
