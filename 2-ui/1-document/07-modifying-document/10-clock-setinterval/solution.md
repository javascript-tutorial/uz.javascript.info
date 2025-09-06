# Soat dasturini yaratish

Avval HTML/CSS yarataylik.

Vaqtning har bir komponenti o'zining `<span>` da ajoyib ko'rinadi:

```html
<div id="clock">
  <span class="hour">hh</span>:<span class="min">mm</span>:<span class="sec"
    >ss</span
  >
</div>
```

Shuningdek, ularni rangga solish uchun CSS kerak bo'ladi.

`update` funksiyasi soatni yangilaydi, har soniyada `setInterval` tomonidan chaqiriladi:

```js
function update() {
  let clock = document.getElementById('clock');
*!*
  let date = new Date(); // (*)
*/!*
  let hours = date.getHours();
  if (hours < 10) hours = '0' + hours;
  clock.children[0].innerHTML = hours;

  let minutes = date.getMinutes();
  if (minutes < 10) minutes = '0' + minutes;
  clock.children[1].innerHTML = minutes;

  let seconds = date.getSeconds();
  if (seconds < 10) seconds = '0' + seconds;
  clock.children[2].innerHTML = seconds;
}
```

`(*)` qatorida biz har safar joriy sanani tekshiramiz. `setInterval` chaqiruvlari ishonchli emas: ular kechikishlar bilan sodir bo'lishi mumkin.

Soatni boshqaradigan funksiyalar:

```js
let timerId;

function clockStart() {
  // soatni ishga tushirish
  if (!timerId) {
    // faqat soat ishlamayotgan bo'lsa yangi interval o'rnatish
    timerId = setInterval(update, 1000);
  }
  update(); // (*)
}

function clockStop() {
  clearInterval(timerId);
  timerId = null; // (**)
}
```

E'tibor bering, `update()` ga chaqiruv nafaqat `clockStart()` da rejalashtiriladi, balki `(*)` qatorida darhol ishga tushiriladi. Aks holda tashrif buyuruvchi `setInterval` ning birinchi bajarilishini kutishi kerak bo'ladi. Va o'sha vaqtgacha soat bo'sh bo'ladi.

Shuningdek, `clockStart()` da yangi intervalni faqat soat ishlamayotgan vaqtda o'rnatish muhim. Aks holda start tugmasini bir necha marta bosish bir nechta parallel intervallarni o'rnatadi. Bundan ham yomoni - biz faqat oxirgi intervalning `timerID` sini saqlashimiz va boshqalariga havolalarni yo'qotishimiz mumkin. Keyin biz soatni boshqa hech qachon to'xtata olmaymiz! E'tibor bering, soat to'xtatilganda `(**)` qatorida `timerID` ni tozalashimiz kerak, shunda uni `clockStart()` ni ishga tushirish orqali yana ishga tushirish mumkin bo'ladi.
