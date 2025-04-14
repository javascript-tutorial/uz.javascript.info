<<<<<<< HEAD
# Shartli operatorlar: if, '?'
=======
# Conditional branching: if, '?'
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Ba'zan, biz har xil sharoitlarda har xil harakatlarni bajarishimiz kerak.

<<<<<<< HEAD
Buning uchun `if` ifodasidan va "savol belgisi" operatori deb yuritiladigan uchlik operatoridan soddalik uchun foydalanamiz `?`.
=======
To do that, we can use the `if` statement and the conditional operator `?`, that's also called a "question mark" operator.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## "If" ifodasi

<<<<<<< HEAD
`If` ifodasi shartni baholaydi va agar natijaning natijasi `true` bo'lsa, kod blokini bajaradi.
=======
The `if(...)` statement evaluates a condition in parentheses and, if the result is `true`, executes a block of code.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Masalan:

```js run
let year = prompt('ECMAScript-2015 spetsifikatsiyasi qaysi yilda nashr etilgan??', '');

*!*
if (year == 2015) alert( 'Siz haqsiz!' );
*/!*
```

Yuqoridagi misolda shart oddiy tenglikni tekshirish (`yil == 2015`), ammo u ancha murakkab bo'lishi mumkin.

Agar biz bir nechta ifodalarni bajarishni istasak, kod blokimizni jingalak qavs ichiga o'rashimiz kerak:

```js
if (year == 2015) {
  alert( "Bu to'g'ri!" );
  alert( "Siz juda aqllisiz!" );
}
```

Kod blokingizni jingalak qo'shtirnoq bilan o'rashni tavsiya etamiz `{}` har safar `if` ifodadan foydalansangizda, bajarish uchun bitta ifoda bo'lsa ham. Bunday qilish,kodning o'qilishini yaxshilaydi.

## Mantiqiy malumot turiga konvertatsiya

`If(...)` ifodasi uning qavsidagi ifodani baholaydi va natijani mantiqiy holatga o'tkazadi.

<info:type-convertions> bobidagi konvertatsiya qoidalarini eslaylik:

- `0` raqami, bo'sh satr `""`,`null`, `undefined` va `NaN` barchasi `false` bo'ladi. Shu sababli ularni "soxta" qiymatlar deb atashadi.
- Boshqa qiymatlar `true` bo'ladi, shuning uchun ular "aniq" deb nomlanadi.

Shunday qilib, ushbu shartdagi kod hech qachon bajarilmaydi:

```js
if (0) { // 0 bu soxta
  ...
}
```

...va bu shart ichida -- bu har doim to'g'ri bo'ladi:

```js
if (1) { // 1 bu to'g'ri
  ...
}
```

Bundan tashqari, oldindan baholangan mantiqiy qiymatni `if` ga kiritishingiz mumkin, masalan:

```js
let cond = (year == 2015); // tenglik rost yoki yolg'on qiymatini baholaydi

if (cond) {
  ...
}
```

## "Else" ifodasi

<<<<<<< HEAD
<<<<<<< HEAD
`If` ifodasi ixtiyoriy `else` blokini o'z ichiga olishi mumkin. U shart noto'g'ri bo'lganida amalga oshiriladi.
=======
The `if` statement may contain an optional "else" block. It executes when the condition is falsy.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
The `if` statement may contain an optional `else` block. It executes when the condition is falsy.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Masalan:
```js run
let year = prompt('ECMAScript-2015 spetsifikatsiyasi qaysi yilda nashr etilgan?', '');

if (year == 2015) {
  alert( "Siz buni to'g'ri taxmin qildingiz!" );
} else {
  alert( "Qanday qilib shunday noto'g'ri bo'lishi mumkin?" ); // 2015 yildan tashqari har qanday qiymat
}
```

## Bir nechta shartlar: "else if"

Sometimes, we'd like to test several variants of a condition. The `else if` clause lets us do that.
Ba'zan, biz shartning bir nechta variantlarini sinab ko'rmoqchi bolamiz. `Else if` ifodasi bunga imkon beradi.

Masalan:

```js run
let year = prompt('ECMAScript-2015 spetsifikatsiyasi qaysi yilda nashr etilgan?', '');

if (year < 2015) {
  alert( 'Juda erta...' );
} else if (year > 2015) {
  alert( 'Juda kech' );
} else {
  alert( 'Aynan!' );
}
```

Yuqoridagi kodda JavaScript avval `year < 2015` ni tekshiradi. Agar bu noto'g'ri bo'lsa, u keyingi `year > 2015` shartiga o'tadi. Agar bu ham noto'g'ri bo'lsa, u oxirgi `alert` ni ko'rsatadi.

Ko'proq `else if` bloklari bo'lishi mumkin. Oxirgi `else` ixtiyoriy.

<<<<<<< HEAD
## Uchlik operator '?'
=======
## Conditional operator '?'
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Ba'zan, biz shartga qarab o'zgaruvchani tayinlashimiz kerak.

Masalan:

```js run no-beautify
let accessAllowed;
let age = prompt('Yoshingiz nechida?', '');

*!*
if (age > 18) {
  accessAllowed = true;
} else {
  accessAllowed = false;
}
*/!*

alert(accessAllowed);
```

<<<<<<< HEAD
"Uchlik" yoki "savol belgisi" deb nomlangan operator bizga buni qisqa va sodda qilib bajarishga imkon beradi.

Operator `?` savol belgisi bilan ifodalanadi. "Uchlik" rasmiy atamasi operatorda uchta operand borligini anglatadi. Bu aslida JavaScript-da juda ko'p operandli bitta va yagona operator.
=======
The so-called "conditional" or "question mark" operator lets us do that in a shorter and simpler way.

The operator is represented by a question mark `?`. Sometimes it's called "ternary", because the operator has three operands. It is actually the one and only operator in JavaScript which has that many.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Sintaksis:
```js
let result = shart ? qiymat1 : qiymat2;
```

`Shart` baholanadi: agar u to'g'ri bo'lsa, u holda `qiymat1` qaytariladi, aks holda -- `qiymat2`.

Masalan:

```js
let accessAllowed = (age > 18) ? true : false;
```

<<<<<<< HEAD
Texnik jihatdan `age > 18` atrofidagi qavslarni tashlab qo'yishimiz mumkin. Savol belgisi operatori past ustunlikka ega, shuning uchun u `>` taqqoslashidan so'ng amalga oshiriladi.
=======
Technically, we can omit the parentheses around `age > 18`. The question mark operator has a low precedence, so it executes after the comparison `>`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Ushbu misol avvalgisiga o'xshash narsani bajaradi:

```js
// taqqoslash operatori "age > 18" baribir birinchi bo'lib bajariladi
// (uni qavs ichiga o‘rab olishning hojati yo‘q)
let accessAllowed = age > 18 ? true : false;
```

Ammo qavslar kodning o'qilishini yanada oson qiladi, shuning uchun ulardan foydalanishni tavsiya etamiz.

````smart
Yuqoridagi misolda siz savol belgisi operatorini foydalanishdan saqlanishingiz mumkin, chunki taqqoslash o'zi `true/false` ni qaytaradi:

```js
// xuddi shu
let accessAllowed = age > 18;
```
````

## Bir nechta '?'

Savol belgi operatorlari ketma-ketligi `?` bir nechta shartlarga bog'liq bo'lgan qiymatni qaytarishi mumkin.

Masalan:
```js run
let age = prompt('age?', 18);

let message = (age < 3) ? 'Salom bolakay!' :
  (age < 18) ? 'Salom!' :
  (age < 100) ? 'Assalomu aleykum!' :
  "Qanday g'ayrioddiy yosh!";

alert( message );
```

Avvaliga nima bo'layotganini tushunish qiyin bo'lishi mumkin. Ammo yaqindan ko'rib chiqqach, bu oddiy testlar ketma-ketligi ekanligini ko'rishimiz mumkin:

<<<<<<< HEAD
1. Birinchi savol belgisi `age < 3` ni tekshiradi.
2. Agar rost bo'lsa -- u qaytadi `'Salom bolakay!'`. Aks holda, u yo'g'on ichakdan '":"' keyingi ifodaga davom etadi, `age < 18` ni tekshirishadi.
3. Agar shu rost bo'lsa -- u qaytadi `'Salom!'`. Aks holda, u yo'g'on ichakdan '":"' keyingi ifodaga davom etadi, `age < 100` ni tekshirishadi.
4. Agar shu rost bo'lsa -- u qaytadi `'Assalomu aleykum!'`. Aks holda, u yo'g'on ichakdan '":"' ohirgi ifodaga davom etadi, `Qanday g'ayrioddiy yosh!` ni qaytaradi.
=======
1. The first question mark checks whether `age < 3`.
2. If true -- it returns `'Hi, baby!'`. Otherwise, it continues to the expression after the colon ":", checking `age < 18`.
3. If that's true -- it returns `'Hello!'`. Otherwise, it continues to the expression after the next colon ":", checking `age < 100`.
4. If that's true -- it returns `'Greetings!'`. Otherwise, it continues to the expression after the last colon ":", returning `'What an unusual age!'`.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Bu `if..else` yordamida qanday ko'rinishga ega:

```js
if (age < 3) {
  message = 'Salom bolakay!';
} else if (age < 18) {
  message = 'Salom!';
} else if (age < 100) {
  message = 'Assalomu aleykum!';
} else {
  message = "Qanday g'ayrioddiy yosh!";
}
```

## "?" dan noan'anaviy foydalanish

Ba'zan `?` savol belgisi `if` o'rnini bosuvchi sifatida ishlatiladi:

```js run no-beautify
let company = prompt('JavaScript-ni qaysi kompaniya yaratgan?', '');

*!*
(company == 'Netscape') ?
   alert("To'g'ri!") : alert("Noto'g'ri!");
*/!*
```

`Company == 'Netscape'` shartiga qarab, `?` dan keyin birinchi yoki ikkinchi ifoda bajariladi va ogohlantirish ko'rsatiladi.

Biz bu yerda o'zgaruvchanga natija bermaymiz. Buning o'rniga, biz shartga qarab turli xil kodlarni bajaramiz.

<<<<<<< HEAD
**Savol belgisi operatoridan shu tarzda foydalanishni tavsiya etmaymiz.**
=======
**It's not recommended to use the question mark operator in this way.**
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Yozuv ba'zi dasturchilarga yoqadigan `if` ekvivalentidan qisqa. Ammo uning o'qilishi qiyin.

Taqqoslash uchun `if` dan foydalanilgan usha kod:

```js run no-beautify
let company = prompt('JavaScript-ni qaysi kompaniya yaratgan?', '');

*!*
if (company == 'Netscape') {
  alert("To'g'ri!");
} else {
  alert("Noto'g'ri!");
}
*/!*
```

Bizning ko'zlarimiz kodni vertikal ravishda skanerlaydi. Bir nechta satrlarni qamrab oladigan kod bloklarini uzoq, lekin gorizontal ko'rsatmalar to'plamidan ko'ra tushunishga osonroq bo'lishi mumkin.

`?` Savol belgisi operatorining maqsadi uning shartiga qarab u yoki bu qiymatni qaytarishdir. Iltimos, faqat shu maqsad uchun foydalaning. Kodning turli tarmoqlarini bajarish kerak bo'lganda `if` dan foydalaning.
