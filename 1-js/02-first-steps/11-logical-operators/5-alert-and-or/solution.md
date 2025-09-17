Javob: `3`.

```js run
alert(null || (2 && 3) || 4);
```

VA `&&` ning ustunligi YOKI `||` dan yuqori, shuning uchun u avval bajariladi.

`2 && 3 = 3` natijasi, shuning uchun ifoda quyidagicha bo'ladi:

```
null || 3 || 4
```

Natijada birinchi to'g'ri qiymat: `3`.
