describe("ucFirst", function () {
  it("Birinchi belgini kattalashtiradi", function () {
    assert.strictEqual(ucFirst("john"), "John");
  });

  it("Bo'sh matnda o'lmaydi", function () {
    assert.strictEqual(ucFirst(""), "");
  });
});
