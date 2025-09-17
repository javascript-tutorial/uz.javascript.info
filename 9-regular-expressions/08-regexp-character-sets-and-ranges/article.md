# To'plamlar va diapazonlar [...]

Kvadrat qavslar `[…]` ichidagi bir nechta belgilar yoki belgilar sinflari "berilganlar orasidan har qanday belgini qidirish" degani.

## To'plamlar

Masalan, `pattern:[eao]` 3 ta belgidan istalgan birini bildiradi: `'a'`, `'e'`, yoki `'o'`.

Bu *to'plam* deb ataladi. To'plamlar regexpda oddiy belgilar bilan birga ishlatilishi mumkin:

```js run
// [t yoki m], keyin "op" ni topish
alert( "Mop top".match(/[tm]op/gi) ); // "Mop", "top"
```

E'tibor bering, to'plamda bir nechta belgi bo'lishiga qaramay, ular moslikda aynan bitta belgiga mos keladi.

Shuning uchun quyidagi misol hech qanday moslik bermaydi:

```js run
// "V", keyin [o yoki i], keyin "la" ni topish
alert( "Voila".match(/V[oi]la/) ); // null, moslik yo'q
```

Naqsh quyidagini qidiradi:

- `pattern:V`,
- keyin `pattern:[oi]` harflaridan *bittasi*,
- keyin `pattern:la`.

Shunday qilib, `match:Vola` yoki `match:Vila` uchun moslik bo'ladi.

## Diapazonlar

Kvadrat qavslar *belgilar diapazonlarini* ham o'z ichiga olishi mumkin.

Masalan, `pattern:[a-z]` `a` dan `z` gacha oraliqdagi belgi, va `pattern:[0-5]` `0` dan `5` gacha raqam.

Quyidagi misolda biz `"x"` dan keyin ikki raqam yoki `A` dan `F` gacha harflarni qidirapmiz:

```js run
alert( "Exception 0xAF".match(/x[0-9A-F][0-9A-F]/g) ); // xAF
```

Bu yerda `pattern:[0-9A-F]` ikki diapazonqa ega: u `0` dan `9` gacha raqam yoki `A` dan `F` gacha harf bo'lgan belgini qidiradi.

Agar kichik harflarni ham qidirishni xohlasak, `a-f` diapazonini qo'shishimiz mumkin: `pattern:[0-9A-Fa-f]`. Yoki `pattern:i` bayrog'ini qo'shish.

Shuningdek, `[…]` ichida belgilar sinflaridan ham foydalanishimiz mumkin.

Masalan, agar so'z belgisi `pattern:\w` yoki tire `pattern:-` ni qidirishni xohlasak, to'plam `pattern:[\w-]` bo'ladi.

Bir nechta sinflarni birlashtirish ham mumkin, masalan `pattern:[\s\d]` "bo'shliq belgisi yoki raqam" degani.

```smart header="Belgilar sinflari ma'lum belgilar to'plamlari uchun qisqartma"
Masalan:

- **\d** -- `pattern:[0-9]` bilan bir xil,
- **\w** -- `pattern:[a-zA-Z0-9_]` bilan bir xil,
- **\s** -- `pattern:[\t\n\v\f\r ]` bilan bir xil, shuningdek bir nechta kam uchraydigan Unicode bo'shliq belgilari.
```

### Misol: ko'p tilli \w

`pattern:\w` belgilar sinfi `pattern:[a-zA-Z0-9_]` uchun qisqartma bo'lgani uchun, u xitoy ierogliflarini, kirill harflarini va hokazolarni topa olmaydi.

Biz har qanday tildagi so'z belgilarini qidiradigan universal naqsh yozishimiz mumkin. Unicode xususiyatlari bilan bu oson: `pattern:[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]`.

Keling, buni yechaylik. `pattern:\w` ga o'xshab, biz quyidagi Unicode xususiyatlariga ega belgilarni o'z ichiga olgan o'z to'plamimizni yaratmoqdamiz:

- `Alphabetic` (`Alpha`) - harflar uchun,
- `Mark` (`M`) - urg'u belgilari uchun,
- `Decimal_Number` (`Nd`) - raqamlar uchun,
- `Connector_Punctuation` (`Pc`) - pastki chiziq `'_'` va shunga o'xshash belgilar uchun,
- `Join_Control` (`Join_C`) - `200c` va `200d` ikkita maxsus kod, ligaturalarda ishlatiladi, masalan arab tilida.

Foydalanish misoli:

```js run
let regexp = /[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]/gu;

let str = `Hi 你好 12`;

// barcha harflar va raqamlarni topadi:
alert( str.match(regexp) ); // H,i,你,好,1,2
```

Albatta, biz bu naqshni tahrirlashimiz mumkin: Unicode xususiyatlarini qo'shish yoki olib tashlash. Unicode xususiyatlari <info:regexp-unicode> maqolasida batafsil ko'rib chiqilgan.

```warn header="Unicode xususiyatlari IE da qo'llab-quvvatlanmaydi"
Unicode xususiyatlari `pattern:p{…}` IE da amalga oshirilmagan. Agar ular haqiqatan ham kerak bo'lsa, [XRegExp](http://xregexp.com/) kutubxonasidan foydalanishimiz mumkin.

Yoki bizni qiziqtiradigan tildagi belgilar diapazonlarini ishlatish, masalan kirill harflari uchun `pattern:[а-я]`.
```

## Istisno diapazonlar

Oddiy diapazonlardan tashqari, `pattern:[^…]` ko'rinishidagi "istisno" diapazonlar ham mavjud.

Ular boshida karet belgisi `^` bilan belgilanadi va *berilganlardan tashqari* har qanday belgiga mos keladi.

Masalan:

- `pattern:[^aeyo]` -- `'a'`, `'e'`, `'y'` yoki `'o'` dan tashqari har qanday belgi.
- `pattern:[^0-9]` -- raqamdan tashqari har qanday belgi, `pattern:\D` bilan bir xil.
- `pattern:[^\s]` -- bo'shliq bo'lmagan har qanday belgi, `\S` bilan bir xil.

Quyidagi misol harflar, raqamlar va bo'shliqlardan tashqari har qanday belgilarni qidiradi:

```js run
alert( "alice15@gmail.com".match(/[^\d\sA-Z]/gi) ); // @ va .
```

## […] da ekranlash

Odatda maxsus belgini aniq topishni xohlaganimizda, uni `pattern:\.` kabi ekranlashimiz kerak. Va agar teskari chiziq kerak bo'lsa, `pattern:\\` ishlatamiz va hokazo.

Kvadrat qavslarda biz ko'pgina maxsus belgilarni ekranlamay ishlatishimiz mumkin:

- `pattern:. + ( )` belgilari hech qachon ekranlanmaydi.
- Tire `pattern:-` boshida yoki oxirida ekranlanmaydi (bu yerda u diapazon belgilamaydi).
- Karet `pattern:^` faqat boshida ekranlanadi (bu yerda u istisno bildiradi).
- Yopuvchi kvadrat qavs `pattern:]` har doim ekranlanadi (agar shu belgini qidirishimiz kerak bo'lsa).

Boshqacha qilib aytganda, kvadrat qavslar uchun biror ma'no bildirmagan holda, barcha maxsus belgilarga ruxsat beriladi.

Kvadrat qavslar ichidagi nuqta `.` shunchaki nuqta degani. `pattern:[.,]` naqshi belgilardan birini qidiradi: nuqta yoki vergul.

Quyidagi misolda `pattern:[-().^+]` regexp `-().^+` belgilaridan birini qidiradi:

```js run
// Ekranlash kerak emas
let regexp = /[-().^+]/g;

alert( "1 + 2 - 3".match(regexp) ); // +, - ni topadi
```

...Lekin agar siz ularni "har holda" ekranlashga qaror qilsangiz, hech qanday zarar bo'lmaydi:

```js run
// Hamma narsani ekranlash
let regexp = /[\-\(\)\.\^\+]/g;

alert( "1 + 2 - 3".match(regexp) ); // ham ishlaydi: +, -
```

## Diapazonlar va "u" bayrog'i

Agar to'plamda surrogate juftliklar bo'lsa, ularning to'g'ri ishlashi uchun `pattern:u` bayrog'i kerak.

Masalan, `subject:𝒳` satrida `pattern:[𝒳𝒴]` ni qidiraylik:

```js run
alert( '𝒳'.match(/[𝒳𝒴]/) ); // g'alati belgi ko'rsatadi, [?] kabi
// (qidiruv noto'g'ri amalga oshirildi, yarim belgi qaytarildi)
```

Natija noto'g'ri, chunki sukut bo'yicha doimiy ifodalar surrogate juftliklar haqida "bilmaydi".

Doimiy ifoda dvigateli `[𝒳𝒴]` -- ikkita emas, balki to'rtta belgi deb o'ylaydi:
1. `𝒳` ning chap yarmi `(1)`,
2. `𝒳` ning o'ng yarmi `(2)`,
3. `𝒴` ning chap yarmi `(3)`,
4. `𝒴` ning o'ng yarmi `(4)`.

Ularning kodlarini quyidagicha ko'rishimiz mumkin:

```js run
for(let i=0; i<'𝒳𝒴'.length; i++) {
  alert('𝒳𝒴'.charCodeAt(i)); // 55349, 56499, 55349, 56500
};
```

Shunday qilib, yuqoridagi misol `𝒳` ning chap yarmini topadi va ko'rsatadi.

Agar biz `pattern:u` bayrog'ini qo'shsak, harakat to'g'ri bo'ladi:

```js run
alert( '𝒳'.match(/[𝒳𝒴]/u) ); // 𝒳
```

`[𝒳-𝒴]` kabi diapazonni qidirishda ham xuddi shunday vaziyat yuz beradi.

Agar biz `pattern:u` bayrog'ini qo'shishni unutsak, xato bo'ladi:

```js run
'𝒳'.match(/[𝒳-𝒴]/); // Xato: Invalid regular expression
```

Sababi shundaki, `pattern:u` bayrog'isiz surrogate juftliklar ikkita belgi sifatida qabul qilinadi, shuning uchun `[𝒳-𝒴]` `[<55349><56499>-<55349><56500>]` sifatida talqin qilinadi (har bir surrogate juftlik o'z kodlari bilan almashtiriladi). Endi `56499-55349` diapazonining noto'g'ri ekanligini osongina ko'rish mumkin: boshlang'ich kodi `56499` oxirgi `55349`dan katta. Bu xatoning rasmiy sababi.

`pattern:u` bayrog'i bilan naqsh to'g'ri ishlaydi:

```js run
// 𝒳 dan 𝒵 gacha belgilarni qidirish
alert( '𝒴'.match(/[𝒳-𝒵]/u) ); // 𝒴
```