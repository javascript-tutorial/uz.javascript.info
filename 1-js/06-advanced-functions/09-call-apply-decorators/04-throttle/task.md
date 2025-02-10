importance: 5

---

# Tormozlash (throtting) dekorativ

<<<<<<< HEAD
"Tormozlash" dekorativini yarating `throttle(f, ms)` -- bu o'rashni qaytarib beradi va chaqiruvni maksimal ravishda `ms` milisoniyalarda bir marta `f` ga yetkazadi. "Sovutish" davriga to'g'ri keladigan ushbu chaqiruvlar e'tiborga olinmaydi.

**`debounce` bilan farq -- agar sovuq vaqt davomida e'tiborsiz qilingan chaqiruv oxirgi bo'lsa, u kechikish oxirida amalga oshiriladi.**
=======
Create a "throttling" decorator `throttle(f, ms)` -- that returns a wrapper.

When it's called multiple times, it passes the call to `f` at maximum once per `ms` milliseconds.

Compared to the debounce decorator, the behavior is completely different:
- `debounce` runs the function once after the "cooldown" period. Good for processing the final result.
- `throttle` runs it not more often than given `ms` time. Good for regular updates that shouldn't be very often.

In other words, `throttle` is like a secretary that accepts phone calls, but bothers the boss (calls the actual `f`) not more often than once per `ms` milliseconds.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Keling, ushbu talabni yaxshiroq tushunish va qayerdan kelib chiqqanligini bilish uchun real dasturni tekshirib ko'raylik.

**Masalan, biz sichqoncha harakatlarini kuzatishni xohlaymiz.**

<<<<<<< HEAD
Brauzerda biz sichqonchaning har qanday mikro harakatida ishlaydigan funktsiyani o'rnatamiz va u harakatlanayotganda ko'rsatgich o'rnini topamiz. Sichqonchani faol ishlatish paytida bu funktsiya odatda juda tez-tez ishlaydi va sekundiga 100 marta (har 10 msda) bo'lishi mumkin.

**Kuzatuv funktsiyasi veb-sahifadagi ba'zi ma'lumotlarni yangilashi kerak.**

`update()` funktsiyasini yangilash har bir mikro harakatlarda buni amalga oshirish uchun juda og'ir. Bundan tashqari, uni 100 ms bir martadan ko'proq qilishning ma'nosi yo'q.

Shunday qilib biz asl `update()` o'rniga har bir sichqoncha harakatida ishlaydigan funktsiya sifatida `throttle(update, 100)` ni tayinlaymiz. Dekorator tez-tez chaqiriladi, lekin `update()` maksimal 100ms uchun bir marta chaqiriladi.
=======
In a browser we can setup a function to run at every mouse movement and get the pointer location as it moves. During an active mouse usage, this function usually runs very frequently, can be something like 100 times per second (every 10 ms).
**We'd like to update some information on the web-page when the pointer moves.**

...But updating function `update()` is too heavy to do it on every micro-movement. There is also no sense in updating more often than once per 100ms.

So we'll wrap it into the decorator: use `throttle(update, 100)` as the function to run on each mouse move instead of the original `update()`. The decorator will be called often, but forward the call to `update()` at maximum once per 100ms.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Vizual ravishda shunday bo'ladi:

<<<<<<< HEAD
1. Sichqonchaning birinchi harakati uchun bezatilgan variant `update` ga chaqiruv qiladi. Muhimi, foydalanuvchi bizning harakatlarimizga bo'lgan munosabatni darhol ko'radi.
2. Sichqoncha harakatlanayotganda, `100ms` ga qadar hech narsa bo'lmaydi. Bezaklangan variant chaqiruvlarni e'tiborsiz qoldiradi.
3. `100ms` oxirida yana bitta `update` oxirgi koordinatalar bilan sodir bo'ladi.
4. Keyin, nihoyat, sichqon bir joyda to'xtaydi. Bezaklangan variant `100ms` tugashini kutadi va keyin so'nggi koordinatalar bilan `update` ni ishga tushiradi. Shunday qilib, ehtimol, eng muhimi, so'nggi sichqonchaning koordinatalari qayta ishlanadi.
=======
1. For the first mouse movement the decorated variant immediately passes the call to `update`. That's important, the user sees our reaction to their move immediately.
2. Then as the mouse moves on, until `100ms` nothing happens. The decorated variant ignores calls.
3. At the end of `100ms` -- one more `update` happens with the last coordinates.
4. Then, finally, the mouse stops somewhere. The decorated variant waits until `100ms` expire and then runs `update` with last coordinates. So, quite important, the final mouse coordinates are processed.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Kod misoli:

```js
function f(a) {
  console.log(a);
}

// f1000 chaqiruvlarni maksimal 1000 ms uchun bir martadan f ga yuboradi
let f1000 = throttle(f, 1000);

f1000(1); // ko'rsatadi 1
f1000(2); // (tejamkorlik, 1000ms hali chiqmagan)
f1000(3); // (tejamkorlik, 1000ms hali chiqmagan)

// 1000 ms vaqt tugashi bilan...
// ...natija 3, oraliq qiymat 2 hisobga olinmadi
```

P.S. `this` `f1000` ga o'tgan argumentlar va kontekst asl `f` ga o'tkazilishi kerak.
