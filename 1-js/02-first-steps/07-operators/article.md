# Operatorlar

Biz ko'plab operatorlarni maktabdan bilamiz. Ular qo'shimcha `+`, ko'paytma `*`, ayirish `-` va boshqalar kabi narsalar.

Ushbu bobda biz operatorlarning maktab arifmetikasiga kirmaydigan jihatlariga e'tibor qaratamiz.

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

    Rasmiy ravishda biz bu erda ikki xil operatorlar haqida gaplashamiz: unar inkor (bitta operand: ishorani teskari aylantiradi) va binar ayirish (ikkita operand: ayirish).

## Matnlarni birlashtirish, binar +

Endi JavaScript operatorlarining maktab arifmetikasidan tashqaridagi maxsus xususiyatlarini ko'rib chiqamiz.

Odatda `+` qo'shuv operatori raqamlarni yig'adi.

Lekin, binar `+` satrlarga qo'llanilsa, ularni birlashtiradi(qo'shadi) :

```js
let s = "my" + "string";
alert(s); // mystring
```

E'tibor bering, operandlardan biri satr bo'lsa, ikkinchisi ham satrga aylanadi.

Masalan:

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

Qarang, matn birinchi operand yoki ikkinchisi bo'lishi muhim emas. Qoida oddiy: agar ikkala operand dan biri matn bo'lsa, ikkinchisi ham matnga aylantiriladi.

Shu bilan birga, operatsiyalar chapdan o'ngga yo'naltirilganligiga e'tibor bering. Agar ikkita operand raqam va undan keyin qator bo'lsa, raqamlar qatorga o'tkazilishidan oldin qo'shiladi:


```js run
alert(2 + 2 + '1' ); // "41" "221" emas
```

Matnlarni birlashtirish va konvertatsiya binar qo'shilish `+` ning o'ziga xos xususiyati. Boshqa arifmetik operatorlar faqat raqamlar bilan ishlaydi va har doim o'z operandlarini raqamlarga aylantiradi.

Masalan, ayirish va bo'linish:

```js run
alert( 2 - '1' ); // 1
alert( '6' / '2' ); // 3
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

Matnlarni raqamlarga aylantirish zarurati juda tez-tez paydo bo'ladi. Masalan, biz HTML shakl maydonlaridan qiymatlarni olsak, ular odatda matnlardir.

Agar ularni qo'shishni istasak nima bo'ladi?

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

Agar ifoda bir nechta operatorga ega bo'lsa, ularni bajarish tartibi ularning *ustunligi* yoki boshqacha qilib aytganda operatorlarning aniq ustuvorligi tartibi bilan belgilanadi.

Maktabdan boshlab barchamiz bilamizki, `1 + 2 * 2` ifodasidagi ko'paytma qo'shilishdan oldin hisoblanishi kerak. Bu aniq ustunlik. Ko'paytirishning qo'shilishdan *ustunligi* yuqori ekanligi aytiladi.

Qavslar har qanday ustunlikni bekor qiladi, shuning uchun agar biz yashirin tartibni qoniqtirmasak, ularni o'zgartirish uchun ularni ishlatamiz. Masalan: `(1 + 2) * 2`.

Javascriptda ko'plab operatorlar mavjud. Har bir operator tegishli ustunlik raqamiga ega. Katta raqam birinchi amalga oshiriladi. Agar ustunlik bir xil bo'lsa, ijro etish tartibi chapdan o'ngga amalga oshiriladi.

Mana [ustunlik jadvalidan ko'chirma](https://developer.mozilla.org/en/JavaScript/Reference/operators/operator_precedence) (buni eslab qolishning hojati yo'q, lekin unar qo'shilish binar dan yuqori ekanligini unutmang):

| Ustunlik | Ism | Belgi |
|------------|------|------|
| ... | ... | ... |
| 16 | unar qo'shilish | `+` |
| 16 | unar ayirish | `-` |
| 14 | ko'paytirish | `*` |
| 14 | bo'lish | `/` |
| 13 | qo'shilish | `+` |
| 13 | ayirish | `-` |
| ... | ... | ... |
| 3 | tayinlash | `=` |
| ... | ... | ... |

As we can see, the "unary plus" has a priority of `16` which is higher than the `13` of "addition" (binary plus). That's why, in the expression `"+apples + +oranges"`, unary pluses work before the addition.
Ko'rib turganimizdek, "unar qo'shilish" ning ustuvorligi `16`, bu (binar qo'shilish) `13` dan yuqori. Shuning uchun `"+apples + +oranges"` iborasida unar qo'shilish ifodaning qo'shilishdan oldin ishlaydi.

## Tayinlash operatori

Tenglik belgisi `=` ham operator ekanligini ta'kidlaymiz. U ustunlik jadvalida juda past ustuvorlik bilan ko'rsatilgan `3`.

Shuning uchun, biz o'zgaruvchini tayinlaganimizda, masalan, `x = 2 * 2 + 1`, avval hisob-kitoblar amalga oshiriladi va keyin natijani `x` da saqlagan holda `=` baholanadi.

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

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

```js run
alert( 2 ** 2 ); // 4  (2 * 2)
alert( 2 ** 3 ); // 8  (2 * 2 * 2)
alert( 2 ** 4 ); // 16 (2 * 2 * 2 * 2)
```

Operator butun son bo'lmagan raqamlar uchun ham ishlaydi.

Masalan:

```js run
alert( 4 ** (1/2) ); // 2 (1/2 ning darajasi kvadrat ildiz bilan bir xil, bu matematika)
alert( 8 ** (1/3) ); // 2 (1/3 ning darajasi kub ildiz bilan bir xil)
```

## Kattalashtirish/Kamaytirish

<!-- Can't use -- in title, because built-in parse turns it into – -->

Raqamni bittaga ko'paytirish yoki kamaytirish bu eng keng tarqalgan raqamli amallardan biridir.

Shunday qilib, buning uchun maxsus operatorlar mavjud:

- **Kattalashtirish** `++` o'zgaruvchani 1 ga oshiradi:

    ```js run no-beautify
    let counter = 2;
    counter++;      // counter = counter + 1 bilan bir xil ishlaydi, lekin qisqaroq
    alert( counter ); // 3
    ```
- **Kamaytirish** `--` o'zgaruvchani 1 ga kamyaradi:

    ```js run no-beautify
    let counter = 2;
    counter--;      // counter = counter - 1 bilan bir xil ishlaydi, lekin qisqaroq
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

Ularsiz: `a = 1 + 2, 3 + 4` birinchi navbatda `+` ni baholaydi, raqamlarni `a = 3, 7` ga yig'adi, keyin `=` tayinlash operatori `a = 3` ni tayinlaydi va nihoyat verguldan keyin `7` qayta ishlanmaydi, shuning uchun unga e'tibor berilmaydi.
```

Nega bizga oxirgi qismdan tashqari hamma narsani tashlaydigan operator kerak?

Ba'zan, odamlar bir satrda bir nechta operatsiya bajarish uchun undan murakkab tuzilmalarda foydalanadilar.

Masalan:

```js
// bitta satrda uchta operatsiya
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

Bunday ayyorliklar ko'pgina Javascript frameworklarida ishlatiladi. Shuning uchun biz ularni eslatib o'tmoqdamiz. Ammo, odatda, ular kodni o'qishni yaxshilamaydilar, shuning uchun ularni ishlatishdan oldin yaxshi o'ylashimiz kerak.
