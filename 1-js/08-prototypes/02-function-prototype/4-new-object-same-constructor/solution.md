Agar `"constructor"` xususiyati to'g'ri qiymatga ega ekanligiga amin bo'lsak, bunday yondashuvdan foydalanishimiz mumkin.

Masalan, standart `"prototype"` ga tegmasak, u holda ushbu kod aniq ishlaydi:

```js run
function User(name) {
  this.name = name;
}

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // Pete (ishladi!)
```

Bu ishladi, chunki `User.prototype.constructor == User`.

...Ammo agar kimdir, masalan, `User.prototype` ning ustiga yozsa va `"constructor"` ni qayta yaratishni unutsa, u holda bu muvaffaqiyatsiz bo'ladi.

Masalan:

```js run
function User(name) {
  this.name = name;
}
*!*
User.prototype = {}; // (*)
*/!*

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // undefined
```

Nega `user2.name` `undefined`?

`new user.constructor("Pete")` qanday ishlashi:

1. Birinchidan, u `user` da `constructor` ni qidiradi. Hech narsa yo'q.
2. Keyin u prototip zanjiriga amal qiladi. `user` prototipi `User.prototype` dir va unda ham hech narsa yo'q.
3. `User.prototype` ning qiymati `{}` oddiy obyekt bo'lib, uning prototipi `Object.prototype` dir. Va `Object.prototype.constructor == Object` mavjud. Shunday qilib u ishlatiladi.

Oxir-oqibat, bizda `let user2 = new Object('Pete')` bor. O'rnatilgan `Object` konstruktori argumentlarni e'tiborsiz qoldiradi, u har doim bo'sh obyektni yaratadi - bu bizda `user2` da mavjud.
