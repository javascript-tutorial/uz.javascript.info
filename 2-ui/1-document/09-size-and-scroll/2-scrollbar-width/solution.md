O'tkazish paneli kengligini olish uchun biz aylantirish bilan element yaratishimiz mumkin, lekin chegaralar va to'ldirishlarsiz.

Keyin uning to'liq kengligi `offsetWidth` va ichki kontent maydoni kengligi `clientWidth` o'rtasidagi farq aynan aylantirish paneli bo'ladi:

```js run
// aylantirish orqali div yarating
let div = document.createElement("div");

div.style.overflowY = "scroll";
div.style.width = "50px";
div.style.height = "50px";

// uni hujjatga qo'yish kerak, aks holda o'lchamlar 0 bo'ladi
document.body.append(div);
let scrollWidth = div.offsetWidth - div.clientWidth;

div.remove();

alert(scrollWidth);
```
