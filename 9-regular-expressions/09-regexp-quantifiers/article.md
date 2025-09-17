# Miqdorchilar +, *, ? va {n}

Aytaylik, bizda `+7(903)-123-45-67` kabi satr bor va unda barcha raqamlarni topishni xohlaymiz. Lekin avvalgidan farqli o'laroq, biz alohida raqamlar emas, balki to'liq raqamlar bilan qiziqamiz: `7, 903, 123, 45, 67`.

Raqam - bu 1 yoki undan ko'p raqamlar ketma-ketligi `pattern:\d`. Qanchasi kerakligini belgilash uchun *miqdorchi* qo'shishimiz mumkin.

## Miqdor {n}

Eng oddiy miqdorchi - jingalak qavs ichidagi raqam: `pattern:{n}`.

Miqdorchi belgi (yoki belgilar sinfi, yoki `[...]` to'plam va hokazo)ga qo'shiladi va qancha kerakligini belgilaydi.

Uning bir nechta ilg'or shakllari bor, misollarni ko'raylik:

Aniq son: `pattern:{5}`
: `pattern:\d{5}` aynan 5 ta raqamni bildiradi, `pattern:\d\d\d\d\d` bilan bir xil.

    Quyidagi misol 5 xonali raqamni qidiradi:

    ```js run
    alert( "I'm 12345 years old".match(/\d{5}/) ); //  "12345"
    ```

    Uzunroq raqamlarni chiqarib tashlash uchun `\b` qo'shishimiz mumkin: `pattern:\b\d{5}\b`.

Diapazon: `pattern:{3,5}`, 3-5 marta mos keladi
: 3 dan 5 gacha raqamlarni topish uchun chegaralarni jingalak qavslarga qo'yishimiz mumkin: `pattern:\d{3,5}`

    ```js run
    alert( "I'm not 12, but 1234 years old".match(/\d{3,5}/) ); // "1234"
    ```

    Yuqori chegarani tashlab qo'yishimiz mumkin.

    Keyin `pattern:\d{3,}` regexp uzunligi `3` yoki undan ko'p raqamlar ketma-ketligini qidiradi:

    ```js run
    alert( "I'm not 12, but 345678 years old".match(/\d{3,}/) ); // "345678"
    ```

`+7(903)-123-45-67` satriga qaytaylik.

Raqam - bu bir yoki undan ko'p raqamlarning ketma-ketligi. Demak, regexp `pattern:\d{1,}`:

```js run
let str = "+7(903)-123-45-67";

let numbers = str.match(/\d{1,}/g);

alert(numbers); // 7,903,123,45,67
```

## Qisqartmalar

Ko'p ishlatiladigan miqdorchilar uchun qisqartmalar mavjud:

`pattern:+`
: "Bir yoki ko'p" degani, `pattern:{1,}` bilan bir xil.

    Masalan, `pattern:\d+` raqamlarni qidiradi:

    ```js run
    let str = "+7(903)-123-45-67";

    alert( str.match(/\d+/g) ); // 7,903,123,45,67
    ```

`pattern:?`
: "Nol yoki bir" degani, `pattern:{0,1}` bilan bir xil. Boshqacha qilib aytganda, belgini ixtiyoriy qiladi.

    Masalan, `pattern:ou?r` naqshi `match:o` dan keyin nol yoki bitta `match:u`, keyin `match:r` ni qidiradi.

    Shunday qilib, `pattern:colou?r` ham `match:color` ham `match:colour` ni topadi:

    ```js run
    let str = "Should I write color or colour?";

    alert( str.match(/colou?r/g) ); // color, colour
    ```

`pattern:*`
: "Nol yoki ko'p" degani, `pattern:{0,}` bilan bir xil. Ya'ni belgi istalgan marta takrorlanishi yoki umuman bo'lmasligi mumkin.

    Masalan, `pattern:\d0*` raqamdan keyin istalgan miqdordagi nollarni qidiradi (ko'p yoki hech bo'lmasligi mumkin):

    ```js run
    alert( "100 10 1".match(/\d0*/g) ); // 100, 10, 1
    ```

    Uni `pattern:+` (bir yoki ko'p) bilan solishtiring:

    ```js run
    alert( "100 10 1".match(/\d0+/g) ); // 100, 10
    // 1 mos kelmadi, chunki 0+ kamida bitta nol talab qiladi
    ```

## Ko'proq misollar

Miqdorchilar juda tez-tez ishlatiladi. Ular murakkab doimiy ifodalarning asosiy "qurilish bloki" vazifasini bajaradi, shuning uchun ko'proq misollarni ko'raylik.

**O'nli kasrlar uchun regexp (suzuvchi nuqtali raqam): `pattern:\d+\.\d+`**

Amalda:
```js run
alert( "0 1 12.345 7890".match(/\d+\.\d+/g) ); // 12.345
```

**Atributsiz "HTML tegi ochish" uchun regexp, masalan `<span>` yoki `<p>`.**

1. Eng oddiyi: `pattern:/<[a-z]+>/i`

    ```js run
    alert( "<body> ... </body>".match(/<[a-z]+>/gi) ); // <body>
    ```

    Regexp `pattern:'<'` belgisini, keyin bir yoki ko'p lotin harflarini, keyin `pattern:'>'` ni qidiradi.

2. Yaxshilangan: `pattern:/<[a-z][a-z0-9]*>/i`

    Standartga ko'ra, HTML teg nomi birinchisidan tashqari istalgan pozitsiyada raqamga ega bo'lishi mumkin, masalan `<h1>`.

    ```js run
    alert( "<h1>Hi!</h1>".match(/<[a-z][a-z0-9]*>/gi) ); // <h1>
    ```

**"Atributsiz HTML tegi ochish yoki yopish" uchun regexp: `pattern:/<\/?[a-z][a-z0-9]*>/i`**

Biz naqsh boshiga ixtiyoriy qiyshiq chiziq `pattern:/?` qo'shdik. Uni teskari chiziq bilan ekranlashga to'g'ri keldi, aks holda JavaScript uni naqsh oxiri deb o'ylaydi.

```js run
alert( "<h1>Hi!</h1>".match(/<\/?[a-z][a-z0-9]*>/gi) ); // <h1>, </h1>
```

```smart header="Regexpni aniqroq qilish uchun ko'pincha uni murakkabroq qilishimiz kerak"
Bu misollarda umumiy qoidani ko'rishimiz mumkin: doimiy ifoda qanchalik aniq bo'lsa - shunchalik uzun va murakkab.

Masalan, HTML teglar uchun biz oddiyroq regexpdan foydalanishimiz mumkin: `pattern:<\w+>`. Lekin HTML teg nomi uchun qattiqroq cheklovlarga ega bo'lgani uchun, `pattern:<[a-z][a-z0-9]*>` ishonchlirog'.

`pattern:<\w+>` ishlatamizmi yoki `pattern:<[a-z][a-z0-9]*>` kerakmi?

Haqiqiy hayotda ikkala variant ham qabul qilinadi. Bu "qo'shimcha" mosliklarga qanchalik toqat qilishimiz va ularni boshqa usullar bilan natijadan olib tashlash qiyin yoki yoqligiga bog'liq.
```