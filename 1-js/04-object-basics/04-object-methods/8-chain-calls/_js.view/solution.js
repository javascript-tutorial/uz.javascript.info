let ladder = {
  step: 0,
  up: function () {
    this.step++;
    return this;
  },
  down: function () {
    this.step--;
    return this;
  },
  showStep: function () {
    alert(this.step);
<<<<<<< HEAD
  },
};
=======
    return this;
  }
};
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
