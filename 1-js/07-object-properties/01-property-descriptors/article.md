
# Xususiyat bayroqlari va tavsiflovchilar

Ma'lumki, obyektlar xususiyatlarni saqlashi mumkin.

<<<<<<< HEAD
Hozirgacha mulk biz uchun oddiy "kalit-qiymat" juftligi edi. Ammo obyekt xususiyati aslida yanada moslashuvchan va kuchli narsadir.
=======
Until now, a property was a simple "key-value" pair to us. But an object property is actually a more flexible and powerful thing.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Ushbu bobda biz qo'shimcha konfiguratsiya variantlarini o'rganamiz va keyingi bosqichda ularni qanday qilib ko'rinmas holda getter/setter funktsiyalariga aylantirishni ko'rib chiqamiz.

## Xususiyat bayroqlari

Obyekt xususiyatlari, **`value`** dan tashqari, uchta maxsus xususiyatga ega ("bayroqlar" deb nomlanadi):

<<<<<<< HEAD
- **`writable`** -- agar `true` bo'lsa, uni o'zgartirish mumkin, aks holda faqat o'qish mumkin.
- **`enumerable`** -- agar `true` bo'lsa, u holda tsikldan ro'yxatga olinadi, aks holda ro'yxatga olinmaydi.
- **`configurable`** -- agar `true` bo'lsa, xususiyat o'chirilishi va ushbu atributlar o'zgartirilishi mumkin, aks holda yo'q.
=======
- **`writable`** -- if `true`, the value can be changed, otherwise it's read-only.
- **`enumerable`** -- if `true`, then listed in loops, otherwise not listed.
- **`configurable`** -- if `true`, the property can be deleted and these attributes can be modified, otherwise not.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Biz ularni hali ko'rmadik, chunki umuman ular ko'rinmaydi. "Odatiy usul" xususiyatini yaratganimizda, ularning barchasi `true`. Ammo biz ularni har qanday vaqtda o'zgartirishimiz mumkin.

Birinchidan, ushbu bayroqlarni qanday olish kerakligini ko'rib chiqamiz.

<<<<<<< HEAD
[Object.getOwnPropertyDescriptor](mdn:js/Object/getOwnPropertyDescriptor) usuli xususiyat haqida *to'liq* ma'lumotni so'rashga imkon beradi.
=======
The method [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) allows to query the *full* information about a property.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Sintaksis:
```js
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```

`obj`
: Axborot olish obyekti.

`propertyName`
: Xususiyat nomi.

Qaytarilgan qiymat "xususiyat tavsiflovchi" deb nomlangan obyektdir: u qiymat va barcha bayroqlarni o'z ichiga oladi.

Masalan:

```js run
let user = {
  name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/* property descriptor:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
```

<<<<<<< HEAD
Bayroqlarni o'zgartirish uchun biz [Object.defineProperty](mdn:js/Object/defineProperty) dan foydalanishimiz mumkin.
=======
To change the flags, we can use [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Sintaksis:

```js
Object.defineProperty(obj, propertyName, descriptor)
```

`obj`, `propertyName`
<<<<<<< HEAD
: Ishlash uchun obyekt va xususiyat.

`descriptor`
: Qo'llash uchun xususiyatni tavsiflovchi.
=======
: The object and its property to apply the descriptor.

`descriptor`
: Property descriptor object to apply.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Agar xususiyat mavjud bo'lsa, `defineProperty` bayroqlarini yangilaydi. Aks holda, u berilgan qiymat va bayroqlar bilan xususiyatni yaratadi; u holda, agar bayroq berilmagan bo'lsa, u `false` deb qabul qilinadi.

Masalan, bu yerda `name` xususiyati barcha soxta bayroqlar bilan yaratilgan:

```js run
let user = {};

*!*
Object.defineProperty(user, "name", {
  value: "John"
});
*/!*

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": "John",
*!*
  "writable": false,
  "enumerable": false,
  "configurable": false
*/!*
}
 */
```

Uni yuqoridagi "normal ravishda yaratilgan" `user.name` bilan taqqoslang: endi barcha bayroqlar noto'g'ri. Agar bu biz xohlamagan narsa bo'lsa, ularni `descriptor` da `true` o'rnatganimiz ma'qul.

Keling, bayroqlarning ta'sirini misol orqali ko'rib chiqaylik.

<<<<<<< HEAD
## Faqat o'qish

`user.name` ni `yoziladigan` bayroqni o'zgartirib, faqat o'qish imkoniyatiga ega qilaylik:
=======
## Non-writable

Let's make `user.name` non-writable (can't be reassigned) by changing `writable` flag:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
*!*
  writable: false
*/!*
});

*!*
user.name = "Pete"; // Error: Cannot assign to read only property 'name'
*/!*
```

Endi hech kim bizning foydalanuvchimiz nomini o'zgartira olmaydi, agar ular o'zlarining `defineProperty ini biznikidan ustun qo'yish uchun qo'llamasalar.

<<<<<<< HEAD
Xudda shu operatsiya, lekin xususiyat mavjud bo'lmagan holat uchun:
=======
```smart header="Errors appear only in strict mode"
In the non-strict mode, no errors occur when writing to non-writable properties and such. But the operation still won't succeed. Flag-violating actions are just silently ignored in non-strict.
```

Here's the same example, but the property is created from scratch:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let user = { };

Object.defineProperty(user, "name", {
*!*
<<<<<<< HEAD
  value: "Pete",
  // yangi xususiyatlar uchun haqiqatni aniq ro'yxatlash kerak
=======
  value: "John",
  // for new properties we need to explicitly list what's true
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  enumerable: true,
  configurable: true
*/!*
});

alert(user.name); // John
user.name = "Pete"; // Error
```

<<<<<<< HEAD

## Hisoblab bo'lmaydigan
=======
## Non-enumerable
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Endi `userSt` ga `toString` odatiy qo'shaylik.

<<<<<<< HEAD
Odatda, obyektlar uchun o'rnatilgan `toString` ni sanab bo'lmaydi, u `for..in` ko'rinishida ko'rinmaydi. Agar biz o'zimiz `toString` ni qo'shsak, u holda sukut bo'yicha `for..in` ko'rinishida bo'ladi:
=======
Normally, a built-in `toString` for objects is non-enumerable, it does not show up in `for..in`. But if we add a `toString` of our own, then by default it shows up in `for..in`, like this:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

// Odatiy bo'lib, ikkala xususiyatimiz ham keltirilgan:
for (let key in user) alert(key); // name, toString
```

<<<<<<< HEAD
Agar biz buni yoqtirmasak, biz `enumerable:false` ni o'rnatamiz. Keyin u `for..in` tsiklida ko'rinmaydi, xuddi ichki o'rnatilgani kabi:
=======
If we don't like it, then we can set `enumerable:false`. Then it won't appear in a `for..in` loop, just like the built-in one:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

Object.defineProperty(user, "toString", {
*!*
  enumerable: false
*/!*
});

*!*
// Endi toString yo'qoladi:
*/!*
for (let key in user) alert(key); // name
```

Hisoblanmaydigan xususiyatlar, shuningdek, `Object.keys` dan chiqarib tashlangan:

```js
alert(Object.keys(user)); // name
```

## Konfiguratsiya qilinmaydigan

Konfiguratsiya qilinmaydigan bayroq (`configurable: false`) ba'zan o'rnatilgan obyektlar va xususiyatlar uchun oldindan o'rnatiladi.

<<<<<<< HEAD
Konfiguratsiya qilinmaydigan xususiyatni o'chirib bo'lmaydi yoki `defineProperty` bilan o'zgartirib bo'lmaydi.

<<<<<<< HEAD
Masalan, `Math.PI` ni faqat o'qish mumkin, hisoblab bo'lmaydi va konfiguratsiya qilinmaydi:
=======
A non-configurable property can not be deleted.
=======
A non-configurable property can't be deleted, its attributes can't be modified.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

For instance, `Math.PI` is non-writable, non-enumerable and non-configurable:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
*/
```
Shunday qilib, dasturchi `Math.PI` qiymatini o'zgartira olmaydi yoki uning ustiga yozib bo'lmaydi.

```js run
Math.PI = 3; // Error, because it has writable: false

// delete Math.PI ham ishlamaydi
```

<<<<<<< HEAD
<<<<<<< HEAD
Mulkni konfiguratsiya qilinmaydigan qilish - bu bir tomonlama yo'l. Biz uni o'zgartira olmaymiz, chunki `defineProperty` konfiguratsiya qilinmaydigan xususiyatlarda ishlamaydi.

Bu erda biz `user.name` manzilini "abadiy muhrlangan" konstantaga keltiramiz:
=======
Making a property non-configurable is a one-way road. We cannot change it back with `defineProperty`.
=======
We also can't change `Math.PI` to be `writable` again:

```js run
// Error, because of configurable: false
Object.defineProperty(Math, "PI", { writable: true });
```
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

There's absolutely nothing we can do with `Math.PI`.

Making a property non-configurable is a one-way road. We cannot change it back with `defineProperty`.

**Please note: `configurable: false` prevents changes of property flags and its deletion, while allowing to change its value.**

Here `user.name` is non-configurable, but we can still change it (as it's writable):
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  configurable: false
});

user.name = "Pete"; // works fine
delete user.name; // Error
```

And here we make `user.name` a "forever sealed" constant, just like the built-in `Math.PI`:

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  writable: false,
  configurable: false
});

<<<<<<< HEAD
*!*
// user.name ni  yoki uning bayroqlarini o'zgartira olmaydi
// bularning barchasi ishlamaydi:
//   user.name = "Pete"
//   delete user.name
//   defineProperty(user, "name", ...)
Object.defineProperty(user, "name", {writable: true}); // Error
*/!*
```

```smart header="Xatolar faqat qat'iy rejim foydalanishda paydo bo'ladi"
Qat'iy bo'lmagan rejimda faqat o'qish uchun xususiyatlarga yozishda hech qanday xato bo'lmaydi. Ammo operatsiya baribir muvaffaqiyatli bo'lmaydi. Bayroqni buzadigan harakatlar qat'iyan jimgina e'tiborga olinmaydi.
```
=======
// won't be able to change user.name or its flags
// all this won't work:
user.name = "Pete";
delete user.name;
Object.defineProperty(user, "name", { value: "Pete" });
```

<<<<<<< HEAD
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Object.defineProperties

Bir vaqtning o'zida ko'plab xususiyatlarni aniqlashga imkon beradigan  [Object.defineProperties(obj, descriptors)](mdn:js/Object/defineProperties) usuli mavjud.
=======
```smart header="The only attribute change possible: writable true -> false"
There's a minor exception about changing flags.

We can change `writable: true` to `false` for a non-configurable property, thus preventing its value modification (to add another layer of protection). Not the other way around though.
```

## Object.defineProperties

There's a method [Object.defineProperties(obj, descriptors)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) that allows to define many properties at once.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Sintaksis:

```js
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});
```

Masalan:

```js
Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});
```

Shunday qilib, biz bir vaqtning o'zida ko'plab xususiyatlarni o'rnatishimiz mumkin.

## Object.getOwnPropertyDescriptors

<<<<<<< HEAD
Bir vaqtning o'zida barcha xususiyatlar tavsiflovchilarini olish uchun biz [Object.getOwnPropertyDescriptors(obj)](mdn:js/Object/getOwnPropertyDescriptors) usulidan foydalanishimiz mumkin.
=======
To get all property descriptors at once, we can use the method [Object.getOwnPropertyDescriptors(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors).
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

`Object.defineProperties` bilan birgalikda u obyektni klonlashning "bayroqlardan xabardor" usuli sifatida ishlatilishi mumkin:

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

Odatda obyektni klonlashda biz quyidagi kabi xususiyatlarni nusxalash uchun tayinlash belgisidan foydalanamiz:

```js
for (let key in user) {
  clone[key] = user[key]
}
```

...Ammo bu bayroqlarni nusxalamaydi. Agar biz "yaxshiroq" klonni xohlasak, u holda `Object.defineProperties` afzal ko'riladi.

Yana bir farq shundaki, `for..in` ramziy xususiyatlarni e'tiborsiz qoldiradi, ammo `Object.getOwnPropertyDescriptors` *barcha* xususiyatlarni aniqlaydi, shu jumladan ramziy xususiyatlarni qaytaradi.

## Obyektni global miqyosda muhrlash

Xususiyat tavsiflovchilari individual xususiyatlar darajasida ishlaydi.

*Butun* obyektga kirishni cheklaydigan usullar ham mavjud:

<<<<<<< HEAD
[Object.preventExtensions(obj)](mdn:js/Object/preventExtensions)
: Obyektga yangi xususiyatlarni qo'shishni taqiqlaydi.

[Object.seal(obj)](mdn:js/Object/seal)
: Xususiyatlarni qo'shish/o'chirishni taqiqlaydi. Mavjud barcha xususiyatlar uchun `configurable: false` o'rnatadi.

[Object.freeze(obj)](mdn:js/Object/freeze)
<<<<<<< HEAD
: Xususiyatlarni qo'shish/olib tashlash/o'zgartirishni taqiqlaydi. Mavjud barcha xususiyatlar uchun `configurable: false, writable: false` ni o'rnatadi.
Va ular uchun testlar mavjud:
=======
=======
[Object.preventExtensions(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)
: Forbids the addition of new properties to the object.

[Object.seal(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
: Forbids adding/removing of properties. Sets `configurable: false` for all existing properties.

[Object.freeze(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
: Forbids adding/removing/changing of properties. Sets `configurable: false, writable: false` for all existing properties.

And also there are tests for them:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

<<<<<<< HEAD
[Object.isExtensible(obj)](mdn:js/Object/isExtensible)
: Agar xususiyatlarni qo'shish taqiqlangan bo'lsa, `false` ni qaytaradi, aks holda `true`.

[Object.isSealed(obj)](mdn:js/Object/isSealed)
: Xususiyatlarni qo'shish/olib tashlash taqiqlangan bo'lsa va mavjud bo'lgan barcha xususiyatlar `configurable: false` bo'lsa, `true` qiymatini qaytaradi.

[Object.isFrozen(obj)](mdn:js/Object/isFrozen)
: Xususiyatlarni qo'shish/olib tashlash/o'zgartirish taqiqlangan bo'lsa va barcha mavjud xususiyatlar `configurable: false, writable: false` bo'lsa, `true` ni qaytaradi.
=======
[Object.isExtensible(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)
: Returns `false` if adding properties is forbidden, otherwise `true`.

[Object.isSealed(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)
: Returns `true` if adding/removing properties is forbidden, and all existing properties have `configurable: false`.

[Object.isFrozen(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)
: Returns `true` if adding/removing/changing properties is forbidden, and all current properties are `configurable: false, writable: false`.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Ushbu usullar amalda kamdan kam qo'llaniladi.
