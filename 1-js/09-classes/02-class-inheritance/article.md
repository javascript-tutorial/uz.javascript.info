
# Klass merosi

Aytaylik, bizda ikkita klass bor.

`Animal`:

```js
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

let animal = new Animal("Mening hayvonim");
```

![](rabbit-animal-independent-animal.svg)


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

Endi `Rabbit` kodi biroz qisqartirildi, chunki u sukut bo'yicha `Animal` konstruktoridan foydalanadi va u ham hayvonlar kabi `yugurishi` mumkin.

`Rabbit.prototype` dan `Animal.prototype` ga `extends` kalit so'zi `[[Prototype]]` qo'shadi:

![](animal-rabbit-extends.svg)

Shunday qilib, agar `Rabbit.prototype` da usul topilmasa, JavaScript uni `Animal.prototype` dan oladi.

<info:native-prototypes> bobidan eslaganimizdek, JavaScript-da o'rnatilgan obyektlar uchun bir xil prototip meros ishlatiladi. Masalan, `Date.prototype.[[Prototype]]` `Object.prototype` dir, shuning uchun sanalar umumiy obyekt usullariga ega.

````smart header="`extends` dan keyin har qanday ifodaga ruxsat beriladi"
Sinf sintaksisi nafaqat klassni, balki `kengaytirilgan` dan keyin har qanday ifodani belgilashga imkon beradi.

Masalan, ota-klassni yaratadigan funktsiya chaqiruvi:

```js run
function f(phrase) {
  return class {
    sayHi() { alert(phrase) }
  }
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

Endi oldinga siljiymiz va usulni bekor qilamiz. Hozirga kelib, `Rabbit` `Animal` dan `this.speed = 0` ni o'rnatadigan `stop` usulini egallaydi.

Agar biz Rabbit-da o'zimizning `stop`-ni belgilasak, u holda u ishlatiladi:

```js
class Rabbit extends Animal {
  stop() {
    // ...this will be used for rabbit.stop()
  }
}
```


...Ammo, odatda, biz ota-ona usulini butunlay almashtirishni xohlamaymiz, aksincha uning ustiga qurish, uning funktsiyalarini o'zgartirish yoki kengaytirishni xohlaymiz. Biz o'z usulimiz bilan biron bir narsani qilamiz, lekin oldin yoki keyin yoki jarayonda ota-ona usulini chaqiramiz.

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
    this.speed += speed;
    alert(`${this.name} ${this.speed} tezlikda yuguradi.`);
  }

  stop() {
    this.speed = 0;
    alert(`${this.name} to'xtadi.`);
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

rabbit.run(5); // White Rabbit 5 tezlikda yuguradi.
rabbit.stop(); // White Rabbit to'xtadi. White rabbit bekinadi!
```

Endi `Rabbit` bu jarayonda ota-onani `super.stop()` deb ataydigan `to'xtatish` uslubiga ega.

````smart header="O'q funktsiyalarida "super" yo'q"
<info:arrow-functions> bobida aytib o'tilganidek, o'q funktsiyalari `super` ga ega emas.

Agar unga kirish imkoni bo'lsa, u tashqi funktsiyadan olingan. Misol uchun:
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


## Konstruktorni bekor qilish

Konstruktorlar bilan bu biroz hiyla-nayrangga aylanadi.

Hozirgacha `Rabbit` ning o'zining `konstruktori` yo'q edi.

[Spetsifikatsiyaga](https://tc39.github.io/ecma262/#sec-runtime-semantics-classdefinitionevaluation) muvofiq, agar klass boshqa klassni kengaytirsa va `konstruktor` bo'lmasa, u holda quyidagi `konstruktor` hosil bo'ladi :

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

Qisqa javob: meros klaslarida konstruktorlar `super(...)` ni chaqirishlari kerak va (!) buni `this` ishlatishdan oldin qilishlari kerak.

...Lekin nega? Bu yerda nima bo'layapti? Darhaqiqat, talab g'alati tuyuladi.

Albatta, tushuntirish mavjud. Keling, tafsilotlarni ko'rib chiqaylik, shunda siz nima bo'layotganini tushunasiz.

JavaScript-da, "merosxo'r sinfning konstruktor funktsiyasi" va boshqalari o'rtasida farq bor. Meros klassida tegishli konstruktor funktsiyasi maxsus ichki xususiyat bilan belgilanadi `[[ConstructorKind]]:"derived"`.

Farqi:

- Oddiy konstruktor ishlayotganda, bo'sh obyektni `this` qilib yaratadi va shu bilan davom etadi.
- Ammo hosil bo'lgan konstruktor ishga tushganda, buni qilmaydi. Bu ishni ota-ona konstruktor bajarishini kutadi.

Agar biz o'zimiz konstruktor qilsak, biz `super` ni chaqirishimiz kerak, chunki aks holda `this` ga havola qilingan obyekt yaratilmaydi. Va biz xato qilamiz.

`Rabbit` ishlashi uchun biz `this` dan foydalanishdan oldin `super()` ni chaqirishimiz kerak, masalan:

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


## Super: ichki qismlar, [[HomeObject]]

Keling, `super` ning qopqog'i ostiga biroz chuqurroq tushaylik. Yo'lda, biz qiziqarli narsalarni ko'rib chiqamiz.

Birinchidan, shu kungacha o'rgangan narsalarimizdan `super` ning ishlashi imkonsiz.

Ha, haqiqatan ham, keling, o'zimizga savol beraylik, bu texnik jihatdan qanday ishlashi mumkin? Obyekt usuli ishga tushganda, u joriy obyektni `this` deb oladi. Agar biz `super.method()` deb nomlasak, unda `usul` ni qanday olish kerak? Tabiiyki, biz `usulni` joriy obyekt prototipidan olishimiz kerak. Texnik jihatdan biz (yoki JavaScript interpretatori) buni qanday qila olamiz?

Ehtimol, biz `this` usulni `[[Prototype]]` dan `this.__ proto __.method` sifatida olishimiz mumkin? Afsuski, bu ishlamayapti.

Keling, buni qilishga harakat qilaylik. Klasslarsiz, oddiylik uchun oddiy obyektlardan foydalanamiz.

Bu yerda `rabbit.eat()` ota-ona obyektining `animal.eat()` usulini chaqirishi kerak:

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

**Agar funktsiya klass yoki obyekt usuli sifatida ko'rsatilsa, uning `[[HomeObject]]` xususiyati shu obyektga aylanadi.**

Bu aslida "bog'lanmagan" funktsiyalar g'oyasini buzadi, chunki usullar o'z obyektlarini eslab qoladi. Va `[[HomeObject]]` ni o'zgartirish mumkin emas, shuning uchun bu abadiydir. Demak, bu tilda juda muhim o'zgarish.

Ammo bu o'zgarish xavfsizdir. `[[HomeObject]]` prototipni hal qilish uchun faqat `super` da ota-ona usullarini chaqirish uchun ishlatiladi. Shunday qilib, u moslikni buzmaydi.

Keling, oddiy narsalar yordamida yana qanday qilib `super` ishlashini ko'rib chiqamiz:

```js run
let animal = {
  name: "Animal",
  eat() {         // [[HomeObject]] == animal
    alert(`${this.name} eats.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: "Rabbit",
  eat() {         // [[HomeObject]] == rabbit
    super.eat();
  }
};

let longEar = {
  __proto__: rabbit,
  name: "Long Ear",
  eat() {         // [[HomeObject]] == longEar
    super.eat();
  }
};

*!*
longEar.eat();  // Long Ear eats.
*/!*
```

Har qanday usul o'zining obyektini ichki `[[HomeObject]]` xususiyatida eslab qoladi. Keyin `super` uni ota-ona prototipini hal qilish uchun ishlatadi.

`[[HomeObject]]` klasslarda ham, oddiy obyektlarda ham aniqlangan usullar uchun belgilanadi. Ammo obyektlar uchun usullar aniq ko'rsatilgan tarzda ko'rsatilishi kerak:`"method: function()"` emas, balki `method()`.

Quyidagi misolda taqqoslash uchun uslubiy bo'lmagan sintaksisdan foydalanilgan. `[[HomeObject]]` xususiyati o'rnatilmagan va meros ishlamaydi:

```js run
let animal = {
  eat: function() { // qisqa sintaksis bo'lishi kerak: eat() {...}
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
