importance: 5

<<<<<<< HEAD
# If ning ichidagi funktsiya
=======
---
# Function in if
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

<<<<<<< HEAD:1-js/06-advanced-functions/03-closure/3-function-in-if/task.md
Kodga qarang. So'nggi satrdagi chaqiruv natijasi qanday bo'ladi?
=======
Look at the code. What will be the result of the call at the last line?
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/06-advanced-functions/03-closure/5-function-in-if/task.md

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
