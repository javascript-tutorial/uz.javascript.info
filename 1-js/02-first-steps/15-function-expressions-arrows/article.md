# Funktsional ifodalar va o'qlar

JavaScript da funktsiya "sehrli til tuzilishi" emas, balki qiymatning bir turidir.

Biz ilgari ishlatgan sintaks *funktsiya deklaratsiyasi* deyiladi:

```js
function sayHi() {
  alert( "Salom" );
}
```

Funktsiyani yaratish uchun yana bir sintaksis mavjud, u *funktsiya ifodasi* deb nomlanadi.

Bu shunday ko'rinishga ega:

```js
let sayHi = function() {
  alert( "Salom" );
};
```

Bu yerda funktsiya boshqa qiymatlar singari aniq ravishda yaratiladi va o'zgaruvchanga tayinlanadi. Funktsiya qanday aniqlangan bo'lishidan qat'iy nazar, bu faqat `sayHi` o'zgaruvchanida saqlanadigan qiymat.

Ushbu kod namunalarining ma'nosi bir xil: "funktsiyani yarating va uni `sayHi`" o'zgaruvchanida saqlang.

Hatto `alert` yordamida ushbu qiymatni chiqarishimiz mumkin:

```js run
function sayHi() {
  alert( "Salom" );
}

*!*
alert( sayHi ); // funktsiya kodini ko'rsatadi
*/!*
```

Iltimos, oxirgi satr funktsiyani bajarmasligini unutmang, chunki `sayHi` dan keyin qavslar yo'q. Bazi dasturlash tillari mavjud, funktsiya nomini eslatish uning bajarilishini keltirib chiqaradi, ammo JavaScript-ni bunday emas.

JavaScript da funktsiya qiymatdir, shuning uchun biz uni qiymat sifatida ko'rib chiqishimiz mumkin. Yuqoridagi manba kod bo'lgan matni ko'rsatadi.

Bu, albatta, `sayHi()` kabi chaqirishimiz alohida ahamiyatga ega.

Ammo bu hali ham qiymatdir. Shunday qilib, biz u bilan boshqa turdagi qiymatlar singari ishlashimiz mumkin.

Biz funktsiyani boshqa o'zgaruvchanga nusxalashimiz mumkin:

```js run no-beautify
function sayHi() {   // (1) yaratmoq
  alert( "Salom" );
}

let func = sayHi;    // (2) nusxalamoq

func(); // Salom     // (3) nusxasini ishga tushirish (ishlaydi)!
sayHi(); // Salom    //     bu hali ham ishlaydi (nega bunday bo'lishi kerak emas?)
```

Yuqorida nima batafsil sodir bo'lganligi:

1. Funktsiya deklaratsiyasi `(1)` funktsiyani yaratadi va uni `sayHi` nomli o'zgaruvchanda saqlaydi.
2. `(2)` satri uni `func` o'zgaruvchaniga ko'chiradi.

     Iltimos, yana bir bor e'tibor bering: `sayHi` dan keyin qavslar yo'q. Agar mavjud bo'lsa, unda `func = sayHi()` `sayHi` *funktsiyasini* emas, balki `sayHi()` ga *qo'ng'iroq natijasini* `func` ga yozadi.
3. Endi funktsiyani `sayHi()` va `func()` deb atash mumkin.

E'tibor bering, biz birinchi satrda `sayHi` ni e'lon qilish uchun funktsiya ifodasidan foydalinishimiz mumkin edi:

```js
let sayHi = function() { ... };

let func = sayHi;
// ...
```

Hammasi bir xil ishlaydi. Nima sodir bo'layotgani yanada ravshanroq, to'g'rimi?


````smart header="Nima uchun oxirida nuqta-vergul bor?"
Siz hayron bo'lishingiz mumkin, nima uchun funktsiya ifodasi oxirida nuqta-vergulga ega `;`, lekin funktsiya deklaratsiyasi ega emas:

```js
function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
}*!*;*/!*
```

Javob oddiy:
- Kod bloklari va ularni ishlatadigan `if {...}`, `for {}`, `function f {}` va hokazo kabi sintaksis tuzilmalarining oxirida nuqta-vergul `;` qo'yish kerak emas.
- Funktsiya ifodasi ifoda ichida ishlatiladi: `let sayHi = ...;`, qiymat sifatida. Bu kod bloki emas. Nuqta-vergul `;`, qiymati qanday bo'lishidan qat'i nazar, ifodalar oxirida qo'yilishi tavsiya etiladi. Demak, bu yerdagi nuqta-vergul funktsiya ifodasining o'zi bilan hech qanday bog'liq emas, shunchaki ifodaning tugatadi.
````

## Qayta chaqirish funktsiyalari

Funksiyalarni qiymat sifatida uzatilishining va funktsiya ifodalaridan foydalanishning ko'proq misollarini ko'rib chiqamiz.

Biz uchta parametr bilan `ask(savol, ha, yo'q)` funktsiyasini yozamiz:

`savol`
: Savolning matni

`ha`
: Agar javob "Ha" bo'lsa, funktsiya bajariladi

`yo'q`
: Agar javob "Yo'q" bo'lsa, funktsiya bajariladi

Funktsiya `savol` berishi kerak va foydalanuvchining javobiga qarab `ha()` yoki `yo'q()` ni chaqirishi kerak:

```js run
*!*
function ask(savol, ha, yoq) {
  if (confirm(savol)) ha()
  else yoq();
}
*/!*

function showOk() {
  alert( "Siz rozisiz." );
}

function showCancel() {
  alert( "Siz ijroni bekor qildingiz." );
}

// foydalanish: showOk, showCancel funktsiyalari ask funktsiyasi uchun argument sifatida 
ask("Rozimisiz?", showOk, showCancel);
```

Qanday qilib uni qisqartirish kerakligini o'rgatishdan oldin, brauzerda (va ba'zi hollarda server tomonida) bunday funktsiyalar juda mashhurligini ta'kidlaymiz. Haqiqiy hayotdan tatbiq etish va yuqoridagi misol o'rtasidagi asosiy farq shundaki, real funktsiyalar foydalanuvchi bilan o'zaro aloqada oddiy `confirm` dan ko'ra murakkab usullardan foydalanadi. Brauzerda bunday funktsiya odatda chiroyli ko'rinadigan savollar oynasini chiqaradi. Ammo bu boshqa voqea.

**`ask` argumentlari *qayta chaqirish funktsiyalari* yoki shunchaki *qayta chaqirish* deb nomlanadi.**

G'oya shundan iboratki, biz funktsiyani bajaramiz va agar kerak bo'lsa, uni keyinroq "qayta chaqirilgan" deb oylaymiz. Bizning holatimizda `showOk` "ha" javobi uchun, "yo'q" javobi uchun `showCancel` qayta chaqirish bo'ladi.

Xuddi shu funktsiyani ancha qisqa yozish uchun biz funktsiya ifodalaridan foydalanishimiz mumkin:

```js run no-beautify
function ask(savol, ha, yoq) {
  if (confirm(savol)) ha()
  else yoq();
}

*!*
ask(
  "Rozimisiz?",
  function() { alert("Rozisiz."); },
  function() { alert("Siz ijroni bekor qildingiz."); }
);
*/!*
```


Bu yerda funktsiyalar to'g'ridan-to'g'ri `ask(...)` chaqiruvi ichida e'lon qilinadi. Ularning ismlari yo'q va shuning uchun *anonim* deb nomlanadi. Bunday funktsiyalarga `ask` dan tashqarida kirish mumkin emas (chunki ular o'zgaruvchanlarga biriktirilmagan), ammo bu biz xohlagan narsadir.

Bunday kod bizning skriptlarimizda tabiiy ravishda paydo bo'ladi, bu JavaScript ruhida.


```smart header="Funktsiya - bu \"harakat\" ni ifodalovchi qiymat"
Matnlar yoki raqamlar kabi muntazam qiymatlar *ma'lumotlarni* ifodalaydi.

Funktsiyani *harakat* sifatida qabul qilish mumkin.

Uni o'zgaruvchanlar orasidaga qo'yib, istagan paytda ishga tushirishimiz mumkin.
```


## Funktsiya ifodasi va funktsiya deklaratsiyasi

Funktsiya deklaratsiyalari va ifodalar o'rtasidagi asosiy farqlarni shakllantiraylik.

Birinchidan, sintaksis: kod qanday ko'rinishag ega.

- *Funktsiya deklaratsiyasi:* asosiy kod oqimida alohida ifoda sifatida e'lon qilingan funktsiya.

    ```js
    // Funktsiya deklaratsiyasi
    function sum(a, b) {
      return a + b;
    }
    ```
- *Funktsiya ifodasi:* ifoda ichida yoki boshqa sintaksis tarkibida yaratilgan funktsiya. Bu erda funktsiya "tayinlash ifodasi" ning `=` 'o'ng tomonida yaratilgan:
    
    ```js
    // Funktsiya ifodasi
    let sum = function(a, b) {
      return a + b;
    };
    ```

Yanada nozikroq farqi *qachonki* JavaScript interpretatori funktsiyani yaratganda ko'rinadi.

**Funktsiya ifodasi ijro etilgandan so'ng yaratiladi va shu vaqtdan boshlab foydalanishga yaroqlidir.**

Bajarilish oqimi topshiriqning o'ng tomoniga o'tgandan so'ng `let sum = function...` -- funksiya yaratiladi va ishlatilishi mumkin (tayinlanishi, chaqirilishi va hokazo. ) bundan buyon.

Funktsiya deklaratsiyalari boshqacha.

**Funktsiya deklaratsiyasi butun skript/kod blokida ishlatilishi mumkin.**

Boshqacha qilib aytganda, JavaScript skript yoki kod blokini ishga tushirishga *tayyorlanganda*, avval uni funktsiya deklaratsiyasini qidiradi va funktsiyalarni yaratadi. Buni "boshlang'ich bosqich" deb hisoblashimiz mumkin.

Va barcha funktsiyalar deklaratsiyalari ko'rib chiqilgandan so'ng, ijro davom etadi.

Natijada, funktsiya deklaratsiyasi sifatida e'lon qilingan funktsiyani belgilanganidan oldinroq chaqirish mumkin.

Masalan, bu ishlaydi:

```js run refresh untrusted
*!*
sayHi("John"); // Salom, John
*/!*

function sayHi(name) {
  alert( `Salom, ${name}` );
}
```

`sayHi` funktsiya deklaratsiyasi JavaScript skriptni ishga tushirishga tayyorlanayotganda yaratiladi va uning hamma joyda ko'rinadi.

...Agar bu funktsiya ifodasi bo'lsa, u ishlamaydi:

```js run refresh untrusted
*!*
sayHi("John"); // xato!
*/!*

let sayHi = function(name) {  // (*) endi sehr yo'q
  alert( `Hello, ${name}` );
};
```

Funktsiya ifodalarining ijro etilishi ularga yetganda hosil bo'ladi. Bu faqat `(*)` satrida sodir bo'ladi. Juda kech.

**Kod blokining ichida funktsiyalar deklaratsiyasi tuzilganda, u blokning hamma joylarida ko'rinadi. Ammo uning tashqarisida emas.**

Ba'zan ichki funktsiyani faqat o'sha blokda ishlatish uchun e'lon qilish qulay. Ammo bu xususiyat ham muammolarni keltirib chiqarishi mumkin.

Masalan, ish paytida olinadigan `age` o'zgaruvchanga qarab `welcome()` funktsiyasini yaratishimiz kerakligini tasavvur qilaylik. Vaqt o'tgach foydalanishni rejalashtirmoqdamiz.

Quyidagi kod ishlamaydi:

```js run
let age = prompt("Yoshingiz nechida?", 18);

// funktsiyani shartli ravishda e'lon qilish
if (age < 18) {

  function welcome() {
    alert("Salom!");
  }

} else {

  function welcome() {
    alert("Assalomu aleykum!");
  }

}

// ...keyinroq foydalanish
*!*
welcome(); // Xato: welcome belgilanmagan
*/!*
```

Funktsiya deklaratsiyasi faqat u joylashgan kod blokining ichida ko'rinadi.

Mana yana bir misol:

```js run
let age = 16; // misol sifatida 16 ni oling

if (age < 18) {
*!*
  welcome();               // \   (ishlaydi)
*/!*
                           //  |
  function welcome() {     //  |  
    alert("Salom!");       //  |  Funktsiya deklaratsiyasi e'lon qilingan blokning 
  }                        //  |  hamma joyida mavjud
                           //  |
*!*
  welcome();               // /   (ishlaydi)
*/!*

} else {

  function welcome() {     //  age = 16 uchun bu "welcome" hech qachon yaratilmaydi
    alert("Assalomu aleykum!");
  }
}

// Bu erda biz jingalak qavslardan chiqib qoldik,
// shuning uchun ularning ichida qilingan funktsiya deklaratsiyalarini ko'ra olmaymiz.

*!*
welcome(); // Xato: welcome belgilanmagan
*/!*
```

`welcome` ni `if` dan tashqarida ko'rinadigan qilish uchun nima qilishimiz kerak?

To'g'ri yondashuv funktsiya ifodasini ishlatish va `if` dan tashqarida e'lon qilingan va mos keladigan ko'rinishga ega o'zgaruvchanga `welcome` ni tayinlash dir.

Endi u maqsadga muvofiq ishlaydi:

```js run
let age = prompt("Yoshingiz nechida?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("Salom!");
  };

} else {

  welcome = function() {
    alert("Assalomu aleykum!");
  };

}

*!*
welcome(); // endi ishlaydi
*/!*
```

Yoki savol belgisi operatori `?` yordamida uni yanada soddalashtira olamiz:

```js run
let age = prompt("Yoshingiz nechida?", 18);

let welcome = (age < 18) ?
  function() { alert("Salom!"); } :
  function() { alert("Assalomu aleykum!"); };

*!*
welcome(); // endi ishlaydi
*/!*
```


```smart header="Funktsiya deklaratsiyasi va funktsiya ifodasini qachon tanlashingiz kerak?"
Qoida tariqasida, funktsiyani e'lon qilishimiz kerak bo'lganida, birinchi bo'lib biz ilgari foydalangan funktsiya deklaratsiyasi sintaksisini ishlatishimiz kerak. Bu bizning kodimizni qanday tashkil qilishda ko'proq erkinlik beradi, chunki biz bunday funktsiyalarni e'lon qilinishidan oldin chaqirishimiz mumkin.

Kodda `f(...) {…}` funktsiyasini izlash `f = function(...) {…}` ga qaraganda biroz osonroq. Funktsiya deklaratsiyalari ko'proq "ko'zga-yuqumli".

...Agar biron bir sababga ko'ra funktsiyalar deklaratsiyasi bizga mos kelmasa (biz yuqorida bir misolni ko'rdik), unda funktsiyalar ifodasidan foydalanish kerak.
```


## O'q funktsiyalari [#arrow-functions]

Funktsiyalarni yaratish uchun yana bitta sodda va ixcham sintaksis mavjud, bu ko'pincha funktsiya ifodalaridan yaxshiroqdir. U "o'q funktsiyalari" deb nomlanadi, chunki u quyidagicha ko'rinadi:


```js
let func = (arg1, arg2, ...argN) => ifoda
```

...Bu `arg1..argN` argumentlariga ega bo'lgan `func` funktsiyasini yaratadi, `ifodani` o'ng tomonda baholaydi va natijasini qaytaradi.

Boshqacha qilib aytganda, bu taxminan bir xil:

```js
let func = function(arg1, arg2, ...argN) {
  return ifoda;
};
```

...Ammo juda ham ixchamroq.

Keling, bir misolni ko'rib chiqaylik:

```js run
let sum = (a, b) => a + b;

/* O'q funktsiyasi quyidagini qisqartirilgan shakli:

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3

```

Agar bizda faqat bitta argument bo'lsa, unda qavslarni olib tashlash mumkin, bu esa uni yanada qisqartiradi:

```js run
// bir xil
// let double = function(n) { return n * 2 }
*!*
let double = n => n * 2;
*/!*

alert( double(3) ); // 6
```

Agar argumentlar bo'lmasa, qavslar bo'sh bo'lishi kerak (lekin mavjud bo'lishi kerak):

```js run
let sayHi = () => alert("Salom!");

sayHi();
```

O'q funktsiyalaridan funktsiya ifodalari kabi foydalanish mumkin.

Masalan, `welcome()` bilan qayta yozilgan misol:

```js run
let age = prompt("Yoshingiz nechida?", 18);

let welcome = (age < 18) ?
  () => alert('Salom') :
  () => alert("Assalomu aleykum!");

welcome(); // endi ishlaydi
```

O'q funktsiyalari noma'lum bo'lib ko'rinishi va unchalik o'qib bo'lmaydigan ko'rinishi mumkin, ammo ko'zlar tuzilishga odatlanib qolganda, bu tezda o'zgaradi.

Ular juda ko'p so'zlarni yozishga dangasa bo'lganimizda, oddiy bir satrli harakatlar uchun juda qulaydir.

```smart header="Ko'p satrli o'q funktsiyalari"

Yuqoridagi misollarda `=>` ning chap qismidan argumentlarni olinadi va ular bilan o'ng tomonda ifoda baholanadi.

Ba'zan bizga bir nechta iboralar yoki bayonotlar kabi biroz murakkabroq narsa kerak bo'ladi. Bu ham mumkin, lekin biz ularni jingalak qavslarga solib qo'yishimiz kerak. Keyin ular ichida normal `return` dan foydalanishimiz kerak.

Shunga o'xshash:

```js run
let sum = (a, b) => {  // jingalak qavs ko'p satrli funktsiyani ochadi
  let result = a + b;
*!*
  return result; // agar biz jingalak qavslardan foydalansak, natijaga erishish uchun return-dan foydalaning
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="Yanada ko'proq"
Bu erda biz o'q funktsiyalarini qisqalik uchun maqtadik. Ammo bu hammasi emas! O'q funktsiyalari boshqa qiziqarli xususiyatlarga ega. Keyinchalik ularga <info:arrow-functions> bobida qaytamiz.

Hozircha biz ularni bir qatorli harakatlar va qayta chaqirish uchun ishlatamiz.
```

## Xulosa

- Funktsiyalar qiymatlardir. Ular kodning istalgan joyiga tayinlanishi, nusxalanishi yoki e'lon qilinishi mumkin.
- Agar funktsiya asosiy kod oqimida alohida ifoda sifatida e'lon qilinsa, bu "Funktsiya Deklaratsiyasi" deb nomlanadi.
- Agar funktsiya ifodaning bir qismi sifatida yaratilgan bo'lsa, u "Funktsiya ifodasi" deb nomlanadi.
- Funktsiya deklaratsiyalari kod bloki bajarilishidan oldin qayta ishlanadi. Ular blokning hamma joylarida ko'rinadi.
- Funktsiya iboralari ijro etish oqimi ularga yetganda hosil bo'ladi.


Ko'pgina hollarda, biz funktsiyalarni e'lon qilishimiz kerak bo'lganda, funktsiyalar deklaratsiyasi afzalroqdir, chunki u deklaratsiyadan oldin ko'rinadi. Bu bizga kodni tashkil qilishda ko'proq moslashuvchanlikni beradi va odatda o'qilishi osonroq.

Shuning uchun biz funktsiya ifodasini faqat funktsiya deklaratsiyasi vazifaga mos kelmasa ishlatishimiz kerak. Biz ushbu bobda bunga bir nechta misollarni ko'rdik va kelajakda yana ko'p misollarni ko'rasiz.

O'q funktsiyalari bitta satrli ifoda uchun qulaydir. Ular ikkita turga ega:

1. Jingalak qavslarsiz: `(...args) => ifoda` -- o'ng tomondagi ifoda: funktsiya uni baholaydi va natijani qaytaradi.
2. Jingalak qavslar bilan: `(...args) => {kod tanasi}` -- qavslar funktsiya ichida bir nechta ifodalarni yozishimizga imkon beradi, ammo biron bir narsani qaytarish uchun `return` kerak bo'ladi.
