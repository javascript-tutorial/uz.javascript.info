describe("Ladder", function () {
  before(function () {
    window.alert = sinon.stub(window, "alert");
  });

  beforeEach(function () {
    ladder.step = 0;
  });

  it("up() should return this", function () {
    assert.equal(ladder.up(), ladder);
  });

  it("down() should return this", function () {
    assert.equal(ladder.down(), ladder);
  });

  it("showStep() should call alert", function () {
    ladder.showStep();
    assert(alert.called);
  });

  it("up() should increase step", function () {
    assert.equal(ladder.up().up().step, 2);
  });

  it("down() should decrease step", function () {
    assert.equal(ladder.down().step, -1);
  });

  it("down().up().up().up() ", function () {
    assert.equal(ladder.down().up().up().up().step, 2);
  });

<<<<<<< HEAD
  after(function () {
=======
  it('showStep() should return this', function() {
    assert.equal(ladder.showStep(), ladder);
  });
 
  it('up().up().down().showStep().down().showStep()', function () {
    assert.equal(ladder.up().up().down().showStep().down().showStep().step, 0)
  });
  
  after(function() {
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
    ladder.step = 0;
    alert.restore();
  });
});
