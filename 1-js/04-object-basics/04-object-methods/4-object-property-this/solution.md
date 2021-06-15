**Javob: xato**

Try it:
```js run
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // Error: Cannot read property 'name' of undefined
```

<<<<<<< HEAD
Buning sababi, `this` ni belgilaydigan qoidalar obyektlar soniga qarab bo'lmaydi.

`makeUser()` ichidagi `this`" qiymati `undefined`, chunki u usul sifatida emas, balki funktsiya sifatida chaqirilgan.

Obyektning o'zi `this` ga ta'sir qilmaydi. `this` ning qiymati butun funktsiya uchun bitta, kod bloklari va obyektlar  unga ta'sir qilmaydi.
=======
That's because rules that set `this` do not look at object definition. Only the moment of call matters.

Here the value of `this` inside `makeUser()` is `undefined`, because it is called as a function, not as a method with "dot" syntax.

The value of `this` is one for the whole function, code blocks and object literals do not affect it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Shunday qilib, `ref: bu` aslida joriy funktsiyani `this` ni oladi.

<<<<<<< HEAD
Qarama-qarshi holat:
=======
We can rewrite the function and return the same `this` with `undefined` value: 

```js run
function makeUser(){
  return this; // this time there's no object literal
}

alert( makeUser().name ); // Error: Cannot read property 'name' of undefined
```
As you can see the result of `alert( makeUser().name )` is the same as the result of `alert( user.ref.name )` from the previous example.

Here's the opposite case:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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
}

let user = makeUser();

alert( user.ref().name ); // John
```

<<<<<<< HEAD
Endi u ishlaydi, chunki `user.ref()` bu usul. Va `this` ning qiymati obyektga nuqtadan `.` oldin o'rnatiladi.


=======
Now it works, because `user.ref()` is a method. And the value of `this` is set to the object before dot `.`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
