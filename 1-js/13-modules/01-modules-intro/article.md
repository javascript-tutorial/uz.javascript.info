
# Modullar, tanishtirish

Bizning dasturimiz kattalashib borishi bilan biz uni "modullar" deb nomlangan bir nechta fayllarga ajratishni xohlaymiz.
Modul odatda foydali funktsiyalar klassini yoki kutubxonasini o'z ichiga oladi.

Uzoq vaqt davomida JavaScript til darajasidagi modul sintaksisiz mavjud edi. Bu muammo emas edi, chunki dastlab skriptlar kichik va sodda edi. Shunday qilib, ehtiyoj yo'q edi.

Ammo oxir-oqibat skriptlar tobora murakkablashib bordi, shuning uchun hamjamiyat kodlarni modullarga joylashtirishning turli usullarini ixtiro qildi.

Masalan:

- [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) -- dastlab kutubxona tomonidan amalga oshirilgan eng qadimgi modul tizimlaridan biri [request.js](http://requirejs.org/).
- [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1) -- Node.js server uchun yaratilgan modul tizimi.
- [UMD](https://github.com/umdjs/umd) -- yana bitta modul tizimi, universal sifatida tavsiya etilgan, AMD va CommonJS bilan mos keladi.

Endi bularning barchasi asta-sekin tarixning bir qismiga aylanadi, ammo biz ularni eski skriptlarda topishimiz mumkin. Til darajasidagi modul tizimi standartda 2015 yilda paydo bo'lgan va o'sha paytdan boshlab asta-sekin rivojlanib borgan va hozirda barcha yirik brauzerlar va Node.js tomonidan qo'llab quvatlanadi.

## Modul nima?

Modul - bu shunchaki fayl, bitta skript, shu kabi sodda.

`export` va `import` direktivalari modullar o'rtasida funksiyalarni almashtirishga imkon beradi:

- `export` Fayl tashqarisidan kirish mumkin bo'lgan kalit so'zlar o'zgaruvchanlar va funktsiyalarni belgilaydi.
- `import` funksiyalarni boshqa modullardan import qilishga imkon beradi.

Masalan, funktsiyani eksport qiladigan `sayHi.js` faylimiz bo'lsa:

```js
// 📁 sayHi.js
export function sayHi(user) {
  alert(`Salom, ${user}!`);
}
```

...Keyin boshqa fayl uni import qilishi va ishlatishi mumkin:

```js
// 📁 main.js
import {sayHi} from './sayHi.js';

alert(sayHi); // funktisya...
sayHi('John'); // Salom, John!
```

Ushbu qo'llanmada biz diqqatni tilning o'ziga qaratamiz, ammo biz demo muhit sifatida brauzerdan foydalanamiz, shuning uchun brauzerda modullarning qanday ishlashini ko'rib chiqamiz.

Modullardan foydalanish uchun biz `<script type="module">` atributini quyidagicha o'rnatishimiz kerak:

[codetabs src="say" height="140" current="index.html"]

Brauzer avtomatik ravishda importni oladi va baholaydi, so'ngra skriptni bajaradi.

## Asosiy modul xususiyatlari

"Oddiy" skriptlar bilan taqqoslaganda modullar bilan qanday farq bor?

Brauzerda ham, server tomonida ham JavaScript uchun amal qiladigan asosiy xususiyatlar mavjud.

### Har doim "use strict"

Modullar doimo `use strict` dan foydalanadilar. Masalan, e'lon qilinmagan o'zgaruvchanga tayinlash xatoga yo'l qo'yadi.

```html run
<script type="module">
  a = 5; // xato
</script>
```

Bu yerda biz uni brauzerda ko'rishimiz mumkin, ammo har qanday modul uchun ham xuddi shunday ishlaydi.

### Maxsus o'zgaruvchan ko'lam

Har bir modul o'zining yuqori darajadagi doirasiga ega. Boshqacha aytganda, moduldan yuqori darajadagi o'zgaruvchanlar va funktsiyalar boshqa skriptlarda ko'rinmaydi.

Quyidagi misolda ikkita skript import qilingan va `hello.js` `user.js` da e'lon qilingan `user` o'zgaruvchanidan foydalanishga harakat qiladi va bajarilmaydi:

[codetabs src="scopes" height="140" current="index.html"]

Modullar tashqaridan kirishni xohlagan narsalarini `export` qilishlari va kerakli narsalarini `import` qilishlari kutilmoqda.

Shuning uchun biz `user.js` ni `index.html` o'rniga to'g'ridan-to'g'ri `hello.js` ga import qilishimiz kerak.

Bu to'g'ri variant:

[codetabs src="scopes-working" height="140" current="hello.js"]

Brauzerda har bir `<script type="module">` uchun mustaqil yuqori darajadagi ko'lam mavjud:

```html run
<script type="module">
  // O'zgaruvchan faqat ushbu modul skriptida ko'rinadi
  let user = "John";
</script>

<script type="module">
  *!*
  alert(user); // Error: user is not defined
  */!*
</script>
```

Agar biz chindan ham "global" brauzer ichida o'zgaruvchanni yaratishimiz kerak bo'lsa, uni `window` ga aniq belgilashimiz va `window.user` sifatida kirishimiz mumkin. Ammo bu yaxshi sababni talab qiladigan istisno.

### Import qilinganida modul kodi faqat birinchi marta baholanadi

Agar bir xil modul boshqa bir qancha joylarga import qilingan bo'lsa, uning kodi faqat birinchi marta bajariladi, keyin eksport barcha importerlarga beriladi.

Bu muhim oqibatlarga olib keladi. Keling, buni misollarda ko'rib chiqaylik.

Birinchidan, agar modul kodini bajarish xabarni ko'rsatish kabi nojo'ya ta'sirlarni keltirib chiqarsa, uni bir necha marta import qilish uni faqat bir marta bajaradi, birinchi marta:

```js
// 📁 alert.js
alert("Modul baholandi!");
```

```js
// Xuddi shu modulni turli xil fayllardan import qiling

// 📁 1.js
import `./alert.js`; // Modul baholandi!

// 📁 2.js
import `./alert.js`; // (hech narsa)
```

Amalda, yuqori darajadagi modul kodi asosan ishga tushirish uchun ishlatiladi. Biz ma'lumotlar tuzilmalarini yaratamiz, ularni oldindan to'ldiramiz va agar biror narsa qayta ishlatilishini istasak - uni eksport qilamiz.

Endi yanada rivojlangan misol.

Aytaylik, modul obyektni eksport qiladi:

```js
// 📁 admin.js
export let admin = {
  name: "John"
};
```

Agar ushbu modul bir nechta fayllardan import qilingan bo'lsa, modul faqat birinchi marta baholanadi, `admin` obyekti yaratiladi va keyinchalik barcha boshqa import qiluvchilarga beriladi.

Barcha importchilar aynan bitta `admin` obyektini oladi:

```js
// 📁 1.js
import {admin} from './admin.js';
admin.name = "Pete";

// 📁 2.js
import {admin} from './admin.js';
alert(admin.name); // Pete

*!*
// 1.js va 2.js ikkalasi ham bitta obyektni import qildilar
// 1.js-da kiritilgan o'zgarishlar 2.js-da ko'rinadi
*/!*
```

Shunday qilib, yana takrorlaymiz -- modul faqat bir marta bajariladi. Eksportlar yaratiladi, so'ngra ular importchilar o'rtasida taqsimlanadi, shuning uchun agar biror narsa `admin` obyektini o'zgartirsa, boshqa modullar buni ko'rishadi.

Bunday xatti-harakatlar konfiguratsiyani talab qiladigan modullar uchun juda yaxshi. Birinchi importda kerakli xususiyatlarni o'rnatishimiz mumkin, keyin esa keyingi importda u tayyor bo'ladi.

Masalan, `admin.js` moduli ma'lum funktsiyalarni taqdim etishi mumkin, ammo hisobga olish ma'lumotlari `admin` obyektiga tashqaridan kirishini kutadi:

```js
// 📁 admin.js
export let admin = { };

export function sayHi() {
  alert(`Xizmat qilishga tayyor, ${admin.name}!`);
}
```

Endi dasturimizning birinchi skripti bo'lgan `init.js` da biz `admin.name` ni o'rnatdik. Keyin hamma buni ko'radi, shu jumladan `admin.js` ning o'zi tomonidan qilingan chaqiruvlarni:

```js
// 📁 init.js
import {admin} from './admin.js';
admin.name = "Pete";
```

```js
// 📁 other.js
import {admin, sayHi} from './admin.js';

alert(admin.name); // *!*Pete*/!*

sayHi(); // Xizmat qilishga tayyor, *!*Pete*/!*!
```

### import.meta

`import.meta` obyekti joriy modul haqidagi ma'lumotlarni o'z ichiga oladi.

Uning tarkibi atrof-muhitga bog'liq. Brauzerda u skriptning URL manzilini yoki HTML ichida mavjud veb-sahifaning URL-ini o'z ichiga oladi:

```html run height=0
<script type="module">
  alert(import.meta.url); // skript url (ichki skript uchun HTML sahifasining url)
</script>
```

### Yuqori darajadagi "this" aniqlanmagan

Bu kichik xususiyatning bir turi, ammo to'liqligi uchun buni eslatib o'tishimiz kerak.

Modulda yuqori darajadagi `this`, modul bo'lmagan skriptlardagi global obyektdan farqli o'laroq, u aniqlanmagan:

```html run height=0
<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>
```

## Brauzerga xos xususiyatlar

Brauzerga xos bo'lgan `type="module"` skriptlarining bir nechta farqlari mavjud.

Agar siz birinchi marta o'qiyotgan bo'lsangiz yoki JavaScript-ni brauzerda ishlatmasangiz, ularni hozircha o'tkazib yuborishingiz mumkin.

### Modul skriptlari keyinga qoldiriladi

Modul skriptlari *har doim* keyinga qoldiriladi, tashqi va ichki satrlar uchun `defer` atributi ([](info:script-async-defer) bobda tasvirlangan) bir xil ta'sirga ega.

Boshqa so'zlar bilan aytganda:
- tashqi modul skriptlari `<script type="module" src="...">` HTML ishlov berishni bloklamang.
- modul skriptlari HTML hujjat to'liq tayyor bo'lguncha kutib turadi.
- nisbiy tartib saqlanib qoladi: hujjatda birinchi bo'lib turgan skriptlar birinchi bajariladi.

Yon effekt sifatida modul skriptlari doimo HTML ostidagi elementlarni ko'radi.

Masalan:

```html run
<script type="module">
*!*
  alert(typeof button); // object: skript quyidagi tugmani "ko'rishi" mumkin
*/!*
  // modullar keyinga qoldirilishi uchun, skript butun sahifa yuklangandan so'ng ishlaydi
</script>

<script>
*!*
  alert(typeof button); // Error: button is undefined, the script can't see elements below
*/!*
  // muntazam skriptlar darhol ishlaydi, sahifaning qolgan qismi qayta ishlanmasdan oldin
</script>

<button id="button">Button</button>
```

Iltimos, diqqat qiling: ikkinchi skript aslida birinchisidan oldin ishlaydi! Shunday qilib, avval `undefined` ni, keyin esa `object` ko'ramiz.

Buning sababi, modullarning keyinga qoldirilishi, shuning uchun hujjatning ishlashini kuting. Oddiy skriptlar darhol ishlaydi, shuning uchun birinchi navbatda uning chiqishini ko'rdik.

Modullardan foydalanganda HTML-hujjat JavaScript dasturi tayyor bo'lguncha paydo bo'lishi mumkinligini bilishimiz kerak. Ba'zi funktsiyalar hali ishlamasligi mumkin. Biz shaffof qoplamalar yoki "yuklash ko'rsatkichlari" ni qo'yishimiz kerak, yoki boshqa sabablarga ko'ra tashrif buyuruvchilar chalkashib ketmasligini ta'minlashimiz kerak.

### Async ichki skriptlarda ishlaydi

Async atributiga `<script async type="module">` ichki va tashqi skriptlarda ruxsat beriladi. Async skriptlari import qilingan modullarni qayta ishlashda darhol ishlaydi, boshqa skriptlardan yoki HTML-hujjatdan mustaqil ravishda.

Masalan, quyidagi skriptda `async` mavjud, shuning uchun u hech kimni kutmaydi.

U importni amalga oshiradi (`./analytics.js` olib keladi) va tayyor bo'lganda ishlaydi, hattoki HTML hujjati hali tugallanmagan bo'lsa yoki boshqa skriptlar hali kutilayotgan bo'lsa ham.

Bu hisoblagichlar, e'lonlar, hujjatlar darajasidagi tadbirlarni tinglovchilar kabi hech narsaga bog'liq bo'lmagan funksionallik uchun yaxshi.

```html
<!-- barcha bog'liqliklar olinadi (analytics.js) va skript ishlaydi -->
<!-- hujjat yoki boshqa <script> teglarini kutmaydi -->
<script *!*async*/!* type="module">
  import {counter} from './analytics.js';

  counter.count();
</script>
```

### Tashqi skriptlar

Tashqi modul skriptlarining ikkita sezilarli farqlari mavjud:

1. Xuddi shu `src` tashqi skriptlar faqat bir marta ishlaydi:
    ```html
    <!-- my.js skripti faqat bir marta olinadi va bajariladi -->
    <script type="module" src="my.js"></script>
    <script type="module" src="my.js"></script>
    ```

2. Boshqa domendan olinadigan tashqi skriptlar [CORS](mdn:Web/HTTP/CORS) sarlavhalarini talab qiladi. Boshqacha qilib aytadigan bo'lsak, agar boshqa domendan modul skripti olinsa, masofaviy server   `Access-Control-Allow-Origin: *` sarlavhasini taqdim qilishi kerak (`*` o'rniga domenni olib kelishi mumkin). .
    ```html
    <!-- another-site.com veb-saytini etkazib berishi kerak Access-Control-Allow-Origin -->
    <!-- aks holda, skript bajarilmaydi -->
    <script type="module" src="*!*http://another-site.com/their.js*/!*"></script>
    ```

    Bu sukut bo'yicha xavfsizlikni yaxshiroq ta'minlaydi.

### "Yalang'och" modullarga ruxsat berilmaydi

Brauzerda skriptlarda (HTML-da emas) `import` nisbiy yoki mutlaq URLni olishi kerak. Yo'lsiz "yalang'och" modullarga ruxsat berilmaydi.

Masalan, ushbu `import` yaroqsiz:
```js
import {sayHi} from 'sayHi'; // Xato, "yalang'och" modul
// './sayHi.js' bo'lishi kerak
```

Node.js yoki tug'un vositalari kabi ba'zi bir muhitlar yalang'och modullarga ruxsat beradi, chunki ularda modullarni topish usullari va ularni aniq sozlash uchun ilgaklar mavjud. Ammo brauzerlar hali yalang'och modullarni qo'llab-quvvatlamaydi.

### Moslik, "nomodule"

Eski brauzerlar `type="module"` ni tushunmaydilar. Noma'lum turdagi skriptlar shunchaki e'tiborsiz qoldiriladi. Ular uchun `nomodule` atributidan foydalanib, qaytarib berishni ta'minlash mumkin:

```html run
<script type="module">
  alert("Zamonaviy brauzerlarda ishlaydi");
</script>

<script nomodule>
  alert("Zamonaviy brauzerlar type=module va nomodule ikkalasini ham bilishadi, shuning uchun buni o'tkazib yuboring")
  alert("Eski brauzerlar type=module noma'lum bo'lgan skriptni e'tiborsiz qoldiradi, lekin buni bajaradi.");
</script>
```

Agar biz to'plam vositalaridan foydalansak, unda modullar birlashtirilganligi sababli, ularning `import/export` so'zlari maxsus paketli chaqiruvlar bilan almashtiriladi, shuning uchun hosil bo'ladigan qurilish `type="module"` ni talab qilmaydi va biz uni odatiy skriptga keltira olamiz:

```html
<!-- Bundle.js-ni Webpack kabi vositadan olganmiz deb taxmin qilamiz-->
<script src="bundle.js"></script>
```

## O'rnatish vositalari

Haqiqiy hayotda brauzer modullari kamdan-kam hollarda "xom" shaklida qo'llaniladi. Odatda, biz ularni [Webpack](https://webpack.js.org/) kabi maxsus vosita bilan birlashtiramiz va ishlab chiqarish serveriga joylashtiramiz.

Paketlardan foydalanishning afzalliklaridan biri bu CSS/HTML modullari singari yalang'och modullarga va boshqalarga imkon beradigan modullarning yechimi ustidan ko'proq nazorat qilishdir.

Qurilish vositalari quyidagilarni bajaradi:

1. HTML-da `<script type="module">` ga joylashtirilishi kerak bo'lgan "asosiy" modulni oladi.
2. Uning bog'liqligini tahlil qiladi: import va undan keyin import importi va boshqalar.
3. Mahalliy `import` chaqiruvlarini to'plami funktsiyalari bilan almashtirib, barcha modullar (yoki sozlanishi mumkin bo'lgan bir nechta fayllar) bilan bitta fayl yaratadi. HTML/CSS modullari kabi "maxsus" modul turlari ham qo'llab-quvvatlanadi.
4. Jarayonda boshqa transformatsiyalar va optimallashtirishlar qo'llanilishi mumkin:
    - Qabul qilinmaydigan kod olib tashlandi.
    - Foydalanilmagan eksport olib tashlandi ("tree-shaking").
    - `console` va `debugger` kabi ishlab chiqishga oid so'zlar olib tashlandi.
    - Zamonaviy, qon ketishining cheklangan JavaScript-ni sintaksisini [Babel](https://babeljs.io/) yordamida o'xshash funktsional imkoniyatga ega bo'lgan eskisiga aylantirish mumkin.
    - Olingan fayl kichraytiriladi (bo'shliqlar olib tashlanadi, o'zgaruvchanlar qisqa nom bilan almashtiriladi va hokazo).

Ya'ni, mahalliy modullardan ham foydalanish mumkin. Shuning uchun biz bu erda Webpack-dan foydalanmaymiz: uni keyinroq sozlashingiz mumkin.

## Xulosa

Xulosa qilib aytganda, asosiy tushunchalar:

1. Modul - bu fayl. `import/export` ishini bajarish uchun brauzerlarda `<script type="module">` bo'lishi kerak, bu bir nechta farqlarni anglatadi:
    - Sukut bo'yicha keyinga qoldirigan(deferred).
    - Async ichki skriptlarda ishlaydi.
    - Tashqi skriptlarga CORS sarlavhalari kerak.
    - Ikki nusxadagi tashqi skriptlarga e'tibor berilmaydi.
2. Modullar o'zlarining mahalliy darajadagi yuqori darajalariga va `import/export` orqali almashinuv funktsiyalariga ega.
3. Modullar har doim `use strict` dan foydalanadi.
4. Modul kodi faqat bir marta bajariladi. Eksport bir marta tuziladi va importchilar o'rtasida taqsimlanadi.

Umuman olganda, modullardan foydalanganda har bir modul funksionallikni amalga oshiradi va uni eksport qiladi. Keyin uni kerakli joyga to'g'ridan-to'g'ri import qilish uchun `import` dan foydalanamiz. Brauzer skriptlarni avtomatik ravishda yuklaydi va baholaydi.

Ishlab chiqarishda odamlar ko'pincha [Webpack](https://webpack.js.org) kabi to'plamlardan ishlash va boshqa sabablarga ko'ra modullarni birlashtirish uchun foydalanadilar.

Keyingi bobda biz modullarning ko'proq namunalarini va qanday qilib eksport/import qilish mumkinligini ko'rib chiqamiz.
