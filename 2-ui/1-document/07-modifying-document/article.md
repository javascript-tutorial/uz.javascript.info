# Hujjatni o'zgartirish

DOM ni o'zgartirish "jonli" sahifalar yaratishning kalitidir.

Bu yerda yangi elementlarni "tezkorlik bilan" yaratish va mavjud sahifa kontentini o'zgartirish usullarini ko'rib chiqamiz.

## Misol: xabar ko'rsatish

Bir misol bilan ko'rsatib beraylik. Biz sahifaga `alert`dan ko'ra chiroyliroq ko'rinadigan xabar qo'shamiz.

Qanday ko'rinishi:

```html autorun height="80"
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

*!*
<div class="alert">
  <strong>Salom!</strong> Siz muhim xabarni o'qidingiz.
</div>
*/!*
```

Bu HTML misoli edi. Endi xuddi shunday `div` ni JavaScript bilan yaratamiz (uslublar HTML/CSS da allaqachon mavjud deb faraz qilib).

## Element yaratish

DOM tugunlarini yaratish uchun ikkita usul mavjud:

`document.createElement(tag)`
: Berilgan teg bilan yangi *element tugunini* yaratadi:

    ```js
    let div = document.createElement('div');
    ```

`document.createTextNode(text)`
: Berilgan matn bilan yangi *matn tugunini* yaratadi:

    ```js
    let textNode = document.createTextNode('Mana men shu yerdaman');
    ```

Ko'pincha bizga xabar uchun `div` kabi element tugunlarini yaratish kerak.

### Xabar yaratish

Xabar div ni yaratish 3 bosqichdan iborat:

```js
// 1. <div> elementini yaratish
let div = document.createElement('div');

// 2. Uning sinfini "alert" ga o'rnatish
div.className = "alert";

// 3. Uni kontent bilan to'ldirish
div.innerHTML = "<strong>Salom!</strong> Siz muhim xabarni o'qidingiz.";
```

Biz elementni yaratdik. Ammo hozircha u faqat `div` nomli o'zgaruvchida, sahifada emas. Shuning uchun biz uni ko'ra olmaymiz.

## Qo'yish usullari

`div` ni ko'rsatish uchun uni `document` ning biror joyiga, masalan `document.body` orqali havola qilingan `<body>` elementiga qo'yishimiz kerak.

Buning uchun maxsus `append` usuli mavjud: `document.body.append(div)`.

Mana to'liq kod:

```html run height="80"
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  let div = document.createElement('div');
  div.className = "alert";
  div.innerHTML = "<strong>Salom!</strong> Siz muhim xabarni o'qidingiz.";

*!*
  document.body.append(div);
*/!*
</script>
```

Bu yerda biz `document.body` da `append` ni chaqirdik, lekin biz `append` usulini boshqa har qanday elementda ham chaqirib, unga boshqa elementni qo'ya olamiz. Masalan, `div.append(anotherElement)` ni chaqirib `<div>` ga biror narsa qo'sha olamiz.

Mana boshqa qo'yish usullari, ular qayerga qo'yishning turli joylarini belgilaydi:

- `node.append(...nodes or strings)` -- tugunlar yoki satrlarni `node` ning *oxiriga* qo'shadi,
- `node.prepend(...nodes or strings)` -- tugunlar yoki satrlarni `node` ning *boshiga* qo'yadi,
- `node.before(...nodes or strings)` –- tugunlar yoki satrlarni `node` dan *oldin* qo'yadi,
- `node.after(...nodes or strings)` –- tugunlar yoki satrlarni `node` dan *keyin* qo'yadi,
- `node.replaceWith(...nodes or strings)` –- `node` ni berilgan tugunlar yoki satrlar bilan almashtiradi.

Bu usullarning argumentlari qo'yish uchun DOM tugunlarining ixtiyoriy ro'yxati yoki matn satrlari (ular avtomatik ravishda matn tugunlariga aylanadi).

Ularni amalda ko'rib chiqaylik.

Mana ushbu usullardan foydalanib ro'yxatga elementlar va uning oldidan/orqasidan matn qo'shish misoli:

```html autorun
<ol id="ol">
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ol>

<script>
  ol.before('oldin'); // <ol> dan oldin "oldin" satrini qo'yish
  ol.after('keyin'); // <ol> dan keyin "keyin" satrini qo'yish

  let liFirst = document.createElement('li');
  liFirst.innerHTML = 'prepend';
  ol.prepend(liFirst); // liFirst ni <ol> ning boshiga qo'yish

  let liLast = document.createElement('li');
  liLast.innerHTML = 'append';
  ol.append(liLast); // liLast ni <ol> ning oxiriga qo'yish
</script>
```

Mana usullar nima qilishining vizual tasviri:

![](before-prepend-append-after.svg)

Shunday qilib, yakuniy ro'yxat quyidagicha bo'ladi:

```html
oldin
<ol id="ol">
  <li>prepend</li>
  <li>0</li>
  <li>1</li>
  <li>2</li>
  <li>append</li>
</ol>
keyin
```

Aytganimizdek, bu usullar bir marta chaqiruvda bir nechta tugunlar va matn qismlarini qo'ya oladi.

Masalan, bu yerda satr va element qo'yiladi:

```html run
<div id="div"></div>
<script>
  div.before('<p>Salom</p>', document.createElement('hr'));
</script>
```

E'tibor bering: matn "matn sifatida" qo'yiladi, "HTML sifatida" emas, `<`, `>` kabi belgilar to'g'ri qochib ketiladi.

Shunday qilib, yakuniy HTML:

```html run
*!*
&lt;p&gt;Salom&lt;/p&gt;
*/!*
<hr>
<div id="div"></div>
```

Boshqacha qilib aytganda, satrlar `elem.textContent` kabi xavfsiz tarzda qo'yiladi.

Shunday qilib, bu usullar faqat DOM tugunlari yoki matn qismlarini qo'yish uchun ishlatilishi mumkin.

Ammo agar biz HTML satrni "HTML sifatida" qo'yishni, barcha teglar va narsalar `elem.innerHTML` kabi ishlashini istasak-chi?

## insertAdjacentHTML/Text/Element

Buning uchun biz boshqa, juda ko'p qirrali usuldan foydalanishimiz mumkin: `elem.insertAdjacentHTML(where, html)`.

Birinchi parametr - `elem` ga nisbatan qayerga qo'yishni belgilovchi kod so'zi. Quyidagilardan biri bo'lishi kerak:

- `"beforebegin"` -- `html` ni `elem` dan darhol oldin qo'yish,
- `"afterbegin"` -- `html` ni `elem` ichiga, boshiga qo'yish,
- `"beforeend"` -- `html` ni `elem` ichiga, oxiriga qo'yish,
- `"afterend"` -- `html` ni `elem` dan darhol keyin qo'yish.

Ikkinchi parametr - "HTML sifatida" qo'yiladigan HTML satr.

Masalan:

```html run
<div id="div"></div>
<script>
  div.insertAdjacentHTML('beforebegin', '<p>Salom</p>');
  div.insertAdjacentHTML('afterend', '<p>Xayr</p>');
</script>
```

...Quyidagiga olib keladi:

```html run
<p>Salom</p>
<div id="div"></div>
<p>Xayr</p>
```

Mana sahifaga ixtiyoriy HTML qo'shish usuli.

Mana qo'yish variantlarining tasviri:

![](insert-adjacent.svg)

Biz bu bilan oldingi rasm o'rtasidagi o'xshashlikni osongina seza olamiz. Qo'yish nuqtalari aslida bir xil, lekin bu usul HTML qo'yadi.

Usulning ikkita ukasi bor:

- `elem.insertAdjacentText(where, text)` -- xuddi shunday sintaksis, lekin HTML o'rniga `text` satri "matn sifatida" qo'yiladi,
- `elem.insertAdjacentElement(where, elem)` -- xuddi shunday sintaksis, lekin element qo'yiladi.

Ular asosan sintaksisni "bir xil" qilish uchun mavjud. Amalda ko'pincha faqat `insertAdjacentHTML` ishlatiladi. Chunki elementlar va matn uchun bizda `append/prepend/before/after` usullari bor -- ularni yozish qisqaroq va ular tugunlar/matn qismlarini qo'ya oladi.

Shunday qilib, mana xabar ko'rsatishning muqobil varianti:

```html run
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  document.body.insertAdjacentHTML("afterbegin", `<div class="alert">
    <strong>Salom!</strong> Siz muhim xabarni o'qidingiz.
  </div>`);
</script>
```

## Tugunni olib tashlash

Tugunni olib tashlash uchun `node.remove()` usuli mavjud.

Keling, xabarimizni bir soniyadan keyin yo'qolib ketishini ta'minlaylik:

```html run untrusted
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  let div = document.createElement('div');
  div.className = "alert";
  div.innerHTML = "<strong>Salom!</strong> Siz muhim xabarni o'qidingiz.";

  document.body.append(div);
*!*
  setTimeout(() => div.remove(), 1000);
*/!*
</script>
```

E'tibor bering: agar biz elementni boshqa joyga *ko'chirmoqchi* bo'lsak -- uni eski joydan olib tashlashning hojati yo'q.

**Barcha qo'yish usullari tugunni eski joydan avtomatik ravishda olib tashlaydi.**

Masalan, elementlarni almashtiraylik:

```html run height=50
<div id="first">Birinchi</div>
<div id="second">Ikkinchi</div>
<script>
  // remove ni chaqirishning hojati yo'q
  second.after(first); // #second ni olib, uning orqasiga #first ni qo'y
</script>
```

## Tugunlarni klonlash: cloneNode

Yana bitta shunga o'xshash xabar qanday qo'yish mumkin?

Biz funksiya yasab, kodni u yerga qo'yishimiz mumkin. Ammo muqobil usul mavjud `div` ni *klonlash* va ichidagi matnni o'zgartirish (kerak bo'lsa).

Ba'zan katta elementimiz bo'lsa, bu tezroq va oddiyroq bo'lishi mumkin.

- `elem.cloneNode(true)` chaqiruvi elementning "chuqur" klonini yaratadi -- barcha atributlar va subelementlar bilan. Agar biz `elem.cloneNode(false)` ni chaqirsak, klon bola elementlarsiz yaratiladi.

Xabarni nusxalash misoli:

```html run height="120"
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<div class="alert" id="div">
  <strong>Salom!</strong> Siz muhim xabarni o'qidingiz.
</div>

<script>
*!*
  let div2 = div.cloneNode(true); // xabarni klonlash
  div2.querySelector('strong').innerHTML = 'Xayr!'; // klonni o'zgartirish

  div.after(div2); // mavjud div dan keyin klonni ko'rsatish
*/!*
</script>
```

## DocumentFragment [#document-fragment]

`DocumentFragment` - tugunlar ro'yxatini uzatish uchun o'ram vazifasini bajaradigan maxsus DOM tugun.

Biz unga boshqa tugunlarni qo'sha olamiz, lekin uni biror joyga qo'yganimizda, uning mazmuni qo'yiladi.

Masalan, quyidagi `getListContent` `<li>` elementlari bilan fragment yaratadi, ular keyinroq `<ul>` ga qo'yiladi:

```html run
<ul id="ul"></ul>

<script>
function getListContent() {
  let fragment = new DocumentFragment();

  for(let i=1; i<=3; i++) {
    let li = document.createElement('li');
    li.append(i);
    fragment.append(li);
  }

  return fragment;
}

*!*
ul.append(getListContent()); // (*)
*/!*
</script>
```

E'tibor bering, oxirgi satrda `(*)` biz `DocumentFragment` ni qo'shamiz, lekin u "aralashib ketadi", shuning uchun natija tuzilmasi quyidagicha bo'ladi:

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

`DocumentFragment` kamdan-kam aniq ishlatiladi. Nima uchun tugunlar massivini qaytarish o'rniga maxsus turdagi tugunga qo'shish kerak? Qayta yozilgan misol:

```html run
<ul id="ul"></ul>

<script>
function getListContent() {
  let result = [];

  for(let i=1; i<=3; i++) {
    let li = document.createElement('li');
    li.append(i);
    result.push(li);
  }

  return result;
}

*!*
ul.append(...getListContent()); // append + "..." operatori = do'stlar!
*/!*
</script>
```

Biz `DocumentFragment` ni asosan uning ustida ba'zi tushunchalar borligi sababli eslatamiz, masalan keyinchalik ko'rib chiqadigan [template](info:template-element) elementi.

## Eski uslubdagi qo'yish/olib tashlash usullari

[old]

Tarixiy sabablarga ko'ra mavjud bo'lgan "eski uslubdagi" DOM manipulyatsiya usullari ham mavjud.

Bu usullar haqiqatan ham qadimiy davrlardan keladi. Hozirda ulardan foydalanishning hech qanday sababi yo'q, chunki `append`, `prepend`, `before`, `after`, `remove`, `replaceWith` kabi zamonaviy usullar moslashuvchanroq.

Biz bu usullarni bu yerda sanab o'tishimizning yagona sababi - ularni ko'plab eski skriptlarda uchrashingiz mumkin:

`parentElem.appendChild(node)`
: `node` ni `parentElem` ning oxirgi bolasi sifatida qo'shadi.

    Quyidagi misol `<ol>` ning oxiriga yangi `<li>` qo'shadi:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>

    <script>
      let newLi = document.createElement('li');
      newLi.innerHTML = 'Salom, dunyo!';

      list.appendChild(newLi);
    </script>
    ```

`parentElem.insertBefore(node, nextSibling)`
: `node` ni `parentElem` ichida `nextSibling` dan oldin qo'yadi.

    Quyidagi kod ikkinchi `<li>` dan oldin yangi ro'yxat elementini qo'yadi:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>
    <script>
      let newLi = document.createElement('li');
      newLi.innerHTML = 'Salom, dunyo!';

    *!*
      list.insertBefore(newLi, list.children[1]);
    */!*
    </script>
    ```
    `newLi` ni birinchi element sifatida qo'yish uchun buni qilishimiz mumkin:

    ```js
    list.insertBefore(newLi, list.firstChild);
    ```

`parentElem.replaceChild(node, oldChild)`
: `parentElem` bolalari orasida `oldChild` ni `node` bilan almashtiradi.

`parentElem.removeChild(node)`
: `node` ni `parentElem` dan olib tashlaydi (`node` uning bolasi deb faraz qilib).

    Quyidagi misol `<ol>` dan birinchi `<li>` ni olib tashlaydi:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>

    <script>
      let li = list.firstElementChild;
      list.removeChild(li);
    </script>
    ```

Bu usullarning barchasi qo'yilgan/olib tashlangan tugunni qaytaradi. Boshqacha qilib aytganda, `parentElem.appendChild(node)` `node` ni qaytaradi. Ammo odatda qaytarilgan qiymat ishlatilmaydi, biz shunchaki usulni ishga tushiramiz.

## "document.write" haqida bir so'z

Veb-sahifaga biror narsa qo'shishning yana bir juda qadimiy usuli mavjud: `document.write`.

Sintaksis:

```html run
<p>Sahifaning biror joyida...</p>
*!*
<script>
  document.write('<b>JS dan salom</b>');
</script>
*/!*
<p>Oxiri</p>
```

`document.write(html)` ga chaqiruv `html` ni sahifaga "aynan shu yerda va hozir" yozadi. `html` satri dinamik ravishda yaratilishi mumkin, shuning uchun u qandaydir moslashuvchan. Biz JavaScript dan foydalanib to'liq veb-sahifa yaratib, uni yoza olamiz.

Bu usul DOM, standartlar bo'lmagan davrlardan keladi... Haqiqatan ham eski zamonlar. U hali ham mavjud, chunki undan foydalanuvchi skriptlar bor.

Zamonaviy skriptlarda biz uni kamdan-kam ko'ramiz, quyidagi muhim cheklov sababli:

**`document.write` ga chaqiruv faqat sahifa yuklanayotganda ishlaydi.**

Agar biz uni keyinroq chaqirsak, mavjud hujjat mazmuni o'chiriladi.

Masalan:

```html run
<p>Bir soniyadan keyin ushbu sahifa mazmuni almashtiriladi...</p>
*!*
<script>
  // 1 soniyadan keyin document.write
  // bu sahifa yuklangandan keyin, shuning uchun mavjud kontentni o'chiradi
  setTimeout(() => document.write('<b>...Mana bu bilan.</b>'), 1000);
</script>
*/!*
```

Shunday qilib, u yuqorida ko'rib chiqilgan boshqa DOM usullaridan farqli ravishda "yuklangandan keyin" bosqichida yaroqsiz.

Bu salbiy tomoni.

Ijobiy tomoni ham bor. Texnik jihatdan, `document.write` brauzer kiruvchi HTML ni o'qiyotganda ("tahlil qilayotganda") chaqirilganda va u biror narsa yozganda, brauzer uni xuddi dastlab HTML matnida bo'lgandek qabul qiladi.

Shunday qilib, u juda tez ishlaydi, chunki *DOM o'zgartiruvi* yo'q. U DOM hali qurilmagan vaqtda to'g'ridan-to'g'ri sahifa matniga yozadi.

Shunday qilib, agar bizga HTML ga dinamik ravishda ko'p matn qo'shish kerak bo'lsa va biz sahifa yuklash bosqichidamiz va tezlik muhim bo'lsa, u yordam berishi mumkin. Ammo amalda bu talablar kamdan-kam uchraydi. Va odatda biz bu usulni skriptlarda shunchaki eski bo'lganligi uchun ko'ramiz.

## Xulosa

- Yangi tugunlar yaratish usullari:
    - `document.createElement(tag)` -- berilgan teg bilan element yaratadi,
    - `document.createTextNode(value)` -- matn tugunini yaratadi (kamdan-kam ishlatiladi),
    - `elem.cloneNode(deep)` -- elementni klonlaydi, agar `deep==true` bo'lsa barcha avlodlar bilan.  

- Qo'yish va olib tashlash:
    - `node.append(...nodes or strings)` -- `node` ga, oxiriga qo'yish,
    - `node.prepend(...nodes or strings)` -- `node` ga, boshiga qo'yish,
    - `node.before(...nodes or strings)` –- `node` dan oldin qo'yish,
    - `node.after(...nodes or strings)` –- `node` dan keyin qo'yish,
    - `node.replaceWith(...nodes or strings)` –- `node` ni almashtirish.
    - `node.remove()` –- `node` ni olib tashlash.

    Matn satrlari "matn sifatida" qo'yiladi.

- "Eski uslubdagi" usullar ham mavjud:
    - `parent.appendChild(node)`
    - `parent.insertBefore(node, nextSibling)`
    - `parent.removeChild(node)`
    - `parent.replaceChild(newElem, node)`

    Bu usullarning barchasi `node` ni qaytaradi.

- `html` dagi HTML berilgan bo'lsa, `elem.insertAdjacentHTML(where, html)` uni `where` qiymatiga qarab qo'yadi:
    - `"beforebegin"` -- `html` ni `elem` dan oldin qo'yish,
    - `"afterbegin"` -- `html` ni `elem` ichiga, boshiga qo'yish,
    - `"beforeend"` -- `html` ni `elem` ichiga, oxiriga qo'yish,
    - `"afterend"` -- `html` ni `elem` dan keyin qo'yish.

    Shuningdek, o'xshash usullar `elem.insertAdjacentText` va `elem.insertAdjacentElement` mavjud, ular matn satrlari va elementlarni qo'yadi, lekin ular kamdan-kam ishlatiladi.

- Sahifa yuklanish tugashidan oldin HTML qo'shish uchun:
    - `document.write(html)`

    Sahifa yuklangandan keyin bunday chaqiruv hujjatni o'chiradi. Asosan eski skriptlarda ko'riladi.
