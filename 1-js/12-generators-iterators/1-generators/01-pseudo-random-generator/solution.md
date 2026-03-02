```js run demo
function* pseudoRandom(seed) {
  let value = seed;

<<<<<<< HEAD
  while (true) {
    value = (value * 16807) % 2147483647;
=======
  while(true) {
    value = value * 16807 % 2147483647;
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
    yield value;
  }
}

let generator = pseudoRandom(1);

alert(generator.next().value); // 16807
alert(generator.next().value); // 282475249
alert(generator.next().value); // 1622650073
```

Iltimos, unutmang, xuddi shu kabi odatdagi funktsiya bilan amalga oshirilishi mumkin:

```js run
function pseudoRandom(seed) {
  let value = seed;

  return function () {
    value = (value * 16807) % 2147483647;
    return value;
  };
}

let generator = pseudoRandom(1);

alert(generator()); // 16807
alert(generator()); // 282475249
alert(generator()); // 1622650073
```

Bu kontekst uchun juda yaxshi. Ammo keyin biz `for..of` bilan takrorlash va boshqa joyda foydali bo'lishi mumkin bo'lgan generator tarkibidan foydalanish qobiliyatimizni yo'qotamiz.
