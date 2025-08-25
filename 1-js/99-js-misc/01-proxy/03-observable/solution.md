Yechim ikki qismdan iborat:

1. Qachonki `.observe(handler)` chaqirilsa, keyinroq qo'ng'iroq qilishimiz uchun ishlov beruvchini biror joyda eslab qolishimiz kerak. Biz ishlovchilarni to'g'ridan-to'g'ri ob'ektda saqlashimiz mumkin, bunda o'z belgimizdan mulk kaliti sifatida foydalanamiz.
2. Har qanday o'zgarish bo'lsa, ishlov beruvchilarga qo'ng'iroq qilish uchun bizga `set` trapli proksi-server kerak.

```js run
let handlers = Symbol("handlers");

function makeObservable(target) {
  // 1. Qiymatlarni yaratish
  target[handlers] = [];

  // Kelgusi qo'ng'iroqlar uchun ishlov beruvchi funksiyasini massivda saqlang
  target.observe = function (handler) {
    this[handlers].push(handler);
  };

  // 2. O'zgarishlarni boshqarish uchun proksi-server yarating
  return new Proxy(target, {
    set(target, property, value, receiver) {
      let success = Reflect.set(...arguments); // operatsiyani ob'ektga yo'naltirish
      if (success) {
        // mulkni o'rnatishda xatolik bo'lmasa
        // barcha ishlovchilarni chaqiring
        target[handlers].forEach((handler) => handler(property, value));
      }
      return success;
    },
  });
}

let user = {};

user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John";
```
