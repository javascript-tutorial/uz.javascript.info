# Klasslarni tekshirish: "instanceof"

`instanceof` operatori obyektning ma'lum bir klassga tegishli yoki yo'qligini tekshirishga imkon beradi. Shuningdek, bu merosni hisobga oladi.

<<<<<<< HEAD
Bunday tekshirish ko'p hollarda zarur bo'lishi mumkin, bu yerda biz *polimorfik* funktsiyani yaratish uchun foydalanamiz, bu argumentlarni turiga qarab turlicha ko'rib chiqadi.
=======
Such a check may be necessary in many cases. For example, it can be used for building a *polymorphic* function, the one that treats arguments differently depending on their type.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## instanceof operator

Sintaksis:
```js
obj instanceof Class
```

<<<<<<< HEAD
Agar `obj` `Class` ga (yoki undan meros qolgan klassga) tegishli bo'lsa, `true` qiymatini qaytaradi.
=======
It returns `true` if `obj` belongs to the `Class` or a class inheriting from it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Masalan:

```js run
class Rabbit {}
let rabbit = new Rabbit();

// bu Rabbit klassning obyektimi?
*!*
alert( rabbit instanceof Rabbit ); // true
*/!*
```

Shuningdek, u konstruktor funktsiyalari bilan ishlaydi:

```js run
*!*
// klassning o'rniga
function Rabbit() {}
*/!*

alert( new Rabbit() instanceof Rabbit ); // true
```

...Va `Array` singari o'rnatilgan klasslar bilan:

```js run
let arr = [1, 2, 3];
alert( arr instanceof Array ); // true
alert( arr instanceof Object ); // true
```

<<<<<<< HEAD
Iltimos, `arr` ham `Object` klassga tegishli ekanligini unutmang. Buning sababi, `Array` prototip sifatida `Object` dan meros qilib oladi.

`instanceof` operatori tekshirish uchun prototip zanjirini taqdiq qiladi va shuningdek, `Symbol.hasInstance` statik usuli yordamida aniq sozlanadi.
=======
Please note that `arr` also belongs to the `Object` class. That's because `Array` prototypically inherits from `Object`.

Normally, `instanceof` examines the prototype chain for the check. We can also set a custom logic in the static method `Symbol.hasInstance`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

`obj instanceof Class` algoritmi taxminan quyidagicha ishlaydi:

<<<<<<< HEAD
1. Agar `Symbol.hasInstance` statik usuli bo'lsa, bundan foydalaning. Shunga o'xshash:

    ```js run
    // faraz qiling hamma canEat bu hayvon
=======
1. If there's a static method `Symbol.hasInstance`, then just call it: `Class[Symbol.hasInstance](obj)`. It should return either `true` or `false`, and we're done. That's how we can customize the behavior of `instanceof`.

    For example:

    ```js run
    // setup instanceOf check that assumes that
    // anything with canEat property is an animal
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    class Animal {
      static [Symbol.hasInstance](obj) {
        if (obj.canEat) return true;
      }
    }

    let obj = { canEat: true };
<<<<<<< HEAD
    alert(obj instanceof Animal); // true: Animal[Symbol.hasInstance](obj) chaqirildi
    ```

2. Ko'pgina klasslarda `Symbol.hasInstance` mavjud emas. Bunday holda, `Class.prototype` prototip zanjiridagi prototiplardan biriga to'g'ri keladimi-yo'qligini tekshirib ko'ring.

    Boshqacha qilib aytganda, taqqoslang:
=======

    alert(obj instanceof Animal); // true: Animal[Symbol.hasInstance](obj) is called
    ```

2. Most classes do not have `Symbol.hasInstance`. In that case, the standard logic is used: `obj instanceOf Class` checks whether `Class.prototype` is equal to one of the prototypes in the `obj` prototype chain.

    In other words, compare one after another:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    ```js
    obj.__proto__ === Class.prototype?
    obj.__proto__.__proto__ === Class.prototype?
    obj.__proto__.__proto__.__proto__ === Class.prototype?
    ...
    // if any answer is true, return true
    // otherwise, if we reached the end of the chain, return false
    ```

<<<<<<< HEAD
    Yuqoridagi misolda `Rabbit.prototype === rabbit.__proto__`, shuning uchun darhol javob beradi.

    Meros bo'lsa, `rabbit` - bu ota-ona klassining namunasi:
=======
    In the example above `rabbit.__proto__ === Rabbit.prototype`, so that gives the answer immediately.

    In the case of an inheritance, the match will be at the second step:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

    ```js run
    class Animal {}
    class Rabbit extends Animal {}

    let rabbit = new Rabbit();
    *!*
    alert(rabbit instanceof Animal); // true
    */!*

<<<<<<< HEAD
    // rabbit.__proto__ === Rabbit.prototype
<<<<<<< HEAD
    // rabbit.__proto__.__proto__ === Animal.prototype (mutanosiblik!)
=======
=======
    // rabbit.__proto__ === Animal.prototype (no match)
>>>>>>> 246c600f11b4e6c52b4ae14f83e65319671f998f
    *!*
    // rabbit.__proto__.__proto__ === Animal.prototype (match!)
    */!*
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    ```

Quyida `rabbit instanceof Animal` ning `Animal.prototype` bilan taqqoslagani tasvirlangan:

![](instanceof.svg)

Aytgancha, yana bir usul [objA.isPrototypeOf(objB)](mdn:js/object/isPrototypeOf), agar `objA` prototiplar zanjirining bir joyida bo'lsa, `true` ni qaytaradi. Shunday qilib, `obj instanceof Class` sinovi `Class.prototype.isPrototypeOf(obj)` sifatida qayta ifodalanishi mumkin.

<<<<<<< HEAD
Bu juda kulgili, lekin `Class` konstruktorining o'zi tekshirishda qatnashmaydi! Faqat prototiplar zanjiri va `Class.prototype` muhim ahamiyatga ega.

Bu `prototype` o'zgartirilganda qiziqarli oqibatlarga olib kelishi mumkin.
=======
It's funny, but the `Class` constructor itself does not participate in the check! Only the chain of prototypes and `Class.prototype` matters.

That can lead to interesting consequences when a `prototype` property is changed after the object is created.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Bu yerda bo'lgani kabi:

```js run
function Rabbit() {}
let rabbit = new Rabbit();

// prototip o'zgartirildi
Rabbit.prototype = {};

// ...endi rabbit emas!
*!*
alert( rabbit instanceof Rabbit ); // false
*/!*
```

<<<<<<< HEAD
Bu `prototype` ni o'zgartirmaslikning sabablaridan biridir. Xavfsizlikni saqlash uchun.

## Bonus: Object toString turi uchun
=======
## Bonus: Object.prototype.toString for the type
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Oddiy obyektlar `[object Object]` massiviga aylantirilishini allaqachon bilamiz:

```js run
let obj = {};

alert(obj); // [object Object]
alert(obj.toString()); // bir xil
```

Bu ularning `toString` dasturidir. Ammo `toString` ni aslida undan kuchliroq qiladigan maxfiy xususiyat mavjud. Biz uni kengaytirilgan `typeof` va `instanceof` uchun alternativa sifatida ishlatishimiz mumkin.

G'alati tuyuladimi? Haqiqatdan ham. Keling, demistifikatsiya qilaylik.

[Spetsifikatsiya](https://tc39.github.io/ecma262/#sec-object.prototype.tostring) bo'yicha o'rnatilgan `toString` obyektdan olinishi va boshqa har qanday qiymat kontekstida bajarilishi mumkin. Va uning natijasi ushbu qiymatga bog'liq.

- Raqam uchun shunday bo'ladi`[object Number]`
- Mantiqiy turdagi qiymat uchun bu shunday bo'ladi`[object Boolean]`
- `null` uchun: `[object Null]`
- `undefined` uchun: `[object Undefined]`
- Massivlar uchun: `[object Array]`
- ...va hokazo (sozlash mumkin).

Keling, namoyish qilaylik:

```js run
// toString usulini qulaylik uchun o'zgaruvchanga nusxalash
let objectToString = Object.prototype.toString;

// bu qanday tur?
let arr = [];

alert( objectToString.call(arr) ); // [object *!*Array*/!*]
```

Biz bu yerda [call](mdn:js/function/call) bobda [](info:call-apply-decorators) tasvirlanganidek, `this=arr` kontekstida `objectToString` funktsiyasini bajarish uchun foydalanganmiz.

Ichkarida, `toString` algoritmi `this` ni tekshiradi va tegishli natijani beradi. Ko'proq misollar:

```js run
let s = Object.prototype.toString;

alert( s.call(123) ); // [object Number]
alert( s.call(null) ); // [object Null]
alert( s.call(alert) ); // [object Function]
```

### Symbol.toStringTag

Obyektning `toString` xatti-harakatlarini `Symbol.toStringTag` maxsus obyekt xususiyati yordamida sozlash mumkin.

Masalan:

```js run
let user = {
  [Symbol.toStringTag]: "User"
};

alert( {}.toString.call(user) ); // [object User]
```

<<<<<<< HEAD
Aksariyat atrof-muhit obyektlari uchun bunday xususiyat mavjud. Brauzerga xos bir nechta misol:

```js run
// toStringTag atrof-muhitga xos obyekt va klass uchun:
alert( window[Symbol.toStringTag]); // window
=======
For most environment-specific objects, there is such a property. Here are some browser specific examples:

```js run
// toStringTag for the environment-specific object and class:
alert( window[Symbol.toStringTag]); // Window
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
alert( XMLHttpRequest.prototype[Symbol.toStringTag] ); // XMLHttpRequest

alert( {}.toString.call(window) ); // [object Window]
alert( {}.toString.call(new XMLHttpRequest()) ); // [object XMLHttpRequest]
```

Ko'rib turganingizdek, natija aynan `Symbol.toStringTag` (agar mavjud bo'lsa) bo'lib, `[object ...]` ga o'ralgan.

Oxir-oqibat bizda "typeof steroidlarda" mavjud bo'lib, ular nafaqat ma'lumotlarning ibtidoiy turlari uchun, balki o'rnatilgan obyektlar uchun ham ishlaydi va hatto ularni sozlash mumkin.

<<<<<<< HEAD
Bu turni faqat tekshirish uchun emas, balki matn sifatida olishni xohlaganimizda, o'rnatilgan obyektlar uchun `instanceof` o'rniga ishlatilishi mumkin.
=======
We can use `{}.toString.call` instead of `instanceof` for built-in objects when we want to get the type as a string rather than just to check.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Xulosa

<<<<<<< HEAD
Keling, biz bilgan turlarni tekshirish usullarini takrorlaymiz:
=======
Let's summarize the type-checking methods that we know:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

|               | uchun ishlaydi |  qaytaradi      |
|---------------|-------------|---------------|
| `typeof`      | ibtidoiy narsalar  |  matn       |
| `{}.toString` | ibtidoiy narsalar, o'rnatilgan obyektlar, `Symbol.toStringTag` bilan obyektlar  |       matn |
| `instanceof`  | obyektlar     |  true/false   |

Ko'rib turganimizdek, `{}.toString` texnik jihatdan "yanada rivojlangan" `typeof` dir.

Va `instanceof` operatori biz klass iyerarxiyasi bilan ishlayotganimizda va merosni hisobga olgan holda klassni tekshirishni xohlaymizda chindan ham porlaydi.
