# Raqamlar

JavaScript-dagi barcha raqamlar 64 bitli formatda saqlanadi [IEEE-754](http://en.wikipedia.org/wiki/IEEE_754-1985), shuningdek "ikki aniqlikdagi suzuvchi nuqta raqamlari" deb nomlanadi.

Keling, ular haqida bilgan narsalarimizni qayta ko'rib chiqamiz va kengaytiramiz.

## Raqam yozishning boshqa usullari

1 milliardni yozishimiz kerakligini tasavvur qiling. Aniq usul:

```js
let billion = 1000000000;
```

Ammo hayotda biz odatda noldan iborat bo'lgan uzun matni yozishdan qochamiz, chunki uni xato yozish oson. Bundan tashqari, biz dangasamiz. Biz odatda `"1bn"` 1 milliardga yoki `"7.3bn"` ga 7 milliard 300 millionga yozamiz. Xuddi shu narsa ko'p sonli raqamlar uchun ham amal qiladi.

JavaScript-da, raqamga `"e"` harfini qo'shib, nol sonini ko'rsatib, raqamni qisqartiramiz:

```js run
let billion = 1e9;  // 1 milliard, so'zma-so'z: 1 va 9 nol

alert( 7.3e9 );  // 7.3 milliard (7,300,000,000)
```

Boshqacha qilib aytganda, `"e"` berilgan nollar soni bilan raqamni `1` ga ko'paytiradi.

```js
1e3 = 1 * 1000
1.23e6 = 1.23 * 1000000
```


Endi juda kichik bir narsa yozamiz. Aytaylik, 1 mikrosekund (soniyaning milliondan biri):

```js
let ms = 0.000001;
```

Oldingi kabi, `"e"` dan foydalanish yordam berishi mumkin. Agar biz nollarni aniq yozishdan qochishni istasak, shunday yozishimiz mumkin:

```js
let ms = 1e-6; // 1 dan chapga oltita nol
```

Agar `0.000001` dagi nollarni hisoblasak, ularning soni 6 taga teng. Tabiiyki, bu `1e-6`.  

Boshqacha qilib aytganda, `"e"` dan keyin salbiy son, berilgan nol soni bilan 1 ga bo'linishni anglatadi:

```js
// -3  3 ta nol bilan 1 ga bo'linadi
1e-3 = 1 / 1000 (=0.001)

// -6 6 ta nol bilan 1 ga bo'linadi
1.23e-6 = 1.23 / 1000000 (=0.00000123)
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

`base` `2` dan `36` gacha o'zgarishi mumkin. Odatiy bo'lib, bu `10`.

Buning uchun keng tarqalgan foydalanish holatlari:

- **base = 16** o'n oltilinchi tizimlik ranglar, belgilar kodlari va boshqalar uchun ishlatiladi, raqamlar `0..9` yoki `A..F` bo'lishi mumkin.
- **base = 2** asosan bitli operatsiyalarni koddagi nosozliklarni tuzatish uchun ishlatiladi, raqamlar `0` yoki `1` bo'lishi mumkin.
- **base = 36** - bu maksimal, raqamlar `0..9` yoki `A..Z` bo'lishi mumkin. Raqamni ko'rsatish uchun butun lotin alifbosi ishlatiladi. `36` ning ishlatish kulgili, ammo foydali holati shundaki, biz uzun raqamli identifikatorni qisqartirishga, masalan, qisqa urlni yaratishimizga kerak bo'ladi. Uni `36` bazasi bilan oddiygina raqamlar tizimida aks ettirishi mumkin:

    ```js run
    alert( 123456..toString(36) ); // 2n9c
    ```

```warn header="Usulni chaqirish uchun ikkita nuqta"
Iltimos e'tibor bering, `123456..toString(36)` dagi ikkita nuqta matn terish xatosi emas. Agar biz yuqoridagi misolda `toString` kabi usulni to'g'ridan-to'g'ri raqamga chaqiruv qilmoqchi bo'lsak, unda biz undan keyin ikkita nuqta `..` qo'yishimiz kerak.

Agar bitta nuqta qo'ygan bo'lsak: `123456.toString(36)`, unda xato bo'lishi mumkin, chunki JavaScript sintaksisida birinchi nuqtadan keyingi o'nlik qismi nazarda tutilgan. Agar biz yana bitta nuqta qo'yadigan bo'lsak, JavaScript kasr qismi bo'sh ekanligini biladi va endi usulga o'tadi.

Shuningdek yozishi mumkin edi `(123456).toString(36)`.
```

## Yaxlitlash

Raqamlar bilan ishlashda eng ko'p ishlatiladigan operatsiyalardan biri bu yaxlitlashdir.

Yaxlitlash uchun bir nechta o'rnatilgan funktsiyalar mavjud:

`Math.floor`
: Kichikroq yo'nalishda yaxlitlash: `3.1` `3` ga, `-1.1` esa `-2` ga aylanadi.

`Math.ceil`
: Katta yo'nalishda yaxlitlash: `3.1` `4`, va `-1.1` `-1` ga aylanadi.

`Math.round`
: Eng yaqin butun songa yaxlitlash: `3.1` `3`, `3.6` `4` va `-1.1` `-1` ga aylanadi.

`Math.trunc` (Internet Explorer tomonidan qo'llab-quvvatlanmaydi)
: O'nli kasrdan keyin har qanday narsani yaxlitlashsiz olib tashlaydi: `3.1` `3`, `-1.1` `-1` ga aylanadi.

Ularning orasidagi farqlarni umumlashtirish uchun jadval:

|   | `Math.floor` | `Math.ceil` | `Math.round` | `Math.trunc` |
|---|---------|--------|---------|---------|
|`3.1`|  `3`    |   `4`  |    `3`  |   `3`   |
|`3.6`|  `3`    |   `4`  |    `4`  |   `3`   |
|`-1.1`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.6`|  `-2`    |   `-1`  |    `-2`  |   `-1`   |


Ushbu funktsiyalar raqamning o'nli qismi bilan ishlashning barcha mumkin bo'lgan usullarini o'z ichiga oladi. Ammo raqamni kasrdan keyin `n-chi` raqamiga aylantirmoqchi bo'lsak nima bo'ladi?

Masalan, bizda `1.2345` bor va uni faqat `1.23` ga teng qilib, ikkinchi kasrgacha yaxlatlashmohchimiz.

Buning ikki yo'li mavjud:

1. Ko'paytiring va bo'ling.

    Masalan, raqamni o'nli kasrdan keyingi 2-raqamga yaxlitlash uchun sonni `100` ga ko'paytiramiz, yaxlitlash funktsiyasini chaqiramiz va keyin uni qaytaramiz.
    ```js run
    let num = 1.23456;

    alert( Math.floor(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
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

    Iltimos, `toFixed` natijasi matn ekanligini unutmang. Agar kasr qismi talab qilinganidan qisqa bo'lsa, nollar oxiririga qo'shiladi:

    ```js run
    let num = 12.34;
    alert( num.toFixed(5) ); // "12.34000", to'liq 5 ta raqamni hosil qilish uchun nollarni qo'shdi
    ```

    Uni unar plyus yoki `Number()` chaqiruvi yordamida raqamga aylantirishimiz mumkin: `+num.toFixed(5)`.

## Aniq hisob-kitoblar

Ichkarida raqam 64 bitli formatda namoyish etiladi [IEEE-754](http://en.wikipedia.org/wiki/IEEE_754-1985), shuning uchun raqamni saqlash uchun to'liq 64 bit mavjud: ulardan 52 tasi ishlatilgan raqamlarni saqlash uchun ularning 11 tasi o'nlik nuqtaning o'rnini saqlaydi (ular butun sonlar uchun nolga teng), 1 bit esa belgi uchun.

Agar raqam juda katta bo'lsa, u 64-bitli xotirani to'ldiradi va potentsial cheksizlikni qaytaradi:

```js run
alert( 1e500 ); // Cheksizlik
```

Biroz kamroq aniq bo'lishi mumkin, lekin tez-tez sodir bo'ladigan narsa, bu aniqlikni yo'qotishdir.

Ushbu (soxta!) sinovni ko'rib chiqing:

```js run
alert( 0.1 + 0.2 == 0.3 ); // *!*false*/!*
```

To'g'ri, agar biz `0,1` va `0,2` ning yig'indisi `0,3` ga tengligini tekshirsak, `false` qaytariladi.

Ajabo! `0,3` bo'lmasa nima bo'ladi?

```js run
alert( 0.1 + 0.2 ); // 0.30000000000000004
```

Bu yerda noto'g'ri taqqoslashdan ko'ra ko'proq kelib chiqadigan oqibatlar mavjud. Tasavvur qiling, siz elektron xaridlar saytini qilyapsiz va mehmon o'z savatiga `$0.10` va `$0.20` tovarlarini kiritadi. Buyurtmaning umumiy qiymati `$0.30000000000000004` bo'ladi. Bu barchani hayratda qoldiradi.

Lekin nima uchun bu sodir bo'ladi?

Raqam xotirada ikkilik shaklida, birliklar va nollar ketma-ketligida saqlanadi. Ammo o'nlik raqamli tizimda oddiy ko'rinadigan `0,1`, `0,2` kabi kasrlar aslida ikkilik shaklda tugamaydigan kasrlardir.

Boshqacha qilib aytganda, `0,1` nima ozi u? U son `1/10`, o'ndan biriga bo'linadi. O'nli raqamlar tizimida bunday raqamlar osongina ifodalanadi. Endi uni uchdan biriga taqqoslang: `1/3`. Bu `0.33333(3)` cheksiz kasrga aylanadi.

Shunday qilib, `10` darajalari bo'yicha bo'linish o'nlik tizimda yaxshi ishlashi kafolatlangan, ammo `3` ga bo'linish emas. Xuddi shu sababga ko'ra, ikkilik raqamlar tizimida `2` darajalari bo'yicha bo'linish ishlashi kafolatlanadi, ammo `1/10` cheksiz ikkilik kasrga aylanadi.

Ikkilik tizim yordamida *aniq 0.1* yoki *aniq 0.2* ni saqlashning iloji yo'q, xuddi uchdan birini o'nlik kasr sifatida saqlashning imkoni yo'q.

IEEE-754 raqamli formati buni eng yaqin raqamga yaxlitlash orqali hal qiladi. Ushbu yaxlitlash qoidalari odatda "mayda aniqlik yo'qotilishi" ni ko'rishga imkon bermaydi, shuning uchun ularning soni `0,3` ga teng bo'ladi. Ammo ehtiyot bo'ling, yo'qotish hali ham mavjud.

Buni amalda ko'rishimiz mumkin:
```js run
alert( 0.1.toFixed(20) ); // 0.10000000000000000555
```

Va ikkita raqamni yig'sak, ularning "aniq yo'qotishlari" qo'shiladi.

Shuning uchun `0,1 + 0,2` aniq `0,3` emas.

```smart header="Faqat JavaScript emas"
Xuddi shu masala ko'plab boshqa dasturlash tillarida mavjud.

PHP, Java, C, Perl, Ruby bir xil natijani beradi, chunki ular bir xil raqamli formatga asoslangan.
```

Muammoni chetlab o'tish mumkinmi? Albatta, eng ishonchli usul natijani [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) usuli yordamida yaxlitlashdir:

```js run
let sum = 0.1 + 0.2;
alert( sum.toFixed(2) ); // 0.30
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

Shunday qilib, ko'paytma/bo'linish yondashuvi xatoni kamaytiradi, lekin uni butunlay yo'q qilmaydi.

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

Buning sababi shundaki, belgi bitta bit bilan ko'rsatilgan, shuning uchun har bir raqam ijobiy yoki salbiy bo'lishi mumkin, shu jumladan nol.

Aksariyat hollarda bu xatti-harakatlar sezilmaydi, chunki JavaScript-dagi operatorlar ularni bir xil deb bilishadi.
```



## Testalr: isFinite va isNaN

Ushbu ikkita maxsus son qiymatini eslaysizmi?

- `Infinity` (va `-Infinity`) har qanday narsadan kattaroq (kam) bo'lgan maxsus raqamli qiymatdir.
- `NaN` xatoni anglatadi.

Ular `number` turiga kiradi, ammo "normal" raqamlar emas, shuning uchun ularni tekshirish uchun maxsus funktsiyalar mavjud:

- `isNaN(value)` o'z argumentini raqamga o'zgartiradi va keyin uni `NaN` ekanligini tekshiradi:

    ```js run
    alert( isNaN(NaN) ); // true
    alert( isNaN("str") ); // true
    ```

    Ammo bu funktsiya bizga kerakmi? Biz shunchaki `=== NaN` taqqoslashdan foydalana olmaymizmi? Kechirasiz, lekin javob yo'q. `NaN` qiymati o'ziga xosdir, chunki u hech narsaga, shu jumladan o'ziga teng kelmaydi:

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

Iltimos, barcha raqam;o funktsiyalarda bo'sh yoki faqat bo'shliq matni `0` sifatida ko'rib chiqilishini unutmang. 

```smart header="`Object.is` bilan solishtiring"

`===` kabi qiymatlarni taqqoslaydigan, lekin ikkita chekka holatlar uchun ishonchli bo'lgan maxsus o'rnatilgan [Object.is](mdn:js/Object/is) usuli mavjud :

1. U `NaN` bilan ishlaydi: `Object.is(NaN, NaN) === true`, bu yaxshi narsa.
2. `0` va `-0` qiymatlari boshqacha: `Object.is(0, -0) === false`, kamdan-kam hollarda ahamiyatga ega, ammo bu qiymatlar texnik jihatdan boshqacha.

Boshqa barcha holatlarda `Object.is(a, b)` `a === b` bilan bir xil.

Taqqoslashning bunday usuli ko'pincha JavaScript spetsifikatsiyasida qo'llaniladi. Ichki algoritm bir xil bo'lishi uchun ikkita qiymatni taqqoslash zarur bo'lganda, u `Object.is` dan foydalanadi (ichki sifatida [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)).
```


## parseInt va parseFloat

Plyus `+` yoki `Number()` yordamida raqamli konvertatsiya qilish qat'iydir. Agar qiymat aniq raqam bo'lmasa, u bajarilmaydi:

```js run
alert( +"100px" ); // NaN
```

Faqatgina istisno - bu matning boshidagi yoki oxiridagi bo'shliqlar, chunki ular e'tiborga olinmaydi.

Ammo real hayotda biz ko'pincha CSS-da `100px` yoki `12pt` kabi birliklarda qiymatlarga egamiz. Shuningdek, ko'plab mamlakatlarda valyuta belgisi summadan keyin keladi, shuning uchun bizda `19€` bor va bundan raqamli qiymat chiqarishni istaymiz.

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
: 0 dan 1 gacha bo'lgan tasodifiy sonni qaytaradi (1dan tashqari)

    ```js run
    alert( Math.random() ); // 0.1234567894322
    alert( Math.random() ); // 0.5435252343232
    alert( Math.random() ); // ... (har qanday tasodifiy raqamlar)
    ```

`Math.max(a, b, c...)` / `Math.min(a, b, c...)`
: Ko'rsatilgan argumentlarning eng katta/kichik sonini qaytaradi.

    ```js run
    alert( Math.max(3, 5, -10, 0, 1) ); // 5
    alert( Math.min(1, 2) ); // 1
    ```

`Math.pow(n, power)`
: power darajasiga ko'tarilgan n raqamini qaytaradi

    ```js run
    alert( Math.pow(2, 10) ); // 2 10 chi darajasida = 1024
    ```

`Math` da ko'proq funktsiyalar va doimiyliklar mavjud, jumladan trigonometriya, ularni [matematikaga oid hujjatlar](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) obyektida topishingiz mumkin.

## Xulosa

Katta raqamlarni yozish uchun:

- Raqamga nollar bilan `"e"' ni qo'shib qo'ying. Shunga o'xshash: `123e6` - bu `123`, 6 nol bilan.
- `"e"` dan keyin salbiy raqam raqamni 1 tomonidan belgilangan nol soniga bo'linadi. Misol uchun: 123e-6 bu 0.000123.

Turli xil raqamli tizimlar uchun:

- Raqamlarni to'g'ridan-to'g'ri o'n oltilik(`0x`), sakkizli(`0o`) va ikkilik (`0b`) tizimlarda yozishi mumkin
- `parseInt(str, base)` har qanday sonli tizimdan butun son bilan ajratadi: `2 ≤ base ≤ 36`.
- `num.toString (base)` berilgan sonni sonlar tizimidagi matnga aylantiradi.

`12pt` va `100px` kabi qiymatlarni raqamga o'tkazish uchun:

- "Yumshoq" konvertatsiya qilish uchun `parseInt/parseFloat` dan foydalaning, bu satrdan raqamni o'qiydi va keyin xatodan oldin o'qishi mumkin bo'lgan qiymatni qaytaradi.

Fraktsiyalar uchun:

- `Math.floor`, `Math.ceil`, `Math.trunc`, `Math.round` yoki `num.toFixed(aniqlik)` yordamida yaxlitlash.
- Kasrlar bilan ishlashda aniqlikni yo'qotish borligini unutmang.

Ko'proq matematik funktsiyalar:

- Kerak bo'lganda [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) obyektiga qarang. Kutubxona juda kichik, ammo asosiy ehtiyojlarni qoplashi mumkin.
