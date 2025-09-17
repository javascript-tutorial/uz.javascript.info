# Hodisa delegatsiyasi

Ushlash va bubbling bizga *hodisa delegatsiyasi* deb ataladigan eng kuchli hodisa qayta ishlash shakllaridan birini amalga oshirishga imkon beradi.

G'oya shundaki, agar bizda o'xshash tarzda qayta ishlanadigan ko'plab elementlar bo'lsa, ularning har biriga ishlov beruvchi tayinlash o'rniga -- ularning umumiy ajdodiga bitta ishlov beruvchi qo'yamiz.

Ishlov beruvchida biz `event.target` dan hodisa qayerda sodir bo'lganini bilish va uni qayta ishlash uchun foydalanamiz.

Misolni ko'raylik -- qadimgi Xitoy falsafasini aks ettiruvchi [Ba-Gua diagrammasi](http://en.wikipedia.org/wiki/Ba_gua).

Mana u:

[iframe height=350 src="bagua" edit link]

HTML quyidagicha:

```html
<table>
  <tr>
    <th colspan="3"><em>Bagua</em> jadvali: Yo'nalish, Element, Rang, Ma'no</th>
  </tr>
  <tr>
    <td class="nw"><strong>Shimoli-g'arbiy</strong><br>Metal<br>Kumush<br>Oqsoqollar</td>
    <td class="n">...</td>
    <td class="ne">...</td>
  </tr>
  <tr>...bundan yana 2 ta qator...</tr>
  <tr>...bundan yana 2 ta qator...</tr>
</table>
```

Jadvalda 9 ta katak bor, lekin 99 yoki 9999 ta bo'lishi ham mumkin, farqi yo'q.

**Bizning vazifamiz bosishda `<td>` katakni ajratib ko'rsatishdir.**

Har bir `<td>` ga `onclick` ishlov beruvchi tayinlash o'rniga (ko'p bo'lishi mumkin) -- biz `<table>` elementiga "hammani ushlash" ishlov beruvchisini o'rnatamiz.

U bosilgan elementni olish va uni ajratib ko'rsatish uchun `event.target` dan foydalanadi.

Kod:

```js
let selectedTd;

*!*
table.onclick = function(event) {
  let target = event.target; // bosish qayerda bo'ldi?

  if (target.tagName != 'TD') return; // TD da emas? Demak bizga kerak emas

  highlight(target); // uni ajratib ko'rsat
};
*/!*

function highlight(td) {
  if (selectedTd) { // agar mavjud ajratish bo'lsa, uni olib tashlang
    selectedTd.classList.remove('highlight');
  }
  selectedTd = td;
  selectedTd.classList.add('highlight'); // yangi td ni ajratib ko'rsat
}
```

Bunday kod jadvalda nechta katak borligiga ahamiyat bermaydi. Biz istalgan vaqtda `<td>` ni dinamik ravishda qo'shishimiz/olib tashlashimiz mumkin va ajratish hali ham ishlaydi.

Ammo kamchilik ham bor.

Bosish `<td>` da emas, balki uning ichida sodir bo'lishi mumkin.

Bizning holatda, agar HTML ichiga qarasak, `<td>` ichida `<strong>` kabi ichki teglar borligini ko'rishimiz mumkin:

```html
<td>
*!*
  <strong>Shimoli-g'arbiy</strong>
*/!*
  ...
</td>
```

Tabiiyki, agar bosish o'sha `<strong>` da sodir bo'lsa, u `event.target` qiymati bo'ladi.

![](bagua-bubble.svg)

`table.onclick` ishlov beruvchisida biz bunday `event.target` ni olib, bosish `<td>` ichida bo'ldi yoki yo'qligini aniqlashimiz kerak.

Mana yaxshilangan kod:

```js
table.onclick = function(event) {
  let td = event.target.closest('td'); // (1)

  if (!td) return; // (2)

  if (!table.contains(td)) return; // (3)

  highlight(td); // (4)
};
```

Tushuntirishlar:
1. `elem.closest(selector)` metodi selectorga mos keladigan eng yaqin ajdodni qaytaradi. Bizning holatda biz manba elementdan yuqoriga yo'lda `<td>` ni qidiramiz.
2. Agar `event.target` hech qanday `<td>` ichida bo'lmasa, chaqiruv darhol qaytadi, chunki qiladigan ish yo'q.
3. Ichki jadvallar holatida, `event.target` `<td>` bo'lishi mumkin, lekin joriy jadvaldan tashqarida yotishi mumkin. Shuning uchun bu haqiqatan ham *bizning jadvalimizning* `<td>` ekanligini tekshiramiz.
4. Va agar shunday bo'lsa, uni ajratib ko'rsatamiz.

Natijada bizda tez va samarali ajratish kodi bor, u jadvaldagi `<td>` larning umumiy soniga ahamiyat bermaydi.

## Delegatsiya misoli: markup da harakatlar

Hodisa delegatsiyasining boshqa foydalanish usullari ham bor.

Aytaylik, biz "Saqlash", "Yuklash", "Qidirish" va hokazo tugmalari bilan menyu yaratmoqchimiz. Va `save`, `load`, `search`... metodlariga ega obyekt bor. Ularni qanday moslashtiramiz?

Birinchi g'oya har bir tugmaga alohida ishlov beruvchi tayinlash bo'lishi mumkin. Lekin yanada nafis yechim bor. Biz butun menyu uchun ishlov beruvchi qo'shishimiz va chaqiriladigan metodni ko'rsatuvchi tugmalar uchun `data-action` atributlarini qo'shishimiz mumkin:

```html
<button *!*data-action="save"*/!*>Saqlash uchun bosing</button>
```

Ishlov beruvchi atributni o'qiydi va metodini bajaradi. Ishlayotgan misolni ko'ring:

```html autorun height=60 run untrusted
<div id="menu">
  <button data-action="save">Saqlash</button>
  <button data-action="load">Yuklash</button>
  <button data-action="search">Qidirish</button>
</div>

<script>
  class Menu {
    constructor(elem) {
      this._elem = elem;
      elem.onclick = this.onClick.bind(this); // (*)
    }

    save() {
      alert('saqlash');
    }

    load() {
      alert('yuklash');
    }

    search() {
      alert('qidirish');
    }

    onClick(event) {
*!*
      let action = event.target.dataset.action;
      if (action) {
        this[action]();
      }
*/!*
    };
  }

  new Menu(menu);
</script>
```

Diqqat qiling, `this.onClick` `(*)` da `this` ga bog'langan. Bu muhim, chunki aks holda undagi `this` `Menu` obyekti emas, balki DOM elementini (`elem`) ko'rsatadi va `this[action]` bizga kerak bo'lgan narsa bo'lmaydi.

Xo'sh, delegatsiya bizga bu yerda qanday afzalliklar beradi?

```compare
+ Har bir tugmaga ishlov beruvchi tayinlash uchun kod yozishimiz shart emas. Shunchaki metod yaratib, uni markup ga qo'yamiz.
+ HTML tuzilishi moslashuvchan, biz istalgan vaqtda tugmalarni qo'shishimiz/olib tashlashimiz mumkin.
```

Biz `.action-save`, `.action-load` kabi sinflardan ham foydalanishimiz mumkin edi, lekin `data-action` atributi semantik jihatdan yaxshiroq. Va uni CSS qoidalarida ham ishlatishimiz mumkin.

## "Xatti-harakat" namunasi

Biz hodisa delegatsiyasidan elementlarga maxsus atributlar va sinflar bilan *deklarativ* tarzda "xatti-harakatlar" qo'shish uchun ham foydalanishimiz mumkin.

Namuna ikki qismdan iborat:
1. Biz elementga uning xatti-harakatini tavsiflovchi maxsus atribut qo'shamiz.
2. Hujjat darajasidagi ishlov beruvchi hodisalarni kuzatib turadi va agar hodisa atributli elementda sodir bo'lsa -- harakatni bajaradi.

### Xatti-harakat: Hisoblagich

Masalan, bu yerda `data-counter` atributi tugmalarga "bosishda qiymatni oshirish" xatti-harakatini qo'shadi:

```html run autorun height=60
Hisoblagich: <input type="button" value="1" data-counter>
Yana bir hisoblagich: <input type="button" value="2" data-counter>

<script>
  document.addEventListener('click', function(event) {

    if (event.target.dataset.counter != undefined) { // agar atribut mavjud bo'lsa...
      event.target.value++;
    }

  });
</script>
```

Agar tugmani bossak -- uning qiymati oshadi. Tugmalar emas, balki umumiy yondashuv muhim.

Biz xohlagancha `data-counter` atributiga ega bo'lishimiz mumkin. Biz istalgan vaqtda HTML ga yangisini qo'shishimiz mumkin. Hodisa delegatsiyasidan foydalanib, biz HTML ni "kengaytirdik", yangi xatti-harakatni tavsiflovchi atribut qo'shdik.

```warn header="Hujjat darajasidagi ishlov beruvchilar uchun -- doim `addEventListener`"
`document` obyektiga hodisa ishlov beruvchisini tayinlashda, biz doim `addEventListener` dan foydalanishimiz kerak, `document.on<event>` dan emas, chunki ikkinchisi konfliktlarga olib keladi: yangi ishlov beruvchilar eskisini ustiga yozadi.

Haqiqiy loyihalar uchun `document` da kodning turli qismlari tomonidan o'rnatilgan ko'plab ishlov beruvchilar bo'lishi normal holdir.
```

### Xatti-harakat: Almashtiruvchi

Xatti-harakatning yana bir misoli. `data-toggle-id` atributi bilan elementga bosish berilgan `id` ga ega elementni ko'rsatadi/yashiradi:

```html autorun run height=60
<button *!*data-toggle-id="subscribe-mail"*/!*>
  Obuna formasini ko'rsatish
</button>

<form id="subscribe-mail" hidden>
  Sizning emailingiz: <input type="email">
</form>

<script>
*!*
  document.addEventListener('click', function(event) {
    let id = event.target.dataset.toggleId;
    if (!id) return;

    let elem = document.getElementById(id);

    elem.hidden = !elem.hidden;
  });
*/!*
</script>
```

Yana bir bor ta'kidlaymiz, biz nima qildik. Endi elementga almashtirish funksiyasini qo'shish uchun -- JavaScript bilish shart emas, faqat `data-toggle-id` atributidan foydalaning.

Bu haqiqatan ham qulay bo'lishi mumkin -- har bir bunday element uchun JavaScript yozish shart emas. Shunchaki xatti-harakatdan foydalaning. Hujjat darajasidagi ishlov beruvchi uni sahifaning har qanday elementi uchun ishlashini ta'minlaydi.

Bitta elementda bir nechta xatti-harakatlarni birlashtirish ham mumkin.

"Xatti-harakat" namunasi JavaScript mini-fragmentlariga muqobil bo'lishi mumkin.

## Xulosa

Hodisa delegatsiyasi juda zo'r! Bu DOM hodisalari uchun eng foydali shakllardan biridir.

U ko'pincha ko'plab o'xshash elementlar uchun bir xil qayta ishlashni qo'shish uchun ishlatiladi, lekin faqat buning uchun emas.

Algoritm:

1. Konteynerga bitta ishlov beruvchi qo'ying.
2. Ishlov beruvchida -- manba element `event.target` ni tekshiring.
3. Agar hodisa bizni qiziqtiruvchi element ichida sodir bo'lgan bo'lsa, hodisani qayta ishlang.

Afzalliklari:

```compare
+ Initsializatsiyani soddalashtiradi va xotirani tejaydi: ko'plab ishlov beruvchilarni qo'shish shart emas.
+ Kamroq kod: elementlarni qo'shish yoki olib tashlashda ishlov beruvchilarni qo'shish/olib tashlash shart emas.
+ DOM modifikatsiyalari: biz `innerHTML` va shunga o'xshash narsalar bilan ommaviy ravishda elementlarni qo'shish/olib tashlashimiz mumkin.
```

Delegatsiyaning cheklovlari ham bor, albatta:

```compare
- Birinchidan, hodisa bubbling bo'lishi kerak. Ba'zi hodisalar bubble qilmaydi. Shuningdek, past darajali ishlov beruvchilar `event.stopPropagation()` dan foydalanmasligi kerak.
- Ikkinchidan, delegatsiya CPU yukini qo'shishi mumkin, chunki konteyner darajasidagi ishlov beruvchi konteynerning istalgan joyidagi hodisalarga javob beradi, ular bizni qiziqtirsa ham qiziqtirmasa ham. Lekin odatda yuk ahamiyatsiz, shuning uchun biz uni hisobga olmaymiz.
```