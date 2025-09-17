# Funksiyalar

Ko'pincha skriptning ko'p joylarida o'xshash harakatni bajarishga to'g'ri keladi.

Masalan, tashrif buyuruvchi tizimga kirganida, chiqganida va boshqa joylarda chiroyli ko'rinishdagi xabarni ko'rsatish kerak.

Funksiyalar dasturning asosiy "qurilish bloklari"dir. Ular kodni takrorlanmasdan ko'p marta chaqirishga imkon beradi.

Biz allaqachon o'rnatilgan funksiyalar misollarini ko'rdik, masalan `alert(message)`, `prompt(message, default)` va `confirm(question)`. Lekin biz o'z funksiyalarimizni ham yaratishimiz mumkin.

## Funksiya e'loni

Funksiya yaratish uchun *funksiya e'loni*dan foydalanishimiz mumkin.

U quyidagicha ko'rinadi:

```js
function showMessage() {
  alert("Hammaga salom!");
}
```

`function` kalit so'zi birinchi o'rinda turadi, keyin _funksiya nomi_, so'ngra qavslar orasida _parametrlar_ ro'yxati (vergul bilan ajratilgan, yuqoridagi misolda bo'sh, keyinroq misollarni ko'ramiz) va nihoyat jingalak qavslar orasida funksiya kodi, "funksiya tanasi" deb ham ataladi.

```js
function name(parameter1, parameter2, ...parameterN) {
  // tana
}
```

Bizning yangi funksiyamizni nomi bilan chaqirish mumkin: `showMessage()`.

Masalan:

```js run
function showMessage() {
  alert( 'Hammaga salom!' );
}

*!*
showMessage();
showMessage();
*/!*
```

`showMessage()` chaqiruvi funksiya kodini bajaradi. Bu yerda xabarni ikki marta ko'ramiz.

Bu misol funksiyalarning asosiy maqsadlaridan birini aniq ko'rsatadi: kod takrorlanishini oldini olish.

Agar xabar yoki uni ko'rsatish usulini o'zgartirishga hojat tug'ilsa, kodni faqat bir joyda o'zgartirish kifoya: uni chiqaradigan funksiyada.

## Mahalliy o'zgaruvchilar

Funksiya ichida e'lon qilingan o'zgaruvchi faqat o'sha funksiya ichida ko'rinadi.

Masalan:

```js run
function showMessage() {
*!*
  let message = "Salom, men JavaScript!"; // mahalliy o'zgaruvchi
*/!*

  alert( message );
}

showMessage(); // Salom, men JavaScript!

alert( message ); // <-- Xato! O'zgaruvchi funksiyaga mahalliy
```

## Tashqi o'zgaruvchilar

Funksiya tashqi o'zgaruvchiga ham kirishi mumkin, masalan:

```js run no-beautify
let *!*userName*/!* = 'John';

function showMessage() {
  let message = 'Salom, ' + *!*userName*/!*;
  alert(message);
}

showMessage(); // Salom, John
```

Funksiya tashqi o'zgaruvchiga to'liq kirish huquqiga ega. U uni o'zgartirishi ham mumkin.

Masalan:

```js run
let *!*userName*/!* = 'John';

function showMessage() {
  *!*userName*/!* = "Bob"; // (1) tashqi o'zgaruvchini o'zgartirdi

  let message = 'Salom, ' + *!*userName*/!*;
  alert(message);
}

alert( userName ); // *!*John*/!* funksiya chaqiruvidan oldin

showMessage();

alert( userName ); // *!*Bob*/!*, qiymat funksiya tomonidan o'zgartirildi
```

Tashqi o'zgaruvchi faqat mahalliy yo'q bo'lgan taqdirda ishlatiladi.

Agar bir xil nomli o'zgaruvchi funksiya ichida e'lon qilinsa, u tashqi o'zgaruvchini _soyaga oladi_. Masalan, quyidagi kodda funksiya mahalliy `userName` dan foydalanadi. Tashqi o'zgaruvchi e'tiborga olinmaydi:

```js run
let userName = 'John';

function showMessage() {
*!*
  let userName = "Bob"; // mahalliy o'zgaruvchi e'lon qilish
*/!*

  let message = 'Salom, ' + userName; // *!*Bob*/!*
  alert(message);
}

// funksiya o'zining userName ini yaratadi va ishlatadi
showMessage();

alert( userName ); // *!*John*/!*, o'zgarmagan, funksiya tashqi o'zgaruvchiga kirmagan
```

```smart header="Global o'zgaruvchilar"
Har qanday funksiyadan tashqarida e'lon qilingan o'zgaruvchilar, yuqoridagi koddagi tashqi `userName` kabi, *global* deb ataladi.

Global o'zgaruvchilar har qanday funksiyadan ko'rinadi (mahalliy o'zgaruvchilar tomonidan soyaga olinmaguncha).

Global o'zgaruvchilardan foydalanishni kamaytirishning yaxshi amaliyotidir. Zamonaviy kodda kam yoki umuman global o'zgaruvchilar yo'q. Ko'pchilik o'zgaruvchilar o'z funksiyalarida joylashadi. Ba'zan ular loyiha darajasidagi ma'lumotlarni saqlash uchun foydali bo'lishi mumkin.
```

## Parametrlar

Parametrlar yordamida funksiyalarga ixtiyoriy ma'lumotlarni uzata olamiz.

Quyidagi misolda funksiyaning ikkita parametri bor: `from` va `text`.

```js run
function showMessage(*!*from, text*/!*) { // parametrlar: from, text
  alert(from + ': ' + text);
}

*!*showMessage('Ann', 'Salom!');*/!* // Ann: Salom! (*)
*!*showMessage('Ann', "Qandaysiz?");*/!* // Ann: Qandaysiz? (**)
```

Funksiya `(*)` va `(**)` qatorlarida chaqirilganda, berilgan qiymatlar mahalliy o'zgaruvchilar `from` va `text` ga nusxalanadi. Keyin funksiya ulardan foydalanadi.

Mana yana bir misol: bizda `from` o'zgaruvchisi bor va uni funksiyaga uzatamiz. E'tibor bering: funksiya `from` ni o'zgartiradi, lekin o'zgarish tashqarida ko'rinmaydi, chunki funksiya har doim qiymatning nusxasini oladi:

```js run
function showMessage(from, text) {

*!*
  from = '*' + from + '*'; // "from" ni chiroyliroq qilish
*/!*

  alert( from + ': ' + text );
}

let from = "Ann";

showMessage(from, "Salom"); // *Ann*: Salom

// "from" qiymati bir xil, funksiya mahalliy nusxani o'zgartirdi
alert( from ); // Ann
```

Qiymat funksiya parametri sifatida uzatilganda, u _argument_ deb ham ataladi.

Boshqacha qilib aytganda, bu atamalarni to'g'ri qo'yish uchun:

- Parametr - funksiya e'lonidagi qavslar ichida ko'rsatilgan o'zgaruvchi (bu e'lon vaqtidagi atama).
- Argument - funksiya chaqirilganda uzatiladigan qiymat (bu chaqiruv vaqtidagi atama).

Biz funksiyalarni parametrlarini ko'rsatib e'lon qilamiz, keyin argumentlarni uzatib chaqiramiz.

Yuqoridagi misolda shunday deyish mumkin: "`showMessage` funksiyasi ikkita parametr bilan e'lon qilingan, keyin ikkita argument bilan chaqirilgan: `from` va `"Salom"`".

## Standart qiymatlar

Agar funksiya chaqirilsa, lekin argument berilmasa, tegishli qiymat `undefined` bo'ladi.

Masalan, yuqorida aytib o'tilgan `showMessage(from, text)` funksiyasini bitta argument bilan chaqirish mumkin:

```js
showMessage("Ann");
```

Bu xato emas. Bunday chaqiruv `"*Ann*: undefined"` ni chiqaradi. `text` qiymati uzatilmagani uchun u `undefined` bo'ladi.

Funksiya e'lonida `=` yordamida parametr uchun "standart" (tashlab qo'yilsa ishlatish uchun) qiymatni belgilashimiz mumkin:

```js run
function showMessage(from, *!*text = "matn berilmagan"*/!*) {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: matn berilmagan
```

Endi agar `text` parametri uzatilmasa, u `"matn berilmagan"` qiymatini oladi.

Parametr mavjud bo'lsa ham, lekin qat'iy ravishda `undefined` ga teng bo'lsa ham standart qiymat ishlaydi:

```js
showMessage("Ann", undefined); // Ann: matn berilmagan
```

Bu yerda `"matn berilmagan"` satr, lekin u yanada murakkab ifoda bo'lishi mumkin, u faqat parametr yo'qolgan taqdirda baholanadi va tayinlanadi. Demak, bu ham mumkin:

```js run
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() faqat text berilmaganida bajariladi
  // uning natijasi text qiymati bo'ladi
}
```

```smart header="Standart parametrlarni baholash"
JavaScript-da standart parametr har safar tegishli parametrsiz funksiya chaqirilganda baholanadi.

Yuqoridagi misolda, agar `text` parametri berilsa, `anotherFunction()` umuman chaqirilmaydi.

Boshqa tomondan, `text` yo'qolgan har safar u mustaqil ravishda chaqiriladi.
```

````smart header="Eski JavaScript kodidagi standart parametrlar"
Bir necha yil oldin JavaScript standart parametrlar sintaksisini qo'llab-quvvatlamagan edi. Shuning uchun odamlar ularni belgilashning boshqa usullarini ishlatganlar.

Hozir biz ularni eski skriptlarda uchratishimiz mumkin.

Masalan, `undefined` uchun aniq tekshiruv:

```js
function showMessage(from, text) {
*!*
  if (text === undefined) {
    text = 'matn berilmagan';
  }
*/!*

  alert( from + ": " + text );
}
```

...Yoki `||` operatoridan foydalanish:

```js
function showMessage(from, text) {
  // Agar text qiymati yolg'on bo'lsa, standart qiymatni tayinlash
  // bu text == "" ni umuman matn yo'qligi bilan bir xil deb hisoblaydi
  text = text || 'matn berilmagan';
  ...
}
```
````

### Muqobil standart parametrlar

Ba'zan funksiya e'lonidan keyin keyinroq parametrlar uchun standart qiymatlarni tayinlash mantiqan to'g'ri keladi.

Funksiya bajarilishi davomida parametrning uzatilganligini `undefined` bilan solishtirib tekshirishimiz mumkin:

```js run
function showMessage(text) {
  // ...

*!*
  if (text === undefined) { // agar parametr yo'qolgan bo'lsa
    text = 'bo\'sh xabar';
  }
*/!*

  alert(text);
}

showMessage(); // bo'sh xabar
```

...Yoki `||` operatoridan foydalanishimiz mumkin:

```js
function showMessage(text) {
  // agar text undefined yoki boshqa yolg'on bo'lsa, uni 'bo'sh'ga o'rnatish
  text = text || 'bo\'sh';
  ...
}
```

Zamonaviy JavaScript dvigatellari [nullish coalescing operator](info:nullish-coalescing-operator) `??` ni qo'llab-quvvatlaydi, bu `0` kabi ko'pchilik yolg'on qiymatlar "normal" deb hisoblanishi kerak bo'lganda yaxshiroqdir:

```js run
function showCount(count) {
  // agar count undefined yoki null bo'lsa, "noma'lum"ni ko'rsatish
  alert(count ?? "noma'lum");
}

showCount(0); // 0
showCount(null); // noma'lum
showCount(); // noma'lum
```

## Qiymat qaytarish

Funksiya natija sifatida chaqiruvchi kodga qiymat qaytarishi mumkin.

Eng oddiy misol - ikkita qiymatni qo'shadigan funksiya:

```js run no-beautify
function sum(a, b) {
  *!*return*/!* a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

`return` direktivasi funksiyaning istalgan joyida bo'lishi mumkin. Bajarilish unga yetganda, funksiya to'xtaydi va qiymat chaqiruvchi kodga qaytariladi (yuqorida `result` ga tayinlangan).

Bitta funksiyada `return` ning ko'plab holatlari bo'lishi mumkin. Masalan:

```js run
function checkAge(age) {
  if (age >= 18) {
*!*
    return true;
*/!*
  } else {
*!*
    return confirm('Ota-onangizdan ruxsat bormikan?');
*/!*
  }
}

let age = prompt('Yoshingiz nechada?', 18);

if ( checkAge(age) ) {
  alert( 'Ruxsat berildi' );
} else {
  alert( 'Ruxsat rad etildi' );
}
```

`return` ni qiymat bo'lmagan holda ishlatish mumkin. Bu funksiyaning darhol chiqishiga sabab bo'ladi.

Masalan:

```js
function showMovie(age) {
  if ( !checkAge(age) ) {
*!*
    return;
*/!*
  }

  alert( "Sizga filmni ko'rsatamiz" ); // (*)
  // ...
}
```

Yuqoridagi kodda, agar `checkAge(age)` `false` qaytarsa, `showMovie` `alert` ga o'tmaydi.

````smart header="Bo'sh `return`yoki uning yo'qligi`undefined`qaytaradi"
Agar funksiya qiymat qaytarmasa, bu xuddi`undefined` qaytargani bilan bir xil:

```js run
function doNothing() {
  /* bo'sh */
}

alert(doNothing() === undefined); // true
```

Bo'sh `return` ham `return undefined` bilan bir xil:

```js run
function doNothing() {
  return;
}

alert(doNothing() === undefined); // true
```

`````

````warn header="`return` va qiymat orasiga hech qachon yangi qator qo'shmang"
`return` da uzun ifoda uchun uni alohida qatorga qo'yish vasvasaga soladigan bo'lishi mumkin:

```js
return
 (some + long + expression + or + whatever * f(a) + f(b))
```
Bu ishlamaydi, chunki JavaScript `return` dan keyin nuqta-vergul deb taxmin qiladi. Bu quyidagi bilan bir xil ishlaydi:

```js
return*!*;*/!*
 (some + long + expression + or + whatever * f(a) + f(b))
```

Shunday qilib, u samarali ravishda bo'sh return bo'ladi.

Agar qaytarilgan ifoda bir necha qatorga bo'linishini istasak, uni `return` bilan bir xil qatordan boshlashimiz kerak. Yoki kamida ochilish qavslarini quyidagicha qo'yishimiz kerak:

```js
return (
  some + long + expression
  + or +
  whatever * f(a) + f(b)
  )
```
Va u biz kutganimizdek ishlaydi.
`````

## Funksiyani nomlash [#function-naming]

Funksiyalar harakatlardir. Shuning uchun ularning nomi odatda fe'l bo'ladi. U qisqa, imkon qadar aniq va funksiya nima qilishini tasvirlab berishi kerak, shunda kodni o'qiyotgan kishi funksiya nima qilishini tushunadi.

Harakat haqida taxminan tasvirlaydigan fe'l prefiksi bilan funksiyani boshlash keng tarqalgan amaliyotdir. Jamoada prefikslar ma'nosi haqida kelishuv bo'lishi kerak.

Masalan, `"show"` bilan boshlanadigan funksiyalar odatda biror narsani ko'rsatadi.

Funksiya boshlangan...

- `"get…"` -- qiymat qaytaradi,
- `"calc…"` -- biror narsani hisoblaydi,
- `"create…"` -- biror narsa yaratadi,
- `"check…"` -- biror narsani tekshiradi va boolean qaytaradi, va hokazo.

Bunday nomlar misollari:

```js no-beautify
showMessage(..)     // xabar ko'rsatadi
getAge(..)          // yoshni qaytaradi (qandaydir usul bilan oladi)
calcSum(..)         // yig'indini hisoblaydi va natijani qaytaradi
createForm(..)      // forma yaratadi (va odatda uni qaytaradi)
checkPermission(..) // ruxsatni tekshiradi, true/false qaytaradi
```

Prefikslar o'rnida, funksiya nomiga bir nazar tashlash uning qanday ish qilishini va qanday qiymat qaytarishini tushunishga imkon beradi.

```smart header="Bitta funksiya -- bitta harakat"
Funksiya aynan nomida aytilgan narsani qilishi kerak, undan ortiq emas.

Ikki mustaqil harakat odatda ikkita funksiyani talab qiladi, hatto ular odatda birga chaqirilsa ham (bu holda biz o'sha ikkisini chaqiradigan 3-funksiya yasashimiz mumkin).

Bu qoidani buzishning bir necha misoli:

- `getAge` -- agar u yoshni `alert` bilan ko'rsatsa yomon bo'ladi (faqat olishi kerak).
- `createForm` -- agar u hujjatni o'zgartirsa, unga forma qo'shsa yomon bo'ladi (faqat yaratishi va qaytarishi kerak).
- `checkPermission` -- agar u `ruxsat berildi/rad etildi` xabarini ko'rsatsa yomon bo'ladi (faqat tekshirishi va natijani qaytarishi kerak).

Bu misollar prefikslarning umumiy ma'nolarini nazarda tutadi. Siz va jamoangiz boshqa ma'nolar haqida kelishishingiz mumkin, lekin odatda ular unchalik farq qilmaydi. Har qanday holatda, prefiks nimani anglatishi, prefiksli funksiya nima qila olishi va nima qila olmasligi haqida aniq tushunchaga ega bo'lishingiz kerak. Barcha bir xil prefiksli funksiyalar qoidalarga bo'ysunishi kerak. Va jamoa bilimni bo'lishishi kerak.
```

```smart header="O'ta qisqa funksiya nomlari"
*Juda tez-tez* ishlatiladigan funksiyalar ba'zan o'ta qisqa nomlarga ega.

Masalan, [jQuery](https://jquery.com/) freymvorki `$` bilan funksiya aniqlaydi. [Lodash](https://lodash.com/) kutubxonasining asosiy funksiyasi `_` deb nomlangan.

Bular istisnolar. Umuman funksiya nomlari qisqa va tavsiflovchi bo'lishi kerak.
```

## Funksiyalar == Sharhlar

Funksiyalar qisqa va aynan bitta ishni qilishi kerak. Agar bu ish katta bo'lsa, funksiyani bir nechta kichikroq funksiyalarga bo'lish arziydi. Ba'zan bu qoidaga amal qilish oson bo'lmasligi mumkin, lekin bu albatta yaxshi narsa.

Alohida funksiya nafaqat sinovdan o'tkazish va disk raskadka qilish osonroq -- uning mavjudligi o'zi ajoyib sharh!

Masalan, quyidagi ikkita `showPrimes(n)` funksiyasini solishtiring. Har biri `n` gacha [tub sonlarni](https://en.wikipedia.org/wiki/Prime_number) chiqaradi.

Birinchi variant yorliq ishlatadi:

```js
function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert(i); // tub son
  }
}
```

Ikkinchi variant tublikni tekshirish uchun qo'shimcha `isPrime(n)` funksiyasidan foydalanadi:

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  // tub son
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}
```

Ikkinchi variant tushunish osonroq, shunday emasmi? Kod qismi o'rniga biz harakat nomini ko'ramiz (`isPrime`). Ba'zan odamlar bunday kodni _o'z-o'zini tavsiflovchi_ deb atashadi.

Shunday qilib, funksiyalarni qayta ishlatishni niyat qilmasak ham yaratish mumkin. Ular kodni strukturalashtiradi va o'qishga qulay qiladi.

## Xulosa

Funksiya e'loni quyidagicha ko'rinadi:

```js
function name(vergul, bilan, ajratilgan, parametrlar) {
  /* kod */
}
```

- Funksiyaga parametr sifatida uzatilgan qiymatlar uning mahalliy o'zgaruvchilariga nusxalanadi.
- Funksiya tashqi o'zgaruvchilarga kirishi mumkin. Lekin u faqat ichkaridan tashqariga ishlaydi. Funksiyadan tashqaridagi kod uning mahalliy o'zgaruvchilarini ko'rmaydi.
- Funksiya qiymat qaytarishi mumkin. Agar qaytarmasa, uning natijasi `undefined` bo'ladi.

Kodni toza va tushunish oson qilish uchun funksiyada asosan mahalliy o'zgaruvchilar va parametrlardan foydalanish tavsiya etiladi, tashqi o'zgaruvchilardan emas.

Parametrlar oladigan, ular bilan ishlaydigan va natija qaytaradigan funksiyani tushunish har doim parametr olmaydigan, lekin yon ta'sir sifatida tashqi o'zgaruvchilarni o'zgartiradigan funksiyadan osondir.

Funksiyani nomlash:

- Nom funksiya nima qilishini aniq tasvirlashi kerak. Kodda funksiya chaqiruvini ko'rganimizda, yaxshi nom bizga u nima qilishi va qaytarishini darhol tushuntirib beradi.
- Funksiya harakat, shuning uchun funksiya nomlari odatda fe'ldir.
- `create…`, `show…`, `get…`, `check…` va boshqa ko'plab taniqli funksiya prefikslari mavjud. Funksiya nima qilishini bildirish uchun ulardan foydalaning.

Funksiyalar skriptlarning asosiy qurilish bloklaridir. Endi biz asoslarni ko'rib chiqdik, shuning uchun aslida ularni yaratish va ishlatishni boshlashimiz mumkin. Lekin bu yo'lning faqat boshlanishi. Biz ularga ko'p marta qaytamiz va ularning ilg'or xususiyatlarini chuqurroq o'rganamiz.
