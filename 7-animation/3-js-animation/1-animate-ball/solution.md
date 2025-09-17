Qaytish uchun maydon ichidagi to'p uchun `top` va `position: absolute` CSS xususiyatidan foydalanishimiz mumkin.

Maydonning pastki koordinatasi `field.clientHeight`. CSS `top` xususiyati to'pning yuqori chetiga ishora qiladi. Demak, u `0` dan `field.clientHeight - ball.clientHeight` gacha borishi kerak, bu to'pning yuqori chetining oxirgi eng past holati.

`O'tish` effektini olish uchun biz `easeOut` rejimida `bounce` vaqt funksiyasidan foydalanishimiz mumkin.

Mana animatsiyaning yakuniy kodi:

```js
let to = field.clientHeight - ball.clientHeight;

animate({
  duration: 2000,
  timing: makeEaseOut(bounce),
  draw(progress) {
    ball.style.top = to * progress + "px";
  },
});
```
