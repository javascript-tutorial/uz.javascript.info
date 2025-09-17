Albatta, u ishlaydi, hech qanday muammo bo'lmaydi.

`const` faqat o'zgaruvchanning o'zini o'zgarishdan himoya qiladi.

Boshqacha qilib aytganda, `user` ob'ektga havolani saqlaydi. Va uni o'zgartirish mumkin emas. Ammo ob'ektning mazmuni mumkin.

```js run
const user = {
  name: "John"
};

*!*
// ishlaydi
user.name = "Pete";
*/!*

// xato
user = 123;
```
