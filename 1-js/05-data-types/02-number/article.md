# Raqamlar

<<<<<<< HEAD
JavaScript-dagi barcha raqamlar 64 bitli formatda saqlanadi [IEEE-754](http://en.wikipedia.org/wiki/IEEE_754-1985), shuningdek "ikki aniqlikdagi suzuvchi nuqta raqamlari" deb nomlanadi.

Keling, ular haqida bilgan narsalarimizni qayta ko'rib chiqamiz va kengaytiramiz.
=======
In modern JavaScript, there are two types of numbers:

1. Regular numbers in JavaScript are stored in 64-bit format [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754), also known as "double precision floating point numbers". These are numbers that we're using most of the time, and we'll talk about them in this chapter.

2. BigInt numbers represent integers of arbitrary length. They are sometimes needed because a regular integer number can't safely exceed <code>(2<sup>53</sup>-1)</code> or be less than <code>-(2<sup>53</sup>-1)</code>, as we mentioned earlier in the chapter <info:types>. As bigints are used in a few special areas, we devote them to a special chapter <info:bigint>.

So here we'll talk about regular numbers. Let's expand our knowledge of them.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Raqam yozishning boshqa usullari

1 milliardni yozishimiz kerakligini tasavvur qiling. Aniq usul:

```js
let billion = 1000000000;
```

<<<<<<< HEAD
Ammo hayotda biz odatda noldan iborat bo'lgan uzun matni yozishdan qochamiz, chunki uni xato yozish oson. Bundan tashqari, biz dangasamiz. Biz odatda `"1bn"` 1 milliardga yoki `"7.3bn"` ga 7 milliard 300 millionga yozamiz. Xuddi shu narsa ko'p sonli raqamlar uchun ham amal qiladi.

JavaScript-da, raqamga `"e"` harfini qo'shib, nol sonini ko'rsatib, raqamni qisqartiramiz:
=======
We also can use underscore `_` as the separator:

```js
let billion = 1_000_000_000;
```

Here the underscore `_` plays the role of the "[syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar)", it makes the number more readable. The JavaScript engine simply ignores `_` between digits, so it's exactly the same one billion as above.

In real life though, we try to avoid writing long sequences of zeroes. We're too lazy for that. We'll try to write something like `"1bn"` for a billion or `"7.3bn"` for 7 billion 300 million. The same is true for most large numbers.

In JavaScript, we can shorten a number by appending the letter `"e"` to it and specifying the zeroes count:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let billion = 1e9;  // 1 milliard, so'zma-so'z: 1 va 9 nol

<<<<<<< HEAD
alert( 7.3e9 );  // 7.3 milliard (7,300,000,000)
```

Boshqacha qilib aytganda, `"e"` berilgan nollar soni bilan raqamni `1` ga ko'paytiradi.
=======
alert( 7.3e9 );  // 7.3 billions (same as 7300000000 or 7_300_000_000)
```

In other words, `e` multiplies the number by `1` with the given zeroes count.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
1e3 === 1 * 1000; // e3 means *1000
1.23e6 === 1.23 * 1000000; // e6 means *1000000
```

<<<<<<< HEAD
<<<<<<< HEAD

Endi juda kichik bir narsa yozamiz. Aytaylik, 1 mikrosekund (soniyaning milliondan biri):
=======
Now let's write something very small. Say, 1 microsecond (one millionth of a second):
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
Now let's write something very small. Say, 1 microsecond (one-millionth of a second):
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
let mсs = 0.000001;
```

<<<<<<< HEAD
<<<<<<< HEAD
Oldingi kabi, `"e"` dan foydalanish yordam berishi mumkin. Agar biz nollarni aniq yozishdan qochishni istasak, shunday yozishimiz mumkin:
=======
Just like before, using `"e"` can help. If we'd like to avoid writing the zeroes explicitly, we could say the same as:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
let ms = 1e-6; // 1 dan chapga oltita nol
```

Agar `0.000001` dagi nollarni hisoblasak, ularning soni 6 taga teng. Tabiiyki, bu `1e-6`.  
=======
Just like before, using `"e"` can help. If we'd like to avoid writing the zeroes explicitly, we could write the same as:

```js
let mcs = 1e-6; // five zeroes to the left from 1
```

If we count the zeroes in `0.000001`, there are 6 of them. So naturally it's `1e-6`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Boshqacha qilib aytganda, `"e"` dan keyin salbiy son, berilgan nol soni bilan 1 ga bo'linishni anglatadi:

```js
<<<<<<< HEAD
// -3  3 ta nol bilan 1 ga bo'linadi
1e-3 = 1 / 1000 (=0.001)

// -6 6 ta nol bilan 1 ga bo'linadi
1.23e-6 = 1.23 / 1000000 (=0.00000123)
=======
// -3 divides by 1 with 3 zeroes
1e-3 === 1 / 1000; // 0.001

// -6 divides by 1 with 6 zeroes
1.23e-6 === 1.23 / 1000000; // 0.00000123

// an example with a bigger number
1234e-2 === 1234 / 100; // 12.34, decimal point moves 2 times
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

### O'n olti, ikkilik va sakkizli sonlar

[Hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) raqamlar JavaScript-da ranglarni ko'rsatish, belgilarni kodlash va boshqa ko'p narsalar uchun keng qo'llaniladi. Tabiiyki, ularni yozishning qisqa usuli mavjud: `0x` va keyin raqam.

Masalan:

```js run
alert( 0xff ); // 255
alert( 0xFF ); // 255 (bir xil, registr farq qilmaydi)
```

Ikkilik va sakkizli raqamli tizimlar kamdan-kam qo'llaniladi, lekin ular `0b` va `0o` qo'shimchalari yordamida ham qo'llab-quvvatlanadi:


```js run
let a = 0b11111111; // 255 ning ikkilik shakli
let b = 0o377; // 255 ning sakkizli shakli

alert( a == b ); // true, ikkala tomonda ham bir xil 255 raqam
```

Bunday qo'llab-quvvatlashga ega bo'lgan faqat 3 ta raqamli tizim mavjud. Boshqa raqamli tizimlar uchun biz `parseInt` funktsiyasidan foydalanishimiz kerak (biz ushbu bobda keyinroq ko'rib chiqamiz).

## toString(raqam tizimi)

`num.toString(base)` usuli berilgan raqam bilan `num` tizimdagi `base` ning matni tasvirini qaytaradi.

Masalan:
```js run
let num = 255;

alert( num.toString(16) );  // ff
alert( num.toString(2) );   // 11111111
```

<<<<<<< HEAD
`base` `2` dan `36` gacha o'zgarishi mumkin. Odatiy bo'lib, bu `10`.
=======
The `base` can vary from `2` to `36`. By default, it's `10`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Buning uchun keng tarqalgan foydalanish holatlari:

<<<<<<< HEAD
- **base = 16** o'n oltilinchi tizimlik ranglar, belgilar kodlari va boshqalar uchun ishlatiladi, raqamlar `0..9` yoki `A..F` bo'lishi mumkin.
- **base = 2** asosan bitli operatsiyalarni koddagi nosozliklarni tuzatish uchun ishlatiladi, raqamlar `0` yoki `1` bo'lishi mumkin.
- **base = 36** - bu maksimal, raqamlar `0..9` yoki `A..Z` bo'lishi mumkin. Raqamni ko'rsatish uchun butun lotin alifbosi ishlatiladi. `36` ning ishlatish kulgili, ammo foydali holati shundaki, biz uzun raqamli identifikatorni qisqartirishga, masalan, qisqa urlni yaratishimizga kerak bo'ladi. Uni `36` bazasi bilan oddiygina raqamlar tizimida aks ettirishi mumkin:
=======
- **base=16** is used for hex colors, character encodings etc, digits can be `0..9` or `A..F`.
- **base=2** is mostly for debugging bitwise operations, digits can be `0` or `1`.
- **base=36** is the maximum, digits can be `0..9` or `A..Z`. The whole Latin alphabet is used to represent a number. A funny, but useful case for `36` is when we need to turn a long numeric identifier into something shorter, for example, to make a short url. Can simply represent it in the numeral system with base `36`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    ```js run
    alert( 123456..toString(36) ); // 2n9c
    ```

```warn header="Usulni chaqirish uchun ikkita nuqta"
Iltimos e'tibor bering, `123456..toString(36)` dagi ikkita nuqta matn terish xatosi emas. Agar biz yuqoridagi misolda `toString` kabi usulni to'g'ridan-to'g'ri raqamga chaqiruv qilmoqchi bo'lsak, unda biz undan keyin ikkita nuqta `..` qo'yishimiz kerak.

Agar bitta nuqta qo'ygan bo'lsak: `123456.toString(36)`, unda xato bo'lishi mumkin, chunki JavaScript sintaksisida birinchi nuqtadan keyingi o'nlik qismi nazarda tutilgan. Agar biz yana bitta nuqta qo'yadigan bo'lsak, JavaScript kasr qismi bo'sh ekanligini biladi va endi usulga o'tadi.

<<<<<<< HEAD
Shuningdek yozishi mumkin edi `(123456).toString(36)`.
=======
Also could write `(123456).toString(36)`.

>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

## Yaxlitlash

Raqamlar bilan ishlashda eng ko'p ishlatiladigan operatsiyalardan biri bu yaxlitlashdir.

Yaxlitlash uchun bir nechta o'rnatilgan funktsiyalar mavjud:

`Math.floor`
: Kichikroq yo'nalishda yaxlitlash: `3.1` `3` ga, `-1.1` esa `-2` ga aylanadi.

`Math.ceil`
: Katta yo'nalishda yaxlitlash: `3.1` `4`, va `-1.1` `-1` ga aylanadi.

`Math.round`
<<<<<<< HEAD
<<<<<<< HEAD
: Eng yaqin butun songa yaxlitlash: `3.1` `3`, `3.6` `4` va `-1.1` `-1` ga aylanadi.
=======
: Rounds to the nearest integer: `3.1` becomes `3`, `3.6` becomes `4`, the middle case: `3.5` rounds up to `4` too.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
: Rounds to the nearest integer: `3.1` becomes `3`, `3.6` becomes `4`. In the middle cases `3.5` rounds up to `4`, and `-3.5` rounds up to `-3`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

`Math.trunc` (Internet Explorer tomonidan qo'llab-quvvatlanmaydi)
: O'nli kasrdan keyin har qanday narsani yaxlitlashsiz olib tashlaydi: `3.1` `3`, `-1.1` `-1` ga aylanadi.

Ularning orasidagi farqlarni umumlashtirish uchun jadval:

|   | `Math.floor` | `Math.ceil` | `Math.round` | `Math.trunc` |
|---|---------|--------|---------|---------|
|`3.1`|  `3`    |   `4`  |    `3`  |   `3`   |
|`3.5`|  `3`    |   `4`  |    `4`  |   `3`   |
|`3.6`|  `3`    |   `4`  |    `4`  |   `3`   |
|`-1.1`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.5`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.6`|  `-2`    |   `-1`  |    `-2`  |   `-1`   |


Ushbu funktsiyalar raqamning o'nli qismi bilan ishlashning barcha mumkin bo'lgan usullarini o'z ichiga oladi. Ammo raqamni kasrdan keyin `n-chi` raqamiga aylantirmoqchi bo'lsak nima bo'ladi?

Masalan, bizda `1.2345` bor va uni faqat `1.23` ga teng qilib, ikkinchi kasrgacha yaxlatlashmohchimiz.

Buning ikki yo'li mavjud:

1. Ko'paytiring va bo'ling.

<<<<<<< HEAD
<<<<<<< HEAD
    Masalan, raqamni o'nli kasrdan keyingi 2-raqamga yaxlitlash uchun sonni `100` ga ko'paytiramiz, yaxlitlash funktsiyasini chaqiramiz va keyin uni qaytaramiz.
=======
    For example, to round the number to the 2nd digit after the decimal, we can multiply the number by `100` (or a bigger power of 10), call the rounding function and then divide it back.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
    For example, to round the number to the 2nd digit after the decimal, we can multiply the number by `100`, call the rounding function and then divide it back.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
    ```js run
    let num = 1.23456;

    alert( Math.round(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
    ```

2. [ToFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) usuli raqamni nuqtadan keyin `n` raqamgacha yaxlitlaydi va natijaning matn tasvirida qaytaradi.

    ```js run
    let num = 12.34;
    alert( num.toFixed(1) ); // "12.3"
    ```

    Bu `Math.round` ga o'xshash eng yaqin qiymatgacha yuqoriga yoki pastga yaxlitlanadi:

    ```js run
    let num = 12.36;
    alert( num.toFixed(1) ); // "12.4"
    ```

<<<<<<< HEAD
    Iltimos, `toFixed` natijasi matn ekanligini unutmang. Agar kasr qismi talab qilinganidan qisqa bo'lsa, nollar oxiririga qo'shiladi:
=======
    Please note that the result of `toFixed` is a string. If the decimal part is shorter than required, zeroes are appended to the end:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    ```js run
    let num = 12.34;
    alert( num.toFixed(5) ); // "12.34000", to'liq 5 ta raqamni hosil qilish uchun nollarni qo'shdi
    ```

<<<<<<< HEAD
    Uni unar plyus yoki `Number()` chaqiruvi yordamida raqamga aylantirishimiz mumkin: `+num.toFixed(5)`.
=======
    We can convert it to a number using the unary plus or a `Number()` call, e.g. write `+num.toFixed(5)`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Aniq hisob-kitoblar

<<<<<<< HEAD
<<<<<<< HEAD
Ichkarida raqam 64 bitli formatda namoyish etiladi [IEEE-754](http://en.wikipedia.org/wiki/IEEE_754-1985), shuning uchun raqamni saqlash uchun to'liq 64 bit mavjud: ulardan 52 tasi ishlatilgan raqamlarni saqlash uchun ularning 11 tasi o'nlik nuqtaning o'rnini saqlaydi (ular butun sonlar uchun nolga teng), 1 bit esa belgi uchun.
=======
Internally, a number is represented in 64-bit format [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision), so there are exactly 64 bits to store a number: 52 of them are used to store the digits, 11 of them store the position of the decimal point (they are zero for integer numbers), and 1 bit is for the sign.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Agar raqam juda katta bo'lsa, u 64-bitli xotirani to'ldiradi va potentsial cheksizlikni qaytaradi:
=======
Internally, a number is represented in 64-bit format [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754), so there are exactly 64 bits to store a number: 52 of them are used to store the digits, 11 of them store the position of the decimal point, and 1 bit is for the sign.

If a number is really huge, it may overflow the 64-bit storage and become a special numeric value `Infinity`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
alert( 1e500 ); // Cheksizlik
```

Biroz kamroq aniq bo'lishi mumkin, lekin tez-tez sodir bo'ladigan narsa, bu aniqlikni yo'qotishdir.

<<<<<<< HEAD
Ushbu (soxta!) sinovni ko'rib chiqing:
=======
Consider this (falsy!) equality test:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
alert( 0.1 + 0.2 == 0.3 ); // *!*false*/!*
```

To'g'ri, agar biz `0,1` va `0,2` ning yig'indisi `0,3` ga tengligini tekshirsak, `false` qaytariladi.

Ajabo! `0,3` bo'lmasa nima bo'ladi?

```js run
alert( 0.1 + 0.2 ); // 0.30000000000000004
```

<<<<<<< HEAD
<<<<<<< HEAD
Bu yerda noto'g'ri taqqoslashdan ko'ra ko'proq kelib chiqadigan oqibatlar mavjud. Tasavvur qiling, siz elektron xaridlar saytini qilyapsiz va mehmon o'z savatiga `$0.10` va `$0.20` tovarlarini kiritadi. Buyurtmaning umumiy qiymati `$0.30000000000000004` bo'ladi. Bu barchani hayratda qoldiradi.
=======
Ouch! There are more consequences than an incorrect comparison here. Imagine you're making an e-shopping site and the visitor puts `$0.10` and `$0.20` goods into their cart. The order total will be `$0.30000000000000004`. That would surprise anyone.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
Ouch! Imagine you're making an e-shopping site and the visitor puts `$0.10` and `$0.20` goods into their cart. The order total will be `$0.30000000000000004`. That would surprise anyone.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Lekin nima uchun bu sodir bo'ladi?

<<<<<<< HEAD
Raqam xotirada ikkilik shaklida, birliklar va nollar ketma-ketligida saqlanadi. Ammo o'nlik raqamli tizimda oddiy ko'rinadigan `0,1`, `0,2` kabi kasrlar aslida ikkilik shaklda tugamaydigan kasrlardir.
=======
A number is stored in memory in its binary form, a sequence of bits - ones and zeroes. But fractions like `0.1`, `0.2` that look simple in the decimal numeric system are actually unending fractions in their binary form.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

<<<<<<< HEAD
Boshqacha qilib aytganda, `0,1` nima ozi u? U son `1/10`, o'ndan biriga bo'linadi. O'nli raqamlar tizimida bunday raqamlar osongina ifodalanadi. Endi uni uchdan biriga taqqoslang: `1/3`. Bu `0.33333(3)` cheksiz kasrga aylanadi.
=======
```js run
alert(0.1.toString(2)); // 0.0001100110011001100110011001100110011001100110011001101
alert(0.2.toString(2)); // 0.001100110011001100110011001100110011001100110011001101
alert((0.1 + 0.2).toString(2)); // 0.0100110011001100110011001100110011001100110011001101
```

What is `0.1`? It is one divided by ten `1/10`, one-tenth. In the decimal numeral system, such numbers are easily representable. Compare it to one-third: `1/3`. It becomes an endless fraction `0.33333(3)`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Shunday qilib, `10` darajalari bo'yicha bo'linish o'nlik tizimda yaxshi ishlashi kafolatlangan, ammo `3` ga bo'linish emas. Xuddi shu sababga ko'ra, ikkilik raqamlar tizimida `2` darajalari bo'yicha bo'linish ishlashi kafolatlanadi, ammo `1/10` cheksiz ikkilik kasrga aylanadi.

Ikkilik tizim yordamida *aniq 0.1* yoki *aniq 0.2* ni saqlashning iloji yo'q, xuddi uchdan birini o'nlik kasr sifatida saqlashning imkoni yo'q.

<<<<<<< HEAD
IEEE-754 raqamli formati buni eng yaqin raqamga yaxlitlash orqali hal qiladi. Ushbu yaxlitlash qoidalari odatda "mayda aniqlik yo'qotilishi" ni ko'rishga imkon bermaydi, shuning uchun ularning soni `0,3` ga teng bo'ladi. Ammo ehtiyot bo'ling, yo'qotish hali ham mavjud.
=======
The numeric format IEEE-754 solves this by rounding to the nearest possible number. These rounding rules normally don't allow us to see that "tiny precision loss", but it exists.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Buni amalda ko'rishimiz mumkin:
```js run
alert( 0.1.toFixed(20) ); // 0.10000000000000000555
```

Va ikkita raqamni yig'sak, ularning "aniq yo'qotishlari" qo'shiladi.

Shuning uchun `0,1 + 0,2` aniq `0,3` emas.

```smart header="Faqat JavaScript emas"
Xuddi shu masala ko'plab boshqa dasturlash tillarida mavjud.

<<<<<<< HEAD
PHP, Java, C, Perl, Ruby bir xil natijani beradi, chunki ular bir xil raqamli formatga asoslangan.
=======
PHP, Java, C, Perl, and Ruby give exactly the same result, because they are based on the same numeric format.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

Muammoni chetlab o'tish mumkinmi? Albatta, eng ishonchli usul natijani [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) usuli yordamida yaxlitlashdir:

```js run
let sum = 0.1 + 0.2;
alert( sum.toFixed(2) ); // "0.30"
```

Iltimos, `toFixed` har doim qatorni qaytarishini unutmang. U kasrdan keyin 2 ta raqamga ega bo'lishini ta'minlaydi. Agar bizda elektron do'kon bo'lsa va `$0.30` ko'rsatilishi kerak bo'lsa, bu juda qulay. Boshqa holatlarda biz unary plyusidan foydalanib uni raqamga aylantirishimiz mumkin:

```js run
let sum = 0.1 + 0.2;
alert( +sum.toFixed(2) ); // 0.3
```

Shuningdek, biz raqamlarni butun songa aylantirish uchun 100 ga (yoki kattaroq songa) vaqtincha ko'paytira olamiz, hisob-kitoblarni bajaramiz va keyin qayta bo'lamiz. Keyinchalik, matematikani butun sonlar bilan bajarayotganda xato biroz kamayadi, lekin biz xatolarni bo'linishda hali ham topamiz:

```js run
alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
alert( (0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001
```

<<<<<<< HEAD
Shunday qilib, ko'paytma/bo'linish yondashuvi xatoni kamaytiradi, lekin uni butunlay yo'q qilmaydi.
=======
So, the multiply/divide approach reduces the error, but doesn't remove it totally.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ba'zan biz fraktsiyalardan umuman qochishga urinishimiz mumkin. Lekin, agar biz do'kon bilan ishlayotgan bo'lsak, unda narxlarni dollar o'rniga sentda saqlashimiz mumkin. Ammo 30% chegirma qo'llasak nima bo'ladi? Amalda, butunlay qochib ketadigan fraktsiyalar kamdan-kam hollarda qo'llaniladi. Zarur bo'lganda "dumlarni" kesish uchun ularni shunchaki yaxlitatlang.

````smart header="Qiziq narsa"
Buni ishlatib ko'ring:

```js run
// Salom! Men o'z-o'zini ko'paytiradigan raqamman!
alert( 9999999999999999 ); // ko'rsatadi 10000000000000000
```

Bu xuddi shu muammoga duch keladi: aniqlikni yo'qotish. Raqam uchun 64 bit mavjud, ularning 52 tasida raqamlarni saqlash uchun foydalanish mumkin, ammo bu yetarli emas. Shunday qilib, eng kichik raqamlar yo'qoladi.

JavaScript bunday hodisalarda xatolikni keltirib chiqarmaydi. Raqamni kerakli formatga moslashtirish uchun qo'lidan kelganicha harakat qiladi, ammo afsuski, bu format yetarli emas.
````

```smart header="Ikki nol"
Raqamlarning ichki tasvirlanishining yana bir kulgili natijasi bu ikkita nolning mavjudligidir: `0` va `-0`.

<<<<<<< HEAD
Buning sababi shundaki, belgi bitta bit bilan ko'rsatilgan, shuning uchun har bir raqam ijobiy yoki salbiy bo'lishi mumkin, shu jumladan nol.
=======
That's because a sign is represented by a single bit, so it can be set or not set for any number including a zero.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

<<<<<<< HEAD
Aksariyat hollarda bu xatti-harakatlar sezilmaydi, chunki JavaScript-dagi operatorlar ularni bir xil deb bilishadi.
=======
In most cases, the distinction is unnoticeable, because operators are suited to treat them as the same.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

<<<<<<< HEAD


## Testalr: isFinite va isNaN
=======
## Tests: isFinite and isNaN
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Ushbu ikkita maxsus son qiymatini eslaysizmi?

- `Infinity` (va `-Infinity`) har qanday narsadan kattaroq (kam) bo'lgan maxsus raqamli qiymatdir.
- `NaN` xatoni anglatadi.

Ular `number` turiga kiradi, ammo "normal" raqamlar emas, shuning uchun ularni tekshirish uchun maxsus funktsiyalar mavjud:

- `isNaN(value)` o'z argumentini raqamga o'zgartiradi va keyin uni `NaN` ekanligini tekshiradi:

    ```js run
    alert( isNaN(NaN) ); // true
    alert( isNaN("str") ); // true
    ```

<<<<<<< HEAD
    Ammo bu funktsiya bizga kerakmi? Biz shunchaki `=== NaN` taqqoslashdan foydalana olmaymizmi? Kechirasiz, lekin javob yo'q. `NaN` qiymati o'ziga xosdir, chunki u hech narsaga, shu jumladan o'ziga teng kelmaydi:
=======
    But do we need this function? Can't we just use the comparison `=== NaN`? Unfortunately not. The value `NaN` is unique in that it does not equal anything, including itself:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    ```js run
    alert( NaN === NaN ); // false
    ```

- `isFinite(value)` argumentini raqamga o'zgartiradi va agar u oddiy raqam bo'lsa, `true` ni qaytaradi, `NaN/Infinity/-Infinity` emas:

    ```js run
    alert( isFinite("15") ); // true
    alert( isFinite("str") ); // false, chunki maxsus qiymat: NaN
    alert( isFinite(Infinity) ); // false, chunki maxsus qiymat: Infinity
    ```

Ba'zan `isFinite` matn qiymatining oddiy son ekanligini tekshirish uchun ishlatiladi:


```js run
let num = +prompt("Raqam kiriting", '');

// Infinity, -Infinity yoki NaN kiritmasangiz to'g'ri bo'ladi
alert( isFinite(num) );
```

<<<<<<< HEAD
Iltimos, barcha raqam;o funktsiyalarda bo'sh yoki faqat bo'shliq matni `0` sifatida ko'rib chiqilishini unutmang. 

```smart header="`Object.is` bilan solishtiring"

<<<<<<< HEAD
`===` kabi qiymatlarni taqqoslaydigan, lekin ikkita chekka holatlar uchun ishonchli bo'lgan maxsus o'rnatilgan [Object.is](mdn:js/Object/is) usuli mavjud :

1. U `NaN` bilan ishlaydi: `Object.is(NaN, NaN) === true`, bu yaxshi narsa.
2. `0` va `-0` qiymatlari boshqacha: `Object.is(0, -0) === false`, kamdan-kam hollarda ahamiyatga ega, ammo bu qiymatlar texnik jihatdan boshqacha.
=======
There is a special built-in method [`Object.is`](mdn:js/Object/is) that compares values like `===`, but is more reliable for two edge cases:

1. It works with `NaN`: `Object.is(NaN, NaN) === true`, that's a good thing.
2. Values `0` and `-0` are different: `Object.is(0, -0) === false`, technically that's true, because internally the number has a sign bit that may be different even if all other bits are zeroes.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
Please note that an empty or a space-only string is treated as `0` in all numeric functions including `isFinite`.

````smart header="`Number.isNaN` and `Number.isFinite`"
[Number.isNaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) and [Number.isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite) methods are the more "strict" versions of `isNaN` and `isFinite` functions. They do not autoconvert their argument into a number, but check if it belongs to the `number` type instead.

- `Number.isNaN(value)` returns `true` if the argument belongs to the `number` type and it is `NaN`. In any other case, it returns `false`.

    ```js run
    alert( Number.isNaN(NaN) ); // true
    alert( Number.isNaN("str" / 2) ); // true

    // Note the difference:
    alert( Number.isNaN("str") ); // false, because "str" belongs to the string type, not the number type
    alert( isNaN("str") ); // true, because isNaN converts string "str" into a number and gets NaN as a result of this conversion
    ```

- `Number.isFinite(value)` returns `true` if the argument belongs to the `number` type and it is not `NaN/Infinity/-Infinity`. In any other case, it returns `false`.

    ```js run
    alert( Number.isFinite(123) ); // true
    alert( Number.isFinite(Infinity) ); // false
    alert( Number.isFinite(2 / 0) ); // false

    // Note the difference:
    alert( Number.isFinite("123") ); // false, because "123" belongs to the string type, not the number type
    alert( isFinite("123") ); // true, because isFinite converts string "123" into a number 123
    ```

In a way, `Number.isNaN` and `Number.isFinite` are simpler and more straightforward than `isNaN` and `isFinite` functions. In practice though, `isNaN` and `isFinite` are mostly used, as they're shorter to write.
````

```smart header="Comparison with `Object.is`"
There is a special built-in method `Object.is` that compares values like `===`, but is more reliable for two edge cases:

1. It works with `NaN`: `Object.is(NaN, NaN) === true`, that's a good thing.
2. Values `0` and `-0` are different: `Object.is(0, -0) === false`, technically that's correct because internally the number has a sign bit that may be different even if all other bits are zeroes.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Boshqa barcha holatlarda `Object.is(a, b)` `a === b` bilan bir xil.

<<<<<<< HEAD
Taqqoslashning bunday usuli ko'pincha JavaScript spetsifikatsiyasida qo'llaniladi. Ichki algoritm bir xil bo'lishi uchun ikkita qiymatni taqqoslash zarur bo'lganda, u `Object.is` dan foydalanadi (ichki sifatida [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)).
=======
We mention `Object.is` here, because it's often used in JavaScript specification. When an internal algorithm needs to compare two values for being exactly the same, it uses `Object.is` (internally called [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```


## parseInt va parseFloat

Plyus `+` yoki `Number()` yordamida raqamli konvertatsiya qilish qat'iydir. Agar qiymat aniq raqam bo'lmasa, u bajarilmaydi:

```js run
alert( +"100px" ); // NaN
```

Faqatgina istisno - bu matning boshidagi yoki oxiridagi bo'shliqlar, chunki ular e'tiborga olinmaydi.

<<<<<<< HEAD
Ammo real hayotda biz ko'pincha CSS-da `100px` yoki `12pt` kabi birliklarda qiymatlarga egamiz. Shuningdek, ko'plab mamlakatlarda valyuta belgisi summadan keyin keladi, shuning uchun bizda `19€` bor va bundan raqamli qiymat chiqarishni istaymiz.
=======
But in real life, we often have values in units, like `"100px"` or `"12pt"` in CSS. Also in many countries, the currency symbol goes after the amount, so we have `"19€"` and would like to extract a numeric value out of that.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

`parseInt` va `parseFloat` nima uchun kerak.

Ular qatorni qo'lidan kelguncha "o'qiydilar". Xato bo'lsa, yig'ilgan raqam qaytariladi. `parseInt` funktsiyasi butun sonni, `parseFloat` esa suzuvchi nuqta sonini qaytaradi:

```js run
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12, faqat butun sonli qismi qaytariladi
alert( parseFloat('12.3.4') ); // 12.3, ikkinchi nuqta o'qishni to'xtatadi
```

`parseInt/parseFloat` `NaN` ni qaytaradigan holatlar mavjud. Bu raqamlarni o'qib bo'lmaganda sodir bo'ladi:

```js run
alert( parseInt('a123') ); // NaN, birinchi belgi jarayonni to'xtatadi
```

````smart header="`parseInt(str, radix)` ning ikkinchi argumenti"
`parseInt()` funktsiya ixtiyoriy ikkinchi parametrga ega. Bu raqamlar tizimining asosini belgilaydi, shuning uchun `parseInt` oltita raqamlar qatorlarini, ikkilik raqamlarni va boshqalarni ajratib ko'rsatishi mumkin:

```js run
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255, 0x siz ham ishlaydi

alert( parseInt('2n9c', 36) ); // 123456
```
````

## Boshqa matematik funktsiyalar

JavaScript-da o'rnatilgan [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) obyekti mavjud bo'lib, unda matematik funktsiyalar va doimiylarning kichik kutubxonasi mavjud.

Bir nechta misollar:

`Math.random()`
<<<<<<< HEAD
: 0 dan 1 gacha bo'lgan tasodifiy sonni qaytaradi (1dan tashqari)
=======
: Returns a random number from 0 to 1 (not including 1).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

    ```js run
    alert( Math.random() ); // 0.1234567894322
    alert( Math.random() ); // 0.5435252343232
    alert( Math.random() ); // ... (har qanday tasodifiy raqamlar)
    ```

<<<<<<< HEAD
`Math.max(a, b, c...)` / `Math.min(a, b, c...)`
: Ko'rsatilgan argumentlarning eng katta/kichik sonini qaytaradi.
=======
`Math.max(a, b, c...)` and `Math.min(a, b, c...)`
: Returns the greatest and smallest from the arbitrary number of arguments.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    ```js run
    alert( Math.max(3, 5, -10, 0, 1) ); // 5
    alert( Math.min(1, 2) ); // 1
    ```

`Math.pow(n, power)`
<<<<<<< HEAD
: power darajasiga ko'tarilgan n raqamini qaytaradi
=======
: Returns `n` raised to the given power.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

    ```js run
    alert( Math.pow(2, 10) ); // 2 10 chi darajasida = 1024
    ```

<<<<<<< HEAD
`Math` da ko'proq funktsiyalar va doimiyliklar mavjud, jumladan trigonometriya, ularni [matematikaga oid hujjatlar](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) obyektida topishingiz mumkin.
=======
There are more functions and constants in `Math` object, including trigonometry, which you can find in the [docs for the Math object](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Xulosa

<<<<<<< HEAD
Katta raqamlarni yozish uchun:

- Raqamga nollar bilan `"e"' ni qo'shib qo'ying. Shunga o'xshash: `123e6` - bu `123`, 6 nol bilan.
- `"e"` dan keyin salbiy raqam raqamni 1 tomonidan belgilangan nol soniga bo'linadi. Misol uchun: 123e-6 bu 0.000123.
=======
To write numbers with many zeroes:

- Append `"e"` with the zeroes count to the number. Like: `123e6` is the same as `123` with 6 zeroes `123000000`.
- A negative number after `"e"` causes the number to be divided by 1 with given zeroes. E.g. `123e-6` means `0.000123` (`123` millionths).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Turli xil raqamli tizimlar uchun:

<<<<<<< HEAD
- Raqamlarni to'g'ridan-to'g'ri o'n oltilik(`0x`), sakkizli(`0o`) va ikkilik (`0b`) tizimlarda yozishi mumkin
- `parseInt(str, base)` har qanday sonli tizimdan butun son bilan ajratadi: `2 ≤ base ≤ 36`.
- `num.toString (base)` berilgan sonni sonlar tizimidagi matnga aylantiradi.
=======
- Can write numbers directly in hex (`0x`), octal (`0o`) and binary (`0b`) systems.
- `parseInt(str, base)` parses the string `str` into an integer in numeral system with given `base`, `2 ≤ base ≤ 36`.
- `num.toString(base)` converts a number to a string in the numeral system with the given `base`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

<<<<<<< HEAD
`12pt` va `100px` kabi qiymatlarni raqamga o'tkazish uchun:
=======
For regular number tests:

- `isNaN(value)` converts its argument to a number and then tests it for being `NaN`
- `Number.isNaN(value)` checks whether its argument belongs to the `number` type, and if so, tests it for being `NaN`
- `isFinite(value)` converts its argument to a number and then tests it for not being `NaN/Infinity/-Infinity`
- `Number.isFinite(value)` checks whether its argument belongs to the `number` type, and if so, tests it for not being `NaN/Infinity/-Infinity`

For converting values like `12pt` and `100px` to a number:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

- "Yumshoq" konvertatsiya qilish uchun `parseInt/parseFloat` dan foydalaning, bu satrdan raqamni o'qiydi va keyin xatodan oldin o'qishi mumkin bo'lgan qiymatni qaytaradi.

Fraktsiyalar uchun:

- `Math.floor`, `Math.ceil`, `Math.trunc`, `Math.round` yoki `num.toFixed(aniqlik)` yordamida yaxlitlash.
- Kasrlar bilan ishlashda aniqlikni yo'qotish borligini unutmang.

Ko'proq matematik funktsiyalar:

<<<<<<< HEAD
- Kerak bo'lganda [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) obyektiga qarang. Kutubxona juda kichik, ammo asosiy ehtiyojlarni qoplashi mumkin.
=======
- See the [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) object when you need them. The library is very small but can cover basic needs.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
