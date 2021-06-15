

describe("kalkulyator", function() {
  
  context("2 va 3 kiritilganda", function() {
    beforeEach(function() {
      sinon.stub(window, "prompt");

      prompt.onCall(0).returns("2");
      prompt.onCall(1).returns("3");

      calculator.read();
    });

    afterEach(function() {
      prompt.restore();
    });
    
    it('the read get two values and saves them as object properties', function () {
      assert.equal(calculator.a, 2);
      assert.equal(calculator.b, 3);
    });

    it("yig'indisi 5 ga teng", function() {
      assert.equal(calculator.sum(), 5);
    });

    it("ko'paytma mahsuloti 6 ga teng", function() {
      assert.equal(calculator.mul(), 6);
    });
  });

});
