
Buning sababi, `map.keys()` ketma-ket saraluchanni qaytaradi, lekin massivni qaytarmaydi.

Biz uni massivga aylantirishimiz mumkin `Array.from`:


```js run
let map = new Map();

map.set("name", "John");

*!*
let keys = Array.from(map.keys());
*/!*

keys.push("more");

alert(keys); // name, more
```
