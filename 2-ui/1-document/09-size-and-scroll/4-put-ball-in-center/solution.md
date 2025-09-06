To'p `position:absolute` ga ega. Bu uning `left/top` koordinatalari eng yaqin joylashtirilgan elementdan, ya'ni `#field` dan o'lchanishini anglatadi (chunki u `position:relative` ga ega).

Koordinatalar maydonning ichki chap-yuqori burchagidan boshlanadi:

![](field.svg)

Ichki maydon kengligi/balandligi `clientWidth/clientHeight` dir. Demak, maydon markazi `(clientWidth/2, clientHeight/2)` koordinatalariga ega.

...Ammo agar biz `ball.style.left/top` ni bunday qiymatlarga o'rnatdik, u holda butun to'p emas, balki to'pning chap-yuqori chegarasi markazda bo'ladi:

```js
ball.style.left = Math.round(field.clientWidth / 2) + "px";
ball.style.top = Math.round(field.clientHeight / 2) + "px";
```

Qanday ko'rinishi:

[iframe height=180 src="ball-half"]

To'p markazini maydon markazi bilan tekislash uchun to'pni chapga uning kengligining yarmiga va yuqoriga uning balandligining yarmiga siljitishimiz kerak:

```js
ball.style.left =
  Math.round(field.clientWidth / 2 - ball.offsetWidth / 2) + "px";
ball.style.top =
  Math.round(field.clientHeight / 2 - ball.offsetHeight / 2) + "px";
```

Endi to'p nihoyat markazlashtirildi.

````warn header="E'tibor: tuzoq!"

`<img>` ning kengligi/balandligi bo'lmagan vaqtda kod ishonchli ishlamaydi:

```html
<img src="ball.png" id="ball">
```
````

Brauzer rasm kengligi/balandligini bilmasa (teg atributlari yoki CSS dan), u rasm yuklanib bo'lgunga qadar ularni `0` ga teng deb hisoblaydi.

Shunday qilib, `ball.offsetWidth` qiymati rasm yuklanguncha `0` bo'ladi. Bu yuqoridagi kodda noto'g'ri koordinatalarga olib keladi.

Birinchi yuklanishdan keyin brauzer odatda rasmni keshga saqlaydi va qayta yuklashda darhol o'lchamga ega bo'ladi. Ammo birinchi yuklanishda `ball.offsetWidth` qiymati `0`.

Buni `<img>` ga `width/height` qo'shish orqali tuzatishimiz kerak:

```html
<img src="ball.png" *!*width="40" height="40"*/!* id="ball">
```

...Yoki CSS da o'lchamni belgilang:

```css
#ball {
  width: 40px;
  height: 40px;
}
```
