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
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
