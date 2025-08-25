muhimlik: 5

---

# Debounce dekorativ

`debounce(f, ms)` dekorativ natijasi `ms` milisoniyasiga maksimal bir marta chaqiruvni `f` ga yetkazadigan o'rash bo'lishi kerak.

Boshqacha qilib aytganda, biz "debounced" funktsiyani chaqirganimizda, u eng yaqin `ms` millisoniyalarda qolgan barcha kelajaklarga e'tibor berilmasligini kafolatlaydi.

Masalan:

Then if the wrapped function is called at 0ms, 200ms and 500ms, and then there are no calls, then the actual `f` will be only called once, at 1500ms. That is: after the cooldown period of 1000ms from the last call.

f(1); // darhol ishlaydi
f(2); // e'tiborsiz qoldirildi

setTimeout( () => f(3), 100); // e'tiborsiz qoldirildi (atigi 100 ms o'tdi)
setTimeout( () => f(4), 1100); // ishlaydi
setTimeout( () => f(5), 1500); // e'tiborsiz qoldirildi (oxirgi ishdan 1000 ms dan kam)

```

Amalda "debounce" bu qisqa vaqt ichida hech qanday yangi narsa qilinmasligini bilsak, biror narsani oladigan / yangilaydigan funktsiyalar uchun foydalidir, shuning uchun resurslarni sarf qilmaslik yaxshiroqdir.
```
