Buning sababi, bola konstruktor `super()` ni chaqirishi kerak.

Mana tuzatilgan kod:

```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {
    *!*
    super(name);
    */!*
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("White Rabbit"); //yaxshi hozir
*/!*
alert(rabbit.name); // White Rabbit
```
