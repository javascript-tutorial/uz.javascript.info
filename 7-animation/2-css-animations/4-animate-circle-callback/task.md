
# Qayta chaqiruv bilan animatsion doira

Vazifada <info:task/animate-circle> animatsion o'sib boruvchi doiralar ko'rsatilgan.

Endi aylana emas, balki uning ichida xabarni ko'rsatish uchun kerak deylik. Xabar animatsiya tugagandan *so'ng* paydo bo'lishi kerak (aylana to'liq kattalashgan), aks holda u xunuk ko'rinadi.

Vazifani hal qilishda `showCircle(cx, cy, radius)` funktsiyasi aylanani chizadi, ammo tayyorligini kuzatishga imkon bermaydi.

Qayta chaqiruv qilish argumentini qo'shing: animatsiya tugagandan so'ng chaqiriladigan `showCircle(cx, cy, radius, callback)`. `callback` `<div>` doirasini argument sifatida qabul qilishi kerak.

Mana misol:

```js
showCircle(150, 150, 100, div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```

Demo:

[iframe src="solution" height=260]

<info:task/animate-circle> vazifasining yechimini asos qilib oling.