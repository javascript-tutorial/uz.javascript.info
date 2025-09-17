# Reference Type (Havola turi)

```warn header="Chuqur til xususiyati"
Bu maqola murakkab mavzuni qamrab oladi, ma'lum edge-caselarni yaxshiroq tushunish uchun.

Bu muhim emas. Ko'plab tajribali dasturchilar buni bilmasdan ham yaxshi yashaydi. Agar narsalar parda ortida qanday ishlashini bilishni istasangiz, o'qishda davom eting.
```

Dinamik baholanadigan metod chaqiruvi `this` ni yo'qotishi mumkin.

Masalan:

```js run
let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Xayr"); }
};

user.hi(); // ishlaydi

// endi nomga qarab user.hi yoki user.bye ni chaqiramiz
*!*
(user.name == "John" ? user.hi : user.bye)(); // Xato!
*/!*
```

Oxirgi qatorda `user.hi` yoki `user.bye` ni tanlaydigan shartli operator bor. Bu holda natija `user.hi` dir.

Keyin metod darhol qavs `()` bilan chaqiriladi. Lekin u to'g'ri ishlamaydi!

Ko'rib turganingizdek, chaqiruv xatoga olib keladi, chunki chaqiruv ichida `"this"` ning qiymati `undefined` bo'ladi.

Bu ishlaydi (objekt nuqta metod):
```js
user.hi();
```

Bu ishlamaydi (baholangan metod):
```js
(user.name == "John" ? user.hi : user.bye)(); // Xato!
```

Nima uchun? Agar biz nima uchun shunday bo'lishini tushunmoqchi bo'lsak, `obj.method()` chaqiruvi qanday ishlashining parda ortiga qaraylik.

## Reference type tushuntirilishi

Diqqat bilan qarasak, `obj.method()` ifodasida ikkita amal borligini ko'ramiz:

1. Birinchidan, nuqta `'.'` `obj.method` xususiyatini oladi.
2. Keyin qavs `()` uni bajaradi.

Xo'sh, `this` haqidagi ma'lumot birinchi qismdan ikkinchisiga qanday o'tkaziladi?

Agar bu amallarni alohida qatorlarga qo'ysak, `this` albatta yo'qoladi:

```js run
let user = {
  name: "John",
  hi() { alert(this.name); }
}

*!*
// metodni olish va chaqirishni ikki qatorga ajratish
let hi = user.hi;
hi(); // Xato, chunki this undefined
*/!*
```

Bu yerda `hi = user.hi` funktsiyani o'zgaruvchiga joylashtiradi va keyin oxirgi qatorda u butunlay mustaqil bo'ladi va shuning uchun `this` yo'q.

**`user.hi()` chaqiruvlari ishlashi uchun JavaScript hiyla ishlatadi -- nuqta `'.'` funktsiya emas, balki maxsus [Reference Type](https://tc39.github.io/ecma262/#sec-reference-specification-type) qiymatini qaytaradi.**

Reference Type "spetsifikatsiya turi"dir. Biz uni aniq ishlatib bo'lmaydi, lekin u til tomonidan ichki ishlatiladi.

Reference Type qiymati uch qiymatli kombinatsiya `(base, name, strict)` dir, bu yerda:

- `base` - objekt.
- `name` - xususiyat nomi.
- `strict` - agar `use strict` kuchda bo'lsa true.

`user.hi` xususiyatiga kirish natijasi funktsiya emas, balki Reference Type qiymati. Qat'iy rejimda `user.hi` uchun bu:

```js
// Reference Type qiymati
(user, "hi", true)
```

Reference Type da qavs `()` chaqirilganda, ular objekt va uning metodi haqidagi to'liq ma'lumotni oladi va to'g'ri `this` ni o'rnatishi mumkin (bu holda `=user`).

Reference type nuqta `.` dan chaqiruv qavslari `()` ga ma'lumot uzatish maqsadida maxsus "vositachi" ichki tur.

`hi = user.hi` kabi har qanday boshqa amal reference type ni butunlay bekor qiladi, `user.hi` qiymatini (funktsiya) oladi va uni uzatadi. Shuning uchun har qanday keyingi amal `this` ni "yo'qotadi".

Shunday qilib, natijada `this` qiymati faqat funktsiya to'g'ridan-to'g'ri nuqta `obj.method()` yoki kvadrat qavs `obj['method']()` sintaksisi yordamida chaqirilgandagina to'g'ri yo'l bilan uzatiladi (ular bu yerda bir xil). Bu muammoni hal qilishning turli usullari bor, masalan [func.bind()](/bind#solution-2-bind).

## Xulosa

Reference Type - tilning ichki turi.

Xususiyatni o'qish, masalan `obj.method()` dagi nuqta `.` bilan, aynan xususiyat qiymatini emas, balki xususiyat qiymati va u olingan objektni saqlaydigan maxsus "reference type" qiymatini qaytaradi.

Bu keyingi metod chaqiruvi `()` objektni olishi va unga `this` ni o'rnatishi uchun.

Barcha boshqa amallar uchun reference type avtomatik ravishda xususiyat qiymatiga aylanadi (bizning holatda funktsiya).

Butun mexanizm bizning ko'zlarimizdan yashirin. Bu faqat nozik hollarda muhim, masalan metod objekt ifoda yordamida dinamik ravishda olinganda.