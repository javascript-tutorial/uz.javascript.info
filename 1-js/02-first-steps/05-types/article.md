# Ma'lumot turlari

JavaScript dagi o'zgaruvchanda har qanday ma'lumot bo'lishi mumkin. O'zgaruvchan bir vaqtning o'zida matnga, ikkinchisida esa raqamga ega bo'lishi mumkin:

```js
// quyidagi kod xato emas
let message = "hello";
message = 123456;
```

Bunday narsalarga imkon beradigan dasturlash tillari "dinamik ravishda terilgan" deb nomlanadi, ya'ni ma'lumotlar turlari mavjud, ammo o'zgaruvchilar ularning hech biriga bog'liq emas.

JavaScript da yetti asosiy ma'lumotlar turi mavjud. Bu yerda biz ularni umuman ko'rib chiqamiz va keyingi boblarda ularning har biri haqida batafsil gaplashamiz.

## Raqam

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

## Matn

JavaScript dagi matn qoshtirnoq belgisi bilan o'ralgan bo'lishi kerak.

```js
let str = "Hello";
let str2 = 'Bitta qoshtirnoq belgisi ham yaxshi';
let phrase = `${str} joylashtirish mumkin`;
```

JavaScript da 3 ta qoshtirnoqning belgisining turi mavjud.

1. Ikki qoshtirnoq belgisi: `"Hello"`.
2. Bitta qoshtirnoq belgisi `'Hello'`.
3. Orqa qoshtirnoq belgisi: <code>&#96;Hello&#96;</code>.

Ikki va bitta qoshtirnoq belgisi "oddiy" qoshtirnoqlardir. JavaScript da ular orasida hech qanday farq yo'q.

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

```smart header="*Belgi* turi yo'q."
Ba'zi tillarda bitta belgi uchun maxsus "belgi" turi mavjud. Masalan, C tilida va Java tilida bu `char`.

JavaScript da bunday tur mavjud emas. Faqat bitta tur bor: `string`. Matn faqat bitta belgidan yoki ularning ko'pchiligidan iborat bo'lishi mumkin.
```

## Bul ma’lumot turi (Mantiq ma’lumot turi)

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

Yuqoridagi kodda `age` ma'lum sabablarga ko'ra noma'lum yoki bo'sh ekanligi aytilgan.

## "Undefined(Aniqlanmagan)" qiymat

Maxsus qiymat `undefined` ham ajralib turadi. U xuddi `null` singari o'ziga xos turini yaratadi.

`undefined` ning ma'nosi "qiymat tayinlanmagan".

Agar o'zgaruvchan e'lon qilingan, ammo tayinlanmagan bo'lsa, unda uning qiymati `undefined`:

```js run
let x;

alert(x); // "undefined" ko'rsatiladi
```

Texnik jihatdan istalgan o'zgaruvchanga `undefined` ni belgilash mumkin:

```js run
let x = 123;

x = undefined;

alert(x); // "undefined"
```

...Ammo buni qilishni tavsiya etmaymiz. Odatda, biz o'zgaruvchiga "bo'sh" yoki "noma'lum" qiymatlarni berish uchun `null` dan foydalanamiz va o'zgaruvchanlar tayinlanganligini tekshirish uchun `undefined` dan foydalanamiz.

## Ob'yektlar va Belgilar

`object` turi maxsusdir.

Boshqa barcha turlar "ibtidoiy" deb nomlanadi, chunki ularning qiymatlari faqat bitta narsani o'z ichiga olishi mumkin (matn, raqam yoki boshqa narsalar). Aksincha, ob'yektlar ma'lumotlar to'plamlarini va murakkabroq subyektlarni saqlash uchun ishlatiladi. Biz ob'yekt haqida ko'proq kengi bobda <info:object> bilib olamiz.

`Symbol` turi ob'yektlar uchun noyob identifikatorlarni yaratish uchun ishlatiladi. To'liqlik uchun bu yerda eslatib o'tishimiz kerak, ammo ob'yektlardan keyin ushbu turni o'rganish yaxshiroqdir.

## Typeof operatori

`Typeof` operatori argument turini qaytaradi. Bu biz har xil turdagi qiymatlarni boshqacha ishlov berishni xohlaganimizda yoki tezkor tekshirishni xohlaganimizda foydalidir.

Ikkita shakili sintaksisning  qo'llab-quvvatlaydi:

1. Operator sifatida: `typeof x`.
2. Funktsiya sifatida: `typeof(x)`.

Boshqacha qilib aytganda, bu qavs bilan yoki ularsiz ishlaydi. Natija bir xil.

`Typeof x`ning qo'ngiroq qilganda u matni argument turi bilan qaytaradi 

```js
typeof undefined // "undefined"

typeof 0 // "number"

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

1. `Math` - bu matematik operatsiyalarni ta'minlaydigan Javascriptning ichida o'rnatilgan ob'yekt. Biz buni <info:number> bobida bilib olamiz. Bu yerda u xuddi ob'yekt rolida bo'lib xizmat qiladi.
2. `Typeof null`ning natijasi `"object"`. Bu noto'g'ri. Bu moslik uchun saqlanadigan `typeof` da rasmiy tan olingan xato. Albatta, `null` ob'yekt emas. Bu o'ziga xos alohida turga ega bo'lgan maxsus qiymatdir. Demak, bu tilning ichidagi xato.
3. `typeof alert`ning natijasi `"function"`dir, chunki `alert` tilning funktsiyasidir. Keyingi boblarda biz funktsiyalarni o'rganamiz, bu yerda JavaScript da maxsus "funktsiya" turi yo'qligini ko'rasiz. Funktsiyalar ob'yekt turiga tegishli. Ammo `typeof` ularga boshqacha munosabatda. Rasmiy ravishda bu noto'g'ri, ammo amalda juda qulay.


## Xulosa

JavaScript-da 7 ta asosiy ma'lumotlar turi mavjud.

- `number` har qanday turdagi raqamlar uchun: butun son yoki suzuvchi nuqta.
- `string` matnlar uchun. Matnda bir yoki bir nechta belgi bo'lishi mumkin, alohida bitta belgi turi yo'q.
- `boolean` bul ma’lumot turi `true`/`false`.
- `null` noma'lum qiymatlar uchun -- bitta `null` qiymatga ega bo'lgan mustaqil tur.
- `undefined` tayinlanmagan qiymatlar uchun -- bitta qiymatga ega bo'lgan mustaqil tur, `undefined`.
- `object` murakkab ma'lumotlar tuzilmalari uchun.
- `symbol` noyob identifikatorlar uchun.

`Typeof` operatori bizga qaysi tur o'zgaruvchida saqlanganligini ko'rish imkonini beradi.

- Ikki shakl: `typeof x` yoki `typeof(x)`.
- `"String"` kabi turdagi nomi bilan matni qaytaradi.
- `Null` uchun `"object"` qaytaradi -- bu tilda xato, aslida bu ob'yekt emas.

Keyingi boblarda biz ibtidoiy qadriyatlarga e'tibor qaratamiz va ular bilan tanishib bo'lgach, ob'yektlarga o'tamiz.
