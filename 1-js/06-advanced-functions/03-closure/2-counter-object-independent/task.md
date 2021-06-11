importance: 5

---

# Hisoblagich obyekti

Bu yerda konstruktor funktsiyasi yordamida hisoblagich obyekti yaratildi.

Ishlaydimi? Bu nimani ko'rsatadi?

```js
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert( counter.up() ); // ?
alert( counter.up() ); // ?
alert( counter.down() ); // ?
```

