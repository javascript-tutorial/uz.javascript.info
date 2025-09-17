
# Eksport va Import

Eksport va import direktivalari bir nechta chaqiruv variantlariga ega.

Oldingi bobda biz oddiy foydalanishni ko'rdik, endi ko'proq misollarni ko'rib chiqaylik.

## Deklaratsiyadan oldin eksport qilish

Biz har qanday deklaratsiyani o'zgaruvchan, funktsiya yoki klass bo'lishidan oldin `export` ni qo'yib eksport qilingan deb belgilashimiz mumkin.

Masalan, bu yerda barcha eksportlar yaroqli:

```js
// massivni eksport qilish
*!*export*/!* let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// konstantani eksport qilish
*!*export*/!* const MODULES_BECAME_STANDARD_YEAR = 2015;

// klassni eksport qilish
*!*export*/!* class User {
  constructor(name) {
    this.name = name;
  }
}
```

````smart header="export class/function dan keyin nuqta-vergul yo'q"
Iltimos, `export` klass yoki funktsiyadan oldin uni [funktsiya ifodasi](info:function-expressions-arrows) ga aylantirmasligini unutmang. Hali eksport qilingan bo'lsa ham bu funktsiya deklaratsiyasi.

Ko'pgina JavaScript uslubidagi qo'llanmalar ifodalardan so'ng nuqta-vergulni tavsiya qiladi, lekin funktsiyalar va klass deklaratsiyalaridan keyin emas.

Shuning uchun `export class` va `export function` ning  oxirida nuqta-vergul bo'lmasligi kerak.

```js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
} *!* // ; oxirida yo'q */!*
```

````

## Deklaratsiyadan tashqari eksport qilish

Bundan tashqari, biz `export` ni alohida-alohida qo'yishimiz mumkin.

Bu yerda biz avval e'lon qilamiz, keyin eksport qilamiz:

```js  
// 📁 say.js
function sayHi(user) {
  alert(`Salom, ${user}!`);
}

function sayBye(user) {
  alert(`Hayir, ${user}!`);
}

*!*
export {sayHi, sayBye}; // eksport qilingan o'zgaruvchanlar ro'yxati
*/!*
```

...Yoki texnik jihatdan biz `export` funktsiyalarini ham yuqoriga qo'yishimiz mumkin.

## Import*

Odatda, `import {...}` ga nimani import qilish kerakligi ro'yxatini qo'yamiz:

```js
// 📁 main.js
*!*
import {sayHi, sayBye} from './say.js';
*/!*

sayHi('John'); // Salom, John!
sayBye('John'); // Hayir, John!
```

Ammo agar ro'yxat uzun bo'lsa, biz hamma narsani `import * as <obj>` yordamida obyekt sifatida import qilishimiz mumkin, masalan:

```js
// 📁 main.js
*!*
import * as say from './say.js';
*/!*

say.sayHi('John');
say.sayBye('John');
```

Bir qarashda "hamma narsani import qilish" juda ajoyib narsa bo'lib tuyuladi, qisqasi, nima uchun biz import qilishimiz kerak bo'lgan narsalarni aniq ro'yxatlashimiz kerak?

Xo'sh, ozgina sabablar bor.

1. Zamonaviy qurilish vositalari ([webpack](http://webpack.github.io) va boshqalar) modullarni birlashtiradilar va yuklashni tezlashtirish va foydalanilmayotgan narsalarni olib tashlash uchun ularni optimallashtirish.

    Aytaylik, biz o'z loyihamizga uchinchi tomon kutubxonasini qo'shdik `lib.js` ko'plab funktsiyalar bilan:
    ```js
    // 📁 say.js
    export function sayHi() { ... }
    export function sayBye() { ... }
    export function becomeSilent() { ... }
    ```

    Endi bizning loyihamizda ulardan faqat bittasi kerak bo'lsa:
    ```js
    // 📁 main.js
    import {sayHi} from './say.js';
    ```
    ...Keyin optimallashtiruvchi uni avtomatik ravishda aniqlaydi va to'plamdagi koddan boshqa funktsiyalarni butunlay olib tashlaydi va shu bilan tuzilishini kichiklashtiradi. Bu "tree-shaking" deyiladi.

2. Import qilinadigan narsalarning aniq ro'yxati qisqartirilgan ismlarni beradi: `lib.sayHi()` o'rniga `sayHi()`.
3. Aniq import kod tuzilishi haqida yaxshiroq ma'lumot beradi: nima ishlatiladi va qayerda. Bu kodni qo'llab-quvvatlash va qayta ishlashni osonlashtiradi.

## Import "qanday qilib"

Shuningdek, biz turli xil nomlar ostida import qilish uchun `as` dan foydalanishimiz mumkin.

Masalan, qisqacha uchun `sayHi` ni mahalliy `hi` o'zgaruvchaniga, `sayBye` uchun ham import qilaylik:

```js
// 📁 main.js
*!*
import {sayHi as hi, sayBye as bye} from './say.js';
*/!*

hi('John'); // Salom, John!
bye('John'); // Hayir, John!
```

## Eksport "qanday qilib"

Shunga o'xshash sintaksis `export` uchun mavjud.

Keling, funktsiyalarni `hi` va `bye` sifatida eksport qilaylik:

```js
// 📁 say.js
...
export {sayHi as hi, sayBye as bye};
```

Endi `hi` va `bye` - bu begonalarning rasmiy ismlari:

```js
// 📁 main.js
import * as say from './say.js';

say.hi('John'); // Salom, John!
say.bye('John'); // Hayir, John!
```

## Standart eksport

Hozirgacha biz bir nechta narsalarni qanday qilib import/eksport qilishni ko'rdik, ixtiyoriy ravishda boshqa ismlar "sifatida".

Amalda, modullar quyidagilarni o'z ichiga oladi:
- `lib.js` kabi kutubxona, funktsiyalar to'plami.
- Yoki `user.js` da `class User` singari obyekt, butun modulda faqat shu klass mavjud.

Har bir "narsa" o'z modulida joylashgan bo'lishi uchun, asosan, ikkinchi yondashuvga ustunlik beriladi.

Tabiiyki, bu juda ko'p fayllarni talab qiladi, chunki hamma narsa o'z modulini xohlaydi, ammo bu umuman muammo emas. Aslida, fayllar yaxshi nomlangan va papkalarga tuzilgan bo'lsa, kodni boshqarish osonroq bo'ladi.

"Modulda bitta narsa" ko'rinishini yaxshilash uchun modullar `standart eksport` sintaksisini taqdim etadi.

Buning uchun `export` va `import` so'zlari kerak:

1. Modulning "asosiy eksporti" oldidan `standart eksporti` qo'ying.
2. Jingalak qavslarsiz `import` ni chaqirish.

Masalan, bu yerda `user.js` `class User` ni eksport qiladi:

```js
// 📁 user.js
export *!*default*/!* class User { // faqat qo'shing "default"
  constructor(name) {
    this.name = name;
  }
}
```

Va `main.js` uni import qiladi:

```js
// 📁 main.js
import *!*User*/!* from './user.js'; // {User} emas, balki User

new User('John');
```

Jingalak qavssiz import yanada chiroyli ko'rinishga ega. Modullardan foydalanishni boshlashda keng tarqalgan xato bu jingalak qavslarni umuman unutishdir. Esda tutingki, `import` nomlangan import uchun jingalak qavslarga muhtoj va ularni asl qiymati uchun kerak emas.

| Nomlangan eksport | Standart eksport |
|--------------|----------------|
| `export class User {...}` | `export default class User {...}` |
| `import {User} from ...` | `import User from ...`|

Tabiiyki, bitta faylga bitta "standart" eksport bo'lishi mumkin.

Biz bitta modulda ham standart, ham nomlangan eksportga ega bo'lishimiz mumkin, ammo amalda odamlar odatda ularni aralashtirmaydilar. Modulda nomlangan yoki standart eksport bor.

**Shuni ta'kidlash kerakki, nomlangan eksportlar (tabiiy ravishda) nomga ega bo'lishi kerak, `standart eksport` esa noma'lum bo'lishi mumkin.**

Masalan, bularning barchasi to'liq amal qiladigan standart eksport:

```js
export default class { // klass nomi yo'q
  constructor() { ... }
}
```

export default function(user) { // funktsiya nomi yo'q
  alert(`Salom, ${user}!`);
}
```

// o'zgarmaydigan holda bitta qiymatni eksport qilish
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
```

Bu juda yaxshi, chunki `standart eksport` har bir fayl uchun bittadan, shuning uchun `import` har doim nimani import qilishni biladi.
  Buning aksincha, nomlangan import uchun nomni tashlab qo'yish xato bo'ladi:

```js
export class { // Xato! (standart bo'lmagan eksport uchun nom kerak)
  constructor() {}
}
```     

### "Standart" taxallus

"Default" so'zi sukut bo'yicha eksport qilish uchun biron bir "taxallus" dir, biz unga qandaydir murojaat qilishimiz kerak bo'lganda ishlatamiz.

Masalan, agar bizda allaqachon e'lon qilingan funktsiya mavjud bo'lsa, uni qanday qilib `standart eksport` qilish mumkin:

```js
function sayHi(user) {
  alert(`Salom, ${user}!`);
}

export {sayHi as default}; // xuddi biz funktsiyadan oldin "standart eksportni" qo'shganimiz bilan bir xil
```

Yoki, deylik `user.js` moduli bitta asosiy "standart" narsani va bir nechta nomlangan narsalarni eksport qiladi (kamdan-kam hollarda bo'ladi, lekin shunday):

```js
// 📁 user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

export function sayHi(user) {
  alert(`Salom, ${user}!`);
}
```

Standart eksportni nomi bilan birga qanday import qilish mumkin:

```js
// 📁 main.js
import {*!*default as User*/!*, sayHi} from './user.js';

new User('John');
```

Yoki `*` ni obyekt sifatida import qilishni ko'rib chiqsak, u holda `default` xususiyati asl eksport hisoblanadi:

```js
// 📁 main.js
import * as user from './user.js';

let User = user.default; // the default export
new User('John');
```

### A word against default exports

### Standart eksportdan foydalanishimiz kerakmi?

Standart eksportdan foydalanishda ehtiyot bo'lish kerak, chunki ularni saqlab qolish biroz boshqacha.

Nomlangan eksport aniq. Ular import qilgan narsalarini aniq nomlashadi, shuning uchun bizda ulardan ma'lumot bor, bu yaxshi narsa.

Shuningdek, nomlangan eksport bizni import qilish uchun to'g'ri nomdan foydalanishga majbur qiladi:

```js
import {User} from './user.js';
// import {MyUser} won't work, the name must be {User}
```

Standart eksport uchun biz o'zimiz nom yaratishimiz kerak:

```js
import MyUser from './user.js'; // import Anywhere ... bo'lishi mumkin va u ishlaydi
```

Shunday qilib, jamoa a'zolari bitta narsa uchun turli xil nomlarni ishlatishlari uchun biroz ko'proq erkinlik ishlatilishi mumkin.

Odatda, bunga yo'l qo'ymaslik va kodni izchil saqlash uchun import qilinadigan o'zgaruvchanlar fayl nomlariga mos kelishi kerak bo'lgan qoida mavjud, masalan:

```js
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
...
```

Boshqa bir yechim - hamma joyda nomlangan eksportlardan foydalanish. Faqat bitta narsa eksport qilingan bo'lsa ham, u `default` holda nom ostida eksport qilinadi.

Bu shuningdek qayta eksportni (pastga qarang) biroz osonlashtiradi.

## Qayta eksport

"Qayta eksport" sintaksisini `export ... from ...` narsalarni import qilish va ularni darhol eksport qilishga imkon beradi (ehtimol boshqa nom ostida), masalan:

```js
export {sayHi} from './say.js'; // re-export sayHi

export {default as User} from './user.js'; // re-export default
```

Buning ma'nosi nima, nima uchun bunga ehtiyoj bor? Keling, amaliy foydalanish misolini ko'rib chiqaylik.

Tasavvur qiling, biz "paket" yozmoqdamiz: ko'pgina modullarga ega papka, asosan ichki qismga kerak, ba'zi funktsiyalari tashqariga eksport qilinadi (NPM kabi vositalar paketlarni nashr etish va tarqatishga imkon beradi, ammo bu yerda bu muhim emas).

Direkrora tuzilishi shunday bo'lishi mumkin:
```
auth/
    index.js  
    user.js
    helpers.js
    tests/
        login.js
    providers/
        github.js
        facebook.js
        ...
```

Paketning ishlashini bitta kirish nuqtasi, ya'ni `auth/index.js` "asosiy fayl" orqali quyidagi tarzda ishlatishni istaymiz:

```js
import {login, logout} from 'auth/index.js'
```

G'oya shundan iboratki, bizning paketimizdan foydalanadigan begonalar, ishlab chiquvchilar uning ichki tuzilishiga aralashmasliklari kerak. Ular bizning paket papkamizdagi fayllarni qidirmasliklari kerak. Biz faqat `auth/index.js` da kerakli narsalarni eksport qilamiz va qolganlarini qiziquvchan ko'zlardan yashiramiz.

Endi, haqiqiy eksport qilingan funktsiyalar paket orasida tarqalib ketganligi sababli, biz uni `auth/index.js` da to'plashimiz va "qayta eksport" qilishimiz mumkin:

```js
// 📁 auth/index.js

// import login/logout and immediately export them
import {login, logout} from './helpers.js';
export {login, logout};

// import default as User and export it
import User from './user.js';
export {User};
...
```

"Qayta eksport" bu shunchaki qisqartirilgan belgi:

```js
// 📁 auth/index.js
// re-export login/logout 
export {login, logout} from './helpers.js';
// yoki barcha yordamchilarni qayta eksport qilish uchun foydalanishimiz mumkin:
// export * from './helpers.js';

// re-export the default export as User
export {default as User} from './user.js';
...
```

````warn header="Qayta eksport qilish juda qiyin"
Iltimos, diqqat qiling: `export User from './user.js'` ishlamaydi. Bu aslida sintaksis xatosi. Standart eksportni qayta eksport qilish uchun uni yuqoridagi misolda bo'lgani kabi `{default as ...}` deb aniq aytib o'tishimiz kerak.

Bundan tashqari, yana bir g'alati narsa bor: `export * from './user.js'` standart eksportdan tashqari faqat nomlangan eksportni qayta eksport qiladi. Yana bir bor buni aniq aytib o'tishimiz kerak.

Masalan, hamma narsani qayta eksport qilish uchun ikkita ifoda kerak bo'ladi:
```js
export * from './module.js'; // nomlangan eksportni qayta eksport qilish
export {default} from './module.js'; // standart qayta eksport qilish
```

Sukut bo'yicha faqat qayta eksport qilishda aniq ko'rsatilishi kerak: `import * as obj` yaxshi ishlaydi. Standart eksportni `obj.default` sifatida import qiladi. Shunday qilib, bu yerda import va eksport konstruktsiyalari o'rtasida bir oz assimetriya mavjud.
````

## Xulosa

`Eksportning` quyidagi turlari mavjud:

- Deklaratsiyadan oldin:
  - `export [default] class/function/variable ...`
- Mustaqil:
  - `export {x [as y], ...}`.
- Qayta eksport:
  - `export {x [as y], ...} from "mod"`
  - `export * from "mod"` (sukut bo'yicha qayta eksport qilmaydi).
  - `export {default [as y]} from "mod"` (standart qayta eksport qilish).

Import:

- Moduldan nomlangan eksport:
  - `import {x [as y], ...} from "mod"`
- Standart eksport: 
  - `import x from "mod"`
  - `import {default as x} from "mod"`
- Hammasi:
  - `import * as obj from "mod"`
- Faqat modulni olib keling/baholang, import qilmang:
  - `import "mod"`

Import/eksport ifodalarini boshqa kodning ostiga yoki undan keyin qo'yishimiz mumkin, bu muhim emas.

Shunday qilib, bu texnik jihatdan yaxshi:
```js
sayHi();

import {sayHi} from './say.js'; // fayl oxirida import qilish
```

Amalda import odatda faylning boshida bo'ladi, lekin bu faqat qulaylik uchun.

**`{...}` ichida import/eksport ifodalari ishlamayotganligini unutmang.**

Shunga o'xshash shartli import ishlamaydi:
```js
if (something) {
  import {sayHi} from "./say.js"; // Xato: import yuqori darajada bo'lishi kerak
}
```

...Ammo, albatta, biror narsani shartli ravishda import qilishimiz kerak bo'lsachi? Yoki o'z vaqtida? Shunga o'xshab, modulni iltimosiga binoan yuklang, qachon kerak bo'lsa.

Dinamik importni keyingi bobda ko'rib chiqamiz.
