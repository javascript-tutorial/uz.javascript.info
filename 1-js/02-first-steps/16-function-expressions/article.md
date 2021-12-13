<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions-arrows/article.md
# Funktsional ifodalar va o'qlar
=======
# Function expressions
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/16-function-expressions/article.md

JavaScript da funktsiya "sehrli til tuzilishi" emas, balki qiymatning bir turidir.

Biz ilgari ishlatgan sintaks *funktsiya deklaratsiyasi* deyiladi:

```js
function sayHi() {
  alert( "Salom" );
}
```

Funktsiyani yaratish uchun yana bir sintaksis mavjud, u *funktsiya ifodasi* deb nomlanadi.

<<<<<<< HEAD
Bu shunday ko'rinishga ega:
=======
It allows to create a new function in the middle of any expression.

For example:
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

```js
let sayHi = function() {
  alert( "Salom" );
};
```

<<<<<<< HEAD
Bu yerda funktsiya boshqa qiymatlar singari aniq ravishda yaratiladi va o'zgaruvchanga tayinlanadi. Funktsiya qanday aniqlangan bo'lishidan qat'iy nazar, bu faqat `sayHi` o'zgaruvchanida saqlanadigan qiymat.

<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions-arrows/article.md
Ushbu kod namunalarining ma'nosi bir xil: "funktsiyani yarating va uni `sayHi`" o'zgaruvchanida saqlang.

Hatto `alert` yordamida ushbu qiymatni chiqarishimiz mumkin:
=======
The meaning of these code samples is the same: "create a function and put it into the variable `sayHi`".
=======
Here we can see a variable `sayHi` getting a value, the new function, created as `function() { alert("Hello"); }`.

As the function creation happens in the context of the assignment expression (to the right side of `=`), this is a *Function Expression*.

Please note, there's no name after the `function` keyword. Omitting a name is allowed for Function Expressions.

Here we immediately assign it to the variable, so the meaning of these code samples is the same: "create a function and put it into the variable `sayHi`".

In more advanced situations, that we'll come across later, a function may be created and immediately called or scheduled for a later execution, not stored anywhere, thus remaining anonymous.

## Function is a value

Let's reiterate: no matter how the function is created, a function is a value. Both examples above store a function is `sayHi` variable.
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

We can even print out that value using `alert`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/16-function-expressions/article.md

```js run
function sayHi() {
  alert( "Salom" );
}

*!*
alert( sayHi ); // funktsiya kodini ko'rsatadi
*/!*
```

Iltimos, oxirgi satr funktsiyani bajarmasligini unutmang, chunki `sayHi` dan keyin qavslar yo'q. Bazi dasturlash tillari mavjud, funktsiya nomini eslatish uning bajarilishini keltirib chiqaradi, ammo JavaScript-ni bunday emas.

JavaScript da funktsiya qiymatdir, shuning uchun biz uni qiymat sifatida ko'rib chiqishimiz mumkin. Yuqoridagi manba kod bo'lgan matni ko'rsatadi.

<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions-arrows/article.md
Bu, albatta, `sayHi()` kabi chaqirishimiz alohida ahamiyatga ega.
=======
Surely, a function is a special value, in the sense that we can call it like `sayHi()`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/16-function-expressions/article.md

Ammo bu hali ham qiymatdir. Shunday qilib, biz u bilan boshqa turdagi qiymatlar singari ishlashimiz mumkin.

Biz funktsiyani boshqa o'zgaruvchanga nusxalashimiz mumkin:

```js run no-beautify
function sayHi() {   // (1) yaratmoq
  alert( "Salom" );
}

let func = sayHi;    // (2) nusxalamoq

func(); // Salom     // (3) nusxasini ishga tushirish (ishlaydi)!
sayHi(); // Salom    //     bu hali ham ishlaydi (nega bunday bo'lishi kerak emas?)
```

Yuqorida nima batafsil sodir bo'lganligi:

<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions-arrows/article.md
1. Funktsiya deklaratsiyasi `(1)` funktsiyani yaratadi va uni `sayHi` nomli o'zgaruvchanda saqlaydi.
2. `(2)` satri uni `func` o'zgaruvchaniga ko'chiradi.

     Iltimos, yana bir bor e'tibor bering: `sayHi` dan keyin qavslar yo'q. Agar mavjud bo'lsa, unda `func = sayHi()` `sayHi` *funktsiyasini* emas, balki `sayHi()` ga *qo'ng'iroq natijasini* `func` ga yozadi.
3. Endi funktsiyani `sayHi()` va `func()` deb atash mumkin.
=======
1. The Function Declaration `(1)` creates the function and puts it into the variable named `sayHi`.
2. Line `(2)` copies it into the variable `func`. Please note again: there are no parentheses after `sayHi`. If there were, then `func = sayHi()` would write  *the result of the call* `sayHi()` into `func`, not *the function* `sayHi` itself.
3. Now the function can be called as both `sayHi()` and `func()`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/16-function-expressions/article.md

<<<<<<< HEAD
E'tibor bering, biz birinchi satrda `sayHi` ni e'lon qilish uchun funktsiya ifodasidan foydalinishimiz mumkin edi:
=======
We could also have used a Function Expression to declare `sayHi`, in the first line:
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

```js
let sayHi = function() { // (1) create
  alert( "Hello" );
};

let func = sayHi;
// ...
```

<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions-arrows/article.md
Hammasi bir xil ishlaydi. Nima sodir bo'layotgani yanada ravshanroq, to'g'rimi?
=======
Everything would work the same.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/16-function-expressions/article.md


````smart header="Nima uchun oxirida nuqta-vergul bor?"
Siz hayron bo'lishingiz mumkin, nima uchun funktsiya ifodasi oxirida nuqta-vergulga ega `;`, lekin funktsiya deklaratsiyasi ega emas:

```js
function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
}*!*;*/!*
```

<<<<<<< HEAD
<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions-arrows/article.md
Javob oddiy:
- Kod bloklari va ularni ishlatadigan `if {...}`, `for {}`, `function f {}` va hokazo kabi sintaksis tuzilmalarining oxirida nuqta-vergul `;` qo'yish kerak emas.
- Funktsiya ifodasi ifoda ichida ishlatiladi: `let sayHi = ...;`, qiymat sifatida. Bu kod bloki emas. Nuqta-vergul `;`, qiymati qanday bo'lishidan qat'i nazar, ifodalar oxirida qo'yilishi tavsiya etiladi. Demak, bu yerdagi nuqta-vergul funktsiya ifodasining o'zi bilan hech qanday bog'liq emas, shunchaki ifodaning tugatadi.
=======
The answer is simple:
- There's no need for `;` at the end of code blocks and syntax structures that use them like `if { ... }`, `for {  }`, `function f { }` etc.
- A Function Expression is used inside the statement: `let sayHi = ...;`, as a value. It's not a code block, but rather an assignment. The semicolon `;` is recommended at the end of statements, no matter what the value is. So the semicolon here is not related to the Function Expression itself, it just terminates the statement.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/16-function-expressions/article.md
=======
The answer is simple: a Function Expression is created here as `function(…) {…}` inside the assignment statement: `let sayHi = …;`. The semicolon `;` is recommended at the end of the statement, it's not a part of the function syntax.

The semicolon would be there for a simpler assignment, such as `let sayHi = 5;`, and it's also there for a function assignment.
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269
````

## Qayta chaqirish funktsiyalari

Funksiyalarni qiymat sifatida uzatilishining va funktsiya ifodalaridan foydalanishning ko'proq misollarini ko'rib chiqamiz.

Biz uchta parametr bilan `ask(savol, ha, yo'q)` funktsiyasini yozamiz:

`savol`
: Savolning matni

`ha`
: Agar javob "Ha" bo'lsa, funktsiya bajariladi

`yo'q`
: Agar javob "Yo'q" bo'lsa, funktsiya bajariladi

Funktsiya `savol` berishi kerak va foydalanuvchining javobiga qarab `ha()` yoki `yo'q()` ni chaqirishi kerak:

```js run
*!*
function ask(savol, ha, yoq) {
  if (confirm(savol)) ha()
  else yoq();
}
*/!*

function showOk() {
  alert( "Siz rozisiz." );
}

function showCancel() {
  alert( "Siz ijroni bekor qildingiz." );
}

// foydalanish: showOk, showCancel funktsiyalari ask funktsiyasi uchun argument sifatida 
ask("Rozimisiz?", showOk, showCancel);
```

<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions-arrows/article.md
Qanday qilib uni qisqartirish kerakligini o'rgatishdan oldin, brauzerda (va ba'zi hollarda server tomonida) bunday funktsiyalar juda mashhurligini ta'kidlaymiz. Haqiqiy hayotdan tatbiq etish va yuqoridagi misol o'rtasidagi asosiy farq shundaki, real funktsiyalar foydalanuvchi bilan o'zaro aloqada oddiy `confirm` dan ko'ra murakkab usullardan foydalanadi. Brauzerda bunday funktsiya odatda chiroyli ko'rinadigan savollar oynasini chiqaradi. Ammo bu boshqa voqea.

**`ask` argumentlari *qayta chaqirish funktsiyalari* yoki shunchaki *qayta chaqirish* deb nomlanadi.**

G'oya shundan iboratki, biz funktsiyani bajaramiz va agar kerak bo'lsa, uni keyinroq "qayta chaqirilgan" deb oylaymiz. Bizning holatimizda `showOk` "ha" javobi uchun, "yo'q" javobi uchun `showCancel` qayta chaqirish bo'ladi.
=======
In practice, such functions are quite useful. The major difference between a real-life `ask` and the example above is that real-life functions use more complex ways to interact with the user than a simple `confirm`. In the browser, such function usually draws a nice-looking question window. But that's another story.

**The arguments `showOk` and `showCancel` of `ask` are called *callback functions* or just *callbacks*.**

The idea is that we pass a function and expect it to be "called back" later if necessary. In our case, `showOk` becomes the callback for "yes" answer, and `showCancel` for "no" answer.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/16-function-expressions/article.md

Xuddi shu funktsiyani ancha qisqa yozish uchun biz funktsiya ifodalaridan foydalanishimiz mumkin:

```js run no-beautify
function ask(savol, ha, yoq) {
  if (confirm(savol)) ha()
  else yoq();
}

*!*
ask(
  "Rozimisiz?",
  function() { alert("Rozisiz."); },
  function() { alert("Siz ijroni bekor qildingiz."); }
);
*/!*
```

<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions-arrows/article.md

Bu yerda funktsiyalar to'g'ridan-to'g'ri `ask(...)` chaqiruvi ichida e'lon qilinadi. Ularning ismlari yo'q va shuning uchun *anonim* deb nomlanadi. Bunday funktsiyalarga `ask` dan tashqarida kirish mumkin emas (chunki ular o'zgaruvchanlarga biriktirilmagan), ammo bu biz xohlagan narsadir.
=======
Here, functions are declared right inside the `ask(...)` call. They have no name, and so are called *anonymous*. Such functions are not accessible outside of `ask` (because they are not assigned to variables), but that's just what we want here.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/16-function-expressions/article.md

Bunday kod bizning skriptlarimizda tabiiy ravishda paydo bo'ladi, bu JavaScript ruhida.

<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions-arrows/article.md

```smart header="Funktsiya - bu \"harakat\" ni ifodalovchi qiymat"
Matnlar yoki raqamlar kabi muntazam qiymatlar *ma'lumotlarni* ifodalaydi.
=======
```smart header="A function is a value representing an \"action\""
Regular values like strings or numbers represent the *data*.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/16-function-expressions/article.md

Funktsiyani *harakat* sifatida qabul qilish mumkin.

Uni o'zgaruvchanlar orasidaga qo'yib, istagan paytda ishga tushirishimiz mumkin.
```


## Funktsiya ifodasi va funktsiya deklaratsiyasi

Funktsiya deklaratsiyalari va ifodalar o'rtasidagi asosiy farqlarni shakllantiraylik.

<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions-arrows/article.md
Birinchidan, sintaksis: kod qanday ko'rinishag ega.
=======
First, the syntax: how to differentiate between them in the code.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/16-function-expressions/article.md

- *Funktsiya deklaratsiyasi:* asosiy kod oqimida alohida ifoda sifatida e'lon qilingan funktsiya.

    ```js
    // Funktsiya deklaratsiyasi
    function sum(a, b) {
      return a + b;
    }
    ```
<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions-arrows/article.md
- *Funktsiya ifodasi:* ifoda ichida yoki boshqa sintaksis tarkibida yaratilgan funktsiya. Bu erda funktsiya "tayinlash ifodasi" ning `=` 'o'ng tomonida yaratilgan:
    
=======
- *Function Expression:* a function, created inside an expression or inside another syntax construct. Here, the function is created at the right side of the "assignment expression" `=`:

>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/16-function-expressions/article.md
    ```js
    // Funktsiya ifodasi
    let sum = function(a, b) {
      return a + b;
    };
    ```

Yanada nozikroq farqi *qachonki* JavaScript interpretatori funktsiyani yaratganda ko'rinadi.

<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions-arrows/article.md
**Funktsiya ifodasi ijro etilgandan so'ng yaratiladi va shu vaqtdan boshlab foydalanishga yaroqlidir.**
=======
**A Function Expression is created when the execution reaches it and is usable only from that moment.**
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/16-function-expressions/article.md

Bajarilish oqimi topshiriqning o'ng tomoniga o'tgandan so'ng `let sum = function...` -- funksiya yaratiladi va ishlatilishi mumkin (tayinlanishi, chaqirilishi va hokazo. ) bundan buyon.

Funktsiya deklaratsiyalari boshqacha.

<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions-arrows/article.md
**Funktsiya deklaratsiyasi butun skript/kod blokida ishlatilishi mumkin.**

Boshqacha qilib aytganda, JavaScript skript yoki kod blokini ishga tushirishga *tayyorlanganda*, avval uni funktsiya deklaratsiyasini qidiradi va funktsiyalarni yaratadi. Buni "boshlang'ich bosqich" deb hisoblashimiz mumkin.

Va barcha funktsiyalar deklaratsiyalari ko'rib chiqilgandan so'ng, ijro davom etadi.

Natijada, funktsiya deklaratsiyasi sifatida e'lon qilingan funktsiyani belgilanganidan oldinroq chaqirish mumkin.
=======
**A Function Declaration can be called earlier than it is defined.**

For example, a global Function Declaration is visible in the whole script, no matter where it is.

That's due to internal algorithms. When JavaScript prepares to run the script, it first looks for global Function Declarations in it and creates the functions. We can think of it as an "initialization stage".

And after all Function Declarations are processed, the code is executed. So it has access to these functions.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/16-function-expressions/article.md

Masalan, bu ishlaydi:

```js run refresh untrusted
*!*
sayHi("John"); // Salom, John
*/!*

function sayHi(name) {
  alert( `Salom, ${name}` );
}
```

`sayHi` funktsiya deklaratsiyasi JavaScript skriptni ishga tushirishga tayyorlanayotganda yaratiladi va uning hamma joyda ko'rinadi.

<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions-arrows/article.md
...Agar bu funktsiya ifodasi bo'lsa, u ishlamaydi:
=======
...If it were a Function Expression, then it wouldn't work:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/16-function-expressions/article.md

```js run refresh untrusted
*!*
sayHi("John"); // xato!
*/!*

let sayHi = function(name) {  // (*) endi sehr yo'q
  alert( `Hello, ${name}` );
};
```

Funktsiya ifodalarining ijro etilishi ularga yetganda hosil bo'ladi. Bu faqat `(*)` satrida sodir bo'ladi. Juda kech.

<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions-arrows/article.md
**Kod blokining ichida funktsiyalar deklaratsiyasi tuzilganda, u blokning hamma joylarida ko'rinadi. Ammo uning tashqarisida emas.**

Ba'zan ichki funktsiyani faqat o'sha blokda ishlatish uchun e'lon qilish qulay. Ammo bu xususiyat ham muammolarni keltirib chiqarishi mumkin.
=======
Another special feature of Function Declarations is their block scope.

**In strict mode, when a Function Declaration is within a code block, it's visible everywhere inside that block. But not outside of it.**
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/16-function-expressions/article.md

Masalan, ish paytida olinadigan `age` o'zgaruvchanga qarab `welcome()` funktsiyasini yaratishimiz kerakligini tasavvur qilaylik. Vaqt o'tgach foydalanishni rejalashtirmoqdamiz.

<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions-arrows/article.md
Quyidagi kod ishlamaydi:
=======
If we use Function Declaration, it won't work as intended:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/16-function-expressions/article.md

```js run
let age = prompt("Yoshingiz nechida?", 18);

// funktsiyani shartli ravishda e'lon qilish
if (age < 18) {

  function welcome() {
    alert("Salom!");
  }

} else {

  function welcome() {
    alert("Assalomu aleykum!");
  }

}

// ...keyinroq foydalanish
*!*
welcome(); // Xato: welcome belgilanmagan
*/!*
```

Funktsiya deklaratsiyasi faqat u joylashgan kod blokining ichida ko'rinadi.

Mana yana bir misol:

```js run
let age = 16; // misol sifatida 16 ni oling

if (age < 18) {
*!*
  welcome();               // \   (ishlaydi)
*/!*
                           //  |
  function welcome() {     //  |  
    alert("Salom!");       //  |  Funktsiya deklaratsiyasi e'lon qilingan blokning 
  }                        //  |  hamma joyida mavjud
                           //  |
*!*
  welcome();               // /   (ishlaydi)
*/!*

} else {

<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions-arrows/article.md
  function welcome() {     //  age = 16 uchun bu "welcome" hech qachon yaratilmaydi
    alert("Assalomu aleykum!");
=======
  function welcome() {    
    alert("Greetings!");
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/16-function-expressions/article.md
  }
}

// Bu erda biz jingalak qavslardan chiqib qoldik,
// shuning uchun ularning ichida qilingan funktsiya deklaratsiyalarini ko'ra olmaymiz.

*!*
welcome(); // Xato: welcome belgilanmagan
*/!*
```

`welcome` ni `if` dan tashqarida ko'rinadigan qilish uchun nima qilishimiz kerak?

To'g'ri yondashuv funktsiya ifodasini ishlatish va `if` dan tashqarida e'lon qilingan va mos keladigan ko'rinishga ega o'zgaruvchanga `welcome` ni tayinlash dir.

<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions-arrows/article.md
Endi u maqsadga muvofiq ishlaydi:
=======
This code works as intended:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/16-function-expressions/article.md

```js run
let age = prompt("Yoshingiz nechida?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("Salom!");
  };

} else {

  welcome = function() {
    alert("Assalomu aleykum!");
  };

}

*!*
welcome(); // endi ishlaydi
*/!*
```

Yoki savol belgisi operatori `?` yordamida uni yanada soddalashtira olamiz:

```js run
let age = prompt("Yoshingiz nechida?", 18);

let welcome = (age < 18) ?
  function() { alert("Salom!"); } :
  function() { alert("Assalomu aleykum!"); };

*!*
welcome(); // endi ishlaydi
*/!*
```


<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions-arrows/article.md
```smart header="Funktsiya deklaratsiyasi va funktsiya ifodasini qachon tanlashingiz kerak?"
Qoida tariqasida, funktsiyani e'lon qilishimiz kerak bo'lganida, birinchi bo'lib biz ilgari foydalangan funktsiya deklaratsiyasi sintaksisini ishlatishimiz kerak. Bu bizning kodimizni qanday tashkil qilishda ko'proq erkinlik beradi, chunki biz bunday funktsiyalarni e'lon qilinishidan oldin chaqirishimiz mumkin.

Kodda `f(...) {…}` funktsiyasini izlash `f = function(...) {…}` ga qaraganda biroz osonroq. Funktsiya deklaratsiyalari ko'proq "ko'zga-yuqumli".

...Agar biron bir sababga ko'ra funktsiyalar deklaratsiyasi bizga mos kelmasa (biz yuqorida bir misolni ko'rdik), unda funktsiyalar ifodasidan foydalanish kerak.
```


## O'q funktsiyalari [#arrow-functions]

Funktsiyalarni yaratish uchun yana bitta sodda va ixcham sintaksis mavjud, bu ko'pincha funktsiya ifodalaridan yaxshiroqdir. U "o'q funktsiyalari" deb nomlanadi, chunki u quyidagicha ko'rinadi:


```js
let func = (arg1, arg2, ...argN) => ifoda
```

...Bu `arg1..argN` argumentlariga ega bo'lgan `func` funktsiyasini yaratadi, `ifodani` o'ng tomonda baholaydi va natijasini qaytaradi.

Boshqacha qilib aytganda, bu taxminan bir xil:

```js
let func = function(arg1, arg2, ...argN) {
  return ifoda;
};
```

...Ammo juda ham ixchamroq.

Keling, bir misolni ko'rib chiqaylik:

```js run
let sum = (a, b) => a + b;

/* O'q funktsiyasi quyidagini qisqartirilgan shakli:

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3

```

Agar bizda faqat bitta argument bo'lsa, unda qavslarni olib tashlash mumkin, bu esa uni yanada qisqartiradi:

```js run
// bir xil
// let double = function(n) { return n * 2 }
*!*
let double = n => n * 2;
*/!*

alert( double(3) ); // 6
```

Agar argumentlar bo'lmasa, qavslar bo'sh bo'lishi kerak (lekin mavjud bo'lishi kerak):

```js run
let sayHi = () => alert("Salom!");

sayHi();
```

O'q funktsiyalaridan funktsiya ifodalari kabi foydalanish mumkin.

Masalan, `welcome()` bilan qayta yozilgan misol:

```js run
let age = prompt("Yoshingiz nechida?", 18);

let welcome = (age < 18) ?
  () => alert('Salom') :
  () => alert("Assalomu aleykum!");

welcome(); // endi ishlaydi
```

O'q funktsiyalari noma'lum bo'lib ko'rinishi va unchalik o'qib bo'lmaydigan ko'rinishi mumkin, ammo ko'zlar tuzilishga odatlanib qolganda, bu tezda o'zgaradi.

Ular juda ko'p so'zlarni yozishga dangasa bo'lganimizda, oddiy bir satrli harakatlar uchun juda qulaydir.

```smart header="Ko'p satrli o'q funktsiyalari"

Yuqoridagi misollarda `=>` ning chap qismidan argumentlarni olinadi va ular bilan o'ng tomonda ifoda baholanadi.

Ba'zan bizga bir nechta iboralar yoki bayonotlar kabi biroz murakkabroq narsa kerak bo'ladi. Bu ham mumkin, lekin biz ularni jingalak qavslarga solib qo'yishimiz kerak. Keyin ular ichida normal `return` dan foydalanishimiz kerak.

Shunga o'xshash:

```js run
let sum = (a, b) => {  // jingalak qavs ko'p satrli funktsiyani ochadi
  let result = a + b;
*!*
  return result; // agar biz jingalak qavslardan foydalansak, natijaga erishish uchun return-dan foydalaning
*/!*
};
=======
```smart header="When to choose Function Declaration versus Function Expression?"
As a rule of thumb, when we need to declare a function, the first to consider is Function Declaration syntax. It gives more freedom in how to organize our code, because we can call such functions before they are declared.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/16-function-expressions/article.md

That's also better for readability, as it's easier to look up `function f(…) {…}` in the code than `let f = function(…) {…};`. Function Declarations are more "eye-catching".

<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions-arrows/article.md
```smart header="Yanada ko'proq"
Bu erda biz o'q funktsiyalarini qisqalik uchun maqtadik. Ammo bu hammasi emas! O'q funktsiyalari boshqa qiziqarli xususiyatlarga ega. Keyinchalik ularga <info:arrow-functions> bobida qaytamiz.

Hozircha biz ularni bir qatorli harakatlar va qayta chaqirish uchun ishlatamiz.
=======
...But if a Function Declaration does not suit us for some reason, or we need a conditional declaration (we've just seen an example), then Function Expression should be used.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/16-function-expressions/article.md
```

## Xulosa

- Funktsiyalar qiymatlardir. Ular kodning istalgan joyiga tayinlanishi, nusxalanishi yoki e'lon qilinishi mumkin.
- Agar funktsiya asosiy kod oqimida alohida ifoda sifatida e'lon qilinsa, bu "Funktsiya Deklaratsiyasi" deb nomlanadi.
- Agar funktsiya ifodaning bir qismi sifatida yaratilgan bo'lsa, u "Funktsiya ifodasi" deb nomlanadi.
- Funktsiya deklaratsiyalari kod bloki bajarilishidan oldin qayta ishlanadi. Ular blokning hamma joylarida ko'rinadi.
- Funktsiya iboralari ijro etish oqimi ularga yetganda hosil bo'ladi.

<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions-arrows/article.md

Ko'pgina hollarda, biz funktsiyalarni e'lon qilishimiz kerak bo'lganda, funktsiyalar deklaratsiyasi afzalroqdir, chunki u deklaratsiyadan oldin ko'rinadi. Bu bizga kodni tashkil qilishda ko'proq moslashuvchanlikni beradi va odatda o'qilishi osonroq.

Shuning uchun biz funktsiya ifodasini faqat funktsiya deklaratsiyasi vazifaga mos kelmasa ishlatishimiz kerak. Biz ushbu bobda bunga bir nechta misollarni ko'rdik va kelajakda yana ko'p misollarni ko'rasiz.

O'q funktsiyalari bitta satrli ifoda uchun qulaydir. Ular ikkita turga ega:

1. Jingalak qavslarsiz: `(...args) => ifoda` -- o'ng tomondagi ifoda: funktsiya uni baholaydi va natijani qaytaradi.
2. Jingalak qavslar bilan: `(...args) => {kod tanasi}` -- qavslar funktsiya ichida bir nechta ifodalarni yozishimizga imkon beradi, ammo biron bir narsani qaytarish uchun `return` kerak bo'ladi.
=======
In most cases when we need to declare a function, a Function Declaration is preferable, because it is visible prior to the declaration itself. That gives us more flexibility in code organization, and is usually more readable.

So we should use a Function Expression only when a Function Declaration is not fit for the task. We've seen a couple of examples of that in this chapter, and will see more in the future.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/16-function-expressions/article.md
