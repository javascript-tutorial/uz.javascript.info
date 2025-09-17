# BigInt

[recent caniuse="bigint"]

`BigInt` - bu ixtiyoriy uzunlikdagi butun sonlarni qo'llab-quvvatlaydigan maxsus raqamli tur.

Bigint butun son literalining oxiriga `n` qo'shish yoki satrlar, raqamlar va boshqalardan bigint yaratadigan `BigInt` funktsiyasini chaqirish orqali yaratiladi.

```js
const bigint = 1234567890123456789012345678901234567890n;

const sameBigint = BigInt("1234567890123456789012345678901234567890");

const bigintFromNumber = BigInt(10); // 10n bilan bir xil
```

## Matematik operatorlar

`BigInt` asosan oddiy raqam kabi ishlatilishi mumkin, masalan:

```js run
alert(1n + 2n); // 3

alert(5n / 2n); // 2
```

E'tibor bering: `5/2` bo'lish natijani o'nlik qismisiz, nolga qarab yaxlitlab qaytaradi. Bigintlar ustidagi barcha amallar bigint qaytaradi.

Biz bigintlar va oddiy raqamlarni aralashtirib bo'lmaydi:

```js run
alert(1n + 2); // Xato: BigInt va boshqa turlarni aralashtirib bo'lmaydi
```

Kerak bo'lganda ularni aniq aylantirish kerak: `BigInt()` yoki `Number()` dan foydalanib:

```js run
let bigint = 1n;
let number = 2;

// raqamni bigintga
alert(bigint + BigInt(number)); // 3

// bigintni raqamga
alert(Number(bigint) + number); // 3
```

Aylantirish amallari har doim jim, hech qachon xato bermaydi, lekin agar bigint juda katta bo'lsa va raqam turiga sig'masa, ortiqcha bitlar kesiladi, shuning uchun bunday aylantirishda ehtiyot bo'lish kerak.

````smart header="Unar plyus bigintlarda qo'llab-quvvatlanmaydi"
Unar plyus operatori `+value` - `value` ni raqamga aylantirish uchun tanilgan usul.

Chalkashlikni oldini olish uchun u bigintlarda qo'llab-quvvatlanmaydi:
```js run
let bigint = 1n;

alert( +bigint ); // xato
```
Shuning uchun bigintni raqamga aylantirish uchun `Number()` dan foydalanishimiz kerak.
````

## Taqqoslashlar

`<`, `>` kabi taqqoslashlar bigintlar va raqamlar bilan yaxshi ishlaydi:

```js run
alert( 2n > 1n ); // true

alert( 2n > 1 ); // true
```

Biroq, raqamlar va bigintlar turli turlarga mansub bo'lganligi sababli, ular teng `==` bo'lishi mumkin, lekin qat'iy teng `===` bo'lmaydi:

```js run
alert( 1 == 1n ); // true

alert( 1 === 1n ); // false
```

## Mantiqiy amallar

`if` yoki boshqa mantiqiy amallarda bigintlar raqamlar kabi harakat qiladi.

Masalan, `if` da bigint `0n` yolg'on, boshqa qiymatlar haqiqat:

```js run
if (0n) {
  // hech qachon bajarilmaydi
}
```

`||`, `&&` kabi mantiqiy operatorlar ham bigintlar bilan raqamlarga o'xshash ishlaydi:

```js run
alert( 1n || 2 ); // 1 (1n haqiqat deb hisoblanadi)

alert( 0n || 2 ); // 2 (0n yolg'on deb hisoblanadi)
```

## Polyfilllar

Bigintlarni polyfill qilish qiyin. Sababi shundaki, `+`, `-` kabi ko'plab JavaScript operatorlari bigintlar bilan oddiy raqamlarga nisbatan boshqacha harakat qiladi.

Masalan, bigintlarning bo'linishi har doim bigint qaytaradi (kerak bo'lsa yaxlitlanadi).

Bunday xatti-harakatni taqlid qilish uchun polyfill kodni tahlil qilish va bunday barcha operatorlarni o'z funktsiyalari bilan almashtirish kerak bo'ladi. Lekin buni qilish noqulay va ko'p performance talab qiladi.

Shuning uchun tanilgan yaxshi polyfill yo'q.

Biroq, [JSBI](https://github.com/GoogleChromeLabs/jsbi) kutubxonasi ishlab chiquvchilari tomonidan teskari yo'l taklif qilingan.

Ushbu kutubxona o'zining metodlari yordamida katta raqamlarni amalga oshiradi. Biz ularni mahalliy bigintlar o'rniga ishlatishimiz mumkin:

| Amal | mahalliy `BigInt` | JSBI |
|-----------|-----------------|------|
| Raqamdan yaratish | `a = BigInt(789)` | `a = JSBI.BigInt(789)` |
| Qo'shish | `c = a + b` | `c = JSBI.add(a, b)` |
| Ayirish | `c = a - b` | `c = JSBI.subtract(a, b)` |
| ... | ... | ... |

Va keyin polyfill (Babel plugin) yordamida JSBI chaqiruvlarini bigintlarni qo'llab-quvvatlaydigan brauzerlar uchun mahalliy bigintlarga aylantiring.

Boshqacha qilib aytganda, bu yondashuv mahalliy bigintlar o'rniga JSBI da kod yozishni taklif qiladi. Lekin JSBI ichkarida raqamlar bilan bigintlar kabi ishlaydi, spetsifikatsiyaga rioya qilib ularni yaqindan taqlid qiladi, shuning uchun kod "bigint-tayyor" bo'ladi.

Biz bunday JSBI kodini bigintlarni qo'llab-quvvatlamaydigan mexanizmlar uchun "o'z holicha" va qo'llab-quvvatlaydigan mexanizmlar uchun ishlatishimiz mumkin - polyfill chaqiruvlarni mahalliy bigintlarga aylantiradi.

## Havolalar

- [BigInt bo'yicha MDN hujjatlari](mdn:/JavaScript/Reference/Global_Objects/BigInt).
- [Spetsifikatsiya](https://tc39.es/ecma262/#sec-bigint-objects).