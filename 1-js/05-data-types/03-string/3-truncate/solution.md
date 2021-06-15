Maksimal uzunlik `maxlength` bo'lishi kerak, shuning uchun biz ellipsis uchun joy berish uchun uni biroz qisqartirishimiz kerak.

<<<<<<< HEAD
Aslida ellipsis uchun bitta unikod belgisi mavjudligiga e'tibor bering. Bu uchta nuqta emas.
=======
Note that there is actually a single Unicode character for an ellipsis. That's not three dots.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
