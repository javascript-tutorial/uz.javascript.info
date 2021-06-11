importance: 5

---

# Destrukturalashtirish

Bizda obyekt bor:

```js
let user = {
  name: "John",
  years: 30
};
```

Destrukturalashtirishni yozing qaysiki qabul qiladi:

- `nom` xususiyati `name` o'zgaruvchaniga.
- `yoshlar` xususiyat `age` o'zgaruvchaniga.
- `isAdmin` xususiyat `isAdmin` o'zgaruvchaniga (agar yo'q bo'lsa, false)

Destrukturalashtirishdan keyingi qiymatlar:

```js
let user = { name: "John", years: 30 };

// sizning kodingiz chap tomonda:
// ... = user

alert( name ); // John
alert( age ); // 30
alert( isAdmin ); // false
```
