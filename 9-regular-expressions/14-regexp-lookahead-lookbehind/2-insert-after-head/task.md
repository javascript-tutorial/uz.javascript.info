# Boshdan keyin kiriting

Bizda HTML hujjati bo'lgan qator mavjud.

`<body>` tegidan keyin darhol `<h1>Salom</h1>` qo`shiladigan oddiy iborani yozing. Teg atributlarga ega bo'lishi mumkin.

Masalan:

```js
let regexp = /sizning muntazam ifodangiz/;

let str = `
<html>
  <body style="height: 200px">
  ...
  </body>
</html>
`;

str = str.replace(regexp, `<h1>Salom</h1>`);
```

<<<<<<< HEAD
Shundan so'ng "str" ​​qiymati quyidagicha bo'lishi kerak:
=======
After that the value of `str` should be:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```html
<html>
  <body style="height: 200px">
    <h1>Salom</h1>
    ...
  </body>
</html>
```
