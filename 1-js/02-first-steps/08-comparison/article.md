# Taqqoslashlar

Biz matematikadan ko'plab taqqoslash operatorlarini bilamiz:

- Katta/kichik: <code>a &gt; b</code>, <code>a &lt; b</code>.
- Katta / kichik yoki teng: <code>a &gt;= b</code>, <code>a &lt;= b</code>.
- Teng: `a == b` (qo'shaloq teng belgisi `=` ga e'tibor bering. Bitta tenglik belgisi `a = b` tayinlash operatori edi).
- Teng emas. Matematikada bu taqqoslash <code>&ne;</code> bo'lar edi, lekin JavaScript da u undov belgisi bilan tayinlash operatori sifatida yozilgan: <code>a != b</code>.

## Bul ma'lumot turi bu natija

Boshqa operatorlar singari taqqoslash ham qiymatni qaytaradi. Bunday holda, qiymat mantiqiy ma'lumot turida hisoblanadi.

- `true` -- "ha", "to'g'ri" yoki "haqiqat" degan ma'noni anglatadi.
- `false` -- "yo'q", "noto'g'ri" yoki "haqiqat emas" degan ma'noni anglatadi.

Masalan:

```js run
alert( 2 > 1 );  // true (to'g'ri)
alert( 2 == 1 ); // false (noto'g'ri)
alert( 2 != 1 ); // true (to'g'ri)
```

Taqqoslash natijasi har qanday qiymat singari o'zgaruvchanga tayinlash mumkin:

```js run
let result = 5 > 4; // taqqoslash natijasini tayinlash
alert( result ); // true
```

## Matnlarni taqqoslash

Bir matn boshqasidan kattaroqmi yoki yo'qligini bilish uchun JavaScript da "lug'at" yoki "leksikografiya" deb nomlangan tartib ishlatiladi.

Boshqacha qilib aytganda, matnlar harflar bilan taqqoslanadi.

Masalan:

```js run
alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true
```

Ikki matni taqqoslash algoritmi oddiy:

1. Ikkala matnning birinchi belgisini solishtiring.
2. Agar birinchi matndagi birinchi belgi boshqa matndan kattaroq (yoki kichkinaroq) bo'lsa, unda birinchi matn ikkinchisidan kattaroq (yoki kichkinaroq) bo'ladi. 
3. Agar ikkala matnning birinchi belgilari bir xil bo'lsa, ikkinchi belgilarni xuddi shunday taqqoslang.
4. Matnning oxirigacha takrorlang.
5. Agar ikkala matn ham bir xil uzunlikda tugasa, ular tengdir. Aks holda, uzunroq matn katta.

Yuqoridagi misollarda `'Z' > 'A'` taqqoslash birinchi bosqichda natijaga erishganda, `"Glow"` va `"Glee"` matnlari belgi-belgi bilan taqqoslanadi:

1. `G` bilan `G` bir xil.
2. `l` bilan `l` bir xil. 
3. `o` `e` dan katta. Shu yerda tohtaymiz. Birinchi matn kattaroq.

```smart header="Haqiqiy lug'at emas, balki Unicode tartibi"
Yuqorida keltirilgan taqqoslash algoritmi lug'atlarda yoki telefon daftarlarida qo'llaniladiganga o'xshash, ammo bir xil emas.

Masalan, registr muhim. Tepa registr `"A"` past registr `"a"` ga teng emas. Qaysi biri kattaroq? Past registr `"a"`. Nima uchun? JavaScript-ning ichki kodlash jadvalida (Unicode) past registr belgi kattaroq ko'rsatkichga ega bo'lgani uchun. Buning aniq tafsilotlari va natijalariga <info:string> bobida qaytamiz.
```

## Har xil turlarni taqqoslash

Turli xil qiymatlarni taqqoslashda JavaScript qiymatlarni raqamlarga o'zgartiradi.

Masalan:

```js run
alert( '2' > 1 ); // true, '2' matni 2 raqamiga aylanadi
alert( '01' == 1 ); // true, '01' matni 1 raqamiga aylanadi
```

Mantiqiy qiymatlar uchun `true` `1` ga va `false` `0` ga aylanadi.

Masalan:

```js run
alert( true == 1 ); // true
alert( false == 0 ); // true
```

````smart header="Qiziqarli natija"
Bir vaqtning o'zida bo'lishi mumkin:

- Ikki qiymat teng.
- Ulardan biri mantiqiy sifatida `true`, ikkinchisi mantiqiy sifatida `false`.

Masalan:

```js run
let a = 0;
alert( Boolean(a) ); // false

let b = "0";
alert( Boolean(b) ); // true

alert(a == b); // true!
```

JavaScript nuqtai nazaridan bu natija odatiy holdir. Tenglikni tekshirish qiymatlarni raqamli konvertatsiya yordamida o'zgartiradi (shu sababli `"0"` `0` ga aylanadi), aniq `mantiqiy` konvertatsiya qilish boshqa qoidalar to'plamidan foydalanadi.
````

## Qat'iy tenglik

Muntazam tenglikni tekshirishda muammo bor. `0` ni `false` dan farqlay olmaydi:

```js run
alert( 0 == false ); // true
```

Xuddi shu narsa bo'sh matn bilan ham sodir bo'ladi:

```js run
alert( '' == false ); // true
```

Bu har xil turdagi operandlar `==` tenglik operatori orqali sonlarga aylantirilganligi sababli sodir bo'ladi. Xuddi `false` kabi bo'sh satr nolga aylanadi.

`0` ni `false` dan farqlashni xohlasak nima qilishimiz kerak?

**Qat'iy tenglik operatori `===` turni o'zgartirmasdan tenglikni tekshiradi.**

Boshqacha qilib aytadigan bo'lsak, agar `a` va `b` har xil turdagi bo'lsa, u holda `a === b` ularni o'zgartirishga urinmasdan darhol `false` ni qaytaradi.

Keling, sinab ko'raylik:

```js run
alert( 0 === false ); // false, chunki turlari har xil
```

Shuningdek, `!=` ga o'xshash "qat'iy tengsizlik" `!==` operatori mavjud!

Qat'iy tenglik operatori yozish uchun biroz uzoqroq, ammo u nima bo'layotganini aniq ko'rsatib beradi va xatolarga yo'l qo'ymaydi.

## Null va undefined bilan taqqoslash

Keling, ko'proq holatlarni ko'rib chiqaylik.

`Null` yoki `undefined` boshqa qiymatlar bilan taqqoslaganda intuitiv bo'lmagan xatti-harakatlar mavjud.


Qat'iy tenglikni tekshirish uchun `===`
: Ushbu qiymatlarlar har xil, chunki ularning har biri har xil turda.

    ```js run
    alert( null === undefined ); // false
    ```

Qat'iy bo'lmagan tekshirish uchun `==`
: Maxsus qoida bor. Bu ikkisi "shirin juftlik" dir: ular bir-biriga teng (`==` ma'nosida), lekin boshqa qiymat emas.

    ```js run
    alert( null == undefined ); // true
    ```

Matematik va boshqa taqqoslashlar uchun `< > <= >=`
: `null/undefined` raqamlarga aylantiriladi: `null` `0` ga aylanadi, `undefined` esa `NaN` ga aylanadi.

Keling, ushbu qoidalarni qo'llaganimizda sodir bo'lgan ba'zi kulgili narsalarni ko'rib chiqaylik. Va, nima muhimroq, qanday qilib ular bilan tuzoqqa tushmaslikni bilib olaylik.

### G'alati natija: null va 0

`Null` ni nol bilan taqqoslaylik:

```js run
alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) *!*true*/!*
```

Matematik jihatdan bu g'alati. Oxirgi natija "`null` noldan katta yoki unga teng" ekanligini bildiradi, shuning uchun yuqoridagi taqqoslashlardan birida u `true` bo'lishi kerak, ammo ularning ikkalasi ham yolg'ondir(false).

Sababi, tenglikni tekshirish `==` va taqqoslashlar `> <> = <=` boshqacha ishlaydi. Taqqoslashlar `null` ni `0` raqamga aylantiradi. Shuning uchun (3) `null >= 0` to'g'ri va (1) `null >0` noto'g'ri(false).

Boshqa tomondan, tenglikni tekshirish `==` `undefined` va `null` uchun aniqlanadi, hech qanday konvertatsiyasiz ular bir-biriga tenglashadi va boshqa hech narsaga teng kelmaydi. Shuning uchun (2) `null == 0` noto'g'ri(false).

### Beqiyos undefined

`undefined` qiymati boshqa qiymatlar bilan taqqoslanmasligi kerak:

```js run
alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)
```

Nega u nolni shunchalik yoqtirmaydi? Har doim false!

Biz ushbu natijalarga erishamiz, chunki:

- `(1)` va `(2)` taqqoslashlar `false` ni qaytaradi, chunki `undefined` `NaN` ga aylanadi va `NaN` esa barcha taqqoslashlar uchun `false` ni qaytaradigan maxsus raqamli qiymatdir.
- Tenglikni tekshirish `(3)` `false` ni qaytaradi, chunki `undefined` faqat `null` ga teng bo'ladi va boshqa qiymatga ega bo'lmaydi.

### Muammolardan qochish

Nima uchun biz ushbu misollarni ko'rib chiqdik? Ushbu o'ziga xos xususiyatlarni doimo eslab turishimiz kerakmi? Xo'sh, aslida yo'q. Aslida, bu hiyla-nayranglar vaqt o'tishi bilan asta-sekin tanish bo'lib qoladi, ammo ular bilan bog'liq muammolardan qochishning ishonchli usuli mavjud:

Faqatgina har qanday taqqoslashni `undefined/null` bilan davolash kerak, faqat qat'iy tenglik bundan mustasno `===`.

`>= > < <=` Taqqoslamalarni `null/undefined` bo'lishi mumkin bo'lgan o'zgaruvchi bilan foydalanmang, albatta, qilayotgan ishingizga ishonchingiz komil bo'lmasa. Agar o'zgaruvchi bu qiymatlarga ega bo'lishi mumkin bo'lsa, ularni alohida tekshiring.

## Xulosa

- Taqqoslash operatorlari mantiqiy qiymatni qaytaradilar.
- Matnlar "lug'at" tartibida harflar bilan taqqoslanadi.
- Har xil turdagi qiymatlarni taqqoslaganda, ular raqamlarga o'tkaziladi (qat'iy tenglik operatori bundan mustasno).
- `Null` va `undefined` qiymatlari bir-biriga teng `==` va boshqa qiymatlarga teng emas.
- `>` yoki `<` kabi taqqoslashlarni vaqti bilan `null/undefined` bo'lishi mumkin bo'lgan o'zgaruvchanlar bilan ishlatishda ehtiyot bo'ling. `Null/undefined` ni alohida tekshirish yaxshi fikr.
