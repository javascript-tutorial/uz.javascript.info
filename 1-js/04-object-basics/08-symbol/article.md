# Belgilar turi

Spetsifikatsiya bo'yicha obyekt xususiyatining kalitlari matn turi yoki belgi turi bo'lishi mumkin. Raqamlar emas, mantiqiy emas, faqat matn yoki belgilar, bu ikki tur bo'lishi mumkin.

Hozirgacha biz faqat matnlarni ko'rib chiqamiz. Keling, belgilar bizga beradigan afzalliklarni ko'rib chiqaylik.

## Belgilar

"Symbol" qiymati noyob identifikatorni ifodalaydi.

Ushbu turdagi qiymatni `Symbol()` yordamida yaratish mumkin:

```js
// id bu yangi belgi
let id = Symbol();
```

Shuningdek, biz belgiga tavsif bera olamiz (belgi nomi ham deyiladi), bu asosan koddagi hatoliklarni tuzatish uchun foydalidir:

```js run
// id bu "id" tavsifiga ega bo'lgan belgidir
let id = Symbol("id");
```

Belgilar noyob bo'lishi kafolatlanadi. Agar biz bir xil tavsifga ega bo'lgan ko'plab belgilarni yaratadigan bo'lsak ham, ular har xil qiymatlardir. Tavsif shunchaki hech narsaga ta'sir qilmaydigan yorliq.

Masalan, mana bir xil tavsifga ega ikkita belgi -- ular teng emas:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

Agar siz Ruby yoki boshqa biron bir "symbol" ga ega bo'lgan boshqa tilni bilsangiz, iltimos, adashmang. JavaScript-da belgilar boshqacha.

````warn header="Belgilar avtomatik ravishda matnga aylantirilmaydi"
JavaScript-dagi aksariyat qiymatlar matnga aylantirishni qo'llab-quvvatlaydi. Masalan, biz deyarli har qanday qiymatni `alert` ya'ni ekranga chiqazishimiz mumkin va u ishlaydi. Belgilar alohida ahamiyatga ega. Ular avtomatik konvertatsiya qilmaydi.

Masalan, ushbu `alert` xatolikni ko'rsatadi:

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Cannot convert a Symbol value to a string
*/!*
```

That's a "language guard" against messing up, because strings and symbols are fundamentally different and should not occasionally convert one into another.
Bu tartibsizliklardan "til himoyasi", chunki matnlar va belgilar bir-biridan tubdan farq qiladi vatasodifan boshqasiga konvertatsiya qilinmasi kerak.

Agar biz chindan ham belgini ko'rsatishni istasak, unda `.toString()` ni chaqirishimiz kerak, masalan:
```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id), endi u ishlaydi
*/!*
```

Yoki faqat tavsifni olish uchun `symbol.description` xususiyatini ishlatamiz:
```js run
let id = Symbol("id");
*!*
alert(id.description); // id
*/!*
```

````

## "Yashirin" xususiyatlar

Belgilar bizga obyektning "yashirin" xususiyatlarini yaratishga imkon beradi, chunki kodning boshqa hech bir qismi tasodifan kira olmaydi va qayta yozib bo'lmaydi.

Masalan, ёuser` obyekti uchun "identifikator" ni saqlamoqchi bo'lsak, buning uchun kalit sifatida belgidan foydalanishimiz mumkin:

```js run
let user = {
  // belongs to another code
  name: "John",
};

let id = Symbol("id");

user[id] = "ID Value";
alert(user[id]); // biz kalit sifatida belgidan foydalangan holda ma'lumotlarga kirishimiz mumkin
```

`"id"` ning o'rniga `Symbol("id")` dan ishlatishning foydasi nimada?

Buni ko'rish uchun misolni biroz chuqurroq qilaylik.

Tasavvur qiling, boshqa skript o'z maqsadi uchun `user` ichida o'z "id" xususiyatiga ega bo'lishni xohlaydi. Bu boshqa JavaScript kutubxonasi bo'lishi mumkin, shuning uchun skriptlar bir-biridan umuman bexabar.

Keyin ushbu skript o'z `Symbol("id")` ni yaratishi mumkin, masalan:

```js
// ...
let id = Symbol("id");

user[id] = "Ularning id qiymati";
```

Hech qanday nizo bo'lmaydi, chunki belgilar har doim xar xil, hatto bir xil nomga ega bo'lsa ham.

Endi shuni yodda tutingki, agar biz xuddi shu maqsad uchun belgi o'rniga `"id"` matnidan foydalansak, u holda _nizo_ kelib chiqishi mumkin:

```js
let user = { name: "John" };

// bizning skriptimiz "id" xususiyatidan foydalanadi
user.id = "ID Qiymati";

// ...agar keyinchalik boshqa skript o'z maqsadlari uchun "id" dan foydalansa...

user.id = "Ularning id qiymati";
// bum! qayta yozildi! bu hamkasbga zarar etkazishni anglamasdi, lekin shunday qildi!
```

### Ramziy obyektdagi belgilar

Agar biz biror belgini obyekt ma'nosida ishlatmoqchi bo'lsak, kvadrat qavslar kerak.

Shunga o'xshash:

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
  [id]: 123 // nafaqat "id: 123"
*/!*
};
```

Buning sababi bizga `id` o'zgaruvchanning qiymati "id" matni emas, balki kalit sifatida kerak.

### Belgilar for...in tsikli bilan e'tiborsiz qoldiriladi

Ramziy xususiyatlar `for..in` tsiklida qatnashmaydi.

Masalan:

```js run
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

*!*
for (let key in user) alert(key); // name, age (belgilar yo'q)
*/!*

// to'g'ridan-to'g'ri murojaat belgisi ishlaydi
alert( "Direct: " + user[id] );
```

Bu umumiy "yashirish" tushunchasining bir qismi. Agar boshqa skript yoki kutubxona bizning obyektimizga o'girilsa, u kutilmaganda belgi xususiyatga kira olmaydi.

Aksincha, [Object.assign](mdn:js/Object/assigned) ham matn, ham belgi xususiyatlarini ko'chiradi:

```js run
let id = Symbol("id");
let user = {
  [id]: 123,
};

let clone = Object.assign({}, user);

alert(clone[id]); // 123
```

Bu erda paradoks yo'q. Buning dizayni shunaqa. G'oya shundan iboratki, biz obyektni klonlashda yoki moslamalarni birlashtirganda, biz odatda _barcha_ xususiyatlarini nusxalashni xohlaymiz (shu jumladan `id` kabi belgilar).

````smart header="Boshqa turdagi xususiyat kalitlari matnlarga majburan o'tkaziladi"
Biz faqat matnlarni yoki belgilarni obyektlarda kalit sifatida ishlatishimiz mumkin. Boshqa turlari matnlarga aylantiriladi.

Masalan, xususiyat kalit sifatida ishlatilganda `0` raqami `"0"` qatoriga aylanadi:

```js run
let obj = {
  0: "test" // "0": "test" bilan bir xil
};

// ikkala alert ham bir xil xususiyatga ega (0 raqami "0" qatoriga o'tkaziladi)
alert( obj["0"] ); // test
alert( obj[0] ); // test (bir xil xususiyat)
```
````

## Global belgilar

Ko'rib turganimizdek, odatda barcha belgilar bir xil nomlarda bo'lsa ham har xil bo'ladi. Ammo ba'zida biz bir xil nomdagi belgilar bir xil birlik bo'lishini xohlaymiz.

Masalan, dasturimizning turli qismlari aynan bir xil xususiyatni anglatuvchi `"id"` belgisiga kirishni xohlaydi.

Buning uchun _global belgilar ro'yxati_ mavjud. Biz unda belgilarni yaratishimiz va keyinchalik ularga murojaat qilishimiz mumkin va har bir murojaat bilan biz bir xil belgiga qaytishimiz kafolatlanadi.

Global belgilar ro'yxatida belgi yaratish yoki o'qish uchun `Symbol.for(key)` dan foydalaning.

Ushbu qo'ng'iroq global belgilar ro'yxatiga olishni tekshiradi va agar `key` deb tavsiflangan belgi bo'lsa, uni qaytaradi, aks holda yangi `Symbol(key)` belgisini yaratadi va uni `key` bilan global belgilar ro'yxatida saqlaydi.

Masalan:

```js run
// global belgilar ro'yxatidan o'qiladi
let id = Symbol.for("id"); // agar belgi mavjud bo'lmasa, u yaratiladi

// qayta o'qiladi
let idAgain = Symbol.for("id");

// bir xil belgi
alert(id === idAgain); // true
```

Registr ichidagi belgilar _global belgilar_ deb nomlanadi. Agar biz keng ko'lamli belgini xohlasak va kodning hamma joylarida mavjud bo'lishi kerak bo'lsa - unda ular juda kerak.

```smart header="Bu Ruby-ga o'xshaydi"
Ruby singari ba'zi dasturlash tillarida bitta nom uchun bitta belgi mavjud.

JavaScript-da, biz ko'rib turganimizdek, bu bayonot faqat global belgilar uchun to'g'ri.
```

### Symbol.keyFor

Global belgilar uchun nafaqat `Symbol.for(key)` belgini nomini qaytaradi, balki teskari chaqirish mavjud: `Symbol.keyFor(sym)`, bu teskari: nomni global belgi bilan qaytaradi.

Masalan:

```js run
// get symbol by name
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// belgidan nomni oling
alert(Symbol.keyFor(sym)); // name
alert(Symbol.keyFor(sym2)); // id
```

`Symbol.keyFor` belgi uchun kalitni izlash uchun global belgilar registridan foydalanadi. Shunday qilib, u global bo'lmagan belgilar uchun ishlamaydi. Agar belgi global bo'lmasa, uni topa olmaydi va `undefined` ni qaytaradi.

Masalan:

```js run
alert(Symbol.keyFor(Symbol.for("name"))); // name, global belgi

alert(Symbol.keyFor(Symbol("name2"))); // undefined, argument global belgi emas
```

## Tizim belgilari

JavaScript-da ichki ishlatadigan ko'plab "tizim" belgilar mavjud va biz ularni obyektlarimizning turli jihatlarini aniq sozlash uchun ishlatishimiz mumkin.

Ular [Taniqli belgilar](https://tc39.github.io/ecma262/#sec-well-known-symbols) jadvalidagi spetsifikatsiyada keltirilgan:

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- ...va hokazo.

Masalan, `Symbol.toPrimitive` bizni obyektni ibtidoiylarga konvertatsiyalashni imkon beradi. Tez orada uning ishlatilishini ko'ramiz.

Tegishli til xususiyatlarini o'rganganimizda boshqa belgilar ham tanish bo'lib qoladi.

## Xulosa

`Symbol` - noyob identifikatorlar uchun ibtidoiy tur.

Belgilar ixtiyoriy tavsifga ega bo'lgan `Symbol()` chaqiruvi bilan yaratilgan.

Belgilar bir xil nomga ega bo'lsa ham, har doim har xil qiymatga ega. Agar biz bir xil nomdagi belgilar teng bo'lishini istasak, unda global belgilar registridan foydalanishimiz kerak: `Symbol.for(key)` nomi bilan `key` global belgisini qaytaradi (agar kerak bo'lsa yaratadi). `Symbol.for` ning bir nechta chaqiruvlari aynan shu belgini qaytaradi.

Belgilar ikkita asosiy foydalanish holatiga ega:

1. "Yashirin" obyekt xususiyatlari.
   Agar biz boshqa skriptga yoki kutubxonaga "tegishli" bo'lgan obyektga xususiyat qo'shmoqchi bo'lsak, biz belgi yaratib, uni xususiyat kaliti sifatida ishlatishimiz mumkin. Belgi xususiyati `for..in` da ko'rinmaydi, shuning uchun u kutilmaganda ro'yxatga olinmaydi. Bundan tashqari, unga to'g'ridan-to'g'ri kirish imkoni bo'lmaydi, chunki boshqa skriptda bizning belgimiz yo'q, shuning uchun u kutilmaganda uning harakatlariga aralashmaydi.

   Shunday qilib, biz o'zimizga kerak bo'lgan obyektlarni "yashirincha" bekita olamiz, ammo boshqalar ko'rmasligi uchun, belgi xususiyatlaridan foydalanadi.

2. JavaScript tomonidan ishlatiladigan `Symbol.*` kabi tizimining ko'pgina belgilari mavjud. Biz ulardan ichki o'rnatilgan xatti-harakatlarni o'zgartirish uchun foydalanishimiz mumkin. Masalan, keyinchalik o'quv qo'llanmada biz `Symbol.toPrimitive` [obyektdan ibtidoiy konvertatsiya](info:object-toprimitive) va boshqalarni o'rnatish uchun `Symbol.iterator` dan foydalanamiz [iterables](info:iterable).

Texnik jihatdan belgilar 100% yashirin emas. Barcha belgilarni olishimizga imkon beradigan o'rnatilgan [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) usuli mavjud. Shuningdek, [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) deb nomlangan usul mavjud, bu obyektning _barcha_ kalitlarni, shu jumladan belgi kalitlarni qaytaradi. Shunday qilib, ular haqiqatan ham yashirin emas. Ammo aksariyat kutubxonalar, o'rnatilgan usullar va sintaksis tuzilmalari umumiy kelishuvga amal qilishadi. Yuqorida aytib o'tilgan usullarni aniq chaqirgan kishi, ehtimol, nima qilayotganini yaxshi tushunadi.
