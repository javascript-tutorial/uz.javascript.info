# Belgilar turi

Spetsifikatsiya bo'yicha obyekt xususiyatining kalitlari matn turi yoki belgi turi bo'lishi mumkin. Raqamlar emas, mantiqiy emas, faqat matn yoki belgilar, bu ikki tur bo'lishi mumkin.

<<<<<<< HEAD
Hozirgacha biz faqat matnlarni ko'rib chiqamiz. Keling, belgilar bizga beradigan afzalliklarni ko'rib chiqaylik.

## Belgilar
=======
By specification, only two primitive types may serve as object property keys:

- string type, or
- symbol type.

Otherwise, if one uses another type, such as number, it's autoconverted to string. So that `obj[1]` is the same as `obj["1"]`, and `obj[true]` is the same as `obj["true"]`.

Until now we've been using only strings.

Now let's explore symbols, see what they can do for us.
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

"Symbol" qiymati noyob identifikatorni ifodalaydi.

Ushbu turdagi qiymatni `Symbol()` yordamida yaratish mumkin:

```js
<<<<<<< HEAD
// id bu yangi belgi
let id = Symbol();
```

Shuningdek, biz belgiga tavsif bera olamiz (belgi nomi ham deyiladi), bu asosan koddagi hatoliklarni tuzatish uchun foydalidir:
=======
let id = Symbol();
```

Upon creation, we can give symbols a description (also called a symbol name), mostly useful for debugging purposes:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
// id bu "id" tavsifiga ega bo'lgan belgidir
let id = Symbol("id");
```

<<<<<<< HEAD
Belgilar noyob bo'lishi kafolatlanadi. Agar biz bir xil tavsifga ega bo'lgan ko'plab belgilarni yaratadigan bo'lsak ham, ular har xil qiymatlardir. Tavsif shunchaki hech narsaga ta'sir qilmaydigan yorliq.
=======
Symbols are guaranteed to be unique. Even if we create many symbols with exactly the same description, they are different values. The description is just a label that doesn't affect anything.
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

Masalan, mana bir xil tavsifga ega ikkita belgi -- ular teng emas:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

Agar siz Ruby yoki boshqa biron bir "symbol" ga ega bo'lgan boshqa tilni bilsangiz, iltimos, adashmang. JavaScript-da belgilar boshqacha.

<<<<<<< HEAD
````warn header="Belgilar avtomatik ravishda matnga aylantirilmaydi"
JavaScript-dagi aksariyat qiymatlar matnga aylantirishni qo'llab-quvvatlaydi. Masalan, biz deyarli har qanday qiymatni `alert` ya'ni ekranga chiqazishimiz mumkin va u ishlaydi. Belgilar alohida ahamiyatga ega. Ular avtomatik konvertatsiya qilmaydi.
=======
So, to summarize, a symbol is a "primitive unique value" with an optional description. Let's see where we can use them.

````warn header="Symbols don't auto-convert to a string"
Most values in JavaScript support implicit conversion to a string. For instance, we can `alert` almost any value, and it will work. Symbols are special. They don't auto-convert.
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

Masalan, ushbu `alert` xatolikni ko'rsatadi:

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Cannot convert a Symbol value to a string
*/!*
```

That's a "language guard" against messing up, because strings and symbols are fundamentally different and should not occasionally convert one into another.
Bu tartibsizliklardan "til himoyasi", chunki matnlar va belgilar bir-biridan tubdan farq qiladi vatasodifan boshqasiga konvertatsiya qilinmasi kerak.

<<<<<<< HEAD
Agar biz chindan ham belgini ko'rsatishni istasak, unda `.toString()` ni chaqirishimiz kerak, masalan:
=======
If we really want to show a symbol, we need to explicitly call `.toString()` on it, like here:

>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id), endi u ishlaydi
*/!*
```

<<<<<<< HEAD
Yoki faqat tavsifni olish uchun `symbol.description` xususiyatini ishlatamiz:
=======
Or get `symbol.description` property to show the description only:

>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
```js run
let id = Symbol("id");
*!*
alert(id.description); // id
*/!*
```

````

## "Yashirin" xususiyatlar

<<<<<<< HEAD
Belgilar bizga obyektning "yashirin" xususiyatlarini yaratishga imkon beradi, chunki kodning boshqa hech bir qismi tasodifan kira olmaydi va qayta yozib bo'lmaydi.
=======

Symbols allow us to create "hidden" properties of an object, that no other part of code can accidentally access or overwrite.
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

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

<<<<<<< HEAD
Buni ko'rish uchun misolni biroz chuqurroq qilaylik.

Tasavvur qiling, boshqa skript o'z maqsadi uchun `user` ichida o'z "id" xususiyatiga ega bo'lishni xohlaydi. Bu boshqa JavaScript kutubxonasi bo'lishi mumkin, shuning uchun skriptlar bir-biridan umuman bexabar.
=======
As `user` objects belong to another codebase, it's unsafe to add fields to them, since we might affect pre-defined behavior in that other codebase. However, symbols cannot be accessed accidentally. The third-party code won't be aware of newly defined symbols, so it's safe to add symbols to the `user` objects.

Also, imagine that another script wants to have its own identifier inside `user`, for its own purposes.
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

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

<<<<<<< HEAD
// to'g'ridan-to'g'ri murojaat belgisi ishlaydi
alert( "Direct: " + user[id] );
```

Bu umumiy "yashirish" tushunchasining bir qismi. Agar boshqa skript yoki kutubxona bizning obyektimizga o'girilsa, u kutilmaganda belgi xususiyatga kira olmaydi.
=======
// the direct access by the symbol works
alert( "Direct: " + user[id] ); // Direct: 123
```

[Object.keys(user)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) also ignores them. That's a part of the general "hiding symbolic properties" principle. If another script or a library loops over our object, it won't unexpectedly access a symbolic property.
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

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

<<<<<<< HEAD
JavaScript-da, biz ko'rib turganimizdek, bu bayonot faqat global belgilar uchun to'g'ri.
=======
In JavaScript, as we can see, that's true for global symbols.
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
```

### Symbol.keyFor

<<<<<<< HEAD
Global belgilar uchun nafaqat `Symbol.for(key)` belgini nomini qaytaradi, balki teskari chaqirish mavjud: `Symbol.keyFor(sym)`, bu teskari: nomni global belgi bilan qaytaradi.
=======
We have seen that for global symbols, `Symbol.for(key)` returns a symbol by name. To do the opposite -- return a name by global symbol -- we can use: `Symbol.keyFor(sym)`:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

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

<<<<<<< HEAD
Masalan:
=======
That said, all symbols have the `description` property.

For instance:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

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

<<<<<<< HEAD
1. "Yashirin" obyekt xususiyatlari.
   Agar biz boshqa skriptga yoki kutubxonaga "tegishli" bo'lgan obyektga xususiyat qo'shmoqchi bo'lsak, biz belgi yaratib, uni xususiyat kaliti sifatida ishlatishimiz mumkin. Belgi xususiyati `for..in` da ko'rinmaydi, shuning uchun u kutilmaganda ro'yxatga olinmaydi. Bundan tashqari, unga to'g'ridan-to'g'ri kirish imkoni bo'lmaydi, chunki boshqa skriptda bizning belgimiz yo'q, shuning uchun u kutilmaganda uning harakatlariga aralashmaydi.
=======
1. "Hidden" object properties.

    If we want to add a property into an object that "belongs" to another script or a library, we can create a symbol and use it as a property key. A symbolic property does not appear in `for..in`, so it won't be accidentally processed together with other properties. Also it won't be accessed directly, because another script does not have our symbol. So the property will be protected from accidental use or overwrite.
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

   Shunday qilib, biz o'zimizga kerak bo'lgan obyektlarni "yashirincha" bekita olamiz, ammo boshqalar ko'rmasligi uchun, belgi xususiyatlaridan foydalanadi.

2. JavaScript tomonidan ishlatiladigan `Symbol.*` kabi tizimining ko'pgina belgilari mavjud. Biz ulardan ichki o'rnatilgan xatti-harakatlarni o'zgartirish uchun foydalanishimiz mumkin. Masalan, keyinchalik o'quv qo'llanmada biz `Symbol.toPrimitive` [obyektdan ibtidoiy konvertatsiya](info:object-toprimitive) va boshqalarni o'rnatish uchun `Symbol.iterator` dan foydalanamiz [iterables](info:iterable).

<<<<<<< HEAD
Texnik jihatdan belgilar 100% yashirin emas. Barcha belgilarni olishimizga imkon beradigan o'rnatilgan [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) usuli mavjud. Shuningdek, [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) deb nomlangan usul mavjud, bu obyektning _barcha_ kalitlarni, shu jumladan belgi kalitlarni qaytaradi. Shunday qilib, ular haqiqatan ham yashirin emas. Ammo aksariyat kutubxonalar, o'rnatilgan usullar va sintaksis tuzilmalari umumiy kelishuvga amal qilishadi. Yuqorida aytib o'tilgan usullarni aniq chaqirgan kishi, ehtimol, nima qilayotganini yaxshi tushunadi.
=======
Technically, symbols are not 100% hidden. There is a built-in method [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) that allows us to get all symbols. Also there is a method named [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) that returns *all* keys of an object including symbolic ones. But most libraries, built-in functions and syntax constructs don't use these methods.
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
