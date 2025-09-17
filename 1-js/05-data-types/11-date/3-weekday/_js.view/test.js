describe('getLocalDay "yevropa" hafta kunini qaytaradi', function () {
  it("3-yanvar 2014 - juma", function () {
    assert.equal(getLocalDay(new Date(2014, 0, 3)), 5);
  });

  it("4-yanvar 2014 - shanba", function () {
    assert.equal(getLocalDay(new Date(2014, 0, 4)), 6);
  });

  it("5-yanvar 2014 - yakshanba", function () {
    assert.equal(getLocalDay(new Date(2014, 0, 5)), 7);
  });

  it("6-yanvar 2014 - dushanba", function () {
    assert.equal(getLocalDay(new Date(2014, 0, 6)), 1);
  });

  it("7-yanvar 2014 - seshanba", function () {
    assert.equal(getLocalDay(new Date(2014, 0, 7)), 2);
  });

  it("8-yanvar 2014 - chorshanba", function () {
    assert.equal(getLocalDay(new Date(2014, 0, 8)), 3);
  });

  it("9-yanvar 2014 - payshanba", function () {
    assert.equal(getLocalDay(new Date(2014, 0, 9)), 4);
  });
});
