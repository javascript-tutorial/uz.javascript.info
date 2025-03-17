# Konstruktor, operator "new"

<<<<<<< HEAD
Oddiy `{...}` sintaksisi bitta obyektni yaratishga imkon beradi. Ammo ko'pincha biz shunga o'xshash ko'plab obyektlarni yaratishimiz kerak, masalan, bir nechta foydalanuvchi yoki menyu elementlari va boshqalar.
=======
The regular `{...}` syntax allows us to create one object. But often we need to create many similar objects, like multiple users or menu items and so on.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Buni konstruktor funktsiyalari va `"new"` operator yordamida amalga oshirish mumkin.

## Konstruktor funktsiyalari

Konstruktor funktsiyalari texnik jihatdan muntazam funktsiyalardir. Ammo ikkita shart mavjud:

1. Ular birinchi bo'lib katta harf bilan nomlangan.
2. Ular faqat `"new"` operatori bilan bajarilishi kerak.

Masalan:

```js run
function User(name) {
  this.name = name;
  this.isAdmin = false;
}

*!*
let user = new User("Elbek");
*/!*

alert(user.name); // Elbek
alert(user.isAdmin); // false
```

<<<<<<< HEAD
Agar funktsiya `new User(...)` sifatida bajarilsa, u quyidagi amallarni bajaradi:
=======
When a function is executed with `new`, it does the following steps:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

1. Yangi bo'sh obyekt yaratilib, `this` ga tayinlangan.
2. Funktsiya tanasi bajariladi. Odatda u `this` ni o'zgartiradi, unga yangi xususiyatlar qo'shadi.
3. `this` ning qiymati qaytariladi.

Boshqacha qilib aytganda, `new User(...)` quyidagicha ishlaydi:

```js
function User(name) {
*!*
  // this = {};  (bevosita)
*/!*

  // bunga xususiyatlarni qo'shish
  this.name = name;
  this.isAdmin = false;

*!*
  // return this;  (bevosita)
*/!*
}
```

<<<<<<< HEAD
Shunday qilib, `new User("Elbek")` ning natijasi quyidagicha:
=======
So `let user = new User("Jack")` gives the same result as:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
let user = {
  name: "Elbek",
  isAdmin: false
};
```

Endi biz boshqa foydalanuvchilarni yaratmoqchi bo'lsak, `new User("Oybek")`, `new User("Aziza")` va boshqalarni chaqirishimiz mumkin. Har safar literallardan foydalanishdan ancha qisqa, shuningdek o'qish oson.

Bu konstruktorlarning asosiy maqsadi -- qayta foydalanish mumkin bo'lgan obyekt yaratish kodini amalga oshirish.

<<<<<<< HEAD
Yana bir bor ta'kidlab o'tamiz -- texnik jihatdan har qanday funktsiyani konstruktor sifatida ishlatish mumkin. Ya'ni: har qanday funktsiyani `new` bilan ishlatish mumkin va u yuqoridagi algoritmni bajaradi. "Birinchi bo'lib katta harf" funktsiya `new` bilan bajarilishini tushuntirish uchun umumiy kelishuvdir.

````smart header="new function() { ... }"
Agar bitta murakkab ko'plab satrli obyekt yaratish kerak bo'lsa, ularni quyidagi kabi konstruktor funktsiyasiga o'rashimiz mumkin:

```js
let user = new function() {
  this.name = "Elbek";
=======
Let's note once again -- technically, any function (except arrow functions, as they don't have `this`) can be used as a constructor. It can be run with `new`, and it will execute the algorithm above. The "capital letter first" is a common agreement, to make it clear that a function is to be run with `new`.

````smart header="new function() { ... }"
If we have many lines of code all about creation of a single complex object, we can wrap them in an immediately called constructor function, like this:

```js
// create a function and immediately call it with new
let user = new function() { 
  this.name = "John";
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  this.isAdmin = false;

  // ...foydalanuvchi yaratish uchun boshqa kod
  // balki murakkab mantiq va ifodalar
  // ichki o'zgaruvchanlar va boshqalar
};
```

<<<<<<< HEAD
Konstruktorni qayta chaqirish mumkin emas, chunki u hech qaerda saqlanmaydi, shunchaki yaratiladi va chaqiriladi. Shunday qilib, bu hiyla-nayrang kelajakda qayta ishlatmasdan bitta obyektni tuzadigan kodni qamrab olishga qaratilgan.
````

## Ikki sintaksisli konstruktorlar: new.target
=======
This constructor can't be called again, because it is not saved anywhere, just created and called. So this trick aims to encapsulate the code that constructs the single object, without future reuse.
````

## Constructor mode test: new.target
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```smart header="Murakkab narsalar"
Ushbu bo'limdagi sintaksis juda kam ishlatiladi, agar hamma narsani bilmoqchi bo'lmasangiz, uni o'tkazib yuboring.
```

Funktsiyaning ichida biz uni `new` bilan yoki yo'q holda, `new.target` maxsus xususiyati yordamida tekshirishimiz mumkin.

<<<<<<< HEAD
Oddiy chaqiruvlar uchun bo'sh va agar `new` bilan chaqirilsa, funktsiyaga teng:
=======
It is undefined for regular calls and equals the function if called with `new`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
function User() {
  alert(new.target);
}

// "new" siz:
*!*
User(); // undefined
*/!*

// "new" bilan:
*!*
new User(); // function User { ... }
*/!*
```

<<<<<<< HEAD
Buning yordamida `new` va oddiy chaqiruvlar bir xil ishlashiga imkon berish uchun foydalanish mumkin. Ya'ni, xuddi shu obyektni yarating:
=======
That can be used inside the function to know whether it was called with `new`, "in constructor mode", or without it, "in regular mode".

We can also make both `new` and regular calls to do the same, like this:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
function User(name) {
  if (!new.target) { // agar siz meni new siz bajarsangiz
    return new User(name); // ...Men siz uchun new ni qo'shaman
  }

  this.name = name;
}

let john = User("Elbek"); // new User ga yo'naltiradi
alert(john.name); // Elbek
```

Ushbu yondashuv ba'zan sintaksisni yanada moslashuvchan qilish uchun kutubxonalarda qo'llaniladi. Shunday qilib, odamlar funktsiyani `new` yoki oddiy chaqirishlari mumkin va u hali ham ishlaydi.

Ehtimol, hamma joyda foydalanish yaxshi narsa emas, chunki `new` ni tashlab qo'yish nima sodir bo'layotganini chunish uchun biroz qiyinroq. `new` bilan hammamiz bilamizki, yangi obyekt yaratilmoqda.

## Konstruktorlardan qiymatni qaytarish

Odatda, konstruktorlarda `return` ifodasi mavjud emas. Ularning vazifasi barcha kerakli narsalarni `this` ga yozishdir va bu avtomatik ravishda natijaga aylanadi.

Agar `return` ifodasi bo'lsa, unda qoida oddiy:

<<<<<<< HEAD
- Agar `return` obyekt bilan chaqirilsa, u `this` o'rniga qaytariladi.
- Agar `return` ibtidoiy bilan chaqirilsa, unga e'tibor berilmaydi.
=======
- If `return` is called with an object, then the object is returned instead of `this`.
- If `return` is called with a primitive, it's ignored.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Boshqacha qilib aytganda, obyekt bilan `return` ushbu obyektni qaytaradi, qolgan barcha hollarda `this` qaytariladi.

Masalan, `return` orqali obyektni qaytarish bu yerda  `this` ni bekor qiladi:

```js run
function BigUser() {

  this.name = "Elbek";

<<<<<<< HEAD
  return { name: "Godzilla" };  // <-- obyektni qaytaradi
}

alert( new BigUser().name );  // Godzilla, bu obyektni oldi ^^
=======
  return { name: "Godzilla" };  // <-- returns this object
}

alert( new BigUser().name );  // Godzilla, got that object
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

Va bu yerda bo'sh `return` bilan bir misol (yoki biz undan keyin ibtidoiylarni qo'yishimiz mumkin, muhim emas):

```js run
function SmallUser() {

  this.name = "Elbek";

<<<<<<< HEAD
  return; // bajarilishini tugatadi, this ni qaytaradi

  // ...

=======
  return; // <-- returns this
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
}

alert( new SmallUser().name );  // Elbek
```

Odatda konstruktorlarda `return` ifodasi mavjud emas. Ushbu blokda tilni o'rganishdagi bo'shliqlarni qoldirmaslik uchun obyektni qaytarish bilan bog'liq alohida xatti-harakatlar haqida so'z yuritdik.

<<<<<<< HEAD
````smart header="Qavslar chushirib qo'yish"
Aytgancha, agar bizda argument bo'lmasa, qavslarni `new` dan keyin olib tashlashimiz mumkin:
=======
````smart header="Omitting parentheses"
By the way, we can omit parentheses after `new`:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js
let user = new User; // <-- qavslar yo'q
// bir xil
let user = new User();
```

Bu yerda qavslarni tashlab qo'yish "yaxshi uslub" deb hisoblanmaydi, ammo sintaksisda spetsifikatsiya bo'yicha ruxsat beriladi.
````

## Konstruktorda usullar

Obyektlarni yaratish uchun konstruktor funktsiyalaridan foydalanish katta moslashuvchanlikni beradi. Konstruktor funktsiyasi obyektni qanday qurish va unga nimani kiritish kerakligini belgilaydigan parametrlarga ega bo'lishi mumkin.

Albatta, biz `this` ga nafaqat xususiyatlarni, balki usullarni ham qo'shishimiz mumkin.

Masalan, quyida `new User(name)` berilgan `name` va `sayHi` usuli bilan obyekt yaratadi:

```js run
function User(name) {
  this.name = name;

  this.sayHi = function() {
    alert( "Mening ismim: " + this.name );
  };
}

*!*
let john = new User("Oybek");

john.sayHi(); // Mening ismim: Oybek
*/!*

/*
john = {
   name: "Oybek",
   sayHi: function() { ... }
}
*/
```

<<<<<<< HEAD
## Xulosa
=======
To create complex objects, there's a more advanced syntax, [classes](info:classes), that we'll cover later.

## Summary
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

- Konstruktor funktsiyalari yoki qisqacha konstruktorlar muntazam funktsiyalardir, ammo ularni birinchi bo'lib katta harf bilan nomlash bo'yicha umumiy kelishuv mavjud.
- Konstruktor funktsiyalari faqat `new` yordamida chaqirilishi kerak. Bunday chaqiruv boshida bo'sh `this` ni yaratishni va oxirida to'liqni qaytarish nazarda tutadi.

Biz bir nechta o'xshash obyektlarni yaratish uchun konstruktor funktsiyalaridan foydalanishimiz mumkin.

JavaScript ko'plab o'rnatilgan til obyektlari uchun konstruktor funktsiyalarini taqdim etadi: sanalar uchun `Data`, to'plamlar uchun `Set` va biz o'rganishni rejalashtirgan boshqa narsalar.

```smart header="Obyektlar, biz qaytib kelamiz!"
Ushbu bobda biz faqat obyektlar va konstruktorlar haqida asoslarni ko'rib chiqdik. Ular keyingi boblarda ma'lumotlar turlari va funktsiyalari haqida ko'proq bilish uchun juda muhimdir.

Buni bilib olganimizdan so'ng, biz obyektlarga qaytamiz va ularni <info:prototypes> va <info:class> boblarida chuqur yoritamiz.
```
