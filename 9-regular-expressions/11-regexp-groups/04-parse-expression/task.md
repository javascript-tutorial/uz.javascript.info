# Ifodani tahlil qilish

Arifmetik ifoda 2 ta raqam va ular orasidagi operatordan iborat, masalan:

- `1 + 2`
- `1.2 * 3.4`
- `-3 / -6`
- `-2 - 2`

Operator quyidagilardan biri: `"+"`, `"-"`, `"*"` yoki `"/"`.

Boshida, oxirida yoki qismlar o'rtasida qo'shimcha bo'shliqlar bo'lishi mumkin.

Ifodani qabul qiluvchi va 3 ta elementdan iborat massivni qaytaruvchi `parse(expr)` funksiyasini yarating:

1. Birinchi raqam.
2. Operator.
3. Ikkinchi raqam.

Masalan:

```js
let [a, op, b] = parse("1.2 * 3.4");

alert(a); // 1.2
alert(op); // *
alert(b); // 3.4
```
