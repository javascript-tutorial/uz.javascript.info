# Satrlar

JavaScript-da matnli ma'lumotlar satrlar sifatida saqlanadi. Bitta belgi uchun alohida tip yo'q.

Satrlarning ichki formati har doim [UTF-16](https://en.wikipedia.org/wiki/UTF-16), u sahifa kodlashiga bog'liq emas.

## Qo'shtirnoqlar

Qo'shtirnoq turlarini eslaymiz.

Satrlar bitta qo'shtirnoq, qo'sh qo'shtirnoq yoki teskari qo'shtirnoq ichiga olinishi mumkin:

```js
let single = "bitta qo'shtirnoq";
let double = "qo'sh qo'shtirnoq";

let backticks = `teskari qo'shtirnoqlar`;
```

Bitta va qo'sh qo'shtirnoqlar aslida bir xil. Teskari qo'shtirnoqlar esa bizga har qanday ifodani `${…}` ichiga o'rab satrga kiritish imkonini beradi:

```js run
function sum(a, b) {
  return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
```

Teskari qo'shtirnoqlarni ishlatishning yana bir afzalligi - ular satrning bir nechta qatorga cho'zilishiga imkon beradi:

```js run
let guestList = `Mehmonlar:
 * John
 * Pete
 * Mary
`;

alert(guestList); // mehmonlar ro'yxati, bir nechta qator
```

Tabiiy ko'rinadi, to'g'rimi? Lekin bitta yoki qo'sh qo'shtirnoqlar bunday ishlamaydi.

Agar ularni ishlatib, bir nechta qatordan foydalanishga harakat qilsak, xato bo'ladi:

```js run
let guestList = "Mehmonlar: // Xato: Unexpected token ILLEGAL
  * John";
```

<<<<<<< HEAD
Bitta va qo'sh qo'shtirnoqlar tilning yaratilishi qadimgi davrlaridan keladi, o'sha paytda ko'p qatorli satrlar ehtiyoji hisobga olinmagan edi. Teskari qo'shtirnoqlar ancha keyinroq paydo bo'lgan va shuning uchun ko'proq imkoniyatlarga ega.

Teskari qo'shtirnoqlar shuningdek birinchi teskari qo'shtirnoqdan oldin "shablon funksiyasini" belgilashga imkon beradi. Sintaksis: <code>func&#96;string&#96;</code>. `func` funksiyasi avtomatik ravishda chaqiriladi, satr va kiritilgan ifodalarni oladi va ularni qayta ishlashi mumkin. Bu xususiyat "teglangan shablonlar" deb ataladi, u kamdan-kam uchraydi, lekin bu haqda MDN da o'qishingiz mumkin: [Template literals](mdn:/JavaScript/Reference/Template_literals#Tagged_templates).
=======
Single and double quotes come from ancient times of language creation, when the need for multiline strings was not taken into account. Backticks appeared much later and thus are more versatile.

Backticks also allow us to specify a "template function" before the first backtick. The syntax is: <code>func&#96;string&#96;</code>. The function `func` is called automatically, receives the string and embedded expressions and can process them. This feature is called "tagged templates", it's rarely seen, but you can read about it in the MDN: [Template literals](mdn:/JavaScript/Reference/Template_literals#Tagged_templates).
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

## Maxsus belgilar

Bitta va qo'sh qo'shtirnoqlar bilan ham ko'p qatorli satrlarni "yangi qator belgisi" deb ataladigan `\n` yordamida yaratish mumkin, bu qator uzilishini bildiradi:

```js run
let guestList = "Mehmonlar:\n * John\n * Pete\n * Mary";

<<<<<<< HEAD
alert(guestList); // ko'p qatorli mehmonlar ro'yxati, yuqoridagi bilan bir xil
```

Oddiy misolda, bu ikki qator teng, shunchaki boshqacha yozilgan:
=======
alert(guestList); // a multiline list of guests, same as above
```

As a simpler example, these two lines are equal, just written differently:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
let str1 = "Salom\nDunyo"; // "yangi qator belgisi" yordamida ikki qator

// teskari qo'shtirnoq va oddiy yangi qator yordamida ikki qator
let str2 = `Salom
Dunyo`;

alert(str1 == str2); // true
```

<<<<<<< HEAD
Boshqa, kamroq uchraydigan maxsus belgilar ham bor:

| Belgi                                  | Tavsif                                                                                                                                                                                                                   |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `\n`                                   | Yangi qator                                                                                                                                                                                                              |
| `\r`                                   | Windows matn fayllarida ikkita belgining kombinatsiyasi `\r\n` yangi uzilishni ifodalaydi, Windows bo'lmagan OS da esa shunchaki `\n`. Bu tarixiy sabablarga ko'ra, ko'pchilik Windows dasturlari ham `\n` ni tushunadi. |
| `\'`,&nbsp;`\"`,&nbsp;<code>\\`</code> | Qo'shtirnoqlar                                                                                                                                                                                                           |
| `\\`                                   | Teskari chiziq                                                                                                                                                                                                           |
| `\t`                                   | Tab                                                                                                                                                                                                                      |
| `\b`, `\f`, `\v`                       | Orqaga qaytarish, Shakl olib berish, Vertikal Tab -- to'liqlik uchun eslatilgan, eski zamonlardan kelgan, hozir ishlatilmaydi (ularni hozir unutishingiz mumkin).                                                        |

Ko'rib turganingizdek, barcha maxsus belgilar teskari chiziq belgisi `\` bilan boshlanadi. U "qochish belgisi" deb ham ataladi.

U shunchalik maxsus bo'lgani uchun, agar satr ichida haqiqiy teskari chiziq `\` ko'rsatishimiz kerak bo'lsa, uni ikki marta yozishimiz kerak:

```js run
alert(`Teskari chiziq: \\`); // Teskari chiziq: \
```

"Qochgan" qo'shtirnoqlar `\'`, `\"`, <code>\\`</code> bir xil qo'shtirnoqli satrga qo'shtirnoq kiritish uchun ishlatiladi.

Masalan:
=======
There are other, less common special characters:

| Character | Description |
|-----------|-------------|
|`\n`|New line|
|`\r`|In Windows text files a combination of two characters `\r\n` represents a new break, while on non-Windows OS it's just `\n`. That's for historical reasons, most Windows software also understands `\n`. |
|`\'`,&nbsp;`\"`,&nbsp;<code>\\`</code>|Quotes|
|`\\`|Backslash|
|`\t`|Tab|
|`\b`, `\f`, `\v`| Backspace, Form Feed, Vertical Tab -- mentioned for completeness, coming from old times, not used nowadays (you can forget them right now). |

As you can see, all special characters start with a backslash character `\`. It is also called an "escape character".

Because it's so special, if we need to show an actual backslash `\` within the string, we need to double it:

```js run
alert( `The backslash: \\` ); // The backslash: \
```

So-called "escaped" quotes `\'`, `\"`, <code>\\`</code> are used to insert a quote into the same-quoted string.

For instance:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
alert("Men*!*'*/!*m Walrus!"); // *!*Men'm*/!* Walrus!
```

Ko'rib turganingizdek, ichki qo'shtirnoqdan oldin teskari chiziq `\'` qo'yishimiz kerak, aks holda u satr oxirini bildiradi.

Albatta, faqat o'rab turgan qo'shtirnoqlar bilan bir xil qo'shtirnoqlarni qochirish kerak. Shuning uchun yanada nafis yechim sifatida biz qo'sh qo'shtirnoq yoki teskari qo'shtirnoqga o'tishimiz mumkin:

```js run
<<<<<<< HEAD
alert("Men'm Walrus!"); // Men'm Walrus!
```

Bu maxsus belgilardan tashqari, Unicode kodlari uchun maxsus notation `\u…` ham bor, u kamdan-kam ishlatiladi va [Unicode](info:unicode) haqidagi ixtiyoriy bobda yoritilgan.

## Satr uzunligi

`length` xossasi satr uzunligiga ega:

```js run
alert(`Men\n`.length); // 3
```
=======
alert( "I'm the Walrus!" ); // I'm the Walrus!
```

Besides these special characters, there's also a special notation for Unicode codes `\u…`, it's rarely used and is covered in the optional chapter about [Unicode](info:unicode).
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

E'tibor bering, `\n` bitta "maxsus" belgi, shuning uchun uzunlik haqiqatan ham `3`.

```warn header="`length`- bu xossa"
Ba'zi boshqa tillar tajribasiga ega odamlar ba'zan`str.length`o'rniga`str.length()` chaqirishda xato qiladi. Bu ishlamaydi.

E'tibor bering, `str.length` raqamli xossa, funksiya emas. Undan keyin qavs qo'yish shart emas. `.length()` emas, balki `.length`.

````

## Belgilarga kirish

`pos` pozitsiyasidagi belgini olish uchun kvadrat qavslar `[pos]` ishlatiladi yoki [str.at(pos)](mdn:js/String/at) usulini chaqiriladi. Birinchi belgi nol pozitsiyasidan boshlanadi:

```js run
let str = `Salom`;

// birinchi belgi
alert( str[0] ); // S
alert( str.at(0) ); // S

// oxirgi belgi
alert( str[str.length - 1] ); // m
alert( str.at(-1) );
````

<<<<<<< HEAD
Ko'rib turganingizdek, `.at(pos)` usuli salbiy pozitsiyaga imkon berishning afzalligiga ega. Agar `pos` salbiy bo'lsa, u satr oxiridan hisoblanadi.
=======
Please note that `str.length` is a numeric property, not a function. There is no need to add parenthesis after it. Not `.length()`, but `.length`.
```
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

Demak `.at(-1)` oxirgi belgini, `.at(-2)` undan oldingi belgini va hokazo anglatadi.

<<<<<<< HEAD
Kvadrat qavslar salbiy indekslar uchun har doim `undefined` qaytaradi, masalan:
=======
To get a character at position `pos`, use square brackets `[pos]` or call the method [str.at(pos)](mdn:js/String/at). The first character starts from the zero position:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
let str = `Salom`;

<<<<<<< HEAD
alert(str[-2]); // undefined
alert(str.at(-2)); // l
```

Shuningdek, `for..of` yordamida belgilar bo'ylab iteratsiya qilishimiz mumkin:

```js run
for (let char of "Salom") {
  alert(char); // S,a,l,o,m (char "S" bo'ladi, keyin "a", keyin "l" va hokazo)
=======
// the first character
alert( str[0] ); // H
alert( str.at(0) ); // H

// the last character
alert( str[str.length - 1] ); // o
alert( str.at(-1) );
```

As you can see, the `.at(pos)` method has a benefit of allowing negative position. If `pos` is negative, then it's counted from the end of the string.

So `.at(-1)` means the last character, and `.at(-2)` is the one before it, etc.

The square brackets always return `undefined` for negative indexes, for instance:

```js run
let str = `Hello`;

alert( str[-2] ); // undefined
alert( str.at(-2) ); // l
```

We can also iterate over characters using `for..of`:

```js run
for (let char of "Hello") {
  alert(char); // H,e,l,l,o (char becomes "H", then "e", then "l" etc)
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
}
```

## Satrlar o'zgarmas

JavaScript-da satrlarni o'zgartirib bo'lmaydi. Belgini o'zgartirish imkonsiz.

Buni ishlamasligini ko'rsatish uchun sinab ko'raylik:

```js run
let str = "Salom";

str[0] = "s"; // xato
alert(str[0]); // ishlamaydi
```

Odatiy yechim - butunlay yangi satr yaratish va uni eski o'rniga `str` ga tayinlashdir.

Masalan:

```js run
let str = "Salom";

str = "s" + str[1]; // satrni almashtirish

alert(str); // salom
```

Keyingi bo'limlarda bunga ko'proq misollar ko'ramiz.

## Registrni o'zgartirish

[toLowerCase()](mdn:js/String/toLowerCase) va [toUpperCase()](mdn:js/String/toUpperCase) usullari registrni o'zgartiradi:

```js run
alert("Interface".toUpperCase()); // INTERFACE
alert("Interface".toLowerCase()); // interface
```

Yoki agar bitta belgini kichik harfga o'tkazmoqchi bo'lsak:

```js run
<<<<<<< HEAD
alert("Interface"[0].toLowerCase()); // 'i'
=======
alert( 'Interface'[0].toLowerCase() ); // 'i'
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
```

## Substring qidirish

Satr ichida substring qidirish uchun bir nechta usul mavjud.

### str.indexOf

Birinchi usul [str.indexOf(substr, pos)](mdn:js/String/indexOf).

U berilgan `pos` pozitsiyasidan boshlab `str` da `substr` ni qidiradi va mos kelish topilgan pozitsiyani yoki hech narsa topilmasa `-1` ni qaytaradi.

Masalan:

```js run
let str = "Widget with id";

alert(str.indexOf("Widget")); // 0, chunki 'Widget' boshida topilgan
alert(str.indexOf("widget")); // -1, topilmadi, qidiruv registrga sezgir

alert(str.indexOf("id")); // 1, "id" 1-pozitsiyada topilgan (..idget with id)
```

Ixtiyoriy ikkinchi parametr bizga berilgan pozitsiyadan qidirishni boshlash imkonini beradi.

Masalan, `"id"` ning birinchi uchrayishi 1-pozitsiyada. Keyingi uchrayishni qidirish uchun 2-pozitsiyadan qidirishni boshlaylik:

```js run
let str = "Widget with id";

alert(str.indexOf("id", 2)); // 12
```

Agar bizni barcha uchrayishlar qiziqtirsa, `indexOf` ni tsiklda ishga tushirishimiz mumkin. Har bir yangi chaqiruv oldingi mos kelishdan keyingi pozitsiya bilan amalga oshiriladi:

```js run
let str = "As sly as a fox, as strong as an ox";

let target = "as"; // buni qidiraylik

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert(`${foundPos} da topildi`);
  pos = foundPos + 1; // keyingi pozitsiyadan qidirishni davom ettirish
}
```

Xuddi shu algoritm qisqaroq yozilishi mumkin:

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

```smart header="`str.lastIndexOf(substr, position)`"
Satrning oxiridan boshigacha qidiradigan o'xshash [str.lastIndexOf(substr, position)](mdn:js/String/lastIndexOf) usuli ham bor.

U uchrayishlarni teskari tartibda ro'yxatlaydi.

````

`if` testida `indexOf` bilan biroz noqulaylik bor. Biz uni `if` ga quyidagicha qo'ya olmaymiz:

```js run
let str = "Widget with id";

if (str.indexOf("Widget")) {
    alert("Topdik"); // ishlamaydi!
}
````

Yuqoridagi misoldagi `alert` ko'rsatilmaydi, chunki `str.indexOf("Widget")` `0` ni qaytaradi (ya'ni boshlovchi pozitsiyada mos kelishni topganini anglatadi). To'g'ri, lekin `if` `0` ni `false` deb hisoblay

di.

Shuning uchun biz aslida `-1` ni tekshirishimiz kerak:

```js run
let str = "Widget with id";

*!*
if (str.indexOf("Widget") != -1) {
*/!*
    alert("Topdik"); // endi ishlaydi!
}
```

### includes, startsWith, endsWith

Zamonaviyroq [str.includes(substr, pos)](mdn:js/String/includes) usuli `str` da `substr` mavjudligiga qarab `true/false` qaytaradi.

Agar mos kelishni tekshirish kerak bo'lsa, lekin uning pozitsiyasi kerak bo'lmasa, bu to'g'ri tanlovdir:

```js run
alert("Widget with id".includes("Widget")); // true

alert("Salom".includes("Xayr")); // false
```

`str.includes` ning ixtiyoriy ikkinchi argumenti qidirishni boshlash pozitsiyasidir:

```js run
alert("Widget".includes("id")); // true
alert("Widget".includes("id", 3)); // false, 3-pozitsiyadan "id" yo'q
```

[str.startsWith](mdn:js/String/startsWith) va [str.endsWith](mdn:js/String/endsWith) usullari aynan ular aytganini qiladi:

```js run
<<<<<<< HEAD
alert("*!*Wid*/!*get".startsWith("Wid")); // true, "Widget" "Wid" bilan boshlanadi
alert("Wid*!*get*/!*".endsWith("get")); // true, "Widget" "get" bilan tugaydi
=======
alert( "*!*Wid*/!*get".startsWith("Wid") ); // true, "Widget" starts with "Wid"
alert( "Wid*!*get*/!*".endsWith("get") ); // true, "Widget" ends with "get"
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
```

## Substring olish

JavaScript-da substring olish uchun 3 ta usul mavjud: `substring`, `substr` va `slice`.

`str.slice(start [, end])`
: `start` dan `end` gacha (lekin `end` ni o'z ichiga olmasdan) satr qismini qaytaradi.

    Masalan:

    ```js run
    let str = "stringify";
    alert( str.slice(0, 5) ); // 'strin', 0 dan 5 gacha substring (5 ni o'z ichiga olmaydi)
    alert( str.slice(0, 1) ); // 's', 0 dan 1 gacha, lekin 1 ni o'z ichiga olmaydi, faqat 0 dagi belgi
    ```

    Agar ikkinchi argument bo'lmasa, `slice` satr oxirigacha boradi:

    ```js run
    let str = "st*!*ringify*/!*";
    alert( str.slice(2) ); // 'ringify', 2-pozitsiyadan oxirigacha
    ```

    `start/end` uchun salbiy qiymatlar ham mumkin. Ular pozitsiya satr oxiridan hisoblanishini anglatadi:

    ```js run
    let str = "strin*!*gif*/!*y";

    // o'ngdan 4-pozitsiyadan boshlab, o'ngdan 1-pozitsiyada tugat
    alert( str.slice(-4, -1) ); // 'gif'
    ```

`str.substring(start [, end])`
<<<<<<< HEAD
: `start` va `end` _orasidagi_ satr qismini qaytaradi (`end` ni o'z ichiga olmaydi).

    Bu deyarli `slice` bilan bir xil, lekin `start` ning `end` dan katta bo'lishiga imkon beradi (bu holda u shunchaki `start` va `end` qiymatlarini almashtiradi).
=======
: Returns the part of the string *between* `start` and `end` (not including `end`).

    This is almost the same as `slice`, but it allows `start` to be greater than `end` (in this case it simply swaps `start` and `end` values).
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

    Masalan:

    ```js run
    let str = "st*!*ring*/!*ify";

    // bular substring uchun bir xil
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // ...lekin slice uchun emas:
    alert( str.slice(2, 6) ); // "ring" (bir xil)
    alert( str.slice(6, 2) ); // "" (bo'sh satr)

    ```

    Salbiy argumentlar (slice dan farqli o'laroq) qo'llab-quvvatlanmaydi, ular `0` deb qaraladi.

`str.substr(start [, length])`
: `start` dan boshlab, berilgan `length` bilan satr qismini qaytaradi.

    Oldingi usullardan farqli o'laroq, bu tugash pozitsiyasi o'rniga `length` ni ko'rsatish imkonini beradi:

    ```js run
    let str = "st*!*ring*/!*ify";
    alert( str.substr(2, 4) ); // 'ring', 2-pozitsiyadan 4 ta belgi ol
    ```

    Birinchi argument oxirdan hisoblash uchun salbiy bo'lishi mumkin:

    ```js run
    let str = "strin*!*gi*/!*fy";
    alert( str.substr(-4, 2) ); // 'gi', 4-pozitsiyadan 2 ta belgi ol
    ```

<<<<<<< HEAD
    Bu usul til spetsifikatsiyasining [Ilova B](https://tc39.es/ecma262/#sec-string.prototype.substr) da joylashgan. Bu faqat brauzer-joylashtirilgan JavaScript dvigatellari uni qo'llab-quvvatlashi kerakligini anglatadi va uni ishlatish tavsiya etilmaydi. Amalda u hamma joyda qo'llab-quvvatlanadi.

Har qanday chalkashlikdan qochish uchun bu usullarni takrorlaylik:
=======
    This method resides in the [Annex B](https://tc39.es/ecma262/#sec-string.prototype.substr) of the language specification. It means that only browser-hosted Javascript engines should support it, and it's not recommended to use it. In practice, it's supported everywhere.

Let's recap these methods to avoid any confusion:

| method | selects... | negatives |
|--------|-----------|-----------|
| `slice(start, end)` | from `start` to `end` (not including `end`) | allows negatives |
| `substring(start, end)` | between `start` and `end` (not including `end`)| negative values mean `0` |
| `substr(start, length)` | from `start` get `length` characters | allows negative `start` |
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

| usul                    | tanlaydi...                                            | salbiylar                         |
| ----------------------- | ------------------------------------------------------ | --------------------------------- |
| `slice(start, end)`     | `start` dan `end` gacha (`end` ni o'z ichiga olmaydi)  | salbiylarga ruxsat beradi         |
| `substring(start, end)` | `start` va `end` orasida (`end` ni o'z ichiga olmaydi) | salbiy qiymatlar `0` ni anglatadi |
| `substr(start, length)` | `start` dan `length` ta belgi ol                       | salbiy `start` ga ruxsat beradi   |

<<<<<<< HEAD
```smart header="Qaysi birini tanlash kerak?"
Ularning barchasi ishni bajara oladi. Rasmiy ravishda `substr` ning kichik kamchiligi bor: u JavaScript spetsifikatsiyasining asosiy qismida emas, balki brauzer-only xususiyatlarini qamrab oluvchi Ilova B da tasvirlangan va asosan tarixiy sabablarga ko'ra mavjud. Shuning uchun brauzer bo'lmagan muhitlar uni qo'llab-quvvatlamasligi mumkin. Lekin amalda u hamma joyda ishlaydi.

Qolgan ikki variantdan `slice` biroz moslashuvchanroq, u salbiy argumentlarga imkon beradi va yozish qisqaroq.

Shuning uchun amaliy foydalanish uchun faqat `slice` ni yodlab qolish kifoya.
=======
Of the other two variants, `slice` is a little bit more flexible, it allows negative arguments and shorter to write.

So, for practical use it's enough to remember only `slice`.
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
```

## Satrlarni solishtirish

<info:comparison> bobidan ma'lumki, satrlar alifbo tartibida belgi-belgi solishtiriladi.

Garchi, ba'zi g'alatiliklar bor.

1. Kichik harf har doim katta harfdan kattaroq:

   ```js run
   alert("a" > "Z"); // true
   ```

2. Diakritik belgili harflar "tartibdan tashqari":

   ```js run
   alert("Österreich" > "Zealand"); // true
   ```

   Bu mamlakat nomlarini saralasak g'alati natijalarga olib kelishi mumkin. Odatda odamlar `Zealand` ning ro'yxatda `Österreich` dan keyin kelishini kutadilar.

<<<<<<< HEAD
Nima sodir bo'lishini tushunish uchun JavaScript-da satrlar [UTF-16](https://en.wikipedia.org/wiki/UTF-16) yordamida kodlanishini bilishimiz kerak. Ya'ni: har bir belgining mos raqamli kodi bor.

Kod uchun belgini va teskarisini olish imkonini beradigan maxsus usullar mavjud:

`str.codePointAt(pos)`
: `pos` pozitsiyasidagi belgi uchun kodni ifodalovchi o'nli raqam qaytaradi:

    ```js run
    // turli registrli harflar turli kodlarga ega
    alert( "Z".codePointAt(0) ); // 90
    alert( "z".codePointAt(0) ); // 122
    alert( "z".codePointAt(0).toString(16) ); // 7a (agar hex qiymat kerak bo'lsa)
=======
To understand what happens, we should be aware that strings in Javascript are encoded using [UTF-16](https://en.wikipedia.org/wiki/UTF-16). That is: each character has a corresponding numeric code.

There are special methods that allow to get the character for the code and back:

`str.codePointAt(pos)`
: Returns a decimal number representing the code for the character at position `pos`:

    ```js run
    // different case letters have different codes
    alert( "Z".codePointAt(0) ); // 90
    alert( "z".codePointAt(0) ); // 122
    alert( "z".codePointAt(0).toString(16) ); // 7a (if we need a hexadecimal value)
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
    ```

`String.fromCodePoint(code)`
: Raqamli `code` bo'yicha belgi yaratadi

    ```js run
    alert( String.fromCodePoint(90) ); // Z
<<<<<<< HEAD
    alert( String.fromCodePoint(0x5a) ); // Z (argument sifatida hex qiymatdan ham foydalanish mumkin)
    ```

Endi `65..220` kodli belgilarni (lotin alifbosi va biroz qo'shimcha) ko'rib, ulardan satr yasaylik:
=======
    alert( String.fromCodePoint(0x5a) ); // Z (we can also use a hex value as an argument)
    ```

Now let's see the characters with codes `65..220` (the latin alphabet and a little bit extra) by making a string of them:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
let str = "";

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
<<<<<<< HEAD
alert(str);
// Chiqish:
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
=======
alert( str );
// Output:
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

Ko'rdingizmi? Avval katta harflar, keyin bir nechta maxsus belgilar, keyin kichik harflar va chiqish oxirida `Ö`.

Endi `a > Z` nima uchun ekanligi aniq.

Belgilar raqamli kod bo'yicha solishtiriladi. Kattaroq kod belgining kattaroq ekanligini anglatadi. `a` (97) ning kodi `Z` (90) ning kodidan kattaroq.

- Barcha kichik harflar katta harflardan keyin keladi, chunki ularning kodlari kattaroq.
- `Ö` kabi ba'zi harflar asosiy alifbodan alohida turadi. Bu yerda uning kodi `a` dan `z` gacha bo'lgan har qanday narsadan kattaroq.

### To'g'ri solishtirishlar [#correct-comparisons]

Satrlarni solishtirish uchun "to'g'ri" algoritm ko'ringanidan murakkabroq, chunki turli tillar uchun alifbolar turlicha.

Shuning uchun brauzer qaysi tilda solishtirish kerakligini bilishi kerak.

<<<<<<< HEAD
Yaxshiyamki, zamonaviy brauzerlar [ECMA-402](https://www.ecma-international.org/publications-and-standards/standards/ecma-402/) xalqarolashtirish standartini qo'llab-quvvatlaydi.
=======
Luckily, modern browsers support the internationalization standard [ECMA-402](https://www.ecma-international.org/publications-and-standards/standards/ecma-402/).
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

U turli tillarda satrlarni ularning qoidalariga ko'ra solishtiradigan maxsus usulni taqdim etadi.

[str.localeCompare(str2)](mdn:js/String/localeCompare) chaqiruvi til qoidalariga ko'ra `str` `str2` dan kichik, teng yoki katta ekanligini ko'rsatadigan butun sonni qaytaradi:

- Agar `str` `str2` dan kichik bo'lsa, salbiy raqam qaytaradi.
- Agar `str` `str2` dan katta bo'lsa, musbat raqam qaytaradi.
- Agar ular ekvivalent bo'lsa, `0` qaytaradi.

Masalan:

```js run
alert("Österreich".localeCompare("Zealand")); // -1
```

Bu usul aslida [hujjatlarda](mdn:js/String/localeCompare) ko'rsatilgan ikkita qo'shimcha argumentga ega, bu tilni belgilash (sukut bo'yicha muhitdan olinadi, harflar tartibi tilga bog'liq) va registr sezgirlik yoki `"a"` va `"á"` bir xil deb qaralishi kerakmi kabi qo'shimcha qoidalarni o'rnatish imkonini beradi.

<<<<<<< HEAD
## Xulosa

- 3 turdagi qo'shtirnoq bor. Teskari qo'shtirnoqlar satrning bir nechta qatorga cho'zilishi va ifodalarni `${…}` kiritish imkonini beradi.
- Biz yangi qator `\n` kabi maxsus belgilardan foydalanishimiz mumkin.
- Belgi olish uchun: `[]` yoki `at` usulini ishlatamiz.
- Substring olish uchun: `slice` yoki `substring` dan foydalanamiz.
- Satrni kichik/katta harfga o'tkazish uchun: `toLowerCase/toUpperCase` dan foydalanamiz.
- Substring qidirish uchun: `indexOf` dan yoki oddiy tekshiruvlar uchun `includes/startsWith/endsWith` dan foydalanamiz.
- Satrlarni tilga ko'ra solishtirish uchun: `localeCompare` dan foydalanamiz, aks holda ular belgi kodlari bo'yicha solishtiriladi.

Satrlarda bir nechta boshqa foydali usullar ham bor:

- `str.trim()` -- satrning boshi va oxiridagi bo'shliqlarni olib tashlaydi ("kesadi").
- `str.repeat(n)` -- satrni `n` marta takrorlaydi.
- ...va ko'proq narsalarni [qo'llanmada](mdn:js/String) topish mumkin.

Satrlar muntazam ifodalar bilan qidirish/almashtirish uchun usullar ham bor. Lekin bu katta mavzu, shuning uchun u alohida o'quv qo'llanma bo'limida <info:regular-expressions> tushuntirilgan.

Shuningdek, hozir satrlar Unicode kodlashiga asoslanganligini va shuning uchun solishtirishlar bilan muammolar borligini bilish muhim. Unicode haqida ko'proq ma'lumot <info:unicode> bobida.
=======
## Summary

- There are 3 types of quotes. Backticks allow a string to span multiple lines and embed expressions `${…}`.
- We can use special characters, such as a line break `\n`.
- To get a character, use: `[]` or `at` method.
- To get a substring, use: `slice` or `substring`.
- To lowercase/uppercase a string, use: `toLowerCase/toUpperCase`.
- To look for a substring, use: `indexOf`, or `includes/startsWith/endsWith` for simple checks.
- To compare strings according to the language, use: `localeCompare`, otherwise they are compared by character codes.

There are several other helpful methods in strings:

- `str.trim()` -- removes ("trims") spaces from the beginning and end of the string.
- `str.repeat(n)` -- repeats the string `n` times.
- ...and more to be found in the [manual](mdn:js/String).

Strings also have methods for doing search/replace with regular expressions. But that's big topic, so it's explained in a separate tutorial section <info:regular-expressions>.

Also, as of now it's important to know that strings are based on Unicode encoding, and hence there're issues with comparisons. There's more about Unicode in the chapter <info:unicode>.
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
