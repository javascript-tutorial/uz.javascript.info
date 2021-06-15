
# O'rnatilgan klasslarni kengaytirish

Array, Map va boshqalar singari ichki klasslarni kengaytirish mumkin.

Masalan, bu yerda `PowerArray` o'rnatilgan `Array` dan meros qilib oladi:

```js run
// unga yana bitta usul qo'shish (ko'proq qo'shish mumkin)
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

let filteredArr = arr.filter(item => item >= 10);
alert(filteredArr); // 10, 50
alert(filteredArr.isEmpty()); // false
```

<<<<<<< HEAD
Iltimos, juda qiziq bir narsaga e'tibor bering. O'rnatilgan usullar `filter`, `map` va boshqalar - yangi obyektlarni to'liq meros qilib olingan turga qaytaradi. Buning uchun ular `constructor` xususiyatiga tayanadi.
=======
Please note a very interesting thing. Built-in methods like `filter`, `map` and others -- return new objects of exactly the inherited type `PowerArray`. Their internal implementation uses the object's `constructor` property for that.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Yuqoridagi misolda,
```js
arr.constructor === PowerArray
```

<<<<<<< HEAD
Shunday qilib, `arr.filter()` chaqirilganda, u ichki natijalarni yangi `new PowerArray` kabi to'liq massiv hosil qiladi.
Bu aslida juda ajoyib, chunki biz natijada `PowerArray` usullaridan foydalanishni davom ettira olamiz.
=======
When `arr.filter()` is called, it internally creates the new array of results using exactly `arr.constructor`, not basic `Array`. That's actually very cool, because we can keep using `PowerArray` methods further on the result.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Bundan ham ko'proq, biz ushbu xatti-harakatni sozlashimiz mumkin.

<<<<<<< HEAD
Maxsus statik getter `Symbol.species` mavjud, agar mavjud bo'lsa, u konstruktorni bunday holatlarda ishlatishga qaytaradi.

Agar `map` kabi o'rnatilgan usullarni istasak, `filter` muntazam massivlarni qaytaradi, biz `Symbol.species` da `Array` ni qaytarishimiz mumkin, masalan:
=======
We can add a special static getter `Symbol.species` to the class. If it exists, it should return the constructor that JavaScript will use internally to create new entities in `map`, `filter` and so on.

If we'd like built-in methods like `map` or `filter` to return regular arrays, we can return `Array` in `Symbol.species`, like here:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }

*!*
  // O'rnatilgan usullar buni konstruktor sifatida ishlatadi
  static get [Symbol.species]() {
    return Array;
  }
*/!*
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

// filtri konstruktor sifatida arr.constructor[Symbol.species] dan foydalanib yangi massiv yaratadi
let filteredArr = arr.filter(item => item >= 10);

*!*
// filteredArr PowerArray emas, balki Array
*/!*
alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function
```

Ko'rib turganingizdek, endi `.filter` `Array` ni qaytaradi. Shunday qilib, kengaytirilgan funksional boshqa uzatilmaydi.

<<<<<<< HEAD
## Ichki o'rnatilganlarda statik meros yo'q
=======
```smart header="Other collections work similarly"
Other collections, such as `Map` and `Set`, work alike. They also use `Symbol.species`.
```

## No static inheritance in built-ins
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

O'rnatilgan obyektlar o'zlarining statik usullariga ega, masalan `Object.keys`, `Array.isArray` va boshqalar.

<<<<<<< HEAD
Va biz allaqachon mahalliy klasslarning bir-birini kengaytirishi haqida gapirgan edik: `Array.[[Prototype]] = Object`.

Ammo statiklar bundan mustasno. O'rnatilgan klasslar bir-biridan statik xususiyatlarni meros qilib olmaydilar.

Boshqacha qilib aytganda, `Array` konstruktorining prototipi `Object` ga ishora qilmaydi. Shu tarzda `Array` va `Date` da `Array.keys` yoki `Date.keys` mavjud emas. Va bu tabiiy.
=======
As we already know, native classes extend each other. For instance, `Array` extends `Object`.

Normally, when one class extends another, both static and non-static methods are inherited. That was thoroughly explained in the article [](info:static-properties-methods#statics-and-inheritance).

But built-in classes are an exception. They don't inherit statics from each other.

For example, both `Array` and `Date` inherit from `Object`, so their instances have methods from `Object.prototype`. But `Array.[[Prototype]]` does not reference `Object`, so there's no, for instance, `Array.keys()` (or `Date.keys()`) static method.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

`Date` va `Object` uchun struktura tuzilishi:

![](object-date-inheritance.svg)
<<<<<<< HEAD

E'tibor bering, `Date` va `Object` o'rtasida hech qanday bog'liqlik yo'q. `Object` ham, `Date` ham mustaqil ravishda mavjud. `Date.prototype` `Object.prototype` dan meros bo'lib qoladi, ammo barchasi shu.
=======

As you can see, there's no link between `Date` and `Object`. They are independent, only `Date.prototype` inherits from `Object.prototype`.

That's an important difference of inheritance between built-in objects compared to what we get with `extends`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
