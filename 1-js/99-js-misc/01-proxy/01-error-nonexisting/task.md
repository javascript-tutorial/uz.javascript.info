# Error on reading non-existent property

Odatda, mavjud bo'lmagan qiymatni chaqirganda, `undefined` qaytaradi.

Buning o'rniga mavjud bo'lmagan xususiyatni o'qishga urinish uchun xatolikka yo'l qo'yadigan proksi yarating.

Bu dasturlash xatolarini erta aniqlashga yordam beradi.

`target` ob'ektini oladigan `wrap(target)` funksiyasini yozing va ushbu funksional jihatni qo'shadigan proksi-serverni qaytaring.

Bu shunday ishlashi kerak:

```js
let user = {
  name: "John"
};

function wrap(target) {
  return new Proxy(target, {
*!*
      /* sizning kodingiz */
*/!*
  });
}

user = wrap(user);

alert(user.name); // John
*!*
alert(user.age); // ReferenceError: xususiyat mavjud emas: "yosh"
*/!*
```
