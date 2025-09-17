describe("getLastDayOfMonth", function () {
  it("01.01.2012 ning oxirgi kuni - 31", function () {
    assert.equal(getLastDayOfMonth(2012, 0), 31);
  });

  it("01.02.2012 ning oxirgi kuni - 29 (kabisa yili)", function () {
    assert.equal(getLastDayOfMonth(2012, 1), 29);
  });

  it("01.02.2013 ning oxirgi kuni - 28", function () {
    assert.equal(getLastDayOfMonth(2013, 1), 28);
  });
});
