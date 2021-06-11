Buning sababi, `i` hech qachon `10` ga teng bo'lmaydi.

`i` ning *haqiqiy* qiymatlarini ko'rish uchun uni ishga tushiring:

```js run
let i = 0;
while (i < 11) {
  i += 0.2;
  if (i > 9.8 && i < 10.2) alert( i );
}
```

Ularning hech biri aniq `10` ga teng emas.

Bunday narsalar `0,2` kabi kasrlarni qo'shganda aniq yo'qotishlar tufayli sodir bo'ladi.

Xulosa: o'nli kasrlar bilan ishlashda tenglikni tekshirishdan qoching.