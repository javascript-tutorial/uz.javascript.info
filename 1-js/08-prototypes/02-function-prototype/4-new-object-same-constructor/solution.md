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

<<<<<<< HEAD
...Ammo agar kimdir, masalan, `User.prototype` ning ustiga yozsa va `"constructor"` ni qayta yaratishni unutsa, u holda bu muvaffaqiyatsiz bo'ladi.
=======
..But if someone, so to speak, overwrites `User.prototype` and forgets to recreate `constructor` to reference `User`, then it would fail.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
1. Birinchidan, u `user` da `constructor` ni qidiradi. Hech narsa yo'q.
2. Keyin u prototip zanjiriga amal qiladi. `user` prototipi `User.prototype` dir va unda ham hech narsa yo'q.
3. `User.prototype` ning qiymati `{}` oddiy obyekt bo'lib, uning prototipi `Object.prototype` dir. Va `Object.prototype.constructor == Object` mavjud. Shunday qilib u ishlatiladi.

Oxir-oqibat, bizda `let user2 = new Object('Pete')` bor. O'rnatilgan `Object` konstruktori argumentlarni e'tiborsiz qoldiradi, u har doim bo'sh obyektni yaratadi - bu bizda `user2` da mavjud.
=======
1. First, it looks for `constructor` in `user`. Nothing.
2. Then it follows the prototype chain. The prototype of `user` is `User.prototype`, and it also has no `constructor` (because we "forgot" to set it right!).
3. Going further up the chain, `User.prototype` is a plain object, its prototype is the built-in `Object.prototype`. 
4. Finally, for the built-in `Object.prototype`, there's a built-in `Object.prototype.constructor == Object`. So it is used.

Finally, at the end, we have `let user2 = new Object('Pete')`. 

Probably, that's not what we want. We'd like to create `new User`, not `new Object`. That's the outcome of the missing `constructor`.

(Just in case you're curious, the `new Object(...)` call converts its argument to an object. That's a theoretical thing, in practice no one calls `new Object` with a value, and generally we don't use `new Object` to make objects at all).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
