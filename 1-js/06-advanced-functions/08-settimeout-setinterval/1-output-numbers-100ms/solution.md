
`setInterval` dan foydalanish:

```js run
function printNumbers(from, to) {
  let current = from;

  let timerId = setInterval(function() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }, 1000);
}

// usage:
printNumbers(5, 10);
```

`setTimeout` dan foydalanish:


```js run
function printNumbers(from, to) {
  let current = from;

  setTimeout(function go() {
    alert(current);
    if (current < to) {
      setTimeout(go, 1000);
    }
    current++;
  }, 1000);
}

// foydalanish:
printNumbers(5, 10);
```

Shuni esda tutingki, ikkala echimda ham birinchi chiqishdan oldin dastlabki kechikish mavjud. Ba'zan darhol birinchi chiqishni amalga oshirish uchun satr qo'shishimiz kerak, buni bajarish oson.
