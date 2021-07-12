
# Map, Set, WeakMap va WeakSet

Endi biz quyidagi murakkab ma'lumotlar tuzilmalari haqida bilib oldik:

- Objects kalitli to'plamlarni saqlash uchun.
- Arrays ro'yxatlangan to'plamlarni saqlash uchun.

Ammo bu haqiqiy hayot uchun yetarli emas. Shuning uchun `Map` va `Set` ham mavjud.

## Map

[Map](mdn:js/Map) - bu `Object` singari kalit ma'lumotlar to'plamidir. Ammo asosiy farq shundaki, `Map` har qanday turdagi kalitlarga ruxsat beradi.

Asosiy usullar:

- `new Map()` -- Map obyektini yaratadi.
- `map.set(key, value)` -- qiymatni kalit bilan saqlaydi.
- `map.get(key)` -- qiymatni kalit bilan qaytaradi, agar `key` obyektda mavjud bo'lmasa `undefined` qaytaradi.
- `map.has(key)` -- agar `key` mavjud bo'lsa `true`, aks holda `false` qiymatini qaytaradi.
- `map.delete(key)` -- qiymatni kalit bilan olib tashlaydi.
- `map.clear()` -- obyektni tozalaydi
- `map.size` -- joriy elementlar sonini qaytaradi.

Masalan:

```js run
let map = new Map();

map.set('1', 'str1');   // matnli kalit
map.set(1, 'num1');     // raqamli kalit
map.set(true, 'bool1'); // mantiqiy turdagi kalit

// muntazam Obyektni eslaysizmi? u kalitlarni matnlarga o'zgartiradi
// Map kalitning turini saqlaydi, shuning uchun bu ikkalasi har xil:
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

Ko'rib turganimizdek, obyektlardan farqli o'laroq, kalitlar matnlarga aylantirilmaydi. Har qanday turdagi kalit mumkin.

**Map obyektlardan kalit sifatida ham foydalanishi mumkin.**

Masalan:
```js run
let john = { name: "John" };

// har bir foydalanuvchi uchun ularning tashriflari sonini saqlaylik
let visitsCountMap = new Map();

// john obyekt uchun kalit
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

Obyektlardan kalit sifatida foydalanish eng muhim `Map` xususiyatlaridan biridir. Matn kalitlar uchun `Object` yaxshi bo'lishi mumkin, ammo yuqoridagi misolda `Map` ni odatdagi `Object` bilan almashtirish qiyin bo'lar edi.

Qadimgi davrlarda, `Map` mavjud bo'lishidan oldin, odamlar obyektlarga noyob identifikatorlarni qo'shishgan:

```js run
// biz id maydonini qo'shdik
let john = { name: "John", *!*id: 1*/!* };

let visitsCounts = {};

// endi qiymatni id yordamida saqlang
visitsCounts[john.id] = 123;

alert( visitsCounts[john.id] ); // 123
```

...Ammo `Map` juda ham zebo.


```smart header="`Map` kalitlarni qanday taqqoslaydi"
Ekvivalentlik uchun qiymatlarni sinash uchun `Map` algoritmi [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero) dan foydalanadi. Bu qat'iy tenglik bilan bir xil `===`, ammo farq shundaki, `NaN` `NaN` ga teng hisoblanadi. Shunday qilib, `NaN` dan ham kalit sifatida foydalanish mumkin.

Ushbu algoritmni o'zgartirish yoki sozlash mumkin emas.
```


````smart header="Zanjirlash"

Har bir `map.set` chaqiruvi obyektni o'zini qaytaradi, shuning uchun biz chaqiruvlarni `zanjirlashimiz` mumkin:

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````

## Object dan Map

`Map` yaratilganda, biz quyidagicha kalit-qiymat juftlari bilan massivni (yoki boshqa ketma-ket saraluchan) o'tkaza olamiz:

```js
// array of [key, value] pairs
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);
```

Obyekt uchun kalit/qiymat juftlari massivini aynan shu formatda qaytaradigan o'rnatilgan [Object.entries(obj)](mdn:js/Object/entries) usuli mavjud.

Shunday qilib, biz oddiy obyektdan `Map` ni quyidagicha yaratishimiz mumkin:

```js
let map = new Map(Object.entries({
  name: "John",
  age: 30
}));
```

Bu erda `Object.entries` kalit/qiymat juftlari massivini qaytaradi: `[["name", "John"], ["age", 30]]`. `Map` ga kerak bo'lgan narsa.

## Map ustida takrorlash

`Map` ustida tsiklash uchun uchta usul mavjud:

- `map.keys()` -- kalitlar uchun ketma-ket saraluchanlarni qaytaradi,
- `map.values()` -- qiymatlar uchun ketma-ket saraluchanlanni qaytaradi,
- `map.entries()` -- `[key, value]` yozuvlari uchun ketma-ket saraluchanlanni qaytaradi, u sukut bo'yicha `for..of` da ishlatiladi.

Masalan:

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// kalitlar ustida takrorlash (sabzavotlar)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// qiymatlar (summalar) ustida takrorlash
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// [key, value] yozuvlari ustida takrorlash
for (let entry of recipeMap) { // the same as of recipeMap.entries()
  alert(entry); // cucumber,500 (va hokazo)
}
```

```smart header="Qo'shish tartibi ishlatiladi"
Takrorlash qiymatlar kiritilgan tartibda amalga oshiriladi. `Map` odatdagi `Object` dan farqli o'laroq, ushbu tartibni saqlaydi.
```

Bundan tashqari, `Map` da `Array` ga o'xshash o'rnatilgan `forEach` usuli mavjud:

```js
// har bir (kalit, qiymat) juftlik uchun funktsiyani ishlatadi
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 etc
});
```


## Set

`Set` bu har bir qiymat faqat bir marta sodir bo'lishi mumkin bo'lgan qiymatlar to'plamidir.

Uning asosiy usullari:

- `new Set(iterable)` -- to'plamni ixtiyoriy ravishda qiymatlar qatoridan hosil qiladi (har qanday ketma-ket saraluchan bajariladi).
- `set.add(value)` -- qiymat qo'shadi, to'plamni o'zini qaytaradi.
- `set.delete(value)` -- qiymatni olib tashlaydi, agar chaqiruv paytida `value` mavjud bo'lsa, `true`, aks holda `false` qiymatini qaytaradi.
- `set.has(value)` -- agar qiymat to'plamda mavjud bo'lsa, `true` ni qaytaradi, aks holda `false`.
- `set.clear()` -- hamma narsani to'plamdan olib tashlaydi.
- `set.size` -- elementlarni hisoblaydi.

Masalan, bizda mehmonlar keladi va biz barchani eslab qolishni xohlaymiz. Ammo takroriy tashriflar dublikatlarga olib kelmasligi kerak. Mehmonni faqat bir marta "hisoblash" kerak.

`Set` buning uchun to'g'ri narsa:

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// tashriflar, ba'zi foydalanuvchilar bir necha bor kelishadi
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// to'plam faqat noyob qiymatlarni saqlaydi
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (so'ng Pete va Mary)
}
```

`Set` ga alternativa foydalanuvchilar massivi va [arr.find](mdn:js/Array/find) yordamida har bir qo'shimchadagi dublikatlarni tekshiradigan kod bo'lishi mumkin. Ammo ijro ancha yomonroq bo'lar edi, chunki bu usul har bir elementni tekshirish uchun butun massiv bo'ylab yuradi. `Set` o'ziga xoslikni tekshirish uchun ichki qismda juda yaxshi optimallashtirilgan.

## Set ustida takrorlash

Biz `for..of` bilan yoki `forEach` yordamida to'plamni ustida takrorlashimiz mumkin:

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// the same with forEach:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

Qiziqarli narsaga e'tibor bering. `Set` dagi `forEach` funktsiyasi 3 ta argumentga ega: qiymat, keyin *yana qiymat*, so'ngra maqsadli obyekt. Darhaqiqat, bitta qiymat argumentlarda ikki marta paydo bo'ladi.

Bu `forEach` chaqiruvi 3 argumentga ega bo'lgan `Map` obyekti bilan muvofiqligi uchun amalga oshiriladi. Bir oz g'alati ko'rinadi, lekin ba'zi hollarda `Map` ni `Set` bilan osongina almashtirishga yordam berishi mumkin va aksincha.

Xuddi shu `Map` ning ketma-ket sarraluvchanlari uchun qo'llaniladigan usullari ham qo'llab-quvvatlanadi:

- `set.keys()` -- qiymatlar uchun ketma-ket sarraluvchan obyektni qaytaradi,
- `set.values()` -- `set.keys` bilan bir xil, `Map` bilan mosligi uchun,
- `set.entries()` -- `[value, value]` yozuvlari uchun ketma-ket sarraluvchan obyektni qaytaradi, `Map` bilan mosligi uchun mavjud.

## WeakMap va WeakSet

`WeakSet` - bu JavaScript-ni o'z xotirasini xotiradan o'chirishga to'sqinlik qilmaydigan `Set` ning maxsus turi. `WeakMap` - `Map` uchun xuddi shu narsa.

<info:garbage-collection> bobidan ma'lum bo'lganidek, JavaScript interpretatori xotirada saqlanadigan qiymatni u mavjud bo'lganda saqlaydi (va undan foydalanish mumkin).

Masalan:
```js
let john = { name: "John" };

// obyektga kirish mumkin, john - unga havola

// havolani qayta yozish
john = null;

*!*
// obyekt xotiradan o'chiriladi
*/!*
```

Odatda, obyektning xususiyatlari yoki massiv elementlari yoki boshqa ma'lumotlar tuzilmasi mavjud deb hisoblanadi va ma'lumotlar tuzilishi xotirada bo'lganda xotirada saqlanadi.

Masalan, agar biz obyektni massivga qo'ysak, u holda massiv tirik bo'lguncha, obyekt unga boshqa havolalar bo'lmasa ham, tirik bo'ladi.

Shunga o'xshash:

```js
let john = { name: "John" };

let array = [ john ];

john = null; // havolani qayta yozish

*!*
// john massiv ichida saqlanadi, shuning uchun o'chirilmaydi
// biz buni array[0] olishimiz mumkin
*/!*
```

Yoki agar biz odatdagi `Map` da obyektni kalit sifatida ishlatsak, u holda `Map` mavjud bo'lganda, obyekt ham mavjud bo'ladi. U xotirani egallaydi va o'chirilmashi mumkin.

Masalan:

```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // havolani qayta yozish

*!*
// john map obyektning ichida saqlanadi,
// map.keys() foydalanish orqali olishimiz mumkin 
*/!*
```

`WeakMap/WeakSet` bu jihatdan tubdan farq qiladi. Ular asosiy obyektlarning axlat yig'ilishiga to'sqinlik qilmaydi.

Keling, buni `WeakMap` dan boshlab tushuntiramiz.

`Map` dan birinchi farq shundaki, `WeakMap` kalitlari ibtidoiy qiymatlar emas, balki obyektlar bo'lishi kerak:

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // yaxshi ishlaydi (obyekt kaliti)

*!*
// matnni kalit sifatida ishlata olmaydi
weakMap.set("test", "Whoops"); // Xato, chunki "test" obyekt emas
*/!*
```

Endi, agar biz obyektni kalit sifatida ishlatsak va u obyektga boshqa havolalar bo'lmasa - u xotiradan (va map obyektidan) avtomatik ravishda o'chiriladi.

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // havolani qayta yozish

// john xotiradan o'chirildi!
```

Uni yuqoridagi odatdagi `Map` misoli bilan taqqoslang. Endi `john` faqat `WeakMap` ning kaliti sifatida mavjud bo'lsa -- u avtomatik ravishda o'chirilishi kerak.

`WeakMap` takrorlashni va `key()`, `values()`, `entries()` usullarini qo'llab-quvvatlamaydi, shuning uchun undan barcha kalitlarni yoki qiymatlarni olishning imkoni yo'q.

`WeakMap`faqat quyidagi usullarga ega:

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.delete(key)`
- `weakMap.has(key)`

Nima uchun bunday cheklov? Bu texnik sabablarga ko'ra. Agar obyekt boshqa barcha havolalarni yo'qotgan bo'lsa (masalan, yuqoridagi koddagi `john`), u avtomatik ravishda o'chirilishi kerak. Ammo texnik jihatdan *tozalash qachon* bajarilishi aniq ko'rsatilmagan.

JavaScript interpretatori buni hal qiladi. Zudlik bilan xotirani tozalashni amalga oshirishni yoki keyinchalik o'chirishni kutib, tozalashni tanlashi mumkin. Shunday qilib, texnik jihatdan `WeakMap` ning joriy elementlari soni ma'lum emas. Intrerpretator uni tozalagan yoki tozalamagan yoki qisman qilgan bo'lishi mumkin. Shu sababli, umuman `WeakMap` ga kirish usullari qo'llab-quvvatlanmaydi.

Endi bunday narsa bizga qayerda kerak?

"WeakMap" g'oyasi shundan iboratki, biz obyekt uchun faqat obyekt mavjud bo'lganda bo'lishi kerak bo'lgan narsalarni saqlashimiz mumkin. Ammo biz obyektni shunchaki u uchun biror narsa saqlashimiz bilan yashashga majburlamaymiz.

```js
weakMap.set(john, "maxfiy hujjatlar");
// agar John vafot etsa, maxfiy hujjatlar avtomatik ravishda yo'q qilinadiy
```

Bu obyektlar uchun biron bir joyda saqlanadigan asosiy xotira va qo'shimcha ma'lumotni saqlash kerak bo'lgan holatlar uchun foydalidir, bu faqat obyekt yashaydigan vaqtga tegishli.

Keling, bir misolni ko'rib chiqaylik.

Masalan, bizda har bir foydalanuvchi uchun tashriflar sonini saqlaydigan kod mavjud. Ma'lumot map obyektida saqlanadi: foydalanuvchi kalit, tashriflar soni esa qiymatdir. Agar foydalanuvchi chiqib ketsa, biz endi tashriflar sonini saqlamoqchi emasmiz.

Buning bir usuli foydalanuvchilarni kuzatib borish va ular tark etganda map obyektni qo'lda tozalashdir.

```js run
let john = { name: "John" };

// map: user => tashriflar soni
let visitsCountMap = new Map();

// john map obyekti uchun kalit
visitsCountMap.set(john, 123);

// endi john bizni tark etadi, endi u bizga kerak emas
john = null;

*!*
// ammo u hali ham obyektda, biz uni tozalashimiz kerak!
*/!*
alert( visitsCountMap.size ); // 1
// va John ham xotirada, chunki Map uni kalit sifatida ishlatadi
```

Boshqa usul `WeakMap` dan foydalanish bo'ladi

```js
let john = { name: "John" };

let visitsCountMap = new WeakMap();

visitsCountMap.set(john, 123);

// endi john bizni tark etadi, endi u bizga kerak emas
john = null;

// WeakMap dan tashqari boshqa hech qanday ma'lumot yo'q,
// shuning uchun obyekt ham xotiradan, ham visitCountMap-dan avtomatik ravishda o'chiriladi
```

Muntazam `Map` bilan foydalanuvchi ketganidan keyin tozalash zerikarli vazifaga aylanadi: biz foydalanuvchini nafaqat uning asosiy xotiradan (o'zgaruvchi yoki massiv bo'lsin) olib tashlashimiz, balki qo'shimcha joylardan ham tozalashimiz kerak, `visitCountMap` kabi. Foydalanuvchilar kodning bir joyida va qo'shimcha tuzilmasi boshqa joyda bo'lganida va olib tashlash haqida ma'lumot olmaydigan bo'lsa, bu yanada murakkab holatlarda noqulay bo'lishi mumkin.

```xulosa
`WeakMap` ishni soddalashtirishi mumkin, chunki u avtomatik ravishda tozalanadi. Undagi tashriflar kabi ma'lumotlar yuqoridagi misolda faqat asosiy obyekt mavjud bo'lganda yashaydi.
```

`WeakSet` xuddi shunday yo'l tutadi:

- Bu `Set ga o'xshash, ammo biz faqat `WeakSet` ga obyektlarni qo'shishimiz mumkin (ibtidoiy emas).
- Obyekt to'plamda mavjud bo'lib, unga boshqa joydan erishish mumkin.
- `Set` singari, u `add`, `has` va `delete` ni qo'llab-quvvatlaydi, lekin `size`, `keys()` va lekin takrorlashlar bo'lmaydi.

Masalan, biz undan xabarning o'qilishini tekshirib ko'rish uchun foydalanishimiz mumkin:

```js
let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];

// uni massiv elementlari bilan to'ldiring (3 ta element)
let unreadSet = new WeakSet(messages);

// xabar o'qilmaganligini ko'rish uchun unreadSet-dan foydalaning
alert(unreadSet.has(messages[1])); // true

// uni o'qishdan keyin to'plamdan olib tashlang
unreadSet.delete(messages[1]); // true

// va biz xabarlar tarixini o'zgartirganda to'plam avtomatik ravishda tozalanadi
messages.shift();

*!*
// unreadSet-ni tozalashning hojati yo'q, endi u 2 ta elementdan iborat
*/!*
// (texnik jihatdan JS interpretatori qachon uni o'chirishini aniq bilmaymiz)
```

`WeakMap` va `WeakSet` ning eng muhim cheklovi - takrorlashning yo'qligi va barcha mavjud tarkibni olishning iloji yo'qligi. Bu noqulay ko'rinishi mumkin, ammo `WeakMap/WeakSet` ning asosiy ishlarini bajarishiga to'sqinlik qilmaydi - boshqa joyda saqlanadigan/boshqariladigan obyektlar uchun ma'lumotlarning "qo'shimcha" xotirasi bo'lishi kerak.

## Xulosa

Muntazam to'plamlar:
- `Map` -- kalit qiymatlar to'plamidir.

    Oddiy `Object` dan farqlari:

    - Har qanday kilatilar, obyektlar kalit bo'lishi mumkin.
    - Qo'shish tartibida takrorlanadi.
    - Qo'shimcha qulay usullar, `size` xususiyati.

- `Set` -- noyob qiymatlar to'plamidir.

    - Massivdan farqli o'laroq, elementlarning tartibini o'zgartirishga imkon bermaydi.
    - Qo'shish tartibini saqlaydi.

Axlatni yig'ishga imkon beradigan to'plamlar:

- `WeakMap` -- `Map` ning varianti, bu faqat havolalarni kalit sifatida ishlatishga imkon beradi va ularni boshqa usullar bilan qo'lga kiritilmagandan keyin ularni o'chiradi.

    - Bu strukturadagi operatsiyalarni umuman qo'llab-quvvatlamaydi: `size` yo'q, `clear()` yo'q, takrorlash yo'q.

- `WeakSet` -- `Set` ning bir variantidir, u faqat obyektlarni saqlaydi va ularni boshqa usullar bilan qo'lga kiritilmagandan so'ng ularni olib tashlaydi.

    - Shuningdek, `size/clear()` va takrorlashni qo'llab-quvvatlamaydi.

`WeakMap` va `WeakSet` "asosiy" obyektni saqlashga qo'shimcha ravishda "ikkinchi darajali" ma'lumotlar tuzilmalari sifatida ishlatiladi. Obyekt asosiy xotiradan chiqarilgandan so'ng, agar u faqat `WeakMap/WeakSet` da topilsa, u avtomatik ravishda tozalanadi.
