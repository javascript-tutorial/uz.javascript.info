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

Qahva mashinasining ishonchliligi va soddaligi siri -- barcha tafsilotlar yaxshi sozlangan va ichkarida _yashiringan_.

Agar biz kofe mashinasidan himoya qopqog'ini olib tashlasak, unda undan foydalanish ancha murakkab bo'ladi (qayerga bosish kerak?) Va xavfli (elektr toki urishi mumkin).

Ko'rib turganimizdek, dasturlashda obyektlar kofe mashinalariga o'xshaydi.

Ammo ichki tafsilotlarni yashirish uchun biz himoya qopqog'idan emas, balki til va konventsiyalarning maxsus sintaksisidan foydalanamiz.

## Ichki va tashqi interfeys

Obyektga yo'naltirilgan dasturlashda xususiyatlar va usullar ikki guruhga bo'linadi:

- _Ichki interfeys_ -- usullar va xususiyatlar, klassning boshqa usullaridan foydalanish mumkin, ammo tashqaridan emas.
- _Tashqi interfeys_ -- usullari va xususiyatlari, klass tashqarisida ham mavjud.

Agar biz kofe mashinasi bilan o'xshashlikni davom ettirsak -- uning ichida yashiringan narsa: qozon trubkasi, isitish elementi va boshqalar -- bu uning ichki interfeysi.

Obyektning ishlashi uchun ichki interfeys ishlatiladi, uning tafsilotlari bir-biridan foydalanadi. Masalan, qozon trubkasi isitish elementiga biriktirilgan.

Ammo tashqaridan kofe mashinasi himoya qopqog'i bilan yopilgan, shunda hech kim ularga yetib bormaydi. Tafsilotlar yashiringan va ularga kirish mumkin emas. Biz uning xususiyatlaridan tashqi interfeys orqali foydalanishimiz mumkin.

Shunday qilib, biz obyekt haqida kerak bo'lgan narsa, uning tashqi interfeysini bilishdir. Ichkarida qanday ishlashini umuman bilmasligimiz mumkin va bu juda yaxshi.

Bu umumiy kirish edi.

JavaScript-da uchta xususiyat va a'zolar mavjud:

- Ommaviy: istalgan joydan kirish mumkin. Ular tashqi interfeysni o'z ichiga oladi. Hozirga qadar biz faqat ommaviy xususiyat va usullardan foydalanganmiz.
- Shaxsiy: faqat klass ichidan kirish mumkin. Bu ichki interfeys uchun.

Ko'pgina boshqa tillarda "himoyalangan" maydonlar mavjud: ularga faqat klass ichkarisidan va uni kengaytiradigan joylardan kirish mumkin. Ular ichki interfeys uchun ham foydalidir. Ular ma'lum ma'noda xususiylarga qaraganda kengroq tarqalgan, chunki biz odatda kengaytmani to'g'ri bajarish uchun meros qilib olingan klasslarni xohlaymiz.

Himoyalangan maydonlar JavaScript-da til darajasida amalga oshirilmaydi, ammo amalda ular juda qulaydir, shuning uchun ular taqlid qilinadi.

Keyingi bosqichda biz ushbu turdagi barcha xususiyatlarga ega bo'lgan JavaScript-da kofe mashinasini tayyorlaymiz. Qahva mashinasida juda ko'p tafsilotlar bor, biz ularni sodda saqlash uchun modellashtirmaymiz (iloji bo'lsa ham).

## "WaterAmount" ni himoya qilish

Avval oddiy kofe mashinasi klassini yarataylik:

```js run
class CoffeeMachine {
  waterAmount = 0; // ichidagi suv miqdori

  constructor(power) {
    this.power = power;
    alert(`Qahva mashinasi yaratildi, quvvat: ${power}`);
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

Bu til darajasida amalga oshirilmaydi, ammo bunday xususiyatlar va usullarga tashqi tomondan kirish mumkin emas degan kelishuv mavjud. Ko'pgina dasturchilar unga amal qilishadi.

Shunday qilib, bizning xususiyatimiz `_waterAmount` deb nomlanadi:

```js run
class CoffeeMachine {
  _waterAmount = 0;

  set waterAmount(value) {
    if (value < 0) throw new Error("Salbiy suv");
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

// suv qo'shing
coffeeMachine.waterAmount = -10; // Error: Salbiy suv
```

Endi kirish nazorat ostida, shuning uchun suvni noldan pastga o'rnatish muvaffaqiyatsiz tugadi.

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
    if (value < 0) throw new Error("Salbiy suv");
    this._waterAmount = value;
  }

  *!*getWaterAmount()*/!* {
    return this._waterAmount;
  }
}

new CoffeeMachine().setWaterAmount(100);
```

Bu biroz ko'proq ko'rinadi, ammo funktsiyalar yanada moslashuvchan. Ular bir nechta argumentlarni qabul qilishlari mumkin (hattoki bizga hozir kerak bo'lmasa ham). Shunday qilib, kelajak uchun, agar biror narsani qayta ishlashimiz kerak bo'lsa, funktsiyalar xavfsizroq tanlovdir.

Albatta, bu yerda savdo-sotiq mavjud. Boshqa tomondan, get/set sintaksisini qisqartiradi, shuning uchun oxir-oqibat qat'iy qoidalar yo'q, shuning uchun siz qaror qilishingiz kerak.
````

```smart header="Himoyalangan maydonlar meros qilib olinadi"
Agar biz `class MegaMachine extends CoffeMachine` ni kengaytiradigan bo'lsak, bizga yangi klass usullaridan `this._waterAmount` yoki `this._power` ga kirishimizga hech narsa to'sqinlik qilmaydi.

Shunday qilib, muhofaza qilinadigan maydonlar tabiiy ravishda meros bo'lib olinadi. Xususiylardan farqli o'laroq, biz quyida ko'rib chiqamiz.
```

## Xususiy "#waterLimit"

[recent browser=none]

Xususiy xususiyatlar va usullar uchun til darajasida qo'llab-quvvatlashni ta'minlaydigan deyarli standartga mos JavaScript taklifi mavjud.

Maxfiy ma'lumotlar `#` dan boshlanishi kerak. Ularga faqat klass ichidan kirish mumkin.

Masalan, biz bu yerda xususiy `#waterLimit` xususiyatini qo'shamiz va suvni tekshirish mantig'ini alohida usulga ajratamiz:

```js run
class CoffeeMachine {
*!*
  #waterLimit = 200;
*/!*

*!*
  #checkWater(value) {
    if (value < 0) throw new Error("Salbiy suv");
    if (value > this.#waterLimit) throw new Error("Juda ko'p suv");
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

coffeeMachine.waterAmount = 100; // Ishlaydi
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
    if (value < 0) throw new Error("Salbiy suv");
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

Ko'pgina stsenariylarda bunday cheklash juda jiddiy. Agar biz CoffeeMachine-ni kengaytirsak, uning ichki qismiga kirish uchun qonuniy sabablarga ega bo'lishimiz mumkin. Shuning uchun himoyalangan maydonlar ko'pincha til sintaksisida qo'llab-quvvatlanmasa ham ishlatiladi.

````warn
Shaxsiy maydonlar alohida ahamiyatga ega.

Esingizda bo'lsin, odatda biz this[name] yordamida maydonlariga kirishimiz mumkin:

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

OOP nuqtai nazaridan ichki interfeysni tashqi interfeysdan ajratish deyiladi [inkapsulatsiya](<"https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)">).

Bu quyidagi afzalliklarni beradi:

O'zlarini oyoqlariga otmasliklari uchun foydalanuvchilarni himoya qilish
: Tasavvur qiling, kofe mashinasidan foydalangan holda ishlab chiquvchilar jamoasi mavjud. U "Best CoffeeMachine" kompaniyasi tomonidan tayyorlangan va yaxshi ishlaydi, ammo himoya qoplamasi olib tashlangan. Shunday qilib, ichki interfeys ochiladi.

    Barcha ishlab chiquvchilar madaniyatli -- ular kofe mashinasidan maqsadga muvofiq foydalanadilar. Ammo ulardan biri John eng aqlli ekaniga qaror qildi va qahva mashinasining ichki qismida bir oz o'zgartirishlar kiritdi. Shunday qilib, ikki kundan keyin qahva mashinasi ishlamay qoldi.

    Bu shubhasiz Jonhning aybi emas, aksincha himoya qopqog'ini olib tashlagan va uning manipulyatsiyasini Jonhga bergan odam ayibdordir.

    Dasturlashda ham xuddi shunday. Agar klass foydalanuvchisi tashqi tomondan o'zgartirilishi mo'ljallanmagan narsalarni o'zgartirsa - oqibatlari oldindan aytib bo'lmaydi.

Qo'llab-quvvatlanadigan
: Dasturlashdagi vaziyat haqiqiy hayot qahva mashinasiga qaraganda ancha murakkab, chunki biz uni bir marta sotib olmaymiz. Kod doimiy ravishda ishlab chiqilib va takomillashib boradi.

    **Agar biz ichki interfeysni qat'iy chegaralab qo'ysak, u holda klass ishlab chiqaruvchisi o'zining ichki xususiyatlari va usullarini, hatto foydalanuvchilarga xabar bermasdan ham, bemalol o'zgartirishi mumkin.**

    Ishlab chiqish ancha oson, agar ma'lum usullarning nomini o'zgartirish, ularning parametrlarini o'zgartirish va hatto olib tashlash mumkinligini bilsangiz, chunki hech qanday tashqi kod ularga bog'liq emas.

    Foydalanuvchilar uchun yangi versiya chiqqandan so'ng, u butunlay ta'mirlanishi mumkin, ammo tashqi interfeys bir xil bo'lsa, uni yangilash oson.

Murakkablikni yashirish
: Odamlar oddiy narsalarni ishlatishni yaxshi ko'rishadi. Hech bo'lmaganda tashqaridan. Ichkarida bo'lgan narsa boshqacha.

    Dasturchilar ham bundan mustasno emas.

    **Amalga oshirish tafsilotlari yashirin bo'lsa, u har doim qulay bo'ldi, va oddiy, yaxshi hujjatlashtirilgan tashqi interfeysi mavjud.**

Ichki interfeysni yashirish uchun biz himoyalangan yoki umumiy xususiyatlardan foydalanamiz:

- Himoyalangan maydonlar `_` dan boshlanadi. Bu taniqli anjuman, til darajasida bajarilmagan. Dasturchilar faqat o'z sinfidan `_` dan boshlanadigan maydonga va undan meros qolgan klasslarga kirishlari kerak.
- Shaxsiy maydonlar `#` bilan boshlanadi. JavaScript biz faqat sinf ichidagilarga kira olishimizga ishonch hosil qiladi.

Hozirda shaxsiy maydonlar brauzerlar orasida yaxshi qo'llab-quvvatlanmaydi, lekin ularni to'ldirish mumkin.
