
# Modullar, tanishtirish

<<<<<<< HEAD
Bizning dasturimiz kattalashib borishi bilan biz uni "modullar" deb nomlangan bir nechta fayllarga ajratishni xohlaymiz.
Modul odatda foydali funktsiyalar klassini yoki kutubxonasini o'z ichiga oladi.

Uzoq vaqt davomida JavaScript til darajasidagi modul sintaksisiz mavjud edi. Bu muammo emas edi, chunki dastlab skriptlar kichik va sodda edi. Shunday qilib, ehtiyoj yo'q edi.

Ammo oxir-oqibat skriptlar tobora murakkablashib bordi, shuning uchun hamjamiyat kodlarni modullarga joylashtirishning turli usullarini ixtiro qildi.

Masalan:
=======
As our application grows bigger, we want to split it into multiple files, so called "modules". A module may contain a class or a library of functions for a specific purpose.

For a long time, JavaScript existed without a language-level module syntax. That wasn't a problem, because initially scripts were small and simple, so there was no need.

But eventually scripts became more and more complex, so the community invented a variety of ways to organize code into modules, special libraries to load modules on demand.

To name some (for historical reasons):
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

<<<<<<< HEAD
- [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) -- dastlab kutubxona tomonidan amalga oshirilgan eng qadimgi modul tizimlaridan biri [request.js](http://requirejs.org/).
- [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1) -- Node.js server uchun yaratilgan modul tizimi.
- [UMD](https://github.com/umdjs/umd) -- yana bitta modul tizimi, universal sifatida tavsiya etilgan, AMD va CommonJS bilan mos keladi.

<<<<<<< HEAD
Endi bularning barchasi asta-sekin tarixning bir qismiga aylanadi, ammo biz ularni eski skriptlarda topishimiz mumkin. Til darajasidagi modul tizimi standartda 2015 yilda paydo bo'lgan va o'sha paytdan boshlab asta-sekin rivojlanib borgan va hozirda barcha yirik brauzerlar va Node.js tomonidan qo'llab quvatlanadi.
=======
Now all these slowly become a part of history, but we still can find them in old scripts.
=======
- [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) -- one of the most ancient module systems, initially implemented by the library [require.js](https://requirejs.org/).
- [CommonJS](https://wiki.commonjs.org/wiki/Modules/1.1) -- the module system created for Node.js server.
- [UMD](https://github.com/umdjs/umd) -- one more module system, suggested as a universal one, compatible with AMD and CommonJS.

Now these all slowly became a part of history, but we still can find them in old scripts.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

The language-level module system appeared in the standard in 2015, gradually evolved since then, and is now supported by all major browsers and in Node.js. So we'll study the modern JavaScript modules from now on.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Modul nima?

<<<<<<< HEAD
Modul - bu shunchaki fayl, bitta skript, shu kabi sodda.

`export` va `import` direktivalari modullar o'rtasida funksiyalarni almashtirishga imkon beradi:

- `export` Fayl tashqarisidan kirish mumkin bo'lgan kalit so'zlar o'zgaruvchanlar va funktsiyalarni belgilaydi.
- `import` funksiyalarni boshqa modullardan import qilishga imkon beradi.
=======
A module is just a file. One script is one module. As simple as that.

Modules can load each other and use special directives `export` and `import` to interchange functionality, call functions of one module from another one:

- `export` keyword labels variables and functions that should be accessible from outside the current module.
- `import` allows the import of functionality from other modules.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
Ushbu qo'llanmada biz diqqatni tilning o'ziga qaratamiz, ammo biz demo muhit sifatida brauzerdan foydalanamiz, shuning uchun brauzerda modullarning qanday ishlashini ko'rib chiqamiz.

Modullardan foydalanish uchun biz `<script type="module">` atributini quyidagicha o'rnatishimiz kerak:

[codetabs src="say" height="140" current="index.html"]

Brauzer avtomatik ravishda importni oladi va baholaydi, so'ngra skriptni bajaradi.
=======
The `import` directive loads the module by path `./sayHi.js` relative to the current file, and assigns exported function `sayHi` to the corresponding variable.

Let's run the example in-browser.

As modules support special keywords and features, we must tell the browser that a script should be treated as a module, by using the attribute `<script type="module">`.

Like this:

[codetabs src="say" height="140" current="index.html"]

The browser automatically fetches and evaluates the imported module (and its imports if needed), and then runs the script.

```warn header="Modules work only via HTTP(s), not locally"
If you try to open a web-page locally, via `file://` protocol, you'll find that `import/export` directives don't work. Use a local web-server, such as [static-server](https://www.npmjs.com/package/static-server#getting-started) or use the "live server" capability of your editor, such as VS Code [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) to test modules.
```
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Asosiy modul xususiyatlari

"Oddiy" skriptlar bilan taqqoslaganda modullar bilan qanday farq bor?

Brauzerda ham, server tomonida ham JavaScript uchun amal qiladigan asosiy xususiyatlar mavjud.

### Har doim "use strict"

<<<<<<< HEAD
Modullar doimo `use strict` dan foydalanadilar. Masalan, e'lon qilinmagan o'zgaruvchanga tayinlash xatoga yo'l qo'yadi.
=======
Modules always work in strict mode. E.g. assigning to an undeclared variable will give an error.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```html run
<script type="module">
  a = 5; // xato
</script>
```

<<<<<<< HEAD
Bu yerda biz uni brauzerda ko'rishimiz mumkin, ammo har qanday modul uchun ham xuddi shunday ishlaydi.

### Maxsus o'zgaruvchan ko'lam
=======
### Module-level scope
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Har bir modul o'zining yuqori darajadagi doirasiga ega. Boshqacha aytganda, moduldan yuqori darajadagi o'zgaruvchanlar va funktsiyalar boshqa skriptlarda ko'rinmaydi.

<<<<<<< HEAD
Quyidagi misolda ikkita skript import qilingan va `hello.js` `user.js` da e'lon qilingan `user` o'zgaruvchanidan foydalanishga harakat qiladi va bajarilmaydi:

[codetabs src="scopes" height="140" current="index.html"]

Modullar tashqaridan kirishni xohlagan narsalarini `export` qilishlari va kerakli narsalarini `import` qilishlari kutilmoqda.

Shuning uchun biz `user.js` ni `index.html` o'rniga to'g'ridan-to'g'ri `hello.js` ga import qilishimiz kerak.

Bu to'g'ri variant:

[codetabs src="scopes-working" height="140" current="hello.js"]

Brauzerda har bir `<script type="module">` uchun mustaqil yuqori darajadagi ko'lam mavjud:
=======
In the example below, two scripts are imported, and `hello.js` tries to use `user` variable declared in `user.js`. It fails, because it's a separate module (you'll see the error in the console):

[codetabs src="scopes" height="140" current="index.html"]

Modules should `export` what they want to be accessible from outside and `import` what they need.

- `user.js` should export the `user` variable.
- `hello.js` should import it from `user.js` module.

In other words, with modules we use import/export instead of relying on global variables.

This is the correct variant:

[codetabs src="scopes-working" height="140" current="hello.js"]

In the browser, if we talk about HTML pages, independent top-level scope also exists for each `<script type="module">`.

Here are two scripts on the same page, both `type="module"`. They don't see each other's top-level variables:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
Agar biz chindan ham "global" brauzer ichida o'zgaruvchanni yaratishimiz kerak bo'lsa, uni `window` ga aniq belgilashimiz va `window.user` sifatida kirishimiz mumkin. Ammo bu yaxshi sababni talab qiladigan istisno.
=======
```smart
In the browser, we can make a variable window-level global by explicitly assigning it to a `window` property, e.g. `window.user = "John"`. 

Then all scripts will see it, both with `type="module"` and without it. 

That said, making such global variables is frowned upon. Please try to avoid them.
```
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

### Import qilinganida modul kodi faqat birinchi marta baholanadi

<<<<<<< HEAD
Agar bir xil modul boshqa bir qancha joylarga import qilingan bo'lsa, uning kodi faqat birinchi marta bajariladi, keyin eksport barcha importerlarga beriladi.

Bu muhim oqibatlarga olib keladi. Keling, buni misollarda ko'rib chiqaylik.
=======
If the same module is imported into multiple other modules, its code is executed only once, upon the first import. Then its exports are given to all further importers.

The one-time evaluation has important consequences, that we should be aware of. 

Let's see a couple of examples.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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
<<<<<<< HEAD
import `./alert.js`; // (hech narsa)
```

Amalda, yuqori darajadagi modul kodi asosan ishga tushirish uchun ishlatiladi. Biz ma'lumotlar tuzilmalarini yaratamiz, ularni oldindan to'ldiramiz va agar biror narsa qayta ishlatilishini istasak - uni eksport qilamiz.

Endi yanada rivojlangan misol.
=======
import `./alert.js`; // (shows nothing)
```

The second import shows nothing, because the module has already been evaluated.

There's a rule: top-level module code should be used for initialization, creation of module-specific internal data structures. If we need to make something callable multiple times - we should export it as a function, like we did with `sayHi` above.

Now, let's consider a deeper example.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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
<<<<<<< HEAD
// 1.js va 2.js ikkalasi ham bitta obyektni import qildilar
// 1.js-da kiritilgan o'zgarishlar 2.js-da ko'rinadi
*/!*
```

Shunday qilib, yana takrorlaymiz -- modul faqat bir marta bajariladi. Eksportlar yaratiladi, so'ngra ular importchilar o'rtasida taqsimlanadi, shuning uchun agar biror narsa `admin` obyektini o'zgartirsa, boshqa modullar buni ko'rishadi.

Bunday xatti-harakatlar konfiguratsiyani talab qiladigan modullar uchun juda yaxshi. Birinchi importda kerakli xususiyatlarni o'rnatishimiz mumkin, keyin esa keyingi importda u tayyor bo'ladi.

Masalan, `admin.js` moduli ma'lum funktsiyalarni taqdim etishi mumkin, ammo hisobga olish ma'lumotlari `admin` obyektiga tashqaridan kirishini kutadi:
=======
// Both 1.js and 2.js reference the same admin object
// Changes made in 1.js are visible in 2.js
*/!*
```

As you can see, when `1.js` changes the `name` property in the imported `admin`, then `2.js` can see the new `admin.name`.

That's exactly because the module is executed only once. Exports are generated, and then they are shared between importers, so if something changes the `admin` object, other importers will see that.

**Such behavior is actually very convenient, because it allows us to *configure* modules.**

In other words, a module can provide a generic functionality that needs a setup. E.g. authentication needs credentials. Then it can export a configuration object expecting the outer code to assign to it.

Here's the classical pattern:
1. A module exports some means of configuration, e.g. a configuration object.
2. On the first import we initialize it, write to its properties. The top-level application script may do that.
3. Further imports use the module.

For instance, the `admin.js` module may provide certain functionality (e.g. authentication), but expect the credentials to come into the `config` object from outside:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
// 📁 admin.js
export let config = { };

export function sayHi() {
<<<<<<< HEAD
  alert(`Xizmat qilishga tayyor, ${admin.name}!`);
}
```

Endi dasturimizning birinchi skripti bo'lgan `init.js` da biz `admin.name` ni o'rnatdik. Keyin hamma buni ko'radi, shu jumladan `admin.js` ning o'zi tomonidan qilingan chaqiruvlarni:
=======
  alert(`Ready to serve, ${config.user}!`);
}
```

Here, `admin.js` exports the `config` object (initially empty, but may have default properties too).

Then in `init.js`, the first script of our app, we import `config` from it and set `config.user`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
// 📁 init.js
import {config} from './admin.js';
config.user = "Pete";
```

...Now the module `admin.js` is configured. 

Further importers can call it, and it correctly shows the current user:

```js
// 📁 another.js
import {sayHi} from './admin.js';

sayHi(); // Xizmat qilishga tayyor, *!*Pete*/!*!
```


### import.meta

`import.meta` obyekti joriy modul haqidagi ma'lumotlarni o'z ichiga oladi.

<<<<<<< HEAD
Uning tarkibi atrof-muhitga bog'liq. Brauzerda u skriptning URL manzilini yoki HTML ichida mavjud veb-sahifaning URL-ini o'z ichiga oladi:

```html run height=0
<script type="module">
  alert(import.meta.url); // skript url (ichki skript uchun HTML sahifasining url)
</script>
```

### Yuqori darajadagi "this" aniqlanmagan
=======
Its content depends on the environment. In the browser, it contains the URL of the script, or a current webpage URL if inside HTML:

```html run height=0
<script type="module">
  alert(import.meta.url); // script URL
  // for an inline script - the URL of the current HTML-page
</script>
```

### In a module, "this" is undefined
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Bu kichik xususiyatning bir turi, ammo to'liqligi uchun buni eslatib o'tishimiz kerak.

<<<<<<< HEAD
Modulda yuqori darajadagi `this`, modul bo'lmagan skriptlardagi global obyektdan farqli o'laroq, u aniqlanmagan:
=======
In a module, top-level `this` is undefined.

Compare it to non-module scripts, where `this` is a global object:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
<<<<<<< HEAD
Agar siz birinchi marta o'qiyotgan bo'lsangiz yoki JavaScript-ni brauzerda ishlatmasangiz, ularni hozircha o'tkazib yuborishingiz mumkin.
=======
You may want skip this section for now if you're reading for the first time, or if you don't use JavaScript in a browser.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
You may want to skip this section for now if you're reading for the first time, or if you don't use JavaScript in a browser.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

### Modul skriptlari keyinga qoldiriladi

Modul skriptlari *har doim* keyinga qoldiriladi, tashqi va ichki satrlar uchun `defer` atributi ([](info:script-async-defer) bobda tasvirlangan) bir xil ta'sirga ega.

<<<<<<< HEAD
Boshqa so'zlar bilan aytganda:
- tashqi modul skriptlari `<script type="module" src="...">` HTML ishlov berishni bloklamang.
- modul skriptlari HTML hujjat to'liq tayyor bo'lguncha kutib turadi.
- nisbiy tartib saqlanib qoladi: hujjatda birinchi bo'lib turgan skriptlar birinchi bajariladi.

Yon effekt sifatida modul skriptlari doimo HTML ostidagi elementlarni ko'radi.
=======
In other words:
- downloading external module scripts `<script type="module" src="...">` doesn't block HTML processing, they load in parallel with other resources.
- module scripts wait until the HTML document is fully ready (even if they are tiny and load faster than HTML), and then run.
- relative order of scripts is maintained: scripts that go first in the document, execute first.

<<<<<<< HEAD
As a side-effect, module scripts always "see" the fully loaded HTML-page, including HTML elements below them.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
As a side effect, module scripts always "see" the fully loaded HTML-page, including HTML elements below them.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

Masalan:

```html run
<script type="module">
*!*
  alert(typeof button); // object: skript quyidagi tugmani "ko'rishi" mumkin
*/!*
  // modullar keyinga qoldirilishi uchun, skript butun sahifa yuklangandan so'ng ishlaydi
</script>

Compare to regular script below:

<script>
*!*
  alert(typeof button); // button is undefined, the script can't see elements below
*/!*
  // muntazam skriptlar darhol ishlaydi, sahifaning qolgan qismi qayta ishlanmasdan oldin
</script>

<button id="button">Button</button>
```

<<<<<<< HEAD
Iltimos, diqqat qiling: ikkinchi skript aslida birinchisidan oldin ishlaydi! Shunday qilib, avval `undefined` ni, keyin esa `object` ko'ramiz.

Buning sababi, modullarning keyinga qoldirilishi, shuning uchun hujjatning ishlashini kuting. Oddiy skriptlar darhol ishlaydi, shuning uchun birinchi navbatda uning chiqishini ko'rdik.

Modullardan foydalanganda HTML-hujjat JavaScript dasturi tayyor bo'lguncha paydo bo'lishi mumkinligini bilishimiz kerak. Ba'zi funktsiyalar hali ishlamasligi mumkin. Biz shaffof qoplamalar yoki "yuklash ko'rsatkichlari" ni qo'yishimiz kerak, yoki boshqa sabablarga ko'ra tashrif buyuruvchilar chalkashib ketmasligini ta'minlashimiz kerak.
=======
Please note: the second script actually runs before the first! So we'll see `undefined` first, and then `object`.

That's because modules are deferred, so we wait for the document to be processed. The regular script runs immediately, so we see its output first.

When using modules, we should be aware that the HTML page shows up as it loads, and JavaScript modules run after that, so the user may see the page before the JavaScript application is ready. Some functionality may not work yet. We should put "loading indicators", or otherwise ensure that the visitor won't be confused by that.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

### Async ichki skriptlarda ishlaydi

<<<<<<< HEAD
Async atributiga `<script async type="module">` ichki va tashqi skriptlarda ruxsat beriladi. Async skriptlari import qilingan modullarni qayta ishlashda darhol ishlaydi, boshqa skriptlardan yoki HTML-hujjatdan mustaqil ravishda.

Masalan, quyidagi skriptda `async` mavjud, shuning uchun u hech kimni kutmaydi.

U importni amalga oshiradi (`./analytics.js` olib keladi) va tayyor bo'lganda ishlaydi, hattoki HTML hujjati hali tugallanmagan bo'lsa yoki boshqa skriptlar hali kutilayotgan bo'lsa ham.
=======
For non-module scripts, the `async` attribute only works on external scripts. Async scripts run immediately when ready, independently of other scripts or the HTML document.

For module scripts, it works on inline scripts as well.

For example, the inline script below has `async`, so it doesn't wait for anything.

It performs the import (fetches `./analytics.js`) and runs when ready, even if the HTML document is not finished yet, or if other scripts are still pending.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
Tashqi modul skriptlarining ikkita sezilarli farqlari mavjud:

1. Xuddi shu `src` tashqi skriptlar faqat bir marta ishlaydi:
=======
External scripts that have `type="module"` are different in two aspects:

1. External scripts with the same `src` run only once:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    ```html
    <!-- my.js skripti faqat bir marta olinadi va bajariladi -->
    <script type="module" src="my.js"></script>
    <script type="module" src="my.js"></script>
    ```

<<<<<<< HEAD
2. Boshqa domendan olinadigan tashqi skriptlar [CORS](mdn:Web/HTTP/CORS) sarlavhalarini talab qiladi. Boshqacha qilib aytadigan bo'lsak, agar boshqa domendan modul skripti olinsa, masofaviy server   `Access-Control-Allow-Origin: *` sarlavhasini taqdim qilishi kerak (`*` o'rniga domenni olib kelishi mumkin). .
=======
2. External scripts that are fetched from another origin (e.g. another site) require [CORS](mdn:Web/HTTP/CORS) headers, as described in the chapter <info:fetch-crossorigin>. In other words, if a module script is fetched from another origin, the remote server must supply a header `Access-Control-Allow-Origin` allowing the fetch.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    ```html
    <!-- another-site.com veb-saytini etkazib berishi kerak Access-Control-Allow-Origin -->
    <!-- aks holda, skript bajarilmaydi -->
    <script type="module" src="*!*http://another-site.com/their.js*/!*"></script>
    ```

    Bu sukut bo'yicha xavfsizlikni yaxshiroq ta'minlaydi.

<<<<<<< HEAD
### "Yalang'och" modullarga ruxsat berilmaydi

Brauzerda skriptlarda (HTML-da emas) `import` nisbiy yoki mutlaq URLni olishi kerak. Yo'lsiz "yalang'och" modullarga ruxsat berilmaydi.
=======
### No "bare" modules allowed

In the browser, `import` must get either a relative or absolute URL. Modules without any path are called "bare" modules. Such modules are not allowed in `import`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Masalan, ushbu `import` yaroqsiz:
```js
<<<<<<< HEAD
import {sayHi} from 'sayHi'; // Xato, "yalang'och" modul
// './sayHi.js' bo'lishi kerak
```

Node.js yoki tug'un vositalari kabi ba'zi bir muhitlar yalang'och modullarga ruxsat beradi, chunki ularda modullarni topish usullari va ularni aniq sozlash uchun ilgaklar mavjud. Ammo brauzerlar hali yalang'och modullarni qo'llab-quvvatlamaydi.
=======
import {sayHi} from 'sayHi'; // Error, "bare" module
// the module must have a path, e.g. './sayHi.js' or wherever the module is
```

Certain environments, like Node.js or bundle tools allow bare modules, without any path, as they have their own ways for finding modules and hooks to fine-tune them. But browsers do not support bare modules yet.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

### Moslik, "nomodule"

<<<<<<< HEAD
Eski brauzerlar `type="module"` ni tushunmaydilar. Noma'lum turdagi skriptlar shunchaki e'tiborsiz qoldiriladi. Ular uchun `nomodule` atributidan foydalanib, qaytarib berishni ta'minlash mumkin:
=======
Old browsers do not understand `type="module"`. Scripts of an unknown type are just ignored. For them, it's possible to provide a fallback using the `nomodule` attribute:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```html run
<script type="module">
  alert("Zamonaviy brauzerlarda ishlaydi");
</script>

<script nomodule>
  alert("Zamonaviy brauzerlar type=module va nomodule ikkalasini ham bilishadi, shuning uchun buni o'tkazib yuboring")
  alert("Eski brauzerlar type=module noma'lum bo'lgan skriptni e'tiborsiz qoldiradi, lekin buni bajaradi.");
</script>
```

<<<<<<< HEAD
Agar biz to'plam vositalaridan foydalansak, unda modullar birlashtirilganligi sababli, ularning `import/export` so'zlari maxsus paketli chaqiruvlar bilan almashtiriladi, shuning uchun hosil bo'ladigan qurilish `type="module"` ni talab qilmaydi va biz uni odatiy skriptga keltira olamiz:

```html
<!-- Bundle.js-ni Webpack kabi vositadan olganmiz deb taxmin qilamiz-->
<script src="bundle.js"></script>
```

## O'rnatish vositalari
=======
## Build tools
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Haqiqiy hayotda brauzer modullari kamdan-kam hollarda "xom" shaklida qo'llaniladi. Odatda, biz ularni [Webpack](https://webpack.js.org/) kabi maxsus vosita bilan birlashtiramiz va ishlab chiqarish serveriga joylashtiramiz.

Paketlardan foydalanishning afzalliklaridan biri bu CSS/HTML modullari singari yalang'och modullarga va boshqalarga imkon beradigan modullarning yechimi ustidan ko'proq nazorat qilishdir.

Qurilish vositalari quyidagilarni bajaradi:

<<<<<<< HEAD
1. HTML-da `<script type="module">` ga joylashtirilishi kerak bo'lgan "asosiy" modulni oladi.
2. Uning bog'liqligini tahlil qiladi: import va undan keyin import importi va boshqalar.
3. Mahalliy `import` chaqiruvlarini to'plami funktsiyalari bilan almashtirib, barcha modullar (yoki sozlanishi mumkin bo'lgan bir nechta fayllar) bilan bitta fayl yaratadi. HTML/CSS modullari kabi "maxsus" modul turlari ham qo'llab-quvvatlanadi.
4. Jarayonda boshqa transformatsiyalar va optimallashtirishlar qo'llanilishi mumkin:
    - Qabul qilinmaydigan kod olib tashlandi.
    - Foydalanilmagan eksport olib tashlandi ("tree-shaking").
    - `console` va `debugger` kabi ishlab chiqishga oid so'zlar olib tashlandi.
    - Zamonaviy, qon ketishining cheklangan JavaScript-ni sintaksisini [Babel](https://babeljs.io/) yordamida o'xshash funktsional imkoniyatga ega bo'lgan eskisiga aylantirish mumkin.
    - Olingan fayl kichraytiriladi (bo'shliqlar olib tashlanadi, o'zgaruvchanlar qisqa nom bilan almashtiriladi va hokazo).
=======
1. Take a "main" module, the one intended to be put in `<script type="module">` in HTML.
2. Analyze its dependencies: imports and then imports of imports etc.
3. Build a single file with all modules (or multiple files, that's tunable), replacing native `import` calls with bundler functions, so that it works. "Special" module types like HTML/CSS modules are also supported.
4. In the process, other transformations and optimizations may be applied:
    - Unreachable code removed.
    - Unused exports removed ("tree-shaking").
    - Development-specific statements like `console` and `debugger` removed.
    - Modern, bleeding-edge JavaScript syntax may be transformed to older one with similar functionality using [Babel](https://babeljs.io/).
    - The resulting file is minified (spaces removed, variables replaced with shorter names, etc).

If we use bundle tools, then as scripts are bundled together into a single file (or few files), `import/export` statements inside those scripts are replaced by special bundler functions. So the resulting "bundled" script does not contain any `import/export`, it doesn't require `type="module"`, and we can put it into a regular script:

```html
<!-- Assuming we got bundle.js from a tool like Webpack -->
<script src="bundle.js"></script>
```
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Ya'ni, mahalliy modullardan ham foydalanish mumkin. Shuning uchun biz bu erda Webpack-dan foydalanmaymiz: uni keyinroq sozlashingiz mumkin.

## Xulosa

Xulosa qilib aytganda, asosiy tushunchalar:

<<<<<<< HEAD
1. Modul - bu fayl. `import/export` ishini bajarish uchun brauzerlarda `<script type="module">` bo'lishi kerak, bu bir nechta farqlarni anglatadi:
    - Sukut bo'yicha keyinga qoldirigan(deferred).
    - Async ichki skriptlarda ishlaydi.
    - Tashqi skriptlarga CORS sarlavhalari kerak.
    - Ikki nusxadagi tashqi skriptlarga e'tibor berilmaydi.
2. Modullar o'zlarining mahalliy darajadagi yuqori darajalariga va `import/export` orqali almashinuv funktsiyalariga ega.
3. Modullar har doim `use strict` dan foydalanadi.
4. Modul kodi faqat bir marta bajariladi. Eksport bir marta tuziladi va importchilar o'rtasida taqsimlanadi.

Umuman olganda, modullardan foydalanganda har bir modul funksionallikni amalga oshiradi va uni eksport qiladi. Keyin uni kerakli joyga to'g'ridan-to'g'ri import qilish uchun `import` dan foydalanamiz. Brauzer skriptlarni avtomatik ravishda yuklaydi va baholaydi.
=======
1. A module is a file. To make `import/export` work, browsers need `<script type="module">`. Modules have several differences:
    - Deferred by default.
    - Async works on inline scripts.
    - To load external scripts from another origin (domain/protocol/port), CORS headers are needed.
    - Duplicate external scripts are ignored.
2. Modules have their own, local top-level scope and interchange functionality via `import/export`.
3. Modules always `use strict`.
4. Module code is executed only once. Exports are created once and shared between importers.

When we use modules, each module implements the functionality and exports it. Then we use `import` to directly import it where it's needed. The browser loads and evaluates the scripts automatically.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Ishlab chiqarishda odamlar ko'pincha [Webpack](https://webpack.js.org) kabi to'plamlardan ishlash va boshqa sabablarga ko'ra modullarni birlashtirish uchun foydalanadilar.

Keyingi bobda biz modullarning ko'proq namunalarini va qanday qilib eksport/import qilish mumkinligini ko'rib chiqamiz.
