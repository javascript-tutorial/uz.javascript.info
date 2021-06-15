importance: 5

---

# Bind-dan keyin funktsiya xususiyati

<<<<<<< HEAD
Funksiya xususiyatida qiymat mavjud. U `bind` dan keyin o'zgaradimi? Javobingizni asoslang.
=======
There's a value in the property of a function. Will it change after `bind`? Why, or why not?
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

