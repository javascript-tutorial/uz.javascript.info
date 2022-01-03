
# Belgilar turi

Spetsifikatsiya bo'yicha obyekt xususiyatining kalitlari matn turi yoki belgi turi bo'lishi mumkin. Raqamlar emas, mantiqiy emas, faqat matn yoki belgilar, bu ikki tur bo'lishi mumkin.

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
Hozirgacha biz faqat matnlarni ko'rib chiqamiz. Keling, belgilar bizga beradigan afzalliklarni ko'rib chiqaylik.
=======
Till now we've been using only strings. Now let's see the benefits that symbols can give us.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/04-object-basics/08-symbol/article.md

## Belgilar

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
"Symbol" qiymati noyob identifikatorni ifodalaydi.
=======
A "symbol" represents a unique identifier.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/04-object-basics/08-symbol/article.md

Ushbu turdagi qiymatni `Symbol()` yordamida yaratish mumkin:

```js
// id bu yangi belgi
let id = Symbol();
```

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
Shuningdek, biz belgiga tavsif bera olamiz (belgi nomi ham deyiladi), bu asosan koddagi hatoliklarni tuzatish uchun foydalidir:

```js run
// id bu "id" tavsifiga ega bo'lgan belgidir
=======
Upon creation, we can give symbol a description (also called a symbol name), mostly useful for debugging purposes:

```js
// id is a symbol with the description "id"
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/04-object-basics/08-symbol/article.md
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

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
That's a "language guard" against messing up, because strings and symbols are fundamentally different and should not occasionally convert one into another.
Bu tartibsizliklardan "til himoyasi", chunki matnlar va belgilar bir-biridan tubdan farq qiladi vatasodifan boshqasiga konvertatsiya qilinmasi kerak.

Agar biz chindan ham belgini ko'rsatishni istasak, unda `.toString()` ni chaqirishimiz kerak, masalan:
=======
That's a "language guard" against messing up, because strings and symbols are fundamentally different and should not accidentally convert one into another.

If we really want to show a symbol, we need to explicitly call `.toString()` on it, like here:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/04-object-basics/08-symbol/article.md
```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id), endi u ishlaydi
*/!*
```

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
Yoki faqat tavsifni olish uchun `symbol.description` xususiyatini ishlatamiz:
=======
Or get `symbol.description` property to show the description only:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/04-object-basics/08-symbol/article.md
```js run
let id = Symbol("id");
*!*
alert(id.description); // id
*/!*
```

````

## "Yashirin" xususiyatlar

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
Belgilar bizga obyektning "yashirin" xususiyatlarini yaratishga imkon beradi, chunki kodning boshqa hech bir qismi tasodifan kira olmaydi va qayta yozib bo'lmaydi.

Masalan, ёuser` obyekti uchun "identifikator" ni saqlamoqchi bo'lsak, buning uchun kalit sifatida belgidan foydalanishimiz mumkin:
=======
Symbols allow us to create "hidden" properties of an object, that no other part of code can accidentally access or overwrite.

For instance, if we're working with `user` objects, that belong to a third-party code. We'd like to add identifiers to them.

Let's use a symbol key for it:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/04-object-basics/08-symbol/article.md

```js run
let user = { // belongs to another code
  name: "John"
};

let id = Symbol("id");

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
user[id] = "ID Value";
alert( user[id] ); // biz kalit sifatida belgidan foydalangan holda ma'lumotlarga kirishimiz mumkin
=======
user[id] = 1;

alert( user[id] ); // we can access the data using the symbol as the key
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/04-object-basics/08-symbol/article.md
```

`"id"` ning o'rniga `Symbol("id")` dan ishlatishning foydasi nimada?

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
Buni ko'rish uchun misolni biroz chuqurroq qilaylik.

Tasavvur qiling, boshqa skript o'z maqsadi uchun `user` ichida o'z "id" xususiyatiga ega bo'lishni xohlaydi. Bu boshqa JavaScript kutubxonasi bo'lishi mumkin, shuning uchun skriptlar bir-biridan umuman bexabar.
=======
As `user` objects belongs to another code, and that code also works with them, we shouldn't just add any fields to it. That's unsafe. But a symbol cannot be accessed accidentally, the third-party code probably won't even see it, so it's probably all right to do.

Also, imagine that another script wants to have its own identifier inside `user`, for its own purposes. That may be another JavaScript library, so that the scripts are completely unaware of each other.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/04-object-basics/08-symbol/article.md

Keyin ushbu skript o'z `Symbol("id")` ni yaratishi mumkin, masalan:

```js
// ...
let id = Symbol("id");

user[id] = "Ularning id qiymati";
```

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
Hech qanday nizo bo'lmaydi, chunki belgilar har doim xar xil, hatto bir xil nomga ega bo'lsa ham.

Endi shuni yodda tutingki, agar biz xuddi shu maqsad uchun belgi o'rniga `"id"` matnidan foydalansak, u holda *nizo* kelib chiqishi mumkin:
=======
There will be no conflict between our and their identifiers, because symbols are always different, even if they have the same name.

...But if we used a string `"id"` instead of a symbol for the same purpose, then there *would* be a conflict:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/04-object-basics/08-symbol/article.md

```js
let user = { name: "John" };

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
// bizning skriptimiz "id" xususiyatidan foydalanadi
user.id = "ID Qiymati";

// ...agar keyinchalik boshqa skript o'z maqsadlari uchun "id" dan foydalansa...

user.id = "Ularning id qiymati"
// bum! qayta yozildi! bu hamkasbga zarar etkazishni anglamasdi, lekin shunday qildi!
```

### Ramziy obyektdagi belgilar

Agar biz biror belgini obyekt ma'nosida ishlatmoqchi bo'lsak, kvadrat qavslar kerak.
=======
// Our script uses "id" property
user.id = "Our id value";

// ...Another script also wants "id" for its purposes...

user.id = "Their id value"
// Boom! overwritten by another script!
```

### Symbols in an object literal

If we want to use a symbol in an object literal `{...}`, we need square brackets around it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/04-object-basics/08-symbol/article.md

Shunga o'xshash:

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
  [id]: 123 // nafaqat "id: 123"
=======
  [id]: 123 // not "id": 123
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/04-object-basics/08-symbol/article.md
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

<<<<<<< HEAD
<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
Bu umumiy "yashirish" tushunchasining bir qismi. Agar boshqa skript yoki kutubxona bizning obyektimizga o'girilsa, u kutilmaganda belgi xususiyatga kira olmaydi.
=======
`Object.keys(user)` also ignores them. That's a part of the general "hiding symbolic properties" principle. If another script or a library loops over our object, it won't unexpectedly access a symbolic property.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/04-object-basics/08-symbol/article.md
=======
[Object.keys(user)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) also ignores them. That's a part of the general "hiding symbolic properties" principle. If another script or a library loops over our object, it won't unexpectedly access a symbolic property.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

Aksincha, [Object.assign](mdn:js/Object/assigned) ham matn, ham belgi xususiyatlarini ko'chiradi:

```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

Bu erda paradoks yo'q. Buning dizayni shunaqa. G'oya shundan iboratki, biz obyektni klonlashda yoki moslamalarni birlashtirganda, biz odatda *barcha* xususiyatlarini nusxalashni xohlaymiz (shu jumladan `id` kabi belgilar).

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
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
=======
## Global symbols

As we've seen, usually all symbols are different, even if they have the same name. But sometimes we want same-named symbols to be same entities. For instance, different parts of our application want to access symbol `"id"` meaning exactly the same property.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/04-object-basics/08-symbol/article.md

Buning uchun *global belgilar ro'yxati* mavjud. Biz unda belgilarni yaratishimiz va keyinchalik ularga murojaat qilishimiz mumkin va har bir murojaat bilan biz bir xil belgiga qaytishimiz kafolatlanadi.

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
Global belgilar ro'yxatida belgi yaratish yoki o'qish uchun `Symbol.for(key)` dan foydalaning.
=======
In order to read (create if absent) a symbol from the registry, use `Symbol.for(key)`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/04-object-basics/08-symbol/article.md

Ushbu qo'ng'iroq global belgilar ro'yxatiga olishni tekshiradi va agar `key` deb tavsiflangan belgi bo'lsa, uni qaytaradi, aks holda yangi `Symbol(key)` belgisini yaratadi va uni `key` bilan global belgilar ro'yxatida saqlaydi.

Masalan:

```js run
// global belgilar ro'yxatidan o'qiladi
let id = Symbol.for("id"); // agar belgi mavjud bo'lmasa, u yaratiladi

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
// qayta o'qiladi
=======
// read it again (maybe from another part of the code)
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/04-object-basics/08-symbol/article.md
let idAgain = Symbol.for("id");

// bir xil belgi
alert( id === idAgain ); // true
```

Registr ichidagi belgilar *global belgilar* deb nomlanadi. Agar biz keng ko'lamli belgini xohlasak va kodning hamma joylarida mavjud bo'lishi kerak bo'lsa - unda ular juda kerak.

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

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
// belgidan nomni oling
=======
// get name by symbol
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/04-object-basics/08-symbol/article.md
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
`Symbol.keyFor` belgi uchun kalitni izlash uchun global belgilar registridan foydalanadi. Shunday qilib, u global bo'lmagan belgilar uchun ishlamaydi. Agar belgi global bo'lmasa, uni topa olmaydi va `undefined` ni qaytaradi.
=======
The `Symbol.keyFor` internally uses the global symbol registry to look up the key for the symbol. So it doesn't work for non-global symbols. If the symbol is not global, it won't be able to find it and returns `undefined`.

That said, any symbols have `description` property.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/04-object-basics/08-symbol/article.md

Masalan:

```js run
<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
alert( Symbol.keyFor(Symbol.for("name")) ); // name, global belgi

alert( Symbol.keyFor(Symbol("name2")) ); // undefined, argument global belgi emas
=======
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // name, global symbol
alert( Symbol.keyFor(localSymbol) ); // undefined, not global

alert( localSymbol.description ); // name
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/04-object-basics/08-symbol/article.md
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

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
Belgilar ixtiyoriy tavsifga ega bo'lgan `Symbol()` chaqiruvi bilan yaratilgan.

Belgilar bir xil nomga ega bo'lsa ham, har doim har xil qiymatga ega. Agar biz bir xil nomdagi belgilar teng bo'lishini istasak, unda global belgilar registridan foydalanishimiz kerak: `Symbol.for(key)` nomi bilan `key` global belgisini qaytaradi (agar kerak bo'lsa yaratadi). `Symbol.for` ning bir nechta chaqiruvlari aynan shu belgini qaytaradi.
=======
Symbols are created with `Symbol()` call with an optional description (name).

Symbols are always different values, even if they have the same name. If we want same-named symbols to be equal, then we should use the global registry: `Symbol.for(key)` returns (creates if needed) a global symbol with `key` as the name. Multiple calls of `Symbol.for` with the same `key` return exactly the same symbol.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/04-object-basics/08-symbol/article.md

Belgilar ikkita asosiy foydalanish holatiga ega:

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
1. "Yashirin" obyekt xususiyatlari.
    Agar biz boshqa skriptga yoki kutubxonaga "tegishli" bo'lgan obyektga xususiyat qo'shmoqchi bo'lsak, biz belgi yaratib, uni xususiyat kaliti sifatida ishlatishimiz mumkin. Belgi xususiyati `for..in` da ko'rinmaydi, shuning uchun u kutilmaganda ro'yxatga olinmaydi. Bundan tashqari, unga to'g'ridan-to'g'ri kirish imkoni bo'lmaydi, chunki boshqa skriptda bizning belgimiz yo'q, shuning uchun u kutilmaganda uning harakatlariga aralashmaydi.
=======
1. "Hidden" object properties.
    If we want to add a property into an object that "belongs" to another script or a library, we can create a symbol and use it as a property key. A symbolic property does not appear in `for..in`, so it won't be accidentally processed together with other properties. Also it won't be accessed directly, because another script does not have our symbol. So the property will be protected from accidental use or overwrite.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/04-object-basics/08-symbol/article.md

    Shunday qilib, biz o'zimizga kerak bo'lgan obyektlarni "yashirincha" bekita olamiz, ammo boshqalar ko'rmasligi uchun, belgi xususiyatlaridan foydalanadi.

2. JavaScript tomonidan ishlatiladigan `Symbol.*` kabi tizimining ko'pgina belgilari mavjud. Biz ulardan ichki o'rnatilgan xatti-harakatlarni o'zgartirish uchun foydalanishimiz mumkin. Masalan, keyinchalik o'quv qo'llanmada biz `Symbol.toPrimitive` [obyektdan ibtidoiy konvertatsiya](info:object-toprimitive) va boshqalarni o'rnatish uchun `Symbol.iterator` dan foydalanamiz [iterables](info:iterable).

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
Texnik jihatdan belgilar 100% yashirin emas. Barcha belgilarni olishimizga imkon beradigan o'rnatilgan [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) usuli mavjud. Shuningdek, [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) deb nomlangan usul mavjud, bu obyektning *barcha* kalitlarni, shu jumladan belgi kalitlarni qaytaradi. Shunday qilib, ular haqiqatan ham yashirin emas. Ammo aksariyat kutubxonalar, o'rnatilgan usullar va sintaksis tuzilmalari umumiy kelishuvga amal qilishadi. Yuqorida aytib o'tilgan usullarni aniq chaqirgan kishi, ehtimol, nima qilayotganini yaxshi tushunadi.
=======
Technically, symbols are not 100% hidden. There is a built-in method [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) that allows us to get all symbols. Also there is a method named [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) that returns *all* keys of an object including symbolic ones. So they are not really hidden. But most libraries, built-in functions and syntax constructs don't use these methods.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/04-object-basics/08-symbol/article.md
