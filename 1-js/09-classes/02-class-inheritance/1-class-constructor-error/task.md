muhimlik: 5

---

# Namuna yaratishda xato

`Rabbit` kengaytirilgan `Animal` kodi.

Afsuski, `Rabbit` obyektlarini yaratish mumkin emas. Nima bo'ldi? Tuzating.

```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {
    this.name = name;
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("White Rabbit"); // Error: this is not defined
*/!*
alert(rabbit.name);
```
