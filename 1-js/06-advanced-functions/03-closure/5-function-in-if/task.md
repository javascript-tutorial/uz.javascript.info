<<<<<<< HEAD
# If ning ichidagi funktsiya

Kodga qarang. So'nggi satrdagi chaqiruv natijasi qanday bo'ladi?
=======
importance: 5

---
# Function in if

Look at the code. What will be the result of the call at the last line?
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
let phrase = "Hello";

if (true) {
  let user = "John";

  function sayHi() {
    alert(`${phrase}, ${user}`);
  }
}

*!*
sayHi();
*/!*
```
