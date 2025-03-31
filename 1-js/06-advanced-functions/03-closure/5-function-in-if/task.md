importance: 5

<<<<<<< HEAD
# If ning ichidagi funktsiya
=======
---
# Function in if
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

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
