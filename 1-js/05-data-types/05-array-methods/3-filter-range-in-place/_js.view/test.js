describe("filterRangeInPlace", function () {
  it("filtrlangan qiymatlarni qaytaradi", function () {
    let arr = [5, 3, 8, 1];

<<<<<<< HEAD
    filterRangeInPlace(arr, 1, 4);
=======
    filterRangeInPlace(arr, 2, 5); 
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

    assert.deepEqual(arr, [5, 3]);
  });

  it("hech narsa qaytarmaydi", function () {
    assert.isUndefined(filterRangeInPlace([1, 2, 3], 1, 4));
  });
<<<<<<< HEAD
=======

>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
});
