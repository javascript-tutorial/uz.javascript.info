muhimlik: 5

---

# Prototip bilan ishlash

Obyekt juftligini yaratadigan, keyin ularni o'zgartiradigan kod.

Jarayonda qaysi qiymatlar ko'rsatilgan?

```js
let animal = {
  jumps: null,
};
let rabbit = {
  __proto__: animal,
  jumps: true,
};

alert(rabbit.jumps); // ? (1)

delete rabbit.jumps;

alert(rabbit.jumps); // ? (2)

delete animal.jumps;

alert(rabbit.jumps); // ? (3)
```

3 javob bo'lishi kerak.
