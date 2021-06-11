# Funktsiya

Ko'pincha biz skriptning ko'p joylarida shunga o'xshash ifodalarni bajarishimiz kerak.

Masalan, mehmon tizimga kirganda, chiqanda va ehtimol boshqa bir joyda biz chiroyli ko'rinadigan xabarni ko'rsatishimiz kerak.

Funktsiyalar dasturning asosiy "qurilish materiallari" dir. Ular kodni takrorlanmasdan ko'p marta chaqirishga imkon beradi.

Biz allaqachon `alert(xabar)`, `prompt(xabar, standart)` va `confirm(savol)` kabi ichki funktsiyalarning misollarini ko'rdik. Ammo biz o'zimizga xos funktsiyalarni yaratishimiz mumkin.

## Funktsiya deklaratsiyasi

Funktsiyani yaratish uchun *funktsiya deklaratsiyasi* dan foydalanishimiz kerak.

Bu shunday ko'rinishga ega:

```js
function showMessage() {
  alert( 'Hammaga salom!' );
}
```

Avval `function` kalit so'zi, so'ngra *funktsiya nomi*, so'ngra qavslar orasidagi *parametrlar* ro'yxati (yuqoridagi misolda bo'sh) va nihoyat funktsiya kodi, shuningdek,"funktsiya tanasi" deb nomlanadi , jingalak qavslar orasida.

![](function_basics.png)

Bizning yangi funktsiyamizni o'z nomi bilan chaqirish mumkin: "showMessage()".

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

`showMessage()` chaqiruvi funktsiya kodini bajaradi. Bu erda biz xabarni ikki marta ko'ramiz.

Ushbu misol funktsiyalarning asosiy maqsadlaridan birini aniq ko'rsatib beradi: kodning takrorlanishiga yo'l qo'ymaslik.

Agar bizga xabar yoki uning ko'rinishini o'zgartirish zarur bo'lsa, kodni bitta joyda o'zgartirish kifoya: uni chiqaradigan funktsiyada.

## Ichki o'zgaruvchanlar

Funktsiya ichida e'lon qilingan o'zgaruvchan faqat shu funktsiya ichida ko'rinadi.

Masalan:

```js run
function showMessage() {
*!*
  let message = "Salom, men JavaScript!"; // ichki o'zgaruvchan
*/!*

  alert( message );
}

showMessage(); // Salom, men JavaScript!

alert( message ); // <-- Xato! O'zgaruvchan funktsiya uchun ichkki hisoblanadi
```

## Tashqi o'zgaruvchanlar

Funktsiya tashqi o'zgaruvchanga ham kirishi mumkin, masalan:

```js run no-beautify
let *!*userName*/!* = 'John';

function showMessage() {
  let message = 'Salom, ' + *!*userName*/!*;
  alert(message);
}

showMessage(); // Salom, John
```

Funktsiya tashqi o'zgaruvchanga to'liq kirish huquqiga ega. Uni o'zgartirishi ham mumkin.

Masalan:

```js run
let *!*userName*/!* = 'John';

function showMessage() {
  *!*userName*/!* = "Bob"; // (1) tashqi o'zgaruvchanni o'zgartirdi

  let message = 'Salom, ' + *!*userName*/!*;
  alert(message);
}

alert( userName ); // *!*John*/!* funktsiya chaqirig'idan oldin

showMessage();

alert( userName ); // *!*Bob*/!*, qiymati funktsiya tomonidan o'zgartirildi
```

Tashqi o'zgaruvchandan faqat ichki mavjud bo'lmaganda foydalaniladi. Shunday qilib, vaqti-vaqti bilan o'zgartirish sodir bo'lishi mumkin, agar biz `let` kalitini unutib qo'ysak.

Agar funktsiya ichida bir xil nomlangan o'zgaruvchan e'lon qilingan bo'lsa, u holda tashqi tomoniga *soya soladi*. Masalan, quyidagi kodda funktsiya ichki `userName` dan foydalanadi. Tashqisi e'tiborga olinmaydi:

```js run
let userName = 'John';

function showMessage() {
*!*
  let userName = "Bob"; // ichki o'zgaruvchan e'lon qilindi
*/!*

  let message = 'Salom, ' + userName; // *!*Bob*/!*
  alert(message);
}

// funktsiya userName ni yaratadi va ishlatadi
showMessage();

alert( userName ); // *!*John*/!*, o'zgarishsiz, funktsiya tashqi o'zgaruvchiga kira olmaydi
```

```smart header="Global o'zgaruvchanlar"
Yuqoridagi koddagi tashqi `userName` kabi har qanday funktsiyalardan tashqarida e'lon qilingan o'zgaruvchilar *global* deb nomlanadi.

Global o'zgaruvchanlar har qanday funktsiyadan ko'rinadi (agar ichki o'zgaruvchanlar soya qilinmasa).

Odatda funktsiya o'z vazifasiga xos bo'lgan barcha o'zgaruvchanlarni e'lon qiladi. Global o'zgaruvchanlar faqat loyiha darajasidagi ma'lumotlarni saqlaydi va bu o'zgaruvchanlarga istalgan joydan kirish imkoni bo'lishi muhimdir. Zamonaviy kodda global o'zgaruvchanlar kam yoki umuman yo'q. Ko'pgina o'zgaruvchanlar o'z funktsiyalarida joylashgan.
```

## Parametrlar

Parametrlar (shuningdek *funktsiya argumentlari* deb nomlanadi) yordamida funktsiyalarga ma'lumotlarni uzatishimiz mumkin.

Quyidagi misolda funktsiya ikkita parametrga ega: `from` va `text`.

```js run
function showMessage(*!*from, text*/!*) { // argumentlari: from, text
  alert(from + ': ' + text);
}

*!*
showMessage('Ann', 'Salom!'); // Ann: Salom! (*)
showMessage('Ann', "Nma gap?"); // Ann: Nma gap? (**)
*/!*
```

Funktsiya `(*)` va `(**)` satrlari bilan chaqirilganda, berilgan qiymatlar `from` va` text` ichki o'zgaruvchanlarga ko'chiriladi. Keyin funktsiya ularni ishlatadi.

Yana bir misol: bizda `from` o'zgaruvchani bor va uni funktsiyaga o'tkazamiz. Iltimos, e'tibor bering: funktsiya `from` ni o'zgartiradi, lekin o'zgarish tashqarida ko'rinmaydi, chunki funktsiya har doim qiymatning nusxasini oladi:


```js run
function showMessage(from, text) {

*!*
  from = '*' + from + '*'; // "from" ni chiroyli qilib ko'rsatish
*/!*

  alert( from + ': ' + text );
}

let from = "Ann";

showMessage(from, "Salom"); // *Ann*: Salom

// "from" qiymati bir xil, funktsiya ichki nusxani o'zgartirgan
alert( from ); // Ann
```

## Oldindan tayinlangan qiymatlar

Agar parametr taqdim etilmasa, uning qiymati `undefined` bo'ladi.

Masalan, `showMessage(from,text)` funktsiyasini bitta argument bilan chaqirish mumkin:

```js
showMessage("Ann");
```

Bu xato emas. Bunday chaqirish `"Ann: undefined"` ni keltirib chiqaradi. `Text` yo'q, shuning uchun `text === undefined` deb taxmin qilinadi.

Agar biz ushbu holatda "oldindan tayinlangan" `text` dan foydalanmoqchi bo'lsak, uni `=` dan keyin belgilashimiz mumkin:

```js run
function showMessage(from, *!*text = "matn berilmagan"*/!*) {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: matn berilmagan
```

Endi `text` parametri berilmasa, u `"matn berilmagan"` qiymatiga ega bo'ladi

Bu erda `"matn berilmagan"` bu matndir, lekin u yanada murakkab ifoda bo'lishi mumkin, faqat parametr yetishmayotgan taqdirda baholanadi va tayinlanadi. Shunday qilib, bunaqa ifoda ham bo'lishi mumkin:

```js run
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() faqat matn berilmasa bajariladi
  // uning natijasi text ning qiymatiga aylanadi
}
```

```smart header="Oldindan tayinlangan parametrlarni baholash"

JavaScript-da, oldindan tayinlangan parametr har safar funktsiyaga tegishli parametrsiz chaqirilganda baholanadi. Yuqoridagi misolda, har safar `showMessage()` chaqirilganda `anotherFunction()` `text` parametrisiz bo'lganida chaqiriladi. Bu Python kabi ba'zi boshqa tillardan farq qiladi, bu yerda har qanday oldindan tayinlangan parametrlar dastlabki interpretatsiya paytida faqat bir marta baholanadi.

```


````smart header="Oldindan tayinlangan parametrlar eski uslubda"
JavaScript-ning eski nashrlari oldindan tayinlangan parametrlarni qo'llab-quvvatlamagan. Shuning uchun ularni qo'llab-quvvatlashning muqobil usullari mavjud, ularni asosan eski skriptlarda topish mumkin.

Masalan, aniqlanmaganligini aniq tekshirish:

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

...Yoki `||` operatori:

```js
function showMessage(from, text) {
  // agar matn noto'g'ri bo'lsa, unda matn "oldindan tayinlangan" qiymatga ega bo'ladi
  text = text || 'matn berilmagan';
  ...
}
```


````


## Qiymatni qaytarish

Funktsiya qiymatni chaqiruv kodiga natija sifatida qaytarishi mumkin.

Eng oddiy misol ikkita qiymatni yig'adigan funktsiya bo'lishi mumkin:

```js run no-beautify
function sum(a, b) {
  *!*return*/!* a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

`return` direktivasi funktsiyaning istalgan joyida bo'lishi mumkin. Amalga oshirilganda funktsiya to'xtaydi va qiymat chaqiruv kodiga qaytariladi (yuqoridagi `result` ga berilgan).

Bitta funktsiyada `return` ning ko'plab hodisalari bo'lishi mumkin. Misol uchun:

```js run
function checkAge(age) {
  if (age > 18) {
*!*
    return true;
*/!*
  } else {
*!*
    return confirm('Siz ota-onangizdan ruxsat oldingizmi?');
*/!*
  }
}

let age = prompt('Yoshingiz nechida?', 18);

if ( checkAge(age) ) {
  alert( 'Kirish uchun ruxsat berilgan' );
} else {
  alert( "Ruxsat yo'q" );
}
```

`return` ni qiymatsiz ishlatish mumkin. Bu funktsiyaning darhol chiqib ketishiga olib keladi.

For example:

```js
function showMovie(age) {
  if ( !checkAge(age) ) {
*!*
    return;
*/!*
  }

  alert( "Sizga film namoyish etilmoqda" ); // (*)
  // ...
}
```

Yuqoridagi kodda, agar `checkAge(age)` `false` ni qaytarsa, u holda `showMovie` `alert` ga o'tmaydi.

````smart header="Bo'sh yoki bo'sh emas `return` funktsiya `undefined` qaytaradi"
If a function does not return a value, it is the same as if it returns `undefined`:

```js run
function doNothing() { /* bo'sh */ }

alert( doNothing() === undefined ); // true
```

Bo'sh `return` va `return undefined` bir xil:

```js run
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```
````

````warn header="Hech qachon `return` va qiymat o'rtasida yangi satr qo'shmang"
`return` da uzoq ifoda uchun uni alohida satrga qo'yib qo'yish istagi paydo bo'lishi mumkin, masalan:

```js
return
 (ba'zi + uzun + ifoda + uchun * f(a) + f(b))
```
Bu ishlamaydi, chunki JavaScript `return` dan keyin nuqta-vergul yozadi. Bu xuddi shunday ishlaydi:

```js
return*!*;*/!*
 (ba'zi + uzun + ifoda + uchun * f(a) + f(b))
```
Shunday qilib, u samarali ravishda bo'sh retutn ga aylanadi. Buning o'rniga qiymatni bir satrga qo'yishimiz kerak.
````

## Funktsiyani nomlash [#function-naming]

Funktsiyalar - bu harakatlar. Shuning uchun ularning nomi odatda fe'ldir. Nom iloji boricha qisqacha, aniqroq bo'lishi va funktsiyani bajarishini tavsiflashi kerak, shunda kodni o'qiyotgan dasturchi funktsiyani bajaradigan ko'rsatkichni oladi.

Odatda, fe'lning shaxssiz shaklik prefikslar ishlatiladi, bu harakatning umumiy xususiyatini bildiradi, undan keyin tushuntirish kerak. Odatda, dasturlash guruhlarida ushbu prefikslarning ma'nolari bilan bog'liq bitimlar mavjud.

Masalan, `"show"` bilan boshlanadigan funktsiyalar odatda nimanidir ko'rsatadi.

Bilan boshlangan funktsiya...

- `"get…"` -- qiymatni qaytardi,
- `"calc…"` -- biror narsani hisoblaydi,
- `"create…"` -- biror narsa yaratadi,
- `"check…"` -- biron bir narsani tekshiradi va mantiqiy turdagi qiymatni qaytaradi va hokazo.

Bunday ismlarning misollari:

```js no-beautify
showMessage(..)     // xabarni ko'rsatadi
getAge(..)          // yoshni qaytaradi (qandaydir tarzda oladi)
calcSum(..)         // summani hisoblab chiqadi va natijani qaytaradi
createForm(..)      // forma yaratadi (va odatda qaytaradi)
checkPermission(..) // ruxsatni tekshiradi, true/false qiymatini qaytaradi
```

Prefikslar, funktsiya nomiga qaraganda, qanday ishni bajarishini va qanday qiymatni qaytarishini tushunishga imkon beradi.

```smart header="Bitta funktsiya -- bitta harakat"
Funktsiya o'z nomi bilan e'lon qilingan narsani aniq bajarishi kerak, undan tashqari emas.

Ikkita mustaqil harakatlar odatda ikkita funktsiyaga loyiqdir, hatto ular odatda birlashtirilgan bo'lsa ham (u holda biz bu ikkitasini chaqiradigan 3-funktsiyani bajarishimiz mumkin).

Ushbu qoidani buzish uchun bir necha misollar:

- `getAge` -- yoshga qarab `alert` ko'rsatsa yomon bo'lar edi (faqat olish kerak).
- `createForm` -- agar u hujjatni o'zgartirsa va unga shakl qo'shsa yomon bo'ladi (faqat uni yaratib qaytishi kerak).
- `checkPermission` -- agar u "ruxsat berilgan/rad etilgan" xabarini ko'rsatsa yomon bo'ladi (faqat tekshirishni amalga oshirishi va natijani qaytarishi kerak).

Ushbu misollarda prefikslarning umumiy ma'nolari mavjud. Ular siz uchun nimani anglatishini siz va jamoangiz belgilaydi. Ehtimol sizning kodingiz boshqacha yo'l tutishi odatiy holdir. Ammo siz prefiks nimani anglatishini, prefiksli funktsiya nimani bajara olishi va qila olmasligini qat'iy tushunishingiz kerak. Barcha bir xil prefiksli funktsiyalar qoidalarga bo'ysunishi kerak. Va jamoa bilim almashish kerak.
```

```smart header="Ultra qisqa funktsiya nomlari"
*Juda tez-tez* ishlatiladigan funktsiyalar ba'zan ultra qisqa nomlarga ega.

Masalan, [jQuery](http://jquery.com) framework `$` bilan bir vazifani belgilaydi. [Lodash](http://lodash.com/) kutubxona `_` nomli asosiy vazifasi bor.

Bu istisnolar. Odatda funktsiyalar nomlari ixcham va tavsifli bo'lishi kerak.
```

## Funktsiyalar == Izohlar

Funktsiyalar qisqa bo'lishi va aniq bir narsani bajarishi kerak. Agar bu narsa katta bo'lsa, ehtimol funktsiyani bir nechta kichik funktsiyalarga bo'lishiga arziydi. Ba'zan ushbu qoidaga rioya qilish unchalik oson bo'lmasligi mumkin, ammo bu albatta yaxshi narsa.

Alohida funktsiyani sinash va koddagi hattoliklarini bartaraf etish jarayonini qilish osonroq emas -- uning mavjudligi juda yaxshi izohdir!

For instance, compare the two functions `showPrimes(n)` below. Each one outputs [prime numbers](https://en.wikipedia.org/wiki/Prime_number) up to `n`.
Masalan, quyidagi `showPrimes(n)` ikkita funktsiyani taqqoslang. Ularning har biri [tub raqamlar](https://en.wikipedia.org/wiki/Prime_number) ni `n` gacha qaytaradi.

Birinchi variant yorliqdan foydalanadi:

```js
function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert( i ); // tub son
  }
}
```

The second variant uses an additional function `isPrime(n)` to test for primality:
Ikkinchi variantda birinchi darajani tekshirish uchun qo'shimcha `isPrime(n)` funktsiyasi ishlatiladi:

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

Ikkinchi variantni tushunish osonroq, shunday emasmi? Kod qismi o'rniga biz harakat nomini ko'ramiz (`isPrime`). Ba'zan odamlar bunday kodni *o'zini o'zi tavsiflash* deb atashadi.

Shunday qilib, biz ularni qayta ishlatishni xohlamasak ham, funktsiyalarni yaratish mumkin. Ular kodni tuzadilar va uni o'qilishini oson qiladilar.

## Xulosa

Funktsiya deklaratsiyasi quyidagicha:

```js
function nomi(parametrlar, vergul, bilan, ajratilgan) {
  /* kod tanasi */
}
```

- Parametrlar sifatida funktsiyaga berilgan qiymatlar uning ichki o'zgaruvchanlarga ko'chiriladi.
- Funktsiya tashqi o'zgaruvchanlarga kirishi mumkin. Ammo u faqat ichkaridan ishlaydi. Funktsiya tashqarisidagi kod uning ichki o'zgaruvchilanlarini ko'rmaydi.
- Funktsiya qiymatni qaytarishi mumkin. Agar qaytarilmasa, unda uning natijasi `undefined`.

Kodni toza va tushunarli qilish uchun tashqi o'zgaruvchanlardan emas, balki asosan ichki o'zgaruvchanlar va parametrlardan foydalanish tavsiya etiladi.

Parametrlarni oladigan, ular bilan ishlaydigan va natijani qaytaradigan, hech qanday parametrga ega bo'lmagan, lekin tashqi o'zgaruvchanlarni yon ta'sir sifatida o'zgartiradigan funktsiyani tushunish har doim ham osonroqdir.

Funktsiyaning nomlash:

- Funktsiya nomi funktsiya nimani bajarishini aniq tavsiflashi kerak. Kodda funktsiya chaqiruvini ko'rganimizda, yaxshi nom darhol nima qilishini va qaytib chiqarishini tushunishga imkon beradi.
- Funktsiya - bu harakat, shuning uchun funktsiya nomlari odatda fe'lning shaxssiz shakli bo'ladi.
- `create...`, `show...`, `get...`, `check...` va shunga o'xshash ko'plab taniqli funktsional prefikslar mavjud. Funktsiya nima qilishini ko'rsatish uchun ularni ishlating.

Funktsiyalar skriptlarning asosiy tarkibiy qismidir. Endi biz asoslarni o'rganib chiqdik, shuning uchun ularni yaratish va ulardan foydalanishni boshlashimiz mumkin. Ammo bu yo'lning faqat boshlanishi. Biz ularga ko'p marta qaytamiz, ularning ilg'or xususiyatlariga chuqurroq kirib boramiz.
