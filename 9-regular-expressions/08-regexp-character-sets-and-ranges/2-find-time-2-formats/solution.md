Javob: `pattern:\d\d[-:]\d\d`.

```js run
let regexp = /\d\d[-:]\d\d/g;
alert("Breakfast at 09:00. Dinner at 21-30".match(regexp)); // 09:00, 21-30
```

Esda tutingki, `pattern:'-'` tire kvadrat qavs ichida alohida ma'noga ega, lekin faqat boshqa belgilar orasida, u boshida yoki oxirida bo'lganda emas, shuning uchun biz undan qochishimiz shart emas.
