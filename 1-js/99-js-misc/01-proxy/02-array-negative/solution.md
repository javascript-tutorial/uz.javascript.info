```js run
let array = [1, 2, 3];

array = new Proxy(array, {
  get(target, prop, receiver) {
    if (prop < 0) {
      // biz unga arr [1] kabi kirsak ham
      // prop - bu satr, shuning uchun uni raqamga aylantirish kerak
      prop = +prop + target.length;
    }
    return Reflect.get(target, prop, receiver);
  },
});

alert(array[-1]); // 3
alert(array[-2]); // 2
```
