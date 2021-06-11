importance: 2

---

# Ixtiyoriy miqdordagi qavs bilan yig'ish

Quyidagi kabi ishlaydigan `sum` funktsiyasini yozing:

```js
sum(1)(2) == 3; // 1 + 2
sum(1)(2)(3) == 6; // 1 + 2 + 3
sum(5)(-1)(2) == 6
sum(6)(-1)(-2)(-3) == 0
sum(0)(1)(2)(3)(4)(5) == 15
```

P.S. Eslatma: funktsiyangiz uchun maxsus moslamani ibtidoiy konvertatsiyaga o'rnatishingiz kerak bo'lishi mumkin.