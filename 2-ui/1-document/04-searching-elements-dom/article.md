---
libs:
  - d3
  - domtree
---

# Qidirish: getElement*, querySelector*

DOM navigatsiya xususiyatlari elementlar bir-biriga yaqin bo'lganda ajoyib. Agar ular yaqin bo'lmasa-chi? Sahifaning ixtiyoriy elementini qanday olish mumkin?

Buning uchun qo'shimcha qidirish metodlari mavjud.

## document.getElementById yoki shunchaki id

Agar elementda `id` atributi bo'lsa, uni qayerda joylashganidan qat'i nazar `document.getElementById(id)` metodidan foydalanib olishimiz mumkin.

Masalan:

```html run
<div id="elem">
  <div id="elem-content">Element</div>
</div>

<script>
  // elementni olish
*!*
  let elem = document.getElementById('elem');
*/!*

  // uning fonini qizil qilish
  elem.style.background = 'red';
</script>
```

Shuningdek, `id` nomi bilan global o'zgaruvchi mavjud bo'lib, u elementga havola qiladi:

```html run
<div id="*!*elem*/!*">
  <div id="*!*elem-content*/!*">Element</div>
</div>

<script>
  // elem - bu id="elem" bilan DOM-elementga havola
  elem.style.background = 'red';

  // id="elem-content" ichida defis bor, shuning uchun o'zgaruvchi nomi bo'la olmaydi
  // ...lekin uni kvadrat qavslar yordamida olishimiz mumkin: window['elem-content']
</script>
```

...Bu xuddi shu nom bilan JavaScript o'zgaruvchisini e'lon qilmasagimizgina, aks holda u ustunlik qiladi:

```html run untrusted height=0
<div id="elem"></div>

<script>
  let elem = 5; // endi elem 5 ga teng, <div id="elem"> ga havola emas

  alert(elem); // 5
</script>
```

```warn header="Elementlarga murojaat qilish uchun id nomli global o'zgaruvchilardan foydalanmang"
Bu xatti-harakat [spetsifikatsiyada](http://www.whatwg.org/specs/web-apps/current-work/#dom-window-nameditem) tasvirlangan, shuning uchun bu standart hisoblanadi. Lekin u asosan muvofiqlik uchun qo'llab-quvvatlanadi.

Brauzer JS va DOM nomlar maydonlarini aralashtirish orqali bizga yordam berishga harakat qiladi. Bu HTML ga kiritilgan oddiy skriptlar uchun yaxshi, lekin umuman yaxshi narsa emas. Nom to'qnashuvi bo'lishi mumkin. Bundan tashqari, kimdir JS kodini o'qiganda va HTML ko'rinishda bo'lmasa, o'zgaruvchi qayerdan kelganini bilish qiyin.

Bu qo'llanmada biz qisqalik uchun element qayerdan kelgani aniq bo'lganda `id` dan bevosita foydalanish uchun ishlatamiz.

Haqiqiy hayotda `document.getElementById` afzal qilingan metod hisoblanadi.
```

```smart header="`id` noyob bo'lishi kerak"
`id` noyob bo'lishi kerak. Hujjatda berilgan `id` bilan faqat bitta element bo'lishi mumkin.

Agar bir xil `id` bilan bir nechta elementlar bo'lsa, unda undan foydalanadigan metodlarning xatti-harakati oldindan aytib bo'lmaydi, masalan `document.getElementById` bunday elementlardan istalganini tasodifiy qaytarishi mumkin. Shuning uchun qoidaga rioya qiling va `id` ni noyob saqlang.
```

```warn header="Faqat `document.getElementById`, `anyElem.getElementById` emas"
`getElementById` metodi faqat `document` obyektida chaqirilishi mumkin. U berilgan `id` ni butun hujjatda qidiradi.
```

## querySelectorAll {#querySelectorAll}

Hozirgacha eng ko'p qirrali metod `elem.querySelectorAll(css)` berilgan CSS selektoriga mos keladigan `elem` ichidagi barcha elementlarni qaytaradi.

Bu yerda oxirgi bola bo'lgan barcha `<li>` elementlarni qidiramiz:

```html run
<ul>
  <li>Bu</li>
  <li>test</li>
</ul>
<ul>
  <li>muvaffaqiyatli</li>
  <li>o'tdi</li>
</ul>
<script>
*!*
  let elements = document.querySelectorAll('ul > li:last-child');
*/!*

  for (let elem of elements) {
    alert(elem.innerHTML); // "test", "o'tdi"
  }
</script>
```

Bu metod haqiqatan ham kuchli, chunki har qanday CSS selektordan foydalanish mumkin.

```smart header="Pseudo-klasslardan ham foydalanish mumkin"
CSS selektordagi `:hover` va `:active` kabi pseudo-klasslar ham qo'llab-quvvatlanadi. Masalan, `document.querySelectorAll(':hover')` hozir kursor ustida turgan elementlar to'plamini qaytaradi (ichma-ich tartibda: eng tashqi `<html>` dan eng ichki gacha).
```

## querySelector {#querySelector}

`elem.querySelector(css)` chaqiruvi berilgan CSS selektor uchun birinchi elementni qaytaradi.

Boshqacha qilib aytganda, natija `elem.querySelectorAll(css)[0]` bilan bir xil, lekin ikkinchisi *barcha* elementlarni qidirib, birini tanlaydi, `elem.querySelector` esa faqat birini qidiradi. Shuning uchun u tezroq va yozish uchun qisqaroq.

## matches

Oldingi metodlar DOM ni qidirardi.

[elem.matches(css)](http://dom.spec.whatwg.org/#dom-element-matches) hech narsani qidirmaydi, u shunchaki `elem` berilgan CSS-selektorga mos kelishini tekshiradi. U `true` yoki `false` qaytaradi.

Bu metod elementlar ustida takrorlash (massivdagi kabi yoki boshqa narsa) va bizni qiziqtiradigan narsalarni filtrlashga harakat qilganda foydali bo'ladi.

Masalan:

```html run
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>

<script>
  // document.body.children o'rniga har qanday to'plam bo'lishi mumkin
  for (let elem of document.body.children) {
*!*
    if (elem.matches('a[href$="zip"]')) {
*/!*
      alert("Arxiv havolasi: " + elem.href );
    }
  }
</script>
```

## closest

Elementning *ajdodlari* bu: ota-ona, ota-onaning ota-onasi, uning ota-onasi va hokazo. Ajdodlar birga elementdan tepaga qadar ota-onalar zanjirini tashkil qiladi.

`elem.closest(css)` metodi CSS-selektorga mos keladigan eng yaqin ajdodni qidiradi. `elem` ning o'zi ham qidiruvga kiritiladi.

Boshqacha qilib aytganda, `closest` metodi elementdan yuqoriga chiqadi va har bir ota-onani tekshiradi. Agar u selektorga mos kelsa, qidiruv to'xtaydi va ajdod qaytariladi.

Masalan:

```html run
<h1>Mundarija</h1>

<div class="contents">
  <ul class="book">
    <li class="chapter">1-bob</li>
    <li class="chapter">2-bob</li>
  </ul>
</div>

<script>
  let chapter = document.querySelector('.chapter'); // LI

  alert(chapter.closest('.book')); // UL
  alert(chapter.closest('.contents')); // DIV

  alert(chapter.closest('h1')); // null (chunki h1 ajdod emas)
</script>
```

## getElementsBy*

Teg, klass va hokazo bo'yicha tugunlarni qidirish uchun boshqa metodlar ham mavjud.

Bugungi kunda ular asosan tarix, chunki `querySelector` kuchliroq va yozish uchun qisqaroq.

Shuning uchun biz ularni asosan to'liqlik uchun yoritamiz, garchi eski skriptlarda ularni hali ham topishingiz mumkin.

- `elem.getElementsByTagName(tag)` berilgan teg bilan elementlarni qidiradi va ularning to'plamini qaytaradi. `tag` parametri "har qanday teglar" uchun yulduzcha `"*"` ham bo'lishi mumkin.
- `elem.getElementsByClassName(className)` berilgan CSS klassiga ega elementlarni qaytaradi.
- `document.getElementsByName(name)` berilgan `name` atributiga ega elementlarni hujjat bo'ylab qaytaradi. Juda kamdan-kam qo'llaniladi.

Masalan:
```js
// hujjatdagi barcha divlarni olish
let divs = document.getElementsByTagName('div');
```

Jadval ichidagi barcha `input` teglarini topaylik:

```html run height=50
<table id="table">
  <tr>
    <td>Yoshingiz:</td>

    <td>
      <label>
        <input type="radio" name="age" value="young" checked> 18 dan kichik
      </label>
      <label>
        <input type="radio" name="age" value="mature"> 18 dan 50 gacha
      </label>
      <label>
        <input type="radio" name="age" value="senior"> 60 dan katta
      </label>
    </td>
  </tr>
</table>

<script>
*!*
  let inputs = table.getElementsByTagName('input');
*/!*

  for (let input of inputs) {
    alert( input.value + ': ' + input.checked );
  }
</script>
```

```warn header="`\"s\"` harfini unutmang!"
Yangi boshlovchi dasturchilar ba'zan `"s"` harfini unutadilar. Ya'ni ular <code>getElement<b>s</b>ByTagName</code> o'rniga `getElementByTagName` ni chaqirishga harakat qiladi.

`getElementById` da `"s"` harfi yo'q, chunki u bitta elementni qaytaradi. Lekin `getElementsByTagName` elementlar to'plamini qaytaradi, shuning uchun ichida `"s"` bor.
```

````warn header="Bu to'plamni qaytaradi, element emas!"
Yana bir keng tarqalgan yangi boshlovchi xatosi:

```js
// ishlamaydi
document.getElementsByTagName('input').value = 5;
```

Bu ishlamaydi, chunki u inputlar *to'plamini* oladi va qiymatni uning ichidagi elementlarga emas, balki unga tayinlaydi.

Biz yo'ki to'plam ustida takrorlashimiz yoki elementni indeksi orqali olib, keyin quyidagicha tayinlashimiz kerak:

```js
// ishlashi kerak (agar input bo'lsa)
document.getElementsByTagName('input')[0].value = 5;
```
````

`.article` elementlarini qidirish:

```html run height=50
<form name="my-form">
  <div class="article">Maqola</div>
  <div class="long article">Uzun maqola</div>
</form>

<script>
  // name atributi bo'yicha topish
  let form = document.getElementsByName('my-form')[0];

  // forma ichida klass bo'yicha topish
  let articles = form.getElementsByClassName('article');
  alert(articles.length); // 2, "article" klassiga ega ikkita element topildi
</script>
```

## Jonli to'plamlar

Barcha `"getElementsBy*"` metodlari *jonli* to'plamni qaytaradi. Bunday to'plamlar har doim hujjatning joriy holatini aks ettiradi va u o'zgarganda "avtomatik yangilanadi".

Quyidagi misolda ikkita skript mavjud.

1. Birinchisi `<div>` to'plamiga havola yaratadi. Hozircha uning uzunligi `1`.
2. Ikkinchi skript brauzer yana bitta `<div>` ni uchratgandan keyin ishlaydi, shuning uchun uning uzunligi `2`.

```html run
<div>Birinchi div</div>

<script>
  let divs = document.getElementsByTagName('div');
  alert(divs.length); // 1
</script>

<div>Ikkinchi div</div>

<script>
*!*
  alert(divs.length); // 2
*/!*
</script>
```

Aksincha, `querySelectorAll` *statik* to'plamni qaytaradi. Bu elementlarning qat'iy massiviga o'xshaydi.

Agar uni o'rniga ishlatilsa, ikkala skript ham `1` ni chiqaradi:

```html run
<div>Birinchi div</div>

<script>
  let divs = document.querySelectorAll('div');
  alert(divs.length); // 1
</script>

<div>Ikkinchi div</div>

<script>
*!*
  alert(divs.length); // 1
*/!*
</script>
```

Endi biz farqni osongina ko'rishimiz mumkin. Statik to'plam hujjatda yangi `div` paydo bo'lgandan keyin ko'paymadi.

## Xulosa

DOM da tugunlarni qidirish uchun 6 ta asosiy metod mavjud:

<table>
<thead>
<tr>
<td>Metod</td>
<td>Nima bo'yicha qidiradi...</td>
<td>Elementda chaqirish mumkinmi?</td>
<td>Jonlimi?</td>
</tr>
</thead>
<tbody>
<tr>
<td><code>querySelector</code></td>
<td>CSS-selektor</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>querySelectorAll</code></td>
<td>CSS-selektor</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementById</code></td>
<td><code>id</code></td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementsByName</code></td>
<td><code>name</code></td>
<td>-</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByTagName</code></td>
<td>teg yoki <code>'*'</code></td>
<td>✔</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByClassName</code></td>
<td>klass</td>
<td>✔</td>
<td>✔</td>
</tr>
</tbody>
</table>

Eng ko'p ishlatiladiganlari `querySelector` va `querySelectorAll`, lekin `getElement(s)By*` vaqti-vaqti bilan foydali bo'lishi yoki eski skriptlarda topilishi mumkin.

Bundan tashqari:

- `elem.matches(css)` `elem` berilgan CSS selektoriga mos kelishini tekshirish uchun mavjud.
- `elem.closest(css)` berilgan CSS-selektorga mos keladigan eng yaqin ajdodni qidirish uchun mavjud. `elem` ning o'zi ham tekshiriladi.

Va bu yerda bola-ota-ona munosabatini tekshirish uchun yana bir metoddan gaplashaylik, chunki u ba'zan foydali bo'ladi:
- `elemA.contains(elemB)` agar `elemB` `elemA` ichida bo'lsa (`elemA` ning avlodi) yoki `elemA==elemB` bo'lsa `true` qaytaradi.