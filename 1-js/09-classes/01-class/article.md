
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

<<<<<<< HEAD
Keyin `new MyClass()` ro'yxatdagi barcha usullar bilan yangi obyekt yaratadi.
=======
Then use `new MyClass()` to create a new object with all the listed methods.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
`new User("John")` chaqirilganda:
1. Yangi obyekt yaratiladi.
2. `constructor` berilgan argument bilan ishlaydi va unga `this.name` ni tayinlaydi.

...Keyin biz `"user.sayHi"` kabi usullarni chaqira olamiz.
=======
When `new User("John")` is called:
1. A new object is created.
2. The `constructor` runs with the given argument and assigns it to `this.name`.

...Then we can call object methods, such as `user.sayHi()`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c


```warn header="Klass usullari o'rtasida vergul yo'q"
Ajam dasturchilar uchun odatiy tuzoq - bu sinteksis xatolariga olib keladigan klass usullari orasida vergul qo'yishdir.

Bu yerdagi yozuvlarni obyektlar soni bilan aralashtirish mumkin emas. Klass davomida vergul talab qilinmaydi.
```

## Klass nima?

<<<<<<< HEAD
Xo'sh, aniq `class` nima? Bu o'ylashi mumkin bo'lgan til darajasidagi mutlaqo yangi shaxs emas.
=======
So, what exactly is a `class`? That's not an entirely new language-level entity, as one might think.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Keling, barcha sehrni yo'qotaylik va aslida klass nima ekanligini ko'rib chiqaylik. Bu ko'plab murakkab jihatlarni tushunishda yordam beradi.

<<<<<<< HEAD
JavaScript-da klass funktsiyalarning bir turi.
=======
In JavaScript, a class is a kind of function.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
`class User {...}` tuzilishi aslida nima qiladi:
1. `User` nomli funktsiyani yaratadi, bu klass deklaratsiyaning natijasi bo'ladi.
    - Funktsiya kodi `constructor` usulidan olingan (agar biz bunday usulni yozmasak, bo'sh deb hisoblanadi).
3. `sayHi` kabi barcha usullarni `User.prototype` da saqlaydi.

Keyinchalik, yangi obyektlar uchun usulni chaqirganda, prototipdan olinadi, xuddi <info:function-prototype> bobida tasvirlanganidek. Shunday qilib, `new User` obyekti klass usullariga kirish huquqiga ega.

Biz `class User` natijasini quyidagicha tasvirlashimiz mumkin:

![](class-user.svg)

Buni ko'rib chiqish uchun kod:
=======
What `class User {...}` construct really does is:

1. Creates a function named `User`, that becomes the result of the class declaration. The function code is taken from the `constructor` method (assumed empty if we don't write such method).
2. Stores class methods, such as `sayHi`, in `User.prototype`.

After `new User` object is created, when we call its method, it's taken from the prototype, just as described in the chapter <info:function-prototype>. So the object has access to class methods.

We can illustrate the result of `class User` declaration as:

![](class-user.svg)
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Here's the code to introspect it:

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// klass bu funktsiya
alert(typeof User); // function

// ...yoki, aniqrog'i, konstruktor usuli
alert(User === User.prototype.constructor); // true

<<<<<<< HEAD
// usullar User.prototype-da:
alert(User.prototype.sayHi); // alert(this.name);
=======
// The methods are in User.prototype, e.g:
alert(User.prototype.sayHi); // the code of the sayHi method
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

// prototipda to'liq ikkita usul mavjud
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

<<<<<<< HEAD
## Faqat sintaksis shakar emas

Ba'zan odamlar `class` JavaScript-dagi "sintaksis shakar" deb aytishadi, chunki biz aslida `class` kalit so'zisiz bir xil narsani e'lon qilishimiz mumkin edi:
=======
## Not just a syntactic sugar

<<<<<<< HEAD
Sometimes people say that `class` is a "syntactic sugar" (syntax that is designed to make things easier to read, but doesn't introduce anything new), because we could actually declare the same without `class` keyword at all:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
Sometimes people say that `class` is a "syntactic sugar" (syntax that is designed to make things easier to read, but doesn't introduce anything new), because we could actually declare the same thing without using the `class` keyword at all:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
// sof funktsiyalarda class User qayta yozish

// 1. Konstruktor funktsiyasini yarating
function User(name) {
  this.name = name;
}
<<<<<<< HEAD
// har qanday funktsiya prototipi sukut bo'yicha konstruktor xususiyatiga ega,
// shuning uchun biz uni yaratishga hojat yo'q
=======
// a function prototype has "constructor" property by default,
// so we don't need to create it
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

// 2. Usulni prototipga qo'shing
User.prototype.sayHi = function() {
  alert(this.name);
};

// Foydalanish:
let user = new User("John");
user.sayHi();
```

<<<<<<< HEAD
Ushbu ta'rifning natijasi taxminan bir xil. Shunday qilib, konstruktorni prototip usullari bilan birgalikda aniqlash uchun `class` sintaksis shakar deb hisoblanishining haqiqatan ham sabablari bor.

Garchi, muhim farqlar mavjud.

1. Birinchidan, `class` tomonidan yaratilgan funktsiya maxsus ichki xususiyat bilan belgilanadi `[[FunctionKind]]:"classConstructor"`. Shunday qilib, uni qo'lda yaratish bilan bir xil emas.

    Oddiy funktsiyadan farqli o'laroq, klass konstruktorini `new` holda chaqirish mumkin emas:
=======
The result of this definition is about the same. So, there are indeed reasons why `class` can be considered a syntactic sugar to define a constructor together with its prototype methods.

Still, there are important differences.

1. First, a function created by `class` is labelled by a special internal property `[[IsClassConstructor]]: true`. So it's not entirely the same as creating it manually.

    The language checks for that property in a variety of places. For example, unlike a regular function, it must be called with `new`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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
    There are other differences, we'll see them soon.

<<<<<<< HEAD
2. Klass usullarini sanab bo'lmaydi
    Klass ta'rifi `"prototype"` dagi barcha usullar uchun `sanab o'tiladigan` bayroqni `false` ga o'rnatadi.
=======
2. Class methods are non-enumerable.
    A class definition sets `enumerable` flag to `false` for all methods in the `"prototype"`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

    Bu yaxshi, chunki agar biz obyekt uchun `for..in` ishlatsak, biz odatda uning klass usullarini xohlamaymiz.

<<<<<<< HEAD
3. Sinflar doimo `use strict` dan foydalanadi
    Klass konstruktsiyasidagi barcha kodlar avtomatik ravishda qat'iy rejimda bo'ladi.


Bundan tashqari, `class` sintaksisining asosiy ishlashidan tashqari, biz u bilan birga keyinchalik o'rganib chiqadigan ko'plab boshqa xususiyatlarni ham o'z ichiga oladi.
=======
3. Classes always `use strict`.
    All code inside the class construct is automatically in strict mode.

Besides, `class` syntax brings many other features that we'll explore later.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Klass ifodasi

<<<<<<< HEAD
Xuddi funktsiyalar singari, klasslarni boshqa ifoda ichida aniqlash mumkin, ularni o'tkazish, qaytarish, tayinlash va h.k.
=======
Just like functions, classes can be defined inside another expression, passed around, returned, assigned, etc.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Mana, klass iborasiga misol:

```js
let User = class {
  sayHi() {
    alert("Salom");
  }
};
```

<<<<<<< HEAD
Nomlangan funktsiya iboralariga o'xshash, klass iboralarining nomi bo'lishi yoki bo'lmasligi mumkin.
=======
Similar to Named Function Expressions, class expressions may have a name.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Agar klass ifodasini nomi bo'lsa, u faqat klass ichida ko'rinadi:

```js run
<<<<<<< HEAD
// "Named Class Expression" (alas, bunday atama yo'q, lekin bu nima bo'layotgani)
let User = class *!*MyClass*/!* {
  sayHi() {
    alert(MyClass); // MyClass faqat klass ichida ko'rinadi
=======
// "Named Class Expression"
// (no such term in the spec, but that's similar to Named Function Expression)
let User = class *!*MyClass*/!* {
  sayHi() {
    alert(MyClass); // MyClass name is visible only inside the class
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  }
};

new User().sayHi(); // ishlaydi, MyClass ta'rifini ko'rsatadi

<<<<<<< HEAD
alert(MyClass); // xato, MyClass klassdan tashqarida ko'rinmaydi
```


Hatto klasslar ham dinamik ravishda "talabga binoan" o'tkazishimiz mumkin, masalan:
=======
alert(MyClass); // error, MyClass name isn't visible outside of the class
```

We can even make classes dynamically "on-demand", like this:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
function makeClass(phrase) {
  // klass e'lon qiling va uni qaytaring
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


<<<<<<< HEAD
## Getters/setters, boshqa qisqartmalar

Shuningdek, klasslarga getter / setters, generatorlar, hisoblash xususiyatlari va boshqalar kiradi.
=======
## Getters/setters

Just like literal objects, classes may include getters/setters, computed properties etc.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

`get/set` yordamida amalga oshirilgan `user.name` uchun misol:

```js run
class User {

  constructor(name) {
<<<<<<< HEAD
    // setter ni chaqiradi
    this._name = name;
=======
    // invokes the setter
    this.name = name;
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
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

<<<<<<< HEAD
user = new User(""); // Ism juda qisqa.
```

Ichkarida, getter va setter-lar `User.prototype` da quyidagi kabi yaratilgan:
=======
user = new User(""); // Name is too short.
```

Technically, such class declaration works by creating getters and setters in `User.prototype`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Computed names [...]

<<<<<<< HEAD
Hisoblangan xususiyatlarga ega bo'lgan misol:
=======
Here's an example with a computed method name using brackets `[...]`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
class User {
<<<<<<< HEAD
  [f()]() {
    alert("Salom");
=======

*!*
  ['say' + 'Hi']() {
*/!*
    alert("Hello");
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  }

}

new User().sayHi();
```

<<<<<<< HEAD
Generator usuli uchun, xuddi shunday, `*` bilan uni oldindan tayyorlang.

## Klass xususiyatlari

```warn header="Eski brauzerlarda polifil kerak bo'lishi mumkin"
Klass darajasidagi xususiyatlar tilga yaqinda qo'shilgan narsadir.
```

Yuqoridagi misolda `User` da faqat usullar mavjud edi. Keling, xususiyat qo'shaylik:

```js run
class User {
  name = "Anonim";
=======
Such features are easy to remember, as they resemble that of literal objects.

## Class fields

```warn header="Old browsers may need a polyfill"
Class fields are a recent addition to the language.
```

Previously, our classes only had methods.

"Class fields" is a syntax that allows to add any properties.

For instance, let's add `name` property to `class User`:

```js run
class User {
*!*
  name = "John";
*/!*
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

  sayHi() {
    alert(`Salom, ${this.name}!`);
  }
}

new User().sayHi(); // Hello, John!
```

<<<<<<< HEAD
Xususiyat `User.prototype` ga joylashtirilmagan. Buning o'rniga, u har bir obyekt uchun alohida, `new` tomonidan yaratiladi. Shunday qilib, xususiyat hech qachon bir klassning turli xil obyektlari o'rtasida taqsimlanmaydi.
=======
So, we just write "<property name> = <value>" in the declaration, and that's it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

The important difference of class fields is that they are set on individual objects, not `User.prototype`:

<<<<<<< HEAD
## Xulosa

JavaScript-da klass yaratishning ko'plab usullari mavjud.

Birinchidan, umumiy obyektga yo'naltirilgan terminologiyaga ko'ra, klass "obyekt shablonlari" ni ta'minlaydigan, bir xil tuzilgan obyektlarni yaratishga imkon beradigan narsadir.

"Class" deganda, bu har doim `class` kalit so'zini anglatmaydi.

Bu klass:
=======
```js run
class User {
*!*
  name = "John";
*/!*
}

let user = new User();
alert(user.name); // John
alert(User.prototype.name); // undefined
```

We can also assign values using more complex expressions and function calls:

```js run
class User {
*!*
  name = prompt("Name, please?", "John");
*/!*
}

let user = new User();
alert(user.name); // John
```
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c


### Making bound methods with class fields

As demonstrated in the chapter <info:bind> functions in JavaScript have a dynamic `this`. It depends on the context of the call.

So if an object method is passed around and called in another context, `this` won't be a reference to its object any more.

For instance, this code will show `undefined`:

```js run
class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    alert(this.value);
  }
}

let button = new Button("hello");

*!*
setTimeout(button.click, 1000); // undefined
*/!*
```

The problem is called "losing `this`".

There are two approaches to fixing it, as discussed in the chapter <info:bind>:

1. Pass a wrapper-function, such as `setTimeout(() => button.click(), 1000)`.
2. Bind the method to object, e.g. in the constructor.

Class fields provide another, quite elegant syntax:

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

let button = new Button("hello");

setTimeout(button.click, 1000); // hello
```

<<<<<<< HEAD
...Ammo ko'p hollarda `class` kalit so'zidan foydalaniladi, chunki u ajoyib sintaksis va ko'plab qo'shimcha funktsiyalarni ta'minlaydi.
=======
The class field `click = () => {...}` is created on a per-object basis, there's a separate function for each `Button` object, with `this` inside it referencing that object. We can pass `button.click` around anywhere, and the value of `this` will always be correct.

That's especially useful in browser environment, for event listeners.

## Summary
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Asosiy klass sintaksisi quyidagicha:

```js
class MyClass {
  prop = value; // property

  constructor(...) { // constructor
    // ...
  }

  method(...) {} // method

  get something(...) {} // getter method
  set something(...) {} // setter method

  [Symbol.iterator]() {} // method with computed name (symbol here)
  // ...
}
```

<<<<<<< HEAD
`MyClass` texnik jihatdan funktsiyadir, metodlar esa `MyClass.prototype` ga yozilgan.
=======
`MyClass` is technically a function (the one that we provide as `constructor`), while methods, getters and setters are written to `MyClass.prototype`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Keyingi boblarda biz kalitlar, jumladan meros va boshqa xususiyatlar haqida ko'proq bilib olamiz.
