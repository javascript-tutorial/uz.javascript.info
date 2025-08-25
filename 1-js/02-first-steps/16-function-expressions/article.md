# Funksiya ifodalari

JavaScript-da funksiya "sehr tilining tuzilishi" emas, balki maxsus turdagi qiymat hisoblanadi.

Ilgari ishlatgan sintaksis _Funksiya e'loni_ deb ataladi:

```js
function sayHi() {
  alert("Salom");
}
```

Funksiya yaratishning yana bir sintaksisi bor, u _Funksiya ifodasi_ deb ataladi.

Bu bizga har qanday ifoda o'rtasida yangi funksiya yaratishga imkon beradi.

Masalan:

```js
let sayHi = function () {
  alert("Salom");
};
```

Bu yerda `sayHi` o'zgaruvchisi qiymat olayotganini ko'ramiz, yangi funksiya `function() { alert("Salom"); }` sifatida yaratilgan.

Funksiya yaratish tayinlash ifodasining kontekstida (`=` ning o'ng tomonida) sodir bo'lgani uchun, bu *Funksiya ifodasi*dir.

E'tibor bering, `function` kalit so'zidan keyin nom yo'q. Funksiya ifodalari uchun nomni tashlab qo'yish ruxsat etilgan.

Bu yerda biz uni darhol o'zgaruvchiga tayinlaymiz, shuning uchun bu kod namunalarining ma'nosi bir xil: "funksiya yarating va uni `sayHi` o'zgaruvchisiga qo'ying".

Keyinroq duch keladigan ilg'or vaziyatlarda funksiya yaratilishi va darhol chaqirilishi yoki keyingi bajarilish uchun rejalashtirilishi mumkin, hech qayerda saqlanmasdan, shuning uchun anonim bo'lib qoladi.

## Funksiya - bu qiymat

Takrorlaymiz: funksiya qanday yaratilganidan qat'iy nazar, funksiya qiymatdir. Yuqoridagi ikkala misol ham funksiyani `sayHi` o'zgaruvchisida saqlaydi.

Biz hatto bu qiymatni `alert` yordamida chop etishimiz ham mumkin:

```js run
function sayHi() {
  alert( "Salom" );
}

*!*
alert( sayHi ); // funksiya kodini ko'rsatadi
*/!*
```

E'tibor bering, oxirgi qator funksiyani ishga tushirmaydi, chunki `sayHi` dan keyin qavslar yo'q. Funksiya nomini eslatish uning bajarilishiga olib keladigan dasturlash tillari bor, lekin JavaScript bunday emas.

JavaScript-da funksiya qiymat, shuning uchun biz u bilan qiymat sifatida muomala qilishimiz mumkin. Yuqoridagi kod uning satr ko'rinishini, ya'ni manba kodini ko'rsatadi.

Albatta, funksiya maxsus qiymat, chunki biz uni `sayHi()` kabi chaqirishimiz mumkin.

Lekin u hali ham qiymat. Shuning uchun biz u bilan boshqa turdagi qiymatlar kabi ishlashimiz mumkin.

Funksiyani boshqa o'zgaruvchiga nusxalashimiz mumkin:

```js run no-beautify
function sayHi() {
  // (1) yaratish
  alert("Salom");
}

let func = sayHi; // (2) nusxalash

func(); // Salom     // (3) nusxani ishga tushirish (ishlaydi)!
sayHi(); // Salom    //     bu ham hali ishlaydi (nega ishlamasin)
```

Bu yerda batafsil nima sodir bo'ladi:

1. Funksiya e'loni `(1)` funksiyani yaratadi va uni `sayHi` nomli o'zgaruvchiga qo'yadi.
2. `(2)` qator uni `func` o'zgaruvchisiga nusxalaydi. Yana e'tibor bering: `sayHi` dan keyin qavslar yo'q. Agar bo'lganida, `func = sayHi()` `sayHi()` _chaqiruv natijasini_ `func` ga yozar edi, `sayHi` _funksiyasining_ o'zini emas.
3. Endi funksiyani ham `sayHi()`, ham `func()` sifatida chaqirish mumkin.

Birinchi qatorda `sayHi` ni e'lon qilish uchun Funksiya ifodasidan ham foydalanishimiz mumkin edi:

```js
let sayHi = function () {
  // (1) yaratish
  alert("Salom");
};

let func = sayHi; //(2)
// ...
```

Hammasi bir xil ishlaydi.

````smart header="Nima uchun oxirida nuqta-vergul bor?"
Siz hayron bo'lishingiz mumkin, nega Funksiya ifodalari oxirida nuqta-vergul `;` bor, lekin Funksiya e'lonlarida yo'q:

```js
function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
}*!*;*/!*
```

Javob oddiy: Funksiya ifodasi bu yerda tayinlash ifodasining ichida `function(…) {…}` sifatida yaratilgan: `let sayHi = …;`. Nuqta-vergul `;` ifoda oxirida tavsiya etiladi, u funksiya sintaksisining qismi emas.

Nuqta-vergul oddiy tayinlash uchun ham bo'lardi, masalan `let sayHi = 5;`, va funksiya tayinlash uchun ham bor.
````

## Callback funksiyalar

Funksiyalarni qiymat sifatida uzatish va funksiya ifodalaridan foydalanishning ko'proq misollarini ko'rib chiqamiz.

Biz uchta parametrli `ask(question, yes, no)` funksiyasini yozamiz:

`question`
: Savol matni

`yes`
: Javob "Ha" bo'lsa ishga tushadigan funksiya

`no`
: Javob "Yo'q" bo'lsa ishga tushadigan funksiya

Funksiya `question` ni so'rashi va foydalanuvchi javobiga qarab `yes()` yoki `no()` ni chaqirishi kerak:

```js run
*!*
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}
*/!*

function showOk() {
  alert( "Siz rozi bo'ldingiz." );
}

function showCancel() {
  alert( "Siz bajarishni bekor qildingiz." );
}

// foydalanish: showOk, showCancel funksiyalari ask ga argument sifatida uzatiladi
ask("Rozimisiz?", showOk, showCancel);
```

Amalda bunday funksiyalar juda foydali. Haqiqiy hayotdagi `ask` va yuqoridagi misol o'rtasidagi asosiy farq shundaki, haqiqiy funksiyalar foydalanuvchi bilan oddiy `confirm` dan ko'ra murakkabroq usullar bilan muloqot qiladi. Brauzerde bunday funksiyalar odatda chiroyli ko'rinishdagi savol oynasini chizadi. Lekin bu boshqa hikoya.

**`ask` ning `showOk` va `showCancel` argumentlari _callback funksiyalar_ yoki shunchaki *callback*lar deb ataladi.**

G'oya shundan iboratki, biz funksiyani uzatamiz va kerak bo'lsa keyinroq "chaqirib olinishini" kutamiz. Bizning holimizda `showOk` "ha" javobi uchun callback bo'ladi va `showCancel` "yo'q" javobi uchun.

Funksiya ifodalaridan foydalanib ekvivalent, qisqaroq funksiya yozishimiz mumkin:

```js run no-beautify
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

*!*
ask(
  "Rozimisiz?",
  function() { alert("Siz rozi bo'ldingiz."); },
  function() { alert("Siz bajarishni bekor qildingiz."); }
);
*/!*
```

Bu yerda funksiyalar to'g'ridan-to'g'ri `ask(...)` chaqiruvi ichida e'lon qilingan. Ularning nomi yo'q va shuning uchun _anonim_ deb ataladi. Bunday funksiyalar `ask` dan tashqarida mavjud emas (chunki ular o'zgaruvchilarga tayinlanmagan), lekin bu yerda aynan biz xohlagan narsa.

Bunday kod bizning skriptlarimizda juda tabiiy ko'rinadi, bu JavaScript ruhida.

```smart header="Funksiya "harakat"ni ifodalovchi qiymat"
Satrlar yoki raqamlar kabi oddiy qiymatlar *ma'lumot*ni ifodalaydi.

Funksiyani *harakat* sifatida qabul qilish mumkin.

Biz uni o'zgaruvchilar orasida uzatishimiz va xohlagan vaqtda ishga tushirishimiz mumkin.
```

## Funksiya ifodasi vs Funksiya e'loni

Funksiya e'lonlari va ifodalari o'rtasidagi asosiy farqlarni shakllantiramiz.

Birinchidan, sintaksis: kodni ularni qanday farqlash.

- _Funksiya e'loni:_ asosiy kod oqimida alohida ifoda sifatida e'lon qilingan funksiya:

  ```js
  // Funksiya e'loni
  function sum(a, b) {
    return a + b;
  }
  ```

- _Funksiya ifodasi:_ ifoda ichida yoki boshqa sintaksis konstruksiyasi ichida yaratilgan funksiya. Bu yerda funksiya "tayinlash ifodasining" `=` o'ng tomonida yaratilgan:

  ```js
  // Funksiya ifodasi
  let sum = function (a, b) {
    return a + b;
  };
  ```

Yanada nozik farq - JavaScript dvigateli tomonidan funksiya _qachon_ yaratilishidir.

**Funksiya ifodasi bajarilish unga yetganda yaratiladi va faqat o'sha paytdan boshlab foydalanish mumkin.**

Bajarilish oqimi tayinlashning o'ng tomoniga `let sum = function…` o'tgach -- mana, funksiya yaratildi va endi undan foydalanish mumkin (tayinlash, chaqirish va hokazo).

Funksiya e'lonlari boshqacha.

**Funksiya e'loni u aniqlanishidan oldin chaqirilishi mumkin.**

Masalan, global Funksiya e'loni butun skriptda, qayerda bo'lishidan qat'iy nazar ko'rinadi.

Bu ichki algoritmlar tufayli. JavaScript skriptni ishga tushirishga tayyorlanayotganda, u avval undagi global Funksiya e'lonlarini qidiradi va funksiyalarni yaratadi. Buni "initsializatsiya bosqichi" deb hisoblashimiz mumkin.

Va barcha Funksiya e'lonlari qayta ishlangandan keyin kod bajariladi. Shuning uchun u bu funksiyalarga kirish huquqiga ega.

Masalan, bu ishlaydi:

```js run refresh untrusted
*!*
sayHi("John"); // Salom, John
*/!*

function sayHi(name) {
  alert( `Salom, ${name}` );
}
```

Funksiya e'loni `sayHi` JavaScript skriptni boshlashga tayyorlanayotganda yaratiladi va unda hamma joyda ko'rinadi.

...Agar bu Funksiya ifodasi bo'lganida, u ishlamasdi:

```js run refresh untrusted
*!*
sayHi("John"); // xato!
*/!*

let sayHi = function(name) {  // (*) endi sehr yo'q
  alert( `Salom, ${name}` );
};
```

Funksiya ifodalari bajarilish ularga yetganda yaratiladi. Bu faqat `(*)` qatorida sodir bo'ladi. Juda kech.

Funksiya e'lonlarining yana bir maxsus xususiyati - ularning blok ko'lami.

**Qat'iy rejimda Funksiya e'loni kod bloki ichida bo'lganda, u o'sha blok ichida hamma joyda ko'rinadi. Lekin undan tashqarida emas.**

Masalan, tasavvur qilaylik, biz bajarilish vaqtida oladigan `age` o'zgaruvchisiga qarab `welcome()` funksiyasini e'lon qilishimiz kerak. Va keyin uni keyinroq ishlatishni rejalashtirmoqdamiz.

Agar Funksiya e'lonidan foydalansak, u mo'ljallanganidek ishlamaydi:

```js run
let age = prompt("Yoshingiz necha?", 18);

// shartli ravishda funksiya e'lon qilish
if (age < 18) {

  function welcome() {
    alert("Salom!");
  }

} else {

  function welcome() {
    alert("Assalomu alaykum!");
  }

}

// ...keyinroq foydalanish
*!*
welcome(); // Xato: welcome aniqlanmagan
*/!*
```

Buning sababi shundaki, Funksiya e'loni faqat o'zi joylashgan kod bloki ichida ko'rinadi.

Mana yana bir misol:

```js run
let age = 16; // misol uchun 16 ni olaylik

if (age < 18) {
*!*
  welcome();               // \   (ishlaydi)
*/!*
                           //  |
  function welcome() {     //  |
    alert("Salom!");       //  |  Funksiya e'loni e'lon qilingan
  }                        //  |  blokda hamma joyda mavjud
                           //  |
*!*
  welcome();               // /   (ishlaydi)
*/!*

} else {

  function welcome() {
    alert("Assalomu alaykum!");
  }
}

// Bu yerda biz jingalak qavslardan tashqaridamiz,
// shuning uchun ular ichida qilingan Funksiya e'lonlarini ko'ra olmaymiz.

*!*
welcome(); // Xato: welcome aniqlanmagan
*/!*
```

`welcome` ni `if` dan tashqarida ko'rinadigan qilish uchun nima qilishimiz mumkin?

To'g'ri yondashuv Funksiya ifodasidan foydalanish va `welcome` ni `if` dan tashqarida e'lon qilingan va tegishli ko'rinishga ega o'zgaruvchiga tayinlash bo'ladi.

Bu kod mo'ljallanganidek ishlaydi:

```js run
let age = prompt("Yoshingiz necha?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("Salom!");
  };

} else {

  welcome = function() {
    alert("Assalomu alaykum!");
  };

}

*!*
welcome(); // endi yaxshi
*/!*
```

Yoki biz uni savol belgisi operatori `?` yordamida yanada soddalashtirishimiz mumkin:

```js run
let age = prompt("Yoshingiz necha?", 18);

let welcome = (age < 18) ?
  function() { alert("Salom!"); } :
  function() { alert("Assalomu alaykum!"); };

*!*
welcome(); // endi yaxshi
*/!*
```

```smart header="Funksiya e'loni va Funksiya ifodasini qachon tanlash kerak?"
Qoida sifatida, funksiya e'lon qilish kerak bo'lganda, birinchi navbatda Funksiya e'loni sintaksisini ko'rib chiqish kerak. Bu bizga kodimizni qanday tashkil qilishda ko'proq erkinlik beradi, chunki biz bunday funksiyalarni ular e'lon qilinishidan oldin chaqirishimiz mumkin.

Bu o'qish uchun ham yaxshiroq, chunki kodda `function f(…) {…}` ni qidirish `let f = function(…) {…};` dan osonroq. Funksiya e'lonlari ko'proq "ko'zga tashlanadigan".

...Lekin agar Funksiya e'loni qandaydir sabab bilan bizga mos kelmasa yoki bizga shartli e'lon kerak bo'lsa (biz hozirgina misolni ko'rdik), u holda Funksiya ifodasidan foydalanish kerak.
```

## Xulosa

- Funksiyalar qiymatlardir. Ular kodni istalgan joyida tayinlanishi, nusxalanishi yoki e'lon qilinishi mumkin.
- Agar funksiya asosiy kod oqimida alohida ifoda sifatida e'lon qilinsa, bu "Funksiya e'loni" deb ataladi.
- Agar funksiya ifodaning qismi sifatida yaratilsa, bu "Funksiya ifodasi" deb ataladi.
- Funksiya e'lonlari kod bloki bajarilishidan oldin qayta ishlanadi. Ular blokda hamma joyda ko'rinadi.
- Funksiya ifodalari bajarilish oqimi ularga yetganda yaratiladi.

Ko'pchilik hollarda funksiya e'lon qilish kerak bo'lganda, Funksiya e'loni afzalroq, chunki u e'lonning o'zidan oldin ko'rinadi. Bu bizga kod tashkilotida ko'proq moslashuvchanlik beradi va odatda o'qish uchun qulayroq.

Shuning uchun biz Funksiya ifodasidan faqat Funksiya e'loni vazifa uchun mos kelmaganida foydalanishimiz kerak. Biz bu bobda bundan bir nechta misollarni ko'rdik va kelajakda ko'proq ko'ramiz.
