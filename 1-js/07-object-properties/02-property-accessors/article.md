
# getters va setters xususiyatlar

<<<<<<< HEAD
Xususiyatlarning ikki turi mavjud.

Birinchi tur *ma'lumotlar xususiyatlari*. Biz allaqachon ular bilan qanday ishlashni bilamiz. Aslida, biz hozirgacha ishlatib kelayotgan barcha xususiyatlar ma'lumotlar xususiyatlari edi.

Ikkinchi turdagi xususiyatlar - bu yangi narsa. Bu *kiruvchi xususiyatlar*. Ular asosan qiymatni olish va sozlash bo'yicha ishlaydigan funktsiyalardir, ammo tashqi kodning odatiy xususiyatlariga o'xshaydi.
=======
There are two kinds of object properties.

The first kind is *data properties*. We already know how to work with them. All properties that we've been using until now were data properties.

<<<<<<< HEAD
The second type of properties is something new. It's *accessor properties*. They are essentially functions that execute on getting and setting a value, but look like regular properties to an external code.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
The second type of property is something new. It's an *accessor property*. They are essentially functions that execute on getting and setting a value, but look like regular properties to an external code.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

## Getters va setters

Kiruvchi xususiyatlari "getter" va "setter" usullari bilan ifodalanadi. Obyektda ular `get` va `set` bilan belgilanadi:

```js
let obj = {
  *!*get propName()*/!* {
    // getter, obj.propName olishda bajarilgan kod
  },

  *!*set propName(value)*/!* {
    // setter, obj.propName = value ni o'rnatishda bajarilgan kod
  }
};
```

Getter `obj.propName` o'qilganda ishlaydi, setter - tayinlanganda.

Masalan, bizda `user` obyekti `ismi` va `familiyasi` mavjud:

```js
let user = {
  name: "John",
  surname: "Smith"
};
```

<<<<<<< HEAD
Endi biz "to'liq nom" xususiyatini qo'shmoqchimiz, bu "Jon Smit" bo'lishi kerak. Albatta, biz mavjud ma'lumotlarni nusxa ko'chirishni xohlamaymiz, shuning uchun biz uni kiruvchi sifatida amalga oshirishimiz mumkin:
=======
Now we want to add a `fullName` property, that should be `"John Smith"`. Of course, we don't want to copy-paste existing information, so we can implement it as an accessor:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let user = {
  name: "John",
  surname: "Smith",

*!*
  get fullName() {
    return `${this.name} ${this.surname}`;
  }
*/!*
};

*!*
alert(user.fullName); // John Smith
*/!*
```

<<<<<<< HEAD
Tashqaridan, kiruvchining xususiyati odatdagidek ko'rinadi. Kiruvchi xususiyatlarining g'oyasi shu. `user.fullName` funktsiyadak *chaqiurmaymiz*, odatdagidek *o'qiymiz*: getter sahna ortida ishlaydi.

Hozirga kelib, `fullName` faqat getter ga ega. Agar `user.fullName=` ni belgilashga harakat qilsak, xato bo'ladi.
=======
From the outside, an accessor property looks like a regular one. That's the idea of accessor properties. We don't *call* `user.fullName` as a function, we *read* it normally: the getter runs behind the scenes.

As of now, `fullName` has only a getter. If we attempt to assign `user.fullName=`, there will be an error:

```js run
let user = {
  get fullName() {
    return `...`;
  }
};

*!*
user.fullName = "Test"; // Error (property has only a getter)
*/!*
```
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Buni `user.fullName` uchun setter qo'shib tuzatamiz:

```js run
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

*!*
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
};

// set fullName berilgan qiymat bilan bajariladi.
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper
```

<<<<<<< HEAD
Endi bizda "virtual" xususiyat mavjud. Bu o'qilishi mumkin va yozilishi mumkin, lekin aslida mavjud emas.

```smart header="Kiruvchi xususiyatlariga faqat get/set orqali kirish mumkin"
Xususiyat `get prop()` yoki `set prop()` bilan aniqlangandan so'ng, bu ma'lumotlarning xususiyati emas, balki kiruvchi xususiyatdir.

- Agar getter bo'lsa -- biz `object.prop` ni o'qiymiz, yoki biz o'qiy olmaymiz.
- Agar setter bo'lsa -- biz `object.prop=...` ni o'rnatamiz, yoki biz qila olmaymiz.

Va har qanday holatda ham biz kiruvchi xususiyatini `o'chirib tashlay olmaymiz`.
```

=======
As the result, we have a "virtual" property `fullName`. It is readable and writable.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Kiruvchi tavsiflovchilari(deskriptorlar)

<<<<<<< HEAD
Ma'lumotlar xususiyatlari bilan taqqoslaganda, kiruvchi xususiyatlari uchun tavsiflovchilar har xil.

Kiruvchi xususiyatlari uchun `value` va `writeable` mavjud emas, aksincha `get` va `set` funktsiyalari mavjud.

Shunday qilib, kiruvchi deskriptor quyidagilarga ega bo'lishi mumkin:
=======
Descriptors for accessor properties are different from those for data properties.

For accessor properties, there is no `value` or `writable`, but instead there are `get` and `set` functions.

That is, an accessor descriptor may have:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

- **`get`** -- argumentlarsiz funktsiya, xususiyat o'qilganda ishlaydi,
- **`set`** -- xususiyati o'rnatilganda chaqiriladigan bitta argumentli funktsiya,
- **`enumerable`** -- ma'lumotlar xususiyatlari bilan bir xil,
- **`configurable`** -- ma'lumotlar xususiyatlari bilan bir xil.

Masalan, `defineProperty` bilan `fullName` ga kirish vositasini yaratish uchun biz `get` va `set` bilan deskriptorni topshirishimiz mumkin:

```js run
let user = {
  name: "John",
  surname: "Smith"
};

*!*
Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
});

alert(user.fullName); // John Smith

for(let key in user) alert(key); // name, surname
```

<<<<<<< HEAD
Iltimos, yana bir bor e'tibor bering, xususiyat ikkalasi ham emas, balki kiruvchi yoki ma'lumotlar xususiyati bo'lishi mumkin.
=======
Please note that a property can be either an accessor (has `get/set` methods) or a data property (has a `value`), not both.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Agar biz bir xil deskriptorda `get` va `value` ni berishga harakat qilsak, xato bo'ladi:

```js run
*!*
// Error: Invalid property descriptor.
*/!*
Object.defineProperty({}, 'prop', {
  get() {
    return 1
  },

  value: 2
});
```

## Aqlli getters/setters

<<<<<<< HEAD
Getters/setters "real" xususiyat qiymatlari ustidan ko'proq nazoratni olish uchun ularni o'ram sifatida ishlatilishi mumkin.

Masalan, `user` uchun juda qisqa nomlarni taqiqlashni istasak, `name` ni `_name` maxsus xususiyatida saqlashimiz mumkin. Va setter tayinlashlarni filtrlash:
=======
Getters/setters can be used as wrappers over "real" property values to gain more control over operations with them.

For instance, if we want to forbid too short names for `user`, we can have a setter `name` and keep the value in a separate property `_name`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      alert("Ism juda qisqa, kamida 4 ta belgi kerak");
      return;
    }
    this._name = value;
  }
};

user.name = "Pete";
alert(user.name); // Pete

user.name = ""; // Ism juda qisqa...
```

<<<<<<< HEAD
Texnik jihatdan, tashqi kod `user._name` yordamida to'g'ridan-to'g'ri nomga kirishi mumkin. Ammo `"_"` "pastki chizig'i bilan boshlanadigan xususiyatlar ichki xususiyatga ega va obyekt tashqarisidan ularga tegmaslik kerakligi to'g'risida keng tarqalgan kelishuv mavjud.
=======
So, the name is stored in `_name` property, and the access is done via getter and setter.

Technically, external code is able to access the name directly by using `user._name`. But there is a widely known convention that properties starting with an underscore `"_"` are internal and should not be touched from outside the object.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c


## Moslik uchun foydalanish

<<<<<<< HEAD
Getter va setterlarning orqasida turgan ajoyib g'oyalardan biri -- ular "normal" ma'lumotlar xususiyatini boshqarish va har qanday vaqtda uni sozlash imkonini beradi.

Masalan, biz `name` va `age` ma'lumotlar xususiyatlaridan foydalangan holda foydalanuvchi obyektlarini amalga oshirishni boshladik:
=======
One of the great uses of accessors is that they allow to take control over a "regular" data property at any moment by replacing it with a getter and a setter and tweak its behavior.

Imagine we started implementing user objects using data properties `name` and `age`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

let john = new User("John", 25);

alert( john.age ); // 25
```

...Ammo ertami-kechmi ishlar o'zgarishi mumkin. `yoshni` o'rniga `tug'ilgan kunni` saqlashga qaror qilishimiz mumkin, chunki bu aniqroq va qulayroq:

```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

let john = new User("John", new Date(1992, 6, 1));
```

Endi `age` xususiyatidan foydalanadigan eski kodni bilan nima qilish kerak?

<<<<<<< HEAD
Biz bunday joylarni topishga va ularni tuzatishga urinib ko'rishimiz mumkin, ammo bu vaqtni talab qiladi va agar bu kod boshqa odamlar tomonidan yozilgan bo'lsa, buni amalga oshirish qiyin bo'lishi mumkin. Va bundan tashqari, `age` - bu `user` da saqlash yaxshi narsa, shunday emasmi? Ba'zi joylarda bu biz xohlagan narsadir.

`age` uchun getter qo'shilishi muammoni engillashtiradi:
=======
We can try to find all such places and fix them, but that takes time and can be hard to do if that code is used by many other people. And besides, `age` is a nice thing to have in `user`, right?

Let's keep it.

Adding a getter for `age` solves the problem:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run no-beautify
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

*!*
  // yoshi joriy sana va tug'ilgan kunidan boshlab hisoblanadi
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
*/!*
}

let john = new User("John", new Date(1992, 6, 1));

alert( john.birthday ); // birthday mavjud
alert( john.age );      // ...shuningdek, age
```

Endi eski kod ham ishlaydi va bizda qo'shimcha xususiyat mavjud.
