# Arifmetik ifoda tahlilchisi

Raqam uchun regexp: `pattern:-?\d+(\.\d+)?`. Buni oldingi vazifada yaratgan edik.

Operator `pattern:[-+*/]`. Tire `pattern:-` kvadrat qavslarda birinchi o'rinda turadi, chunki o'rtada bo'lsa belgilar diapazonini bildiradi, biz esa shunchaki `-` belgisini xohlaymiz.

Qiyshiq chiziq `/` JavaScript regexp `pattern:/.../` ichida ekranlanishi kerak, buni keyinroq qilamiz.

Bizga raqam, operator, keyin yana raqam kerak. Va ular orasida ixtiyoriy bo'shliqlar.

To'liq doimiy ifoda: `pattern:-?\d+(\.\d+)?\s*[-+*/]\s*-?\d+(\.\d+)?`.

Unda `pattern:\s*` bilan ajratilgan 3 ta qism bor:

1. `pattern:-?\d+(\.\d+)?` - birinchi raqam,
2. `pattern:[-+*/]` - operator,
3. `pattern:-?\d+(\.\d+)?` - ikkinchi raqam.

Bu qismlarning har birini natijalar massivining alohida elementi qilish uchun ularni qavslarga o'raylik: `pattern:(-?\d+(\.\d+)?)\s*([-+*/])\s*(-?\d+(\.\d+)?)`.

Amalda:

```js run
let regexp = /(-?\d+(\.\d+)?)\s*([-+*\/])\s*(-?\d+(\.\d+)?)/;

alert("1.2 + 12".match(regexp));
```

Natija quyidagilarni o'z ichiga oladi:

- `result[0] == "1.2 + 12"` (to'liq moslik)
- `result[1] == "1.2"` (birinchi guruh `(-?\d+(\.\d+)?)` -- birinchi raqam, o'nli qism bilan birga)
- `result[2] == ".2"` (ikkinchi guruh `(\.\d+)?` -- birinchi o'nli qism)
- `result[3] == "+"` (uchinchi guruh `([-+*\/])` -- operator)
- `result[4] == "12"` (to'rtinchi guruh `(-?\d+(\.\d+)?)` -- ikkinchi raqam)
- `result[5] == undefined` (beshinchi guruh `(\.\d+)?` -- oxirgi o'nli qism yo'q, shuning uchun undefined)

Bizga faqat raqamlar va operator kerak, to'liq moslik yoki o'nli qismlar emas, shuning uchun natijani biroz "tozalaylik".

To'liq moslikni (massivning birinchi elementi) massivni siljitish `result.shift()` orqali olib tashlash mumkin.

O'nli qismlarni o'z ichiga olgan guruhlar (2 va 4 raqamli) `pattern:(.\d+)` ni boshiga `pattern:?:` qo'shish orqali chiqarib tashlash mumkin: `pattern:(?:\.\d+)?`.

Yakuniy yechim:

```js run
function parse(expr) {
  let regexp = /(-?\d+(?:\.\d+)?)\s*([-+*\/])\s*(-?\d+(?:\.\d+)?)/;

  let result = expr.match(regexp);

  if (!result) return [];
  result.shift();

  return result;
}

alert(parse("-1.23 * 3.45")); // -1.23, *, 3.45
```
