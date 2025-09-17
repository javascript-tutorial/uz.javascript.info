# Statik xususiyatlar va usullar

Shuningdek, biz usulni `"prototype"` ga emas, balki klassning funktsiyasiga tayinlashimiz mumkin. Bunday usullar _statik_ deb nomlanadi.

Misol:

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

Bu aslida uni funktsiya xususiyati sifatida tayinlash bilan bir xil bo'ladi:

```js run
class User {}

User.staticMethod = function () {
  alert(this === User);
};

User.staticMethod(); // true
```

`User.staticMethod()` ichidagi `this` qiymati `User` klass konstruktoridir ("nuqta oldidagi obyekt" qoidasi).

Odatda, statik usullar klassga tegishli funktsiyalarni amalga oshirish uchun ishlatiladi, lekin uning biron bir alohida obyektiga emas.

Masalan, bizda `Article` obyektlari mavjud va ularni taqqoslash funktsiyasi zarur. Tabiiy tanlov quyidagicha `Article.compare` bo'ladi:

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

Bu yerda `Article.compare` maqolalarni "ustidan" taqqoslash vositasi sifatida turadi. Bu maqola usuli uchun emas, balki butun klass uchun.

Yana bir misol "fabrika" deb nomlangan usul bo'lishi mumkin. Tasavvur qiling, bizga maqola yaratishning bir necha yo'li bor:

1. Berilgan parametrlar bo'yicha yaratish (`title`, `date` va hokazo).
2. Bugungi sana bilan bo'sh maqola yarating.
3. ...yoki yana nimadir.

Birinchi usul konstruktor tomonidan amalga oshirilishi mumkin. Va ikkinchisi uchun biz klassning statik usulini yaratishimiz mumkin.

`Article.createTodays()` singari bu yerda:

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

alert( article.title ); // Bugungi dayjest
```

Endi har safar bugungi dayjestni yaratishimiz kerak bo'lsa, biz `Article.createTodays()` deb chaqirishimiz mumkin. Yana bir bor takrorlayman, bu maqola usuli emas, balki butun klassning usuli.

Ma'lumotlar bazasi bilan bog'liq klasslarda statik usullar ma'lumotlar bazasidan yozuvlarni qidirish/saqlash/olib tashlash uchun quyidagi kabi qo'llaniladi:

```js
// Article - maqolalarni boshqarish uchun maxsus klass deb taxmin qilamiz
// maqolani olib tashlash uchun statik usul:
Article.remove({ id: 12345 });
```

## Statik xususiyatlar

[recent browser=Chrome]

Statik xususiyatlar, odatdagi klass xususiyatlari singari ham mumkin:

```js run
class Article {
  static publisher = "Oybek Zokhidov";
}

alert(Article.publisher); // Oybek Zokhidov
```

Bu `Article` ga to'g'ridan-to'g'ri tayinlash bilan bir xil

```js
Article.publisher = "Oybek Zokhidov";
```

## Statika va meros

Statika bu meros, biz `Parent.method` ga `Child.metho`" sifatida kirishimiz mumkin.

Masalan, quyidagi koddagi `Animal.compare` meros qilib olingan va `Rabbit.compare` sifatida undan foydalanish mumkin:

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

rabbits[0].run(); // Black Rabbit 5 tezlikda yuguradi.
```

Endi biz `Rabbit.compare` ni meros qilib olingan `Animal.compare` chaqiriladi taxmin qilishimiz mumkin.

Bu qanday ishlaydi? Shunga qaramay, prototiplardan foydalanish. Siz allaqachon taxmin qilganingizdek, kengaytmalar `Rabbit` ga `[[Prototype]]` ning havolasini `Animal` ga beradi.

![](animal-rabbit-static.svg)

![](animal-rabbit-static.svg)

Shunday qilib, `Rabbit` funktsiyasi endi `Animal` funktsiyasini egallaydi. Va `Animal` funktsiyasi odatda `Function.prototype` ga tegishli `[[Prototype]]` ga ega, chunki u hech narsani kengaytirmaydi.

Mana, buni tekshirib ko'raylik:

```js run
class Animal {}
class Rabbit extends Animal {}

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

Bu texnik jihatdan klassning o'ziga tayinlash bilan bir xil:

```js
MyClass.property = ...
MyClass.method = ...
```

Statik xususiyatlar meros qilib olinadi.

Texnik, uchun `class B extends A` klass prototipi `B` o'zi `A` ishora uzaytiradi: `B.[[Prototype]] = A`. Demak, `B` da biror maydon topilmasa, qidiruv `A` da davom etadi.
