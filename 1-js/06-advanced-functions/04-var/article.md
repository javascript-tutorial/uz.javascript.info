
# Eski "var"

<<<<<<< HEAD
[O'zgaruvchanlar](info:variables) haqidagi birinchi bobda biz o'zgaruvchanlarni e'lon qilishning uchta usulini eslatib o'tdik:
=======
```smart header="This article is for understanding old scripts"
The information in this article is useful for understanding old scripts.

That's not how we write new code.
```

In the very first chapter about [variables](info:variables), we mentioned three ways of variable declaration:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

1. `let`
2. `const`
3. `var`

Leksik muhit uchun `let` va `const` bir xil yo'l tutishadi.

Ammo `var` - bu juda qadimgi zamonlardan kelib chiqqan juda boshqacha jonzod. Odatda zamonaviy skriptlarda ishlatilmaydi, ammo baribir eskilarida yashiringan.

Agar siz bunday skriptlar bilan tanishishni rejalashtirmasangiz, ushbu bobdan voz kechishingiz yoki uni kechiktirishingiz mumkin, ammo keyinroq sizni tishlab qolish ehtimoli bor.

Birinchi qarashdanoq, `var` `let` ga o'xshash ish bajaradi. Ya'ni, o'zgaruvchanni e'lon qiladi:

```js run
function sayHi() {
  var phrase = "Salom"; // mahalliy o'zgaruvchan, "let" o'rniga "var"

  alert(phrase); // Salom

But internally `var` is a very different beast, that originates from very old times. It's generally not used in modern scripts, but still lurks in the old ones.

If you don't plan on meeting such scripts you may even skip this chapter or postpone it.

...Ammo bu yerda farqlar mavjud.

## "var" blok doirasiga ega emas

`var` o'zgaruvchanlari funktsiya miqyosida yoki global bo'lib, ular bloklar orqali ko'rinadi.

Masalan:

```js run
if (true) {
  var test = true; // "let" o'rniga "var" ishlatildi
}

*!*
alert(test); // true, o'zgaruvchanni if dan keyin yashaydi
*/!*
```

Agar biz 2-satrda `let test` dan foydalansak, u holda `alert` ko'rinmaydi. Ammo `var` kod bloklarini e'tiborsiz qoldiradi, shuning uchun bizda global `test` mavjud.

Xuddi shu narsa tsiklar uchun: `var` blok-yoki tsikl-lokal bo'lishi mumkin emas:

```js run
for (var i = 0; i < 10; i++) {
  var one = 1;
  // ...
}

*!*
alert(i); // 10, "i" tsikldan keyin ko'rinadi, bu global o'zgaruvchandir
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

Ko'rib turganimizdek, `var` `if`, `for` yoki boshqa kod bloklari orqali parchalanadi. Buning sababi shundaki, uzoq vaqt oldin JavaScript-ni bloklarida leksik muhit yo'q edi. Va `var` - bu uning qoldig'i.

## "var" funktsiya boshlanganda bajariladi

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

Buni quyidagi misol bilan namoyish qilish yaxshiroqdir:

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

Yuqoridagi ikkala misolda ham `alert` xatosiz ishlaydi, chunki `phrase` o'zgaruvchani mavjud. Ammo uning qiymati hali tayinlanmagan, shuning uchun u `undefined` ni ko'rsatadi.

## Xulosa

`var` ning ikkita asosiy farqlari mavjud:

1. O'zgaruvchanlar blok doirasiga ega emas, ular funktsiya darajasida minimal ko'rinadi.
2. O'zgaruvchan deklaratsiyalar funktsiya boshlanganda bajarilinadi.

Global obyekt bilan bog'liq yana bir kichik farq bor, buni keyingi bobda ko'rib chiqamiz.

<<<<<<< HEAD
Ushbu farqlar, aslida, ko'pincha yomon narsadir. Blok darajasidagi o'zgaruvchanlar - bu juda yaxshi narsa. Shuning uchun `let` standartga ancha oldin kiritilgan va endi o'zgaruvchanni e'lon qilishning asosiy usuli (`const` bilan birga).
=======
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

*!*(*/!*function() {
  alert("Parentheses around the function");
}*!*)*/!*();

*!*(*/!*function() {
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

## Summary

There are two main differences of `var` compared to `let/const`:

1. `var` variables have no block scope, their visibility is scoped to current function, or global, if declared outside function.
2. `var` declarations are processed at function start (script start for globals).

There's one more very minor difference related to the global object, that we'll cover in the next chapter.

These differences make `var` worse than `let` most of the time. Block-level variables is such a great thing. That's why `let` was introduced in the standard long ago, and is now a major way (along with `const`) to declare a variable.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
