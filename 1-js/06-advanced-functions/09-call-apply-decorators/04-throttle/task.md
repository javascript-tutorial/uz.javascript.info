importance: 5

---

# Tormozlash (throtting) dekorativ

"Tormozlash" dekorativini yarating `throttle(f, ms)` -- bu o'rashni qaytarib beradi va chaqiruvni maksimal ravishda `ms` milisoniyalarda bir marta `f` ga yetkazadi. "Sovutish" davriga to'g'ri keladigan ushbu chaqiruvlar e'tiborga olinmaydi.

**`debounce` bilan farq -- agar sovuq vaqt davomida e'tiborsiz qilingan chaqiruv oxirgi bo'lsa, u kechikish oxirida amalga oshiriladi.**

Keling, ushbu talabni yaxshiroq tushunish va qayerdan kelib chiqqanligini bilish uchun real dasturni tekshirib ko'raylik.

**Masalan, biz sichqoncha harakatlarini kuzatishni xohlaymiz.**

Brauzerda biz sichqonchaning har qanday mikro harakatida ishlaydigan funktsiyani o'rnatamiz va u harakatlanayotganda ko'rsatgich o'rnini topamiz. Sichqonchani faol ishlatish paytida bu funktsiya odatda juda tez-tez ishlaydi va sekundiga 100 marta (har 10 msda) bo'lishi mumkin.

**Kuzatuv funktsiyasi veb-sahifadagi ba'zi ma'lumotlarni yangilashi kerak.**

`update()` funktsiyasini yangilash har bir mikro harakatlarda buni amalga oshirish uchun juda og'ir. Bundan tashqari, uni 100 ms bir martadan ko'proq qilishning ma'nosi yo'q.

Shunday qilib biz asl `update()` o'rniga har bir sichqoncha harakatida ishlaydigan funktsiya sifatida `throttle(update, 100)` ni tayinlaymiz. Dekorator tez-tez chaqiriladi, lekin `update()` maksimal 100ms uchun bir marta chaqiriladi.

Vizual ravishda shunday bo'ladi:

1. Sichqonchaning birinchi harakati uchun bezatilgan variant `update` ga chaqiruv qiladi. Muhimi, foydalanuvchi bizning harakatlarimizga bo'lgan munosabatni darhol ko'radi.
2. Sichqoncha harakatlanayotganda, `100ms` ga qadar hech narsa bo'lmaydi. Bezaklangan variant chaqiruvlarni e'tiborsiz qoldiradi.
3. `100ms` oxirida yana bitta `update` oxirgi koordinatalar bilan sodir bo'ladi.
4. Keyin, nihoyat, sichqon bir joyda to'xtaydi. Bezaklangan variant `100ms` tugashini kutadi va keyin so'nggi koordinatalar bilan `update` ni ishga tushiradi. Shunday qilib, ehtimol, eng muhimi, so'nggi sichqonchaning koordinatalari qayta ishlanadi.

Kod misoli:

```js
function f(a) {
  console.log(a)
};

// f1000 chaqiruvlarni maksimal 1000 ms uchun bir martadan f ga yuboradi
let f1000 = throttle(f, 1000);

f1000(1); // ko'rsatadi 1
f1000(2); // (tejamkorlik, 1000ms hali chiqmagan)
f1000(3); // (tejamkorlik, 1000ms hali chiqmagan)

// 1000 ms vaqt tugashi bilan...
// ...natija 3, oraliq qiymat 2 hisobga olinmadi
```

P.S. `this` `f1000` ga o'tgan argumentlar va kontekst asl `f` ga o'tkazilishi kerak.
