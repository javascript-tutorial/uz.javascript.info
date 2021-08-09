
# Xususiy va himoyalangan xususiyatlar va usullar

Obyektga yo'naltirilgan dasturlashning eng muhim tamoyillaridan biri -- ichki interfeysni tashqi interfeysdan ajratish.

Bu "salom dunyo" dasturidan ko'ra murakkabroq narsani ishlab chiqishda "majburiy" amaliyotdir.

Buni tushunish uchun, rivojlanishdan ajralib, ko'zimizni haqiqiy dunyoga aylantiraylik.

Odatda biz foydalanadigan qurilmalar juda murakkab. Ammo ichki interfeysni tashqi interfeysdan ajratish ularni muammosiz ishlatishga imkon beradi.

## Hayotiy misol

Masalan, kofe mashinasi. Tashqaridan oddiy: tugma, displey, bir nechta teshiklar ... Va, albatta, natija - ajoyib qahva! :)

![](coffee.jpg)

Ammo ichkarida ... (ta'mirlash qo'llanmasidagi rasm)

![](coffee-inside.jpg)

Ko'p tafsilotlar. Ammo biz hech narsani bilmasdan foydalanishimiz mumkin.

Qahva mashinalari juda ishonchli, shunday emasmi? Biz uni bir necha yillar davomida ishlatishimiz mumkin va agar biror narsa noto'g'ri bo'lsa -- uni ta'mirlash uchun olib boramiz.

Qahva mashinasining ishonchliligi va soddaligi siri -- barcha tafsilotlar yaxshi sozlangan va ichkarida *yashiringan*.

Agar biz kofe mashinasidan himoya qopqog'ini olib tashlasak, unda undan foydalanish ancha murakkab bo'ladi (qayerga bosish kerak?) Va xavfli (elektr toki urishi mumkin).

Ko'rib turganimizdek, dasturlashda obyektlar kofe mashinalariga o'xshaydi.

Ammo ichki tafsilotlarni yashirish uchun biz himoya qopqog'idan emas, balki til va konventsiyalarning maxsus sintaksisidan foydalanamiz.

## Ichki va tashqi interfeys

Obyektga yo'naltirilgan dasturlashda xususiyatlar va usullar ikki guruhga bo'linadi:

- *Ichki interfeys* -- usullar va xususiyatlar, klassning boshqa usullaridan foydalanish mumkin, ammo tashqaridan emas.
- *Tashqi interfeys* -- usullari va xususiyatlari, klass tashqarisida ham mavjud.

Agar biz kofe mashinasi bilan o'xshashlikni davom ettirsak -- uning ichida yashiringan narsa: qozon trubkasi, isitish elementi va boshqalar -- bu uning ichki interfeysi.

Obyektning ishlashi uchun ichki interfeys ishlatiladi, uning tafsilotlari bir-biridan foydalanadi. Masalan, qozon trubkasi isitish elementiga biriktirilgan.

Ammo tashqaridan kofe mashinasi himoya qopqog'i bilan yopilgan, shunda hech kim ularga yetib bormaydi. Tafsilotlar yashiringan va ularga kirish mumkin emas. Biz uning xususiyatlaridan tashqi interfeys orqali foydalanishimiz mumkin.

Shunday qilib, biz obyekt haqida kerak bo'lgan narsa, uning tashqi interfeysini bilishdir. Ichkarida qanday ishlashini umuman bilmasligimiz mumkin va bu juda yaxshi.

Bu umumiy kirish edi.

<<<<<<< HEAD
JavaScript-da uchta xususiyat va a'zolar mavjud:

- Ommaviy: istalgan joydan kirish mumkin. Ular tashqi interfeysni o'z ichiga oladi. Hozirga qadar biz faqat ommaviy xususiyat va usullardan foydalanganmiz.
- Shaxsiy: faqat klass ichidan kirish mumkin. Bu ichki interfeys uchun.

Ko'pgina boshqa tillarda "himoyalangan" maydonlar mavjud: ularga faqat klass ichkarisidan va uni kengaytiradigan joylardan kirish mumkin. Ular ichki interfeys uchun ham foydalidir. Ular ma'lum ma'noda xususiylarga qaraganda kengroq tarqalgan, chunki biz odatda kengaytmani to'g'ri bajarish uchun meros qilib olingan klasslarni xohlaymiz.
=======
In JavaScript, there are two types of object fields (properties and methods):

- Public: accessible from anywhere. They comprise the external interface. Until now we were only using public properties and methods.
- Private: accessible only from inside the class. These are for the internal interface.

In many other languages there also exist "protected" fields: accessible only from inside the class and those extending it (like private, but plus access from inheriting classes). They are also useful for the internal interface. They are in a sense more widespread than private ones, because we usually want inheriting classes to gain access to them.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Himoyalangan maydonlar JavaScript-da til darajasida amalga oshirilmaydi, ammo amalda ular juda qulaydir, shuning uchun ular taqlid qilinadi.

<<<<<<< HEAD
Keyingi bosqichda biz ushbu turdagi barcha xususiyatlarga ega bo'lgan JavaScript-da kofe mashinasini tayyorlaymiz. Qahva mashinasida juda ko'p tafsilotlar bor, biz ularni sodda saqlash uchun modellashtirmaymiz (iloji bo'lsa ham).
=======
Now we'll make a coffee machine in JavaScript with all these types of properties. A coffee machine has a lot of details, we won't model them to stay simple (though we could).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## "WaterAmount" ni himoya qilish

Avval oddiy kofe mashinasi klassini yarataylik:

```js run
class CoffeeMachine {
  waterAmount = 0; // ichidagi suv miqdori

  constructor(power) {
    this.power = power;
    alert( `Qahva mashinasi yaratildi, quvvat: ${power}` );
  }

}

// kofe mashinasini yarating
let coffeeMachine = new CoffeeMachine(100);

// suv qo'shing
coffeeMachine.waterAmount = 200;
```

Hozirda `waterAmount` va `power` xususiyatlari hammaga ma'lum. Biz ularni osongina tashqaridan istalgan qiymatga yetkazamiz/o'rnatamiz.

Keling, `waterAmount` xususiyatini himoyalanganga o'zgartirib, uni ko'proq nazorat qilamiz. Masalan, biz hech kim uni noldan pastga qo'yishini xohlamaymiz.

**Himoyalangan xususiyatlar odatda pastki chiziq bilan `_` belgilanadi.**

<<<<<<< HEAD
Bu til darajasida amalga oshirilmaydi, ammo bunday xususiyatlar va usullarga tashqi tomondan kirish mumkin emas degan kelishuv mavjud. Ko'pgina dasturchilar unga amal qilishadi.
=======
That is not enforced on the language level, but there's a well-known convention between programmers that such properties and methods should not be accessed from the outside.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Shunday qilib, bizning xususiyatimiz `_waterAmount` deb nomlanadi:

```js run
class CoffeeMachine {
  _waterAmount = 0;

  set waterAmount(value) {
<<<<<<< HEAD
    if (value < 0) throw new Error("Salbiy suv");
=======
    if (value < 0) {
      value = 0;
    }
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }

}

// kofe mashinasini yarating
let coffeeMachine = new CoffeeMachine(100);

<<<<<<< HEAD
// suv qo'shing
coffeeMachine.waterAmount = -10; // Error: Salbiy suv
=======
// add water
coffeeMachine.waterAmount = -10; // _waterAmount will become 0, not -10
>>>>>>> bc08fd1b32285304b14afea12a9deaa10d13452b
```

<<<<<<< HEAD
Endi kirish nazorat ostida, shuning uchun suvni noldan pastga o'rnatish muvaffaqiyatsiz tugadi.
=======
Now the access is under control, so setting the water amount below zero becomes impossible.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Faqat o'qish uchun "power"

`Power` xususiyati uchun uni faqat o'qish imkoniyatiga ega qilaylik. Ba'zan shunday bo'ladi, chunki xususiyat faqat yaratilish vaqtida o'rnatilishi kerak, keyin hech qachon o'zgartirilmaydi.

Bu kofe mashinasi uchun aynan shunday: quvvat hech qachon o'zgarmaydi.

Buning uchun biz faqat getter qilishimiz kerak, lekin setter emas:

```js run
class CoffeeMachine {
  // ...

  constructor(power) {
    this._power = power;
  }

  get power() {
    return this._power;
  }

}

// kofe mashinasini yarating
let coffeeMachine = new CoffeeMachine(100);

alert(`Quvvat: ${coffeeMachine.power}W`); // Quvvat: 100W

coffeeMachine.power = 25; // Error (no setter)
```

````smart header="Getter/setter funktsiyalari"
Bu yerda biz getter/setter sintaksisidan foydalanganmiz.

Ammo ko'pincha `get.../set...` funktsiyalari afzal ko'riladi, masalan:

```js
class CoffeeMachine {
  _waterAmount = 0;

  *!*setWaterAmount(value)*/!* {
<<<<<<< HEAD
    if (value < 0) throw new Error("Salbiy suv");
=======
    if (value < 0) value = 0;
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    this._waterAmount = value;
  }

  *!*getWaterAmount()*/!* {
    return this._waterAmount;
  }
}

new CoffeeMachine().setWaterAmount(100);
```

<<<<<<< HEAD
Bu biroz ko'proq ko'rinadi, ammo funktsiyalar yanada moslashuvchan. Ular bir nechta argumentlarni qabul qilishlari mumkin (hattoki bizga hozir kerak bo'lmasa ham). Shunday qilib, kelajak uchun, agar biror narsani qayta ishlashimiz kerak bo'lsa, funktsiyalar xavfsizroq tanlovdir.

Albatta, bu yerda savdo-sotiq mavjud. Boshqa tomondan, get/set sintaksisini qisqartiradi, shuning uchun oxir-oqibat qat'iy qoidalar yo'q, shuning uchun siz qaror qilishingiz kerak.
=======
That looks a bit longer, but functions are more flexible. They can accept multiple arguments (even if we don't need them right now).

On the other hand, get/set syntax is shorter, so ultimately there's no strict rule, it's up to you to decide.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
````

```smart header="Himoyalangan maydonlar meros qilib olinadi"
Agar biz `class MegaMachine extends CoffeMachine` ni kengaytiradigan bo'lsak, bizga yangi klass usullaridan `this._waterAmount` yoki `this._power` ga kirishimizga hech narsa to'sqinlik qilmaydi.

Shunday qilib, muhofaza qilinadigan maydonlar tabiiy ravishda meros bo'lib olinadi. Xususiylardan farqli o'laroq, biz quyida ko'rib chiqamiz.
```

## Xususiy "#waterLimit"

[recent browser=none]

Xususiy xususiyatlar va usullar uchun til darajasida qo'llab-quvvatlashni ta'minlaydigan deyarli standartga mos JavaScript taklifi mavjud.

Maxfiy ma'lumotlar `#` dan boshlanishi kerak. Ularga faqat klass ichidan kirish mumkin.

<<<<<<< HEAD
Masalan, biz bu yerda xususiy `#waterLimit` xususiyatini qo'shamiz va suvni tekshirish mantig'ini alohida usulga ajratamiz:
=======
For instance, here's a private `#waterLimit` property and the water-checking private method `#fixWaterAmount`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
class CoffeeMachine {
*!*
  #waterLimit = 200;
*/!*

*!*
<<<<<<< HEAD
  #checkWater(value) {
    if (value < 0) throw new Error("Salbiy suv");
    if (value > this.#waterLimit) throw new Error("Juda ko'p suv");
=======
  #fixWaterAmount(value) {
    if (value < 0) return 0;
    if (value > this.#waterLimit) return this.#waterLimit;
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  }
*/!*

  setWaterAmount(value) {
    this.#waterLimit = this.#fixWaterAmount(value);
  }

}

let coffeeMachine = new CoffeeMachine();

*!*
// can't access privates from outside of the class
coffeeMachine.#fixWaterAmount(123); // Error
coffeeMachine.#waterLimit = 1000; // Error
*/!*
<<<<<<< HEAD

coffeeMachine.waterAmount = 100; // Ishlaydi
=======
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```
.
Til darajasida `#` bu maydon shaxsiy ekanligini ko'rsatuvchi maxsus belgidir. Biz unga tashqaridan yoki meros klasslaridan kira olmaymiz.

Shaxsiy maydonlar jamoat maydonlariga zid kelmaydi. Bir vaqtning o'zida ikkala xususiy `#waterAmount` va `waterAmount` maydonlariga ega bo'lishimiz mumkin.

Masalan, `waterAmount` ni `#waterAmount` uchun kirish qismiga aylantiramiz:

```js run
class CoffeeMachine {

  #waterAmount = 0;

  get waterAmount() {
    return this.#waterAmount;
  }

  set waterAmount(value) {
<<<<<<< HEAD
    if (value < 0) throw new Error("Salbiy suv");
=======
    if (value < 0) value = 0;
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    this.#waterAmount = value;
  }
}

let machine = new CoffeeMachine();

machine.waterAmount = 100;
alert(machine.#waterAmount); // Error
```

Himoyalangan maydonlardan farqli o'laroq, shaxsiy maydonlar tilning o'zi tomonidan amalga oshiriladi. Bu yaxshi narsa.

Ammo biz `CoffeeMachine` dan meros bo'lib olsak, unda `#waterAmount` ga to'g'ridan-to'g'ri kirish imkonimiz bo'lmaydi. Biz `waterAmount` getter/setter ga ishonishimiz kerak bo'ladi:

```js
class MegaCoffeeMachine extends CoffeeMachine {
  method() {
*!*
    alert( this.#waterAmount ); // Error: faqat Coffee Machine-dan foydalanish mumkin
*/!*
  }
}
```

<<<<<<< HEAD
Ko'pgina stsenariylarda bunday cheklash juda jiddiy. Agar biz CoffeeMachine-ni kengaytirsak, uning ichki qismiga kirish uchun qonuniy sabablarga ega bo'lishimiz mumkin. Shuning uchun himoyalangan maydonlar ko'pincha til sintaksisida qo'llab-quvvatlanmasa ham ishlatiladi.

````warn
Shaxsiy maydonlar alohida ahamiyatga ega.

Esingizda bo'lsin, odatda biz this[name] yordamida maydonlariga kirishimiz mumkin:
=======
In many scenarios such limitation is too severe. If we extend a `CoffeeMachine`, we may have legitimate reasons to access its internals. That's why protected fields are used more often, even though they are not supported by the language syntax.

````warn header="Private fields are not available as this[name]"
Private fields are special.

As we know, usually we can access fields using `this[name]`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
class User {
  ...
  sayHi() {
    let fieldName = "name";
    alert(`Hello, ${*!*this[fieldName]*/!*}`);
  }
}
```

Shaxsiy maydonlarda bu mumkin emas: `this['#name']` ishlamaydi. Bu maxfiylikni ta'minlash uchun sintaksis cheklovi.
````

## Xulosa

<<<<<<< HEAD
OOP nuqtai nazaridan ichki interfeysni tashqi interfeysdan ajratish deyiladi [inkapsulatsiya]("https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)").
=======
In terms of OOP, delimiting of the internal interface from the external one is called [encapsulation](https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Bu quyidagi afzalliklarni beradi:

<<<<<<< HEAD
O'zlarini oyoqlariga otmasliklari uchun foydalanuvchilarni himoya qilish
: Tasavvur qiling, kofe mashinasidan foydalangan holda ishlab chiquvchilar jamoasi mavjud. U "Best CoffeeMachine" kompaniyasi tomonidan tayyorlangan va yaxshi ishlaydi, ammo himoya qoplamasi olib tashlangan. Shunday qilib, ichki interfeys ochiladi.
=======
Protection for users, so that they don't shoot themselves in the foot
: Imagine, there's a team of developers using a coffee machine. It was made by the "Best CoffeeMachine" company, and works fine, but a protective cover was removed. So the internal interface is exposed.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

    Barcha ishlab chiquvchilar madaniyatli -- ular kofe mashinasidan maqsadga muvofiq foydalanadilar. Ammo ulardan biri John eng aqlli ekaniga qaror qildi va qahva mashinasining ichki qismida bir oz o'zgartirishlar kiritdi. Shunday qilib, ikki kundan keyin qahva mashinasi ishlamay qoldi.

    Bu shubhasiz Jonhning aybi emas, aksincha himoya qopqog'ini olib tashlagan va uning manipulyatsiyasini Jonhga bergan odam ayibdordir.

    Dasturlashda ham xuddi shunday. Agar klass foydalanuvchisi tashqi tomondan o'zgartirilishi mo'ljallanmagan narsalarni o'zgartirsa - oqibatlari oldindan aytib bo'lmaydi.

Qo'llab-quvvatlanadigan
: Dasturlashdagi vaziyat haqiqiy hayot qahva mashinasiga qaraganda ancha murakkab, chunki biz uni bir marta sotib olmaymiz. Kod doimiy ravishda ishlab chiqilib va takomillashib boradi.

<<<<<<< HEAD
    **Agar biz ichki interfeysni qat'iy chegaralab qo'ysak, u holda klass ishlab chiqaruvchisi o'zining ichki xususiyatlari va usullarini, hatto foydalanuvchilarga xabar bermasdan ham, bemalol o'zgartirishi mumkin.**

    Ishlab chiqish ancha oson, agar ma'lum usullarning nomini o'zgartirish, ularning parametrlarini o'zgartirish va hatto olib tashlash mumkinligini bilsangiz, chunki hech qanday tashqi kod ularga bog'liq emas.

    Foydalanuvchilar uchun yangi versiya chiqqandan so'ng, u butunlay ta'mirlanishi mumkin, ammo tashqi interfeys bir xil bo'lsa, uni yangilash oson.

Murakkablikni yashirish
: Odamlar oddiy narsalarni ishlatishni yaxshi ko'rishadi. Hech bo'lmaganda tashqaridan. Ichkarida bo'lgan narsa boshqacha.
=======
    **If we strictly delimit the internal interface, then the developer of the class can freely change its internal properties and methods, even without informing the users.**

    If you're a developer of such class, it's great to know that private methods can be safely renamed, their parameters can be changed, and even removed, because no external code depends on them.

    For users, when a new version comes out, it may be a total overhaul internally, but still simple to upgrade if the external interface is the same.

Hiding complexity
: People adore using things that are simple. At least from outside. What's inside is a different thing.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

    Dasturchilar ham bundan mustasno emas.

    **Amalga oshirish tafsilotlari yashirin bo'lsa, u har doim qulay bo'ldi, va oddiy, yaxshi hujjatlashtirilgan tashqi interfeysi mavjud.**

<<<<<<< HEAD
Ichki interfeysni yashirish uchun biz himoyalangan yoki umumiy xususiyatlardan foydalanamiz:

- Himoyalangan maydonlar `_` dan boshlanadi. Bu taniqli anjuman, til darajasida bajarilmagan. Dasturchilar faqat o'z sinfidan `_` dan boshlanadigan maydonga va undan meros qolgan klasslarga kirishlari kerak.
- Shaxsiy maydonlar `#` bilan boshlanadi. JavaScript biz faqat sinf ichidagilarga kira olishimizga ishonch hosil qiladi.
=======
To hide an internal interface we use either protected or private properties:

- Protected fields start with `_`. That's a well-known convention, not enforced at the language level. Programmers should only access a field starting with `_` from its class and classes inheriting from it.
- Private fields start with `#`. JavaScript makes sure we can only access those from inside the class.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Hozirda shaxsiy maydonlar brauzerlar orasida yaxshi qo'llab-quvvatlanmaydi, lekin ularni to'ldirish mumkin.
