(() => {
  function countdown(elm) {
    var timer = setInterval(function() {
      let currentDate = new Date(),
        endDate = new Date(elm.dataset.enddate),
        beginDate = new Date(elm.dataset.begindate);

      endDate.setDate(endDate.getDate() + 1);
      beginDate.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      if (beginDate <= currentDate && currentDate < endDate) {
        if (elm.style.display === 'none') {
          elm.style.display = 'block';
        }
      } else if (elm.style.display === 'block') {
        elm.style.display = 'none';
        if (!!timer) {
          clearInterval(timer);
        }
      }

      let date = new Date(),
        hour = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds(),
        currentTimeMs = (hour * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000),
        countdown = 24 * 60 * 60 * 1000 - currentTimeMs;

      let hours = Math.floor(countdown / (60 * 60 * 1000)),
        min = Math.floor((countdown - (hours * 60 * 60 * 1000)) / (60 * 1000)),
        sec = Math.floor((countdown - (min * 60 * 1000) - (hours * 60 * 60 * 1000)) / 1000);

      if (!!elm.querySelector('.countdown--hour')) {
        elm.querySelector('.countdown--hour').innerText = hours < 10 ? '0' + hours : hours;
        elm.querySelector('.countdown--minute').innerText = min < 10 ? '0' + min : min;
        elm.querySelector('.countdown--second').innerText = sec < 10 ? '0' + sec : sec;
      }
    }, 1000);
  }

  function init() {
    const flashSaleElms = document.querySelectorAll('[data-flashsale]');
    for (const flashSaleElm of flashSaleElms) {
      countdown(flashSaleElm);
    }
  }

  window.addEventListener('DOMContentLoaded', function() {
    init(document.querySelector('[data-flashsale]'));
  });
})();
