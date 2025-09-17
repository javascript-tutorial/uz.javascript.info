# Naqshlar va bayroqlar

Doimiy ifodalar - bu matnni izlash va almashtirishning kuchli usuli.

JavaScript-da doimiy ifodalar o'rnatilgan `RegExp` klassidagi obyektlar yordamida amalga oshiriladi va satrlar bilan birlashtirilgan.

E'tibor bering, doimiy ifodalar dasturlash tillarida turlicha bo'lishi mumkin. Ushbu qo'llanmada biz JavaScript-ni ko'rib chiqamiz. Albatta, umumiy jihatlar juda ko'p, ammo ular Perl, Ruby, PHP va boshqalarda bir-biridan farq qiladi.

## Doimiy ifodalar

Doimiy ifoda (shuningdek, "regexp" yoki shunchaki "reg") *naqsh* va ixtiyoriy *bayroqlardan* iborat.

Doimiy ifoda obyektini yaratish uchun ikkita sintaksis mavjud.

Uzun sintaksis:

```js
regexp = new RegExp("pattern", "flags");
```

...Va `"/"` chiziqlaridan foydalangan holda qisqa:

```js
regexp = /pattern/; // bayroqlar yo'q
regexp = /pattern/gmi; // g, m va i bayroqlari bilan (tez orada ko'rib chiqamiz)
```

Qiyshiq chiziqlar `"/"` JavaScript-ga biz doimiy ifoda yaratayotganimizni bildiradi. Ular matnlar uchun qo'shtirnoqlar bilan bir xil rol o'ynaydi.

## Foydalanish

Bu ikki sintaksis o'rtasidagi asosiy farq shundaki, qiyshiq chiziqlar `/.../` yordamida naqsh ifodalarni kiritishga imkon bermaydi (masalan, `${...}` bilan satr shablon literallari kabi). Ular butunlay statik.

Qiyshiq chiziqlar kod yozish vaqtida doimiy ifodani bilganimizda ishlatiladi -- va bu eng keng tarqalgan holat. `new RegExp` esa ko'proq dinamik ravishda yaratilgan satrdan "on the fly" doimiy ifoda yaratishimiz kerak bo'lganda ishlatiladi. Masalan:

```js
let tag = prompt("Qaysi tegni topishni xohlaysiz?", "h2");

let regexp = new RegExp(`<${tag}>`); // yuqoridagi promptda "h2" javob berilgan bo'lsa /<h2>/ bilan bir xil
```

## Bayroqlar

Doimiy ifodalarda qidiruvga ta'sir qiluvchi bayroqlar bo'lishi mumkin.

JavaScript-da faqat 6 tasi mavjud:

`pattern:i`
: Bu bayroq bilan qidiruv katta-kichik harflarga sezgir emas: `A` va `a` o'rtasida farq yo'q (quyidagi misolga qarang).

`pattern:g`
: Bu bayroq bilan qidiruv barcha mosliklarni qidiradi, u bo'lmasa -- faqat birinchi moslik qaytariladi.

`pattern:m`
: Ko'p qatorli rejim (<info:regexp-multiline-mode> bobida ko'rib chiqiladi).

`pattern:s`
: "Dotall" rejimini yoqadi, bu nuqta `pattern:.` ga yangi qator belgisi `\n` ga mos kelish imkonini beradi (<info:regexp-character-classes> bobida ko'rib chiqiladi).

`pattern:u`
: To'liq Unicode qo'llab-quvvatlashni yoqadi. Bayroq surrogate juftlarni to'g'ri qayta ishlashga imkon beradi. Bu haqda ko'proq <info:regexp-unicode> bobida.

`pattern:y`
: "Yopishqoq" rejim: matnda aniq pozitsiyada qidirish (<info:regexp-sticky> bobida ko'rib chiqiladi)

```smart header="Ranglar"
Bu yerdan boshlab rang sxemasi:

- doimiy ifoda -- `pattern:qizil`
- satr (biz qidirgan joy) -- `subject:ko'k`
- natija -- `match:yashil`
```

## Qidiruv: str.match

Yuqorida aytib o'tilganidek, doimiy ifodalar satr metodlari bilan birlashtirilgan.

`str.match(regexp)` metodi `str` satrida `regexp` ning barcha mosliklarini topadi.

Uning 3 ta ish rejimi bor:

1. Agar doimiy ifodada `pattern:g` bayrog'i bo'lsa, u barcha mosliklarning massivini qaytaradi:
    ```js run
    let str = "We will, we will rock you";

    alert( str.match(/we/gi) ); // We,we (2 ta mos keluvchi pastki satrlar massivi)
    ```
    E'tibor bering, `match:We` ham, `match:we` ham topildi, chunki `pattern:i` bayrog'i doimiy ifodani katta-kichik harflarga sezgir emas qiladi.

2. Agar bunday bayroq bo'lmasa, u faqat birinchi moslikni massiv ko'rinishida qaytaradi, to'liq moslik `0` indeksida va ba'zi qo'shimcha tafsilotlar xususiyatlarda:
    ```js run
    let str = "We will, we will rock you";

    let result = str.match(/we/i); // g bayrog'isiz

    alert( result[0] );     // We (1-moslik)
    alert( result.length ); // 1

    // Tafsilotlar:
    alert( result.index );  // 0 (moslik pozitsiyasi)
    alert( result.input );  // We will, we will rock you (manba satr)
    ```
    Massivda `0` dan tashqari boshqa indekslar ham bo'lishi mumkin, agar doimiy ifodaning bir qismi qavslar ichiga olingan bo'lsa. Buni <info:regexp-groups> bobida ko'rib chiqamiz.

3. Va nihoyat, agar moslik bo'lmasa, `null` qaytariladi (`pattern:g` bayrog'i bor-yo'qligi muhim emas).

    Bu juda muhim noyanslik. Agar moslik bo'lmasa, biz bo'sh massiv emas, balki `null` olamiz. Buni unutish xatolarga olib kelishi mumkin, masalan:

    ```js run
    let matches = "JavaScript".match(/HTML/); // = null

    if (!matches.length) { // Xato: Cannot read property 'length' of null
      alert("Yuqoridagi qatorda xato");
    }
    ```

    Agar natija har doim massiv bo'lishini xohlasak, uni shunday yozishimiz mumkin:

    ```js run
    let matches = "JavaScript".match(/HTML/)*!* || []*/!*;

    if (!matches.length) {
      alert("Moslik yo'q"); // endi ishlaydi
    }
    ```

## Almashtirish: str.replace

`str.replace(regexp, replacement)` metodi `str` satrida `regexp` yordamida topilgan mosliklarni `replacement` bilan almashtiradi (`pattern:g` bayrog'i bo'lsa barcha mosliklarni, aks holda faqat birinchisini).

Masalan:

```js run
// g bayrog'isiz
alert( "We will, we will".replace(/we/i, "I") ); // I will, we will

// g bayrog'i bilan
alert( "We will, we will".replace(/we/ig, "I") ); // I will, I will
```

Ikkinchi argument `replacement` satridir. Biz unda moslik fragmentlarini kiritish uchun maxsus belgilar kombinatsiyasidan foydalanishimiz mumkin:

| Belgilar | Almashtirish satrida harakat |
|--------|--------|
|`$&`|butun moslikni kiritadi|
|<code>$&#096;</code>|moslikdan oldingi satr qismini kiritadi|
|`$'`|moslikdan keyingi satr qismini kiritadi|
|`$n`|agar `n` 1-2 raqamli son bo'lsa, n-chi qavs mazmunini kiritadi, bu haqda ko'proq <info:regexp-groups> bobida|
|`$<name>`|berilgan `name` bilan qavslar mazmunini kiritadi, bu haqda ko'proq <info:regexp-groups> bobida|
|`$$`|`$` belgisini kiritadi |

`pattern:$&` bilan misol:

```js run
alert( "I love HTML".replace(/HTML/, "$& and JavaScript") ); // I love HTML and JavaScript
```

## Sinash: regexp.test

`regexp.test(str)` metodi kamida bitta moslikni qidiradi, agar topilsa `true`, aks holda `false` qaytaradi.

```js run
let str = "I love JavaScript";
let regexp = /LOVE/i;

alert( regexp.test(str) ); // true
```

Ushbu bobning davomida biz ko'proq doimiy ifodalarni o'rganamiz, ko'proq misollar bilan tanishamiz va boshqa metodlar bilan ham uchrashamiz.

Metodlar haqida to'liq ma'lumot <info:regexp-methods> maqolasida berilgan.

## Xulosa

- Doimiy ifoda naqsh va ixtiyoriy bayroqlardan iborat: `pattern:g`, `pattern:i`, `pattern:m`, `pattern:u`, `pattern:s`, `pattern:y`.
- Bayroqlar va maxsus belgilarsiz (keyinroq o'rganamiz), regexp bo'yicha qidiruv pastki satr qidiruvi bilan bir xil.
- `str.match(regexp)` metodi mosliklarni qidiradi: `pattern:g` bayrog'i bo'lsa barchasini, aks holda faqat birinchisini.
- `str.replace(regexp, replacement)` metodi `regexp` yordamida topilgan mosliklarni `replacement` bilan almashtiradi: `pattern:g` bayrog'i bo'lsa barchasini, aks holda faqat birinchisini.
- `regexp.test(str)` metodi kamida bitta moslik bo'lsa `true`, aks holda `false` qaytaradi.