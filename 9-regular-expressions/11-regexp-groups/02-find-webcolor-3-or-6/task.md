# #abc yoki #abcdef formatida rangni toping

`#abc` yoki `#abcdef` formatida ranglarga mos keladigan RegExp yozing. Ya'ni: `#` keyin 3 yoki 6 o'n oltilik raqam.

Masalan:

```js
let regexp = /sizning regepxiyingiz/g;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert(str.match(regexp)); // #3f3 #AA00ef
```

P.S. Bu aniq 3 yoki 6 hex raqam bo'lishi kerak. `#abcd` kabi 4 ta raqamdan iborat qiymatlar mos kelmasligi kerak.
