# JSON usullari, toJSON

Aytaylik, bizda murakkab obyekt bor va biz uni matnga aylantirishni, uni tarmoq orqali yuborishni yoki shunchaki logga yozish uchun chiqarishni xohlaymiz.

Tabiiyki, bunday matn barcha muhim xususiyatlarni o'z ichiga olishi kerak.

Biz konvertatsiyani quyidagi tarzda amalga oshirishimiz mumkin:

```js run
let user = {
  name: "John",
  age: 30,

*!*
  toString() {
    return `{name: "${this.name}", age: ${this.age}}`;
  }
*/!*
};

alert(user); // {name: "John", age: 30}
```

<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
...Ammo rivojlanish jarayonida yangi xususiyatlar qo'shiladi, eski xususiyatlar qayta nomlanadi va o'chiriladi. Bunday `toString`-ni har doim yangilash og'riqli bo'lishi mumkin. Biz undagi xususiyatlarni tsiklashni urinib ko'rishimiz mumkin edi, lekin agar obyekt murakkab bo'lsa va xususiyatlarida ichki obyektlar bo'lsachi? Biz ularning konvertatsiyasini ham amalga oshirishimiz kerak. Agar biz obyektni tarmoq orqali jo'natayotgan bo'lsak, u holda qabul qiluvchida bizning obyektimizni "o'qishi" uchun kodni yetkazib berishimiz kerak.
=======
...But in the process of development, new properties are added, old properties are renamed and removed. Updating such `toString` every time can become a pain. We could try to loop over properties in it, but what if the object is complex and has nested objects in properties? We'd need to implement their conversion as well.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/12-json/article.md

Yaxshiyamki, bularning barchasini hal qilish uchun kod yozishning hojati yo'q. Vazifa allaqachon hal qilingan.

## JSON.stringify

<<<<<<< HEAD
[JSON](http://en.wikipedia.org/wiki/JSON) (JavaScript Object Notation) qiymatlar va moslamalarni aks ettirish uchun umumiy formatdir. U [RFC 4627](http://tools.ietf.org/html/rfc4627) standartidagi kabi tavsiflanadi. Dastlab u JavaScript uchun yaratilgan, ammo boshqa ko'plab tillarda ham uni boshqarish uchun kutubxonalar mavjud. Mijoz JavaScript-ni ishlatganda va server Ruby/PHP/Java/nima bo'lganda ham ma'lumotlar almashinuvi uchun JSON-dan foydalanish oson.
=======
The [JSON](https://en.wikipedia.org/wiki/JSON) (JavaScript Object Notation) is a general format to represent values and objects. It is described as in [RFC 4627](https://tools.ietf.org/html/rfc4627) standard. Initially it was made for JavaScript, but many other languages have libraries to handle it as well.  So it's easy to use JSON for data exchange when the client uses JavaScript and the server is written on Ruby/PHP/Java/Whatever.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

JavaScript quyidagi usullarni taqdim etadi:

- `JSON.stringify` obyektlarni JSON-ga aylantirish uchun.
- `JSON.parse` JSON-ni obyektga qaytarish uchun.

Misol uchun, bu yerda biz talaba ma'lumotlarini `JSON.stringify` aylantiramiz:
```js run
let student = {
  name: 'John',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  spouse: null
};

*!*
let json = JSON.stringify(student);
*/!*

alert(typeof json); // bizda matn bor!

alert(json);
*!*
/* JSON-kodlangan obyekt:
{
  "name": "John",
  "age": 30,
  "isAdmin": false,
  "courses": ["html", "css", "js"],
  "spouse": null
}
*/
*/!*
```

`JSON.stringify(student)` usuli obyektni oladi va uni matnga aylantiradi.

<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
Natija `json` satri *JSON tomonidan kodlangan* yoki *ketma-ketlashtirilgan* yoki obyekt deb nomlanadi. Biz uni tarmoq orqali yuborishga yoki oddiy ma'lumotlar omboriga qo'yishga tayyormiz.
=======
The resulting `json` string is called a *JSON-encoded* or *serialized* or *stringified* or *marshalled* object. We are ready to send it over the wire or put into a plain data store.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/12-json/article.md


Iltimos, unutmangki, JSON-kodlangan obyekt obyekt adabiyotidan bir necha muhim farqlarga ega:

- Matnlar ikki tirnoqdan foydalanishadi. JSON-da bitta tirnoq yoki teskari tirnoq yo'q. Shunday qilib, `'John'` `"John"` bo'ladi.
- Obyektning mulk nomlari ham ikki tirnoqdan foydalanishadi. Bu majburiy. Shunday qilib `'age': 30` `"age":30` aylanadi.

`JSON.stringify` ibtidoiylarga ham qo'llanilishi mumkin.

<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
JSON quyidagi ma'lumotlar turlarini qo'llab-quvvatlaydi
=======
JSON supports following data types:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/12-json/article.md

- Obyektlar `{ ... }`
- Massivlar `[ ... ]`
- Primitivlar:
    - matnlar,
    - raqamlar,
    - mantiqiy qiymatlar `true/false`,
    - `null`.

Masalan:

```js run
// JSON-dagi raqam shunchaki raqam
alert( JSON.stringify(1) ) // 1

// JSON-dagi matn hali ham matn, ammo ikkita tirnoqli
alert( JSON.stringify('test') ) // "test"

alert( JSON.stringify(true) ); // true

alert( JSON.stringify([1, 2, 3]) ); // [1,2,3]
```

<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
JSON ma'lumotlar uchun til spetsifikatsiyasidan mustaqil, shuning uchun `JSON.stringify` JavaScript obyektlarining o'ziga xos xususiyatlarini yo'qotadi.
=======
JSON is data-only language-independent specification, so some JavaScript-specific object properties are skipped by `JSON.stringify`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/12-json/article.md

Aynan:

<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
- Funktsiya xususiyatlari (usullari).
- Ramziy xususiyatlar.
- `undefined` saqlanadigan xususiyatlar.
=======
- Function properties (methods).
- Symbolic keys and values.
- Properties that store `undefined`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/12-json/article.md

```js run
let user = {
  sayHi() { // e'tiborsiz qoldirildi
    alert("Hello");
  },
  [Symbol("id")]: 123, // e'tiborsiz qoldirildi
  something: undefined // e'tiborsiz qoldirildi
};

alert( JSON.stringify(user) ); // {} (bo'sh obyekt)
```

Bu odatda normal. Agar bu biz istagan narsa bo'lmasa, tez orada bu jarayonni qanday qilib sozlash mumkinligini ko'rib chiqamiz.

Eng yaxshi narsa shundaki, ichki o'rnatilgan obyektlar avtomatik ravishda qo'llab-quvvatlanadi va o'zgartiriladi.

Masalan:

```js run
let meetup = {
  title: "Konferensiya",
*!*
  room: {
    number: 23,
    participants: ["john", "ann"]
  }
*/!*
};

alert( JSON.stringify(meetup) );
/* Barcha struktura matnlangan:
{
  "title":"Konferensiya",
  "room":{"number":23,"participants":["john","ann"]},
}
*/
```

Muhim cheklov: tsiklik ma'lumotnomalar bo'lmasligi kerak.

Masalan:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Konferensiya",
  participants: ["john", "ann"]
};

meetup.place = room;       // meetup room ga havola qiladi
room.occupiedBy = meetup; // room meetup ga havola qiladi

*!*
JSON.stringify(meetup); // Xato: tsiklik tuzilmani JSON-ga aylantirish
*/!*
```

Here, the conversion fails, because of circular reference: `room.occupiedBy` references `meetup`, and `meetup.place` references `room`:
Bu yerda konvertatsiya ishlamayapti, chunki tsiklik ma'lumotnoma: `room.occupiedBy`  `meetup` ga havola qiladi, va `meetup.place` `room` ga havola qiladi:

![](json-meetup.svg)


## Istisno va konvertatsiya: replacer

`JSON.stringify` ning to'liq sintaksisi:

```js
let json = JSON.stringify(value[, replacer, space])
```

value
: Kodlash uchun qiymat.

replacer
: Kodlash uchun xususiyatlar majmuasi yoki xaritalash funktsiyasi `function(kalit, qiymat)`.

space
: Formatlash uchun foydalaniladigan bo'sh joy miqdori

Ko'pincha, `JSON.stringify` faqat birinchi argument bilan ishlatiladi. Agar almashtirish jarayonini aniq sozlashimiz kerak bo'lsa, masalan, tsiklik ma'lumotnomalrni filtrlashimiz kerak bo'lsa, biz `JSON.stringify` ning ikkinchi argumentidan foydalanishimiz mumkin.

Agar biz unga bir qator xususiyatlarni topshirsak, faqat shu xususiyatlar kodlanadi.

Masalan:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Konferensiya",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup room ga havola qiladi
};

room.occupiedBy = meetup; // room meetup ga havola qiladi

alert( JSON.stringify(meetup, *!*['title', 'participants']*/!*) );
// {"title":"Konferensiya","participants":[{},{}]}
```

<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
Bu yerda biz juda qattiqqo'lmiz. Mulklar ro'yxati butun obyekt tuzilishiga qo'llaniladi. Shuning uchun ishtirokchilar bo'sh, chunki `name` ro'yxatda yo'q.

Tsiklik ma'lumotnomani keltirib chiqaradigan `room.occupiedBy` dan tashqari har qanday xususiyatni o'z ichiga olaylik:
=======
Here we are probably too strict. The property list is applied to the whole object structure. So the objects in `participants` are empty, because `name` is not in the list.

Let's include in the list every property except `room.occupiedBy` that would cause the circular reference:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/12-json/article.md

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Konferensiya",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup room ga havola qiladi
};

room.occupiedBy = meetup; // room meetup ga havola qiladi

alert( JSON.stringify(meetup, *!*['title', 'participants', 'place', 'name', 'number']*/!*) );
/*
{
  "title":"Konferensiya",
  "participants":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```

Endi `occupiedBy` dan tashqari hamma narsa seriyalashtirilgan. Ammo mulk ro'yxati juda uzun.

Yaxshiyamki, biz `o'rnini bosuvchi` sifatida massiv o'rniga funktsiyadan foydalanishimiz mumkin.

<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
Funksiya har bir `(kalit, qiymat)` juftligi uchun chaqiriladi va asl qiymat o'rniga "almashtirilgan" qiymatni qaytarishi kerak.
=======
The function will be called for every `(key, value)` pair and should return the "replaced" value, which will be used instead of the original one. Or `undefined` if the value is to be skipped.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/12-json/article.md

Bizning holatimizda, `emptyBy` dan tashqari hamma narsa uchun `value` ni qaytarishimiz mumkin. `occupiedBy` ni e'tiborsiz qoldirish uchun quyidagi kod `undefined` ni qaytaradi:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Konferensiya",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup room ga havola qiladi
};

room.occupiedBy = meetup; // room meetup ga havola qiladi

alert( JSON.stringify(meetup, function replacer(key, value) {
<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
  alert(`${key}: ${value}`); // o'rinbosar nima olishini ko'rish uchun
=======
  alert(`${key}: ${value}`);
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/12-json/article.md
  return (key == 'occupiedBy') ? undefined : value;
}));

/* key:value o'rnini bosadigan juftlar:
:             [object Object]
title:        Konferensiya
participants: [object Object],[object Object]
0:            [object Object]
name:         John
1:            [object Object]
name:         Alice
place:        [object Object]
number:       23
occupiedBy: [object Object]
*/
```

Iltimos, shuni yodda tutingki, `replacer` funktsiyasi har bir kalit/qiymat juftligini, shu jumladan ichki obyektlar va massiv elementlarini oladi. U rekursiv tarzda qo'llaniladi. `this` ichidagi  `replacer` qiymat - joriy xususiyatni o'z ichiga olgan obyekt.

Birinchi chaqiruv maxsus. U maxsus "o'rash ob'ekti" yordamida tayyorlanadi: `{"": meetup}`. Boshqacha qilib aytganda, birinchi `(kalit, qiymat)` jufti bo'sh kalitga ega va qiymat umuman maqsadli obyektdir. Shuning uchun birinchi satr yuqoridagi misolda `":[object Object]"` dir.

<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
Ushbu g'oya `replacer` ga imkon qadar ko'proq kuch berishdir: agar kerak bo'lsa, butun obyektni tahlil qilish va almashtirish/o'tkazib yuborish imkoniyati mavjud.


## Formatlash: spacer

`JSON.stringify(value, replacer, spaces)` ning uchinchi argumenti chiroyli formatlash uchun ishlatiladigan bo'shliqlar soni.

Ilgari, barcha torlangan obyektlar hech qanday chuqurlik va qo'shimcha bo'shliqlarga ega emas edi. Obyektni tarmoq orqali yuborishni istasak yaxshi bo'ladi. `spacer` argumenti faqat chiroyli chiqish uchun ishlatiladi.

Bu erda `spacer = 2` JavaScript-ga bir nechta satrlarda ichki obyektlarni ko'rsatishni, obyekt ichidagi 2 bo'sh joyni ko'rsatishni aytadi:
=======
The idea is to provide as much power for `replacer` as possible: it has a chance to analyze and replace/skip even the whole object if necessary.


## Formatting: space

The third argument of `JSON.stringify(value, replacer, space)` is the number of spaces to use for pretty formatting.

Previously, all stringified objects had no indents and extra spaces. That's fine if we want to send an object over a network. The `space` argument is used exclusively for a nice output.

Here `space = 2` tells JavaScript to show nested objects on multiple lines, with indentation of 2 spaces inside an object:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/12-json/article.md

```js run
let user = {
  name: "John",
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true
  }
};

alert(JSON.stringify(user, null, 2));
/* ikki bo'shliq indentlari:
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/

/* for JSON.stringify(user, null, 4) natija yanada chuqurroq bo'ladi:
{
    "name": "John",
    "age": 25,
    "roles": {
        "isAdmin": false,
        "isEditor": true
    }
}
*/
```

<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
`spaces` parametri faqat logga yozish va chiroyli chiqish uchun ishlatiladi.
=======
The third argument can also be a string. In this case, the string is used for indentation instead of a number of spaces.

The `space` parameter is used solely for logging and nice-output purposes.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/12-json/article.md

## Maxsus "toJSON"

Matn konvertatsiyasi uchun `toString` singari, obyek konvertatsiyasi uchun `toJSON` usulini taqdim etishi mumkin. Agar mavjud bo'lsa, `JSON.stringify` uni avtomatik ravishda chaqiradi.

Masalan:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Konferensiya",
  date: new Date(Date.UTC(2017, 0, 1)),
  room
};

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Konferensiya",
*!*
    "date":"2017-01-01T00:00:00.000Z",  // (1)
*/!*
    "room": {"number":23}               // (2)
  }
*/
```

Bu erda `date(1)` matnga aylanganini ko'rishimiz mumkin. Buning sababi shundaki, barcha sanalarda bunday turdagi matnga qaytaradigan o'rnatilgan `toJSON` usuli mavjud.

Endi `room(2)` obyekti uchun odatiy `toJSON` qo'shamiz:

```js run
let room = {
  number: 23,
*!*
  toJSON() {
    return this.number;
  }
*/!*
};

let meetup = {
  title: "Konferensiya",
  room
};

*!*
alert( JSON.stringify(room) ); // 23
*/!*

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Konferensiya",
*!*
    "room": 23
*/!*
  }
*/
```

<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
Ko'rib turganimizdek, `toJSON` to'g'ridan-to'g'ri chaqiruv uchun ishlatiladi `JSON.stringify(room)` va ichki o'rnatilgan obyekt uchun.
=======
As we can see, `toJSON` is used both for the direct call `JSON.stringify(room)` and when `room` is nested in another encoded object.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/12-json/article.md


## JSON.parse

JSON-matnni dekodlash uchun bizga [JSON.parse](mdn:js/JSON/parse) nomli boshqa usul kerak.

Sintaksis:
```js
let value = JSON.parse(str[, reviver]);
```

str
: JSON-matn ajratish uchun.

reviver
: Har bir `(kalit,qiymat)` juftligi uchun chaqiriladigan va qiymatni o'zgartirishi mumkin bo'lgan ixtiyoriy funktsiya(kalit, qiymat).

Masalan:

```js run
// torli qator
let numbers = "[0, 1, 2, 3]";

numbers = JSON.parse(numbers);

alert( numbers[1] ); // 1
```

Yoki ichki obyektlar uchun:

```js run
let userData = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

let user = JSON.parse(userData);

alert( user.friends[1] ); // 1
```

<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
JSON kerakli darajada murakkab bo'lishi mumkin, obyektlar va massivlar boshqa obyektlar va massivlarni o'z ichiga olishi mumkin. Ammo ular formatga bo'ysunishlari kerak.
=======
The JSON may be as complex as necessary, objects and arrays can include other objects and arrays. But they must obey the same JSON format.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/12-json/article.md

Qo'lda yozilgan JSON-dagi odatdagi xatolar (ba'zida uni koddagi nosozliklarni tuzatish maqsadida yozishimiz kerak):

```js
let json = `{
  *!*name*/!*: "John",                     // xato: qoshtirnoqsiz xususiyat nomi
  "surname": *!*'Smith'*/!*,               // xato: bitta qoshtirnoq qiymati (ikkita bo'lishi kerak)
  *!*'isAdmin'*/!*: false                  // xato: kalitda bitta qoshtirnoq (ikkita bo'lishi kerak)
  "birthday": *!*new Date(2000, 2, 3)*/!*, // xato: "new" ga yo'l qo'yilmaydi, faqat bo'sh qiymatlar
  "friends": [0,1,2,3]              // mana barchasi yaxshi
}`;
```

Bundan tashqari, JSON izohlarni qo'llab-quvvatlamaydi. JSON-ga izoh qo'shish uni bekor qiladi.

<<<<<<< HEAD
[JSON5](http://json5.org/) nomli yana bir format mavjud , bu qoshtirnoqsiz kalitlarga, izohlarga va hokazolarga imkon beradi, ammo bu tilning o'ziga xos xususiyatlarida emas, balki mustaqil kutubxona.
=======
There's another format named [JSON5](https://json5.org/), which allows unquoted keys, comments etc. But this is a standalone library, not in the specification of the language.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Oddiy JSON - bu ishlab chiquvchilar dangasa bo'lgani uchun emas, balki tahlil algoritmini oson, ishonchli va juda tez amalga oshirishga imkon berish uchun qat'iydir.

## Reviverdan foydalanish

Tasavvur qiling, biz serverdan `meetup` obyektini oldik.

Bu shunday ko'rinadi:

```js
// title: (meetup title), date: (meetup date)
let str = '{"title":"Konferensiya","date":"2017-11-30T12:00:00.000Z"}';
```

...Va endi biz uni JavaScript obyektiga aylantirish uchun *deserializatsiya qilishimiz* kerak.

Buni `JSON.parse` ga chaqiruv qilib bajaramiz:

```js run
let str = '{"title":"Konferensiya","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str);

*!*
alert( meetup.date.getDate() ); // Xato!
*/!*
```

Voy! Xato!

`meetup.date` ning qiymati `Date` obyekti emas, balki matndir. Qanday qilib `JSON.parse` ushbu matnni `Date` ga o'zgartirishi kerakligini bilishi mumkin?

<<<<<<< HEAD:1-js/05-data-types/11-json/article.md
`JSON.parse` ga barcha qiymatlarni "boricha" qaytaradigan qayta tiklash funktsiyasiga o'tkazaylik, lekin `date` `Date` ga aylanadi:
=======
Let's pass to `JSON.parse` the reviving function as the second argument, that returns all values "as is", but `date` will become a `Date`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/12-json/article.md

```js run
let str = '{"title":"Konferensiya","date":"2017-11-30T12:00:00.000Z"}';

*!*
let meetup = JSON.parse(str, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});
*/!*

alert( meetup.date.getDate() ); // hozir ishlaydi!
```

Aytgancha, bu ichki o'rnatilgan obyektlar uchun ham ishlaydi:

```js run
let schedule = `{
  "meetups": [
    {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
    {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
  ]
}`;

schedule = JSON.parse(schedule, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});

*!*
alert( schedule.meetups[1].date.getDate() ); // ishlaydi!
*/!*
```



## Xulosa

- JSON - bu ko'pgina dasturlash tillari uchun o'zining mustaqil standarti va kutubxonalariga ega bo'lgan ma'lumotlar formati.
- JSON oddiy obyektlar, massivlar, satrlar, raqamlar, mantiqiy turdagi qiymatlar va `null` ni qo'llab-quvvatlaydi.
- JavaScript-da JSON-ga seriyalash uchun [JSON.stringify](mdn:js/JSON/stringify) va JSON-dan o'qish uchun [JSON.parse](mdn:js/JSON/parse) usullari mavjud.
- Ikkala usul ham aqlli o'qish/yozish uchun transformator funktsiyalarini qo'llab-quvvatlaydi.
- Agar obyektda `toJSON` bo'lsa, u holda `JSON.stringify` tomonidan chaqiriladi.
