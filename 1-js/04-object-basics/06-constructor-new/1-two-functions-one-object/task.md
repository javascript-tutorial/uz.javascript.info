importance: 2

---

# Ikki funktsiya - bitta obyekt

<<<<<<< HEAD
`A` va `B` funktsiyalarini `new A()==new B()` kabi yaratish mumkinmi?
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A();
let b = new B();

alert( a == b ); // true
```

Agar shunday bo'lsa, unda ularning kodlariga misol keltiring.
