importance: 5

---

<<<<<<< HEAD
# Qayerda yoziladi?
=======
# Where does it write?
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Bizda `animal` dan meros qolgan `rabbit` bor.

If we call `rabbit.eat()`, which object receives the `full` property: `animal` or `rabbit`? 
Agar biz `rabbit.eat()` deb nomlasak, qaysi obyekt `to'liq` xususiyatini oladi: `animal` yoki `rabbit`?

```js
let animal = {
  eat() {
    this.full = true;
  }
};

let rabbit = {
  __proto__: animal
};

rabbit.eat();
```
