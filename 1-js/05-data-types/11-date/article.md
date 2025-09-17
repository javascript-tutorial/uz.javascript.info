# Sana va vaqt

Keling, yangi o'rnatilgan obyekt bilan tanishamiz: [Date](mdn:js/Date). U sana, vaqtni saqlaydi va sana/vaqtni boshqarish usullarini taqdim etadi.

Masalan, biz uni yaratish/o'zgartirish vaqtlarini saqlash, vaqtni o'lchash yoki faqat joriy sanani ekranga chiqarish uchun ishlatishimiz mumkin.

## Yaratish

Yangi `Sana` obyektini yaratish uchun quyidagi argumentlardan biri bilan `new Date()` chaqiring:

`new Date()`
: Argumentlarsiz - joriy sana va vaqt uchun `Date` obyektini yarating:

    ```js run
    let now = new Date();
    alert( now ); // joriy sana/vaqtni ko'rsatadi
    ```

`new Date(millisekundlar)`
: 1970-yil 1-yanvaridan keyin o'tgan millisekundalar soniyasiga (sekundiga 1/1000) teng bo'lgan `Date` obyektini yarating UTC + 0.

    ```js run
    // 0 anglatadi 01.01.1970 UTC+0
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );

    // endi 24 soat qo'shing, va 02.01.1970 UTC+0 oling
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    alert( Jan02_1970 );
    ```

    1970 yil boshidan beri o'tgan millisekundalar soni *vaqt tamg'asi* deyiladi.

    Bu sananing engil raqamli tasviri. Biz har doim `new Date(vaqt tamg'asi)` yordamida vaqt tamg'asidan sana yaratishimiz va mavjud `sana` obyektini `Date.getTime()` usuli yordamida vaqt tamg'asiga aylantirishimiz mumkin (pastga qarang).

`new Date(datestring)`
: Agar bitta argument bo'lsa va u matn bo'lsa, u holda `Date.parse` algoritmi bilan tahlil qilinadi (pastga qarang).

`new Date(datestring)`
: If there is a single argument, and it's a string, then it is parsed automatically. The algorithm is the same as `Date.parse` uses, we'll cover it later.

    ```js run
    let date = new Date("2017-01-26");
    alert(date);
    // Sananing vaqt qismi GMT yarim tunda deb qabul qilinadi va
    // kod ishlaydigan vaqt zonasiga muvofiq o'rnatiladi.
    // Shunday qilib, natija bo'lishi mumkin
    // Thu Yanvar 26 2017 11:00:00 GMT+1100 (Avstraliyaning Sharqiy yozgi vaqti)
    // yoki
    // Wed Yanvar 25 2017 16:00:00 GMT-0800 (Tinch okeanining standart vaqti)
    ```

`new Date(yil, oy, sana, saot, daqiqa, soniya, millisoniya)`
: Belgilangan komponentlar bilan sanani mahalliy vaqt zonasida yarating. Faqat ikkita birinchi argument majburiydir.

    Eslatma:

    - `yil` 4 ta raqamdan iborat bo'lishi kerak: `2013` yaxshi, `98` yo'q.
    - Oylarni hisoblash `0` (yanvar) bilan boshlanadi, `11` gacha (dekabr).
    - `Sana` parametri aslida oyning kunidir, agar yo'q bo'lsa, `1` qabul qilinadi.
    - Agar `soat/daqiqa/soniya/millisoniya` bo'lmasa, ular `0` ga teng  deb qabul qilinadi.

    Masalan:

    ```js
    new Date(2011, 0, 1, 0, 0, 0, 0); // // 1 Yanvar 2011, 00:00:00
    new Date(2011, 0, 1); // bir xil, soat va boshqalar sukut bo'yicha 0 ga teng
    ```

    Minimal aniqlik 1 millisoniya (1/1000 soniya)):

    ```js run
    let date = new Date(2011, 0, 1, 2, 3, 4, 567);
    alert( date ); // 1.01.2011, 02:03:04.567
    ```

## Sana tarkibiy qismlariga kirish

`Date` obyektidan yil, oy va boshqalarga kirishning ko'plab usullari mavjud. Ammo ularni toifalarga ajratganda osongina eslab qolish mumkin.

[getFullYear()](mdn:js/Date/getFullYear)
: Yilni olish (4 ta raqam)

[getMonth()](mdn:js/Date/getMonth)
: Oyni olish, **0 dan 11 gacha**.

[getDate()](mdn:js/Date/getDate)
: Oyning kunini olish, 1 dan 31 gacha, usulning nomi biroz g'alati ko'rinadi.

[getHours()](mdn:js/Date/getHours), [getMinutes()](mdn:js/Date/getMinutes), [getSeconds()](mdn:js/Date/getSeconds), [getMilliseconds()](mdn:js/Date/getMilliseconds)
: Tegishli vaqt komponentlarini olish.

```warn header="`getYear()` emas, balki `getFullYear()`"
Ko'pgina JavaScript interpretatorlari `getYear()` nostandart usulini qo'llaydilar. Ushbu usul eskirgan. Ba'zan 2 raqamli yilni qaytaradi. Iltimos, uni hech qachon ishlatmang. Yil uchun `getFullYear()` usuli mavjud.
```

Bundan tashqari, biz haftaning bir kunini olishimiz mumkin:

[getDay()](mdn:js/Date/getDay)
: Haftaning kunini `0` dan (yakshanba) `6` gacha (shanba) olish. Birinchi kun har doim yakshanba, ba'zi mamlakatlarda bunday emas, lekin uni o'zgartirish mumkin emas.

**Yuqoridagi barcha usullar komponentlarni mahalliy vaqt zonasiga nisbatan qaytaradi.**

UTC+0 soat mintaqasi uchun qaytib keladigan kun, oy, yil va boshqalarning UTC-hamkasblari mavjud: [getUTCFullYear()](mdn:js/Date/getUTCFullYear), [getUTCMonth()](mdn:js/Date/getUTCMonth), [getUTCDay()](mdn:js/Date/getUTCDay). Faqat `"get"` dan keyin `"UTC"` ni qo'ying.

Agar sizning mahalliy vaqt mintaqangiz UTC ga nisbatan o'zgargan bo'lsa, unda quyidagi kod turli soatlarni ko'rsatadi:

```js run
// joriy sana
let date = new Date();

// joriy vaqt mintaqangizdagi soat
alert( date.getHours() );

// UTC+0 vaqt zonasidagi soat (London vaqti bilan)
alert( date.getUTCHours() );
```

Ushbu usullardan tashqari, UTC-variantiga ega bo'lmagan ikkita maxsus usul mavjud:

[getTime()](mdn:js/Date/getTime)
: Sana uchun vaqt tamg'asini qaytaradi -- 1970 yil 1 yanvardan boshlab bir necha millisoniyalarda UTC+0.

[getTimezoneOffset()](mdn:js/Date/getTimezoneOffset)
: Mahalliy vaqt zonasi va UTC o'rtasidagi farqni daqiqada qaytaradi:

    ```js run
    // agar siz UTC-1 vaqt mintaqasida bo'lsangiz, 60 qaytaradi
    // agar siz UTC+3 vaqt mintaqasida bo'lsangiz, -180 qaytaradi
    alert( new Date().getTimezoneOffset() );

    ```

## Sana komponentlarini o'rnatish

Quyidagi usullar sana/vaqt komponentlarini o'rnatishga imkon beradi:

- [`setFullYear(year, [month], [date])`](mdn:js/Date/setFullYear)
- [`setMonth(month, [date])`](mdn:js/Date/setMonth)
- [`setDate(date)`](mdn:js/Date/setDate)
- [`setHours(hour, [min], [sec], [ms])`](mdn:js/Date/setHours)
- [`setMinutes(min, [sec], [ms])`](mdn:js/Date/setMinutes)
- [`setSeconds(sec, [ms])`](mdn:js/Date/setSeconds)
- [`setMilliseconds(ms)`](mdn:js/Date/setMilliseconds)
- [`setTime(milliseconds)`](mdn:js/Date/setTime) (01.01.1970 UTC dan boshlab butun sanani millisoniyalar bilan belgilaydi)

`setTime()` dan tashqari ularning har birida UTC-variant mavjud, masalan: `setUTCHours()`.

Ko'rib turganimizdek, ba'zi usullar bir vaqtning o'zida bir nechta komponentlarni o'rnatishi mumkin, masalan `setHours`. Ta'kidlanmagan komponentlar o'zgartirilmaydi.

Masalan:

```js run
let today = new Date();

today.setHours(0);
alert(today); // hali ham bugun, lekin soat 0 ga o'zgartirildi

today.setHours(0, 0, 0, 0);
alert(today); // hali bugun, endi 00:00:00.
```

## Avtomatik tuzatish

*Avtomatik tuzatish* - bu `Date` obyektlarining juda qulay xususiyati. Biz diapazondan tashqari qiymatlarni o'rnatishimiz mumkin va u o'zini avtomatik ravishda sozlaydi.

Masalan:

```js run
let date = new Date(2013, 0, *!*32*/!*); // 32 Yanvar 2013 ?!?
alert(date); // ...1 Fevral 2013!
```

Kundan tashqari sana komponentlari avtomatik ravishda tarqatiladi.

Aytaylik, "2016 yil 28-fevral" sanasini 2 kunga oshirishimiz kerak. O'tish yilida "2 Mart" yoki "1 Mart" bo'lishi mumkin. Bu haqda o'ylashning hojati yo'q. Faqat 2 kun qo'shing. `Date` obyekti qolgan ishlarni o'zi bajaradi:

```js run
let date = new Date(2016, 1, 28);
*!*
date.setDate(date.getDate() + 2);
*/!*

alert( date ); // 1 Mart 2016
```

Ushbu xususiyat ko'pincha ma'lum vaqtdan keyin sanani olish uchun ishlatiladi. Masalan, "70 soniyadan keyin" sanasini olaylik:

```js run
let date = new Date();
date.setSeconds(date.getSeconds() + 70);

alert( date ); // to'g'ri sanani ko'rsatadi
```

Bundan tashqari, nol yoki hatto salbiy qiymatlarni o'rnatishimiz mumkin. Masalan:

```js run
let date = new Date(2016, 0, 2); // 2 Yanvar 2016

date.setDate(1); // oyning 1-kunini belgilandi
alert( date );

date.setDate(0); // minimal kun 1, shuning uchun o'tgan oyning oxirgi kuni qabul qilinadi
alert( date ); // 31 Dekabr 2015
```

## Sanani raqamga, sana farqi

`Date` obyekti raqamga aylantirilganda, u `date.getTime()` bilan bir xil vaqt tamg'asiga aylanadi:

```js run
let date = new Date();
alert(+date); // millisoniyalar soni, xuddi shunday date.getTime()
```

Muhim yon ta'sir: sanalarni olib tashlash mumkin, natijasi ularning millisoniyalar farqi.

Vaqtni o'lchash uchun ishlatilishi mumkin:

```js run
let start = new Date(); // hisoblashni boshlang

// ishni bajariladi
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // bajarildi

alert( `Tsikl ${end - start} millisoniyani oldi` );
```

## Date.now()

Agar biz faqat farqni o'lchashni xohlasak, bizga `Date` obyekti kerak emas.

Joriy vaqt tamg'asini qaytaradigan `Date.now()` maxsus usuli mavjud.

Bu semantik jihatdan `new Date().getTime()` ga teng, ammo `Date` oraliq obyektini yaratmaydi. Shunday qilib, u tezroq va axlat yig'ilishiga bosim o'tkazmaydi.

U asosan qulaylik uchun yoki ishlash vaqti muhim bo'lgan hollarda, masalan JavaScript-dagi o'yinlarda yoki boshqa ixtisoslashtirilgan dasturlarda ishlatiladi.

Shunday qilib, ehtimol bu yaxshiroqdir:

```js run
*!*
let start = Date.now(); // millisoniyalar hisoblanadi from 1 Jan 1970
*/!*

// ish bajariladi
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

*!*
let end = Date.now(); // bajarildi
*/!*

alert( `Tsikl ${end - start} millisoniyani oldi` ); // sanalarni emas, balki raqamlarni qisqartiradi
```

## Benchmarking

Agar biz CPUga chalingan funktsiyaning ishonchli ko'rsatkichini xohlasak, ehtiyot bo'lishimiz kerak.

Masalan, ikkita sana o'rtasidagi farqni hisoblaydigan ikkita funktsiyani o'lchaymiz: qaysi biri tezroq?

Such performance measurements are often called "benchmarks".

```js
// Bizda date1 va date2 bor, qaysi funktsiya ularning farqini ms ga tezroq qaytaradi?
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// yoki
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}
```

Bu ikkalasi aynan bir narsani qilishadi, lekin ulardan biri sana ms ni olish uchun aniq `date.getTime()` dan foydalanadi, ikkinchisi esa sanadan sanaga o'zgartirishga tayanadi. Ularning natijasi har doim bir xil bo'ladi.

Xo'sh, qaysi biri tezroq?

Birinchi g'oya ularni ketma-ket ko'p marta ishlatish va vaqt farqini o'lchash bo'lishi mumkin. Bizning ishimiz uchun funktsiyalar juda oddiy, shuning uchun biz buni 100000 marta bajarishimiz kerak.

Keling, o'lchov qilaylik:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

alert( 'DiffSubtract vaqti: ' + bench(diffSubtract) + 'ms' );
alert( 'DiffGetTime vaqti: ' + bench(diffGetTime) + 'ms' );
```

Voy-buy! `getTime()` dan foydalanish juda tezroq! Buning sababi shundaki, hech qanday konvertatsiya mavjud emas, interpretatorlar uchun optimallashtirish juda oson.

Yaxshi, bizda bir narsa bor. Ammo bu hali yaxshi ko'rsatkich emas.

Tasavvur qiling-a, `bench(diffSubtract)` ishlayotganda protsessor parallel ravishda nimadir qilgan va u resurslardan foydalangan. Va `bench(diffGetTime)` ishlash tugagach, ish tugadi.

Zamonaviy ko'p jarayonli OS uchun juda yaxshi stsenariy.

Natijada, birinchi etalonda ikkinchisiga qaraganda kamroq protsessor resurslari bo'ladi. Bu noto'g'ri natijalarga olib kelishi mumkin.

**Batafsil ishonchliligi uchun, barcha ko'rsatkichlar to'plami bir necha marta takrorlanishi kerak.**

Mana kod misoli:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

let time1 = 0;
let time2 = 0;

*!*
// bench(upperSlice) va bench(upperLoop) navbati bilan 10 marta ishlaydi
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
*/!*

alert( 'DiffSubtract ning umumiy vaqti:' + time1 );
alert( 'DiffGetTime ning umumiy vaqti:: ' + time2 );
```

Zamonaviy JavaScript dvigatellari rivojlangan optimallashtirishni faqat ko'p marta bajariladigan "issiq kod" ga tatbiq etishni boshlaydilar (kamdan-kam bajariladigan narsalarni optimallashtirishga hojat yo'q). Shunday qilib, yuqoridagi misolda birinchi ishga tushirish to'g'ri optimallashtirilmagan. "Isitish" uchun dastlabki ishga tushirishni qo'shish foydali bo'ladi»:

```js
// asosiy tsikldan oldin "isitish" uchun qo'shiildi
bench(diffSubtract);
bench(diffGetTime);

// va endi ishlashni sinab ko'ramiz
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
```

```warn header="Mikrobenchmarking qilishda ehtiyot bo'ling"
Zamonaviy JavaScript interpretatorlari ko'plab optimallashtirishlarni amalga oshiradi. Ular "sun'iy sinovlar" natijalarini "odatdagi foydalanish" bilan taqqoslashlari mumkin, ayniqsa, biz juda kichik bir narsaga e'tibor qaratsak. Shunday qilib, agar siz ishlashni jiddiy tushunishni istasangiz, unda JavaScript-ni qanday ishlashini o'rganing. Va keyin sizga mikrobenchmarklar umuman kerak bo'lmaydi.

V8 haqidagi maqolalar to'plamini <http://mrale.ph> sahifasida topishingiz mumkin.
```

## Date.parse matndan

[Date.parse(str)](mdn:js/Date/parse) usuli  sanani matndan o'qishi mumkin.

Satr formati quyidagicha bo'lishi kerak: `YYYY-MM-DDTHH: mm: ss.sssZ`, bu yerda:

- `YYYY-MM-DD` -- sana: yil-oy-kun.
- Ajratuvchi sifatida `"T"` belgisi ishlatiladi.
- `HH:mm:ss.sss` -- vaqt: soat, daqiqa, soniya va millisoniyalar.
- Ixtiyoriy `"Z"` qismi soat mintaqasini `+-hh:mm` formatida bildiradi. UTC+0 degan ma'noni anglatuvchi bitta `"Z"` harfi.

Shuningdek, `YYYY-MM-DD` yoki `YYYY-MM` yoki hatto `YYYY` kabi qisqaroq variantlar ham mavjud.

`Date.parse(str)` ni chaqiruvi matnni berilgan formatda ajrata oladi va vaqt tamg'asini qaytaradi (1970 yil 1 yanvardan boshlab UTC+0 millisoniyalar soni). Agar format yaroqsiz bo'lsa, `NaN` ni qaytaradi.

Masalan:

```js run
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // 1327611110417  (vaqt tamg'asi)
```

Vaqt belgisidan darhol yangi `Date` obyektini yaratishimiz mumkin:

```js run
let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

alert(date);  
```

## Xulosa

- JavaScript-dagi sana va vaqt [Sana](mdn:js/Date) obyekti bilan ifodalanadi. Biz "faqat sana" yoki "faqat vaqt" ni yarata olmaymiz: `Date` obyektlari har doim ikkalasini ham o'z ichiga oladi.
- Oylar noldan hisoblanadi (ha, yanvar - nolinchi oy).
- Haftaning kunlari `getDay()` da noldan hisoblanadi (0 bu yakshanba).
- `Date` doiradan tashqaridagi komponentlar o'rnatilganda o'zini avtomatik ravishda tuzatadi. Kunlarni/oylarni/soatlarni qo'shish/olib tashlash uchun yaxshi.
- Sanalarni qisqartirish mumkin, ularning farqlari millisoniyada. Buning sababi, `Sana` raqamga o'tkazilganda vaqt tamg'asiga aylanadi.
- Joriy vaqt tamg'asini tezda olish uchun `Date.now()` dan foydalaning.

E'tibor bering, boshqa ko'plab tizimlardan farqli o'laroq, JavaScript-dagi vaqt tamg'alari bir necha soniyada emas, millisoniyada.

Bundan tashqari, ba'zida biz aniqroq vaqt o'lchovlariga muhtojmiz. JavaScript-ning o'zida vaqtni mikrosoniyalarda (soniyaning 1 milliondan biri) o'lchash usuli yo'q, lekin ko'pchilik muhitlar uni ta'minlaydi. Masalan, brauzerda [performance.now()](mdn:api/Performance/now) bor, bu sahifani mikrosaniyadagi aniqlik bilan yuklash boshidan millisoniyalar sonini beradi (nuqtadan keyin 3 ta raqam):

```js run
alert(`Loading started ${performance.now()}ms ago`);
// Shunga o'xshash narsa: "Yuklash 34731.26000000001ms oldin boshlangan"
// .26 mikrosaniyadir (260 mikrosaniya)
// kasrdan 3 raqamdan keyin ko'pincha aniqlikdagi xatolar, ammo faqat dastlabki 3 ta si to'g'ri
```

Node.js-da `microtime` moduli va boshqa usullar mavjud. Texnik jihatdan har qanday qurilma va muhit yanada aniqroq ishlashga imkon beradi, bu faqat `Date` da emas.
