describe("getDateAgo", function () {
  it("02.01.2015 dan 1 kun oldin -> 1-kun", function () {
    assert.equal(getDateAgo(new Date(2015, 0, 2), 1), 1);
  });

  it("02.01.2015 dan 2 kun oldin -> 31-kun", function () {
    assert.equal(getDateAgo(new Date(2015, 0, 2), 2), 31);
  });

  it("02.01.2015 dan 100 kun oldin -> 24-kun", function () {
    assert.equal(getDateAgo(new Date(2015, 0, 2), 100), 24);
  });

  it("02.01.2015 dan 365 kun oldin -> 2-kun", function () {
    assert.equal(getDateAgo(new Date(2015, 0, 2), 365), 2);
  });

  it("berilgan sanani o'zgartirmaydi", function () {
    let date = new Date(2015, 0, 2);
    let dateCopy = new Date(date);
    getDateAgo(dateCopy, 100);
    assert.equal(date.getTime(), dateCopy.getTime());
  });
});
