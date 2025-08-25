importance: 5

---

# Bind-dan keyin funktsiya xususiyati

Funksiya xususiyatida qiymat mavjud. U `bind` dan keyin o'zgaradimi? Javobingizni asoslang.

```js run
function sayHi() {
  alert( this.name );
}
sayHi.test = 5;

*!*
let bound = sayHi.bind({
  name: "John"
});

alert( bound.test ); // chiqishi qanday bo'ladi? nega?
*/!*
```
