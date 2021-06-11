importance: 5

---

# Debounce dekorativ

`debounce(f, ms)` dekorativ natijasi `ms` milisoniyasiga maksimal bir marta chaqiruvni `f` ga yetkazadigan o'rash bo'lishi kerak.

Boshqacha qilib aytganda, biz "debounced" funktsiyani chaqirganimizda, u eng yaqin `ms` millisoniyalarda qolgan barcha kelajaklarga e'tibor berilmasligini kafolatlaydi.

Masalan:

```js no-beautify
let f = debounce(alert, 1000);

f(1); // darhol ishlaydi
f(2); // e'tiborsiz qoldirildi

setTimeout( () => f(3), 100); // e'tiborsiz qoldirildi (atigi 100 ms o'tdi)
setTimeout( () => f(4), 1100); // ishlaydi
setTimeout( () => f(5), 1500); // e'tiborsiz qoldirildi (oxirgi ishdan 1000 ms dan kam)
```

Amalda "debounce" bu qisqa vaqt ichida hech qanday yangi narsa qilinmasligini bilsak, biror narsani oladigan / yangilaydigan funktsiyalar uchun foydalidir, shuning uchun resurslarni sarf qilmaslik yaxshiroqdir.