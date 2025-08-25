describe("multiplyNumeric", function () {
  it("barcha sonli xususiyatlarni 2 ga ko'paytiradi", function () {
    let menu = {
      width: 200,
      height: 300,
      title: "Mening menyuim",
    };
    let result = multiplyNumeric(menu);
    assert.equal(menu.width, 400);
    assert.equal(menu.height, 600);
    assert.equal(menu.title, "Mening menyuim");
  });

  it("returns nothing", function () {
    assert.isUndefined(multiplyNumeric({}));
  });
});
