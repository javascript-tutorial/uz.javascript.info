Birinchi g'oya tillarni o'rtalarida `|` bilan ro'yxatlash bo'lishi mumkin.

Ammo bu to'g'ri ishlamaydi:

```js run
let regexp = /Java|JavaScript|PHP|C|C\+\+/g;

let str = "Java, JavaScript, PHP, C, C++";

alert(str.match(regexp)); // Java,Java,PHP,C,C
```

Muntazam ifoda dvigateli alternativlarni birin-ketin qidiradi. Ya'ni: avval `match:Java` bor-yo'qligini tekshiradi, aks holda -- `match:JavaScript` ni qidiradi va hokazo.

Natijada, `match:JavaScript` hech qachon topila olmaydi, chunki `match:Java` birinchi bo'lib tekshiriladi.

`match:C` va `match:C++` bilan ham xuddi shunday.

Bu muammo uchun ikkita yechim bor:

1. Uzunroq moslikni birinchi tekshirish uchun tartibni o'zgartirish: `pattern:JavaScript|Java|C\+\+|C|PHP`.
2. Bir xil boshlanish bilan variantlarni birlashtirish: `pattern:Java(Script)?|C(\+\+)?|PHP`.

Amalda:

```js run
let regexp = /Java(Script)?|C(\+\+)?|PHP/g;

let str = "Java, JavaScript, PHP, C, C++";

alert(str.match(regexp)); // Java,JavaScript,PHP,C,C++
```
