muhimlik: 5

---

# Depozit kalkulyatori

Bank depoziti summasini va foizlarni kiritish imkonini beruvchi interfeys yarating, so'ngra berilgan vaqtdan keyin qancha bo'lishini hisoblab chiqadi.

Mana demo:

[iframe src="solution" height="350" border="1"]

Har qanday kirish o'zgarishi darhol qayta ishlanishi kerak.

Formula quyidagicha:

```js
<<<<<<< HEAD
// boshlang'ich: boshlang'ich pul summasi
// qiziqish: masalan. 0,05 yiliga 5% degani
// yillar: necha yil kutish kerak
let result = Math.round(initial * (1 + interest * years));
=======
// initial: the initial money sum
// interest: e.g. 0.05 means 5% per year
// years: how many years to wait
let result = Math.round(initial * (1 + interest) ** years);
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
```
