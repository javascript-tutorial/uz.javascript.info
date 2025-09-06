---
libs:
  - d3
  - domtree
---

# Tugun xususiyatlari: tur, teg va tarkib

DOM tugunlariga chuqurroq nazar tashlaylik.

Ushbu bobda biz ular nima ekanligini ko'rib chiqamiz va eng ko'p ishlatiladigan xususiyatlarini o'rganamiz.

## DOM tugun klasslari

Turli DOM tugunlari turli xususiyatlarga ega bo'lishi mumkin. Masalan, `<a>` tegiga mos keladigan element tuguni havola bilan bog'liq xususiyatlarga ega, `<input>` ga mos keluvchisi esa input bilan bog'liq xususiyatlarga ega va hokazo. Matn tugunlari element tugunlari bilan bir xil emas. Lekin ular orasida umumiy xususiyatlar va metodlar ham mavjud, chunki barcha DOM tugun klasslari yagona ierarxiyani tashkil qiladi.

Har bir DOM tuguni tegishli o'rnatilgan klassga tegishli.

Ierarxiyaning ildizi [EventTarget](https://dom.spec.whatwg.org/#eventtarget) bo'lib, undan [Node](http://dom.spec.whatwg.org/#interface-node) meros oladi va boshqa DOM tugunlari undan meros oladi.

Mana rasm, tushuntirishlar keyinroq:

![](dom-class-hierarchy.svg)

Klasslar:

- [EventTarget](https://dom.spec.whatwg.org/#eventtarget) -- ildiz "mavhum" klass. Bu klassning obyektlari hech qachon yaratilmaydi. U asos bo'lib xizmat qiladi, shunda barcha DOM tugunlari "hodisalar" deb ataladigan narsani qo'llab-quvvatlaydi, biz ularni keyinroq o'rganamiz.
- [Node](http://dom.spec.whatwg.org/#interface-node) -- bu ham "mavhum" klass bo'lib, DOM tugunlari uchun asos bo'lib xizmat qiladi. U asosiy daraxt funksionalligini taqdim etadi: `parentNode`, `nextSibling`, `childNodes` va hokazo (bular getter'lardir). `Node` klassining obyektlari hech qachon yaratilmaydi. Lekin undan meros oladigan aniq tugun klasslari mavjud, ya'ni: matn tugunlari uchun `Text`, element tugunlari uchun `Element` va izoh tugunlari uchun `Comment` kabi boshqa ekzotik klasslar.
- [Element](http://dom.spec.whatwg.org/#interface-element) -- DOM elementlari uchun asos klass. U element darajasidagi navigatsiyani taqdim etadi, masalan `nextElementSibling`, `children` va `getElementsByTagName`, `querySelector` kabi qidiruv metodlari. Brauzer nafaqat HTML, balki XML va SVG ni ham qo'llab-quvvatlaydi. `Element` klassi aniqroq klasslar uchun asos bo'lib xizmat qiladi: `SVGElement`, `XMLElement` va `HTMLElement`.
- [HTMLElement](https://html.spec.whatwg.org/multipage/dom.html#htmlelement) -- nihoyat barcha HTML elementlari uchun asosiy klass. Undan aniq HTML elementlari meros oladi:
    - [HTMLInputElement](https://html.spec.whatwg.org/multipage/forms.html#htmlinputelement) -- `<input>` elementlari uchun klass,
    - [HTMLBodyElement](https://html.spec.whatwg.org/multipage/semantics.html#htmlbodyelement) -- `<body>` elementlari uchun klass,
    - [HTMLAnchorElement](https://html.spec.whatwg.org/multipage/semantics.html#htmlanchorelement) -- `<a>` elementlari uchun klass,
    - ...va hokazo, har bir tegning aniq xususiyatlar va metodlarni taqdim etishi mumkin bo'lgan o'z klassi bor.

Shunday qilib, berilgan tugunning barcha xususiyatlar va metodlari to'plami merosxo'rlik natijasida hosil bo'ladi.

Masalan, `<input>` element uchun DOM obyektini ko'rib chiqaylik. U [HTMLInputElement](https://html.spec.whatwg.org/multipage/forms.html#htmlinputelement) klassiga tegishli.

U xususiyatlar va metodlarni quyidagi klasslardan superpozitsiya sifatida oladi (merosxo'rlik tartibida):

- `HTMLInputElement` -- bu klass input-ga xos xususiyatlarni taqdim etadi,
- `HTMLElement` -- umumiy HTML element metodlarini (va getter/setter'larni) taqdim etadi,
- `Element` -- umumiy element metodlarini taqdim etadi,
- `Node` -- umumiy DOM tugun xususiyatlarini taqdim etadi,
- `EventTarget` -- hodisalar uchun qo'llab-quvvatlash beradi (keyinroq yoritiladi),
- ...va nihoyat u `Object`dan meros oladi, shuning uchun `hasOwnProperty` kabi "oddiy obyekt" metodlari ham mavjud.

DOM tugun klass nomini ko'rish uchun, obyektda odatda `constructor` xususiyati borligini eslaymiz. U klass konstruktoriga havola qiladi va `constructor.name` uning nomi:

```js run
alert( document.body.constructor.name ); // HTMLBodyElement
```

...Yoki shunchaki uni `toString` qilishimiz mumkin:

```js run
alert( document.body ); // [object HTMLBodyElement]
```

Merosxo'rlikni tekshirish uchun `instanceof` dan ham foydalanishimiz mumkin:

```js run
alert( document.body instanceof HTMLBodyElement ); // true
alert( document.body instanceof HTMLElement ); // true
alert( document.body instanceof Element ); // true
alert( document.body instanceof Node ); // true
alert( document.body instanceof EventTarget ); // true
```

Ko'rib turganingizdek, DOM tugunlari oddiy JavaScript obyektlaridir. Ular merosxo'rlik uchun prototipga asoslangan klasslardan foydalanadilar.

Buni brauzerdagi `console.dir(elem)` yordamida elementni chiqarish orqali ham osongina ko'rish mumkin. Konsolda siz `HTMLElement.prototype`, `Element.prototype` va hokazolarni ko'rishingiz mumkin.

```smart header="`console.dir(elem)` va `console.log(elem)` farqi"
Ko'pgina brauzerlar o'zlarining dasturchi vositalarida ikkita buyruqni qo'llab-quvvatlaydi: `console.log` va `console.dir`. Ular o'z argumentlarini konsolga chiqaradi. JavaScript obyektlari uchun bu buyruqlar odatda bir xil ish qiladi.

Lekin DOM elementlari uchun ular boshqacha:

- `console.log(elem)` element DOM daraxtini ko'rsatadi.
- `console.dir(elem)` elementni DOM obyekti sifatida ko'rsatadi, uning xususiyatlarini o'rganish uchun yaxshi.

Buni `document.body` da sinab ko'ring.
```

````smart header="Spetsifikatsiyada IDL"
Spetsifikatsiyada DOM klasslari JavaScript yordamida emas, balki maxsus [Interface description language](https://en.wikipedia.org/wiki/Interface_description_language) (IDL) yordamida tasvirlangan, bu odatda tushunish oson.

IDL da barcha xususiyatlar o'z turlari bilan boshlanadi. Masalan, `DOMString`, `boolean` va hokazo.

Mana undan parcha, izohlar bilan:

```js
// HTMLInputElement ni belgilash
*!*
// ":" belgisi HTMLInputElement HTMLElement dan meros olishini anglatadi
*/!*
interface HTMLInputElement: HTMLElement {
  // bu yerda <input> elementlarining xususiyatlari va metodlari keladi

*!*
  // "DOMString" xususiyat qiymati satr ekanligini anglatadi
*/!*
  attribute DOMString accept;
  attribute DOMString alt;
  attribute DOMString autocomplete;
  attribute DOMString value;

*!*
  // boolean qiymat xususiyati (true/false)
  attribute boolean autofocus;
*/!*
  ...
*!*
  // endi metod: "void" metod hech qanday qiymat qaytarmasligini anglatadi
*/!*
  void select();
  ...
}
```
````

## "nodeType" xususiyati

`nodeType` xususiyati DOM tugunining "turini" olishning yana bir "eski uslub" usulini taqdim etadi.

Unda raqamli qiymat bor:
- `elem.nodeType == 1` element tugunlari uchun,
- `elem.nodeType == 3` matn tugunlari uchun,
- `elem.nodeType == 9` hujjat obyekti uchun,
- [spetsifikatsiyada](https://dom.spec.whatwg.org/#node) bir nechta boshqa qiymatlar mavjud.

Masalan:

```html run
<body>
  <script>  
  let elem = document.body;

  // bu nima ekanligini tekshiraylik?
  alert(elem.nodeType); // 1 => element

  // va birinchi bola bu...
  alert(elem.firstChild.nodeType); // 3 => matn

  // hujjat obyekti uchun tur 9
  alert( document.nodeType ); // 9
  </script>
</body>
```

Zamonaviy skriptlarda biz tugun turini ko'rish uchun `instanceof` va boshqa klassga asoslangan testlardan foydalanishimiz mumkin, lekin ba'zan `nodeType` soddaroq bo'lishi mumkin. Biz `nodeType` ni faqat o'qishimiz mumkin, o'zgartira olmaymiz.

## Teg: nodeName va tagName

DOM tugun berilgan bo'lsa, uning teg nomini `nodeName` yoki `tagName` xususiyatlaridan o'qishimiz mumkin:

Masalan:

```js run
alert( document.body.nodeName ); // BODY
alert( document.body.tagName ); // BODY
```

`tagName` va `nodeName` orasida farq bormi?

Albatta, farq ularning nomlarida aks etgan, lekin haqiqatan ham biroz nozik.

- `tagName` xususiyati faqat `Element` tugunlari uchun mavjud.
- `nodeName` har qanday `Node` uchun belgilangan:
    - elementlar uchun u `tagName` bilan bir xil ma'noni anglatadi.
    - boshqa tugun turlari uchun (matn, izoh va hokazo) unda tugun turi bilan satr bor.

Boshqacha qilib aytganda, `tagName` faqat element tugunlari tomonidan qo'llab-quvvatlanadi (`Element` klassidan kelib chiqqani uchun), `nodeName` esa boshqa tugun turlari haqida ham nimadir aytishi mumkin.

Masalan, `document` va izoh tuguni uchun `tagName` va `nodeName` ni taqqoslaylik:

```html run
<body><!-- izoh -->

  <script>
    // izoh uchun
    alert( document.body.firstChild.tagName ); // undefined (element emas)
    alert( document.body.firstChild.nodeName ); // #comment

    // hujjat uchun
    alert( document.tagName ); // undefined (element emas)
    alert( document.nodeName ); // #document
  </script>
</body>
```

Agar biz faqat elementlar bilan ishlasak, `tagName` va `nodeName` dan foydalanishimiz mumkin - farq yo'q.

```smart header="Teg nomi XML rejimdan tashqari har doim katta harfda"
Brauzer hujjatlarni qayta ishlashning ikkita rejimiga ega: HTML va XML. Odatda veb-sahifalar uchun HTML rejimi ishlatiladi. XML rejimi brauzer XML-hujjatni quyidagi sarlavha bilan olganda yoqiladi: `Content-Type: application/xml+xhtml`.

HTML rejimida `tagName/nodeName` har doim katta harfda: `<body>` yoki `<BoDy>` uchun `BODY` bo'ladi.

XML rejimida registr "o'z holatida" saqlanadi. Hozir XML rejimi kamdan-kam qo'llaniladi.
```

## innerHTML: tarkib

[innerHTML](https://w3c.github.io/DOM-Parsing/#the-innerhtml-mixin) xususiyati element ichidagi HTML ni satr sifatida olish imkonini beradi.

Biz uni o'zgartirishimiz ham mumkin. Shuning uchun bu sahifani o'zgartirishning eng kuchli usullaridan biri.

Misol `document.body` ning tarkibini ko'rsatadi va keyin uni butunlay almashtiradi:

```html run
<body>
  <p>Paragraf</p>
  <div>Div</div>

  <script>
    alert( document.body.innerHTML ); // joriy tarkibni o'qish
    document.body.innerHTML = 'Yangi BODY!'; // uni almashtirish
  </script>

</body>
```

Noto'g'ri HTML kiritishga harakat qilishimiz mumkin, brauzer bizning xatolarimizni tuzatadi:

```html run
<body>

  <script>
    document.body.innerHTML = '<b>test'; // tegni yopishni unutdik
    alert( document.body.innerHTML ); // <b>test</b> (tuzatildi)
  </script>

</body>
```

```smart header="Skriptlar bajarilmaydi"
Agar `innerHTML` hujjatga `<script>` tegini kiritsa -- u HTML ning bir qismi bo'ladi, lekin bajarilmaydi.
```

### Ehtiyot bo'ling: "innerHTML+=" to'liq qayta yozishni amalga oshiradi

Biz `elem.innerHTML+="ko'proq html"` dan foydalanib elementga HTML qo'shishimiz mumkin.

Quyidagicha:

```js
chatDiv.innerHTML += "<div>Salom<img src='smile.gif'/> !</div>";
chatDiv.innerHTML += "Qanday hollar?";
```

Lekin buni qilishda juda ehtiyot bo'lishimiz kerak, chunki sodir bo'layotgan narsa qo'shish *emas*, balki to'liq qayta yozish.

Texnik jihatdan, bu ikki qator bir xil ish qiladi:

```js
elem.innerHTML += "...";
// quyidagini yozishning qisqaroq usuli:
*!*
elem.innerHTML = elem.innerHTML + "..."
*/!*
```

Boshqacha qilib aytganda, `innerHTML+=` quyidagilarni qiladi:

1. Eski tarkib olib tashlanadi.
2. Yangi `innerHTML` uning o'rniga yoziladi (eskisi va yangisining birlashtmasi).

**Tarkib "nolga aylantirilgani" va noldan qayta yozilgani uchun, barcha rasmlar va boshqa resurslar qayta yuklanadi**.

Yuqoridagi `chatDiv` misolida `chatDiv.innerHTML+="Qanday hollar?"` qatori HTML tarkibini qayta yaratadi va `smile.gif` ni qayta yuklaydi (umid qilamanki, u keshda). Agar `chatDiv` da ko'p boshqa matn va rasmlar bo'lsa, qayta yuklash aniq ko'rinadi.

Boshqa nojo'ya ta'sirlar ham bor. Masalan, agar mavjud matn sichqoncha bilan tanlangan bo'lsa, ko'pgina brauzerlar `innerHTML` ni qayta yozishda tanlovni olib tashlaydi. Va agar tashrif buyuruvchi tomonidan matn kiritilgan `<input>` bo'lsa, matn olib tashlanadi. Va hokazo.

Yaxshiyamki, `innerHTML`dan tashqari HTML qo'shishning boshqa usullari ham bor va biz ularni tez orada o'rganamiz.

## outerHTML: elementning to'liq HTML i

`outerHTML` xususiyati elementning to'liq HTML ini o'z ichiga oladi. Bu `innerHTML` plus elementning o'zi kabi.

Mana misol:

```html run
<div id="elem">Salom <b>Dunyo</b></div>

<script>
  alert(elem.outerHTML); // <div id="elem">Salom <b>Dunyo</b></div>
</script>
```

**Ehtiyot bo'ling: `innerHTML`dan farqli o'laroq, `outerHTML`ga yozish elementni o'zgartirmaydi. Buning o'rniga, uni DOM da almashtiradi.**

Ha, g'alati eshitiladi va g'alati, shuning uchun biz bu haqida alohida eslatma qilamiz. Qarang.

Misolni ko'rib chiqing:

```html run
<div>Salom, dunyo!</div>

<script>
  let div = document.querySelector('div');

*!*
  // div.outerHTML ni <p>...</p> bilan almashtirish
*/!*
  div.outerHTML = '<p>Yangi element</p>'; // (*)

*!*
  // Voy! 'div' hali ham bir xil!
*/!*
  alert(div.outerHTML); // <div>Salom, dunyo!</div> (**)
</script>
```

Haqiqatan ham g'alati ko'rinadi, shunday emasmi?

`(*)` qatorida biz `div` ni `<p>Yangi element</p>` bilan almashtirdik. Tashqi hujjatda (DOM da) biz `<div>` o'rniga yangi tarkibni ko'rishimiz mumkin. Lekin `(**)` qatorida ko'rib turganingizdek, eski `div` o'zgaruvchisining qiymati o'zgarmagan!

`outerHTML` tayinlashi DOM elementni (bu holda 'div' o'zgaruvchisi tomonidan havola qilingan obyektni) o'zgartirmaydi, balki uni DOM dan olib tashlaydi va uning o'rniga yangi HTML ni kiritadi.

Shunday qilib, `div.outerHTML=...` da sodir bo'lgan narsa:
- `div` hujjatdan olib tashlandi.
- Boshqa HTML qismi `<p>Yangi element</p>` uning o'rniga kiritildi.
- `div` hali ham eski qiymatiga ega. Yangi HTML hech qanday o'zgaruvchiga saqlanmadi.

Bu yerda xato qilish juda oson: `div.outerHTML` ni o'zgartirish va keyin `div` bilan xuddi unda yangi tarkib bor kabi ishlashni davom ettirish. Lekin bunday emas. Bunday narsa `innerHTML` uchun to'g'ri, lekin `outerHTML` uchun emas.

Biz `elem.outerHTML` ga yozishimiz mumkin, lekin yozayotgan elementni ('elem') o'zgartirmasligini yodda tutishimiz kerak. Buning o'rniga yangi HTML ni uning o'rniga qo'yadi. DOM ni so'rab yangi elementlarga havolalar olishimiz mumkin.

## nodeValue/data: matn tuguni tarkibi

`innerHTML` xususiyati faqat element tugunlari uchun amal qiladi.

Boshqa tugun turlari, masalan matn tugunlari, o'zlarining hamkasbi bor: `nodeValue` va `data` xususiyatlari. Bu ikkitasi amaliy foydalanish uchun deyarli bir xil, faqat kichik spetsifikatsiya farqlari bor. Shuning uchun biz `data` dan foydalanamiz, chunki u qisqaroq.

Matn tuguni va izoh tarkibini o'qish misoli:

```html run height="50"
<body>
  Salom
  <!-- Izoh -->
  <script>
    let text = document.body.firstChild;
*!*
    alert(text.data); // Salom
*/!*

    let comment = text.nextSibling;
*!*
    alert(comment.data); // Izoh
*/!*
  </script>
</body>
```

Matn tugunlari uchun ularni o'qish yoki o'zgartirishning sababini tasavvur qilishimiz mumkin, lekin izohlar nima uchun?

Ba'zan dasturchilar HTML ga ma'lumot yoki shablon ko'rsatmalarini quyidagicha joylashtiradilar:

```html
<!-- agar isAdmin -->
  <div>Xush kelibsiz, Admin!</div>
<!-- /if -->
```

...Keyin JavaScript uni `data` xususiyatidan o'qib, joylashtirilgan ko'rsatmalarni qayta ishlashi mumkin.

## textContent: sof matn

`textContent` element ichidagi *matn*ga kirish imkonini beradi: faqat matn, barcha `<tags>`siz.

Masalan:

```html run
<div id="news">
  <h1>Sarlavha!</h1>
  <p>Marsliklar odamlarga hujum qilmoqda!</p>
</div>

<script>
  // Sarlavha! Marsliklar odamlarga hujum qilmoqda!
  alert(news.textContent);
</script>
```

Ko'rib turganingizdek, faqat matn qaytariladi, xuddi barcha `<tags>` kesilgan, lekin ulardagi matn qolgan kabi.

Amaliyotda bunday matnni o'qish kamdan-kam kerak bo'ladi.

**`textContent`ga yozish ancha foydali, chunki u matnni "xavfsiz usulda" yozish imkonini beradi.**

Aytaylik, bizda ixtiyoriy satr bor, masalan foydalanuvchi tomonidan kiritilgan va uni ko'rsatishni xohlaymiz.

- `innerHTML` bilan u "HTML sifatida" kiritiladi, barcha HTML teglari bilan.
- `textContent` bilan u "matn sifatida" kiritiladi, barcha belgilar tom ma'noda qabul qilinadi.

Ikkitasini taqqoslang:

```html run
<div id="elem1"></div>
<div id="elem2"></div>

<script>
  let name = prompt("Ismingiz nima?", "<b>Vinni-Pux!</b>");

  elem1.innerHTML = name;
  elem2.textContent = name;
</script>
```

1. Birinchi `<div>` ismni "HTML sifatida" oladi: barcha teglar tegga aylanadi, shuning uchun biz qalin ismni ko'ramiz.
2. Ikkinchi `<div>` ismni "matn sifatida" oladi, shuning uchun biz tom ma'noda `<b>Vinni-Pux!</b>` ni ko'ramiz.

Ko'pgina hollarda biz foydalanuvchidan matn kutamiz va uni matn sifatida ko'rishni xohlaymiz. Biz saytimizda kutilmagan HTML ni xohlamaymiz. `textContent`ga tayinlash aynan shuni qiladi.

## "hidden" xususiyati

"hidden" atributi va DOM xususiyati element ko'rinadimi yoki yo'qmi belgilaydi.

Biz uni HTML da ishlatishimiz yoki JavaScript yordamida tayinlashimiz mumkin, quyidagicha:

```html run height="80"
<div>Quyidagi ikkala div ham yashiringan</div>

<div hidden>"hidden" atributi bilan</div>

<div id="elem">JavaScript "hidden" xususiyatini tayinladi</div>

<script>
  elem.hidden = true;
</script>
```

Texnik jihatdan, `hidden` `style="display:none"` bilan bir xil ishlaydi. Lekin yozish uchun qisqaroq.

Mana miltillovchi element:

```html run height=50
<div id="elem">Miltillovchi element</div>

<script>
  setInterval(() => elem.hidden = !elem.hidden, 1000);
</script>
```

## Ko'proq xususiyatlar

DOM elementlari qo'shimcha xususiyatlarga ham ega, xususan klassga bog'liq bo'lganlar:

- `value` -- `<input>`, `<select>` va `<textarea>` uchun qiymat (`HTMLInputElement`, `HTMLSelectElement`...).
- `href` -- `<a href="...">` uchun "href" (`HTMLAnchorElement`).
- `id` -- barcha elementlar uchun "id" atributining qiymati (`HTMLElement`).
- ...va boshqa ko'p narsalar...

Masalan:

```html run height="80"
<input type="text" id="elem" value="qiymat">

<script>
  alert(elem.type); // "text"
  alert(elem.id); // "elem"
  alert(elem.value); // qiymat
</script>
```

Ko'pgina standart HTML atributlari tegishli DOM xususiyatiga ega va biz unga shunday murojaat qilishimiz mumkin.

Agar berilgan klass uchun qo'llab-quvvatlanadigan xususiyatlarning to'liq ro'yxatini bilishni istasak, ularni spetsifikatsiyada topishimiz mumkin. Masalan, `HTMLInputElement` <https://html.spec.whatwg.org/#htmlinputelement> da hujjatlashtirilgan.

Yoki agar ularni tez olishni istasak yoki aniq brauzer spetsifikatsiyasiga qiziqsak -- biz har doim `console.dir(elem)` yordamida elementni chiqarib, xususiyatlarni o'qishimiz mumkin. Yoki brauzer dasturchi vositalarining Elements tabidagi "DOM properties" ni o'rganishimiz mumkin.

## Xulosa

Har bir DOM tuguni ma'lum bir klassga tegishli. Klasslar ierarxiya tashkil qiladi. To'liq xususiyatlar va metodlar to'plami merosxo'rlik natijasida keladi.

Asosiy DOM tugun xususiyatlari:

`nodeType`
: Uni tugun matn yoki element tuguni ekanligini ko'rish uchun ishlatishimiz mumkin. Unda raqamli qiymat bor: elementlar uchun `1`, matn tugunlari uchun `3` va boshqa tugun turlari uchun bir nechta boshqalar. Faqat o'qish.

`nodeName/tagName`
: Elementlar uchun teg nomi (XML rejimdan tashqari katta harfda). Element bo'lmagan tugunlar uchun `nodeName` u nima ekanligini tasvirlaydi. Faqat o'qish.

`innerHTML`
: Elementning HTML tarkibi. O'zgartirilishi mumkin.

`outerHTML`
: Elementning to'liq HTML i. `elem.outerHTML` ga yozish operatsiyasi `elem` ning o'ziga tegmaydi. Buning o'rniga u tashqi kontekstda yangi HTML bilan almashtiriladi.

`nodeValue/data`
: Element bo'lmagan tugunning tarkibi (matn, izoh). Bu ikkitasi deyarli bir xil, odatda biz `data` dan foydalanamiz. O'zgartirilishi mumkin.

`textContent`
: Element ichidagi matn: HTML minus barcha `<tags>`. Unga yozish matnni element ichiga qo'yadi, barcha maxsus belgilar va teglar aniq matn sifatida qaraladi. Foydalanuvchi tomonidan yaratilgan matnni xavfsiz kiritish va kiritmagan HTML dan himoyalash mumkin.

`hidden`
: `true` ga o'rnatilganda, CSS `display:none` bilan bir xil ish qiladi.

DOM tugunlari o'z klassiga qarab boshqa xususiyatlarga ham ega. Masalan, `<input>` elementlari (`HTMLInputElement`) `value`, `type` ni qo'llab-quvvatlaydi, `<a>` elementlari (`HTMLAnchorElement`) esa `href` va hokazolarni qo'llab-quvvatlaydi. Ko'pgina standart HTML atributlari tegishli DOM xususiyatiga ega.

Biroq, HTML atributlari va DOM xususiyatlari har doim bir xil emas, buni keyingi bobda ko'ramiz.