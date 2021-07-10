# Obyekt usullari, "this"

Obyektlar odatda foydalanuvchilar, buyurtmalar va boshqalar kabi real dunyo subyektlarini aks ettirish uchun yaratiladi:

```js
let user = {
  name: "John",
  age: 30
};
```

Va, haqiqiy dunyoda, foydalanuvchi *harakat qilishi mumkin*: xarid qilish vositasidan biror narsani tanlash, kirish, chiqish va hk.

Amallar JavaScript-da funktsiyadagi xususiyatlar bilan ifodalanadi.

## Usul misollari

Boshlash uchun `user` ga salom aytishni o'rgataylik:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
user.sayHi = function() {
  alert("Salom!");
};
*/!*

user.sayHi(); // Salom!
```

Bu yerda biz funktsiyani yaratish va uni obyektning `user.sayHi` xususiyatiga tayinlash uchun funktsiya ifodasini ishlatdik.

Keyin biz uni chaqira olamiz. Endi "user" gaplasha oladi!

Obyektning xususiyati bo'lgan funktsiya uning *usuli* deb nomlanadi.

Shunday qilib, bu yerda bizda `user` obyektining `sayHi` usuli bor.

Albatta, biz oldindan e'lon qilingan funktsiyalardan usul sifatida foydalanishimiz mumkin:

```js run
let user = {
  // ...
};

*!*
// birinchi, e'lon qiling
function sayHi() {
  alert("Hello!");
};

// keyin usul sifatida qo'shing
user.sayHi = sayHi;
*/!*

user.sayHi(); // Salom!
```

```smart header="Obyektga yo'naltirilgan dasturlash"
Subyektlarni namoyish qilish uchun obyektlar yordamida kodimizni yozganimizda, bu [obyektga yo'naltirilgan dasturlash](https://en.wikipedia.org/wiki/object-oriented_programming), qisqasi: "OOP".

OOP - bu katta narsa, o'ziga xos qiziqarli fan. To'g'ri subyektlarni qanday tanlash kerak? Ularning o'zaro ta'sirini qanday tashkil qilish kerak? Bu arxitektura va bu mavzu bo'yicha E.Gamma, R.Helm, R.Jonson, J.Vissidesning "Dizayn naqshlari: qayta ishlatilishi mumkin bo'lgan obyektga yo'naltirilgan dasturiy ta'minot elementlari" yoki "Obyektga yo'naltirilgan tahlil va dizayn ilovalar" G.Booch tomonidan yozilgan va boshqalar.
```
### Usulni qisqartirish

Obyektdagi usullar uchun qisqa sintaksis mavjud:

```js
// bu obyektlar ham xuddi shunday qiladi

let user = {
  sayHi: function() {
    alert("Salom");
  }
};

// usulni qisqartirish yaxshiroq ko'rinadi, to'g'rimi?
let user = {
*!*
  sayHi() { // "sayHi: function()" bilan bir xil
*/!*
    alert("Salom");
  }
};
```

Ko'rsatilganidek, biz `"function"` ni qoldirib, faqat `sayHi()` yozishimiz mumkin.

Rostini aytsam, yozuvlar bir-biriga to'liq o'xshash emas. Obyektni meros qilib olish bilan bog'liq nozik farqlar mavjud (keyinroq ko'rib chiqiladi), ammo hozircha ularning ahamiyati yo'q. Deyarli barcha hollarda qisqa sintaksisga ustunlik beriladi.

## "this" usullarda

Obyekt usuli o'z ishini bajarish uchun obyektda saqlangan ma'lumotlarga kirish huquqiga ega bo'lishi odatiy holdir.

Masalan, `user.sayHi()` ichidagi kodga `user` nomi kerak bo'lishi mumkin.

**Obyektga kirish uchun usul `this` kalit so'zidan foydalanishi mumkin.**

`this` qiymati - bu usulni chaqirish uchun ishlatiladigan "nuqta oldidagi" obyekt.

Masalan:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert(this.name);
*/!*
  }

};

user.sayHi(); // John
```

Bu erda `user.sayHi()` bajarilishi paytida `this` qiymati `user` bo'ladi.

Texnik jihatdan, `this` kalit so'zisiz obyektga murojaat qilish mumkin, unga tashqi o'zgaruvchan orqali murojaat qilish mumkin.

```js
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert(user.name); // "user" "this" ning o'rniga
*/!*
  }

};
```

...Ammo bunday kod ishonchli emas. Agar biz `user` ni boshqa o'zgaruvchanga nusxalashga qaror qilsak, masalan, `admin = user` va `user` ni boshqa narsa bilan qayta yozsak, shunda u noto'g'ri obyektga murojaat qiladi.

Bu quyida ko'rsatilgan:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert( user.name ); // xatoga olib keladi
*/!*
  }

};


let admin = user;
user = null; // narsalarni aniq qilib ko'rsatish uchun qayta yozamiz

admin.sayHi(); // Voy! sayHi() ning ichida eski nom ishlatiladi! xato!
```

Agar biz `alert` ichida `user.name` o'rniga `this.name` dan foydalansak, u holda kod ishlaydi.

## "this" bog'liq emas

JavaScript-da, "this" kalit so'z boshqa dasturlash tillarining aksariyatidan farq qiladi. Birinchidan, u har qanday funktsiyada ishlatilishi mumkin.

Bu kabi kodda sintaksis xato yo'q:

```js
function sayHi() {
  alert( *!*this*/!*.name );
}
```

`this` qiymati ish vaqtida baholanadi. Va u har qanday narsa bo'lishi mumkin.

Masalan, bir xil funktsiya turli xil obyektlardan chaqirilganda boshqacha "this" bo'lishi mumkin:

```js run
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

*!*
// ikkita obyektda bir xil funktsiyalardan foydalandik
user.f = sayHi;
admin.f = sayHi;
*/!*

// chaqiruvlarda boshqacha this
// "this" - bu funktsiyaning ichida "nuqta oldidagi" obyekt 
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (nuqta yoki to'rtburchak qavslar usuliga kirish uchun ishlatiladi - bu muhim emas)
```

Aslida, biz funktsiyani umuman obyektsiz chaqira olamiz:

```js run
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```

Bunday holda `this` qat'iy rejimda `undefined`. Agar `this.name` ga kirishga harakat qilsak, xato bo'ladi.

Qat'iy bo'lmagan rejimda `this` qiymati *global obyekt* bo'ladi (brauzerda `window`, biz keyinroq [](info:global-object) bobida unga erishamiz. Bunday tarixiy xatti-harakatlarni tuzatish uchun, `"use strict"` dan foydalaning.

Iltimos, shuni yodda tutingki, odatda `this` ni obyektsiz ishlatiladigan funktsiya chaqiruvi odatiy emas, aksincha dasturiy xato. Agar funktsiya `this` ga ega bo'lsa, unda odatda obyekt kontekstida chaqirilishi kerak.

```smart header="Bog'lanmagan `this` ning oqibatlari"
Agar ilgari boshqa dasturlash tillarini o'rgangan bo'lsangiz, unda siz "bog'liq `this`" g'oyasiga o'rganib qolgansiz – obyekt ichida aniqlangan usullar har doim o'z obyektiga havolasini saqlaydi.

JavaScript-da `this` "ozod", uning qiymati chaqiruv vaqtida baholanadi va usul qayerda e'lon qilinganiga bog'liq emas, balki "nuqta oldida" nima bo'lganiga bog'liq.

Ish vaqti tushunchasi `this` ijobiy va salbiy tomonlarga ega. Bir tomondan, funktsiyani turli xil obyektlar uchun qayta ishlatish mumkin. Boshqa tomondan, ko'proq moslashuvchanlik xatolar uchun joy ochadi.

Bu yerda bizning pozitsiyamiz ushbu tilni loyihalashtirish bo'yicha qarorning yaxshi yoki yomonligini baholash emas. U bilan qanday ishlashni, qanday foyda olish va muammolardan qanday qochish kerakligini organamiz.
```

## Ichki dastur: havola turi

```warn header="Ilg'or til imkoniyati"
Ushbu bo'lim ba'zi murakkab vaziyatlarni yaxshiroq tushunish uchun murakkab mavzuni o'z ichiga oladi.

Agar siz tezroq davom etmoqchi bo'lsangiz, uni o'tkazib yuborishingiz yoki qoldirishingiz mumkin.
```

Murakkab usul chaqiruvi `this` ning qiyamatini yo'qotishi mumkin, masalan:

```js run
let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Hayir"); }
};

user.hi(); // John (oddiy chaqiruv ishlaydi)

*!*
// endi nomiga qarab user.hi yoki user.bye ni chaqiramiz
(user.name == "John" ? user.hi : user.bye)(); // Xato!
*/!*
```

Oxirgi satrda `user.hi` yoki `user.bye` ni tanlaydigan uchlik operatori mavjud. Bu holda natija `user.hi` bo'ladi.

Usul darhol qavslar bilan chaqiriladi `()`. Ammo bu to'g'ri ishlamaydi!

Chaqiruv xatoga olib kelishini ko'rishingiz mumkin, chunki chaqiruv ichidagi `"this"` qiymati `undefined` bo'ladi.

Bu ishlaydi (obyekt nuqta usuli):
```js
user.hi();
```

Bu ishlamaydi(baholangan usul):
```js
(user.name == "John" ? user.hi : user.bye)(); // Xato!
```

Nima uchun? Agar nima uchun bunday bo'lishini tushunishni istasak, keling, `obj.method()` chaqiruvi qanday ishlashini ko'rib chiqaylik.

Yaqindan qarab, `obj.method()` ifodasida ikkita operatsiyani ko'rishimiz mumkin:

1. Birinchi nuqta operator `'.'` obyektning xususiyatini qaytaradi `obj.method`.
2. Keyin qavslar `()` uni bajaradi.

Xo'sh, `this` haqidagi ma'lumotlar birinchi qismdan ikkinchisiga qanday yetkaziladi?

Agar biz ushbu operatsiyalarni alohida satrlarga qo'yadigan bo'lsak, unda `this` aniq yo'qoladi:

```js run
let user = {
  name: "John",
  hi() { alert(this.name); }
}

*!*
// bo'linish va usulni ikki satrda chaqirish
let hi = user.hi;
hi(); // Xato, chunki this aniqlanmagan
*/!*
```

Bu yerda `hi = user.hi` funktsiyani o'zgaruvchanga qo'yadi, so'ngra oxirgi satrda u butunlay mustaqil bo'ladi va shuning uchun `this` yoqoladi.

**`user.hi()` chaqiruvi ishlash uchun JavaScript-da hiyla ishlatadi -- nuqta `'.'`  funktsiyani emas, balki maxsus [Reference Type](https://tc39.github.io/ecma262/#sec-reference-specification-type) qiymatini qaytaradi.**

The Reference Type bu "spetsifikatsiya turi" dir. Biz uni aniq ishlata olmaymiz, lekin tilning ichida avtomatik ishlatiladi.

Reference Type qiymati uch qiymatli kombinatsiyadir `(base, name, strict)`, bu erda:

- `base` bu obyekt.
- `name` bu xususiyat.
- `strict` bu true agar `use strict` amalda bo'sa

`user.hi` xususiyatiga kirish natijasi funktsiya emas, balki Reference Type qiymatidir. `user.hi` qat'iy rejimda:

```js
// Reference Type qiymati
(user, "hi", true)
```

Reference Type-da qavslar `()` chaqirilganligida, ular obyekt va uning usuli haqida to'liq ma'lumot olishadi va to'g'ri `this` belgilashlari mumkin (`= user` shu holatda). 

`hi = user.hi` tayinlash kabi boshqa har qanday operatsiya havola turini umuman bekor qiladi, `user.hi` (funktsiya) qiymatini oladi va uzatadi. Shunday qilib, keyingi har qanday operatsiya `this` ni "yo'qotadi".

Shunday qilib, natija sifatida, funktsiya to'g'ridan-to'g'ri `obj.method()` nuqta yoki kvadrat qavslar `obj [' usuli ']()` sintaksisidan foydalanilsa (ular bu erda bir xil narsa bajarishadi) bo'ladi. Keyinchalik ushbu qo'llanmada biz ushbu muammoni hal qilishning turli xil usullarini o'rganamiz, masalan [func.bind()](/bind#solution-2-bind).

## O'q funktsiyalarida "this" yo'q 

O'q funktsiyalari maxsus: ularda o'zlarining `this` yo'q. Agar biz `this` ni o'q funktsiyasi ichida ishlatsak, uning qiymati tashqi "normal" funktsiyadan olinadi.

Masalan, bu yerda `arrow()` tashqi `user.sayHi()` usulidan `this` ni ishlatadi:

```js run
let user = {
  firstName: "Aziza",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // Aziza
```

Bu o'q funktsiyalarining o'ziga xos xususiyati, biz aslida alohida `this` ga ega bo'lishni xohlamasligimiz, aksincha uni tashqi kontekstdan olishimiz foydalidir. Keyinchalik <info:arrow-functions> bobida biz o'q funktsiyalarini chuqurroq kirib boramiz.


## Xulosa

- Obyekt xususiyatlarida saqlanadigan funktsiyalar "usullar" deb nomlanadi.
- Usullar obyektlarga `object.doSomething()` kabi "harakat qilish" imkonini beradi.
- Usullar obyektga `this` orqali murojaat qilishi mumkin.

`this` ning qiymati ish vaqtida aniqlanadi.
- Funktsiya e'lon qilinganda, u `this` dan foydalanishi mumkin, ammo funktsiya chaqirilguncha `this` ning qiymati bo'lmaydi.
- Ushbu funktsiyani obyektlar o'rtasida nusxalash mumkin.
- "Usul" sintaksisida funktsiya chaqirilganda: `object.method()`, chaqiruv paytida `this` ning qiymati `object` dir.

Iltimos, o'q funktsiyalari alohida ekanligini unutmang: ularda `this` yo'q. O'q funktsiyaning ichida `this` ga e'lon qilinsa, uning qiymati tashqarida olinadi.
