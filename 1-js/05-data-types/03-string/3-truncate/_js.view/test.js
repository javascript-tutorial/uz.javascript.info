describe("kesish", function () {
  it("uzun matnni berilgan uzunlikka (shu jumladan ellips) kesib tashlang", function () {
    assert.equal(
      truncate("Ushbu mavzu bo'yicha men aytmoqchi bo'lgan narsa:", 20),
      "Ushbu mavzu bo'yicha..."
    );
  });

  it("qisqa matnlarni o'zgartirmang", function () {
    assert.equal(truncate("Hammaga salom!", 20), "Hammaga salom!");
  });
});
