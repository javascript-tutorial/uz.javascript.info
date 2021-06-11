
# Klass: asosiy sintaksis

```quote author="Vikipediya"
Obyektga yo'naltirilgan dasturlashda klass - bu obyektlarni yaratish uchun kengaytiriladigan kod shabloni bo'lib, ularda dastlabki qadriyatlarni (xususiyatlarni) va xatti-harakatlarni(usullar) amalga oshirishni belgilaydi.
```

Amalda, biz ko'pincha foydalanuvchilar yoki tovarlar yoki boshqa narsalar kabi bir xil turdagi ko'plab obyektlarni yaratishimiz kerak.

<info:constructor-new> bobidan allaqachon bilganimizdek, `new function` bunga yordam beradi.

Ammo zamonaviy JavaScript-da obyektga yo'naltirilgan dasturlash uchun foydali bo'lgan juda yangi xususiyatlarni taqdim etadigan yanada rivojlangan "klass" tuzilishi mavjud.

## "Klass" sintaksisi

Asosiy sintaksis:
```js
class MyClass {
  // klass ususllari
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
```

Keyin `new MyClass()` ro'yxatdagi barcha usullar bilan yangi obyekt yaratadi.

`constructor()` usuli avtomatik ravishda `new` tomonidan chaqiriladi, shuning uchun biz u yerda obyektni ishga tushirishimiz mumkin.

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

...Keyin biz `"user.sayHi"` kabi usullarni chaqira olamiz.


```warn header="Klass usullari o'rtasida vergul yo'q"
Ajam dasturchilar uchun odatiy tuzoq - bu sinteksis xatolariga olib keladigan klass usullari orasida vergul qo'yishdir.

Bu yerdagi yozuvlarni obyektlar soni bilan aralashtirish mumkin emas. Klass davomida vergul talab qilinmaydi.
```

## Klass nima?

Xo'sh, aniq `class` nima? Bu o'ylashi mumkin bo'lgan til darajasidagi mutlaqo yangi shaxs emas.

Keling, barcha sehrni yo'qotaylik va aslida klass nima ekanligini ko'rib chiqaylik. Bu ko'plab murakkab jihatlarni tushunishda yordam beradi.

JavaScript-da klass funktsiyalarning bir turi.

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

`class User {...}` tuzilishi aslida nima qiladi:
1. `User` nomli funktsiyani yaratadi, bu klass deklaratsiyaning natijasi bo'ladi.
    - Funktsiya kodi `constructor` usulidan olingan (agar biz bunday usulni yozmasak, bo'sh deb hisoblanadi).
3. `sayHi` kabi barcha usullarni `User.prototype` da saqlaydi.

Keyinchalik, yangi obyektlar uchun usulni chaqirganda, prototipdan olinadi, xuddi <info:function-prototype> bobida tasvirlanganidek. Shunday qilib, `new User` obyekti klass usullariga kirish huquqiga ega.

Biz `class User` natijasini quyidagicha tasvirlashimiz mumkin:

![](class-user.svg)

Buni ko'rib chiqish uchun kod:


```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// klass bu funktsiya
alert(typeof User); // function

// ...yoki, aniqrog'i, konstruktor usuli
alert(User === User.prototype.constructor); // true

// usullar User.prototype-da:
alert(User.prototype.sayHi); // alert(this.name);

// prototipda to'liq ikkita usul mavjud
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

// 2. Usulni prototipga qo'shing
User.prototype.sayHi = function() {
  alert(this.name);
};

// Foydalanish:
let user = new User("John");
user.sayHi();
```

Ushbu ta'rifning natijasi taxminan bir xil. Shunday qilib, konstruktorni prototip usullari bilan birgalikda aniqlash uchun `class` sintaksis shakar deb hisoblanishining haqiqatan ham sabablari bor.

Garchi, muhim farqlar mavjud.

1. Birinchidan, `class` tomonidan yaratilgan funktsiya maxsus ichki xususiyat bilan belgilanadi `[[FunctionKind]]:"classConstructor"`. Shunday qilib, uni qo'lda yaratish bilan bir xil emas.

    Oddiy funktsiyadan farqli o'laroq, klass konstruktorini `new` holda chaqirish mumkin emas:

    ```js run
    class User {
      constructor() {}
    }

    alert(typeof User); // function
    User(); // Error: Class constructor User cannot be invoked without 'new'
    ```

    Shuningdek, aksariyat JavaScript interpretatorlarida klass konstruktorining matn vakilliki `class ...` bilan boshlanadi.

    ```js run
    class User {
      constructor() {}
    }

    alert(User); // class User { ... }
    ```

2. Klass usullarini sanab bo'lmaydi
    Klass ta'rifi `"prototype"` dagi barcha usullar uchun `sanab o'tiladigan` bayroqni `false` ga o'rnatadi.

    Bu yaxshi, chunki agar biz obyekt uchun `for..in` ishlatsak, biz odatda uning klass usullarini xohlamaymiz.

3. Sinflar doimo `use strict` dan foydalanadi
    Klass konstruktsiyasidagi barcha kodlar avtomatik ravishda qat'iy rejimda bo'ladi.


Bundan tashqari, `class` sintaksisining asosiy ishlashidan tashqari, biz u bilan birga keyinchalik o'rganib chiqadigan ko'plab boshqa xususiyatlarni ham o'z ichiga oladi.

## Klass ifodasi

Xuddi funktsiyalar singari, klasslarni boshqa ifoda ichida aniqlash mumkin, ularni o'tkazish, qaytarish, tayinlash va h.k.

Mana, klass iborasiga misol:

```js
let User = class {
  sayHi() {
    alert("Salom");
  }
};
```

Nomlangan funktsiya iboralariga o'xshash, klass iboralarining nomi bo'lishi yoki bo'lmasligi mumkin.

Agar klass ifodasini nomi bo'lsa, u faqat klass ichida ko'rinadi:

```js run
// "Named Class Expression" (alas, bunday atama yo'q, lekin bu nima bo'layotgani)
let User = class *!*MyClass*/!* {
  sayHi() {
    alert(MyClass); // MyClass faqat klass ichida ko'rinadi
  }
};

new User().sayHi(); // ishlaydi, MyClass ta'rifini ko'rsatadi

alert(MyClass); // xato, MyClass klassdan tashqarida ko'rinmaydi
```


Hatto klasslar ham dinamik ravishda "talabga binoan" o'tkazishimiz mumkin, masalan:

```js run
function makeClass(phrase) {
  // klass e'lon qiling va uni qaytaring
  return class {
    sayHi() {
      alert(phrase);
    };
  };
}

// Yangi klass yarating
let User = makeClass("Salom");

new User().sayHi(); // Salom
```


## Getters/setters, boshqa qisqartmalar

Shuningdek, klasslarga getter / setters, generatorlar, hisoblash xususiyatlari va boshqalar kiradi.

`get/set` yordamida amalga oshirilgan `user.name` uchun misol:

```js run
class User {

  constructor(name) {
    // setter ni chaqiradi
    this._name = name;
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

Ichkarida, getter va setter-lar `User.prototype` da quyidagi kabi yaratilgan:

```js
Object.defineProperties(User.prototype, {
  name: {
    get() {
      return this._name
    },
    set(name) {
      // ...
    }
  }
});
```

Hisoblangan xususiyatlarga ega bo'lgan misol:

```js run
function f() { return "sayHi"; }

class User {
  [f()]() {
    alert("Salom");
  }

}

new User().sayHi();
```

Generator usuli uchun, xuddi shunday, `*` bilan uni oldindan tayyorlang.

## Klass xususiyatlari

```warn header="Eski brauzerlarda polifil kerak bo'lishi mumkin"
Klass darajasidagi xususiyatlar tilga yaqinda qo'shilgan narsadir.
```

Yuqoridagi misolda `User` da faqat usullar mavjud edi. Keling, xususiyat qo'shaylik:

```js run
class User {
  name = "Anonim";

  sayHi() {
    alert(`Salom, ${this.name}!`);
  }
}

new User().sayHi();
```

Xususiyat `User.prototype` ga joylashtirilmagan. Buning o'rniga, u har bir obyekt uchun alohida, `new` tomonidan yaratiladi. Shunday qilib, xususiyat hech qachon bir klassning turli xil obyektlari o'rtasida taqsimlanmaydi.


## Xulosa

JavaScript-da klass yaratishning ko'plab usullari mavjud.

Birinchidan, umumiy obyektga yo'naltirilgan terminologiyaga ko'ra, klass "obyekt shablonlari" ni ta'minlaydigan, bir xil tuzilgan obyektlarni yaratishga imkon beradigan narsadir.

"Class" deganda, bu har doim `class` kalit so'zini anglatmaydi.

Bu klass:

```js
function User(name) {
  this.sayHi = function() {
    alert(name);
  }
}
```

...Ammo ko'p hollarda `class` kalit so'zidan foydalaniladi, chunki u ajoyib sintaksis va ko'plab qo'shimcha funktsiyalarni ta'minlaydi.

Asosiy klass sintaksisi quyidagicha:

```js
class MyClass {
  prop = value; // field

  constructor(...) { // constructor
    // ...
  }

  method(...) {} // method

  get something(...) {} // getter method
  set something(...) {} // setter method

  [Symbol.iterator]() {} // method with computed name/symbol name
  // ...
}
```

`MyClass` texnik jihatdan funktsiyadir, metodlar esa `MyClass.prototype` ga yozilgan.

Keyingi boblarda biz kalitlar, jumladan meros va boshqa xususiyatlar haqida ko'proq bilib olamiz.
