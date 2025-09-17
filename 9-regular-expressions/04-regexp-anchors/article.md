# Langarlar: satr boshi ^ va oxiri $

Karet `pattern:^` va dollar `pattern:$` belgilari doimiy ifodada maxsus ma'noga ega. Ular "langarlar" deb ataladi.

Karet `pattern:^` matn boshida mos keladi, dollar `pattern:$` esa oxirida.

Masalan, matn `Mary` bilan boshlanadimi deb tekshiraylik:

```js run
let str1 = "Mary had a little lamb";
alert( /^Mary/.test(str1) ); // true
```

`pattern:^Mary` naqshi: "satr boshi va keyin Mary" degani.

Xuddi shunday, satr `snow` bilan tugaydimi deb `pattern:snow$` yordamida tekshirishimiz mumkin:

```js run
let str1 = "it's fleece was white as snow";
alert( /snow$/.test(str1) ); // true
```

Bu aniq hollarda biz `startsWith/endsWith` satr metodlaridan ham foydalanishimiz mumkin edi. Doimiy ifodalar murakkab testlar uchun ishlatilishi kerak.

## To'liq moslik uchun test

Ikkala langar birgalikda `pattern:^...$` ko'pincha satr naqshga to'liq mos keladimi yoki yo'qligini tekshirish uchun ishlatiladi. Masalan, foydalanuvchi kiritgan ma'lumot to'g'ri formatdami deb tekshirish uchun.

Satr `12:34` formatida vaqtmi yoki yo'qligini tekshiraylik. Ya'ni: ikkita raqam, keyin ikki nuqta, keyin yana ikkita raqam.

Doimiy ifodalar tilida bu `pattern:\d\d:\d\d`:

```js run
let goodInput = "12:34";
let badInput = "12:345";

let regexp = /^\d\d:\d\d$/;
alert( regexp.test(goodInput) ); // true
alert( regexp.test(badInput) ); // false
```

Bu yerda `pattern:\d\d:\d\d` uchun moslik aynan matn boshi `pattern:^` dan keyin boshlanishi va oxiri `pattern:$` darhol ergashishi kerak.

Butun satr aynan shu formatda bo'lishi kerak. Agar biron bir chetga chiqish yoki qo'shimcha belgi bo'lsa, natija `false` bo'ladi.

Agar `pattern:m` bayrog'i mavjud bo'lsa, langarlar boshqacha harakat qiladi. Buni keyingi maqolada ko'ramiz.

```smart header="Langarlar \"nol kenglik\"ga ega"
`pattern:^` va `pattern:$` langarlar testlardir. Ular nol kenglikka ega.

Boshqacha qilib aytganda, ular belgiga mos kelmaydi, balki regexp dvigatelini shart (matn boshi/oxiri) ni tekshirishga majbur qiladi.
```