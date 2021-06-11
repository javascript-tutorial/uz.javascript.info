# Klasslarni tekshirish: "instanceof"

`instanceof` operatori obyektning ma'lum bir klassga tegishli yoki yo'qligini tekshirishga imkon beradi. Shuningdek, bu merosni hisobga oladi.

Bunday tekshirish ko'p hollarda zarur bo'lishi mumkin, bu yerda biz *polimorfik* funktsiyani yaratish uchun foydalanamiz, bu argumentlarni turiga qarab turlicha ko'rib chiqadi.

## instanceof operator

Sintaksis:
```js
obj instanceof Class
```

Agar `obj` `Class` ga (yoki undan meros qolgan klassga) tegishli bo'lsa, `true` qiymatini qaytaradi.

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

Iltimos, `arr` ham `Object` klassga tegishli ekanligini unutmang. Buning sababi, `Array` prototip sifatida `Object` dan meros qilib oladi.

`instanceof` operatori tekshirish uchun prototip zanjirini taqdiq qiladi va shuningdek, `Symbol.hasInstance` statik usuli yordamida aniq sozlanadi.

`obj instanceof Class` algoritmi taxminan quyidagicha ishlaydi:

1. Agar `Symbol.hasInstance` statik usuli bo'lsa, bundan foydalaning. Shunga o'xshash:

    ```js run
    // faraz qiling hamma canEat bu hayvon
    class Animal {
      static [Symbol.hasInstance](obj) {
        if (obj.canEat) return true;
      }
    }

    let obj = { canEat: true };
    alert(obj instanceof Animal); // true: Animal[Symbol.hasInstance](obj) chaqirildi
    ```

2. Ko'pgina klasslarda `Symbol.hasInstance` mavjud emas. Bunday holda, `Class.prototype` prototip zanjiridagi prototiplardan biriga to'g'ri keladimi-yo'qligini tekshirib ko'ring.

    Boshqacha qilib aytganda, taqqoslang:
    ```js
    obj.__proto__ === Class.prototype
    obj.__proto__.__proto__ === Class.prototype
    obj.__proto__.__proto__.__proto__ === Class.prototype
    ...
    ```

    Yuqoridagi misolda `Rabbit.prototype === rabbit.__proto__`, shuning uchun darhol javob beradi.

    Meros bo'lsa, `rabbit` - bu ota-ona klassining namunasi:

    ```js run
    class Animal {}
    class Rabbit extends Animal {}

    let rabbit = new Rabbit();
    *!*
    alert(rabbit instanceof Animal); // true
    */!*
    // rabbit.__proto__ === Rabbit.prototype
    // rabbit.__proto__.__proto__ === Animal.prototype (mutanosiblik!)
    ```

Quyida `rabbit instanceof Animal` ning `Animal.prototype` bilan taqqoslagani tasvirlangan:

![](instanceof.svg)

Aytgancha, yana bir usul [objA.isPrototypeOf(objB)](mdn:js/object/isPrototypeOf), agar `objA` prototiplar zanjirining bir joyida bo'lsa, `true` ni qaytaradi. Shunday qilib, `obj instanceof Class` sinovi `Class.prototype.isPrototypeOf(obj)` sifatida qayta ifodalanishi mumkin.

Bu juda kulgili, lekin `Class` konstruktorining o'zi tekshirishda qatnashmaydi! Faqat prototiplar zanjiri va `Class.prototype` muhim ahamiyatga ega.

Bu `prototype` o'zgartirilganda qiziqarli oqibatlarga olib kelishi mumkin.

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

Bu `prototype` ni o'zgartirmaslikning sabablaridan biridir. Xavfsizlikni saqlash uchun.

## Bonus: Object toString turi uchun

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

alert( objectToString.call(arr) ); // [object Array]
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

Aksariyat atrof-muhit obyektlari uchun bunday xususiyat mavjud. Brauzerga xos bir nechta misol:

```js run
// toStringTag atrof-muhitga xos obyekt va klass uchun:
alert( window[Symbol.toStringTag]); // window
alert( XMLHttpRequest.prototype[Symbol.toStringTag] ); // XMLHttpRequest

alert( {}.toString.call(window) ); // [object Window]
alert( {}.toString.call(new XMLHttpRequest()) ); // [object XMLHttpRequest]
```

Ko'rib turganingizdek, natija aynan `Symbol.toStringTag` (agar mavjud bo'lsa) bo'lib, `[object ...]` ga o'ralgan.

Oxir-oqibat bizda "typeof steroidlarda" mavjud bo'lib, ular nafaqat ma'lumotlarning ibtidoiy turlari uchun, balki o'rnatilgan obyektlar uchun ham ishlaydi va hatto ularni sozlash mumkin.

Bu turni faqat tekshirish uchun emas, balki matn sifatida olishni xohlaganimizda, o'rnatilgan obyektlar uchun `instanceof` o'rniga ishlatilishi mumkin.

## Xulosa

Keling, biz bilgan turlarni tekshirish usullarini takrorlaymiz:

|               | uchun ishlaydi |  qaytaradi      |
|---------------|-------------|---------------|
| `typeof`      | ibtidoiy narsalar  |  matn       |
| `{}.toString` | ibtidoiy narsalar, o'rnatilgan obyektlar, `Symbol.toStringTag` bilan obyektlar  |       matn |
| `instanceof`  | obyektlar     |  true/false   |

Ko'rib turganimizdek, `{}.toString` texnik jihatdan "yanada rivojlangan" `typeof` dir.

Va `instanceof` operatori biz klass iyerarxiyasi bilan ishlayotganimizda va merosni hisobga olgan holda klassni tekshirishni xohlaymizda chindan ham porlaydi.
