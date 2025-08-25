# Rejalashtirish: setTimeout va setInterval

Biz funktsiyani hozir emas, balki ma'lum bir vaqtdan keyin bajarishga qaror qilishimiz mumkin. Bu "chaqiruvni rejalashtirish" deb nomlanadi.

Buning ikkita usuli mavjud:

- `setTimeout` vaqt oralig'idan keyin bir marta funktsiyani bajarishga imkon beradi.
- `setInterval` funktsiyalarni muntazam ravishda ishlash oralig'ida ishlashga imkon beradi.

Ushbu usullar JavaScript spetsifikatsiyasining bir qismi emas. Ammo aksariyat muhitlar ichki rejalashtiruvchiga ega va ushbu usullarni taqdim etadi. Xususan, ular barcha brauzerlarda va Node.js qo'llab-quvvatlanadi.

## setTimeout

Sintaksis:

```js
let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)
```

Parametrlar:

`func|code`
: Funksiya yoki bajariladigan kod matni.
Odatda, bu funktsiya. Tarixiy sabablarga ko'ra kod matnni o'tkazish mumkin, ammo bu tavsiya etilmaydi.

`delay`
: Ishlashdan oldin kechikish, millisekundlarda (1000 ms = 1 soniya), sukut bo'yicha 0.

`arg1`, `arg2`...
: Funktsiya uchun argumentlar (IE9- da qo'llab-quvvatlanmaydi)

Masalan, ushbu kod bir soniyadan so'ng `sayHi()` ni chaqiradi:

```js run
function sayHi() {
  alert('Salom');
}

*!*
setTimeout(sayHi, 1000);
*/!*
```

Argumentlar bilan:

```js run
function sayHi(phrase, who) {
  alert( phrase + ', ' + who );
}

*!*
setTimeout(sayHi, 1000, "Salom", "John"); // Salom, John
*/!*
```

Agar birinchi argument matn bo'lsa, unda JavaScript undan funktsiya yaratadi.

Shunday qilib, bu ham ishlaydi:

```js run no-beautify
setTimeout("alert('Salom')", 1000);
```

Ammo matnlardan foydalanish tavsiya etilmaydi, ularning o'rniga funktsiyalardan foydalaning, masalan:

```js run no-beautify
setTimeout(() => alert('Salom'), 1000);
```

````smart header="Funktsiyani o'tkazing, lekin uni ishlatmang"
Ajam dasturchilar ba'zida funktsiyadan keyin `()` qavslarini qo'shib xato qilishadi:

```js
// noto'g'ri!
setTimeout(sayHi(), 1000);
```
Bu ishlamaydi, chunki `setTimeout` funktsiyaga havolani kutadi. Va bu yerda `sayHi()` funktsiyasi ishlaydi va *bajarilish natijasi* `setTimeout` ga uzatiladi. Bizning holatimizda `sayHi()` natijasi `undefined` (funktsiya hech narsa bermaydi), shuning uchun hech narsa rejalashtirilmagan.
````

### clearTimeout yordamida bekor qilish

`setTimeout` ga chaqiruv bajarishni bekor qilish uchun ishlatadigan "taymer identifikatori" `timerId` ni qaytaradi.

Bekor qilish uchun sintaksis:

```js
let timerId = setTimeout(...);
clearTimeout(timerId);
```

Quyidagi kodda biz funktsiyani rejalashtiramiz va keyin uni bekor qilamiz (fikrimizni o'zgartirdik). Natijada, hech narsa bo'lmaydi:

```js run no-beautify
let timerId = setTimeout(() => alert("never happens"), 1000);
alert(timerId); // taymer identifikatori

clearTimeout(timerId);
alert(timerId); // bir xil identifikator (bekor qilinganidan keyin null bo'lmaydi)
```

`alert` natijasidan ko'rinib turibdiki, brauzerda taymer identifikatori raqam hisoblanadi. Boshqa muhitda bu boshqa narsa bo'lishi mumkin. Masalan, Node.js taymer moslamasini qo'shimcha usullar bilan qaytaradi.

Shunga qaramay, ushbu usullar uchun universal spetsifikatsiya mavjud emas, shuning uchun hammasi yaxshi.

Brauzerlar uchun taymerlar HTML5 standartidagi [taymerlar bo'limida](https://www.w3.org/TR/html5/webappapis.html#timers) tasvirlangan.

## setInterval

`setInterval` usuli `setTimeout` bilan bir xil sintaksisga ega:

```js
let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)
```

Barcha argumentlar bir xil ma'noga ega. `setTimeout` dan farqli o'laroq, u funktsiyani faqat bir marta emas, balki berilgan vaqt oralig'idan keyin muntazam ravishda ishlaydi.

Boshqa chaqiruvlarni to'xtatish uchun biz `clearInterval(timerId)` ni chaqirishimiz kerak.

Quyidagi misol xabarni har 2 soniyada ko'rsatadi. 5 soniyadan so'ng chiqish to'xtatiladi:

```js run
// 2 soniya oralig'ida takrorlang
let timerId = setInterval(() => alert('tick'), 2000);

// 5 soniyadan keyin to'xtaydi
setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);
```

```smart header="Chrome/Opera/Safari-da modal oynalar vaqtni muzlatib qo'yadi"
IE va Firefox brauzerlarida ichki taymer `alert/confirm/prompt` ko'rsatishda "yurishni" ni davom ettiradi, ammo Chrome, Opera va Safari-da ichki taymer "muzlatilgan" bo'ladi.

Shunday qilib, agar siz yuqoridagi kodni ishlatsangiz va `alert` oynasini bir muncha vaqt o'chirmasangiz, unda Firefox/IE-da keyingi `alert` darhol bajariladi (oldingi chaqiruvdan 2 soniya so'ng) va Chrome/Opera/Safari -- yana 2 soniyadan so'ng (taymer `alert` vaqtida to'xtaydi).
```

## Rekursiv setTimeout

Biror narsani muntazam ravishda bajarishning ikkita usuli mavjud.

Ulardan biri `setInterval`. Ikkinchisi quyidagicha rekursiv `setTimeout`:

```js
/** ning o'rniga:
let timerId = setInterval(() => alert('tick'), 2000);
*/

let timerId = setTimeout(function tick() {
  alert('tick');
*!*
  timerId = setTimeout(tick, 2000); // (*)
*/!*
}, 2000);
```

Yuqoridagi `setTimeout` navbatdagi chaqiruvni joriy chaqiruv oxirida `(*)` rejalashtiradi.

Rekursiv `setTimeout` - `setInterval` ga qaraganda ancha moslashuvchan usul. Shu tarzda, keyingi chaqiruv joriy chaqiruv natijalariga qarab boshqacha tarzda rejalashtirilishi mumkin.

Masalan, biz serverga har 5 soniyada ma'lumot so'rab so'rov yuboradigan xizmatni yozishimiz kerak, ammo server haddan tashqari yuklangan bo'lsa, u intervalni 10, 20, 40 soniyagacha oshirishi kerak ...

Mana, psevdokod:
```js
let delay = 5000;

let timerId = setTimeout(function request() {
  ...so'rov yuboring...

  if (server haddan tashqari yuklanganligi sababli so'rov bajarilmadi) {
    // keyingi ishga tushirish oralig'ini oshiring
    delay *= 2;
  }

  timerId = setTimeout(request, delay);

}, delay);
```


Agar bizda doimiy ravishda protsessorga chalingan vazifalar bo'lsa, unda biz bajarilish vaqtini o'lchay olamiz va ertami-kechmi navbatdagi chaqiruvni rejalashtiramiz.

**Rekursiv `setTimeout` qatllar orasidagi kechikishni kafolatlaydi, `setInterval` esa bunday qilmaydi.**

Keling, ikkita kod qismini taqqoslaylik. Birinchisi `setInterval` dan foydalanadi:

```js
let i = 1;
setInterval(function() {
  func(i++);
}, 100);
```

Ikkinchisi rekursiv `setTimeout` dan foydalanadi:

```js
let i = 1;
setTimeout(function run() {
  func(i++);
  setTimeout(run, 100);
}, 100);
```

`setInterval` uchun ichki rejalashtiruvchi har 100 msda `func(i)` ishlatadi:

![](setinterval-interval.svg)

Siz sezdingizmi?

**`setInterval` uchun `func` chaqiruvlari orasidagi haqiqiy kechikish koddan kamroq!**

Bu odatiy holdir, chunki `func` bajarilishi vaqti oraliqning bir qismini "sarflaydi".

Ehtimol, `func` ning bajarilishi biz kutganimizdan uzoqroq bo'lishi va 100ms dan oshishi mumkin.

Bunday holda, interpretator `func` tugashini kutadi, so'ngra rejalashtiruvchini tekshiradi va agar vaqt tugagan bo'lsa, uni *darhol* qayta ishlatadi.

Chekka holatda, agar funktsiya har doim `kechikish` ms dan ko'proq vaqtni bajaradigan bo'lsa, u holda chaqiruvlar umuman pauza qilinmasdan amalga oshiriladi.

Va bu yerda `setTimeout` rekursivi uchun rasm:

![](settimeout-interval.svg)

**Rekursiv `setTimeout` belgilangan kechikishni kafolatlaydi (bu yerda 100ms).**

Buning sababi, avvalgi chaqiruv oxirida yangi chaqiruv rejalashtirilgan.

````smart header="Axlat yig'ish"
Funktsiya `setInterval/setTimeout` ga o'tkazilganda, unga ichki havolalar yaratiladi va rejalashtiruvchida saqlanadi. Bu funktsiyani axlat yig'ishdan saqlaydi, hatto unga boshqa havolalar bo'lmasa ham.

```js
// rejalashtiruvchi chaqirguncha funktsiya xotirada qoladi
setTimeout(function() {...}, 100);
```

`setInterval` uchun funktsiya `clearInterval` chaqirilguncha xotirada qoladi.

Yon ta'siri bor. Funktsiya tashqi leksik muhitga murojaat qiladi, shuning uchun u yashab turib, tashqi o'zgaruvchanlar ham yashaydi. Ular funktsiyadan ko'ra ko'proq xotirani olishlari mumkin. Shunday qilib, biz endi rejalashtirilgan funktsiyaga muhtoj bo'lmaganda, juda kichik bo'lsa ham, uni bekor qilish yaxshiroqdir.
````

## Zero delay setTimeout

Maxsus foydalanish holati mavjud: `setTimeout(func, 0)` yoki shunchaki `setTimeout(func)`.

Bu `func` ning bajarilishini eng qisqa vaqt ichida rejalashtiradi. Ammo rejalashtiruvchi uni joriy kod tugagandan keyingina chaqiradi.

Shunday qilib, funktsiya joriy kodi "darhol" ishlashni rejalashtirmoqda. Boshqacha qilib aytganda, *asenkron ravishda*.

Masalan, "Salom", keyin darhol "Dunyo" chiqadi:

```js run
setTimeout(() => alert("Dunyo"));

alert("Salom");
```

Birinchi satr "chaqiruvni 0ms dan keyin kalendarga kiritadi". Ammo rejalashtiruvchi joriy kod tugagandan keyingina "kalendari tekshiradi", shuning uchun birinchi bo'lib `"Salom"`, keyin esa `"Dunyo"` bo'ladi.

### CPU vazifalarni ajratish

`setTimeout` dan foydalanib, CPU och vazifalarni ajratish uchun hiyla-nayrang bor.

Masalan, sintaksisni ta'kidlaydigan skript (ushbu sahifadagi kod misollarini ranglash uchun ishlatiladi) juda og'ir protsessorga ega. Kodni ajratib ko'rsatish uchun u tahlilni amalga oshiradi, ko'plab rangli elementlarni yaratadi, ularni hujjatga qo'shadi -- ko'p narsalarni talab qiladigan katta matn uchun. Hatto brauzer "osilib qolishi" mumkin, bu esa juda yomon.

Shunday qilib, biz uzun matnni qismlarga ajratishimiz mumkin. Dastlab 100 satr, so'ngra `setTimeout(..., 0)` va boshqalarni ishlatib yana 100 satrni rejalashtiring.

Aniqlik uchun ko'rib chiqish uchun oddiyroq misol keltiramiz. Bizda `1` dan `1000000000` gacha hisoblash funktsiyasi mavjud.

Agar siz uni ishlatsangiz, CPU osilib qoladi. Server tomonidagi JS uchun bu aniq seziladi va agar siz uni brauzerda ishlatayotgan bo'lsangiz, sahifadagi boshqa tugmachalarni bosishga harakat qilsangiz - aslida JavaScript to'xtatib qo'yganligini ko'rasiz, u tugamaguncha boshqa harakatlar ishlamaydi.

```js run
let i = 0;

let start = Date.now();

function count() {

  // og'ir ish qilish
  for (let j = 0; j < 1e9; j++) {
    i++;
  }

  alert("Done in " + (Date.now() - start) + 'ms');
}

count();
```

Brauzerda hatto "skript juda uzoq davom etadi" degan ogohlantirish ko'rsatilishi mumkin (lekin umid qilamanki bunday bo'lmaydi, chunki ularning soni unchalik katta emas).

Ichki o'rnatilgan `setTimeout` yordamida ishni ikkiga bo'laylik:

```js run
let i = 0;

let start = Date.now();

function count() {

  // og'ir ishning bir qismini bajaring (*)
  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert("Done in " + (Date.now() - start) + 'ms');
  } else {
    setTimeout(count); // yangi chaqiruvni rejalashtirish (**)
  }

}

count();
```

Endi brauzer interfeysi "hisoblash" jarayonida to'liq ishlaydi.

Biz ishning bir qismini bajaramiz `(*)`:

1. Birinchi bajarilish: `i=1...1000000`.
2. Ikkinchi bajarilish: `i=1000001..2000000`.
3. ...va shnday, `while`, `i` ning `1000000` ga teng bo'linishini tekshiradi.

Keyinchalik, agar biz hali tugamagan bo'lsak, keyingi chaqiruv `(**)` da rejalashtirilgan.

`count` ijrolari orasidagi pauzalar JavaScript-ni interpretatoriga boshqa biron bir narsani qilishi va boshqa foydalanuvchi harakatlariga munosabat bildirishi uchun yetarli darajada "nafas" beradi.

Diqqatga sazovor tomoni shundaki, ikkala variant ham ishni `setTimeout` ga ajratish bilan va bo'lmasdan -- tezligi bilan taqqoslanadi. Umumiy hisoblash vaqtida katta farq yo'q.

Ularni yaqinlashtirish uchun keling, o'zgarish kiritamiz.

Biz rejalashtirishni `count()` boshiga o'tkazamiz:

```js run
let i = 0;

let start = Date.now();

function count() {

  // rejalashtirishni boshiga siljiting
  if (i < 1e9 - 1e6) {
    setTimeout(count); // yangi chaqiruvni rejalashtirish
  }

  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert("Done in " + (Date.now() - start) + 'ms');
  }

}

count();
```

Endi biz `count()` ni boshlaganimizda va yana `count()` kerakligini bilsak, ishni darhol bajarishdan oldin rejalashtiramiz.

Agar siz uni ishlatsangiz, unda sezilarli darajada kam vaqt talab etilishini sezasiz.

````smart header="Brauzer ichidagi ichki taymerlarning minimal kechikishi"
Brauzerda ichki o'rnatilgan taymerlarning ishlash tezligi cheklangan. [HTML5 standarti](https://www.w3.org/TR/html5/webappapis.html#timers): "beshta ichki taymerdan so'ng, interval kamida to'rt millisoniyaga teng bo'lishga majbur bo'ladi."

Keling, bu nimani anglatishini quyidagi misol bilan namoyish etamiz. Undagi `setTimeout` chaqiruvi `0ms` dan keyin o'zini qayta rejalashtiradi. Har bir chaqiruv oldingi vaqtdan haqiqiy vaqtni `times` satrida eslab qoladi. Haqiqiy kechikishlar qanday ko'rinishga ega? Ko'raylikchi:

```js run
let start = Date.now();
let times = [];

setTimeout(function run() {
  times.push(Date.now() - start); // oldingi chaqiruvdan kechikishni eslash

  if (start + 100 < Date.now()) alert(times); // 100ms dan keyin kechikishlarni ko'rsating
  else setTimeout(run); // else re-schedule
});

// chiqish namunasi:
// 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100
```

Birinchi taymerlar darhol ishlaydi (xuddi shu xususiyatda yozilganidek), keyin kechikish paydo bo'ladi va biz `9, 15, 20, 24...` ko'ramiz.

Ushbu cheklov qadimgi davrlardan kelib chiqqan va ko'plab skriptlar unga tayanadi, shuning uchun u tarixiy sabablarga ko'ra mavjud.

Server tomonidagi JavaScript-da bu cheklov mavjud emas va zudlik bilan mos kelmaydigan ishni rejalashtirishning boshqa usullari mavjud, masalan [process.nextTick](https://nodejs.org/api/process.html) va [setImmediate]( https://nodejs.org/api/timers.html) Node.js uchun. Shunday qilib, tushuncha faqat brauzerga xosdir.
````

### Brauzerga ko'rsatishga ruxsat berish

Brauzer ichidagi skriptlarning yana bir foydasi shundaki, ular foydalanuvchi uchun rivojlanish satrini yoki biror narsani ko'rsatishi mumkin. Buning sababi shundaki, brauzer odatda skript tugagandan so'ng barcha "bo'yash" ishlarini bajaradi.

Shunday qilib, agar biz bitta katta funktsiyani bajaradigan bo'lsak, u biror narsani o'zgartirgan bo'lsa ham, o'zgarishlar tugamaguncha hujjatda aks etmaydi.

Mana demo:
```html run
<div id="progress"></div>

<script>
  let i = 0;

  function count() {
    for (let j = 0; j < 1e6; j++) {
      i++;
      // joriy i ni <div> ga qo'ying
      // (biz bu yerda aniq bo'lishi kerak, ichki HTML haqida ko'proq maxsus bobda  gaplashamiz)
      progress.innerHTML = i;
    }
  }

  count();
</script>
```

Agar siz uni ishlatsangiz, `i` ga o'zgartirishlar butun hisoblash tugagandan so'ng paydo bo'ladi.

Agar biz uni qismlarga ajratish uchun `setTimeout` dan foydalansak, unda o'zgarishlar oralig'ida qo'llaniladi, shuning uchun bu yaxshiroq ko'rinadi:

```html run
<div id="progress"></div>

<script>
  let i = 0;

  function count() {

    // og'ir ishning bir qismini bajaring (*)
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e9) {
      setTimeout(count);
    }

  }

  count();
</script>
```

Endi `<div>` `i` ning ortib borayotgan qiymatlarini ko'rsatadi.

## Xulosa

- `setInterval(func, delay, ... args)` va `setTimeout(func, delay, ... args)` usullari `func` kechikish milisoniyalardan keyin muntazam/bir marta bajarishga imkon beradi.
- Amalga oshirishni bekor qilish uchun `setInterval/setTimeout` tomonidan qaytarilgan qiymat bilan `clearInterval/clearTimeout` ni chaqirishimiz kerak.
- Ichki `setTimeout` chaqiruvlari - `setInterval` ga moslashuvchan alternativa. Shuningdek, ular qatl etish *oralig'idagi* minimal vaqtni kafolatlashlari mumkin.
- `setTimeout(..., 0)` nol-timeout rejalashtirish chaqiruvni "iloji boricha tezroq, lekin joriy kod tugagandan so'ng" rejalashtirish uchun ishlatiladi.

Ba'zilar `setTimeout(..., 0)` holatlaridan foydalanadilar:
- Skript "osilib qolmasligi" uchun protsessorga och vazifalarni qismlarga bo'lish.
- Jarayon davom etayotganida brauzerga boshqa narsani qilishga ruxsat berish (bajarilish satrini bo'yash).

Iltimos, barcha rejalashtirish usullari aniq kechiktirishga *kafolat bermasligini* unutmang. Biz rejalashtirilgan kodda bunga ishonmasligimiz kerak.

Masalan, brauzer ichidagi taymer juda ko'p sabablarga ko'ra sekinlashishi mumkin:
- CPU haddan tashqari yuklangan.
- Brauzer yorlig'i fon rejimida.
- Noutbuk batareyada.

Brauzer va sozlamalarga qarab, taymerning minimal taymer o'lchamlarini (minimal kechikish) 300 yoki hatto 1000 soniyaga oshirishi mumkin.
