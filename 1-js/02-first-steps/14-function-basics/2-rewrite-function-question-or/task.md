importance: 4

---

# '?' yoki '||' Yordamida funktsiyani qayta yozing.

Quyidagi funktsiya, agar `age` parametri `18` dan katta bo'lsa, `true` qiymatini qaytaradi.

Aks holda u tasdiqlashni so'raydi va natijasini qaytaradi.

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
    return confirm('Sizning ota-onangizdan ushbu sahifaga kirish uchun ruxsatingiz bormi?');
  }
}
```

Xuddi shu narsani bajarish uchun uni qayta bitta satrda yozing, lekin `if` ni ishaltmang.

`checkAge` ning ikkita variantini yarating:

1. Savol belgisi operatoridan foydalaning `?`
2. YOKI `||` dan faoydalaning
