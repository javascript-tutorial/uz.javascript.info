`'?'` Savol belgisi operatoridan foydalanish:

```js
function checkAge(age) {
  return (age > 18) ? true : confirm('Ota-onangiz sizga ruxsat berdimi?');
}
```

YOKI `||` (eng qisqa variant) dan foydalanish:

```js
function checkAge(age) {
  return (age > 18) || confirm('Ota-onangiz sizga ruxsat berdimi?'');
}
```

<<<<<<< HEAD:1-js/02-first-steps/14-function-basics/2-rewrite-function-question-or/solution.md
Shuni esda tutingki, bu erda `age > 18` ga qavs kerak emas. Ular yaxshiroq o'qilish uchun mavjud.
=======
Note that the parentheses around `age > 18` are not required here. They exist for better readability.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/15-function-basics/2-rewrite-function-question-or/solution.md
