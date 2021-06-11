

```js run demo
let a = +prompt("Birinchi raqam?", "");
let b = +prompt("Ikkinchi raqam?", "");

alert( a + b );
```

`prompt` oldidan unar plyusga `+` e'tibor bering. U darhol qiymatni raqamga o'zgartiradi.

Aks holda, `a` va `b` matn bo'ladi, ularning yig'indisi ularning birikmasi bo'ladi, ya'ni: `"1" + "2" = "12"`.