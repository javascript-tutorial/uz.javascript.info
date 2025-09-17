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

Odatda bu qulay. Agar biz ham ramziy kalitlarni xohlasak, unda alohida usul mavjud [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols), bu faqat ramziy kalitlar massivini qaytaradi. Shuningdek, [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) usuli _hamma_ kalitlarni qaytaradi.
