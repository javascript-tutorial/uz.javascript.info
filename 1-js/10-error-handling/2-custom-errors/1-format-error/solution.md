```js run untrusted
class FormatError extends SyntaxError {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

let err = new FormatError("formatlashda xatolik");

alert(err.message); // formatlashda xatolik
alert(err.name); // FormatError
alert(err.stack); // stack

alert(err instanceof SyntaxError); // true
```
