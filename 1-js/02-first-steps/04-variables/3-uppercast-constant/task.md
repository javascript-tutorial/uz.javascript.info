importance: 4

---

# Tepa registr const?

Quyidagi kodni tekshiring:

```js
const birthday = '18.04.1982'; // tug'ilgan kun

const age = someCode(birthday); // yosh
```

<<<<<<< HEAD
Bu erda bizda doimiy `birthday` sanasi mavjud va `age` ba'zi kodlar yordamida `birthday` dan hisoblab chiqilgan (bu qisqartirish uchun ko'rsatilmagan, chunki bu erda tafsilotlar muhim emas).
=======
Here we have a constant `birthday` for the date, and also the `age` constant.

The `age` is calculated from `birthday` using `someCode()`, which means a function call that we didn't explain yet (we will soon!), but the details don't matter here, the point is that `age` is calculated somehow based on the `birthday`.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

`birthday` uchun katta registridan foydalanish to'g'ri bo'ladimi? `age` uchun chi? Yoki ikkalsigayam foydalanish to'g'rimi?

```js
<<<<<<< HEAD
const BIRTHDAY = '18.04.1982'; // katta registridan foydalanish kerakmi?

const AGE = someCode(BIRTHDAY); // katta registridan foydalanish kerakmi?
=======
const BIRTHDAY = '18.04.1982'; // make birthday uppercase?

const AGE = someCode(BIRTHDAY); // make age uppercase?
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```
