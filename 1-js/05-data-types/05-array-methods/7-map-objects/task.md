muhimlik: 5

---

# Obyektlarga xarita

Sizda `user` obyekyektlar massivi mavjud, ularning har birida `ism`, `familiya` va `id` mavjud.

Undan `id` va `fullName` obyektlarining boshqa massivni yaratish uchun kodni yozing, bu yerda `to'liq ism` `ism` va `familiya` dan hosil bo'ladi.

Masalan:

```js no-beautify
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

*!*
let usersMapped = /* ... sizning kodingiz ... */
*/!*

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/

alert( usersMapped[0].id ) // 1
alert( usersMapped[0].fullName ) // John Smith
```

Shunday qilib, aslida siz bir obyektlar massivini boshqasiga solishtirishingiz kerak. Bu erda `=>` dan foydalanib ko'ring.
