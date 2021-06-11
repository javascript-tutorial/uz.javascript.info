# Oddiy, ammo noto'g'ri yechim

Eng sodda, ammo noto'g'ri yechim, `min` dan max" gacha qiymat hosil qilish va uni yaxlitlash:

```js run
function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min); 
  return Math.round(rand);
}

alert( randomInteger(1, 3) );
```

Funktsiya ishlaydi, ammo bu noto'g'ri. `min` va `max` chekka qiymatlarini olish ehtimoli boshqalarga nisbatan ikki baravar kam.

Yuqoridagi misolni bir necha bor takrorlasangiz, `2` ning tez-tez paydo bo'lishini osongina ko'rasiz.

Buning sababi, `Math.round()` tasodifiy sonlarni `1..3` oralig'idan oladi va ularni quyidagicha yaxlitlaydi:

```js no-beautify
1 ... dan 1.4999999999 gacha qiymatlar 1 ga aylanadi
1.5 ... dan 2.4999999999 gacha qiymatlar 2 ga aylanadi
2.5 ... dan 2.9999999999 gacha qiymatlar 3 ga aylanadi
```

Endi aniq ko'rishimiz mumkinki, `1` qiymati `2` dan ikki baravar kamroq qiymatga ega bo'ladi. Va `3` ham shunday.

# To'g'ri yechim

Vazifani hal qilishning ko'plab to'g'ri yechimlari mavjud. Ulardan biri intervalli chegaralarni sozlashdir. Xuddi shu intervallarni ta'minlash uchun biz `0,5 dan 3,5` gacha qiymatlarni yaratishimiz mumkin, shu bilan kerakli ehtimollarni qirralarga qo'shamiz:

```js run
*!*
function randomInteger(min, max) {
  // endi  (min-0.5) dan (max+0.5) gacha
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

Shu bilan bir qatorda tasodifiy son uchun `Math.floor` `min` dan `max + 1` gacha foydalanish mumkin:

```js run
*!*
function randomInteger(min, max) {
  //bu yerda min dan (max+1) gacha
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

Endi barcha intervallar quyidagicha ishlaydi:

```js no-beautify
1 ... dan 1.9999999999 gacha qiymatlar 1 ga teng
2 ... dan 2.9999999999 gacha qiymatlar 2 ga teng
3 ... dan 3.9999999999 gacha qiymatlar 3 ga teng
```

Barcha intervallar bir xil uzunlikka ega bo'lib, yakuniy taqsimot bir xil bo'ladi.
