# Tsiklar: while va for

Biz kopincha harakatlarni takrorlashimiz kerak.

Masalan, ro'yxatdan qiymatlarni birin-ketin chiqarish yoki shunchaki 1 dan 10 gacha bo'lgan har bir raqam uchun bir xil kodni ishlatish.

*Tsikl* - bu bitta kodni bir necha marta takrorlash usuli.

## "while" tsikli

`while` tsikli quyidagi sintaksisga ega:

```js
while (condition) {
  // kod
  // "tsikl tanasi" deb nomlanadi
}
```

`condition` `true` bo'lsa, tsikl tanasidan `kod` bajariladi.

Masalan, pastdagi tsiklda `i`, `i < 3` bo'lsa ishlaydi:

```js run
let i = 0;
while (i < 3) { // 0, keyin 1, keyin 2 ni ko'rsatadi
  alert( i );
  i++;
}
```

Tsikl tanasining bitta bajarilishi *takrorlash* deb nomlanadi. Yuqori misoldagi tsikl uchta takrorlashni amalga oshiradi.

Agar yuqoridagi misolda `i++` yo'q bo'lsa, tsikl (nazariy jihatdan) abadiy takrorlanadi. Amalda, brauzer bunday tsikl to'xtatish usullarini taqdim etadi va JavaScript-ning server tomonida biz bu jarayonni to'xtatishimiz mumkin.

Har qanday ifoda yoki o'zgaruvchan faqat taqqoslash emas, balki tsikl sharti bo'lishi mumkin: shart baholanadi va `while` tomonidan mantiqiy shaklga aylantiriladi.

Masalan, `while(i! = 0)` ni yozishning qisqa usuli `while(i)`:

```js run
let i = 3;
*!*
while (i) { // agar i 0 ga aylansa, shart noto'g'ri bo'lib, tsikl to'xtaydi
*/!*
  alert( i );
  i--;
}
```

````smart header="Bir satrli ifoda uchun qavslar shart emas"
Agar tsikl tanasida bitta ifoda bo'lsa, biz qavslarni tashlab qo'yishimiz mumkin `{…}`:

```js run
let i = 3;
*!*
while (i) alert(i--);
*/!*
```
````

## "Do.. while" tsikli

Tekshuruvni `do...while` sintaksisidan foydalanib, tsikl tanasi ostiga *pastga* ko'chirishimiz mumkin:

```js
do {
  // tsikl tanasi
} while (condition);
```

Dastlab, tsikl tanani bajaradi, so'ngra shartni tekshiradi va to'g'ri bo'lsa, uni qayta-qayta bajaradi.

Masalan:

```js run
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

Sintaksisning ushbu shakli faqat to'gri bolishidan qat'i nazar, tsikl tanasi **kamida bir marta** bajarilishini xohlaganingizda ishlatilishingiz mumkin. Odatda, boshqa shaklga afzallik beriladi: `while(…) {…}`.

## "For" tsikli

`For` tsikli eng ko'p ishlatiladigan tsikl hisoblanadi.

Bu shunday ko'rinishga ega:

```js
for (boshlanishi; shart; qadam) {
  // ... tsikl tanasi ...
}
```

Keling, ushbu qismlarning ma'nosini misol orqali bilib olaylik. Quyidagi tsikl `alert(i)` `i` uchun `0` dan `3`(lekin shu jumladan emas) gacha ishlaydi:

```js run
for (let i = 0; i < 3; i++) { // 0, keyin 1, keyin 2 ni ko'rsatadi
  alert(i);
}
```

Keling, `for` ifodani qisma ko'rib chiqamiz:

| qism  |          |                                                                            |
|-------|----------|----------------------------------------------------------------------------|
| boshlanishi | `i = 0`    | Tsikldan e'lon qilingandan keyin bir marta bajariladi.                                    |
| shart | `i < 3`| Har bir tsikl takrorlashdan oldin tekshiriladi. Agar yolg'on bo'lsa, tsikl to'xtaydi.  |
| qadam | `i++`      | Tananing har bir takrorlanishidan keyin, lekin shart tekshirilguncha bajariladi.
| tana | `alert(i)`| Shart to'g'ri bo'lsa, qayta-qayta ishlaydi.                        |


Umumiy tsikl algoritmi quyidagicha ishlaydi:
```
Run begin
→ (if shart → tanani bajar va qadamni bajar)
→ (if shart → tanani bajar va qadamni bajar)
→ (if shart → tanani bajar va qadamni bajar)
→ ...
```

Agar siz tsiklni boshlagan bo'lsangiz, bu misolga qaytib, uning qog'oz varag'iga qanday qilib bosqichma-bosqich ishlashini yozib olish tushunishga yordam beradi.

Bizning holatimizda aynan nima sodir bo'ladi:

```js
// for (let i = 0; i < 3; i++) alert(i)

// boshlanishi bajariladi
let i = 0
// agar shart → tanani bajaring va qadamni bajarish
if (i < 3) { alert(i); i++ }
// agar shart → tanani bajaring va qadamni bajarish
if (i < 3) { alert(i); i++ }
// agar shart → tanani bajaring va qadamni bajarish
if (i < 3) { alert(i); i++ }
// ...tugaydi, chunki endi i == 3
```

````smart header="Ichki o'zgaruvchan deklaratsiyasi"
Bu erda "hisoblagich" o'zgaruvchani `i` tsiklda e'lon qilinadi. Bunga "ichki" o'zgaruvchan deklaratsiya deyiladi. Bunday o'zgaruvchanlar faqat tsikl ichida ko'rinadi.

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // xato, bunday o'zgaruvchan yo'q
```

O'zgaruvchani aniqlash o'rniga, mavjud bo'lganidan foydalanishimiz mumkin:

```js run
let i = 0;

for (i = 0; i < 3; i++) { // mavjud bo'lgan o'zgaruvchandan
  alert(i); // 0, 1, 2
}

alert(i); // 3, chiqariladi, chunki tsiklning tashqarisida e'lon qilingan
```

````


### Parchalarni tashlab ketish

`For` ning istalgan qismi o'tkazib yuborilishi mumkin.

Masalan, agar biz tsiklning boshida hech narsa qilishimiz kerak bo'lmasa, `boshlanishni` ni qoldirib yuborishimiz mumkin.

Bu erda bo'lgani kabi:

```js run
let i = 0; // biz i allaqachon e'lon qildik va tayinladik

for (; i < 3; i++) { // "boshlanish" kerak emas
  alert( i ); // 0, 1, 2
}
```

Shuningdek, biz `qadam` qismini ham olib tashlashimiz mumkin:

```js run
let i = 0;

for (; i < 3;) {
  alert( i++ );
}
```

Bu tsiklni `while (i < 3)` bilan bir xil qiladi.

Biz aslida hamma narsani olib tashlashimiz mumkin, cheksiz tsikl yaratish uchun:

```js
for (;;) {
  // cheksiz takrorlaydi
}
```

Iltimos `for` tsikl uchun, ikkita nuqta-vergul `;` mavjud bo'lishi kerak. Aks holda, sintaksis xatosi bo'lishi mumkin.

## Tsiklni buzish

Odatda, tsiklning holati noto'g'ri bo'lsa, u to'xtaydi.

Lekin biz har qanday vaqtda tsiklni maxsus `break` direktiva yordamida to'xtatishimiz mumkin.

Masalan, quyida keltirilgan tsikl foydalanuvchidan raqamlar ketma-ketligini so'raydi, raqam kiritilmaganda "buziladi":

```js
let sum = 0;

while (true) {

  let value = +prompt("Raqam kiriting", '');

*!*
  if (!value) break; // (*)
*/!*

  sum += value;

}
alert( 'Jami: ' + sum );
```

Agar foydalanuvchi bo'sh matn kiritsa yoki kirishni bekor qilsa, `break` direktivasi `(*)` qatorida faollashadi. U tsiklni darhol to'xtatadi, boshqaruvni tsikldan keyingi birinchi satrga uzatadi. Ya'ni, `alert`.

"Cheksiz tsikl + `break` kerak bo'lganda" kombinatsiyasi tsiklning sharti boshida yoki oxirida emas, balki o'rta yoki hatto tanasining bir necha joyida tekshirilishi kerak bo'lgan holatlar uchun juda yaxshi.

## Keyingi takrorlashga o'tish [#continue]

`Continue` direktivasi `break` ning "engil versiyasi" dir. Bu butun satrni to'xtata olmaydi. Buning o'rniga, u joriy takrorlashni to'xtatadi va tsiklning yangi takrorlashni boshlashga majbur qiladi (agar shart imkon bersa).

Agar biz uni amaldagi takrorlash bilan tugatgan bo'lsak va keyingisiga o'tishni xohlasak, undan foydalanishimiz mumkin.

Quyidagi tsikl faqat toq qiymatlarni chiqarish uchun `continue` dan foydalanadi:

```js run no-beautify
for (let i = 0; i < 10; i++) {

  // agar to'g'ri bo'lsa, tananing qolgan qismini o'tkazib yuboring
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1, keyin 3, 5, 7, 9
}
```

`i` ning juft qiymatlari uchun `continue` direktivasi tanani bajarishini to'xtatadi va boshqaruvni `for` ning keyingi takrorlanishiga o'tkazadi (keyingi raqam bilan). Shunday qilib, `alert` faqat toq qiymatlarni chiqaradi.

````smart header="`Continue` direktivasi bog'lik tsiklarni kamaytirishga yordam beradi"
Toq qiymatlarni ko'rsatadigan tsikl quyidagicha ko'rinishi mumkin:

```js
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

Texnik nuqtai nazardan, bu yuqoridagi misol bilan bir xil. Albatta, biz `continue` dan foydalanish o'rniga `if` blokiga kodni o'rashimiz mumkin.

Ammo yon ta'sir sifatida bu yana bitta uyalash darajasini yaratdi (jingalak qavs ichidagi `alert` chaqiruvi). Agar `if` ichidagi kod bir necha satrdan uzun bo'lsa, bu umumiy kod o'qilishini pasaytirishi mumkin.
````

````warn header="'?' Operatorning o'ng tomonida `break/continue` dan foydalana olmaymizmi"
Iltimos, shuni yodda tutingki, ifodalar bo'lmagan sintaksis konstruktsiyalari uchlik operator bilan ishlatilishi mumkin emas `?`. Xususan, u erda `break/continue` kabi ko'rsatmalarga yo'l qo'yilmaydi.

Masalan, agar biz ushbu kodni olsak:

```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```

...va savol belgisi yordamida uni qayta yozamiz:


```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // bu erda davom etishga ruxsat berilmaydi
```

...u ishlashni to'xtatadi. Bu kabi kod sintaksis xatosini keltirib chiqaradi:


Bu `if` o'rniga `?` savol belgisi operatoridan foydalanmaslikning yana bir sababi.
````

## break/continue uchun yorliqlar

Ba'zan biz birdaniga bir nechta uyali tsikldan chiqib ketishimiz kerak.

Masalan, quyidagi kodda biz `(i, j)` koordinatalarini `(0,0)` dan `(3,3)` gacha so'rab, `i` va `j` tsiklga o'tamiz:

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Koordinatalardagi qiymat (${i},${j})`, '');

    // agar men bu erdan Bajarildi (pastda) ga chiqishni xohlasam nima qilishim kerak?

  }
}

alert('Bajarildi!');
```

Agar foydalanuvchi kirishni bekor qilsa, biz jarayonni to'xtatish usuliga muhtojmiz.

`input` dan keyin oddiy `break` faqat ichki tsiklni buzadi. Bu etarli emas -- yorliqlar, yordamga keling!

*Yorliq* - bu tsikl oldida ikkita nuqta qo'yilgan identifikator:
```js
yorliqIsmi: for (...) {
  ...
}
```

Quyidagi tsikldagi `break <yorliqIsmi>` ifodasi yorliqqa chiqadi:

```js run no-beautify
*!*tashqari:*/!* for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Koordinatalardagi qiymat (${i},${j})`, '');

    // agar bo'sh satr yoki bekor qilingan bo'lsa, ikkala tsikldan ham chiqib keting
    if (!input) *!*break tashqari*/!*; // (*)

    // qiymat bilan operatsiyalarni bajaring...
  }
}
alert('Bajarildi!');
```

Yuqoridagi kodda `break tashqari` yorlig'i yuqoriga qarab, `tashqari` deb nomlangan va shu tsikldan tashqariga chiqadi.

Shunday qilib, boshqaruv to'g'ridan-to'g'ri `(*)` dan `alert('Bajarildi!')` ga o'tadi.

Shuningdek, yorliqni alohida satrga ko'chirishimiz mumkin:

```js no-beautify
tashqari:
for (let i = 0; i < 3; i++) { ... }
```

`continue` direktivasi yorliq bilan ham ishlatilishi mumkin. Bunday holda, kod bajarilishi yorliqli tsiklning keyingi takrorlanishiga o'tadi.

````warn header="Yorliqlar har qanday joyga \"sakrash\" ga ruxsat bermaydi"
Yorliqlar koddagi o'zboshimchalik bilan har qanday joyga o'tishga imkon bermaydi.

Masalan, buni amalga oshirish mumkin emas:
```js
break label;  // yorliqqa sakraydimi? Yo'q

label: for (...)
```

`break/continue` ga qo'ng'iroq faqat tsiklning ichkaridan amalga oshiriladi va yorliq yo'riqnomaning yuqorisida bo'lishi kerak.
````

## Xulosa

Biz tsiklning uchta turini qopladik:

- `while` -- Shart har bir takrorlashdan oldin tekshiriladi.
- `do..while` -- Shart har bir takrorlashdan keyin tekshiriladi.
- `for (;;)` -- Vaziyat har bir takrorlashdan oldin tekshiriladi, qo'shimcha sozlamalar mavjud.

"Cheksiz" tsiklni yaratish uchun odatda `while(true)` konstruktsiyasi ishlatiladi. Bunday tsikl, xuddi boshqalari singari, `break` direktivasi bilan to'xtatilishi mumkin.

Agar biz amaldagi takrorlashda hech narsa qilishni xohlamasak va keyingisiga o'tishni istasak, biz `continue` direktivasidan foydalanishimiz mumkin.

`break/continue` direktivalari tsikldan oldin e'lon qilingan yorliqlarni qo'llab-quvvatlaydi. Yorliq - bu `break/continue` ning tashqi tsiklga o'tish uchun ichki tsikldan chiqishning yagona usuli.