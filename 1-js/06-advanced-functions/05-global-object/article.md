
# Global obyekt

<<<<<<< HEAD
Global obyekt dasturning istalgan joyida mavjud bo'lgan o'zgaruvchanlar va funktsiyalarni taqdim etadi. Odatiy bo'lib, ular til yoki ishlash muhitiga o'rnatilganlardir.

Brauzerda u "window" deb nomlangan, Node.js uchun "global", boshqa muhitlar uchun u boshqa nomga ega bo'lishi mumkin.

Masalan, biz `alert` ni `window` usuli sifatida chaqira olamiz:

```js run
alert("Salom");

// bilan bir xil
window.alert("Salom");
```

Biz `Array` kabi boshqa o'rnatilgan funktsiyalarga `window.Array` deb murojaat qilishimiz va unda o'z xususiyatlarimizni yaratishimiz mumkin.

## Brauzer: "window" obyekti

Tarixiy sabablarga ko'ra brauzer ichidagi `window` obyekti biroz chalkash.

1. U global obyekt rolini o'ynashdan tashqari, "brauzer oynasi" funksiyasini taqdim etadi.

    Brauzer oynasiga xos xususiyatlar va usullarga kirish uchun `window` dan foydalanishimiz mumkin:

    ```js run
    alert(window.innerHeight); // brauzer oynasining balandligini ko'rsatadi

    window.open('http://google.com'); // yangi brauzer oynasini ochadi
    ```

2. Yuqori darajadagi `var` o'zgaruvchanlari va funktsiyalar deklaratsiyalari avtomatik ravishda `window` ning xususiyatlariga aylanadi.

    Masalan:
    ```js untrusted run no-strict refresh
    var x = 5;

    alert(window.x); // 5 (var x window xususiyatiga aylanadi)

    window.x = 0;

    alert(x); // 0, o'zgaruvchan modifikatsiya qilingan
    ```

    Iltimos, e'tibor bering, bu zamonaviyroq `let/const` deklaratsiyalari bilan bo'lmaydi:

    ```js untrusted run no-strict refresh
    let x = 5;

    alert(window.x); // undefined ("let" window xususiyatini yaratmaydi)
    ```

3. Shuningdek, barcha skriptlar bir xil global muhitga ega, shuning uchun bitta `<script>` da e'lon qilingan o'zgaruvchanlar boshqasida ham ko'rinadi:

    ```html run
    <script>
      var a = 1;
      let b = 2;
    </script>
=======
The global object provides variables and functions that are available anywhere. By default, those that are built into the language or the environment.

In a browser it is named `window`, for Node.js it is `global`, for other environments it may have another name.

Recently, `globalThis` was added to the language, as a standardized name for a global object, that should be supported across all environments. It's supported in all major browsers.

We'll use `window` here, assuming that our environment is a browser. If your script may run in other environments, it's better to use `globalThis` instead.

All properties of the global object can be accessed directly:

```js run
alert("Hello");
// is the same as
window.alert("Hello");
```

In a browser, global functions and variables declared with `var` (not `let/const`!) become the property of the global object:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run untrusted refresh
var gVar = 5;

<<<<<<< HEAD
4. Va ahamiyatsiz narsa, ammo baribir: global miqyosda `this` ning qiymati `window` dir.

    ```js untrusted run no-strict refresh
    alert(this); // window
    ```

Nima uchun bunday qilingan? Til yaratilishida bir nechta jihatlarni bitta `window` obyektiga birlashtirish g'oyasi "narsalarni soddalashtirish" edi. Ammo o'shandan beri ko'p narsalar o'zgardi. Kichkina skriptlar to'g'ri arxitekturani talab qiladigan katta dasturlarga aylandi.

Turli xil skriptlar (ehtimol turli manbalardan) bir-birining o'zgaruvchanlarini ko'rishlari yaxshi emasmi?

Yo'q, unday emas, chunki bu nomlash nizolariga olib kelishi mumkin: bir xil o'zgaruvchan nom turli xil maqsadlarda ikkita skriptda ishlatilishi mumkin, shuning uchun ular bir-biriga zid keladi.

Hozirgi vaqtda ko'p maqsadli `window` tilda dizayndagi xato deb hisoblanadi.

Yaxshiyamki, "JavaScript modullari" deb nomlangan yechim mavjud.

Agar biz `type="module"` atributini `<script>` yorlig'iga o'rnatgan bo'lsak, unda bunday skript o'zining `window` ga aralashmaydigan, o'zining yuqori darajadagi ko'lami (leksik muhiti) bo'lgan alohida "modul" hisoblanadi.

- Modulda `var x` `window` ning xususiyatiga aylanmaydi:

    ```html run
    <script type="module">
      var x = 5;

      alert(window.x); // undefined
    </script>
    ```

- Bir-birining o'zgaruvchanlanlarini ko'rmaydigan ikkita modul:
=======
alert(window.gVar); // 5 (became a property of the global object)
```

<<<<<<< HEAD
The same effect have function declarations (statements with `function` keyword in the main code flow, not function expressions).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
Function declarations have the same effect (statements with `function` keyword in the main code flow, not function expressions).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Please don't rely on that! This behavior exists for compatibility reasons. Modern scripts use [JavaScript modules](info:modules) where such a thing doesn't happen.

If we used `let` instead, such thing wouldn't happen:

<<<<<<< HEAD
- Va oxirgi kichik narsa, moduldagi `this` ning yuqori darajadagi qiymati `undefined` (nima uchun u baribir `window` bo'lishi kerak?):
=======
```js run untrusted refresh
let gLet = 5;
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

alert(window.gLet); // undefined (doesn't become a property of the global object)
```

<<<<<<< HEAD
**`<script type="module">` dan foydalanib, tilning dizayndagi nuqsonlarini yuqori darajadagi muhitni `window` dan ajratish yo'li bilan tuzatadi.**

Keyinchalik modullarning ko'proq xususiyatlarini [](info:modules) bo'limida ko'rib chiqamiz.

## Global obyektdan to'g'ri foydalanish

1. Odatda global o'zgaruvchanlardan foydalanish tavsiya etilmaydi. Iloji boricha kamroq global o'zgaruvchanlar bo'lishi kerak, ammo agar biz global ko'rinadigan narsani yaratishimiz kerak bo'lsa, uni `window` (yoki Node.js da `global`) ga qo'yishimiz mumkin.

    Bu yerda biz boshqa foydalanuvchi skriptlaridan foydalanish uchun mavjud foydalanuvchi haqidagi ma'lumotlarni global obyektga joylashtiramiz:

    ```js run
    // uni "window" ga aniq belgilang
    window.currentUser = {
      name: "John",
      age: 30
    };

    // keyin, boshqa joyda, boshqa skriptda
    alert(window.currentUser.name); // John
    ```

2. Zamonaviy til xususiyatlarini qo'llab-quvvatlashi uchun global obyektni sinab ko'rishimiz mumkin.

    Masalan, o'rnatilgan `Promise` obyekti mavjudligini tekshirib ko'ring (u eski brauzerlarda mavjud emas):
    ```js run
    if (!window.Promise) {
      alert("Sizning brauzeringiz haqiqatan ham eski!");
    }
    ```

3. Biz "polifillarni" yaratishimiz mumkin: atrof-muhit tomonidan qo'llab-quvvatlanmaydigan funktsiyalarni qo'shing (masalan, eski brauzer), ammo zamonaviy standartda mavjud.

    ```js run
    if (!window.Promise) {
      window.Promise = ... // zamonaviy til xususiyatini maxsus amalga oshirish
    }
    ```

...Va, albatta, agar biz brauzerda bo'lsak, brauzer oynasi xususiyatlariga (global obyekt sifatida emas) kirish uchun `window` dan foydalanish juda yaxshi.
=======
If a value is so important that you'd like to make it available globally, write it directly as a property:

```js run
*!*
// make current user information global, to let all scripts access it
window.currentUser = {
  name: "John"
};
*/!*

// somewhere else in code
alert(currentUser.name);  // John

// or, if we have a local variable with the name "currentUser"
// get it from window explicitly (safe!)
alert(window.currentUser.name); // John
```

That said, using global variables is generally discouraged. There should be as few global variables as possible. The code design where a function gets "input" variables and produces certain "outcome" is clearer, less prone to errors and easier to test than if it uses outer or global variables.

## Using for polyfills

We use the global object to test for support of modern language features.

For instance, test if a built-in `Promise` object exists (it doesn't in really old browsers):
```js run
if (!window.Promise) {
  alert("Your browser is really old!");
}
```

If there's none (say, we're in an old browser), we can create "polyfills": add functions that are not supported by the environment, but exist in the modern standard.

```js run
if (!window.Promise) {
  window.Promise = ... // custom implementation of the modern language feature
}
```

## Summary

- The global object holds variables that should be available everywhere.

    That includes JavaScript built-ins, such as `Array` and environment-specific values, such as `window.innerHeight` -- the window height in the browser.
- The global object has a universal name `globalThis`.

    ...But more often is referred by "old-school" environment-specific names, such as `window` (browser) and `global` (Node.js).
- We should store values in the global object only if they're truly global for our project. And keep their number at minimum.
- In-browser, unless we're using [modules](info:modules), global functions and variables declared with `var` become a property of the global object.
- To make our code future-proof and easier to understand, we should access properties of the global object directly, as `window.x`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
