<<<<<<< HEAD
# If ning ichidagi funktsiya

Kodga qarang. So'nggi satrdagi chaqiruv natijasi qanday bo'ladi?
=======
importance: 5

---
# Function in if

Look at the code. What will be the result of the call at the last line?
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

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
