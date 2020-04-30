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

  function searchPageEvents() {
    const selectedType = document.querySelector('.product-type__selected');
    if(!!selectedType) {
      selectedType.addEventListener('click', (e) => {
        e.currentTarget.closest('.product-type__list').classList.toggle('active');
      });
    }
  }

  function searchIndex() {
    const searchBtnDk = document.getElementById('search_btn');
    if(!!searchBtnDk) {
      searchBtnDk.addEventListener('click', () => {
        document.querySelector('.header__search-auto-complete').classList.toggle('active');
      });
    }

    const searchBtnMb = document.querySelector('.header__search-btn');
    if(!!searchBtnMb) {
      searchBtnMb.addEventListener('click', () => {
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

  function loginModal() {
    const loginBtn = document.querySelector('.header__login');
    if(!!loginBtn) {
      loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('body').classList.add('open-modal');
      });
    }

    const closeModal = document.querySelector('.modal .close');
    if(!!closeModal) {
      closeModal.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('body').classList.remove('open-modal');
      });
    }
  }

  function handleTabEvents() {
    const tabItems = document.querySelectorAll('[data-collapse] [data-handle]');
    Array.prototype.slice.call(tabItems).forEach(tabItem => {
      tabItem.addEventListener('click', (e) => {
        const dataContent = e.currentTarget.dataset.handle;
        const wrapper = e.currentTarget.closest('[data-collapse]');
        const contentItem = wrapper.querySelector(`[data-content="${dataContent}"]`);
        if(!contentItem.classList.contains('active')) {
          wrapper.querySelector('[data-content].active').classList.remove('active');
          wrapper.querySelector('[data-active].active').classList.remove('active');
          e.currentTarget.closest('[data-active]').classList.add('active');
          contentItem.classList.add('active');
        }
      });
    });
  }

  function listener() {
    searchPageEvents();
    searchIndex();
    loginModal();
    handleTabEvents();
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
