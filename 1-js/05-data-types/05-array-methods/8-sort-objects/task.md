importance: 5

---

# Foydalanuvchilarni yoshiga qarab saralash

`age` xususiyatiga ega bo'lgan bir obyektlarning massivini oladigan va ularni `yoshi` bo'yicha saralaydigan `sortByAge(users)` funktsiyasini yozing.

Masalan:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ pete, john, mary ];

sortByAge(arr);

// hozir: [john, mary, pete]
alert(arr[0].name); // John
alert(arr[1].name); // Mary
alert(arr[2].name); // Pete
```
