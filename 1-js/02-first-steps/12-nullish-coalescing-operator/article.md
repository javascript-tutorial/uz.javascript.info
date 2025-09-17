# Nullab birlashtirish operatori '??'

[recent browser="new"]

Nullab birlashtirish operatori ikki savol belgisi `??` bilan yoziladi.

U `null` va `undefined` ni bir xil darajada ko'rib chiqadi, shuning uchun bu maqolada maxsus atama ishlatamiz. Agar ifoda `null` ham, `undefined` ham bo'lmasa, uni "aniqlangan" deb ataymiz.

`a ?? b` ning natijasi:

- agar `a` aniqlangan bo'lsa, u holda `a`,
- agar `a` aniqlanmagan bo'lsa, u holda `b`.

Boshqacha qilib aytganda, `??` agar birinchi argument `null/undefined` bo'lmasa, uni qaytaradi. Aks holda, ikkinchisini qaytaradi.

Nullab birlashtirish operatori butunlay yangi narsa emas. Bu shunchaki ikkitadan birinchi "aniqlangan" qiymatni olishning yoqimli sintaksidir.

Biz `result = a ?? b` ni allaqachon bilgan operatorlar yordamida qayta yozishimiz mumkin:

```js
result = a !== null && a !== undefined ? a : b;
```

Endi `??` nima qilishi mutlaqo aniq bo'lishi kerak. Qayerda yordam berishini ko'rib chiqaylik.

`??` ning umumiy foydalanish holati - potensial aniqlanmagan o'zgaruvchi uchun standart qiymat berish.

Masalan, bu yerda agar aniqlangan bo'lsa `user` ni, aks holda `Anonymous` ni ko'rsatamiz:

```js run
let user;

alert(user ?? "Anonymous"); // Anonymous (user aniqlanmagan)
```

Bu yerda `user` ga nom tayinlangan misol:

```js run
let user = "John";

alert(user ?? "Anonymous"); // John (user aniqlangan)
```

Shuningdek, `null/undefined` bo'lmagan ro'yxatdan birinchi qiymatni tanlash uchun `??` ketma-ketligini ishlatishimiz mumkin.

Aytaylik, bizda foydalanuvchi ma'lumotlari `firstName`, `lastName` yoki `nickName` o'zgaruvchilarida bor. Agar foydalanuvchi qiymat kiritmaslikni hal qilgan bo'lsa, ularning barchasi aniqlanmagan bo'lishi mumkin.

Biz ushbu o'zgaruvchilardan birini ishlatib foydalanuvchi nomini ko'rsatmoqchimiz yoki agar ularning barchasi aniqlanmagan bo'lsa "Anonymous" ko'rsatmoqchimiz.

Buning uchun `??` operatoridan foydalanamiz:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// birinchi aniqlangan qiymatni ko'rsatadi:
*!*
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
*/!*
```

## || bilan taqqoslash

YOKI `||` operatori `??` bilan bir xil tarzda ishlatilishi mumkin, chunki bu [oldingi bobda](info:logical-operators#or-finds-the-first-truthy-value) tasvirlangan.

Masalan, yuqoridagi kodda biz `??` ni `||` bilan almashtirish va hali ham bir xil natijani olishimiz mumkin:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// birinchi haqiqiy qiymatni ko'rsatadi:
*!*
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder
*/!*
```

Tarixan YOKI `||` operatori birinchi bo'lib paydo bo'lgan. U JavaScript boshidanoq mavjud, shuning uchun dasturchilar uzoq vaqt davomida bunday maqsadlar uchun foydalanib kelishgan.

Boshqa tomondan, nullab birlashtirish operatori `??` JavaScript-ga yaqinda qo'shilgan va buning sababi odamlar `||` dan butunlay mamnun emas edi.

Ularning o'rtasidagi muhim farq:

- `||` birinchi _haqiqiy_ qiymatni qaytaradi.
- `??` birinchi _aniqlangan_ qiymatni qaytaradi.

Boshqacha qilib aytganda, `||` `false`, `0`, bo'sh satr `""` va `null/undefined` o'rtasida farq qilmaydi. Ularning barchasi bir xil -- yolg'on qiymatlar. Agar bulardan biri `||` ning birinchi argumenti bo'lsa, natija sifatida ikkinchi argumentni olamiz.

Amalda esa biz standart qiymatni faqat o'zgaruvchi `null/undefined` bo'lgandagina ishlatmoqchi bo'lishimiz mumkin. Ya'ni qiymat haqiqatan ham noma'lum/o'rnatilmagan bo'lganda.

Masalan, buni ko'rib chiqing:

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

- `height || 100` `height` ning yolg'on qiymat ekanligini tekshiradi va u `0`, haqiqatan ham yolg'on.
  - shuning uchun `||` ning natijasi ikkinchi argument, `100`.
- `height ?? 100` `height` ning `null/undefined` ekanligini tekshiradi va u bunday emas,
  - shuning uchun natija `height` "o'zi", ya'ni `0`.

Amalda nol balandlik ko'pincha to'g'ri qiymat bo'lib, standart bilan almashtirilmasligi kerak. Shuning uchun `??` to'g'ri ishni qiladi.

## Ustunlik

`??` operatorining ustunligi `||` bilan deyarli bir xil, faqat biroz pastroq. [MDN jadvalida](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table) u `5` ga teng, `||` esa `6`.

Bu shuni anglatadiki, `||` kabi, nullab birlashtirish operatori `??` ham `=` va `?` dan oldin, lekin `+`, `*` kabi boshqa ko'pchilik operatsiyalardan keyin baholanadi.

Shuning uchun agar biz boshqa operatorlar bilan ifodada `??` bilan qiymat tanlashni istasak, qavs qo'shishni ko'rib chiqing:

```js run
let height = null;
let width = null;

// muhim: qavslardan foydalaning
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

Aks holda, agar qavslarni tashlab qo'ysak, `*` ning ustunligi `??` dan yuqori bo'lgani uchun u birinchi bo'lib bajariladi va noto'g'ri natijalarga olib keladi.

```js
// qavslarsiz
let area = height ?? 100 * width ?? 50;

// ...xuddi shu narsani bajaradi (ehtimol biz istagan narsa emas):
let area = height ?? 100 * width ?? 50;
```

### ?? ni && yoki || bilan ishlatish

Xavfsizlik sabablariga ko'ra, JavaScript `??` ni `&&` va `||` operatorlari bilan birga ishlatishni taqiqlaydi, agar ustunlik qavs bilan aniq ko'rsatilmagan bo'lsa.

Quyidagi kod sintaksis xatosini keltirib chiqaradi:

```js run
let x = 1 && 2 ?? 3; // Sintaksis xatosi
```

Bu cheklov, albatta, munozarali, u odamlar `||` dan `??` ga o'tishni boshlaganda dasturlash xatolarini oldini olish maqsadida til spetsifikatsiyasiga qo'shilgan.

Buni hal qilish uchun aniq qavslardan foydalaning:

```js run
*!*
let x = (1 && 2) ?? 3; // Ishlaydi
*/!*

alert(x); // 2
```

## Xulosa

- Nullab birlashtirish operatori `??` ro'yxatdan birinchi "aniqlangan" qiymatni tanlashning qisqa usulini taqdim etadi.

  U o'zgaruvchilarga standart qiymatlarni tayinlash uchun ishlatiladi:

  ```js
  // agar height null yoki undefined bo'lsa, height=100 qo'ying
  height = height ?? 100;
  ```

- `??` operatori juda past ustunlikka ega, faqat `?` va `=` dan biroz yuqori, shuning uchun uni ifodada ishlatishda qavs qo'shishni ko'rib chiqing.
- Uni aniq qavslar bo'lmasa `||` yoki `&&` bilan ishlatish taqiqlangan.
