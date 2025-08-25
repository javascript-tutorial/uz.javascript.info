muhimlik: 5

---

# Kirish uchun qisman dastur

Vazifa <info:task/question-use-bind> ning biroz murakkab variantidir.

`user` obyekti o'zgartirildi. Endi ikkita funktsiya `loginOk/loginFail` o'rniga, unda bitta `user.login(true/false)` funktsiyasi mavjud.

Quyidagi kodda `askPassword`-ni `user.login(true)` `ok` va `user.login(false)` `fail` deb chaqirishi uchun nima qilish kerak?

```js
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  login(result) {
    alert( this.name + (result ? ' logged in' : ' failed to log in') );
  }
};

*!*
askPassword(?, ?); // ?
*/!*
```

Siz faqat ajratilgan qismni o'zgartirishiz kerak.
