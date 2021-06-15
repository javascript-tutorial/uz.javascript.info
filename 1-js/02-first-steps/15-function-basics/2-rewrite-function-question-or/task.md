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
<<<<<<< HEAD:1-js/02-first-steps/14-function-basics/2-rewrite-function-question-or/task.md
    return confirm('Sizning ota-onangizdan ushbu sahifaga kirish uchun ruxsatingiz bormi?');
=======
    return confirm('Did parents allow you?');
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/15-function-basics/2-rewrite-function-question-or/task.md
  }
}
```

Xuddi shu narsani bajarish uchun uni qayta bitta satrda yozing, lekin `if` ni ishaltmang.

`checkAge` ning ikkita variantini yarating:

1. Savol belgisi operatoridan foydalaning `?`
2. YOKI `||` dan faoydalaning
