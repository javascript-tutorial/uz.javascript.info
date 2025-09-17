# Sichqoncha hodisalari bilan Drag'n'Drop

Drag'n'Drop ajoyib interfeys yechimi hisoblanadi. Biror narsani olish va sudrab tushirish - hujjatlarni nusxalash va ko'chirishdan (fayl menejerlaridagi kabi) tortib buyurtma berishgacha (elementlarni savatchaga tashlab) ko'plab ishlarni bajarish uchun aniq va sodda usul.

Zamonaviy HTML standartida `dragstart`, `dragend` va boshqalar kabi maxsus hodisalar bilan [Drag and Drop haqida bo'lim](https://html.spec.whatwg.org/multipage/interaction.html#dnd) mavjud.

Bu hodisalar bizga maxsus turdagi drag'n'drop ni qo'llab-quvvatlash imkonini beradi, masalan OS fayl menejeridan faylni sudrab olib brauzer oynasiga tashlash bilan ishlash. Keyin JavaScript bunday fayllarning mazmuniga kirishishi mumkin.

Lekin mahalliy Drag hodisalari ham cheklovlarga ega. Masalan, biz ma'lum hududdan sudrab olib ketishning oldini ola olmaymiz. Shuningdek, sudrab olib ketishni faqat "gorizontal" yoki "vertikal" qila olmaymiz. Va ular yordamida amalga oshirib bo'lmaydigan ko'plab boshqa drag'n'drop vazifalar mavjud. Bundan tashqari, mobil qurilmalarda bunday hodisalar uchun qo'llab-quvvatlash juda zaif.

Shuning uchun bu yerda biz sichqoncha hodisalari yordamida Drag'n'Drop ni qanday amalga oshirishni ko'ramiz.

## Drag'n'Drop algoritmi

Asosiy Drag'n'Drop algoritmi quyidagicha ko'rinadi:

1. `mousedown` da - elementni harakatlantirish uchun tayyorlang, kerak bo'lsa (ehtimol uning nusxasini yarating, unga sinf qo'shing yoki boshqa narsa).
2. Keyin `mousemove` da uni `position:absolute` bilan `left/top` ni o'zgartirib harakat qildiring.
3. `mouseup` da - drag'n'drop ni tugatish bilan bog'liq barcha harakatlarni bajaring.

Bular asoslar. Keyinroq boshqa xususiyatlarni, masalan ular ustidan sudrab o'tayotganda joriy pastki elementlarni ajratib ko'rsatishni qanday qo'shishni ko'ramiz.

To'pni sudrab olib ketish amalga oshirilishi:

```js
ball.onmousedown = function(event) { 
  // (1) harakatga tayyorlash: absolyut qiling va z-index orqali yuqoriga
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;

  // uni har qanday joriy ota-onalardan to'g'ridan-to'g'ri body ga ko'chiring
  // uni body ga nisbatan joylashtirilgan qilish uchun
  document.body.append(ball);  

  // to'pni (pageX, pageY) koordinatalarida markazlashtiradi
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
  }

  // mutlaq joylashtirilgan to'pni ko'rsatkich ostiga harakat qildiring
  moveAt(event.pageX, event.pageY);

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // (2) mousemove da to'pni harakat qildiring
  document.addEventListener('mousemove', onMouseMove);

  // (3) to'pni tashlang, kerakmas ishlov beruvchilarni olib tashlang
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};
```

Agar biz kodni ishga tushirsak, g'alati narsani sezishimiz mumkin. Drag'n'drop boshida to'p "vilkaga aylanadi": biz uning "nusxasini" sudrab boshlaymiz.

```online
Mana amalda misol:

[iframe src="ball" height=230]

Sichqoncha bilan drag'n'drop qilishga harakat qiling va bunday xatti-harakatni ko'rasiz.
```

Buning sababi brauzerni rasmlar va boshqa ba'zi elementlar uchun o'zini drag'n'drop qo'llab-quvvatlashidir. U avtomatik ishlaydi va biznikiga zid keladi.

Uni o'chirish uchun:

```js
ball.ondragstart = function() {
  return false;
};
```

Endi hammasi yaxshi bo'ladi.

```online
Amalda:

[iframe src="ball2" height=230]
```

Yana bir muhim jihat -- biz `mousemove` ni `ball` da emas, balki `document` da kuzatamiz. Birinchi qarashda sichqoncha doim to'p ustida bo'lgandek tuyulishi va `mousemove` ni unga qo'yishimiz mumkin.

Lekin eslaganimizdek, `mousemove` tez-tez ishga tushadi, lekin har piksel uchun emas. Shuning uchun tez harakatdan keyin ko'rsatkich to'pdan hujjat o'rtasida biror joyga (hatto oynadan tashqariga) sakrashi mumkin.

Shuning uchun biz uni ushlash uchun `document` ga tinglashimiz kerak.

## To'g'ri joylashtiruv

Yuqoridagi misollarda to'p doim shunday harakat qiltirilganki, uning markazi ko'rsatkich ostida bo'ladi:

```js
ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
```

Yomon emas, lekin yon ta'sir bor. Drag'n'drop ni boshlash uchun biz to'pni istalgan joyiga `mousedown` qilishimiz mumkin. Lekin agar uni chekkasidan "olsak", to'p to'satdan sichqoncha ko'rsatkichi ostida markazlashish uchun "sakraydi".

Agar biz elementning ko'rsatkichga nisbatan boshlang'ich siljishini saqlasak yaxshiroq bo'lardi.

Masalan, agar biz to'pni chekkasidan sudrab boshlasak, sudrab ketayotganda ko'rsatkich chekka ustida qolishi kerak.

![](ball_shift.svg)

Algoritmimizni yangilaymiz:

1. Tashrif buyuruvchi tugmani bosganda (`mousedown`) - ko'rsatkichdan to'pning chap-yuqori burchagigacha bo'lgan masofani `shiftX/shiftY` o'zgaruvchilarida eslab qolish. Sudrab ketayotganda o'sha masofani saqlaymiz.

    Bu siljishlarni olish uchun biz koordinatalarni ayirishimiz mumkin:

    ```js
    // onmousedown
    let shiftX = event.clientX - ball.getBoundingClientRect().left;
    let shiftY = event.clientY - ball.getBoundingClientRect().top;
    ```

2. Keyin sudrab ketayotganda biz to'pni ko'rsatkichga nisbatan bir xil siljishda joylashtiramy, mana bunday:

    ```js
    // onmousemove
    // ball has position:absolute
    ball.style.left = event.pageX - *!*shiftX*/!* + 'px';
    ball.style.top = event.pageY - *!*shiftY*/!* + 'px';
    ```

Yaxshiroq joylashtiruv bilan yakuniy kod:

```js
ball.onmousedown = function(event) {

*!*
  let shiftX = event.clientX - ball.getBoundingClientRect().left;
  let shiftY = event.clientY - ball.getBoundingClientRect().top;
*/!*

  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  document.body.append(ball);

  moveAt(event.pageX, event.pageY);

  // to'pni (pageX, pageY) koordinatalarida harakat qildiradi
  // boshlang'ich siljishlarni hisobga olib
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - *!*shiftX*/!* + 'px';
    ball.style.top = pageY - *!*shiftY*/!* + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // to'pni mousemove da harakat qildiring
  document.addEventListener('mousemove', onMouseMove);

  // to'pni tashlang, kerakmas ishlov beruvchilarni olib tashlang
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};

ball.ondragstart = function() {
  return false;
};
```

```online
Amalda (`<iframe>` ichida):

[iframe src="ball3" height=230]
```

Agar biz to'pni o'ng-pastki burchagidan sudrab ketsak, farq ayniqsa sezilarli. Oldingi misolda to'p ko'rsatkich ostiga "sakradi". Endi u joriy pozitsiyadan ko'rsatkichni ravon kuzatib boradi.

## Potentsial tashlash nishonlari (droppables)

Oldingi misollarda to'pni qolish uchun shunchaki "istalgan joyga" tashlash mumkin edi. Haqiqiy hayotda biz odatda bitta elementni olib, boshqasiga tashlaymiz. Masalan, "fayl"ni "papka"ga yoki boshqa narsaga.

Abstrakt tarzda aytganda, biz "sudraladigan" elementni olib, "tashlanadigan" elementga tashlaymiz.

Bizga bilish kerak:
- Drag'n'Drop oxirida element qayerga tashlangani -- tegishli harakatni bajarish uchun,
- va, afzalroq, sudrab ketayotganda ustidan o'tayotgan tashlanadigan narsani bilish, uni ajratib ko'rsatish uchun.

Yechim qiziqarli va bir oz murakkab, shuning uchun uni bu yerda ko'rib chiqamiz.

Birinchi g'oya nima bo'lishi mumkin? Ehtimol potentsial tashlanadigan narsalarga `mouseover/mouseup` ishlov beruvchilarni o'rnatish?

Lekin bu ishlamaydi.

Muammo shundaki, biz sudrab ketayotganda, sudraladigan element doim boshqa elementlar ustida turadi. Va sichqoncha hodisalari faqat yuqori elementda sodir bo'ladi, uning ostidagilarida emas.

Masalan, quyida ikkita `<div>` elementi bor, qizil biri ko'k birining ustida (to'liq qoplaydi). Ko'k birida hodisani ushlashning imkoni yo'q, chunki qizil ustida:

```html run autorun height=60
<style>
  div {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
  }
</style>
<div style="background:blue" onmouseover="alert('hech qachon ishlamaydi')"></div>
<div style="background:red" onmouseover="alert('qizil ustida!')"></div>
```

Sudraladigan element bilan ham xuddi shunday. To'p doim boshqa elementlar ustida turadi, shuning uchun hodisalar unda sodir bo'ladi. Pastki elementlarga qanday ishlov beruvchilar o'rnatsak ham, ular ishlamaydi.

Shuning uchun potentsial tashlanadigan narsalarga ishlov beruvchilar qo'yish boshlang'ich g'oyasi amalda ishlamaydi. Ular ishga tushmaydi.

Xo'sh, nima qilish kerak?

`document.elementFromPoint(clientX, clientY)` deb ataladigan usul bor. U berilgan oynaga nisbatan koordinatalardagi eng ichki elementni qaytaradi (yoki koordinatalar oynadan tashqarida bo'lsa `null`).

Biz uni istalgan sichqoncha hodisa ishlov beruvchida ko'rsatkich ostidagi potentsial tashlanadigan narsani aniqlash uchun ishlatishimiz mumkin:

```js
// sichqoncha hodisa ishlov beruvchida
ball.hidden = true; // (*) sudrayotgan elementni yashiring

let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
// elemBelow to'p ostidagi element, tashlanadigan bo'lishi mumkin

ball.hidden = false;
```

Diqqat qiling: `(*)` chaqiruvidan oldin to'pni yashirishimiz kerak. Aks holda odatda o'sha koordinatalarda to'p bo'ladi, chunki u ko'rsatkich ostidagi yuqori element: `elemBelow=ball`. Shuning uchun biz uni yashiramiz va darhol yana ko'rsatamiz.

Biz bu kodni istalgan vaqtda qaysi element ustidan "uchib o'tayotganimizni" tekshirish uchun ishlatishimiz mumkin. Va tashlash sodir bo'lganda uni boshqarish.

"Tashlanadigan" elementlarni topish uchun `onMouseMove` ning kengaytirilgan kodi:

```js
// hozir ustidan uchib o'tayotgan potentsial tashlanadigan
let currentDroppable = null;

function onMouseMove(event) {
  moveAt(event.pageX, event.pageY);

  ball.hidden = true;
  let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
  ball.hidden = false;

  // mousemove hodisalari oynadan tashqarida sodir bo'lishi mumkin (to'p ekrandan tashqariga sudrab ketilganda)
  // agar clientX/clientY oynadan tashqarida bo'lsa, elementFromPoint null qaytaradi
  if (!elemBelow) return;

  // potentsial tashlanadigan narsalar "droppable" sinfi bilan belgilanadi (boshqa mantiq bo'lishi mumkin)
  let droppableBelow = elemBelow.closest('.droppable');

  if (currentDroppable != droppableBelow) {
    // biz kirib yoki chiqib ketyapmiz...
    // diqqat: ikkala qiymat ham null bo'lishi mumkin
    //   currentDroppable=null agar biz bu hodisadan oldin tashlanadigan ustida bo'lmagan bo'lsak (masalan bo'sh joy ustida)
    //   droppableBelow=null agar biz hozir, bu hodisa paytida tashlanadigan ustida bo'lmasak

    if (currentDroppable) {
      // tashlanadigan dan "chiqib ketish" mantiqini qayta ishlash (ajratishni olib tashlash)
      leaveDroppable(currentDroppable);
    }
    currentDroppable = droppableBelow;
    if (currentDroppable) {
      // tashlanadigan ga "kirib kelish" mantiqini qayta ishlash
      enterDroppable(currentDroppable);
    }
  }
}
```

Quyidagi misolda to'p futbol darvozasi ustiga sudrab ketilganda, darvoza ajratib ko'rsatiladi.

[codetabs height=250 src="ball4"]

Endi bizda butun jarayon davomida ustidan uchib o'tayotgan joriy "tashlash nishoni" `currentDroppable` o'zgaruvchida bor va uni ajratib ko'rsatish yoki boshqa ishlar uchun ishlatishimiz mumkin.

## Xulosa

Biz asosiy Drag'n'Drop algoritmini ko'rib chiqdik.

Asosiy komponentlar:

1. Hodisalar oqimi: `ball.mousedown` -> `document.mousemove` -> `ball.mouseup` (mahalliy `ondragstart` ni bekor qilishni unutmang).
2. Sudrab boshlashda -- ko'rsatkichning elementga nisbatan boshlang'ich siljishini eslab qolish: `shiftX/shiftY` va sudrab ketayotganda uni saqlash.
3. `document.elementFromPoint` yordamida ko'rsatkich ostidagi tashlanadigan elementlarni aniqlash.

Biz bu poydevor ustiga ko'p narsa qo'yishimiz mumkin.

- `mouseup` da biz tashlashni aqlli tarzda yakunlashimiz mumkin: ma'lumotlarni o'zgartirish, elementlarni harakatlantirish.
- Biz ustidan uchib o'tayotgan elementlarni ajratib ko'rsatishimiz mumkin.
- Biz sudrab olib ketishni ma'lum hudud yoki yo'nalish bilan cheklashimiz mumkin.
- Biz `mousedown/up` uchun hodisa delegatsiyasidan foydalanishimiz mumkin. `event.target` ni tekshiruvchi katta-hudud hodisa ishlov beruvchisi yuzlab element uchun Drag'n'Drop ni boshqarishi mumkin.
- Va hokazo.

Uning ustida arxitektura quradigan freymvorklar mavjud: `DragZone`, `Droppable`, `Draggable` va boshqa sinflar. Ularning aksariyati yuqorida tasvirlangan narsaga o'xshash ishlarni bajaradi, shuning uchun ularni tushunish oson bo'lishi kerak. Yoki o'zingiznikini yarating, ko'rib turganimizdek, buni qilish oson, ba'zan uchinchi tomon yechimini moslashtirish-dan osonroq.