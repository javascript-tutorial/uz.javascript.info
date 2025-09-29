# Ma'lumotlar turlari

JavaScript da qiymat har doim ma'lum bir turga tegishli. Masalan, string yoki raqam.

JavaScript da sakkizta asosiy ma'lumot turi mavjud. Bu yerda biz ularni umumiy ko'rib chiqamiz va keyingi boblarda har biri haqida batafsil gaplashamiz.

O'zgaruvchiga istalgan turni joylashtirishimiz mumkin. Masalan, o'zgaruvchi bir lahzada string bo'lishi, keyin esa raqam saqlashi mumkin:

```js
// xato yo'q
let message = "hello";
message = 123456;
```

JavaScript kabi bunday imkoniyatlarni beruvchi dasturlash tillari "dinamik tiplangan" deb ataladi, ya'ni ma'lumot turlari mavjud, ammo o'zgaruvchilar ularning hech biriga bog'lanmagan.

## Number (raqam)

```js
let n = 123;
n = 12.345;
```

*Number* turi butun va o'nlik sonlarni ifodalaydi.

Sonlar uchun ko'plab amallar mavjud, masalan ko'paytirish `*`, bo'lish `/`, qo'shish `+`, ayirish `-` va hokazo.

Oddiy sonlardan tashqari, ushbu ma'lumot turiga tegishli "maxsus raqamli qiymatlar" ham mavjud: `Infinity`, `-Infinity` va `NaN`.

- `Infinity` matematik [Cheksizlik](https://en.wikipedia.org/wiki/Infinity) ∞ ni ifodalaydi. Bu har qanday sondan kattaroq bo'lgan maxsus qiymat.

    Biz uni nolga bo'lish natijasida olishimiz mumkin:

    ```js run
    alert( 1 / 0 ); // Infinity
    ```

    Yoki shunchaki to'g'ridan-to'g'ri murojaat qilish:

    ```js run
    alert( Infinity ); // Infinity
    ```

- `NaN` hisoblash xatosini ifodalaydi. Bu noto'g'ri yoki aniqlanmagan matematik amalning natijasi, masalan:

    ```js run
    alert( "not a number" / 2 ); // NaN, bunday bo'lish xato
    ```

<<<<<<< HEAD
    `NaN` yopishqoq. `NaN` ustidagi har qanday keyingi matematik amal `NaN` ni qaytaradi:
=======
    `NaN` is sticky. Any further mathematical operation on `NaN` returns `NaN`:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

    ```js run
    alert( NaN + 1 ); // NaN
    alert( 3 * NaN ); // NaN
    alert( "not a number" / 2 - 1 ); // NaN
    ```

<<<<<<< HEAD
    Demak, agar matematik ifodaning biror joyida `NaN` bo'lsa, u butun natijaga tarqaladi (bunga faqat bitta istisno bor: `NaN ** 0` bu `1`).
=======
    So, if there's a `NaN` somewhere in a mathematical expression, it propagates to the whole result (there's only one exception to that: `NaN ** 0` is `1`).
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```smart header="Matematik amallar xavfsiz"
JavaScript da matematik amallar "xavfsiz". Biz hamma narsani qilishimiz mumkin: nolga bo'lish, raqamli bo'lmagan stringlarni raqam sifatida qarash va hokazo.

Skript hech qachon fatal xato bilan to'xtamaydi ("o'lmaydi"). Eng yomoni, natija sifatida `NaN` olamiz.
```

Maxsus raqamli qiymatlar rasmiy ravishda "number" turiga tegishli. Albatta ular bu so'zning oddiy ma'nosida raqam emas.

Raqamlar bilan ishlash haqida ko'proq ma'lumotni <info:number> bobida ko'ramiz.

## BigInt [#bigint-type]

<<<<<<< HEAD
JavaScript da "number" turi <code>(2<sup>53</sup>-1)</code> dan kattaroq (`9007199254740991`) yoki manfiylar uchun <code>-(2<sup>53</sup>-1)</code> dan kichikroq butun qiymatlarni xavfsiz ifodalay olmaydi.

Aniq qilib aytganda, "number" turi kattaroq butun sonlarni saqlashi mumkin (<code>1.7976931348623157 * 10<sup>308</sup></code> gacha), ammo xavfsiz butun sonlar diapazoni <code>±(2<sup>53</sup>-1)</code> dan tashqarida aniqlik xatosi bo'ladi, chunki barcha raqamlar belgilangan 64-bitli xotiraga sig'maydi. Shuning uchun "taxminiy" qiymat saqlanishi mumkin.
=======
In JavaScript, the "number" type cannot safely represent integer values larger than <code>(2<sup>53</sup>-1)</code> (that's `9007199254740991`), or less than <code>-(2<sup>53</sup>-1)</code> for negatives.

To be really precise, the "number" type can store larger integers (up to <code>1.7976931348623157 * 10<sup>308</sup></code>), but outside of the safe integer range <code>±(2<sup>53</sup>-1)</code> there'll be a precision error, because not all digits fit into the fixed 64-bit storage. So an "approximate" value may be stored.

For example, these two numbers (right above the safe range) are the same:

```js
console.log(9007199254740991 + 1); // 9007199254740992
console.log(9007199254740991 + 2); // 9007199254740992
```

So to say, all odd integers greater than <code>(2<sup>53</sup>-1)</code> can't be stored at all in the "number" type.

For most purposes <code>±(2<sup>53</sup>-1)</code> range is quite enough, but sometimes we need the entire range of really big integers, e.g. for cryptography or microsecond-precision timestamps.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

Masalan, bu ikki raqam (xavfsiz diapazondan yuqorida) bir xil:

```js
console.log(9007199254740991 + 1); // 9007199254740992
console.log(9007199254740991 + 2); // 9007199254740992
```

Demak, <code>(2<sup>53</sup>-1)</code> dan kattaroq barcha toq butun sonlar "number" turida umuman saqlanishi mumkin emas.

Ko'pgina maqsadlar uchun <code>±(2<sup>53</sup>-1)</code> diapazoni yetarli, ammo ba'zida bizga haqiqatan ham katta butun sonlarning to'liq diapazoni kerak, masalan kriptografiya yoki mikrosoniya aniqligidagi vaqt belgilari uchun.

`BigInt` turi yaqinda tilga ixtiyoriy uzunlikdagi butun sonlarni ifodalash uchun qo'shildi.

`BigInt` qiymati butun sonning oxiriga `n` qo'shish orqali yaratiladi:

```js
// oxiridagi "n" bu BigInt ekanligini anglatadi
const bigInt = 1234567890123456789012345678901234567890n;
```

`BigInt` sonlari kamdan-kam kerak bo'lganligi sababli, biz ularni bu yerda ko'rib chiqmaymiz, balki ularga alohida bob <info:bigint> ajratdik. Bunday katta sonlar kerak bo'lganda uni o'qing.

<<<<<<< HEAD
## String (satr)

JavaScript da string qo'shtirnoqlar bilan o'ralgan bo'lishi kerak.
=======
## String

A string in JavaScript must be surrounded by quotes.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js
let str = "Hello";
let str2 = 'Bitta qo'shtirnoq ham yaxshi';
let phrase = `boshqa ${str} ni kiritish mumkin`;
```

JavaScript da 3 xil qo'shtirnoq mavjud.

1. Qo'sh qo'shtirnoq: `"Hello"`.
2. Bitta qo'shtirnoq: `'Hello'`.
3. Teskari qo'shtirnoq: <code>&#96;Hello&#96;</code>.

Qo'sh va bitta qo'shtirnoqlar "oddiy" qo'shtirnoqlardir. JavaScript da ular orasida amaliy farq yo'q.

Teskari qo'shtirnoqlar "kengaytirilgan funksionallik" qo'shtirnoqlaridir. Ular bizga o'zgaruvchilar va ifodalarni `${…}` ga o'rab, string ichiga kiritishga imkon beradi, masalan:

```js run
let name = "John";

// o'zgaruvchini kiritish
alert( `Hello, *!*${name}*/!*!` ); // Hello, John!

// ifodani kiritish
alert( `natija *!*${1 + 2}*/!*` ); // natija 3
```

`${…}` ichidagi ifoda baholanadi va natija stringning bir qismiga aylanadi. Biz u yerga hamma narsani qo'yishimiz mumkin: `name` kabi o'zgaruvchi yoki `1 + 2` kabi arifmetik ifoda yoki murakkabroq narsa.

E'tibor bering, buni faqat teskari qo'shtirnoqlarda qilish mumkin. Boshqa qo'shtirnoqlarda bunday kiritish funksionalligis yo'q!

```js run
alert( "natija ${1 + 2}" ); // natija ${1 + 2} (qo'sh qo'shtirnoq hech narsa qilmaydi)
```

Stringlar haqida <info:string> bobida batafsilroq gaplashamiz.

```smart header="*Character* turi yo'q."
Ba'zi tillarda bitta belgi uchun maxsus "character" turi mavjud. Masalan, C tilida va Java da u "char" deb ataladi.

JavaScript da bunday tur yo'q. Faqat bitta tur bor: `string`. String nol belgilardan iborat bo'lishi (bo'sh bo'lishi), bitta belgi yoki ko'plab belgilardan iborat bo'lishi mumkin.
```

## Boolean (mantiqiy tur)

Boolean turida faqat ikkita qiymat bor: `true` va `false`.

Bu tur odatda ha/yo'q qiymatlarini saqlash uchun ishlatiladi: `true` "ha, to'g'ri" ni anglatadi va `false` "yo'q, noto'g'ri" ni anglatadi.

Masalan:

```js
let nameFieldChecked = true; // ha, ism maydoni belgilangan
let ageFieldChecked = false; // yo'q, yosh maydoni belgilanmagan
```

Boolean qiymatlar taqqoslash natijasida ham paydo bo'ladi:

```js run
let isGreater = 4 > 1;

alert( isGreater ); // true (taqqoslash natijasi "ha")
```

Boolean haqida <info:logical-operators> bobida chuqurroq gaplashamiz.

## "null" qiymati

Maxsus `null` qiymati yuqorida tavsiflangan turlarning hech biriga tegishli emas.

U faqat `null` qiymatini o'z ichiga olgan alohida tur hosil qiladi:

```js
let age = null;
```

JavaScript da `null` boshqa tillardagi kabi "mavjud bo'lmagan obyektga havola" yoki "null pointer" emas.

Bu shunchaki "hech narsa", "bo'sh" yoki "noma'lum qiymat" ni ifodalovchi maxsus qiymat.

Yuqoridagi kod `age` noma'lum ekanligini bildiradi.

## "undefined" qiymati

Maxsus `undefined` qiymati ham alohida turadi. U `null` kabi o'zining alohida turini hosil qiladi.

`undefined` ning ma'nosi "qiymat tayinlanmagan".

Agar o'zgaruvchi e'lon qilingan, ammo tayinlanmagan bo'lsa, uning qiymati `undefined` bo'ladi:

```js run
let age;

alert(age); // "undefined" ko'rsatadi
```

Texnik jihatdan o'zgaruvchiga aniq ravishda `undefined` tayinlash mumkin:

```js run
let age = 100;

// qiymatni undefined ga o'zgartirish
age = undefined;

alert(age); // "undefined"
```

...Ammo buni qilishni tavsiya qilmaymiz. Odatda o'zgaruvchiga "bo'sh" yoki "noma'lum" qiymat tayinlash uchun `null` ishlatiladi, `undefined` esa tayinlanmagan narsalar uchun standart boshlang'ich qiymat sifatida saqlanadi.

## Obyektlar va Simbollar

`object` turi maxsus.

Boshqa barcha turlar "primitiv" deb ataladi, chunki ularning qiymatlari faqat bitta narsani o'z ichiga olishi mumkin (string bo'lsin yoki raqam yoki boshqa narsa). Aksincha, obyektlar ma'lumotlar to'plamlari va murakkabroq strukturalarni saqlash uchun ishlatiladi.

Shunday muhim bo'lganligi sababli, obyektlar maxsus munosabatga loyiq. Primitiv turlar haqida ko'proq o'rganganimizdan keyin, <info:object> bobida ular bilan shug'ullanamiz.

`symbol` turi obyektlar uchun noyob identifikatorlar yaratish uchun ishlatiladi. To'liqlik uchun bu yerda eslatib o'tishimiz kerak, ammo obyektlarni bilguncha tafsilotlarni keyinga qoldiramiz.

## typeof operatori [#type-typeof]

<<<<<<< HEAD
`typeof` operatori operandning turini qaytaradi. Turli turdagi qiymatlarni turlicha qayta ishlashni xohlaganda yoki shunchaki tezkor tekshirish qilishni xohlaganda foydali.

`typeof x` ga murojaat string ko'rinishida tur nomini qaytaradi:
=======
The `typeof` operator returns the type of the operand. It's useful when we want to process values of different types differently or just want to do a quick check.

A call to `typeof x` returns a string with the type name:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

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

Oxirgi uchta satr qo'shimcha tushuntirish talab qilishi mumkin:

<<<<<<< HEAD
1. `Math` matematik amallarni ta'minlovchi o'rnatilgan obyekt. Biz uni <info:number> bobida o'rganamiz. Bu yerda u shunchaki obyekt misoli sifatida xizmat qiladi.
2. `typeof null` ning natijasi `"object"`. Bu JavaScript ning eng dastlabki kunlaridan kelib chiqqan va muvofiqlik uchun saqlangan `typeof` dagi rasman tan olingan xato. Albatta, `null` obyekt emas. Bu o'zining alohida turiga ega maxsus qiymat. `typeof` ning xatti-harakati bu yerda noto'g'ri.
3. `typeof alert` ning natijasi `"function"`, chunki `alert` funksiya. Biz funksiyalarni keyingi boblarda o'rganamiz, u yerda JavaScript da maxsus "function" turi yo'qligini ham ko'ramiz. Funksiyalar obyekt turiga tegishli. Ammo `typeof` ularni boshqacha ko'rib, `"function"` qaytaradi. Bu ham JavaScript ning eski kunlaridan kelib chiqqan. Texnik jihatdan bunday xatti-harakat to'g'ri emas, ammo amalda qulay bo'lishi mumkin.

```smart header="`typeof(x)` sintaksisi"
Siz boshqa sintaksisga ham duch kelishingiz mumkin: `typeof(x)`. Bu `typeof x` bilan bir xil.
=======
1. `Math` is a built-in object that provides mathematical operations. We will learn it in the chapter <info:number>. Here, it serves just as an example of an object.
2. The result of `typeof null` is `"object"`. That's an officially recognized error in `typeof`, coming from very early days of JavaScript and kept for compatibility. Definitely, `null` is not an object. It is a special value with a separate type of its own. The behavior of `typeof` is wrong here.
3. The result of `typeof alert` is `"function"`, because `alert` is a function. We'll study functions in the next chapters where we'll also see that there's no special "function" type in JavaScript. Functions belong to the object type. But `typeof` treats them differently, returning `"function"`. That also comes from the early days of JavaScript. Technically, such behavior isn't correct, but can be convenient in practice.

```smart header="The `typeof(x)` syntax"
You may also come across another syntax: `typeof(x)`. It's the same as `typeof x`.

To put it clear: `typeof` is an operator, not a function. The parentheses here aren't a part of `typeof`. It's the kind of parentheses used for mathematical grouping.

Usually, such parentheses contain a mathematical expression, such as `(2 + 2)`, but here they contain only one argument `(x)`. Syntactically, they allow to avoid a space between the `typeof` operator and its argument, and some people like it.

Some people prefer `typeof(x)`, although the `typeof x` syntax is much more common.
```

## Summary
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

Aniq qilib aytganda: `typeof` operator, funksiya emas. Bu yerdagi qavslar `typeof` ning bir qismi emas. Bu matematik guruhlash uchun ishlatiladigan qavslar turi.

<<<<<<< HEAD
Odatda, bunday qavslar `(2 + 2)` kabi matematik ifodani o'z ichiga oladi, ammo bu yerda ular faqat bitta argument `(x)` ni o'z ichiga oladi. Sintaktik jihatdan ular `typeof` operatori va uning argumenti orasidagi bo'shliqdan qochishga imkon beradi va ba'zi odamlar buni yoqtiradi.
=======
- Seven primitive data types:
    - `number` for numbers of any kind: integer or floating-point, integers are limited by <code>±(2<sup>53</sup>-1)</code>.
    - `bigint` for integer numbers of arbitrary length.
    - `string` for strings. A string may have zero or more characters, there's no separate single-character type.
    - `boolean` for `true`/`false`.
    - `null` for unknown values -- a standalone type that has a single value `null`.
    - `undefined` for unassigned values -- a standalone type that has a single value `undefined`.
    - `symbol` for unique identifiers.
- And one non-primitive data type:
    - `object` for more complex data structures.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

Ba'zi odamlar `typeof(x)` ni afzal ko'radi, garchi `typeof x` sintaksisi ancha keng tarqalgan.
```

<<<<<<< HEAD
## Xulosa
=======
- Usually used as `typeof x`, but `typeof(x)` is also possible.
- Returns a string with the name of the type, like `"string"`.
- For `null` returns `"object"` -- this is an error in the language, it's not actually an object.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

JavaScript da 8 ta asosiy ma'lumot turi mavjud.

- Yetti primitiv ma'lumot turi:
    - `number` har qanday turdagi sonlar uchun: butun yoki o'nlik, butun sonlar <code>±(2<sup>53</sup>-1)</code> bilan cheklangan.
    - `bigint` ixtiyoriy uzunlikdagi butun sonlar uchun.
    - `string` stringlar uchun. String nol yoki ko'proq belgilarga ega bo'lishi mumkin, alohida bitta belgi turi yo'q.
    - `boolean` `true`/`false` uchun.
    - `null` noma'lum qiymatlar uchun -- bitta `null` qiymatiga ega mustaqil tur.
    - `undefined` tayinlanmagan qiymatlar uchun -- bitta `undefined` qiymatiga ega mustaqil tur.
    - `symbol` noyob identifikatorlar uchun.
- Va bitta primitiv bo'lmagan ma'lumot turi:
    - `object` murakkabroq ma'lumot strukturalari uchun.

`typeof` operatori o'zgaruvchida qaysi tur saqlanganligini ko'rishga imkon beradi.

- Odatda `typeof x` sifatida ishlatiladi, ammo `typeof(x)` ham mumkin.
- `"string"` kabi tur nomi bilan string qaytaradi.
- `null` uchun `"object"` qaytaradi -- bu tildagi xato, aslida obyekt emas.

Keyingi boblarda biz primitiv qiymatlarga e'tibor qaratamiz va ular bilan tanishganimizdan so'ng obyektlarga o'tamiz.