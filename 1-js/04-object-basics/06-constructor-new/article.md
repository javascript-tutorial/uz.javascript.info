# Konstruktor, operator "new"

Oddiy `{...}` sintaksisi bitta obyektni yaratishga imkon beradi. Ammo ko'pincha biz shunga o'xshash ko'plab obyektlarni yaratishimiz kerak, masalan, bir nechta foydalanuvchi yoki menyu elementlari va boshqalar.

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

Agar funktsiya `new User(...)` sifatida bajarilsa, u quyidagi amallarni bajaradi:

1. Yangi bo'sh ob'ekt yaratilib, `this` ga tayinlangan.
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

Shunday qilib, `new User("Elbek")` ning natijasi quyidagicha:

```js
let user = {
  name: "Elbek",
  isAdmin: false
};
```

Endi biz boshqa foydalanuvchilarni yaratmoqchi bo'lsak, `new User("Oybek")`, `new User("Aziza")` va boshqalarni chaqirishimiz mumkin. Har safar literallardan foydalanishdan ancha qisqa, shuningdek o'qish oson.

Bu konstruktorlarning asosiy maqsadi -- qayta foydalanish mumkin bo'lgan obyekt yaratish kodini amalga oshirish.

Yana bir bor ta'kidlab o'tamiz -- texnik jihatdan har qanday funktsiyani konstruktor sifatida ishlatish mumkin. Ya'ni: har qanday funktsiyani `new` bilan ishlatish mumkin va u yuqoridagi algoritmni bajaradi. "Birinchi bo'lib katta harf" funktsiya `new` bilan bajarilishini tushuntirish uchun umumiy kelishuvdir.

````smart header="new function() { ... }"
Agar bitta murakkab ko'plab satrli obyekt yaratish kerak bo'lsa, ularni quyidagi kabi konstruktor funktsiyasiga o'rashimiz mumkin:

```js
let user = new function() {
  this.name = "Elbek";
  this.isAdmin = false;

  // ...foydalanuvchi yaratish uchun boshqa kod
  // balki murakkab mantiq va ifodalar
  // ichki o'zgaruvchanlar va boshqalar
};
```

Konstruktorni qayta chaqirish mumkin emas, chunki u hech qaerda saqlanmaydi, shunchaki yaratiladi va chaqiriladi. Shunday qilib, bu hiyla-nayrang kelajakda qayta ishlatmasdan bitta obyektni tuzadigan kodni qamrab olishga qaratilgan.
````

## Ikki sintaksisli konstruktorlar: new.target

```smart header="Murakkab narsalar"
Ushbu bo'limdagi sintaksis juda kam ishlatiladi, agar hamma narsani bilmoqchi bo'lmasangiz, uni o'tkazib yuboring.
```

Funktsiyaning ichida biz uni `new` bilan yoki yo'q holda, `new.target` maxsus xususiyati yordamida tekshirishimiz mumkin.

Oddiy chaqiruvlar uchun bo'sh va agar `new` bilan chaqirilsa, funktsiyaga teng:

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

Buning yordamida `new` va oddiy chaqiruvlar bir xil ishlashiga imkon berish uchun foydalanish mumkin. Ya'ni, xuddi shu obyektni yarating:

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

- Agar `return` obyekt bilan chaqirilsa, u `this` o'rniga qaytariladi.
- Agar `return` ibtidoiy bilan chaqirilsa, unga e'tibor berilmaydi.

Boshqacha qilib aytganda, obyekt bilan `return` ushbu obyektni qaytaradi, qolgan barcha hollarda `this` qaytariladi.

Masalan, `return` orqali obyektni qaytarish bu yerda  `this` ni bekor qiladi:

```js run
function BigUser() {

  this.name = "Elbek";

  return { name: "Godzilla" };  // <-- obyektni qaytaradi
}

alert( new BigUser().name );  // Godzilla, bu obyektni oldi ^^
```

Va bu yerda bo'sh `return` bilan bir misol (yoki biz undan keyin ibtidoiylarni qo'yishimiz mumkin, muhim emas):

```js run
function SmallUser() {

  this.name = "Elbek";

  return; // bajarilishini tugatadi, this ni qaytaradi

  // ...

}

alert( new SmallUser().name );  // Elbek
```

Odatda konstruktorlarda `return` ifodasi mavjud emas. Ushbu blokda tilni o'rganishdagi bo'shliqlarni qoldirmaslik uchun obyektni qaytarish bilan bog'liq alohida xatti-harakatlar haqida so'z yuritdik.

````smart header="Qavslar chushirib qo'yish"
Aytgancha, agar bizda argument bo'lmasa, qavslarni `new` dan keyin olib tashlashimiz mumkin:

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

## Xulosa

- Konstruktor funktsiyalari yoki qisqacha konstruktorlar muntazam funktsiyalardir, ammo ularni birinchi bo'lib katta harf bilan nomlash bo'yicha umumiy kelishuv mavjud.
- Konstruktor funktsiyalari faqat `new` yordamida chaqirilishi kerak. Bunday chaqiruv boshida bo'sh `this` ni yaratishni va oxirida to'liqni qaytarish nazarda tutadi.

Biz bir nechta o'xshash obyektlarni yaratish uchun konstruktor funktsiyalaridan foydalanishimiz mumkin.

JavaScript ko'plab o'rnatilgan til ob'ektlari uchun konstruktor funktsiyalarini taqdim etadi: sanalar uchun `Data`, to'plamlar uchun `Set` va biz o'rganishni rejalashtirgan boshqa narsalar.

```smart header="Obyektlar, biz qaytib kelamiz!"
Ushbu bobda biz faqat obyektlar va konstruktorlar haqida asoslarni ko'rib chiqdik. Ular keyingi boblarda ma'lumotlar turlari va funktsiyalari haqida ko'proq bilish uchun juda muhimdir.

Buni bilib olganimizdan so'ng, biz obyektlarga qaytamiz va ularni <info:prototypes> va <info:class> boblarida chuqur yoritamiz.
```
