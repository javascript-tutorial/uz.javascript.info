# O'zgaruvchanlar

Ko'pincha, JavaScript dasturi ma'lumot bilan ishlashi kerak. Mana ikkita misol:
1. Onlayn do'kon -- ma'lumot tovarlar sotilgan va xarid qilingan savatni o'z ichiga olishi mumkin.
2. Chat dasturi -- ma'lumot foydalanuvchilar, xabarlar va boshqa ko'p narsalarni o'z ichiga olishi mumkin.

O'zgaruvchanlar bu ma'lumotlarni saqlash uchun ishlatiladi.

## O'zgaruvchanlar

[O'zgaruvchan](https://en.wikipedia.org/wiki/Variable_(computer_science)) bu ma'lumotlar uchun "nomlangan saqlash qutusi". Tovarlar, tashrif buyuruvchilar va boshqa ma'lumotlarni saqlash uchun biz o'zgaruvchanlardan foydalanishimiz mumkin.

JavaScript da o'zgaruvchani yaratish uchun `let` kalit so'zidan foydalaning.

<<<<<<< HEAD
Quyidagi ifoda "xabar" nomli o'zgaruvchini yaratadi (boshqacha aytganda: *e'lon qiladi* yoki *belgilaydi*):
=======
The statement below creates (in other words: *declares*) a variable with the name "message":
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
let message;
```

Endi `=` tayinlash operatori yordamida unga ba'zi ma'lumotlarni kiritishimiz mumkin:

```js
let message;

*!*
<<<<<<< HEAD
message = 'Hello'; // matni saqlash
=======
message = 'Hello'; // store the string 'Hello' in the variable named message
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
*/!*
```

Matn endi o'zgaruvchanga bog'landi va xotira maydoniga saqlandi. Uning qiymatini o’qish uchun o’zgaruvchan nomini ishlatshimiz lozim:

```js run
let message;
message = 'Hello!'; // message ingliz tilidan xabarni bildiradi

*!*
alert(message); // o'zgaruvchan tarkibini ko'rsatadi
*/!*
```

Qisqa bo'lishi uchun, biz o'zgaruvchani e'lon qilish va tayinlashni bitta satrga birlashtira olamiz:

```js run
let message = 'Hello!'; // o'zgaruvchani aniqlang va qiymatni belgilang

alert(message); // Hello!
```

Bir astrda bir nechta o'zgaruvchanlarni e'lon qilishimiz mumkin:

```js no-beautify
let user = 'John', age = 25, message = 'Hello';
```

Bu qisqaroq ko'rinishi mumkin, ammo biz buni tavsiya qilmaymiz. Kodingiz yaxshi o'qilishi uchun har bir o'zgaruvchanga bitta satrdan foydalaning.

Ko'p satrli variant biroz uzunroq, ammo o'qish osonroq:

```js
let user = 'John';
let age = 25;
let message = 'Hello';
```

<<<<<<< HEAD
Ba'zi odamlar ushbu ko'p satrli uslubda bir nechta o'zgaruvchani e'lon qiladilar:

=======
Some people also define multiple variables in this multiline style:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js no-beautify
let user = 'John',
  age = 25,
  message = 'Hello';
```

...Yoki "vergul-birinchi" tarzida:

```js no-beautify
let user = 'John'
  , age = 25
  , message = 'Hello';
```

Texnik jihatdan, barcha bu varyantlar bir xil narsani bildiradi. Demak, bu shaxsiy did va estetika masalasidir.

````smart header="`var` instead of `let`"
Eski skriptlarda siz yana bitta kalit so'zni uchratishingiz mumkin: `let` o'rniga `var`:

```js
*!*var*/!* message = 'Hello';
```

<<<<<<< HEAD
`Var` kalit so'zi *deyarli* `let` bilan bir xil. Shuningdek, u o'zgaruvchani e'lon qiladi, ammo biroz boshqacha, "eski uslub" da.

`let` va `var` o'rtasida ozgina farqlar mavjud, ammo ular biz uchun hali muhim emas. Biz ularni <info:var> bobda batafsil ko'rib chiqamiz
=======
The `var` keyword is *almost* the same as `let`. It also declares a variable but in a slightly different, "old-school" way.

There are subtle differences between `let` and `var`, but they do not matter to us yet. We'll cover them in detail in the chapter <info:var>.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
````

## Haqiqiy hayotdagi o'xshashlik

Agar biz uni ma'lumotlar uchun "quti" deb tasavvur qilsak, "o'zgaruvchan" tushunchasini osongina tushunishimiz mumkin.

Misol uchun, o'zgaruvchan `message` `"message"` etiketli `"Salom!"` qiymati bilan quti sifatida tasavvur qilinishi mumkin:

<<<<<<< HEAD
=======
For instance, the variable `message` can be imagined as a box labelled `"message"` with the value `"Hello!"` in it:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

![](variable.svg)

Biz qutiga har qanday qiymatini qo'yish mumkin.

<<<<<<< HEAD
Uni istagancha o'zgartirishimiz ham mumkin:
=======
We can also change it as many times as we want:

>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```js run
let message;

message = 'Hello!';

message = 'World!'; // qiymati o'zgardi

alert(message);
```

Qiymat o'zgartirilganda, eski ma'lumotlar o'zgaruvchandan o'chiriladi:

![](variable-change.svg)

Shuningdek, biz ikkita o'zgaruvchani e'lon qilishimiz va ma'lumotlarni ikkinchisiga nusxalashimiz mumkin.

```js run
let hello = 'Hello world!';

let message;

*!*
// 'Hello world!' ni hello o'zgaruvchandan message o'zgaruvchanga nusxalash
message = hello;
*/!*

// endi ikkita o'zgaruvchan bir xil ma'lumotga ega
alert(hello); // Hello world!
alert(message); // Hello world!
```

<<<<<<< HEAD
```smart header="Funktsional tillar"
[Scala](http://www.scala-lang.org/) yoki [Erlang](http://www.erlang.org/) kabi [funktsional](https://en.wikipedia.org/wiki/Functional_programming) dasturlash tillari mavjudligini ta'kidlash qiziq. Ular o'zgaruvchan qiymatlarini o'zgartirishni taqiqlaydi.
=======
````warn header="Declaring twice triggers an error"
A variable should be declared only once.

A repeated declaration of the same variable is an error:

```js run
let message = "This";

// repeated 'let' leads to an error
let message = "That"; // SyntaxError: 'message' has already been declared
```
So, we should declare a variable once and then refer to it without `let`.
````

```smart header="Functional languages"
<<<<<<< HEAD
It's interesting to note that there exist [functional](https://en.wikipedia.org/wiki/Functional_programming) programming languages, like [Scala](http://www.scala-lang.org/) or [Erlang](http://www.erlang.org/) that forbid changing variable values.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
It's interesting to note that there exist so-called [pure functional](https://en.wikipedia.org/wiki/Purely_functional_programming) programming languages, such as [Haskell](https://en.wikipedia.org/wiki/Haskell), that forbid changing variable values.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Bunday tillarda qiymat "qutiga" saqlangandan so'ng, u abadiy mavjud. Agar biz boshqa narsalarni saqlashimiz kerak bo'lsa, til bizni yangi quti yaratishga majbur qiladi (yangi o'zgaruvchini e'lon qiling). Biz eskisini qayta ishlata ololmaymiz.

<<<<<<< HEAD
Bir qarashda biroz g'alati tuyulishi mumkin bo'lsa ham, bu tillar jiddiy rivojlanishga qodir. Bundan tashqari, bu cheklash ma'lum foyda keltiradigan parallel hisoblash kabi sohalar mavjud. Bunday tilni o'rganish (yaqinda siz undan foydalanishni rejalashtirmagan bo'lsangiz ham) aqlni kengaytirish uchun tavsiya etiladi.
=======
Though it may seem a little odd at first sight, these languages are quite capable of serious development. More than that, there are areas like parallel computations where this limitation confers certain benefits.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```

## O'zgaruvchani nomlash

JavaScript da o'zgaruvchanning nomlash uchun ikkita cheklov mavjud:

1. Nomda faqat harflar, raqamlar yoki ramzlar bo'lishi kerak `$`va `_`.
2. Birinchi belgi raqam bo'lmasligi kerak.

Amal nomlar misollari:

```js
let userName;
let test123;
```

Nom bir nechta so'zlardan iborat bo'lsa, odatda [tuya registri](https://en.wikipedia.org/wiki/CamelCase) ishlatiladi. Ya'ni: so'zlar birin-ketin ketadi, har bir so'z birinchi bosh harf bilan boshlanadi, birinch so'zdan itashqari: "meningJudaUzunNomim".

Qizig'i shundaki, `'$'` dollar belgisi va `'_'` pastki chiziq ham nomlarda ishlatilishi mumkin. Ular odatiy belgilar, xuddi harflar singari, hech qanday maxsus ma'noga ega emaslar.

Ushbu nomlar mumkin:

```js run untrusted
let $ = 1; // "$" nomi bilan o'zgaruvchan e'lon qildindi
let _ = 2; // Va endi "_" nomi bilan o'zgaruvchan e'lon qildindi

alert($ + _); // 3
```

Examples of incorrect variable names:
Noto'g'ri nomlangan o'zgaruvchanlarga misollar:

```js no-beautify
let 1a; // raqam bilan boshlanish mumkin emas

let my-name; // defisni '-' nomlashda ishlatish mumkin emas
```

<<<<<<< HEAD
```smart header="Registr muhim"
`apple` va` AppLE` nomli o'zgaruvchanlar ikki xil o'zgaruvchandir.
=======
```smart header="Case matters"
Variables named `apple` and `APPLE` are two different variables.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```

<<<<<<< HEAD
````smart header="Lotin bo'lmagan harflarga ruxsat beriladi, ammo tavsiya etilmaydi"
Bu kabi har qanday tilni, shu jumladan kirill harflarini yoki hatto ierogliflarni ishlatish mumkin:
=======
````smart header="Non-Latin letters are allowed, but not recommended"
<<<<<<< HEAD
It is possible to use any language, including cyrillic letters or even hieroglyphs, like this:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
It is possible to use any language, including Cyrillic letters, Chinese logograms and so on, like this:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js
let имя = '...';
let 我 = '...';
```

<<<<<<< HEAD
<<<<<<< HEAD
Texnik jihatdan, bu erda hech qanday xato yo'q, bunday nomlarga ruxsat berilgan, ammo o'zgaruvchan nomlarda ingliz tilidan foydalanish bo'yicha xalqaro an'ana mavjud. Kichik skript yozayotgan bo'lsak ham, uni uzoq umr kutishi mumkin. Boshqa mamlakatlardan kelgan odamlar uni o'qishlari kerak bo'lishi mumkin.
=======
Technically, there is no error here. Such names are allowed, but there is an international convention to use English in variable names. Even if we're writing a small script, it may have a long life ahead. People from other countries may need to read it some time.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
Technically, there is no error here. Such names are allowed, but there is an international convention to use English in variable names. Even if we're writing a small script, it may have a long life ahead. People from other countries may need to read it sometime.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
````

````warn header="Himoyalangan ismlar"
[Himoyalangan so'zlar ro'yxati](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords) mavjud, ular Javascriptning o'zi tomonidan ishlatiladi, shuning uchun ularning o'zgaruvchan nomlari sifatida foydalanish mumkin emas.

Masalan: `let`, `class`, `return` va `function` himoyalangan

Quyidagi kod sintaksis xato chiqaradi:

```js run no-beautify
let let = 5; // "let" deb o'zgaruvchani nomlash mumkin emas, hato!
let return = 5; // shuningdek "return" deb o'zgaruvchani nomlash mumkin emas, hato!
```
````

````warn header="`qat'iy rejim` siz ifoda"

Odatda, biz uni ishlatishdan oldin o'zgaruvchani aniqlashimiz kerak. Ammo qadimgi davrlarda texnik qiymatni "let" dan foydalanmasdan faqat qiymatni belgilash orqali yaratish mumkin edi. Agar biz eski skriptlar bilan moslikni saqlab qolish uchun skriptlarimizga `use strict` qo'ymasak, bu hali ham ishlaydi.

```js run no-strict
// eslatma: ushbu misolda "qat'iy rejim" yo'q

num = 5; // agar mavjud bo'lmasa "num" o'zgaruvchan yaratiladi

alert(num); // 5
```

Bu yomon amaliyot va qat'iy rejimda xatolikka olib kelishi mumkin:

```js
"use strict";

*!*
num = 5; // xato: num belgilangan emas
*/!*
```
````

## Konstantalar

Doimiy(o'zgarmas) o'zgaruvchani e'lon qilish uchun `let` o'rniga `const` dan foydalaning:

```js
const myBirthday = '18.04.1982';
```

<<<<<<< HEAD
`Const` yordamida e'lon qilingan o'zgaruvchanlar "konstantalar" deyiladi. Ularni o'zgartirib bo'lmaydi. Bunga urinish xatolikka olib keladi:
=======
Variables declared using `const` are called "constants". They cannot be reassigned. An attempt to do so would cause an error:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
const myBirthday = '18.04.1982';

myBirthday = '01.01.2001'; // xato, konstantani qayta tayinlab bo'lmaydi!
```

<<<<<<< HEAD
Agar dasturchi o'zgaruvchining hech qachon o'zgarmasligiga ishonch hosil qilsa, bu haqiqatni har kimga kafolatlash va aniq etkazish uchun uni `const` bilan e'lon qilishlari mumkin.

=======
When a programmer is sure that a variable will never change, they can declare it with `const` to guarantee and communicate that fact to everyone.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

### Tepa registr konstantalar

<<<<<<< HEAD
Amalga oshirilishidan oldin eslab qolishi qiyin bo'lgan qiymatlar uchun konstantani taxallus sifatida ishlatish amaliyoti keng tarqalgan.
=======
There is a widespread practice to use constants as aliases for difficult-to-remember values that are known before execution.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Bunday doimiylar tepa registr va pastki chiziqlar yordamida nomlanadi.

<<<<<<< HEAD
Masalan, "veb"(o'n oltinchi) formatidagi ranglar uchun konstantalarni yarataylik:
=======
For instance, let's make constants for colors in so-called "web" (hexadecimal) format:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// ...rang tanlashimiz kerak bo'lganda
let color = COLOR_ORANGE;
alert(color); // #FF7F00
```

Foydalar:

- `COLOR_ORANGE` ni eslash `"#FF7F00"` dan ko'ra osonroq.
- `COLOR_ORANGE` dan ko'ra `"#FF7F00"` ni noto'g'ri yozish osonroq.
- Kodni o'qiyotganda, `COLOR_ORANGE` `"#FF7F00"` ga qaraganda ancha mazmunli bo'ladi.

Qachon biz konstantalarga tepa registrdan foydalanishimiz kerak va uni qachon normal nomlashimiz kerak? Keling, buni aniq bilib olamiz.

<<<<<<< HEAD
"Konstanta" shunchaki o'zgaruvchanning qiymati hech qachon o'zgarmasligini anglatadi. Ammo bajarilishidan oldin ma'lum bo'lgan konstantalar mavjud (masalan, qizil uchun o'n oltinchi qiymat) va bajarilish vaqtida *hisoblab chiqilgan*, lekin dastlabki tayinlangandan keyin o'zgarmaydigan konstantalar mavjud.

Misol uchun:
=======
Being a "constant" just means that a variable's value never changes. But some constants are known before execution (like a hexadecimal value for red) and some constants are *calculated* in run-time, during the execution, but do not change after their initial assignment.

For instance:

>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```js
const pageLoadTime = /* yuklash uchun veb-sahifa tomonidan olingan vaqt */;
```

<<<<<<< HEAD
`pageLoadTime` o'zgaruvchanning qiymati sahifa yuklanishidan oldin ma'lum emas, shuning uchun u odatdagidek nomlanadi. Ammo bu hali ham konstanta, chunki tayinlanganidan keyin u o'zgarmaydi.

Boshqacha qilib aytganda, tepa registr bilan nomlangan konstantalar faqat "qattiq kodlangan" qiymatlar uchun taxallus sifatida ishlatiladi.
=======
The value of `pageLoadTime` is not known before the page load, so it's named normally. But it's still a constant because it doesn't change after the assignment.

In other words, capital-named constants are only used as aliases for "hard-coded" values.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

## O'zgaruvchanlarni to'g'ri nomlang

O'zgaruvchanlar haqida gapirganda, yana bir muhim narsa bor.

<<<<<<< HEAD
O'zgaruvchanning ismi toza, aniq ma'noga ega, saqlanadigan ma'lumotlarni tasvirlaydigon bo'lishi kerak.
=======
A variable name should have a clean, obvious meaning, describing the data that it stores.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

<<<<<<< HEAD
O'zgaruvchanning nomlash dasturlashning eng muhim va murakkab ko'nikmalaridan biridir. O'zgaruvchan nomlarga qarab, tajribali dasturchi yoki boshlang'ich tomonidan kod yozilganligini aniqlashi mumkin.

Haqiqiy loyihada ko'p vaqt noldan butunlay alohida narsa yozishdan ko'ra, mavjud kod bazasini o'zgartirish va kengaytirishga sarflanadi. Biroz vaqtdan so'ng, ba'zi bir kodlarga qaytsak, yaxshi belgilangan ma'lumotlarni topish ancha osonroq. Yoki, boshqacha qilib aytganda, o'zgaruvchanlar yaxshi nomlarga ega bo'lganda.
=======
Variable naming is one of the most important and complex skills in programming. A glance at variable names can reveal which code was written by a beginner versus an experienced developer.

In a real project, most of the time is spent modifying and extending an existing code base rather than writing something completely separate from scratch. When we return to some code after doing something else for a while, it's much easier to find information that is well-labelled. Or, in other words, when the variables have good names.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Iltimos, o'zgaruvchani e'lon qilishdan oldin uning to'g'ri nomi haqida o'ylab ko'ring. Shunday qiling va sizga mukofot beriladi.

Ba'zi amal qilish kerak bolgan qoidalar:

<<<<<<< HEAD
- `userName` yoki `shoppingCart` kabi odamlar tomonidan o'qiladigan nomlardan foydalaning.
- `a`, `b`, `c` kabi qisqartmalar yoki qisqa nomlardan uzoq turing, agar chindan ham nima qilayotganingizni bilmasangiz.
- Nomlarni maksimal darajada tavsiflovchi va ixcham qiling. Yomon nomlarga misollar `ma'lumotlar` va `qiymat`. Bunday nomlar hech narsa bildirmaydi. Agar kodning konteksti o'zgaruvchanning qaysi ma'lumotlarga yoki qiymatga murojaat qilayotganini juda aniq ko'rsatadigan bo'lsa, ulardan foydalanish yaxshi bo'ladi.
- Jamoangiz ichidagi va o'zingizning fikringizdagi shartlar to'g'risida kelishib oling. Agar saytga tashrif buyuruvchi "user" deb nomlangan bo'lsa, biz `currentVisitor` yoki `newManInTown` o'rniga `currentUser` yoki `newUser` deb nomlashimiz kerak.
=======
- Use human-readable names like `userName` or `shoppingCart`.
- Stay away from abbreviations or short names like `a`, `b`, and `c`, unless you know what you're doing.
- Make names maximally descriptive and concise. Examples of bad names are `data` and `value`. Such names say nothing. It's only okay to use them if the context of the code makes it exceptionally obvious which data or value the variable is referencing.
- Agree on terms within your team and in your mind. If a site visitor is called a "user" then we should name related variables `currentUser` or `newUser` instead of `currentVisitor` or `newManInTown`.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Oson eshitiladimi? Haqiqatan ham shunday, ammo amalda tavsiflovchi va ixcham o'zgaruvchan nomlarni yaratish unday oson emas. Olg'a.

```smart header="Qayta ishlash yoki yaratish?"
Va oxirgi eslatma. Ba'zi dangasa dasturchilar bor, ular yangi o'zgaruvchanlarni e'lon qilish o'rniga, mavjudlarini qayta ishlatishga moyildirlar.

Natijada, ularning o'zgaruvchanlari qutilarga o'xshaydi, odamlar stikerlarini o'zgartirmasdan har xil narsalarni tashlaydilar. Endi qutining ichida nima bor? Kim biladi? Bilish uchun yaqinroq kelib tekshirishimiz kerak.

Bunday dasturchilar o'zgaruvchan deklaratsiyadan ozgina vaqt tejashadi, ammo debagginga(dastur kodidagi xatolarni tuzatish) o'n baravar ko'proq vaqt yo'qotadilar.

Qo'shimcha o'zgaruvchan yaxshi, yomon emas.

Zamonaviy JavaScript minifikatorlari va brauzerlari kodni yetarlicha optimallashtiradi, shuning uchun ishlash muammolarini keltirib chiqarmaydi. Turli xil qiymatlar uchun turli xil o'zgaruvchanlardan foydalanish, hatto iterpretatorga kodingizni optimallashtirishga yordam beradi.
```

## Xulosa

Ma'lumotlarni saqlash uchun o'zgaruvchanlarni `var`, `let` yoki `const` kalit sozlar yordamida e'lon qilishimiz mumkin.

<<<<<<< HEAD
- 'let` -- zamonaviy o'zgaruvchan deklaratsiya hisoblanadi. Kod Chrome(V8) da `let` ni ishlatish uchun qat'iy rejimda bo'lishi kerak.
- `var` -- eskirgan o'zgaruvchan deklaratsiya hisoblanadi. Odatda, biz uni ishlatmaymiz, lekin biz `let` dan nozik farqlarni <info:var> bobda qamrab olamiz, agar sizga kerak bo'lsa.
- `const` -- `let` ga o'xshaydi, lekin o'zgaruvchanning qiymatini o'zgartirib bo'lmaydi.
=======
- `let` -- is a modern variable declaration.
- `var` -- is an old-school variable declaration. Normally we don't use it at all, but we'll cover subtle differences from `let` in the chapter <info:var>, just in case you need them.
- `const` -- is like `let`, but the value of the variable can't be changed.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

O'zgaruvchanlar ularni ichida nima borligini osongina tushunishga imkon beradigan tarzda nomlanishi kerak.
