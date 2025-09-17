# Ushlash guruhlari

Naqshning bir qismi qavslar `pattern:(...)` ichiga olinishi mumkin. Bu "ushlash guruhi" deb ataladi.

Buning ikkita ta'siri bor:

1. Moslikning bir qismini natijalar massivida alohida element sifatida olish imkonini beradi.
2. Agar qavslardan keyin miqdorchi qo'ysak, u butun qavslar guruhi uchun qo'llaniladi.

## Misollar

Qavslar qanday ishlashini misollarda ko'raylik.

### Misol: gogogo

Qavslarsiz `pattern:go+` naqshi `subject:g` belgisini, keyin bir yoki ko'p marta takrorlangan `subject:o` ni bildiradi. Masalan, `match:goooo` yoki `match:gooooooooo`.

Qavslar belgilarni birlashtirib guruhlaydi, shuning uchun `pattern:(go)+` `match:go`, `match:gogo`, `match:gogogo` va hokazolarni bildiradi.

```js run
alert( 'Gogogo now!'.match(/(go)+/ig) ); // "Gogogo"
```

### Misol: domen

Keling, murakkabroq narsa yasaylik -- veb-sayt domenini qidiruvchi doimiy ifoda.

Masalan:

```
mail.com
users.mail.com
smith.users.mail.com
```

Ko'rib turganingizdek, domen takrorlanuvchi so'zlardan iborat, oxirgisidan tashqari har biridan keyin nuqta.

Doimiy ifodalarda bu `pattern:(\w+\.)+\w+`:

```js run
let regexp = /(\w+\.)+\w+/g;

alert( "site.com my.site.com".match(regexp) ); // site.com,my.site.com
```

Qidiruv ishlaydi, lekin naqsh tire bilan domenga mos kelmaydi, masalan `my-site.com`, chunki tire `pattern:\w` sinfiga tegishli emas.

Buni oxirgisidan tashqari har bir so'zda `pattern:\w` ni `pattern:[\w-]` bilan almashtirish orqali tuzatishimiz mumkin: `pattern:([\w-]+\.)+\w+`.

### Misol: email

Oldingi misolni kengaytirish mumkin. Unga asoslanib emaillar uchun doimiy ifoda yaratishimiz mumkin.

Email formati: `name@domain`. Har qanday so'z nom bo'lishi mumkin, tireler va nuqtalar ruxsat etiladi. Doimiy ifodalarda bu `pattern:[-.\w]+`.

Naqsh:

```js run
let regexp = /[-.\w]+@([\w-]+\.)+[\w-]+/g;

alert("my@mail.com @ his@site.com.uk".match(regexp)); // my@mail.com, his@site.com.uk
```

Bu regexp mukammal emas, lekin asosan ishlaydi va tasodifiy xatolarni tuzatishga yordam beradi. Email uchun yagona ishonchli tekshiruv faqat xat yuborish orqali amalga oshirilishi mumkin.

## Mosliklarda qavslar mazmuni

Qavslar chapdan o'ngga raqamlanadi. Qidiruv dvigateli ularning har birига mos kelgan mazmunni eslab qoladi va natijada olish imkonini beradi.

`str.match(regexp)` metodi, agar `regexp`da `g` bayrog'i bo'lmasa, birinchi moslikni qidiradi va uni massiv ko'rinishida qaytaradi:

1. `0` indeksida: to'liq moslik.
2. `1` indeksida: birinchi qavslar mazmuni.
3. `2` indeksida: ikkinchi qavslar mazmuni.
4. ...va hokazo...

Masalan, biz HTML teglarini `pattern:<.*?>` topmoqchimiz va ularni qayta ishlamoqchimiz. Teg mazmuni (burchaklar ichidagi narsa)ni alohida o'zgaruvchida bo'lishi qulay bo'lardi.

Ichki mazmunni qavslarga o'raylik: `pattern:<(.*?)>`.

Endi biz natijalar massivida ham butun teg `match:<h1>` ham uning mazmuni `match:h1` ni olamiz:

```js run
let str = '<h1>Hello, world!</h1>';

let tag = str.match(/<(.*?)>/);

alert( tag[0] ); // <h1>
alert( tag[1] ); // h1
```

### Ichki guruhlar

Qavslar ichma-ich bo'lishi mumkin. Bu holda raqamlash ham chapdan o'ngga boradi.

Masalan, `subject:<span class="my">` da tegni qidirishda bizni qiziqtirishi mumkin:

1. Butun teg mazmuni: `match:span class="my"`.
2. Teg nomi: `match:span`.
3. Teg atributlari: `match:class="my"`.

Ular uchun qavslar qo'shaylik: `pattern:<(([a-z]+)\s*([^>]*))>`.

Ular qanday raqamlanishi (chapdan o'ngga, ochuvchi qavs bo'yicha):

![](regexp-nested-groups-pattern.svg)

Amalda:

```js run
let str = '<span class="my">';

let regexp = /<(([a-z]+)\s*([^>]*))>/;

let result = str.match(regexp);
alert(result[0]); // <span class="my">
alert(result[1]); // span class="my"
alert(result[2]); // span
alert(result[3]); // class="my"
```

`result` ning nol indeksi har doim to'liq moslikni saqlaydi.

Keyin chapdan o'ngga ochuvchi qavs bo'yicha raqamlangan guruhlar. Birinchi guruh `result[1]` sifatida qaytariladi. Bu yerda u butun teg mazmunini o'rab oladi.

Keyin `result[2]` da ikkinchi ochuvchi qavs `pattern:([a-z]+)` dan guruh - teg nomi, keyin `result[3]` da teg: `pattern:([^>]*)`.

Satrdagi har bir guruh mazmuni:

![](regexp-nested-groups-matches.svg)

### Ixtiyoriy guruhlar

Agar guruh ixtiyoriy bo'lsa va moslikda mavjud bo'lmasa (masalan, `pattern:(...)?` miqdorchisiga ega), tegishli `result` massiv elementi mavjud va `undefined` ga teng.

Masalan, `pattern:a(z)?(c)?` regexpni ko'rib chiqaylik. U `"a"` ni, ixtiyoriy ravishda `"z"` keyin, ixtiyoriy ravishda `"c"` keyin qidiradi.

Agar uni bitta harf `subject:a` bilan satrda ishga tushirsak, natija:

```js run
let match = 'a'.match(/a(z)?(c)?/);

alert( match.length ); // 3
alert( match[0] ); // a (to'liq moslik)
alert( match[1] ); // undefined
alert( match[2] ); // undefined
```

Massiv uzunligi `3`, lekin barcha guruhlar bo'sh.

Va `subject:ac` satr uchun murakkabroq moslik:

```js run
let match = 'ac'.match(/a(z)?(c)?/)

alert( match.length ); // 3
alert( match[0] ); // ac (to'liq moslik)
alert( match[1] ); // undefined, chunki (z)? uchun hech narsa yo'q
alert( match[2] ); // c
```

Massiv uzunligi doimiy: `3`. Lekin `pattern:(z)?` guruhi uchun hech narsa yo'q, shuning uchun natija `["ac", undefined, "c"]`.

## Guruhlar bilan barcha mosliklarni qidirish: matchAll

```warn header="`matchAll` yangi metod, polyfill kerak bo'lishi mumkin"
`matchAll` metodi eski brauzerlarda qo'llab-quvvatlanmaydi.

Polyfill kerak bo'lishi mumkin, masalan <https://github.com/ljharb/String.prototype.matchAll>.
```

Barcha mosliklarni qidirishda (`pattern:g` bayrog'i), `match` metodi guruhlar uchun mazmunni qaytarmaydi.

Masalan, satrdagi barcha teglarni topaylik:

```js run
let str = '<h1> <h2>';

let tags = str.match(/<(.*?)>/g);

alert( tags ); // <h1>,<h2>
```

Natija mosliklar massivi, lekin ularning har biri haqida tafsilot yo'q. Lekin amalda biz odatda natijada ushlash guruhlarining mazmuniga muhtojmiz.

Ularni olish uchun `str.matchAll(regexp)` metodidan foydalanishimiz kerak.

U JavaScript tiliga `match`dan ancha keyin, uning "yangi va yaxshilangan versiyasi" sifatida qo'shildi.

`match` kabi u mosliklarni qidiradi, lekin 3 ta farq bor:

1. U massiv emas, balki iteratsiya qilinadigan obyekt qaytaradi.
2. `pattern:g` bayrog'i mavjud bo'lganda, u har bir moslikni guruhlar bilan massiv sifatida qaytaradi.
3. Agar moslik bo'lmasa, `null` emas, balki bo'sh iteratsiya qilinadigan obyekt qaytaradi.

Masalan:

```js run
let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

// results - massiv emas, balki iteratsiya qilinadigan obyekt
alert(results); // [object RegExp String Iterator]

alert(results[0]); // undefined (*)

results = Array.from(results); // uni massivga aylantiraylik

alert(results[0]); // <h1>,h1 (1-teg)
alert(results[1]); // <h2>,h2 (2-teg)
```

Ko'rib turganingizdek, birinchi farq juda muhim, `(*)` satrida ko'rsatilganidek. Biz moslikni `results[0]` sifatida ola olmaymiz, chunki bu obyekt psevdo-massiv emas. Uni `Array.from` yordamida haqiqiy `Array` ga aylantirish mumkin. Psevdo-massivlar va iteratsiya qilinadigan obyektlar haqida ko'proq ma'lumot <info:iterable> maqolasida.

Agar natijalarni aylantirayotgan bo'lsak, `Array.from` ga ehtiyoj yo'q:

```js run
let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

for(let result of results) {
  alert(result);
  // birinchi alert: <h1>,h1
  // ikkinchi: <h2>,h2
}
```

...Yoki destrukturizatsiya yordamida:

```js
let [tag1, tag2] = '<h1> <h2>'.matchAll(/<(.*?)>/gi);
```

`matchAll` tomonidan qaytarilgan har bir moslik `pattern:g` bayrog'isiz `match` tomonidan qaytarilgan format bilan bir xil: bu qo'shimcha `index` (satrdagi moslik indeksi) va `input` (manba satr) xususiyatlari bilan massiv:

```js run
let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

let [tag1, tag2] = results;

alert( tag1[0] ); // <h1>
alert( tag1[1] ); // h1
alert( tag1.index ); // 0
alert( tag1.input ); // <h1> <h2>
```

```smart header="Nima uchun `matchAll` natijasi massiv emas, balki iteratsiya qilinadigan obyekt?"
Metod nima uchun shunday yaratilgan? Sabab oddiy - optimallashtirish uchun.

`matchAll` ga chaqiruv qidiruvni amalga oshirmaydi. Buning o'rniga u dastlab natijalarsiz iteratsiya qilinadigan obyekt qaytaradi. Qidiruv har safar ustidan iteratsiya qilganimizda amalga oshiriladi, masalan tsiklda.

Shunday qilib, kerak bo'lgandan ko'p emas, balki kerak bo'lganicha natijalar topiladi.

Masalan, matnda potensial 100 ta moslik bor, lekin `for..of` tsiklida ulardan 5 tasini topdik, keyin bu yetarli deb qaror qilib `break` qildik. Keyin dvigatel qolgan 95 ta moslikni topishga vaqt sarflamaydi.
```

## Nomlangan guruhlar

Guruhlarni raqamlari bo'yicha eslash qiyin. Oddiy naqshlar uchun bu mumkin, lekin murakkabroqlari uchun qavslarni sanash noqulay. Bizda ancha yaxshi variant bor: qavslarga nom berish.

Bu ochuvchi qavsdan keyin darhol `pattern:?<name>` qo'yish orqali amalga oshiriladi.

Masalan, "yil-oy-kun" formatida sanani qidiraylik:

```js run
*!*
let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
*/!*
let str = "2019-04-30";

let groups = str.match(dateRegexp).groups;

alert(groups.year); // 2019
alert(groups.month); // 04
alert(groups.day); // 30
```

Ko'rib turganingizdek, guruhlar moslikning `.groups` xususiyatida joylashgan.

Barcha sanalarni qidirish uchun `pattern:g` bayrog'ini qo'shishimiz mumkin.

Shuningdek, guruhlar bilan birga to'liq mosliklarni olish uchun `matchAll` kerak bo'ladi:

```js run
let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;

let str = "2019-10-30 2020-01-01";

let results = str.matchAll(dateRegexp);

for(let result of results) {
  let {year, month, day} = result.groups;

  alert(`${day}.${month}.${year}`);
  // birinchi alert: 30.10.2019
  // ikkinchi: 01.01.2020
}
```

## Almashtirishda ushlash guruhlari

`str` dagi `regexp` bilan barcha mosliklarni `replacement` bilan almashtiradigan `str.replace(regexp, replacement)` metodi `replacement` satrida qavslar mazmunidan foydalanish imkonini beradi. Bu `pattern:$n` yordamida amalga oshiriladi, bu yerda `pattern:n` - guruh raqami.

Masalan,

```js run
let str = "John Bull";
let regexp = /(\w+) (\w+)/;

alert( str.replace(regexp, '$2, $1') ); // Bull, John
```

Nomlangan qavslar uchun havola `pattern:$<name>` bo'ladi.

Masalan, sanalarni "yil-oy-kun"dan "kun.oy.yil"ga qayta formatlaylik:

```js run
let regexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;

let str = "2019-10-30, 2020-01-01";

alert( str.replace(regexp, '$<day>.$<month>.$<year>') );
// 30.10.2019, 01.01.2020
```

## ?: bilan ushlamaydigan guruhlar

Ba'zan miqdorchini to'g'ri qo'llash uchun qavslar kerak, lekin natijalarda ularning mazmuni kerak emas.

Guruhni boshiga `pattern:?:` qo'shish orqali chiqarib tashlash mumkin.

Masalan, agar biz `pattern:(go)+` ni topmoqchi bo'lsak, lekin qavslar mazmuni (`go`) ni massivning alohida elementi sifatida istamасak, yoza olamiz: `pattern:(?:go)+`.

Quyidagi misolda biz faqat `match:John` nomini moslikning alohida a'zosi sifatida olamiz:

```js run
let str = "Gogogo John!";

*!*
// ?: 'go' ni ushlashdan chiqarib tashlaydi
let regexp = /(?:go)+ (\w+)/i;
*/!*

let result = str.match(regexp);

alert( result[0] ); // Gogogo John (to'liq moslik)
alert( result[1] ); // John
alert( result.length ); // 2 (massivda boshqa elementlar yo'q)
```

## Xulosa

Qavslar doimiy ifodaning bir qismini birlashtirib guruhlaydi, shunda miqdorchi unga butunlay qo'llaniladi.

Qavslar guruhlari chapdan o'ngga raqamlanadi va ixtiyoriy ravishda `(?<name>...)` bilan nomlanishi mumkin.

Guruh tomonidan moslashtirilgan mazmunni natijalarda olish mumkin:

- `str.match` metodi faqat `pattern:g` bayrog'isiz ushlash guruhlarini qaytaradi.
- `str.matchAll` metodi har doim ushlash guruhlarini qaytaradi.

Agar qavslarning nomi bo'lmasa, ularning mazmuni moslik massivida raqami bo'yicha mavjud. Nomlangan qavslar `groups` xususiyatida ham mavjud.

Shuningdek, `str.replace` da almashtirish satrida qavslar mazmunidan foydalanishimiz mumkin: raqam `$n` yoki nom `$<name>` bo'yicha.

Guruhni boshiga `pattern:?:` qo'shish orqali raqamlashdan chiqarib tashlash mumkin. Bu butun guruhga miqdorchi qo'llashimiz kerak bo'lganda, lekin uni natijalar massivida alohida element sifatida istamaganimizda ishlatiladi. Shuningdek, bunday qavslarni almashtirish satrida ham ishlatib bo'lmaydi.