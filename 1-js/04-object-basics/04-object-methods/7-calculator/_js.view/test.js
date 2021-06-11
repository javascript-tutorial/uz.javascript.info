

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

    it("yig'indisi 5 ga teng", function() {
      assert.equal(calculator.sum(), 5);
    });

    it("ko'paytma mahsuloti 6 ga teng", function() {
      assert.equal(calculator.mul(), 6);
    });
  });

});
