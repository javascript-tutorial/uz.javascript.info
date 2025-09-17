describe("formatDate", function () {
  it('1ms oldini "hozir" deb ko\'rsatadi', function () {
    assert.equal(formatDate(new Date(new Date() - 1)), "hozir");
  });

  it('"30 soniya oldin"', function () {
    assert.equal(formatDate(new Date(new Date() - 30 * 1000)), "30 son. oldin");
  });

  it('"5 daqiqa oldin"', function () {
    assert.equal(
      formatDate(new Date(new Date() - 5 * 60 * 1000)),
      "5 daq. oldin"
    );
  });

  it("eski sanalarni DD.MM.YY HH:mm formatida", function () {
    assert.equal(
      formatDate(new Date(2014, 2, 1, 11, 22, 33)),
      "01.03.14 11:22"
    );
  });
});
