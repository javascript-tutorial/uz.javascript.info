muhimlik: 5

---

# Kalkulyator ni yarating

Obyektlarni 3 usul bilan yaratadigan "Kalkulyator" konstruktor funktsiyasini yarating:

<<<<<<< HEAD
- `read()` `prompt` yordamida ikkita qiymatni so'raydi va ularni obyekt xususiyatlarida eslab qoladi.
- `sum()` ushbu xususiyatlarning yig'indisini qaytaradi.
- `mul()` ushbu xususiyatlarning ko'paytish mahsulotini qaytaradi.
=======
- `read()` prompts for two values and saves them as object properties with names `a` and `b` respectively.
- `sum()` returns the sum of these properties.
- `mul()` returns the multiplication product of these properties.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

Masalan:

```js
let calculator = new Calculator();
calculator.read();

alert("Sum=" + calculator.sum());
alert("Mul=" + calculator.mul());
```

[demo]
