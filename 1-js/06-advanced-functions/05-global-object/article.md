# Global objekt

Global objekt hamma joyda mavjud bo'lgan o'zgaruvchilar va funktsiyalarni taqdim etadi. Sukut bo'yicha, bular tilga yoki muhitga o'rnatilgan elementlardir.

Brauzerde u `window` deb ataladi, Node.js da `global`, boshqa muhitlarda boshqa nom bo'lishi mumkin.

Yaqinda tilga `globalThis` qo'shildi - bu global objekt uchun standartlashtirilgan nom bo'lib, barcha muhitlarda qo'llab-quvvatlanishi kerak. U barcha asosiy brauzerlarda qo'llab-quvvatlanadi.

Biz bu yerda `window` ishlatamiz, muhitimiz brauzer deb taxmin qilib. Agar skriptingiz boshqa muhitlarda ishlashi mumkin bo'lsa, `globalThis` ishlatish yaxshiroq.

Global objektning barcha xususiyatlariga to'g'ridan-to'g'ri kirish mumkin:

```js run
alert("Salom");
// quyidagiga teng
window.alert("Salom");
```

Brauzerde `var` bilan e'lon qilingan global funktsiyalar va o'zgaruvchilar (`let/const` emas!) global objektning xususiyatiga aylanadi:

```js run untrusted refresh
var gVar = 5;

alert(window.gVar); // 5 (global objektning xususiyatiga aylandi)
```

Funktsiya e'lonlari ham xuddi shu ta'sirga ega (asosiy kod oqimidagi `function` kalit so'zi bilan iboralar, funktsiya ifodalari emas).

Bunga tayanmang! Bu xatti-harakat moslashish sabablari uchun mavjud. Zamonaviy skriptlar [JavaScript modullari](info:modules)dan foydalanadi, bu yerda bunday narsa sodir bo'lmaydi.

Agar `let` ishlatganimizda, bunday narsa sodir bo'lmasdi:

```js run untrusted refresh
let gLet = 5;

alert(window.gLet); // undefined (global objektning xususiyatiga aylanmaydi)
```

Agar qiymat shunchalik muhim bo'lsa, uni global qilib qo'yishni xohlasangiz, uni to'g'ridan-to'g'ri xususiyat sifatida yozing:

```js run
*!*
// joriy foydalanuvchi ma'lumotlarini global qilish, barcha skriptlar kirishi uchun
window.currentUser = {
  name: "John"
};
*/!*

// kodning boshqa joyida
alert(currentUser.name);  // John

// yoki, agar bizda "currentUser" nomli mahalliy o'zgaruvchi bo'lsa
// uni window dan aniq oling (xavfsiz!)
alert(window.currentUser.name); // John
```

Shunga qaramay, global o'zgaruvchilardan foydalanish odatda tavsiya etilmaydi. Iloji boricha kam global o'zgaruvchilar bo'lishi kerak. Funktsiya "kirish" o'zgaruvchilarini olib, ma'lum "natija"ni ishlab chiqaradigan kod dizayni tashqi yoki global o'zgaruvchilardan foydalanishdan ko'ra aniqroq, xatolarga kam moyil va sinovdan o'tkazish osonroq.

## Polyfilllar uchun foydalanish

Biz zamonaviy til xususiyatlarini qo'llab-quvvatlashni sinash uchun global objektdan foydalanamiz.

Masalan, o'rnatilgan `Promise` objekti mavjudligini sinash (u haqiqatan ham eski brauzerlarda yo'q):
```js run
if (!window.Promise) {
  alert("Sizning brauzeringiz juda eski!");
}
```

Agar yo'q bo'lsa (masalan, biz eski brauzerdamiz), biz "polyfilllar" yarata olamiz: muhit tomonidan qo'llab-quvvatlanmaydigan, lekin zamonaviy standartda mavjud funktsiyalarni qo'shish.

```js run
if (!window.Promise) {
  window.Promise = ... // zamonaviy til xususiyatining maxsus implementatsiyasi
}
```

## Xulosa

- Global objekt hamma joyda mavjud bo'lishi kerak bo'lgan o'zgaruvchilarni saqlaydi.

    Bu JavaScript o'rnatilgan elementlarini, masalan `Array` va muhitga xos qiymatlarni, masalan `window.innerHeight` -- brauzerdagi oyna balandligini o'z ichiga oladi.
- Global objektning universal nomi `globalThis`.

    ...Lekin ko'pincha "eski maktab" muhitga xos nomlar bilan ataladi, masalan `window` (brauzer) va `global` (Node.js).
- Biz global objektda faqat loyihamiz uchun haqiqatan ham global bo'lgan qiymatlarni saqlashimiz kerak. Va ularning sonini minimumda ushlab turishimiz kerak.
- Brauzerde, [modullar](info:modules)dan foydalanmasak, `var` bilan e'lon qilingan global funktsiyalar va o'zgaruvchilar global objektning xususiyatiga aylanadi.
- Kodimizni kelajakka bardoshli va tushunish oson qilish uchun, global objektning xususiyatlariga to'g'ridan-to'g'ri `window.x` kabi kirishimiz kerak.