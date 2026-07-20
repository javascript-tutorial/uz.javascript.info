# Object.keys, values, entries

Keling, alohida ma'lumotlar tuzilmalaridan uzoqlashamiz va ular ustida takrorlanishlar haqida gaplashamiz.

Oldingi bobda biz usullarni ko'rdik `map.keys()`, `map.values()`, `map.entries()`.

Ushbu usullar umumiydir, ularni ma'lumotlar tuzilmalari uchun ishlatish bo'yicha umumiy kelishuv mavjud. Agar biz o'zimizga xos ma'lumotlar tuzilishini yaratadigan bo'lsak, ularni ham amalga oshirishimiz kerak.

Ular quyidagilar uchun qo'llab-quvvatlanadi:

- `Map`
- `Set`
- `Array` (`arr.values()` dan tashqari)

Oddiy obyektlar ham shunga o'xshash usullarni qo'llab-quvvatlaydi, ammo sintaksis biroz boshqacha.

## Object.keys, values, entries

Oddiy obyektlar uchun quyidagi usullar mavjud:

- [Object.keys(obj)](mdn:js/Object/keys) -- kalitlar massivini qaytaradi.
- [Object.values(obj)](mdn:js/Object/values) -- qiymatlar massivini qaytaradi
- [Object.entries(obj)](mdn:js/Object/entries) -- `[key, value]` juftlik massivini qaytaradi.

...Iltimos, farqlarga e'tibor bering (masalan, map obyekti bilan taqqoslaganda):

|                    | Map                  | Object                                      |
| ------------------ | -------------------- | ------------------------------------------- |
| Chaqiruv sintaksis | `map.keys()`         | `Object.keys(obj)`, lekin `obj.keys()` emas |
| Qaytarish          | ketma-ket saraluchan | "haqiqiy" Array                             |

Birinchi farq shundaki, biz `obj.keys()` emas, balki `Object.keys(obj)` deb chaqirishimiz kerak.

Nega shunday? Asosiy sabab - bu egiluvchanlik. Esingizda bo'lsa, obyektlar JavaScript-dagi barcha murakkab tuzilmalarning asosidir. Shunday qilib, bizda o'z `order.values​​()` usulini amalga oshiradigan `order` kabi obyektimiz bo'lishi mumkin. Va biz hali ham `Object.values​​(order)` deb chaqirishimiz mumkin.

Ikkinchi farq shundaki, `Object.*` usullari ketma-ket saraluchanni emas, balki "haqiqiy" obyektlar massivini qaytaradi. Bu asosan tarixiy sabablarga ko'ra shunday.

Masalan:

```js
let user = {
  name: "John",
  age: 30,
};
```

- `Object.keys(user) = ["name", "age"]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["name","John"], ["age",30] ]`

Xususiyat qiymatlarini tsiklash uchun `Object.values` dan foydalanish misoli:

```js run
let user = {
  name: "John",
  age: 30,
};

// qiymatlarni tsiklash
for (let value of Object.values(user)) {
  alert(value); // John, so'ng 30
}
```

## Object.keys/values/entries ramziy xususiyatlarni e'tiborsiz qoldiradi

Xuddi `for..in` tsikl kabi, bu usullar ham `Symbol(...)` ni kalit sifatida ishlatadigan xususiyatlarga e'tibor bermaydi.

<<<<<<< HEAD
Odatda bu qulay. Agar biz ham ramziy kalitlarni xohlasak, unda alohida usul mavjud [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols), bu faqat ramziy kalitlar massivini qaytaradi. Shuningdek, [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) usuli _hamma_ kalitlarni qaytaradi.
=======

## Transforming objects

Objects lack many methods that exist for arrays, e.g. `map`, `filter` and others.

If we'd like to apply them, then we can use `Object.entries` followed by `Object.fromEntries`:

1. Use `Object.entries(obj)` to get an array of key/value pairs from `obj`.
2. Use array methods on that array, e.g. `map`, to transform these key/value pairs.
3. Use `Object.fromEntries(array)` on the resulting array to turn it back into an object.

For example, we have an object with prices, and would like to double them:

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

*!*
let doublePrices = Object.fromEntries(
  // convert prices to array, map each key/value pair into another pair
  // and then fromEntries gives back the object
  Object.entries(prices).map(entry => [entry[0], entry[1] * 2])
);
*/!*

alert(doublePrices.meat); // 8
```

It may look difficult at first sight, but becomes easy to understand after you use it once or twice. We can make powerful chains of transforms this way.
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
