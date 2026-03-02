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
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
