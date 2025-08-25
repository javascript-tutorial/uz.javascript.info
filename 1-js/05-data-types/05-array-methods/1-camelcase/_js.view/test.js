describe("camelize", function () {
  it("bo'sh satrni o'zgartirisiz qoldiradi", function () {
    assert.equal(camelize(""), "");
  });

  it("background-color ni backgroundColor ga aylantiradi", function () {
    assert.equal(camelize("background-color"), "backgroundColor");
  });

  it("list-style-image ni listStyleImage ga aylantiradi", function () {
    assert.equal(camelize("list-style-image"), "listStyleImage");
  });

  it("-webkit-transition ni WebkitTransition ga aylantiradi", function () {
    assert.equal(camelize("-webkit-transition"), "WebkitTransition");
  });
});
