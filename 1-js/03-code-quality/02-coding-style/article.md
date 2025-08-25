# Kodlash uslubi

Bizning kodimiz iloji boricha toza va oson o'qilishi kerak.

Aslida bu dasturlash san'ati -- murakkab vazifani bajarish, uni to'g'ri va odam tushunadigan tarzda kodlash.

## Sintaksis

Bu erda ba'zi bir tavsiya etilgan qoidalar bilan rasm mavjud (batafsil ma'lumot uchun pastga qarang):

![](code-style.svg)

<!--
```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n < 0) {
  alert(`${n} darajasi  qo'llab-quvvatlanmaydi,
  iltimos, noldan katta sonni kiriting`);
} else {
  alert( pow(x, n) );
}
```

-->

Endi ularning qoidalari va sabablarini batafsil muhokama qilaylik.

```warn header="Hech qanday qoida qat'iy majburiy emas"
Bu yerda qat'iy qoidalar yo'q. Bu diniy dogmalar emas, balki uslubiy imtiyozlar.
```

### Jingalak qavslar

Ko'pgina JavaScript loyihalarida jingalak qavslar "misrcha" uslubda yozilgan bo'lib, yangi satrda emas, balki mos keladigan kalit so'z bilan bir xil satrda ochiladi. Shuningdek, ochilish qavsidan oldin bo'sh joy bo'lishi kerak:

```js
if (shart) {
  // buni qiling
  // ...va buni
  // ...va buni
}
```

Bitta satrli qurilish muhim ahamiyatga ega. Qavslarni har doim ishlatishimiz kerakmi? Agar yo'q bo'lsa, unda qayerda?

Quyida bir nechta izohli variantlar keltirilgan, ularning o'zingiz o'qilishini baholashingiz mumkin:

<!--
```js no-beautify
if (n < 0) {alert(`${n} darajasi qollab-quvvatlanmaydi`);}

if (n < 0) alert(`${n} darajasi qollab-quvvatlanmaydi`);

if (n < 0)
  alert(`${n} darajasi qollab-quvvatlanmaydi`);

if (n < 0) {
  alert(`${n} darajasi qollab-quvvatlanmaydi`);
}
```
-->

![](figure-bracket-style.png)

Xulosa uchun:

- Juda qisqa kod uchun bitta satr qabul qilinadi. Masalan: `if (cond) return null`.
- Ammo qavsdagi har bir ifoda uchun alohida satr o'qilish uchun odatda osonroq.

### Satr uzunligi

Kodning uzun gorizontal satrini o'qishni hech kim yoqtirmaydi. Ularni ajratish va chiziqlar uzunligini cheklash eng yaxshi amaliyotdir.

Satrning maksimal uzunligi jamoa darajasida kelishilgan bo'lishi kerak. Odatda 80 yoki 120 ta belgidan iborat.

### Satr boshidagi bo'shliqlar

Ikkita satr boshidagi bo'shliqlar mavjud:

- **Gorizontal satr boshidagi bo'shliqlar: 2 yoki 4 bo'shliqlar.**

  Gorizontal satr boshidagi bo'shliqlar 2 yoki 4 joy yoki "Tab" belgisi yordamida amalga oshiriladi. Qaysi birini tanlash - bu sizning ixtiyoringiz. Hozirgi kunda bo'shliqlar keng tarqalgan.

  Satr boshidagi bo'shliqlarning tabdan afzalliklaridan biri shundaki, bo'shliqlar "Tab" belgisiga qaraganda chuqurroq moslashuvchan konfiguratsiyalarga imkon beradi.

  Masalan, biz argumentlarni ochuvchi qavs bilan moslashtirishimiz mumkin, masalan:

  ```js no-beautify
  show(parametrlar,
       birin,
       ketin,
       yozilgan
    ) {
    // ...
  }
  ```

- **Vertikal satr boshidagi bo'shliqlar: kodni mantiqiy bloklarga bo'lish uchun bo'sh satrlar.**

  Hatto bitta funktsiyani ham ko'pincha mantiqiy bloklarga bo'lish mumkin. Quyidagi misolda o'zgaruvchanlarni ishga tushirish, asosiy tsikl va natijani qaytarish vertikal ravishda bo'linadi:

  ```js
  function pow(x, n) {
    let result = 1;
    //              <--
    for (let i = 0; i < n; i++) {
      result *= x;
    }
    //              <--
    return result;
  }
  ```

  Kodni yanada o'qilishi oson qilish qo'shimcha yangi satrni kiriting. Vertikal satr boshidagi bo'shliqsiz to'qqiz qatordan ortiq kod bo'lmasligi kerak.

### Nuqta-vergular

Har bir ifodadan keyin, hatto uni o'tkazib yuborish mumkin bo'lsa ham, nuqta-vergul bo'lishi kerak.

Nuqta-vergul haqiqatan ham ixtiyoriy bo'lgan tillar mavjud va u kamdan kam qo'llaniladi. JavaScript-da, kengi satrga o'tish nuqta-vergul sifatida talqin qilinmaydigan holatlar mavjud, bu esa kodni xatolarga olib keladi.

Dasturchi sifatida yetuk bo'lishingiz bilan siz [StandardJS](https://standardjs.com/) kabi nuqta-vergulsiz uslubni tanlashingiz mumkin. O'sha vaqtga qadar yuzaga kelishi mumkin bo'lgan tuzoqlardan qochish uchun nuqta-verguldan foydalanish yaxshidir.

### Ulanish darajalari

Ulanish darajasi biroz bo'lishi kerak.

Ba'zan qo'shimcha ulanishdan saqlanish uchun ["continue"](info:while-for#continue) direktivasini tsiklda ishlatish yaxshi bo'ladi.

Masalan, `if` ichki ulanish o'rniga:

```js
for (let i = 0; i < 10; i++) {
  if (cond) {
    ... // <- yana bitta ulanish darajasi
  }
}
```

Biz yozishimiz mumkin:

```js
for (let i = 0; i < 10; i++) {
  if (!cond) *!*continue*/!*;
  ...  // <- qo'shimcha ulanish darajasi yo'q
}
```

Shunga o'xshash narsani `if/else` va `return` bilan bajarish mumkin.

Misol uchun, quyidagi ikkita konstruktsiya bir xil.

Variant 1:

```js
function pow(x, n) {
  if (n < 0) {
    alert("Salbiy 'n' qo'llab-quvvatlanmaydi");
  } else {
    let result = 1;

    for (let i = 0; i < n; i++) {
      result *= x;
    }

    return result;
  }
}
```

Variant 2:

```js
function pow(x, n) {
  if (n < 0) {
    alert("Salbiy 'n' qo'llab-quvvatlanmaydi");
    return;
  }

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

Ikkinchisi `n < 0` ning "chekka ishi" erta ishlov berilganligi uchun osonro o'qiladi. Tekshirish amalga oshirilgach, qo'shimcha joylashtirish kerak bo'lmasdan "asosiy" kod oqimiga o'tishimiz mumkin.

## Funktsiyalarni joylashtirish

Agar siz bir nechta "yordamchi" funktsiyalarni va ulardan foydalanadigan kodni yozayotgan bo'lsangiz, funktsiyalarni tartibga solishning uchta usuli mavjud.

1. Ulardan foydalanadigan kod yuqorida e'lon qilingan funktsiyalar:

   ```js
   // *!*funktsiya deklaratsiyalari*/!*
   function createElement() {
     ...
   }

   function setHandler(elem) {
     ...
   }

   function walkAround() {
     ...
   }

   // *!*funktsiyalardan foydalanadigan kod*/!*
   let elem = createElement();
   setHandler(elem);
   walkAround();
   ```

2. Avval kod, keyin funktsiyalar

   ```js
   // *!*funktsiyalardan foydalanadigan kod*/!*
   let elem = createElement();
   setHandler(elem);
   walkAround();

   // --- *!*yordamchi funktsiyalar*/!* ---
   function createElement() {
     ...
   }

   function setHandler(elem) {
     ...
   }

   function walkAround() {
     ...
   }
   ```

3. Aralash: funktsiya birinchi ishlatilgan joyda e'lon qilinadi.

Ko'pincha, ikkinchi variantga afzallik beriladi.

Buning sababi shundaki, kodni o'qiyotganda, avvalo kod _nima qilayotganini_ bilishni istaymiz. Agar kod birinchi bo'lsa, u holda u ma'lumot beradi. Shunda, funktsiyalarni umuman o'qib chiqishga hojat qolmaydi, ayniqsa, ularning ismlari aslida nima qilishlarini tavsiflovchi bo'lsa.

## Uslublar bo'yicha qo'llanmalar

Uslubiy qo'llanmada kodni "qanday yozish kerak" haqida umumiy qoidalar mavjud, masalan, qaysi qoshtirnoqlardan foydalanish kerak, qancha bo'sh joy ajratish kerak, keyingi satrga o'tishlarni qaerga qo'yish va ko'pgina shunga o'xshash narsalar.

Jamoaning barcha a'zolari bir xil uslubiy qo'llanmani ishlatganda, qaysi jamoa a'zosi yozganidan qat'i nazar, kod bir xil ko'rinadi.

Albatta, jamoa har doim o'z uslubiy qo'llanmasini yozishi mumkin. Ko'pincha, bunga hojat yo'q. Tanlash uchun ko'plab mavjud va to'g'ri variantlar mavjud, shuning uchun ulardan birini qabul qilish sizning eng yaxshi tanlovingizdir.

Ba'zi mashhur tanlovlar:

- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Idiomatic.JS](https://github.com/rwaldron/idiomatic.js)
- [StandardJS](https://standardjs.com/)
- (yana ko'p)

Agar siz boshlang'ich dasturchi bo'lsangiz, ushbu bobning boshidagi yordamchi qo'llanmalardan boshlang. O'rganganizdan so'ng, umumiy tamoyillarni tanlash va qaysi biri sizga ko'proq yoqishini hal qilish uchun boshqa uslubiy qo'llanmalarni ko'rib chiqish sizning qo'lingizda.

## Avtomatlashtirilgan tekshirish vositalari (linters)

Linterslar - bu sizning kodingiz uslubini avtomatik ravishda tekshiradigan va qayta ishlash bo'yicha takliflar beradigan vositalar.

Ularning eng yaxshi tomoni shundaki, uslublarni tekshirishda o'zgaruvchan yoki funktsiya nomlaridagi xatolarni topish mumkin. Ushbu xususiyat uchun, ma'lum bir "kod uslubiga" yopishib olishni xohlamasangiz ham, linterni o'rnatish tavsiya etiladi.

Bu erda eng taniqli linting vositalari:

- [JSLint](http://www.jslint.com/) -- birinchi lintlardan biri.
- [JSHint](http://www.jshint.com/) -- JSLint-dan ko'proq sozlamalar.
- [ESLint](http://eslint.org/) -- ehtimol eng yangi.

Ularning barchasi ishni bajarishi mumkin. Muallif [ESLint](http://eslint.org/) dan foydalanadi.

Aksariyat linterslar ko'plab taniqli muharrirlar bilan birlashtirilgan: muharriridagi plaginni yoqing va uslubni sozlang.

Masalan, ESLint uchun quyidagilarni bajarishingiz kerak:

1. [Node.js](https://nodejs.org/) o'rnating.
2. ESLint-ni `npm install -g eslint` buyrug'i bilan o'rnating (npm - bu JavaScript to'plamini o'rnatuvchi)
3. JavaScript loyihangizning ildizida (barcha fayllaringizni o'z ichiga olgan papkada) `.eslintrc` nomli konfiguratsiya faylini yarating.
4. ESLint bilan birlashtirilgan muharriringiz uchun plaginni o'rnating/yoqing. Aksariyat muharrirlarning bittasi bor.

`.eslintrc`" faylining namunasi:

```js
{
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "rules": {
    "no-console": 0,
    "indent": 2
  }
}
```

Bu erda `"extends"` direktivasi "eslint:recommended" sozlamalar to'plamiga asoslanganligini bildiradi. Shundan so'ng biz o'zimiznikini aniqlaymiz.

Shuningdek, uslublar qoidalari to'plamlarini Internetdan yuklab olish va oldingilarni o'rniga ularni kengaytirish mumkin. O'rnatish haqida batafsil ma'lumot uchun <http://eslint.org/docs/user-guide/getting-started> ga qarang.

Shuningdek, ba'zi bir IDE-larda ichki linting mavjud, bu qulay, ammo ESLint kabi moslashtirilmaydi.

## Xulosa

Ushbu bobda tavsiflangan barcha sintaksis qoidalari (va uslubiy qo'llanmalarda) sizning kodingizning o'qilishini oshirishga qaratilgan, ammo ularning barchasi munozarali.

"Yaxshi" kod yozish haqida o'ylashimiz kerak bo'lgan savollar: "Kodni nima o'qilishini va tushunishni osonlashtiradi?" va "Xatolardan qochishimizga nima yordam beradi?" Kod uslublarini tanlash va muhokama qilishda bularni yodda tutish kerak bo'lgan asosiy narsalar.

Ommabop uslubiy qo'llanmalarni o'qish sizga kod uslubi tendentsiyalari va eng yaxshi amaliyotlar haqidagi so'nggi g'oyalar bilan tanishishingizga imkon beradi.
