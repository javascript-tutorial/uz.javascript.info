# Pointer hodisalari

Pointer hodisalari sichqoncha, qalam/stylus, sensorli ekran va boshqalar kabi turli xil ko'rsatkich qurilmalaridan kirishni boshqarishning zamonaviy usulidir.

## Qisqacha tarix

Kichik sharh beramiz, shunda siz umumiy rasmni va Pointer hodisalarning boshqa hodisa turlari orasidagi o'rnini tushunasiz.

- Uzoq vaqt oldin, o'tmishda faqat sichqoncha hodisalari mavjud edi.

    Keyin sensorli qurilmalar, xususan telefonlar va planshetlar keng tarqaldi. Mavjud skriptlar ishlashi uchun ular sichqoncha hodisalarini hosil qildi (va hali ham qiladilar). Masalan, sensorli ekranga tegish `mousedown` ni hosil qiladi. Shuning uchun sensorli qurilmalar veb-sahifalar bilan yaxshi ishladi.
    
    Lekin sensorli qurilmalar sichqonchadan ko'proq imkoniyatlarga ega. Masalan, bir vaqtda bir nechta nuqtaga tegish mumkin ("multi-touch"). Garchi, sichqoncha hodisalarida bunday multi-touchlarni qayta ishlash uchun kerakli xossalar yo'q.

- Shuning uchun `touchstart`, `touchend`, `touchmove` kabi touch hodisalari kiritildi, ularda touchga xos xossalar bor (biz ularni batafsil ko'rib chiqmaymiz, chunki pointer hodisalari yanada yaxshiroq).

    Shunga qaramay, bu yetarli emas edi, chunki qalam kabi o'ziga xos xususiyatlarga ega ko'plab boshqa qurilmalar mavjud. Bundan tashqari, ham touch, ham sichqoncha hodisalarini tinglovchi kod yozish mashaqqatli edi.

- Bu muammolarni hal qilish uchun yangi standart Pointer hodisalari kiritildi. U barcha turdagi ko'rsatkich qurilmalari uchun yagona hodisalar to'plamini taqdim etadi.

Hozirda [Pointer Events Level 2](https://www.w3.org/TR/pointerevents2/) spetsifikatsiyasi barcha asosiy brauzerlarda qo'llab-quvvatlanadi, yangi [Pointer Events Level 3](https://w3c.github.io/pointerevents/) esa ishlab chiqilmoqda va asosan Pointer Events level 2 bilan mos keladi.

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

Ko'rib turganimizdek, har bir `mouse<event>` uchun o'xshash rol o'ynaydigan `pointer<event>` mavjud. Bundan tashqari, mos keladigan `mouse...` qariydoshi bo'lmagan 3 ta qo'shimcha pointer hodisasi mavjud, biz ularni tez orada tushuntiramiz.

```smart header="Kodimizdagi `mouse<event>` ni `pointer<event>` bilan almashtirish"
Biz kodimizdagi `mouse<event>` hodisalarini `pointer<event>` bilan almashtirshimiz va sichqoncha bilan ishlashda davom etishini kutishimiz mumkin.

Sensorli qurilmalar uchun qo'llab-quvvatlash ham "sehrli" tarzda yaxshilanadi. Garchi, CSS da ba'zi joylarda `touch-action: none` qo'shishimiz kerak bo'lishi mumkin. Buni quyida `pointercancel` haqidagi bo'limda ko'rib chiqamiz.
```

## Pointer hodisa xossalari

Pointer hodisalari sichqoncha hodisalari bilan bir xil xossalarga ega, masalan `clientX/Y`, `target` va h.k., shuningdek ba'zi boshqalar:

- `pointerId` - hodisani keltirib chiqaruvchi pointerning noyob identifikatori.
    
    Brauzer tomonidan yaratiladi. Ko'p pointerlarni qayta ishlashga imkon beradi, masalan stylusli sensorli ekran va multi-touch (misollar keyinroq keladi).
- `pointerType` - ko'rsatkich qurilmasi turi. Satr bo'lishi kerak, quyidagilardan biri: "mouse", "pen" yoki "touch".

    Biz bu xossani turli pointer turlariga turlicha javob berish uchun ishlatishimiz mumkin.
- `isPrimary` - asosiy pointer uchun `true` (multi-touchda birinchi barmoq).

Ba'zi pointer qurilmalari kontakt maydoni va bosimni o'lchaydi, masalan sensorli ekrandagi barmoq uchun buning uchun qo'shimcha xossalar mavjud:

- `width` - pointer (masalan barmoq) qurilmaga teginadigan maydonning kengligi. Qo'llab-quvvatlanmagan joylarda, masalan sichqoncha uchun, u doim `1`.
- `height` - pointer qurilmaga teginadigan maydonning balandligi. Qo'llab-quvvatlanmagan joylarda, u doim `1`.
- `pressure` - pointer uchining bosimi, 0 dan 1 gacha diapazonda. Bosimni qo'llab-quvvatlamaydigan qurilmalar uchun `0.5` (bosilgan) yoki `0` bo'lishi kerak.
- `tangentialPressure` - normallashtirilgan tangensial bosim.
- `tiltX`, `tiltY`, `twist` - qalamga xos xossalar, qalam sirtga nisbatan qanday joylashganini tasvirlaydi.

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

`pointercancel` hodisasi davom etayotgan pointer o'zaro ta'sir bo'lganda ishga tushadi va keyin uni bekor qiladigan narsa sodir bo'ladi, shuning uchun boshqa pointer hodisalar hosil bo'lmaydi.

Bunday sabablar:
- Pointer qurilmasi apparati jismonan o'chirilgan.
- Qurilma orientatsiyasi o'zgargan (planshet aylantirilgan).
- Brauzer o'zaro ta'sirni o'zi boshqarishga qaror qilgan, uni sichqoncha harakati yoki zoom va pan harakati yoki boshqa narsa deb hisoblagan.

`pointercancel` ni bizga qanday ta'sir qilishini ko'rish uchun amaliy misolda namoyish etamiz.

Aytaylik, biz <info:mouse-drag-and-drop> maqolasining boshidagi kabi to'p uchun drag'n'drop ni amalga oshirmoqdamiz.

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
Mana pointer hodisalarini qayd qiluvchi drag'n'drop demosi (`textarea` da faqat `up/down`, `move` va `cancel`):

[iframe src="ball" height=240 edit]
```

Biz drag'n'drop ni o'zimiz amalga oshirmoqchimiz, shuning uchun brauzerni buni o'z qo'liga olmasligini ayting.

**`pointercancel` dan qochish uchun standart brauzer harakatining oldini oling.**

Bizga ikki narsa qilish kerak:

1. Mahalliy drag'n'drop sodir bo'lishining oldini olish:
    - Buni <info:mouse-drag-and-drop> maqolasida tasvirlanganidek `ball.ondragstart = () => false` o'rnatish orqali qilishimiz mumkin.
    - Bu sichqoncha hodisalari uchun yaxshi ishlaydi.
2. Sensorli qurilmalar uchun boshqa touch bilan bog'liq brauzer harakatlari (drag'n'drop dan tashqari) mavjud. Ular bilan ham muammolardan qochish uchun:
    - CSS da `#ball { touch-action: none }` o'rnatish orqali ularning oldini oling.
    - Keyin kodimiz sensorli qurilmalarda ishlay boshlaydi.

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

Asosiy usul:
- `elem.setPointerCapture(pointerId)` - berilgan `pointerId` bilan hodisalarni `elem` ga bog'laydi. Chaqiruvdan keyin bir xil `pointerId` ga ega barcha pointer hodisalar `elem` ni target sifatida oladilar (xuddi `elem` da sodir bo'lgandek), hujjatda qayerda sodir bo'lishidan qat'i nazar.

Boshqacha qilib aytganda, `elem.setPointerCapture(pointerId)` berilgan `pointerId` bilan barcha keyingi hodisalarni `elem` ga qayta yo'naltiradi.

Bog'lanish olib tashlanadi:
- `pointerup` yoki `pointercancel` hodisalari sodir bo'lganda avtomatik,
- `elem` hujjatdan olib tashlanganida avtomatik,
- `elem.releasePointerCapture(pointerId)` chaqirilganda.

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

Mana asosiy kod:

```js
thumb.onpointerdown = function(event) {
  // barcha pointer hodisalarni (pointerup gacha) thumb ga qayta yo'naltirish
  thumb.setPointerCapture(event.pointerId);
};

thumb.onpointermove = function(event) {
  // slayderni harakatlantirish: thumb ni tinglaymiz, chunki barcha pointer hodisalar unga qayta yo'naltiriladi
  let newLeft = event.clientX - slider.getBoundingClientRect().left;
  thumb.style.left = newLeft + 'px';
};

// diqqat: thumb.releasePointerCapture ni chaqirish shart emas,
// u pointerup da avtomatik sodir bo'ladi
```

```online
To'liq demo:

[iframe src="slider" height=100 edit]
```

Oxir-oqibat, pointer capturing bizga ikkita foyda beradi:
1. Kod tozaroq bo'ladi, chunki biz endi butun `document` da ishlov beruvchilarni qo'shish/olib tashlashimiz shart emas. Bog'lanish avtomatik ravishda chiqariladi.
2. Agar hujjatda biror `pointermove` ishlov beruvchilar bo'lsa, foydalanuvchi slayderni sudrab ketayotganda pointer tomonidan ular tasodifan ishga tushmaydi.

### Pointer capturing hodisalari

Ikkita bog'liq pointer hodisasi mavjud:

- `gotpointercapture` - element capturing ni yoqish uchun `setPointerCapture` dan foydalanganda ishga tushadi.
- `lostpointercapture` - capturing chiqarilganda ishga tushadi: `releasePointerCapture` chaqiruvi bilan aniq yoki `pointerup`/`pointercancel` da avtomatik.

## Xulosa

Pointer hodisalari sichqoncha, touch va qalam hodisalarini bir vaqtda, yagona kod qismi bilan qayta ishlash imkonini beradi.

Pointer hodisalari sichqoncha hodisalarini kengaytiradi. Biz hodisa nomlarida `mouse` ni `pointer` bilan almashtirishimiz mumkin va kodimiz sichqoncha uchun ishlashda davom etishini, boshqa qurilma turlari uchun yaxshiroq qo'llab-quvvatlash bilan kutishimiz mumkin.

Drag'n'droplar va brauzer o'zi hijack qilish va boshqarishga qaror qilishi mumkin bo'lgan murakkab touch o'zaro ta'sirlar uchun - hodisalarda standart harakatni bekor qilishni va biz ishtirok etadigan elementlar uchun CSS da `touch-events: none` o'rnatishni eslang.

Pointer hodisalarining qo'shimcha qobiliyatlari:

- `pointerId` va `isPrimary` yordamida multi-touch qo'llab-quvvatlash.
- Qurilmaga xos xossalar, masalan `pressure`, `width/height` va boshqalar.
- Pointer capturing: biz `pointerup`/`pointercancel` gacha barcha pointer hodisalarni ma'lum elementga qayta yo'naltirishimiz mumkin.

Hozirda pointer hodisalari barcha asosiy brauzerlarda qo'llab-quvvatlanadi, shuning uchun biz xavfsiz ravishda ularga o'tishimiz mumkin, ayniqsa IE10- va Safari 12- kerak bo'lmasa. Va hatto o'sha brauzerlar bilan ham pointer hodisalar qo'llab-quvvatlashini yoqadigan polifilllar mavjud.