# Mixin

JavaScript-da biz faqat bitta obнektdan meros olishimiz mumkin. Obнekt uchun faqat bitta `[[Prototype]]` bo'lishi mumkin. Va klass faqat bitta klassni kengaytirishi mumkin.

<<<<<<< HEAD
Ba'zan bu bizni cheklab qo'yishi mumkin. Masalan, menda `StreetSweeper` va `Bicycle` klasslari bor va `StreetSweepingBicycle` ni qilishni xohlayman.

Yoki dasturlash haqida gapiradigan bo'lsak, bizda shablonlashni amalga oshiradigan `Renderer` klassi va voqealar bilan ishlashni amalga oshiradigan `EventEmitter` klassi mavjud va bu funktsiyalarni `Page` klassi bilan birlashtirmoqchi, shablonlardan foydalana oladigan sahifa yaratish va voqealarni chiqarishi uchun.
=======
But sometimes that feels limiting. For instance, we have a class `StreetSweeper` and a class `Bicycle`, and want to make their mix: a `StreetSweepingBicycle`.

Or we have a class `User` and a class `EventEmitter` that implements event generation, and we'd like to add the functionality of `EventEmitter` to `User`, so that our users can emit events.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Bu yerda yordam beradigan "mixin" deb nomlangan tushuncha mavjud.

<<<<<<< HEAD
Vikipediyada belgilanganidek, [mixin](https://en.wikipedia.org/wiki/Mixin) - bu boshqa klasslarning ota-onasi bo'lmasdan, boshqa klasslar tomonidan foydalanish usullarini o'z ichiga olgan klass.
=======
As defined in Wikipedia, a [mixin](https://en.wikipedia.org/wiki/Mixin) is a class containing methods that can be used by other classes without a need to inherit from it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Boshqacha qilib aytganda, *mixin* ma'lum bir xatti-harakatni amalga oshiradigan usullarni taqdim etadi, ammo biz uni yakka o'zini ishlatmaymiz, xatti-harakatni boshqa klasslarga qo'shish uchun foydalanamiz.

## Mixin misoli

<<<<<<< HEAD
JavaScript-da mixin yasashning eng oddiy usuli - bu foydali usullar yordamida obyektni yaratishdir, shunda biz ularni har qanday klass prototipiga osongina birlashtira olamiz.
=======
The simplest way to implement a mixin in JavaScript is to make an object with useful methods, so that we can easily merge them into a prototype of any class.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Masalan, bu yerda `sayHiMixin` mixinidan `User` uchun "nutq" qo'shilishi uchun foydalaniladi:

```js run
*!*
// mixin
*/!*
let sayHiMixin = {
  sayHi() {
    alert(`Salom ${this.name}`);
  },
  sayBye() {
    alert(`Hayir ${this.name}`);
  }
};

*!*
// foydalanish:
*/!*
class User {
  constructor(name) {
    this.name = name;
  }
}

// usullarini nusxalash
Object.assign(User.prototype, sayHiMixin);

// endi User salom deya oladi
new User("Dude").sayHi(); // Salom Dude!
```

<<<<<<< HEAD
Bu meros emas, balki nusxa ko'chirish usullari. Shunday qilib `User` boshqa bir klassni kengaytirishi va qo'shimcha usullarni "aralashtirish" ga mixinni qo'shishi mumkin, masalan:

=======
There's no inheritance, but a simple method copying. So `User` may inherit from another class and also include the mixin to "mix-in" the additional methods, like this:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
class User extends Person {
  // ...
}

Object.assign(User.prototype, sayHiMixin);
```

Mixinlar o'zlarida merosdan foydalanishlari mumkin.

Masalan, bu yerda `sayHiMixin` `sayMixin` dan meros bo'lib olinadi:

```js run
let sayMixin = {
  say(phrase) {
    alert(phrase);
  }
};

let sayHiMixin = {
<<<<<<< HEAD
  __proto__: sayMixin, // (yoki biz bu erda prototipni o'rnatish uchun Object.create-dan foydalanishimiz mumkin)
=======
  __proto__: sayMixin, // (or we could use Object.setPrototypeOf to set the prototype here)
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

  sayHi() {
    *!*
    // ota-ona usulini chaqirish
    */!*
<<<<<<< HEAD
    super.say(`Salom ${this.name}`);
  },
  sayBye() {
    super.say(`Hayir ${this.name}`);
=======
    super.say(`Hello ${this.name}`); // (*)
  },
  sayBye() {
    super.say(`Bye ${this.name}`); // (*)
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  }
};

class User {
  constructor(name) {
    this.name = name;
  }
}

// usullarini nusxalash
Object.assign(User.prototype, sayHiMixin);

// endi User salom deya oladi
new User("Dude").sayHi(); // Salom Dude!
```

<<<<<<< HEAD
Iltimos, shuni yodda tutingki, `sayHiMixin` dan `super.say()` ota-ona usuliga chaqiruv usulni klassidan emas, balki ushbu mixinning prototipidan qidiradi.

![](mixin-inheritance.svg)

Buning sababi, `sayHiMixin` ning usullari `[[HomeObject]]` ga o'rnatilgan. Demak, `super` aslida `User.__proto__` emas, balki `sayHiMixin.__ proto__` degan ma'noni anglatadi.
=======
Please note that the call to the parent method `super.say()` from `sayHiMixin` (at lines labelled with `(*)`) looks for the method in the prototype of that mixin, not the class.

Here's the diagram (see the right part):

![](mixin-inheritance.svg)

That's because methods `sayHi` and `sayBye` were initially created in `sayHiMixin`. So even though they got copied, their `[[HomeObject]]` internal property references `sayHiMixin`, as shown in the picture above.

<<<<<<< HEAD
As `super` looks for parent methods in `[[HomeObject]].[[Prototype]]`, that means it searches `sayHiMixin.[[Prototype]]`, not `User.[[Prototype]]`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
As `super` looks for parent methods in `[[HomeObject]].[[Prototype]]`, that means it searches `sayHiMixin.[[Prototype]]`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## EventMixin

Endi haqiqiy hayot uchun mixin yasaymiz.

<<<<<<< HEAD
Ko'p obyektlarning muhim xususiyati hodisalar bilan ishlashdir.

Ya'ni: biron bir muhim voqea sodir bo'lganda, obyekt "hodisani yaratish" uslubiga ega bo'lishi kerak va boshqa obyektlar bunday hodisalarni "tinglashi" kerak.

Hodisaning nomi bo'lishi kerak va qo'shimcha ravishda ba'zi qo'shimcha ma'lumotlarni to'plash kerak.

Masalan, `user` obyekti tashrif buyuruvchi tizimga kirganda `"login"` hodisasini yaratishi mumkin. Boshqa bir `calendar` esa ushbu tizimga kirgan shaxs uchun taqvimni yuklash uchun bunday hodisalarni qabul qilishi mumkin.

Yoki, menyu elementi tanlanganida, `menu` hodisani `"select"` ni yaratishi mumkin va boshqa obyektlar ushbu ma'lumotni olishni va shu hodisaga munosabat bildirishni xohlashlari mumkin.

Hodisalar - bu istagan har bir kishiga "ma'lumot almashish" usulidir. Ular har qanday klassga foydali bo'lishi mumkin, shuning uchun ular uchun mixin tayyorlaymiz:
=======
An important feature of many browser objects (for instance) is that they can generate events. Events are a great way to "broadcast information" to anyone who wants it. So let's make a mixin that allows us to easily add event-related functions to any class/object.

- The mixin will provide a method `.trigger(name, [...data])` to "generate an event" when something important happens to it. The `name` argument is a name of the event, optionally followed by additional arguments with event data.
- Also the method `.on(name, handler)` that adds `handler` function as the listener to events with the given name. It will be called when an event with the given `name` triggers, and get the arguments from the `.trigger` call.
- ...And the method `.off(name, handler)` that removes the `handler` listener.

After adding the mixin, an object `user` will be able to generate an event `"login"` when the visitor logs in. And another object, say, `calendar` may want to listen for such events to load the calendar for the logged-in person.

Or, a `menu` can generate the event `"select"` when a menu item is selected, and other objects may assign handlers to react on that event. And so on.

Here's the code:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let eventMixin = {
  /**
   * Hodisaga obuna bo'lish, foydalanish:
   *  menu.on('select', function(item) { ... }
  */
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(handler);
  },

  /**
   * Obunani bekor qilish, foydalanish:
   *  menu.off('select', handler)
   */
  off(eventName, handler) {
    let handlers = this._eventHandlers?.[eventName];
    if (!handlers) return;
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === handler) {
        handlers.splice(i--, 1);
      }
    }
  },

  /**
<<<<<<< HEAD
   * Hodisani yarating va unga ma'lumotlarni biriktiring
   *  this.trigger('select', data1, data2);
   */
  trigger(eventName, ...args) {
    if (!this._eventHandlers || !this._eventHandlers[eventName]) {
      return; // ushbu hodisa nomi uchun ishlovchilar yo'q
=======
   * Generate an event with the given name and data
   *  this.trigger('select', data1, data2);
   */
  trigger(eventName, ...args) {
    if (!this._eventHandlers?.[eventName]) {
      return; // no handlers for that event name
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    }

    // ishlovchilarni chaqiring
    this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
  }
};
```

<<<<<<< HEAD
Bu yerda uchta usul mavjud:

1. `.on(eventName, handler)` -- ushbu nom bilan hodisa sodir bo'lganda ishlash uchun `handler` funktsiyasini tayinlaydi. Ishlovchilar `_eventHandlers` xususiyatida saqlanadi.
2. `.off(eventName, handler)` -- funktsiyani ishlovchilar ro'yxatidan olib tashlaydi.
3. `.trigger(eventName, ...args)` -- hodisani yaratadi: tayinlangan barcha ishlov beruvchilar chaqiriladi va ularga argument sifatida `args` beriladi.
=======
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

- `.on(eventName, handler)` -- assigns function `handler` to run when the event with that name occurs. Technically, there's an `_eventHandlers` property that stores an array of handlers for each event name, and it just adds it to the list.
- `.off(eventName, handler)` -- removes the function from the handlers list.
- `.trigger(eventName, ...args)` -- generates the event: all handlers from `_eventHandlers[eventName]` are called, with a list of arguments `...args`.

Foydalanish:

```js run
// Klass qiling
class Menu {
  choose(value) {
    this.trigger("select", value);
  }
}
<<<<<<< HEAD
// Mixin qo'shing
=======
// Add the mixin with event-related methods
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

<<<<<<< HEAD
// tanlov bo'yicha ishlov beruvchini chaqiring:
=======
// add a handler, to be called on selection:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
*!*
menu.on("select", value => alert(`Qiymat tanlandi: ${value}`));
*/!*

<<<<<<< HEAD
// hodisani qo'zg'atadi => tanlangan qiymatni ko'rsatadi: 123
menu.choose("123"); // Qiymat tanlandi
```

Endi bizda foydalanuvchi tanloviga munosabat bildirish kodi bo'lsa, uni `menu.on(...)` bilan bog'lashimiz mumkin.

Va `eventMixin` meros zanjiriga aralashmasdan, biz xohlagancha klasslarga bunday xatti-harakatlarni qo'shishi mumkin.
=======
// triggers the event => the handler above runs and shows:
// Value selected: 123
menu.choose("123");
```

Now, if we'd like any code to react to a menu selection, we can listen for it with `menu.on(...)`.

And `eventMixin` mixin makes it easy to add such behavior to as many classes as we'd like, without interfering with the inheritance chain.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Xulosa

*Mixin* -- umumiy obyektga yo'naltirilgan dasturlash atamasi: boshqa klasslar uchun usullarni o'z ichiga olgan klass.

<<<<<<< HEAD
Ba'zi boshqa tillar, masalan, python bir nechta merosdan foydalanib mixinlar yaratishga imkon beradi. JavaScript bir nechta merosni qo'llab-quvvatlamaydi, ammo mixinlar ularni prototipga nusxalash orqali amalga oshirilishi mumkin.

Biz mixinlarni klassini bir nechta xatti-harakatlar bilan oshirish usuli sifatida ishlatishimiz mumkin, masalan, yuqorida aytib o'tganimizdek hodisalarni boshqarish.

Agar ular vaqti-vaqti bilan mahalliy klass usullarini ustiga yozib qo'ysalar, mixinlar to'qnashuvlar nuqtasiga aylanishi mumkin. Umuman olganda, bunday imkoniyatni minimallashtirish uchun mixin nomlanishi haqida yaxshi o'ylash kerak.
=======
Some other languages allow multiple inheritance. JavaScript does not support multiple inheritance, but mixins can be implemented by copying methods into prototype.

We can use mixins as a way to augment a class by adding multiple behaviors, like event-handling as we have seen above.

Mixins may become a point of conflict if they accidentally overwrite existing class methods. So generally one should think well about the naming methods of a mixin, to minimize the probability of that happening.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
