
<<<<<<< HEAD
# Polifillar
=======
# Polyfills and transpilers
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

<<<<<<< HEAD
JavaScript tili doimiy ravishda rivojlanib boradi. Tilga oid yangi takliflar muntazam ravishda paydo bo'lib, ular tahlil qilinadi va agar munosib deb topilsa, <https://tc39.github.io/ecma262/> ro'yxatiga qo'shiladi va keyin [spetsifikatsiya](http://www.ecma-international.org/publications/standards/Ecma-262.htm) ga o'tiladi .
=======
The JavaScript language steadily evolves. New proposals to the language appear regularly, they are analyzed and, if considered worthy, are appended to the list at <https://tc39.github.io/ecma262/> and then progress to the [specification](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/).
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

JavaScript interpretatorini ortida turgan jamoalar avval nimani amalga oshirish kerakligi to'g'risida qaror qilishadi. Ular loyihadagi takliflarni amalga oshirishga qaror qilishlari va oldindan aytib o'tilgan narsalarni keyinga qoldirishlari mumkin, chunki ular unchalik qiziq emas yoki ularni bajarish qiyinroq bo'lsa.

<<<<<<< HEAD
Shunday qilib, interpretator uchun standartning faqat bir qismini amalga oshirish odatiy holdir.

Til xususiyatlarini qo'llab-quvvatlashning hozirgi holatini ko'rish uchun yaxshi sahifa <https://kangax.github.io/compat-table/es6/> (bu juda katta, biz hali o'rganadigan ko'p narsalarimiz bor).
=======
So it's quite common for an engine to implement only part of the standard.

A good page to see the current state of support for language features is <https://compat-table.github.io/compat-table/es6/> (it's big, we have a lot to study yet).
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

As programmers, we'd like to use most recent features. The more good stuff - the better!

<<<<<<< HEAD
Tilning zamonaviy xususiyatlaridan foydalansak, ba'zi interpretatorlar bunday kodni qo'llab-quvvatlamasligi mumkin. Yuqorida aytib o'tilganidek, hamma xususiyatlar hamma joyda ham amalga oshirilmaydi.

Bu erda Babel yordamga keladi.

[Babel](https://babeljs.io) - bu [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler). U zamonaviy JavaScript kodini avvalgi standartga qayta yozadi.

Aslida, Babel-da ikkita qism mavjud:

1. Birinchidan, kodni qayta yozadigan transpiler dasturi. Dasturchi uni o'z kompyuterida ishlatadi. Kodni eski standartga qayta yozadi. Va keyin kod veb-saytga foydalanuvchilar uchun yetkazib beriladi. [Webpack](http://webpack.github.io/) yoki [brunch](http://brunch.io/) kabi zamonaviy loyiha tuzish tizimi har bir kod o'zgarganda avtomatik ravishda transpilerni ishga tushirish vositasini taqdim etadi, biz tomondan hech qanday vaqt yo'qotilmaydi.

2. Ikkinchidan, polifill.

    Transpiler kodni qayta yozadi, shuning uchun sintaksis xususiyatlari qoplanadi. Ammo yangi funktsiyalar uchun ularni amalga oshiradigan maxsus skript yozishimiz kerak. JavaScript - bu juda dinamik tildir, skriptlar nafaqat yangi funktsiyalarni qo'shibgina qolmay, balki ichki funktsiyalarni ham o'zgartirishi mumkin, shunda ular o'zlarini zamonaviy standartlarga muvofiq tutishadi.

    Bo'shliqni "to'ldiradigan" va skriptlar uchun yetishmayotgan dasturlarni qo'shadigan "polifil" atamasi mavjud.

    Ikkita qiziqarli polifillar:
    - [babel polifil](https://babeljs.io/docs/usage/polyfill/) juda ko'p narsani qo'llab-quvvatlaydi, lekin katta.
    - [polyfill.io](http://polyfill.io) xizmati, bizga kerak bo'lgan xususiyatlarga qarab, talabga binoan polifillalarni yuklash/qurish imkonini beradi.

Shunday qilib, biz zamonaviy funktsiyalarni qo'llab-quvvatlash uchun transpiletorni o'rnatishimiz va eski interpretatorlar uchun polifillni qo'shishimiz kerak.

Agar biz zamonaviy interpretatorga yo'naltirilgan va hamma joyda qo'llab-quvvatlanadigan funktsiyalardan tashqari funktsiyalardan foydalanmasak, unda Babel-dan foydalanishimiz shart emas.

## O'quv qo'llanmasidagi misollar
=======
On the other hand, how to make our modern code work on older engines that don't understand recent features yet?

There are two tools for that:

1. Transpilers.
2. Polyfills.

Here, in this chapter, our purpose is to get the gist of how they work, and their place in web development.

## Transpilers

A [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) is a special piece of software that translates source code to another source code. It can parse ("read and understand") modern code and rewrite it using older syntax constructs, so that it'll also work in outdated engines.

E.g. JavaScript before year 2020 didn't have the "nullish coalescing operator" `??`. So, if a visitor uses an outdated browser, it may fail to understand the code like `height = height ?? 100`.

A transpiler would analyze our code and rewrite `height ?? 100` into `(height !== undefined && height !== null) ? height : 100`.

```js
// before running the transpiler
height = height ?? 100;

// after running the transpiler
height = (height !== undefined && height !== null) ? height : 100;
```

Now the rewritten code is suitable for older JavaScript engines.

Usually, a developer runs the transpiler on their own computer, and then deploys the transpiled code to the server.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Speaking of names, [Babel](https://babeljs.io) is one of the most prominent transpilers out there.

<<<<<<< HEAD
<<<<<<< HEAD
````online
Ko'pgina misollar joyida ishlaydi, masalan:

```js run
alert('Ishlash uchun yuqori o'ng burchakdagi "Play" tugmasini bosing);
```

Zamonaviy JS dan foydalanadigan misollar faqat sizning brauzeringiz uni qo'llab-quvvatlasa ishlaydi.
````

```offline
Oflayn versiyasini o'qiyotgan bo'sangiz, misollarni ishlatish mumkin emas. Ammo ular odatda ishlaydi :)
```

[Chrome Canary](https://www.google.com/chrome/browser/canary.html) barcha misollar uchun yaxshi, ammo boshqa zamonaviy brauzerlar ham yaxshi.

E'tibor bering, ishlab chiqarishda biz Babel-da kodni eskirgan brauzerlarga mos ravishda tarjima qilishimiz mumkin, shuning uchun bunday cheklov bo'lmaydi, kod hamma joyda ishlaydi.
=======
Modern project build systems, such as [webpack](http://webpack.github.io/), provide means to run transpiler automatically on every code change, so it's very easy to integrate into development process.
=======
Modern project build systems, such as [webpack](https://webpack.js.org/), provide a means to run a transpiler automatically on every code change, so it's very easy to integrate into the development process.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

## Polyfills

New language features may include not only syntax constructs and operators, but also built-in functions.

For example, `Math.trunc(n)` is a function that "cuts off" the decimal part of a number, e.g `Math.trunc(1.23)` returns `1`.

In some (very outdated) JavaScript engines, there's no `Math.trunc`, so such code will fail.

As we're talking about new functions, not syntax changes, there's no need to transpile anything here. We just need to declare the missing function.

A script that updates/adds new functions is called "polyfill". It "fills in" the gap and adds missing implementations.

For this particular case, the polyfill for `Math.trunc` is a script that implements it, like this:

```js
if (!Math.trunc) { // if no such function
  // implement it
  Math.trunc = function(number) {
    // Math.ceil and Math.floor exist even in ancient JavaScript engines
    // they are covered later in the tutorial
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

JavaScript is a highly dynamic language. Scripts may add/modify any function, even built-in ones.

One interesting polyfill library is [core-js](https://github.com/zloirock/core-js), which supports a wide range of features and allows you to include only the ones you need.

## Summary

In this chapter we'd like to motivate you to study modern and even "bleeding-edge" language features, even if they aren't yet well-supported by JavaScript engines.

Just don't forget to use a transpiler (if using modern syntax or operators) and polyfills (to add functions that may be missing). They'll ensure that the code works.

For example, later when you're familiar with JavaScript, you can setup a code build system based on [webpack](https://webpack.js.org/) with the [babel-loader](https://github.com/babel/babel-loader) plugin.

Good resources that show the current state of support for various features:
- <https://compat-table.github.io/compat-table/es6/> - for pure JavaScript.
- <https://caniuse.com/> - for browser-related functions.

P.S. Google Chrome is usually the most up-to-date with language features, try it if a tutorial demo fails. Most tutorial demos work with any modern browser though.

>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
