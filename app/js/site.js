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

  global.Site = {
    scrollTopAfterCollapse: scrollTopAfterCollapse
  };
})(window);
