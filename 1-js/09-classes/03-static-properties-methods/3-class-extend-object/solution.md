Birinchidan, nima uchun oxirgi kod ishlamasligini ko'rib chiqamiz.

Agar biz uni ishlatishga harakat qilsak, sabab aniq bo'ladi. Meros klass konstruktori `super()` ni chaqirishi kerak. Aks holda `"this"` "aniqlanmaydi".

Shunday qilib, tuzatish:

```js run
class Rabbit extends Object {
  constructor(name) {
*!*
    super(); // meros olishda ota konstruktorni chaqirish kerak
*/!*
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // true
```

Ammo bu hali hammasi emas.

<<<<<<< HEAD
Tuzatishdan keyin ham, `"class Rabbit extends Object"` va `class Rabbit` o'rtasida hali ham muhim farq bor.
=======
Even after the fix, there's still an important difference between `"class Rabbit extends Object"` and `class Rabbit`.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Ma'lumki, "kengaytirish" sintaksisida ikkita prototip mavjud:

<<<<<<< HEAD:1-js/09-classes/02-class-inheritance/3-class-extend-object/solution.md
1. Konstruktor funktsiyalarining `"prototype"` o'rtasida (usullar uchun).
2. Konstruktor funktsiyalari orasida (statik usullar uchun).
=======
1. Between `"prototype"` of the constructor functions (for methods).
2. Between the constructor functions themselves (for static methods).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/09-classes/03-static-properties-methods/3-class-extend-object/solution.md

<<<<<<< HEAD
Bizning holatimizda, `class Rabbit extends Object` uchun bu quyidagilarni anglatadi:
=======
In the case of `class Rabbit extends Object` it means:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js run
class Rabbit extends Object {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) true
```

<<<<<<< HEAD
Shunday qilib, `Rabbit` endi `Rabbit` orqali `Object` ning statik usullariga kirishni ta'minlaydi:
=======
So `Rabbit` now provides access to the static methods of `Object` via `Rabbit`, like this:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js run
class Rabbit extends Object {}

*!*
// odatda bizchaqiramiz Object.getOwnPropertyNames
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // a,b
*/!*
```

Agar bizda `extends Object` bo'lmasa, `Rabbit.__ proto__` `Object` ga o'rnatilmagan.

Mana demo:

```js run
class Rabbit {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) false (!)
alert( Rabbit.__proto__ === Function.prototype ); // sukut bo'yicha har qanday funktsiya sifatida

*!*
// xato, Rabbit-da bunday funktsiya yo'q
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // Error
*/!*
```

Shunday qilib, `Rabbit` bu holda `Object` ning statik usullariga kirishni ta'minlamaydi.

<<<<<<< HEAD
Aytgancha, `Function.prototype` "umumiy" funktsiya usullariga ega, masalan `call`, `bind` va boshqalar. Ikkala holatda ham ular mavjud, chunki `Object` konstruktori `Object.__ proto__ = == Funktsiya.prototype`.
=======
By the way, `Function.prototype` also has "generic" function methods, like `call`, `bind` etc. They are ultimately available in both cases, because for the built-in `Object` constructor, `Object.__proto__ === Function.prototype`.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Here's the picture:

![](rabbit-extends-object.svg)

Shunday qilib, qisqacha aytganda, ikkita farq bor:

| class Rabbit | class Rabbit extends Object  |
|--------------|------------------------------|
| --             | konstruktorda `super()` ni chaqirish kerak|
| `Rabbit.__proto__ === Function.prototype` | `Rabbit.__proto__ === Object` |
