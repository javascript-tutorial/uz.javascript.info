importance: 2

---

# Ikki funktsiya - bitta obyekt

<<<<<<< HEAD
`A` va `B` funktsiyalarini `new A()==new B()` kabi yaratish mumkinmi?
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

Agar shunday bo'lsa, unda ularning kodlariga misol keltiring.
