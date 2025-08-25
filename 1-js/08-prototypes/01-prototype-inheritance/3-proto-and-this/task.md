muhimlik: 5

---

# Qayerda yoziladi?

Bizda `animal` dan meros qolgan `rabbit` bor.

If we call `rabbit.eat()`, which object receives the `full` property: `animal` or `rabbit`?
Agar biz `rabbit.eat()` deb nomlasak, qaysi obyekt `to'liq` xususiyatini oladi: `animal` yoki `rabbit`?

```js
let animal = {
  eat() {
    this.full = true;
  },
};

let rabbit = {
  __proto__: animal,
};

rabbit.eat();
```
