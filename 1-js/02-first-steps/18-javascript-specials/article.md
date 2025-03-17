# JavaScript xususiyatlari

Ushbu bobda JavaScript-ning nozik lahzalarga alohida e'tibor berib, biz hozirgacha o'rgangan xususiyatlari haqida qisqacha ma'lumot berilgan.

## Kod tarkibi

Ifodalar nuqta-vergul bilan ajratilgan:

```js run no-beautify
alert('Salom'); alert('Dunyo');
```

Odatda, keyingi satrga o’tish ajratuvchi sifatida qaraladi, shuning uchun bu ham ishlaydi:

```js run no-beautify
alert('Salom')
alert('Dunyo')
```

Bu "avtomatik nuqta-vergul qo'shish" deb ataladi. Ba'zan ishlamaydi, masalan:

```js run
alert("Ushbu xabardan keyin xato bo'ladi")

[1, 2].forEach(alert)
```

Ko'pgina kod uslublari bo'yicha qo'llanmalar har bir ifodadan keyin nuqta-vergul qo'yishimiz kerak degan fikrga qo'shilishadi.

`{...}` kod bloklari va ular bilan sintaksis tuzilgandan tsiklardan so'ng, nuqta-vergullar shart emas:

```js
function f() {
  // funktsiya e'lon qilinganidan keyin nuqta-vergul kerak emas
}

for(;;) {
  // tsikldan keyin nuqta-vergul kerak emas
}
```

...Ammo biz biron bir joyga "qo'shimcha" nuqta-vergul qo'yishimiz mumkin, bu xato emas. Bunga e'tibor berilmaydi.

Batafsil: <info:structure>.

## Qat'iy rejim

Zamonaviy JavaScript-ning barcha xususiyatlarini to'liq ishga tushirish uchun biz `"use strict"` bilan skriptlarni boshlashimiz kerak.

```js
'use strict';

...
```

<<<<<<< HEAD:1-js/02-first-steps/16-javascript-specials/article.md
Direktiv skriptning yuqori qismida yoki funktsiya boshida bo'lishi kerak.
=======
The directive must be at the top of a script or at the beginning of a function body.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/18-javascript-specials/article.md

<<<<<<< HEAD
`"use strict"` siz, hamma narsa baribir ishlaydi, ammo ba'zi xususiyatlar o'zlarini eskicha moda tutishadi. Biz odatda zamonaviy xatti-harakatni afzal ko'ramiz.
=======
Without `"use strict"`, everything still works, but some features behave in the old-fashioned, "compatible" way. We'd generally prefer the modern behavior.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Tilning ba'zi zamonaviy xususiyatlari (kelajakda biz o'rganadigan sinflar singari) qat'iy rejimni bilvosita ta'minlaydi.

Batafsil: <info:strict-mode>.

## O'zgaruvchanlar

E'lon qilinishi mumkin:

- `let`
- `const` (konstanta, o'zgartirish mumkin emas)
- `var` (eski uslub, keyinroq ko'riladi)

O'zgaruvchan nomi quyidagilarni o'z ichiga olishi mumkin:
- Harflar va raqamlar, lekin birinchi belgi raqam bo'lmasligi kerak.
- `$` Va `_` belgilar normal, harflar bilan teng.
- Lotin bo'lmagan alifbolar va ierogliflarga ham ruxsat berilgan, ammo odatda qo'llanilmaydi.

O'zgaruvchanlar dinamik tarzda yoziladi. Ular har qanday qiymatni saqlashlari mumkin:

```js
let x = 5;
x = "John";
```

<<<<<<< HEAD:1-js/02-first-steps/16-javascript-specials/article.md
Ma'lumotlarning 7 turi mavjud:

- `number` suzuvchi nuqta va butun sonlar uchun,
- `string` matnlar uchun,
- `boolean` mantiqiy qiymatlar: `true/false`,
- `null` -- "bo'sh" yoki "mavjud emas" degan ma'noni anglatuvchi bitta `null` qiymatiga ega tur,
- `undefined` -- "tayinlanmagan" degan ma'noni anglatuvchi `undefined` yagona qiymatga ega tur,
- `object` va `symbol` -- murakkab ma'lumotlar tuzilmalari va noyob identifikatorlar uchun, biz ularni hali o'rganmaganmiz.
=======
There are 8 data types:

- `number` for both floating-point and integer numbers,
- `bigint` for integer numbers of arbitrary length,
- `string` for strings,
- `boolean` for logical values: `true/false`,
- `null` -- a type with a single value `null`, meaning "empty" or "does not exist",
- `undefined` -- a type with a single value `undefined`, meaning "not assigned",
- `object` and `symbol` -- for complex data structures and unique identifiers, we haven't learnt them yet.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/18-javascript-specials/article.md

`typeof` operatori qiymatning turini qaytaradi, ikkita istisno bundan mustasno:
```js
typeof null == "object" // tilda xato
typeof function(){} == "function" // funktsiyalarga maxsus ishlov beriladi
```

Batafsil: <info:variables> va <info:types>.

## Mehmon bilan o'zaro munosabatlar

Biz brauzerni ish muhiti sifatida ishlatmoqdamiz, shuning uchun asosiy interfeys funktsiyalari quyidagilar:

<<<<<<< HEAD
[`prompt(question, [default])`](mdn:api/Window/prompt)
<<<<<<< HEAD:1-js/02-first-steps/16-javascript-specials/article.md
: `Savol` bering va mehmon kiritgan qiymatni qaytaring, agar mehmon "bekor" tugmasini bosgan bo'lsa `null` ni qaytaring.
=======
=======
[`prompt(question, [default])`](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt)
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
: Ask a `question`, and return either what the visitor entered or `null` if they clicked "cancel".
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/18-javascript-specials/article.md

<<<<<<< HEAD
[`confirm(question)`](mdn:api/Window/confirm)
: `Savol` bering va Ok yoki Bekor qilish o'rtasida tanlov qilishni taklif qiling. Tanlov `true/false` sifatida qaytariladi.

[`alert(message)`](mdn:api/Window/alert)
: `Message` ni qaytaradi.
=======
[`confirm(question)`](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm)
: Ask a `question` and suggest to choose between Ok and Cancel. The choice is returned as `true/false`.

[`alert(message)`](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert)
: Output a `message`.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Bu funktsiyalarning barchasi *modal* bo'lib, ular kod bajarilishini to'xtatib turadi va mehmon javob berguncha sahifa bilan o'zaro aloqada bo'lishiga yo'l qo'ymaydi.

Masalan:

```js run
let userName = prompt("Ismingiz?", "Aziza");
let isTeaWanted = confirm("Choy istaysizmi??");

alert( "Mehmon: " + userName ); // Aziza
alert( "Choy istaydi: " + isTeaWanted ); // true
```

Batafsil: <info:alert-prompt-confirm>.

## Operatorlar

JavaScript quyidagi operatorlarni qo'llab-quvvatlaydi:

Arifmetik
: Muntazam: `* + - /`, qolgan qismi uchun `%` va raqamning darajasi uchun `**`.

    Binar qo'shish `+` matnlarni birlashtiradi. Agar operandlarning birortasi matn bo'lsa, ikkinchisi ham matnga aylantiriladi:

    ```js run
    alert( '1' + 2 ); // '12', matn
    alert( 1 + '2' ); // '12', matn
    ```

Tayinlash belgisi
: Oddiy tayinlashlar mavjud: `a = b` va `a *= 2` kabi kombinatsiyalanganlar.

<<<<<<< HEAD:1-js/02-first-steps/16-javascript-specials/article.md
Bit operatorlari
: Bitwise operatorlari butun sonlar bilan bit darajasida ishlaydi: kerak bo'lganda [docs](mdn:/JavaScript/Reference/Operators/Bitwise_Operators) ga qarang.

Uchinchi
: Uch parametrga ega bo'lgan yagona operator: `cond ? natijaA : natijaB`. Agar `cond` to'g'ri bo'lsa, `natijaA` ni, aks holda `natijaB` ni qaytaradi.

Mantiqiy operatorlar
: Mantiqiy VA `&&` va YOKI `||` qisqa tutashuvni baholashni amalga oshiradi va keyin to'xtagan joyga qiymatni qaytaradi. Mantiqiy YO'Q `!` operandni mantiqiy turga o'zgartiradi va teskari qiymatni qaytaradi.
=======
Bitwise
: Bitwise operators work with 32-bit integers at the lowest, bit-level: see the [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#bitwise_operators) when they are needed.

Conditional
: The only operator with three parameters: `cond ? resultA : resultB`. If `cond` is truthy, returns `resultA`, otherwise `resultB`.

Logical operators
: Logical AND `&&` and OR `||` perform short-circuit evaluation and then return the value where it stopped (not necessary `true`/`false`). Logical NOT `!` converts the operand to boolean type and returns the inverse value.

Nullish coalescing operator
: The `??` operator provides a way to choose a defined value from a list of variables. The result of `a ?? b` is `a` unless it's `null/undefined`, then `b`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/18-javascript-specials/article.md

Taqqoslashlar
: Turli xil qiymatlar uchun tenglikni tekshirish `==` ularni raqamga o'zgartiradi (bir-biriga teng keladigan `null` va `undefined` dan tashqari), shuning uchun ular tengdir:

    ```js run
    alert( 0 == false ); // true
    alert( 0 == '' ); // true
    ```

    Boshqa taqqoslashlar ham raqamga aylanadi.

<<<<<<< HEAD:1-js/02-first-steps/16-javascript-specials/article.md
    `===` qat'iy tenglik operatori konvertatsiyani amalga oshirmaydi: har xil turlar har doim har xil qiymatlarni anglatadi, shuning uchun:
=======
    The strict equality operator `===` doesn't do the conversion: different types always mean different values for it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/18-javascript-specials/article.md

    `null` va `undefined` qiymatlari alohida ahamiyatga ega: ular `==` bir-biriga teng va boshqa hech narsaga teng kelmaydi.

    Kattaroq/kamroq taqqoslashlar satrlarni belgi bo'yicha taqqoslaydi, boshqa turlari raqamga aylantiriladi.

Boshqa operatorlar
: Vergul operatori kabi bir necha boshqalar bor.

<<<<<<< HEAD:1-js/02-first-steps/16-javascript-specials/article.md
Batafsil: <info:operators>, <info:comparison>, <info:logical-operators>.
=======
More in: <info:operators>, <info:comparison>, <info:logical-operators>, <info:nullish-coalescing-operator>.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/18-javascript-specials/article.md

## Tsiklar

- Biz uchta turni qopladik:

    ```js
    // 1
    while (shart) {
      ...
    }

    // 2
    do {
      ...
    } while (shart);

    // 3
    for(let i = 0; i < 10; i++) {
      ...
    }
    ```

- `For(let ...)` tsiklida e'lon qilingan o'zgaruvchan faqat tsikl ichida ko'rinadi. Ammo biz `let` ni qoldirib, mavjud bo'lgan o'zgaruvchani qayta ishlatishimiz mumkin.
- Direktivalar `break/continue` butun tsikldan/joriy iteratsiyadan chiqishga imkon beradi. Ichki halqalarni sindirish uchun yorliqlardan foydalaning.

Batafsil: <info:while-for>.

Keyinchalik biz ob'ektlar bilan ishlash uchun ko'proq tsikl turlarini o'rganamiz.

## "Switch" konstruktsiyasi

"Switch" konstruktsiyasi bir nechta `if` tekshiruvlarini almashtirishi mumkin. Taqqoslash uchun `===` (qat'iy tenglik) ishlatiladi.

Masalan:

```js run
let age = prompt('Yoshingiz?', 18);

switch (age) {
  case 18:
<<<<<<< HEAD:1-js/02-first-steps/16-javascript-specials/article.md
    alert("Ishlamaydi"); // so'rov natijasi raqam emas, balki matndir
=======
    alert("Won't work"); // the result of prompt is a string, not a number
    break;
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/18-javascript-specials/article.md

  case "18":
    alert("Bu ishlaydi!");
    break;

  default:
    alert("Yuqoridagi qiymatga teng bo'lmagan har qanday qiymat");
}
```

Batafsil: <info:switch>.

## Funktsiyalar

Biz JavaScript da funktsiyani yaratishning uchta usulini ko'rib chiqdik:

1. Funktsiya deklaratsiyasi: asosiy kod oqimidagi funktsiya

    ```js
    function sum(a, b) {
      let result = a + b;

      return result;
    }
    ```

2. Funktsiya ifodasi: ifoda kontekstidagi funktsiya

    ```js
    let sum = function(a, b) {
      let result = a + b;

      return result;
    };
    ```

<<<<<<< HEAD:1-js/02-first-steps/16-javascript-specials/article.md
    Funktsiya ifodalari `sum = function nom(a,b)` kabi nomga ega bo'lishi mumkin, ammo bu `nom` faqat shu funktsiya ichida ko'rinadi.

3. O'q funktsiya:
=======
3. Arrow functions:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/18-javascript-specials/article.md

    ```js
<<<<<<< HEAD
    // o'ng tomonidagi ifoda
=======
    // expression on the right side
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
    let sum = (a, b) => a + b;

    // yoki {...} bilan ko'p satrli sintaksis, bu erga return kaliti kerak:
    let sum = (a, b) => {
      // ...
      return a + b;
    }

    // argumentlarsiz
    let sayHi = () => alert("Hello");

    // bitta argument bilan
    let double = n => n * 2;
    ```


<<<<<<< HEAD:1-js/02-first-steps/16-javascript-specials/article.md
- Funksiyalar ichki o'zgaruvchanga ega bo'lishi mumkin: funktsiyani tanasida e'lon qilingan. Bunday o'zgaruvchanlar faqat funktsiya ichida ko'rinadi.
- Parametrlar oldindan tayinlangan qiymatlarga ega bo'lishi mumkin:`function sum(a = 1, b = 2) {...}`.
- Funktsiyalar har doim bir narsani qaytaradi. Agar `return` ifodasi bo'lmasa, natija `undefined` bo'ladi.


| Funktsiya Deklaratsiyasi | Funktsiya Ifodasi |
|----------------------|---------------------|
| butun kod blokida ko'rinadi | ijro etish unga etib kelganida yaratiladi |
|   - | faqat funktsiya ichida ko'rinadigan nomga ega bo'lishi mumkin |

Batafsil: <info:function-basics>, <info:function-expressions-arrows>.
=======
- Functions may have local variables: those declared inside its body or its parameter list. Such variables are only visible inside the function.
- Parameters can have default values: `function sum(a = 1, b = 2) {...}`.
- Functions always return something. If there's no `return` statement, then the result is `undefined`.

Details: see <info:function-basics>, <info:arrow-functions-basics>.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/18-javascript-specials/article.md

## Yanada ko'proq

Bu JavaScript xususiyatlarining qisqacha ro'yxati edi. Hozirgacha biz faqat asoslarni o'rganib chiqdik. Keyinchalik o'quv qo'llanmada siz JavaScript-ning qo'shimcha va maxsus xususiyatlarini topasiz.
