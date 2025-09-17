describe("getMaxSubSum", function () {
  it("[1, 2, 3] ning maksimal subsummasi 6 ga teng", function () {
    assert.equal(getMaxSubSum([1, 2, 3]), 6);
  });

  it("[-1, 2, 3, -9] ning maksimal subsummasi 5 ga teng", function () {
    assert.equal(getMaxSubSum([-1, 2, 3, -9]), 5);
  });

  it("[-1, 2, 3, -9, 11] ning maksimal subsummasi 11 ga teng", function () {
    assert.equal(getMaxSubSum([-1, 2, 3, -9, 11]), 11);
  });

  it("[-2, -1, 1, 2] ning maksimal subsummasi 3 ga teng", function () {
    assert.equal(getMaxSubSum([-2, -1, 1, 2]), 3);
  });

  it("[100, -9, 2, -3, 5] ning maksimal subsummasi 100 ga teng", function () {
    assert.equal(getMaxSubSum([100, -9, 2, -3, 5]), 100);
  });

  it("[] ning maksimal subsummasi 0 ga teng", function () {
    assert.equal(getMaxSubSum([]), 0);
  });

  it("[-1] ning maksimal subsummasi 0 ga teng", function () {
    assert.equal(getMaxSubSum([-1]), 0);
  });

  it("[-1, -2] ning maksimal subsummasi 0 ga teng", function () {
    assert.equal(getMaxSubSum([-1, -2]), 0);
  });

  it("[2, -8, 5, -1, 2, -3, 2] ning maksimal subsummasi 6 ga teng", function () {
    assert.equal(getMaxSubSum([2, -8, 5, -1, 2, -3, 2]), 6);
  });
});
