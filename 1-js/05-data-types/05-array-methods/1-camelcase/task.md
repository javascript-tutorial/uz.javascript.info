importance: 5

---

# border-left-width ni borderLeftWidth ga o'zgartiring

"my-short-string" singari chiziqcha bilan ajratilgan so'zlarni tuya registr "myShortString" ga o'zgartiradigan `camelize(str)` funktsiyasini yozing.

Ya'ni: barcha chiziqlarni olib tashlaydi, chiziqdan keyingi har bir so'z tepa registr harfga aylanadi.

Masalan:

```js
camelize("background-color") == 'backgroundColor';
camelize("list-style-image") == 'listStyleImage';
camelize("-webkit-transition") == 'WebkitTransition';
```

P.S. Maslahat: matnni massivga bo'lish, uni o'zgartirish  uchun `split` dan foydalaning va qo'shilish uchun `join`.
