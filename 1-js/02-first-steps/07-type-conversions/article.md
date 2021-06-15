# Konvertatsiya turi

<<<<<<< HEAD:1-js/02-first-steps/06-type-conversions/article.md
Ko'pincha, operatorlar va funktsiyalar ularga berilgan qiymatlarni avtomatik ravishda kerakli turga o'zgartiradi.
=======
Most of the time, operators and functions automatically convert the values given to them to the right type.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/07-type-conversions/article.md

Masalan, `alert` har qanday qiymatni ko'rsatish uchun avtomatik ravishda satrga o'zgartiradi. Matematik operatsiyalar qiymatlarni raqamlarga o'zgartiradi.

Bundan tashqari, qiymatni kutilgan turga aniq aylantirish kerak bo'lgan holatlar ham mavjud.

<<<<<<< HEAD:1-js/02-first-steps/06-type-conversions/article.md
```smart header="Hali ob'ektlar haqida gapirish vohli"
Ushbu bobda biz ob'ektlarni qamrab olmaymiz. Buning o'rniga, avvalo ibtidoiylarni o'rganamiz. Keyinchalik, ob'ektlar haqida bilib olganimizdan so'ng, ob'ekt konvertatsiyasi <info:object-toprimitive> bobida qanday ishlashini ko'ramiz.
=======
```smart header="Not talking about objects yet"
In this chapter, we won't cover objects. For now we'll just be talking about primitives.

Later, after we learn about objects, in the chapter <info:object-toprimitive> we'll see how objects fit in.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/07-type-conversions/article.md
```

## String Conversion

String konvertatsiyasi bizga qiymatnning matn shakli kerak bo'lganda sodir bo'ladi.

Masalan, `alert(value)` qiymatni ko'rsatish uchun uni bajaradi.

Shuningdek, qiymatni matnga aylantirish uchun `String(value)` funktsiyasini chaqirishimiz mumkin:

```js run
let value = true;
alert(typeof value); // boolean(bul ma'lumot turning qiymati)

*!*
value = String(value); // endi qiymat "true" matnidir
alert(typeof value); // string(matn)
*/!*
```

String conversion is mostly obvious. A `false` becomes `"false"`, `null` becomes `"null"`, etc.
Matn konvertatsiyasi asosan aniq. `false` `"false"` ga, `null` `"null"` ga va hokazolarga aylanadi.

## Numeric Conversion

Raqamli konvertatsiya matematik funktsiyalar va ifodalarda avtomatik ravishda sodir bo'ladi.

Masalan, `/` bo'linmasi raqam bo'lmagan turlarga nisbatan qo'llanilganda:

```js run
alert( "6" / "2" ); // 3, matnlar raqamlarga aylantiriladi
```

Biz `qiymatni` raqamga aniq aylantirish uchun `Number(value)` funktsiyasidan foydalanishimiz mumkin:

```js run
let str = "123";
alert(typeof str); // string(matn)

let num = Number(str); // raqamga aylantiriladi 123

alert(typeof num); // number(raqam)
```

Matn shakli kabi satrda asoslangan manbadan qiymatni o'qiganimizda, lekin biz raqam kiritilishini kutganimizda aniq konvertatsiya qilish talab qilinadi.

Agar satr haqiqiy raqam bo'lmasa, bunday konvertatsiya natijasi `NaN` dir. Masalan:

```js run
let age = Number("raqam o'rniga o'zboshimchalik satr");

alert(age); // NaN, konvertatsiya amalga oshmadi
```

Raqamli konvertatsiya qilish qoidalari:

| qiymat |  Aylanadi... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;va&nbsp;false</code> | `1` va `0` |
| `string` | Boshidan va oxiridan bo'sh joylar olib tashlanadi. Agar qolgan matn bo'sh bo'lsa, natijada `0` bo'ladi. Aks holda, raqam satrdan "o'qiladi". Xato `NaN` ni beradi. |

Examples:

```js run
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (raqamni "z" da o'qishda xato)
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

Iltimos, e'tibor bering, bu erda `null` va `undefined` boshqacha yo'l tutishadi: `null` nolga, `undefined` esa `NaN` ga aylanadi.

<<<<<<< HEAD:1-js/02-first-steps/06-type-conversions/article.md
````smart header="Qo'shilish belgisi '+' qatorlarni birlashtiradi"
Deyarli barcha matematik operatsiyalar qiymatlarni raqamlarga o'zgartiradi. E'tiborli istisno - bu qo'shimcha "+". Agar qo'shilgan qiymatlardan biri matn bo'lsa, ikkinchisi ham matnga aylantiriladi.

Keyin, ularni birlashtiradi

```js run
alert( 1 + '2' ); // '12' (matn o'n tomonga)
alert( '1' + 2 ); // '12' (matn chap toponga)
```

Bu faqat argumentlardan kamida bittasi matn bo'lganida sodir bo'ladi. Aks holda, qiymatlar raqamlarga aylantiriladi.
````
=======
Most mathematical operators also perform such conversion, we'll see that in the next chapter.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/07-type-conversions/article.md

## Boolean Conversion

Mantiqiy ma'lumot turi konvertatsiya qilish eng oson.

Bu mantiqiy ma'lumot turi operatsiyalarda sodir bo'ladi(keyinchalik biz shart sinovlari va boshqa shunga o'xshash narsalarni uchratamiz), lekin `Boolean(value)` ga qo'ng'iroq qilish bilan ham amalga oshirilishi mumkin.

Konvertatsiya qoidasi:

- `0`, bo'sh satr, `null`, `undefined` va `NaN` kabi intuitiv ravishda "bo'sh" qiymatlar `false` ga aylanadi.
- Boshqa qiymatlar esa `true`.

Masalan:

```js run
alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("hello") ); // true
alert( Boolean("") ); // false
```

````warn header="Iltimos, diqqat qiling: nolli satr `\"0\"` bu `true`"
Ba'zi tillarda (ya'ni PHPda) `"0"` `false` deb qaraladi. Ammo JavaScript da bo'sh bo'lmagan satr har doim `true` qiymatiga ega bo'ladi.

```js run
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // bo'shliqlar, shuningdek true (har qanday bo'sh bo'lmagan satr to'g'ri)
```
````

<<<<<<< HEAD:1-js/02-first-steps/06-type-conversions/article.md

## Xulosa
=======
## Summary
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/07-type-conversions/article.md

Uch eng ko'p ishlatiladigan konvertatsiyalar matnga, raqamga va mantiqiy ma'lumot turiga.

<<<<<<< HEAD:1-js/02-first-steps/06-type-conversions/article.md
**`ToString`** -- Biror narsani chiqarganimizda paydo bo'ladi. `String(value)` bilan bajarilishi mumkin. Matnga aylantirish odatda ibtidoiy qiymatlar uchun aniq.

**`ToNumber`** -- Matematik operatsiyalarda uchraydi. `Number(value)` bilan bajarilishi mumkin.
=======
**`String Conversion`** -- Occurs when we output something. Can be performed with `String(value)`. The conversion to string is usually obvious for primitive values.

**`Numeric Conversion`** -- Occurs in math operations. Can be performed with `Number(value)`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/07-type-conversions/article.md

Konvertatsiya quyidagi qoidalarga amal qiladi:

| Qiymat|  Aylanadi... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;/&nbsp;false</code> | `1 / 0` |
| `string` | Matn "boricha" o'qiladi, ikki tomondan bo'sh joylar e'tiborga olinmaydi. Bo'sh satr `0` ga aylanadi. Xato `NaN` ni chiqazadi. |

<<<<<<< HEAD:1-js/02-first-steps/06-type-conversions/article.md
**`ToBoolean`** -- Mantiqiy ma'lumot turi operatsiyalarda uchraydi. "Boolean (value)" bilan bajarilishi mumkin.
=======
**`Boolean Conversion`** -- Occurs in logical operations. Can be performed with `Boolean(value)`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/07-type-conversions/article.md

Qoidalarga amal qiladi:

| Qiymat |  Aylanadi... |
|-------|-------------|
|`0`, `null`, `undefined`, `NaN`, `""` |`false`|
|any other value| `true` |


Ushbu qoidalarning aksariyatini tushunish va yodlash oson. Odamlar odatda xatoga yo'l qo'yadigan muhim istisnolar:

- `undefined` - raqam sifatida `NaN`, `0` emas.
- `"0"` va bo'shliqlar `"   "` kabi matnlar `true` mantiqiy ma'lumot turiga ega.

Bu erda ob'ektlar qoplanmagan. Keyinchalik JavaScript haqida asosiy narsalarni o'rganib bo'lgach, faqat ob'ektlarga bag'ishlangan <info:object-toprimitive> bobida ularga qaytamiz.
