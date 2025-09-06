# Yopishqoq bayroq "y", pozitsiyada qidirish

`pattern:y` bayrog'i manba satrda berilgan pozitsiyada qidiruvni amalga oshirish imkonini beradi.

`pattern:y` bayrog'ining foydalanish holatini tushunish va regexplarning usullarini yaxshiroq anglash uchun amaliy misolni ko'rib chiqamiz.

Regexplar uchun umumiy vazifalardan biri "leksik tahlil": bizda matn bor, masalan, dasturlash tilida, va uning strukturaviy elementlarini topishimiz kerak. Masalan, HTML teglar va atributlarga ega, JavaScript kodi funksiyalar, o'zgaruvchilar va hokazolarga ega.

Leksik analizatorlar yozish o'zining vositalari va algoritmlari bilan maxsus sohadir, shuning uchun biz u yerga chuqur kirmaymiz, ammo umumiy vazifa bor: berilgan pozitsiyada biror narsani o'qish.

Masalan, bizda `subject:let varName = "value"` kod satri bor va undan `4` pozitsiyasida boshlanadigan o'zgaruvchi nomini o'qishimiz kerak.

Biz o'zgaruvchi nomini `pattern:\w+` regexp yordamida qidiramiz. Aslida, JavaScript o'zgaruvchilar nomlari aniq moslik uchun biroz murakkabroq regexp talab qiladi, ammo bu yerda bu muhim emas.

- `str.match(/\w+/)` chaqiruvi faqat satrdagi birinchi so'zni (`let`) topadi. Bu bizga kerak emas.
- Biz `pattern:g` bayrog'ini qo'shishimiz mumkin. Ammo keyin `str.match(/\w+/g)` chaqiruvi matndagi barcha so'zlarni qidiradi, bizga esa `4` pozitsiyasidagi bitta so'z kerak. Yana bizga kerak bo'lgan narsa emas.

**Xo'sh, berilgan pozitsiyada aniq regexpni qanday qidirish kerak?**

`regexp.exec(str)` usulidan foydalanishga harakat qilaylik.

`pattern:g` va `pattern:y` bayroqlari bo'lmagan `regexp` uchun bu usul faqat birinchi moslikni qidiradi, u `str.match(regexp)` kabi ishlaydi.

...Ammo agar `pattern:g` bayrog'i bo'lsa, u `str` da qidiruvni `regexp.lastIndex` xususiyatida saqlangan pozitsiyadan boshlaydi. Va agar moslik topsa, `regexp.lastIndex` ni moslikdan keyin darhol indeksga o'rnatadi.

Boshqacha qilib aytganda, `regexp.lastIndex` qidiruv uchun boshlang'ich nuqta bo'lib xizmat qiladi, har bir `regexp.exec(str)` chaqiruvi uni yangi qiymatga o'rnatadi ("oxirgi moslikdan keyin"). Bu, albatta, faqat `pattern:g` bayrog'i bo'lgan taqdirda.

Shunday qilib, `regexp.exec(str)` ga ketma-ket chaqiruvlar mosliklarni birin-ketin qaytaradi.

Mana bunday chaqiruvlarning misoli:

```js run
let str = 'let varName'; // Keling, bu satrdagi barcha so'zlarni topaylik
let regexp = /\w+/g;

alert(regexp.lastIndex); // 0 (dastlab lastIndex=0)

let word1 = regexp.exec(str);
alert(word1[0]); // let (1-so'z)
alert(regexp.lastIndex); // 3 (moslikdan keyingi pozitsiya)

let word2 = regexp.exec(str);
alert(word2[0]); // varName (2-so'z)
alert(regexp.lastIndex); // 11 (moslikdan keyingi pozitsiya)

let word3 = regexp.exec(str);
alert(word3); // null (boshqa moslik yo'q)
alert(regexp.lastIndex); // 0 (qidiruv oxirida qayta o'rnatiladi)
```

Barcha mosliklarni tsiklda olishimiz mumkin:

```js run
let str = 'let varName';
let regexp = /\w+/g;

let result;

while (result = regexp.exec(str)) {
  alert( `${result[0]} ni ${result.index} pozitsiyasida topdi` );
  // let ni 0 pozitsiyasida topdi, keyin
  // varName ni 4 pozitsiyasida topdi
}
```

`regexp.exec` ning bunday foydalanishi jarayonni biroz ko'proq nazorat qilish bilan `str.matchAll` usuliga muqobildir.

Vazifamizga qaytaylik.

Biz qidiruvni berilgan pozitsiyadan boshlash uchun `lastIndex` ni qo'lda `4` ga o'rnatishimiz mumkin!

Mana shunday:

```js run
let str = 'let varName = "value"';

let regexp = /\w+/g; // "g" bayrog'isiz lastIndex xususiyati e'tiborga olinmaydi

*!*
regexp.lastIndex = 4;
*/!*

let word = regexp.exec(str);
alert(word); // varName
```

Voy! Muammo hal qilindi!

Biz `regexp.lastIndex = 4` pozitsiyasidan boshlab `pattern:\w+` qidiruvini amalga oshirdik.

Natija to'g'ri.

...Ammo kuting, unchalik tez emas.

E'tibor bering: `regexp.exec` chaqiruvi `lastIndex` pozitsiyasidan qidirishni boshlaydi va keyin davom etadi. Agar `lastIndex` pozitsiyasida so'z bo'lmasa, lekin u undan keyin biror joyda bo'lsa, u topiladi:

```js run
let str = 'let varName = "value"';

let regexp = /\w+/g;

*!*
// 3 pozitsiyasidan qidiruvni boshlash
regexp.lastIndex = 3;
*/!*

let word = regexp.exec(str); 
// 4 pozitsiyasida moslik topdi
alert(word[0]); // varName
alert(word.index); // 4
```

Leksik tahlil kabi ba'zi vazifalar uchun bu shunchaki noto'g'ri. Bizga matnda berilgan pozitsiyada aniq moslik kerak, undan keyin biror joyda emas. Va `y` bayrog'i aynan shu uchun.

**`pattern:y` bayrog'i `regexp.exec` ni aniq `lastIndex` pozitsiyasida qidirish uchun majbur qiladi, undan "boshlash" emas.**

Mana `pattern:y` bayrog'i bilan bir xil qidiruv:

```js run
let str = 'let varName = "value"';

let regexp = /\w+/y;

regexp.lastIndex = 3;
alert( regexp.exec(str) ); // null (3 pozitsiyasida bo'sh joy bor, so'z emas)

regexp.lastIndex = 4;
alert( regexp.exec(str) ); // varName (4 pozitsiyasida so'z)
```

Ko'rib turganimizdek, `pattern:/\w+/y` regexp `3` pozitsiyasida mos kelmaydi (`pattern:g` bayrog'idan farqli o'laroq), ammo `4` pozitsiyasida mos keladi.

Bu nafaqat bizga kerak bo'lgan narsa, `pattern:y` bayrog'idan foydalanganda muhim ishlash yutug'i bor.

Tasavvur qiling, bizda uzun matn bor va unda umuman mosliklar yo'q. Keyin `pattern:g` bayrog'i bilan qidiruv matn oxirigacha boradi va hech narsa topmaydi, va bu faqat aniq pozitsiyani tekshiradigan `pattern:y` bayrog'i bilan qidiruvdan sezilarli darajada ko'proq vaqt oladi.

Leksik tahlil kabi vazifalarda odatda u yerda nimamiz borligini tekshirish uchun aniq pozitsiyada ko'plab qidiruvlar bo'ladi. `pattern:y` bayrog'idan foydalanish to'g'ri amalga oshirish va yaxshi ishlash uchun kalitdir.