importance: 5

---

# Bildirishnoma yarating

Bildirishnoma yaratadignan `showNotification(options)` funksiyasini yozing: berilgan kontent bilan `<div class="notification">`. Bildirishnoma 1.5 soniyadan keyin avtomatik yo'qolishi kerak.

Variantlar:

```js
// oynaning o'ng-yuqori qismida "Salom" matni bilan elementni ko'rsatadi
showNotification({
  top: 10, // oynaning yuqorisidan 10px (standart 0px)
  right: 10, // oynaning o'ng chetidan 10px (standart 0px)
  html: "Salom!", // bildirisha HTML si
  className: "welcome", // div uchun qo'shimcha sinf (ixtiyoriy)
});
```

[demo src="solution"]

Elementni berilgan top/right koordinatalarda ko'rsatish uchun CSS positioning dan foydalaning. Manba hujjatda kerakli uslublar mavjud.
