<<<<<<< HEAD
# Unicode, Satr ichki tuzilishi

```warn header="Ilg'or bilim"
Bu bo'lim satr ichki tuzilishiga chuqurroq kiradi. Bu bilimlar agar siz emoji, noyob matematik yoki ieroglif belgilar yoki boshqa noyob simvollar bilan ishlashni rejalashtirgan bo'lsangiz foydali bo'ladi.
```

Biz allaqachon bilamizki, JavaScript satrlari [Unicode](https://en.wikipedia.org/wiki/Unicode) ga asoslangan: har bir belgi 1-4 baytlik bayt ketma-ketligi bilan ifodalanadi.

JavaScript bizga quyidagi uchta yozuv usulidan biri bilan uning o'n oltinchi Unicode kodini belgilash orqali satrga belgi kiritish imkonini beradi:

- `\xXX`

    `XX` `00` dan `FF` gacha qiymat bilan ikkita o'n oltinchi raqam bo'lishi kerak, keyin `\xXX` Unicode kodi `XX` bo'lgan belgining o'zi.

    `\xXX` yozuvi faqat ikkita o'n oltinchi raqamni qo'llab-quvvatlagani uchun, u faqat birinchi 256 ta Unicode belgilari uchun ishlatilishi mumkin.

    Bu birinchi 256 ta belgi lotin alifbosi, asosiy sintaksis belgilarining ko'pchiligi va boshqalarni o'z ichiga oladi. Masalan, `"\x7A"` `"z"` (Unicode `U+007A`) bilan bir xil.

    ```js run
    alert( "\x7A" ); // z
    alert( "\xA9" ); // ©, mualliflik huquqi belgisi
    ```

- `\uXXXX`
    `XXXX` aniq 4 ta hex raqam bo'lishi kerak, qiymati `0000` dan `FFFF` gacha, keyin `\uXXXX` Unicode kodi `XXXX` bo'lgan belgi.

    `U+FFFF` dan katta Unicode qiymatlariga ega belgilar ham bu yozuv bilan ifodalanishi mumkin, ammo bu holda biz surrogat juft deb ataladigan narsadan foydalanishimiz kerak (biz surrogat juftlar haqida ushbu bobda keyinroq gaplashamiz).

    ```js run
    alert( "\u00A9" ); // ©, \xA9 bilan bir xil, 4 raqamli hex yozuvdan foydalanib
    alert( "\u044F" ); // я, kirill alifbosi harfi
    alert( "\u2191" ); // ↑, yuqoriga o'q belgisi
=======

# Unicode, String internals

```warn header="Advanced knowledge"
The section goes deeper into string internals. This knowledge will be useful for you if you plan to deal with emoji, rare mathematical or hieroglyphic characters, or other rare symbols.
```

As we already know, JavaScript strings are based on [Unicode](https://en.wikipedia.org/wiki/Unicode): each character is represented by a byte sequence of 1-4 bytes.

JavaScript allows us to insert a character into a string by specifying its hexadecimal Unicode code with one of these three notations:

- `\xXX`

    `XX` must be two hexadecimal digits with a value between `00` and `FF`, then `\xXX` is the character whose Unicode code is `XX`.

    Because the `\xXX` notation supports only two hexadecimal digits, it can be used only for the first 256 Unicode characters.

    These first 256 characters include the Latin alphabet, most basic syntax characters, and some others. For example, `"\x7A"` is the same as `"z"` (Unicode `U+007A`).

    ```js run
    alert( "\x7A" ); // z
    alert( "\xA9" ); // ©, the copyright symbol
    ```

- `\uXXXX`
    `XXXX` must be exactly 4 hex digits with the value between `0000` and `FFFF`, then `\uXXXX` is the character whose Unicode code is `XXXX`.

    Characters with Unicode values greater than `U+FFFF` can also be represented with this notation, but in this case, we will need to use a so called surrogate pair (we will talk about surrogate pairs later in this chapter).

    ```js run
    alert( "\u00A9" ); // ©, the same as \xA9, using the 4-digit hex notation
    alert( "\u044F" ); // я, the Cyrillic alphabet letter
    alert( "\u2191" ); // ↑, the arrow up symbol
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
    ```

- `\u{X…XXXXXX}`

<<<<<<< HEAD
    `X…XXXXXX` `0` dan `10FFFF` gacha (Unicode tomonidan belgilangan eng yuqori kod nuqtasi) 1 dan 6 baytgacha o'n oltinchi qiymat bo'lishi kerak. Bu yozuv bizga barcha mavjud Unicode belgilarini osongina ifodalash imkonini beradi.

    ```js run
    alert( "\u{20331}" ); // 佫, noyob xitoy belgisi (uzun Unicode)
    alert( "\u{1F60D}" ); // 😍, tabassumli yuz belgisi (boshqa uzun Unicode)
    ```

## Surrogat juftlar

Barcha tez-tez ishlatiladigan belgilar 2 baytli kodlarga ega (4 hex raqam). Ko'pgina Yevropa tillaridagi harflar, raqamlar va asosiy birlashtirilgan CJK ideografik to'plamlar (CJK -- Xitoy, Yapon va Koreya yozuv tizimlaridan), 2 baytli tasvirga ega.

Dastlab, JavaScript faqat har bir belgi uchun 2 baytga ruxsat beradigan UTF-16 kodlashtirishga asoslangan edi. Ammo 2 bayt faqat 65536 ta kombinatsiyaga ruxsat beradi va bu Unicode ning har bir mumkin bo'lgan belgisi uchun etarli emas.

Shuning uchun 2 baytdan ko'proq talab qiladigan noyob belgilar "surrogat juft" deb ataladigan 2 baytli belgilar jufi bilan kodlanadi.

Yon ta'sir sifatida, bunday belgilarning uzunligi `2`:
=======
    `X…XXXXXX` must be a hexadecimal value of 1 to 6 bytes between `0` and `10FFFF` (the highest code point defined by Unicode). This notation allows us to easily represent all existing Unicode characters.

    ```js run
    alert( "\u{20331}" ); // 佫, a rare Chinese character (long Unicode)
    alert( "\u{1F60D}" ); // 😍, a smiling face symbol (another long Unicode)
    ```

## Surrogate pairs

All frequently used characters have 2-byte codes (4 hex digits). Letters in most European languages, numbers, and the basic unified CJK ideographic sets (CJK -- from Chinese, Japanese, and Korean writing systems), have a 2-byte representation.

Initially, JavaScript was based on UTF-16 encoding that only allowed 2 bytes per character. But 2 bytes only allow 65536 combinations and that's not enough for every possible symbol of Unicode.

So rare symbols that require more than 2 bytes are encoded with a pair of 2-byte characters called "a surrogate pair".

As a side effect, the length of such symbols is `2`:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js run
alert( '𝒳'.length ); // 2, MATHEMATICAL SCRIPT CAPITAL X
alert( '😂'.length ); // 2, FACE WITH TEARS OF JOY
<<<<<<< HEAD
alert( '𩷶'.length ); // 2, noyob xitoy belgisi
```

Buning sababi surrogat juftlar JavaScript yaratilgan vaqtda mavjud emas edi va shuning uchun til tomonidan to'g'ri ishlov berilmaydi!

Yuqoridagi satrlarning har birida biz bitta belgi bor, ammo `length` xususiyati `2` uzunligini ko'rsatadi.

Belgini olish ham qiyin bo'lishi mumkin, chunki ko'pgina til xususiyatlari surrogat juftlarni ikkita belgi sifatida ko'radi.

Masalan, bu yerda biz chiqishda ikkita g'alati belgini ko'rishimiz mumkin:

```js run
alert( '𝒳'[0] ); // g'alati belgilarni ko'rsatadi...
alert( '𝒳'[1] ); // ...surrogat juftning qismlari
```

Surrogat juft qismlari bir-birisiz ma'noga ega emas. Shuning uchun yuqoridagi misoldagi alertlar aslida axlatni ko'rsatadi.

Texnik jihatdan, surrogat juftlar ularning kodlari bilan ham aniqlanadi: agar belgi `0xd800..0xdbff` oralig'idagi kodga ega bo'lsa, u surrogat juftning birinchi qismidir. Keyingi belgi (ikkinchi qism) `0xdc00..0xdfff` oralig'idagi kodga ega bo'lishi kerak. Bu oraliqlar standart tomonidan faqat surrogat juftlar uchun ajratilgan.

Shuning uchun [String.fromCodePoint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint) va [str.codePointAt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt) usullari surrogat juftlar bilan ishlash uchun JavaScript ga qo'shildi.

Ular mohiyatan [String.fromCharCode](mdn:js/String/fromCharCode) va [str.charCodeAt](mdn:js/String/charCodeAt) bilan bir xil, ammo ular surrogat juftlarni to'g'ri ko'radi.

Bu yerda farqni ko'rish mumkin:

```js run
// charCodeAt surrogat juftlardan xabardor emas, shuning uchun u 𝒳 ning 1-qismi uchun kodlarni beradi:

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835

// codePointAt surrogat juftlardan xabardor
alert( '𝒳'.codePointAt(0).toString(16) ); // 1d4b3, surrogat juftning ikkala qismini o'qiydi
```

Aytish kerakki, agar biz 1-pozitsiyadan olsak (va bu yerda ancha noto'g'ri), ikkalasi ham juftning faqat 2-qismini qaytaradi:
=======
alert( '𩷶'.length ); // 2, a rare Chinese character
```

That's because surrogate pairs did not exist at the time when JavaScript was created, and thus are not correctly processed by the language!

We actually have a single symbol in each of the strings above, but the `length` property shows a length of `2`.

Getting a symbol can also be tricky, because most language features treat surrogate pairs as two characters.

For example, here we can see two odd characters in the output:

```js run
alert( '𝒳'[0] ); // shows strange symbols...
alert( '𝒳'[1] ); // ...pieces of the surrogate pair
```

Pieces of a surrogate pair have no meaning without each other. So the alerts in the example above actually display garbage.

Technically, surrogate pairs are also detectable by their codes: if a character has the code in the interval of `0xd800..0xdbff`, then it is the first part of the surrogate pair. The next character (second part) must have the code in interval `0xdc00..0xdfff`. These intervals are reserved exclusively for surrogate pairs by the standard.

So the methods [String.fromCodePoint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint) and [str.codePointAt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt) were added in JavaScript to deal with surrogate pairs.

They are essentially the same as [String.fromCharCode](mdn:js/String/fromCharCode) and [str.charCodeAt](mdn:js/String/charCodeAt), but they treat surrogate pairs correctly.

One can see the difference here:

```js run
// charCodeAt is not surrogate-pair aware, so it gives codes for the 1st part of 𝒳:

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835

// codePointAt is surrogate-pair aware
alert( '𝒳'.codePointAt(0).toString(16) ); // 1d4b3, reads both parts of the surrogate pair
```

That said, if we take from position 1 (and that's rather incorrect here), then they both return only the 2nd part of the pair:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js run
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3
alert( '𝒳'.codePointAt(1).toString(16) ); // dcb3
<<<<<<< HEAD
// juftning ma'nosiz 2-yarmi
```

<info:iterable> bobida surrogat juftlar bilan ishlashning ko'proq usullarini topasiz. Buning uchun maxsus kutubxonalar ham bor, ammo bu yerda taklif qilish uchun etarlicha mashhur emas.

````warn header="Xulosa: satrlarni ixtiyoriy nuqtada bo'lish xavfli"
Biz satrni ixtiyoriy pozitsiyada shunchaki bo'la olmaymiz, masalan `str.slice(0, 4)` ni olib, uni haqiqiy satr deb kutishimiz mumkin, masalan:

```js run
alert( 'salom 😂'.slice(0, 4) ); //  salom [?]
```

Bu yerda biz chiqishda axlat belgi (tabassum surrogat juftning birinchi yarmi) ni ko'rishimiz mumkin.

Agar siz surrogat juftlar bilan ishonchli ishlashni niyat qilsangiz, buni yodda tuting. Katta muammo bo'lmasligi mumkin, ammo kamida nima sodir bo'layotganini tushunishingiz kerak.
````

## Diakritik belgilar va normalizatsiya

Ko'p tillarda uning ustida/ostida belgi bilan asosiy belgidan tashkil topgan belgilar mavjud.

Masalan, `a` harfi quyidagi belgilar uchun asosiy belgi bo'lishi mumkin: `àáâäãåā`.

Eng keng tarqalgan "kompozit" belgilar Unicode jadvalida o'zlarining kodiga ega. Ammo ularning hammasi emas, chunki juda ko'p mumkin bo'lgan kombinatsiyalar mavjud.

Ixtiyoriy kompozitsiyalarni qo'llab-quvvatlash uchun Unicode standarti bizga bir nechta Unicode belgilardan foydalanish imkonini beradi: asosiy belgi va undan keyin uni "bezaydigan" bir yoki ko'p "belgi" belgilari.

Masalan, agar bizda `S` dan keyin maxsus "ustidagi nuqta" belgisi (kod `\u0307`) bo'lsa, u Ṡ sifatida ko'rsatiladi.

```js run
alert( 'S\u0307' ); // Ṡ
```

Agar bizga harf ustida (yoki ostida) qo'shimcha belgi kerak bo'lsa -- muammo yo'q, faqat kerakli belgi belgisini qo'shing.

Masalan, agar biz "ostidagi nuqta" belgisini (kod `\u0323`) qo'shsak, "ustida va ostida nuqtalar bilan S" ga ega bo'lamiz: `Ṩ`.

Masalan:

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

Bu katta moslashuvchanlikni ta'minlaydi, ammo qiziqarli muammoni ham: ikkita belgi vizual jihatdan bir xil ko'rinishi mumkin, ammo turli Unicode kompozitsiyalar bilan ifodalanishi mumkin.

Masalan:

```js run
let s1 = 'S\u0307\u0323'; // Ṩ, S + ustidagi nuqta + ostidagi nuqta
let s2 = 'S\u0323\u0307'; // Ṩ, S + ostidagi nuqta + ustidagi nuqta

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // false, garchi belgilar bir xil ko'rinsa ham (?!)
```

Buni hal qilish uchun har bir satrni bitta "normal" shaklga keltiradigan "Unicode normalizatsiya" algoritmi mavjud.

U [str.normalize()](mdn:js/String/normalize) tomonidan amalga oshiriladi.
=======
// meaningless 2nd half of the pair
```

You will find more ways to deal with surrogate pairs later in the chapter <info:iterable>. There are probably special libraries for that too, but nothing famous enough to suggest here.

````warn header="Takeaway: splitting strings at an arbitrary point is dangerous"
We can't just split a string at an arbitrary position, e.g. take `str.slice(0, 4)` and expect it to be a valid string, e.g.:

```js run
alert( 'hi 😂'.slice(0, 4) ); //  hi [?]
```

Here we can see a garbage character (first half of the smile surrogate pair) in the output.

Just be aware of it if you intend to reliably work with surrogate pairs. May not be a big problem, but at least you should understand what happens.
````

## Diacritical marks and normalization

In many languages, there are symbols that are composed of the base character with a mark above/under it.

For instance, the letter `a` can be the base character for these characters: `àáâäãåā`.

Most common "composite" characters have their own code in the Unicode table. But not all of them, because there are too many possible combinations.

To support arbitrary compositions, the Unicode standard allows us to use several Unicode characters: the base character followed by one or many "mark" characters that "decorate" it.

For instance, if we have `S` followed by the special "dot above" character (code `\u0307`), it is shown as Ṡ.

```js run
alert( 'S\u0307' ); // Ṡ
```

If we need an additional mark above the letter (or below it) -- no problem, just add the necessary mark character.

For instance, if we append a character "dot below" (code `\u0323`), then we'll have "S with dots above and below": `Ṩ`.

For example:

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

This provides great flexibility, but also an interesting problem: two characters may visually look the same, but be represented with different Unicode compositions.

For instance:

```js run
let s1 = 'S\u0307\u0323'; // Ṩ, S + dot above + dot below
let s2 = 'S\u0323\u0307'; // Ṩ, S + dot below + dot above

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // false though the characters look identical (?!)
```

To solve this, there exists a "Unicode normalization" algorithm that brings each string to the single "normal" form.

It is implemented by [str.normalize()](mdn:js/String/normalize).
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

<<<<<<< HEAD
Bizning vaziyatimizda `normalize()` aslida 3 ta belgi ketma-ketligini bittaga birlashtirishi qiziq: `\u1e68` (ikkita nuqta bilan S).
=======
It's funny that in our situation `normalize()` actually brings together a sequence of 3 characters to one: `\u1e68` (S with two dots).
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

<<<<<<< HEAD
Haqiqatda, bu har doim ham shunday emas. Sababi `Ṩ` belgisi "etarlicha keng tarqalgan", shuning uchun Unicode yaratuvchilari uni asosiy jadvalga kiritdilar va unga kod berdilar.

Agar siz normalizatsiya qoidalari va variantlari haqida ko'proq bilmoqchi bo'lsangiz -- ular Unicode standartining ilovasida tasvirlangan: [Unicode Normalization Forms](https://www.unicode.org/reports/tr15/), ammo ko'pgina amaliy maqsadlar uchun ushbu bo'limdagi ma'lumotlar etarli.
=======
In reality, this is not always the case. The reason is that the symbol `Ṩ` is "common enough", so Unicode creators included it in the main table and gave it the code.

If you want to learn more about normalization rules and variants -- they are described in the appendix of the Unicode standard: [Unicode Normalization Forms](https://www.unicode.org/reports/tr15/), but for most practical purposes the information from this section is enough.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
