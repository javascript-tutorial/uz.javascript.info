<<<<<<< HEAD
Qisqa javob: **yo'q, ular teng emas**:
=======
The short answer is: **no, they are not equal**:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Farq shundaki, agar `f1` da xato bo'lsa, u holda `.catch` bu yerda ishlaydi:

```js run
promise
  .then(f1)
  .catch(f2);
```

...Lekin bu yerda emas:

```js run
promise
  .then(f1, f2);
```

Buning sababi shundaki, xato zanjirga uzatiladi va ikkinchi kod qismida `f1` ostida zanjir yo'q.

<<<<<<< HEAD
Boshqacha qilib aytganda, `.then` natijalarni/xatolarni keyingi `.then/catch` ga o'tkazadi. Shunday qilib, birinchi misolda quyida `catch`, ikkinchisida - yo'q, shuning uchun xato tuzatilgan.
=======
In other words, `.then` passes results/errors to the next `.then/catch`. So in the first example, there's a `catch` below, and in the second one there isn't, so the error is unhandled.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
