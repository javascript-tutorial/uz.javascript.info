```js demo
function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}
<<<<<<< HEAD
```

`debounce` ga chaqiruv o'ramni qaytaradi. Ikki variant bo'lishi mumkin:

- `isCooldown = false` -- bajarilishga tayyor.
- `isCooldown = true` -- vaqt tugashini kutmoqda.

Birinchi chaqiruvda `isCooldown` `false`, shuning uchun chaqiruv davom etadi va holat `true` ga o'zgaradi.

`isCooldown` `true` bo'lsa, boshqa barcha chaqiruvlar e'tiborga olinmaydi.

Keyin `setTimeout` berilgan kechikishdan keyin uni `false` ga qaytaradi.
=======

```

A call to `debounce` returns a wrapper. When called, it schedules the original function call after given `ms` and cancels the previous such timeout.

>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
