<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
# Operatorlar
=======
# Basic operators, maths
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/08-operators/article.md

Biz ko'plab operatorlarni maktabdan bilamiz. Ular qo'shimcha `+`, ko'paytma `*`, ayirish `-` va boshqalar kabi narsalar.

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Ushbu bobda biz operatorlarning maktab arifmetikasiga kirmaydigan jihatlariga e'tibor qaratamiz.
=======
In this chapter, we’ll start with simple operators, then concentrate on JavaScript-specific aspects, not covered by school arithmetic.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/08-operators/article.md

## "Unar", "binar", "operand" terminologiya

Ishni davom ettirishdan oldin, keling, umumiy terminologiyani tushunaylik.

- *Operand* -- bu operatorlarga qo'llaniladigan narsadir. Masalan, `5 * 2` ning ko'paytirilishida ikkita operand mavjud: chap operand `5`, o'ng operand esa `2`. Ba'zan, odamlar "operandlar" o'rniga "argumentlar" deb atashadi.
- Operator bitta operandga ega bo'lsa *unary* hisoblanadi. Masalan `-`, unar musbat sonning ishorasini manfiy songa aylantiradi:

    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
    alert( x ); // -1, unar inkor qo'llanildi
    ```
- Agar ikkita operand bo'lsa, operator *binar*. Xuddi shu minus binar shaklda ham mavjud:

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2, binar minus qiymatlarni chiqarib tashlaydi
    ```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
    Rasmiy ravishda biz bu erda ikki xil operatorlar haqida gaplashamiz: unar inkor (bitta operand: ishorani teskari aylantiradi) va binar ayirish (ikkita operand: ayirish).

## Matnlarni birlashtirish, binar +

Endi JavaScript operatorlarining maktab arifmetikasidan tashqaridagi maxsus xususiyatlarini ko'rib chiqamiz.
=======
    Formally, in the examples above we have two different operators that share the same symbol: the negation operator, a unary operator that reverses the sign, and the subtraction operator, a binary operator that subtracts one number from another.

## Maths

The following math operations are supported:

- Addition `+`,
- Subtraction `-`,
- Multiplication `*`,
- Division `/`,
- Remainder `%`,
- Exponentiation `**`.

The first four are straightforward, while `%` and `**` need a few words about them.

### Remainder %

The remainder operator `%`, despite its appearance, is not related to percents.

The result of `a % b` is the [remainder](https://en.wikipedia.org/wiki/Remainder) of the integer division of `a` by `b`.

For instance:

```js run
alert( 5 % 2 ); // 1, the remainder of 5 divided by 2
alert( 8 % 3 ); // 2, the remainder of 8 divided by 3
alert( 8 % 4 ); // 0, the remainder of 8 divided by 4
```

### Exponentiation **

The exponentiation operator `a ** b` raises `a` to the power of `b`.

In school maths, we write that as a<sup>b</sup>.

For instance:

```js run
alert( 2 ** 2 ); // 2² = 4
alert( 2 ** 3 ); // 2³ = 8
alert( 2 ** 4 ); // 2⁴ = 16
```

Just like in maths, the exponentiation operator is defined for non-integer numbers as well.

For example, a square root is an exponentiation by ½:

```js run
alert( 4 ** (1/2) ); // 2 (power of 1/2 is the same as a square root)
alert( 8 ** (1/3) ); // 2 (power of 1/3 is the same as a cubic root)
```


## String concatenation with binary +

<<<<<<< HEAD
Let's meet features of JavaScript operators that are beyond school arithmetics.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/08-operators/article.md
=======
Let's meet the features of JavaScript operators that are beyond school arithmetics.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Odatda `+` qo'shuv operatori raqamlarni yig'adi.

Lekin, binar `+` satrlarga qo'llanilsa, ularni birlashtiradi(qo'shadi) :

```js
let s = "my" + "string";
alert(s); // mystring
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
E'tibor bering, operandlardan biri satr bo'lsa, ikkinchisi ham satrga aylanadi.
=======
Note that if any of the operands is a string, then the other one is converted to a string too.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/08-operators/article.md

Masalan:

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Qarang, matn birinchi operand yoki ikkinchisi bo'lishi muhim emas. Qoida oddiy: agar ikkala operand dan biri matn bo'lsa, ikkinchisi ham matnga aylantiriladi.

Shu bilan birga, operatsiyalar chapdan o'ngga yo'naltirilganligiga e'tibor bering. Agar ikkita operand raqam va undan keyin qator bo'lsa, raqamlar qatorga o'tkazilishidan oldin qo'shiladi:
=======
See, it doesn't matter whether the first operand is a string or the second one.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/08-operators/article.md

Here's a more complex example:

```js run
alert(2 + 2 + '1' ); // "41" "221" emas
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Matnlarni birlashtirish va konvertatsiya binar qo'shilish `+` ning o'ziga xos xususiyati. Boshqa arifmetik operatorlar faqat raqamlar bilan ishlaydi va har doim o'z operandlarini raqamlarga aylantiradi.

Masalan, ayirish va bo'linish:
=======
Here, operators work one after another. The first `+` sums two numbers, so it returns `4`, then the next `+` adds the string `1` to it, so it's like `4 + '1' = '41'`.

```js run
alert('1' + 2 + 2); // "122" and not "14"
```
Here, the first operand is a string, the compiler treats the other two operands as strings too. The `2` gets concatenated to `'1'`, so it's like `'1' + 2 = "12"` and `"12" + 2 = "122"`.

The binary `+` is the only operator that supports strings in such a way. Other arithmetic operators work only with numbers and always convert their operands to numbers.

Here's the demo for subtraction and division:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/08-operators/article.md

```js run
alert( 6 - '2' ); // 4, converts '2' to a number
alert( '6' / '2' ); // 3, converts both operands to numbers
```

## Raqamli konvertatsiya, unar +

Qo'shilish `+` ikki shaklda mavjud: biz yuqorida ishlatgan binar shakli va unar shakli.

Bitta qiymatga qo'llaniladigan unar qo'shilish yoki, boshqacha aytganda, qo'shilish operatori `+` raqamlarga hech narsa qilmaydi. Ammo operand raqam bo'lmasa, unar qo'shilish uni songa aylantiradi.

Masalan:

```js run
// Raqamlarga ta'siri yo'q
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

*!*
// Raqamlarga o'zgartiradi
alert( +true ); // 1
alert( +"" );   // 0
*/!*
```

Aslida u `Number(...)` bilan bir xil ishni bajaradi, ammo undan qisqaroq.

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Matnlarni raqamlarga aylantirish zarurati juda tez-tez paydo bo'ladi. Masalan, biz HTML shakl maydonlaridan qiymatlarni olsak, ular odatda matnlardir.

Agar ularni qo'shishni istasak nima bo'ladi?
=======
The need to convert strings to numbers arises very often. For example, if we are getting values from HTML form fields, they are usually strings. What if we want to sum them?
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/08-operators/article.md

Binar qo'shish ularni matn sifatida qo'shadi:

```js run
let apples = "2";
let oranges = "3";

alert( apples + oranges ); // "23", binar qo'shilish satrlarni birlashtiradi
```

Agar biz ularni raqamlar sifatida ko'rib chiqmoqchi bo'lsak, ularni raqamga aylantirishimiz va keyin ularni qo'shishimiz kerak:

```js run
let apples = "2";
let oranges = "3";

*!*
// ikkala qiymat binar qo'shilish dan oldin raqamlarga aylantirildi
alert( +apples + +oranges ); // 5
*/!*

// uzunroq yo'l
// alert( Number(apples) + Number(oranges) ); // 5
```

Matematik nuqtai nazaridan qo'shilish belgisining ko'pligi g'alati tuyulishi mumkin. Ammo dasturchi nuqtai nazaridan g'alati tomoni yo'q: birinchi navbatda unar qo'shilish qo'llaniladi, ular matnlarni raqamlarga aylantiradi, so'ngra binar qo'shilish ularni jamlaydi.

Nima uchun unar qo'shilishi binar qo'shilishidan oldin qiymatga qo'llaniladi?Ko'rib turganimizdek, bu ularning *oliy ustuvorligi* tufayli.

## Operatorning ustuvorligi

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Agar ifoda bir nechta operatorga ega bo'lsa, ularni bajarish tartibi ularning *ustunligi* yoki boshqacha qilib aytganda operatorlarning aniq ustuvorligi tartibi bilan belgilanadi.
=======
If an expression has more than one operator, the execution order is defined by their *precedence*, or, in other words, the default priority order of operators.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/08-operators/article.md

Maktabdan boshlab barchamiz bilamizki, `1 + 2 * 2` ifodasidagi ko'paytma qo'shilishdan oldin hisoblanishi kerak. Bu aniq ustunlik. Ko'paytirishning qo'shilishdan *ustunligi* yuqori ekanligi aytiladi.

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Qavslar har qanday ustunlikni bekor qiladi, shuning uchun agar biz yashirin tartibni qoniqtirmasak, ularni o'zgartirish uchun ularni ishlatamiz. Masalan: `(1 + 2) * 2`.
=======
Parentheses override any precedence, so if we're not satisfied with the default order, we can use them to change it. For example, write `(1 + 2) * 2`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/08-operators/article.md

Javascriptda ko'plab operatorlar mavjud. Har bir operator tegishli ustunlik raqamiga ega. Katta raqam birinchi amalga oshiriladi. Agar ustunlik bir xil bo'lsa, ijro etish tartibi chapdan o'ngga amalga oshiriladi.

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Mana [ustunlik jadvalidan ko'chirma](https://developer.mozilla.org/en/JavaScript/Reference/operators/operator_precedence) (buni eslab qolishning hojati yo'q, lekin unar qo'shilish binar dan yuqori ekanligini unutmang):
=======
Here's an extract from the [precedence table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) (you don't need to remember this, but note that unary operators are higher than corresponding binary ones):
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/08-operators/article.md

| Ustunlik | Ism | Belgi |
|------------|------|------|
| ... | ... | ... |
<<<<<<< HEAD
<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
| 16 | unar qo'shilish | `+` |
| 16 | unar ayirish | `-` |
| 14 | ko'paytirish | `*` |
| 14 | bo'lish | `/` |
| 13 | qo'shilish | `+` |
| 13 | ayirish | `-` |
=======
| 17 | unary plus | `+` |
| 17 | unary negation | `-` |
| 16 | exponentiation | `**` |
| 15 | multiplication | `*` |
| 15 | division | `/` |
| 13 | addition | `+` |
| 13 | subtraction | `-` |
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/08-operators/article.md
| ... | ... | ... |
| 3 | tayinlash | `=` |
| ... | ... | ... |

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
As we can see, the "unary plus" has a priority of `16` which is higher than the `13` of "addition" (binary plus). That's why, in the expression `"+apples + +oranges"`, unary pluses work before the addition.
Ko'rib turganimizdek, "unar qo'shilish" ning ustuvorligi `16`, bu (binar qo'shilish) `13` dan yuqori. Shuning uchun `"+apples + +oranges"` iborasida unar qo'shilish ifodaning qo'shilishdan oldin ishlaydi.
=======
As we can see, the "unary plus" has a priority of `17` which is higher than the `13` of "addition" (binary plus). That's why, in the expression `"+apples + +oranges"`, unary pluses work before the addition.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/08-operators/article.md
=======
| 14 | unary plus | `+` |
| 14 | unary negation | `-` |
| 13 | exponentiation | `**` |
| 12 | multiplication | `*` |
| 12 | division | `/` |
| 11 | addition | `+` |
| 11 | subtraction | `-` |
| ... | ... | ... |
| 2 | assignment | `=` |
| ... | ... | ... |

As we can see, the "unary plus" has a priority of `14` which is higher than the `11` of "addition" (binary plus). That's why, in the expression `"+apples + +oranges"`, unary pluses work before the addition.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

## Tayinlash operatori

<<<<<<< HEAD
Tenglik belgisi `=` ham operator ekanligini ta'kidlaymiz. U ustunlik jadvalida juda past ustuvorlik bilan ko'rsatilgan `3`.
=======
Let's note that an assignment `=` is also an operator. It is listed in the precedence table with the very low priority of `2`.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Shuning uchun, biz o'zgaruvchini tayinlaganimizda, masalan, `x = 2 * 2 + 1`, avval hisob-kitoblar amalga oshiriladi va keyin natijani `x` da saqlagan holda `=` baholanadi.

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Tayinlash operatorini zanjirlash mumkin:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

Zanjirli topshiriqlar o'ngdan chapga qarab baholanadi. Birinchidan, `2 + 2` ning o'ng tomondagi ifodasi baholanadi va keyin chapdagi o'zgaruvchanlarga tayinlanadi: `c`, `b` va `a`. Oxir-oqibat, barcha o'zgaruvchanlar bitta qiymatga ega.

````smart header=""\" = \ "` Tayinlash operatori qiymatni qaytaradi"
Operator har doim qiymatni qaytaradi. Bu ularning ko'plari uchun `+` qo'shimchasi yoki `*` ko'paytmasi kabi aniq. Ammo tayinlash operatori ham ushbu qoidaga amal qiladi.
=======
### Assignment = returns a value

The fact of `=` being an operator, not a "magical" language construct has an interesting implication.

All operators in JavaScript return a value. That's obvious for `+` and `-`, but also true for `=`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/08-operators/article.md

`x = value` qo'ng'irog'i `qiymatni` ni `x` ga yozadi *va keyin uni qaytaradi*

Tayinlash operatori yanada murakkab ifodaning bir qismi sifatida ishlatadigan demo:

```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Yuqoridagi misolda `(a = b + 1)` natijasi bu `a` ga berilgan qiymat (ya'ni `3`). Keyin u `3` dan olib ayirish uchun ishlatiladi.

Qiziqarli kod, shunday emasmi? Biz buni qanday ishlashini tushunishimiz kerak, chunki ba'zida biz buni uchinchi tomon kutubxonalarida ko'rishimiz mumkin, lekin o'zimiz shunga o'xshash narsalarni yozmasligimiz kerak. Bunday fokuslar, kodni o'qib bo'lmaydigan qiladi.
````

## Qoldiq %

Qoldig operatori `%`, tashqi ko'rinishiga qaramay, foizlar bilan bog'liq emas.

`a % b` ning natijasi `a` bilan `b` ning butun sonli bo'linmasining qoldig'idir.

Masalan:

```js run
alert( 5 % 2 ); // 1 bu 5 va 2 bo'linmasining qoldig'idir
alert( 8 % 3 ); // 2 bu 8 va 3 bo'linmasining qoldig'idir
alert( 6 % 3 ); // 0 bu 6 va 3 bo'linmasining qoldig'idir
```

## Darajaga chiqarish operatori **

Darajaga chiqarish operatori `**` bu tilga yaqinda qo'shilgan operator.

Natural `b` soni uchun "a ** b" ning natijasi bu `a`, o'z-o'ziga 'b` marta ko'paytirilgani.

Masalan:
=======
In the example above, the result of expression `(a = b + 1)` is the value which was assigned to `a` (that is `3`). It is then used for further evaluations.

Funny code, isn't it? We should understand how it works, because sometimes we see it in JavaScript libraries.

Although, please don't write the code like that. Such tricks definitely don't make code clearer or readable.

### Chaining assignments

Another interesting feature is the ability to chain assignments:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

Chained assignments evaluate from right to left. First, the rightmost expression `2 + 2` is evaluated and then assigned to the variables on the left: `c`, `b` and `a`. At the end, all the variables share a single value.

Once again, for the purposes of readability it's better to split such code into few lines:

```js
c = 2 + 2;
b = c;
a = c;
```
That's easier to read, especially when eye-scanning the code fast.

## Modify-in-place

We often need to apply an operator to a variable and store the new result in that same variable.

For example:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

This notation can be shortened using the operators `+=` and `*=`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/08-operators/article.md

```js run
let n = 2;
n += 5; // now n = 7 (same as n = n + 5)
n *= 2; // now n = 14 (same as n = n * 2)

alert( n ); // 14
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Operator butun son bo'lmagan raqamlar uchun ham ishlaydi.

Masalan:

```js run
alert( 4 ** (1/2) ); // 2 (1/2 ning darajasi kvadrat ildiz bilan bir xil, bu matematika)
alert( 8 ** (1/3) ); // 2 (1/3 ning darajasi kub ildiz bilan bir xil)
=======
Short "modify-and-assign" operators exist for all arithmetical and bitwise operators: `/=`, `-=`, etc.

Such operators have the same precedence as a normal assignment, so they run after most other calculations:

```js run
let n = 2;

n *= 3 + 5; // right part evaluated first, same as n *= 8

<<<<<<< HEAD
alert( n ); // 16  (right part evaluated first, same as n *= 8)
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/08-operators/article.md
=======
alert( n ); // 16
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```

## Kattalashtirish/Kamaytirish

<!-- Can't use -- in title, because the built-in parser turns it into a 'long dash' – -->

Raqamni bittaga ko'paytirish yoki kamaytirish bu eng keng tarqalgan raqamli amallardan biridir.

Shunday qilib, buning uchun maxsus operatorlar mavjud:

- **Kattalashtirish** `++` o'zgaruvchani 1 ga oshiradi:

    ```js run no-beautify
    let counter = 2;
<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
    counter++;      // counter = counter + 1 bilan bir xil ishlaydi, lekin qisqaroq
=======
    counter++;        // works the same as counter = counter + 1, but is shorter
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/08-operators/article.md
    alert( counter ); // 3
    ```
- **Kamaytirish** `--` o'zgaruvchani 1 ga kamyaradi:

    ```js run no-beautify
    let counter = 2;
<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
    counter--;      // counter = counter - 1 bilan bir xil ishlaydi, lekin qisqaroq
=======
    counter--;        // works the same as counter = counter - 1, but is shorter
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/08-operators/article.md
    alert( counter ); // 1
    ```

```warn
Kattalashtirish/Kamaytirish faqat o'zgaruvchanlarga qo'llanilishi mumkin. Uni `5++` kabi usulda ishlatish xatoga yo'l qo'yadi.
```

`++` va `-` operatorlari o'zgaruvchandan oldin yoki keyin joylashtirilishi mumkin.

- Operator o'zgaruvchandan keyin bo'lganda u "postfix shakli": `counter++`.
- Operator o'zgaruvchandan oldin bo'lganda u "prefiks shakli": `++counter`.

Ushbu ikkala ifoda bir xil narsani bajaradi: `counter` ni `1` ga oshiriradi.

Farqi bormi? Ha, lekin faqat `++/--' ning qaytarilgan qiymatidan foydalansak, uni ko'rishimiz mumkin.

Keling, aniqlik kiritamiz. Ma'lumki, barcha operatorlar qiymatni qaytaradilar. Kattalashtirish/Kamaytirish istisno emas. Prefiks shakli yangi qiymatni qaytaradi, postfiks shakli esa eski qiymatni qaytaradi (kattalashtirish/kamaytirish dan oldin).

Farqni ko'rish uchun mana bir misol:

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

`(*)` Satrida *prefiks* shakli `++counter` `counter` o'sib boradi va yangi qiymatni qaytaradi `2`. Shunday qilib, `alert` `2` ni ko'rsatadi.

Endi postfiks shaklidan foydalanamiz:

```js run
let counter = 1;
let a = counter++; // (*) ++counter ni counter++ ga o'zgartirildi

alert(a); // *!*1*/!*
```

`(*)` Satrida *postfix* shakli 'counter++` ham `counter` ni kattalashtiradi, lekin *eski* qiymatini qaytaradi (o'sishdan oldin). Shunday qilib, `alert` `1` ni ko'rsatadi.

Xulosa qilish uchun:

- Agar kattalshtirish/kamaytirish natijasi ishlatilmasa, qaysi shaklda foydalanishdan farqi yo'q:

    ```js run
    let counter = 0;
    counter++;
    ++counter;
    alert( counter ); // 2, yuqoridagi satrlar bir hil ishni bajardi
    ```
- Agar biz qiymatni oshirishni *va* operator natijasini darhol ishlatishni istasak, bizga prefiks shakli kerak bo'ladi:

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
- Agar biz qiymatni oshirishni xohlasak, lekin oldingi qiymatidan foydalansak, bizga postfiks shakli kerak bo'ladi:

    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

````smart header="Kattalashtirish/Kamaytirish operatorlari boshqa operatorlar orasida"
`++/--` operatorlari ifodalar ichida ham ishlatilishi mumkin. Ularning ustuvorligi boshqa ko'plab arifmetik amallardan yuqori.

Masalan:

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
```

Solishtirish uchun:

```js run
let counter = 1;
alert( 2 * counter++ ); // 2, chunki counter++ "eski" qiymatni qaytaradi
```

Though technically okay, such notation usually makes code less readable. One line does multiple things -- not good.
Texnik jihatdan yaxshi bo'lsa-da, bunday notatsiya odatda kodni o'qilishini qiyin qladi. Bir satr bir nechta narsani qiladi -- yaxshi emas.

Kodni o'qiyotganda ko'zni tez "vertikal" skanerlash `counter++` kabi narsalarni osonlikcha o'tkazib yuborishi mumkin va bu orqali o'zgaruvchanning qiymati ko'payganligi aniq bo'lmaydi.

Biz "bitta satr -- bitta faoliyat" uslubini maslahat beramiz:

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````

## Bit operatorlari

Bit operatorlar argumentlarni 32-bitli butun sonlar sifatida ko'rib chiqadilar va ularning ikkilik vakili darajasida ishlatadilar.

Ushbu operatorlar JavaScript ga xos emas. Ular ko'pgina dasturlash tillarida qo'llab-quvvatlanadi.

Operatorlar ro'yxati:

- AND - VA ( `&` )
- OR - YOKI ( `|` )
- XOR - XOR ( `^` )
- NOT - YO'Q ( `~` )
- LEFT SHIFT - CHAPGA SILJITISH ( `<<` )
- RIGHT SHIFT - O'NGGA SILJITISH ( `>>` )
- ZERO-FILL RIGHT SHIFT - NOLGA TO'LDIRISH O'NGGA SILJITISH ( `>>>` )

<<<<<<< HEAD
<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Ushbu operatorlarni juda kam ishlatishadi. Ularni tushunish uchun biz past darajadagi raqamlarni ko'rib chiqishimiz kerak va buni hozircha bajarish maqbul bo'lmaydi, ayniqsa, ular bizga yaqin orada kerak bo'lmaydi. Agar sizga qiziq bo'lsa, MDN-da [Bit Operatorlar] (https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) maqolasini o'qishingiz mumkin. Haqiqiy ehtiyoj paydo bo'lganda buni qilish yanada amaliyroq bo'ladi.

## Joyda o'zgartirish

Biz ko'pincha biror o'zgaruvchanga operator qo'llashimiz va yangi natijani o'sha o'zgaruvchanda saqlashimiz kerak.

Masalan:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

Ushbu yozuvni `+=` va `*=` operatorlari yordamida qisqartirish mumkin:

```js run
let n = 2;
n += 5; // hozir n = 7 (n = n + 5 bilan bir xil)
n *= 2; // hozir n = 14 (n = n * 2 bilan bir xil)

alert( n ); // 14
```

Qisqa "o'zgartirish va tayinlash" operatorlari barcha arifmetik va bit operatorlar uchun mavjud: `/=`, `-=` va boshqalar.

Bunday operatorlar odatdagi tayinlash operatori bilan bir xil ustunlikka ega, shuning uchun ular boshqa hisob-kitoblardan so'ng ishlaydi:

```js run
let n = 2;

n *= 3 + 5;

alert( n ); // 16  (n * = 8 bilan bir xil, avval o'ng qismi baholandi)
```
=======
These operators are used very rarely, when we need to fiddle with numbers on the very lowest (bitwise) level. We won't need these operators any time soon, as web development has little use of them, but in some special areas, such as cryptography, they are useful. You can read the [Bitwise Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Bitwise) chapter on MDN when a need arises.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/08-operators/article.md
=======
These operators are used very rarely, when we need to fiddle with numbers on the very lowest (bitwise) level. We won't need these operators any time soon, as web development has little use of them, but in some special areas, such as cryptography, they are useful. You can read the [Bitwise Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#bitwise_operators) chapter on MDN when a need arises.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

## Vergul

Vergul operatori, `,` eng noyob va g'ayrioddiy operatorlardan biridir. Ba'zan, undan qisqa kod yozish uchun foydalaniladi, shuning uchun nima bo'layotganini tushunish uchun biz uni bilishimiz kerak.

Vergul operatori bir nechta ifodalarni vergul bilan ajratib `,` ularni baholashga imkon beradi. Ularning har biri baholanadi, ammo faqat oxirgisining natijasi qaytariladi.

For example:

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7 (3 + 4 natijasi)
```

Bu yerda birinchi `1 + 2` ifodasi baholanadi va uning natijasi tashlanadi. Keyin, `3 + 4` baholanadi va natijada qaytariladi.

```smart header="Vergul juda past ustunlikka ega"
Iltimos, vergul operatorining ustunligi juda past, "=" dan past, shuning uchun qavslar yuqoridagi misolda muhim ahamiyatga ega.

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Ularsiz: `a = 1 + 2, 3 + 4` birinchi navbatda `+` ni baholaydi, raqamlarni `a = 3, 7` ga yig'adi, keyin `=` tayinlash operatori `a = 3` ni tayinlaydi va nihoyat verguldan keyin `7` qayta ishlanmaydi, shuning uchun unga e'tibor berilmaydi.
```

Nega bizga oxirgi qismdan tashqari hamma narsani tashlaydigan operator kerak?
=======
Without them: `a = 1 + 2, 3 + 4` evaluates `+` first, summing the numbers into `a = 3, 7`, then the assignment operator `=` assigns `a = 3`, and the rest is ignored. It's like `(a = 1 + 2), 3 + 4`.
```

Why do we need an operator that throws away everything except the last expression?
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/08-operators/article.md

Ba'zan, odamlar bir satrda bir nechta operatsiya bajarish uchun undan murakkab tuzilmalarda foydalanadilar.

Masalan:

```js
// bitta satrda uchta operatsiya
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Bunday ayyorliklar ko'pgina Javascript frameworklarida ishlatiladi. Shuning uchun biz ularni eslatib o'tmoqdamiz. Ammo, odatda, ular kodni o'qishni yaxshilamaydilar, shuning uchun ularni ishlatishdan oldin yaxshi o'ylashimiz kerak.
=======
Such tricks are used in many JavaScript frameworks. That's why we're mentioning them. But usually they don't improve code readability so we should think well before using them.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/08-operators/article.md
