# F.prototype

Esingizda bo'lsin, yangi obyektlar `new F()` kabi konstruktor funktsiyasi bilan yaratilishi mumkin.

Agar `F.prototype` obyekt bo'lsa, u holda `new` operator undan yangi obyekt uchun `[[Prototype]]` ni o'rnatishda foydalanadi.

```smart
Javascript boshidan prototip merosga ega edi. Bu tilning asosiy xususiyatlaridan biri edi.

Ammo qadimgi vaqtlarda unga to'g'ridan-to'g'ri kirish imkoni yo'q edi. Ishonchli ishlaydigan yagona narsa, ushbu bobda tasvirlangan konstruktor funktsiyasining `"prototype"` vxususiyati edi. Shunday qilib, uni ishlatadigan ko'plab skriptlar mavjud
```

Iltimos e'tibor bering, `F.prototype` bu yerda `F` da `"prototype"` nomli odatiy xususiyatni anglatadi. Bu "prototype" atamasiga o'xshash bir narsaga o'xshaydi, ammo bu yerda biz haqiqatan ham ushbu nomga ega odatiy xususiyatni nazarda tutamiz.

Mana misol:

```js run
let animal = {
  eats: true
};

function Rabbit(name) {
  this.name = name;
}

*!*
Rabbit.prototype = animal;
*/!*

let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

alert( rabbit.eats ); // true
```

`Rabbit.prototype = animal` sozlamasida so'zma-so'z quyidagicha ifodalanadi: "`new Rabbit` yaratilganda, uning `[[Prototype]]` ni `animal` ga belgilang".

Natijada paydo bo'lgan rasm:

![](proto-constructor-animal-rabbit.svg)

Rasmda `"prototype"` - gorizontal o'q, odatiy xususiyatni anglatadi va `[[Prototype]]` vertikal bo'lib, `rabbit` ning `animal` dan merosxo'rligini anglatadi.

```smart header="`F.prototype`faqat`new F`vaqtida ishlatiladi"`F.prototype`xususiyati faqat`new F`chaqirilganda ishlatiladi, u yangi obyektning`[[Prototype]]`ni tayinlaydi. Shundan so'ng,`F.prototype` va yangi obyekt o'rtasida hech qanday bog'liqlik yo'q. Buni "bir martalik sovg'a" deb o'ylang.

Agar yaratilgandan so'ng, `F.prototype` xususiyati o'zgarsa (`F.prototype = <another object>`) bo'lsa, unda `new F` tomonidan yaratilgan yangi obyektlar `[[Prototype]]` nomli boshqa obyektga ega bo'ladi, lekin allaqachon mavjud narsalar eskisini saqlab qoladi.

````

## Sukut bo'yicha F.prototype, constructor xususiyat

Har qanday funktsiya `"prototype"` xususiyatiga ega, hatto biz uni ta'minlamasak ham.

Odatiy `"prototype"` funktsiyani o'zi ko'rsatadigan yagona `constructor` xususiyatiga ega bo'lgan obyekt.

Shunga o'xshash:

```js
function Rabbit() {}

/* standart prototip
Rabbit.prototype = { constructor: Rabbit };
*/
````

![](function-prototype-constructor.svg)

Biz buni tekshirib ko'rishimiz mumkin:

```js run
function Rabbit() {}
// by default:
// Rabbit.prototype = { constructor: Rabbit }

alert(Rabbit.prototype.constructor == Rabbit); // true
```

Tabiiyki, agar biz hech narsa qilmasak, `constructor` xususiyati barcha quyonlarga `[[Prototype]]` orqali mavjud:

```js run
function Rabbit() {}
// by default:
// Rabbit.prototype = { constructor: Rabbit }

let rabbit = new Rabbit(); // {constructor: Rabbit} dan meros

alert(rabbit.constructor == Rabbit); // true (prototipdan)
```

![](rabbit-prototype-constructor.svg)

Mavjud bilan bir xil konstruktor yordamida yangi obyekt yaratish uchun `constructor` xususiyatidan foydalanishimiz mumkin.

Buy erda bo'lgani kabi:

```js run
function Rabbit(name) {
  this.name = name;
  alert(name);
}

let rabbit = new Rabbit("White Rabbit");

*!*
let rabbit2 = new rabbit.constructor("Black Rabbit");
*/!*
```

Obyektga ega bo'lganimizda, buning uchun qaysi konstruktor ishlatilganligini bilmasak (masalan, u uchinchi tomon kutubxonasidan kelib chiqadi) va biz yana bir xilini yaratishimiz kerak bo'lsa bu juda qulay.

Ehtimol, `"constructor"` haqida eng muhim narsa shu...

**...JavaScript o'zi to'g'ri `"constructor"` qiymatini ta'minlamaydi.**

Ha, bu funktsiyalar uchun standart `"prototype"` da mavjud, ammo barchasi shu. Keyinchalik u bilan nima sodir bo'ladi -- bu butunlay bizdadir.

Xususan, agar biz standart prototipni umuman almashtirsak, unda unda `"constructor"` bo'lmaydi.

Masalan:

```js run
function Rabbit() {}
Rabbit.prototype = {
  jumps: true
};

let rabbit = new Rabbit();
*!*
alert(rabbit.constructor === Rabbit); // false
*/!*
```

Shunday qilib, to'g'ri `"constructor"` ni saqlab qolish uchun biz `"prototype"` ga yozish o'rniga xususiyatlarni qo'shish/o'chirishni tanlashimiz mumkin:

```js
function Rabbit() {}

// Rabbit.prototype-ni to'liq yozib bo'lmaydi
// shunchaki qo'shib qo'ying
Rabbit.prototype.jumps = true;
// standart Rabbit.prototype.constructor saqlanib qoladi
```

Yoki, muqobil ravishda, `constructor` xususiyatini qo'lda qayta yarating:

```js
Rabbit.prototype = {
  jumps: true,
*!*
  constructor: Rabbit
*/!*
};

// endi ham konstruktor to'g'ri, chunki biz uni qo'shdik
```

## Xulosa

Ushbu bobda biz konstruktor funktsiyasi orqali yaratilgan obyektlar uchun `[[Prototype]]` ni o'rnatish usulini qisqacha bayon qildik. Keyinchalik biz unga tayanadigan yanada rivojlangan dasturlash shablonlarni ko'rib chiqamiz.

Hammasi juda sodda, tushunarli bo'lishi uchun bir nechta eslatma:

- `F.prototype` xususiyati `[[Prototype]]` bilan bir xil emas. `F.prototype` qiladigan yagona narsa: `new F()` chaqirilganda yangi obyektlarning `[[Prototype]]` ni o'rnatadi.
- `F.prototype` qiymati obyekt yoki null bo'lishi kerak: boshqa qiymatlar ishlamaydi.
- `"prototype"` xususiyati faqat konstruktor funktsiyasiga o'rnatilganda va `new` bilan chaqirilganda bunday maxsus ta'sirga ega bo'ladi.

Oddiy obyektlarda `prototype` alohida ahamiyatga ega emas:

```js
let user = {
  name: "John",
  prototype: "Bla-bla", // hech qanday sehr yo'q
};
```

Odatiy bo'lib, barcha funktsiyalarda `F.prototype = {constructor: F}` mavjud, shuning uchun biz obyektning konstruktorini uning `"constructor"` xususiyatiga kirish orqali olishimiz mumkin.
