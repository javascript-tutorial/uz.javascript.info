# O'zgaruvchi doirasi, yopilish (closure)

JavaScript juda funktsiya-yo'naltirilgan tildir. U bizga katta erkinlik beradi. Funktsiya istalgan vaqtda yaratilishi, boshqa funktsiyaga argument sifatida uzatilishi va keyinroq kodning butunlay boshqa joyidan chaqirilishi mumkin.

Biz allaqachon funktsiya o'zidan tashqaridagi o'zgaruvchilarga ("tashqi" o'zgaruvchilar) kira olishini bilamiz.

Lekin agar funktsiya yaratilgandan so'ng tashqi o'zgaruvchilar o'zgarsa nima bo'ladi? Funktsiya yangi qiymatlarni oladimi yoki eskilarini?

Va agar funktsiya argument sifatida uzatilib, kodning boshqa joyidan chaqirilsa, u yangi joydagi tashqi o'zgaruvchilarga kirish huquqiga ega bo'ladimi?

Ushbu stsenariylar va yanada murakkab holatlarni tushunish uchun bilimimizni kengaytiraylik.

```smart header="Bu yerda `let/const` o'zgaruvchilar haqida gaplashamiz"
JavaScript da o'zgaruvchi e'lon qilishning 3 xil usuli bor: `let`, `const` (zamonaviy usullar) va `var` (o'tmishdan qolgan).

- Ushbu maqolada biz misollarda `let` o'zgaruvchilarini ishlatamiz.
- `const` bilan e'lon qilingan o'zgaruvchilar ham xuddi shunday harakat qiladi, shuning uchun bu maqola `const` haqida ham.
- Eski `var` ning bir nechta muhim farqlari bor, ular <info:var> maqolasida yoritiladi.
```

## Kod bloklari

Agar o'zgaruvchi kod bloki `{...}` ichida e'lon qilingan bo'lsa, u faqat shu blok ichida ko'rinadi.

Misol uchun:

```js run
{
  // tashqarida ko'rinmasligi kerak bo'lgan mahalliy o'zgaruvchilar bilan biror ish qiling

  let message = "Salom"; // faqat shu blokda ko'rinadi

  alert(message); // Salom
}

alert(message); // Xato: message aniqlanmagan
```

Buni faqat o'ziga tegishli o'zgaruvchilar bilan o'z vazifasini bajaradigan kod qismini ajratish uchun ishlatishimiz mumkin:

```js run
{
  // xabarni ko'rsatish
  let message = "Salom";
  alert(message);
}

{
  // boshqa xabarni ko'rsatish
  let message = "Xayr";
  alert(message);
}
```

````smart header="Bloklarsiz xatolik bo'ladi"
E'tibor bering, alohida bloklar bo'lmasa, mavjud o'zgaruvchi nomi bilan `let` dan foydalansak xatolik bo'ladi:

```js run
// xabarni ko'rsatish
let message = "Salom";
alert(message);

// boshqa xabarni ko'rsatish
*!*
let message = "Xayr"; // Xato: o'zgaruvchi allaqachon e'lon qilingan
*/!*
alert(message);
```
````

`if`, `for`, `while` va boshqalar uchun ham `{...}` da e'lon qilingan o'zgaruvchilar faqat ichkarida ko'rinadi:

```js run
if (true) {
  let phrase = "Salom!";

  alert(phrase); // Salom!
}

alert(phrase); // Xato, bunday o'zgaruvchi yo'q!
```

Bu yerda `if` tugagandan so'ng, pastdagi `alert` `phrase` ni ko'rmaydi, shuning uchun xatolik.

Bu juda yaxshi, chunki bizga `if` shoxiga xos blok-mahalliy o'zgaruvchilar yaratishga imkon beradi.

Xuddi shunday narsa `for` va `while` sikllariga ham tegishli:

```js run
for (let i = 0; i < 3; i++) {
  // i o'zgaruvchisi faqat shu for ichida ko'rinadi
  alert(i); // 0, keyin 1, keyin 2
}

alert(i); // Xato, bunday o'zgaruvchi yo'q
```

Ko'rinishda `let i` `{...}` dan tashqarida. Lekin `for` konstruktsiyasi bu yerda maxsus: unda e'lon qilingan o'zgaruvchi blokning bir qismi hisoblanadi.

## Ichma-ich funktsiyalar

Funktsiya boshqa funktsiya ichida yaratilganda "ichma-ich" deb ataladi.

JavaScript da buni qilish oson.

Biz buni kodimizni tartibga solish uchun ishlatishimiz mumkin:

```js
function sayHiBye(firstName, lastName) {

  // pastda ishlatish uchun yordamchi ichma-ich funktsiya
  function getFullName() {
    return firstName + " " + lastName;
  }

  alert( "Salom, " + getFullName() );
  alert( "Xayr, " + getFullName() );

}
```

Bu yerda *ichma-ich* funktsiya `getFullName()` qulaylik uchun yaratilgan. U tashqi o'zgaruvchilarga kira oladi va shuning uchun to'liq ismni qaytara oladi. Ichma-ich funktsiyalar JavaScript da juda keng tarqalgan.

Yanada qiziqarli tomoni shundaki, ichma-ich funktsiya qaytarilishi mumkin: yangi objektning xususiyati sifatida yoki o'zi natija sifatida. Keyin uni boshqa joyda ishlatish mumkin. Qayerda bo'lishidan qat'i nazar, u hali ham bir xil tashqi o'zgaruvchilarga kirish huquqiga ega.

Quyida `makeCounter` har bir chaqiruvda keyingi raqamni qaytaradigan "hisoblagich" funktsiyasini yaratadi:

```js run
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1
alert( counter() ); // 2
```

Oddiy bo'lishiga qaramay, shu kodning bir oz o'zgartirilgan variantlari amaliy foydalanishga ega, masalan, avtomatlashtirilgan testlar uchun tasodifiy qiymatlar yaratish uchun [tasodifiy raqam generatori](https://en.wikipedia.org/wiki/Pseudorandom_number_generator) sifatida.

Bu qanday ishlaydi? Agar biz bir nechta hisoblagich yaratsak, ular mustaqil bo'ladimi? Bu yerda o'zgaruvchilar bilan nima sodir bo'lyapti?

Bunday narsalarni tushunish JavaScript ning umumiy bilimi uchun ajoyib va murakkab stsenariylar uchun foydali. Shuning uchun biroz chuqurroq kiraylik.

## Leksik muhit (Lexical Environment)

```warn header="Bu yerda ajdaholar bor!"
Chuqur texnik tushuntirish oldinda.

Men past darajadagi til tafsilotlaridan qochishni xohlasam ham, ularsiz har qanday tushunish etishmaydi va to'liq bo'lmaydi, shuning uchun tayyor bo'ling.
```

Aniqlik uchun tushuntirish bir necha bosqichga bo'lingan.

### 1-qadam. O'zgaruvchilar

JavaScript da har bir ishlaydigan funktsiya, kod bloki `{...}` va umuman skriptning *Leksik muhit* deb ataladigan ichki (yashirin) bog'langan objekti bor.

Leksik muhit objekti ikki qismdan iborat:

1. *Environment Record* -- barcha mahalliy o'zgaruvchilarni o'z xususiyatlari sifatida saqlaydigan objekt (va `this` qiymati kabi boshqa ma'lumotlar).
2. *Tashqi leksik muhitga* havola, tashqi kod bilan bog'langan.

**"O'zgaruvchi" - bu maxsus ichki objekt `Environment Record` ning xususiyati. "O'zgaruvchini olish yoki o'zgartirish" degani "shu objektning xususiyatini olish yoki o'zgartirish".**

Ushbu oddiy kodda funktsiyalarsiz faqat bitta Leksik muhit bor:

![lexical environment](lexical-environment-global.svg)

Bu butun skript bilan bog'langan *global* Leksik muhit deb ataladi.

Yuqoridagi rasmda to'rtburchak Environment Record (o'zgaruvchi ombori) ni, o'q esa tashqi havolani anglatadi. Global Leksik muhitning tashqi havolasi yo'q, shuning uchun o'q `null` ga yo'naltirilgan.

Kod bajarilishni boshlashi va davom etishi bilan Leksik muhit o'zgaradi.

Mana biroz uzunroq kod:

![lexical environment](closure-variable-phrase.svg)

O'ng tarafdagi to'rtburchaklar ijro davomida global Leksik muhit qanday o'zgarishini ko'rsatadi:

1. Skript boshlanganida, Leksik muhit barcha e'lon qilingan o'zgaruvchilar bilan oldindan to'ldiriladi.
    - Dastlab ular "Ishga tushirilmagan" holatda. Bu maxsus ichki holat, ya'ni mexanizm o'zgaruvchi haqida biladi, lekin u `let` bilan e'lon qilinmaguncha unga murojaat qilib bo'lmaydi. Bu deyarli o'zgaruvchi mavjud emasdek.
2. Keyin `let phrase` ta'rifi paydo bo'ladi. Hali tayinlash yo'q, shuning uchun uning qiymati `undefined`. Shu nuqtadan boshlab o'zgaruvchini ishlatishimiz mumkin.
3. `phrase` ga qiymat tayinlanadi.
4. `phrase` qiymatni o'zgartiradi.

Hozircha hamma narsa oddiy ko'rinadi, to'g'rimi?

- O'zgaruvchi - bu hozirda ijro etilayotgan blok/funktsiya/skript bilan bog'langan maxsus ichki objektning xususiyati.
- O'zgaruvchilar bilan ishlash aslida shu objektning xususiyatlari bilan ishlash.

```smart header="Leksik muhit spetsifikatsiya objekti"
"Leksik muhit" spetsifikatsiya objekti: u faqat narsalar qanday ishlashini tasvirlash uchun [til spetsifikatsiyasida](https://tc39.es/ecma262/#sec-lexical-environments) "nazariy jihatdan" mavjud. Biz bu objektni kodimizda ololmaymiz va to'g'ridan-to'g'ri boshqara olmaymiz.

JavaScript mexanizmlari ham uni optimallashtirishi, xotirani tejash uchun ishlatilmaydigan o'zgaruvchilarni tashlab yuborishi va boshqa ichki hiyla-nayranglarni bajarishi mumkin, faqat ko'rinadigan xatti-harakatlar tasvirlangandek qolishi shartida.
```

### 2-qadam. Funktsiya e'lonlari

Funktsiya ham o'zgaruvchi kabi qiymatdir.

**Farqi shundaki, Funktsiya e'loni darhol to'liq ishga tushiriladi.**

Leksik muhit yaratilganda, Funktsiya e'loni darhol ishlatishga tayyor funktsiyaga aylanadi (`let` dan farqli o'laroq, u e'longacha foydalanib bo'lmaydi).

Shuning uchun biz Funktsiya e'loni sifatida e'lon qilingan funktsiyani hatto e'londan oldin ham ishlatishimiz mumkin.

Masalan, mana funktsiya qo'shganda global Leksik muhitning dastlabki holati:

![](closure-function-declaration.svg)

Tabiiyki, bu xatti-harakat faqat Funktsiya e'lonlariga tegishli, `let say = function(name)...` kabi o'zgaruvchiga funktsiya tayinlaydigan Funktsiya ifodalariga emas.

### 3-qadam. Ichki va tashqi Leksik muhit

Funktsiya ishlaganda, chaqiruv boshida chaqiruvning mahalliy o'zgaruvchilari va parametrlarini saqlash uchun avtomatik ravishda yangi Leksik muhit yaratiladi.

Masalan, `say("John")` uchun u shunday ko'rinadi (ijro o'q bilan belgilangan qatorda):

<!--
    ```js
    let phrase = "Hello";

    function say(name) {
     alert( `${phrase}, ${name}` );
    }

    say("John"); // Hello, John
    ```-->

![](lexical-environment-simple.svg)

Funktsiya chaqiruvi davomida bizda ikkita Leksik muhit bor: ichki (funktsiya chaqiruvi uchun) va tashqi (global):

- Ichki Leksik muhit `say` ning joriy ijrosiga mos keladi. Unda bitta xususiyat bor: `name`, funktsiya argumenti. Biz `say("John")` ni chaqirdik, shuning uchun `name` ning qiymati `"John"`.
- Tashqi Leksik muhit global Leksik muhitdir. Unda `phrase` o'zgaruvchisi va funktsiyaning o'zi bor.

Ichki Leksik muhitda `tashqi` ga havola bor.

**Kod o'zgaruvchiga kirmoqchi bo'lganda -- avval ichki Leksik muhit qidiriladi, keyin tashqi, keyin undan ham tashqi va hokazo global gacha.**

Agar o'zgaruvchi hech qayerda topilmasa, bu qat'iy rejimda xato (`use strict` siz, mavjud bo'lmagan o'zgaruvchiga tayinlash eski kod bilan moslashish uchun yangi global o'zgaruvchi yaratadi).

Ushbu misolda qidiruv quyidagicha davom etadi:

- `name` o'zgaruvchisi uchun `say` ichidagi `alert` uni darhol ichki Leksik muhitda topadi.
- `phrase` ga kirmoqchi bo'lganda, mahalliy `phrase` yo'q, shuning uchun u tashqi Leksik muhitga havolani kuzatib boradi va uni u yerda topadi.

![lexical environment lookup](lexical-environment-simple-lookup.svg)

### 4-qadam. Funktsiyani qaytarish

`makeCounter` misoliga qaytalik.

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
```

Har bir `makeCounter()` chaqiruvi boshida, shu `makeCounter` ishi uchun o'zgaruvchilarni saqlash uchun yangi Leksik muhit objekti yaratiladi.

Shunday qilib bizda yuqoridagi misoldagidek ikkita ichma-ich Leksik muhit bor:

![](closure-makecounter.svg)

Farq shundaki, `makeCounter()` ijrosi davomida faqat bir qatorli kichik ichma-ich funktsiya yaratiladi: `return count++`. Biz uni hali ishga tushirmaymiz, faqat yaratamiz.

Barcha funktsiyalar ular yaratilgan Leksik muhitni eslab qoladi. Texnik jihatdan, bu yerda sehr yo'q: barcha funktsiyalar `[[Environment]]` nomli yashirin xususiyatga ega bo'lib, u funktsiya yaratilgan Leksik muhitga havolani saqlaydi:

![](closure-makecounter-environment.svg)

Shunday qilib, `counter.[[Environment]]` `{count: 0}` Leksik muhitga havolaga ega. Funktsiya qayerda chaqirilishidan qat'i nazar, u qayerda yaratilganini shunday eslab qoladi. `[[Environment]]` havolasi funktsiya yaratilish vaqtida bir marta va abadiy o'rnatiladi.

Keyinroq `counter()` chaqirilganda, chaqiruv uchun yangi Leksik muhit yaratiladi va uning tashqi Leksik muhit havolasi `counter.[[Environment]]` dan olinadi:

![](closure-makecounter-nested-call.svg)

Endi `counter()` ichidagi kod `count` o'zgaruvchisini qidirganda, u avval o'zining Leksik muhitini qidiradi (bo'sh, chunki u yerda mahalliy o'zgaruvchilar yo'q), keyin tashqi `makeCounter()` chaqiruvining Leksik muhitini, u yerda uni topadi va o'zgartiradi.

**O'zgaruvchi yashaydigan Leksik muhitda yangilanadi.**

Mana ijrodan keyingi holat:

![](closure-makecounter-nested-call-2.svg)

Agar `counter()` ni bir necha marta chaqirsak, `count` o'zgaruvchisi bir xil joyda `2`, `3` va hokazoga oshiriladi.

```smart header="Yopilish (Closure)"
"Yopilish" umumiy dasturlash atamasi bor, dasturchilar uni odatda bilishi kerak.

[Yopilish](https://en.wikipedia.org/wiki/Closure_(computer_programming)) - bu o'zining tashqi o'zgaruvchilarini eslaydigan va ularga kira oladigan funktsiya. Ba'zi tillarda bu mumkin emas yoki funktsiyani buning amalga oshishi uchun maxsus usulda yozish kerak. Lekin yuqorida tushuntirilganidek, JavaScript da barcha funktsiyalar tabiiy ravishda yopilishdir (bitta istisno bor, u <info:new-function> da yoritiladi).

Ya'ni: ular yashirin `[[Environment]]` xususiyatidan foydalanib qayerda yaratilganini avtomatik ravishda eslaydi va keyin ularning kodi tashqi o'zgaruvchilarga kira oladi.

Suhbatda frontend dasturchi "yopilish nima?" degan savol olganda, to'g'ri javob yopilishning ta'rifi va JavaScript dagi barcha funktsiyalar yopilish ekanligini tushuntirish va ehtimol texnik tafsilotlar haqida yana bir necha so'z bo'ladi: `[[Environment]]` xususiyati va Leksik muhitlar qanday ishlashi.
```

## Axlat yig'ish (Garbage collection)

Odatda, Leksik muhit funktsiya chaqiruvi tugagandan so'ng barcha o'zgaruvchilar bilan birga xotiradan olib tashlanadi. Chunki unga hech qanday havola yo'q. Har qanday JavaScript objekti kabi, u faqat yetib boriladigan bo'lgancha xotirada saqlanadi.

Biroq, agar funktsiya tugagandan keyin ham yetib boriladigan ichma-ich funktsiya bo'lsa, u holda uning leksik muhitga havola qiladigan `[[Environment]]` xususiyati bor.

Bunday holda Leksik muhit funktsiya tugagandan keyin ham yetib borish mumkin, shuning uchun u tirik qoladi.

Misol uchun:

```js
function f() {
  let value = 123;

  return function() {
    alert(value);
  }
}

let g = f(); // g.[[Environment]] tegishli f() chaqiruvining
// Leksik muhitiga havolani saqlaydi
```

E'tibor bering, agar `f()` ko'p marta chaqirilsa va natijada olingan funktsiyalar saqlansa, u holda barcha tegishli Leksik muhit objektlari ham xotirada saqlanadi. Quyidagi kodda ularning 3 tasi:

```js
function f() {
  let value = Math.random();

  return function() { alert(value); };
}

// massivdagi 3 ta funktsiya, ularning har biri tegishli f() ishidan
// Leksik muhitga bog'lanadi
let arr = [f(), f(), f()];
```

Leksik muhit objekti yetib borilmaydigan bo'lganda o'ladi (boshqa objektlar kabi). Boshqacha qilib aytganda, u faqat unga havola qiladigan kamida bitta ichma-ich funktsiya mavjud bo'lgancha mavjud.

Quyidagi kodda ichma-ich funktsiya olib tashlangandan keyin, uning o'rab turgan Leksik muhiti (va shuning uchun `value`) xotiradan tozalanadi:

```js
function f() {
  let value = 123;

  return function() {
    alert(value);
  }
}

let g = f(); // g funktsiyasi mavjud ekan, qiymat xotirada qoladi

"g = null; // ...va endi xotira tozalanadi
```

### Haqiqiy hayotdagi optimallashtirish

Ko'rganimizdek, nazariy jihatdan funktsiya tirik ekan, barcha tashqi o'zgaruvchilar ham saqlanadi.

Lekin amalda JavaScript mexanizmlari buni optimallashtirmeye harakat qiladi. Ular o'zgaruvchi ishlatilishini tahlil qiladi va koddan tashqi o'zgaruvchi ishlatilmasligni aniq bo'lsa -- u olib tashlanadi.

**V8 (Chrome, Edge, Opera) da muhim yon ta'sir shundaki, bunday o'zgaruvchi debugging da mavjud bo'lmaydi.**

Quyidagi misolni Chrome da Developer Tools ochiq holda ishlatib ko'ring.

U to'xtaganda, konsolda `alert(value)` ni yozing.

```js run
function f() {
  let value = Math.random();

  function g() {
    debugger; // konsolda: alert(value) yozing; Bunday o'zgaruvchi yo'q!
  }

  return g;
}

let g = f();
g();
```

Ko'rganingizdek -- bunday o'zgaruvchi yo'q! Nazariy jihatdan, u mavjud bo'lishi kerak edi, lekin mexanizm uni optimallashtirdi.

Bu kulgili (agar unchalik vaqt talab qilmasa) debugging muammolariga olib kelishi mumkin. Ulardan biri -- biz kutilgan o'rniga bir xil nomli tashqi o'zgaruvchini ko'rishimiz mumkin:

```js run global
let value = "Ajablanarli!";

function f() {
  let value = "eng yaqin qiymat";

  function g() {
    debugger; // konsolda: alert(value) yozing; Ajablanarli!
  }

  return g;
}

let g = f();
g();
```

V8 ning bu xususiyatini bilish yaxshi. Agar siz Chrome/Edge/Opera bilan debugging qilsangiz, erta-kech bu bilan uchrashishingiz mumkin.

Bu debugger dagi xato emas, balki V8 ning maxsus xususiyati. Ehtimol, u qachondir o'zgartiriladi. Siz har doim ushbu sahifadagi misollarni ishga tushirish orqali buni tekshirishingiz mumkin.