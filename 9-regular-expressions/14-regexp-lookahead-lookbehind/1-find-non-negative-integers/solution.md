Butun son uchun regexp `pattern:\d+` dir.

Biz uning oldiga salbiy orqaga qarashni qo'yish orqali salbiy sonlarni chiqarib tashlashimiz mumkin: `pattern:(?<!-)\d+`.

Biroq, agar biz buni hozir sinab ko'rsak, yana bitta "ortiqcha" natijani payqashimiz mumkin:

```js run
let regexp = /(?<!-)\d+/g;

let str = "0 12 -5 123 -18";

console.log( str.match(regexp) ); // 0, 12, 123, *!*8*/!*
```

Ko'rib turganimizdek, u `subject:-18` dan `match:8` ga mos keladi. Buni chiqarib tashlash uchun regexp sonni boshqa (mos kelmaydigan) sonning o'rtasidan emas, balki boshidan boshlashini ta'minlashimiz kerak.

Buni boshqa salbiy orqaga qarashni belgilash orqali qilishimiz mumkin: `pattern:(?<!-)(?<!\d)\d+`. Endi `pattern:(?<!\d)` moslik boshqa raqamdan keyin boshlanmasligini ta'minlaydi, aynan bizga kerak bo'lgan narsa.

Biz ularni bu yerda bitta orqaga qarashga birlashtirishimiz ham mumkin:

```js run
let regexp = /(?<![-\d])\d+/g;

let str = "0 12 -5 123 -18";

alert( str.match(regexp) ); // 0, 12, 123
```