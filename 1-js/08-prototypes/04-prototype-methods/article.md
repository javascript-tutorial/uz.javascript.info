
# Prototip usullari, objects without __proto__

Ushbu bo'limning birinchi bobida biz prototipni o'rnatish uchun zamonaviy usullar mavjudligini eslatib o'tdik.

`__proto__` biroz eskirgan hisoblanadi (JavaScript standartining faqat brauzer qismida).

Zamonaviy usullar:

<<<<<<< HEAD
- [Object.create(proto[, descriptors])](mdn:js/Object/create) -- `proto` `[[Prototype]]` va ixtiyoriy xususiyat tavsiflovchilari sifatida bo'sh obyektni yaratadi.
- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- `obj` ning `[[Prototype]]` ni qaytaradi.
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- `obj` ning `[[Prototype]]` ni `proto` ga o'rnatadi.
=======
- [Object.create(proto, [descriptors])](mdn:js/Object/create) -- creates an empty object with given `proto` as `[[Prototype]]` and optional property descriptors.
- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- returns the `[[Prototype]]` of `obj`.
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- sets the `[[Prototype]]` of `obj` to `proto`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Ular `__proto__` o'rniga ishlatilishi kerak.

Masalan:

```js run
let animal = {
  eats: true
};

// prototip sifatida animal bilan yangi obyekt yaratish
*!*
let rabbit = Object.create(animal);
*/!*

alert(rabbit.eats); // true

*!*
<<<<<<< HEAD
alert(Object.getPrototypeOf(rabbit) === animal); // rabbit-ni prototipini olish
=======
alert(Object.getPrototypeOf(rabbit) === animal); // true
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
*/!*

*!*
Object.setPrototypeOf(rabbit, {}); // rabbit prototipini {} ga o'zgartirish
*/!*
```

`Object.create` ixtiyoriy ikkinchi argumentga ega: xususiyat tavsiflovchilari. U yerda yangi obyektga qo'shimcha xususiyatlarni taqdim etishimiz mumkin, masalan:

```js run
let animal = {
  eats: true
};

let rabbit = Object.create(animal, {
  jumps: {
    value: true
  }
});

alert(rabbit.jumps); // true
```

Deskriptorlar <info:property-descriptors> bobida tasvirlanganidek bir xil formatda bo'ladi.

Obyektni klonlashni `for..in` da nusxalash xususiyatlaridan ko'ra kuchliroq bajarish uchun `Object.create` dan foydalanishimiz mumkin:

```js
<<<<<<< HEAD
// obj ning to'liq bir xil sayoz kloni
=======
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```

Ushbu chaqiruv `obj` ning barcha nusxalarini, shu jumladan, barcha xususiyatlarni: ro'yxatga olinadigan va sanab bo'lmaydigan ma'lumotlarni, ma'lumotlar xususiyatlarini va getter/setter-larni -- hamma narsani va `[[Prototype]]` huquqini oladi.

## Qisqa tarix

<<<<<<< HEAD
Agar biz `[[Prototype]]` ni boshqarishning barcha usullarini hisoblasak, juda ko'p narsa bor! Buni bajarishning ko'plab usullari mavjud!

Nega shunday?
=======
If we count all the ways to manage `[[Prototype]]`, there are a lot! Many ways to do the same thing!

Why?
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Bu tarixiy sabablarga ko'ra.

<<<<<<< HEAD
- Konstruktor funktsiyasining `"prototype"` xususiyati juda qadim zamonlardan beri ishlaydi.
- Keyinchalik 2012 yilda: `Object.create` standartda paydo bo'ldi. Bu berilgan prototip bilan obyekt yaratishga imkon berdi, lekin uni olishga/o'rnatishga imkon bermadi. Shunday qilib brauzerlar istalgan vaqtda prototipni olish/o'rnatishga imkon beradigan nostandart `__proto__` kiruvchini qo'lladilar.
- Keyinchalik 2015 yilda: `Object.setPrototypeOf` va `Object.getPrototypeOf` standartga qo'shildi. `__proto__` hamma joyda amalga oshirildi, shuning uchun brauzerdan tashqari muhit uchun ixtiyoriy bo'lgan standartning B ilovasiga yo'l oldi.
=======
- The `"prototype"` property of a constructor function has worked since very ancient times.
- Later, in the year 2012, `Object.create` appeared in the standard. It gave the ability to create objects with a given prototype, but did not provide the ability to get/set it. So browsers implemented the non-standard `__proto__` accessor that allowed the user to get/set a prototype at any time.
- Later, in the year 2015, `Object.setPrototypeOf` and `Object.getPrototypeOf` were added to the standard, to perform the same functionality as `__proto__`. As `__proto__` was de-facto implemented everywhere, it was kind-of deprecated and made its way to the Annex B of the standard, that is: optional for non-browser environments.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Hozirda bizda bu usullarning barchasi bizning ixtiyorimizda.

<<<<<<< HEAD
Nima uchun `__proto__` funktsiyalar bilan almashtirildi? Bu qiziq savol, bizdan nima uchun `__proto__` yomon ekanligini tushunishni talab qiladi. Javobni olish uchun o'qing.

```warn header="Tezlik muhim bo'lmasa, `[[Prototype]]` ni qayta tiklamang"
Texnik jihatdan `[[Prototype]]` ni istalgan vaqtda olishimiz/o'rnatishimiz mumkin. Ammo, odatda, biz uni obyektni yaratish vaqtida faqat bir marta o'rnatamiz, keyin o'zgartirmaymiz: `rabbit` `animal` dan meros bo'lib qoladi va bu o'zgarmaydi.

Va JavaScript interpretatori bunga juda moslashtirilgan. `Object.setPrototypeOf` yoki `obj.__proto__=` bilan prototipni "bajarilish paytida" o'zgartirish juda sekin operatsiya bo'lib, u obyekt xususiyatlariga kirish operatsiyalari uchun ichki optimallashtirishni buzadi. Agar nima qilayotganingizni bilmasangiz yoki JavaScript-ning tezligi umuman siz uchun ahamiyatli bo'lmasa, unda bundan qochib qutuling.
```

## "Juda oddiy" obyektlar
=======
Why was `__proto__` replaced by the functions `getPrototypeOf/setPrototypeOf`? That's an interesting question, requiring us to understand why `__proto__` is bad. Read on to get the answer.

```warn header="Don't change `[[Prototype]]` on existing objects if speed matters"
Technically, we can get/set `[[Prototype]]` at any time. But usually we only set it once at the object creation time and don't modify it anymore: `rabbit` inherits from `animal`, and that is not going to change.

And JavaScript engines are highly optimized for this. Changing a prototype "on-the-fly" with `Object.setPrototypeOf` or `obj.__proto__=` is a very slow operation as it breaks internal optimizations for object property access operations. So avoid it unless you know what you're doing, or JavaScript speed totally doesn't matter for you.
```

## "Very plain" objects [#very-plain]
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Ma'lumki, obyektlar kalit/qiymat juftligini saqlash uchun assotsiativ massiv sifatida ishlatilishi mumkin.

...Ammo unda *foydalanuvchi tomonidan taqdim etilgan* kalitlarni saqlashga harakat qilsak (masalan, foydalanuvchi tomonidan kiritilgan lug'at), biz qiziqarli nosozlikni ko'rishimiz mumkin: `"__proto__"` dan tashqari barcha kalitlar yaxshi ishlaydi.

Misolni tekshiring:

```js run
let obj = {};

let key = prompt("Kalit nima??", "__proto__");
obj[key] = "some value";

alert(obj[key]); // [object Object], not "some value"!
```

<<<<<<< HEAD
Agar foydalanuvchi `__proto__` ni yozsa, tayinlash e'tiborga olinmaydi!

Bu bizni ajablantirmasligi kerak. `__proto__` xususiyati alohida: u obyekt yoki `null` bo'lishi kerak, matn prototipga aylana olmaydi.
=======
Here, if the user types in `__proto__`, the assignment is ignored!

That shouldn't surprise us. The `__proto__` property is special: it must be either an object or `null`. A string can not become a prototype.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Ammo biz bunday xatti-harakatni amalga oshirishni *xohlamaymiz*, to'g'rimi? Biz kalit/qiymat juftlarini saqlamoqchimiz, va `"__proto__"` nomli kalit to'g'ri saqlanmadi. Demak bu xato!

<<<<<<< HEAD
Bu yerda yakunalar dahshatli emas. Ammo boshqa hollarda prototip haqiqatan ham o'zgartirilishi mumkin, shuning uchun ijro umuman kutilmagan yo'llar bilan noto'g'ri ketishi mumkin.

Eng yomoni -- odatda ishlab chiquvchilar bunday imkoniyat haqida umuman o'ylamaydilar. Bu bunday xatolarni sezishni qiyinlashtiradi va hatto ularni zaif tomonlarga aylantiradi, ayniqsa JavaScript server tomonida ishlatilganda.

`toString` xususiyatiga kirishda kutilmagan holatlar yuz berishi mumkin -- bu sukut bo'yicha funktsiya va boshqa o'rnatilgan xususiyatlar.

Muammodan qanday qochish kerak?

Birinchidan, biz `Map` dan foydalanishga o'tishimiz mumkin, keyin hamma narsa yaxshi.

Ammo `Object` ham bu yerda bizga yaxshi xizmat qilishi mumkin, chunki til yaratuvchilari bu muammo haqida juda oldin o'ylab ko'rishgan.

`__proto__` bu obyektning xususiyati emas, balki `Object.prototype` ga kiruvchi xususiyatdir:
=======
Here the consequences are not terrible. But in other cases we may be assigning object values, and then the prototype may indeed be changed. As a result, the execution will go wrong in totally unexpected ways.

What's worse -- usually developers do not think about such possibility at all. That makes such bugs hard to notice and even turn them into vulnerabilities, especially when JavaScript is used on server-side.

Unexpected things also may happen when assigning to `toString`, which is a function by default, and to other built-in methods.

How can we avoid this problem?

First, we can just switch to using `Map` for storage instead of plain objects, then everything's fine.

But `Object` can also serve us well here, because language creators gave thought to that problem long ago.

`__proto__` is not a property of an object, but an accessor property of `Object.prototype`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

![](object-prototype-2.svg)

Shunday qilib, agar `obj.__proto__` o'qilgan yoki o'rnatilgan bo'lsa, mos keladigan getter/setter uning prototipidan chaqiriladi va u oladi/o'rnatadi `[[Prototype]]`.

Ushbu o'quv bo'limining boshida aytilganidek: `__proto__` bu `[[Prototype]]` ga kirishning bir usuli, bu `[[Prototype]]` ning o'zi emas.

<<<<<<< HEAD
Endi biz obyektni assotsiativ massiv sifatida ishlatmoqchi bo'lsak, buni biroz hiyla bilan amalga oshirishimiz mumkin:
=======
Now, if we intend to use an object as an associative array and be free of such problems, we can do it with a little trick:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
*!*
let obj = Object.create(null);
*/!*

let key = prompt("Kalit nima??", "__proto__");
obj[key] = "some value";

alert(obj[key]); // "some value"
```

`Object.create(null)` prototipsiz bo'sh obyektni yaratadi (`[[Prototype]]` `null`):

![](object-prototype-null.svg)

Shunday qilib, `__proto__` uchun getter/setter yo'q. Endi u odatdagi ma'lumotlar xususiyati sifatida qayta ishlanadi, shuning uchun yuqoridagi misol to'g'ri ishlaydi.

<<<<<<< HEAD
Bunday obyektni "juda oddiy" yoki "sof lug'at obyektlari" deb atashimiz mumkin, chunki ular oddiy obyektga qaraganda oddiyroq `{...}`.
=======
We can call such objects "very plain" or "pure dictionary" objects, because they are even simpler than the regular plain object `{...}`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Salbiy tomoni shundaki, bunday obyektlarda o'rnatilgan obyekt usullari mavjud emas, masalan, `toString`:

```js run
*!*
let obj = Object.create(null);
*/!*

alert(obj); // Error (no toString)
```

...Ammo bu odatda assotsiativ massivlar uchun yaxshi.

<<<<<<< HEAD
Iltimos, e'tibor bering, obyekt bilan bog'liq usullarning aksariyati `Object.something(...)`, masalan `Object.keys(obj)` - ular prototipda yo'q, shuning uchun ular bunday obyektlarda ishlashni davom ettiradi:
=======
Note that most object-related methods are `Object.something(...)`, like `Object.keys(obj)` -- they are not in the prototype, so they will keep working on such objects:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c


```js run
let chineseDictionary = Object.create(null);
chineseDictionary.hello = "你好";
chineseDictionary.bye = "再见";

alert(Object.keys(chineseDictionary)); // hello,bye
```

## Xulosa

<<<<<<< HEAD
Prototipni o'rnatish va to'g'ridan-to'g'ri kirish uchun zamonaviy usullar:

- [Object.create(proto[, descriptors])](mdn:js/Object/create) -- `[[Prototype]]` (`null` bo'lishi mumkin) sifatida berilgan `proto` va ixtiyoriy xususiyatlar deskriptokrlari bilan bo'sh obyektni yaratadi.
- [Object.getPrototypeOf(obj)](mdn:js/Object.getPrototypeOf) -- `obj` ning `[[Prototype]]` ni qaytaradi (`__proto__` getter bilan bir xil).
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object.setPrototypeOf) -- `obj` ning `[[Prototype]]` ni `proto` ga o'rnatadi (`__proto__` o'rnatuvchisi bilan bir xil).

Obyektga foydalanuvchi tomonidan yaratilgan kalitlarni qo'yishni xohlasak, o'rnatilgan `__proto__` getter/setter xavfli. Agar foydalanuvchi kalit sifatida `__proto__` ni kiritishi mumkinligi sababli, umid qilamanki oson, ammo umuman kutilmagan oqibatlarga olib keladigan xato bo'ladi.
=======
Modern methods to set up and directly access the prototype are:

- [Object.create(proto, [descriptors])](mdn:js/Object/create) -- creates an empty object with a given `proto` as `[[Prototype]]` (can be `null`) and optional property descriptors.
- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- returns the `[[Prototype]]` of `obj` (same as `__proto__` getter).
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- sets the `[[Prototype]]` of `obj` to `proto` (same as `__proto__` setter).

The built-in `__proto__` getter/setter is unsafe if we'd want to put user-generated keys into an object. Just because a user may enter `"__proto__"` as the key, and there'll be an error, with hopefully light, but generally unpredictable consequences.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Shunday qilib, biz "juda oddiy" obyektni yaratish uchun `Object.create(null)` dan foydalanishingiz yoki `__proto__` holda yoki `Map` moslamalarini qo'llashimiz mumkin.

Shuningdek, `Object.create` obyektni barcha tavsiflovchilar bilan sayoz nusxalashning oson usulini taqdim etadi:

```js
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```

We also made it clear that `__proto__` is a getter/setter for `[[Prototype]]` and resides in `Object.prototype`, just like other methods.

<<<<<<< HEAD
- [Object.keys(obj)](mdn:js/Object/keys) / [Object.values(obj)](mdn:js/Object/values) / [Object.entries(obj)](mdn:js/Object/entries) -- sanab o'tiladigan o'z massiv nomlari/qiymatlari/kalit-qiymat juftliklari massivini qaytaradi.
- [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) -- barcha o'ziga xos ramziy xususiyat nomlari massivini qaytaradi.
- [Object.getOwnPropertyNames(obj)](mdn:js/Object/getOwnPropertyNames) -- o'zlarining barcha matn xususiyatlarining nomlarini qaytaradi.
- [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) -- barcha mulk nomlari massivini qaytaradi.
- [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty): agar `obj` ning `key` nomli o'ziga xos (merosxo'r bo'lmagan) xususiyati bo'lsa, u `true` ni qaytaradi.

Shuningdek, biz `__proto__` - bu `[[Prototype]]` uchun getter/setter ekanligini va boshqa usullar singari `Object.prototype` da joylashganligini ham aniqladik.

Biz `Object.create(null)` prototipisiz obyektni yaratishimiz mumkin. Bunday obyektlar "sof lug'atlar" sifatida ishlatiladi, ularning kalitlari sifatida `"__proto __"` bilan bog'liq muammolar yo'q.

Obyekt xususiyatlarini qaytaradigan barcha usullar (`Object.keys` va boshqalar kabi) - "o'z" xususiyatlarini qaytaradi. Agar biz merosxo'rlarni xohlasak, unda `for..in` dan foydalanishimiz mumkin.
=======
We can create an object without a prototype by `Object.create(null)`. Such objects are used as "pure dictionaries", they have no issues with `"__proto__"` as the key.

Other methods:

- [Object.keys(obj)](mdn:js/Object/keys) / [Object.values(obj)](mdn:js/Object/values) / [Object.entries(obj)](mdn:js/Object/entries) -- returns an array of enumerable own string property names/values/key-value pairs.
- [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) -- returns an array of all own symbolic keys.
- [Object.getOwnPropertyNames(obj)](mdn:js/Object/getOwnPropertyNames) -- returns an array of all own string keys.
- [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) -- returns an array of all own keys.
- [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty): returns `true` if `obj` has its own (not inherited) key named `key`.

All methods that return object properties (like `Object.keys` and others) -- return "own" properties. If we want inherited ones, we can use `for..in`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
