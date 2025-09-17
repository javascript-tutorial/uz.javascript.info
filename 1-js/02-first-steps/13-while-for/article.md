# Tsikllar: while va for

Ko'pincha harakatlarni takrorlashga to'g'ri keladi.

Masalan, ro'yxatdan tovarlarni birin-ketin chiqarish yoki 1 dan 10 gacha bo'lgan har bir raqam uchun bir xil kodni ishga tushirish.

_Tsikllar_ - bir xil kodni bir necha marta takrorlash usuli.

```smart header="for..of va for..in tsikllari"
Ilg'or o'quvchilar uchun kichik e'lon.

Bu maqola faqat asosiy tsikllarni qamrab oladi: `while`, `do..while` va `for(..;..;..)`.

Agar siz bu maqolaga boshqa turdagi tsikllarni qidirib kelgan bo'lsangiz, mana ko'rsatmalar:

- Obyekt xossalari bo'ylab tsikl uchun [for..in](info:object#forin) ga qarang.
- Massivlar va takrorlanadigan obyektlar bo'ylab tsikl uchun [for..of](info:array#loops) va [iterables](info:iterable) ga qarang.

Aks holda, davom eting.
```

## "while" tsikli

`while` tsikli quyidagi sintaksisga ega:

```js
while (condition) {
  // kod
  // "tsikl tanasi" deb ataladi
}
```

`condition` haqiqiy bo'lgan vaqtda, tsikl tanasidagi `kod` bajariladi.

Masalan, quyidagi tsikl `i < 3` bo'lgan vaqtda `i` ni chiqaradi:

```js run
let i = 0;
while (i < 3) {
  // 0, keyin 1, keyin 2 ni ko'rsatadi
  alert(i);
  i++;
}
```

Tsikl tanasining bir marta bajarilishi _iteratsiya_ deb ataladi. Yuqoridagi misoldagi tsikl uch marta iteratsiya qiladi.

Agar yuqoridagi misolda `i++` bo'lmaganida, tsikl (nazariy jihatdan) abadiy takrorlanar edi. Amalda brauzer bunday tsikllarni to'xtatish usullarini taqdim etadi va server tomonidagi JavaScript-da biz jarayonni to'xtatishimiz mumkin.

Faqat taqqoslashlar emas, har qanday ifoda yoki o'zgaruvchi tsikl sharti bo'lishi mumkin: shart baholanadi va `while` tomonidan boolean ga aylantiriladi.

Masalan, `while (i != 0)` ni yozishning qisqaroq usuli `while (i)`:

```js run
let i = 3;
*!*
while (i) { // i 0 ga aylanganida, shart yolg'on bo'ladi va tsikl to'xtaydi
*/!*
  alert( i );
  i--;
}
```

````smart header="Bir qatorli tana uchun jingalak qavslar shart emas"
Agar tsikl tanasi bitta iboraga ega bo'lsa, jingalak qavslarni `{…}` tashlab qo'yishimiz mumkin:

```js run
let i = 3;
*!*
while (i) alert(i--);
*/!*
```
````

## "do..while" tsikli

Shart tekshiruvini `do..while` sintaksisi yordamida tsikl tanasining _pastiga_ ko'chirish mumkin:

```js
do {
  // tsikl tanasi
} while (condition);
```

Tsikl avval tanani bajaradi, keyin shartni tekshiradi va u haqiqiy bo'lgan vaqtda uni qayta-qayta bajaradi.

Masalan:

```js run
let i = 0;
do {
  alert(i);
  i++;
} while (i < 3);
```

Bu sintaksis shakli faqat tsikl tanasini shart haqiqiy bo'lishidan qat'iy nazar **kamida bir marta** bajarishni xohlagan vaqtda ishlatilishi kerak. Odatda boshqa shakl afzal ko'riladi: `while(…) {…}`.

## "for" tsikli

`for` tsikli murakkabroq, lekin u eng ko'p ishlatiladigan tsikldir.

U quyidagicha ko'rinadi:

```js
for (begin; condition; step) {
  // ... tsikl tanasi ...
}
```

Misolda bu qismlarning ma'nosini o'rganamiz. Quyidagi tsikl `i` uchun `0` dan `3` gacha (lekin 3 ni o'z ichiga olmaydi) `alert(i)` ni ishga tushiradi:

```js run
for (let i = 0; i < 3; i++) {
  // 0, keyin 1, keyin 2 ni ko'rsatadi
  alert(i);
}
```

`for` ifodasini qism-qism ko'rib chiqamiz:

| qism      |             |                                                                                         |
| --------- | ----------- | --------------------------------------------------------------------------------------- |
| begin     | `let i = 0` | Tsiklga kirishda bir marta bajariladi.                                                  |
| condition | `i < 3`     | Har bir tsikl iteratsiyasidan oldin tekshiriladi. Agar yolg'on bo'lsa, tsikl to'xtaydi. |
| body      | `alert(i)`  | Shart haqiqiy bo'lgan vaqtda qayta-qayta ishga tushadi.                                 |
| step      | `i++`       | Har bir iteratsiyada tanadan keyin bajariladi.                                          |

Umumiy tsikl algoritmi quyidagicha ishlaydi:

```
begin ni ishga tushiring
→ (agar condition → body ni ishga tushiring va step ni ishga tushiring)
→ (agar condition → body ni ishga tushiring va step ni ishga tushiring)
→ (agar condition → body ni ishga tushiring va step ni ishga tushiring)
→ ...
```

Ya'ni, `begin` bir marta bajariladi, keyin iteratsiya qiladi: har bir `condition` testidan keyin `body` va `step` bajariladi.

Agar siz tsikllarga yangi bo'lsangiz, misolga qaytib, uni qog'oz varaqida qadam-baqadam qanday ishlashini takrorlash yordam berishi mumkin.

Bizning holatimizda aynan nima sodir bo'lishi:

```js
// for (let i = 0; i < 3; i++) alert(i)

// begin ni ishga tushiring
let i = 0;
// agar condition → body ni ishga tushiring va step ni ishga tushiring
if (i < 3) {
  alert(i);
  i++;
}
// agar condition → body ni ishga tushiring va step ni ishga tushiring
if (i < 3) {
  alert(i);
  i++;
}
// agar condition → body ni ishga tushiring va step ni ishga tushiring
if (i < 3) {
  alert(i);
  i++;
}
// ...tugadi, chunki endi i == 3
```

````smart header="Inline o'zgaruvchi e'loni"
Bu yerda "hisoblagich" o'zgaruvchisi `i` to'g'ridan-to'g'ri tsiklda e'lon qilingan. Bu "inline" o'zgaruvchi e'loni deb ataladi. Bunday o'zgaruvchilar faqat tsikl ichida ko'rinadi.

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // xato, bunday o'zgaruvchi yo'q
```

O'zgaruvchi aniqlash o'rniga, mavjud bo'lganini ishlatishimiz mumkin:

```js run
let i = 0;

for (i = 0; i < 3; i++) { // mavjud o'zgaruvchini ishlatish
  alert(i); // 0, 1, 2
}

alert(i); // 3, ko'rinadi, chunki tsikldan tashqarida e'lon qilingan
```
````

### Qismlarni tashlab qo'yish

`for` ning har qanday qismini tashlab qo'yish mumkin.

Masalan, agar tsikl boshida hech narsa qilishga hojat bo'lmasa, `begin` ni tashlab qo'yishimiz mumkin.

Bu yerda:

```js run
let i = 0; // bizda i allaqachon e'lon qilingan va tayinlangan

for (; i < 3; i++) {
  // "begin" ga hojat yo'q
  alert(i); // 0, 1, 2
}
```

`step` qismini ham olib tashlashimiz mumkin:

```js run
let i = 0;

for (; i < 3; ) {
  alert(i++);
}
```

Bu tsiklni `while (i < 3)` ga bir xil qiladi.

Aslida hamma narsani olib tashlash mumkin, cheksiz tsikl yaratish:

```js
for (;;) {
  // cheksiz takrorlanadi
}
```

E'tibor bering, `for` da ikkita nuqta-vergul `;` bo'lishi kerak. Aks holda sintaksis xatosi bo'ladi.

## Tsiklni buzish

Odatda tsikl sharti yolg'on bo'lganida chiqadi.

Lekin biz maxsus `break` direktivasi yordamida istalgan vaqtda chiqishni majburlab qo'yishimiz mumkin.

Masalan, quyidagi tsikl foydalanuvchidan bir qator raqamlarni so'raydi, hech qanday raqam kiritilmaganida "buziladi":

```js run
let sum = 0;

while (true) {

  let value = +prompt("Raqam kiriting", '');

*!*
  if (!value) break; // (*)
*/!*

  sum += value;

}
alert( 'Yig\'indi: ' + sum );
```

`break` direktivasi `(*)` qatorida faollashadi, agar foydalanuvchi bo'sh qator kiritsa yoki kiritishni bekor qilsa. U tsiklni darhol to'xtatadi va boshqaruvni tsikldan keyingi birinchi qatorga o'tkazadi. Ya'ni, `alert`.

"Cheksiz tsikl + kerak bo'lganda `break`" kombinatsiyasi tsikl shartini tsiklning boshida yoki oxirida emas, balki o'rtasida yoki hatto tananing bir necha joyida tekshirish kerak bo'lgan vaziyatlar uchun juda yaxshi.

## Keyingi iteratsiyaga davom eting [#continue]

`continue` direktivasi `break` ning "engilroq versiyasi". U butun tsiklni to'xtatmaydi. Buning o'rniga, u joriy iteratsiyani to'xtatadi va tsiklni yangisini boshlashga majbur qiladi (agar shart ruxsat bersa).

Agar joriy iteratsiya bilan ishimiz tugagan bo'lsa va keyingisiga o'tishni istasak, undan foydalanishimiz mumkin.

Quyidagi tsikl faqat toq qiymatlarni chiqarish uchun `continue` dan foydalanadi:

```js run no-beautify
for (let i = 0; i < 10; i++) {

  // agar haqiqiy bo'lsa, tananing qolgan qismini tashlab o'ting
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1, keyin 3, 5, 7, 9
}
```

`i` ning juft qiymatlari uchun `continue` direktivasi tanani bajarishni to'xtatadi va boshqaruvni `for` ning keyingi iteratsiyasiga (keyingi raqam bilan) o'tkazadi. Shunday qilib `alert` faqat toq qiymatlar uchun chaqiriladi.

````smart header="`continue` direktivasi joylashishni kamaytiradi"
Toq qiymatlarni ko'rsatadigan tsikl quyidagicha ko'rinishi mumkin:

```js run
for (let i = 0; i < 10; i++) {
  if (i % 2) {
    alert(i);
  }
}
```

Texnik nuqtai nazardan, bu yuqoridagi misolga bir xil. Albatta, biz `continue` ishlatish o'rniga kodni `if` blokiga o'rashimiz mumkin.

Lekin yon ta'sir sifatida, bu yana bir darajali joylashish yaratdi (`alert` chaqiruvi jingalak qavslar ichida). Agar `if` ichidagi kod bir necha qatordan uzun bo'lsa, bu umumiy o'qish qobiliyatini kamaytirishi mumkin.

`````

````warn header="'?' ning o'ng tomonida `break/continue` yo'q"
E'tibor bering, ifoda bo'lmagan sintaksis konstruksiyalarni ternary operator `?` bilan ishlatib bo'lmaydi. Xususan, `break/continue` kabi direktivalarga u yerda ruxsat berilmaydi.

Masalan, agar biz ushbu kodni olsak:

```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```

...va uni savol belgisi yordamida qayta yozsak:

```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // continue bu yerda ruxsat etilmaydi
```

...u ishlamay qoladi: sintaksis xatosi bor.

Bu `if` o'rniga savol belgisi operatori `?` ishlatmaslikning yana bir sababi.
`````

## break/continue uchun yorliqlar

Ba'zan biz bir vaqtning o'zida bir nechta ichma-ich tsikldan chiqishimiz kerak.

Masalan, quyidagi kodda biz `i` va `j` bo'ylab tsikl qilamiz, `(0,0)` dan `(2,2)` gacha koordinatalar `(i, j)` uchun so'raymiz:

```js run no-beautify
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    let input = prompt(`(${i},${j}) koordinatalaridagi qiymat`, "");

    // agar biz bu yerdan Done (pastga) chiqishni istasak nima qilamiz?
  }
}

alert("Tugadi!");
```

Agar foydalanuvchi kiritishni bekor qilsa, jarayonni to'xtatish usuli kerak.

`input` dan keyingi oddiy `break` faqat ichki tsiklni buzadi. Bu yetarli emas -- yorliqlar, yordam bering!

_Yorliq_ - tsikldan oldin ikki nuqta bilan identifikator:

```js
labelName: for (...) {
  ...
}
```

Quyidagi tsikldagi `break <labelName>` ifodasi yorliqqa chiqadi:

```js run no-beautify
*!*outer:*/!* for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`(${i},${j}) koordinatalaridagi qiymat`, '');

    // agar bo'sh satr yoki bekor qilingan bo'lsa, ikkala tsikldan ham chiqing
    if (!input) *!*break outer*/!*; // (*)

    // qiymat bilan biror narsa qiling...
  }
}

alert('Tugadi!');
```

Yuqoridagi kodda `break outer` `outer` nomli yorliqni yuqorida qidiradi va o'sha tsikldan chiqadi.

Shunday qilib boshqaruv to'g'ridan-to'g'ri `(*)` dan `alert('Tugadi!')` ga o'tadi.

Yorliqni alohida qatorga ham ko'chirishimiz mumkin:

```js no-beautify
outer:
for (let i = 0; i < 3; i++) { ... }
```

`continue` direktivasi ham yorliq bilan ishlatilishi mumkin. Bu holda, kod bajarish yorliqlangan tsiklning keyingi iteratsiyasiga o'tadi.

````warn header="Yorliqlar "istalgan joyga sakrashga" ruxsat bermaydi"
Yorliqlar koddagi ixtiyoriy joyga sakrashga ruxsat bermaydi.

Masalan, buni qilish mumkin emas:

```js
break label; // pastdagi yorliqqa sakrash (ishlamaydi)

label: for (...)
```

`break` direktivasi kod bloki ichida bo'lishi kerak. Texnik jihatdan, har qanday yorliqlangan kod bloki ishlaydi, masalan:

```js
label: {
  // ...
  break label; // ishlaydi
  // ...
}
```

...Garchi, vaqtning 99.9% da `break` tsikllar ichida ishlatiladi, yuqoridagi misollarda ko'rganimizdek.

`continue` faqat tsikl ichidan mumkin.
````

## Xulosa

Biz 3 turdagi tsiklni ko'rib chiqdik:

- `while` -- Har bir iteratsiyadan oldin shart tekshiriladi.
- `do..while` -- Har bir iteratsiyadan keyin shart tekshiriladi.
- `for (;;)` -- Har bir iteratsiyadan oldin shart tekshiriladi, qo'shimcha sozlamalar mavjud.

"Cheksiz" tsikl yaratish uchun odatda `while(true)` konstruksiyasi ishlatiladi. Bunday tsikl, boshqalar kabi, `break` direktivasi bilan to'xtatilishi mumkin.

Agar joriy iteratsiyada hech narsa qilishni istamasak va keyingisiga o'tishni istasak, `continue` direktivasidan foydalanishimiz mumkin.

`break/continue` tsikldan oldin yorliqlarni qo'llab-quvvatlaydi. Yorliq - `break/continue` ning ichma-ich tsikldan chiqib tashqi tsiklga o'tishining yagona usuli.
