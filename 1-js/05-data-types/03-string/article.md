# Matnlar

JavaScript-da matnli ma'lumotlar matn sifatida saqlanadi. Bitta belgi uchun alohida tur mavjud emas.

Matnlarning ichki formati har doim [UTF-16](https://en.wikipedia.org/wiki/UTF-16), u sahifani kodlash bilan bog'lanmagan.

## Qoshtirnoqlar 

Keling, qoshtirnoqlarning turlarini eslaylik.

Matn bitta, ikkita yoki teskari qoshtirnoq yordamida yaratilishi mumkin:

```js
let single = 'bitta qoshtirnoq';
let double = "ikkita qoshtirnoq";

let backticks = `teskari qoshtirnoq`;
```

<<<<<<< HEAD
Bitta va ikkita tirnoq asosan bir xil. Shu bilan birga, teskari qoshtirnoq bizga har qanday ifodani, shu jumladan funktsiya chaqiruvlarini kiritishga imkon beradi:
=======
Single and double quotes are essentially the same. Backticks, however, allow us to embed any expression into the string, by wrapping it in `${…}`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
function sum(a, b) {
  return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
```

Teskari qoshtirnoqlardan foydalanishning yana bir afzalligi shundaki, ular matnga bir nechta satrlarni kiritish imkoniyatini beradi:

```js run
let guestList = `Mehmonlar:
 * Elbek
 * Aziza
 * Oybek
`;

alert(guestList); // mehmonlar ro'yxati, bir nechta satr
```

<<<<<<< HEAD
Agar bitta yoki ikkita qoshtirnoqni xuddi shu tarzda ishlatishga harakat qilsak, xato bo'ladi:

```js run
let guestList = "Mehmonlar:  // Error: Unexpected token ILLEGAL
  * Elbek";
=======
Looks natural, right? But single or double quotes do not work this way.

If we use them and try to use multiple lines, there'll be an error:

```js run
let guestList = "Guests: // Error: Unexpected token ILLEGAL
  * John";
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

<<<<<<< HEAD
Bitta va ikkita qoshtirnoqlar til yaratishning qadimgi davrlaridan kelib chiqqan holda, ko'p satrlarni kiritish ehtiyoj hisobga olinmagan. Teskari qoshtirnoqlar ancha keyin paydo bo'ldi va shu bilan yanada ko'p qirrali bo'ldi.

<<<<<<< HEAD
Teskari tirnoq, shuningdek, birinchi teskari tirnoq oldin "namuna vazifasini" belgilash imkonini beradi. Sintaksisi: <code>func&#96;matn&#96;</code>. Avtomatik ravishda chaqiriladigan `func` funktsiyasi matnga ega va unga kiritilgan ifodalarni oladi va ularni qayta ishlatishi mumkin. Bu haqda batafsil ma'lumotni [hujjatlarda](mdn:/JavaScript/Reference/Template_literals#Tagged_template_literals) topishingiz mumkin. Agar matn oldida bir ifoda bo'lsa, unda shablon liniyasi "teglangan shablon" deb ataladi. Bu matnlar uchun shablonni ishlatishga imkon beradi, lekin amalda yorliq shablonlari kamdan-kam qo'llaniladi.

=======
Backticks also allow us to specify a "template function" before the first backtick. The syntax is: <code>func&#96;string&#96;</code>. The function `func` is called automatically, receives the string and embedded expressions and can process them. This is called "tagged templates". This feature makes it easier to implement custom templating, but is rarely used in practice. You can read more about it in the [manual](mdn:/JavaScript/Reference/Template_literals#Tagged_templates).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
Single and double quotes come from ancient times of language creation, when the need for multiline strings was not taken into account. Backticks appeared much later and thus are more versatile.

Backticks also allow us to specify a "template function" before the first backtick. The syntax is: <code>func&#96;string&#96;</code>. The function `func` is called automatically, receives the string and embedded expressions and can process them. This feature is called "tagged templates", it's rarely seen, but you can read about it in the MDN: [Template literals](mdn:/JavaScript/Reference/Template_literals#Tagged_templates).
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

## Maxsus belgilar

<<<<<<< HEAD
Ko'p satrli matn, shuningdek, bir yoki ikki tirnoq yordamida yaratilgan bo'lishi mumkin, "yangi satr belgisi" deb atalmish yordamida , qaysi `\n` sifatida qayd etiladi:
=======
It is still possible to create multiline strings with single and double quotes by using a so-called "newline character", written as `\n`, which denotes a line break:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let guestList = "Mehmonlar:\n * Elbek\n * Aziza\n * Oybek";

<<<<<<< HEAD
alert(guestList); // mehmonlarning ko'p satrli ro'yxati
```

<<<<<<< HEAD
Masalan, ushbu ikkita satr bir xil narsani tasvirlaydi:

```js run
alert( "Hello\nWorld" ); // "yangi satr belgisi" yordamida ikkita satr

// oddiy yangi satr va teskari qoshtirnoq yordamida ikkita satr
alert( `Hello
World` );
```

Boshqa, kamroq tarqalgan "maxsus" belgilar ham mavjud. Mana ro'yxat:
=======
For example, these two lines are equal, just written differently:
=======
alert(guestList); // a multiline list of guests, same as above
```

As a simpler example, these two lines are equal, just written differently:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js run
let str1 = "Hello\nWorld"; // two lines using a "newline symbol"

// two lines using a normal newline and backticks
let str2 = `Hello
World`;

alert(str1 == str2); // true
```

<<<<<<< HEAD
There are other, less common "special" characters.

Here's the full list:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
There are other, less common special characters:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

| Belgilar | Tavsifnoma |
|-----------|-------------|
<<<<<<< HEAD
|`\b`|Orqaga qaytarish|
|`\f`|Shakli qidiruv|
|`\n`|Yangi satr|
|`\r`|Tahsilot qaytarish|
|`\t`|Tab|
|`\uNNNN`|`NNNN` o'n oltilik son kodiga ega bo'lgan unikod belgisi, masalan `\u00A9` - `©` mualliflik huquqi belgisi uchun unikod. To'liq to'rta o'n oltilik son bo'lishi kerak. |
|`\u{NNNNNNNN}`|Ba'zi nodir belgilar 4 baytgacha bo'lgan ikkita unikod belgisi bilan kodlangan. Ushbu uzun unikod atrofga qavslarni talab qiladi.|

Unicode bilan misollar:

```js run
alert( "\u00A9" ); // ©
alert( "\u{20331}" ); // 佫, noyob xitoy iyeroglifi (uzun unikod)
alert( "\u{1F60D}" ); // 😍, tabassum qiladigan yuz belgisi (yana uzun unikod)
=======
|`\n`|New line|
|`\r`|In Windows text files a combination of two characters `\r\n` represents a new break, while on non-Windows OS it's just `\n`. That's for historical reasons, most Windows software also understands `\n`. |
|`\'`,&nbsp;`\"`,&nbsp;<code>\\`</code>|Quotes|
|`\\`|Backslash|
|`\t`|Tab|
|`\b`, `\f`, `\v`| Backspace, Form Feed, Vertical Tab -- mentioned for completeness, coming from old times, not used nowadays (you can forget them right now). |

As you can see, all special characters start with a backslash character `\`. It is also called an "escape character".

Because it's so special, if we need to show an actual backslash `\` within the string, we need to double it:

```js run
<<<<<<< HEAD
alert( "\u00A9" ); // ©
alert( "\u{20331}" ); // 佫, a rare Chinese hieroglyph (long Unicode)
alert( "\u{1F60D}" ); // 😍, a smiling face symbol (another long Unicode)
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

Barcha maxsus belgilar teskari kesma belgisi `\` bilan boshlanadi. Uni "qochish belgisi" deb ham atashadi.

<<<<<<< HEAD
Agar biz matnga qoshtirnoq qo'shmoqchi bo'lsak, uni ishlatamiz.
=======
We might also use it if we wanted to insert a quote into the string.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
alert( `The backslash: \\` ); // The backslash: \
```

So-called "escaped" quotes `\'`, `\"`, <code>\\`</code> are used to insert a quote into the same-quoted string.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

Masalan:

```js run
alert( 'I*!*\'*/!*m the Walrus!' ); // *!*I'm*/!* the Walrus!
```

Ko'rib turganingizdek, biz ichki qoshtirnoqni `\` teskari kesma belgisi bilan boshlashimiz kerak, chunki aks holda bu satr oxirini bildiradi.

<<<<<<< HEAD
Albatta, bu faqat qoshtirnoq bilan bir xil qoshtirnoqlarga tegishli. Shunday qilib, yanada oqilona yechim sifatida, biz uning o'rniga ikkita qoshtirnoq yoki teskari kesma belgisi bilan o'tishimiz mumkin:
=======
Of course, only the quotes that are the same as the enclosing ones need to be escaped. So, as a more elegant solution, we could switch to double quotes or backticks instead:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
alert( "I'm the Walrus!" ); // I'm the Walrus!
```

<<<<<<< HEAD
teskari kesma belgi `\` JavaScript-ni matnini to'g'ri o'qish uchun xizmat qiladi, keyin yo'qoladi. Xotira ichidagi satrda `\` yo'q. Buni `alert` da yuqoridagi misollardan aniq ko'rishingiz mumkin.

Agar matn ichida `\` haqiqiy teskari kesma belgisini ko'rsatish kerak bo'lsa-chi?

Bu mumkin, lekin biz buni `\\` kabi ikki baravar oshirishimiz kerak:

```js run
alert( `Teskari kesma belgisi: \\` ); // The backslash: \
```
=======
Besides these special characters, there's also a special notation for Unicode codes `\u…`, it's rarely used and is covered in the optional chapter about [Unicode](info:unicode).
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

## Matnning uzunligi

<<<<<<< HEAD

matn `length` xususiyatiga ega:
=======
The `length` property has the string length:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
alert( `My\n`.length ); // 3
```

`\n` "maxsus" belgi ekanligini unutmang, shuning uchun uning uzunligi `3` ga teng.

```warn header="`length` bu xususiyat"
Ba'zi bir boshqa tillarda tajriba ega odamlar ba'zida `str.length` o'rniga `str.length()` deb chaqirib xato yozadilar. Bu ishlamaydi.

<<<<<<< HEAD
Iltimos, `str.length` funktsiya emas, balki raqamli xususiyat ekanligini unutmang. Undan keyin qavs qo'shishning hojati yo'q.
=======
Please note that `str.length` is a numeric property, not a function. There is no need to add parenthesis after it. Not `.length()`, but `.length`.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
```

## Belgilarga kirish

<<<<<<< HEAD
Belgini `pos` holatida olish uchun kvadrat qavslardan foydalaning `[pos]` yoki usulni chaqiring [str.charAt(pos)](mdn:js/String/charAt). Birinchi belgi nol holatidan boshlanadi:
=======
To get a character at position `pos`, use square brackets `[pos]` or call the method [str.at(pos)](mdn:js/String/at). The first character starts from the zero position:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js run
let str = `Salom`;

// the first character
<<<<<<< HEAD
alert( str[0] ); // S
alert( str.charAt(0) ); // S

// the last character
alert( str[str.length - 1] ); // m
```

Kvadrat qavslar - bu belgi olishning zamonaviy usuli, `charAt` asosan tarixiy sabablarga ko'ra mavjud.

Ularning orasidagi yagona farq shundaki, agar hech qanday belgi topilmasa, `[]` `undefined` ni, va `charAt` bo'sh satrni qaytaradi:
=======
alert( str[0] ); // H
alert( str.at(0) ); // H

// the last character
alert( str[str.length - 1] ); // o
alert( str.at(-1) );
```

As you can see, the `.at(pos)` method has a benefit of allowing negative position. If `pos` is negative, then it's counted from the end of the string.

So `.at(-1)` means the last character, and `.at(-2)` is the one before it, etc.

The square brackets always return `undefined` for negative indexes, for instance:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js run
let str = `Salom`;

<<<<<<< HEAD
alert( str[1000] ); // undefined
alert( str.charAt(1000) ); // '' (bo'sh matn)
=======
alert( str[-2] ); // undefined
alert( str.at(-2) ); // l
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
```

Shuningdek, `for..of` yordamida matni birma-bir ajratib olishimiz mumkin:

```js run
for (let char of "Salom") {
  alert(char); // S,a,l,o,m (char birinchi "S", so'ng "a", "l" va hokazo)
}
```

## Matnlar o'zgarmasdir

JavaScript-da matnlarni o'zgartirish mumkin emas. Belgini o'zgartirish mumkin emas.

Keling, ishlamashini ko'rsatish uchun masala ko'raylik:

```js run
let str = 'Salom';

str[0] = 's'; // hato
alert( str[0] ); // ishlamaydi
```

Odatiy yechim - bu butunlay yangi matnni yaratish va eskisi o'rniga `str` ni belgilash.

Masalan:

```js run
let str = 'Hi';

<<<<<<< HEAD
str = 'h' + str[1];  // matnni almashtiring
=======
str = 'h' + str[1]; // replace the string
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

alert( str ); // hi
```

Keyingi bo'limlarda biz bunga ko'proq misollarni ko'rib chiqamiz.

## Registrni o'zgartirish

[ToLowerCase()](mdn:js/String/toLowerCase) va [toUpperCase()](mdn:js/String/toUpperCase) usullari quyidagicha registr o'zgartiradi:

```js run
alert( 'Javascript'.toUpperCase() ); // JAVASCRIPT
alert( 'Javascript'.toLowerCase() ); // javascript
```

Yoki bitta belgi past registr bilan yozilishini xohlasak:

<<<<<<< HEAD
```js
alert( 'Javascript'[0].toLowerCase() ); // 'j'
=======
```js run
alert( 'Interface'[0].toLowerCase() ); // 'i'
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
```

## Submatn qidiruvi

Matn ichida submatnni izlashning bir necha yo'li mavjud.

### str.indexOf

Birinchi usul bu [str.indexOf(substr, pos)](mdn:js/String/indexOf).

U `pos` pozitsiyasidan boshlab `str` dagi `substr` ni qidiradi va mos keladigan joyni qaytaradi yoki hech narsa topilmasa `-1`.

Masalan:

```js run
let str = 'Id bilan vidjet';

alert( str.indexOf('vidjet') ); // 2, chunki 'vidjet' ohirida topildi
alert( str.indexOf('Vidjet') ); // -1, topilmadi, qidiruv registr tepa yoki pastligiga ahamiyatga ega

alert( str.indexOf("Id") ); // 0, "Id" 0 chi positsiyada topildi
```

<<<<<<< HEAD
Ixtiyoriy ikkinchi parametr bizga berilgan pozitsiyadan boshlab qidirish imkoniyatini beradi.
=======
The optional second parameter allows us to start searching from a given position.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Masalan, `"id"` ning birinchi paydo bo'lishi `1` chi indeks holatidadir. Keyingi o'xshashni izlash uchun qidirishni `2` chi pozitsiyasidan boshlaymiz:

```js run
let str = 'Widget with id';

alert( str.indexOf('id', 2) ) // 12
```

<<<<<<< HEAD

Agar biz barcha hodisalarga qiziqish bildirsak, biz `indexOf` ni tsiklda ishlatishimiz mumkin. Har bir yangi chaqiruv avvalgi o'xshash keyingi pozitsiya bilan amalga oshiriladi:
=======
If we're interested in all occurrences, we can run `indexOf` in a loop. Every new call is made with the position after the previous match:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let str = 'As sly as a fox, as strong as an ox';

let target = 'as'; // buni qidiramiz

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( `Found at ${foundPos}` );
  pos = foundPos + 1; // keyingi pozitsiyadan qidirishni davom eting
}
```

Xuddi shu algoritmni qisqartirish mumkin:

```js run
let str = "As sly as a fox, as strong as an ox";
let target = "as";

*!*
let pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
  alert( pos );
}
*/!*
```

```smart header="`str.lastIndexOf(submatn, positsiya)`"
Satrning oxiridan boshigacha qidiradigan shunga o'xshash usul [str.lastIndexOf(submatn, positsiya)](mdn:js/String/lastIndexOf) mavjud.

Bu hodisalarni teskari tartibda ro'yxatlashi kerak edi.
```

`if` testida `indexOf` bilan biroz noqulaylik mavjud. Buni `if` ga qo'yib bo'lmaydi:

```js run
let str = "Widget with id";

if (str.indexOf("Widget")) {
    alert("Biz buni topdik"); // ishlamaydi!
}
```

`str.indexOf("Widget")` `0` ni qaytarganligi sababli yuqoridagi misolda `alert` ko'rsatilmaydi (bu o'xshash boshlang'ich pozitsiyada topganligini anglatadi). To'g'ri, lekin `if` `0` ni `false` deb hisoblaydi.

Shunday qilib, biz `-1` ni tekshirishimiz kerak, masalan:

```js run
let str = "Widget with id";

*!*
if (str.indexOf("Widget") != -1) {
*/!*
    alert("Biz buni topdik"); // hozir ishlaydi!
```

<<<<<<< HEAD
<<<<<<< HEAD
````smart header="Bitlik YO'Q operatori bilan hiyla"
Bu yerda ishlatilgan eski hiyla-nayranglardan biri bu [bitlik YO'Q](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT) `~` operatori. U raqamni 32-bitli butun songa o'zgartiradi (agar mavjud bo'lsa, o'nli qismni olib tashlaydi) va keyin ikkitomonlama tasvirdagi barcha bitlarni teskari yo'naltiradi.

32-bitli sonlar uchun `~n` chaqiruvi `-(n + 1)` (IEEE-754 formati tufayli) bilan bir xil ma'noni anglatadi.
=======
#### The bitwise NOT trick

One of the old tricks used here is the [bitwise NOT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_NOT) `~` operator. It converts the number to a 32-bit integer (removes the decimal part if exists) and then reverses all bits in its binary representation.

In practice, that means a simple thing: for 32-bit integers `~n` equals `-(n+1)`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Masalan:

```js run
alert( ~2 ); // -3, -(2+1) bilan bir xil 
alert( ~1 ); // -2, -(1+1) bilan bir xi
alert( ~0 ); // -1, -(0+1) bilan bir xi
*!*
alert( ~-1 ); // 0, -(-1+1) bilan bir xi)
*/!*
```

<<<<<<< HEAD
Ko'rib turganimizdek, `n == -1` bo'lsa, `~n` nolga teng.

Shunday qilib, `if(~ str.indexOf(" ... "))` testi `indexOf` ning natijasi `-1` emasligiga ishonch hosil qiladi. Boshqacha qilib aytganda, o'xshash bo'lmasa.
=======
As we can see, `~n` is zero only if `n == -1` (that's for any 32-bit signed integer `n`).

So, the test `if ( ~str.indexOf("...") )` is truthy only if the result of `indexOf` is not `-1`. In other words, when there is a match.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Odamlar buni `indexOf` tekshirishlarini qisqartirish uchun ishlatishadi:

```js run
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert( 'Topildi!' ); // ishlaydi
}
```

Odatda til xususiyatlaridan noaniq usulda foydalanish tavsiya etilmaydi, ammo bu hiyla-nayrang eski kodda keng qo'llaniladi, shuning uchun biz buni tushunishimiz kerak.

<<<<<<< HEAD
Eslab qoling: `if (~str.indexOf(...))` "if found" deb o'qiydi.
````
=======
Just remember: `if (~str.indexOf(...))` reads as "if found".

To be precise though, as big numbers are truncated to 32 bits by `~` operator, there exist other numbers that give `0`, the smallest is `~4294967295=0`. That makes such check correct only if a string is not that long.

Right now we can see this trick only in the old code, as modern JavaScript provides `.includes` method (see below).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

=======
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
### includes, startsWith, endsWith

Zamonaviy usul [str.includes (substr, pos)](mdn:js/String/include) `str` tarkibida `substr` mavjudligiga qarab `true/false` ni qaytaradi.

Agar o'xshashni topish uchun sinov o'tkazish kerak bo'lsa, lekin uning pozitsiyasi kerak bo'lmasa, bu to'g'ri tanlov:

```js run
alert( "Widget with id".includes("Widget") ); // true

alert( "Hello".includes("Bye") ); // false
```

`str.includes` ning ixtiyoriy ikkinchi argumenti - qidirishni boshlash pozitsiyasi:

```js run
<<<<<<< HEAD
alert( "Midget".includes("id") ); // true
alert( "Midget".includes("id", 3) ); // false, 3-pozitsiyadan "id" yo'q
=======
alert( "Widget".includes("id") ); // true
alert( "Widget".includes("id", 3) ); // false, from position 3 there is no "id"
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

[str.startsWith](mdn:js/String/startWith) va [str.endsWith](mdn:js/String/endsWith) usullari ular ifodalanganak ishlarni bajaradi:

```js run
<<<<<<< HEAD
<<<<<<< HEAD
alert( "Widget".startsWith("Wid") ); // true, "Widget" "Wid" bilan boshlanadi
alert( "Widget".endsWith("get") );   // true, "Widget" "get" bilan tugaydi
=======
alert( "Widget".startsWith("Wid") ); // true, "Widget" starts with "Wid"
alert( "Widget".endsWith("get") ); // true, "Widget" ends with "get"
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
alert( "*!*Wid*/!*get".startsWith("Wid") ); // true, "Widget" starts with "Wid"
alert( "Wid*!*get*/!*".endsWith("get") ); // true, "Widget" ends with "get"
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
```

## Submatn olish

Submatnni olish uchun JavaScript-da uchta usul mavjud: `substring`,` substr` va `slice`.

`str.slice(start [, end])`
: `start` dan (shu jumladan emas) `end` gacha matnning bir qismini qaytaradi.

    Masalan:

    ```js run
    let str = "stringify";
    alert( str.slice(0, 5) ); // 'strin', 0 dan 5 gacha submatn (5 dan tashqari)
    alert( str.slice(0, 1) ); // 's', from 0 to 1, 1 ni o'z ichiga olmaydi, shuning uchun faqat 0 belgisi mavjud
    ```

    Agar ikkinchi argument bo'lmasa, `slice` satr oxirigacha boradi:

    ```js run
    let str = "st*!*ringify*/!*";
<<<<<<< HEAD
    alert( str.slice(2) ); // ringify, 2-pozitsiyadan oxirigacha
=======
    alert( str.slice(2) ); // 'ringify', from the 2nd position till the end
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    ```

    `start/end` uchun salbiy qiymatlar ham bo'lishi mumkin. Ular pozitsiyani matn oxiridan hisoblanishini anglatadi:

    ```js run
    let str = "strin*!*gif*/!*y";

<<<<<<< HEAD
    // o'ng tomondan 4-pozitsiyadan boshlang, o'ngdan 1-songa tugating
    alert( str.slice(-4, -1) ); // gif
=======
    // start at the 4th position from the right, end at the 1st from the right
    alert( str.slice(-4, -1) ); // 'gif'
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    ```

`str.substring(start [, end])`
<<<<<<< HEAD
: Matnning  qismini  `start` va` end` *oralig'ida* qaytaradi.

    Bu deyarli `slice` bilan bir xil, ammo `start` ning `end` dan katta bo'lishiga imkon beradi.
=======
: Returns the part of the string *between* `start` and `end` (not including `end`).

    This is almost the same as `slice`, but it allows `start` to be greater than `end` (in this case it simply swaps `start` and `end` values).
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

    Masalan:

    ```js run
    let str = "st*!*ring*/!*ify";

    // bu submatn uchun bir xil
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // ...lekin slice uchun emas:
    alert( str.slice(2, 6) ); // "ring" (bir xil)
    alert( str.slice(6, 2) ); // "" (bo'sh satr)

    ```

    Salbiy argumentlar (slice dan tashqari) qo'llab-quvvatlanmaydi, ular `0` sifatida baholanadi.

`str.substr(start [, length])`
: Matnning qismini `start` dan, `uzunlik` bilan qaytaradi.

    Oldingi usullardan farqli o'laroq, bu bizga so'nggi positsiya o'rniga `uzunlikni` belgilashga imkon beradi:

    ```js run
    let str = "st*!*ring*/!*ify";
<<<<<<< HEAD
    alert( str.substr(2, 4) ); // ring, 2-pozitsiyadan 4 ta belgini oling
=======
    alert( str.substr(2, 4) ); // 'ring', from the 2nd position get 4 characters
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    ```

    Birinchi argument salbiy bo'lishi mumkin, oxiridan hisoblash uchun:

    ```js run
    let str = "strin*!*gi*/!*fy";
<<<<<<< HEAD
    alert( str.substr(-4, 2) ); // gi, 4-pozitsiyadan 2 ta belgini oling
=======
    alert( str.substr(-4, 2) ); // 'gi', from the 4th position get 2 characters
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    ```

<<<<<<< HEAD
Chalkashmaslik uchun ushbu usullarni qayta ko'rib chiqamiz:
=======
    This method resides in the [Annex B](https://tc39.es/ecma262/#sec-string.prototype.substr) of the language specification. It means that only browser-hosted Javascript engines should support it, and it's not recommended to use it. In practice, it's supported everywhere.

Let's recap these methods to avoid any confusion:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

| usul | tanlaydi... | salbiy |
|--------|-----------|-----------|
<<<<<<< HEAD
| `slice(start, end)` | `start` dan `end` gacha (`end` ni hisobga olmaganda) | salbiylarga imkon beradi |
| `substring(start, end)` | `start` va `end` o'rtasida | salbiy qiymatlar `0` ni anglatadi |
| `substr(start, length)` | `start` dan `length` belgilarini oling | salbiyga yo'l qo'yadi `start` |
=======
| `slice(start, end)` | from `start` to `end` (not including `end`) | allows negatives |
| `substring(start, end)` | between `start` and `end` (not including `end`)| negative values mean `0` |
| `substr(start, length)` | from `start` get `length` characters | allows negative `start` |
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

<<<<<<< HEAD

```smart header="Qaysi birini tanlash kerak?"
Ularning barchasi ishni bajarishi mumkin. Rasmiy ravishda, `substr` ning ozgina kamchiliklari bor: u asosiy JavaScript spetsifikatsiyasida emas, balki faqat tarixiy sabablarga ko'ra mavjud bo'lgan faqat brauzer xususiyatlarini o'z ichiga olgan B-ilovada tasvirlangan. Shunday qilib, brauzerdan tashqari muhit uni qo'llab-quvvatlamasligi mumkin. Ammo amalda u hamma joyda ishlaydi.

Boshqa ikkita variantdan `slice` yanada moslashuvchan, u salbiy argumentlarni qo'llab-quvvatlaydi va uni yozish uchun qisqartiriladi. Shunday qilib, asosan, uni faqat eslab qolishingiz mumkin.
=======
```smart header="Which one to choose?"
All of them can do the job. Formally, `substr` has a minor drawback: it is described not in the core JavaScript specification, but in Annex B, which covers browser-only features that exist mainly for historical reasons. So, non-browser environments may fail to support it. But in practice it works everywhere.

<<<<<<< HEAD
Of the other two variants, `slice` is a little bit more flexible, it allows negative arguments and shorter to write. So, it's enough to remember solely `slice` of these three methods.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
Of the other two variants, `slice` is a little bit more flexible, it allows negative arguments and shorter to write.

So, for practical use it's enough to remember only `slice`.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
```

## Matnlarni taqqoslash

<Info:comparison> bobidan ma'lum bo'lganidek, satrlar alfavit tartibida belgilar bo'yicha belgilar bilan taqqoslanadi.

Garchi ba'zi g'alati narsalar mavjud.

1. Past registr harf har doim tepa registr harfdan katta:

    ```js run
    alert( 'a' > 'Z' ); // true
    ```

2. Diakritik belgilari bo'lgan harflar "tartibsiz":

    ```js run
    alert( 'Österreich' > 'Zealand' ); // true
    ```

    Agar ushbu mamlakat nomlarini saralasak, bu g'alati natijalarga olib kelishi mumkin. Odatda odamlar `Zelandiya` ro'yxatda `Österreich` dan keyin keladi deb kutishardi.

<<<<<<< HEAD
Nima bo'lishini tushunish uchun keling, JavaScript-dagi matlarning ichki ko'rinishini ko'rib chiqamiz.

Barcha satrlar [UTF-16](https://en.wikipedia.org/wiki/UTF-16) yordamida kodlangan. Ya'ni: har bir belgi tegishli raqamli kodga ega. Kod va orqaga belgini olishga imkon beradigan maxsus usullar mavjud.

`str.codePointAt(pos)`
: Belgining kodini `poz` holatida qaytaradi:

    ```js run
    // turli xil regist harflar turli xil kodlarga ega
    alert( "z".codePointAt(0) ); // 122
=======
To understand what happens, we should be aware that strings in Javascript are encoded using [UTF-16](https://en.wikipedia.org/wiki/UTF-16). That is: each character has a corresponding numeric code.

There are special methods that allow to get the character for the code and back:

`str.codePointAt(pos)`
: Returns a decimal number representing the code for the character at position `pos`:

    ```js run
    // different case letters have different codes
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
    alert( "Z".codePointAt(0) ); // 90
    alert( "z".codePointAt(0) ); // 122
    alert( "z".codePointAt(0).toString(16) ); // 7a (if we need a hexadecimal value)
    ```

`String.fromCodePoint(code)`
: Raqamli `kodi` bilan belgi hosil qiladi

    ```js run
    alert( String.fromCodePoint(90) ); // Z
<<<<<<< HEAD
    ```

<<<<<<< HEAD
    Unicode belgilarini `\u` dan keyin o'n oltinchi tizimdagi kod yordamida ularning kodlarini yoshishimiz mumkin:
=======
    We can also add Unicode characters by their codes using `\u` followed by the hex code:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

    ```js run
    // 90 o'n oltinchi tizimda 5a
    alert( '\u005a' ); // Z
=======
    alert( String.fromCodePoint(0x5a) ); // Z (we can also use a hex value as an argument)
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
    ```

Endi `65..220` (lotin alifbosi va biroz qo'shimcha) kodlari bo'lgan belgilarni ularning matnini yaratib ko'raylik:

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// Output:
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

<<<<<<< HEAD
Ko'ryapsizmi? Avval tepa registr harflar, so'ngra bir nechta maxsus belgilar, keyin past registr harflar yoziladi.
=======
See? Capital characters go first, then a few special ones, then lowercase characters, and `Ö` near the end of the output.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Endi nima uchun `a > Z` ekanligi oydinlashadi.

Belgilar raqamli kod bilan taqqoslanadi. Katta kod belgining kattaroqligini anglatadi. `a` (97) kodi `Z` (90) kodidan katta.

<<<<<<< HEAD
- Barcha past registr harflar tepa registr harflardan keyin ketadi, chunki ularning kodlari kattaroq.
- `Ö` kabi ba'zi harflar asosiy alifbodan ajralib turadi. Bu erda u kod `a` dan `z` gacha bo'lgan harflardan kattaroqdir.


### To'g'ri taqqoslashlar

Matnlarni taqqoslash uchun "to'g'ri" algoritm tuyulishi ancha murakkab, chunki alifbolar har xil tillar uchun har xil. Bir xil ko'rinishga ega bo'lgan harf turli alifbolarda turlicha joylashishi mumkin.
=======
- All lowercase letters go after uppercase letters because their codes are greater.
- Some letters like `Ö` stand apart from the main alphabet. Here, its code is greater than anything from `a` to `z`.

### Correct comparisons [#correct-comparisons]

The "right" algorithm to do string comparisons is more complex than it may seem, because alphabets are different for different languages.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Shunday qilib, brauzer taqqoslash uchun tilni bilishi kerak.

<<<<<<< HEAD
<<<<<<< HEAD
Yaxshiyamki, barcha zamonaviy brauzerlar (IE10- qo'shimcha kutubxonani talab qiladi [Intl.JS](https://github.com/andyearnshaw/Intl.js/) [ECMA 402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf) xalqarolashtirish standartini qo'llab-quvvatlaydi. 
=======
Luckily, all modern browsers (IE10- requires the additional library [Intl.js](https://github.com/andyearnshaw/Intl.js/)) support the internationalization standard [ECMA-402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
Luckily, modern browsers support the internationalization standard [ECMA-402](https://www.ecma-international.org/publications-and-standards/standards/ecma-402/).
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

U turli xil tillardagi satrlarni ularning qoidalariga rioya qilgan holda taqqoslash uchun maxsus usulni taqdim etadi.

<<<<<<< HEAD
Chaqiruv [str.localeCompare(str2)](mdn:js/String/localeCompare):

- Til qoidalariga ko'ra `str` `str2` dan katta bo'lsa, `1` qiymatini qaytaradi.
- Agar `str` `str2` dan kichik bo'lsa, `-1` qiymatini qaytaradi.
- Agar ular teng bo'lsa, `0` qiymatini qaytaradi.
=======
The call [str.localeCompare(str2)](mdn:js/String/localeCompare) returns an integer indicating whether `str` is less, equal or greater than `str2` according to the language rules:

- Returns a negative number if `str` is less than `str2`.
- Returns a positive number if `str` is greater than `str2`.
- Returns `0` if they are equivalent.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Masalan:

```js run
alert( 'Österreich'.localeCompare('Zealand') ); // -1
```

<<<<<<< HEAD
Ushbu usul aslida [hujjatlarda](mdn:js/String/localeCompare) ko'rsatilgan ikkita qo'shimcha argumentga ega, bu tilni belgilashga imkon beradi (sukut bo'yicha atrof-muhitdan olingan) va ishning sezgirligi kabi qo'shimcha qoidalarni o'rnatish yoki `"a"` va `"á"` bir xil deb hisoblaydi.
=======
This method actually has two additional arguments specified in [the documentation](mdn:js/String/localeCompare), which allows it to specify the language (by default taken from the environment, letter order depends on the language) and setup additional rules like case sensitivity or should `"a"` and `"á"` be treated as the same etc.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

<<<<<<< HEAD
## Ichki mexanizm, Unikod

```warn header="Ilg'or bilim"
Bo'lim matnning ichki qismiga chuqurroq kiradi. Agar siz emoji, noyob matematik yoki ieroglif belgilar yoki boshqa noyob belgilar bilan ishlashni rejalashtirmoqchi bo'lsangiz, ushbu ma'lumot siz uchun foydali bo'ladi.

Agar siz ularni qo'llab-quvvatlashni rejalashtirmasangiz, bo'limni o'tkazib yuborishingiz mumkin.
```

### Surroqat juftlari

<<<<<<< HEAD
Ko'pgina belgilar 2 baytlik kodga ega. Ko'pgina evropa tillaridagi harflar, raqamlar va hatto aksariyat iyerogliflar 2 baytli tasvirga ega.
=======
All frequently used characters have 2-byte codes. Letters in most european languages, numbers, and even most hieroglyphs, have a 2-byte representation.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Ammo 2 bayt faqat 65536 ta kombinatsiyaga ruxsat beradi va bu har qanday mumkin bo'lgan belgilar uchun yetarli emas. Noyob belgilar "surrogat jufti" deb nomlangan 2 baytli juftlik bilan kodlangan.

Bunday belgilarning uzunligi `2` dir:

```js run
<<<<<<< HEAD
alert( '𝒳'.length ); // 2, MATEMATIK SKRIPT X
alert( '😂'.length ); // 2, QUVONCH YO'LLARI BILAN EMODJI
alert( '𩷶'.length ); // 2, noyob xitoy iyeroglifi
=======
alert( '𝒳'.length ); // 2, MATHEMATICAL SCRIPT CAPITAL X
alert( '😂'.length ); // 2, FACE WITH TEARS OF JOY
alert( '𩷶'.length ); // 2, a rare Chinese hieroglyph
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

JavaScript-ni yaratishda surrogat juftlari mavjud bo'lmaganligini va shuning uchun til tomonidan to'g'ri ishlanmaganligini unutmang!

Yuqoridagi satrlarning har birida bizda bitta belgi bor, lekin `uzunlik` `2` ko'rsatadi.

`String.fromCodePoint` va `str.codePointAt` surrogat juftlari bilan shug'ullanadigan kamdan-kam uchraydigan usullardir. Ular yaqinda tilda paydo bo'ldi. Ulardan oldin faqat [String.fromCharCode](mdn:js/String/fromCharCode) va [str.charCodeAt](mdn:js/String/charCodeAt) mavjud edi. Ushbu usullar aslida `fromCodePoint/codePointAt` bilan bir xil, ammo surrogat juftlari bilan ishlamaydi.

<<<<<<< HEAD
Lekin, masalan, ramzni olish juda qiyin bo'lishi mumkin, chunki surrogat juftlari ikkita belgi sifatida qaraladi:
=======
Getting a symbol can be tricky, because surrogate pairs are treated as two characters:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
alert( '𝒳'[0] ); // g'alati belgilar...
alert( '𝒳'[1] ); // ...surrogat juftligining qismlari
```

Surrogat juftining qismlari bir-birisiz hech qanday ma'noga ega emasligiga e'tibor bering. Shunday qilib, yuqoridagi misoldagi ogohlantirishlar aslida axlatni namoyish etadi.

Texnik jihatdan, surrogat juftliklari ularning kodlari bilan ham aniqlanadi: agar belgi `0xd800..0xdbff` oralig'ida kodga ega bo'lsa, demak bu surrogat juftlikning birinchi qismidir. Keyingi belgi (ikkinchi qism) `0xdc00..0xdfff` oralig'ida kodga ega bo'lishi kerak. Ushbu intervallar faqat standart surrogat juftlari uchun ajratilgan.

Yuqoridagi holatda:

```js run
// charCodeAt surrogat-juftlardan emas, shuning uchun kod qismlarini beradi

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835, 0xd800 va 0xdbff orasida
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3, 0xdc00 va 0xdfff orasida
```

Surroqat juftlari bilan ishlashning ko'proq usullarini keyinroq <info:iterable> bobida topasiz. Ehtimol, buning uchun ham maxsus kutubxonalar mavjud, ammo bu yerda taklif etadigan darajada mashhur narsa yo'q.

### Diakritik belgilar va normalizatsiya

Ko'pgina tillarda yuqorida/ostida belgisi bo'lgan asosiy belgidan tashkil topgan belgilar mavjud.

Masalan, `a` harfi: `aaâäãåā` uchun asosiy belgi bo'lishi mumkin. UTF-16 jadvalida eng keng tarqalgan "kompozitsion" belgilar o'z kodlariga ega. Ammo bu ularning hammasi emas, chunki mumkin bo'lgan kombinatsiyalar juda ko'p.

<<<<<<< HEAD
Kompozitsiyalarni qo'llab-quvvatlash uchun UTF-16 bizga bir nechta kodli belgilarni ishlatishga imkon beradi. Asosiy belgi va uni "bezatuvchi" bir yoki bir nechta "belgiluvchan" belgilar.
=======
To support arbitrary compositions, UTF-16 allows us to use several Unicode characters: the base character followed by one or many "mark" characters that "decorate" it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Masalan, agar bizda `S`, va maxsus "yuqoridagi nuqta" belgisi (kod `\u0307`) bo'lsa, u Ṡ shaklida ko'rsatiladi.

```js run
alert( 'S\u0307' ); // Ṡ
```

Agar bizga harfning yuqorisida (yoki uning ostida) qo'shimcha belgi kerak bo'lsa - muammo bo'lmaydi, shunchaki kerakli belgisini qo'shing.

Masalan, agar biz "pastdagi nuqta" belgisini qo'shsak (kod `\u0323`), unda bizda "yuqorida va pastda nuqta bo'lgan S" bo'ladi: `Ṩ`.

Masalan:

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

<<<<<<< HEAD
Bu ajoyib moslashuvchanlikni, shuningdek, qiziqarli muammolarni keltirib chiqaradi: ikkita belgi bir xil ko'rinishi mumkin, ammo unikodning turli xil kompozitsiyalari bilan ifodalanishi mumkin.
=======
This provides great flexibility, but also an interesting problem: two characters may visually look the same, but be represented with different Unicode compositions.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Masalan:

```js run
<<<<<<< HEAD
alert( 'S\u0307\u0323' ); // Ṩ, S + yuqoridagi nuqta + pastdagi nuqta
alert( 'S\u0323\u0307' ); // Ṩ, S + yuqoridagi nuqta + pastdagi nuqta
=======
let s1 = 'S\u0307\u0323'; // Ṩ, S + dot above + dot below
let s2 = 'S\u0323\u0307'; // Ṩ, S + dot below + dot above
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // false though the characters look identical (?!)
```

<<<<<<< HEAD
Buni hal qilish uchun har bir satrni bitta "normal" shaklga keltiradigan "unikod normallashtirish" algoritmi mavjud.
=======
To solve this, there exists a "Unicode normalization" algorithm that brings each string to the single "normal" form.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

U [str.normalize()](mdn:js/String/normalize) tomonidan amalga oshiriladi.

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

Bizning holatimizda `normalize()` aslida uchta belgidan iborat ketma-ketlikni bitta belgiga birlashtirishi kulgili: `\u1e68` (ikkita nuqta bilan S).

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

<<<<<<< HEAD
Aslida, bu har doim ham shunday emas. Buning sababi, `Ṩ` belgisi "yetarlicha keng tarqalgan", shuning uchun UTF-16 yaratuvchilari uni asosiy jadvalga kiritdilar va unga kod berdilar.
=======
In reality, this is not always the case. The reason being that the symbol `Ṩ` is "common enough", so UTF-16 creators included it in the main table and gave it the code.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Agar siz normallashtirish qoidalari va variantlari haqida ko'proq bilmoqchi bo'lsangiz - ular Unikod standartining ilovasida keltirilgan: [Unikod normalizatsiya shakllari](http://www.unicode.org/reports/tr15/), lekin eng amaliy maqsadlar uchun ushbu bo'lim ma'lumotlari yetarli.

<<<<<<< HEAD

## Xulosa

- 3 ta qoshtirnoq mavjud. Teskari qoshtirnoq magtnga bir nechta satrlarni va iboralarni joylashtirishga imkon beradi.
- JavaScript-dagi satrlar UTF-16 yordamida kodlangan.
- Biz `\n` kabi maxsus belgilarni ishlatishimiz va `\u ...` yordamida unikodlari bo'yicha harflarni kiritishimiz mumkin.
- Belgini olish uchun quyidagidan foydalaning: "[]`.
- Submatnni olish uchun quyidagini ishlating: `slice` yoki `substring`.
- Matnni past/tepa registr harflar bilan o'zgartirish uchun quyidagilarni ishlating: `toLowerCase/toUpperCase`.
- Submatnni qidirish uchun quyidagilarni ishlating: `indexOf`, yoki `includes/beginWith/endsWith` oddiy tekshirishlar uchun.
- Satrlarni tilga ko'ra solishtirish uchun quyidagini ishlating: `localCompare`, aks holda ular belgilar kodlari bilan taqqoslanadi.
=======
=======
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
## Summary

- There are 3 types of quotes. Backticks allow a string to span multiple lines and embed expressions `${…}`.
- We can use special characters, such as a line break `\n`.
- To get a character, use: `[]` or `at` method.
- To get a substring, use: `slice` or `substring`.
- To lowercase/uppercase a string, use: `toLowerCase/toUpperCase`.
- To look for a substring, use: `indexOf`, or `includes/startsWith/endsWith` for simple checks.
- To compare strings according to the language, use: `localeCompare`, otherwise they are compared by character codes.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Satrlarda yana bir nechta foydali usullar mavjud:

<<<<<<< HEAD
- `str.trim()` -- matnning boshidan va oxiridan bo'shliqlarni olib tashlaydi.
- `str.repeat(n)` -- qatorni `n` marta takrorlaydi.
- ... va boshqalar. Tafsilotlar uchun [qo'llanmani](mdn:js/String) ko'ring.

Matnlar shuningdek, qidiruvni amalga oshirish/oddiy ifodalar bilan almashtirish usullariga ega. Ammo bu mavzu alohida bobga loyiqdir, shuning uchun keyinroq qaytamiz.
=======
- `str.trim()` -- removes ("trims") spaces from the beginning and end of the string.
- `str.repeat(n)` -- repeats the string `n` times.
- ...and more to be found in the [manual](mdn:js/String).

Strings also have methods for doing search/replace with regular expressions. But that's big topic, so it's explained in a separate tutorial section <info:regular-expressions>.
<<<<<<< HEAD
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======

Also, as of now it's important to know that strings are based on Unicode encoding, and hence there're issues with comparisons. There's more about Unicode in the chapter <info:unicode>.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
