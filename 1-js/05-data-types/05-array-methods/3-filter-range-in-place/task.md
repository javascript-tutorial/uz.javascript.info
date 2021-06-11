importance: 4

---

# Filtr oralig'i "joyida"

`arr` massivini oladigan va undan `a` va `b` gacha bo'lgan qiymatlardan tashqari barcha qiymatlarni olib tashlaydigan `filterRangeInPlace(arr,a,b)` funktsiyasini yozing. Sinov: `a ≤ arr[i] ≤ b`.

Funktsiya faqat massivni o'zgartirishi kerak. Hech narsa qaytarmasligi kerak.

Masalan:
```js
let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // 1 dan 4 gacha raqamalrdan tashqari raqamlarni chiqarib tashladi


alert( arr ); // [3, 1]
```
