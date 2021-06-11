**Javob: xato**

Try it:
```js run
function makeUser() {
  return {
    name: "John",
    ref: this
  };
};

let user = makeUser();

alert( user.ref.name ); // Error: Cannot read property 'name' of undefined
```

Buning sababi, `this` ni belgilaydigan qoidalar obyektlar soniga qarab bo'lmaydi.

`makeUser()` ichidagi `this`" qiymati `undefined`, chunki u usul sifatida emas, balki funktsiya sifatida chaqirilgan.

Obyektning o'zi `this` ga ta'sir qilmaydi. `this` ning qiymati butun funktsiya uchun bitta, kod bloklari va obyektlar  unga ta'sir qilmaydi.

Shunday qilib, `ref: bu` aslida joriy funktsiyani `this` ni oladi.

Qarama-qarshi holat:

```js run
function makeUser() {
  return {
    name: "John",
*!*
    ref() {
      return this;
    }
*/!*
  };
};

let user = makeUser();

alert( user.ref().name ); // John
```

Endi u ishlaydi, chunki `user.ref()` bu usul. Va `this` ning qiymati obyektga nuqtadan `.` oldin o'rnatiladi.


