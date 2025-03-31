Yechim, har bir chaqiruvdan obyektning o'zi qaytib keladi.

```js run demo
let ladder = {
  step: 0,
  up() {
    this.step++;
*!*
    return this;
*/!*
  },
  down() {
    this.step--;
*!*
    return this;
*/!*
  },
  showStep() {
    alert( this.step );
*!*
    return this;
*/!*
  }
};

ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0
```

Biz har bir satr uchun bitta chaqiruv yozishimiz mumkin. Uzoq zanjirlar uchun o'qilishni oson qiladi:

```js
ladder
  .up()
  .up()
  .down()
  .showStep() // 1
  .down()
  .showStep(); // 0
```
