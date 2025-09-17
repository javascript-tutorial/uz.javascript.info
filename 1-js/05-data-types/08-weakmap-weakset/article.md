# WeakMap va WeakSet

<info:garbage-collection> bo'limidan ma'lumki, JavaScript mexanizmi qiymatni xotirada "yetib boriladigan" bo'lib qolgan va potentsial ravishda ishlatilishi mumkin bo'lgan vaqt davomida saqlaydi.

Misol uchun:
```js
let john = { name: "John" };

// objektga kirish mumkin, john unga havola

// havolani qayta yozish
john = null;

*!*
// objekt xotiradan olib tashlanadi
*/!*
```

Odatda, objektning xususiyatlari yoki massiv elementlari yoki boshqa ma'lumotlar strukturasi elementlari yetib boriladigan deb hisoblanadi va shu ma'lumotlar strukturasi xotirada bo'lgancha xotirada saqlanadi.

Misol uchun, agar biz objektni massivga qo'ysak, massiv tirik bo'lgancha, objekt ham tirik bo'ladi, hatto unga boshqa havolalar bo'lmasa ham.

Mana bunday:

```js
let john = { name: "John" };

let array = [ john ];

john = null; // havolani qayta yozish

*!*
// avval john tomonidan havola qilingan objekt massiv ichida saqlanadi
// shuning uchun u garbage-collection qilinmaydi
// biz uni array[0] sifatida olishimiz mumkin
*/!*
```

Xuddi shunday, agar biz objektni oddiy `Map` da kalit sifatida ishlatsak, u holda `Map` mavjud bo'lgancha, bu objekt ham mavjud bo'ladi. U xotirani egallaydi va garbage collection qilinmasligi mumkin.

Misol uchun:

```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // havolani qayta yozish

*!*
// john xarita ichida saqlanadi,
// biz uni map.keys() dan foydalanib olishimiz mumkin
*/!*
```

`WeakMap` bu jihatdan tubdan farq qiladi. U kalit objektlarning garbage-collection qilinishiga to'sqinlik qilmaydi.

Misollar orqali bu nimani anglatishini ko'raylik.

## WeakMap

`Map` va `WeakMap` o'rtasidagi birinchi farq shundaki, kalitlar objektlar bo'lishi kerak, primitiv qiymatlar emas:

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // yaxshi ishlaydi (objekt kaliti)

*!*
// satrni kalit sifatida ishlatib bo'lmaydi
weakMap.set("test", "Whoops"); // Xato, chunki "test" objekt emas
*/!*
```

Endi, agar biz objektni unda kalit sifatida ishlatsak va bu objektga boshqa havolalar bo'lmasa -- u xotiradan (va xaritadan) avtomatik ravishda olib tashlanadi.

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // havolani qayta yozish

// john xotiradan olib tashlandi!
```

Uni yuqoridagi oddiy `Map` misoli bilan solishtiring. Endi agar `john` faqat `WeakMap` ning kaliti sifatida mavjud bo'lsa -- u xaritadan (va xotiradan) avtomatik ravishda o'chiriladi.

`WeakMap` iteratsiyani va `keys()`, `values()`, `entries()` metodlarini qo'llab-quvvatlamaydi, shuning uchun undan barcha kalitlar yoki qiymatlarni olishning imkoni yo'q.

`WeakMap` faqat quyidagi metodlarga ega:

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.delete(key)`
- `weakMap.has(key)`

Nega bunday cheklash? Bu texnik sabablarga ko'ra. Agar objekt boshqa barcha havolalarni yo'qotgan bo'lsa (yuqoridagi koddagi `john` kabi), u avtomatik ravishda garbage-collection qilinishi kerak. Lekin texnik jihatdan *tozalash qachon sodir bo'lishi* aniq belgilanmagan.

JavaScript mexanizmi buni hal qiladi. U xotira tozalashni darhol bajarishni yoki kutishni va ko'proq o'chirish sodir bo'lganda tozalashni tanlashi mumkin. Shunday qilib, texnik jihatdan `WeakMap` ning joriy element soni noma'lum. Mexanizm uni tozalagan bo'lishi yoki yo'q, yoki qisman bajargan bo'lishi mumkin. Shu sababdan barcha kalitlar/qiymatlarni oladigan metodlar qo'llab-quvvatlanmaydi.

Endi, bizga bunday ma'lumotlar strukturasi qayerda kerak?

## Foydalanish holati: qo'shimcha ma'lumotlar

`WeakMap` ning asosiy qo'llanish sohasi *qo'shimcha ma'lumotlar saqlashi*dir.

Agar biz boshqa kodga "tegishli" bo'lgan objekt bilan ishlayotgan bo'lsak, hatto uchinchi tomon kutubxonasi bo'lsa ham, va u bilan bog'liq ba'zi ma'lumotlarni saqlashni istasak, bu faqat objekt tirik bo'lgan vaqtda mavjud bo'lishi kerak - u holda `WeakMap` aynan kerak bo'lgan narsadir.

Biz ma'lumotlarni `WeakMap` ga qo'yamiz, objektni kalit sifatida ishlatamiz va objekt garbage collection qilinganda, bu ma'lumotlar ham avtomatik ravishda yo'qoladi.

```js
weakMap.set(john, "maxfiy hujjatlar");
// agar john o'lsa, maxfiy hujjatlar avtomatik ravishda yo'q qilinadi
```

Misolga qaraylik.

Misol uchun, bizda foydalanuvchilar uchun tashrif sonini saqlaydigan kod bor. Ma'lumot xaritada saqlanadi: foydalanuvchi objekti kalit, tashrif soni esa qiymatdir. Foydalanuvchi ketganda (uning objekti garbage collection qilinganda), biz ularning tashrif sonini saqlashni xohlamaymiz.

Mana `Map` bilan sanash funktsiyasining misoli:

```js
// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: user => visits count

// tashrif sonini oshirish
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

Va mana kodning boshqa qismi, ehtimol uni ishlatadigan boshqa fayl:

```js
// 📁 main.js
let john = { name: "John" };

countUser(john); // uning tashriflarini sanash

// keyinroq john bizni tark etadi
john = null;
```

Endi `john` objekti garbage collection qilinishi kerak, lekin xotirada qoladi, chunki u `visitsCountMap` da kalit.

Foydalanuvchilarni olib tashlaganimizda `visitsCountMap` ni tozlashimiz kerak, aks holda u xotirada cheksiz o'sib boradi. Bunday tozalash murakkab arxitekturalarda zerikarli vazifaga aylanishi mumkin.

Buning o'rniga `WeakMap` ga o'tish orqali bundan qochishimiz mumkin:

```js
// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: user => visits count

// tashrif sonini oshirish
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

Endi `visitsCountMap` ni tozlashimiz shart emas. `john` objekti `WeakMap` ning kaliti sifatidagidan boshqa barcha yo'llar bilan yetib borilmaydigan bo'lgandan so'ng, u `WeakMap` dan shu kalit bo'yicha ma'lumotlar bilan birga xotiradan olib tashlanadi.

## Foydalanish holati: keshlash

Yana bir keng tarqalgan misol - keshlash. Biz funktsiya natijalarini saqlashimiz ("keshlash") mumkin, shunda bir xil objekt uchun kelajakdagi chaqiruvlar uni qayta ishlatishi mumkin.

Bunga erishish uchun biz `Map` dan foydalanishimiz mumkin (optimal bo'lmagan stsenari):

```js run
// 📁 cache.js
let cache = new Map();

// natijani hisoblash va eslab qolish
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* obj uchun natijani hisoblash */;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

*!*
// Endi biz process() ni boshqa faylda ishlatamiz:
*/!*

// 📁 main.js
let obj = {/* aytaylik bizda objekt bor */};

let result1 = process(obj); // hisoblandi

// ...keyinroq, kodning boshqa joyidan...
let result2 = process(obj); // keshdan olingan eslab qolingan natija

// ...keyinroq, objekt endi kerak bo'lmaganda:
obj = null;

alert(cache.size); // 1 (Voy! Objekt hali ham keshda, xotirani egallaydi!)
```

Bir xil objekt bilan `process(obj)` ning bir necha marta chaqirilishida, u natijani faqat birinchi marta hisoblaydi, keyin uni `cache` dan oladi. Salbiy tomoni shundaki, objekt endi kerak bo'lmaganda `cache` ni tozlashimiz kerak.

Agar `Map` ni `WeakMap` bilan almashtirsak, bu muammo yo'qoladi. Keshlangan natija objekt garbage collection qilingandan keyin xotiradan avtomatik ravishda olib tashlanadi.

```js run
// 📁 cache.js
*!*
let cache = new WeakMap();
*/!*

// natijani hisoblash va eslab qolish
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* obj uchun natijani hisoblash */;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* biror objekt */};

let result1 = process(obj);
let result2 = process(obj);

// ...keyinroq, objekt endi kerak bo'lmaganda:
obj = null;

// cache.size ni olib bo'lmaydi, chunki bu WeakMap,
// lekin u 0 yoki tez orada 0 bo'ladi
// obj garbage collection qilinganda, keshlangan ma'lumotlar ham olib tashlanadi
```

## WeakSet

`WeakSet` xuddi shunday harakat qiladi:

- Bu `Set` ga o'xshash, lekin biz `WeakSet` ga faqat objektlar qo'shishimiz mumkin (primitivlar emas).
- Objekt to'plamda boshqa joydan yetib boriladigan bo'lgancha mavjud.
- `Set` kabi, u `add`, `has` va `delete` ni qo'llab-quvvatlaydi, lekin `size`, `keys()` va iteratsiyalar yo'q.

"Zaif" bo'lib, u ham qo'shimcha saqlash vazifasini bajaradi. Lekin ixtiyoriy ma'lumotlar uchun emas, balki "ha/yo'q" faktlari uchun. `WeakSet` dagi a'zolik objekt haqida biror narsani anglatishi mumkin.

Misol uchun, biz saytimizga tashrif buyurganlarni kuzatib borish uchun foydalanuvchilarni `WeakSet` ga qo'shishimiz mumkin:

```js run
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John bizga tashrif buyurdi
visitedSet.add(pete); // Keyin Pete
visitedSet.add(john); // John yana

// visitedSet da endi 2 ta foydalanuvchi bor

// John tashrif buyurdimi?
alert(visitedSet.has(john)); // true

// Mary tashrif buyurdimi?
alert(visitedSet.has(mary)); // false

john = null;

// visitedSet avtomatik ravishda tozlanadi
```

`WeakMap` va `WeakSet` ning eng muhim cheklovi - iteratsiyalarning yo'qligi va barcha joriy tarkibni olishning imkoni yo'qligidir. Bu noqulay ko'rinishi mumkin, lekin `WeakMap/WeakSet` ning asosiy ishini bajarishga to'sqinlik qilmaydi -- boshqa joyda saqlanadigan/boshqariladigan objektlar uchun ma'lumotlarning "qo'shimcha" saqlash joyi bo'lish.

## Xulosa

`WeakMap` - bu `Map` ga o'xshash to'plam bo'lib, faqat objektlarga kalitlar sifatida ruxsat beradi va ular boshqa yo'llar bilan yetib borilmaydigan bo'lganda ular bilan bog'liq qiymat bilan birga olib tashlaydi.

`WeakSet` - bu `Set` ga o'xshash to'plam bo'lib, faqat objektlarni saqlaydi va ular boshqa yo'llar bilan yetib borilmaydigan bo'lganda ularni olib tashlaydi.

Ularning asosiy afzalliklari shundaki, ular objektlarga zaif havola qiladi, shuning uchun ular garbage collector tomonidan osonlikcha olib tashlanishi mumkin.

Bu `clear`, `size`, `keys`, `values`... ga qo'llab-quvvatlash yo'qligining narxiga keladi.

`WeakMap` va `WeakSet` "asosiy" objekt saqlashga qo'shimcha ravishda "ikkinchi darajali" ma'lumotlar strukturalari sifatida ishlatiladi. Objekt asosiy saqlashdan olib tashlangandan so'ng, agar u faqat `WeakMap` ning kaliti yoki `WeakSet` da topilsa, u avtomatik ravishda tozlanadi.