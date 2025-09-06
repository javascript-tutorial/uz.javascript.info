# RegExp va String usullari

Ushbu maqolada biz regexplar bilan ishlaydigan turli usullarni chuqur ko'rib chiqamiz.

## str.match(regexp)

`str.match(regexp)` usuli `str` satrida `regexp` uchun mosliklarni topadi.

Uning 3 ta rejimi bor:

1. Agar `regexp` da `pattern:g` bayrog'i bo'lmasa, u birinchi moslikni tutuvchi guruhlar va `index` (moslik pozitsiyasi), `input` (kirish satri, `str` ga teng) xususiyatlari bilan massiv sifatida qaytaradi:

    ```js run
    let str = "Men JavaScriptni yaxshi ko'raman";

    let result = str.match(/Java(Script)/);

    alert( result[0] );     // JavaScript (to'liq moslik)
    alert( result[1] );     // Script (birinchi tutuvchi guruh)
    alert( result.length ); // 2

    // Qo'shimcha ma'lumot:
    alert( result.index );  // 4 (moslik pozitsiyasi)
    alert( result.input );  // Men JavaScriptni yaxshi ko'raman (manba satr)
    ```

2. Agar `regexp` da `pattern:g` bayrog'i bo'lsa, u barcha mosliklarni tutuvchi guruhlar va boshqa tafsilotlarsiz satrlar sifatida massiv qaytaradi.
    ```js run
    let str = "Men JavaScriptni yaxshi ko'raman";

    let result = str.match(/Java(Script)/g);

    alert( result[0] ); // JavaScript
    alert( result.length ); // 1
    ```

3. Agar mosliklar bo'lmasa, `pattern:g` bayrog'i bor yoki yo'qligidan qat'i nazar, `null` qaytariladi.

    Bu muhim nüans. Agar mosliklar bo'lmasa, biz bo'sh massiv emas, balki `null` olamiz. Buni unutish va xato qilish oson, masalan:

    ```js run
    let str = "Men JavaScriptni yaxshi ko'raman";

    let result = str.match(/HTML/);

    alert(result); // null
    alert(result.length); // Xato: Cannot read property 'length' of null
    ```

    Agar natija massiv bo'lishini istasak, quyidagicha yozishimiz mumkin:

    ```js
    let result = str.match(regexp) || [];
    ```

## str.matchAll(regexp)

[recent browser="new"]

`str.matchAll(regexp)` usuli `str.match` ning "yangilangan, yaxshilangan" variantidir.

U asosan barcha guruhlar bilan barcha mosliklarni qidirish uchun ishlatiladi.

`match` dan 3 ta farqi bor:

1. U massiv o'rniga mosliklar bilan takrorlanadigan obyekt qaytaradi. Biz undan `Array.from` yordamida oddiy massiv yasashimiz mumkin.
2. Har bir moslik tutuvchi guruhlar bilan massiv sifatida qaytariladi (`pattern:g` bayrog'isiz `str.match` bilan bir xil format).
3. Agar natijalar bo'lmasa, u `null` o'rniga bo'sh takrorlanadigan obyekt qaytaradi.

Foydalanish misoli:

```js run
let str = '<h1>Salom, dunyo!</h1>';
let regexp = /<(.*?)>/g;

let matchAll = str.matchAll(regexp);

alert(matchAll); // [object RegExp String Iterator], massiv emas, lekin takrorlanadigan

matchAll = Array.from(matchAll); // endi massiv

let firstMatch = matchAll[0];
alert( firstMatch[0] );  // <h1>
alert( firstMatch[1] );  // h1
alert( firstMatch.index );  // 0
alert( firstMatch.input );  // <h1>Salom, dunyo!</h1>
```

Agar biz `matchAll` mosliklarini aylanib chiqish uchun `for..of` dan foydalansak, endi `Array.from` kerak emas.

## str.split(regexp|substr, limit)

Satrni regexp (yoki pastki satr) ni ajratuvchi sifatida ishlatib bo'ladi.

Biz `split` ni satrlar bilan ishlatishimiz mumkin, masalan:

```js run
alert('12-34-56'.split('-')) // ['12', '34', '56'] massivi
```

Ammo biz muntazam ifoda bilan ham xuddi shunday bo'lishimiz mumkin:

```js run
alert('12, 34, 56'.split(/,\s*/)) // ['12', '34', '56'] massivi
```

## str.search(regexp)

`str.search(regexp)` usuli birinchi moslikning pozitsiyasini yoki topilmasa `-1` ni qaytaradi:

```js run
let str = "Siyoh tomchisi millionlarni o'ylantirishi mumkin";

alert( str.search( /siyoh/i ) ); // 0 (birinchi moslik pozitsiyasi)
```

**Muhim cheklov: `search` faqat birinchi moslikni topadi.**

Agar bizga keyingi mosliklar pozitsiyalari kerak bo'lsa, `str.matchAll(regexp)` bilan barchasini topish kabi boshqa vositalardan foydalanishimiz kerak.

## str.replace(str|regexp, str|func)

Bu qidirish va almashtirish uchun umumiy usul, eng foydalilaridan biri. Qidirish va almashtirish uchun universal vosita.

Biz uni regexplarsiz, pastki satrni qidirish va almashtirish uchun ishlatishimiz mumkin:

```js run
// defisni ikki nuqta bilan almashtirish
alert('12-34-56'.replace("-", ":")) // 12:34-56
```

Biroq, tuzoq bor.

**`replace` ning birinchi argumenti satr bo'lsa, u faqat birinchi moslikni almashtiradi.**

Buni yuqoridagi misolda ko'rishingiz mumkin: faqat birinchi `"-"` `":"` bilan almashtiriladi.

Barcha defislarni topish uchun biz `"-"` satrini emas, balki majburiy `pattern:g` bayrog'i bilan `pattern:/-/g` regexp dan foydalanishimiz kerak:

```js run
// barcha defislarni ikki nuqta bilan almashtirish
alert( '12-34-56'.replace( *!*/-/g*/!*, ":" ) )  // 12:34:56
```

Ikkinchi argument almashtirish satridir. Biz unda maxsus belgilardan foydalanishimiz mumkin:

| Belgilar | Almashtirish satridagi harakat |
|--------|--------|
|`$&`|butun moslikni qo'yadi|
|<code>$&#096;</code>|moslikdan oldingi satr qismini qo'yadi|
|`$'`|moslikdan keyingi satr qismini qo'yadi|
|`$n`|agar `n` 1-2 xonali raqam bo'lsa, n-chi tutuvchi guruh tarkibini qo'yadi, tafsilotlar uchun [](info:regexp-groups) ga qarang|
|`$<name>`|berilgan `name` ga ega qavslar tarkibini qo'yadi, tafsilotlar uchun [](info:regexp-groups) ga qarang|
|`$$`|`$` belgisini qo'yadi |

Masalan:

```js run
let str = "John Smith";

// ism va familiyani almashtirish
alert(str.replace(/(john) (smith)/i, '$2, $1')) // Smith, John
```

**"Aqlli" almashtirishlar talab qiladigan holatlar uchun ikkinchi argument funksiya bo'lishi mumkin.**

U har bir moslik uchun chaqiriladi va qaytarilgan qiymat almashtirish sifatida qo'yiladi.

Funksiya `func(match, p1, p2, ..., pn, offset, input, groups)` argumentlari bilan chaqiriladi:

1. `match` -- moslik,
2. `p1, p2, ..., pn` -- tutuvchi guruhlar tarkibi (agar mavjud bo'lsa),
3. `offset` -- moslik pozitsiyasi,
4. `input` -- manba satr,
5. `groups` -- nomlangan guruhlar bilan obyekt.

Agar regexpda qavslar bo'lmasa, faqat 3 ta argument bor: `func(str, offset, input)`.

Masalan, barcha mosliklarni katta harflarga o'tkazaylik:

```js run
let str = "html va css";

let result = str.replace(/html|css/gi, str => str.toUpperCase());

alert(result); // HTML va CSS
```

Har bir moslikni satrdagi pozitsiyasi bilan almashtirish:

```js run
alert("Ho-Ho-ho".replace(/ho/gi, (match, offset) => offset)); // 0-3-6
```

Quyidagi misolda ikkita qavs bor, shuning uchun almashtirish funksiyasi 5 ta argument bilan chaqiriladi: birinchisi to'liq moslik, keyin 2 ta qavs, va undan keyin (misolda ishlatilmagan) moslik pozitsiyasi va manba satr:

```js run
let str = "John Smith";

let result = str.replace(/(\w+) (\w+)/, (match, name, surname) => `${surname}, ${name}`);

alert(result); // Smith, John
```

Agar ko'p guruhlar bo'lsa, ularga kirish uchun qolgan parametrlardan foydalanish qulay:

```js run
let str = "John Smith";

let result = str.replace(/(\w+) (\w+)/, (...match) => `${match[2]}, ${match[1]}`);

alert(result); // Smith, John
```

Yoki agar biz nomlangan guruhlardan foydalansak, `groups` obyekti ular bilan har doim oxirgi bo'ladi, shuning uchun uni quyidagicha olishimiz mumkin:

```js run
let str = "John Smith";

let result = str.replace(/(?<name>\w+) (?<surname>\w+)/, (...match) => {
  let groups = match.pop();

  return `${groups.surname}, ${groups.name}`;
});

alert(result); // Smith, John
```

Funksiyadan foydalanish bizga yakuniy almashtirish kuchini beradi, chunki u moslik haqida barcha ma'lumotlarni oladi, tashqi o'zgaruvchilarga kirish imkoniga ega va hamma narsani qila oladi.

## str.replaceAll(str|regexp, str|func)

Bu usul asosan `str.replace` bilan bir xil, ikkita katta farq bilan:

1. Agar birinchi argument satr bo'lsa, u satrning *barcha takrorlanishlarini* almashtiradi, `replace` esa faqat *birinchi takrorlanishni* almashtiradi.
2. Agar birinchi argument `g` bayrog'isiz muntazam ifoda bo'lsa, xatolik bo'ladi. `g` bayrog'i bilan u `replace` kabi ishlaydi.

`replaceAll` ning asosiy foydalanish holati satrning barcha takrorlanishlarini almashtirish.

Masalan:

```js run
// barcha defislarni ikki nuqta bilan almashtirish
alert('12-34-56'.replaceAll("-", ":")) // 12:34:56
```

## regexp.exec(str)

`regexp.exec(str)` usuli `str` satrida `regexp` uchun moslik qaytaradi. Oldingi usullardan farqli o'laroq, u satrda emas, balki regexpda chaqiriladi.

U regexpda `pattern:g` bayrog'i bor-yo'qligiga qarab turlicha harakat qiladi.

Agar `pattern:g` bo'lmasa, `regexp.exec(str)` birinchi moslikni aniq `str.match(regexp)` kabi qaytaradi. Bu xatti-harakat yangi hech narsa keltirmaydi.

Ammo agar `pattern:g` bayrog'i bo'lsa:
- `regexp.exec(str)` ga chaqiruv birinchi moslikni qaytaradi va undan keyin pozitsiyani `regexp.lastIndex` xususiyatida saqlaydi.
- Keyingi bunday chaqiruv qidiruvni `regexp.lastIndex` pozitsiyasidan boshlaydi, keyingi moslikni qaytaradi va undan keyingi pozitsiyani `regexp.lastIndex` da saqlaydi.
- ...Va hokazo.
- Agar mosliklar bo'lmasa, `regexp.exec` `null` qaytaradi va `regexp.lastIndex` ni `0` ga qayta o'rnatadi.

Shunday qilib, takroriy chaqiruvlar joriy qidiruv pozitsiyasini kuzatib borish uchun `regexp.lastIndex` xususiyatidan foydalanib, barcha mosliklarni birin-ketin qaytaradi.

O'tmishda, `str.matchAll` usuli JavaScript ga qo'shilgunga qadar, `regexp.exec` chaqiruvlari guruhlar bilan barcha mosliklarni olish uchun tsiklda ishlatilgan:

```js run
let str = 'JavaScript haqida batafsil https://javascript.info da';
let regexp = /javascript/ig;

let result;

while (result = regexp.exec(str)) {
  alert( `${result[0]} ni ${result.index} pozitsiyasida topdi` );
  // JavaScript ni 0 pozitsiyasida topdi, keyin
  // javascript ni 32 pozitsiyasida topdi
}
```

Bu hozir ham ishlaydi, garchi yangi brauzerlar uchun `str.matchAll` odatda qulayroq.

**Biz `lastIndex` ni qo'lda o'rnatish orqali berilgan pozitsiyadan qidirish uchun `regexp.exec` dan foydalanishimiz mumkin.**

Masalan:

```js run
let str = 'Salom, dunyo!';

let regexp = /\w+/g; // "g" bayrog'isiz lastIndex xususiyati e'tiborga olinmaydi
regexp.lastIndex = 5; // 5-pozitsiyadan qidirish (verguldan)

alert( regexp.exec(str) ); // dunyo
```

Agar regexpda `pattern:y` bayrog'i bo'lsa, qidiruv aniq `regexp.lastIndex` pozitsiyasida amalga oshiriladi, undan uzoqroq emas.

Yuqoridagi misolda `pattern:g` bayrog'ini `pattern:y` bilan almashtiraylik. Mosliklar bo'lmaydi, chunki 5-pozitsiyada so'z yo'q:

```js run
let str = 'Salom, dunyo!';

let regexp = /\w+/y;
regexp.lastIndex = 5; // aniq 5-pozitsiyada qidirish

alert( regexp.exec(str) ); // null
```

Bu biz satrdan aniq pozitsiyada regexp bilan biror narsani "o'qishimiz" kerak bo'lgan holatlar uchun qulay, uzoqroq joyda emas.

## regexp.test(str)

`regexp.test(str)` usuli moslik qidiradi va u mavjudligiga qarab `true/false` qaytaradi.

Masalan:

```js run
let str = "Men JavaScriptni yaxshi ko'raman";

// bu ikki test bir xil
alert( *!*/yaxshi/i*/!*.test(str) ); // true
alert( str.search(*!*/yaxshi/i*/!*) != -1 ); // true
```

Salbiy javob bilan misol:

```js run
let str = "Bla-bla-bla";

alert( *!*/yaxshi/i*/!*.test(str) ); // false
alert( str.search(*!*/yaxshi/i*/!*) != -1 ); // false
```

Agar regexpda `pattern:g` bayrog'i bo'lsa, `regexp.test` `regexp.lastIndex` xususiyatidan qaraydi va bu xususiyatni yangilaydi, xuddi `regexp.exec` kabi.

Shuning uchun biz uni berilgan pozitsiyadan qidirish uchun ishlatishimiz mumkin:

```js run
let regexp = /yaxshi/gi;

let str = "Men JavaScriptni yaxshi ko'raman";

// 10-pozitsiyadan qidiruvni boshlash:
regexp.lastIndex = 10;
alert( regexp.test(str) ); // false (moslik yo'q)
```

````warn header="Turli manbalarda takroran sinovdan o'tkaziladigan bir xil global regexp muvaffaqiyatsiz bo'lishi mumkin"
Agar biz bir xil global regexpni turli kirishlarga qo'llasak, bu noto'g'ri natijaga olib kelishi mumkin, chunki `regexp.test` chaqiruvi `regexp.lastIndex` xususiyatini oldinga siljitadi, shuning uchun boshqa satrdagi qidiruv noldan boshqa pozitsiyadan boshlana oladi.

Masalan, bu yerda biz bir xil matnda `regexp.test` ni ikki marta chaqiramiz va ikkinchi marta muvaffaqiyatsiz bo'ladi:

```js run
let regexp = /javascript/g;  // (regexp hozirgina yaratildi: regexp.lastIndex=0)

alert( regexp.test("javascript") ); // true (regexp.lastIndex=10 endi)
alert( regexp.test("javascript") ); // false
```

Bu aniq `regexp.lastIndex` ikkinchi testda noldan farq qilgani uchun.

Buni hal qilish uchun har bir qidiruvdan oldin `regexp.lastIndex = 0` o'rnatishimiz mumkin. Yoki regexp usullarini chaqirish o'rniga `lastIndex` dan foydalanmaydigan `str.match/search/...` satr usullaridan foydalaning.
````