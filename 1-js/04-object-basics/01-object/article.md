
# Ob'ektlar

<info:types> bobidan ma'lum bo'lganidek, JavaScript-da ma'lumotlarning yetti turi mavjud. Ularning oltitasi "ibtidoiy" deb nomlanadi, chunki ularning qadriyatlari faqat bitta narsani o'z ichiga oladi (u matn yoki raqam yoki boshqa narsalar).

Aksincha, ob'ektlar turli xil ma'lumotlarning va yanada murakkab shaxslarning kalitli to'plamlarini saqlash uchun ishlatiladi. JavaScript-da ob'ektlar tilning deyarli barcha jihatlariga kirib boradi. Shunday qilib, biz boshqa biron bir joyga chuqur kirib borishdan oldin ularni avval anglashimiz kerak.

Ob'ektni ixtiyoriy *xususiyatlar* ro'yxati bilan `{…}` jingalak qavslar yordamida yaratish mumkin. Xususiyat - bu "kalit: qiymat" juftligi, bu yerda `kalit` matn ("xusisiyat nomi" deb ham ataladi), va `qiymat` har qanday narsa bo'lishi mumkin.

Ob'ektni imzolangan fayllar bilan jihozlangan quti sifatida tasavvur qilishimiz mumkin. Har qanday ma'lumotlar o'z faylida kalit bilan saqlanadi. Faylni nomidan topish yoki faylni qo'shish/olib tashlash oson.

![](object.svg)

Bo'sh ob'ektni ("bo'sh qutini") ikkita sintaksisdan biri yordamida yaratish mumkin:

```js
let user = new Object(); // "ob'ekt konstruktori" sintaksisi
let user = {};  // "ob'ekt literal" sintaksisi
```

![](object-user-empty.svg)

Odatda `{...}` figurali qavslardan foydalaniladi. Ushbu deklaratsiya *ob'ekt literal* deb nomlanadi.

## Literallar va xususiyatlar

Darhol ba'zi xususiyatlarni `{...}` ga "kalit: qiymat" juftlari sifatida qo'yishimiz mumkin:

```js
let user = {     // ob'ekt
  name: "John",  // "name" kaliti bo'yicha "John" qiymati saqlaniladi
  age: 30        // "age" kaliti bo'yicha 30 qiymati saqlaniladi
};
```

Har bir xususiyatda kalit ("ism" yoki "ID" deb ham ataladi) mavjud. Xususiyat nomidan keyin ikki nuqta `":"` va keyin xususiyatning qiymati ko'rsatiladi. Agar ob'ektda bir nechta xususiyatlar mavjud bo'lsa, ular vergul bilan ko'rsatiladi.

`user` ob'ektida ikkita xususiyat mavjud:

1. Birinchi xususiyat `"name"` va qiymat `"John"` ga  ega.
2. Ikkinchisida `"age"` va `30` qiymati mavjud.

Natijada `user` ob'ekti "name" va "age" ikkita imzolangan fayllari bo'lgan quti sifatida tasavvur qilinishi mumkin.

![user object](object-user.svg)

Undan istalgan vaqtda fayllarni qo'shishimiz, olib tashlashimiz va o'qishimiz mumkin.

Xususiyat qiymatlariga nuqta belgisi yordamida murojat qilish mumkin:

```js
// ob'ektning xususiyatlarini olamiz:
alert( user.name ); // John
alert( user.age ); // 30
```

Qiymat har qanday turda bo'lishi mumkin. Keling, mantiqiy qiymatni qo'shaylik:

```js
user.isAdmin = true;
```

![user object 2](object-user-isadmin.svg)

Xususiyatni olib tashlash uchun biz `delete` operatoridan foydalanishimiz mumkin:

```js
delete user.age;
```

![user object 3](object-user-delete.svg)

Xususiyatning nomi bir nechta so'zlardan iborat bo'lishi mumkin, ammo keyin u tirnoq belgilariga kiritilishi kerak:

```js
let user = {
  name: "John",
  age: 30,
  "likes birds": true  // bir necha so'zdan iborat xususiyat nomi tirnoqlarda bo'lishi kerak
};
```

![](object-user-props.svg)


Ro'yxatdagi oxirgi xususiyat vergul bilan tugashi mumkin:
```js
let user = {
  name: "John",
  age: 30*!*,*/!*
}
```
Bu "osilgan vergul" deyiladi. Xususiyatlarni qo'shish/olib tashlash/harakatlanishni osonlashtiradi, chunki barcha satrlar bir xil bo'ladi.

## Kvadrat qavslar

Ko'p so'zli xususiyatlar uchun "nuqta orqali" qiymatiga kirish ishlamaydi:

```js run
// bu sintaksis xatosini keltirib chiqaradi
user.likes birds = true
```

Buning sababi shundaki, nuqta kalitning o'zgaruvchan identifikatori bo'lishini talab qiladi. Ya'ni: bo'shliqlar va boshqa cheklovlar yo'q.

Har qanday matn bilan ishlaydigan muqobil "kvadrat qavs yozuvlari" mavjud:


```js run
let user = {};

// dekoratsiya
user["qushlarni yoqtiradi"] = true;

// chiqish
alert(user["qushlarni yoqtiradi"]); // true

// o'chirish
delete user["qushlarni yoqtiradi"];
```

Hozir hamma narsa yaxshi. Qavs ichidagi matn to'g'ri keltirilganligiga e'tibor bering (har qanday tirnoq turi to'ri keladi).

Kvadrat qavslar, shuningdek, nomi ifoda natijasi bo'lishi mumkin bo'lgan xususiyatga murojaat qilish imkonini beradi. Misol uchun, xususiyat nomi o'zgaruvchanda saqlanishi mumkin:

```js
let key = "qushlarni yoqtiradi";

// bir xil user["qushlarni yoqtiradi"] = true;
user[key] = true;
```

Bu yerda `key` o'zgaruvchani ish vaqtida hisoblanishi yoki foydalanuvchi ma'lumotlariga bog'liq bo'lishi mumkin. Va keyin biz uni xususitatga kirish uchun ishlatamiz. Bu bizga katta moslashuvchanlikni beradi. Nuqta yozuvidan shunga o'xshash tarzda foydalanish mumkin emas.

Masalan:

```js run
let user = {
  name: "John",
  age: 30
};

let key = prompt("Foydalanuvchi haqida nimani bilmoqchisiz?", "name");

// o'zgaruvchan orqali kirish
alert( user[key] ); // John (agar "name" kiritilsa)
```


### Xususiyat nomlari bo'yicha cheklovlar

Ob'ekt iiterallida kvadrat qavslardan foydalanishimiz mumkin. Bu *hisoblash xususiyatlari* deb nomlanadi.

Masalan:

```js run
let fruit = prompt("Qaysi mevani sotib olish kerak?", "olma");

let bag = {
*!*
  [fruit]: 5, // the name of the property is taken from the variable fruit
*/!*
};

alert( bag.olma ); // 5 agar fruit="olma"
```

Hisoblangan xususiyatning ma'nosi oddiy: `[fruit]` xususiyat nomini `fruit` dan olish kerakligini anglatadi.

Shunday qilib, agar mehmon `"olma"` ni kiritsa, `bag` `{apple: 5}` bo'ladi.

Aslida, u xuddi shunday ishlaydi:
```js run
let fruit = prompt("Qaysi mevani sotib olish kerak?", "olma");
let bag = {};

// fruit o'zgaruvchandan xusuiyat nomini oling
bag[fruit] = 5;
```

...Ammo yoqimliroq ko'rinadi.

Kvadrat qavs ichida yanada murakkab ifodalardan foydalanishimiz mumkin:

```js
let fruit = 'apple';
let bag = {
  [fruit + 'Computers']: 5 // bag.appleComputers = 5
};
```

Kvadrat qavslar nuqta yozuvidan ancha kuchliroq. Ular har qanday xususiyat nomlari va o'zgaruvchanlarga ruxsat beradi. Ammo ular yozish uchun noqulay.

Shunday qilib, ko'pincha xususiyat nomlari ma'lum va sodda bo'lsa, nuqta yozuvi ishlatiladi. Va agar biz murakkabroq narsaga muhtoj bo'lsak, biz kvadrat qavslarga o'tamiz.



````smart header="O'zgaruvchan xususiyati"
O'zgaruvchanda til uchun ajratilgan "for", "let", "return" va hokazo so'zlardan biriga teng nom bo'lishi mumkin emas.

Ammo ob'ekt xususiyati uchun bunday cheklov yo'q. Har qanday nom yaxshi:

```js run
let obj = {
  for: 1,
  let: 2,
  return: 3
};

alert( obj.for + obj.let + obj.return );  // 6
```

Asosan, har qanday nomga ruxsat beriladi, ammo tarixiy sabablarga ko'ra maxsus davolanadigan `"__proto__"` xususiyat bor. Misol uchun, biz uni ob'ekt bo'lmagan qiymatga o'rnata olmaymiz:

```js run
let obj = {};
obj.__proto__ = 5;
alert(obj.__proto__); // [object Object], qiymat - bu ob'ekt, ya'ni biz kutgan natija emas
```

Koddan ko'rinib turibdiki, ibtidoiy `5` qiymatini belgilash e'tiborsiz qoldiriladi.

Ob'ektda kalit-qiymat juftligini o'zboshimchalik bilan saqlashni va mehmonga kalitlarni ko'rsatishga ruxsat berishni istasak, bu xatolar va hatto zaifliklar manbai bo'lishi mumkin.

Bunday holda, mehmon "__proto__" ni kalit sifatida tanlashi mumkin va tayinlash mantig'i buziladi (yuqorida ko'rsatilganidek).

Ob'ektlarni "__proto__" ni odatiy xususiyat sifatida ko'rib chiqishning bir usuli bor, uni keyinroq ko'rib chiqamiz, lekin avval ob'ektlar haqida ko'proq bilishimiz kerak.
Shuningdek, o'zboshimchalik bilan kalitlarni qo'llab-quvvatlaydigan <info:map-set-weakmap-weakset> bobida bilib oladigan yana bir ma'lumotlar tuzilishi [Map](info:map-set-weakmap-weakset) mavjud.
````


## O'zgaruvchan xususiyati

Haqiqiy kodda biz ko'pincha mavjud o'zgaruvchanlarni qiymat sifatida xususiyat nomlari uchun ishlatamiz.

Masalan:

```js run
function makeUser(name, age) {
  return {
    name: name,
    age: age
    // ...boshqa xususiyatlar
  };
}

let user = makeUser("John", 30);
alert(user.name); // John
```

Yuqoridagi misolda, "name" va "age" xususiyatlarining nomi o'zgaruvchanlar nomlari bilan mos keladi, biz bu xususiyatlarning qiymatlari sifatida o'rnini bosamiz. Ushbu yondashuv juda keng tarqalgan bo'lib, ushbu yozuvni soddalashtirish uchun maxsus *qisqa xususiyatlar* mavjud.

`name: name` o'rniga biz shunchaki `name` yozishimiz mumkin:

```js
function makeUser(name, age) {
*!*
  return {
    name, // name: name bilan bir xil
    age   // age: age bilan bir xil
    // ...
  };
*/!*
}
```

Oddiy xususiyatlardan va qisqa xususiyatlar bir xil ob'ektda foydalanishimiz mumkin:

```js
let user = {
  name,  // age: age bilan bir xil
  age: 30
};
```

## Xususiyat mavjudligini tekshirish, operator "in"

Boshqa ko'plab tillardan farqli o'laroq, JavaScript ob'ektlarining o'ziga xos qulayligi shundaki u har qanday xususiyatga kirish imkonini beradi. Xususiyatlar mavjud bo'lmasa ham, hech qanday xato bo'lmaydi! Yo'q bo'lgan xususiyatga murojaat qilganda, `undefined` qaytariladi. Bu faqat xususiyatning mavjudligini tekshirish imkonini beradi:

```js run
let user = {};

alert( user.noSuchProperty === undefined ); // true "bunday xususiyat yo'q" degan ma'noni anglatadi
```

Shuningdek, mulk mavjudligini tekshirish uchun `"in"` maxsus operatori mavjud.

Sintaksis:
```js
"key" in object
```

Masalan:

```js run
let user = { name: "John", age: 30 };

alert( "age" in user ); // true, user.age mavjud
alert( "blabla" in user ); // false, user.blabla mavjud emas
```

Iltimos, `in` ning chap tomonida *xususiyat nomi* bo'lishi kerakligini unutmang. Odatda bu tirnoq ostidagi matn.

Agar biz tirnoqni olib tashlab qo'ysak, bu haqiqiy nomni o'z ichiga olgan o'zgaruvchanning tekshirilishini anglatadi. Masalan:

```js run
let user = { age: 30 };

let key = "age";
alert( *!*key*/!* in user ); // true, nomni key-dan oladi va bunday xususiyatni tekshiradi
```

````smart header=" \"in\" ni `undefined` saqlaydigan xususiyatlar uchun ishlatish"
Odatda, `"=== undefined"` tekshiruvi yaxshi ishlaydi. Muvaffaqiyatsiz bo'lgan maxsus holatlarda, `in` to'g'ri ishlaydi.

Ob'ekt xususiyati mavjud bo'lganda, lekin `undefined` ni saqlaganda:

```js run
let obj = {
  test: undefined
};

alert( obj.test ); // u aniqlanmagan, demak - bunday xususiyat yo'qmi?

alert( "test" in obj ); // true, xususiyat mavjud!
```


Yuqoridagi kodda `obj.test` xususiyati texnik jihatdan mavjud. Shunday qilib, `in` operatori to'g'ri ishlaydi.

Bu kabi holatlar juda kamdan-kam hollarda bo'ladi, chunki `undefined` odatda tayinlanmaydi. Biz "noma'lum" yoki "bo'sh" qiymatlar uchun asosan `null` dan foydalanamiz. Shunday qilib, `in` operatori koddagi ekzotik mehmondir.
````


## "for..in" tsikli

Ob'ektning barcha kalitlari bo'ylab yurish uchun tsiklning maxsus shakli mavjud: `for..in`. Bu biz oldin o'rgangan `for(;;)` konstruktsiyadan butunlay boshqacha narsa.

Sintaksis:

```js
for (key in object) {
  // ob'ekt xususiyatlari orasida har bir kalit uchun kod tanasini bajaradi
}
```

Masalan, `user` ning barcha xususiyatlarini chiqaramiz:

```js run
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user) {
  // kalitlar
  alert( key );  // name, age, isAdmin
  // kalitlardan olingan qiymatlar
  alert( user[key] ); // John, 30, true
}
```

E'tibor bering, barcha "for" konstruktsiyalari tsikl ichidagi tsikl o'zgaruvchani e'lon qilishga imkon beradi, masalan, `let key` bu yerda.

Bundan tashqari, biz bu yerda `key` o'rniga boshqa o'zgaruvchan nomdan foydalanishimiz mumkin. Masalan, `"for (let prop in obj)"` ham keng qo'llaniladi.


### Ob'ektning xususiyatlarini tartibga solish

Ob'ektning xususiyatlari tartibga solinganmi? Boshqacha qilib aytadigan bo'lsak, biz ob'ektning barcha xususiyatlarini tsiklda ko'rib chiqsak, ularni biz qo'shgan tartibda olamizmi? Bunga ishonishimiz mumkinmi?

Qisqa javob: "xususiyatlar maxsus tarzda tartibga solinadi": butun sonli xususiyatlar saralanadi, boshqalari yaratilish tartibida ko'rinadi. Keling, batafsil ko'rib chiqaylik.

Masalan, telefon kodlari bilan ob'ekt:

```js run
let codes = {
  "49": "Germaniya",
  "41": "Shveytsariya",
  "44": "Buyuk Britaniya",
  // ..,
  "1": "AQSH"
};

*!*
for (let code in codes) {
  alert(code); // 1, 41, 44, 49
}
*/!*
```

Ob'ekt foydalanuvchiga variantlar ro'yxatini taklif qilish uchun ishlatilishi mumkin. Agar biz asosan nemis auditoriyasi uchun sayt yaratayotgan bo'lsak, ehtimol `49` birinchi bo'lishini xohlaymiz.

Ammo kodni ishlatsak, biz butunlay boshqacha natijani ko'ramiz:

- Birinchi o'rinda AQSh (1) turadi
- keyin Shveytsariya (41) va boshqalar.

Telefon kodlari o'sish tartibida boradi, chunki ular butun sonlardir. Shunday qilib biz `1, 41, 44, 49` ni ko'rmoqdamiz.

````smart header="Butun sonli xususiyatlar? Nima u?"
Bu yerda "butun sonli xususiyat" atamasi o'zgaruvchisiz butun songa va matnga aylantirilishi mumkin bo'lgan matni anglatadi.

Shunday qilib, "49" - bu butun sonli xususiyat nomi, chunki u butun songa va orqaga o'zgartirilganda, u hanuzgacha bir xil bo'ladi. Ammo "+49" va "1.2" unday emas:

```js run
// Math.trunc kasr qismini olib tashlaydigan ichki funktsiya
alert( String(Math.trunc(Number("49"))) ); // "49", bir xil, butun sonli xususiyat
alert( String(Math.trunc(Number("+49"))) ); // "49", bir xil emas "+49" ⇒ butun sonli xususiyat emas
alert( String(Math.trunc(Number("1.2"))) ); // "1", bir xil emas "1.2" ⇒ butun sonli xususiyat emas
```
````

...Boshqa tomondan, agar kalitlar tamsayı bo'lmagan bo'lsa, ular yaratish tartibida keltirilgan, masalan:

```js run
let user = {
  name: "John",
  surname: "Smith"
};
user.age = 25; // yana bittasini qo'shing

*!*
// tamsayi bo'lgan xususiyatlar yaratish tartibida keltirilgan
*/!*
for (let prop in user) {
  alert( prop ); // name, surname, age
}
```

Shunday qilib, telefon kodlari bilan bog'liq muammoni hal qilish uchun biz kodlarni butun sonli qilib "g'irromlik" qilish mumkin. Har bir koddan oldin plyus `"+"` belgisini qo'shish kifoya.

Shunga o'xshash:

```js run
let codes = {
  "+49": "Germaniya",
  "+41": "Shveytsariya",
  "+44": "Buyuk Britaniya",
  // ..,
  "+1": "AQSH"
};

for (let code in codes) {
  alert( +code ); // 49, 41, 44, 1
}
```

Endi u maqsadga muvofiq ishlaydi.

## Havola orqali nusxalash

Ob'ektlarning ibtidoiylarga nisbatan tub farqlaridan biri shundaki, ular "havolani" saqlanadi va nusxalanadi.

Ibtidoiy qiymatlar: satrlar, raqamlar, mantiqiy belgilar - "butun qiymat sifatida" tayinlanadi/ko'chiriladi.

Masalan:

```js
let message = "Salom!";
let phrase = message;
```

Natijada ikkita mustaqil o'zgaruvchanimiz bor, ularning har biri `"Salom!"` matnini saqlamoqda.

![](variable-copy-value.svg)

Ob'ektlar bunday emas.

**O'zgaruvchan ob'ektning o'zini emas, balki uning "xotiradagi manzili" ni, boshqacha aytganda unga "havola" ni saqlaydi.**

Ob'ekt uchun misoli:

```js
let user = {
  name: "John"
};
```

![](variable-contains-reference.svg)

Bu yerda ob'ekt xotirani bir joyida saqlanadi. Va `user` o'zgaruvchani unga "havola" ga ega.

**Ob'ekt o'zgaruvchani ko'chirilganda - havolalar nusxasi olinadi, ob'ekt takrorlanmaydi.**

Agar biz ob'ektni quti sifatida tasavvur qilsak, u holda o'zgaruvchan uning kalitidir. O'zgaruvchanni nusxalash qutining o'zini emas, kalitni nusxalaydi.

Masalan:

```js no-beautify
let user = { name: "John" };

let admin = user; // havolani nusxalash
```

Endi bizda ikkita o'zgaruvchanimiz bor, ularning ikkalasi bir xil ob'ektga murojaat qiladi:

![](variable-copy-reference.svg)

Qutiga kirish va uning tarkibini o'zgartirish uchun har qanday o'zgaruvchandan foydalanishimiz mumkin:

```js run
let user = { name: 'John' };

let admin = user;

*!*
admin.name = 'Pete'; // "admin" havolasi bilan o'zgartirilgan
*/!*

alert(*!*user.name*/!*); // 'Pete', o'zgarishlar "user" havolasidan ko'rinadi
```

Yuqoridagi misol faqat bitta ob'ekt mavjudligini ko'rsatadi. Go'yo bizda ikkita kalitli quti bor edi va unga kirish uchun ulardan birini (`admin`) ishlatdik. Keyinchalik, agar biz boshqa kalitni (`user`) ishlatsak, o'zgarishlarni ko'rgan bo'lardik.

### Havola bo'yicha taqqoslash

Ob'ektlar uchun tenglik `==` va qat'iy tenglik `===` bir xil ishlaydi.

**Ikkita ob'ekt teng bo'ladi, agar ular bir xil ob'ekt bo'lsa.**

Masalan, ikkita o'zgaruvchan bitta ob'ektga murojaat qiladi, ular tengdir:

```js run
let a = {};
let b = a; // havolani nusxalash

alert( a == b ); // true, ikkala o'zgaruvchan ham bitta ob'ektga murojaat qiladi
alert( a === b ); // true
```

Va bu yerda ikkita mustaqil ob'ekt teng emas, garchi ikkalasi ham bo'sh bo'lsa:

```js run
let a = {};
let b = {}; // ikkita mustaqil ob'ekt

alert( a == b ); // false
```

`obj1 > obj2` kabi taqqoslashlar yoki ibtidoiy `obj == 5` bilan taqqoslash uchun ob'ektlar ibtidoiylarga aylantiriladi. Ob'ektni konvertatsiya qanday ishlashini juda tez orada o'rganamiz, ammo haqiqatni aytish uchun bunday taqqoslash juda kamdan-kam hollarda kerak bo'ladi va odatda bu kodlash xatosi natijasidir.

### Const ob'ekt

`const` deb e'lon qilingan ob'ekt o'zgartirilishi *mumkin*.

Masalan:

```js run
const user = {
  name: "John"
};

*!*
user.age = 25; // (*)
*/!*

alert(user.age); // 25
```

`(*)` satri xatoga olib keladi dib o'ylashingiz mumkin, ammo yo'q, umuman muammo yo'q. Buning sababi, `const"` `user` ning o'zi qiymatini to'g'rilaydi. Va bu erda `user` har doim bitta ob'ektga havolani saqlaydi. `(*)` satri  ob'ektga *ichiga* kiradi, u `user` ni qayta tayinlamaydi.

Agar `user` ga boshqa narsa qo'shmoqchi bo'lsak, `const` xatoga yo'l qo'yishi mumkin, masalan:

```js run
const user = {
  name: "John"
};

*!*
// Xato (user-ni qayta tayinlash mumkin emas)
*/!*
user = {
  name: "Pete"
};
```

...Ammo konstanta ob'ekt xususiyatlarini yaratmoqchi bo'lsak nima bo'ladi? Shunday qilib, `user.age = 25` xatoga yo'l qo'yishi mumkin. Biz buni <info:property-descriptors> bobida ko'rib chiqamiz.

## Klonlash va birlashtirish, Object.assign

Shunday qilib, ob'ekt o'zgaruvchanini nusxalash, xuddi shu ob'ektga yana bitta havolani yaratadi.

Lekin, agar biz ob'ektni takrorlashimiz kerak bo'lsa nima bo'ladi? Mustaqil nusxa yaratish, klon?

Bu ham bajarilishi mumkin, ammo biroz qiyinroq, chunki JavaScript-da buning uchun o'rnatilgan funktsiya yo'q. Aslida, bu kamdan-kam hollarda kerak. Havola bo'yicha nusxalash ko'pincha yaxshi.

But if we really want that, then we need to create a new object and replicate the structure of the existing one by iterating over its properties and copying them on the primitive level.
Ammo, agar biz buni chindan ham xohlasak, unda biz yangi ob'ektni yaratishimiz va mavjud bo'lgan tuzilmani uning xususiyatlarini takrorlash va ularni ibtidoiy darajada nusxalash orqali takrorlashimiz kerak.

Shunga o'xshash:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = {}; // yangi bo'sh ob'ekt

// unga barcha user xususiyatlarini nusxalaymiz
for (let key in user) {
  clone[key] = user[key];
}
*/!*

// endi clone - bu butunlay mustaqil klon
clone.name = "Pete"; // undagi ma'lumotni o'zgartirdik

alert( user.name ); // hali ham John
```

Buning uchun [Object.assign](mdn:js/Object/assigned) usulidan foydalanishimiz mumkin.

Sintaksis:

```js
Object.assign(dest, [src1, src2, src3...])
```

- Argumentlar `dest`, va` src1, ..., srcN` (kerak bo'lgancha ko'p bo'lishi mumkin) ob'ektlardir.
- U barcha ob'ektlarning xususiyatlarini `src1, ..., srcN` ni `dest` ga ko'chiradi. Boshqacha qilib aytganda, 2-dan boshlab barcha argumentlarning xususiyatlari 1-ga ko'chiriladi. Keyin `dest` qaytadi.

Masalan, biz undan bir nechta ob'ektalrni birlashtirish uchun foydalanishimiz mumkin:
```js
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
// permissions1 va permissions2 dan barcha xususiyatlarni user-ga ko'chiradi
Object.assign(user, permissions1, permissions2);
*/!*

// hozir user = { name: "John", canView: true, canEdit: true }
```

Agar qabul qiluvchi ob'ekt (`user`) allaqachon bir xil nomlangan xususiyatga ega bo'lsa, u qayta yoziladi:

```js
let user = { name: "John" };

// nomni qayta yozing, isAdmin-ni qo'shing
Object.assign(user, { name: "Pete", isAdmin: true });

// now user = { name: "Pete", isAdmin: true }
```

Oddiy klonlash uchun tsiklni almashtirish uchun biz `Object.assign` dan foydalanishingiz mumkin:

```js
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*
```

U `user` ning barcha xususiyatlarini bo'sh ob'ektga ko'chiradi va qaytaradi. Aslida, tsikl bilan bir xil, ammo qisqaroq.

Hozirgacha biz `user` ning barcha xususiyatlari ibtidoiy deb taxmin qildik. Ammo xususiyatlar boshqa ob'ektlarga havolalar bo'lishi mumkin. Ular bilan nima qilish kerak?

Like this:
```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

alert( user.sizes.height ); // 182
```

Endi `clone.sizes = user.sizes` nusxasini olishning o'zi kifoya emas, chunki` user.sizes` ob'ekt bo'lib, u havola yordamida ko'chiriladi. Shunday qilib, `clone` va `user` bir xil o'lchamga ega bo'ladi:

Shunga o'xshash:
```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

alert( user.sizes === clone.sizes ); // true, bir xil ob'ekt

// user va clone o'lchamni ulushadi
user.sizes.width++;       // xususiyatni bir joydan o'zgartirish
alert(clone.sizes.width); // 51, natijasini boshqasidan ko'ring
```

Buni tuzatish uchun biz `user[key]` ning har bir qiymatini tekshiradigan klonlash tsiklidan foydalanishimiz kerak va agar u ob'ekt bo'lsa, unda uning tuzilishini ham takrorlashi kerark. Bu `chuqur klonlash` deyiladi.

Yuqorida keltirilgan va murakkabroq holatlarni ko'rib chiqadigan chuqur klonlash uchun standart algoritm mavjud [Structured cloning algoritm](http://w3c.github.io/html/infrastructure.html#safe-passing-of-structured-data ). G'ildirakni qayta kashf qilmaslik uchun biz uni JavaScript kutubxonasidan [lodash](https://lodash.com) ishlaydigan dasturidan foydalanishimiz mumkin, bu usul [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).



## Xulosa

Ob'ektlar bir nechta maxsus xususiyatlarga ega bo'lgan assotsiativ massivlardir.

Ular xususiyatlarni saqlaydi (kalit-qiymat juftliklari), bu erda:
- Xususiyat kalitlari matn yoki belgi (odatda matn) bo'lishi kerak.
- Qiymatlar har qanday turda bo'lishi mumkin.

Xususiyatga murojaat qilish uchun biz quyidagilardan foydalanishingiz mumkin:
- Nuqta belisi yozuvi: `obj.property`.
- Kvadrat qavslar yozuvi `obj["property"]`. Kvadrat qavs kalitni o'zgaruvchandan olishga imkon beradi, masalan `obj[varWithKey]`.

Qo'shimcha operatorlar:
- Xususiyatni o'chirish uchun: `delete obj.prop`.
- Berilgan kalitga ega xususiyat mavjudligini tekshirish uchun: `"key" in obj`.
- Ob'ekt ustida takrorlash uchun: `for (let key in obj)` tsikl.

Ob'ektlar tayinlanadi va havola orqali nusxalanadi. Boshqacha qilib aytganda, o'zgaruvchanda "ob'ekt qiymati" emas, balki qiymat uchun "havola" (xotiradagi manzil) saqlanadi. Shunday qilib, bunday o'zgaruvchanni nusxalash yoki uni funktsiya argumenti sifatida topshirish ob'ektni emas, balki havola nusxasini yaratadi. Nusxalangan havolalar orqali barcha operatsiyalar (masalan, xususiyatlarni qo'shish/o'chirish kabi) bitta ob'ektda amalga oshiriladi.

"Haqiqiy nusxa" (klon) yaratish uchun biz `Object.assign` yoki [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) dan foydalanishimiz mumkin.

Ushbu bobda biz o'rgangan narsalar "oddiy ob'ekt" yoki shunchaki `Ob'ekt` deb nomlanadi.

JavaScript-da boshqa ko'plab turdagi ob'ektlar mavjud:

- `Massiv` saflangan ma'lumotlar to'plamini saqlash uchun,
- `Sana` sana va vaqt haqidagi ma'lumotlarni saqlash uchun,
- `Xato` haqida ma'lumotni saqlash uchun xato.
- ...Va hokazo.

Ularning o'ziga xos xususiyatlari bor, ularni keyinroq o'rganib chiqamiz. Ba'zan odamlar "Massiv turi" yoki "Sana turi" kabi narsalarni aytishadi, lekin rasmiy ravishda ular o'zlarining turiga ega emas, balki bitta "ob'ekt" ma'lumot turiga tegishli. Va ular uni turli yo'llar bilan kengaytirmoqdalar.

JavaScript-dagi ob'ektlar juda kuchli. Bu yerda biz haqiqatan ham juda katta mavzuni ko'rib chiqdik. O'quv qo'llanmasining keyingi qismlarida biz ob'ektlar bilan yaqindan korib chiqamiz va ular haqida ko'proq bilib olamiz.
