# Prototip meros

Dasturlashda biz ko'pincha biron bir narsani olishni va uni kengaytirishni xohlaymiz.

Masalan, bizda `user` obyekti, uning xususiyatlari va usullari bor, va `admin` va `mehmon` ni uning biroz o'zgartirilgan variantlari sifatida qilishni xohlaymiz. Biz `user` da mavjud bo'lgan narsalarni qayta ishlatishni istaymiz, uning usullarini nusxa ko'chirmasligimiz/amalga oshirmasligimiz kerak, shunchaki uning ustiga yangi obyekt quramiz.

*Prototipal meros* - bunga yordam beradigan til xususiyati.

## [[Prototype]]

JavaScript-da obyektlar maxfiy xususiyatga ega `[[Prototype]]` (spetsifikatsiyada ko'rsatilganidek), ya'ni `null` yoki boshqa obyektga murojaat qiladi. Ushbu obyekt "prototip" deb nomlanadi:

![prototype](object-prototype-empty.svg)

Bu `[[Prototype]]` "sehrli" ma'noga ega. Obyektdan xususiyatni o'qishni xohlaganimizda va u yetishmayotgan bo'lsa, JavaScript uni avtomatik ravishda prototipdan oladi. Dasturlashda bunday narsa "prototipli meros" deb nomlanadi. Ko'pgina ajoyib til xususiyatlari va dasturlash texnikasi unga asoslangan.

`[[Prototype]]` xususiyati ichki va yashirin, ammo uni o'rnatishning ko'plab usullari mavjud.

Ulardan biri quyidagicha ``__proto__` dan foydalanish:

```js run
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

*!*
rabbit.__proto__ = animal;
*/!*
```

```smart header="`__proto__` `[[Prototype]]` uchun tarixiy qabul qiluvchi/belgilovchi"
Iltimos, `__proto__`  `[[Prototype]]` bilan *bir xil emas*. Bu u uchun getter/setter.

U tarixiy sabablarga ko'ra mavjud bo'lib, zamonaviy tilda uning o'rnini `Object.getPrototypeOf/Object.setPrototypeOf` funktsiyalari egallaydi, bu prototipni oladi/ o'rnatadi. Buning sabablarini va ushbu funktsiyalarni keyinroq o'rganib chiqamiz.

`__proto__` spetsifikatsiyasi bo'yicha faqat brauzerlar tomonidan qo'llab-quvvatlanishi kerak, ammo aslida barcha muhit, shu jumladan server tomoni uni qo'llab-quvvatlaydi. Hozircha, `__proto__` yozuvi biroz intuitiv ravishda aniq bo'lgani uchun, biz buni misollarda qo'llaymiz.
```

Agar biz `rabbit` dan xususiyat qidirsak va u yetishmayotgan bo'lsa, JavaScript uni avtomatik ravishda `animal` dan oladi.

Masalan:

```js run
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

*!*
rabbit.__proto__ = animal; // (*)
*/!*

// hozir quyonda ikkala xususiyatni topishimiz mumkin:
*!*
alert( rabbit.eats ); // true (**)
*/!*
alert( rabbit.jumps ); // true
```

Bu yerda `(*)` satri `animal` `rabbit` ning prototipi sifatida o'rnatadi.

Keyin, `alert` `rabbit.eats` `(**)` xususiyatini o'qishga harakat qiladi, u `rabbit` da mavjud emas, shuning uchun JavaScript `[[Prototype]]` ma'lumotnomasiga amal qiladi va uni `animal` da topadi (pastdan yuqoriga qarang):

![](proto-animal-rabbit.svg)

Bu yerda "`animal` - bu `rabbit` ning prototipi" yoki "`rabbit` prototipik ravishda `animal` dan meros qilib olinadi".

Shunday qilib, agar `animal` juda ko'p foydali xususiyatlarga va usullarga ega bo'lsa, ular avtomatik ravishda `rabbit` da mavjud bo'ladi. Bunday xususiyatlar "meros qilib olingan" deb nomlanadi.

Agar bizda `animal` da usul bo'lsa, uni `rabbit` da chaqirish mumkin:

```js run
let animal = {
  eats: true,
*!*
  walk() {
    alert("Hayvon sayr qilyapti");
  }
*/!*
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

// walk prototipidan olingan
*!*
rabbit.walk(); // Hayvon sayr qilyapti
*/!*
```

Usul prototipdan avtomatik ravishda quyidagicha olinadi:

![](proto-animal-rabbit-walk.svg)

Prototip zanjiri uzunroq bo'lishi mumkin:


```js run
let animal = {
  eats: true,
  walk() {
    alert("Hayvon sayr qilyapti");
  }
};

let rabbit = {
  jumps: true,
*!*
  __proto__: animal
*/!*
};

let longEar = {
  earLength: 10,
*!*
  __proto__: rabbit
*/!*
};

// walk prototip zanjiridan olingan
longEar.walk(); // Hayvon sayr qilyapti
alert(longEar.jumps); // true (rabbit dan)
```

![](proto-animal-rabbit-chain.svg)

Aslida faqat ikkita cheklov mavjud:

1. Havolalar doiralarda yurib bo'lmaydi. Agar doira ichida `__proto__` ni belgilashga harakat qilsak, JavaScript xatolikka yo'l qo'yadi.
2. `__proto__` qiymati obyekt yoki `null` bo'lishi mumkin, boshqa turlari (masalan, ibtidoiylar) hisobga olinmaydi.

Bundan tashqari, bu aniq bo'lishi mumkin, ammo baribir: bitta `[[Prototype]]` bo'lishi mumkin. Obyekt boshqa ikkitadan meros ololmaydi.

## Yozishda prototipdan foydalanilmaydi

Prototip faqat o'qish xususiyatlari uchun ishlatiladi.

Yozish/o'chirish operatsiyalari to'g'ridan-to'g'ri obyekt bilan ishlaydi.

Quyidagi misolda biz `walk` usulini `rabbit` ga tayinlaymiz:

```js run
let animal = {
  eats: true,
  walk() {
    /* bu usul quyon tomonidan ishlatilmaydi */  
  }
};

let rabbit = {
  __proto__: animal
};

*!*
rabbit.walk = function() {
  alert("Quyon! Sakra-sakra!");
};
*/!*

rabbit.walk(); // Quyon! Sakra-sakra!
```

Bundan buyon, `rabbit.walk()` chaqiruvi usulni darhol obyektda topadi va prototipdan foydalanmasdan amalga oshiradi:

![](proto-animal-rabbit-walk-2.svg)

Bu faqat ma'lumotlarning xususiyatlari uchun, lekin kiruvchilar uchun emas. Agar xususiyat getter/setter bo'lsa, u funktsiya kabi ishlaydi: getters/setters prototipda topiladi.

Shu sababli `admin.fullName` quyidagi kodda to'g'ri ishlaydi:

```js run
let user = {
  name: "John",
  surname: "Smith",

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};

let admin = {
  __proto__: user,
  isAdmin: true
};

alert(admin.fullName); // John Smith (*)

// setter triggers!
admin.fullName = "Alice Cooper"; // (**)
```

`(*)` Satrida `admin.fullName` xususiyati `user` prototipida qabul qiluvchiga ega, shuning uchun u shunday nomlanadi. Va `(**)` satrida prototipda xususiyat o'rnatuvchiga ega, shuning uchun u shunday nomlanadi.

## "This" qiymati

Yuqoridagi misolda qiziq savol tug'ilishi mumkin: `fullName(value)` ichida `this` qiymati qanday? `this.name` va `this.same` xususiyatlari qayerda yozilgan: `user` yoki `admin` ga?

Javob oddiy: `this` ga prototiplar umuman ta'sir qilmaydi.

**Usul qayerda bo'lishidan qat'i nazar: obyektda yoki uning prototipida. Usul chaqiruvida `this` har doim nuqta oldidagi obyekt hisoblanadi.**

Shunday qilib, `admin.fullName=` setter chaqiruvi `user` emas, balki `admin` dan foydalanadi.

Bu aslida o'ta muhim narsa, chunki bizda ko'plab usullarga ega bo'lgan va undan meros bo'lib qolgan katta obyekt bo'lishi mumkin. Keyin meros qilib olingan obyektlar uning usullarini ishga tushirishi mumkin va ular bu obyektlarning holatini o'zgartiradi, kattani emas.

Masalan, bu yerda `animal` "usulni saqlash" ni anglatadi va `quyon` undan foydalanadi.

`rabbit.sleep()` chaqiruvi `rabbit` obyektida `this.isSleeping` ni o'rnatadi:

```js run
// animal has methods
let animal = {
  walk() {
    if (!this.isSleeping) {
      alert(`Men sayr qilyapman`);
    }
  },
  sleep() {
    this.isSleeping = true;
  }
};

let rabbit = {
  name: "White Rabbit",
  __proto__: animal
};

// modifies rabbit.isSleeping
rabbit.sleep();

alert(rabbit.isSleeping); // true
alert(animal.isSleeping); // undefined (no such property in the prototype)
```

Natija rasmi:

![](proto-animal-rabbit-walk-3.svg)

Agar bizda `animal` dan meros bo'lib qolgan `qush`, `ilon` va boshqalar kabi narsalar bo'lsa, ular `animal` usullaridan ham foydalanishlari mumkin edi. Ammo `this` har bir usulda `animal` emas, balki chaqiruv vaqtida (nuqta oldidan) baholanadigan mos keladigan obyektni bo'ladi. Shunday qilib, biz ma'lumotlarni `this` ga yozganimizda, ular ushbu obyektlarda saqlanadi.

Natijada, usullar birgalikda ishlatiladi, ammo obyekt holatida emas.

## Xulosa

- JavaScript-da barcha obyektlar yashiringan `[[Prototype]]` xususiyatiga ega, bu boshqa obyekt yoki `null`.
- Bunga kirish uchun `obj .__ proto__` dan foydalanishimiz mumkin (tarixiy getter/setter, boshqa usullar mavjud, yaqin orada ko'rib chiqilishi kerak).
- `[[Prototype]]` ga havola qilingan obyekt "prototip" deb nomlanadi.
- Agar biz `obj` xususiyatini o'qishni yoki usulni chaqirishni xohlasak va u mavjud bo'lmasa, JavaScript uni prototipda topishga harakat qiladi. Yozish/o'chirish operatsiyalari to'g'ridan-to'g'ri obyektda ishlaydi, ular prototipdan foydalanmaydi (agar xususiyat aslida setter bo'lmasa).
- Agar biz `obj.method()` deb nomlasak va `usul` prototipdan olingan bo'lsa, `this` `obj` ga hali ham murojaat qiladi. Shunday qilib, usullar, agar ular meros qilib olingan bo'lsa ham, har doim ham mavjud obyekt bilan ishlaydi.
