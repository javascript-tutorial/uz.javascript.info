# Taqqoslashlar

Biz ko'plab taqqoslash operatorlarini matematikadan bilamiz.

JavaScript da ular quyidagicha yoziladi:

- Katta/kichik: <code>a &gt; b</code>, <code>a &lt; b</code>.
- Katta/kichik yoki teng: <code>a &gt;= b</code>, <code>a &lt;= b</code>.
- Teng: `a == b`, iltimos, qo'sh tenglik belgisi `==` tenglik testini anglatishini unutmang, bitta `a = b` esa tayinlashni anglatadi.
- Teng emas: Matematikada belgilanishi <code>&ne;</code>, lekin JavaScript da <code>a != b</code> deb yoziladi.

Ushbu maqolada biz turli xil taqqoslashlar, JavaScript ularni qanday amalga oshirishi, shu jumladan muhim o'ziga xosliklar haqida ko'proq bilib olamiz.

Oxirida siz "JavaScript g'aroyibliklari" bilan bog'liq muammolardan qochish uchun yaxshi retsept topasiz.

## Boolean natija

Barcha taqqoslash operatorlari boolean qiymat qaytaradi:

- `true` -- "ha", "to'g'ri" yoki "haqiqat" ni anglatadi.
- `false` -- "yo'q", "noto'g'ri" yoki "haqiqat emas" ni anglatadi.

Masalan:

```js run
alert( 2 > 1 );  // true (to'g'ri)
alert( 2 == 1 ); // false (noto'g'ri)
alert( 2 != 1 ); // true (to'g'ri)
```

Taqqoslash natijasini har qanday qiymat kabi o'zgaruvchiga tayinlash mumkin:

```js run
let result = 5 > 4; // taqqoslash natijasini tayinlash
alert( result ); // true
```

## String taqqoslash

Bir string boshqasidan katta yoki kichikligini aniqlash uchun JavaScript "lug'at" yoki "leksikografik" tartibdan foydalanadi.

Boshqacha qilib aytganda, stringlar harf-harf taqqoslanadi.

Masalan:

```js run
alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true
```

Ikki stringni taqqoslash algoritmi oddiy:

1. Ikkala stringning birinchi belgisini taqqoslang.
2. Agar birinchi stringning birinchi belgisi ikkinchi stringnikidan katta (yoki kichik) bo'lsa, birinchi string ikkinchisidan katta (yoki kichik). Tugadi.
3. Aks holda, agar ikkala stringning birinchi belgilari bir xil bo'lsa, ikkinchi belgilarni xuddi shunday taqqoslang.
4. Stringlardan birining oxirigacha takrorlang.
5. Agar ikkala string bir xil uzunlikda tugasa, ular teng. Aks holda, uzunroq string kattaroq.

Yuqoridagi birinchi misolda `'Z' > 'A'` taqqoslashi birinchi qadamda natijaga erishadi.

Ikkinchi taqqoslash `'Glow'` va `'Glee'` ko'proq qadamlar talab qiladi, chunki stringlar belgi-belgi taqqoslanadi:

1. `G` `G` bilan bir xil.
2. `l` `l` bilan bir xil.
3. `o` `e` dan katta. Bu yerda to'xtang. Birinchi string kattaroq.

```smart header="Haqiqiy lug'at emas, balki Unicode tartibi"
Yuqorida berilgan taqqoslash algoritmi lug'atlar yoki telefon kitoblarida ishlatiladigan algoritmga tahminan teng, lekin aynan bir xil emas.

Masalan, katta-kichik harflar muhim. Bosh harf `"A"` kichik harf `"a"` ga teng emas. Qaysi biri kattaroq? Kichik harf `"a"`. Nega? Chunki kichik harf JavaScript ishlatadigan ichki kodlash jadvalida (Unicode) kattaroq indeksga ega. Buning o'ziga xos tafsilotlari va oqibatlari haqida <info:string> bobida qaytamiz.
```

## Turli turlarni taqqoslash

Turli turdagi qiymatlarni taqqoslashda JavaScript qiymatlarni raqamlarga aylantiradi.

Masalan:

```js run
alert( '2' > 1 ); // true, '2' stringi 2 raqamiga aylanadi
alert( '01' == 1 ); // true, '01' stringi 1 raqamiga aylanadi
```

Boolean qiymatlar uchun `true` `1` ga va `false` `0` ga aylanadi.

Masalan:

```js run
alert( true == 1 ); // true
alert( false == 0 ); // true
```

````smart header="Kulgili oqibat"
Bir vaqtning o'zida quyidagicha bo'lishi mumkin:

- Ikki qiymat teng.
- Ulardan biri boolean sifatida `true` va ikkinchisi boolean sifatida `false`.

Masalan:

```js run
let a = 0;
alert( Boolean(a) ); // false

let b = "0";
alert( Boolean(b) ); // true

alert(a == b); // true!
```

JavaScript nuqtai nazaridan bu natija juda normal. Tenglik tekshiruvi raqamli o'zgartirish yordamida qiymatlarni aylantiradi (shuning uchun `"0"` `0` ga aylanadi), aniq `Boolean` o'zgartirish esa boshqa qoidalar to'plamidan foydalanadi.
````

## Qattiq tenglik

Oddiy tenglik tekshiruvi `==` da muammo bor. U `0` ni `false` dan ajrata olmaydi:

```js run
alert( 0 == false ); // true
```

Xuddi shu narsa bo'sh string bilan ham sodir bo'ladi:

```js run
alert( '' == false ); // true
```

Bu sodir bo'ladi, chunki turli turdagi operandlar tenglik operatori `==` tomonidan raqamlarga aylantiriladi. Bo'sh string, `false` kabi, nolga aylanadi.

Agar biz `0` ni `false` dan ajratmoqchi bo'lsak nima qilishimiz kerak?

**Qattiq tenglik operatori `===` tur o'zgartirishsiz tenglikni tekshiradi.**

Boshqacha qilib aytganda, agar `a` va `b` turli turda bo'lsa, `a === b` ularni o'zgartirishga urinmasdan darhol `false` qaytaradi.

Sinab ko'raylik:

```js run
alert( 0 === false ); // false, chunki turlar boshqa
```

`!=` ga o'xshash "qattiq teng emas" operatori `!==` ham mavjud.

Qattiq tenglik operatori yozish uchun biroz uzunroq, lekin nima bo'layotganini aniq qiladi va xatolarga kamroq joy qoldiradi.

## null va undefined bilan taqqoslash

`null` yoki `undefined` boshqa qiymatlar bilan taqqoslanganda intuitsiyaga mos kelmaydigan xatti-harakat mavjud.

Qattiq tenglik tekshiruvi `===` uchun
: Bu qiymatlar boshqa, chunki ularning har biri boshqa tur.

    ```js run
    alert( null === undefined ); // false
    ```

Qattiq bo'lmagan tekshiruv `==` uchun
: Maxsus qoida bor. Bu ikkalasi "shirin juftlik": ular bir-biriga teng (`==` ma'nosida), lekin boshqa hech qanday qiymatga teng emas.

    ```js run
    alert( null == undefined ); // true
    ```

Matematika va boshqa taqqoslashlar `< > <= >=` uchun
: `null/undefined` raqamlarga aylantiriladi: `null` `0` ga aylanadi, `undefined` esa `NaN` ga aylanadi.

Endi bu qoidalarni qo'llaganda sodir bo'ladigan kulgili narsalarni ko'raylik. Va eng muhimi, ular bilan tuzoqqa tushmaslik uchun qanday qilish kerak.

### G'alati natija: null vs 0

`null` ni nol bilan taqqoslaylik:

```js run
alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) *!*true*/!*
```

Matematik jihatdan bu g'alati. Oxirgi natija "`null` noldan katta yoki teng" deb aytadi, demak yuqoridagi taqqoslashlardan birida u `true` bo'lishi kerak, lekin ikkalasi ham `false`.

Buning sababi tenglik tekshiruvi `==` va taqqoslashlar `> < >= <=` boshqacha ishlaydi. Taqqoslashlar `null` ni raqamga aylantiradi, uni `0` sifatida ko'radi. Shuning uchun (3) `null >= 0` true va (1) `null > 0` false.

Boshqa tomondan, `undefined` va `null` uchun tenglik tekshiruvi `==` hech qanday o'zgartirishsiz ular bir-biriga teng va boshqa hech narsaga teng emasligini belgilaydi. Shuning uchun (2) `null == 0` false.

### Taqqoslab bo'lmaydigan undefined

`undefined` qiymatini boshqa qiymatlar bilan taqqoslash kerak emas:

```js run
alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)
```

Nega u nolni shunchalik yomon ko'radi? Har doim false!

Bu natijalarni olamiz chunki:

- Taqqoslashlar `(1)` va `(2)` `false` qaytaradi, chunki `undefined` `NaN` ga aylanadi va `NaN` barcha taqqoslashlar uchun `false` qaytaradigan maxsus raqamli qiymat.
- Tenglik tekshiruvi `(3)` `false` qaytaradi, chunki `undefined` faqat `null`, `undefined` ga teng va boshqa hech qanday qiymatga teng emas.

### Muammolardan qochish

Nega biz bu misollarni ko'rib chiqdik? Bu o'ziga xosliklarni har doim eslab turishimiz kerakmi? Aslida, unday emas. Aslida, bu qiyin narsalar vaqt o'tishi bilan asta-sekin tanish bo'lib qoladi, lekin ular bilan muammolardan qochishning ishonchli usuli bor:

- Qattiq tenglik `===` dan tashqari `undefined/null` bilan har qanday taqqoslashga alohida e'tibor bering.
- O'zgaruvchi `null/undefined` bo'lishi mumkin bo'lsa, nima qilayotganingizga ishonchingiz komil bo'lmasa, `>= > < <=` taqqoslashlarini ishlatmang. Agar o'zgaruvchi bu qiymatlarga ega bo'lishi mumkin bo'lsa, ularni alohida tekshiring.

## Xulosa

- Taqqoslash operatorlari boolean qiymat qaytaradi.
- Stringlar "lug'at" tartibida harf-harf taqqoslanadi.
- Turli turdagi qiymatlar taqqoslanganda, ular raqamlarga aylantiriladi (qattiq tenglik tekshiruvidan tashqari).
- `null` va `undefined` qiymatlari bir-biriga `==` teng va boshqa hech qanday qiymatga teng emas.
- Vaqti-vaqti bilan `null/undefined` bo'lishi mumkin bo'lgan o'zgaruvchilar bilan `>` yoki `<` kabi taqqoslashlarni ishlatishda ehtiyot bo'ling. `null/undefined` ni alohida tekshirish yaxshi g'oya.