muhimlik: 5

---

# G'alati instanceof

Nima uchun `instanceof` quyida `true` ni qaytaradi? Biz `a` ning `B()` tomonidan yaratilmaganligini osongina ko'rishimiz mumkin.

```js run
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

*!*
alert( a instanceof B ); // true
*/!*
```
