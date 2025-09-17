# SetTimeout-da xato

Siz nima deb o'ylaysiz? `.catch` bajariladimi? Javobingizni tushuntiring.

```js
new Promise(function (resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```
