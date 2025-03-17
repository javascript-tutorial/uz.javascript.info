
# Klass merosi

<<<<<<< HEAD
Aytaylik, bizda ikkita klass bor.
=======
Class inheritance is a way for one class to extend another class.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

So we can create new functionality on top of the existing.

## The "extends" keyword

Let's say we have class `Animal`:

```js
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
<<<<<<< HEAD
    this.speed += speed;
    alert(`${this.name} ${this.speed} tezlikda yuguradi.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} to'xtadi.`);
=======
    this.speed = speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} stands still.`);
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  }
}

let animal = new Animal("Mening hayvonim");
```

<<<<<<< HEAD
![](rabbit-animal-independent-animal.svg)
=======
Here's how we can represent `animal` object and `Animal` class graphically:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

![](rabbit-animal-independent-animal.svg)

<<<<<<< HEAD
...Va `Rabbit`:

```js
class Rabbit {
  constructor(name) {
    this.name = name;
  }
  hide() {
    alert(`${this.name} bekinadi!`);
  }
}

let rabbit = new Rabbit("Mening quyonim");
```

![](rabbit-animal-independent-rabbit.svg)
=======
...And we would like to create another `class Rabbit`.

As rabbits are animals, `Rabbit` class should be based on `Animal`, have access to animal methods, so that rabbits can do what "generic" animals can do.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

The syntax to extend another class is: `class Child extends Parent`.

<<<<<<< HEAD
Hozir ular to'liq mustaqil.

Ammo biz `Rabbit` ning `Animal` ni kengaytirishini xohlaymiz. Boshqacha qilib aytganda, quyonlar hayvonlarga asoslangan bo'lishi kerak, `Animal` usullaridan foydalanishlari va ularni o'z usullari bilan kengaytirishlari kerak.

Boshqa klassdan meros olish uchun biz `"kengaytirish"` va `{..}` qavslaridan oldin ota-ona klassini belgilashimiz kerak.

Bu yerda `Rabbit` `Animal` dan meros:

```js run
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed += speed;
    alert(`${this.name} ${this.speed} tezlikda yuguradi.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} to'xtadi.`);
  }
}

// Animal dan meros "extends Animal"
=======
Let's create `class Rabbit` that inherits from `Animal`:

```js
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
*!*
class Rabbit extends Animal {
*/!*
  hide() {
    alert(`${this.name} bekinadi!`);
  }
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit 5 tezlikda yuguradi
rabbit.hide(); // White Rabbit bekinadi!
```

<<<<<<< HEAD
Endi `Rabbit` kodi biroz qisqartirildi, chunki u sukut bo'yicha `Animal` konstruktoridan foydalanadi va u ham hayvonlar kabi `yugurishi` mumkin.

`Rabbit.prototype` dan `Animal.prototype` ga `extends` kalit so'zi `[[Prototype]]` qo'shadi:

![](animal-rabbit-extends.svg)

Shunday qilib, agar `Rabbit.prototype` da usul topilmasa, JavaScript uni `Animal.prototype` dan oladi.

<info:native-prototypes> bobidan eslaganimizdek, JavaScript-da o'rnatilgan obyektlar uchun bir xil prototip meros ishlatiladi. Masalan, `Date.prototype.[[Prototype]]` `Object.prototype` dir, shuning uchun sanalar umumiy obyekt usullariga ega.
=======
Object of `Rabbit` class have access both to `Rabbit` methods, such as `rabbit.hide()`, and also to `Animal` methods, such as `rabbit.run()`.

Internally, `extends` keyword works using the good old prototype mechanics. It sets `Rabbit.prototype.[[Prototype]]` to `Animal.prototype`. So, if a method is not found in `Rabbit.prototype`, JavaScript takes it from `Animal.prototype`.

![](animal-rabbit-extends.svg)

For instance, to find `rabbit.run` method, the engine checks (bottom-up on the picture):
1. The `rabbit` object (has no `run`).
2. Its prototype, that is `Rabbit.prototype` (has `hide`, but not `run`).
3. Its prototype, that is (due to `extends`) `Animal.prototype`, that finally has the `run` method.

As we can recall from the chapter <info:native-prototypes>, JavaScript itself uses prototypal inheritance for built-in objects. E.g. `Date.prototype.[[Prototype]]` is `Object.prototype`. That's why dates have access to generic object methods.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

````smart header="`extends` dan keyin har qanday ifodaga ruxsat beriladi"
Sinf sintaksisi nafaqat klassni, balki `kengaytirilgan` dan keyin har qanday ifodani belgilashga imkon beradi.

Masalan, ota-klassni yaratadigan funktsiya chaqiruvi:

```js run
function f(phrase) {
  return class {
    sayHi() { alert(phrase); }
  };
}

*!*
class User extends f("Salom") {}
*/!*

new User().sayHi(); // Salom
```
Bu yerda `class User` `f("Salom")` natijasidan meros qilib oladi.

Ko'p sharoitlarga qarab klasslarni yaratish uchun funktsiyalardan foydalansak va ulardan meros olishimiz mumkin bo'lsa, bu rivojlangan dasturlash shablonlari uchun foydali bo'lishi mumkin.
````

## Usulni bekor qilish

<<<<<<< HEAD
Endi oldinga siljiymiz va usulni bekor qilamiz. Hozirga kelib, `Rabbit` `Animal` dan `this.speed = 0` ni o'rnatadigan `stop` usulini egallaydi.

Agar biz Rabbit-da o'zimizning `stop`-ni belgilasak, u holda u ishlatiladi:
=======
Now let's move forward and override a method. By default, all methods that are not specified in `class Rabbit` are taken directly "as is" from `class Animal`.

But if we specify our own method in `Rabbit`, such as `stop()` then it will be used instead:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
class Rabbit extends Animal {
  stop() {
    // ...now this will be used for rabbit.stop()
    // instead of stop() from class Animal
  }
}
```

<<<<<<< HEAD
<<<<<<< HEAD

...Ammo, odatda, biz ota-ona usulini butunlay almashtirishni xohlamaymiz, aksincha uning ustiga qurish, uning funktsiyalarini o'zgartirish yoki kengaytirishni xohlaymiz. Biz o'z usulimiz bilan biron bir narsani qilamiz, lekin oldin yoki keyin yoki jarayonda ota-ona usulini chaqiramiz.
=======
Usually we don't want to totally replace a parent method, but rather to build on top of it to tweak or extend its functionality. We do something in our method, but call the parent method before/after it or in the process.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
Usually, however, we don't want to totally replace a parent method, but rather to build on top of it to tweak or extend its functionality. We do something in our method, but call the parent method before/after it or in the process.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Klasslar buning uchun `"super"` kalit so'zni taqdim etadi.

- `super.method(...)` ota-ona usulini chaqirish uchun.
- `super(...)` ota-ona konstruktorni chaqirish (faqat bizning konstruktor ichida).

Masalan, quyonimiz to'xtaganda avtomatik yashirinishga ruxsat bering:

```js run
class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
<<<<<<< HEAD
    this.speed += speed;
    alert(`${this.name} ${this.speed} tezlikda yuguradi.`);
=======
    this.speed = speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  }

  stop() {
    this.speed = 0;
<<<<<<< HEAD
    alert(`${this.name} to'xtadi.`);
=======
    alert(`${this.name} stands still.`);
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  }

}

class Rabbit extends Animal {
  hide() {
    alert(`${this.name} bekinadi!`);
  }

*!*
  stop() {
    super.stop(); // ota-onaning to'xtash uchun chaqiruv
    this.hide(); // va so'ng bekinish
  }
*/!*
}

let rabbit = new Rabbit("White Rabbit");

<<<<<<< HEAD
rabbit.run(5); // White Rabbit 5 tezlikda yuguradi.
rabbit.stop(); // White Rabbit to'xtadi. White rabbit bekinadi!
=======
rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.stop(); // White Rabbit stands still. White Rabbit hides!
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

Endi `Rabbit` bu jarayonda ota-onani `super.stop()` deb ataydigan `to'xtatish` uslubiga ega.

````smart header="O'q funktsiyalarida "super" yo'q"
<info:arrow-functions> bobida aytib o'tilganidek, o'q funktsiyalari `super` ga ega emas.

<<<<<<< HEAD
Agar unga kirish imkoni bo'lsa, u tashqi funktsiyadan olingan. Misol uchun:
=======
If accessed, it's taken from the outer function. For instance:

>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
```js
class Rabbit extends Animal {
  stop() {
    setTimeout(() => super.stop(), 1000); // 1 soniyadan keyin ota-onaga to'xtash uchun chaqiruv qiling
  }
}
```

O'q funktsiyasidagi `super` `stop()` bilan bir xil, shuning uchun u maqsadga muvofiq ishlaydi. Agar biz bu yerda "muntazam" funktsiyani ko'rsatgan bo'lsak, xato bo'lishi mumkin:

```js
// Unexpected super
setTimeout(function() { super.stop() }, 1000);
```
````

<<<<<<< HEAD

## Konstruktorni bekor qilish
=======
## Overriding constructor
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Konstruktorlar bilan bu biroz hiyla-nayrangga aylanadi.

<<<<<<< HEAD
Hozirgacha `Rabbit` ning o'zining `konstruktori` yo'q edi.

[Spetsifikatsiyaga](https://tc39.github.io/ecma262/#sec-runtime-semantics-classdefinitionevaluation) muvofiq, agar klass boshqa klassni kengaytirsa va `konstruktor` bo'lmasa, u holda quyidagi `konstruktor` hosil bo'ladi :
=======
Until now, `Rabbit` did not have its own `constructor`.

According to the [specification](https://tc39.github.io/ecma262/#sec-runtime-semantics-classdefinitionevaluation), if a class extends another class and has no `constructor`, then the following "empty" `constructor` is generated:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
class Rabbit extends Animal {
  // klasslarni o'z konstruktorisiz kengaytirish uchun yaratilgan
*!*
  constructor(...args) {
    super(...args);
  }
*/!*
}
```

Ko'rib turganimizdek, u asosan ota-onani `konstruktorini` chaqiradi va unga barcha argumentlarni kiritadi. Agar biz o'zimiz konstruktor yozmasak, bu sodir bo'ladi.

Endi `Rabbit` ga maxsus konstruktorni qo'shaylik. Unda `name` ga qo'shimcha ravishda `earLength` belgilanadi:

```js run
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  // ...
}

class Rabbit extends Animal {

*!*
  constructor(name, earLength) {
    this.speed = 0;
    this.name = name;
    this.earLength = earLength;
  }
*/!*

  // ...
}

*!*
// Ishlamaydi!
let rabbit = new Rabbit("White Rabbit", 10); // Error: this is not defined.
*/!*
```

Voy! Xatolik yuz berdi. Endi biz quyonlarni yarata olmaymiz. Nima xatolik bo'ldi?

<<<<<<< HEAD
Qisqa javob: meros klaslarida konstruktorlar `super(...)` ni chaqirishlari kerak va (!) buni `this` ishlatishdan oldin qilishlari kerak.
=======
The short answer is:

- **Constructors in inheriting classes must call `super(...)`, and (!) do it before using `this`.**
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

...Lekin nega? Bu yerda nima bo'layapti? Darhaqiqat, talab g'alati tuyuladi.

<<<<<<< HEAD
Albatta, tushuntirish mavjud. Keling, tafsilotlarni ko'rib chiqaylik, shunda siz nima bo'layotganini tushunasiz.

JavaScript-da, "merosxo'r sinfning konstruktor funktsiyasi" va boshqalari o'rtasida farq bor. Meros klassida tegishli konstruktor funktsiyasi maxsus ichki xususiyat bilan belgilanadi `[[ConstructorKind]]:"derived"`.

Farqi:

- Oddiy konstruktor ishlayotganda, bo'sh obyektni `this` qilib yaratadi va shu bilan davom etadi.
- Ammo hosil bo'lgan konstruktor ishga tushganda, buni qilmaydi. Bu ishni ota-ona konstruktor bajarishini kutadi.

Agar biz o'zimiz konstruktor qilsak, biz `super` ni chaqirishimiz kerak, chunki aks holda `this` ga havola qilingan obyekt yaratilmaydi. Va biz xato qilamiz.

`Rabbit` ishlashi uchun biz `this` dan foydalanishdan oldin `super()` ni chaqirishimiz kerak, masalan:
=======
Of course, there's an explanation. Let's get into details, so you'll really understand what's going on.

In JavaScript, there's a distinction between a constructor function of an inheriting class (so-called "derived constructor") and other functions. A derived constructor has a special internal property `[[ConstructorKind]]:"derived"`. That's a special internal label.

That label affects its behavior with `new`.

- When a regular function is executed with `new`, it creates an empty object and assigns it to `this`.
- But when a derived constructor runs, it doesn't do this. It expects the parent constructor to do this job.

So a derived constructor must call `super` in order to execute its parent (base) constructor, otherwise the object for `this` won't be created. And we'll get an error.

For the `Rabbit` constructor to work, it needs to call `super()` before using `this`, like here:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  // ...
}

class Rabbit extends Animal {

  constructor(name, earLength) {
*!*
    super(name);
*/!*
    this.earLength = earLength;
  }

  // ...
}

*!*
// endi yaxshi
let rabbit = new Rabbit("White Rabbit", 10);
alert(rabbit.name); // White Rabbit
alert(rabbit.earLength); // 10
*/!*
```

<<<<<<< HEAD

<<<<<<< HEAD
## Super: ichki qismlar, [[HomeObject]]

Keling, `super` ning qopqog'i ostiga biroz chuqurroq tushaylik. Yo'lda, biz qiziqarli narsalarni ko'rib chiqamiz.

Birinchidan, shu kungacha o'rgangan narsalarimizdan `super` ning ishlashi imkonsiz.

Ha, haqiqatan ham, keling, o'zimizga savol beraylik, bu texnik jihatdan qanday ishlashi mumkin? Obyekt usuli ishga tushganda, u joriy obyektni `this` deb oladi. Agar biz `super.method()` deb nomlasak, unda `usul` ni qanday olish kerak? Tabiiyki, biz `usulni` joriy obyekt prototipidan olishimiz kerak. Texnik jihatdan biz (yoki JavaScript interpretatori) buni qanday qila olamiz?

Ehtimol, biz `this` usulni `[[Prototype]]` dan `this.__ proto __.method` sifatida olishimiz mumkin? Afsuski, bu ishlamayapti.

Keling, buni qilishga harakat qilaylik. Klasslarsiz, oddiylik uchun oddiy obyektlardan foydalanamiz.

Bu yerda `rabbit.eat()` ota-ona obyektining `animal.eat()` usulini chaqirishi kerak:
=======

=======
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
### Overriding class fields: a tricky note

```warn header="Advanced note"
This note assumes you have a certain experience with classes, maybe in other programming languages.

It provides better insight into the language and also explains the behavior that might be a source of bugs (but not very often).

If you find it difficult to understand, just go on, continue reading, then return to it some time later.
```

We can override not only methods, but also class fields.

Although, there's a tricky behavior when we access an overridden field in parent constructor, quite different from most other programming languages.

Consider this example:

```js run
class Animal {
  name = 'animal';

  constructor() {
    alert(this.name); // (*)
  }
}

class Rabbit extends Animal {
  name = 'rabbit';
}

new Animal(); // animal
*!*
new Rabbit(); // animal
*/!*
```

Here, class `Rabbit` extends `Animal` and overrides the `name` field with its own value.

There's no own constructor in `Rabbit`, so `Animal` constructor is called.

What's interesting is that in both cases: `new Animal()` and `new Rabbit()`, the `alert` in the line `(*)` shows `animal`.

**In other words, the parent constructor always uses its own field value, not the overridden one.**

What's odd about it?

If it's not clear yet, please compare with methods.

Here's the same code, but instead of `this.name` field we call `this.showName()` method:

```js run
class Animal {
  showName() {  // instead of this.name = 'animal'
    alert('animal');
  }

  constructor() {
    this.showName(); // instead of alert(this.name);
  }
}

class Rabbit extends Animal {
  showName() {
    alert('rabbit');
  }
}

new Animal(); // animal
*!*
new Rabbit(); // rabbit
*/!*
```

Please note: now the output is different.

And that's what we naturally expect. When the parent constructor is called in the derived class, it uses the overridden method.

...But for class fields it's not so. As said, the parent constructor always uses the parent field.

Why is there a difference?

Well, the reason is the field initialization order. The class field is initialized:
- Before constructor for the base class (that doesn't extend anything),
- Immediately after `super()` for the derived class.

In our case, `Rabbit` is the derived class. There's no `constructor()` in it. As said previously, that's the same as if there was an empty constructor with only `super(...args)`.

So, `new Rabbit()` calls `super()`, thus executing the parent constructor, and (per the rule for derived classes) only after that its class fields are initialized. At the time of the parent constructor execution, there are no `Rabbit` class fields yet, that's why `Animal` fields are used.

This subtle difference between fields and methods is specific to JavaScript.

Luckily, this behavior only reveals itself if an overridden field is used in the parent constructor. Then it may be difficult to understand what's going on, so we're explaining it here.

If it becomes a problem, one can fix it by using methods or getters/setters instead of fields.

## Super: internals, [[HomeObject]]

```warn header="Advanced information"
If you're reading the tutorial for the first time - this section may be skipped.

It's about the internal mechanisms behind inheritance and `super`.
```

Let's get a little deeper under the hood of `super`. We'll see some interesting things along the way.

First to say, from all that we've learned till now, it's impossible for `super` to work at all!

Yeah, indeed, let's ask ourselves, how it should technically work? When an object method runs, it gets the current object as `this`. If we call `super.method()` then, the engine needs to get the `method` from the prototype of the current object. But how?

The task may seem simple, but it isn't. The engine knows the current object `this`, so it could get the parent `method` as `this.__proto__.method`. Unfortunately, such a "naive" solution won't work.

Let's demonstrate the problem. Without classes, using plain objects for the sake of simplicity.

You may skip this part and go below to the `[[HomeObject]]` subsection if you don't want to know the details. That won't harm. Or read on if you're interested in understanding things in-depth.

In the example below, `rabbit.__proto__ = animal`. Now let's try: in `rabbit.eat()` we'll call `animal.eat()`, using `this.__proto__`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let animal = {
  name: "Animal",
  eat() {
    alert(`${this.name} eats.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: "Rabbit",
  eat() {
*!*
    // shunday qilib super.eat() ishlashi mumkin
    this.__proto__.eat.call(this); // (*)
*/!*
  }
};

rabbit.eat(); // Rabbit eats.
```

`(*)` satrida prototip (`animal`) dan `eat` ni olib, uni joriy obyekt kontekstida chaqiramiz. Iltimos, shuni e'tiborga oling `.call(this)` bu yerda muhim ahamiyatga ega, chunki oddiy `this.__proto__.eat()` ota-ona `eat` emas, balki hozirgi obyekt, prototipi kontekstida ijro etadi.

Va yuqoridagi kodda u aslida maqsadga muvofiq ishlaydi: bizda to'g'ri `alert` mavjud.

Endi yana bitta obнektni zanjirga qo'shaylik. Ishlarning qanday buzilishini ko'rib chiqamiz:

```js run
let animal = {
  name: "Animal",
  eat() {
    alert(`${this.name} eats.`);
  }
};

let rabbit = {
  __proto__: animal,
  eat() {
    // ...quyon uslubida sakrash va ota-ona (hayvon) usulini chaqirish
    this.__proto__.eat.call(this); // (*)
  }
};

let longEar = {
  __proto__: rabbit,
  eat() {
    // ...uzun quloqlar bilan biror narsa qiling va ota-ona (quyon) usulini chaqirish
    this.__proto__.eat.call(this); // (**)
  }
};

*!*
longEar.eat(); // Error: Maximum call stack size exceeded
*/!*
```

Kod endi ishlamaydi! `longEar.eat()` ga chaqiruv qilishda xatolikni ko'rishimiz mumkin.

Ehtimol, bu unchalik aniq bo'lmasligi mumkin, ammo `longEar.eat()` chaqiruvini kuzatib boradigan bo'lsak, unda nima uchun ekanligini bilib olamiz. Ikkala satrda `(**)` va `(**)` qiymati `this` joriy obyekt (`longEar`). Bu juda muhim: barcha obyekt usullari joriy obyektni prototip yoki boshqa narsa emas, `this` deb oladi.

Shunday qilib, `(*)` va `(**)` satrlarining ikkalasida ham `this.__proto__` qiymati bir xil: `rabbit`. Ikkalasi ham cheksiz tsiklda zanjirni ko'tarmasdan `rabbit.eat` ni chaqiradi.

Mana nima sodir bo'lishining tasviri:

![](this-super-loop.svg)

1. `longEar.eat()` ichida `(**)` satri uni `this = longEar` bilan ta'minlab, `rabbit.eat` ni chaqiradi.
    ```js
    // longEar.eat() ichida bizda this = longEar mavjud
    this.__proto__.eat.call(this) // (**)
    // bo'ladi
    longEar.__proto__.eat.call(this)
    // bunaqa
    rabbit.eat.call(this);
    ```
2. Keyin `rabbit.eat` ning `(*)` satrida biz chaqiruvni zanjirda yanada yuqori darajaga yetkazishni xohlaymiz, ammo `this=longEar`, shuning uchun `this.__proto__.eat` yana `rabbit.eat`!

    ```js
    // rabbit.eat() ichida bizda this = longEar mavjud
    this.__proto__.eat.call(this) // (*)
    // bo'ladi
    longEar.__proto__.eat.call(this)
    // yoki (yana)
    rabbit.eat.call(this);
    ```

3. ...Shunday qilib, `rabbit.eat` o'zini cheksiz tsikldan chaqiradi, chunki u bundan keyin ham ko'tarila olmaydi.

Muammoni yolg'iz `this` yordamida hal qilib bo'lmaydi.

### `[[HomeObject]]`

Yechimni ta'minlash uchun JavaScript funktsiyalar uchun yana bitta maxsus ichki xususiyatni qo'shadi: `[[HomeObject]]`.

<<<<<<< HEAD
**Agar funktsiya klass yoki obyekt usuli sifatida ko'rsatilsa, uning `[[HomeObject]]` xususiyati shu obyektga aylanadi.**

Bu aslida "bog'lanmagan" funktsiyalar g'oyasini buzadi, chunki usullar o'z obyektlarini eslab qoladi. Va `[[HomeObject]]` ni o'zgartirish mumkin emas, shuning uchun bu abadiydir. Demak, bu tilda juda muhim o'zgarish.

Ammo bu o'zgarish xavfsizdir. `[[HomeObject]]` prototipni hal qilish uchun faqat `super` da ota-ona usullarini chaqirish uchun ishlatiladi. Shunday qilib, u moslikni buzmaydi.

Keling, oddiy narsalar yordamida yana qanday qilib `super` ishlashini ko'rib chiqamiz:
=======
When a function is specified as a class or object method, its `[[HomeObject]]` property becomes that object.

Then `super` uses it to resolve the parent prototype and its methods.

Let's see how it works, first with plain objects:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let animal = {
  name: "Animal",
  eat() {         // animal.eat.[[HomeObject]] == animal
    alert(`${this.name} eats.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: "Rabbit",
  eat() {         // rabbit.eat.[[HomeObject]] == rabbit
    super.eat();
  }
};

let longEar = {
  __proto__: rabbit,
  name: "Long Ear",
  eat() {         // longEar.eat.[[HomeObject]] == longEar
    super.eat();
  }
};

*!*
// works correctly
longEar.eat();  // Long Ear eats.
*/!*
```

<<<<<<< HEAD
Har qanday usul o'zining obyektini ichki `[[HomeObject]]` xususiyatida eslab qoladi. Keyin `super` uni ota-ona prototipini hal qilish uchun ishlatadi.

`[[HomeObject]]` klasslarda ham, oddiy obyektlarda ham aniqlangan usullar uchun belgilanadi. Ammo obyektlar uchun usullar aniq ko'rsatilgan tarzda ko'rsatilishi kerak:`"method: function()"` emas, balki `method()`.
=======
It works as intended, due to `[[HomeObject]]` mechanics. A method, such as `longEar.eat`, knows its `[[HomeObject]]` and takes the parent method from its prototype. Without any use of `this`.

### Methods are not "free"

As we've known before, generally functions are "free", not bound to objects in JavaScript. So they can be copied between objects and called with another `this`.

The very existence of `[[HomeObject]]` violates that principle, because methods remember their objects. `[[HomeObject]]` can't be changed, so this bond is forever.

The only place in the language where `[[HomeObject]]` is used -- is `super`. So, if a method does not use `super`, then we can still consider it free and copy between objects. But with `super` things may go wrong.

Here's the demo of a wrong `super` result after copying:

```js run
let animal = {
  sayHi() {
    alert(`I'm an animal`);
  }
};

// rabbit inherits from animal
let rabbit = {
  __proto__: animal,
  sayHi() {
    super.sayHi();
  }
};

let plant = {
  sayHi() {
    alert("I'm a plant");
  }
};

// tree inherits from plant
let tree = {
  __proto__: plant,
*!*
  sayHi: rabbit.sayHi // (*)
*/!*
};

*!*
tree.sayHi();  // I'm an animal (?!?)
*/!*
```

A call to `tree.sayHi()` shows "I'm an animal". Definitely wrong.

The reason is simple:
- In the line `(*)`, the method `tree.sayHi` was copied from `rabbit`. Maybe we just wanted to avoid code duplication?
- Its `[[HomeObject]]` is `rabbit`, as it was created in `rabbit`. There's no way to change `[[HomeObject]]`.
- The code of `tree.sayHi()` has `super.sayHi()` inside. It goes up from `rabbit` and takes the method from `animal`.

Here's the diagram of what happens:

![](super-homeobject-wrong.svg)

### Methods, not function properties

`[[HomeObject]]` is defined for methods both in classes and in plain objects. But for objects, methods must be specified exactly as `method()`, not as `"method: function()"`.

The difference may be non-essential for us, but it's important for JavaScript.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Quyidagi misolda taqqoslash uchun uslubiy bo'lmagan sintaksisdan foydalanilgan. `[[HomeObject]]` xususiyati o'rnatilmagan va meros ishlamaydi:

```js run
let animal = {
<<<<<<< HEAD
  eat: function() { // qisqa sintaksis bo'lishi kerak: eat() {...}
=======
  eat: function() { // intentionally writing like this instead of eat() {...
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    // ...
  }
};

let rabbit = {
  __proto__: animal,
  eat: function() {
    super.eat();
  }
};

*!*
rabbit.eat();  // Error calling super ([[HomeObject]] chunki yo'q)
*/!*
```

## Summary

1. To extend a class: `class Child extends Parent`:
    - That means `Child.prototype.__proto__` will be `Parent.prototype`, so methods are inherited.
2. When overriding a constructor:
    - We must call parent constructor as `super()` in `Child` constructor before using `this`.
3. When overriding another method:
    - We can use `super.method()` in a `Child` method to call `Parent` method.
4. Internals:
    - Methods remember their class/object in the internal `[[HomeObject]]` property. That's how `super` resolves parent methods.
    - So it's not safe to copy a method with `super` from one object to another.

Also:
- Arrow functions don't have their own `this` or `super`, so they transparently fit into the surrounding context.
