describe("test", function() {

  before(() => alert("Sinov boshlandi - barcha testlardan oldin"));
  after(() => alert("Sinov tugadi - barcha testlardan so'ng"));

  beforeEach(() => alert("Test oldidan - testni kiriting"));
  afterEach(() => alert("Testdan so'ng - testdan chiqing"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
