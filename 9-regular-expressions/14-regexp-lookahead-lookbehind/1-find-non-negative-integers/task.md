# Manfiy bo'lmagan butun sonlarni toping

Butun sonlar qatori mavjud.

Faqat salbiy bo'lmaganlarni qidiradigan regexp yarating (nolga ruxsat beriladi).

Foydalanish misoli:

```js
let regexp = /sizning regexp/g;

let str = "0 12 -5 123 -18";

alert(str.match(regexp)); // 0, 12, 123
```
