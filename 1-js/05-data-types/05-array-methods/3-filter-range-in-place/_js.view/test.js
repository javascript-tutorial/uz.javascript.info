describe("filterRangeInPlace", function () {
  it("filtrlangan qiymatlarni qaytaradi", function () {
    let arr = [5, 3, 8, 1];

<<<<<<< HEAD
    filterRangeInPlace(arr, 1, 4);
=======
    filterRangeInPlace(arr, 2, 5); 
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

    assert.deepEqual(arr, [5, 3]);
  });

  it("hech narsa qaytarmaydi", function () {
    assert.isUndefined(filterRangeInPlace([1, 2, 3], 1, 4));
  });
<<<<<<< HEAD
=======

>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
});
