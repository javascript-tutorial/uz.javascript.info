
```js run demo
let num;

do {
  num = prompt("100 dan katta raqam kiritingizmi?", 0);
} while (num <= 100 && num);
```

Ikkala tekshiruv ham to'g'ri bo'lsa, `do... while` tsikli takrorlanadi:

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/6-repeat-until-correct/solution.md
1. `num <= 100` tekshiruvi -- ya'ni kiritilgan qiymat hali ham `100` dan katta emas.
2. `num` `null` yoki bo'sh satr bo'lganda `&& num` tekshiruvi noto'g'ri. Agar tekshuruv noto'g'ri bolsa `while` tsikli ham to'xtaydi.
=======
1. The check for `num <= 100` -- that is, the entered value is still not greater than `100`.
2. The check `&& num` is false when `num` is `null` or an empty string. Then the `while` loop stops too.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/13-while-for/6-repeat-until-correct/solution.md

P.S. Agar `num` `null` bo'lsa, u holda `num <= 100` haqiqiy bo'ladi, shuning uchun 2-chi tekshiruvsiz foydalanuvchi CANCEL tugmasini bosmaganicha tsikl to'xtamaydi. Ikkala tekshiruv ham talab qilinadi.
