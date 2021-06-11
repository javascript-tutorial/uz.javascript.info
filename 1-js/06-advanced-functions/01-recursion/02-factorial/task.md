importance: 4

---

# Faktorialni hisoblang

Tabiiy sonning [factoriali](https://en.wikipedia.org/wiki/Factorial) - bu `"minus bitta"` ga, so'ngra `"minus ikki"` ga ko'paytiriladigan raqam va shunga o'xshash `1` gacha. `N` faktoriali `n!` bilan belgilanadi

Biz faktorial ta'rifini quyidagicha yozishimiz mumkin:

```js
n! = n * (n - 1) * (n - 2) * ...*1
```

Turli `n` uchun faktoriallarning qiymatlari:

```js
1! = 1
2! = 2 * 1 = 2
3! = 3 * 2 * 1 = 6
4! = 4 * 3 * 2 * 1 = 24
5! = 5 * 4 * 3 * 2 * 1 = 120
```

Vazifa rekursiv chaqiriqlar yordamida `n!` ni hisoblaydigan `factorial(n)` funktsiyani yozishdan iborat.

```js
alert( factorial(5) ); // 120
```

P.S. Maslahat: `n!` ni `n * (n-1)!` deb yozish mumkin! Masalan: `3! = 3*2! = 3*2*1! = 6`
