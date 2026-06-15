<<<<<<< HEAD
# If ning ichidagi funktsiya

Kodga qarang. So'nggi satrdagi chaqiruv natijasi qanday bo'ladi?
=======
importance: 5

---
# Function in if

Look at the code. What will be the result of the call at the last line?
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

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
