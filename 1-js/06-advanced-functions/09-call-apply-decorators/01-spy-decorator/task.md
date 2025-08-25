muhimlik: 5

---

# Dekorativ ayg'oqchi

Barcha chaqiruvlarni `calls` xususiyatida ishlashga saqlaydigan o'ramni qaytaradigan dekorativ `spy(func)` yarating.

Har bir chaqiruv argumentlar massivi sifatida saqlanadi.

Masalan:

```js
function work(a, b) {
  alert( a + b ); // ixtiyoriy funktsiya yoki usuldak ishlaydi
}

*!*
work = spy(work);
*/!*

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  alert( 'call:' + args.join() ); // "call:1,2", "call:4,5"
}
```

P.S. Ushbu dekorativ ba'zan birlik sinovi uchun foydalidir. Kengaytirilgan shakli - [Sinon.JS](http://sinonjs.org/) kutubxonasida `sinon.spy`.
