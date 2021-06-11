importance: 5

---

# Accumulator ni yaratish

`Accumulator(startingValue)` konstruktor funktsiyasini yarating.

Yaratadigan obyekt:

- "Joriy qiymat" ni `value` xususiyatida saqlang. Boshlang'ich qiymati `startValue` konstruktorining argumentiga o'rnatiladi.
- `read()` usuli yangi raqamni o'qish va uni `value` ga qo'shish uchun `prompt` dan foydalanishi kerak.

Boshqacha qilib aytganda, `value` xususiyati - bu boshlang'ich qiymati `startValue` bilan foydalanuvchi tomonidan kiritilgan barcha qiymatlarning yig'indisi.

Kodning demosi:

```js
let accumulator = new Accumulator(1); // boshlang'ich qiymati 1
accumulator.read(); // foydalanuvchi tomonidan kiritilgan qiymatni qo'shadi
accumulator.read(); // foydalanuvchi tomonidan kiritilgan qiymatni qo'shadi
alert(accumulator.value); // ushbu qiymatlarning yig'indisini ko'rsatadi
```

[demo]
