# Klass meros olish (Class inheritance)

Klass meros olish — bu bitta klassni boshqasidan kengaytirish (extend) usuli.

Shunday qilib, biz mavjud funksionallik ustiga yangi funksionallik qo‘shishimiz mumkin.

## `extends` kalit so‘zi

Keling, bizda `Animal` klassi bor, deylik:

```js
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    alert(`${this.name} ${this.speed} tezlikda yugurmoqda.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} joyida to‘xtadi.`);
  }
}

let animal = new Animal("Mening hayvonim");
```

`animal` obyektini va `Animal` klassini grafik ko‘rinishda tasavvur qilishimiz mumkin:

![](rabbit-animal-independent-animal.svg)

...Endi biz `Rabbit` nomli boshqa klass yaratmoqchimiz.

Quyonlar ham hayvon bo‘lgani uchun, `Rabbit` klassi `Animal` asosida bo‘lishi kerak. Shunday qilib, u hayvon metodlariga ham ega bo‘ladi va qo‘shimcha ravishda o‘zining metodlariga ham ega bo‘ladi.

Sintaksis: `class Bola extends Ota`.

Keling, `Animal`dan meros oluvchi `Rabbit` klassini yarataylik:

```js
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} yashirinmoqda!`);
  }
}

let rabbit = new Rabbit("Oq Quyon");

rabbit.run(5); // Oq Quyon 5 tezlikda yugurmoqda.
rabbit.hide(); // Oq Quyon yashirinmoqda!
```

`Rabbit` klassidan olingan obyekt ham `Rabbit` metodlariga (masalan, `rabbit.hide()`), ham `Animal` metodlariga (masalan, `rabbit.run()`) ega.

`extends` kalit so‘zi ichki ishlash jarayonida prototip mexanizmidan foydalanadi. U `Rabbit.prototype.[[Prototype]]`ni `Animal.prototype`ga o‘rnatadi. Agar metod `Rabbit.prototype`da topilmasa, JavaScript uni `Animal.prototype`dan qidiradi.

![](animal-rabbit-extends.svg)

Metodni qidirish jarayoni (masalan `rabbit.run`):

1. `rabbit` obyektida qidiradi (`run` yo‘q).
2. `Rabbit.prototype`da qidiradi (`hide` bor, `run` yo‘q).
3. `Animal.prototype`da qidiradi (bu yerda `run` mavjud).

JavaScript’ning o‘zidagi built-in obyektlar ham shu meros olish mexanizmidan foydalanadi. Masalan, `Date.prototype.[[Prototype]]` bu `Object.prototype`.

## Metodni qayta yozish (Overriding a method)

Agar `Rabbit` klassida yangi metod yozmasak, u avtomatik ravishda `Animal` metodlaridan foydalanadi.  
Lekin agar biz o‘zimiz metod yozsak, u holda eski metod o‘rniga yangisi ishlatiladi:

```js
class Rabbit extends Animal {
  stop() {
    // endi bu metod `rabbit.stop()` chaqirilganda ishlatiladi
  }
}
```

Ko‘pincha biz ota metodni butunlay almashtirishni istamaymiz, balki uning ustiga qo‘shimcha logika qo‘shmoqchimiz. Buning uchun `super` kalit so‘zi ishlatiladi:

- `super.method(...)` → ota metodni chaqirish.
- `super(...)` → ota konstruktorga murojaat (faqat konstruktor ichida).

Misol: quyon to‘xtaganda avtomatik yashirinsin:

```js
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} yashirinmoqda!`);
  }

  stop() {
    super.stop(); // ota klassning stop() metodi
    this.hide(); // qo‘shimcha xatti-harakat
  }
}
```

## Konstruktorni qayta yozish (Overriding constructor)

Agar bola klassda konstruktor yozilmasa, u avtomatik ravishda ota konstruktorni chaqiradigan “bo‘sh” konstruktor yaratiladi:

```js
class Rabbit extends Animal {
  constructor(...args) {
    super(...args);
  }
}
```

Agar o‘zimiz konstruktor yozsak, **albatta `super(...)`ni chaqirishimiz shart**. Aks holda `this` mavjud bo‘lmaydi va xato chiqadi.

```js
class Rabbit extends Animal {
  constructor(name, earLength) {
    super(name); // ota klass konstruktorini chaqirish
    this.earLength = earLength;
  }
}
```

## Muhim eslatma: metodlar va maydonlarni (fields) qayta yozish

Metodlar qayta yozilganda ota klass konstruktori yangisini chaqiradi.  
Lekin klass maydonlari (fields) bilan bunday emas — ular faqat `super()`dan keyin ishga tushadi. Shu sababli ota konstruktor ichida doim ota klass maydoni ishlatiladi.

Misol:

```js
class Animal {
  name = "animal";
  constructor() {
    alert(this.name);
  }
}

class Rabbit extends Animal {
  name = "rabbit";
}

new Rabbit(); // animal
```

Metodlar esa boshqacha ishlaydi — ular qayta yozilganda yangisi ishlaydi.

## Xulosa

1. Klassni kengaytirish: `class Bola extends Ota`.
   - `Bola.prototype.__proto__ = Ota.prototype`
2. Konstruktor qayta yozilganda:
   - `super()` chaqirilishi kerak va `this` dan oldin bo‘lishi shart.
3. Metodlarni qayta yozishda:
   - `super.method()` orqali ota metodni chaqirish mumkin.
4. Ichki mexanizmlar:
   - Metodlar `[[HomeObject]]`ga ega va shu orqali `super` ishlaydi.
   - `super` ishlatadigan metodni boshqa obyektga ko‘chirish mumkin emas.

> Eslatma: Arrow function’larda o‘zining `this` yoki `super`i yo‘q, ular tashqi kontekstdan foydalanadi.
