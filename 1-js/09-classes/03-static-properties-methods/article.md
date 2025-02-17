
# Statik xususiyatlar va usullar

<<<<<<< HEAD
<<<<<<< HEAD
Shuningdek, biz usulni `"prototype"` ga emas, balki klassning funktsiyasiga tayinlashimiz mumkin. Bunday usullar *statik* deb nomlanadi.

Misol:
=======
We can also assign a method to the class function itself, not to its `"prototype"`. Such methods are called *static*.

In a class, they are prepended by `static` keyword, like this:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
We can also assign a method to the class as a whole. Such methods are called *static*.

In a class declaration, they are prepended by `static` keyword, like this:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
class User {
*!*
  static staticMethod() {
*/!*
    alert(this === User);
  }
}

User.staticMethod(); // true
```

<<<<<<< HEAD
Bu aslida uni funktsiya xususiyati sifatida tayinlash bilan bir xil bo'ladi:
=======
That actually does the same as assigning it as a property directly:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
class User { }

User.staticMethod = function() {
  alert(this === User);
};

User.staticMethod(); // true
```

<<<<<<< HEAD
`User.staticMethod()` ichidagi `this` qiymati `User` klass konstruktoridir ("nuqta oldidagi obyekt" qoidasi).
=======
The value of `this` in `User.staticMethod()` call is the class constructor `User` itself (the "object before dot" rule).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

<<<<<<< HEAD
Odatda, statik usullar klassga tegishli funktsiyalarni amalga oshirish uchun ishlatiladi, lekin uning biron bir alohida obyektiga emas.

<<<<<<< HEAD
Masalan, bizda `Article` obyektlari mavjud va ularni taqqoslash funktsiyasi zarur. Tabiiy tanlov quyidagicha `Article.compare` bo'ladi:
=======
For instance, we have `Article` objects and need a function to compare them. A natural solution would be to add `Article.compare` method, like this:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
Usually, static methods are used to implement functions that belong to the class as a whole, but not to any particular object of it.

For instance, we have `Article` objects and need a function to compare them.

A natural solution would be to add `Article.compare` static method:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
*/!*
}

// usage
let articles = [
  new Article("HTML", new Date(2019, 1, 1)),
  new Article("CSS", new Date(2019, 0, 1)),
  new Article("JavaScript", new Date(2019, 11, 1))
];

*!*
articles.sort(Article.compare);
*/!*

alert( articles[0].title ); // CSS
```

<<<<<<< HEAD
<<<<<<< HEAD
Bu yerda `Article.compare` maqolalarni "ustidan" taqqoslash vositasi sifatida turadi. Bu maqola usuli uchun emas, balki butun klass uchun.
=======
Here `Article.compare` stands "above" articles, as a means to compare them. It's not a method of an article, but rather of the whole class.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Yana bir misol "fabrika" deb nomlangan usul bo'lishi mumkin. Tasavvur qiling, bizga maqola yaratishning bir necha yo'li bor:
=======
Here `Article.compare` method stands "above" articles, as a means to compare them. It's not a method of an article, but rather of the whole class.

Another example would be a so-called "factory" method.

Let's say, we need multiple ways to create an article:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

<<<<<<< HEAD
1. Berilgan parametrlar bo'yicha yaratish (`title`, `date` va hokazo).
2. Bugungi sana bilan bo'sh maqola yarating.
3. ...
=======
1. Create by given parameters (`title`, `date` etc).
2. Create an empty article with today's date.
3. ...or else somehow.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Birinchi usul konstruktor tomonidan amalga oshirilishi mumkin. Va ikkinchisi uchun biz klassning statik usulini yaratishimiz mumkin.

<<<<<<< HEAD
`Article.createTodays()` singari bu yerda:
=======
Such as `Article.createTodays()` here:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static createTodays() {
    // eslab qoling, this = Article
    return new this("Bugungi dayjest", new Date());
  }
*/!*
}

let article = Article.createTodays();

<<<<<<< HEAD
alert( article.title ); // Bugungi dayjest
=======
alert( article.title ); // Today's digest
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

Endi har safar bugungi dayjestni yaratishimiz kerak bo'lsa, biz `Article.createTodays()` deb chaqirishimiz mumkin. Yana bir bor takrorlayman, bu maqola usuli emas, balki butun klassning usuli.

Ma'lumotlar bazasi bilan bog'liq klasslarda statik usullar ma'lumotlar bazasidan yozuvlarni qidirish/saqlash/olib tashlash uchun quyidagi kabi qo'llaniladi:

```js
<<<<<<< HEAD
// Article - maqolalarni boshqarish uchun maxsus klass deb taxmin qilamiz
// maqolani olib tashlash uchun statik usul:
Article.remove({id: 12345});
```

## Statik xususiyatlar
=======
// assuming Article is a special class for managing articles
// static method to remove the article by id:
Article.remove({id: 12345});
```

````warn header="Static methods aren't available for individual objects"
Static methods are callable on classes, not on individual objects.

E.g. such code won't work:

```js
// ...
article.createTodays(); /// Error: article.createTodays is not a function
```
````

## Static properties
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

[recent browser=Chrome]

<<<<<<< HEAD
Statik xususiyatlar, odatdagi klass xususiyatlari singari ham mumkin:
=======
Static properties are also possible, they look like regular class properties, but prepended by `static`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
class Article {
  static publisher = "Oybek Zokhidov";
}

alert( Article.publisher ); // Oybek Zokhidov
```

Bu `Article` ga to'g'ridan-to'g'ri tayinlash bilan bir xil

```js
Article.publisher = "Oybek Zokhidov";
```

<<<<<<< HEAD
## Statika va meros

Statika bu meros, biz `Parent.method` ga `Child.metho`" sifatida kirishimiz mumkin.

Masalan, quyidagi koddagi `Animal.compare` meros qilib olingan va `Rabbit.compare` sifatida undan foydalanish mumkin:
=======
## Inheritance of static properties and methods [#statics-and-inheritance]

Static properties and methods are inherited.

For instance, `Animal.compare` and `Animal.planet` in the code below are inherited and accessible as `Rabbit.compare` and `Rabbit.planet`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
class Animal {
  static planet = "Earth";

  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }

  run(speed = 0) {
    this.speed += speed;
    alert(`${this.name} ${this.speed} tezlikda yuguradi.`);
  }

*!*
  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }
*/!*

}

// Animal-dan meros
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} bekinadi!`);
  }
}

let rabbits = [
  new Rabbit("White Rabbit", 10),
  new Rabbit("Black Rabbit", 5)
];

*!*
rabbits.sort(Rabbit.compare);
*/!*

<<<<<<< HEAD
rabbits[0].run(); // Black Rabbit 5 tezlikda yuguradi.
```

Endi biz `Rabbit.compare` ni meros qilib olingan `Animal.compare` chaqiriladi taxmin qilishimiz mumkin.

Bu qanday ishlaydi? Shunga qaramay, prototiplardan foydalanish. Siz allaqachon taxmin qilganingizdek, kengaytmalar `Rabbit` ga `[[Prototype]]` ning havolasini `Animal` ga beradi.
=======
rabbits[0].run(); // Black Rabbit runs with speed 5.

alert(Rabbit.planet); // Earth
```

Now when we call `Rabbit.compare`, the inherited `Animal.compare` will be called.

How does it work? Again, using prototypes. As you might have already guessed, `extends` gives `Rabbit` the `[[Prototype]]` reference to `Animal`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

![](animal-rabbit-static.svg)

<<<<<<< HEAD
![](animal-rabbit-static.svg)

Shunday qilib, `Rabbit` funktsiyasi endi `Animal` funktsiyasini egallaydi. Va `Animal` funktsiyasi odatda `Function.prototype` ga tegishli `[[Prototype]]` ga ega, chunki u hech narsani kengaytirmaydi.

Mana, buni tekshirib ko'raylik:
=======
So, `Rabbit extends Animal` creates two `[[Prototype]]` references:

1. `Rabbit` function prototypally inherits from `Animal` function.
2. `Rabbit.prototype` prototypally inherits from `Animal.prototype`.

As a result, inheritance works both for regular and static methods.

Here, let's check that by code:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
class Animal {}
class Rabbit extends Animal {}

<<<<<<< HEAD
// statik xususiyatlar va usullar uchun
alert(Rabbit.__proto__ === Animal); // true

// va keyingi qadam - bu Function.prototype
alert(Animal.__proto__ === Function.prototype); // true

// bu obyekt usullari uchun "oddiy" prototip zanjiriga qo'shimcha ravishda
alert(Rabbit.prototype.__proto__ === Animal.prototype);
```

Shunday qilib, `Rabbit` `Animal` ning barcha statik usullaridan foydalanish imkoniyatiga ega.

## Xulosa

Statik usullar aniq klass misoli bilan bog'liq bo'lmagan, misol uchun mavjud bo'lishni talab qilmaydigan, aksincha `Article.compare` singari umuman klassga tegishli bo'lgan funksiyalar uchun ishlatiladi -- taqqoslash uchun umumiy usul ikkita maqola.
=======
// for statics
alert(Rabbit.__proto__ === Animal); // true

// for regular methods
alert(Rabbit.prototype.__proto__ === Animal.prototype); // true
```

## Summary

Static methods are used for the functionality that belongs to the class "as a whole". It doesn't relate to a concrete class instance.

For example, a method for comparison `Article.compare(article1, article2)` or a factory method `Article.createTodays()`.

They are labeled by the word `static` in class declaration.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Statik xususiyatlar, masalan, misol bilan bog'liq bo'lmagan, klass darajasidagi ma'lumotlarni saqlashni xohlaganimizda ishlatiladi.

Sintaksis:

```js
class MyClass {
  static property = ...;

  static method() {
    ...
  }
}
```

<<<<<<< HEAD
Bu texnik jihatdan klassning o'ziga tayinlash bilan bir xil:
=======
Technically, static declaration is the same as assigning to the class itself:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
MyClass.property = ...
MyClass.method = ...
```

<<<<<<< HEAD
Statik xususiyatlar meros qilib olinadi.

Texnik, uchun `class B extends A` klass prototipi `B` o'zi `A` ishora uzaytiradi: `B.[[Prototype]] = A`. Demak, `B` da biror maydon topilmasa, qidiruv `A` da davom etadi.
=======
Static properties and methods are inherited.

For `class B extends A` the prototype of the class `B` itself points to `A`: `B.[[Prototype]] = A`. So if a field is not found in `B`, the search continues in `A`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
