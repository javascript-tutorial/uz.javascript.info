Ushbu vazifani bajarish uchun ko'plab algoritmlar mavjud.

Ichki tsikldan foydalanamiz:

```js
For each i in the interval {
  check if i has a divisor from 1..i
  if yes => the value is not a prime
  if no => the value is a prime, show it
}
```

Yorliqdan foydalangan holda kod:

```js run
let n = 10;

nextPrime:
for (let i = 2; i <= n; i++) { // har bir i uchun...

  for (let j = 2; j < i; j++) { // bo'luvchi izlang...
    if (i % j == 0) continue nextPrime; // bosh son emas, keyingi bosqichga o'ting
  }

  alert( i ); // bosh son
}
```

Uni optimallashtirish uchun juda ko'p yo'li mavjud. Masalan, biz `2` dan `i` ning kvadrat ildizigacha bo'linmalarni qidirishimiz mumkin. Ammo baribir, agar biz katta vaqt oralig'ida haqiqatan ham samarali bo'lishni istasak, biz yondashuvni o'zgartirib, [Kvadratik elak](https://en.wikipedia.org/wiki/Quadratic_sieve) kabi rivojlangan matematikaga va murakkab algoritmlarga tayanishimiz kerak, [Umumiy raqamli maydonchadan tayyorlangan elak](https://en.wikipedia.org/wiki/General_number_field_sieve) va boshqalar.
