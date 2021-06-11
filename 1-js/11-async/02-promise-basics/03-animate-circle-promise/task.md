
# Va'da qilingan animatsion doira

Vazifani yechishda `showCircle` funktsiyasini <info:task/animate-circle-callback> qayta chaqiruvni qabul qilish o'rniga va'da beradigan tarzda qayta yozing.

Yangi foydalanish:

```js
showCircle(150, 150, 100).then(div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```

<info:task/animate-circle-callback> vazifasining yechimini asos qilib oling.
