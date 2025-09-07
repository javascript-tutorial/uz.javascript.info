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
    ```

- `\u{X…XXXXXX}`

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

```js run
alert( '𝒳'.length ); // 2, MATHEMATICAL SCRIPT CAPITAL X
alert( '😂'.length ); // 2, FACE WITH TEARS OF JOY
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

```js run
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3
alert( '𝒳'.codePointAt(1).toString(16) ); // dcb3
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

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

Bizning vaziyatimizda `normalize()` aslida 3 ta belgi ketma-ketligini bittaga birlashtirishi qiziq: `\u1e68` (ikkita nuqta bilan S).

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

Haqiqatda, bu har doim ham shunday emas. Sababi `Ṩ` belgisi "etarlicha keng tarqalgan", shuning uchun Unicode yaratuvchilari uni asosiy jadvalga kiritdilar va unga kod berdilar.

Agar siz normalizatsiya qoidalari va variantlari haqida ko'proq bilmoqchi bo'lsangiz -- ular Unicode standartining ilovasida tasvirlangan: [Unicode Normalization Forms](https://www.unicode.org/reports/tr15/), ammo ko'pgina amaliy maqsadlar uchun ushbu bo'limdagi ma'lumotlar etarli.