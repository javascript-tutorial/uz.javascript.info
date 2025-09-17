describe("count", function () {
  it("xususiyatlar sonini sanaydi", function () {
    assert.equal(count({ a: 1, b: 2 }), 2);
  });

  it("bo'sh objekt uchun 0 qaytaradi", function () {
    assert.equal(count({}), 0);
  });

  it("simbolik xususiyatlarni e'tiborsiz qoldiradi", function () {
    assert.equal(count({ [Symbol("id")]: 1 }), 0);
  });
});
