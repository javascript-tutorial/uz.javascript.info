# JavaScript maxsus xususiyatlari

Bu bob hozir o'rgangan JavaScript xususiyatlarini qisqacha takrorlaydi va nozik momentlarga alohida e'tibor beradi.

## Kod tuzilishi

Iboralar nuqta-vergul bilan ajratiladi:

```js run no-beautify
alert("Salom");
alert("Dunyo");
```

Odatda, qator uzilishi ham ajratuvchi sifatida qaraladi, shuning uchun bu ham ishlaydi:

```js run no-beautify
alert("Salom");
alert("Dunyo");
```

Bu "avtomatik nuqta-vergul qo'yish" deb ataladi. Ba'zan u ishlamaydi, masalan:

```js run
alert("Bu xabardan keyin xato bo'ladi")[(1, 2)].forEach(alert);
```

Ko'pchilik kod uslubi qo'llanmalari har bir iboradan keyin nuqta-vergul qo'yishga rozi.

Kod bloklari `{...}` va ular bilan tsikllar kabi sintaksis konstruksiyalaridan keyin nuqta-vergul shart emas:

```js
function f() {
  // funksiya e'lonidan keyin nuqta-vergul kerak emas
}

for (;;) {
  // tsikldan keyin nuqta-vergul kerak emas
}
```

...Lekin agar biror joyga "qo'shimcha" nuqta-vergul qo'ysak ham, bu xato emas. U e'tiborga olinmaydi.

Batafsil: <info:structure>.

## Qat'iy rejim

Zamonaviy JavaScript-ning barcha xususiyatlarini to'liq yoqish uchun skriptlarni `"use strict"` bilan boshlashimiz kerak.

```js
'use strict';

...
```

Direktiva skriptning yuqorisida yoki funksiya tanasining boshida bo'lishi kerak.

`"use strict"` bo'lmasa ham, hamma narsa ishlaydi, lekin ba'zi xususiyatlar eski uslubda, "mos" tarzda ishlaydi. Biz odatda zamonaviy xatti-harakatni afzal ko'ramiz.

Tilning ba'zi zamonaviy xususiyatlari (kelajakda o'rganadigan sinflar kabi) qat'iy rejimni bilvosita yoqadi.

Batafsil: <info:strict-mode>.

## O'zgaruvchilar

Quyidagilar yordamida e'lon qilish mumkin:

- `let`
- `const` (doimiy, o'zgartirib bo'lmaydi)
- `var` (eski uslub, keyinroq ko'ramiz)

O'zgaruvchi nomi quyidagilarni o'z ichiga olishi mumkin:

- Harflar va raqamlar, lekin birinchi belgi raqam bo'lmasligi mumkin.
- `$` va `_` belgilar oddiy, harflar bilan teng.
- Lotin bo'lmagan alifbolar va ierogliflar ham ruxsat etilgan, lekin odatda ishlatilmaydi.

O'zgaruvchilar dinamik tipga ega. Ular istalgan qiymatni saqlashi mumkin:

```js
let x = 5;
x = "John";
```

8 ta ma'lumot turi mavjud:

- `number` suzuvchi nuqta va butun sonlar uchun,
- `bigint` ixtiyoriy uzunlikdagi butun sonlar uchun,
- `string` satrlar uchun,
- `boolean` mantiqiy qiymatlar uchun: `true/false`,
- `null` -- bitta `null` qiymatli tip, "bo'sh" yoki "mavjud emas" ma'nosini bildiradi,
- `undefined` -- bitta `undefined` qiymatli tip, "tayinlanmagan" ma'nosini bildiradi,
- `object` va `symbol` -- murakkab ma'lumotlar tuzilmalari va noyob identifikatorlar uchun, biz ularni hali o'rganmadik.

`typeof` operatori qiymat uchun tipni qaytaradi, ikkita istisno bilan:

```js
typeof null == "object"; // tildagi xato
typeof function () {} == "function"; // funksiyalar alohida ko'rib chiqiladi
```

Batafsil: <info:variables> va <info:types>.

## O'zaro ta'sir

Biz brauzerni ish muhiti sifatida ishlatamoqdamiz, shuning uchun asosiy UI funksiyalar quyidagicha bo'ladi:

[`prompt(question, [default])`](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt)
: `question` so'rash va tashrif buyuruvchi kiritgan narsani yoki "bekor qilish"ni bossalar `null` ni qaytarish.

[`confirm(question)`](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm)
: `question` so'rash va Ok va Bekor qilish o'rtasida tanlashni taklif qilish. Tanlov `true/false` sifatida qaytariladi.

[`alert(message)`](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert)
: `message` ni chiqarish.

Bu funksiyalarning barchasi _modal_, ular kod bajarilishini to'xtatadi va tashrif buyuruvchi javob berguncha sahifa bilan o'zaro ta'sirni oldini oladi.

Masalan:

```js run
let userName = prompt("Ismingiz?", "Alice");
let isTeaWanted = confirm("Choy istaysizmi?");

alert("Tashrif buyuruvchi: " + userName); // Alice
alert("Choy kerak: " + isTeaWanted); // true
```

Batafsil: <info:alert-prompt-confirm>.

## Operatorlar

JavaScript quyidagi operatorlarni qo'llab-quvvatlaydi:

Arifmetik
: Oddiy: `* + - /`, shuningdek qoldiq uchun `%` va sonning darajasi uchun `**`.

    Ikkilik plus `+` satrlarni birlashtiradi. Va agar operandlardan biri satr bo'lsa, ikkinchisi ham satrga aylantiriladi:

    ```js run
    alert( '1' + 2 ); // '12', satr
    alert( 1 + '2' ); // '12', satr
    ```

Tayinlashlar
: Oddiy tayinlash: `a = b` va birlashtirilganlar `a *= 2` kabi.

Bitli
: Bitli operatorlar eng past, bit darajasida 32-bitli butun sonlar bilan ishlaydi: kerak bo'lganda [hujjatlarga](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#bitwise_operators) qarang.

Shartli
: Uchta parametrli yagona operator: `cond ? resultA : resultB`. Agar `cond` haqiqiy bo'lsa, `resultA` ni qaytaradi, aks holda `resultB` ni.

Mantiqiy operatorlar
: Mantiqiy VA `&&` va YOKI `||` qisqa tutashuv baholashini amalga oshiradi va keyin to'xtagan joyda qiymatni qaytaradi (majburiy ravishda `true`/`false` emas). Mantiqiy EMAS `!` operandni boolean tipiga aylantiradi va teskari qiymatni qaytaradi.

Nullish coalescing operatori
: `??` operatori o'zgaruvchilar ro'yxatidan aniqlangan qiymatni tanlash usulini taqdim etadi. `a ?? b` ning natijasi `null/undefined` bo'lmaguncha `a`, keyin `b`.

Taqqoslashlar
: Turli tiplar qiymatlari uchun tenglik tekshiruvi `==` ularni raqamga aylantiradi (`null` va `undefined` dan tashqari, ular bir-biriga teng va boshqa hech narsaga teng emas), shuning uchun bular teng:

    ```js run
    alert( 0 == false ); // true
    alert( 0 == '' ); // true
    ```

    Boshqa taqqoslashlar ham raqamga aylantiradi.

    Qat'iy tenglik operatori `===` aylantirishni qilmaydi: turli tiplar uning uchun har doim turli qiymatlarni anglatadi.

    `null` va `undefined` qiymatlari maxsus: ular bir-biriga `==` teng va boshqa hech narsaga teng emas.

    Katta/kichik taqqoslashlar satrlarni belgi-belgiga solishtiradi, boshqa tiplar raqamga aylantiriladi.

Boshqa operatorlar
: Vergul operatori kabi bir nechtasi bor.

Batafsil: <info:operators>, <info:comparison>, <info:logical-operators>, <info:nullish-coalescing-operator>.

## Tsikllar

- Biz 3 turdagi tsiklni ko'rib chiqdik:

  ```js
  // 1
  while (condition) {
    ...
  }

  // 2
  do {
    ...
  } while (condition);

  // 3
  for(let i = 0; i < 10; i++) {
    ...
  }
  ```

- `for(let...)` tsiklida e'lon qilingan o'zgaruvchi faqat tsikl ichida ko'rinadi. Lekin biz `let` ni tashlab qo'yib, mavjud o'zgaruvchini qayta ishlatishimiz ham mumkin.
- `break/continue` direktivlari butun tsikl/joriy iteratsiyadan chiqishga imkon beradi. Ichma-ich tsikllarni buzish uchun yorliqlardan foydalaning.

Batafsil: <info:while-for>.

Keyinroq obyektlar bilan ishlash uchun ko'proq tsikl turlarini o'rganamiz.

## "switch" konstruksiyasi

"switch" konstruksiyasi bir nechta `if` tekshiruvini almashtirishi mumkin. U taqqoslash uchun `===` (qat'iy tenglik) dan foydalanadi.

Masalan:

```js run
let age = prompt("Yoshingiz?", 18);

switch (age) {
  case 18:
    alert("Ishlamaydi"); // prompt natijasi satr, raqam emas
    break;

  case "18":
    alert("Bu ishlaydi!");
    break;

  default:
    alert("Yuqoridagilardan biriga teng bo'lmagan istalgan qiymat");
}
```

Batafsil: <info:switch>.

## Funksiyalar

JavaScript-da funksiya yaratishning uchta usulini ko'rib chiqdik:

1. Funksiya e'loni: asosiy kod oqimidagi funksiya

   ```js
   function sum(a, b) {
     let result = a + b;

     return result;
   }
   ```

2. Funksiya ifodasi: ifoda kontekstidagi funksiya

   ```js
   let sum = function (a, b) {
     let result = a + b;

     return result;
   };
   ```

3. Arrow funksiyalar:

   ```js
   // o'ng tomonda ifoda
   let sum = (a, b) => a + b;

   // yoki { ... } bilan ko'p qatorli sintaksis, bu yerda return kerak:
   let sum = (a, b) => {
     // ...
     return a + b;
   };

   // argumentlarsiz
   let sayHi = () => alert("Salom");

   // bitta argument bilan
   let double = (n) => n * 2;
   ```

- Funksiyalar mahalliy o'zgaruvchilarga ega bo'lishi mumkin: uning tanasida yoki parametr ro'yxatida e'lon qilinganlar. Bunday o'zgaruvchilar faqat funksiya ichida ko'rinadi.
- Parametrlar standart qiymatlarga ega bo'lishi mumkin: `function sum(a = 1, b = 2) {...}`.
- Funksiyalar har doim biror narsa qaytaradi. Agar `return` iborasi bo'lmasa, natija `undefined` bo'ladi.

Batafsil: <info:function-basics>, <info:arrow-functions-basics> ga qarang.

## Davomi bor

Bu JavaScript xususiyatlarining qisqacha ro'yxati edi. Hozircha biz faqat asoslarni o'rgandik. Qo'llanmaning davomida siz JavaScript-ning ko'proq maxsus va ilg'or xususiyatlarini topasiz.
