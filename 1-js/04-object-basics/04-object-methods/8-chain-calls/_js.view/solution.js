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
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
