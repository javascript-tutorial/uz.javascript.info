importance: 5

---

# Hisoblagichlar mustaqil emasmi?

Bu erda bizda ikkita hisoblagich bor: `makeCounter` funktsiyasidan foydalangan holda `counter` va `counter2`.

Ular mustaqil emasmi? Ikkinchi hisoblagich nimani namoyish etadi? `0,1` yoki` 2,3` yoki boshqa narsa?

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

*!*
alert( counter2() ); // ?
alert( counter2() ); // ?
*/!*
```

