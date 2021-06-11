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

Bitta va ikkita tirnoq asosan bir xil. Shu bilan birga, teskari qoshtirnoq bizga har qanday ifodani, shu jumladan funktsiya chaqiruvlarini kiritishga imkon beradi:

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

Agar bitta yoki ikkita qoshtirnoqni xuddi shu tarzda ishlatishga harakat qilsak, xato bo'ladi:

```js run
let guestList = "Mehmonlar:  // Error: Unexpected token ILLEGAL
  * Elbek";
```

Bitta va ikkita qoshtirnoqlar til yaratishning qadimgi davrlaridan kelib chiqqan holda, ko'p satrlarni kiritish ehtiyoj hisobga olinmagan. Teskari qoshtirnoqlar ancha keyin paydo bo'ldi va shu bilan yanada ko'p qirrali bo'ldi.

Teskari tirnoq, shuningdek, birinchi teskari tirnoq oldin "namuna vazifasini" belgilash imkonini beradi. Sintaksisi: <code>func&#96;matn&#96;</code>. Avtomatik ravishda chaqiriladigan `func` funktsiyasi matnga ega va unga kiritilgan ifodalarni oladi va ularni qayta ishlatishi mumkin. Bu haqda batafsil ma'lumotni [hujjatlarda](mdn:/JavaScript/Reference/Template_literals#Tagged_template_literals) topishingiz mumkin. Agar matn oldida bir ifoda bo'lsa, unda shablon liniyasi "teglangan shablon" deb ataladi. Bu matnlar uchun shablonni ishlatishga imkon beradi, lekin amalda yorliq shablonlari kamdan-kam qo'llaniladi.


## Maxsus belgilar

Ko'p satrli matn, shuningdek, bir yoki ikki tirnoq yordamida yaratilgan bo'lishi mumkin, "yangi satr belgisi" deb atalmish yordamida , qaysi `\n` sifatida qayd etiladi:

```js run
let guestList = "Mehmonlar:\n * Elbek\n * Aziza\n * Oybek";

alert(guestList); // mehmonlarning ko'p satrli ro'yxati
```

Masalan, ushbu ikkita satr bir xil narsani tasvirlaydi:

```js run
alert( "Hello\nWorld" ); // "yangi satr belgisi" yordamida ikkita satr

// oddiy yangi satr va teskari qoshtirnoq yordamida ikkita satr
alert( `Hello
World` );
```

Boshqa, kamroq tarqalgan "maxsus" belgilar ham mavjud. Mana ro'yxat:

| Belgilar | Tavsifnoma |
|-----------|-------------|
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
```

Barcha maxsus belgilar teskari kesma belgisi `\` bilan boshlanadi. Uni "qochish belgisi" deb ham atashadi.

Agar biz matnga qoshtirnoq qo'shmoqchi bo'lsak, uni ishlatamiz.

Masalan:

```js run
alert( 'I*!*\'*/!*m the Walrus!' ); // *!*I'm*/!* the Walrus!
```

Ko'rib turganingizdek, biz ichki qoshtirnoqni `\` teskari kesma belgisi bilan boshlashimiz kerak, chunki aks holda bu satr oxirini bildiradi.

Albatta, bu faqat qoshtirnoq bilan bir xil qoshtirnoqlarga tegishli. Shunday qilib, yanada oqilona yechim sifatida, biz uning o'rniga ikkita qoshtirnoq yoki teskari kesma belgisi bilan o'tishimiz mumkin:

```js run
alert( `I'm the Walrus!` ); // I'm the Walrus!
```

teskari kesma belgi `\` JavaScript-ni matnini to'g'ri o'qish uchun xizmat qiladi, keyin yo'qoladi. Xotira ichidagi satrda `\` yo'q. Buni `alert` da yuqoridagi misollardan aniq ko'rishingiz mumkin.

Agar matn ichida `\` haqiqiy teskari kesma belgisini ko'rsatish kerak bo'lsa-chi?

Bu mumkin, lekin biz buni `\\` kabi ikki baravar oshirishimiz kerak:

```js run
alert( `Teskari kesma belgisi: \\` ); // The backslash: \
```

## Matnning uzunligi


matn `length` xususiyatiga ega:

```js run
alert( `My\n`.length ); // 3
```

`\n` "maxsus" belgi ekanligini unutmang, shuning uchun uning uzunligi `3` ga teng.

```warn header="`length` bu xususiyat"
Ba'zi bir boshqa tillarda tajriba ega odamlar ba'zida `str.length` o'rniga `str.length()` deb chaqirib xato yozadilar. Bu ishlamaydi.

Iltimos, `str.length` funktsiya emas, balki raqamli xususiyat ekanligini unutmang. Undan keyin qavs qo'shishning hojati yo'q.
```

## Belgilarga kirish

Belgini `pos` holatida olish uchun kvadrat qavslardan foydalaning `[pos]` yoki usulni chaqiring [str.charAt(pos)](mdn:js/String/charAt). Birinchi belgi nol holatidan boshlanadi:

```js run
let str = `Salom`;

// the first character
alert( str[0] ); // S
alert( str.charAt(0) ); // S

// the last character
alert( str[str.length - 1] ); // m
```

Kvadrat qavslar - bu belgi olishning zamonaviy usuli, `charAt` asosan tarixiy sabablarga ko'ra mavjud.

Ularning orasidagi yagona farq shundaki, agar hech qanday belgi topilmasa, `[]` `undefined` ni, va `charAt` bo'sh satrni qaytaradi:

```js run
let str = `Salom`;

alert( str[1000] ); // undefined
alert( str.charAt(1000) ); // '' (bo'sh matn)
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

str = 'h' + str[1];  // matnni almashtiring

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

```js
alert( 'Javascript'[0].toLowerCase() ); // 'j'
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

Ixtiyoriy ikkinchi parametr bizga berilgan pozitsiyadan boshlab qidirish imkoniyatini beradi.

Masalan, `"id"` ning birinchi paydo bo'lishi `1` chi indeks holatidadir. Keyingi o'xshashni izlash uchun qidirishni `2` chi pozitsiyasidan boshlaymiz:

```js run
let str = 'Widget with id';

alert( str.indexOf('id', 2) ) // 12
```


Agar biz barcha hodisalarga qiziqish bildirsak, biz `indexOf` ni tsiklda ishlatishimiz mumkin. Har bir yangi chaqiruv avvalgi o'xshash keyingi pozitsiya bilan amalga oshiriladi:

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

````smart header="Bitlik YO'Q operatori bilan hiyla"
Bu yerda ishlatilgan eski hiyla-nayranglardan biri bu [bitlik YO'Q](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT) `~` operatori. U raqamni 32-bitli butun songa o'zgartiradi (agar mavjud bo'lsa, o'nli qismni olib tashlaydi) va keyin ikkitomonlama tasvirdagi barcha bitlarni teskari yo'naltiradi.

32-bitli sonlar uchun `~n` chaqiruvi `-(n + 1)` (IEEE-754 formati tufayli) bilan bir xil ma'noni anglatadi.

Masalan:

```js run
alert( ~2 ); // -3, -(2+1) bilan bir xil 
alert( ~1 ); // -2, -(1+1) bilan bir xi
alert( ~0 ); // -1, -(0+1) bilan bir xi
*!*
alert( ~-1 ); // 0, -(-1+1) bilan bir xi)
*/!*
```

Ko'rib turganimizdek, `n == -1` bo'lsa, `~n` nolga teng.

Shunday qilib, `if(~ str.indexOf(" ... "))` testi `indexOf` ning natijasi `-1` emasligiga ishonch hosil qiladi. Boshqacha qilib aytganda, o'xshash bo'lmasa.

Odamlar buni `indexOf` tekshirishlarini qisqartirish uchun ishlatishadi:

```js run
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert( 'Topildi!' ); // ishlaydi
}
```

Odatda til xususiyatlaridan noaniq usulda foydalanish tavsiya etilmaydi, ammo bu hiyla-nayrang eski kodda keng qo'llaniladi, shuning uchun biz buni tushunishimiz kerak.

Eslab qoling: `if (~str.indexOf(...))` "if found" deb o'qiydi.
````

### includes, startsWith, endsWith

Zamonaviy usul [str.includes (substr, pos)](mdn:js/String/include) `str` tarkibida `substr` mavjudligiga qarab `true/false` ni qaytaradi.

Agar o'xshashni topish uchun sinov o'tkazish kerak bo'lsa, lekin uning pozitsiyasi kerak bo'lmasa, bu to'g'ri tanlov:

```js run
alert( "Widget with id".includes("Widget") ); // true

alert( "Hello".includes("Bye") ); // false
```

`str.includes` ning ixtiyoriy ikkinchi argumenti - qidirishni boshlash pozitsiyasi:

```js run
alert( "Midget".includes("id") ); // true
alert( "Midget".includes("id", 3) ); // false, 3-pozitsiyadan "id" yo'q
```

[str.startsWith](mdn:js/String/startWith) va [str.endsWith](mdn:js/String/endsWith) usullari ular ifodalanganak ishlarni bajaradi:

```js run
alert( "Widget".startsWith("Wid") ); // true, "Widget" "Wid" bilan boshlanadi
alert( "Widget".endsWith("get") );   // true, "Widget" "get" bilan tugaydi
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
    alert( str.slice(2) ); // ringify, 2-pozitsiyadan oxirigacha
    ```

    `start/end` uchun salbiy qiymatlar ham bo'lishi mumkin. Ular pozitsiyani matn oxiridan hisoblanishini anglatadi:

    ```js run
    let str = "strin*!*gif*/!*y";

    // o'ng tomondan 4-pozitsiyadan boshlang, o'ngdan 1-songa tugating
    alert( str.slice(-4, -1) ); // gif
    ```


`str.substring(start [, end])`
: Matnning  qismini  `start` va` end` *oralig'ida* qaytaradi.

    Bu deyarli `slice` bilan bir xil, ammo `start` ning `end` dan katta bo'lishiga imkon beradi.

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
    alert( str.substr(2, 4) ); // ring, 2-pozitsiyadan 4 ta belgini oling
    ```

    Birinchi argument salbiy bo'lishi mumkin, oxiridan hisoblash uchun:

    ```js run
    let str = "strin*!*gi*/!*fy";
    alert( str.substr(-4, 2) ); // gi, 4-pozitsiyadan 2 ta belgini oling
    ```

Chalkashmaslik uchun ushbu usullarni qayta ko'rib chiqamiz:

| usul | tanlaydi... | salbiy |
|--------|-----------|-----------|
| `slice(start, end)` | `start` dan `end` gacha (`end` ni hisobga olmaganda) | salbiylarga imkon beradi |
| `substring(start, end)` | `start` va `end` o'rtasida | salbiy qiymatlar `0` ni anglatadi |
| `substr(start, length)` | `start` dan `length` belgilarini oling | salbiyga yo'l qo'yadi `start` |


```smart header="Qaysi birini tanlash kerak?"
Ularning barchasi ishni bajarishi mumkin. Rasmiy ravishda, `substr` ning ozgina kamchiliklari bor: u asosiy JavaScript spetsifikatsiyasida emas, balki faqat tarixiy sabablarga ko'ra mavjud bo'lgan faqat brauzer xususiyatlarini o'z ichiga olgan B-ilovada tasvirlangan. Shunday qilib, brauzerdan tashqari muhit uni qo'llab-quvvatlamasligi mumkin. Ammo amalda u hamma joyda ishlaydi.

Boshqa ikkita variantdan `slice` yanada moslashuvchan, u salbiy argumentlarni qo'llab-quvvatlaydi va uni yozish uchun qisqartiriladi. Shunday qilib, asosan, uni faqat eslab qolishingiz mumkin.
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

Nima bo'lishini tushunish uchun keling, JavaScript-dagi matlarning ichki ko'rinishini ko'rib chiqamiz.

Barcha satrlar [UTF-16](https://en.wikipedia.org/wiki/UTF-16) yordamida kodlangan. Ya'ni: har bir belgi tegishli raqamli kodga ega. Kod va orqaga belgini olishga imkon beradigan maxsus usullar mavjud.

`str.codePointAt(pos)`
: Belgining kodini `poz` holatida qaytaradi:

    ```js run
    // turli xil regist harflar turli xil kodlarga ega
    alert( "z".codePointAt(0) ); // 122
    alert( "Z".codePointAt(0) ); // 90
    ```

`String.fromCodePoint(code)`
: Raqamli `kodi` bilan belgi hosil qiladi

    ```js run
    alert( String.fromCodePoint(90) ); // Z
    ```

    Unicode belgilarini `\u` dan keyin o'n oltinchi tizimdagi kod yordamida ularning kodlarini yoshishimiz mumkin:

    ```js run
    // 90 o'n oltinchi tizimda 5a
    alert( '\u005a' ); // Z
    ```

Endi `65..220` (lotin alifbosi va biroz qo'shimcha) kodlari bo'lgan belgilarni ularning matnini yaratib ko'raylik:

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

Ko'ryapsizmi? Avval tepa registr harflar, so'ngra bir nechta maxsus belgilar, keyin past registr harflar yoziladi.

Endi nima uchun `a > Z` ekanligi oydinlashadi.

Belgilar raqamli kod bilan taqqoslanadi. Katta kod belgining kattaroqligini anglatadi. `a` (97) kodi `Z` (90) kodidan katta.

- Barcha past registr harflar tepa registr harflardan keyin ketadi, chunki ularning kodlari kattaroq.
- `Ö` kabi ba'zi harflar asosiy alifbodan ajralib turadi. Bu erda u kod `a` dan `z` gacha bo'lgan harflardan kattaroqdir.


### To'g'ri taqqoslashlar

Matnlarni taqqoslash uchun "to'g'ri" algoritm tuyulishi ancha murakkab, chunki alifbolar har xil tillar uchun har xil. Bir xil ko'rinishga ega bo'lgan harf turli alifbolarda turlicha joylashishi mumkin.

Shunday qilib, brauzer taqqoslash uchun tilni bilishi kerak.

Yaxshiyamki, barcha zamonaviy brauzerlar (IE10- qo'shimcha kutubxonani talab qiladi [Intl.JS](https://github.com/andyearnshaw/Intl.js/) [ECMA 402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf) xalqarolashtirish standartini qo'llab-quvvatlaydi. 

U turli xil tillardagi satrlarni ularning qoidalariga rioya qilgan holda taqqoslash uchun maxsus usulni taqdim etadi.

Chaqiruv [str.localeCompare(str2)](mdn:js/String/localeCompare):

- Til qoidalariga ko'ra `str` `str2` dan katta bo'lsa, `1` qiymatini qaytaradi.
- Agar `str` `str2` dan kichik bo'lsa, `-1` qiymatini qaytaradi.
- Agar ular teng bo'lsa, `0` qiymatini qaytaradi.

Masalan:

```js run
alert( 'Österreich'.localeCompare('Zealand') ); // -1
```

Ushbu usul aslida [hujjatlarda](mdn:js/String/localeCompare) ko'rsatilgan ikkita qo'shimcha argumentga ega, bu tilni belgilashga imkon beradi (sukut bo'yicha atrof-muhitdan olingan) va ishning sezgirligi kabi qo'shimcha qoidalarni o'rnatish yoki `"a"` va `"á"` bir xil deb hisoblaydi.

## Ichki mexanizm, Unikod

```warn header="Ilg'or bilim"
Bo'lim matnning ichki qismiga chuqurroq kiradi. Agar siz emoji, noyob matematik yoki ieroglif belgilar yoki boshqa noyob belgilar bilan ishlashni rejalashtirmoqchi bo'lsangiz, ushbu ma'lumot siz uchun foydali bo'ladi.

Agar siz ularni qo'llab-quvvatlashni rejalashtirmasangiz, bo'limni o'tkazib yuborishingiz mumkin.
```

### Surroqat juftlari

Ko'pgina belgilar 2 baytlik kodga ega. Ko'pgina evropa tillaridagi harflar, raqamlar va hatto aksariyat iyerogliflar 2 baytli tasvirga ega.

Ammo 2 bayt faqat 65536 ta kombinatsiyaga ruxsat beradi va bu har qanday mumkin bo'lgan belgilar uchun yetarli emas. Noyob belgilar "surrogat jufti" deb nomlangan 2 baytli juftlik bilan kodlangan.

Bunday belgilarning uzunligi `2` dir:

```js run
alert( '𝒳'.length ); // 2, MATEMATIK SKRIPT X
alert( '😂'.length ); // 2, QUVONCH YO'LLARI BILAN EMODJI
alert( '𩷶'.length ); // 2, noyob xitoy iyeroglifi
```

JavaScript-ni yaratishda surrogat juftlari mavjud bo'lmaganligini va shuning uchun til tomonidan to'g'ri ishlanmaganligini unutmang!

Yuqoridagi satrlarning har birida bizda bitta belgi bor, lekin `uzunlik` `2` ko'rsatadi.

`String.fromCodePoint` va `str.codePointAt` surrogat juftlari bilan shug'ullanadigan kamdan-kam uchraydigan usullardir. Ular yaqinda tilda paydo bo'ldi. Ulardan oldin faqat [String.fromCharCode](mdn:js/String/fromCharCode) va [str.charCodeAt](mdn:js/String/charCodeAt) mavjud edi. Ushbu usullar aslida `fromCodePoint/codePointAt` bilan bir xil, ammo surrogat juftlari bilan ishlamaydi.

Lekin, masalan, ramzni olish juda qiyin bo'lishi mumkin, chunki surrogat juftlari ikkita belgi sifatida qaraladi:

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

Kompozitsiyalarni qo'llab-quvvatlash uchun UTF-16 bizga bir nechta kodli belgilarni ishlatishga imkon beradi. Asosiy belgi va uni "bezatuvchi" bir yoki bir nechta "belgiluvchan" belgilar.

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

Bu ajoyib moslashuvchanlikni, shuningdek, qiziqarli muammolarni keltirib chiqaradi: ikkita belgi bir xil ko'rinishi mumkin, ammo unikodning turli xil kompozitsiyalari bilan ifodalanishi mumkin.

Masalan:

```js run
alert( 'S\u0307\u0323' ); // Ṩ, S + yuqoridagi nuqta + pastdagi nuqta
alert( 'S\u0323\u0307' ); // Ṩ, S + yuqoridagi nuqta + pastdagi nuqta

alert( 'S\u0307\u0323' == 'S\u0323\u0307' ); // false
```

Buni hal qilish uchun har bir satrni bitta "normal" shaklga keltiradigan "unikod normallashtirish" algoritmi mavjud.

U [str.normalize()](mdn:js/String/normalize) tomonidan amalga oshiriladi.

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

Bizning holatimizda `normalize()` aslida uchta belgidan iborat ketma-ketlikni bitta belgiga birlashtirishi kulgili: `\u1e68` (ikkita nuqta bilan S).

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

Aslida, bu har doim ham shunday emas. Buning sababi, `Ṩ` belgisi "yetarlicha keng tarqalgan", shuning uchun UTF-16 yaratuvchilari uni asosiy jadvalga kiritdilar va unga kod berdilar.

Agar siz normallashtirish qoidalari va variantlari haqida ko'proq bilmoqchi bo'lsangiz - ular Unikod standartining ilovasida keltirilgan: [Unikod normalizatsiya shakllari](http://www.unicode.org/reports/tr15/), lekin eng amaliy maqsadlar uchun ushbu bo'lim ma'lumotlari yetarli.


## Xulosa

- 3 ta qoshtirnoq mavjud. Teskari qoshtirnoq magtnga bir nechta satrlarni va iboralarni joylashtirishga imkon beradi.
- JavaScript-dagi satrlar UTF-16 yordamida kodlangan.
- Biz `\n` kabi maxsus belgilarni ishlatishimiz va `\u ...` yordamida unikodlari bo'yicha harflarni kiritishimiz mumkin.
- Belgini olish uchun quyidagidan foydalaning: "[]`.
- Submatnni olish uchun quyidagini ishlating: `slice` yoki `substring`.
- Matnni past/tepa registr harflar bilan o'zgartirish uchun quyidagilarni ishlating: `toLowerCase/toUpperCase`.
- Submatnni qidirish uchun quyidagilarni ishlating: `indexOf`, yoki `includes/beginWith/endsWith` oddiy tekshirishlar uchun.
- Satrlarni tilga ko'ra solishtirish uchun quyidagini ishlating: `localCompare`, aks holda ular belgilar kodlari bilan taqqoslanadi.

Satrlarda yana bir nechta foydali usullar mavjud:

- `str.trim()` -- matnning boshidan va oxiridan bo'shliqlarni olib tashlaydi.
- `str.repeat(n)` -- qatorni `n` marta takrorlaydi.
- ... va boshqalar. Tafsilotlar uchun [qo'llanmani](mdn:js/String) ko'ring.

Matnlar shuningdek, qidiruvni amalga oshirish/oddiy ifodalar bilan almashtirish usullariga ega. Ammo bu mavzu alohida bobga loyiqdir, shuning uchun keyinroq qaytamiz.
