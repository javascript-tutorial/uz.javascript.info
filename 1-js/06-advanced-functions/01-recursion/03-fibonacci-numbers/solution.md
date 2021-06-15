Bu yerda sinab ko'rishimiz mumkin bo'lgan birinchi yechim - bu rekursiv yechim.

Fibonachchi raqamlari ta'rifi bo'yicha rekursivdir:

```js run
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

alert( fib(3) ); // 2
alert( fib(7) ); // 13
// fib(77); // juda sekin bo'ladi!
```

...Ammo `n` ning katta qiymatlari uchun bu juda sekin. Masalan, `fib(77)` uchun interpretator bir muncha vaqt protsessorning barcha resurslarini iste'mol qilishi mumkin.

Buning sababi shundaki, funktsiya juda ko'p chaqiruvlarni amalga oshiradi. Xuddi shu qiymatlar qayta-qayta baholanadi.

Masalan, `fib(5)` uchun hisob-kitoblarning bir qismini ko'rib chiqamiz:

```js no-beautify
...
fib(5) = fib(4) + fib(3)
fib(4) = fib(3) + fib(2)
...
```

Bu yerda `fib(3)` qiymati `fib(5)` va `fib(4)` uchun ham zarurligini ko'rishimiz mumkin. Shunday qilib, `fib(3)` ikki marotaba mustaqil ravishda chaqiriladi va baholanadi.

Mana, to'liq rekursiya daraxti:

<<<<<<< HEAD
![fibonachchi rekursion daraxti](fibonacci-recursion-tree.svg)
=======
![fibonacci recursion tree](fibonacci-recursion-tree.svg)
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Biz aniq bilib olamizki, `fib(3)` ikki marta va `fib(2)` uch marta baholanadi. Hisoblashlarning umumiy miqdori `n` ga qaraganda tezroq o'sib boradi va bu hatto `n = 77` uchun ham juda katta bo'ladi.

Biz buni allaqachon baholangan qiymatlarni eslab, optimallashtirishimiz mumkin: agar `fib(3)` so'zining qiymati bir marta hisoblansa, uni kelgusi hisob-kitoblarda ishlatishimiz mumkin.

Boshqa variant - bu rekursiyadan voz kechish va tsiklga asoslangan mutlaqo boshqa algoritmdan foydalanish.

`n` dan past qiymatlarga o'tish o'rniga, biz `1` va `2` dan boshlanib, keyin `fib(3)` ni ularning yig'indisi sifatida, so'ngra `fib(4)` ni yig'amiz oldingi ikkita qiymatdan, keyin `fib(5)` va kerakli qiymatga kelguncha yuqoriga ko'tariladi. Har bir qadamda biz faqat ikkita oldingi qiymatni eslab qolishimiz kerak.

Bu yerda yangi algoritmning qadamlari batafsil ko'rsatilgan.

Boshlanish:

```js
// a = fib(1), b = fib(2), ushbu qiymatlar 1 ta'rifi bo'yicha
let a = 1, b = 1;

// get c = fib(3) ularning yig'indisi sifatida
let c = a + b;

/* bizda endi bor fib(1), fib(2), fib(3)
a  b  c
1, 1, 2
*/
```

Endi biz `fib(4) = fib(2) + fib(3)` ni olmoqchimiz.

O'zgaruvchanlarni almashtiramiz: `a,b` `fib(2)`, `fib(3)` va `c` ularning yig'indisini oladi:

```js no-beautify
a = b; // endi a = fib(2)
b = c; // endi b = fib(3)
c = a + b; // c = fib(4)

/* endi bizda ketma-ketlik bor:
   a  b  c
1, 1, 2, 3
*/
```

Keyingi qadam yana bir tartib raqamini beradi:

```js no-beautify
a = b; // endi a = fib(3)
b = c; // endi b = fib(4)
c = a + b; // c = fib(5)

/* now the sequence is (one more number):
      a  b  c
1, 1, 2, 3, 5
*/
```

...Va kerakli qiymatni olmagunimizcha bu shunday davom etadi. Bu rekursiyadan ancha tez va takrorlanadigan hisob-kitoblarni o'z ichiga olmaydi.

To'liq kod:

```js run
function fib(n) {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}

alert( fib(3) ); // 2
alert( fib(7) ); // 13
alert( fib(77) ); // 5527939700884757
```

Tsikl `i = 3` bilan boshlanadi, chunki birinchi va ikkinchi ketma-ketlik qiymatlari `a = 1`, `b = 1` o'zgaruvchanlarga qattiq kodlangan.

Yondashuv [dinamik dasturlash pastdan yuqoriga](https://en.wikipedia.org/wiki/Dynamic_programming) deb nomlanadi.