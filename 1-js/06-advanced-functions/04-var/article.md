
# Eski "var"

<<<<<<< HEAD
[O'zgaruvchanlar](info:variables) haqidagi birinchi bobda biz o'zgaruvchanlarni e'lon qilishning uchta usulini eslatib o'tdik:
=======
```smart header="This article is for understanding old scripts"
The information in this article is useful for understanding old scripts.

That's not how we write a new code.
```

In the very first chapter about [variables](info:variables), we mentioned three ways of variable declaration:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

1. `let`
2. `const`
3. `var`

<<<<<<< HEAD
Leksik muhit uchun `let` va `const` bir xil yo'l tutishadi.

Ammo `var` - bu juda qadimgi zamonlardan kelib chiqqan juda boshqacha jonzod. Odatda zamonaviy skriptlarda ishlatilmaydi, ammo baribir eskilarida yashiringan.

Agar siz bunday skriptlar bilan tanishishni rejalashtirmasangiz, ushbu bobdan voz kechishingiz yoki uni kechiktirishingiz mumkin, ammo keyinroq sizni tishlab qolish ehtimoli bor.

Birinchi qarashdanoq, `var` `let` ga o'xshash ish bajaradi. Ya'ni, o'zgaruvchanni e'lon qiladi:

```js run
function sayHi() {
  var phrase = "Salom"; // mahalliy o'zgaruvchan, "let" o'rniga "var"

  alert(phrase); // Salom
=======
The `var` declaration is similar to `let`. Most of the time we can replace `let` by `var` or vice-versa and expect things to work:

```js run
var message = "Hi";
alert(message); // Hi
```
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

But internally `var` is a very different beast, that originates from very old times. It's generally not used in modern scripts, but still lurks in the old ones.

If you don't plan on meeting such scripts you may even skip this chapter or postpone it.

<<<<<<< HEAD
...Ammo bu yerda farqlar mavjud.
=======
On the other hand, it's important to understand differences when migrating old scripts from `var` to `let`, to avoid odd errors.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## "var" blok doirasiga ega emas

<<<<<<< HEAD
`var` o'zgaruvchanlari funktsiya miqyosida yoki global bo'lib, ular bloklar orqali ko'rinadi.
=======
Variables, declared with `var`, are either function-scoped or global-scoped. They are visible through blocks.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Masalan:

```js run
if (true) {
  var test = true; // "let" o'rniga "var" ishlatildi
}

*!*
alert(test); // true, o'zgaruvchanni if dan keyin yashaydi
*/!*
```

<<<<<<< HEAD
Agar biz 2-satrda `let test` dan foydalansak, u holda `alert` ko'rinmaydi. Ammo `var` kod bloklarini e'tiborsiz qoldiradi, shuning uchun bizda global `test` mavjud.
=======
As `var` ignores code blocks, we've got a global variable `test`.

If we used `let test` instead of `var test`, then the variable would only be visible inside `if`:

```js run
if (true) {
  let test = true; // use "let"
}

*!*
alert(test); // ReferenceError: test is not defined
*/!*
```
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Xuddi shu narsa tsiklar uchun: `var` blok-yoki tsikl-lokal bo'lishi mumkin emas:

```js
for (var i = 0; i < 10; i++) {
  var one = 1;
  // ...
}

*!*
<<<<<<< HEAD
alert(i); // 10, "i" tsikldan keyin ko'rinadi, bu global o'zgaruvchandir
=======
alert(i);   // 10, "i" is visible after loop, it's a global variable
alert(one); // 1, "one" is visible after loop, it's a global variable
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
*/!*
```

Agar kod bloki funktsiya ichida bo'lsa, `var` funktsiya darajasidagi o'zgaruvchanga aylanadi:

```js run
function sayHi() {
  if (true) {
    var phrase = "Salom";
  }

  alert(phrase); // ishlaydi
}

sayHi();
alert(phrase); // ReferenceError: phrase is not defined
```

<<<<<<< HEAD
Ko'rib turganimizdek, `var` `if`, `for` yoki boshqa kod bloklari orqali parchalanadi. Buning sababi shundaki, uzoq vaqt oldin JavaScript-ni bloklarida leksik muhit yo'q edi. Va `var` - bu uning qoldig'i.

## "var" funktsiya boshlanganda bajariladi
=======
As we can see, `var` pierces through `if`, `for` or other code blocks. That's because a long time ago in JavaScript, blocks had no Lexical Environments, and `var` is a remnant of that.

## "var" tolerates redeclarations

If we declare the same variable with `let` twice in the same scope, that's an error:

```js run
let user;
let user; // SyntaxError: 'user' has already been declared
```

With `var`, we can redeclare a variable any number of times. If we use `var` with an already-declared variable, it's just ignored:

```js run
var user = "Pete";

var user = "John"; // this "var" does nothing (already declared)
// ...it doesn't trigger an error

alert(user); // John
```

## "var" variables can be declared below their use
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

`var` deklaratsiyalari funktsiya boshlanganda bajariladi (yoki global uchun skript boshlanadi).

Boshqacha qilib aytganda, `var` o'zgaruvchanlari funktsiya bajarilishidan boshlab, ta'rif qayerda bo'lishidan qat'i nazar (ta'rif ichki funktsiyada emas deb taxmin qilinadi).

Shunday qilib, ushbu kod:

```js run
function sayHi() {
  phrase = "Salom";

  alert(phrase);

*!*
  var phrase;
*/!*
}
sayHi();
```

...Texnik jihatdan shu bilan bir xil (yuqoridagi `var phrase`):

```js run
function sayHi() {
*!*
  var phrase;
*/!*

  phrase = "Salom";

  alert(phrase);
}
sayHi();
```

...Yoki shunday (esda tutingki, kod bloklari e'tiborga olinmaydi):

```js run
function sayHi() {
  phrase = "Salom"; // (*)

  *!*
  if (false) {
    var phrase;
  }
  */!*

  alert(phrase);
}
sayHi();
```

Odamlar bunday xatti-harakatni "hoisting" (ko'tarish) deb ham atashadi, chunki barcha `var` funktsiyalarni yuqori qismiga "yuzaga chiqadi" (ko'tarilgan).

Shunday qilib, yuqoridagi misolda, `if (false)` shox hech qachon bajarilmaydi, ammo bu muhim emas. Uning ichidagi `var` funktsiya boshida bajariladi, shuning uchun `(*)` momentida o'zgaruvchan mavjud.

**Deklaratsiyalar ko'tariladi, ammo tayinlashlar yo'q.**

<<<<<<< HEAD
Buni quyidagi misol bilan namoyish qilish yaxshiroqdir:
=======
That's best demonstrated with an example:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
function sayHi() {
  alert(phrase);  

*!*
  var phrase = "Salom";
*/!*
}

sayHi();
```

`var phrase = "Salom"` satrida ikkita amal mavjud:

1. O'zgaruvchan deklaratsiya `var`
2. O'zgaruvchan tayinlash `=`

Deklaratsiya funktsiyani bajarish boshlanganda ("ko'tarilgan") bajariladi, ammo tayinlash har doim paydo bo'lgan joyda ishlaydi. Shunday qilib kod asosan shunday ishlaydi:

```js run
function sayHi() {
*!*
  var phrase; // deklaratsiya boshida ishlaydi...
*/!*

  alert(phrase); // undefined

*!*
  phrase = "Hello"; // ...tayinlash - ijro etilishi unga yetganda.
*/!*
}

sayHi();
```

Barcha `var` deklaratsiyalari funktsiya boshlanganda bajarilganligi sababli, biz ularga istalgan joyda murojaat qilishimiz mumkin. Ammo o'zgaruvchanlar tayinlanmaguncha aniqlanmagan.

<<<<<<< HEAD
Yuqoridagi ikkala misolda ham `alert` xatosiz ishlaydi, chunki `phrase` o'zgaruvchani mavjud. Ammo uning qiymati hali tayinlanmagan, shuning uchun u `undefined` ni ko'rsatadi.
=======
In both examples above, `alert` runs without an error, because the variable `phrase` exists. But its value is not yet assigned, so it shows `undefined`.

## IIFE

In the past, as there was only `var`, and it has no block-level visibility, programmers invented a way to emulate it. What they did was called "immediately-invoked function expressions" (abbreviated as IIFE).

That's not something we should use nowadays, but you can find them in old scripts.

An IIFE looks like this:

```js run
(function() {

  var message = "Hello";

  alert(message); // Hello

})();
```

Here, a Function Expression is created and immediately called. So the code executes right away and has its own private variables.

The Function Expression is wrapped with parenthesis `(function {...})`, because when JavaScript engine encounters `"function"` in the main code, it understands it as the start of a Function Declaration. But a Function Declaration must have a name, so this kind of code will give an error:

```js run
// Tries to declare and immediately call a function
function() { // <-- SyntaxError: Function statements require a function name

  var message = "Hello";

  alert(message); // Hello

}();
```

Even if we say: "okay, let's add a name", that won't work, as JavaScript does not allow Function Declarations to be called immediately:

```js run
// syntax error because of parentheses below
function go() {

}(); // <-- can't call Function Declaration immediately
```

So, the parentheses around the function is a trick to show JavaScript that the function is created in the context of another expression, and hence it's a Function Expression: it needs no name and can be called immediately.

There exist other ways besides parentheses to tell JavaScript that we mean a Function Expression:

```js run
// Ways to create IIFE

(function() {
  alert("Parentheses around the function");
}*!*)*/!*();

(function() {
  alert("Parentheses around the whole thing");
}()*!*)*/!*;

*!*!*/!*function() {
  alert("Bitwise NOT operator starts the expression");
}();

*!*+*/!*function() {
  alert("Unary plus starts the expression");
}();
```

In all the above cases we declare a Function Expression and run it immediately. Let's note again: nowadays there's no reason to write such code.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Xulosa

<<<<<<< HEAD
`var` ning ikkita asosiy farqlari mavjud:

1. O'zgaruvchanlar blok doirasiga ega emas, ular funktsiya darajasida minimal ko'rinadi.
2. O'zgaruvchan deklaratsiyalar funktsiya boshlanganda bajarilinadi.

Global obyekt bilan bog'liq yana bir kichik farq bor, buni keyingi bobda ko'rib chiqamiz.

Ushbu farqlar, aslida, ko'pincha yomon narsadir. Blok darajasidagi o'zgaruvchanlar - bu juda yaxshi narsa. Shuning uchun `let` standartga ancha oldin kiritilgan va endi o'zgaruvchanni e'lon qilishning asosiy usuli (`const` bilan birga).
=======
There are two main differences of `var` compared to `let/const`:

1. `var` variables have no block scope, their visibility is scoped to current function, or global, if declared outside function.
2. `var` declarations are processed at function start (script start for globals).

There's one more very minor difference related to the global object, that we'll cover in the next chapter.

These differences make `var` worse than `let` most of the time. Block-level variables is such a great thing. That's why `let` was introduced in the standard long ago, and is now a major way (along with `const`) to declare a variable.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
