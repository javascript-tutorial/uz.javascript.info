importance: 4

---

# Tepa registr const?

Quyidagi kodni tekshiring:

```js
const birthday = '18.04.1982'; // tug'ilgan kun

const age = someCode(birthday); // yosh
```

Bu erda bizda doimiy `birthday` sanasi mavjud va `age` ba'zi kodlar yordamida `birthday` dan hisoblab chiqilgan (bu qisqartirish uchun ko'rsatilmagan, chunki bu erda tafsilotlar muhim emas).

`birthday` uchun katta registridan foydalanish to'g'ri bo'ladimi? `age` uchun chi? Yoki ikkalsigayam foydalanish to'g'rimi?

```js
const BIRTHDAY = '18.04.1982'; // katta registridan foydalanish kerakmi?

const AGE = someCode(BIRTHDAY); // katta registridan foydalanish kerakmi?
```

