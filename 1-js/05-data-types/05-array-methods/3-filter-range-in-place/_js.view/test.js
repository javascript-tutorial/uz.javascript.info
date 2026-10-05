describe("filterRangeInPlace", function () {
  it("filtrlangan qiymatlarni qaytaradi", function () {
    let arr = [5, 3, 8, 1];

<<<<<<< HEAD
    filterRangeInPlace(arr, 1, 4);
=======
    filterRangeInPlace(arr, 2, 5); 
>>>>>>> 20208769e528337949e946f526534d61d38bac47

    assert.deepEqual(arr, [5, 3]);
  });

  it("hech narsa qaytarmaydi", function () {
    assert.isUndefined(filterRangeInPlace([1, 2, 3], 1, 4));
  });
<<<<<<< HEAD
=======

>>>>>>> 20208769e528337949e946f526534d61d38bac47
});
