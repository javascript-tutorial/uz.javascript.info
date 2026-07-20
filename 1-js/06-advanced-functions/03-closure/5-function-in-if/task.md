<<<<<<< HEAD
# If ning ichidagi funktsiya

Kodga qarang. So'nggi satrdagi chaqiruv natijasi qanday bo'ladi?
=======
importance: 5

---
# Function in if

Look at the code. What will be the result of the call at the last line?
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

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
