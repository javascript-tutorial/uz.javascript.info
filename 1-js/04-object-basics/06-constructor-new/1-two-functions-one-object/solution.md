Ha, mumkin.

Agar funktsiya obyektni qaytarsa, u holda `new` uni `this` o'rniga qaytaradi.

Shunday qilib, ular, masalan, bir xil tashqi aniqlangan obyektni qaytarishlari mumkin:

```js run no-beautify
let obj = {};

function A() { return obj; }
function B() { return obj; }

alert( new A() == new B() ); // true
```
