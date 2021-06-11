```js demo
function debounce(f, ms) {

  let isCooldown = false;

  return function() {
    if (isCooldown) return;

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => isCooldown = false, ms);
  };

}
```

`debounce` ga chaqiruv o'ramni qaytaradi. Ikki variant bo'lishi mumkin:

- `isCooldown = false` -- bajarilishga tayyor.
- `isCooldown = true` -- vaqt tugashini kutmoqda.

Birinchi chaqiruvda `isCooldown` `false`, shuning uchun chaqiruv davom etadi va holat `true` ga o'zgaradi.

`isCooldown` `true` bo'lsa, boshqa barcha chaqiruvlar e'tiborga olinmaydi.

Keyin `setTimeout` berilgan kechikishdan keyin uni `false` ga qaytaradi.
