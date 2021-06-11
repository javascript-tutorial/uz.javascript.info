
describe("calculator", function() {
  let calculator;
  before(function() {
    sinon.stub(window, "prompt")

    prompt.onCall(0).returns("2");
    prompt.onCall(1).returns("3");

    calculator = new Calculator();
    calculator.read();
  });

  it("2 va 3 kiritilganda, yig'indisi 5 ga teng", function() {
    assert.equal(calculator.sum(), 5);
  });

  it("2 va 3 kiritilganda mahsuloti 6 ga teng", function() {
    assert.equal(calculator.mul(), 6);
  });

  after(function() {
    prompt.restore();
  });
});
