---
libs:
  - d3
  - domtree
---

# DOM bo'ylab yurish

DOM bizga elementlar va ularning tarkibi bilan har qanday operatsiyani bajarishga imkon beradi, lekin avval tegishli DOM obyektiga erishishimiz kerak.

DOM dagi barcha operatsiyalar `document` obyekti bilan boshlanadi. Bu DOM ga asosiy "kirish nuqtasi"dir. Undan har qanday tugunga murojaat qilishimiz mumkin.

Mana DOM tugunlari orasida sayohat qilish imkonini beruvchi havolalar rasmi:

![](dom-links.svg)

Keling, ularni batafsil ko'rib chiqamiz.

## Yuqorida: documentElement va body

Daraxtning eng yuqori tugunlariga `document` xususiyatlari orqali bevosita murojaat qilish mumkin:

`<html>` = `document.documentElement`
: Hujjatning eng yuqori tuguni `document.documentElement` hisoblanadi. Bu `<html>` tegining DOM tuguni.

`<body>` = `document.body`
: Yana bir keng qo'llaniladigan DOM tuguni `<body>` elementi -- `document.body`.

`<head>` = `document.head`
: `<head>` tegi `document.head` sifatida mavjud.

````warn header="Diqqat: `document.body` `null` bo'lishi mumkin"
Skript ishga tushayotgan vaqtda mavjud bo'lmagan elementga murojaat qila olmaydi.

Xususan, agar skript `<head>` ichida bo'lsa, `document.body` mavjud bo'lmaydi, chunki brauzer uni hali o'qimagan.

Shunday qilib, quyidagi misolda birinchi `alert` `null` ni ko'rsatadi:

```html run
<html>

<head>
  <script>
*!*
    alert( "HEAD dan: " + document.body ); // null, hali <body> yo'q
*/!*
  </script>
</head>

<body>

  <script>
    alert( "BODY dan: " + document.body ); // HTMLBodyElement, endi mavjud
  </script>

</body>
</html>
```
````

```smart header="DOM dunyosida `null` \"mavjud emas\" degan ma'noni anglatadi"
DOM da `null` qiymati "mavjud emas" yoki "bunday tugun yo'q" degan ma'noni anglatadi.
```

## Bolalar: childNodes, firstChild, lastChild

Bundan keyin ishlatadigan ikkita atama mavjud:

- **Bola tugunlar (yoki bolalar)** -- bevosita bolalar bo'lgan elementlar. Boshqacha qilib aytganda, ular berilgan elementga to'g'ridan-to'g'ri joylashtirilgan. Masalan, `<head>` va `<body>` `<html>` elementining bolalari hisoblanadi.
- **Avlodlar** -- berilgan elementga joylashtirilgan barcha elementlar, shu jumladan bolalar, ularning bolalari va hokazo.

Masalan, bu yerda `<body>` ning `<div>` va `<ul>` bolalari bor (va bir nechta bo'sh matn tugunlari):

```html run
<html>
<body>
  <div>Boshlanish</div>

  <ul>
    <li>
      <b>Ma'lumot</b>
    </li>
  </ul>
</body>
</html>
```

...Va `<body>` ning avlodlari nafaqat bevosita bolalar `<div>`, `<ul>`, balki chuqurroq joylashgan elementlar ham, masalan `<li>` (`<ul>` ning bolasi) va `<b>` (`<li>` ning bolasi) -- butun pastki daraxt.

**`childNodes` to'plami barcha bola tugunlarni, shu jumladan matn tugunlarni ham ro'yxatga oladi.**

Quyidagi misol `document.body` ning bolalarini ko'rsatadi:

```html run
<html>
<body>
  <div>Boshlanish</div>

  <ul>
    <li>Ma'lumot</li>
  </ul>

  <div>Oxiri</div>

  <script>
*!*
    for (let i = 0; i < document.body.childNodes.length; i++) {
      alert( document.body.childNodes[i] ); // Text, DIV, Text, UL, ..., SCRIPT
    }
*/!*
  </script>
  ...boshqa narsalar...
</body>
</html>
```

Bu yerda qiziqarli bir tafsilotga e'tibor bering. Agar yuqoridagi misolni ishga tushirsak, ko'rsatilgan oxirgi element `<script>` bo'ladi. Aslida, hujjatda pastda ko'proq narsalar bor, lekin skript bajarilayotgan vaqtda brauzer uni hali o'qimagan, shuning uchun skript uni ko'rmaydi.

**`firstChild` va `lastChild` xususiyatlari birinchi va oxirgi bolalarga tez murojaat qilish imkonini beradi.**

Ular shunchaki qisqartmalar. Agar bola tugunlar mavjud bo'lsa, quyidagi har doim to'g'ri bo'ladi:
```js
elem.childNodes[0] === elem.firstChild
elem.childNodes[elem.childNodes.length - 1] === elem.lastChild
```

Bola tugunlar mavjudligini tekshirish uchun maxsus `elem.hasChildNodes()` funksiyasi ham mavjud.

### DOM to'plamlari

Ko'rib turganingizdek, `childNodes` massivga o'xshaydi. Lekin aslida bu massiv emas, balki *to'plam* -- maxsus massivga o'xshash takrorlanadigan obyekt.

Bundan ikkita muhim oqibat kelib chiqadi:

1. Uni takrorlash uchun `for..of` dan foydalanishimiz mumkin:
  ```js
  for (let node of document.body.childNodes) {
    alert(node); // to'plamdagi barcha tugunlarni ko'rsatadi
  }
  ```
  Bu takrorlanadigan bo'lgani uchun (`Symbol.iterator` xususiyatini taqdim etadi, talab qilinganidek).

2. Massiv metodlari ishlamaydi, chunki bu massiv emas:
  ```js run
  alert(document.body.childNodes.filter); // undefined (filter metodi yo'q!)
  ```

Birinchisi yaxshi. Ikkinchisi chidab bo'ladigan, chunki agar massiv metodlari kerak bo'lsa, to'plamdan "haqiqiy" massiv yaratish uchun `Array.from` dan foydalanishimiz mumkin:

  ```js run
  alert( Array.from(document.body.childNodes).filter ); // function
  ```

```warn header="DOM to'plamlari faqat o'qish uchun"
DOM to'plamlari, va hatto ko'proq -- bu bobda sanab o'tilgan *barcha* navigatsiya xususiyatlari faqat o'qish uchun.

`childNodes[i] = ...` ni tayinlash orqali bolani boshqa narsa bilan almashtira olmaymiz.

DOM ni o'zgartirish boshqa metodlarni talab qiladi. Biz ularni keyingi bobda ko'ramiz.
```

```warn header="DOM to'plamlari jonli"
Kichik istisnolar bundan mustasno, deyarli barcha DOM to'plamlari *jonli*. Boshqacha qilib aytganda, ular DOM ning joriy holatini aks ettiradi.

Agar biz `elem.childNodes` ga havola saqlab qolsak va DOM ga tugunlar qo'shsak/olib tashlasak, ular to'plamda avtomatik ravishda paydo bo'ladi.
```

````warn header="To'plamlar ustida aylanish uchun `for..in` dan foydalanmang"
To'plamlar `for..of` yordamida takrorlanadi. Ba'zan odamlar buning uchun `for..in` dan foydalanishga harakat qiladi.

Iltimos, buni qilmang. `for..in` tsikli barcha sanab o'tiladigan xususiyatlar ustida aylanadi. Va to'plamlarda odatda olishni xohlamaydigan "qo'shimcha" kamdan-kam ishlatiladigan xususiyatlar mavjud:

```html run
<body>
<script>
  // 0, 1, length, item, values va boshqalarni ko'rsatadi.
  for (let prop in document.body.childNodes) alert(prop);
</script>
</body>
````

## Bir darajadagi tugunlar va ota-ona

*Bir darajadagi tugunlar* bir xil ota-onaning bolalari bo'lgan tugunlardir.

Masalan, bu yerda `<head>` va `<body>` bir darajadagi tugunlardir:

```html
<html>
  <head>...</head><body>...</body>
</html>
```

- `<body>` `<head>` ning "keyingi" yoki "o'ng" bir darajadagi tuguni deb aytiladi,
- `<head>` `<body>` ning "oldingi" yoki "chap" bir darajadagi tuguni deb aytiladi.

Keyingi bir darajadagi tugun `nextSibling` xususiyatida, oldingi tugun esa `previousSibling` da.

Ota-ona `parentNode` sifatida mavjud.

Masalan:

```js run
// <body> ning ota-onasi <html>
alert( document.body.parentNode === document.documentElement ); // true

// <head> dan keyin <body> keladi
alert( document.head.nextSibling ); // HTMLBodyElement

// <body> dan oldin <head> keladi
alert( document.body.previousSibling ); // HTMLHeadElement
```

## Faqat elementlar uchun navigatsiya

Yuqorida sanab o'tilgan navigatsiya xususiyatlari *barcha* tugunlarga tegishli. Masalan, `childNodes` da biz matn tugunlari, element tugunlari va hatto izoh tugunlari mavjud bo'lsa, ularni ham ko'rishimiz mumkin.

Lekin ko'pgina vazifalar uchun bizga matn yoki izoh tugunlari kerak emas. Biz teglarni ifodalovchi va sahifaning tuzilishini shakllantiruvchi element tugunlari bilan ishlashni xohlaymiz.

Shunday qilib, faqat *element tugunlarini* hisobga oladigan ko'proq navigatsiya havolalarini ko'raylik:

![](dom-links-elements.svg)

Havolalar yuqorida berilganlarga o'xshash, faqat ichida `Element` so'zi bor:

- `children` -- faqat element tugunlari bo'lgan bolalar.
- `firstElementChild`, `lastElementChild` -- birinchi va oxirgi element bolalar.
- `previousElementSibling`, `nextElementSibling` -- qo'shni elementlar.
- `parentElement` -- ota-ona element.

````smart header="Nega `parentElement`? Ota-ona element *bo'lmasligi* mumkinmi?"
`parentElement` xususiyati "element" ota-onasini qaytaradi, `parentNode` esa "har qanday tugun" ota-onasini qaytaradi. Bu xususiyatlar odatda bir xil: ikkalasi ham ota-onani oladi.

`document.documentElement` ning bitta istisnosi bundan mustasno:

```js run
alert( document.documentElement.parentNode ); // document
alert( document.documentElement.parentElement ); // null
```

Sababi shundaki, ildiz tugun `document.documentElement` (`<html>`) ota-ona sifatida `document` ga ega. Lekin `document` element tuguni emas, shuning uchun `parentNode` uni qaytaradi, `parentElement` esa yo'q.

Bu tafsilot ixtiyoriy `elem` elementdan `<html>` gacha, lekin `document` gacha emas, yuqoriga chiqishni xohlaganimizda foydali bo'lishi mumkin:
```js
while(elem = elem.parentElement) { // <html> gacha yuqoriga chiqish
  alert( elem );
}
```
````

Yuqoridagi misollardan birini o'zgartiraylik: `childNodes` ni `children` bilan almashtiramiz. Endi u faqat elementlarni ko'rsatadi:

```html run
<html>
<body>
  <div>Boshlanish</div>

  <ul>
    <li>Ma'lumot</li>
  </ul>

  <div>Oxiri</div>

  <script>
*!*
    for (let elem of document.body.children) {
      alert(elem); // DIV, UL, DIV, SCRIPT
    }
*/!*
  </script>
  ...
</body>
</html>
```

## Qo'shimcha havolalar: jadvallar {#dom-navigation-tables}

Hozir gacha biz asosiy navigatsiya xususiyatlarini tasvirlab berdik.

DOM elementlarining muayyan turlari o'z turlari uchun maxsus, qulaylik uchun qo'shimcha xususiyatlarni taqdim etishi mumkin.

Jadvallar buning ajoyib misoli bo'lib, ayniqsa muhim holatni ifodalaydi:

**`<table>`** elementi (yuqorida berilganlardan tashqari) ushbu xususiyatlarni qo'llab-quvvatlaydi:
- `table.rows` -- jadvalning `<tr>` elementlari to'plami.
- `table.caption/tHead/tFoot` -- `<caption>`, `<thead>`, `<tfoot>` elementlariga havolalar.
- `table.tBodies` -- `<tbody>` elementlari to'plami (standartga ko'ra ko'p bo'lishi mumkin, lekin har doim kamida bittasi bo'ladi -- hatto manba HTML da bo'lmasa ham, brauzer uni DOM ga qo'yadi).

**`<thead>`, `<tfoot>`, `<tbody>`** elementlari `rows` xususiyatini taqdim etadi:
- `tbody.rows` -- ichidagi `<tr>` lar to'plami.

**`<tr>`:**
- `tr.cells` -- berilgan `<tr>` ichidagi `<td>` va `<th>` kataklar to'plami.
- `tr.sectionRowIndex` -- berilgan `<tr>` ning o'rab turgan `<thead>/<tbody>/<tfoot>` ichidagi pozitsiyasi (indeksi).
- `tr.rowIndex` -- `<tr>` ning butun jadvaldagi raqami (barcha jadval qatorlarini hisobga olgan holda).

**`<td>` va `<th>`:**
- `td.cellIndex` -- kataning o'rab turgan `<tr>` ichidagi raqami.

Foydalanish misoli:

```html run height=100
<table id="table">
  <tr>
    <td>bir</td><td>ikki</td>
  </tr>
  <tr>
    <td>uch</td><td>to'rt</td>
  </tr>
</table>

<script>
  // "ikki" bilan td ni olish (birinchi qator, ikkinchi ustun)
  let td = table.*!*rows[0].cells[1]*/!*;
  td.style.backgroundColor = "red"; // uni ta'kidlash
</script>
```

Spetsifikatsiya: [jadval ma'lumotlari](https://html.spec.whatwg.org/multipage/tables.html).

HTML formalar uchun ham qo'shimcha navigatsiya xususiyatlari mavjud. Biz formalar bilan ishlashni boshlaganimizda ularga qaraymiz.

## Xulosa

DOM tuguni berilgan bo'lsa, navigatsiya xususiyatlari yordamida uning bevosita qo'shnilariga o'tishimiz mumkin.

Ularning ikkita asosiy to'plami mavjud:

- Barcha tugunlar uchun: `parentNode`, `childNodes`, `firstChild`, `lastChild`, `previousSibling`, `nextSibling`.
- Faqat element tugunlari uchun: `parentElement`, `children`, `firstElementChild`, `lastElementChild`, `previousElementSibling`, `nextElementSibling`.

DOM elementlarining ba'zi turlari, masalan jadvallar, o'z tarkibiga murojaat qilish uchun qo'shimcha xususiyatlar va to'plamlarni taqdim etadi.