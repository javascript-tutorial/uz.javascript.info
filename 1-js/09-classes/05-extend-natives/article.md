
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

Iltimos, juda qiziq bir narsaga e'tibor bering. O'rnatilgan usullar `filter`, `map` va boshqalar - yangi obyektlarni to'liq meros qilib olingan turga qaytaradi. Buning uchun ular `constructor` xususiyatiga tayanadi.

Yuqoridagi misolda,
```js
arr.constructor === PowerArray
```

Shunday qilib, `arr.filter()` chaqirilganda, u ichki natijalarni yangi `new PowerArray` kabi to'liq massiv hosil qiladi.
Bu aslida juda ajoyib, chunki biz natijada `PowerArray` usullaridan foydalanishni davom ettira olamiz.

Bundan ham ko'proq, biz ushbu xatti-harakatni sozlashimiz mumkin.

Maxsus statik getter `Symbol.species` mavjud, agar mavjud bo'lsa, u konstruktorni bunday holatlarda ishlatishga qaytaradi.

Agar `map` kabi o'rnatilgan usullarni istasak, `filter` muntazam massivlarni qaytaradi, biz `Symbol.species` da `Array` ni qaytarishimiz mumkin, masalan:

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

## Ichki o'rnatilganlarda statik meros yo'q

O'rnatilgan obyektlar o'zlarining statik usullariga ega, masalan `Object.keys`, `Array.isArray` va boshqalar.

Va biz allaqachon mahalliy klasslarning bir-birini kengaytirishi haqida gapirgan edik: `Array.[[Prototype]] = Object`.

Ammo statiklar bundan mustasno. O'rnatilgan klasslar bir-biridan statik xususiyatlarni meros qilib olmaydilar.

Boshqacha qilib aytganda, `Array` konstruktorining prototipi `Object` ga ishora qilmaydi. Shu tarzda `Array` va `Date` da `Array.keys` yoki `Date.keys` mavjud emas. Va bu tabiiy.

`Date` va `Object` uchun struktura tuzilishi:

![](object-date-inheritance.svg)

E'tibor bering, `Date` va `Object` o'rtasida hech qanday bog'liqlik yo'q. `Object` ham, `Date` ham mustaqil ravishda mavjud. `Date.prototype` `Object.prototype` dan meros bo'lib qoladi, ammo barchasi shu.
