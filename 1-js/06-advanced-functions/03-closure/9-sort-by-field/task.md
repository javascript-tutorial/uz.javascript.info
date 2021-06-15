importance: 5

---

# Maydonlar bo'yicha saralash

Bizda tartiblash uchun bir massiv obyektlar mavjud:

```js
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];
```

Buning bajarish uchun odatiy usul:

```js
// nom bo'yicha (Ann, John, Pete)
users.sort((a, b) => a.name > b.name ? 1 : -1);

// yosh bo'yicha (Pete, Ann, John)
users.sort((a, b) => a.age > b.age ? 1 : -1);
```

Buni biz bundan ham qisqaroq qila olamizmi?

```js
users.sort(byField('name'));
users.sort(byField('age'));
```

Shunday qilib, funktsiyani yozish o'rniga `byField(fieldName)` ni qo'ying.

Buning uchun ishlatilishi mumkin bo'lgan `byField` funktsiyasini yozing.
