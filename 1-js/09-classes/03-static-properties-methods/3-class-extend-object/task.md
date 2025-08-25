muhimlik: 3

---

# Klass Obyektni kengaytiradimi?

Ma'lumki, barcha obyektlar odatda `Object.prototype` dan meros bo'lib, `hasOwnProperty` va boshqalar kabi "umumiy" obyekt usullariga kirish huquqiga ega.

Masalan:

```js run
class Rabbit {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

*!*
// hasOwnProperty method is from Object.prototype
alert( rabbit.hasOwnProperty('name') ); // true
*/!*
```

Agar biz uni `"class Rabbit extends Object"` kabi aniq yozsak, natija oddiy `"class Rabbit"` dan farq qiladimi?

Farqi nima?

Mana bunday kodning misoli (u ishlamaydi - nima uchun? uni tuzating):

```js
class Rabbit extends Object {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert(rabbit.hasOwnProperty("name")); // Error
```
