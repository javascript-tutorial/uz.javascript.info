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

Tuzatishdan keyin ham, `"class Rabbit extends Object"` va `class Rabbit` o'rtasida hali ham muhim farq bor.

Ma'lumki, "kengaytirish" sintaksisida ikkita prototip mavjud:

1. Konstruktor funktsiyalarining `"prototype"` o'rtasida (usullar uchun).
2. Konstruktor funktsiyalari orasida (statik usullar uchun).

Bizning holatimizda, `class Rabbit extends Object` uchun bu quyidagilarni anglatadi:

```js run
class Rabbit extends Object {}

alert(Rabbit.prototype.__proto__ === Object.prototype); // (1) true
alert(Rabbit.__proto__ === Object); // (2) true
```

Shunday qilib, `Rabbit` endi `Rabbit` orqali `Object` ning statik usullariga kirishni ta'minlaydi:

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

Aytgancha, `Function.prototype` "umumiy" funktsiya usullariga ega, masalan `call`, `bind` va boshqalar. Ikkala holatda ham ular mavjud, chunki `Object` konstruktori `Object.__ proto__ = == Funktsiya.prototype`.

Here's the picture:

![](rabbit-extends-object.svg)

Shunday qilib, qisqacha aytganda, ikkita farq bor:

| class Rabbit                              | class Rabbit extends Object                |
| ----------------------------------------- | ------------------------------------------ |
| --                                        | konstruktorda `super()` ni chaqirish kerak |
| `Rabbit.__proto__ === Function.prototype` | `Rabbit.__proto__ === Object`              |
