muhimlik: 5

---

# Berilgan raqamgacha barcha raqamlarni yig'ing

`1 + 2 + ... + n` raqamlar yig'indisini hisoblaydigan "sumTo (n)" funktsiyasini yozing.

Masalan:

```js no-beautify
sumTo(1) = 1
sumTo(2) = 2 + 1 = 3
sumTo(3) = 3 + 2 + 1 = 6
sumTo(4) = 4 + 3 + 2 + 1 = 10
...
sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050
```

3 ta yechim variantini yarating:

1. For tsiklidan foydalanish.
2. Rekursiyadan foydalanib, `n > 1` uchun `sumTo(n) = n + sumTo(n-1)`.
3. [Arifmetik progresiya](https://en.wikipedia.org/wiki/Arithmetic_progression) formulasidan foydalanish.

Natija misoli:

```js
function sumTo(n) { /*... sizning kodingiz ... */ }

alert( sumTo(100) ); // 5050
```

P.S. Qaysi yechim varianti eng tezkor? Eng sekini? Nima uchun?

P.P.S. `sumTo(100000)` ni hisoblash uchun rekursiyadan foydalanishimiz mumkinmi? 
