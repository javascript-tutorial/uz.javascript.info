importance: 5

---

# "Prototip" ni o'zgartirish

Quyidagi kodda biz `new Rabbit` ni yaratamiz va keyin uning prototipini o'zgartirishga harakat qilamiz.

Boshida bizda ushbu kod mavjud:

```js run
function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

alert( rabbit.eats ); // true
```


<<<<<<< HEAD
1. Biz yana bitta matn qo'shdik (ta'kidlangan), hozir qanday `alert` ko'rsatilmoqda?
=======
1. We added one more string (emphasized). What will `alert` show now?
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
3. Bu kabi (bitta satr o'rni o'zgartirildi)?
=======
3. And like this (replaced one line)?
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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
