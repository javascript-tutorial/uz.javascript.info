# Mantiqiy operatorlar

JavaScript-da to'rtta mantiqiy operator mavjud: `||` (YOKI), `&&` (VA), `!` (EMAS), `??` (Nullish Coalescing). Bu yerda biz birinchi uchta operatorni ko'rib chiqamiz, `??` operator keyingi maqolada yoritilgan.

Ular "mantiqiy" deb atalsa ham, ular faqat boolean tipidagi qiymatlargagina emas, balki har qanday tipdagi qiymatlarga ham qo'llanilishi mumkin. Ularning natijasi ham har qanday tipda bo'lishi mumkin.

Keling, batafsil ko'rib chiqamiz.

## || (YOKI)

"YOKI" operatori ikki vertikal chiziq belgisi bilan ifodalanadi:

```js
result = a || b;
```

Klassik dasturlashda, mantiqiy YOKI faqat boolean qiymatlar bilan ishlash uchun mo'ljallangan. Agar argumentlaridan biri `true` bo'lsa, u `true` qaytaradi, aks holda `false` qaytaradi.

JavaScript-da esa bu operator biroz murakkabroq va kuchlidir. Lekin avval boolean qiymatlar bilan nima sodir bo'lishini ko'rib chiqaylik.

To'rtta mumkin bo'lgan mantiqiy kombinatsiya mavjud:

```js run
alert(true || true); // true
alert(false || true); // true
alert(true || false); // true
alert(false || false); // false
```

Ko'rib turganingizdek, ikkala operand ham `false` bo'lgan holdan tashqari, natija har doim `true` bo'ladi.

Agar operand boolean bo'lmasa, u baholash uchun boolean tipiga aylantiriladi.

Masalan, `1` raqami `true` sifatida, `0` raqami esa `false` sifatida qaraladi:

```js run
if (1 || 0) {
  // xuddi if( true || false ) kabi ishlaydi
  alert("haqiqiy!");
}
```

Ko'pincha, YOKI `||` operatori `if` ifodasida berilgan shartlardan _birortasi_ `true` ekanligini tekshirish uchun ishlatiladi.

Masalan:

```js run
let hour = 9;

*!*
if (hour < 10 || hour > 18) {
*/!*
  alert( 'Ofis yopiq.' );
}
```

Ko'proq shartlarni ham qo'shishimiz mumkin:

```js run
let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
  alert("Ofis yopiq."); // dam olish kuni
}
```

## YOKI "||" birinchi haqiqiy qiymatni topadi [#or-finds-the-first-truthy-value]

Yuqorida tasvirlangan mantiq biroz klassikdir. Endi keling, JavaScript-ning "qo'shimcha" xususiyatlarini ko'rib chiqaylik.

Kengaytirilgan algoritm quyidagicha ishlaydi.

Bir nechta YOKI bilan birlashtirilgan qiymatlar berilgan:

```js
result = value1 || value2 || value3;
```

YOKI `||` operatori quyidagicha ishlaydi:

- Operandlarni chapdan o'ngga qarab baholaydi.
- Har bir operand uchun uni boolean tipiga aylantiradi. Agar natija `true` bo'lsa, to'xtaydi va o'sha operandning asl qiymatini qaytaradi.
- Agar barcha operandlar baholangan bo'lsa (ya'ni hammasi `false` bo'lsa), oxirgi operandni qaytaradi.

Qiymat aylantirishsiz, asl shaklida qaytariladi.

Boshqacha qilib aytganda, YOKI `||` zanjirlari birinchi haqiqiy qiymatni yoki agar haqiqiy qiymat topilmasa, oxirgi qiymatni qaytaradi.

Masalan:

```js run
alert(1 || 0); // 1 (1 haqiqiy)

alert(null || 1); // 1 (1 birinchi haqiqiy qiymat)
alert(null || 0 || 1); // 1 (birinchi haqiqiy qiymat)

alert(undefined || null || 0); // 0 (hammasi yolg'on, oxirgi qiymatni qaytaradi)
```

Bu "sof, klassik, faqat-boolean YOKI" bilan solishtirganda qiziqarli foydalanish imkoniyatlarini beradi.

1. **O'zgaruvchilar yoki ifodalar ro'yxatidan birinchi haqiqiy qiymatni olish.**

   Masalan, bizda `firstName`, `lastName` va `nickName` o'zgaruvchilari bor, ularning barchasi ixtiyoriy (ya'ni undefined yoki yolg'on qiymatlarga ega bo'lishi mumkin).

   Ma'lumotga ega bo'lgan birini tanlash va uni ko'rsatish uchun YOKI `||` dan foydalanamiz (yoki agar hech narsa o'rnatilmagan bo'lsa `"Anonymous"`):

   ```js run
   let firstName = "";
   let lastName = "";
   let nickName = "SuperCoder";

   *!*
   alert( firstName || lastName || nickName || "Anonymous"); // SuperCoder
   */!*
   ```

   Agar barcha o'zgaruvchilar yolg'on bo'lsa, `"Anonymous"` ko'rinadi.

2. **Qisqa tutashuv baholashi.**

   YOKI `||` operatorining yana bir xususiyati "qisqa tutashuv" baholashidir.

   Bu shuni anglatadiki, `||` o'z argumentlarini birinchi haqiqiy qiymatga yetguncha qayta ishlaydi, keyin qiymat darhol qaytariladi, boshqa argumentga tegmasdan turib.

   Bu xususiyatning ahamiyati, agar operand oddiy qiymat emas, balki o'zgaruvchi tayinlash yoki funksiya chaqiruvi kabi yon ta'sirli ifoda bo'lsa yaqqol ko'rinadi.

   Quyidagi misolda faqat ikkinchi xabar chop etiladi:

   ```js run no-beautify
   *!*true*/!* || alert("chop etilmaydi");
   *!*false*/!* || alert("chop etiladi");
   ```

   Birinchi qatorda YOKI `||` operatori `true` ni ko'rishi bilanoq baholashni darhol to'xtatadi, shuning uchun `alert` bajarilmaydi.

   Ba'zan odamlar bu xususiyatdan faqat chap qismidagi shart yolg'on bo'lgandagina buyruqlarni bajarish uchun foydalanadilar.

## && (VA)

VA operatori ikki ampersand `&&` bilan ifodalanadi:

```js
result = a && b;
```

Klassik dasturlashda VA ikkala operand ham haqiqiy bo'lsa `true`, aks holda `false` qaytaradi:

```js run
alert(true && true); // true
alert(false && true); // false
alert(true && false); // false
alert(false && false); // false
```

`if` bilan misol:

```js run
let hour = 12;
let minute = 30;

if (hour == 12 && minute == 30) {
  alert("Vaqt 12:30");
}
```

YOKI kabi, VA operandiga ham har qanday qiymat ruxsat etilgan:

```js run
if (1 && 0) {
  // true && false sifatida baholanadi
  alert("ishlamaydi, chunki natija yolg'on");
}
```

## VA "&&" birinchi yolg'on qiymatni topadi

Bir nechta VA bilan birlashtirilgan qiymatlar berilgan:

```js
result = value1 && value2 && value3;
```

VA `&&` operatori quyidagicha ishlaydi:

- Operandlarni chapdan o'ngga qarab baholaydi.
- Har bir operand uchun uni boolean tipiga aylantiradi. Agar natija `false` bo'lsa, to'xtaydi va o'sha operandning asl qiymatini qaytaradi.
- Agar barcha operandlar baholangan bo'lsa (ya'ni hammasi haqiqiy bo'lsa), oxirgi operandni qaytaradi.

Boshqacha qilib aytganda, VA birinchi yolg'on qiymatni yoki agar topilmasa, oxirgi qiymatni qaytaradi.

Yuqoridagi qoidalar YOKI ga o'xshash. Farqi shundaki, VA birinchi _yolg'on_ qiymatni qaytaradi, YOKI esa birinchi _haqiqiy_ qiymatni qaytaradi.

Misollar:

```js run
// agar birinchi operand haqiqiy bo'lsa,
// VA ikkinchi operandni qaytaradi:
alert(1 && 0); // 0
alert(1 && 5); // 5

// agar birinchi operand yolg'on bo'lsa,
// VA uni qaytaradi. Ikkinchi operand e'tiborga olinmaydi
alert(null && 5); // null
alert(0 && "farqi yo'q nima bo'lsa"); // 0
```

Shuningdek, bir nechta qiymatni ketma-ket o'tkazishimiz mumkin. Birinchi yolg'on qiymat qanday qaytarilishini ko'ring:

```js run
alert(1 && 2 && null && 3); // null
```

Barcha qiymatlar haqiqiy bo'lganda, oxirgi qiymat qaytariladi:

```js run
alert(1 && 2 && 3); // 3, oxirgisi
```

````smart header="VA `&&`ning ustunligi YOKI`||`dan yuqori"
VA`&&`operatorining ustunligi YOKI`||` dan yuqoridir.

Shunday qilib, `a && b || c && d` kodi asosan `&&` ifodalari qavs ichida bo'lgandek: `(a && b) || (c && d)`.

`````

````warn header="`if` ni `||` yoki `&&` bilan almashtirmang"
Ba'zan odamlar VA `&&` operatoridan "`if` yozishning qisqaroq usuli" sifatida foydalanadilar.

Masalan:

```js run
let x = 1;

(x > 0) && alert( 'Noldan katta!' );
```

`&&` ning o'ng qismidagi harakat faqat baholash unga yetsa bajariladi. Ya'ni, faqat `(x > 0)` haqiqiy bo'lsa.

Demak, bizda quyidagining o'xshashi bor:

```js run
let x = 1;

if (x > 0) alert( 'Noldan katta!' );
```

Garchi `&&` li variant qisqaroq ko'rinsa ham, `if` aniqroq va biroz o'qishga osonroqdir. Shuning uchun biz har bir konstruksiyani o'z maqsadi uchun ishlatishni tavsiya qilamiz: agar `if` kerak bo'lsa `if` dan, VA kerak bo'lsa `&&` dan foydalaning.
`````

## ! (EMAS)

Boolean EMAS operatori undov belgisi `!` bilan ifodalanadi.

Sintaksis juda oddiy:

```js
result = !value;
```

Operator bitta argument qabul qiladi va quyidagicha ishlaydi:

1. Operandni boolean tipiga aylantiradi: `true/false`.
2. Teskari qiymatni qaytaradi.

Masalan:

```js run
alert(!true); // false
alert(!0); // true
```

Ikki marta EMAS `!!` ba'zan qiymatni boolean tipiga aylantirish uchun ishlatiladi:

```js run
alert(!!"bo'sh bo'lmagan satr"); // true
alert(!!null); // false
```

Ya'ni, birinchi EMAS qiymatni boolean ga aylantiradi va teskarisini qaytaradi, ikkinchi EMAS uni yana teskariga aylantiradi. Natijada bizda oddiy qiymat-dan-boolean-ga aylantirish bo'ladi.

Xuddi shu ishni qilishning biroz batafsil usuli bor -- o'rnatilgan `Boolean` funksiyasi:

```js run
alert(Boolean("bo'sh bo'lmagan satr")); // true
alert(Boolean(null)); // false
```

EMAS `!` ning ustunligi barcha mantiqiy operatorlar ichida eng yuqori, shuning uchun u har doim birinchi bo'lib, `&&` yoki `||` dan oldin bajariladi.
