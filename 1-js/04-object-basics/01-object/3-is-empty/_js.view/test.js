describe("isEmpty", function () {
  it("bo'sh ob'ekt uchun true qiymatini qaytaradi", function () {
    assert.isTrue(isEmpty({}));
  });

  it("xususiyat mavjud bo'lsa, false qiymatini qaytaradi", function () {
    assert.isFalse(
      isEmpty({
        anything: false,
      })
    );
  });
});
