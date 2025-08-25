muhimlik: 4

---

# Ko'p kunlar oldin oyning qaysi kuni bo'lgan?

`getDateAgo(sana, kunlar)` funktsiyasini yarating, oy kunini `sanadan` bir necha `ku` oldingi sanani qaytaring.

Masalan, agar bugun 20 bo'lsa, `getDateAgo(new Date(), 1)` 19, `getDateAgo(new Date(), 2)` esa 18-bo'lishi kerak.

Bundan tashqari, bir necha oy/yil davomida ishonchli ishlashi kerak

```js
let date = new Date(2015, 0, 2);

alert(getDateAgo(date, 1)); // 1, (1 Jan 2015)
alert(getDateAgo(date, 2)); // 31, (31 Dec 2014)
alert(getDateAgo(date, 365)); // 2, (2 Jan 2014)
```

P.S. Funksiya berilgan `sana` ni o'zgartirmasligi kerak.
