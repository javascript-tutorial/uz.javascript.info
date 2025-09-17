
# Eski "var"

[O'zgaruvchanlar](info:variables) haqidagi birinchi bobda biz o'zgaruvchanlarni e'lon qilishning uchta usulini eslatib o'tdik:

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

```js
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

Ushbu farqlar, aslida, ko'pincha yomon narsadir. Blok darajasidagi o'zgaruvchanlar - bu juda yaxshi narsa. Shuning uchun `let` standartga ancha oldin kiritilgan va endi o'zgaruvchanni e'lon qilishning asosiy usuli (`const` bilan birga).
