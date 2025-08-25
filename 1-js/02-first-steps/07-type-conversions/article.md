# Turlarni o'zgartirish

Ko'pincha operatorlar va funktsiyalar ularga berilgan qiymatlarni avtomatik ravishda to'g'ri turga o'zgartiradi.

Masalan, `alert` har qanday qiymatni ko'rsatish uchun avtomatik ravishda stringga o'zgartiradi. Matematik amallar qiymatlarni raqamlarga o'zgartiradi.

Shuningdek, qiymatni kutilayotgan turga aniq o'zgartirishimiz kerak bo'lgan holatlar ham bor.

```smart header="Obyektlar haqida hali gapirmayapmiz"
Ushbu bobda biz obyektlarni ko'rib chiqmaymiz. Hozircha biz faqat primitiv turlar haqida gaplashamiz.

Keyinchalik, obyektlar haqida o'rganganimizdan so'ng, <info:object-toprimitive> bobida obyektlar qanday mos kelishini ko'ramiz.
```

## String o'zgartirish

String o'zgartirish qiymatning string ko'rinishi kerak bo'lganda sodir bo'ladi.

Masalan, `alert(value)` qiymatni ko'rsatish uchun buni qiladi.

Shuningdek, qiymatni stringga o'zgartirish uchun `String(value)` funktsiyasini chaqirishimiz mumkin:

```js run
let value = true;
alert(typeof value); // boolean

*!*
value = String(value); // endi value "true" stringi
alert(typeof value); // string
*/!*
```

String o'zgartirish asosan aniq. `false` `"false"` ga aylanadi, `null` `"null"` ga aylanadi va hokazo.

## Raqamli o'zgartirish

Raqamli o'zgartirish matematik funktsiyalar va ifodalarda avtomatik ravishda sodir bo'ladi.

Masalan, bo'lish `/` raqam bo'lmagan qiymatlarga qo'llanilganda:

```js run
alert( "6" / "2" ); // 3, stringlar raqamlarga o'zgartiriladi
```

`value` ni aniq ravishda raqamga o'zgartirish uchun `Number(value)` funktsiyasidan foydalanishimiz mumkin:

```js run
let str = "123";
alert(typeof str); // string

let num = Number(str); // 123 raqamiga aylanadi

alert(typeof num); // number
```

Aniq o'zgartirish odatda matn shaklidagi manbadan (masalan, matn formasi) qiymat o'qiganimizda, lekin raqam kiritilishini kutganimizda talab qilinadi.

Agar string to'g'ri raqam bo'lmasa, bunday o'zgartirishning natijasi `NaN` bo'ladi. Masalan:

```js run
let age = Number("raqam o'rniga ixtiyoriy string");

alert(age); // NaN, o'zgartirish muvaffaqiyatsiz
```

Raqamli o'zgartirish qoidalari:

| Qiymat |  Aylanadi... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;va&nbsp;false</code> | `1` va `0` |
| `string` | Boshi va oxiridagi bo'shliqlar (bo'shliqlar, tab `\t`, yangi satrlar `\n` va hokazo) olib tashlanadi. Agar qolgan string bo'sh bo'lsa, natija `0` bo'ladi. Aks holda, stringdan raqam "o'qiladi". Xato `NaN` beradi. |

Misollar:

```js run
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN ("z" da raqam o'qishda xato)
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

E'tibor bering, `null` va `undefined` bu yerda boshqacha harakat qiladi: `null` nolga aylanadi, `undefined` esa `NaN` ga aylanadi.

Ko'pgina matematik operatorlar ham bunday o'zgartirishni amalga oshiradi, buni keyingi bobda ko'ramiz.

## Boolean o'zgartirish

Boolean o'zgartirish eng oddiysi.

Bu mantiqiy amallarda sodir bo'ladi (keyinchalik shart tekshiruvlari va boshqa shunga o'xshash narsalar bilan tanishamiz), lekin `Boolean(value)` chaqiruvi bilan ham aniq bajarilishi mumkin.

O'zgartirish qoidasi:

- Intuitiv ravishda "bo'sh" bo'lgan qiymatlar, masalan `0`, bo'sh string, `null`, `undefined` va `NaN`, `false` ga aylanadi.
- Boshqa qiymatlar `true` ga aylanadi.

Masalan:

```js run
alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("hello") ); // true
alert( Boolean("") ); // false
```

````warn header="E'tibor bering: nol bilan string `\"0\"` `true` hisoblanadi"
Ba'zi tillar (xususan PHP) `"0"` ni `false` deb hisoblaydi. Ammo JavaScript da bo'sh bo'lmagan string har doim `true` hisoblanadi.

```js run
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // bo'shliqlar, ham true (har qanday bo'sh bo'lmagan string true)
```
````

## Xulosa

Eng keng qo'llaniladigan uchta tur o'zgartirish: stringga, raqamga va boolean ga.

**`String o'zgartirish`** -- Biror narsani chiqarganimizda sodir bo'ladi. `String(value)` bilan bajarilishi mumkin. Primitiv qiymatlar uchun stringga o'zgartirish odatda aniq.

**`Raqamli o'zgartirish`** -- Matematik amallarda sodir bo'ladi. `Number(value)` bilan bajarilishi mumkin.

O'zgartirish qoidalarga amal qiladi:

| Qiymat |  Aylanadi... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;/&nbsp;false</code> | `1 / 0` |
| `string` | String "aynan shunday" o'qiladi, ikkala tarafdagi bo'shliqlar (bo'shliqlar, tab `\t`, yangi satrlar `\n` va hokazo) e'tiborga olinmaydi. Bo'sh string `0` ga aylanadi. Xato `NaN` beradi. |

**`Boolean o'zgartirish`** -- Mantiqiy amallarda sodir bo'ladi. `Boolean(value)` bilan bajarilishi mumkin.

Qoidalarga amal qiladi:

| Qiymat |  Aylanadi... |
|-------|-------------|
|`0`, `null`, `undefined`, `NaN`, `""` |`false`|
|boshqa har qanday qiymat| `true` |

Bu qoidalarning aksariyati tushunish va yodlash oson. Odamlar odatda xato qiladigan diqqatga sazovor istisnolar:

- `undefined` raqam sifatida `NaN`, `0` emas.
- `"0"` va faqat bo'shliqlardan iborat stringlar masalan `"   "` boolean sifatida true.

Obyektlar bu yerda ko'rib chiqilmagan. JavaScript ning asosiy narsalarini o'rganganimizdan so'ng, faqat obyektlarga bag'ishlangan <info:object-toprimitive> bobida ularga qaytamiz.