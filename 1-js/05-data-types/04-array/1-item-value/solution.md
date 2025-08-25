Natija `4`:

```js run
let fruits = ["Olmalar", "Nok", "Apelsin"];

let shoppingCart = fruits;

shoppingCart.push("Banan");

*!*
alert( fruits.length ); // 4
*/!*
```

Buning sababi, massivlar obyektlardir. Shunday qilib, `shoppingCart` ham, `fruits` ham bir xil massivga murojaat qilishadi.
