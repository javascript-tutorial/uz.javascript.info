Maksimal uzunlik `maxlength` bo'lishi kerak, shuning uchun biz ellipsis uchun joy berish uchun uni biroz qisqartirishimiz kerak.

Aslida ellipsis uchun bitta unikod belgisi mavjudligiga e'tibor bering. Bu uchta nuqta emas.

```js run demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
