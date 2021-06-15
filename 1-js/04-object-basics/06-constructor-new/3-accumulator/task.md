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
<<<<<<< HEAD
let accumulator = new Accumulator(1); // boshlang'ich qiymati 1
accumulator.read(); // foydalanuvchi tomonidan kiritilgan qiymatni qo'shadi
accumulator.read(); // foydalanuvchi tomonidan kiritilgan qiymatni qo'shadi
alert(accumulator.value); // ushbu qiymatlarning yig'indisini ko'rsatadi
=======
let accumulator = new Accumulator(1); // initial value 1

accumulator.read(); // adds the user-entered value
accumulator.read(); // adds the user-entered value

alert(accumulator.value); // shows the sum of these values
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

[demo]
