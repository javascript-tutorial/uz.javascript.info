# Unicode: "u" bayrog'i va \p{...} sinfi

JavaScript satrlar uchun [Unicode kodlash](https://en.wikipedia.org/wiki/Unicode)dan foydalanadi. Ko'pgina belgilar 2 bayt bilan kodlanadi, lekin bu ko'pi bilan 65536 belgini ifodalash imkonini beradi.

Bu diapazon barcha mumkin bo'lgan belgilarni kodlash uchun etarli emas, shuning uchun ba'zi kam uchraydigan belgilar 4 bayt bilan kodlanadi, masalan `𝒳` (matematik X) yoki `😄` (tabassum), ba'zi ierogliflar va hokazo.

Mana ba'zi belgilarning Unicode qiymatlari:

| Belgi  | Unicode | Unicode dagi baytlar soni  |
|------------|---------|--------|
| a | `0x0061` |  2 |
| ≈ | `0x2248` |  2 |
|𝒳| `0x1d4b3` | 4 |
|𝒴| `0x1d4b4` | 4 |
|😄| `0x1f604` | 4 |

Shunday qilib, `a` va `≈` kabi belgilar 2 baytni egallaydi, `𝒳`, `𝒴` va `😄` uchun kodlar esa uzunroq, ular 4 baytga ega.

Uzoq vaqt oldin, JavaScript tili yaratilganda, Unicode kodlash oddiyroq edi: 4 baytli belgilar yo'q edi. Shuning uchun ba'zi til xususiyatlari hali ham ularni noto'g'ri boshqaradi.

Masalan, `length` bu yerda ikkita belgi borligini hisoblaydi:

```js run
alert('😄'.length); // 2
alert('𝒳'.length); // 2
```

...Lekin biz faqat bittasini ko'rishimiz mumkin, to'g'rimi? Gap shundaki, `length` 4 baytni ikkita 2 baytli belgi sifatida ko'radi. Bu noto'g'ri, chunki ular faqat birgalikda ko'rib chiqilishi kerak ("surrogate pair" deb ataladi, ular haqida <info:string> maqolasida o'qishingiz mumkin).

Sukut bo'yicha, doimiy ifodalar ham 4 baytli "uzun belgilar"ni 2 baytli juftlik sifatida ko'radi. Va satrlar bilan bo'lgani kabi, bu g'alati natijalarga olib kelishi mumkin. Buni biroz keyinroq <info:regexp-character-sets-and-ranges> maqolasida ko'ramiz.

Satrlardan farqli o'laroq, doimiy ifodalarda bunday muammolarni hal qiluvchi `pattern:u` bayrog'i mavjud. Bunday bayroq bilan regexp 4 baytli belgilarni to'g'ri boshqaradi. Shuningdek, Unicode xususiyatlari bo'yicha qidiruv imkoni paydo bo'ladi, bunga keyinroq o'tamiz.

## Unicode xususiyatlari \p{...}

Unicode-da har bir belgi ko'plab xususiyatlarga ega. Ular belgi qaysi "toifa"ga tegishli ekanligini tasvirlaydi, u haqida turli ma'lumotlarni o'z ichiga oladi.

Masalan, agar belgida `Letter` xususiyati bo'lsa, bu belgi alifboga (har qanday tilning) tegishli ekanligini anglatadi. Va `Number` xususiyati bu raqam ekanligini bildiradi: arab yoki xitoy va hokazo.

Biz `pattern:\p{…}` ko'rinishida yozilgan xususiyatga ega belgilarni qidira olamiz. `pattern:\p{…}`dan foydalanish uchun doimiy ifoda `pattern:u` bayrog'iga ega bo'lishi kerak.

Masalan, `\p{Letter}` har qanday tildagi harfni bildiradi. Shuningdek, `\p{L}`dan ham foydalanishimiz mumkin, chunki `L` - `Letter`ning taxallusi. Deyarli har bir xususiyat uchun qisqaroq taxalluslar mavjud.

Quyidagi misolda uch xil harflar topiladi: ingliz, gruzin va koreys.

```js run
let str = "A ბ ㄱ";

alert( str.match(/\p{L}/gu) ); // A,ბ,ㄱ
alert( str.match(/\p{L}/g) ); // null (moslik yo'q, \p "u" bayrog'isiz ishlamaydi)
```

Mana asosiy belgilar toifalari va ularning kichik toifalari:

- Harf `L`:
  - kichik harf `Ll`
  - modifikator `Lm`,
  - bosh harf `Lt`,
  - katta harf `Lu`,
  - boshqa `Lo`.
- Raqam `N`:
  - o'nli raqam `Nd`,
  - harf raqami `Nl`,
  - boshqa `No`.
- Tinish belgilari `P`:
  - bog'lovchi `Pc`,
  - tire `Pd`,
  - boshlang'ich tirnoq `Pi`,
  - oxirgi tirnoq `Pf`,
  - ochuvchi `Ps`,
  - yopuvchi `Pe`,
  - boshqa `Po`.
- Belgi `M` (urg'u va boshqalar):
  - bo'shliq birlashuvchi `Mc`,
  - o'rab oluvchi `Me`,
  - bo'shliqsiz `Mn`.
- Ramz `S`:
  - valyuta `Sc`,
  - modifikator `Sk`,
  - matematik `Sm`,
  - boshqa `So`.
- Ajratuvchi `Z`:
  - qator `Zl`,
  - paragraf `Zp`,
  - bo'shliq `Zs`.
- Boshqa `C`:
  - boshqaruv `Cc`,
  - format `Cf`,
  - tayinlanmagan `Cn`,
  - shaxsiy foydalanish `Co`,
  - surrogate `Cs`.

Shunday qilib, masalan, agar bizga kichik harflar kerak bo'lsa, `pattern:\p{Ll}` yozishimiz mumkin, tinish belgilari: `pattern:\p{P}` va hokazo.

Boshqa hosila toifalar ham mavjud, masalan:
- `Alphabetic` (`Alpha`), Harflar `L`, harf raqamlari `Nl` (masalan, Ⅻ - rim raqami 12 uchun belgi), va boshqa ba'zi ramzlar `Other_Alphabetic` (`OAlpha`) ni o'z ichiga oladi.
- `Hex_Digit` o'n oltilik raqamlarni o'z ichiga oladi: `0-9`, `a-f`.
- ...Va hokazo.

Unicode ko'plab turli xususiyatlarni qo'llab-quvvatlaydi, ularning to'liq ro'yxati ko'p joy talab qiladi, shuning uchun mana havolalar:

- Belgi bo'yicha barcha xususiyatlar ro'yxati: <https://unicode.org/cldr/utility/character.jsp>.
- Xususiyat bo'yicha barcha belgilar ro'yxati: <https://unicode.org/cldr/utility/list-unicodeset.jsp>.
- Xususiyatlar uchun qisqa taxalluslar: <https://www.unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt>.
- Barcha xususiyatlar bilan matn formatidagi Unicode belgilarining to'liq bazasi: <https://www.unicode.org/Public/UCD/latest/ucd/>.

### Misol: o'n oltilik raqamlar

Masalan, `xFF` ko'rinishida yozilgan o'n oltilik raqamlarni qidiraylik, bu yerda `F` hex raqam (0..9 yoki A..F).

Hex raqam `pattern:\p{Hex_Digit}` ko'rinishida belgilanishi mumkin:

```js run
let regexp = /x\p{Hex_Digit}\p{Hex_Digit}/u;

alert("number: xAF".match(regexp)); // xAF
```

### Misol: Xitoy ierogliflari

Xitoy ierogliflarini qidiraylik.

`Script` (yozuv tizimi) Unicode xususiyati mavjud, u quyidagi qiymatlarga ega bo'lishi mumkin: `Cyrillic`, `Greek`, `Arabic`, `Han` (Xitoy) va hokazo, [to'liq ro'yxat shu yerda](https://en.wikipedia.org/wiki/Script_(Unicode)).

Berilgan yozuv tizimidagi belgilarni qidirish uchun `pattern:Script=<qiymat>`dan foydalanishimiz kerak, masalan kirill harflari uchun: `pattern:\p{sc=Cyrillic}`, xitoy ierogliflari uchun: `pattern:\p{sc=Han}`, va hokazo:

```js run
let regexp = /\p{sc=Han}/gu; // xitoy ierogliflarini qaytaradi

let str = `Hello Привет 你好 123_456`;

alert( str.match(regexp) ); // 你,好
```

### Misol: valyuta

`$`, `€`, `¥` kabi valyutani bildiruvchi belgilar `pattern:\p{Currency_Symbol}` Unicode xususiyatiga ega, qisqa taxallus: `pattern:\p{Sc}`.

"Valyuta, keyin raqam" formatidagi narxlarni qidirish uchun undan foydalanamiz:

```js run
let regexp = /\p{Sc}\d/gu;

let  str = `Prices: $2, €1, ¥9`;

alert( str.match(regexp) ); // $2,€1,¥9
```

Keyinroq, <info:regexp-quantifiers> maqolasida ko'plab raqamlarni o'z ichiga olgan raqamlarni qanday qidirishni ko'ramiz.

## Xulosa

`pattern:u` bayrog'i doimiy ifodalarda Unicode qo'llab-quvvatlashni yoqadi.

Bu ikki narsani anglatadi:

1. 4 baytli belgilar to'g'ri boshqariladi: bitta belgi sifatida, ikkita 2 baytli belgi emas.
2. Unicode xususiyatlari qidiruvda ishlatilishi mumkin: `\p{…}`.

Unicode xususiyatlari bilan biz berilgan tillardagi so'zlar, maxsus belgilar (qo'shtirnoqlar, valyutalar) va hokazolarni qidirishimiz mumkin.