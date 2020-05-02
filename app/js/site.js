// Polyfill Closest
if (window.Element && !Element.prototype.closest) {
  Element.prototype.closest =
  function(s) {
    var matches = (this.document || this.ownerDocument).querySelectorAll(s), i, el = this;
    do {
      i = matches.length;
      while (--i >= 0 && matches.item(i) !== el) {}
    }
    while ((i < 0) && (el = el.parentElement));
    return el;
  };
}
// End Polyfill Closest

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

  function productTypeOnSearchPage() {
    const selectedType = document.querySelector('.product-type__selected');
    if(!!selectedType) {
      selectedType.addEventListener('click', (e) => {
        e.currentTarget.closest('.product-type__list').classList.toggle('active');
      });
    }
  }

  function searchEvent() {
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
    const loginModal = document.querySelector('.login-modal');
    if(!!loginModal) {
      loginModal.addEventListener('click', (e) => {
        if(!!e.target.closest('.modal__content') || !e.target.closest('.close')) {
          return;
        }
        document.querySelector('body').classList.remove('open-modal');
      });
    }
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

  function productDetailEvents() {
    const viewAllDescription = document.querySelector('.product-description .view-all');
    if(!!viewAllDescription) {
      viewAllDescription.addEventListener('click', (e) => {
        e.currentTarget.closest('.product-description').querySelector('.editor').classList.toggle('show-all');
      });
    }
  }

  function listener() {
    productDetailEvents();
    productTypeOnSearchPage();
    searchEvent();
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
