
Xato yuz berdi, chunki `ask` obyektsiz `loginOk/loginFail` funktsiyalarini oladi.

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

Odatda bu ham ishlaydi, lekin `user` so'rash va ishga tushirish vaqtlari orasida yozilishi mumkin bo'lgan murakkab vaziyatlarda ishlamay qolishi mumkin `() => user.loginOk ()`.


