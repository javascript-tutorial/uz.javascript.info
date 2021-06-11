# Kod tuzulishi

Biz o'rganadigan birinchi narsa bu kodning bloklari.

## Ifodalar

Ifodalar - amallarni bajaruvchi sintaksis konstruktsiyalar va buyruqlardir.

Biz allaqachon bir ifoda ko'rgan edik, `alert('Hello, world!')`, qaysiki "Hello, world!" xabarni ko'rsatadi.

Bizning kodimizda kerakli kabi ko'p ifodalar bo'lishi mumkin. Ifodalarni nuqtali vergul bilan ajratish mumkin.

Misol uchun, bu erda biz "Hello World" ni ikkita alertga(ogohlantirishga) ajratdik:

```js run no-beautify
alert('Hello'); alert('World');
```

Odatda, ifodalar, kodni yanada o'qish oson bo'lishi uchun, alohida satrlarga yoziladi:

```js run no-beautify
alert('Hello');
alert('World');
```

## Nuqta-vergul [#semicolon]

Nuqta-vergul ko'p hollarda yozilmashi mumkin, agar satr uzilishi bo'lsa.

Bu ham ishlaydi:

```js run no-beautify
alert('Hello')
alert('World')
```

Bu erda JavaScript satr uzilishini "yashirin" nuqta-vergul sifatida izohlaydi. Bu [avtomatik vergul kiritish](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion) deyiladi.

**Ko'p hollarda yangi satrni nuqta-vergul dib nazarda tutadi. Lekin "ko'p hollarda" "har doim" degani emas!**

Yangi satr nuqta-vergulni anglatmaydigan holatlar mavjud. Misol uchun:

```js run no-beautify
alert(3 +
1
+ 2);
```

Kod `6` ni chiqaradi, chunki JavaScript bu erga nuqta-vergul qo'shmaydi. Agar satr ortiqcha `"+"` bilan tugagan bo'lsa, u "to'liq bo'lmagan ifoda" ekanligi intuitiv ravishda aniq, shuning uchun nuqta-vergul shart emas. Va bu holda, hamma narsa maqsadga muvofiq ishlaydi.

**Ammo shunday holatlar mavjudki, JavaScript haqiqatan ham zarur bo'lgan joyda nuqta-vergulni "unutadi".**

Bunday hollarda sodir bo'lgan xatolarni topish va tuzatish juda qiyin.

````smart header="Xatoning misoli"
Agar bunday aniq xato misolni ko'rishning hohlasangiz, bu kodni tekshiring:

```js run
[1, 2].forEach(alert)
```

Hali qavs `[]` va 'forEach (har biri uchun)' ma'nosi haqida o'ylashning hojati yo'q. Ularni keyinroq o'rganamiz. Hozircha, faqat kod natija eslab qoling: u `1` keyin `2` ko'rsatadi.

Endi koddan oldin `alert(ogohlantirish)` ni qo'shaylik va uni nuqta-vergul bilan *tugatmaylik*:

```js run no-beautify
alert("Xato bo'ladi")

[1, 2].forEach(alert)
```

Endi kodni ishlatsak, faqat birinchi `alert(ogohlantirish)` ko'rsatiladi va keyin bizda xato bor!

Lekin `alert` dan keyin nuqta-vergul qo'shsak, yana hamma narsa yaxshi:

```js run
alert("Hozir barchasi yaxshi");

[1, 2].forEach(alert)  
```

Endi biz `1` va `2` dan so'ng "Hozir barchasi yaxshi" xabar bor.


Nuqta-vergulsiz variantdagi xatolik JavaScript kvadrat qavslardan oldin nuqta-vergulni avtomatik qo'ymagani uchun yuzaga keladi `[...]`.

Shunday qilib, nuqta-vergul avtomatik joylashtirilmaganligi sababli, birinchi misoldagi kod bitta ifoda sifatida qabul qilinadi. Mana buni interpretator ko'radi:

```js run no-beautify
alert("Xato bo'ladi")[1, 2].forEach(alert)
```

Ammo bu bitta emas, ikkita alohida ifoda bo'lishi kerak. Bunday holda birlashish noto'g'ri, shuning uchun xato. Bu turdagi hato boshqa holatlarda ham bo'lishi mumkin.

````

Yangi satrlar bilan ajratilgan bo'lsa ham, ifodalar orasida nuqta-vergul qo'yishni tavsiya etamiz. Ushbu qoida jamiyat tomonidan keng qabul qilingan. Yana bir bor ta'kidlab o'tamiz -- *ko'pincha nuqta-vergul qoldirish mumkin*. Ammo ulardan foydalanish xavfsizroq -- ayniqsa, yangi boshlanuvchilar uchun.

## Izohlar

Vaqt o'tgan sayin dasturlar murakkablashib boradi. Shuning uchun *izohlar* qo'shish kerak bo'ladi, kod nima bajarilishini tasvirlab berish uchun.

Izohlarni scirtlarning istalgan joyiga qo'yish mumkin. Ular uning bajarilishiga ta'sir qilmaydi, chunki interpretator ularni e'tiborsiz qoldiradi.

**Bir qatorli izohlar ikkita oldinga siljish belgilaridan boshlanadi `//`.**

Satrning qolgan qismi izohdir. O'zining to'liq satrini egallashi yoki ifodadan kegin bolishi mumkin.

Bu erda bo'lgani kabi:
```js run
// Ushbu izoh o'ziga xos satrni egallaydi
alert('Hello');

alert('World'); // Ushbu izoh ifodadan keyin
```

**Ko'p qatorli izohlar oldinga siljish belgisi va yulduzcha bilan boshlanadi <code>/&#42;</code> so'ng yulduzcha va oldinga siljish belgisi bilan tugaydi<code>&#42;/</code>.**

Shunga o'xshash:

```js run
/* Ikki xabarli misol.
Bu ko'p satrli izoh.
*/
alert('Hello');
alert('World');
```

Izohlarning mazmuni e'tiborga olinmaydi, shuning uchun kodni <code>/&#42; ... &#42;/</code>, u bajarilmaydi.


Ba'zan kodning bir qismini vaqtincha o'chirib qo'yish uchun qulay bo'lishi mumkin:

```js run
/* Kodni izohlash
alert('Hello');
*/
alert('World');
```

```smart header="Maxsus klavsishalar kombinatsiyalaridan foydalaning"
Ko'p matn muharrirlarida, kod satrini bitta satrli izoh uchun: `key:Ctrl+/` tugmachasini bosish orqali izohlash mumkin va shunga o'xshash narsa: "Ctrl+Shift+/" - ko'p satrli izohlar uchun (kod qismini tanlang va maxsus klavsishalar kombinatsiyani bosing). Mac uchun `key:Ctrl` o'rniga `key:Cmd` ni sinab ko'ring.
```

````warn header="Izohning ichida izoh qoldirish mumkin emas!"
Mumkin emas `/*...* /` ichida `/*...*/`.

Bunday kod xato:

```js run no-beautify
/*
  /* Izohning ichida izoh ?!? */
*/
alert( 'World' );
```
````

Iltimos, kodingizni izohlashdan tortinmang.

Izohlar umumiy kod hajmini oshiradi, ammo bu umuman muammo emas. Ishlab chiqarish serverida nashr etishdan oldin kodni minimallashtiradigan ko'plab vositalar mavjud. Ular izohlarni olib tashlashadi, shuning uchun ular ishlaydigan skriptlarda ko'rinmaydi. Shuning uchun izohlar ishlab chiqarishga umuman salbiy ta'sir ko'rsatmaydi.

Keyinchalik o'quv qo'llanmada <info:code-quality> bo'limi paydo bo'ladi, unda yaxshiroq izohlar yozishni tushuntiriladi.