# Ixtiyoriy zanjir '?.'

[recent browser="new"]

Ixtiyoriy zanjir `?.` ichma-ich obyekt xossalariga xavfsiz kirish usuli, hatto oraliq xossa mavjud bo'lmasa ham.

## "Mavjud bo'lmagan xossa" muammosi

Agar siz hozirgina o'quv qo'llanmasini o'qishni va JavaScript o'rganishni boshlaganingiz bo'lsa, ehtimol bu muammo sizga ta'sir qilmagan bo'lsa ham, u juda keng tarqalgan.

Misol sifatida, bizda foydalanuvchilar haqidagi ma'lumotlarni saqlaydigan `user` obyektlari bor deb faraz qilaylik.

Foydalanuvchilarimizning ko'pchisida `user.address` xossasida manzil bor, ko'cha `user.address.street` bilan, lekin ba'zilari ularni taqdim etmagan.

Bunday holda, biz `user.address.street` ni olishga harakat qilganimizda va foydalanuvchida manzil bo'lmasa, xatoga duch kelamiz:

```js run
let user = {}; // "address" xossasi bo'lmagan foydalanuvchi

alert(user.address.street); // Xato!
```

Bu kutilgan natija. JavaScript shunday ishlaydi. `user.address` `undefined` bo'lgani uchun `user.address.street` ni olishga harakat xato bilan tugaydi.

Ko'plab amaliy hollarda biz bu yerda xato o'rniga `undefined` olishni afzal ko'ramiz ("ko'cha yo'q" ma'nosida).

...Va yana bir misol. Veb-dasturlashda biz `document.querySelector('.elem')` kabi maxsus usul chaqiruvi orqali veb-sahifa elementiga mos keladigan obyektni olishimiz mumkin va bunday element bo'lmasa `null` qaytaradi.

```js run
// document.querySelector('.elem') element bo'lmasa null
let html = document.querySelector(".elem").innerHTML; // null bo'lsa xato
```

Yana, agar element mavjud bo'lmasa, biz `null` ning `.innerHTML` ga kirishda xato olamiz. Va ba'zi hollarda, element yo'qligi normal bo'lganda, biz xatolardan qochmoqchimiz va shunchaki natija sifatida `html = null` ni qabul qilmoqchimiz.

Buni qanday qilishimiz mumkin?

Aniq yechim xossasiga kirishdan oldin `if` yoki shartli operator `?` dan foydalanib qiymatni tekshirish bo'ladi:

```js
let user = {};

alert(user.address ? user.address.street : undefined);
```

Bu ishlaydi, xato yo'q... Lekin juda nafis emas. Ko'rib turganingizdek, `"user.address"` kodda ikki marta uchraydi. Chuqurroq joylashtirilgan xossalar uchun bu muammoga aylanadi, chunki ko'proq takrorlash talab qilinadi.

Masalan, `user.address.street.name` ni olishga harakat qilaylik.

Biz ham `user.address` ni ham `user.address.street` ni tekshirishimiz kerak:

```js
let user = {}; // foydalanuvchida manzil yo'q

alert(
  user.address ? (user.address.street ? user.address.street.name : null) : null
);
```

Bu dahshatli, kimdir bunday kodni tushunishda muammo bo'lishi mumkin.

Bunga qaramang, uni `&&` operatori yordamida yozishning yaxshi usuli bor:

```js run
let user = {}; // foydalanuvchida manzil yo'q

alert(user.address && user.address.street && user.address.street.name); // undefined (xato yo'q)
```

Xossaga yo'lning barcha qismlarini VA qilish barcha komponentlar mavjudligini ta'minlaydi (agar bo'lmasa, baholash to'xtaydi), lekin bu ham ideal emas.

Ko'rib turganingizdek, xossa nomlari kodda hali ham takrorlanmoqda. Masalan, yuqoridagi kodda `user.address` uch marta uchraydi.

Shuning uchun tilga ixtiyoriy zanjir `?.` qo'shildi. Bu muammoni bir marta va butunlay hal qilish uchun!

## Ixtiyoriy zanjir

Ixtiyoriy zanjir `?.` agar `?.` dan oldingi qiymat `undefined` yoki `null` bo'lsa baholashni to'xtatadi va `undefined` qaytaradi.

**Ushbu maqolada qisqalik uchun biz biror narsa `null` va `undefined` bo'lmasa "mavjud" deb ataymiz.**

Boshqacha qilib aytganda, `value?.prop`:

- agar `value` mavjud bo'lsa, `value.prop` sifatida ishlaydi,
- aks holda (`value` `undefined/null` bo'lganda) `undefined` qaytaradi.

`?.` dan foydalanib `user.address.street` ga xavfsiz kirish usuli:

```js run
let user = {}; // foydalanuvchida manzil yo'q

alert(user?.address?.street); // undefined (xato yo'q)
```

Kod qisqa va toza, umuman takrorlash yo'q.

`user?.address` bilan manzilni o'qish `user` obyekti mavjud bo'lmasa ham ishlaydi:

```js run
let user = null;

alert(user?.address); // undefined
alert(user?.address.street); // undefined
```

E'tibor bering: `?.` sintaksisi undan oldingi qiymatni ixtiyoriy qiladi, lekin boshqa hech narsani emas.

Masalan, `user?.address.street.name` da `?.` `user` ning xavfsiz ravishda `null/undefined` bo'lishiga imkon beradi (va bu holda `undefined` qaytaradi), lekin bu faqat `user` uchun. Keyingi xossalarga oddiy tarzda kiriladi. Agar ulardan ba'zilari ixtiyoriy bo'lishini istasak, ko'proq `.` ni `?.` bilan almashtirishimiz kerak.

```warn header="Ixtiyoriy zanjirdan ortiqcha foydalanmang"
Biz `?.` ni faqat biror narsa mavjud bo'lmasligi normal bo'lgan joylarda ishlatishimiz kerak.

Masalan, agar bizning kodlash mantiqimizga ko'ra `user` obyekti mavjud bo'lishi kerak, lekin `address` ixtiyoriy bo'lsa, biz `user.address?.street` yozishimiz kerak, `user?.address?.street` emas.

Shunday qilib, agar `user` xato tufayli undefined bo'lib qolsa, biz bu haqda dasturlash xatosini ko'ramiz va uni tuzatamiz. Aks holda, kodlash xatolari kerakli bo'lmagan joyda jim qolishi va disk raskadka qilish qiyinlashishi mumkin.
```

````warn header="`?.`dan oldingi o'zgaruvchi e'lon qilingan bo'lishi kerak"
Agar`user`o'zgaruvchisi umuman bo'lmasa,`user?.anything` xatoni keltirib chiqaradi:

```js run
// ReferenceError: user is not defined
user?.address;
```

O'zgaruvchi e'lon qilingan bo'lishi kerak (masalan, `let/const/var user` yoki funksiya parametri sifatida). Ixtiyoriy zanjir faqat e'lon qilingan o'zgaruvchilar uchun ishlaydi.

`````

## Qisqa tutashuv

Ilgari aytilganidek, chap qism mavjud bo'lmasa `?.` darhol to'xtaydi ("qisqa tutashadi").

Shuning uchun, agar keyingi funksiya chaqiruvlari yoki yon ta'sirlar bo'lsa, ular sodir bo'lmaydi.

Masalan:

```js run
let user = null;
let x = 0;

user?.sayHi(x++); // "sayHi" yo'q, shuning uchun bajarilish x++ ga yetmaydi

alert(x); // 0, qiymat oshirilmadi
```

## Boshqa variantlar: ?.(), ?.[]

Ixtiyoriy zanjir `?.` operator emas, balki funksiyalar va kvadrat qavslar bilan ham ishlaydigan maxsus sintaksis konstruksiyasidir.

Masalan, `?.()` mavjud bo'lmasligi mumkin bo'lgan funksiyani chaqirish uchun ishlatiladi.

Quyidagi kodda foydalanuvchilarimizning ba'zilarida `admin` usuli bor, ba'zilarida yo'q:

```js run
let userAdmin = {
  admin() {
    alert("Men adminman");
  }
};

let userGuest = {};

*!*
userAdmin.admin?.(); // Men adminman
*/!*

*!*
userGuest.admin?.(); // hech narsa (bunday usul yo'q)
*/!*
```

Bu yerda ikkala qatorda ham avval nuqtadan foydalanib (`userAdmin.admin`) `admin` xossasini olamiz, chunki user obyekti mavjud deb taxmin qilamiz, shuning uchun undan o'qish xavfsiz.

Keyin `?.()` chap qismni tekshiradi: agar admin funksiyasi mavjud bo'lsa, u ishga tushadi (`userAdmin` uchun shunday). Aks holda (`userGuest` uchun) baholash xatosiz to'xtaydi.

`?.[]` sintaksisi ham ishlaydi, agar biz nuqta `.` o'rniga xossalarga kirish uchun qavslar `[]` dan foydalanmoqchi bo'lsak. Oldingi hollarga o'xshab, u mavjud bo'lmasligi mumkin bo'lgan obyektdan xavfsiz ravishda xossa o'qishga imkon beradi.

```js run
let key = "firstName";

let user1 = {
  firstName: "John"
};

let user2 = null;

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined
```

Shuningdek, biz `?.` ni `delete` bilan ishlatishimiz mumkin:

```js run
delete user?.name; // agar user mavjud bo'lsa user.name ni o'chirish
```

````warn header="Biz `?.` ni xavfsiz o'qish va o'chirish uchun ishlatishimiz mumkin, lekin yozish uchun emas"
Ixtiyoriy zanjir `?.` tayinlashning chap tomonida foydalanilmaydi.

Masalan:
```js run
let user = null;

user?.name = "John"; // Xato, ishlamaydi
// chunki u undefined = "John" ga baholanadi
```

Bu shunchaki aqlli emas.
`````

## Xulosa

Ixtiyoriy zanjir `?.` sintaksisi uchta shaklga ega:

1. `obj?.prop` -- agar `obj` mavjud bo'lsa `obj.prop` ni qaytaradi, aks holda `undefined`.
2. `obj?.[prop]` -- agar `obj` mavjud bo'lsa `obj[prop]` ni qaytaradi, aks holda `undefined`.
3. `obj.method?.()` -- agar `obj.method` mavjud bo'lsa `obj.method()` ni chaqiradi, aks holda `undefined` qaytaradi.

Ko'rib turganingizdek, ularning barchasi oddiy va foydalanish oson. `?.` chap qismni `null/undefined` uchun tekshiradi va u bunday bo'lmasa baholashni davom ettiradi.

`?.` zanjiri ichma-ich xossalarga xavfsiz kirish imkonini beradi.

Shunga qaramay, biz `?.` ni ehtiyotkorlik bilan, faqat chap qismning mavjud bo'lmasligi qabul qilinadigan joylarda qo'llashimiz kerak. Shunda u bizdan dasturlash xatolarini yashirmaydi, agar ular sodir bo'lsa.
