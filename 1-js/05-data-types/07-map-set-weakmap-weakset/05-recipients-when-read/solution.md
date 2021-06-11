
Sana saqlash uchun biz foydalanishingiz mumkin `WeakMap`:

```js
let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];

let readMap = new WeakMap();

readMap.set(messages[0], new Date(2017, 1, 1));
// Date obyektni biz keyinroq o'rganib chiqamiz
```
