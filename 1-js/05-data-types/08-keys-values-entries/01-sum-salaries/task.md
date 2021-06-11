importance: 5

---

# Xususiyatlarni qo'shish

Tasodifiy ish haqi miqdori bilan `salaries` obyekti mavjud.

`Object.values` va `for..of` tsikldan foydalanib, barcha ish haqi yig'indisini qaytaradigan `sumSalaries(salaries)` funktsiyasini yozing.

Agar `salaries` bo'sh bo'lsa, unda natija `0` bo'lishi kerak.

Masalan:

```js
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

alert( sumSalaries(salaries) ); // 650
```

