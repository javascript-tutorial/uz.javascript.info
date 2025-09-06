# HTML ranglari uchun Regexp

`#ABCDEF` sifatida yozilgan HTML ranglarini qidirish uchun regexp yarating: avval `#` va keyin 6 o'n oltilik belgilar.

Misol:

```js
let regexp = /...sizning regexp.../;

let str =
  "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2 #12345678";

alert(str.match(regexp)); // #121212,#AA00ef
```

P.S. Bu vazifada bizga `#123` yoki `rgb(1,2,3)` va hokazo kabi boshqa rang formatlari kerak emas.
