describe("test", function () {
  // Mocha usually waits for the tests for 2 seconds before considering them wrong

  this.timeout(200000); // With this code we increase this - in this case to 200,000 milliseconds

  before(() => alert("Sinov boshlandi - barcha testlardan oldin"));
  after(() => alert("Sinov tugadi - barcha testlardan so'ng"));

  beforeEach(() => alert("Test oldidan - testni kiriting"));
  afterEach(() => alert("Testdan so'ng - testdan chiqing"));

  it("test 1", () => alert(1));
  it("test 2", () => alert(2));
});
