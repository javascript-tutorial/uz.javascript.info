Keling, `speedy.eat("olma")` chaqiurvida nimalar bo'layotganini diqqat bilan ko'rib chiqamiz.

1. `speedy.eat` usuli prototipda topilgan (`=hamster`), so'ngra `this=speedy` (nuqta oldidagi obyekt) bilan bajariladi.

2. Keyin `this.stomach.push()` `stomach` xususiyatini topishi va unga `push` ni chaqirishi kerak. `this` da (`=speedy`) `stomach` ni qidiradi, ammo hech narsa topilmadi.

3. Keyin u prototip zanjiriga ergashib, `hamster` da `stomach` ni topadi.

4. Keyin u _prototipning oshqozoniga_ ovqatni qo'shib, ustiga `push` ni chaqiradi.

Shunday qilib, barcha hamsterlar bitta oshqozonni bo'lishadi!

Har safar `stomach` prototipdan olinadigan bo'lsa, u holda `stomach.push` uni "joyida" o'zgartiradi.

Iltimos e'tibor bering, `this.stomach =` oddiy tayinlashda bunday narsa bo'lmaydi.

```js run
let hamster = {
  stomach: [],

  eat(food) {
*!*
    // this.stomach.push o'rniga this.stomach o'rnating
    this.stomach = [food];
*/!*
  }
};

let speedy = {
   __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// Speedy bittasi ovqat topdi
speedy.eat("olma");
alert( speedy.stomach ); // olma

// Lazy birining qorni bo'sh
alert( lazy.stomach ); // <nothing>
```

Endi barchasi yaxshi ishlaydi, chunki `this.stomach=` `stomach` izlamaydi. Qiymat to'g'ridan-to'g'ri `this` obyektiga yoziladi.

Shuningdek, har bir hamsterning o'z oshqozoniga ega ekanligiga ishonch hosil qilish orqali biz muammodan butunlay qochishimiz mumkin:

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

let lazy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

// Speedy bittasi ovqat topdi
speedy.eat("olma");
alert( speedy.stomach ); // olma

// Lazy birining qorni bo'sh
alert( lazy.stomach ); // <nothing>
```

Umumiy yechim sifatida, ma'lum bir obyektning holatini tavsiflovchi barcha xususiyatlar, masalan, yuqoridagi `stomach` odatda ushbu obyektga yoziladi. Bu bunday muammolarning oldini oladi.
