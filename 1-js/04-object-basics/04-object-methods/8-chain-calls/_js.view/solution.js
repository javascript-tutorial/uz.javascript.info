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
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
