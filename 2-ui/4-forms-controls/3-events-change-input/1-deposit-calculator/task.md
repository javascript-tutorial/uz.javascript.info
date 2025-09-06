muhimlik: 5

---

# Depozit kalkulyatori

Bank depoziti summasini va foizlarni kiritish imkonini beruvchi interfeys yarating, so'ngra berilgan vaqtdan keyin qancha bo'lishini hisoblab chiqadi.

Mana demo:

[iframe src="solution" height="350" border="1"]

Har qanday kirish o'zgarishi darhol qayta ishlanishi kerak.

Formula quyidagicha:

```js
// boshlang'ich: boshlang'ich pul summasi
// qiziqish: masalan. 0,05 yiliga 5% degani
// yillar: necha yil kutish kerak
let result = Math.round(initial * (1 + interest * years));
```
