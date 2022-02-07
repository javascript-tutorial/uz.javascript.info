importance: 2

---

# Ikki funktsiya - bitta obyekt

<<<<<<< HEAD
`A` va `B` funktsiyalarini `new A()==new B()` kabi yaratish mumkinmi?
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

Agar shunday bo'lsa, unda ularning kodlariga misol keltiring.
