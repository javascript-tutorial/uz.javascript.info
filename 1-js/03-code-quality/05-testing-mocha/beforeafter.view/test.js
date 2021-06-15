describe("test", function() {
  
   // Mocha usually waits for the tests for 2 seconds before considering them wrong
  
  this.timeout(200000); // With this code we increase this - in this case to 200,000 milliseconds

<<<<<<< HEAD
  before(() => alert("Sinov boshlandi - barcha testlardan oldin"));
  after(() => alert("Sinov tugadi - barcha testlardan so'ng"));
=======
  // This is because of the "alert" function, because if you delay pressing the "OK" button the tests will not pass!
  
  before(() => alert("Testing started – before all tests"));
  after(() => alert("Testing finished – after all tests"));
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

  beforeEach(() => alert("Test oldidan - testni kiriting"));
  afterEach(() => alert("Testdan so'ng - testdan chiqing"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
