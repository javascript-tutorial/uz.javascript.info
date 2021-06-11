
Orqa qoshtirnoq belgisi satrga `${...}` ichidagi ifodani joylashtiradi.

```js run
let name = "Elbek";

// ifoda - 1 raqami
alert( `hello ${1}` ); // hello 1

// ifoda - "name" matni
alert( `hello ${"name"}` ); // hello name

// ifoda name o'zgaruvchani, uning qiymati ko'rsatiladi nomi emas
alert( `hello ${name}` ); // hello Elbek
```
