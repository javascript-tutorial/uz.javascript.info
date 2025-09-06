# HTML izohlarni topish

Matndagi barcha HTML izohlarini toping:

```js
let regexp = /sizning regexpiyingiz/g;

let str = `... <!-- Mening -- izohim
 test --> ..  <!----> .. 
`;

alert(str.match(regexp)); // '<!-- Mening -- izohim \n test -->', '<!---->'
```
