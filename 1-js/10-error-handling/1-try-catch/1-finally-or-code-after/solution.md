Agar funktsiya ichidagi kodni ko'rib chiqsak, farq aniq bo'ladi.

<<<<<<< HEAD
Agar `try..catch` dan "sakrab" chiqsa, xatti-harakatlar boshqacha bo'ladi.

Masalan, `return` `try..catch` ichida mavjud bo'lganda. `finally` bandi `try..catch` dan *har qanday* chiqish holatida, hatto `return` ifodasi orqali ishlaydi: `try..catch` tugashi bilanoq, lekin chaqiruv kodidan oldin boshqaruvni oladi.
=======
The behavior is different if there's a "jump out" of `try...catch`.

For instance, when there's a `return` inside `try...catch`. The `finally` clause works in case of *any* exit from `try...catch`, even via the `return` statement: right after `try...catch` is done, but before the calling code gets the control.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
function f() {
  try {
    alert('start');
*!*
    return "result";
*/!*
  } catch (err) {
    /// ...
  } finally {
    alert('cleanup!');
  }
}

f(); // cleanup!
```

...Yoki `throw` bo'lganida, bu yerda bo'lgani kabi:

```js run
function f() {
  try {
    alert('start');
<<<<<<< HEAD
    throw new Error("xato");
  } catch (e) {
=======
    throw new Error("an error");
  } catch (err) {
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    // ...
    if("xatoni bartaraf eta olmaydi") {
*!*
      throw err;
*/!*
    }

  } finally {
    alert('cleanup!')
  }
}

f(); // cleanup!
```

<<<<<<< HEAD
Bu yerda tozalashni kafolatlaydigan `finally` ifodasi. Agar biz kodni `f` ning oxiriga qo'ysak, u ishlamaydi.
=======
It's `finally` that guarantees the cleanup here. If we just put the code at the end of `f`, it wouldn't run in these situations.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
