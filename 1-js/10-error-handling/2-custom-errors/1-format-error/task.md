muhimlik: 5

---

# SyntaxError dan meros olish

O'rnatilgan `SyntaxError` klassidan meros oladigan `FormatError` klassini yarating.

U `message`, `name` va `stack` xususiyatlarini qo'llab-quvvatlashi kerak.

Foydalanish misoli:

```js
let err = new FormatError("formatlash xatosi");

alert(err.message); // formatlash xatosi
alert(err.name); // FormatError
alert(err.stack); // stack

alert(err instanceof FormatError); // true
alert(err instanceof SyntaxError); // true (SyntaxError dan meros olganligi uchun)
```

---

## Yechim

```js
class FormatError extends SyntaxError {
  constructor(message) {
    super(message);
    this.name = "FormatError";
  }
}

// Test
let err = new FormatError("formatlash xatosi");

alert(err.message); // formatlash xatosi
alert(err.name); // FormatError
alert(err.stack); // stack (brauzerga bog'liq)

alert(err instanceof FormatError); // true
alert(err instanceof SyntaxError); // true
alert(err instanceof Error); // true
```
