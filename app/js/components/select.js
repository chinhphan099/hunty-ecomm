class CustomSelect {
  constructor(elm) {
    this.selects = document.querySelectorAll(elm);
    this.selectedCls = 'selected';
    this.initCls = 'select-inited';
  }

  checkSelectedValue(select) {
    if(select.value !== '') {
      select.parentNode.classList.add(this.selectedCls);
    }
    else {
      select.parentNode.classList.remove(this.selectedCls);
    }
  }

  init() {
    Array.prototype.slice.call(this.selects).forEach(select => {
      this.checkSelectedValue(select);

      // If select was init before(has class select-inited) then return.
      if(select.parentNode.classList.contains(this.initCls)) {return;}

      select.parentNode.classList.add(this.initCls);
      select.addEventListener('change', (e) => {
        this.checkSelectedValue(e.currentTarget);
      });
    });
  }
}

const customSelect = new CustomSelect('[data-select] select');
customSelect.init();
