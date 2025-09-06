Ixtiyoriy kasrli musbat son: `pattern:\d+(\.\d+)?`.

Boshiga ixtiyoriy `pattern:-` qo'shamiz:

```js run
let regexp = /-?\d+(\.\d+)?/g;

let str = "-1.5 0 2 -123.4.";

alert(str.match(regexp)); // -1.5, 0, 2, -123.4
```
