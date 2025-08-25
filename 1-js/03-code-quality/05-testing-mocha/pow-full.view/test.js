describe("pow", function () {
  describe("x ning 3 darajasi", function () {
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

  it("agar n manfiy bo'lsa, natijada NaN bo'ladi", function () {
    assert.isNaN(pow(2, -1));
  });

  it("agar n butun son bo'lmasa, natijada NaN bo'ladi", function () {
    assert.isNaN(pow(2, 1.5));
  });
});
