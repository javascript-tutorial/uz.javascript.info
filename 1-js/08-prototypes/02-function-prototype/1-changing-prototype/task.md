muhimlik: 5

---

# "Prototip" ni o'zgartirish

Quyidagi kodda biz `new Rabbit` ni yaratamiz va keyin uning prototipini o'zgartirishga harakat qilamiz.

Boshida bizda ushbu kod mavjud:

```js run
function Rabbit() {}
Rabbit.prototype = {
  eats: true,
};

let rabbit = new Rabbit();

alert(rabbit.eats); // true
```

1. Biz yana bitta matn qo'shdik (ta'kidlangan), hozir qanday `alert` ko'rsatilmoqda?

   ```js
   function Rabbit() {}
   Rabbit.prototype = {
     eats: true
   };

   let rabbit = new Rabbit();

   *!*
   Rabbit.prototype = {};
   */!*

   alert( rabbit.eats ); // ?
   ```

2. ...Va agar kod shunga o'xshash bo'lsa (bitta satr o'rni o'zgartirildi)?

   ```js
   function Rabbit() {}
   Rabbit.prototype = {
     eats: true
   };

   let rabbit = new Rabbit();

   *!*
   Rabbit.prototype.eats = false;
   */!*

   alert( rabbit.eats ); // ?
   ```

3. Bu kabi (bitta satr o'rni o'zgartirildi)?

   ```js
   function Rabbit() {}
   Rabbit.prototype = {
     eats: true
   };

   let rabbit = new Rabbit();

   *!*
   delete rabbit.eats;
   */!*

   alert( rabbit.eats ); // ?
   ```

4. Oxirgi variant:

   ```js
   function Rabbit() {}
   Rabbit.prototype = {
     eats: true
   };

   let rabbit = new Rabbit();

   *!*
   delete Rabbit.prototype.eats;
   */!*

   alert( rabbit.eats ); // ?
   ```
