# Map va Set

Hozirgacha biz quyidagi murakkab ma'lumotlar strukturalarini o'rgandik:

- Objektlar kalitli to'plamlarni saqlash uchun ishlatiladi.
- Massivlar tartibli to'plamlarni saqlash uchun ishlatiladi.

Ammo bu real hayot uchun yetarli emas. Shuning uchun `Map` va `Set` ham mavjud.

## Map

[Map](mdn:js/Map) - bu `Object` kabi kalitli ma'lumotlar to'plamidir. Lekin asosiy farq shundaki, `Map` har qanday turdagi kalitlarga ruxsat beradi.

Metodlar va xususiyatlar:

- `new Map()` -- xaritani yaratadi.
- `map.set(key, value)` -- kalit bo'yicha qiymatni saqlaydi.
- `map.get(key)` -- kalit bo'yicha qiymatni qaytaradi, agar `key` xaritada mavjud bo'lmasa `undefined` qaytaradi.
- `map.has(key)` -- agar `key` mavjud bo'lsa `true`, aks holda `false` qaytaradi.
- `map.delete(key)` -- kalit bo'yicha qiymatni o'chiradi.
- `map.clear()` -- xaritadagi hamma narsani o'chiradi.
- `map.size` -- hozirgi elementlar sonini qaytaradi.

Misol uchun:

```js run
let map = new Map();

map.set('1', 'str1');   // satr kaliti
map.set(1, 'num1');     // raqamli kalit
map.set(true, 'bool1'); // mantiqiy kalit

// oddiy Objektni eslaysizmi? u kalitlarni satrga aylantiradi
// Map turni saqlaydi, shuning uchun bu ikkalasi har xil:
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

Ko'rib turganingizdek, objektlardan farqli o'laroq, kalitlar satrga aylantirilmaydi. Har qanday turdagi kalit mumkin.

```smart header="`map[key]` - bu `Map` dan foydalanishning to'g'ri usuli emas"
Garchi `map[key]` ham ishlaydi, masalan, biz `map[key] = 2` qo'ya olamiz, lekin bu `map` ni oddiy JavaScript objekti sifatida ko'rib chiqadi, shuning uchun barcha mos cheklovlar keladi (faqat satr/simvol kalitlar va boshqalar).

Shuning uchun biz `map` metodlaridan foydalanishimiz kerak: `set`, `get` va boshqalar.
```

**Map objektlarni ham kalit sifatida ishlatishi mumkin.**

Misol uchun:

```js run
let john = { name: "John" };

// har bir foydalanuvchi uchun ularning tashrif sonini saqlaymiz
let visitsCountMap = new Map();

// john - xarita uchun kalit
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

Objektlarni kalit sifatida ishlatish `Map` ning eng muhim va diqqatga sazovor xususiyatlaridan biridir. Bu `Object` uchun amal qilmaydi. `Object` da satr kalit yaxshi, lekin biz boshqa `Object` ni `Object` da kalit sifatida ishlatib bo'lmaydi.

Sinab ko'raylik:

```js run
let john = { name: "John" };
let ben = { name: "Ben" };

let visitsCountObj = {}; // objektdan foydalanishga harakat qilaylik

visitsCountObj[ben] = 234; // ben objektini kalit sifatida ishlatishga harakat qilish
visitsCountObj[john] = 123; // john objektini kalit sifatida ishlatishga harakat qilish, ben objekti almashtiriladi

*!*
// Mana nima yozilgan!
alert( visitsCountObj["[object Object]"] ); // 123 
*/!*
```

`visitsCountObj` objekt bo'lganligi sababli, u barcha `Object` kalitlarini, masalan yuqoridagi `john` va `ben` ni bir xil `"[object Object]"` satrga aylantiradi. Bu biz xohlagan narsa emas.

```smart header="`Map` kalitlarni qanday solishtiradi"
Kalitlarning ekvivalentligini tekshirish uchun `Map` [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero) algoritmidan foydalanadi. Bu qat'iy tenglik `===` bilan deyarli bir xil, lekin farqi shundaki, `NaN` `NaN` ga teng deb hisoblanadi. Shuning uchun `NaN` ham kalit sifatida ishlatilishi mumkin.

Ushbu algoritm o'zgartirilishi yoki sozlanishi mumkin emas.
```

````smart header="Zanjir"
Har bir `map.set` chaqiruvi xaritaning o'zini qaytaradi, shuning uchun biz chaqiruvlarni "zanjir" qila olamiz:

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````

## Map ustida iteratsiya

`Map` ustida sikl uchun 3 ta metod mavjud:

- `map.keys()` -- kalitlar uchun iterable qaytaradi,
- `map.values()` -- qiymatlar uchun iterable qaytaradi,
- `map.entries()` -- `[key, value]` yozuvlari uchun iterable qaytaradi, u `for..of` da standart bo'yicha ishlatiladi.

Misol uchun:

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// kalitlar ustida iteratsiya (sabzavotlar)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// qiymatlar ustida iteratsiya (miqdorlar)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// [key, value] yozuvlari ustida iteratsiya
for (let entry of recipeMap) { // recipeMap.entries() bilan bir xil
  alert(entry); // cucumber,500 (va hokazo)
}
```

```smart header="Kiritish tartibi ishlatiladi"
Iteratsiya qiymatlar kiritilgan tartibda boradi. `Map` bu tartibni saqlaydi, oddiy `Object` dan farqli o'laroq.
```

Bundan tashqari, `Map` `Array` ga o'xshash o'rnatilgan `forEach` metodiga ega:

```js
// har bir (key, value) juftlik uchun funktsiyani ishga tushiradi
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 va hokazo
});
```

## Object.entries: Objektdan Map

`Map` yaratilganda, biz uni boshlash uchun kalit/qiymat juftliklari massivini (yoki boshqa iterable) uzatishimiz mumkin:

```js run
// [key, value] juftliklari massivi
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

alert( map.get('1') ); // str1
```

Agar bizda oddiy objekt bor va undan `Map` yaratmoqchi bo'lsak, u holda [Object.entries(obj)](mdn:js/Object/entries) o'rnatilgan metodidan foydalanishimiz mumkin, u objekt uchun aynan shu formatdagi kalit/qiymat juftliklari massivini qaytaradi.

Shunday qilib objektdan xarita yaratishimiz mumkin:

```js run
let obj = {
  name: "John",
  age: 30
};

*!*
let map = new Map(Object.entries(obj));
*/!*

alert( map.get('name') ); // John
```

Bu erda `Object.entries` kalit/qiymat juftliklari massivini qaytaradi: `[ ["name","John"], ["age", 30] ]`. `Map` ga aynan shu kerak.

## Object.fromEntries: Map dan objekt

Biz hozirgina `Object.entries(obj)` yordamida oddiy objektdan `Map` yaratishni ko'rdik.

Teskarisini bajaradigan `Object.fromEntries` metodi mavjud: `[key, value]` juftliklari massivini hisobga olgan holda, u ulardan objekt yaratadi:

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// endi prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

Biz `Map` dan oddiy objekt olish uchun `Object.fromEntries` dan foydalanishimiz mumkin.

Masalan, biz ma'lumotlarni `Map` da saqlaymiz, lekin uni oddiy objekt kutadigan uchinchi tomon kodiga uzatishimiz kerak.

Mana:

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

*!*
let obj = Object.fromEntries(map.entries()); // oddiy objekt yarating (*)
*/!*

// bajarildi!
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```

`map.entries()` chaqiruvi kalit/qiymat juftliklari iterableni qaytaradi, aynan `Object.fromEntries` uchun to'g'ri formatda.

Biz `(*)` qatorini qisqartira olamiz:
```js
let obj = Object.fromEntries(map); // .entries() ni tashlab qoldiring
```

Bu bir xil, chunki `Object.fromEntries` argument sifatida iterable objektni kutadi. Albatta massiv bo'lishi shart emas. Va `map` uchun standart iteratsiya `map.entries()` bilan bir xil kalit/qiymat juftliklarini qaytaradi. Shunday qilib biz `map` bilan bir xil kalit/qiymatlarga ega oddiy objektni olamiz.

## Set

`Set` - bu maxsus turdagi to'plam - "qiymatlar to'plami" (kalitsiz), bu erda har bir qiymat faqat bir marta paydo bo'lishi mumkin.

Uning asosiy metodlari:

- `new Set(iterable)` -- to'plamni yaratadi va agar `iterable` objekt berilgan bo'lsa (odatda massiv), undan qiymatlarni to'plamga nusxa ko'chiradi.
- `set.add(value)` -- qiymat qo'shadi, to'plamning o'zini qaytaradi.
- `set.delete(value)` -- qiymatni o'chiradi, chaqiruv momentida `value` mavjud bo'lsa `true`, aks holda `false` qaytaradi.
- `set.has(value)` -- qiymat to'plamda mavjud bo'lsa `true`, aks holda `false` qaytaradi.
- `set.clear()` -- to'plamdan hamma narsani o'chiradi.
- `set.size` -- elementlar soni.

Asosiy xususiyat shundaki, bir xil qiymat bilan `set.add(value)` ning takrorlangan chaqiruvlari hech narsa qilmaydi. Shuning uchun har bir qiymat `Set` da faqat bir marta paydo bo'ladi.

Misol uchun, bizga mehmonlar kelyapti va biz barchani eslab qolishni xohlaymiz. Lekin takrorlangan tashriflar dublikatlar olib kelmasligi kerak. Mehmon faqat bir marta "hisoblanishi" kerak.

`Set` aynan shu ish uchun to'g'ri:

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// tashriflar, ba'zi foydalanuvchilar bir necha marta kelishadi
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set faqat noyob qiymatlarni saqlaydi
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (keyin Pete va Mary)
}
```

`Set` ga alternativa foydalanuvchilar massivi bo'lishi mumkin va har bir kiritishda [arr.find](mdn:js/Array/find) dan foydalanib dublikatlarni tekshiradigan kod. Lekin ishlash ancha yomonroq bo'ladi, chunki bu metod har bir elementni tekshirib, butun massiv bo'ylab yuradi. `Set` noyoblikni tekshirish uchun ichki jihatdan ancha yaxshi optimallashtirilgan.

## Set ustida iteratsiya

Biz to'plam ustida `for..of` yoki `forEach` dan foydalanib sikl qilishimiz mumkin:

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// forEach bilan bir xil:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

Qiziq narsani qayd eting. `forEach` ga uzatilgan callback funktsiyasi 3 ta argumentga ega: `value`, keyin *bir xil qiymat* `valueAgain`, keyin maqsad objekt. Haqiqatan ham, bir xil qiymat argumentlarda ikki marta paydo bo'ladi.

Bu `Map` bilan moslashish uchun, bu erda `forEach` ga uzatilgan callback uchta argumentga ega. Albatta, biroz g'alati ko'rinadi. Lekin `Map` ni `Set` bilan oson almashtirish va aksincha yordam berishi mumkin.

`Map` da iteratorlar uchun bir xil metodlar `Set` da ham qo'llab-quvvatlanadi:

- `set.keys()` -- qiymatlar uchun iterable objektni qaytaradi,
- `set.values()` -- `set.keys()` bilan bir xil, `Map` bilan moslashish uchun,
- `set.entries()` -- `[value, value]` yozuvlari uchun iterable objektni qaytaradi, `Map` bilan moslashish uchun mavjud.

## Xulosa

`Map` -- kalitli qiymatlar to'plami.

Metodlar va xususiyatlar:

- `new Map([iterable])` -- xaritani yaratadi, boshlash uchun ixtiyoriy `iterable` (masalan, massiv) `[key,value]` juftliklari bilan.
- `map.set(key, value)` -- kalit bo'yicha qiymatni saqlaydi, xaritaning o'zini qaytaradi.
- `map.get(key)` -- kalit bo'yicha qiymatni qaytaradi, agar `key` xaritada mavjud bo'lmasa `undefined`.
- `map.has(key)` -- agar `key` mavjud bo'lsa `true`, aks holda `false` qaytaradi.
- `map.delete(key)` -- kalit bo'yicha qiymatni o'chiradi, chaqiruv momentida `key` mavjud bo'lsa `true`, aks holda `false` qaytaradi.
- `map.clear()` -- xaritadagi hamma narsani o'chiradi.
- `map.size` -- hozirgi elementlar sonini qaytaradi.

Oddiy `Object` dan farqlari:

- Har qanday kalitlar, objektlar kalit bo'lishi mumkin.
- Qo'shimcha qulay metodlar, `size` xususiyati.

`Set` -- noyob qiymatlar to'plami.

Metodlar va xususiyatlar:

- `new Set([iterable])` -- to'plamni yaratadi, boshlash uchun ixtiyoriy `iterable` (masalan, massiv) qiymatlar bilan.
- `set.add(value)` -- qiymat qo'shadi (`value` mavjud bo'lsa hech narsa qilmaydi), to'plamning o'zini qaytaradi.
- `set.delete(value)` -- qiymatni o'chiradi, chaqiruv momentida `value` mavjud bo'lsa `true`, aks holda `false` qaytaradi.
- `set.has(value)` -- qiymat to'plamda mavjud bo'lsa `true`, aks holda `false` qaytaradi.
- `set.clear()` -- to'plamdan hamma narsani o'chiradi.
- `set.size` -- elementlar soni.

`Map` va `Set` ustida iteratsiya har doim kiritish tartibida bo'ladi, shuning uchun biz bu to'plamlar tartibsiz deb ayta olmaymiz, lekin elementlarni qayta tartiblay olmaymiz yoki raqami bo'yicha to'g'ridan-to'g'ri element olishimiz mumkin emas.