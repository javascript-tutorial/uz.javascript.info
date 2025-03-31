Biz birinchi belgini "o'zgartira olmaymiz", chunki JavaScript-dagi matnlar o'zgarmasdir.

Ammo biz mavjud bo'lgan matnga asosan birinchi belgini katta registr qilishimiz mumkin:

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

<<<<<<< HEAD
Ammo kichik bir muammo bor. Agar `str` bo'sh bo'lsa, unda `str[0]` aniqlanmagan(undefined), shuning uchun xato bo'ladi.
=======
There's a small problem though. If `str` is empty, then `str[0]` is `undefined`, and as `undefined` doesn't have the `toUpperCase()` method, we'll get an error.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

<<<<<<< HEAD
Bu yerda ikkita variant mavjud:

1. `str.charAt(0)` dan foydalanish, chunki u har doim matni qaytaradi (ehtimol bo'sh).
2. Bo'sh satr uchun test qo'shish.

Mana, ikkinchi variant:
=======
The easiest way out is to add a test for an empty string, like this:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js run demo
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("john") ); // John
```
