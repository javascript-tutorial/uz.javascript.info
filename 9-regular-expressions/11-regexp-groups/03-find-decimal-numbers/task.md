# Barcha raqamlarni toping

Barcha o'nlik sonlarni, shu jumladan butun sonlarni, suzuvchi nuqta va manfiylarni qidiradigan regexp yozing.

Masalan:

```js
let regexp = /your regexp/g;

let str = "-1.5 0 2 -123.4.";

alert(str.match(regexp)); // -1.5, 0, 2, -123.4
```
