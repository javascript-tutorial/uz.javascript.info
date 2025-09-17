describe("calculator", function () {
  let calculator;
  before(function () {
    sinon.stub(window, "prompt");

    prompt.onCall(0).returns("2");
    prompt.onCall(1).returns("3");

    calculator = new Calculator();
    calculator.read();
  });

  it("the read method asks for two values using prompt and remembers them in object properties", function () {
    assert.equal(calculator.a, 2);
    assert.equal(calculator.b, 3);
  });

  it("2 va 3 kiritilganda, yig'indisi 5 ga teng", function () {
    assert.equal(calculator.sum(), 5);
  });

  it("2 va 3 kiritilganda mahsuloti 6 ga teng", function () {
    assert.equal(calculator.mul(), 6);
  });

  after(function () {
    prompt.restore();
  });
});
