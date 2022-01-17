importance: 2

---

# Ikki funktsiya - bitta obyekt

<<<<<<< HEAD
`A` va `B` funktsiyalarini `new A()==new B()` kabi yaratish mumkinmi?
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> a6fdfda09570a8ce47bb0b83cd7a32a33869cfad

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

Agar shunday bo'lsa, unda ularning kodlariga misol keltiring.
