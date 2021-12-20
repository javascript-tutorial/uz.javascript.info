# Ma'lumot turlari

<<<<<<< HEAD
JavaScript dagi o'zgaruvchanda har qanday ma'lumot bo'lishi mumkin. O'zgaruvchan bir vaqtning o'zida matnga, ikkinchisida esa raqamga ega bo'lishi mumkin:
=======
A value in JavaScript is always of a certain type. For example, a string or a number.

There are eight basic data types in JavaScript. Here, we'll cover them in general and in the next chapters we'll talk about each of them in detail.

We can put any type in a variable. For example, a variable can at one moment be a string and then store a number:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
// quyidagi kod xato emas
let message = "hello";
message = 123456;
```

<<<<<<< HEAD
Bunday narsalarga imkon beradigan dasturlash tillari "dinamik ravishda terilgan" deb nomlanadi, ya'ni ma'lumotlar turlari mavjud, ammo o'zgaruvchilar ularning hech biriga bog'liq emas.

JavaScript da yetti asosiy ma'lumotlar turi mavjud. Bu yerda biz ularni umuman ko'rib chiqamiz va keyingi boblarda ularning har biri haqida batafsil gaplashamiz.

## Raqam
=======
Programming languages that allow such things, such as JavaScript, are called "dynamically typed", meaning that there exist data types, but variables are not bound to any of them.

## Number
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
let n = 123;
n = 12.345;
```

*Raqam* turi butun son va suzuvchi nuqta raqamlarini ifodalaydi.

Raqamlar uchun ko'plab operatsiyalar mavjud, masalan, ko'paytirish `*`, bo'linish `/`, qo'shish `+`, ayirish `-` va boshqalar.

Besides regular numbers, there are so-called "special numeric values" which also belong to this data type: `Infinity`, `-Infinity` and `NaN`.
Oddiy raqamlardan tashqari, ushbu ma'lumot turiga mansub "maxsus raqamli qiymatlar" ham mavjud: `Infinity`(Cheksizlik), `-Infinity` va `NaN`.

- `Infinity` matematik [Cheksizlik] (https://en.wikipedia.org/wiki/Infinity) ni ifodalaydi. Bu har qanday raqamdan kattaroq maxsus qiymat.

    Biz uni nolga bo'lish natijasida olishimiz mumkin:

    ```js run
    alert( 1 / 0 ); // Cheksizlik
    ```

    Yoki to'g'ridan-to'g'ri murojaat qilgan holda:

    ```js run
    alert( Infinity ); // Cheksizlik
    ```
- `NaN` hisoblash xatoligini anglatadi. Bu noto'g'ri yoki aniqlanmagan matematik operatsiya natijasidir, masalan:

    ```js run
    alert( "not a number" / 2 ); // NaN, bunday bo'linish noto'g'ri
    ```

    `NaN` yopishqoq bo'ladi. `NaN` bo'yicha har qanday keyingi operatsiya `NaN` qaytaradi:

    ```js run
    alert( "not a number" / 2 + 5 ); // NaN
    ```

    Shunday qilib, agar biror joyda matematik ifodada "NaN" bo'lsa, u butun natijaga tarqaladi.

```smart header="Matematik operatsiyalar xavfsizdir"
Matematikadan foydalanish JavaScript da "xavfsiz". Biz hamma narsani qila olamiz: nolga bo'lish, raqamsiz matnlarni raqamlar kabi ko'rib chiqish va hk.

Skript hech qachon halokatli xato ("o'lish") bilan to'xtamaydi. Eng yomoni, natijada biz "NaN" ni olamiz.
```

Maxsus raqamli qiymatlar rasmiy ravishda "raqam" turiga tegishli. Albatta ular bu so'zning umumiy ma'nosida raqamlar emas.

Raqamlar bilan ishlash haqida ko'proq ma'lumotni <info:number> bobida bilib olamiz.

<<<<<<< HEAD
## Matn
=======
## BigInt [#bigint-type]

In JavaScript, the "number" type cannot represent integer values larger than <code>(2<sup>53</sup>-1)</code> (that's `9007199254740991`), or less than <code>-(2<sup>53</sup>-1)</code> for negatives. It's a technical limitation caused by their internal representation.

For most purposes that's quite enough, but sometimes we need really big numbers, e.g. for cryptography or microsecond-precision timestamps.

`BigInt` type was recently added to the language to represent integers of arbitrary length.

A `BigInt` value is created by appending `n` to the end of an integer:

```js
// the "n" at the end means it's a BigInt
const bigInt = 1234567890123456789012345678901234567890n;
```

As `BigInt` numbers are rarely needed, we don't cover them here, but devoted them a separate chapter <info:bigint>. Read it when you need such big numbers.


```smart header="Compatibility issues"
Right now, `BigInt` is supported in Firefox/Chrome/Edge/Safari, but not in IE.
```

You can check [*MDN* BigInt compatibility table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#Browser_compatibility) to know which versions of a browser are supported.

## String
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

JavaScript dagi matn qoshtirnoq belgisi bilan o'ralgan bo'lishi kerak.

```js
let str = "Hello";
<<<<<<< HEAD
let str2 = 'Bitta qoshtirnoq belgisi ham yaxshi';
let phrase = `${str} joylashtirish mumkin`;
=======
let str2 = 'Single quotes are ok too';
let phrase = `can embed another ${str}`;
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

JavaScript da 3 ta qoshtirnoqning belgisining turi mavjud.

1. Ikki qoshtirnoq belgisi: `"Hello"`.
2. Bitta qoshtirnoq belgisi `'Hello'`.
3. Orqa qoshtirnoq belgisi: <code>&#96;Hello&#96;</code>.

<<<<<<< HEAD
Ikki va bitta qoshtirnoq belgisi "oddiy" qoshtirnoqlardir. JavaScript da ular orasida hech qanday farq yo'q.
=======
Double and single quotes are "simple" quotes. There's practically no difference between them in JavaScript.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Orqa qoshtirnoq belgisi - bu "kengaytirilgan funksionallik" qoshtirnoqlardir. Ular o'zgaruvchanlar va ifodalarni `${…}` ichiga o'rash orqali qatorga kiritishga imkon beradi, masalan:

```js run
let name = "John";

// o'zgaruvchini joylashtirish
alert( `Hello, *!*${name}*/!*!` ); // Hello, John!

// ifodani joylashtirish
alert( `the result is *!*${1 + 2}*/!*` ); // natija 3 ga teng
```

`$ {…}` Ichidagi ifoda baholanadi va natija satrning bir qismiga aylanadi. Biz u yerga hamma narsani qo'yishimiz mumkin: `name` kabi o'zgaruvchan yoki `1 + 2` kabi arifmetik ibora yoki undan murakkab narsalar. 

Iltimos, shuni unutmangki, bu faqat orqa qoshtirnoq belgisi orqali amalga oshiriladi. Boshqa qoshtirnoq belgilarda bu ichki funktsiya mavjud emas!
```js run
alert( "natija ${1 + 2}" ); // natija $ {1 + 2} (ikki qoshtirnoq belgisi hech narsa qilmaydi)
```

Biz matlarni <info:string> bobida batafsilroq ko'rib chiqamiz.

<<<<<<< HEAD
```smart header="*Belgi* turi yo'q."
Ba'zi tillarda bitta belgi uchun maxsus "belgi" turi mavjud. Masalan, C tilida va Java tilida bu `char`.

JavaScript da bunday tur mavjud emas. Faqat bitta tur bor: `string`. Matn faqat bitta belgidan yoki ularning ko'pchiligidan iborat bo'lishi mumkin.
```

## Bul ma’lumot turi (Mantiq ma’lumot turi)
=======
```smart header="There is no *character* type."
In some languages, there is a special "character" type for a single character. For example, in the C language and in Java it is called "char".

In JavaScript, there is no such type. There's only one type: `string`. A string may consist of zero characters (be empty), one character or many of them.
```

## Boolean (logical type)
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Bul ma’lumot turlari ikkita qiymatga ega: `true` va `false`.

Ushbu tur odatda "ha" yoki "yo'q" qiymatlarini saqlash uchun ishlatiladi: `true` "ha, to'g'ri", `false` esa "yo'q, noto'g'ri" degan ma'noni anglatadi.

Misol uchun:

```js
let nameFieldChecked = true; // ha, nom maydoni tekshirildi
let ageFieldChecked = false; // yo'q, yosh maydoni tekshirilmadi
```

Bul qiymatlar taqqoslash natijasida ham paydo bo'ladi:

```js run
let isGreater = 4 > 1;

alert( isGreater ); // true (taqqoslash natijasi "ha")
```

Bul ma’lumot turlarini <info:logical-operatorlar> bobida chuqurroq ko'rib chiqamiz.

## "Null" qiymat

Maxsus `null` qiymati yuqorida tavsiflangan turlarning hech biriga tegishli emas.

U faqat `null` qiymatini o'z ichiga olgan turini hosil qiladi:

```js
let age = null;
```

JavaScript da, `null` "mavjud bo'lmagan obyektga havola" yoki ba'zi boshqa tillardagi kabi "null ko'rsatkich" emas.

Bu shunchaki "hech narsa", "bo'sh" yoki "noma'lum qiymat" ni ifodalovchi maxsus qiymat.

<<<<<<< HEAD
Yuqoridagi kodda `age` ma'lum sabablarga ko'ra noma'lum yoki bo'sh ekanligi aytilgan.
=======
The code above states that `age` is unknown.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## "Undefined(Aniqlanmagan)" qiymat

Maxsus qiymat `undefined` ham ajralib turadi. U xuddi `null` singari o'ziga xos turini yaratadi.

`undefined` ning ma'nosi "qiymat tayinlanmagan".

Agar o'zgaruvchan e'lon qilingan, ammo tayinlanmagan bo'lsa, unda uning qiymati `undefined`:

```js run
let age;

<<<<<<< HEAD
alert(x); // "undefined" ko'rsatiladi
```

Texnik jihatdan istalgan o'zgaruvchanga `undefined` ni belgilash mumkin:
=======
alert(age); // shows "undefined"
```

Technically, it is possible to explicitly assign `undefined` to a variable:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let age = 100;

// change the value to undefined
age = undefined;

alert(age); // "undefined"
```

<<<<<<< HEAD
...Ammo buni qilishni tavsiya etmaymiz. Odatda, biz o'zgaruvchiga "bo'sh" yoki "noma'lum" qiymatlarni berish uchun `null` dan foydalanamiz va o'zgaruvchanlar tayinlanganligini tekshirish uchun `undefined` dan foydalanamiz.
=======
...But we don't recommend doing that. Normally, one uses `null` to assign an "empty" or "unknown" value to a variable, while `undefined` is reserved as a default initial value for unassigned things.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Ob'yektlar va Belgilar

`object` turi maxsusdir.

<<<<<<< HEAD
Boshqa barcha turlar "ibtidoiy" deb nomlanadi, chunki ularning qiymatlari faqat bitta narsani o'z ichiga olishi mumkin (matn, raqam yoki boshqa narsalar). Aksincha, ob'yektlar ma'lumotlar to'plamlarini va murakkabroq subyektlarni saqlash uchun ishlatiladi. Biz ob'yekt haqida ko'proq kengi bobda <info:object> bilib olamiz.

`Symbol` turi ob'yektlar uchun noyob identifikatorlarni yaratish uchun ishlatiladi. To'liqlik uchun bu yerda eslatib o'tishimiz kerak, ammo ob'yektlardan keyin ushbu turni o'rganish yaxshiroqdir.
=======
All other types are called "primitive" because their values can contain only a single thing (be it a string or a number or whatever). In contrast, objects are used to store collections of data and more complex entities.

Being that important, objects deserve a special treatment. We'll deal with them later in the chapter <info:object>, after we learn more about primitives.

The `symbol` type is used to create unique identifiers for objects. We have to mention it here for the sake of completeness, but also postpone the details till we know objects.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Typeof operatori

`Typeof` operatori argument turini qaytaradi. Bu biz har xil turdagi qiymatlarni boshqacha ishlov berishni xohlaganimizda yoki tezkor tekshirishni xohlaganimizda foydalidir.

<<<<<<< HEAD
Ikkita shakili sintaksisning  qo'llab-quvvatlaydi:

1. Operator sifatida: `typeof x`.
2. Funktsiya sifatida: `typeof(x)`.

Boshqacha qilib aytganda, bu qavs bilan yoki ularsiz ishlaydi. Natija bir xil.

`Typeof x`ning qo'ngiroq qilganda u matni argument turi bilan qaytaradi 
=======
A call to `typeof x` returns a string with the type name:
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

```js
typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

*!*
typeof Math // "object"  (1)
*/!*

*!*
typeof null // "object"  (2)
*/!*

*!*
typeof alert // "function"  (3)
*/!*
```

Oxirgi uchta satr qo'shimcha tushuntirishga muhtoj bo'lishi mumkin:

<<<<<<< HEAD
1. `Math` - bu matematik operatsiyalarni ta'minlaydigan Javascriptning ichida o'rnatilgan ob'yekt. Biz buni <info:number> bobida bilib olamiz. Bu yerda u xuddi ob'yekt rolida bo'lib xizmat qiladi.
2. `Typeof null`ning natijasi `"object"`. Bu noto'g'ri. Bu moslik uchun saqlanadigan `typeof` da rasmiy tan olingan xato. Albatta, `null` ob'yekt emas. Bu o'ziga xos alohida turga ega bo'lgan maxsus qiymatdir. Demak, bu tilning ichidagi xato.
3. `typeof alert`ning natijasi `"function"`dir, chunki `alert` tilning funktsiyasidir. Keyingi boblarda biz funktsiyalarni o'rganamiz, bu yerda JavaScript da maxsus "funktsiya" turi yo'qligini ko'rasiz. Funktsiyalar ob'yekt turiga tegishli. Ammo `typeof` ularga boshqacha munosabatda. Rasmiy ravishda bu noto'g'ri, ammo amalda juda qulay.

=======
1. `Math` is a built-in object that provides mathematical operations. We will learn it in the chapter <info:number>. Here, it serves just as an example of an object.
2. The result of `typeof null` is `"object"`. That's an officially recognized error in `typeof`, coming from very early days of JavaScript and kept for compatibility. Definitely, `null` is not an object. It is a special value with a separate type of its own. The behavior of `typeof` is wrong here.
3. The result of `typeof alert` is `"function"`, because `alert` is a function. We'll study functions in the next chapters where we'll also see that there's no special "function" type in JavaScript. Functions belong to the object type. But `typeof` treats them differently, returning `"function"`. That also comes from the early days of JavaScript. Technically, such behavior isn't correct, but can be convenient in practice.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Xulosa

<<<<<<< HEAD
<<<<<<< HEAD
JavaScript-da 7 ta asosiy ma'lumotlar turi mavjud.
=======
```smart header="The `typeof(x)` syntax"
You may also come across another syntax: `typeof(x)`. It's the same as `typeof x`.

To put it clear: `typeof` is an operator, not a function. The parentheses here aren't a part of `typeof`. It's the kind of parentheses used for mathematical grouping.

Usually, such parentheses contain a mathematical expression, such as `(2 + 2)`, but here they contain only one argument `(x)`. Syntactically, they allow to avoid a space between the `typeof` operator and its argument, and some people like it.

Some people prefer `typeof(x)`, although the `typeof x` syntax is much more common.
```

## Summary
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

- `number` har qanday turdagi raqamlar uchun: butun son yoki suzuvchi nuqta.
- `string` matnlar uchun. Matnda bir yoki bir nechta belgi bo'lishi mumkin, alohida bitta belgi turi yo'q.
- `boolean` bul ma’lumot turi `true`/`false`.
- `null` noma'lum qiymatlar uchun -- bitta `null` qiymatga ega bo'lgan mustaqil tur.
- `undefined` tayinlanmagan qiymatlar uchun -- bitta qiymatga ega bo'lgan mustaqil tur, `undefined`.
- `object` murakkab ma'lumotlar tuzilmalari uchun.
- `symbol` noyob identifikatorlar uchun.
=======
There are 8 basic data types in JavaScript.

- `number` for numbers of any kind: integer or floating-point, integers are limited by <code>±(2<sup>53</sup>-1)</code>.
- `bigint` is for integer numbers of arbitrary length.
- `string` for strings. A string may have zero or more characters, there's no separate single-character type.
- `boolean` for `true`/`false`.
- `null` for unknown values -- a standalone type that has a single value `null`.
- `undefined` for unassigned values -- a standalone type that has a single value `undefined`.
- `object` for more complex data structures.
- `symbol` for unique identifiers.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

`Typeof` operatori bizga qaysi tur o'zgaruvchida saqlanganligini ko'rish imkonini beradi.

<<<<<<< HEAD
- Ikki shakl: `typeof x` yoki `typeof(x)`.
- `"String"` kabi turdagi nomi bilan matni qaytaradi.
- `Null` uchun `"object"` qaytaradi -- bu tilda xato, aslida bu ob'yekt emas.
=======
- Usually used as `typeof x`, but `typeof(x)` is also possible.
- Returns a string with the name of the type, like `"string"`.
- For `null` returns `"object"` -- this is an error in the language, it's not actually an object.
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

Keyingi boblarda biz ibtidoiy qadriyatlarga e'tibor qaratamiz va ular bilan tanishib bo'lgach, ob'yektlarga o'tamiz.
