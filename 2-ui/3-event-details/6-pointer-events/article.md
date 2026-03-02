# Pointer hodisalari

Pointer hodisalari sichqoncha, qalam/stylus, sensorli ekran va boshqalar kabi turli xil ko'rsatkich qurilmalaridan kirishni boshqarishning zamonaviy usulidir.

## Qisqacha tarix

Kichik sharh beramiz, shunda siz umumiy rasmni va Pointer hodisalarning boshqa hodisa turlari orasidagi o'rnini tushunasiz.

- Uzoq vaqt oldin, o'tmishda faqat sichqoncha hodisalari mavjud edi.

<<<<<<< HEAD
    Keyin sensorli qurilmalar, xususan telefonlar va planshetlar keng tarqaldi. Mavjud skriptlar ishlashi uchun ular sichqoncha hodisalarini hosil qildi (va hali ham qiladilar). Masalan, sensorli ekranga tegish `mousedown` ni hosil qiladi. Shuning uchun sensorli qurilmalar veb-sahifalar bilan yaxshi ishladi.
    
    Lekin sensorli qurilmalar sichqonchadan ko'proq imkoniyatlarga ega. Masalan, bir vaqtda bir nechta nuqtaga tegish mumkin ("multi-touch"). Garchi, sichqoncha hodisalarida bunday multi-touchlarni qayta ishlash uchun kerakli xossalar yo'q.
=======
    Then touch devices became widespread, phones and tablets in particular. For the existing scripts to work, they generated (and still generate) mouse events. For instance, tapping a touchscreen generates `mousedown`. So touch devices worked well with web pages.

    But touch devices have more capabilities than a mouse. For example, it's possible to touch multiple points at once ("multi-touch"). Although, mouse events don't have necessary properties to handle such multi-touches.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

- Shuning uchun `touchstart`, `touchend`, `touchmove` kabi touch hodisalari kiritildi, ularda touchga xos xossalar bor (biz ularni batafsil ko'rib chiqmaymiz, chunki pointer hodisalari yanada yaxshiroq).

<<<<<<< HEAD
    Shunga qaramay, bu yetarli emas edi, chunki qalam kabi o'ziga xos xususiyatlarga ega ko'plab boshqa qurilmalar mavjud. Bundan tashqari, ham touch, ham sichqoncha hodisalarini tinglovchi kod yozish mashaqqatli edi.
=======
    Still, it wasn't enough, as there are many other devices, such as pens, that have their own features. Also, writing code that listens for both touch and mouse events was cumbersome.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

- Bu muammolarni hal qilish uchun yangi standart Pointer hodisalari kiritildi. U barcha turdagi ko'rsatkich qurilmalari uchun yagona hodisalar to'plamini taqdim etadi.

<<<<<<< HEAD
Hozirda [Pointer Events Level 2](https://www.w3.org/TR/pointerevents2/) spetsifikatsiyasi barcha asosiy brauzerlarda qo'llab-quvvatlanadi, yangi [Pointer Events Level 3](https://w3c.github.io/pointerevents/) esa ishlab chiqilmoqda va asosan Pointer Events level 2 bilan mos keladi.
=======
As of now, [Pointer Events Level 2](https://www.w3.org/TR/pointerevents2/) specification is supported in all major browsers, while the newer [Pointer Events Level 3](https://w3c.github.io/pointerevents/) is in the works and is mostly compatible with Pointer Events level 2.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Agar siz Internet Explorer 10 yoki Safari 12 va undan pastroq kabi eski brauzerlar uchun ishlab chiqmasangiz, endi sichqoncha yoki touch hodisalaridan foydalanishning ma'nosi yo'q -- biz pointer hodisalariga o'tishimiz mumkin.

Shunda kodingiz ham touch, ham sichqoncha qurilmalari bilan yaxshi ishlaydi.

Shu bilan birga, Pointer hodisalarini to'g'ri ishlatish va kutilmagan holatlardan qochish uchun bilish kerak bo'lgan ba'zi muhim xususiyatlar mavjud. Biz ularni ushbu maqolada qayd etamiz.

## Pointer hodisa turlari

Pointer hodisalari sichqoncha hodisalariga o'xshash nomlanadi:

| Pointer hodisasi | O'xshash sichqoncha hodisasi |
|------------------|---------------------|
| `pointerdown` | `mousedown` |
| `pointerup` | `mouseup` |
| `pointermove` | `mousemove` |
| `pointerover` | `mouseover` |
| `pointerout` | `mouseout` |
| `pointerenter` | `mouseenter` |
| `pointerleave` | `mouseleave` |
| `pointercancel` | - |
| `gotpointercapture` | - |
| `lostpointercapture` | - |

<<<<<<< HEAD
Ko'rib turganimizdek, har bir `mouse<event>` uchun o'xshash rol o'ynaydigan `pointer<event>` mavjud. Bundan tashqari, mos keladigan `mouse...` qariydoshi bo'lmagan 3 ta qo'shimcha pointer hodisasi mavjud, biz ularni tez orada tushuntiramiz.
=======
As we can see, for every `mouse<event>`, there's a `pointer<event>` that plays a similar role. Also there are 3 additional pointer events that don't have a corresponding `mouse...` counterpart, we'll explain them soon.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```smart header="Kodimizdagi `mouse<event>` ni `pointer<event>` bilan almashtirish"
Biz kodimizdagi `mouse<event>` hodisalarini `pointer<event>` bilan almashtirshimiz va sichqoncha bilan ishlashda davom etishini kutishimiz mumkin.

<<<<<<< HEAD
Sensorli qurilmalar uchun qo'llab-quvvatlash ham "sehrli" tarzda yaxshilanadi. Garchi, CSS da ba'zi joylarda `touch-action: none` qo'shishimiz kerak bo'lishi mumkin. Buni quyida `pointercancel` haqidagi bo'limda ko'rib chiqamiz.
=======
The support for touch devices will also "magically" improve. Although, we may need to add `touch-action: none` in some places in CSS. We'll cover it below in the section about `pointercancel`.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
```

## Pointer hodisa xossalari

Pointer hodisalari sichqoncha hodisalari bilan bir xil xossalarga ega, masalan `clientX/Y`, `target` va h.k., shuningdek ba'zi boshqalar:

<<<<<<< HEAD
- `pointerId` - hodisani keltirib chiqaruvchi pointerning noyob identifikatori.
    
    Brauzer tomonidan yaratiladi. Ko'p pointerlarni qayta ishlashga imkon beradi, masalan stylusli sensorli ekran va multi-touch (misollar keyinroq keladi).
- `pointerType` - ko'rsatkich qurilmasi turi. Satr bo'lishi kerak, quyidagilardan biri: "mouse", "pen" yoki "touch".
=======
- `pointerId` - the unique identifier of the pointer causing the event.

    Browser-generated. Allows us to handle multiple pointers, such as a touchscreen with stylus and multi-touch (examples will follow).
- `pointerType` - the pointing device type. Must be a string, one of: "mouse", "pen" or "touch".
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

    Biz bu xossani turli pointer turlariga turlicha javob berish uchun ishlatishimiz mumkin.
- `isPrimary` - asosiy pointer uchun `true` (multi-touchda birinchi barmoq).

Ba'zi pointer qurilmalari kontakt maydoni va bosimni o'lchaydi, masalan sensorli ekrandagi barmoq uchun buning uchun qo'shimcha xossalar mavjud:

<<<<<<< HEAD
- `width` - pointer (masalan barmoq) qurilmaga teginadigan maydonning kengligi. Qo'llab-quvvatlanmagan joylarda, masalan sichqoncha uchun, u doim `1`.
- `height` - pointer qurilmaga teginadigan maydonning balandligi. Qo'llab-quvvatlanmagan joylarda, u doim `1`.
- `pressure` - pointer uchining bosimi, 0 dan 1 gacha diapazonda. Bosimni qo'llab-quvvatlamaydigan qurilmalar uchun `0.5` (bosilgan) yoki `0` bo'lishi kerak.
- `tangentialPressure` - normallashtirilgan tangensial bosim.
- `tiltX`, `tiltY`, `twist` - qalamga xos xossalar, qalam sirtga nisbatan qanday joylashganini tasvirlaydi.
=======
- `width` - the width of the area where the pointer (e.g. a finger) touches the device. Where unsupported, e.g. for a mouse, it's always `1`.
- `height` - the height of the area where the pointer touches the device. Where unsupported, it's always `1`.
- `pressure` - the pressure of the pointer tip, in range from 0 to 1. For devices that don't support pressure must be either `0.5` (pressed) or `0`.
- `tangentialPressure` - the normalized tangential pressure.
- `tiltX`, `tiltY`, `twist` - pen-specific properties that describe how the pen is positioned relative to the surface.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Bu xossalar ko'pchilik qurilmalarda qo'llab-quvvatlanmaydi, shuning uchun kamdan-kam ishlatiladi. Kerak bo'lsa, ular haqida batafsil ma'lumotni [spetsifikatsiya](https://w3c.github.io/pointerevents/#pointerevent-interface)da topishingiz mumkin.

## Multi-touch

Sichqoncha hodisalari umuman qo'llab-quvvatlamaydigan narsalardan biri multi-touch: foydalanuvchi telefon yoki planshetida bir vaqtda bir nechta joyga tegishi yoki maxsus imo-ishoralar bajarishi mumkin.

Pointer hodisalari `pointerId` va `isPrimary` xossalari yordamida multi-touchni qayta ishlashga imkon beradi.

Foydalanuvchi sensorli ekranning bir joyiga tegganda, keyin boshqa barmoqni boshqa joyga qo'yganda nima sodir bo'ladi:

1. Birinchi barmoq teginishida:
    - `isPrimary=true` va biror `pointerId` bilan `pointerdown`.
2. Ikkinchi barmoq va ko'proq barmoqlar uchun (birinchisi hali teginayotgan deb faraz qilsak):
    - har bir barmoq uchun `isPrimary=false` va boshqa `pointerId` bilan `pointerdown`.

Diqqat qiling: `pointerId` butun qurilmaga emas, balki har bir teginuvchi barmoq uchun tayinlanadi. Agar biz 5 barmoq bilan bir vaqtda ekranga tegadigan bo'lsak, bizda 5 ta `pointerdown` hodisasi bo'ladi, har biri o'z koordinatalari va boshqa `pointerId` bilan.

Birinchi barmoq bilan bog'liq hodisalar doim `isPrimary=true` ga ega.

Biz ularning `pointerId` yordamida ko'plab teginuvchi barmoqlarni kuzatishimiz mumkin. Foydalanuvchi barmoqni harakat qildirganda va keyin olib tashlaganda, biz `pointerdown` da bo'lgani kabi bir xil `pointerId` bilan `pointermove` va `pointerup` hodisalarini olamiz.

```online
Mana `pointerdown` va `pointerup` hodisalarini qayd qiluvchi demo:

[iframe src="multitouch" edit height=200]

Diqqat qiling: `pointerId/isPrimary` dagi farqni haqiqatdan ham ko'rish uchun telefon yoki planshet kabi sensorli ekran qurilmasidan foydalanish kerak. Sichqoncha kabi bitta teginish qurilmalari uchun barcha pointer hodisalar uchun doim `isPrimary=true` bilan bir xil `pointerId` bo'ladi.
```

## Hodisa: pointercancel

<<<<<<< HEAD
`pointercancel` hodisasi davom etayotgan pointer o'zaro ta'sir bo'lganda ishga tushadi va keyin uni bekor qiladigan narsa sodir bo'ladi, shuning uchun boshqa pointer hodisalar hosil bo'lmaydi.

Bunday sabablar:
- Pointer qurilmasi apparati jismonan o'chirilgan.
- Qurilma orientatsiyasi o'zgargan (planshet aylantirilgan).
- Brauzer o'zaro ta'sirni o'zi boshqarishga qaror qilgan, uni sichqoncha harakati yoki zoom va pan harakati yoki boshqa narsa deb hisoblagan.
=======
The `pointercancel` event fires when there's an ongoing pointer interaction, and then something happens that causes it to be aborted, so that no more pointer events are generated.

Such causes are:
- The pointer device hardware was physically disabled.
- The device orientation changed (tablet rotated).
- The browser decided to handle the interaction on its own, considering it a mouse gesture or zoom-and-pan action or something else.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

`pointercancel` ni bizga qanday ta'sir qilishini ko'rish uchun amaliy misolda namoyish etamiz.

<<<<<<< HEAD
Aytaylik, biz <info:mouse-drag-and-drop> maqolasining boshidagi kabi to'p uchun drag'n'drop ni amalga oshirmoqdamiz.
=======
Let's say we're implementing drag'n'drop for a ball, just as in the beginning of the article <info:mouse-drag-and-drop>.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Mana foydalanuvchi harakatlari oqimi va tegishli hodisalar:

1) Foydalanuvchi sudrab boshlash uchun rasmga bosadi
    - `pointerdown` hodisasi ishga tushadi
2) Keyin ular pointerni harakatlantira boshlaydi (shu bilan rasmni sudraydi)
    - `pointermove` ishga tushadi, ehtimol bir necha marta
3. Va keyin kutilmagan narsa sodir bo'ladi! Brauzerni rasmlar uchun mahalliy drag'n'drop qo'llab-quvvatlashi kirib, drag'n'drop jarayonini o'z qo'liga olib, `pointercancel` hodisasini hosil qiladi.
    - Brauzer endi rasmni drag'n'drop ini o'zi boshqaradi. Foydalanuvchi hatto to'p rasmini brauzerdan tashqariga, Mail dasturiga yoki Fayl menejeriga sudrab olib ketishi mumkin.
    - Biz uchun boshqa `pointermove` hodisalari yo'q.

Demak, muammo shundaki, brauzer o'zaro ta'sirni "o'g'irlaydi": "drag-and-drop" jarayonining boshida `pointercancel` ishga tushadi va boshqa `pointermove` hodisalari hosil bo'lmaydi.

```online
<<<<<<< HEAD
Mana pointer hodisalarini qayd qiluvchi drag'n'drop demosi (`textarea` da faqat `up/down`, `move` va `cancel`):
=======
Here's the drag'n'drop demo with logging of pointer events (only `up/down`, `move` and `cancel`) in the `textarea`:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

[iframe src="ball" height=240 edit]
```

Biz drag'n'drop ni o'zimiz amalga oshirmoqchimiz, shuning uchun brauzerni buni o'z qo'liga olmasligini ayting.

**`pointercancel` dan qochish uchun standart brauzer harakatining oldini oling.**

Bizga ikki narsa qilish kerak:

<<<<<<< HEAD
1. Mahalliy drag'n'drop sodir bo'lishining oldini olish:
    - Buni <info:mouse-drag-and-drop> maqolasida tasvirlanganidek `ball.ondragstart = () => false` o'rnatish orqali qilishimiz mumkin.
    - Bu sichqoncha hodisalari uchun yaxshi ishlaydi.
2. Sensorli qurilmalar uchun boshqa touch bilan bog'liq brauzer harakatlari (drag'n'drop dan tashqari) mavjud. Ular bilan ham muammolardan qochish uchun:
    - CSS da `#ball { touch-action: none }` o'rnatish orqali ularning oldini oling.
    - Keyin kodimiz sensorli qurilmalarda ishlay boshlaydi.
=======
1. Prevent native drag'n'drop from happening:
    - We can do this by setting `ball.ondragstart = () => false`, just as described in the article <info:mouse-drag-and-drop>.
    - That works well for mouse events.
2. For touch devices, there are other touch-related browser actions (besides drag'n'drop). To avoid problems with them too:
    - Prevent them by setting `#ball { touch-action: none }` in CSS.
    - Then our code will start working on touch devices.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Buni qilganimizdan so'ng, hodisalar mo'ljallanganidek ishlaydi, brauzer jarayonni o'g'irlamaydi va `pointercancel` chiqarmaydi.

```online
Bu demo ushbu qatorlarni qo'shadi:

[iframe src="ball-2" height=240 edit]

Ko'rib turganimizdek, endi `pointercancel` yo'q.
```

Endi biz to'pni haqiqatdan ham harakatlantirish uchun kod qo'shishimiz mumkin va bizning drag'n'drop sichqoncha qurilmalari va sensorli qurilmalar uchun ishlaydi.

## Pointer capturing

Pointer capturing - pointer hodisalarining maxsus xususiyatidir.

G'oya juda oddiy, lekin avvaliga juda g'alati tuyulishi mumkin, chunki boshqa hodisa turlari uchun bunday narsa mavjud emas.

<<<<<<< HEAD
Asosiy usul:
- `elem.setPointerCapture(pointerId)` - berilgan `pointerId` bilan hodisalarni `elem` ga bog'laydi. Chaqiruvdan keyin bir xil `pointerId` ga ega barcha pointer hodisalar `elem` ni target sifatida oladilar (xuddi `elem` da sodir bo'lgandek), hujjatda qayerda sodir bo'lishidan qat'i nazar.
=======
The main method is:
- `elem.setPointerCapture(pointerId)` -- binds events with the given `pointerId` to `elem`. After the call all pointer events with the same `pointerId` will have `elem` as the target (as if happened on `elem`), no matter where in document they really happened.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Boshqacha qilib aytganda, `elem.setPointerCapture(pointerId)` berilgan `pointerId` bilan barcha keyingi hodisalarni `elem` ga qayta yo'naltiradi.

Bog'lanish olib tashlanadi:
- `pointerup` yoki `pointercancel` hodisalari sodir bo'lganda avtomatik,
- `elem` hujjatdan olib tashlanganida avtomatik,
- `elem.releasePointerCapture(pointerId)` chaqirilganda.

<<<<<<< HEAD
**Pointer capturing drag'n'drop kabi o'zaro ta'sirlarni soddalashtirish uchun ishlatilishi mumkin.**

Misol sifatida <info:mouse-drag-and-drop> da tasvirlangan maxsus slayderní qanday amalga oshirishni eslaymiz.

Biz ichida tasmasi va "runner" (`thumb`) bor slaydeir elementini yaratamiz.

Keyin u shunday ishlaydi:

1. Foydalanuvchi slaydeir `thumb` ni bosadi - `pointerdown` ishga tushadi.
2. Keyin ular pointerni harakatlantiradi - `pointermove` ishga tushadi va biz `thumb` ni harakatlantiramy.
    - ...Pointer harakat qilarkan, u slaydeir `thumb` dan chiqib ketishi mumkin: ustiga yoki pastiga borishi. `thumb` qat'iy gorizontal harakat qilishi, pointer bilan hizalanib qolishi kerak.

Shuning uchun barcha pointer harakatlarini kuzatish uchun, shu jumladan `thumb` ustiga/pastiga borišída ham, biz `pointermove` hodisa işlov beruvchisini butun `document` ga tayinlashimiz kerak edi.

Bu yechim biroz "iflos" ko'rinadi. Muammolardan biri shundaki, hujjat atrofidagi pointer harakatlari yon ta'sirlarni keltirib chiqarishi, slaydeir bilan umuman bog'liq bo'lmagan boshqa hodisa ishlov beruvchilarni ishga tushirishi mumkin.

Pointer capturing `pointermove` ni `thumb` ga bog'lash va bunday muammolardan qochish vositasini beradi:

- Biz `pointerdown` ishlov beruvchida `thumb.setPointerCapture(event.pointerId)` ni chaqirshimiz mumkin,
- Keyin `pointerup/cancel` gacha bo'lgan kelajak pointer hodisalar `thumb` ga qayta yo'naltiriladi.
- `pointerup` sodir bo'lganda (sudrab tugatilganda), bog'lanish avtomatik olib tashlanadi, bu haqida g'amxo'rlik qilishimiz shart emas.

Shunday qilib, foydalanuvchi pointerni butun hujjat bo'ylab harakatlantirsa ham, hodisa ishlov beruvchilar `thumb` da chaqiriladi. Bundan tashqari, hodisa obyektlarining koordinata xossalari, masalan `clientX/clientY` hali ham to'g'ri bo'ladi - capturing faqat `target/currentTarget` ga ta'sir qiladi.
=======
Now what is it good for? It's time to see a real-life example.

**Pointer capturing can be used to simplify drag'n'drop kind of interactions.**

Let's recall how one can implement a custom slider, described in the <info:mouse-drag-and-drop>.

We can make a `slider` element to represent the strip and the "runner" (`thumb`) inside it:

```html
<div class="slider">
  <div class="thumb"></div>
</div>
```

With styles, it looks like this:

[iframe src="slider-html" height=40 edit]

<p></p>

And here's the working logic, as it was described, after replacing mouse events with similar pointer events:

1. The user presses on the slider `thumb` -- `pointerdown` triggers.
2. Then they move the pointer -- `pointermove` triggers, and our code moves the `thumb` element along.
    - ...As the pointer moves, it may leave the slider `thumb` element, go above or below it. The `thumb` should move strictly horizontally, remaining aligned with the pointer.

In the mouse event based solution, to track all pointer movements, including when it goes above/below the `thumb`, we had to assign `mousemove` event handler on the whole `document`.

That's not a cleanest solution, though. One of the problems is that when a user moves the pointer around the document, it may trigger event handlers (such as  `mouseover`) on some other elements, invoke totally unrelated UI functionality, and we don't want that.

This is the place where `setPointerCapture` comes into play.

- We can call `thumb.setPointerCapture(event.pointerId)` in `pointerdown` handler,
- Then future pointer events until `pointerup/cancel` will be retargeted to `thumb`.
- When `pointerup` happens (dragging complete), the binding is removed automatically, we don't need to care about it.

So, even if the user moves the pointer around the whole document, events handlers will be called on `thumb`. Nevertheless, coordinate properties of the event objects, such as `clientX/clientY` will still be correct - the capturing only affects `target/currentTarget`.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Mana asosiy kod:

```js
thumb.onpointerdown = function(event) {
  // barcha pointer hodisalarni (pointerup gacha) thumb ga qayta yo'naltirish
  thumb.setPointerCapture(event.pointerId);

  // start tracking pointer moves
  thumb.onpointermove = function(event) {
    // moving the slider: listen on the thumb, as all pointer events are retargeted to it
    let newLeft = event.clientX - slider.getBoundingClientRect().left;
    thumb.style.left = newLeft + 'px';
  };

  // on pointer up finish tracking pointer moves
  thumb.onpointerup = function(event) {
    thumb.onpointermove = null;
    thumb.onpointerup = null;
    // ...also process the "drag end" if needed
  };
};

<<<<<<< HEAD
thumb.onpointermove = function(event) {
  // slayderni harakatlantirish: thumb ni tinglaymiz, chunki barcha pointer hodisalar unga qayta yo'naltiriladi
  let newLeft = event.clientX - slider.getBoundingClientRect().left;
  thumb.style.left = newLeft + 'px';
};

// diqqat: thumb.releasePointerCapture ni chaqirish shart emas,
// u pointerup da avtomatik sodir bo'ladi
=======
// note: no need to call thumb.releasePointerCapture,
// it happens on pointerup automatically
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
```

```online
To'liq demo:

[iframe src="slider" height=100 edit]

<p></p>

In the demo, there's also an additional element with `onmouseover` handler showing the current date.

Please note: while you're dragging the thumb, you may hover over this element, and its handler *does not* trigger.

So the dragging is now free of side effects, thanks to `setPointerCapture`.
```

<<<<<<< HEAD
Oxir-oqibat, pointer capturing bizga ikkita foyda beradi:
1. Kod tozaroq bo'ladi, chunki biz endi butun `document` da ishlov beruvchilarni qo'shish/olib tashlashimiz shart emas. Bog'lanish avtomatik ravishda chiqariladi.
2. Agar hujjatda biror `pointermove` ishlov beruvchilar bo'lsa, foydalanuvchi slayderni sudrab ketayotganda pointer tomonidan ular tasodifan ishga tushmaydi.
=======


At the end, pointer capturing gives us two benefits:
1. The code becomes cleaner as we don't need to add/remove handlers on the whole `document` any more. The binding is released automatically.
2. If there are other pointer event handlers in the document, they won't be accidentally triggered by the pointer while the user is dragging the slider.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

### Pointer capturing hodisalari

<<<<<<< HEAD
Ikkita bog'liq pointer hodisasi mavjud:
=======
There's one more thing to mention here, for the sake of completeness.

There are two events associated with pointer capturing:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

- `gotpointercapture` - element capturing ni yoqish uchun `setPointerCapture` dan foydalanganda ishga tushadi.
- `lostpointercapture` - capturing chiqarilganda ishga tushadi: `releasePointerCapture` chaqiruvi bilan aniq yoki `pointerup`/`pointercancel` da avtomatik.

## Xulosa

Pointer hodisalari sichqoncha, touch va qalam hodisalarini bir vaqtda, yagona kod qismi bilan qayta ishlash imkonini beradi.

Pointer hodisalari sichqoncha hodisalarini kengaytiradi. Biz hodisa nomlarida `mouse` ni `pointer` bilan almashtirishimiz mumkin va kodimiz sichqoncha uchun ishlashda davom etishini, boshqa qurilma turlari uchun yaxshiroq qo'llab-quvvatlash bilan kutishimiz mumkin.

<<<<<<< HEAD
Drag'n'droplar va brauzer o'zi hijack qilish va boshqarishga qaror qilishi mumkin bo'lgan murakkab touch o'zaro ta'sirlar uchun - hodisalarda standart harakatni bekor qilishni va biz ishtirok etadigan elementlar uchun CSS da `touch-events: none` o'rnatishni eslang.
=======
For drag'n'drops and complex touch interactions that the browser may decide to hijack and handle on its own - remember to cancel the default action on events and set `touch-action: none` in CSS for elements that we engage.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Pointer hodisalarining qo'shimcha qobiliyatlari:

- `pointerId` va `isPrimary` yordamida multi-touch qo'llab-quvvatlash.
- Qurilmaga xos xossalar, masalan `pressure`, `width/height` va boshqalar.
- Pointer capturing: biz `pointerup`/`pointercancel` gacha barcha pointer hodisalarni ma'lum elementga qayta yo'naltirishimiz mumkin.

Hozirda pointer hodisalari barcha asosiy brauzerlarda qo'llab-quvvatlanadi, shuning uchun biz xavfsiz ravishda ularga o'tishimiz mumkin, ayniqsa IE10- va Safari 12- kerak bo'lmasa. Va hatto o'sha brauzerlar bilan ham pointer hodisalar qo'llab-quvvatlashini yoqadigan polifilllar mavjud.