```js run demo
function pow(x, n) {
  let result = x;

  for (let i = 1; i < n; i++) {
    result *= x;
  }

  return result;
}

<<<<<<< HEAD
let x = prompt("x?", "");
let n = prompt("n?", "");
=======
let x = +prompt("x?", '');
let n = +prompt("n?", '');
>>>>>>> 20208769e528337949e946f526534d61d38bac47

if (n < 1) {
  alert(`${n} darajasi quvvatlanmaydi,
     0 dan katta butun sondan foydalaning`);
} else {
  alert(pow(x, n));
}
```
