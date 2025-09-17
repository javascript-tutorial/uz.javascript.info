muhimlik: 4

---

# "Else" kerakmi?

Quyidagi funktsiya, agar `age` parametri `18` dan katta bo'lsa, `true` qiymatini qaytaradi.

Aks holda u tasdiqlashni so'raydi va natijasini qaytaradi:

```js
function checkAge(age) {
  if (age > 18) {
    return true;
*!*
  } else {
    // ...
    return confirm('Ota-onangiz sizga ruxsat berdimi?');
  }
*/!*
}
```

Agar `else` o'chirilsa, funktsiya boshqacha ishlaydimi?

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  }
*!*
  // ...
  return confirm('Ota-onangiz sizga ruxsat berdimi?');
*/!*
}
```

Ushbu ikkita variantning xatti-harakatlarida farq bormi?
