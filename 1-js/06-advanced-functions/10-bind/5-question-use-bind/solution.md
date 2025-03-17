
<<<<<<< HEAD
Xato yuz berdi, chunki `ask` obyektsiz `loginOk/loginFail` funktsiyalarini oladi.
=======
The error occurs because `askPassword` gets functions `loginOk/loginFail` without the object.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Ularni chaqirganda, ular tabiiy ravishda `this=undefined` deb taxmin qilishadi.

Keling, kontekstni bog'laymiz:

```js run
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  loginOk() {
    alert(`${this.name} logged in`);
  },

  loginFail() {
    alert(`${this.name} failed to log in`);
  },

};

*!*
askPassword(user.loginOk.bind(user), user.loginFail.bind(user));
*/!*
```

Endi u ishlaydi.

Muqobil yechim bo'lishi mumkin:
```js
//...
askPassword(() => user.loginOk(), () => user.loginFail());
```

<<<<<<< HEAD
Odatda bu ham ishlaydi, lekin `user` so'rash va ishga tushirish vaqtlari orasida yozilishi mumkin bo'lgan murakkab vaziyatlarda ishlamay qolishi mumkin `() => user.loginOk ()`.

=======
Usually that also works and looks good.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

It's a bit less reliable though in more complex situations where `user` variable might change *after* `askPassword` is called, but *before* the visitor answers and calls `() => user.loginOk()`. 
