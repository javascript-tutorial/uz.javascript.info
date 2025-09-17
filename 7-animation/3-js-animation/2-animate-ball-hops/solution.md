<info:task/animate-ball> topshirig'ida bizda jonlantirish uchun faqat bitta xususiyat bor edi. Endi bizga yana bitta kerak: `elem.style.left`.

Gorizontal koordinata boshqa qonun bilan o'zgaradi: u `sakrash` emas, balki to'pni o'ngga siljitishni asta-sekin oshiradi.

Buning uchun yana bitta `animate` yozishimiz mumkin.

Vaqt funksiyasi sifatida biz `linear` dan foydalanishimiz mumkin, ammo `makeEaseOut(quad)` kabi narsa ancha yaxshi ko'rinadi.

Kod:

```js
let height = field.clientHeight - ball.clientHeight;
let width = 100;

// tepaga jonlantirish (sakrab)
animate({
  duration: 2000,
  timing: makeEaseOut(bounce),
  draw: function (progress) {
    ball.style.top = height * progress + "px";
  },
});

// chapga jonlantirish (o'ngga harakatlanish)
animate({
  duration: 2000,
  timing: makeEaseOut(quad),
  draw: function (progress) {
    ball.style.left = width * progress + "px";
  },
});
```
