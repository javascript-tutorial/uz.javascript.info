# Eval: kod satrini ishga tushirish

O'rnatilgan `eval` funktsiyasi kod satrini bajarish imkonini beradi.

Sintaksis:

```js
let result = eval(code);
```

Masalan:

```js run
let code = 'alert("Salom")';
eval(code); // Salom
```

Kod satri uzun bo'lishi, satr uzilishlari, funktsiya e'lonlari, o'zgaruvchilar va boshqalarni o'z ichiga olishi mumkin.

`eval` natijasi oxirgi ifodaning natijasidir.

Masalan:

```js run
let value = eval("1+1");
alert(value); // 2
```

```js run
let value = eval("let i = 0; ++i");
alert(value); // 1
```

Eval qilingan kod joriy leksik muhitda bajariladi, shuning uchun u tashqi o'zgaruvchilarni ko'ra oladi:

```js run no-beautify
let a = 1;

function f() {
  let a = 2;

*!*
  eval('alert(a)'); // 2
*/!*
}

f();
```

U tashqi o'zgaruvchilarni ham o'zgartirishi mumkin:

```js untrusted refresh run
let x = 5;
eval("x = 10");
alert(x); // 10, qiymat o'zgartirildi
```

Qat'iy rejimda `eval` o'zining leksik muhitiga ega. Shuning uchun eval ichida e'lon qilingan funktsiyalar va o'zgaruvchilar tashqarida ko'rinmaydi:

```js untrusted refresh run
// eslatma: 'use strict' sukut bo'yicha ishlaydigan misollarda yoqilgan

eval("let x = 5; function f() {}");

alert(typeof x); // undefined (bunday o'zgaruvchi yo'q)
// f funktsiyasi ham ko'rinmaydi
```

`use strict` siz, `eval` o'zining leksik muhitiga ega emas, shuning uchun biz `x` va `f` ni tashqarida ko'rardik.

## "eval" dan foydalanish

Zamonaviy dasturlashda `eval` juda kam ishlatiladi. Ko'pincha "eval yovuz" deyiladi.

Sababi oddiy: uzoq, uzoq vaqt oldin JavaScript ancha zaif til edi, ko'p narsalarni faqat `eval` bilan qilish mumkin edi. Lekin u vaqt o'n yil oldin o'tdi.

Hozir `eval` dan foydalanish uchun deyarli hech qanday sabab yo'q. Agar kimdir undan foydalanayotgan bo'lsa, uni zamonaviy til konstruktsiyasi yoki [JavaScript Moduli](info:modules) bilan almashtirishi mumkin.

Uning tashqi o'zgaruvchilarga kirish qobiliyati yon ta'sirga ega ekanligini unutmang.

Kod minifierlari (JS ishlab chiqarishga chiqishdan oldin uni siqish uchun ishlatiladigan vositalar) mahalliy o'zgaruvchilarni qisqaroq nomlarga (`a`, `b` va boshqalar) o'zgartirib, kodni kichikroq qiladi. Bu odatda xavfsiz, lekin `eval` ishlatilganda emas, chunki mahalliy o'zgaruvchilarga eval qilingan kod satridan kirish mumkin. Shuning uchun minifierlar `eval` dan potentsial ko'rinadigan barcha o'zgaruvchilar uchun bunday qayta nomlashni qilmaydi. Bu kod siqish nisbatiga salbiy ta'sir qiladi.

`eval` ichida tashqi mahalliy o'zgaruvchilardan foydalanish ham yomon dasturlash amaliyoti deb hisoblanadi, chunki bu kodni saqlashni qiyinlashtiradi.

Bunday muammolardan butunlay xavfsiz bo'lishning ikki usuli bor.

**Agar eval qilingan kod tashqi o'zgaruvchilardan foydalanmasa, iltimos `eval` ni `window.eval(...)` sifatida chaqiring:**

Bu usulda kod global miqyosda bajariladi:

```js untrusted refresh run
let x = 1;
{
  let x = 5;
  window.eval("alert(x)"); // 1 (global o'zgaruvchi)
}
```

**Agar eval qilingan kod mahalliy o'zgaruvchilarga muhtoj bo'lsa, `eval` ni `new Function` ga o'zgartiring va ularni argumentlar sifatida o'tkazing:**

```js run
let f = new Function("a", "alert(a)");

f(5); // 5
```

`new Function` konstruktsiyasi <info:new-function> bo'limida tushuntirilgan. U satrdan funktsiya yaratadi, shuningdek global miqyosda. Shuning uchun u mahalliy o'zgaruvchilarni ko'ra olmaydi. Lekin yuqoridagi misoldagidek ularni argumentlar sifatida aniq o'tkazish ancha aniqroq.

## Xulosa

`eval(code)` chaqiruvi kod satrini ishga tushiradi va oxirgi ifodaning natijasini qaytaradi.

- Zamonaviy JavaScript da kam ishlatiladi, chunki odatda kerak bo'lmaydi.
- Tashqi mahalliy o'zgaruvchilarga kirishi mumkin. Bu yomon amaliyot deb hisoblanadi.
- Buning o'rniga, kodni global miqyosda eval qilish uchun `window.eval(code)` dan foydalaning.
- Yoki, agar kodingiz tashqi miqyosdan ba'zi ma'lumotlarga muhtoj bo'lsa, `new Function` dan foydalaning va uni argumentlar sifatida o'tkazing.
