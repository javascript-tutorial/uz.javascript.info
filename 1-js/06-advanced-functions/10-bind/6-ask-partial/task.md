importance: 5

---

# Kirish uchun qisman dastur

Vazifa <info:task/question-use-bind> ning biroz murakkab variantidir.

`user` obyekti o'zgartirildi. Endi ikkita funktsiya `loginOk/loginFail` o'rniga, unda bitta `user.login(true/false)` funktsiyasi mavjud.

<<<<<<< HEAD:1-js/06-advanced-functions/11-currying-partials/1-ask-currying/task.md
Quyidagi kodda `askPassword`-ni `user.login(true)` `ok` va `user.login(false)` `fail` deb chaqirishi uchun nima qilish kerak?
=======
What should we pass `askPassword` in the code below, so that it calls `user.login(true)` as `ok` and `user.login(false)` as `fail`?
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/06-advanced-functions/10-bind/6-ask-partial/task.md

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

