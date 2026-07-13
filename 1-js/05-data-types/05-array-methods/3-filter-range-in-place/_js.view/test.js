describe("filterRangeInPlace", function () {
  it("filtrlangan qiymatlarni qaytaradi", function () {
    let arr = [5, 3, 8, 1];

<<<<<<< HEAD
    filterRangeInPlace(arr, 1, 4);
=======
    filterRangeInPlace(arr, 2, 5); 
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

    assert.deepEqual(arr, [5, 3]);
  });

  it("hech narsa qaytarmaydi", function () {
    assert.isUndefined(filterRangeInPlace([1, 2, 3], 1, 4));
  });
<<<<<<< HEAD
=======

>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
});
