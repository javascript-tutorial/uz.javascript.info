```js run no-beautify
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

*!*
let usersMapped = users.map(user => ({
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));
*/!*

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/

alert( usersMapped[0].id ); // 1
alert( usersMapped[0].fullName ); // John Smith
```

Iltimos, o'q funktsiyalari uchun biz qo'shimcha qavslardan foydalanishimiz kerakligini unutmang.

Biz bunday yozolmaymiz:

```js
let usersMapped = users.map(user => *!*{*/!*
  fullName: `${user.name} ${user.surname}`,
  id: user.id
});
```

Yodimizda bo'lganidek, ikkita o'q funktsiyasi mavjud: tanasiz `value => expr` va tanali `value => {...}`.

Bu erda JavaScript `{` ni obyektning boshlanishi emas, balki funktsiya tanasining boshlanishi sifatida qabul qiladi. Vaqtinchalik yechim ularni "oddiy" qavslarga o'rashdan iborat:

```js
let usersMapped = users.map(user => *!*({*/!*
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));
```

Endi yaxshi.
