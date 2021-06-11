importance: 5

---

# Testda nima xatolik bor?

Quyidagi `pow` testida nima nosozlik?

```js
it("x ni n darajaga ko'taradi", function() {
  let x = 5;

  let result = x;
  assert.equal(pow(x, 1), result);

  result *= x;
  assert.equal(pow(x, 2), result);

  result *= x;
  assert.equal(pow(x, 3), result);
});
```

P.S. Sintaktik ravishda test to'g'ri va muvaffaqiyatli o'tadi.
