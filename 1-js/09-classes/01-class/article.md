# Klass: asosiy sintaksis

```quote author="Vikipediya"
Obyektga yo'naltirilgan dasturlashda klass - bu obyektlarni yaratish uchun kengaytiriladigan kod shabloni bo'lib, ularda dastlabki qiymatlarni (xususiyatlar) va xatti-harakatlarni (metodlar) amalga oshirishni belgilaydi.
```

Amalda, biz ko'pincha foydalanuvchilar yoki tovarlar yoki boshqa narsalar kabi bir xil turdagi ko'plab obyektlarni yaratishimiz kerak.

<info:constructor-new> bobidan allaqachon bilganimizdek, `new function` bunga yordam beradi.

Ammo zamonaviy JavaScript-da obyektga yo'naltirilgan dasturlash uchun foydali bo'lgan juda yangi xususiyatlarni taqdim etadigan yanada rivojlangan "klass" tuzilishi mavjud.

## "Klass" sintaksisi

Asosiy sintaksis:

```js
class MyClass {
  // klass metodlari
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
```

Keyin `new MyClass()` ro'yxatdagi barcha metodlar bilan yangi obyekt yaratadi.

`constructor()` metodi avtomatik ravishda `new` tomonidan chaqiriladi, shuning uchun biz u yerda obyektni ishga tushirishimiz mumkin.

Masalan:

```js run
class User {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }
}

// Foydalanish:
let user = new User("John");
user.sayHi();
```

`new User("John")` chaqirilganda:

1. Yangi obyekt yaratiladi.
2. `constructor` berilgan argument bilan ishlaydi va unga `this.name` ni tayinlaydi.

...Keyin biz `user.sayHi()` kabi metodlarni chaqira olamiz.

```warn header="Klass metodlari o'rtasida vergul yo'q"
Yangi dasturchilar uchun odatiy tuzoq - bu sintaksis xatolariga olib keladigan klass metodlari orasida vergul qo'yishdir.

Bu yerdagi yozuvlarni obyektlar yozuvi bilan aralashtirish mumkin emas. Klass ichida vergul talab qilinmaydi.
```

## Klass nima?

Xo'sh, aniq `class` nima? Bu o'ylashi mumkin bo'lgan til darajasidagi mutlaqo yangi obyekt emas.

Keling, barcha sehrni yo'qotaylik va aslida klass nima ekanligini ko'rib chiqaylik. Bu ko'plab murakkab jihatlarni tushunishda yordam beradi.

JavaScript-da klass funktsiyaning bir turi.

Mana, qarang:

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// isbot: User bu funktsiya
*!*
alert(typeof User); // function
*/!*
```

`class User {...}` konstruktsiyasi aslida nima qiladi:

1. `User` nomli funktsiyani yaratadi, bu klass deklaratsiyasining natijasi bo'ladi.
   - Funktsiya kodi `constructor` metodidan olingan (agar biz bunday metodini yozmasak, bo'sh deb hisoblanadi).
2. `sayHi` kabi barcha metodlarni `User.prototype` da saqlaydi.

Keyinchalik, yangi obyektlar uchun metodini chaqirganda, prototipdan olinadi, xuddi <info:function-prototype> bobida tasvirlanganidek. Shunday qilib, `new User` obyekti klass metodlariga kirish huquqiga ega.

Biz `class User` natijasini quyidagicha tasvirlashimiz mumkin:

![](class-user.svg)

Buni tekshirish uchun kod:

```js run
class User {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    alert(this.name);
  }
}

// klass bu funktsiya
alert(typeof User); // function

// ...yoki, aniqroq, konstruktor metodi
alert(User === User.prototype.constructor); // true

// metodlar User.prototype-da:
alert(User.prototype.sayHi); // alert(this.name);

// prototipda to'liq ikkita metod mavjud
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

## Faqat sintaksis shakar emas

Ba'zan odamlar `class` JavaScript-dagi "sintaksis shakar" deb aytishadi, chunki biz aslida `class` kalit so'zisiz bir xil narsani e'lon qilishimiz mumkin edi:

```js run
// sof funktsiyalarda class User qayta yozish

// 1. Konstruktor funktsiyasini yarating
function User(name) {
  this.name = name;
}
// har qanday funktsiya prototipi sukut bo'yicha konstruktor xususiyatiga ega,
// shuning uchun biz uni yaratishga hojat yo'q

// 2. Metodini prototipga qo'shing
User.prototype.sayHi = function () {
  alert(this.name);
};

// Foydalanish:
let user = new User("John");
user.sayHi();
```

Ushbu ta'rifning natijasi taxminan bir xil. Shunday qilib, konstruktorni prototip metodlari bilan birgalikda aniqlash uchun `class` sintaksis shakar deb hisoblanishining haqiqatan ham sabablari bor.

Garchi, muhim farqlar mavjud.

1. Birinchidan, `class` tomonidan yaratilgan funktsiya maxsus ichki xususiyat bilan belgilanadi `[[FunctionKind]]:"classConstructor"`. Shunday qilib, uni qo'lda yaratish bilan bir xil emas.

   Oddiy funktsiyadan farqli o'laroq, klass konstruktorini `new` siz chaqirish mumkin emas:

   ```js run
   class User {
     constructor() {}
   }

   alert(typeof User); // function
   User(); // Error: Class constructor User cannot be invoked without 'new'
   ```

   Shuningdek, aksariyat JavaScript interpretatorlarida klass konstruktorining matn vakilligi `class...` bilan boshlanadi.

   ```js run
   class User {
     constructor() {}
   }

   alert(User); // class User { ... }
   ```

   Boshqa farqlar ham bor, ularni tez orada ko'ramiz.

2. Klass metodlarini sanab bo'lmaydi
   Klass ta'rifi `"prototype"` dagi barcha metodlar uchun `enumerable` bayroqni `false` ga o'rnatadi.

   Bu yaxshi, chunki agar biz obyekt uchun `for..in` ishlatsak, biz odatda uning klass metodlarini xohlamaymiz.

3. Klasslar doimo `use strict` dan foydalanadi
   Klass konstruktsiyasidagi barcha kodlar avtomatik ravishda qat'iy rejimda bo'ladi.

Bundan tashqari, `class` sintaksisining asosiy ishlashidan tashqari, biz keyinroq o'rganadigan ko'plab boshqa xususiyatlarni ham taklif etadi.

## Klass ifodalari

Xuddi funktsiyalar singari, klasslarni boshqa ifoda ichida aniqlash, ularni o'tkazish, qaytarish, tayinlash va h.k. mumkin.

Mana, klass ifodasiga misol:

```js
let User = class {
  sayHi() {
    alert("Salom");
  }
};
```

Nomlangan funktsiya ifodalarga o'xshash, klass ifodasining nomi bo'lishi yoki bo'lmasligi mumkin.

Agar klass ifodasining nomi bo'lsa, u faqat klass ichida ko'rinadi:

```js run
// "Named Class Expression" (alas, bunday atama yo'q, lekin bu nima bo'layotgani)
let User = class *!*MyClass*/!* {
  sayHi() {
    alert(MyClass); // MyClass nomi faqat klass ichida ko'rinadi
  }
};

new User().sayHi(); // ishlaydi, MyClass ta'rifini ko'rsatadi

alert(MyClass); // xato, MyClass nomi klassdan tashqarida ko'rinmaydi
```

Hatta klasslarni dinamik ravishda "talabga binoan" yaratishimiz mumkin, masalan:

```js run
function makeClass(phrase) {
  // klassni e'lon qiling va uni qaytaring
  return class {
    sayHi() {
      alert(phrase);
    }
  };
}

// Yangi klass yarating
let User = makeClass("Salom");

new User().sayHi(); // Salom
```

## Getters/setters

Shuningdek, klasslar getter/setter, generator, hisoblash xususiyatlari va boshqalarni o'z ichiga oladi.

`get/set` yordamida amalga oshirilgan `user.name` uchun misol:

```js run
class User {

  constructor(name) {
    // setter ni chaqiradi
    this.name = name;
  }

*!*
  get name() {
*/!*
    return this._name;
  }

*!*
  set name(value) {
*/!*
    if (value.length < 4) {
      alert("Ism juda qisqa.");
      return;
    }
    this._name = value;
  }

}

let user = new User("John");
alert(user.name); // John

user = new User(""); // Ism juda qisqa.
```

Ichkarida, getter va setterlar `User.prototype` da yaratiladi.

## Hisoblangan nomlar [...]

Hisoblangan metod nomi bilan misol, kvadrat qavslar ichida:

```js run
class User {

*!*
  ['say' + 'Hi']() {
*/!*
    alert("Salom");
  }

}

new User().sayHi();
```

Bunday xususiyatlar eslab qolinishi oson va simvollar uchun foydali.

## Klass xususiyatlari

```warn header="Eski brauzerlarda polifil kerak bo'lishi mumkin"
Klass darajasidagi xususiyatlar tilga yaqinda qo'shilgan.
```

Yuqoridagi misolda `User` da faqat metodlar mavjud edi. Keling, xususiyat qo'shaylik:

```js run
class User {
  name = "Anonim";

  sayHi() {
    alert(`Salom, ${this.name}!`);
  }
}

new User().sayHi(); // Salom, Anonim!
```

Xususiyat `User.prototype` ga joylashtirilmagan. Buning o'rniga, u har bir obyekt uchun alohida, `new` tomonidan yaratiladi. Shunday qilib, xususiyat hech qachon bir klassning turli obyektlari o'rtasida taqsimlanmaydi.

Klass xususiyatlarining muhim farqi shundaki, ular `User.prototype` da emas, balki alohida obyektlarda o'rnatiladi:

```js run
class User {
  name = "John";
}

let user = new User();
alert(user.name); // John
alert(User.prototype.name); // undefined
```

## Klass xususiyatlari bilan bog'langan metodlar yaratish

<info:bind> bobida ko'rsatilganidek, JavaScript-dagi funktsiyalar dinamik `this` ga ega. Bu chaqiruv kontekstiga bog'liq.

Shunday qilib, agar obyekt metodi boshqa kontekstda uzatilsa va chaqirilsa, `this` endi o'sha obyektga havola bo'lmaydi.

Masalan, bu kod `undefined` ni ko'rsatadi:

```js run
class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    alert(this.value);
  }
}

let button = new Button("salom");

*!*
setTimeout(button.click, 1000); // undefined
*/!*
```

Muammo "`this` ni yo'qotish" deb ataladi.

<info:bind> bobida muhokama qilinganidek, buni tuzatishning ikkita yondashuvi bor:

1. `setTimeout(() => button.click(), 1000)` kabi o'rash-funktsiyasini o'tkazish.
2. Metodini obyektga bog'lash, masalan konstruktorda.

Klass xususiyatlari yana bir, juda oqlangan sintaksisni taqdim etadi:

```js run
class Button {
  constructor(value) {
    this.value = value;
  }
*!*
  click = () => {
    alert(this.value);
  }
*/!*
}

let button = new Button("salom");

setTimeout(button.click, 1000); // salom
```

`click = () => {...}` klass xususiyati har bir `Button` obyektida alohida funktsiya yaratadi, ichida `this` shu obyektga havola qiladi. Biz `button.click` ni hamma joyga o'tkazishimiz mumkin va `this` ning qiymati har doim to'g'ri bo'ladi.

Bu ayniqsa brauzer muhitida, voqealar uchun tinglovchilar uchun foydali.

## Xulosa

Asosiy klass sintaksisi quyidagicha:

```js
class MyClass {
  prop = value; // xususiyat

  constructor(...) { // konstruktor
    // ...
  }

  method(...) {} // metod

  get something(...) {} // getter metod
  set something(...) {} // setter metod

  [Symbol.iterator]() {} // hisoblangan nom bilan metod (bu yerda simvol)
  // ...
}
```

`MyClass` texnik jihatdan funktsiya (biz `constructor` sifatida taqdim etadigan), metodlar, getter va setterlar esa `MyClass.prototype` ga yoziladi.

Keyingi boblarda biz klasslar haqida, jumladan meros va boshqa xususiyatlar haqida ko'proq bilib olamiz.
