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

<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/1-destruct-user/task.md
- `nom` xususiyati `name` o'zgaruvchaniga.
- `yoshlar` xususiyat `age` o'zgaruvchaniga.
- `isAdmin` xususiyat `isAdmin` o'zgaruvchaniga (agar yo'q bo'lsa, false)

Destrukturalashtirishdan keyingi qiymatlar:
=======
- `name` property into the variable `name`.
- `years` property into the variable `age`.
- `isAdmin` property into the variable `isAdmin` (false, if no such property)

Here's an example of the values after your assignment:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/10-destructuring-assignment/1-destruct-user/task.md

```js
let user = { name: "John", years: 30 };

// sizning kodingiz chap tomonda:
// ... = user

alert( name ); // John
alert( age ); // 30
alert( isAdmin ); // false
```
