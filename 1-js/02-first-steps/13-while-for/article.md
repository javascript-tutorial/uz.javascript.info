# Tsiklar: while va for

Biz kopincha harakatlarni takrorlashimiz kerak.

Masalan, ro'yxatdan qiymatlarni birin-ketin chiqarish yoki shunchaki 1 dan 10 gacha bo'lgan har bir raqam uchun bir xil kodni ishlatish.

*Tsikl* - bu bitta kodni bir necha marta takrorlash usuli.

<<<<<<< HEAD
## "while" tsikli
=======
```smart header="The for..of and for..in loops"
A small announcement for advanced readers.

This article covers only basic loops: `while`, `do..while` and `for(..;..;..)`.

If you came to this article searching for other types of loops, here are the pointers:

- See [for..in](info:object#forin) to loop over object properties.
- See [for..of](info:array#loops) and [iterables](info:iterable) for looping over arrays and iterable objects.

Otherwise, please read on.
```

## The "while" loop
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

`while` tsikli quyidagi sintaksisga ega:

```js
while (condition) {
  // kod
  // "tsikl tanasi" deb nomlanadi
}
```

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/article.md
`condition` `true` bo'lsa, tsikl tanasidan `kod` bajariladi.
=======
While the `condition` is truthy, the `code` from the loop body is executed.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/13-while-for/article.md

Masalan, pastdagi tsiklda `i`, `i < 3` bo'lsa ishlaydi:

```js run
let i = 0;
while (i < 3) { // 0, keyin 1, keyin 2 ni ko'rsatadi
  alert( i );
  i++;
}
```

Tsikl tanasining bitta bajarilishi *takrorlash* deb nomlanadi. Yuqori misoldagi tsikl uchta takrorlashni amalga oshiradi.

Agar yuqoridagi misolda `i++` yo'q bo'lsa, tsikl (nazariy jihatdan) abadiy takrorlanadi. Amalda, brauzer bunday tsikl to'xtatish usullarini taqdim etadi va JavaScript-ning server tomonida biz bu jarayonni to'xtatishimiz mumkin.

Har qanday ifoda yoki o'zgaruvchan faqat taqqoslash emas, balki tsikl sharti bo'lishi mumkin: shart baholanadi va `while` tomonidan mantiqiy shaklga aylantiriladi.

Masalan, `while(i! = 0)` ni yozishning qisqa usuli `while(i)`:

```js run
let i = 3;
*!*
while (i) { // agar i 0 ga aylansa, shart noto'g'ri bo'lib, tsikl to'xtaydi
*/!*
  alert( i );
  i--;
}
```

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/article.md
````smart header="Bir satrli ifoda uchun qavslar shart emas"
Agar tsikl tanasida bitta ifoda bo'lsa, biz qavslarni tashlab qo'yishimiz mumkin `{…}`:
=======
````smart header="Curly braces are not required for a single-line body"
If the loop body has a single statement, we can omit the curly braces `{…}`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/13-while-for/article.md

```js run
let i = 3;
*!*
while (i) alert(i--);
*/!*
```
````

## "Do.. while" tsikli

Tekshuruvni `do...while` sintaksisidan foydalanib, tsikl tanasi ostiga *pastga* ko'chirishimiz mumkin:

```js
do {
  // tsikl tanasi
} while (condition);
```

Dastlab, tsikl tanani bajaradi, so'ngra shartni tekshiradi va to'g'ri bo'lsa, uni qayta-qayta bajaradi.

Masalan:

```js run
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

Sintaksisning ushbu shakli faqat to'gri bolishidan qat'i nazar, tsikl tanasi **kamida bir marta** bajarilishini xohlaganingizda ishlatilishingiz mumkin. Odatda, boshqa shaklga afzallik beriladi: `while(…) {…}`.

## "For" tsikli

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/article.md
`For` tsikli eng ko'p ishlatiladigan tsikl hisoblanadi.
=======
The `for` loop is more complex, but it's also the most commonly used loop.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/13-while-for/article.md

Bu shunday ko'rinishga ega:

```js
for (boshlanishi; shart; qadam) {
  // ... tsikl tanasi ...
}
```

Keling, ushbu qismlarning ma'nosini misol orqali bilib olaylik. Quyidagi tsikl `alert(i)` `i` uchun `0` dan `3`(lekin shu jumladan emas) gacha ishlaydi:

```js run
for (let i = 0; i < 3; i++) { // 0, keyin 1, keyin 2 ni ko'rsatadi
  alert(i);
}
```

Keling, `for` ifodani qisma ko'rib chiqamiz:

| qism  |          |                                                                            |
|-------|----------|----------------------------------------------------------------------------|
<<<<<<< HEAD
<<<<<<< HEAD:1-js/02-first-steps/12-while-for/article.md
| boshlanishi | `i = 0`    | Tsikldan e'lon qilingandan keyin bir marta bajariladi.                                    |
| shart | `i < 3`| Har bir tsikl takrorlashdan oldin tekshiriladi. Agar yolg'on bo'lsa, tsikl to'xtaydi.  |
| qadam | `i++`      | Tananing har bir takrorlanishidan keyin, lekin shart tekshirilguncha bajariladi.
| tana | `alert(i)`| Shart to'g'ri bo'lsa, qayta-qayta ishlaydi.                        |


Umumiy tsikl algoritmi quyidagicha ishlaydi:
=======
| begin | `i = 0`    | Executes once upon entering the loop.                                      |
=======
| begin | `let i = 0`    | Executes once upon entering the loop.                                      |
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
| condition | `i < 3`| Checked before every loop iteration. If false, the loop stops.              |
| body | `alert(i)`| Runs again and again while the condition is truthy.                         |
| step| `i++`      | Executes after the body on each iteration. |

The general loop algorithm works like this:

>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/13-while-for/article.md
```
Run begin
→ (if shart → tanani bajar va qadamni bajar)
→ (if shart → tanani bajar va qadamni bajar)
→ (if shart → tanani bajar va qadamni bajar)
→ ...
```

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/article.md
Agar siz tsiklni boshlagan bo'lsangiz, bu misolga qaytib, uning qog'oz varag'iga qanday qilib bosqichma-bosqich ishlashini yozib olish tushunishga yordam beradi.
=======
That is, `begin` executes once, and then it iterates: after each `condition` test, `body` and `step` are executed.

If you are new to loops, it could help to go back to the example and reproduce how it runs step-by-step on a piece of paper.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/13-while-for/article.md

Bizning holatimizda aynan nima sodir bo'ladi:

```js
// for (let i = 0; i < 3; i++) alert(i)

// boshlanishi bajariladi
let i = 0
// agar shart → tanani bajaring va qadamni bajarish
if (i < 3) { alert(i); i++ }
// agar shart → tanani bajaring va qadamni bajarish
if (i < 3) { alert(i); i++ }
// agar shart → tanani bajaring va qadamni bajarish
if (i < 3) { alert(i); i++ }
// ...tugaydi, chunki endi i == 3
```

````smart header="Ichki o'zgaruvchan deklaratsiyasi"
Bu erda "hisoblagich" o'zgaruvchani `i` tsiklda e'lon qilinadi. Bunga "ichki" o'zgaruvchan deklaratsiya deyiladi. Bunday o'zgaruvchanlar faqat tsikl ichida ko'rinadi.

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // xato, bunday o'zgaruvchan yo'q
```

O'zgaruvchani aniqlash o'rniga, mavjud bo'lganidan foydalanishimiz mumkin:

```js run
let i = 0;

for (i = 0; i < 3; i++) { // mavjud bo'lgan o'zgaruvchandan
  alert(i); // 0, 1, 2
}

alert(i); // 3, chiqariladi, chunki tsiklning tashqarisida e'lon qilingan
```
````

<<<<<<< HEAD

### Parchalarni tashlab ketish
=======
### Skipping parts
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

`For` ning istalgan qismi o'tkazib yuborilishi mumkin.

Masalan, agar biz tsiklning boshida hech narsa qilishimiz kerak bo'lmasa, `boshlanishni` ni qoldirib yuborishimiz mumkin.

Bu erda bo'lgani kabi:

```js run
let i = 0; // biz i allaqachon e'lon qildik va tayinladik

for (; i < 3; i++) { // "boshlanish" kerak emas
  alert( i ); // 0, 1, 2
}
```

Shuningdek, biz `qadam` qismini ham olib tashlashimiz mumkin:

```js run
let i = 0;

for (; i < 3;) {
  alert( i++ );
}
```

Bu tsiklni `while (i < 3)` bilan bir xil qiladi.

Biz aslida hamma narsani olib tashlashimiz mumkin, cheksiz tsikl yaratish uchun:

```js
for (;;) {
  // cheksiz takrorlaydi
}
```

Iltimos `for` tsikl uchun, ikkita nuqta-vergul `;` mavjud bo'lishi kerak. Aks holda, sintaksis xatosi bo'lishi mumkin.

## Tsiklni buzish

Odatda, tsiklning holati noto'g'ri bo'lsa, u to'xtaydi.

Lekin biz har qanday vaqtda tsiklni maxsus `break` direktiva yordamida to'xtatishimiz mumkin.

Masalan, quyida keltirilgan tsikl foydalanuvchidan raqamlar ketma-ketligini so'raydi, raqam kiritilmaganda "buziladi":

```js run
let sum = 0;

while (true) {

  let value = +prompt("Raqam kiriting", '');

*!*
  if (!value) break; // (*)
*/!*

  sum += value;

}
alert( 'Jami: ' + sum );
```

Agar foydalanuvchi bo'sh matn kiritsa yoki kirishni bekor qilsa, `break` direktivasi `(*)` qatorida faollashadi. U tsiklni darhol to'xtatadi, boshqaruvni tsikldan keyingi birinchi satrga uzatadi. Ya'ni, `alert`.

"Cheksiz tsikl + `break` kerak bo'lganda" kombinatsiyasi tsiklning sharti boshida yoki oxirida emas, balki o'rta yoki hatto tanasining bir necha joyida tekshirilishi kerak bo'lgan holatlar uchun juda yaxshi.

## Keyingi takrorlashga o'tish [#continue]

`Continue` direktivasi `break` ning "engil versiyasi" dir. Bu butun satrni to'xtata olmaydi. Buning o'rniga, u joriy takrorlashni to'xtatadi va tsiklning yangi takrorlashni boshlashga majbur qiladi (agar shart imkon bersa).

Agar biz uni amaldagi takrorlash bilan tugatgan bo'lsak va keyingisiga o'tishni xohlasak, undan foydalanishimiz mumkin.

Quyidagi tsikl faqat toq qiymatlarni chiqarish uchun `continue` dan foydalanadi:

```js run no-beautify
for (let i = 0; i < 10; i++) {

  // agar to'g'ri bo'lsa, tananing qolgan qismini o'tkazib yuboring
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1, keyin 3, 5, 7, 9
}
```

`i` ning juft qiymatlari uchun `continue` direktivasi tanani bajarishini to'xtatadi va boshqaruvni `for` ning keyingi takrorlanishiga o'tkazadi (keyingi raqam bilan). Shunday qilib, `alert` faqat toq qiymatlarni chiqaradi.

````smart header="`Continue` direktivasi bog'lik tsiklarni kamaytirishga yordam beradi"
Toq qiymatlarni ko'rsatadigan tsikl quyidagicha ko'rinishi mumkin:

```js run
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

Texnik nuqtai nazardan, bu yuqoridagi misol bilan bir xil. Albatta, biz `continue` dan foydalanish o'rniga `if` blokiga kodni o'rashimiz mumkin.

<<<<<<< HEAD
<<<<<<< HEAD:1-js/02-first-steps/12-while-for/article.md
Ammo yon ta'sir sifatida bu yana bitta uyalash darajasini yaratdi (jingalak qavs ichidagi `alert` chaqiruvi). Agar `if` ichidagi kod bir necha satrdan uzun bo'lsa, bu umumiy kod o'qilishini pasaytirishi mumkin.
=======
But as a side-effect, this created one more level of nesting (the `alert` call inside the curly braces). If the code inside of `if` is longer than a few lines, that may decrease the overall readability.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/13-while-for/article.md
=======
But as a side effect, this created one more level of nesting (the `alert` call inside the curly braces). If the code inside of `if` is longer than a few lines, that may decrease the overall readability.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
````

````warn header="'?' Operatorning o'ng tomonida `break/continue` dan foydalana olmaymizmi"
Iltimos, shuni yodda tutingki, ifodalar bo'lmagan sintaksis konstruktsiyalari uchlik operator bilan ishlatilishi mumkin emas `?`. Xususan, u erda `break/continue` kabi ko'rsatmalarga yo'l qo'yilmaydi.

Masalan, agar biz ushbu kodni olsak:

```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```

...va savol belgisi yordamida uni qayta yozamiz:

```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // bu erda davom etishga ruxsat berilmaydi
```

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/article.md
...u ishlashni to'xtatadi. Bu kabi kod sintaksis xatosini keltirib chiqaradi:

=======
...it stops working: there's a syntax error.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/13-while-for/article.md

Bu `if` o'rniga `?` savol belgisi operatoridan foydalanmaslikning yana bir sababi.
````

## break/continue uchun yorliqlar

Ba'zan biz birdaniga bir nechta uyali tsikldan chiqib ketishimiz kerak.

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/article.md
Masalan, quyidagi kodda biz `(i, j)` koordinatalarini `(0,0)` dan `(3,3)` gacha so'rab, `i` va `j` tsiklga o'tamiz:
=======
For example, in the code below we loop over `i` and `j`, prompting for the coordinates `(i, j)` from `(0,0)` to `(2,2)`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/13-while-for/article.md

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Koordinatalardagi qiymat (${i},${j})`, '');

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/article.md
    // agar men bu erdan Bajarildi (pastda) ga chiqishni xohlasam nima qilishim kerak?

=======
    // what if we want to exit from here to Done (below)?
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/13-while-for/article.md
  }
}

alert('Bajarildi!');
```

Agar foydalanuvchi kirishni bekor qilsa, biz jarayonni to'xtatish usuliga muhtojmiz.

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/article.md
`input` dan keyin oddiy `break` faqat ichki tsiklni buzadi. Bu etarli emas -- yorliqlar, yordamga keling!
=======
The ordinary `break` after `input` would only break the inner loop. That's not sufficient -- labels, come to the rescue!
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/13-while-for/article.md

<<<<<<< HEAD
*Yorliq* - bu tsikl oldida ikkita nuqta qo'yilgan identifikator:
=======
A *label* is an identifier with a colon before a loop:

>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```js
yorliqIsmi: for (...) {
  ...
}
```

Quyidagi tsikldagi `break <yorliqIsmi>` ifodasi yorliqqa chiqadi:

```js run no-beautify
*!*tashqari:*/!* for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Koordinatalardagi qiymat (${i},${j})`, '');

    // agar bo'sh satr yoki bekor qilingan bo'lsa, ikkala tsikldan ham chiqib keting
    if (!input) *!*break tashqari*/!*; // (*)

    // qiymat bilan operatsiyalarni bajaring...
  }
}
<<<<<<< HEAD
alert('Bajarildi!');
=======

alert('Done!');
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```

Yuqoridagi kodda `break tashqari` yorlig'i yuqoriga qarab, `tashqari` deb nomlangan va shu tsikldan tashqariga chiqadi.

Shunday qilib, boshqaruv to'g'ridan-to'g'ri `(*)` dan `alert('Bajarildi!')` ga o'tadi.

Shuningdek, yorliqni alohida satrga ko'chirishimiz mumkin:

```js no-beautify
tashqari:
for (let i = 0; i < 3; i++) { ... }
```

`continue` direktivasi yorliq bilan ham ishlatilishi mumkin. Bunday holda, kod bajarilishi yorliqli tsiklning keyingi takrorlanishiga o'tadi.

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/article.md
````warn header="Yorliqlar har qanday joyga \"sakrash\" ga ruxsat bermaydi"
Yorliqlar koddagi o'zboshimchalik bilan har qanday joyga o'tishga imkon bermaydi.
=======
````warn header="Labels do not allow to \"jump\" anywhere"
Labels do not allow us to jump into an arbitrary place in the code.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/13-while-for/article.md

<<<<<<< HEAD
Masalan, buni amalga oshirish mumkin emas:
=======
For example, it is impossible to do this:

>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```js
<<<<<<< HEAD:1-js/02-first-steps/12-while-for/article.md
break label;  // yorliqqa sakraydimi? Yo'q
=======
break label; // jump to the label below (doesn't work)
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/13-while-for/article.md

label: for (...)
```

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/article.md
`break/continue` ga qo'ng'iroq faqat tsiklning ichkaridan amalga oshiriladi va yorliq yo'riqnomaning yuqorisida bo'lishi kerak.
=======
A `break` directive must be inside a code block. Technically, any labelled code block will do, e.g.:

```js
label: {
  // ...
  break label; // works
  // ...
}
```

...Although, 99.9% of the time `break` is used inside loops, as we've seen in the examples above.

A `continue` is only possible from inside a loop.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/13-while-for/article.md
````

## Xulosa

Biz tsiklning uchta turini qopladik:

- `while` -- Shart har bir takrorlashdan oldin tekshiriladi.
- `do..while` -- Shart har bir takrorlashdan keyin tekshiriladi.
- `for (;;)` -- Vaziyat har bir takrorlashdan oldin tekshiriladi, qo'shimcha sozlamalar mavjud.

"Cheksiz" tsiklni yaratish uchun odatda `while(true)` konstruktsiyasi ishlatiladi. Bunday tsikl, xuddi boshqalari singari, `break` direktivasi bilan to'xtatilishi mumkin.

Agar biz amaldagi takrorlashda hech narsa qilishni xohlamasak va keyingisiga o'tishni istasak, biz `continue` direktivasidan foydalanishimiz mumkin.

`break/continue` direktivalari tsikldan oldin e'lon qilingan yorliqlarni qo'llab-quvvatlaydi. Yorliq - bu `break/continue` ning tashqi tsiklga o'tish uchun ichki tsikldan chiqishning yagona usuli.