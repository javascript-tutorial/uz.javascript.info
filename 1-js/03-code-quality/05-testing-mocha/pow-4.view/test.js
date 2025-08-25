describe("pow", function () {
  describe("x ning 3 chi darajasi", function () {
    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} ning 3 chi darajasi ${expected} ga teng`, function () {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }
  });

  // ... Bu erda testlar bo'lishi mumkin
});
