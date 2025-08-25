```js run demo
let num;

do {
  num = prompt("100 dan katta raqam kiritingizmi?", 0);
} while (num <= 100 && num);
```

Ikkala tekshiruv ham to'g'ri bo'lsa, `do... while` tsikli takrorlanadi:

1. `num <= 100` tekshiruvi -- ya'ni kiritilgan qiymat hali ham `100` dan katta emas.
2. `num` `null` yoki bo'sh satr bo'lganda `&& num` tekshiruvi noto'g'ri. Agar tekshuruv noto'g'ri bolsa `while` tsikli ham to'xtaydi.

P.S. Agar `num` `null` bo'lsa, u holda `num <= 100` haqiqiy bo'ladi, shuning uchun 2-chi tekshiruvsiz foydalanuvchi CANCEL tugmasini bosmaganicha tsikl to'xtamaydi. Ikkala tekshiruv ham talab qilinadi.
