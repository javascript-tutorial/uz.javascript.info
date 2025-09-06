# Naqshdagi orqa havolalar: \N va \k<name>

Biz ushlash guruhlarining `pattern:(...)` mazmunidan nafaqat natijada yoki almashtirish satrida, balki naqshning o'zida ham foydalanishimiz mumkin.

## Raqam bo'yicha orqa havola: \N

Guruhga naqshda `pattern:\N` yordamida havola qilish mumkin, bu yerda `N` - guruh raqami.

Buning nega foydali ekanligini aniq qilish uchun vazifani ko'rib chiqaylik.

Biz qo'shtirnoqlangan satrlarni topishimiz kerak: bitta qo'shtirnoq `subject:'...'` yoki qo'sh qo'shtirnoq `subject:"..."` -- ikkala variant ham mos kelishi kerak.

Ularni qanday topish mumkin?

Biz ikkala turdagi qo'shtirnoqlarni kvadrat qavslarga qo'yishimiz mumkin: `pattern:['"](.*?)['"]`, lekin bu aralash qo'shtirnoqli satrlarni topadi, masalan `match:"...'` va `match:'..."`. Bu bir qo'shtirnoq boshqasi ichida paydo bo'lganda, masalan `subject:"She's the one!"` satrida noto'g'ri mosliklarga olib keladi:

```js run
let str = `He said: "She's the one!".`;

let regexp = /['"](.*?)['"]/g;

// Natija biz xohlagan narsa emas
alert( str.match(regexp) ); // "She'
```

Ko'rib turganingizdek, naqsh ochuvchi qo'shtirnoq `match:"` ni topdi, keyin matn boshqa qo'shtirnoq `match:'` gacha iste'mol qilindi, bu moslikni yopadi.

Naqsh yopuvchi qo'shtirnoqni ochuvchi bilan aynan bir xil qidirishini ta'minlash uchun uni ushlash guruhiga o'rab, orqa havola qilishimiz mumkin: `pattern:(['"])(.*?)\1`.

Mana to'g'ri kod:

```js run
let str = `He said: "She's the one!".`;

*!*
let regexp = /(['"])(.*?)\1/g;
*/!*

alert( str.match(regexp) ); // "She's the one!"
```

Endi u ishlaydi! Doimiy ifoda dvigateli birinchi qo'shtirnoq `pattern:(['"])` ni topadi va uning mazmunini eslab qoladi. Bu birinchi ushlash guruhi.

Naqshda keyin `pattern:\1` "birinchi guruhdagi bilan bir xil matnni top" degani, bizning holatimizda aynan bir xil qo'shtirnoq.

Xuddi shunday, `pattern:\2` ikkinchi guruh mazmunini, `pattern:\3` - 3-guruhni va hokazolarni bildiradi.

```smart
Agar biz guruhda `?:` ishlatsak, unga havola qila olmaymiz. Ushlashdan chiqarilgan `(?:...)` guruhlar dvigatel tomonidan eslab qolinmaydi.
```

```warn header="Chalkashib qolmang: naqshda `pattern:\1`, almashtirishda: `pattern:$1`"
Almashtirish satrida biz dollar belgisini ishlatamiz: `pattern:$1`, naqshda esa - teskari chiziq `pattern:\1`.
```

## Nom bo'yicha orqa havola: `\k<name>`

Agar regexpda ko'plab qavslar bo'lsa, ularga nom berish qulay.

Nomlangan guruhga havola qilish uchun `pattern:\k<name>` dan foydalanishimiz mumkin.

Quyidagi misolda qo'shtirnoqlar guruhi `pattern:?<quote>` deb nomlangan, shuning uchun orqa havola `pattern:\k<quote>`:

```js run
let str = `He said: "She's the one!".`;

*!*
let regexp = /(?<quote>['"])(.*?)\k<quote>/g;
*/!*

alert( str.match(regexp) ); // "She's the one!"
```