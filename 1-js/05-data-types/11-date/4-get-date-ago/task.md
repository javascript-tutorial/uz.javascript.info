importance: 4

---

# Ko'p kunlar oldin oyning qaysi kuni bo'lgan?

`getDateAgo(sana, kunlar)` funktsiyasini yarating, oy kunini `sanadan` bir necha `ku` oldingi sanani qaytaring.

Masalan, agar bugun 20 bo'lsa, `getDateAgo(new Date(), 1)` 19, `getDateAgo(new Date(), 2)` esa 18-bo'lishi kerak.

<<<<<<< HEAD:1-js/05-data-types/10-date/4-get-date-ago/task.md
Bundan tashqari, bir necha oy/yil davomida ishonchli ishlashi kerak
=======
Should work reliably for `days=365` or more:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/05-data-types/11-date/4-get-date-ago/task.md

```js
let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)
```

P.S. Funksiya berilgan `sana` ni o'zgartirmasligi kerak.
