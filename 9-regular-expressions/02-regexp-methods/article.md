# RegExp va String usullari

Doimiy ifodalar bilan ishlashning ikkita usuli mavjud.

1. Birinchidan, doimiy ifodalar o'rnatilgan [RegExp](mdn:js/RegExp) klass obyekti bo'lib, u ko'plab usullarni taqdim etadi.
2. Bundan tashqari, muntazam matnlarda regexps bilan ishlashning usullari mavjud.


## Retseptlar

Qaysi usulni ishlatish biz nima qilishni xohlaganimizga bog'liq.

Usullarni hayotiy vazifalarda foydalanishlari bilan ajratib turadigan bo'lsak, usullarni tushunish ancha osonlashadi.

Shunday qilib, bu yerda umumiy retseptlar, ta'qib qilish kerak bo'lgan tafsilotlar:

**Barcha mosliklarni qidirish uchun:**

Regexp `g` bayrog'idan foydalaning va:
- Yassi mosliklar massivini oling -- `str.match(reg)`
- Tafsilotlar bilan mosliklar massivini oling -- `str.matchAll(reg)`.

**Faqat birinchi moslikni qidirish uchun:**
- Birinchi moslikni to'liq oling -- `str.match(reg)` (`g` bayrog'isiz).
- Birinchi moslikning matn holatini oling -- `str.search(reg)`.
- Mos keladimi yoki yo'qligini tekshirib ko'ring -- `regexp.test(str)`.
- Berilgan pozitsiyadan moslikni toping -- `regexp.exec(str)` (`regexp.lastIndex` pozitsiyaga belgilang).

**Barcha mosliklarni almashtirish uchun:**
- Boshqa matn yoki funktsiya natijasi bilan almashtiring -- `str.replace(reg, str|func)`

**Matnni ajratuvchi bilan ajratish uchun:**
- `str.split(str|reg)`

Endi har bir usul haqida batafsil ma'lumot olish uchun ushbu bobni o'qishni davom ettirishingiz mumkin... Ammo agar siz birinchi marta o'qiyotgan bo'lsangiz, unda regexps haqida ko'proq bilmoqchisiz. Shunday qilib, siz keyingi bobga o'tishingiz mumkin, keyin biron bir usul haqida noaniqlik bo'lsa, bu yerga qaytib keling.

## str.search(reg)

Ushbu usulni biz allaqachon ko'rganmiz. Birinchi moslikning positsiyasini yoki agar topilmasa, `-1` qiymatini qaytaradi:

```js run
let str = "A drop of ink may make a million think";

alert( str.search( *!*/a/i*/!* ) ); // 0 (birinchi moslik nol holatida)
```

**Muhim cheklov: `search` faqat birinchi moslikni topadi.**

Keyingi mosliklarni `search` yordamida topa olmayapmiz, buning uchun sintaksis mavjud emas. Ammo bunga qodir bo'lgan boshqa usullar mavjud.

## str.match(reg), "g" bayrog'i yo'q

`Str.match` ning xatti-harakatlari, `reg` ning `g` bayrog'iga ega yoki yo'qligiga qarab o'zgaradi.

Birinchidan, agar `g` bayrog'i bo'lmasa, `str.match(reg)` faqat birinchi moslikni qidiradi.

Natijada mos keladigan va qo'shimcha xususiyatlarga ega bo'lgan massiv olinadi:

- `index` -- matnning ichidagi moslik holati,
- `input` -- mavzu matni.

Masalan:

```js run
let str = "Fame is the thirst of youth";

let result = str.match( *!*/fame/i*/!* );

alert( result[0] );    // Fame (moslik)
alert( result.index ); // 0 (birinchi moslik nol holatida)
alert( result.input ); // "Fame is the thirst of youth" (matn)
```

Moslik natijasi bir nechta elementga ega bo'lishi mumkin.

**Agar naqshning bir qismi `(...)` qavslar bilan chegaralangan bo'lsa, u holda u massivning alohida elementiga aylanadi.**

Agar qavslar boshida `(?<name>...)` deb nomlangan bo'lsa, unda `result.groups[name]` tarkibga ega. Buni keyinchalik [guruhlar haqida](info:regexp-groups) bobida ko'ramiz.

Masalan:

```js run
let str = "JavaScript is a programming language";

let result = str.match( *!*/JAVA(SCRIPT)/i*/!* );

alert( result[0] ); // JavaScript (to'liq moslik)
alert( result[1] ); // script (moslikning qavsga to'g'ri keladigan qismi)
alert( result.index ); // 0
alert( result.input ); // JavaScript is a programming language
```

`i` bayrog'i tufayli qidirish harfga sezgir emas, shuning uchun u `match:JavaScript` ni topadi. Moslikning `pattern:SCRIPT` ga mos keladigan qismi alohida massiv elementiga aylanadi.

Shunday qilib, ushbu usul barcha tafsilotlar bilan bitta to'liq moslikni topish uchun ishlatiladi.


## str.match(reg) "g" bayrog'i bilan

Agar `g` bayrog'i bo'lsa, `str.match` barcha mosliklar massivini qaytaradi. Ushbu massivda qo'shimcha xususiyatlar mavjud emas va qavslar hech qanday element yaratmaydi.

Masalan:

```js run
let str = "HO-Ho-ho!";

let result = str.match( *!*/ho/ig*/!* );

alert( result ); // HO, Ho, ho (3 ta mosliklar massivi, harf katta-kichikligiga sezgir emas)
```

Qavslar hech narsani o'zgartirmaydi:

```js run
let str = "HO-Ho-ho!";

let result = str.match( *!*/h(o)/ig*/!* );

alert( result ); // HO, Ho, ho
```

**Shunday qilib, `g` bayrog'i `str.match` bilan barcha mosliklarning oddiy massivni tafsilotlarsiz qaytaradi.**

Agar biz moslik holati va qavs ichidagi narsalar haqida ma'lumot olishni istasak, unda quyida keltirilgan `matchAll` usulidan foydalanishimiz kerak.

````warn header="Agar moslik bo'masa, `str.match` `null` qiymatini qaytaradi"
Iltimos, e'tibor bering, bu muhim. Agar moslik bo'lmasa, natija bo'sh massiv emas, balki null bo'ladi.

Bunday tuzoqlardan qochish uchun buni yodda saqlang:

```js run
let str = "Hey-hey-hey!";

alert( str.match(/Z/g).length ); // Error: Cannot read property 'length' of null
```

Bu yerda `str.match(/Z/g)` `null`, uning `length` xususiyati yo'q.
````

## str.matchAll(regexp)

`str.matchAll(regexp)` usuli barcha mosliklarni barcha tafsilotlar bilan topish uchun ishlatiladi.

Misol uchun:

```js run
let str = "Javascript or JavaScript? Should we uppercase 'S'?";

let result = str.matchAll( *!*/java(script)/ig*/!* );

let [match1, match2] = result;

alert( match1[0] ); // Javascript (to'liq moslik)
alert( match1[1] ); // script (moslikning qavsga to'g'ri keladigan qismi)
alert( match1.index ); // 0
alert( match1.input ); // = str (to'liq original matn)

alert( match2[0] ); // JavaScript (to'liq moslik)
alert( match2[1] ); // Script (moslikning qavsga to'g'ri keladigan qismi)
alert( match2.index ); // 14
alert( match2.input ); // = str (to'liq original matn)
```

````warn header="`matchAll` massivni emas, balki ketma-ket saraluvchanni qaytaradi"
Masalan, agar biz birinchi moslikni indeks bo'yicha olishga harakat qilsak, u ishlamaydi:

```js run
let str = "Javascript or JavaScript??";

let result = str.matchAll( /javascript/ig );

*!*
alert(result[0]); // undefined (?! bu yerda bo'lishi kerak)
*/!*
```

Sababi shundaki, ketma-ket saraluvchan massiv emas. Unda `Array.from(result)` -ni ishga tushirishimiz yoki mosliklarni olish uchun `for..of` tsiklidan foydalanishimiz kerak.

Amalda, agar bizga barcha mosliklar kerak bo'lsa, unda `for..of` ishlaydi, shuning uchun bu muammo emas.

Va faqat bir nechta moslik olish uchun biz destrukturadan foydalanishimiz mumkin:

```js run
let str = "Javascript or JavaScript??";

*!*
let [firstMatch] = str.matchAll( /javascript/ig );
*/!*

alert(firstMatch); // Javascript
```
````

```warn header="`matchAll` juda yangi, polifillar kerak bo'lishi mumkin"
Usul eski brauzerlarda ishlamasligi mumkin. Polifillar kerak bo'lishi mumkin (bu sayt core-js dan foydalanadi).

Yoki quyida tushuntirilgan "regexp.exec" bilan tsiklashingiz mumkin.
```

## str.split(regexp|substr, limit)

Ajratuvchi sifatida regexp (yoki pastki matn) yordamida matnni ajratadi.

Biz allaqachon `split` ni quyidagi matnlar bilan ishlatganmiz:

```js run
alert('12-34-56'.split('-')) // array of [12, 34, 56]
```

Ammo biz xuddi shu tarzda odatiy ifoda bilan bo'linishimiz mumkin:

```js run
alert('12-34-56'.split(/-/)) // array of [12, 34, 56]
```

## str.replace(str|reg, str|func)

Bu qidirish va almashtirishning eng foydali usullardan biri bo'lgan umumiy usuli. Qidiruv va almashtirish uchun Shveytsariya armiyasining pichog'i.

Substringni qidirish va almashtirish uchun biz uni regexpssiz ishlatishimiz mumkin:

```js run
// chiziqni ikki nuqta bilan almashtirish
alert('12-34-56'.replace("-", ":")) // 12:34-56
```

Ammo bu yerda biron bir tuzoq bor.

**Agar `replace` ning birinchi argumenti matn bo'lsa, u faqat birinchi moslikni qidiradi.**

Buni yuqoridagi misolda ko'rishingiz mumkin: faqat birinchi `"-"` o'rniga `":"` o'rnatildi.

Barcha chiziqlarni topish uchun biz `"-"` matnni emas, balki regexp `pattern:/-/g`, majburiy `g` bayrog'i bilan ishlatishimiz kerak:

```js run
// barcha chiziqlarni ikki nuqta bilan almashtirish
alert( '12-34-56'.replace( *!*/-/g*/!*, ":" ) )  // 12:34:56
```

Ikkinchi argument - bu almashtirish matn. Unda maxsus belgilarni ishlatishimiz mumkin:

| Belgilar | Qo'shimchalar |
|--------|--------|
|`$$`|`"$"` |
|`$&`|to'liq moslik|
|<code>$&#096;</code>|moslikdan oldin matnning bir qismi|
|`$'`|moslikdan keyin matnning bir qismi|
|`$n`|agar `n` 1-2 xonali son bo'lsa, demak u chapdan o'ngga hisoblanadigan n-qavs tarkibini bildiradi, aks holda qavsni bu berilgan nom bilan anglatadi |


Masalan, agar biz almashtirish satrida `$&` dan foydalansak, bu "butun moslikni shu yerga qo'ying" degan ma'noni anglatadi.

Buni `"John"` ning barcha yozuvlarini `"Mr."` bilan oldindan belgilash uchun ishlatamiz:

```js run
let str = "John Doe, John Smith and John Bull";

// har bir John uchun - uni Mr. va keyin John bilan almashtiring
alert(str.replace(/John/g, 'Mr.$&'));  // Mr.John Doe, Mr.John Smith and Mr.John Bull
```

Ko'pincha, biz manba satrining qismlarini qayta ishlatishni, ularni almashtirishda qayta birlashtirishni yoki biror narsani o'rashni xohlaymiz.

Buning uchun quyidagilar kerak:
1. Dastlab, qismlarni regexp-da qavslar bilan belgilang.
2. Tarkibni 1, 2 va shunga o'xshash qavslarga olish uchun almashtirish satrida `$1`, `$2` (va boshqalar) dan foydalaning.

Masalan:

```js run
let str = "John Smith";

// ism va familiyani almashtirish
alert(str.replace(/(john) (smith)/i, '$2, $1')) // Smith, John
```

**"Aqlli" almashtirishni talab qiladigan vaziyatlar uchun ikkinchi dalil funktsiya bo'lishi mumkin.**

Bu har bir moslik uchun chaqiriladi va uning natijasi o'rnini bosuvchi sifatida kiritiladi.

Masalan:

```js run
let i = 0;

// har bir "ho" ni funktsiya natijasi bilan almashtiring
alert("HO-Ho-ho".replace(/ho/gi, function() {
  return ++i;
})); // 1-2-3
```

Yuqoridagi misolda funktsiya har safar keyingi raqamni qaytaradi, lekin odatda natija moslikka asoslanadi.

Funktsiya argumentlar bilan chaqiriladi `func(str, p1, p2, ..., pn, offset, input, groups)`:

1. `str` -- moslik,
2. `p1, p2, ..., pn` -- qavs ichida (agar mavjud bo'lsa),
3. `offset` -- moslikning holati,
4. `input` -- manba massivi,
5. `groups` -- nomlangan guruhlarga ega bo'lgan obyekt (bobga qarang [](info:regexp-groups)).

Agar regexp-da qavslar bo'lmasa, unda faqat uchta argument mavjud: `func(str, offset, input)`.

Keling, mosliklar haqida to'liq ma'lumotlarni ko'rsatish uchun foydalanaylik:

```js run
// show and replace all matches
function replacer(str, offset, input) {
  alert(`Found ${str} at position ${offset} in string ${input}`);
  return str.toLowerCase();
}

let result = "HO-Ho-ho".replace(/ho/gi, replacer);
alert( 'Result: ' + result ); // Result: ho-ho-ho

// shows each match:
// Found HO at position 0 in string HO-Ho-ho
// Found Ho at position 3 in string HO-Ho-ho
// Found ho at position 6 in string HO-Ho-ho
```

Quyidagi misolda ikkita qavs mavjud, shuning uchun `replacer` 5 ta argument bilan chaqiriladi: `str` to'liq mos keladi, keyin qavslar va keyin `offset` va `input`:

```js run
function replacer(str, name, surname, offset, input) {
  // ism - birinchi qavs, familiya - ikkinchi qavs
  return surname + ", " + name;
}

let str = "John Smith";

alert(str.replace(/(John) (Smith)/, replacer)) // Smith, John
```

Funktsiyani ishlatish bizga yakuniy almashtirish quvvatini beradi, chunki u o'yin haqida barcha ma'lumotlarni oladi, tashqi o'zgaruvchanlarga ega va hamma narsani qila oladi.

## regexp.exec(str)

Ushbu qidiruv usullarini biz allaqachon ko'rganmiz:

- `search` -- moslikning holatini qidiradi,
- `match` -- agar `g` bayrog'i bo'lmasa, birinchi moslikni qavs va barcha tafsilotlar bilan qaytaradi,
- `match` -- agar `g` bayrog'i bo'lsa - barcha mosliklarni qavslarsiz qaytaradi,
- `matchAll` -- barcha mosliklarni tafsilotlar bilan qaytaradi.

`Regexp.exec` usuli bu eng moslashuvchan qidirish usuli. Oldingi usullardan farqli o'laroq, `exec` satrda emas, balki regexp-da chaqirilishi kerak.

U regexp-ning `g` bayrog'iga ega bo'lishiga qarab boshqacha harakat qiladi.
mosliklni aynan `str.match(reg)` shaklida qaytaradi. Bunday xatti-harakatlar bizga yangi narsa bermaydi.

Agar `g` bo'lsa, unda:
- `regexp.exec(str)` birinchi moslikni qaytaradi va undan keyin 'regexp.lastIndex` xususiyatidagi holatini *eslaydi*.
- Keyingi chaqiruv `regexp.lastIndex` dan qidirishni boshlaydi va keyingi moslikni qaytaradi.
- Agar boshqa moslik bo'lmasa, `regexp.exec` `null` ni qaytaradi va `regexp.lastIndex` `0` ga o'rnatiladi.

Biz undan barcha mosliklarni `matchAll` o'rniga pozitsiyalar va qavslar guruhlari bilan tsiklash uchun foydalanishimiz mumkin edi:

```js run
let str = 'A lot about JavaScript at https://javascript.info';

let regexp = /javascript/ig;

let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]} at ${result.index}` );
  // shows: Found JavaScript at 12, then:
  // shows: Found javascript at 34
}
```

Shubhasiz, `matchAll` hech bo'lmaganda zamonaviy brauzerlar uchun ham xuddi shunday qiladi. Ammo `matchAll` qila olmaydigan narsa - berilgan joydan qidirish.

Keling, `13` pozitsiyasidan qidiramiz. Bizga kerak bo'lgan narsa `regexp.lastIndex = 13` ni belgilash va `regexp.exec` ni chaqirish:

```js run
let str = "A lot about JavaScript at https://javascript.info";

let regexp = /javascript/ig;
*!*
regexp.lastIndex = 13;
*/!*

let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]} at ${result.index}` );
  // shows: Found javascript at 34
}
```

Endi, berilgan `13` pozitsiyasidan boshlab, bitta moslik bor.


## regexp.test(str)

`Regexp.test(str)` usuli moslikni qidiradi va topadimi yoki yo'qligini `true/false` da qaytaradi.

Masalan:

```js run
let str = "I love JavaScript";

// bu ikkita test ham xuddi shunday qiladi
alert( *!*/love/i*/!*.test(str) ); // true
alert( str.search(*!*/love/i*/!*) != -1 ); // true
```

Salbiy javob bilan misol:

```js run
let str = "Bla-bla-bla";

alert( *!*/love/i*/!*.test(str) ); // false
alert( str.search(*!*/love/i*/!*) != -1 ); // false
```

Agar regexpda `'g'` bayrog'i bo'lsa, u holda `regexp.test` `regexp.lastIndex` xususiyatini rivojlantiradi, xuddi `regexp.exec` kabi.

Shunday qilib, biz uni ushbu pozitsiyadan qidirish uchun ishlatishimiz mumkin:

```js run
let regexp = /love/gi;

let str = "I love JavaScript";

// start the search from position 10:
regexp.lastIndex = 10
alert( regexp.test(str) ); // false (moslik yo'q)
```



````warn header="Qayta sinovdan o'tgan bir xil global regexp mos kelmasligi mumkin"
Agar biz bir xil global regexp-ni turli xil kirishlar uchun qo'llasak, bu noto'g'ri natijaga olib kelishi mumkin, chunki `regexp.test` chaqiruv avanslari `regexp.lastIndex`, shuning uchun boshqa matnda qidirish nolga teng bo'lmagan holatdan boshlanishi mumkin.

Masalan, biz bir xil matnda ikki marta "regexp.test" ni chaqiramiz, ikkinchisi esa ishlamayapti:

```js run
let regexp = /javascript/g;  // (regexp just created: regexp.lastIndex=0)

alert( regexp.test("javascript") ); // true (regexp.lastIndex=10 now)
alert( regexp.test("javascript") ); // false
```

Aynan shu narsa, chunki `regexp.lastIndex` ikkinchi sinovda nolga teng emas.

Buning ustida ishlash uchun global bo'lmagan regexps-dan foydalanish yoki yangi qidiruvdan oldin `regexp.lastIndex = 0`-ni qayta sozlash mumkin.
````

## Xulosa

Ikkala regexps va matnlarda ham turli xil usullar mavjud.

Ularning qobiliyatlari va usullari bir-biriga juda mos keladi, biz ham turli xil chaqiruvlar bilan buni qila olamiz. Ba'zan bu tilni o'rganishni boshlaganda chalkashliklar keltirib chiqarishi mumkin.

Keyin iltimos, ushbu bobning boshidagi retseptlarga murojaat qiling, chunki ular regexp bilan bog'liq vazifalarning aksariyati uchun yechimlar beradi.
