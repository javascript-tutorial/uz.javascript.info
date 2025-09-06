# Belgilar sinflari

Amaliy vazifani ko'rib chiqaylik -- bizda `"+7(903)-123-45-67"` kabi telefon raqami bor va uni toza raqamlarga aylantirmoqchimiz: `79031234567`.

Buning uchun biz raqam bo'lmagan hamma narsani topib, olib tashlashimiz mumkin. Belgilar sinflari bunga yordam beradi.

*Belgilar sinfi* - bu ma'lum to'plamdan istalgan belgiga mos keladigan maxsus belgi.

Boshidan, "raqam" sinfini ko'rib chiqaylik. U `pattern:\d` ko'rinishida yoziladi va "har qanday bitta raqam"ga mos keladi.

Masalan, telefon raqamidagi birinchi raqamni topaylik:

```js run
let str = "+7(903)-123-45-67";

let regexp = /\d/;

alert( str.match(regexp) ); // 7
```

`pattern:g` bayrog'isiz doimiy ifoda faqat birinchi moslikni qidiradi, ya'ni birinchi raqam `pattern:\d`.

Barcha raqamlarni topish uchun `pattern:g` bayrog'ini qo'shaylik:

```js run
let str = "+7(903)-123-45-67";

let regexp = /\d/g;

alert( str.match(regexp) ); // mosliklar massivi: 7,9,0,3,1,2,3,4,5,6,7

// ulardan faqat raqamli telefon raqami yasaylik:
alert( str.match(regexp).join('') ); // 79031234567
```

Bu raqamlar uchun belgilar sinfi edi. Boshqa belgilar sinflari ham mavjud.

Eng ko'p ishlatiladiganlar:

`pattern:\d` ("d" "digit"dan)
: Raqam: `0` dan `9` gacha belgi.

`pattern:\s` ("s" "space"dan)
: Bo'sh joy belgisi: bo'shliqlar, tablar `\t`, yangi qatorlar `\n` va `\v`, `\f`, `\r` kabi kam uchraydigan boshqa belgilarni o'z ichiga oladi.

`pattern:\w` ("w" "word"dan)
: "So'z" belgisi: lotin alifbosining harfi yoki raqam yoki pastki chiziq `_`. Lotin bo'lmagan harflar (masalan, kirill yoki hindi) `pattern:\w`ga tegishli emas.

Masalan, `pattern:\d\s\w` degani "raqam", keyin "bo'shliq belgisi", keyin "so'z belgisi", masalan `match:1 a`.

**Doimiy ifoda oddiy belgilar va belgilar sinflarini o'z ichiga olishi mumkin.**

Masalan, `pattern:CSS\d` `match:CSS` satriga undan keyin raqam bilan mos keladi:

```js run
let str = "Is there CSS4?";
let regexp = /CSS\d/

alert( str.match(regexp) ); // CSS4
```

Shuningdek, ko'plab belgilar sinflarini ishlatishimiz mumkin:

```js run
alert( "I love HTML5!".match(/\s\w\w\w\w\d/) ); // ' HTML5'
```

Moslik (har bir regexp belgilar sinfi tegishli natija belgisiga ega):

![](love-html5-classes.svg)

## Teskari sinflar

Har bir belgilar sinfi uchun bir xil harf bilan, lekin katta harfda yozilgan "teskari sinf" mavjud.

"Teskari" degani u boshqa barcha belgilarga mos keladi, masalan:

`pattern:\D`
: Raqam emas: `pattern:\d` dan tashqari har qanday belgi, masalan harf.

`pattern:\S`
: Bo'shliq emas: `pattern:\s` dan tashqari har qanday belgi, masalan harf.

`pattern:\W`
: So'z belgisi emas: `pattern:\w` dan tashqari hamma narsa, masalan lotin bo'lmagan harf yoki bo'shliq.

Bob boshida `subject:+7(903)-123-45-67` kabi satrdan faqat raqamli telefon raqami yasashni ko'rdik: barcha raqamlarni topib, ularni birlashtirdik.

```js run
let str = "+7(903)-123-45-67";

alert( str.match(/\d/g).join('') ); // 79031234567
```

Muqobil, qisqaroq yo'l - raqam bo'lmagan `pattern:\D` belgilarni topib, ularni satrdan olib tashlash:

```js run
let str = "+7(903)-123-45-67";

alert( str.replace(/\D/g, "") ); // 79031234567
```

## Nuqta "har qanday belgi"

Nuqta `pattern:.` - bu "yangi qatordan tashqari har qanday belgi"ga mos keladigan maxsus belgilar sinfi.

Masalan:

```js run
alert( "Z".match(/./) ); // Z
```

Yoki doimiy ifoda o'rtasida:

```js run
let regexp = /CS.4/;

alert( "CSS4".match(regexp) ); // CSS4
alert( "CS-4".match(regexp) ); // CS-4
alert( "CS 4".match(regexp) ); // CS 4 (bo'shliq ham belgi)
```

E'tibor bering, nuqta "har qanday belgi" degani, lekin "belgi yo'qligi" emas. Unga mos kelishi uchun belgi bo'lishi kerak:

```js run
alert( "CS4".match(/CS.4/) ); // null, moslik yo'q chunki nuqta uchun belgi yo'q
```

### "s" bayrog'i bilan tom ma'noda har qanday belgi

Sukut bo'yicha, nuqta yangi qator belgisi `\n`ga mos kelmaydi.

Masalan, `pattern:A.B` regexp `match:A`ga, keyin oralarda har qanday belgi bilan `match:B`ga mos keladi, yangi qator `\n` bundan mustasno:

```js run
alert( "A\nB".match(/A.B/) ); // null (moslik yo'q)
```

Nuqtaning tom ma'noda "har qanday belgi", yangi qator ham dahil, degani kerak bo'lgan ko'p holatlar mavjud.

`pattern:s` bayrog'i aynan shuni qiladi. Agar doimiy ifodada u bo'lsa, nuqta `pattern:.` tom ma'noda har qanday belgiga mos keladi:

```js run
alert( "A\nB".match(/A.B/s) ); // A\nB (moslik!)
```

````warn header="IE da qo'llab-quvvatlanmaydi"
`pattern:s` bayrog'i IE da qo'llab-quvvatlanmaydi.

Yaxshiyamki, hamma joyda ishlaydigan muqobil bor. Biz "har qanday belgi"ga mos kelish uchun `pattern:[\s\S]` kabi regexp ishlatishimiz mumkin (bu naqsh <info:regexp-character-sets-and-ranges> maqolasida ko'rib chiqiladi).

```js run
alert( "A\nB".match(/A[\s\S]B/) ); // A\nB (moslik!)
```

`pattern:[\s\S]` naqshi tom ma'noda: "bo'shliq belgisi YOKI bo'shliq belgisi emas". Boshqacha qilib aytganda, "hamma narsa". Biz `pattern:[\d\D]` kabi boshqa to'ldiruvchi sinflar juftligini ishlatishimiz mumkin, bu muhim emas. Yoki hatto `pattern:[^]` -- chunki bu hech narsadan tashqari har qanday belgiga mos kelish degani.

Shuningdek, bir xil naqshda har ikkala "nuqta" turini xohlasak, bu hiyladan foydalanishimiz mumkin: oddiy yo'l bilan ishlaydigan haqiqiy nuqta `pattern:.` ("yangi qatorni o'z ichiga olmaydi") va `pattern:[\s\S]` yoki shunga o'xshash bilan "har qanday belgi"ga mos kelish usuli.
````

````warn header="Bo'shliqlarga e'tibor bering"
Odatda biz bo'shliqlarga kam e'tibor beramiz. Biz uchun `subject:1-5` va `subject:1 - 5` satrlar deyarli bir xil.

Lekin agar doimiy ifoda bo'shliqlarni hisobga olmasa, u ishlamay qolishi mumkin.

Defis bilan ajratilgan raqamlarni topishga harakat qilaylik:

```js run
alert( "1 - 5".match(/\d-\d/) ); // null, moslik yo'q!
```

Doimiy ifodaga bo'shliqlar qo'shib `pattern:\d - \d` tuzataylik:

```js run
alert( "1 - 5".match(/\d - \d/) ); // 1 - 5, endi ishlaydi
// yoki \s sinfidan foydalanishimiz mumkin:
alert( "1 - 5".match(/\d\s-\s\d/) ); // 1 - 5, bu ham ishlaydi
```

**Bo'shliq - bu belgi. Boshqa har qanday belgi bilan teng ahamiyatga ega.**

Biz doimiy ifodadan bo'shliqlarni qo'sha yoki olib tashlay olmaymiz va uning bir xil ishlashini kutolmaymiz.

Boshqacha qilib aytganda, doimiy ifodada barcha belgilar muhim, bo'shliqlar ham.
````

## Xulosa

Quyidagi belgilar sinflari mavjud:

- `pattern:\d` -- raqamlar.
- `pattern:\D` -- raqam emas.
- `pattern:\s` -- bo'shliq belgilari, tablar, yangi qatorlar.
- `pattern:\S` -- `pattern:\s` dan tashqari hammasi.
- `pattern:\w` -- lotin harflari, raqamlar, pastki chiziq `'_'`.
- `pattern:\W` -- `pattern:\w` dan tashqari hammasi.
- `pattern:.` -- regexp `'s'` bayrog'i bilan har qanday belgi, aks holda yangi qator `\n` dan tashqari hamma.

...Lekin bu hammasi emas!

JavaScript satrlar uchun ishlatiladigan Unicode kodlash belgilar uchun ko'plab xususiyatlarni taqdim etadi, masalan: harf qaysi tilga tegishli (agar harf bo'lsa), tinish belgisimi va hokazo.

Biz bu xususiyatlar bo'yicha ham qidirishimiz mumkin. Bu `pattern:u` bayrog'ini talab qiladi, keyingi maqolada ko'rib chiqiladi.