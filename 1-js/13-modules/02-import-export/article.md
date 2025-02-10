<<<<<<< HEAD

# Eksport va Import

Eksport va import direktivalari bir nechta chaqiruv variantlariga ega.

Oldingi bobda biz oddiy foydalanishni ko'rdik, endi ko'proq misollarni ko'rib chiqaylik.
=======
# Export and Import

Export and import directives have several syntax variants.

In the previous article we saw a simple use, now let's explore more examples.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
````smart header="export class/function dan keyin nuqta-vergul yo'q"
Iltimos, `export` klass yoki funktsiyadan oldin uni [funktsiya ifodasi](info:function-expressions-arrows) ga aylantirmasligini unutmang. Hali eksport qilingan bo'lsa ham bu funktsiya deklaratsiyasi.

Ko'pgina JavaScript uslubidagi qo'llanmalar ifodalardan so'ng nuqta-vergulni tavsiya qiladi, lekin funktsiyalar va klass deklaratsiyalaridan keyin emas.

Shuning uchun `export class` va `export function` ning  oxirida nuqta-vergul bo'lmasligi kerak.
=======
````smart header="No semicolons after export class/function"
Please note that `export` before a class or a function does not make it a [function expression](info:function-expressions). It's still a function declaration, albeit exported.

Most JavaScript style guides don't recommend semicolons after function and class declarations.

That's why there's no need for a semicolon at the end of `export class` and `export function`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
Odatda, `import {...}` ga nimani import qilish kerakligi ro'yxatini qo'yamiz:
=======
Usually, we put a list of what to import in curly braces `import {...}`, like this:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
// 📁 main.js
*!*
import {sayHi, sayBye} from './say.js';
*/!*

sayHi('John'); // Salom, John!
sayBye('John'); // Hayir, John!
```

<<<<<<< HEAD
Ammo agar ro'yxat uzun bo'lsa, biz hamma narsani `import * as <obj>` yordamida obyekt sifatida import qilishimiz mumkin, masalan:
=======
But if there's a lot to import, we can import everything as an object using `import * as <obj>`, for instance:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
1. Zamonaviy qurilish vositalari ([webpack](http://webpack.github.io) va boshqalar) modullarni birlashtiradilar va yuklashni tezlashtirish va foydalanilmayotgan narsalarni olib tashlash uchun ularni optimallashtirish.

<<<<<<< HEAD
    Aytaylik, biz o'z loyihamizga uchinchi tomon kutubxonasini qo'shdik `lib.js` ko'plab funktsiyalar bilan:
=======
    Let's say, we added a 3rd-party library `say.js` to our project with many functions:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    ```js
    // 📁 say.js
    export function sayHi() { ... }
    export function sayBye() { ... }
    export function becomeSilent() { ... }
    ```

<<<<<<< HEAD
    Endi bizning loyihamizda ulardan faqat bittasi kerak bo'lsa:
=======
    Now if we only use one of `say.js` functions in our project:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    ```js
    // 📁 main.js
    import {sayHi} from './say.js';
    ```
<<<<<<< HEAD
    ...Keyin optimallashtiruvchi uni avtomatik ravishda aniqlaydi va to'plamdagi koddan boshqa funktsiyalarni butunlay olib tashlaydi va shu bilan tuzilishini kichiklashtiradi. Bu "tree-shaking" deyiladi.

2. Import qilinadigan narsalarning aniq ro'yxati qisqartirilgan ismlarni beradi: `lib.sayHi()` o'rniga `sayHi()`.
3. Aniq import kod tuzilishi haqida yaxshiroq ma'lumot beradi: nima ishlatiladi va qayerda. Bu kodni qo'llab-quvvatlash va qayta ishlashni osonlashtiradi.
=======
    ...Then the optimizer will see that and remove the other functions from the bundled code, thus making the build smaller. That is called "tree-shaking".

2. Explicitly listing what to import gives shorter names: `sayHi()` instead of `say.sayHi()`.
3. Explicit list of imports gives better overview of the code structure: what is used and where. It makes code support and refactoring easier.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
1. Explicitly listing what to import gives shorter names: `sayHi()` instead of `say.sayHi()`.
2. Explicit list of imports gives better overview of the code structure: what is used and where. It makes code support and refactoring easier.

```smart header="Don't be afraid to import too much"
Modern build tools, such as [webpack](https://webpack.js.org/) and others, bundle modules together and optimize them to speedup loading. They also remove unused imports.

For instance, if you `import * as library` from a huge code library, and then use only few methods, then unused ones [will not be included](https://github.com/webpack/webpack/tree/main/examples/harmony-unused#examplejs) into the optimized bundle.
```
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

## Import "qanday qilib"

Shuningdek, biz turli xil nomlar ostida import qilish uchun `as` dan foydalanishimiz mumkin.

<<<<<<< HEAD
Masalan, qisqacha uchun `sayHi` ni mahalliy `hi` o'zgaruvchaniga, `sayBye` uchun ham import qilaylik:
=======
For instance, let's import `sayHi` into the local variable `hi` for brevity, and import `sayBye` as `bye`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
Endi `hi` va `bye` - bu begonalarning rasmiy ismlari:
=======
Now `hi` and `bye` are official names for outsiders, to be used in imports:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
// 📁 main.js
import * as say from './say.js';

<<<<<<< HEAD
say.hi('John'); // Salom, John!
say.bye('John'); // Hayir, John!
```

## Standart eksport

Hozirgacha biz bir nechta narsalarni qanday qilib import/eksport qilishni ko'rdik, ixtiyoriy ravishda boshqa ismlar "sifatida".

Amalda, modullar quyidagilarni o'z ichiga oladi:
- `lib.js` kabi kutubxona, funktsiyalar to'plami.
- Yoki `user.js` da `class User` singari obyekt, butun modulda faqat shu klass mavjud.
=======
say.*!*hi*/!*('John'); // Hello, John!
say.*!*bye*/!*('John'); // Bye, John!
```

## Export default

In practice, there are mainly two kinds of modules.

1. Modules that contain a library, pack of functions, like `say.js` above.
2. Modules that declare a single entity, e.g. a module `user.js` exports only `class User`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Har bir "narsa" o'z modulida joylashgan bo'lishi uchun, asosan, ikkinchi yondashuvga ustunlik beriladi.

<<<<<<< HEAD
Tabiiyki, bu juda ko'p fayllarni talab qiladi, chunki hamma narsa o'z modulini xohlaydi, ammo bu umuman muammo emas. Aslida, fayllar yaxshi nomlangan va papkalarga tuzilgan bo'lsa, kodni boshqarish osonroq bo'ladi.

"Modulda bitta narsa" ko'rinishini yaxshilash uchun modullar `standart eksport` sintaksisini taqdim etadi.

Buning uchun `export` va `import` so'zlari kerak:

1. Modulning "asosiy eksporti" oldidan `standart eksporti` qo'ying.
2. Jingalak qavslarsiz `import` ni chaqirish.

Masalan, bu yerda `user.js` `class User` ni eksport qiladi:
=======
Naturally, that requires a lot of files, as everything wants its own module, but that's not a problem at all. Actually, code navigation becomes easier if files are well-named and structured into folders.

Modules provide a special `export default` ("the default export") syntax to make the "one thing per module" way look better.

Put `export default` before the entity to export:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
// 📁 user.js
export *!*default*/!* class User { // faqat qo'shing "default"
  constructor(name) {
    this.name = name;
  }
}
```

<<<<<<< HEAD
...Va `main.js` uni import qiladi:
=======
There may be only one `export default` per file.

...And then import it without curly braces:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
// 📁 main.js
import *!*User*/!* from './user.js'; // {User} emas, balki User

new User('John');
```

<<<<<<< HEAD
Jingalak qavssiz import yanada chiroyli ko'rinishga ega. Modullardan foydalanishni boshlashda keng tarqalgan xato bu jingalak qavslarni umuman unutishdir. Esda tutingki, `import` nomlangan import uchun jingalak qavslarga muhtoj va ularni asl qiymati uchun kerak emas.
=======
Imports without curly braces look nicer. A common mistake when starting to use modules is to forget curly braces at all. So, remember, `import` needs curly braces for named exports and doesn't need them for the default one.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

| Nomlangan eksport | Standart eksport |
|--------------|----------------|
| `export class User {...}` | `export default class User {...}` |
| `import {User} from ...` | `import User from ...`|

<<<<<<< HEAD
Tabiiyki, bitta faylga bitta "standart" eksport bo'lishi mumkin.

Biz bitta modulda ham standart, ham nomlangan eksportga ega bo'lishimiz mumkin, ammo amalda odamlar odatda ularni aralashtirmaydilar. Modulda nomlangan yoki standart eksport bor.

**Shuni ta'kidlash kerakki, nomlangan eksportlar (tabiiy ravishda) nomga ega bo'lishi kerak, `standart eksport` esa noma'lum bo'lishi mumkin.**
=======
Technically, we may have both default and named exports in a single module, but in practice people usually don't mix them. A module has either named exports or the default one.

As there may be at most one default export per file, the exported entity may have no name.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Masalan, bularning barchasi to'liq amal qiladigan standart eksport:

```js
export default class { // klass nomi yo'q
  constructor() { ... }
}
```

<<<<<<< HEAD
export default function(user) { // funktsiya nomi yo'q
  alert(`Salom, ${user}!`);
=======
```js
export default function(user) { // no function name
  alert(`Hello, ${user}!`);
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
}
```

<<<<<<< HEAD
// o'zgarmaydigan holda bitta qiymatni eksport qilish
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
```

Bu juda yaxshi, chunki `standart eksport` har bir fayl uchun bittadan, shuning uchun `import` har doim nimani import qilishni biladi.
  Buning aksincha, nomlangan import uchun nomni tashlab qo'yish xato bo'ladi:
=======
```js
// export a single value, without making a variable
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
```

Not giving a name is fine, because there is only one `export default` per file, so `import` without curly braces knows what to import.

Without `default`, such an export would give an error:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
export class { // Xato! (standart bo'lmagan eksport uchun nom kerak)
  constructor() {}
}
```

<<<<<<< HEAD
### "Standart" taxallus

"Default" so'zi sukut bo'yicha eksport qilish uchun biron bir "taxallus" dir, biz unga qandaydir murojaat qilishimiz kerak bo'lganda ishlatamiz.

Masalan, agar bizda allaqachon e'lon qilingan funktsiya mavjud bo'lsa, uni qanday qilib `standart eksport` qilish mumkin:
=======
### The "default" name

In some situations the `default` keyword is used to reference the default export.

For example, to export a function separately from its definition:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
function sayHi(user) {
  alert(`Salom, ${user}!`);
}

<<<<<<< HEAD
export {sayHi as default}; // xuddi biz funktsiyadan oldin "standart eksportni" qo'shganimiz bilan bir xil
```

Yoki, deylik `user.js` moduli bitta asosiy "standart" narsani va bir nechta nomlangan narsalarni eksport qiladi (kamdan-kam hollarda bo'ladi, lekin shunday):
=======
// same as if we added "export default" before the function
export {sayHi as default};
```

Or, another situation, let's say a module `user.js` exports one main "default" thing, and a few named ones (rarely the case, but it happens):
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
Yoki `*` ni obyekt sifatida import qilishni ko'rib chiqsak, u holda `default` xususiyati asl eksport hisoblanadi:
=======
And, finally, if importing everything `*` as an object, then the `default` property is exactly the default export:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
// 📁 main.js
import * as user from './user.js';

let User = user.default; // the default export
new User('John');
```

### A word against default exports

<<<<<<< HEAD
### Standart eksportdan foydalanishimiz kerakmi?

Standart eksportdan foydalanishda ehtiyot bo'lish kerak, chunki ularni saqlab qolish biroz boshqacha.

Nomlangan eksport aniq. Ular import qilgan narsalarini aniq nomlashadi, shuning uchun bizda ulardan ma'lumot bor, bu yaxshi narsa.

Shuningdek, nomlangan eksport bizni import qilish uchun to'g'ri nomdan foydalanishga majbur qiladi:
=======
Named exports are explicit. They exactly name what they import, so we have that information from them; that's a good thing.

Named exports force us to use exactly the right name to import:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
import {User} from './user.js';
// import {MyUser} won't work, the name must be {User}
```

<<<<<<< HEAD
Standart eksport uchun biz o'zimiz nom yaratishimiz kerak:

```js
import MyUser from './user.js'; // import Anywhere ... bo'lishi mumkin va u ishlaydi
```

Shunday qilib, jamoa a'zolari bitta narsa uchun turli xil nomlarni ishlatishlari uchun biroz ko'proq erkinlik ishlatilishi mumkin.
=======
...While for a default export, we always choose the name when importing:

```js
import User from './user.js'; // works
import MyUser from './user.js'; // works too
// could be import Anything... and it'll still work
```

So team members may use different names to import the same thing, and that's not good.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Odatda, bunga yo'l qo'ymaslik va kodni izchil saqlash uchun import qilinadigan o'zgaruvchanlar fayl nomlariga mos kelishi kerak bo'lgan qoida mavjud, masalan:

```js
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
...
```

<<<<<<< HEAD
Boshqa bir yechim - hamma joyda nomlangan eksportlardan foydalanish. Faqat bitta narsa eksport qilingan bo'lsa ham, u `default` holda nom ostida eksport qilinadi.
=======
Still, some teams consider it a serious drawback of default exports. So they prefer to always use named exports. Even if only a single thing is exported, it's still exported under a name, without `default`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Bu shuningdek qayta eksportni (pastga qarang) biroz osonlashtiradi.

## Qayta eksport

"Qayta eksport" sintaksisini `export ... from ...` narsalarni import qilish va ularni darhol eksport qilishga imkon beradi (ehtimol boshqa nom ostida), masalan:

```js
export {sayHi} from './say.js'; // re-export sayHi

export {default as User} from './user.js'; // re-export default
```

<<<<<<< HEAD
Buning ma'nosi nima, nima uchun bunga ehtiyoj bor? Keling, amaliy foydalanish misolini ko'rib chiqaylik.

Tasavvur qiling, biz "paket" yozmoqdamiz: ko'pgina modullarga ega papka, asosan ichki qismga kerak, ba'zi funktsiyalari tashqariga eksport qilinadi (NPM kabi vositalar paketlarni nashr etish va tarqatishga imkon beradi, ammo bu yerda bu muhim emas).

Direkrora tuzilishi shunday bo'lishi mumkin:
=======
Why would that be needed? Let's see a practical use case.

Imagine, we're writing a "package": a folder with a lot of modules, with some of the functionality exported outside (tools like NPM allow us to publish and distribute such packages, but we don't have to use them), and many modules are just "helpers", for internal use in other package modules.

The file structure could be like this:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
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

<<<<<<< HEAD
Paketning ishlashini bitta kirish nuqtasi, ya'ni `auth/index.js` "asosiy fayl" orqali quyidagi tarzda ishlatishni istaymiz:
=======
We'd like to expose the package functionality via a single entry point.

In other words, a person who would like to use our package, should import only from the "main file" `auth/index.js`.

Like this:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
import {login, logout} from 'auth/index.js'
```

<<<<<<< HEAD
G'oya shundan iboratki, bizning paketimizdan foydalanadigan begonalar, ishlab chiquvchilar uning ichki tuzilishiga aralashmasliklari kerak. Ular bizning paket papkamizdagi fayllarni qidirmasliklari kerak. Biz faqat `auth/index.js` da kerakli narsalarni eksport qilamiz va qolganlarini qiziquvchan ko'zlardan yashiramiz.

Endi, haqiqiy eksport qilingan funktsiyalar paket orasida tarqalib ketganligi sababli, biz uni `auth/index.js` da to'plashimiz va "qayta eksport" qilishimiz mumkin:
=======
The "main file", `auth/index.js` exports all the functionality that we'd like to provide in our package.

The idea is that outsiders, other programmers who use our package, should not meddle with its internal structure, search for files inside our package folder. We export only what's necessary in `auth/index.js` and keep the rest hidden from prying eyes.

As the actual exported functionality is scattered among the package, we can import it into `auth/index.js` and export from it:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
"Qayta eksport" bu shunchaki qisqartirilgan belgi:
=======
Now users of our package can `import {login} from "auth/index.js"`.

The syntax `export ... from ...` is just a shorter notation for such import-export:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
// 📁 auth/index.js
// re-export login/logout
export {login, logout} from './helpers.js';
<<<<<<< HEAD
// yoki barcha yordamchilarni qayta eksport qilish uchun foydalanishimiz mumkin:
// export * from './helpers.js';
=======
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

// re-export the default export as User
export {default as User} from './user.js';
...
```

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
The notable difference of `export ... from` compared to `import/export` is that re-exported modules aren't available in the current file. So inside the above example of `auth/index.js` we can't use re-exported `login/logout` functions. 
=======
The notable difference of `export ... from` compared to `import/export` is that re-exported modules aren't available in the current file. So inside the above example of `auth/index.js` we can't use re-exported `login/logout` functions.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

### Re-exporting the default export

The default export needs separate handling when re-exporting.

Let's say we have `user.js` with the `export default class User` and would like to re-export it:

```js
// 📁 user.js
export default class User {
  // ...
}
```

We can come across two problems with it:

1. `export User from './user.js'` won't work. That would lead to a syntax error.

    To re-export the default export, we have to write `export {default as User}`, as in the example above.

2. `export * from './user.js'` re-exports only named exports, but ignores the default one.

    If we'd like to re-export both named and default exports, then two statements are needed:
    ```js
    export * from './user.js'; // to re-export named exports
    export {default} from './user.js'; // to re-export the default export
    ```

Such oddities of re-exporting a default export are one of the reasons why some developers don't like default exports and prefer named ones.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Xulosa

<<<<<<< HEAD
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
=======
Here are all types of `export` that we covered in this and previous articles.

You can check yourself by reading them and recalling what they mean:

- Before declaration of a class/function/..:
  - `export [default] class/function/variable ...`
- Standalone export:
  - `export {x [as y], ...}`.
- Re-export:
  - `export {x [as y], ...} from "module"`
  - `export * from "module"` (doesn't re-export default).
  - `export {default [as y]} from "module"` (re-export default).

Import:

- Importing named exports:
  - `import {x [as y], ...} from "module"`
- Importing the default export:
  - `import x from "module"`
  - `import {default as x} from "module"`
- Import all:
  - `import * as obj from "module"`
- Import the module (its code runs), but do not assign any of its exports to variables:
  - `import "module"`

We can put `import/export` statements at the top or at the bottom of a script, that doesn't matter.

So, technically this code is fine:
```js
sayHi();

// ...

import {sayHi} from './say.js'; // import at the end of the file
```

In practice imports are usually at the start of the file, but that's only for more convenience.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

**`{...}` ichida import/eksport ifodalari ishlamayotganligini unutmang.**

Shunga o'xshash shartli import ishlamaydi:
```js
if (something) {
  import {sayHi} from "./say.js"; // Xato: import yuqori darajada bo'lishi kerak
}
```

...Ammo, albatta, biror narsani shartli ravishda import qilishimiz kerak bo'lsachi? Yoki o'z vaqtida? Shunga o'xshab, modulni iltimosiga binoan yuklang, qachon kerak bo'lsa.

<<<<<<< HEAD
Dinamik importni keyingi bobda ko'rib chiqamiz.
=======
We'll see dynamic imports in the next article.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
