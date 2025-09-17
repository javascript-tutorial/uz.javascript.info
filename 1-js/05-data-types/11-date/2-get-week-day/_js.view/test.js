describe("getWeekDay", function () {
  it("3-yanvar 2014 - juma", function () {
    assert.equal(getWeekDay(new Date(2014, 0, 3)), "FR");
  });

  it("4-yanvar 2014 - shanba", function () {
    assert.equal(getWeekDay(new Date(2014, 0, 4)), "SA");
  });

  it("5-yanvar 2014 - yakshanba", function () {
    assert.equal(getWeekDay(new Date(2014, 0, 5)), "SU");
  });

  it("6-yanvar 2014 - dushanba", function () {
    assert.equal(getWeekDay(new Date(2014, 0, 6)), "MO");
  });

  it("7-yanvar 2014 - seshanba", function () {
    assert.equal(getWeekDay(new Date(2014, 0, 7)), "TU");
  });

  it("8-yanvar 2014 - chorshanba", function () {
    assert.equal(getWeekDay(new Date(2014, 0, 8)), "WE");
  });

  it("9-yanvar 2014 - payshanba", function () {
    assert.equal(getWeekDay(new Date(2014, 0, 9)), "TH");
  });
});
