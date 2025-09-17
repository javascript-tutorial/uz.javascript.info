# Xususiyat bayroqlari va tavsiflovchilar

Ma'lumki, obyektlar xususiyatlarni saqlashi mumkin.

Hozirgacha mulk biz uchun oddiy "kalit-qiymat" juftligi edi. Ammo obyekt xususiyati aslida yanada moslashuvchan va kuchli narsadir.

Ushbu bobda biz qo'shimcha konfiguratsiya variantlarini o'rganamiz va keyingi bosqichda ularni qanday qilib ko'rinmas holda getter/setter funktsiyalariga aylantirishni ko'rib chiqamiz.

## Xususiyat bayroqlari

Obyekt xususiyatlari, **`value`** dan tashqari, uchta maxsus xususiyatga ega ("bayroqlar" deb nomlanadi):

- **`writable`** -- agar `true` bo'lsa, uni o'zgartirish mumkin, aks holda faqat o'qish mumkin.
- **`enumerable`** -- agar `true` bo'lsa, u holda tsikldan ro'yxatga olinadi, aks holda ro'yxatga olinmaydi.
- **`configurable`** -- agar `true` bo'lsa, xususiyat o'chirilishi va ushbu atributlar o'zgartirilishi mumkin, aks holda yo'q.

Biz ularni hali ko'rmadik, chunki umuman ular ko'rinmaydi. "Odatiy usul" xususiyatini yaratganimizda, ularning barchasi `true`. Ammo biz ularni har qanday vaqtda o'zgartirishimiz mumkin.

Birinchidan, ushbu bayroqlarni qanday olish kerakligini ko'rib chiqamiz.

[Object.getOwnPropertyDescriptor](mdn:js/Object/getOwnPropertyDescriptor) usuli xususiyat haqida _to'liq_ ma'lumotni so'rashga imkon beradi.

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
  name: "John",
};

let descriptor = Object.getOwnPropertyDescriptor(user, "name");

alert(JSON.stringify(descriptor, null, 2));
/* property descriptor:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
```

Bayroqlarni o'zgartirish uchun biz [Object.defineProperty](mdn:js/Object/defineProperty) dan foydalanishimiz mumkin.

Sintaksis:

```js
Object.defineProperty(obj, propertyName, descriptor);
```

`obj`, `propertyName`
: Ishlash uchun obyekt va xususiyat.

`descriptor`
: Qo'llash uchun xususiyatni tavsiflovchi.

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

## Faqat o'qish

`user.name` ni `yoziladigan` bayroqni o'zgartirib, faqat o'qish imkoniyatiga ega qilaylik:

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

Xudda shu operatsiya, lekin xususiyat mavjud bo'lmagan holat uchun:

```js run
let user = { };

Object.defineProperty(user, "name", {
*!*
  value: "Pete",
  // yangi xususiyatlar uchun haqiqatni aniq ro'yxatlash kerak
  enumerable: true,
  configurable: true
*/!*
});

alert(user.name); // John
user.name = "Pete"; // Error
```

## Hisoblab bo'lmaydigan

Endi `userSt` ga `toString` odatiy qo'shaylik.

Odatda, obyektlar uchun o'rnatilgan `toString` ni sanab bo'lmaydi, u `for..in` ko'rinishida ko'rinmaydi. Agar biz o'zimiz `toString` ni qo'shsak, u holda sukut bo'yicha `for..in` ko'rinishida bo'ladi:

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  },
};

// Odatiy bo'lib, ikkala xususiyatimiz ham keltirilgan:
for (let key in user) alert(key); // name, toString
```

Agar biz buni yoqtirmasak, biz `enumerable:false` ni o'rnatamiz. Keyin u `for..in` tsiklida ko'rinmaydi, xuddi ichki o'rnatilgani kabi:

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

Konfiguratsiya qilinmaydigan xususiyatni o'chirib bo'lmaydi yoki `defineProperty` bilan o'zgartirib bo'lmaydi.

Masalan, `Math.PI` ni faqat o'qish mumkin, hisoblab bo'lmaydi va konfiguratsiya qilinmaydi:

```js run
let descriptor = Object.getOwnPropertyDescriptor(Math, "PI");

alert(JSON.stringify(descriptor, null, 2));
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
Math.PI = 3; // Error

// delete Math.PI ham ishlamaydi
```

Mulkni konfiguratsiya qilinmaydigan qilish - bu bir tomonlama yo'l. Biz uni o'zgartira olmaymiz, chunki `defineProperty` konfiguratsiya qilinmaydigan xususiyatlarda ishlamaydi.

Bu erda biz `user.name` manzilini "abadiy muhrlangan" konstantaga keltiramiz:

```js run
let user = {
  name: "John",
};

Object.defineProperty(user, "name", {
  configurable: false,
});

user.name = "Pete"; // works fine
delete user.name; // Error
```

And here we make `user.name` a "forever sealed" constant:

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  writable: false,
  configurable: false
});

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

## Object.defineProperties

Bir vaqtning o'zida ko'plab xususiyatlarni aniqlashga imkon beradigan [Object.defineProperties(obj, descriptors)](mdn:js/Object/defineProperties) usuli mavjud.

Sintaksis:

```js
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2,
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

Bir vaqtning o'zida barcha xususiyatlar tavsiflovchilarini olish uchun biz [Object.getOwnPropertyDescriptors(obj)](mdn:js/Object/getOwnPropertyDescriptors) usulidan foydalanishimiz mumkin.

`Object.defineProperties` bilan birgalikda u obyektni klonlashning "bayroqlardan xabardor" usuli sifatida ishlatilishi mumkin:

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

Odatda obyektni klonlashda biz quyidagi kabi xususiyatlarni nusxalash uchun tayinlash belgisidan foydalanamiz:

```js
for (let key in user) {
  clone[key] = user[key];
}
```

...Ammo bu bayroqlarni nusxalamaydi. Agar biz "yaxshiroq" klonni xohlasak, u holda `Object.defineProperties` afzal ko'riladi.

Yana bir farq shundaki, `for..in` ramziy xususiyatlarni e'tiborsiz qoldiradi, ammo `Object.getOwnPropertyDescriptors` _barcha_ xususiyatlarni aniqlaydi, shu jumladan ramziy xususiyatlarni qaytaradi.

## Obyektni global miqyosda muhrlash

Xususiyat tavsiflovchilari individual xususiyatlar darajasida ishlaydi.

_Butun_ obyektga kirishni cheklaydigan usullar ham mavjud:

[Object.preventExtensions(obj)](mdn:js/Object/preventExtensions)
: Obyektga yangi xususiyatlarni qo'shishni taqiqlaydi.

[Object.seal(obj)](mdn:js/Object/seal)
: Xususiyatlarni qo'shish/o'chirishni taqiqlaydi. Mavjud barcha xususiyatlar uchun `configurable: false` o'rnatadi.

[Object.freeze(obj)](mdn:js/Object/freeze)
: Xususiyatlarni qo'shish/olib tashlash/o'zgartirishni taqiqlaydi. Mavjud barcha xususiyatlar uchun `configurable: false, writable: false` ni o'rnatadi.
Va ular uchun testlar mavjud:

[Object.isExtensible(obj)](mdn:js/Object/isExtensible)
: Agar xususiyatlarni qo'shish taqiqlangan bo'lsa, `false` ni qaytaradi, aks holda `true`.

[Object.isSealed(obj)](mdn:js/Object/isSealed)
: Xususiyatlarni qo'shish/olib tashlash taqiqlangan bo'lsa va mavjud bo'lgan barcha xususiyatlar `configurable: false` bo'lsa, `true` qiymatini qaytaradi.

[Object.isFrozen(obj)](mdn:js/Object/isFrozen)
: Xususiyatlarni qo'shish/olib tashlash/o'zgartirish taqiqlangan bo'lsa va barcha mavjud xususiyatlar `configurable: false, writable: false` bo'lsa, `true` ni qaytaradi.

Ushbu usullar amalda kamdan kam qo'llaniladi.
