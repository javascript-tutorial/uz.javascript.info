muhimlik: 5

---

# Dekorativni kechiktirish

`f` ning har bir chaqiruvini `ms` millisoniyalarga kechiktiradigan dekorativ `delay(f, ms)` yarating.

Masalan:

```js
function f(x) {
  alert(x);
}

// o'rama yarating
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test"); // 1000ms dan keyin "test" ni ko'rsatadi
f1500("test"); // 1500ms dan keyin "test" ni ko'rsatadi
```

Boshqacha qilib aytganda, `delay(f, ms)` `f` ning `ms` bilan kechiktirilganligini qaytaradi.

Yuqoridagi kodda `f` bitta argumentning funktsiyasidir, ammo sizning yechimingiz barcha argumentlarni va kontekstni `this` dan o'tkazishi kerak.
