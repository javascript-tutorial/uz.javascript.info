# Ekranlash, maxsus belgilar

Ko'rib turganimizdek, teskari chiziq `pattern:\` belgilar sinflarini belgilash uchun ishlatiladi, masalan `pattern:\d`. Demak, bu regexplarda maxsus belgi (oddiy satrlardagi kabi).

Regexpda maxsus ma'noga ega bo'lgan boshqa maxsus belgilar ham bor. Ular yanada kuchli qidiruvlar uchun ishlatiladi. Mana ularning to'liq ro'yxati: `pattern:[ \ ^ $ . | ? * + ( )`.

Ro'yxatni yodlashga harakat qilmang -- tez orada har birini alohida ko'rib chiqamiz va siz ularni avtomatik ravishda yoddan bilasiz.

## Ekranlash

Aytaylik, biz tom ma'noda nuqtani topmoqchimiz. "Har qanday belgi" emas, balki shunchaki nuqta.

Maxsus belgini oddiy belgi sifatida ishlatish uchun uning oldiga teskari chiziq qo'ying: `pattern:\.`.

Bu "belgini ekranlash" deb ham ataladi.

Masalan:
```js run
alert( "Chapter 5.1".match(/\d\.\d/) ); // 5.1 (moslik!)
alert( "Chapter 511".match(/\d\.\d/) ); // null (haqiqiy nuqta \. ni qidirmoqda)
```

Qavslar ham maxsus belgilar, shuning uchun agar ularni xohlasak, `pattern:\(` ishlatishimiz kerak. Quyidagi misol `"g()"` satrini qidiradi:

```js run
alert( "function g()".match(/g\(\)/) ); // "g()"
```

Agar biz teskari chiziq `\` ni qidirmoqdamiz, u ham oddiy satrlar ham regexplarda maxsus belgi, shuning uchun uni ikki marta yozishimiz kerak.

```js run
alert( "1\\2".match(/\\/) ); // '\'
```

## Qiyshiq chiziq

Qiyshiq chiziq belgisi `'/'` maxsus belgi emas, lekin JavaScript-da u regexpni ochish va yopish uchun ishlatiladi: `pattern:/...pattern.../`, shuning uchun uni ham ekranlashimiz kerak.

Mana qiyshiq chiziq `'/'` ni qidirishning ko'rinishi:

```js run
alert( "/".match(/\//) ); // '/'
```

Boshqa tomondan, agar biz `pattern:/.../` ishlatmasdan, balki `new RegExp` yordamida regexp yaratsak, uni ekranlashimiz shart emas:

```js run
alert( "/".match(new RegExp("/")) ); // / ni topadi
```

## new RegExp

Agar biz `new RegExp` bilan doimiy ifoda yaratayotgan bo'lsak, `/` ni ekranlashimiz shart emas, lekin boshqa ekranlashlarni qilishimiz kerak.

Masalan, buni ko'rib chiqing:

```js run
let regexp = new RegExp("\d\.\d");

alert( "Chapter 5.1".match(regexp) ); // null
```

Oldingi misollardan birida xuddi shunday qidiruv `pattern:/\d\.\d/` bilan ishladi, lekin `new RegExp("\d\.\d")` ishlamaydi, nega?

Sababi shundaki, teskari chiziqlar satr tomonidan "iste'mol qilinadi". Eslaymizki, oddiy satrlar o'zining maxsus belgilariga ega, masalan `\n`, va teskari chiziq ekranlash uchun ishlatiladi.

Mana "\d\.\d" qanday qabul qilinadi:

```js run
alert("\d\.\d"); // d.d
```

Satr qo'shtirnoqlari teskari chiziqlarni "iste'mol qiladi" va ularni o'z-o'zidan talqin qiladi, masalan:

- `\n` -- yangi qator belgisiga aylanadi,
- `\u1234` -- bunday kodga ega Unicode belgisiga aylanadi,
- ...Va maxsus ma'no bo'lmaganda: `pattern:\d` yoki `\z` kabi, teskari chiziq shunchaki olib tashlanadi.

Shunday qilib, `new RegExp` teskari chiziqsiz satr oladi. Shuning uchun qidiruv ishlamaydi!

Buni tuzatish uchun biz teskari chiziqlarni ikki marta yozishimiz kerak, chunki satr qo'shtirnoqlari `\\` ni `\` ga aylantiradi:

```js run
*!*
let regStr = "\\d\\.\\d";
*/!*
alert(regStr); // \d\.\d (endi to'g'ri)

let regexp = new RegExp(regStr);

alert( "Chapter 5.1".match(regexp) ); // 5.1
```

## Xulosa

- Maxsus belgilar `pattern:[ \ ^ $ . | ? * + ( )` ni tom ma'noda qidirish uchun ularning oldiga teskari chiziq `\` qo'yishimiz kerak ("ularni ekranlash").
- Agar biz `pattern:/.../` ichida bo'lsak, `/` ni ham ekranlashimiz kerak (lekin `new RegExp` ichida emas).
- `new RegExp` ga satr uzatishda biz teskari chiziqlarni ikki marta `\\` yozishimiz kerak, chunki satr qo'shtirnoqlari ulardan birini iste'mol qiladi.