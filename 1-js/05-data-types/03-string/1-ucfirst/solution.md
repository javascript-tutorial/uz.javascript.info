Biz birinchi belgini "o'zgartira olmaymiz", chunki JavaScript-dagi matnlar o'zgarmasdir.

Ammo biz mavjud bo'lgan matnga asosan birinchi belgini katta registr qilishimiz mumkin:

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

Ammo kichik bir muammo bor. Agar `str` bo'sh bo'lsa, unda `str[0]` aniqlanmagan(undefined), shuning uchun xato bo'ladi.

Bu yerda ikkita variant mavjud:

1. `str.charAt(0)` dan foydalanish, chunki u har doim matni qaytaradi (ehtimol bo'sh).
2. Bo'sh satr uchun test qo'shish.

Mana, ikkinchi variant:

```js run
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("john") ); // John
```

