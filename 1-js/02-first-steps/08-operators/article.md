# Asosiy operatorlar, matematika

Biz ko'plab operatorlarni maktabdan bilamiz. Ular qo'shish `+`, ko'paytirish `*`, ayirish `-` va boshqa shunga o'xshash narsalardir.

Ushbu bobda biz oddiy operatorlardan boshlaymiz, keyin maktab arifmetikasida yoritilmagan JavaScript-ga xos jihatlarga e'tibor qaratamiz.

## Atamalar: "unary", "binary", "operand"

Davom etishdan oldin, keling, ba'zi umumiy terminologiyani tushunib olaylik.

- _Operand_ -- operatorlar qo'llaniladigan narsa. Masalan, `5 * 2` ko'paytirishida ikkita operand bor: chap operand `5` va o'ng operand `2`. Ba'zida odamlar bularni "operand" o'rniga "argument" deb atashadi.
- Operator bitta operandga ega bo'lsa, _unary_ deb ataladi. Masalan, unary inkor `-` raqamning belgisini o'zgartiradi:

  ```js run
  let x = 1;

  *!*
  x = -x;
  */!*
  alert( x ); // -1, unary inkor qo'llanildi
  ```

- Operator ikkita operandga ega bo'lsa, _binary_ deb ataladi. Xuddi shu minus binary shaklda ham mavjud:

  ```js run no-beautify
  let x = 1,
    y = 3;
  alert(y - x); // 2, binary minus qiymatlarni ayiradi
  ```

  Rasmiy ravishda, yuqoridagi misollarda bizda bir xil belgini baham ko'radigan ikkita turli operator bor: inkor operatori (raqam belgisini o'zgartiradigan unary operator) va ayirish operatori (bir raqamni boshqasidan ayiradigan binary operator).

## Matematika

Quyidagi matematik amallar qo'llab-quvvatlanadi:

- Qo'shish `+`,
- Ayirish `-`,
- Ko'paytirish `*`,
- Bo'lish `/`,
- Qoldiq `%`,
- Daraja `**`.

Birinchi to'rttasi oddiy, `%` va `**` haqida esa bir necha so'z aytish kerak.

### Qoldiq %

Qoldiq operatori `%`, ko'rinishiga qaramay, foizlar bilan bog'liq emas.

`a % b` ning natijasi `a` ni `b` ga butun bo'lishdan [qoldiq](https://en.wikipedia.org/wiki/Remainder)dir.

Masalan:

```js run
alert(5 % 2); // 1, 5 ni 2 ga bo'lishdan qoldiq
alert(8 % 3); // 2, 8 ni 3 ga bo'lishdan qoldiq
alert(8 % 4); // 0, 8 ni 4 ga bo'lishdan qoldiq
```

### Daraja \*\*

Daraja operatori `a ** b` `a` ni `b` darajasiga ko'taradi.

Maktab matematikasida biz buni a<sup>b</sup> deb yozamiz.

Masalan:

```js run
alert(2 ** 2); // 2² = 4
alert(2 ** 3); // 2³ = 8
alert(2 ** 4); // 2⁴ = 16
```

Matematikadagi kabi, daraja operatori butun bo'lmagan sonlar uchun ham aniqlangan.

Masalan, kvadrat ildiz ½ darajaga ko'tarishdir:

```js run
alert(4 ** (1 / 2)); // 2 (1/2 daraja kvadrat ildiz bilan bir xil)
alert(8 ** (1 / 3)); // 2 (1/3 daraja kub ildiz bilan bir xil)
```

## Binary + bilan string birlashtirish

Keling, maktab arifmetikasidan tashqari JavaScript operatorlarining xususiyatlari bilan tanishaylik.

Odatda, plyus operatori `+` raqamlarni qo'shadi.

Ammo, agar binary `+` stringlarga qo'llanilsa, u ularni birlashtiradi (konkatenatsiya):

```js
let s = "my" + "string";
alert(s); // mystring
```

E'tibor bering, agar operandlardan biri string bo'lsa, ikkinchisi ham stringga aylantiriladi.

Masalan:

```js run
alert("1" + 2); // "12"
alert(2 + "1"); // "21"
```

Ko'rib turibsizki, birinchi operand string yoki ikkinchisi string bo'lishi muhim emas.

Mana murakkabroq misol:

```js run
alert(2 + 2 + "1"); // "41", "221" emas
```

Bu yerda operatorlar ketma-ket ishlaydi. Birinchi `+` ikkita raqamni qo'shadi, demak `4` ni qaytaradi, keyin keyingi `+` unga `1` stringini qo'shadi, ya'ni `4 + '1' = '41'`.

```js run
alert("1" + 2 + 2); // "122", "14" emas
```

Bu yerda birinchi operand string, kompilyator qolgan ikkita operandni ham string sifatida ko'radi. `2` `'1'` ga birlashtiriladi, ya'ni `'1' + 2 = "12"` va `"12" + 2 = "122"`.

Binary `+` stringlarni bunday qo'llab-quvvatlaydigan yagona operator. Boshqa arifmetik operatorlar faqat raqamlar bilan ishlaydi va har doim operandlarini raqamlarga aylantiradi.

Mana ayirish va bo'lish uchun namoyish:

```js run
alert(6 - "2"); // 4, '2' ni raqamga aylantiradi
alert("6" / "2"); // 3, ikkala operandni ham raqamlarga aylantiradi
```

## Raqamli o'zgartirish, unary +

Plyus `+` ikki shaklda mavjud: yuqorida ishlatgan binary shakl va unary shakl.

Unary plyus yoki boshqacha qilib aytganda, bitta qiymatga qo'llaniladigan plyus operatori `+` raqamlarga hech narsa qilmaydi. Ammo agar operand raqam bo'lmasa, unary plyus uni raqamga aylantiradi.

Masalan:

```js run
// Raqamlarga ta'sir qilmaydi
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

*!*
// Raqam bo'lmaganlarni aylantiradi
alert( +true ); // 1
alert( +"" );   // 0
*/!*
```

Bu aslida `Number(...)` bilan bir xil ishni qiladi, lekin qisqaroq.

Stringlarni raqamlarga aylantirish ehtiyoji tez-tez paydo bo'ladi. Masalan, agar biz HTML forma maydonlaridan qiymatlar olayotgan bo'lsak, ular odatda stringlar bo'ladi. Agar biz ularni qo'shmoqchi bo'lsak-chi?

Binary plyus ularni string sifatida qo'shadi:

```js run
let apples = "2";
let oranges = "3";

alert(apples + oranges); // "23", binary plyus stringlarni birlashtiradi
```

Agar biz ularni raqam sifatida ko'rishni istasak, ularni aylantirib, keyin qo'shishimiz kerak:

```js run
let apples = "2";
let oranges = "3";

*!*
// binary plyusdan oldin ikkala qiymat ham raqamlarga aylantirildi
alert( +apples + +oranges ); // 5
*/!*

// uzunroq variant
// alert( Number(apples) + Number(oranges) ); // 5
```

Matematik nuqtai nazardan, plyuslarning ko'pligi g'alati tuyulishi mumkin. Ammo dasturchi nuqtai nazaridan, hech narsa alohida emas: unary plyuslar birinchi qo'llaniladi, ular stringlarni raqamlarga aylantiradi, keyin binary plyus ularni qo'shadi.

Nega unary plyuslar binary plyuslardan oldin qo'llaniladi? Ko'rib chiqamizki, bu ularning _yuqori ustunligi_ tufayli.

## Operatorlar ustunligi

Agar ifodada bir nechta operator bo'lsa, bajarilish tartibi ularning _ustunligi_ yoki boshqacha qilib aytganda, operatorlarning standart muhimlik tartibi bilan belgilanadi.

Maktabdan hammamiz bilamizki, `1 + 2 * 2` ifodasida ko'paytirish qo'shishdan oldin hisoblanishi kerak. Bu aynan ustunlik masalasi. Ko'paytirish qo'shishga qaraganda _yuqori ustunlikka_ ega deyiladi.

Qavslar har qanday ustunlikni bekor qiladi, shuning uchun agar standart tartib bizni qoniqtirmasa, uni o'zgartirish uchun qavslardan foydalanishimiz mumkin. Masalan, `(1 + 2) * 2` deb yozamiz.

JavaScript da ko'plab operatorlar mavjud. Har bir operator tegishli ustunlik raqamiga ega. Kattaroq raqamga ega bo'lgani birinchi bajariladi. Agar ustunlik bir xil bo'lsa, bajarilish tartibi chapdan o'ngga.

Mana [ustunlik jadvalidan](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) ko'chirma (buni eslab qolish shart emas, lekin unary operatorlar tegishli binary operatorlardan yuqoriroq ekanligini unutmang):

| Ustunlik | Nomi         | Belgi |
| -------- | ------------ | ----- |
| ...      | ...          | ...   |
| 14       | unary plyus  | `+`   |
| 14       | unary inkor  | `-`   |
| 13       | daraja       | `**`  |
| 12       | ko'paytirish | `*`   |
| 12       | bo'lish      | `/`   |
| 11       | qo'shish     | `+`   |
| 11       | ayirish      | `-`   |
| ...      | ...          | ...   |
| 2        | tayinlash    | `=`   |
| ...      | ...          | ...   |

Ko'rib turganimizdek, "unary plyus" `14` ustunlikka ega, bu "qo'shish" (binary plyus)ning `11` ustunligidan yuqori. Shuning uchun `"+apples + +oranges"` ifodasida unary plyuslar qo'shishdan oldin ishlaydi.

## Tayinlash

Shuni ta'kidlash kerakki, tayinlash `=` ham operator. U ustunlik jadvalida juda past `2` ustunlik bilan ro'yxatga olingan.

Shuning uchun biz o'zgaruvchini tayinlaganimizda, masalan `x = 2 * 2 + 1`, avval hisob-kitoblar bajariladi va keyin `=` baholanib, natijani `x` ga saqlaydi.

```js
let x = 2 * 2 + 1;

alert(x); // 5
```

### Tayinlash = qiymat qaytaradi

`=` ning operator bo'lishi, "sehrli" til konstruktsiyasi emas, qiziq natijaga olib keladi.

JavaScript dagi barcha operatorlar qiymat qaytaradi. Bu `+` va `-` uchun aniq, lekin `=` uchun ham to'g'ri.

`x = value` chaqiruvi `value` ni `x` ga yozadi _va keyin uni qaytaradi_.

Mana tayinlashni murakkabroq ifodaning bir qismi sifatida ishlatuvchi namoyish:

```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

Yuqoridagi misolda `(a = b + 1)` ifodasining natijasi `a` ga tayinlangan qiymat (`3`). Keyin u keyingi hisob-kitoblar uchun ishlatiladi.

Kulgili kod, shunday emasmi? Biz uni qanday ishlashini tushunishimiz kerak, chunki ba'zida JavaScript kutubxonalarida buni ko'ramiz.

Garchi, iltimos, bunday kod yozmang. Bunday hiylalar kodni aniqroq yoki o'qilishi mumkin qilmaydi.

### Zanjirli tayinlashlar

Yana bir qiziq xususiyat - tayinlashlarni zanjirlash imkoniyati:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

Zanjirli tayinlashlar o'ngdan chapga baholanadi. Avval eng o'ngdagi `2 + 2` ifodasi baholanadi va keyin chapdagi o'zgaruvchilarga tayinlanadi: `c`, `b` va `a`. Oxirida barcha o'zgaruvchilar bitta qiymatni baham ko'radi.

Yana, o'qilishi uchun bunday kodni bir necha satrga bo'lish yaxshidir:

```js
c = 2 + 2;
b = c;
a = c;
```

Bu o'qish osonroq, ayniqsa kodni tez ko'zdan kechirghanda.

## O'zgartirib-tayinlash

Biz tez-tez o'zgaruvchiga operator qo'llab, yangi natijani xuddi shu o'zgaruvchida saqlashimiz kerak.

Masalan:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

Bu yozuvni `+=` va `*=` operatorlari yordamida qisqartirish mumkin:

```js run
let n = 2;
n += 5; // endi n = 7 (n = n + 5 bilan bir xil)
n *= 2; // endi n = 14 (n = n * 2 bilan bir xil)

alert(n); // 14
```

Qisqa "o'zgartir-va-tayinla" operatorlari barcha arifmetik va bitli operatorlar uchun mavjud: `/=`, `-=`, va boshqalar.

Bunday operatorlar oddiy tayinlash bilan bir xil ustunlikka ega, shuning uchun ular boshqa ko'plab hisob-kitoblardan keyin ishlaydi:

```js run
let n = 2;

n *= 3 + 5; // o'ng qism birinchi baholanadi, n *= 8 bilan bir xil

alert(n); // 16
```

## Oshirish/kamaytirish

Raqamni birga oshirish yoki kamaytirish eng keng tarqalgan raqamli amallardan biri.

Shuning uchun buning uchun maxsus operatorlar mavjud:

- **Oshirish** `++` o'zgaruvchini 1 ga oshiradi:

  ```js run no-beautify
  let counter = 2;
  counter++; // counter = counter + 1 bilan bir xil ishlaydi, lekin qisqaroq
  alert(counter); // 3
  ```

- **Kamaytirish** `--` o'zgaruvchini 1 ga kamaytiradi:

  ```js run no-beautify
  let counter = 2;
  counter--; // counter = counter - 1 bilan bir xil ishlaydi, lekin qisqaroq
  alert(counter); // 1
  ```

```warn header="Muhim"
Oshirish/kamaytirish faqat o'zgaruvchilarga qo'llanilishi mumkin. `5++` kabi qiymatga ishlatishga urinish xatoga olib keladi.
```

`++` va `--` operatorlari o'zgaruvchidan oldin yoki keyin qo'yilishi mumkin.

- Operator o'zgaruvchidan keyin kelsa, u "postfiks shakl"da: `counter++`.
- "Prefiks shakl" operator o'zgaruvchidan oldin kelganida: `++counter`.

Ikkala bayonot ham bir xil ishni qiladi: `counter` ni `1` ga oshiradi.

Farq bormi? Ha, lekin biz buni faqat `++/--` ning qaytarilgan qiymatini ishlatgandagina ko'rishimiz mumkin.

Aniqlashtiraman. Bilganimizdek, barcha operatorlar qiymat qaytaradi. Oshirish/kamaytirish ham istisno emas. Prefiks shakl yangi qiymatni qaytaradi, postfiks shakl esa eski qiymatni (oshirish/kamaytirishdan oldingi) qaytaradi.

Farqni ko'rish uchun mana misol:

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

`(*)` satrda _prefiks_ shakl `++counter` `counter` ni oshiradi va yangi qiymatni `2` qaytaradi. Shuning uchun `alert` `2` ni ko'rsatadi.

Endi postfiks shaklni ishlataylik:

```js run
let counter = 1;
let a = counter++; // (*) ++counter ni counter++ ga o'zgartirdik

alert(a); // *!*1*/!*
```

`(*)` satrda _postfiks_ shakl `counter++` ham `counter` ni oshiradi, lekin _eski_ qiymatni (oshirishdan oldingi) qaytaradi. Shuning uchun `alert` `1` ni ko'rsatadi.

Xulosa:

- Agar oshirish/kamaytirish natijasi ishlatilmasa, qaysi shaklni ishlatishda farq yo'q:

  ```js run
  let counter = 0;
  counter++;
  ++counter;
  alert(counter); // 2, yuqoridagi satrlar bir xil ishni qildi
  ```

- Agar qiymatni oshirishni _va_ operatorning natijasini darhol ishlatishni istasak, prefiks shaklni kerak qilamiz:

  ```js run
  let counter = 0;
  alert(++counter); // 1
  ```

- Agar qiymatni oshirishni, lekin uning oldingi qiymatini ishlatishni istasak, postfiks shaklni kerak qilamiz:

  ```js run
  let counter = 0;
  alert(counter++); // 0
  ```

````smart header="Boshqa operatorlar orasida oshirish/kamaytirish"
`++/--` operatorlari ifodalarda ham ishlatilishi mumkin. Ularning ustunligi ko'pgina boshqa arifmetik amallardan yuqori.

Masalan:

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
```

Taqqoslang:

```js run
let counter = 1;
alert( 2 * counter++ ); // 2, chunki counter++ "eski" qiymatni qaytaradi
```

Texnik jihatdan yaxshi bo'lsa-da, bunday yozuv odatda kodni kamroq o'qilishi mumkin qiladi. Bir satr bir nechta ishni qiladi -- yaxshi emas.

Kodni o'qiyotganda, tez "vertikal" ko'z skaneri `counter++` kabi narsani osongina o'tkazib yuborishi mumkin va o'zgaruvchi oshganligini tushunish aniq bo'lmaydi.

Biz "bir satr -- bir harakat" uslubini tavsiya etamiz:

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````

## Bitli operatorlar

Bitli operatorlar argumentlarni 32-bitli butun sonlar sifatida ko'radi va ularning ikkilik ko'rinishi darajasida ishlaydi.

Bu operatorlar JavaScript-ga xos emas. Ular ko'pgina dasturlash tillarida qo'llab-quvvatlanadi.

Operatorlar ro'yxati:

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- LEFT SHIFT ( `<<` )
- RIGHT SHIFT ( `>>` )
- ZERO-FILL RIGHT SHIFT ( `>>>` )

Bu operatorlar juda kamdan-kam ishlatiladi, eng past (bitli) darajada raqamlar bilan urishga to'g'ri kelganda. Biz bu operatorlarga tez orada muhtoj bo'lmaymiz, chunki veb-ishlanmada ular kam qo'llaniladi, lekin kriptografiya kabi ba'zi maxsus sohalarda foydali. Ehtiyoj tug'ilganda MDN dagi [Bitwise Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#bitwise_operators) bobini o'qishingiz mumkin.

## Vergul

Vergul operatori `,` eng kam uchraydigan va eng g'ayrioddiy operatorlardan biri. Ba'zida qisqaroq kod yozish uchun ishlatiladi, shuning uchun nima bo'layotganini tushunish uchun uni bilishimiz kerak.

Vergul operatori bizga bir nechta ifodalarni baholashga imkon beradi, ularni vergul `,` bilan ajratib. Ularning har biri baholanadi, lekin faqat oxirgisining natijasi qaytariladi.

Masalan:

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7 (3 + 4 ning natijasi)
```

Bu yerda birinchi ifoda `1 + 2` baholanadi va uning natijasi tashlab yuboriladi. Keyin `3 + 4` baholanadi va natija sifatida qaytariladi.

```smart header="Vergul juda past ustunlikka ega"
E'tibor bering, vergul operatori juda past ustunlikka ega, `=` dan ham pastroq, shuning uchun yuqoridagi misolda qavslar muhim.

Ularsiz: `a = 1 + 2, 3 + 4` avval `+` ni baholaydi, raqamlarni `a = 3, 7` ga qo'shadi, keyin tayinlash operatori `=` `a = 3` ni tayinlaydi va qolgani e'tiborga olinmaydi. Bu `(a = 1 + 2), 3 + 4` kabi.
```

Nega oxirgi ifodadan tashqari hamma narsani tashlaydigan operator kerak?

Ba'zida odamlar uni murakkabroq konstruktsiyalarda bir satrga bir nechta harakatni qo'yish uchun ishlatadi.

Masalan:

```js
// bir satrda uchta amal
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

Bunday hiylalar ko'plab JavaScript freymvorklarida ishlatiladi. Shuning uchun biz ularni eslatib o'tmoqdamiz. Ammo odatda ular kod o'qilishini yaxshilamaydi, shuning uchun ularni ishlatishdan oldin yaxshilab o'ylashimiz kerak.
