
Birinchi chaqiruvda `this == rabbit`, boshqalarida `this` `Rabbit.prototype` ga teng, chunki bu aslida nuqta oldidagi obyekt.

Shunday qilib, faqat birinchi chaqiruv `Rabbit`, boshqalari `undefined` ni ko'rsatadi:

```js run
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert( this.name );
}

let rabbit = new Rabbit("Rabbit");

rabbit.sayHi();                        // Rabbit
Rabbit.prototype.sayHi();              // undefined
Object.getPrototypeOf(rabbit).sayHi(); // undefined
rabbit.__proto__.sayHi();              // undefined
```
