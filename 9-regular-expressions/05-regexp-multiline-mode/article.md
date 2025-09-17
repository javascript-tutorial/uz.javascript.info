# Langarlarning ko'p qatorli rejimi ^ $, "m" bayrog'i

Ko'p qatorli rejim `pattern:m` bayrog'i bilan yoqiladi.

U faqat `pattern:^` va `pattern:$` ning harakatiga ta'sir qiladi.

Ko'p qatorli rejimda ular nafaqat satr boshi va oxirida, balki har bir qator boshi/oxirida ham mos keladi.

## Qator boshida qidirish ^

Quyidagi misolda matn bir nechta qatorga ega. `pattern:/^\d/gm` naqshi har bir qator boshidan raqamni oladi:

```js run
let str = `1st place: Winnie
2nd place: Piglet
3rd place: Eeyore`;

*!*
alert( str.match(/^\d/gm) ); // 1, 2, 3
*/!*
```

`pattern:m` bayrog'isiz faqat birinchi raqam topiladi:

```js run
let str = `1st place: Winnie
2nd place: Piglet
3rd place: Eeyore`;

*!*
alert( str.match(/^\d/g) ); // 1
*/!*
```

Buning sababi, sukut bo'yicha karet `pattern:^` faqat matn boshida mos keladi, ko'p qatorli rejimda esa - har qanday qator boshida.

```smart
"Qator boshi" rasmiy ma'noda "qator uzilishidan darhol keyin" degani: ko'p qatorli rejimda `pattern:^` testi yangi qator belgisi `\n` dan oldin kelgan barcha pozitsiyalarda mos keladi.

Va matn boshida ham.
```

## Qator oxirida qidirish $

Dollar belgisi `pattern:$` ham xuddi shunday harakat qiladi.

`pattern:\d$` doimiy ifodasi har bir qatordagi oxirgi raqamni topadi

```js run
let str = `Winnie: 1
Piglet: 2
Eeyore: 3`;

alert( str.match(/\d$/gm) ); // 1,2,3
```

`pattern:m` bayrog'isiz dollar `pattern:$` faqat butun matn oxirida mos keladi, shuning uchun faqat eng oxirgi raqam topiladi.

```smart
"Qator oxiri" rasmiy ma'noda "qator uzilishidan darhol oldin" degani: ko'p qatorli rejimda `pattern:$` testi yangi qator belgisi `\n` dan keyin keladigan barcha pozitsiyalarda mos keladi.

Va matn oxirida ham.
```

## ^ $ o'rniga \n qidirish

Yangi qatorni topish uchun biz nafaqat `pattern:^` va `pattern:$` langarlardan, balki yangi qator belgisi `\n` dan ham foydalanishimiz mumkin.

Farq nimada? Keling, misolni ko'raylik.

Bu yerda biz `pattern:\d$` o'rniga `pattern:\d\n` ni qidiraymiz:

```js run
let str = `Winnie: 1
Piglet: 2
Eeyore: 3`;

alert( str.match(/\d\n/gm) ); // 1\n,2\n
```

Ko'rib turganingizdek, 3 o'rniga 2 ta moslik bor.

Buning sababi `subject:3` dan keyin yangi qator yo'q (lekin matn oxiri bor, shuning uchun u `pattern:$` ga mos keladi).

Boshqa farq: endi har bir moslik yangi qator belgisi `match:\n` ni o'z ichiga oladi. Faqat shartni tekshiradigan (qator boshi/oxiri) `pattern:^` `pattern:$` langarlardan farqli o'laroq, `\n` belgidir, shuning uchun u natijaning bir qismi bo'ladi.

Shunday qilib, naqshdagi `\n` natijada yangi qator belgilari kerak bo'lganda ishlatiladi, langarlar esa qator boshi/oxirida biror narsani topish uchun ishlatiladi.