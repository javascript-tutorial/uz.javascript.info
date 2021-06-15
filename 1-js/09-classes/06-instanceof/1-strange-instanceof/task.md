importance: 5

---

# G'alati instanceof

<<<<<<< HEAD
Nima uchun `instanceof` quyida `true` ni qaytaradi? Biz `a` ning `B()` tomonidan yaratilmaganligini osongina ko'rishimiz mumkin.
=======
In the code below, why does `instanceof` return `true`? We can easily see that `a` is not created by `B()`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

*!*
alert( a instanceof B ); // true
*/!*
```
