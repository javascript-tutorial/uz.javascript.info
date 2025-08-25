function Accumulator(startingValue) {
  this.value = startingValue;

  this.read = function () {
    this.value += +prompt("Qancha qo'shish kerak?", 0);
  };
}
