Ta'rifga ko'ra, faktorial `n!` deb yozilishi mumkin `n * (n-1)!`.

Boshqacha qilib aytganda, `faktorial(n)` natijasini `faktorial(n-1)` natijasiga ko'paytirib, `n` deb hisoblash mumkin. Va `n-1` chaqiruvi rekursiv ravishda `1` gacha pastroq va pastroq tushishi mumkin.

```js run
function factorial(n) {
  return n != 1 ? n * factorial(n - 1) : 1;
}

alert(factorial(5)); // 120
```

Rekursiyaning asosini `1` qiymati tashkil etadi. Bundan tashqari, biz bu erda `0` ni asos qilib olamiz, unchalik muhim emas, lekin yana bitta rekursiv qadam beradi:

```js run
function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

alert(factorial(5)); // 120
```
