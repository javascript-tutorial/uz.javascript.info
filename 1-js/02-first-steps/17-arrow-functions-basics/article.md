# Arrow funksiyalar, asoslar

Funksiya yaratishning yana bir juda oddiy va qisqa sintaksisi bor, u ko'pincha Funksiya ifodalaridan yaxshiroqdir.

U "arrow funksiyalar" deb ataladi, chunki u quyidagicha ko'rinadi:

```js
let func = (arg1, arg2, ..., argN) => expression;
```

<<<<<<< HEAD
...Bu `arg1..argN` argumentlarini qabul qiladigan `func` funksiyasini yaratadi, keyin ulardan foydalanib o'ng tomondagi `expression` ni baholaydi va natijasini qaytaradi.
=======
This creates a function `func` that accepts arguments `arg1..argN`, then evaluates the `expression` on the right side with their use and returns its result.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

Boshqacha qilib aytganda, bu quyidagining qisqaroq versiyasi:

```js
let func = function(arg1, arg2, ..., argN) {
  return expression;
};
```

Konkret misolni ko'ramiz:

```js run
let sum = (a, b) => a + b;

/* Bu arrow funksiya quyidagining qisqa shakli:

let sum = function(a, b) {
  return a + b;
};
*/

alert(sum(1, 2)); // 3
```

<<<<<<< HEAD
Ko'rib turganingizdek, `(a, b) => a + b` `a` va `b` nomli ikkita argumentni qabul qiladigan funksiyani anglatadi. Bajarilishda u `a + b` ifadasini baholaydi va natijani qaytaradi.
=======
As you can see, `(a, b) => a + b` means a function that accepts two arguments named `a` and `b`. Upon the execution, it evaluates the expression `a + b` and returns the result.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

- Agar bizda faqat bitta argument bo'lsa, parametrlar atrofidagi qavslarni tashlab qo'yish mumkin, bu uni yanada qisqaroq qiladi.

  Masalan:

  ```js run
  *!*
  let double = n => n * 2;
  // taxminan bunday: let double = function(n) { return n * 2 }
  */!*

  alert( double(3) ); // 6
  ```

<<<<<<< HEAD
- Agar argumentlar bo'lmasa, qavslar bo'sh bo'ladi (lekin ular bo'lishi kerak):
=======
- If there are no arguments, parentheses are empty, but they must be present:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

  ```js run
  let sayHi = () => alert("Salom!");

  sayHi();
  ```

Arrow funksiyalarni Funksiya ifodalari bilan bir xil tarzda ishlatish mumkin.

Masalan, funksiyani dinamik yaratish uchun:

```js run
let age = prompt("Yoshingiz necha?", 18);

<<<<<<< HEAD
let welcome =
  age < 18 ? () => alert("Salom") : () => alert("Assalomu alaykum!");
=======
let welcome = (age < 18) ?
  () => alert('Hello!') :
  () => alert("Greetings!");
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

welcome();
```

Arrow funksiyalar dastlab notanish va unchalik o'qilishi mumkin emas, lekin ko'zlar tuzilishga o'rganib qolgach, bu tezda o'zgaradi.

Ular oddiy bir qatorli harakatlar uchun juda qulay, biz ko'p so'z yozishga dangasamiz.

## Ko'p qatorli arrow funksiyalar

<<<<<<< HEAD
Yuqoridagi misollar `=>` ning chap tomonidan argumentlarni oldi va ular bilan o'ng tomondagi ifodani baholadi.

Ba'zan bizga biroz murakkabroq narsa kerak bo'ladi, masalan bir nechta ifodalar yoki iboralar. Bu ham mumkin, lekin biz ularni jingalak qavslar ichiga olishimiz kerak. Keyin ular ichida oddiy `return` dan foydalaning.
=======
The arrow functions that we've seen so far were very simple. They took arguments from the left of `=>`, evaluated and returned the right-side expression with them.

Sometimes we need a more complex function, with multiple expressions and statements. In that case, we can enclose them in curly braces. The major difference is that curly braces require a `return` within them to return a value (just like a regular function does).
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

Quyidagicha:

```js run
let sum = (a, b) => {  // jingalak qavs ko'p qatorli funksiyani ochadi
  let result = a + b;
*!*
<<<<<<< HEAD
  return result; // agar jingalak qavslardan foydalansak, aniq "return" kerak
=======
  return result; // if we use curly braces, then we need an explicit "return"
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="Ma'lumot o'rnida"
Bu yerda biz arrow funksiyalarni qisqaligi uchun maqtadik. Lekin hammasi shu emas!

Arrow funksiyalar boshqa qiziqarli xususiyatlarga ega.

Ularni chuqur o'rganish uchun avval JavaScript-ning boshqa jihatlarini bilishimiz kerak, shuning uchun arrow funksiyalarga keyinroq <info:arrow-functions> bobida qaytamiz.

Hozircha biz arrow funksiyalarni bir qatorli harakatlar va callbacklar uchun ishlatishimiz mumkin.
```

## Xulosa

<<<<<<< HEAD
Arrow funksiyalar bir qatorlilar uchun qulay. Ular ikki xil bo'ladi:

1. Jingalak qavslarsiz: `(...args) => expression` -- o'ng tomon ifoda: funksiya uni baholaydi va natijani qaytaradi.
2. Jingalak qavslar bilan: `(...args) => { body }` -- qavslar bizga funksiya ichida bir nechta iboralarni yozishga imkon beradi, lekin biror narsani qaytarish uchun aniq `return` kerak.
=======
Arrow functions are handy for simple actions, especially for one-liners. They come in two flavors:

1. Without curly braces: `(...args) => expression` -- the right side is an expression: the function evaluates it and returns the result. Parentheses can be omitted, if there's only a single argument, e.g. `n => n*2`.
2. With curly braces: `(...args) => { body }` -- brackets allow us to write multiple statements inside the function, but we need an explicit `return` to return something.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
