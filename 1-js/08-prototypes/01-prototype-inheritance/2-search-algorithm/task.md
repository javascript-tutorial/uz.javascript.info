muhimlik: 5

---

# Qidiruv algoritmi

Vazifa ikki qismdan iborat.

Bizning obyektimiz bor:

```js
let head = {
  glasses: 1,
};

let table = {
  pen: 3,
};

let bed = {
  sheet: 1,
  pillow: 2,
};

let pockets = {
  money: 2000,
};
```

1. `__proto__` dan foydalanib, prototiplarni har qanday xususiyatni qidirish yo'liga mos keladigan tarzda belgilang: `pockets` -> `bed` -> `table` -> `head`. Masalan, `pockets.pen` `3` (`table` da topildi) va `bed.glasses` `1` (`head` da topildi) bo'lishi kerak.
2. Savolga javob bering: `glasses` ni `pockets.glasses` yoki `head.glasses` sifatida olish tezroq? Agar kerak bo'lsa, benchmark.
