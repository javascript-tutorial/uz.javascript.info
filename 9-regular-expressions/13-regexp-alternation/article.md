# Alternatsiya (OR) |

Alternatsiya - bu doimiy ifodalardagi atama bo'lib, aslida oddiy `"YOKI"` degani.

Doimiy ifodada u vertikal chiziq belgisi `pattern:|` bilan belgilanadi.

Masalan, bizga dasturlash tillari kerak: HTML, PHP, Java yoki JavaScript.

Tegishli regexp: `pattern:html|php|java(script)?`.

Foydalanish misoli:

```js run
let regexp = /html|php|css|java(script)?/gi;

let str = "First HTML appeared, then CSS, then JavaScript";

alert( str.match(regexp) ); // 'HTML', 'CSS', 'JavaScript'
```

Biz shunga o'xshash narsani allaqachon ko'rganmiz -- kvadrat qavslar. Ular bir nechta belgi orasidan tanlash imkonini beradi, masalan `pattern:gr[ae]y` `match:gray` yoki `match:grey` ga mos keladi.

Kvadrat qavslar faqat belgilar yoki belgilar sinflariga ruxsat beradi. Alternatsiya har qanday ifodalarga ruxsat beradi. `pattern:A|B|C` regexp `A`, `B` yoki `C` ifodalaridan birini bildiradi.

Masalan:

- `pattern:gr(a|e)y` aynan `pattern:gr[ae]y` bilan bir xil ma'noni bildiradi.
- `pattern:gra|ey` `match:gra` yoki `match:ey` ni bildiradi.

Naqshning tanlangan qismiga alternatsiyani qo'llash uchun uni qavslarga o'rashimiz mumkin:
- `pattern:I love HTML|CSS` `match:I love HTML` yoki `match:CSS` ga mos keladi.
- `pattern:I love (HTML|CSS)` `match:I love HTML` yoki `match:I love CSS` ga mos keladi.

## Misol: vaqt uchun regexp

Oldingi maqolalarda `hh:mm` shaklida vaqtni qidirish uchun regexp yaratish vazifasi bor edi, masalan `12:00`. Lekin oddiy `pattern:\d\d:\d\d` juda noaniq. U `25:99` ni vaqt sifatida qabul qiladi (99 daqiqa naqshga mos keladi, lekin bu vaqt noto'g'ri).

Yaxshiroq naqshni qanday yaratish mumkin?

Biz yanada ehtiyotkor moslashtirish ishlatishimiz mumkin. Birinchi, soatlar:

- Agar birinchi raqam `0` yoki `1` bo'lsa, keyingi raqam har qanday bo'lishi mumkin: `pattern:[01]\d`.
- Aks holda, agar birinchi raqam `2` bo'lsa, keyingi `pattern:[0-3]` bo'lishi kerak.
- (boshqa birinchi raqamga ruxsat yo'q)

Biz alternatsiya yordamida ikkala variantni regexpda yozishimiz mumkin: `pattern:[01]\d|2[0-3]`.

Keyin, daqiqalar `00` dan `59` gacha bo'lishi kerak. Doimiy ifodalar tilida buni `pattern:[0-5]\d` deb yozish mumkin: birinchi raqam `0-5`, keyin har qanday raqam.

Agar soat va daqiqalarni birlashtirsak, naqsh hosil bo'ladi: `pattern:[01]\d|2[0-3]:[0-5]\d`.

Deyarli tugadik, lekin muammo bor. Alternatsiya `pattern:|` endi `pattern:[01]\d` va `pattern:2[0-3]:[0-5]\d` orasida sodir bo'lyapti.

Ya'ni: daqiqalar ikkinchi alternatsiya variantiga qo'shilgan, mana aniq rasm:

```
[01]\d  |  2[0-3]:[0-5]\d
```

Bu naqsh `pattern:[01]\d` yoki `pattern:2[0-3]:[0-5]\d` ni qidiradi.

Lekin bu noto'g'ri, alternatsiya faqat doimiy ifodaning "soatlar" qismida ishlatilishi kerak, `pattern:[01]\d` YOKI `pattern:2[0-3]` ga ruxsat berish uchun. Keling, buni "soatlar"ni qavslarga o'rash orqali tuzataylik: `pattern:([01]\d|2[0-3]):[0-5]\d`.

Yakuniy yechim:

```js run
let regexp = /([01]\d|2[0-3]):[0-5]\d/g;

alert("00:00 10:10 23:59 25:99 1:2".match(regexp)); // 00:00,10:10,23:59
```