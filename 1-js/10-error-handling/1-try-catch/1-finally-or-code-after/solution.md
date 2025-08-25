Agar funktsiya ichidagi kodni ko'rib chiqsak, farq aniq bo'ladi.

Agar `try..catch` dan "sakrab" chiqsa, xatti-harakatlar boshqacha bo'ladi.

Masalan, `return` `try..catch` ichida mavjud bo'lganda. `finally` bandi `try..catch` dan _har qanday_ chiqish holatida, hatto `return` ifodasi orqali ishlaydi: `try..catch` tugashi bilanoq, lekin chaqiruv kodidan oldin boshqaruvni oladi.

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
    throw new Error("xato");
  } catch (e) {
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

Bu yerda tozalashni kafolatlaydigan `finally` ifodasi. Agar biz kodni `f` ning oxiriga qo'ysak, u ishlamaydi.
