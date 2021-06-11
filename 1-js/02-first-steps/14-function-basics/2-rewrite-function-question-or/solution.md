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

Shuni esda tutingki, bu erda `age > 18` ga qavs kerak emas. Ular yaxshiroq o'qilish uchun mavjud.
