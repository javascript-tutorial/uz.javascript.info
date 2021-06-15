
```js run demo
function pow(x, n) {
  let result = x;

  for (let i = 1; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", '');
let n = prompt("n?", '');

if (n < 1) {
<<<<<<< HEAD:1-js/02-first-steps/14-function-basics/4-pow/solution.md
  alert(`${n} darajasi quvvatlanmaydi,
     0 dan katta butun sondan foydalaning`);
=======
  alert(`Power ${n} is not supported, use a positive integer`);
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/15-function-basics/4-pow/solution.md
} else {
  alert( pow(x, n) );
}
```
