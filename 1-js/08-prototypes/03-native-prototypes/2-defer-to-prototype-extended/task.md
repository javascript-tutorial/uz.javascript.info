muhimlik: 4

---

# Funktsiyalarga bezatuvchi `defer()` qo'shing

Barcha funktsiyalar prototipiga chaqiruvni `ms` millisoniyalar bilan kechiktiradigan, o'ramni qaytaradigan `defer(ms)` usulini qo'shing.

Qanday ishlashi kerakligi haqida bir misol:

```js
function f(a, b) {
  alert(a + b);
}

f.defer(1000)(1, 2); // 1 soniyadan keyin 3 ni ko'rsatadi
```

Iltimos, argumentlar asl funktsiyaga o'tkazilishi kerakligini unutmang.
