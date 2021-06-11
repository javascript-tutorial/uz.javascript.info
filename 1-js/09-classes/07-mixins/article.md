# Mixin

JavaScript-da biz faqat bitta obнektdan meros olishimiz mumkin. Obнekt uchun faqat bitta `[[Prototype]]` bo'lishi mumkin. Va klass faqat bitta klassni kengaytirishi mumkin.

Ba'zan bu bizni cheklab qo'yishi mumkin. Masalan, menda `StreetSweeper` va `Bicycle` klasslari bor va `StreetSweepingBicycle` ni qilishni xohlayman.

Yoki dasturlash haqida gapiradigan bo'lsak, bizda shablonlashni amalga oshiradigan `Renderer` klassi va voqealar bilan ishlashni amalga oshiradigan `EventEmitter` klassi mavjud va bu funktsiyalarni `Page` klassi bilan birlashtirmoqchi, shablonlardan foydalana oladigan sahifa yaratish va voqealarni chiqarishi uchun.

Bu yerda yordam beradigan "mixin" deb nomlangan tushuncha mavjud.

Vikipediyada belgilanganidek, [mixin](https://en.wikipedia.org/wiki/Mixin) - bu boshqa klasslarning ota-onasi bo'lmasdan, boshqa klasslar tomonidan foydalanish usullarini o'z ichiga olgan klass.

Boshqacha qilib aytganda, *mixin* ma'lum bir xatti-harakatni amalga oshiradigan usullarni taqdim etadi, ammo biz uni yakka o'zini ishlatmaymiz, xatti-harakatni boshqa klasslarga qo'shish uchun foydalanamiz.

## Mixin misoli

JavaScript-da mixin yasashning eng oddiy usuli - bu foydali usullar yordamida obyektni yaratishdir, shunda biz ularni har qanday klass prototipiga osongina birlashtira olamiz.

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

Bu meros emas, balki nusxa ko'chirish usullari. Shunday qilib `User` boshqa bir klassni kengaytirishi va qo'shimcha usullarni "aralashtirish" ga mixinni qo'shishi mumkin, masalan:


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
  __proto__: sayMixin, // (yoki biz bu erda prototipni o'rnatish uchun Object.create-dan foydalanishimiz mumkin)

  sayHi() {
    *!*
    // ota-ona usulini chaqirish
    */!*
    super.say(`Salom ${this.name}`);
  },
  sayBye() {
    super.say(`Hayir ${this.name}`);
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

Iltimos, shuni yodda tutingki, `sayHiMixin` dan `super.say()` ota-ona usuliga chaqiruv usulni klassidan emas, balki ushbu mixinning prototipidan qidiradi.

![](mixin-inheritance.svg)

Buning sababi, `sayHiMixin` ning usullari `[[HomeObject]]` ga o'rnatilgan. Demak, `super` aslida `User.__proto__` emas, balki `sayHiMixin.__ proto__` degan ma'noni anglatadi.

## EventMixin

Endi haqiqiy hayot uchun mixin yasaymiz.

Ko'p obyektlarning muhim xususiyati hodisalar bilan ishlashdir.

Ya'ni: biron bir muhim voqea sodir bo'lganda, obyekt "hodisani yaratish" uslubiga ega bo'lishi kerak va boshqa obyektlar bunday hodisalarni "tinglashi" kerak.

Hodisaning nomi bo'lishi kerak va qo'shimcha ravishda ba'zi qo'shimcha ma'lumotlarni to'plash kerak.

Masalan, `user` obyekti tashrif buyuruvchi tizimga kirganda `"login"` hodisasini yaratishi mumkin. Boshqa bir `calendar` esa ushbu tizimga kirgan shaxs uchun taqvimni yuklash uchun bunday hodisalarni qabul qilishi mumkin.

Yoki, menyu elementi tanlanganida, `menu` hodisani `"select"` ni yaratishi mumkin va boshqa obyektlar ushbu ma'lumotni olishni va shu hodisaga munosabat bildirishni xohlashlari mumkin.

Hodisalar - bu istagan har bir kishiga "ma'lumot almashish" usulidir. Ular har qanday klassga foydali bo'lishi mumkin, shuning uchun ular uchun mixin tayyorlaymiz:

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
    let handlers = this._eventHandlers && this._eventHandlers[eventName];
    if (!handlers) return;
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === handler) {
        handlers.splice(i--, 1);
      }
    }
  },

  /**
   * Hodisani yarating va unga ma'lumotlarni biriktiring
   *  this.trigger('select', data1, data2);
   */
  trigger(eventName, ...args) {
    if (!this._eventHandlers || !this._eventHandlers[eventName]) {
      return; // ushbu hodisa nomi uchun ishlovchilar yo'q
    }

    // ishlovchilarni chaqiring
    this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
  }
};
```

Bu yerda uchta usul mavjud:

1. `.on(eventName, handler)` -- ushbu nom bilan hodisa sodir bo'lganda ishlash uchun `handler` funktsiyasini tayinlaydi. Ishlovchilar `_eventHandlers` xususiyatida saqlanadi.
2. `.off(eventName, handler)` -- funktsiyani ishlovchilar ro'yxatidan olib tashlaydi.
3. `.trigger(eventName, ...args)` -- hodisani yaratadi: tayinlangan barcha ishlov beruvchilar chaqiriladi va ularga argument sifatida `args` beriladi.


Foydalanish:

```js run
// Klass qiling
class Menu {
  choose(value) {
    this.trigger("select", value);
  }
}
// Mixin qo'shing
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

// tanlov bo'yicha ishlov beruvchini chaqiring:
*!*
menu.on("select", value => alert(`Qiymat tanlandi: ${value}`));
*/!*

// hodisani qo'zg'atadi => tanlangan qiymatni ko'rsatadi: 123
menu.choose("123"); // Qiymat tanlandi
```

Endi bizda foydalanuvchi tanloviga munosabat bildirish kodi bo'lsa, uni `menu.on(...)` bilan bog'lashimiz mumkin.

Va `eventMixin` meros zanjiriga aralashmasdan, biz xohlagancha klasslarga bunday xatti-harakatlarni qo'shishi mumkin.

## Xulosa

*Mixin* -- umumiy obyektga yo'naltirilgan dasturlash atamasi: boshqa klasslar uchun usullarni o'z ichiga olgan klass.

Ba'zi boshqa tillar, masalan, python bir nechta merosdan foydalanib mixinlar yaratishga imkon beradi. JavaScript bir nechta merosni qo'llab-quvvatlamaydi, ammo mixinlar ularni prototipga nusxalash orqali amalga oshirilishi mumkin.

Biz mixinlarni klassini bir nechta xatti-harakatlar bilan oshirish usuli sifatida ishlatishimiz mumkin, masalan, yuqorida aytib o'tganimizdek hodisalarni boshqarish.

Agar ular vaqti-vaqti bilan mahalliy klass usullarini ustiga yozib qo'ysalar, mixinlar to'qnashuvlar nuqtasiga aylanishi mumkin. Umuman olganda, bunday imkoniyatni minimallashtirish uchun mixin nomlanishi haqida yaxshi o'ylash kerak.
