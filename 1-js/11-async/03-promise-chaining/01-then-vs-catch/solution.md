Qisqa javob: **yo'q, ular teng emas**:

Farq shundaki, agar `f1` da xato bo'lsa, u holda `.catch` bu yerda ishlaydi:

```js run
promise.then(f1).catch(f2);
```

...Lekin bu yerda emas:

```js run
promise.then(f1, f2);
```

Buning sababi shundaki, xato zanjirga uzatiladi va ikkinchi kod qismida `f1` ostida zanjir yo'q.

Boshqacha qilib aytganda, `.then` natijalarni/xatolarni keyingi `.then/catch` ga o'tkazadi. Shunday qilib, birinchi misolda quyida `catch`, ikkinchisida - yo'q, shuning uchun xato tuzatilgan.
