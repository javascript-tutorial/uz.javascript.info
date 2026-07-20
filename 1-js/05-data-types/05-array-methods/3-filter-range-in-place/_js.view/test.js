describe("filterRangeInPlace", function () {
  it("filtrlangan qiymatlarni qaytaradi", function () {
    let arr = [5, 3, 8, 1];

<<<<<<< HEAD
    filterRangeInPlace(arr, 1, 4);
=======
    filterRangeInPlace(arr, 2, 5); 
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

    assert.deepEqual(arr, [5, 3]);
  });

  it("hech narsa qaytarmaydi", function () {
    assert.isUndefined(filterRangeInPlace([1, 2, 3], 1, 4));
  });
<<<<<<< HEAD
=======

>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
});
