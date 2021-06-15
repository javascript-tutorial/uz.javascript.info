importance: 5

---

<<<<<<< HEAD
# this yo'qotishni so'rang
=======
# Fix a function that loses "this"
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Quyidagi koddagi `askPassword()` ga chaqiruv parolni tekshirishi kerak va keyin javobga qarab `user.loginOk/loginFail` chaqirishi kerak.

Ammo bu xatoga olib keladi. Nima uchun?

Hammasi to'g'ri ishlashni boshlashi uchun ajratilgan satrni to'g'rilab qo'ying (boshqa satrlarni o'zgartirish kerak emas).

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
askPassword(user.loginOk, user.loginFail);
*/!*
```
