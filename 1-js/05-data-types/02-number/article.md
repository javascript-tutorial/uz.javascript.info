# Raqamlar

Zamonaviy JavaScript-da ikki turdagi raqamlar mavjud:

1. JavaScript-da oddiy raqamlar 64-bitli [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754) formatida saqlanadi, bu "ikki aniqlikdagi suzuvchi nuqta raqamlari" deb ham ataladi. Bular biz ko'pincha ishlatadigan raqamlar va bu bobda ular haqida gaplashamiz.

2. BigInt raqamlari ixtiyoriy uzunlikdagi butun sonlarni ifodalaydi. Ular ba'zan kerak bo'ladi, chunki oddiy butun son raqami xavfsiz ravishda <code>(2<sup>53</sup>-1)</code> dan oshib ketishi yoki <code>-(2<sup>53</sup>-1)</code> dan kichik bo'lishi mumkin emas, buni <info:types> bobida eslatgan edik. Bigint'lar bir nechta maxsus sohalarda ishlatilganligi sababli, ularga maxsus <info:bigint> bobini bag'ishlaymiz.

Demak, bu yerda oddiy raqamlar haqida gaplashamiz. Ular haqidagi bilimlarimizni kengaytiraylik.

## Raqam yozishning ko'proq usullari

Tasavvur qiling, bizga 1 milliard yozish kerak. Aniq usul:

```js
let billion = 1000000000;
```

Shuningdek, biz ajratuvchi sifatida pastki chiziq `_` dan foydalanishimiz mumkin:

```js
let billion = 1_000_000_000;
```

Bu yerda pastki chiziq `_` "[sintaktik shakar](https://en.wikipedia.org/wiki/Syntactic_sugar)" rolini o'ynaydi, u raqamni o'qishga osonroq qiladi. JavaScript dvigateli raqamlar orasidagi `_` ni shunchaki e'tiborsiz qoldiradi, shuning uchun bu yuqoridagi bilan aynan bir xil bir milliarddir.

Haqiqiy hayotda biz nollarning uzun ketma-ketliklarini yozishdan qochamiz. Bunga dangasamiz. Bir milliard uchun `"1bn"` yoki 7 milliard 300 million uchun `"7.3bn"` kabi narsalar yozishga harakat qilamiz. Ko'pchilik katta raqamlar uchun ham xuddi shunday.

JavaScript-da biz raqamni qisqartirish uchun unga `"e"` harfini qo'shib, nollar sonini ko'rsata olamiz:

```js run
let billion = 1e9; // 1 milliard, to'g'ridan-to'g'ri: 1 va 9 ta nol

alert(7.3e9); // 7.3 milliard (7300000000 yoki 7_300_000_000 bilan bir xil)
```

Boshqacha qilib aytganda, `e` raqamni berilgan nollar soni bilan `1` ga ko'paytiradi.

```js
1e3 === 1 * 1000; // e3 *1000 ni anglatadi
1.23e6 === 1.23 * 1000000; // e6 *1000000 ni anglatadi
```

Endi juda kichik narsani yozaylik. Aytaylik, 1 mikrosekund (sekundning milliondan bir qismi):

```js
let mсs = 0.000001;
```

Xuddi avvalgidek, `"e"` dan foydalanish yordam berishi mumkin. Nollarni aniq yozishdan qochish uchun xuddi shunday yoza olamiz:

```js
let mcs = 1e-6; // 1 dan chapga beshta nol
```

Agar biz `0.000001` dagi nollarni sansak, ulardan 6 ta bor. Demak, tabiiy ravishda bu `1e-6`.

Boshqacha qilib aytganda, `"e"` dan keyingi salbiy raqam berilgan nollar soni bilan 1 ga bo'lishni anglatadi:

```js
// -3 berilgan 3 ta nol bilan 1 ga bo'ladi
1e-3 === 1 / 1000; // 0.001

// -6 berilgan 6 ta nol bilan 1 ga bo'ladi
1.23e-6 === 1.23 / 1000000; // 0.00000123

// kattaroq raqam bilan misol
1234e-2 === 1234 / 100; // 12.34, kasr nuqtasi 2 marta siljiydi
```

### Hex, binary va octal raqamlar

[Hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) raqamlar JavaScript-da ranglarni ifodalash, belgilarni kodlash va boshqa ko'p narsalar uchun keng ishlatiladi. Shuning uchun tabiiy ravishda ularni yozishning qisqaroq usuli mavjud: `0x` va keyin raqam.

Masalan:

```js run
alert(0xff); // 255
alert(0xff); // 255 (bir xil, registr muhim emas)
```

Binary va octal raqam tizimlari kamdan-kam qo'llaniladi, lekin `0b` va `0o` prefikslari yordamida ham qo'llab-quvvatlanadi:

```js run
let a = 0b11111111; // 255 ning binary shakli
let b = 0o377; // 255 ning octal shakli

alert(a == b); // true, ikkala tomonda bir xil 255 raqami
```

Bunday qo'llab-quvvatlash bilan faqat 3 ta raqam tizimi mavjud. Boshqa raqam tizimlari uchun biz `parseInt` funksiyasidan foydalanishimiz kerak (buni bu bobning keyingi qismida ko'ramiz).

## toString(base)

`num.toString(base)` usuli berilgan `base` bilan raqam tizimida `num` ning satr ko'rinishini qaytaradi.

Masalan:

```js run
let num = 255;

alert(num.toString(16)); // ff
alert(num.toString(2)); // 11111111
```

`base` `2` dan `36` gacha o'zgarishi mumkin. Standart bo'yicha bu `10`.

Buning umumiy foydalanish holatlari:

- **base=16** hex ranglar, belgi kodlashlari va hokazo uchun ishlatiladi, raqamlar `0..9` yoki `A..F` bo'lishi mumkin.
- **base=2** asosan bitli operatsiyalarni disk raskadka qilish uchun, raqamlar `0` yoki `1` bo'lishi mumkin.
- **base=36** maksimal, raqamlar `0..9` yoki `A..Z` bo'lishi mumkin. Butun Lotin alifbosi raqamni ifodalash uchun ishlatiladi. `36` uchun qiziqarli, lekin foydali holat - uzun raqamli identifikatorni qisqaroq narsaga aylantirish kerak bo'lganda, masalan, qisqa url yaratish uchun. Uni shunchaki `36` asosli raqam tizimida ifodalash mumkin:

  ```js run
  alert((123456).toString(36)); // 2n9c
  ```

```warn header="Usulni chaqirish uchun ikkita nuqta"
E'tibor bering, `123456..toString(36)` dagi ikkita nuqta xato emas. Agar biz yuqoridagi misoldagi `toString` kabi raqamda to'g'ridan-to'g'ri usulni chaqirmoqchi bo'lsak, undan keyin ikkita nuqta `..` qo'yishimiz kerak.

Agar bitta nuqta qo'ysak: `123456.toString(36)`, u holda xato bo'ladi, chunki JavaScript sintaksisi birinchi nuqtadan keyin kasr qismini nazarda tutadi. Va agar yana bir nuqta qo'ysak, JavaScript kasr qismi bo'sh ekanligini biladi va endi usulni ishlatadi.

Shuningdek, `(123456).toString(36)` deb yoza olamiz.
```

## Yaxlitlash

Raqamlar bilan ishlashda eng ko'p ishlatiladigan operatsiyalardan biri yaxlitlashdir.

Yaxlitlash uchun bir nechta o'rnatilgan funksiyalar mavjud:

`Math.floor`
: Pastga yaxlitlaydi: `3.1` `3` ga aylanadi, `-1.1` `-2` ga aylanadi.

`Math.ceil`
: Yuqoriga yaxlitlaydi: `3.1` `4` ga aylanadi, `-1.1` `-1` ga aylanadi.

`Math.round`
: Eng yaqin butun songa yaxlitlaydi: `3.1` `3` ga aylanadi, `3.6` `4` ga aylanadi. O'rta holatlarda `3.5` `4` gacha yaxlitlanadi, `-3.5` `-3` gacha yaxlitlanadi.

`Math.trunc` (Internet Explorer tomonidan qo'llab-quvvatlanmaydi)
: Yaxlitlashsiz kasr nuqtasidan keyin hamma narsani olib tashlaydi: `3.1` `3` ga aylanadi, `-1.1` `-1` ga aylanadi.

Ular orasidagi farqlarni umumlashtiradigan jadval:

|        | `Math.floor` | `Math.ceil` | `Math.round` | `Math.trunc` |
| ------ | ------------ | ----------- | ------------ | ------------ |
| `3.1`  | `3`          | `4`         | `3`          | `3`          |
| `3.5`  | `3`          | `4`         | `4`          | `3`          |
| `3.6`  | `3`          | `4`         | `4`          | `3`          |
| `-1.1` | `-2`         | `-1`        | `-1`         | `-1`         |
| `-1.5` | `-2`         | `-1`        | `-1`         | `-1`         |
| `-1.6` | `-2`         | `-1`        | `-2`         | `-1`         |

Bu funksiyalar raqamning kasr qismi bilan ishlashning barcha mumkin bo'lgan usullarini qamrab oladi. Lekin agar raqamni kasr nuqtasidan keyin `n-chi` raqamga yaxlitlashni istasak-chi?

Masalan, bizda `1.2345` bor va uni 2 raqamga yaxlitlash kerak, faqat `1.23` ni olish.

Buning ikki usuli bor:

1. Ko'paytirish va bo'lish.

   Masalan, raqamni kasr nuqtasidan keyin 2-raqamga yaxlitlash uchun biz raqamni `100` ga ko'paytirib, yaxlitlash funksiyasini chaqirib, keyin orqaga bo'lishimiz mumkin.

   ```js run
   let num = 1.23456;

   alert(Math.round(num * 100) / 100); // 1.23456 -> 123.456 -> 123 -> 1.23
   ```

2. [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) usuli raqamni nuqtadan keyin `n` raqamga yaxlitlaydi va natijaning satr ko'rinishini qaytaradi.

   ```js run
   let num = 12.34;
   alert(num.toFixed(1)); // "12.3"
   ```

   Bu `Math.round` ga o'xshab, eng yaqin qiymatga yuqoriga yoki pastga yaxlitlaydi:

   ```js run
   let num = 12.36;
   alert(num.toFixed(1)); // "12.4"
   ```

   E'tibor bering, `toFixed` ning natijasi satrdir. Agar kasr qismi kerakligidan qisqaroq bo'lsa, oxiriga nollar qo'shiladi:

   ```js run
   let num = 12.34;
   alert(num.toFixed(5)); // "12.34000", aynan 5 ta raqam qilish uchun nollar qo'shildi
   ```

   Biz uni unary plus yoki `Number()` chaqiruvi yordamida raqamga aylantira olamiz, masalan `+num.toFixed(5)` deb yoza olamiz.

## Noaniq hisoblar

Ichki jihatdan raqam 64-bitli [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754) formatida ifodalanadi, shuning uchun raqamni saqlash uchun aniq 64 bit mavjud: ulardan 52 tasi raqamlarni saqlash uchun, 11 tasi kasr nuqtasining o'rnini saqlash uchun va 1 bit belgi uchun ishlatiladi.

Agar raqam haqiqatan ham juda katta bo'lsa, u 64-bitli xotirani to'ldirib, maxsus raqamli qiymat `Infinity` ga aylanishi mumkin:

```js run
alert(1e500); // Infinity
```

Kamroq aniq bo'lishi mumkin, lekin tez-tez sodir bo'ladigan narsa - aniqlik yo'qolishi.

Ushbu (noto'g'ri!) tenglik testini ko'rib chiqing:

```js run
alert(0.1 + 0.2 == 0.3); // *!*false*/!*
```

To'g'ri, agar biz `0.1` va `0.2` ning yig'indisi `0.3` ekanligini tekshirsak, `false` olamiz.

G'alati! U holda `0.3` bo'lmasa nima?

```js run
alert(0.1 + 0.2); // 0.30000000000000004
```

Voy! Tasavvur qiling, siz elektron xarid saytini yaratyapsiz va tashrif buyuruvchi savatiga `$0.10` va `$0.20` tovarlarni qo'yadi. Buyurtma umumiy summasi `$0.30000000000000004` bo'ladi. Bu har kimni hayratga soladi.

Lekin nima uchun bunday bo'ladi?

Raqam xotirada binary shaklda, bitlar ketma-ketligi - birlar va nollar sifatida saqlanadi. Lekin o'nli raqam tizimida oddiy ko'rinadigan `0.1`, `0.2` kabi kasrlar aslida binary shaklida cheksiz kasrlardir.

```js run
alert((0.1).toString(2)); // 0.0001100110011001100110011001100110011001100110011001101
alert((0.2).toString(2)); // 0.001100110011001100110011001100110011001100110011001101
alert((0.1 + 0.2).toString(2)); // 0.0100110011001100110011001100110011001100110011001101
```

`0.1` nima? Bu o'nni birga bo'lish `1/10`, o'ndan bir. O'nli raqam tizimida bunday raqamlar osongina ifodalanadi. Uni uchdan biriga solishtiring: `1/3`. U cheksiz kasr `0.33333(3)` ga aylanadi.

Demak, `10` ning darajalariga bo'lish o'nli tizimda yaxshi ishlashi kafolatlangan, lekin `3` ga bo'lish emas. Xuddi shu sababga ko'ra, binary raqam tizimida `2` ning darajalariga bo'lish kafolatlangan, lekin `1/10` cheksiz binary kasrga aylanadi.

Binary tizim yordamida _aniq 0.1_ yoki _aniq 0.2_ ni saqlashning hech qanday usuli yo'q, xuddi o'nli kasr sifatida uchdan birini saqlashning imkoni yo'qligi kabi.

IEEE-754 raqamli formati buni eng yaqin mumkin bo'lgan raqamga yaxlitlash orqali hal qiladi. Bu yaxlitlash qoidalari odatda bizga "kichik aniqlik yo'qolishi" ni ko'rishga imkon bermaydi, lekin u mavjud.

Buni amalda ko'rishimiz mumkin:

```js run
alert((0.1).toFixed(20)); // 0.10000000000000000555
```

Va ikkita raqamni qo'shganimizda, ularning "aniqlik yo'qolishlari" qo'shiladi.

Shuning uchun `0.1 + 0.2` aniq `0.3` emas.

```smart header="Faqat JavaScript emas"
Xuddi shu muammo ko'plab boshqa dasturlash tillarida mavjud.

PHP, Java, C, Perl va Ruby aynan bir xil natijani beradi, chunki ular bir xil raqamli formatga asoslanadi.
```

Muammoni hal qila olamizmi? Albatta, eng ishonchli usul - natijani [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) usuli yordamida yaxlitlashdir:

```js run
let sum = 0.1 + 0.2;
alert(sum.toFixed(2)); // "0.30"
```

E'tibor bering, `toFixed` har doim satr qaytaradi. U kasr nuqtasidan keyin 2 ta raqam borligini ta'minlaydi. Bu elektron xarid qilish saytimiz bo'lsa va `$0.30` ko'rsatish kerak bo'lsa, aslida qulay. Boshqa holatlarda uni raqamga aylantirish uchun unary plus ishlatishimiz mumkin:

```js run
let sum = 0.1 + 0.2;
alert(+sum.toFixed(2)); // 0.3
```

Shuningdek, raqamlarni butun sonlarga aylantirish uchun vaqtincha 100 ga (yoki kattaroq raqamga) ko'paytirib, matematik amallarni bajarib, keyin orqaga bo'lishimiz mumkin. Butun sonlar bilan matematik amallar qilayotganimiz uchun xato biroz kamayadi, lekin bo'lishda hali ham olamiz:

```js run
alert((0.1 * 10 + 0.2 * 10) / 10); // 0.3
alert((0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001
```

Demak, ko'paytirish/bo'lish yondashuvi xatoni kamaytiradi, lekin uni butunlay olib tashlamaydi.

Ba'zan kasrlardan butunlay qochishga harakat qilishimiz mumkin. Masalan, agar do'kon bilan ish qilayotgan bo'lsak, narxlarni dollar o'rniga sentda saqlashimiz mumkin. Lekin agar 30% chegirma qo'llasak-chi? Amalda kasrlardan butunlay qochish kamdan-kam mumkin. Kerak bo'lganda "dumlarni" kesish uchun shunchaki yaxlitlang.

````smart header="Qiziq narsa"
Buni ishga tushirib ko'ring:

```js run
// Salom! Men o'z-o'zimni oshiradigan raqamman!
alert( 9999999999999999 ); // 10000000000000000 ni ko'rsatadi
```

Bu xuddi shu muammoga duchor: aniqlik yo'qolishi. Raqam uchun 64 bit bor, ulardan 52 tasini raqamlarni saqlash uchun ishlatish mumkin, lekin bu yetarli emas. Shunday qilib, eng kam ahamiyatli raqamlar yo'qoladi.

JavaScript bunday hodisalarda xato bermaydi. U raqamni kerakli formatga moslashtirishga qo'lidan kelgancha harakat qiladi, lekin afsuski, bu format yetarlicha katta emas.
````

```smart header="Ikkita nol"
Raqamlarning ichki ko'rinishining yana bir qiziq natijasi - ikkita nolning mavjudligi: `0` va `-0`.

Buning sababi shundaki, belgi bitta bit bilan ifodalanadi, shuning uchun nolni o'z ichiga olgan har qanday raqam uchun o'rnatilishi yoki o'rnatilmasligi mumkin.

Ko'p hollarda bu farq sezilmaydi, chunki operatorlar ularni bir xil deb ko'rishga moslashtirilgan.
```

## Testlar: isFinite va isNaN

Ushbu ikkita maxsus raqamli qiymatni eslaysizmi?

- `Infinity` (va `-Infinity`) hamma narsadan kattaroq (kichikroq) bo'lgan maxsus raqamli qiymat.
- `NaN` xatoni ifodalaydi.

Ular `number` tipiga tegishli, lekin "oddiy" raqamlar emas, shuning uchun ularni tekshirish uchun maxsus funksiyalar mavjud:

- `isNaN(value)` o'z argumentini raqamga aylantiradi va keyin uni `NaN` ekanligini tekshiradi:

  ```js run
  alert(isNaN(NaN)); // true
  alert(isNaN("str")); // true
  ```

  Lekin bizga bu funksiya kerakmi? `=== NaN` solishtiruvidan foydalana olmaymizmi? Afsuski yo'q. `NaN` qiymati o'ziga ham teng kelmasligida noyobdir:

  ```js run
  alert(NaN === NaN); // false
  ```

- `isFinite(value)` o'z argumentini raqamga aylantiradi va agar u oddiy raqam bo'lsa `true` qaytaradi, `NaN/Infinity/-Infinity` bo'lmasa:

  ```js run
  alert(isFinite("15")); // true
  alert(isFinite("str")); // false, chunki maxsus qiymat: NaN
  alert(isFinite(Infinity)); // false, chunki maxsus qiymat: Infinity
  ```

Ba'zan `isFinite` satr qiymati oddiy raqam ekanligini tekshirish uchun ishlatiladi:

```js run
let num = +prompt("Raqam kiriting", "");

// Infinity, -Infinity yoki raqam emas deb kiritmaguningizcha true bo'ladi
alert(isFinite(num));
```

E'tibor bering, bo'sh yoki faqat bo'shliq bo'lgan satr `isFinite` ni o'z ichiga olgan barcha raqamli funksiyalarda `0` deb hisoblanadi.

````smart header="`Number.isNaN`va`Number.isFinite`"
[Number.isNaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) va [Number.isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite) usullari `isNaN`va`isFinite`funksiyalarining "qattiqroq" versiyalaridir. Ular o'z argumentlarini raqamga avtomatik aylantirmaydi, balki u`number` tipiga tegishli ekanligini tekshiradi.

- `Number.isNaN(value)` agar argument `number` tipiga tegishli bo'lsa va u `NaN` bo'lsa `true` qaytaradi. Boshqa barcha hollarda `false` qaytaradi.

  ```js run
  alert(Number.isNaN(NaN)); // true
  alert(Number.isNaN("str" / 2)); // true

  // Farqga e'tibor bering:
  alert(Number.isNaN("str")); // false, chunki "str" string tipiga tegishli, number tipiga emas
  alert(isNaN("str")); // true, chunki isNaN "str" satrini raqamga aylantiradi va bu aylantirishning natijasida NaN ni oladi
  ```

- `Number.isFinite(value)` agar argument `number` tipiga tegishli bo'lsa va u `NaN/Infinity/-Infinity` bo'lmasa `true` qaytaradi. Boshqa barcha hollarda `false` qaytaradi.

  ```js run
  alert(Number.isFinite(123)); // true
  alert(Number.isFinite(Infinity)); // false
  alert(Number.isFinite(2 / 0)); // false

  // Farqga e'tibor bering:
  alert(Number.isFinite("123")); // false, chunki "123" string tipiga tegishli, number tipiga emas
  alert(isFinite("123")); // true, chunki isFinite "123" satrini 123 raqamiga aylantiradi
  ```

Ma'lum ma'noda `Number.isNaN` va `Number.isFinite` `isNaN` va `isFinite` funksiyalaridan oddiyroq va to'g'ridanroq. Amalda esa `isNaN` va `isFinite` ko'proq ishlatiladi, chunki yozish qisqaroq.

`````

```smart header="`Object.is` bilan solishtirish"
`===` kabi qiymatlarni solishtiradigan, lekin ikkita chekka holat uchun ishonchliroq bo'lgan maxsus o'rnatilgan `Object.is` usuli mavjud:

1. U `NaN` bilan ishlaydi: `Object.is(NaN, NaN) === true`, bu yaxshi narsa.
2. `0` va `-0` qiymatlari farqli: `Object.is(0, -0) === false`, texnik jihatdan bu to'g'ri, chunki ichki jihatdan raqamda boshqa barcha bitlar nol bo'lsa ham farqli bo'lishi mumkin bo'lgan belgi biti bor.

Boshqa barcha hollarda `Object.is(a, b)` `a === b` bilan bir xil.

Biz bu yerda `Object.is` ni eslatamiz, chunki u JavaScript spetsifikatsiyasida tez-tez ishlatiladi. Ichki algoritm ikkita qiymatni aynan bir xil ekanligi uchun solishtirishga kerak bo'lganda, u `Object.is` dan foydalanadi (ichki jihatdan [SameValue](https://tc39.github.io/ecma262/#sec-samevalue) deb ataladi).
```

## parseInt va parseFloat

Plus `+` yoki `Number()` yordamida raqamli aylantirish qat'iy. Agar qiymat aniq raqam bo'lmasa, u muvaffaqiyatsiz bo'ladi:

```js run
alert( +"100px" ); // NaN
```

Yagona istisno - satrning boshida yoki oxirida bo'shliqlar, ular e'tiborga olinmaydi.

Lekin haqiqiy hayotda bizda ko'pincha CSS dagi `"100px"` yoki `"12pt"` kabi birliklardagi qiymatlar bor. Shuningdek, ko'plab mamlakatlarda valyuta belgisi miqdordan keyin keladi, shuning uchun bizda `"19€"` bor va undan raqamli qiymat chiqarishni istaydi.

`parseInt` va `parseFloat` buning uchun.

Ular satrdan raqamni "o'qiydi", toki iloji bor. Xato bo'lsa, to'plangan raqam qaytariladi. `parseInt` funksiyasi butun sonni qaytaradi, `parseFloat` esa suzuvchi nuqta raqamini qaytaradi:

```js run
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12, faqat butun qism qaytariladi
alert( parseFloat('12.3.4') ); // 12.3, ikkinchi nuqta o'qishni to'xtatadi
```

`parseInt/parseFloat` `NaN` qaytaradigan holatlar mavjud. Bu hech qanday raqam o'qilmaganida sodir bo'ladi:

```js run
alert( parseInt('a123') ); // NaN, birinchi belgi jarayonni to'xtatadi
```

````smart header="`parseInt(str, radix)` ning ikkinchi argumenti"
`parseInt()` funksiyasi ixtiyoriy ikkinchi parametrga ega. U raqam tizimining asosini belgilaydi, shuning uchun `parseInt` hex raqamlar, binary raqamlar va boshqa satrlarni ham tahlil qila oladi:

```js run
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255, 0x siz ham ishlaydi

alert( parseInt('2n9c', 36) ); // 123456
```
`````

## Boshqa matematik funksiyalar

JavaScript matematik funksiyalar va konstantalarning kichik kutubxonasini o'z ichiga olgan o'rnatilgan [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) obyektiga ega.

Bir nechta misol:

`Math.random()`
: 0 dan 1 gacha tasodifiy raqam qaytaradi (1 ni o'z ichiga olmaydi).

    ```js run
    alert( Math.random() ); // 0.1234567894322
    alert( Math.random() ); // 0.5435252343232
    alert( Math.random() ); // ... (har qanday tasodifiy raqamlar)
    ```

`Math.max(a, b, c...)` va `Math.min(a, b, c...)`
: Ixtiyoriy miqdordagi argumentlardan eng katta va eng kichigini qaytaradi.

    ```js run
    alert( Math.max(3, 5, -10, 0, 1) ); // 5
    alert( Math.min(1, 2) ); // 1
    ```

`Math.pow(n, power)`
: `n` ni berilgan darajaga ko'taradi.

    ```js run
    alert( Math.pow(2, 10) ); // 2 ning 10-darajasi = 1024
    ```

`Math` obyektida ko'proq funksiyalar va konstantalar mavjud, jumladan trigonometriya, ularni [Math obyekti uchun hujjatlarda](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) topishingiz mumkin.

## Xulosa

Ko'p nollar bilan raqamlar yozish uchun:

- Raqamga nollar sonini e'tibor bilan `"e"` ni qo'shing. Masalan: `123e6` 6 ta nol bilan `123` bilan bir xil `123000000`.
- `"e"` dan keyingi salbiy raqam raqamni berilgan nollar bilan 1 ga bo'linishiga sabab bo'ladi. Masalan, `123e-6` `0.000123` (`123` milliondan biri) ni anglatadi.

Turli raqam tizimlari uchun:

- Hex (`0x`), octal (`0o`) va binary (`0b`) tizimlarda raqamlarni to'g'ridan-to'g'ri yozish mumkin.
- `parseInt(str, base)` `str` satrini berilgan `base` asosli raqam tizimida butun songa tahlil qiladi, `2 ≤ base ≤ 36`.
- `num.toString(base)` raqamni berilgan `base` asosli raqam tizimida satrga aylantiradi.

Oddiy raqam testlari uchun:

- `isNaN(value)` o'z argumentini raqamga aylantiradi va keyin uni `NaN` ekanligini tekshiradi
- `Number.isNaN(value)` argumenti `number` tipiga tegishli ekanligini tekshiradi va agar shunday bo'lsa, uni `NaN` ekanligini tekshiradi
- `isFinite(value)` o'z argumentini raqamga aylantiradi va keyin uni `NaN/Infinity/-Infinity` emasligi uchun tekshiradi
- `Number.isFinite(value)` argumenti `number` tipiga tegishli ekanligini tekshiradi va agar shunday bo'lsa, uni `NaN/Infinity/-Infinity` emasligi uchun tekshiradi

`12pt` va `100px` kabi qiymatlarni raqamga aylantirish uchun:

- "Yumshoq" aylantirish uchun `parseInt/parseFloat` dan foydalaning, u satrdan raqamni o'qiydi va xatogacha o'qiy olgan qiymatni qaytaradi.

Kasrlar uchun:

- `Math.floor`, `Math.ceil`, `Math.trunc`, `Math.round` yoki `num.toFixed(precision)` yordamida yaxlitlang.
- Kasrlar bilan ishlashda aniqlik yo'qolishi borligini eslashni unutmang.

Ko'proq matematik funksiyalar:

- Kerak bo'lganda [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) obyektiga qarang. Kutubxona juda kichik, lekin asosiy ehtiyojlarni qoplashi mumkin.
