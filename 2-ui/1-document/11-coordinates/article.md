# Koordinatalar

Elementlarni harakatlantirish uchun koordinatalar bilan tanish bo'lishimiz kerak.

JavaScript usullarining ko'pchiligi ikkita koordinata tizimidan biri bilan ishlaydi:

1. **Oynaga nisbatan** - `position:fixed` ga o'xshash, oynaning yuqori/chap chetidan hisoblanadi.
    - bu koordinatalarni `clientX/clientY` deb belgilaymiz, bunday nomlanishning sababi keyinroq event xususiyatlarini o'rganganimizda aniq bo'ladi.
2. **Hujjatga nisbatan** - hujjat ildizidagi `position:absolute` ga o'xshash, hujjatning yuqori/chap chetidan hisoblanadi.
    - ularni `pageX/pageY` deb belgilaymiz.

Sahifa eng boshigacha skroll qilinganda, ya'ni oynaning yuqori/chap burchagi aynan hujjatning yuqori/chap burchagi bo'lganda, bu koordinatalar bir-biriga teng bo'ladi. Ammo hujjat siljigandan keyin, elementlarning oynaga nisbatan koordinatalari o'zgaradi, chunki elementlar oyna bo'ylab harakatlanadilar, hujjatga nisbatan koordinatalar esa bir xil qoladi.

Ushbu rasmda biz hujjatdagi nuqtani olamiz va skrolldan oldingi (chap) va keyingi (o'ng) koordinatalarini ko'rsatamiz:

![](document-and-window-coordinates-scrolled.svg)

Hujjat skroll qilinganda:
- `pageY` - hujjatga nisbatan koordinata bir xil qoldi, u hujjat yuqorisidan hisoblanadi (hozir skroll qilingan).
- `clientY` - oynaga nisbatan koordinata o'zgaradi (o'q qisqaroq bo'ldi), chunki xuddi shu nuqta oyna yuqorisiga yaqinroq bo'ldi.

## Element koordinatalari: getBoundingClientRect

`elem.getBoundingClientRect()` usuli `elem` ni o'rab turgan minimal to'rtburchak uchun oyna koordinatalarini o'rnatilgan [DOMRect](https://www.w3.org/TR/geometry-1/#domrect) sinfi obyekti sifatida qaytaradi.

Asosiy `DOMRect` xususiyatlari:

- `x/y` -- to'rtburchak boshlanishining oynaga nisbatan X/Y koordinatalari,
- `width/height` -- to'rtburchakning kengligi/balandligi (manfiy bo'lishi mumkin).

Qo'shimcha ravishda, hosila xususiyatlar mavjud:

- `top/bottom` -- yuqori/pastki to'rtburchak cheti uchun Y-koordinata,
- `left/right` -- chap/o'ng to'rtburchak cheti uchun X-koordinata.

```online
Misol uchun, ushbu tugmani bosing va uning oyna koordinatalarini ko'ring:

<p><input id="brTest" type="button" value="Bu tugma uchun button.getBoundingClientRect() yordamida koordinatalar olish" onclick='showRect(this)'/></p>

<script>
function showRect(elem) {
  let r = elem.getBoundingClientRect();
  alert(`x:${r.x}
y:${r.y}
width:${r.width}
height:${r.height}
top:${r.top}
bottom:${r.bottom}
left:${r.left}
right:${r.right}
`);
}
</script>

Agar sahifani skroll qilsangiz va takrorlasangiz, oynaga nisbatan tugma holati o'zgarganligi sababli, uning oyna koordinatalari (vertikal skroll qilsangiz `y/top/bottom`) ham o'zgarishini sezasiz.
```

Mana `elem.getBoundingClientRect()` natijasining tasviri:

![](coordinates.svg)

Ko'rib turganingizdek, `x/y` va `width/height` to'rtburchakni to'liq tasvirlaydi. Hosila xususiyatlar ulardan osongina hisoblanishi mumkin:

- `left = x`
- `top = y`
- `right = x + width`
- `bottom = y + height`

E'tibor bering:

- Koordinatalar `10.5` kabi o'nli kasrlar bo'lishi mumkin. Bu normal, brauzer ichida hisob-kitoblarda kasrlardan foydalanadi. Biz `style.left/top` ga o'rnatganda ularni yumaloqlashimiz shart emas.
- Koordinatalar manfiy bo'lishi mumkin. Masalan, agar sahifa shunday skroll qilinganki, `elem` endi oynadan yuqorida bo'lsa, u holda `elem.getBoundingClientRect().top` manfiy bo'ladi.

```smart header="Nega hosila xususiyatlar kerak? Agar `x/y` mavjud bo'lsa, nima uchun `top/left` mavjud?"
Matematik jihatdan to'rtburchak o'zining boshlang'ich nuqtasi `(x,y)` va yo'nalish vektori `(width,height)` bilan noyob tarzda aniqlanadi. Shunday qilib, qo'shimcha hosila xususiyatlar qulaylik uchun.

Texnik jihatdan `width/height` ning manfiy bo'lishi mumkin, bu "yo'naltirilgan" to'rtburchak uchun imkon beradi, masalan sichqon tanlovini to'g'ri belgilangan boshlanish va oxiri bilan ifodalash uchun.

Mana manfiy `width` va `height` bo'lgan to'rtburchak (masalan `width=-200`, `height=-100`):

![](coordinates-negative.svg)

Ko'rib turganingizdek, bunday holatda `left/top` `x/y` ga teng emas.

Amalda esa `elem.getBoundingClientRect()` har doim musbat kenglik/balandlik qaytaradi, bu yerda manfiy `width/height` ni faqat bu bir xil ko'rinadigan xususiyatlar aslida takrorlanmasligi sababini tushunishingiz uchun eslatamiz.
```

```warn header="Internet Explorer: `x/y` qo'llab-quvvatlamaydi"
Internet Explorer tarixiy sabablarga ko'ra `x/y` xususiyatlarini qo'llab-quvvatlamaydi.

Shunday qilib, biz yoki polyfill yasashimiz mumkin (`DomRect.prototype` da getterlar qo'shish) yoki shunchaki `top/left` dan foydalanishimiz mumkin, chunki ular musbat `width/height` uchun, xususan `elem.getBoundingClientRect()` natijasida har doim `x/y` bilan bir xil.
```

```warn header="Koordinatalar right/bottom CSS position xususiyatlaridan farq qiladi"
Oynaga nisbatan koordinatalar va CSS `position:fixed` o'rtasida aniq o'xshashliklar bor.

Ammo CSS joylashtirishda `right` xususiyati o'ng chetdan masofani, `bottom` xususiyati esa pastki chetdan masofani anglatadi.

Yuqoridagi rasmga nazar tashlaydigan bo'lsak, JavaScript da bunday emasligini ko'ramiz. Barcha oyna koordinatalari chap-yuqori burchakdan hisoblanadi, ularni ham o'z ichiga olgan holda.
```

## elementFromPoint(x, y) [#elementFromPoint]

`document.elementFromPoint(x, y)` ga chaqiruv oyna koordinatalari `(x, y)` dagi eng ichki joylashgan elementni qaytaradi.

Sintaksis:

```js
let elem = document.elementFromPoint(x, y);
```

Masalan, quyidagi kod oynaning o'rtasida hozir turgan elementni ajratib ko'rsatadi va uning tegini chiqaradi:

```js run
let centerX = document.documentElement.clientWidth / 2;
let centerY = document.documentElement.clientHeight / 2;

let elem = document.elementFromPoint(centerX, centerY);

elem.style.background = "red";
alert(elem.tagName);
```

Oyna koordinatalaridan foydalanganligi sababli, element joriy skroll holatiga qarab farq qilishi mumkin.

````warn header="Oynadan tashqari koordinatalar uchun `elementFromPoint` `null` qaytaradi"
`document.elementFromPoint(x,y)` usuli faqat `(x,y)` ko'rinadigan maydon ichida bo'lsa ishlaydi.

Agar koordinatalardan birortasi manfiy bo'lsa yoki oyna kengligi/balandligidan oshsa, u `null` qaytaradi.

Mana uni tekshirmasak yuz berishi mumkin bo'lgan tipik xato:

```js
let elem = document.elementFromPoint(x, y);
// agar koordinatalar oynadan tashqarida bo'lsa, elem = null
*!*
elem.style.background = ''; // Xato!
*/!*
```
````

## "Fixed" joylashtirishda foydalanish

Ko'pincha bizga biror narsani joylashtirishda koordinatalar kerak bo'ladi.

Element yonida biror narsani ko'rsatish uchun biz uning koordinatalarini olish uchun `getBoundingClientRect` dan foydalanishimiz va keyin CSS `position` ni `left/top` (yoki `right/bottom`) bilan birga ishlatishimiz mumkin.

Masalan, quyidagi `createMessageUnder(elem, html)` funksiyasi `elem` ostida xabar ko'rsatadi:

```js
let elem = document.getElementById("coords-show-mark");

function createMessageUnder(elem, html) {
  // xabar elementi yaratish
  let message = document.createElement('div');
  // bu yerda uslub uchun css sinfidan foydalanish yaxshiroq
  message.style.cssText = "position:fixed; color: red";

*!*
  // koordinatalar belgilash, "px" ni unutmang!
  let coords = elem.getBoundingClientRect();

  message.style.left = coords.left + "px";
  message.style.top = coords.bottom + "px";
*/!*

  message.innerHTML = html;

  return message;
}

// Foydalanish:
// hujjatga 5 soniyaga qo'shish
let message = createMessageUnder(elem, 'Salom, dunyo!');
document.body.append(message);
setTimeout(() => message.remove(), 5000);
```

```online
Ishga tushirish uchun tugmani bosing:

<button id="coords-show-mark">id="coords-show-mark" bo'lgan tugma, xabar uning ostida paydo bo'ladi</button>
```

Kodni chapga, o'ngga, pastga ko'rsatish, CSS animatsiyalarini qo'llash va boshqalar uchun o'zgartirish mumkin. Bu oson, chunki bizda elementning barcha koordinatalari va o'lchamlari bor.

Ammo muhim detailga e'tibor bering: sahifa skroll qilinganda xabar tugmadan uzoqlashadi.

Sababi aniq: xabar elementi `position:fixed` ga tayanadi, shuning uchun sahifa skroll qilinganda oynaning bir xil joyida qoladi.

Buni o'zgartirish uchun bizga hujjat asosidagi koordinatalar va `position:absolute` dan foydalanish kerak.

## Hujjat koordinatalari [#getCoords]

Hujjatga nisbatan koordinatalar oyna emas, balki hujjatning chap-yuqori burchagidan boshlanadi.

CSS da oyna koordinatalari `position:fixed` ga mos keladi, hujjat koordinatalari esa yuqorida joylashgan `position:absolute` ga o'xshaydi.

Biz biror narsani hujjatning ma'lum joyiga qo'yish uchun `position:absolute` va `top/left` dan foydalanishimiz mumkin, shunda sahifa skroll qilinayotganda ham u o'sha yerda qoladi. Ammo avval to'g'ri koordinatalar kerak.

Elementning hujjat koordinatalarini olish uchun standart usul yo'q. Ammo uni yozish oson.

Ikki koordinata tizimi quyidagi formula bilan bog'langan:
- `pageY` = `clientY` + hujjatning skroll qilingan vertikal qismining balandligi.
- `pageX` = `clientX` + hujjatning skroll qilingan gorizontal qismining kengligi.

`getCoords(elem)` funksiyasi `elem.getBoundingClientRect()` dan oyna koordinatalarini olib, ularga joriy skrollni qo'shadi:

```js
// elementning hujjat koordinatalarini olish
function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset
  };
}
```

Agar yuqoridagi misolda biz uni `position:absolute` bilan ishlatsak, xabar skroll qilinganda element yonida qoladi.

O'zgartirilgan `createMessageUnder` funksiyasi:

```js
function createMessageUnder(elem, html) {
  let message = document.createElement('div');
  message.style.cssText = "*!*position:absolute*/!*; color: red";

  let coords = *!*getCoords(elem);*/!*

  message.style.left = coords.left + "px";
  message.style.top = coords.bottom + "px";

  message.innerHTML = html;

  return message;
}
```

## Xulosa

Sahifadagi har qanday nuqta koordinatalarga ega:

1. Oynaga nisbatan -- `elem.getBoundingClientRect()`.
2. Hujjatga nisbatan -- `elem.getBoundingClientRect()` plus joriy sahifa skrolli.

Oyna koordinatalari `position:fixed` bilan ishlatish uchun ajoyib, hujjat koordinatalari esa `position:absolute` bilan yaxshi ishlaydi.

Ikki koordinata tizimi ham o'z afzalliklari va kamchiliklariga ega; bizga ba'zida biri yoki boshqasi kerak bo'ladi, xuddi CSS `position` `absolute` va `fixed` kabi.