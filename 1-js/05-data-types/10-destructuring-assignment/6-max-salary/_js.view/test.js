describe("topSalary", function () {
  it("eng ko'p to'lanadigan insonni topish", function () {
    let salaries = {
      John: 100,
      Pete: 300,
      Mary: 250,
    };

    assert.equal(topSalary(salaries), "Pete");
  });

  it("bo'sh obyektlar uchun null qaytaradi", function () {
    assert.isNull(topSalary({}));
  });
});
