libs:
  - d3
  - domtree

---

# Tanlash va Range

Bu bobda biz hujjatdagi tanlashni, shuningdek `<input>` kabi forma maydonlaridagi tanlashni ko'rib chiqamiz.

JavaScript mavjud tanlashga kirishishi, DOM tugunlarini to'liq yoki qisman tanlashi/tanlamasligini bekor qilishi, tanlangan kontentni hujjatdan olib tashlashi, uni tegga o'rashi va hokazolarni amalga oshirishi mumkin.

Bobning oxiridagi "Xulosa" qismida umumiy vazifalar uchun ba'zi retseptlarni topishingiz mumkin. Balki bu sizning hozirgi ehtiyojlaringizni qondiradi, lekin butun matnni o'qisangiz ko'proq narsalarni olasiz.

Asosiy `Range` va `Selection` obyektlari tushunish oson va keyin ulardan xohlagan narsangizni qildirish uchun hech qanday retseptga ehtiyoj qolmaydi.

## Range

Tanlashning asosiy kontseptsiyasi [Range](https://dom.spec.whatwg.org/#ranges) bo'lib, u asosan bir juft "chegara nuqtalari"dir: range boshlanishi va range tugashi.

`Range` obyekti parametrlarsiz yaratiladi:

```js
let range = new Range();
```

Keyin biz `range.setStart(node, offset)` va `range.setEnd(node, offset)` yordamida tanlash chegaralarini o'rnatishimiz mumkin.

Taxmin qilganingizdek, keyinroq biz `Range` obyektlarini tanlash uchun ishlatamiz, lekin avval bunday bir necha obyektlarni yaratamiz.

### Matnni qisman tanlash

Qiziqarli tomoni shundaki, ikkala usuldagi birinchi argument `node` matn tuguni yoki element tuguni bo'lishi mumkin va ikkinchi argumentning ma'nosi bunga bog'liq.

**Agar `node` matn tuguni bo'lsa, u holda `offset` uning matndagi pozitsiya bo'lishi kerak.**

Masalan, `<p>Hello</p>` elementi berilgan bo'lsa, biz "ll" harflarini o'z ichiga olgan range yaratishimiz mumkin:

```html run
<p id="p">Hello</p>
<script>
  let range = new Range();
  range.setStart(p.firstChild, 2);
  range.setEnd(p.firstChild, 4);
  
  // range ning toString usuli uning kontentini matn sifatida qaytaradi
  console.log(range); // ll
</script>
```

Bu yerda biz `<p>` ning birinchi bolasini olamiz (bu matn tuguni) va uning ichidagi matn pozitsiyalarini belgilaymiz:

![](range-hello-1.svg)

### Element tugunlarini tanlash

**Muqobil ravishda, agar `node` element tuguni bo'lsa, u holda `offset` bola raqami bo'lishi kerak.** 

Bu tugunlarni to'liq o'z ichiga olgan range yaratish uchun qulay, ularning matnining biror joyida to'xtab qolmaslik uchun.

Masalan, bizda yanada murakkab hujjat fragmenti bor:

```html autorun
<p id="p">Example: <i>italic</i> and <b>bold</b></p>
```

Mana uning element va matn tugunlari bilan DOM tuzilishi:

<div class="select-p-domtree"></div>

<script>
let selectPDomtree = {
  "name": "P",
  "nodeType": 1,
  "children": [{
    "name": "#text",
    "nodeType": 3,
    "content": "Example: "
  }, {
    "name": "I",
    "nodeType": 1,
    "children": [{
      "name": "#text",
      "nodeType": 3,
      "content": "italic"
    }]
  }, {
    "name": "#text",
    "nodeType": 3,
    "content": " and "
  }, {
    "name": "B",
    "nodeType": 1,
    "children": [{
      "name": "#text",
      "nodeType": 3,
      "content": "bold"
    }]
  }]
}

drawHtmlTree(selectPDomtree, 'div.select-p-domtree', 690, 320);
</script>

Keling, `"Example: <i>italic</i>"` uchun range yarataylik.

Ko'rib turganimizdek, bu ibora aniq `<p>` ning ikkita bolasidan iborat, indekslari `0` va `1`:

![](range-example-p-0-1.svg)

- Boshlanish nuqtasi `<p>` ni ota `node` sifatida va `0` ni offset sifatida oladi.

    Shuning uchun biz uni `range.setStart(p, 0)` deb o'rnatishimiz mumkin.
- Tugash nuqtasi ham `<p>` ni ota `node` sifatida oladi, lekin `2` ni offset sifatida oladi (u range ni `offset` gacha, lekin uni o'z ichiga olmasdan belgilaydi).

    Shuning uchun biz uni `range.setEnd(p, 2)` deb o'rnatishimiz mumkin.

Mana demo. Agar uni ishga tushirsangiz, matnning tanlanganini ko'rishingiz mumkin:

```html run
<p id="p">Example: <i>italic</i> and <b>bold</b></p>

<script>
*!*
  let range = new Range();

  range.setStart(p, 0);
  range.setEnd(p, 2);
*/!*

  // range ning toString usuli uning kontentini teglar o'chirilgan holda matn sifatida qaytaradi
  console.log(range); // Example: italic

  // bu range ni hujjat tanlashi uchun qo'llang (keyinroq tushuntiriladi)
  document.getSelection().addRange(range);
</script>
```

Bu yerda range boshlanishi/tugashi raqamlarini o'rnatishingiz va boshqa variantlarni o'rganishingiz mumkin bo'lgan yanada moslashuvchan test standidir:

```html run autorun
<p id="p">Example: <i>italic</i> and <b>bold</b></p>

Dan <input id="start" type="number" value=1> – Gacha <input id="end" type="number" value=4>
<button id="button">Tanlash uchun bosing</button>
<script>
  button.onclick = () => {
  *!*
    let range = new Range();

    range.setStart(p, start.value);
    range.setEnd(p, end.value);
  */!*

    // tanlashni qo'llash, keyinroq tushuntiriladi
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(range);
  };
</script>
```

Masalan, bir xil `<p>` da `1` dan `4` gacha offset bilan tanlash bizga `<i>italic</i> and <b>bold</b>` range beradi:

![](range-example-p-1-3.svg)

```smart header="Boshlanish va tugash tugunlari turlicha bo'lishi mumkin"
`setStart` va `setEnd` da bir xil tugunni ishlatishimiz shart emas. Range ko'plab bog'liq bo'lmagan tugunlar bo'ylab cho'zilishi mumkin. Faqat tugash hujjatda boshlanishdan keyin kelishi muhim.
```

### Kattaroq fragmentni tanlash

Misolimizda kattaroq tanlov qilaylik:

![](range-example-p-2-b-3.svg)

Buni qanday qilishni allaqachon bilamiz. Faqat boshlanish va tugashni matn tugunlaridagi nisbiy offset sifatida o'rnatishimiz kerak.

Bizga quyidagicha range yaratish kerak:
- `<p>` birinchi bolasining 2-pozitsiyasidan boshlanadi ("Ex<b>ample:</b> " dan dastlabki ikkita harfni olib tashlab)
- `<b>` birinchi bolasining 3-pozitsiyasida tugaydi ("<b>bol</b>d" dan dastlabki uchta harfni olib, boshqasini olmasdan):

```html run
<p id="p">Example: <i>italic</i> and <b>bold</b></p>

<script>
  let range = new Range();

  range.setStart(p.firstChild, 2);
  range.setEnd(p.querySelector('b').firstChild, 3);

  console.log(range); // ample: italic and bol

  // bu range ni tanlash uchun ishlating (keyinroq tushuntiriladi)
  window.getSelection().addRange(range);
</script>
```

Ko'rib turganimizdek, xohlagan range yaratish juda oson.

Agar tugunlarni to'liq olmoqchi bo'lsak, `setStart/setEnd` ga elementlarni berishimiz mumkin. Aks holda, matn darajasida ishlashimiz mumkin.

## Range xossalari

Yuqoridagi misolda yaratilgan range obyektining quyidagi xossalari bor:

![](range-example-p-2-b-3-range.svg)

- `startContainer`, `startOffset` -- boshlanishning tuguni va offseti,
  - yuqoridagi misolda: `<p>` ichidagi birinchi matn tuguni va `2`.
- `endContainer`, `endOffset` -- tugashning tuguni va offseti,
  - yuqoridagi misolda: `<b>` ichidagi birinchi matn tuguni va `3`.
- `collapsed` -- boolean, agar range bir xil nuqtada boshlanib tugasa `true` (shuning uchun range ichida hech qanday kontent yo'q),
  - yuqoridagi misolda: `false`
- `commonAncestorContainer` -- range ichidagi barcha tugunlarning eng yaqin umumiy ajdodi,
  - yuqoridagi misolda: `<p>`

## Range tanlash usullari

Range larni boshqarish uchun ko'plab qulay usullar mavjud.

Biz allaqachon `setStart` va `setEnd` ni ko'rdik, mana boshqa shunga o'xshash usullar.

Range boshlanishini o'rnatish:

- `setStart(node, offset)` boshlanishni o'rnatish: `node` dagi `offset` pozitsiyasida
- `setStartBefore(node)` boshlanishni o'rnatish: `node` dan darhol oldin
- `setStartAfter(node)` boshlanishni o'rnatish: `node` dan darhol keyin

Range tugashini o'rnatish (shunga o'xshash usullar):

- `setEnd(node, offset)` tugashni o'rnatish: `node` dagi `offset` pozitsiyasida
- `setEndBefore(node)` tugashni o'rnatish: `node` dan darhol oldin
- `setEndAfter(node)` tugashni o'rnatish: `node` dan darhol keyin

Texnik jihatdan, `setStart/setEnd` har qanday narsani qila oladi, lekin ko'proq usullar ko'proq qulaylik beradi.

Barcha bu usullarda `node` ham matn ham element tuguni bo'lishi mumkin: matn tugunlari uchun `offset` shuncha belgilarni o'tkazib yuboradi, element tugunlari uchun esa shuncha bola tugunlarni.

Range yaratishning yana ham ko'p usullari:
- `selectNode(node)` butun `node` ni tanlash uchun range ni o'rnatish
- `selectNodeContents(node)` butun `node` kontentini tanlash uchun range ni o'rnatish
- `collapse(toStart)` agar `toStart=true` bo'lsa end=start o'rnatish, aks holda start=end o'rnatish, shu tariqa range ni yig'ish
- `cloneRange()` bir xil start/end bilan yangi range yaratish

## Range tahrirlash usullari

Range yaratilgandan so'ng, biz uning kontentini quyidagi usullar yordamida boshqarishimiz mumkin:

- `deleteContents()` -- range kontentini hujjatdan olib tashlash
- `extractContents()` -- range kontentini hujjatdan olib tashlash va [DocumentFragment](info:modifying-document#document-fragment) sifatida qaytarish
- `cloneContents()` -- range kontentini nusxalash va [DocumentFragment](info:modifying-document#document-fragment) sifatida qaytarish
- `insertNode(node)` -- `node` ni hujjatga range boshida kiritish
- `surroundContents(node)` -- range kontenti atrofida `node` ni o'rash. Buning ishlashi uchun range o'z ichidagi barcha elementlar uchun ochilish va yopilish teglarini o'z ichiga olishi kerak: `<i>abc` kabi qisman range lar yo'q.

Bu usullar yordamida biz tanlangan tugunlar bilan deyarli har qanday narsani qila olamiz.

Mana ularni amalda ko'rish uchun test standi:

```html run refresh autorun height=260
Tanlashda usullarni ishga tushirish uchun tugmalarni bosing, uni tiklash uchun "resetExample".

<p id="p">Example: <i>italic</i> and <b>bold</b></p>

<p id="result"></p>
<script>
  let range = new Range();

  // Har bir ko'rsatilgan usul bu yerda ifodalangan:
  let methods = {
    deleteContents() {
      range.deleteContents()
    },
    extractContents() {
      let content = range.extractContents();
      result.innerHTML = "";
      result.append("extracted: ", content);
    },
    cloneContents() {
      let content = range.cloneContents();
      result.innerHTML = "";
      result.append("cloned: ", content);
    },
    insertNode() {
      let newNode = document.createElement('u');
      newNode.innerHTML = "NEW NODE";
      range.insertNode(newNode);
    },
    surroundContents() {
      let newNode = document.createElement('u');
      try {
        range.surroundContents(newNode);
      } catch(e) { console.log(e) }
    },
    resetExample() {
      p.innerHTML = `Example: <i>italic</i> and <b>bold</b>`;
      result.innerHTML = "";

      range.setStart(p.firstChild, 2);
      range.setEnd(p.querySelector('b').firstChild, 3);

      window.getSelection().removeAllRanges();  
      window.getSelection().addRange(range);  
    }
  };

  for(let method in methods) {
    document.write(`<div><button onclick="methods.${method}()">${method}</button></div>`);
  }

  methods.resetExample();
</script>
```

Range larni solishtirish usullari ham mavjud, lekin ular kamdan-kam ishlatiladi. Ular kerak bo'lganda, [spec](https://dom.spec.whatwg.org/#interface-range) yoki [MDN qo'llanma](mdn:/api/Range) ga murojaat qiling.

## Selection

`Range` tanlash range larini boshqarish uchun umumiy obyektdir. Garchi, `Range` yaratish ekranda tanlashni ko'rishimizni anglatmaydi.

Biz `Range` obyektlarini yaratishimiz, ularni o'tkazishimiz mumkin -- ular o'z-o'zidan vizual ravishda hech narsani tanlamaydi.

Hujjat tanlashi `Selection` obyekti bilan ifodalanadi, uni `window.getSelection()` yoki `document.getSelection()` sifatida olish mumkin. Tanlash nol yoki ko'proq range larni o'z ichiga olishi mumkin. Hech bo'lmaganda, [Selection API spetsifikatsiyasi](https://www.w3.org/TR/selection-api/) shunday deydi. Amalda esa, faqat Firefox `key:Ctrl+click` (`key:Cmd+click` Mac uchun) yordamida hujjatda bir nechta range larni tanlashga imkon beradi.

Mana Firefox da yaratilgan 3 ta range bilan tanlashning skrinshotı:

![](selection-firefox.svg)

Boshqa brauzerlar maksimal 1 ta range ni qo'llab-quvvatlaydi. Ko'rib turganimizdek, ba'zi `Selection` usullari ko'plab range lar bo'lishi mumkinligini nazarda tutadi, lekin yana, Firefox bundan mustasno barcha brauzerlarda maksimal 1 ta range bor.

Mana joriy tanlashni (biror narsani tanlab, bosing) matn sifatida ko'rsatadigan kichik demo:

<button onclick="alert(document.getSelection())">alert(document.getSelection())</button>

## Selection xossalari

Aytilganidek, tanlash nazariy jihatdan bir nechta range larni o'z ichiga olishi mumkin. Biz bu range obyektlarini quyidagi usul yordamida olishimiz mumkin:

- `getRangeAt(i)` -- i-chi range ni olish, `0` dan boshlab. Firefox bundan mustasno barcha brauzerlarda faqat `0` ishlatiladi.

Shuningdek, ko'pincha yaxshiroq qulaylikni taqdim etadigan xossalar mavjud.

Range ga o'xshab, selection obyekti "langar" deb ataladigan boshlanish va "fokus" deb ataladigan tugashga ega.

Asosiy selection xossalari:

- `anchorNode` -- selection boshlangan tugun,
- `anchorOffset` -- selection boshlangan `anchorNode` dagi offset,
- `focusNode` -- selection tugagan tugun,
- `focusOffset` -- selection tugagan `focusNode` dagi offset,
- `isCollapsed` -- agar selection hech narsani tanlamasa (bo'sh range) yoki mavjud bo'lmasa `true`.
- `rangeCount` -- selection dagi range lar soni, Firefox bundan mustasno barcha brauzerlarda maksimal `1`.

```smart header="Selection tugashi/boshlanishi vs Range"

Selection langar/fokusi bilan `Range` boshlanish/tugashi o'rtasida muhim farqlar bor.

Bilganimizdek, `Range` obyektlari har doim tugashdan oldin boshlanishga ega. 

Selection lar uchun bu har doim ham unday emas.

Sichqoncha bilan biror narsani tanlash ikkala yo'nalishda ham amalga oshirilishi mumkin: "chapdan-o'ngga" yoki "o'ngdan-chapga".

Boshqacha qilib aytganda, sichqoncha tugmasi bosilganda va keyin hujjatda oldinga siljisa, uning tugashi (fokus) boshlanishidan (langar) keyin bo'ladi.

Masalan, agar foydalanuvchi sichqoncha bilan tanlashni boshlasa va "Example" dan "italic" ga o'tsa:

![](selection-direction-forward.svg)

...Lekin bir xil tanlash teskari yo'nalishda ham amalga oshirilishi mumkin: "italic" dan "Example" ga (teskari yo'nalish), keyin uning tugashi (fokus) boshlanishidan (langar) oldin bo'ladi:

![](selection-direction-backward.svg)
```

## Selection hodisalari

Selection ni kuzatib borish uchun hodisalar mavjud:

- `elem.onselectstart` -- tanlash aniq `elem` elementida (yoki uning ichida) *boshlanganda*. Masalan, foydalanuvchi sichqoncha tugmasini ustiga bosib, ko'rsatkichni harakatlantira boshlasa.
    - Standart harakatni oldini olish tanlash boshlanishini bekor qiladi. Shuning uchun bu elementdan tanlashni boshlash imkonsiz bo'ladi, lekin element hali ham tanlanishi mumkin. Tashrif buyuruvchi faqat tanlashni boshqa joydan boshlashi kerak.
- `document.onselectionchange` -- tanlash o'zgarganda yoki boshlanganda.
    - Esda tuting: bu ishlov beruvchi faqat `document` da o'rnatilishi mumkin, u undagi barcha tanlashlarni kuzatadi.

### Selection kuzatuv demosi

Mana kichik demo. U `document` dagi joriy tanlashni kuzatadi va uning chegaralarini ko'rsatadi:

```html run height=80
<p id="p">Meni tanla: <i>italic</i> and <b>bold</b></p>

Dan <input id="from" disabled> – Gacha <input id="to" disabled>
<script>
  document.onselectionchange = function() {
    let selection = document.getSelection();

    let {anchorNode, anchorOffset, focusNode, focusOffset} = selection;

    // anchorNode va focusNode odatda matn tugunlari
    from.value = `${anchorNode?.data}, offset ${anchorOffset}`;
    to.value = `${focusNode?.data}, offset ${focusOffset}`;
  };
</script>
```

### Selection nusxalash demosi

Tanlangan kontentni nusxalashning ikkita yondashuvi mavjud:

1. Uni matn sifatida olish uchun `document.getSelection().toString()` dan foydalanishimiz mumkin.
2. Aks holda, to'liq DOM ni nusxalash uchun, masalan formatlashni saqlashimiz kerak bo'lsa, `getRangesAt(...)` bilan asosiy range larni olishimiz mumkin. `Range` obyekti, o'z navbatida, uning kontentini nusxalaydigan va `DocumentFragment` obyekti sifatida qaytaradigan `cloneContents()` usuliga ega, buni boshqa joyga kiritishimiz mumkin.

Mana tanlangan kontentni ham matn, ham DOM tugunlari sifatida nusxalash demosi:

```html run height=100
<p id="p">Meni tanla: <i>italic</i> and <b>bold</b></p>

Nusxalangan: <span id="cloned"></span>
<br>
Matn sifatida: <span id="astext"></span>

<script>
  document.onselectionchange = function() {
    let selection = document.getSelection();

    cloned.innerHTML = astext.innerHTML = "";

    // Range lardan DOM tugunlarini nusxalash (bu yerda multiselect ni qo'llab-quvvatlaymiz)
    for (let i = 0; i < selection.rangeCount; i++) {
      cloned.append(selection.getRangeAt(i).cloneContents());
    }

    // Matn sifatida olish
    astext.innerHTML += selection;
  };
</script>
```

## Selection usullari

Biz range lar qo'shish/olib tashlash orqali tanlash bilan ishlashimiz mumkin:

- `getRangeAt(i)` -- i-chi range ni olish, `0` dan boshlab. Firefox bundan mustasno barcha brauzerlarda faqat `0` ishlatiladi.
- `addRange(range)` -- tanlashga `range` qo'shish. Agar tanlash allaqachon bog'langan range ga ega bo'lsa, Firefox bundan mustasno barcha brauzerlar chaqiruvni e'tiborsiz qoldiradi.
- `removeRange(range)` -- tanlashdan `range` ni olib tashlash.
- `removeAllRanges()` -- barcha range larni olib tashlash.
- `empty()` -- `removeAllRanges` ning taxallusi.

Oraliq `Range` chaqiruvlarisiz to'g'ridan-to'g'ri tanlash range ni boshqarish uchun qulay usullar ham mavjud:

- `collapse(node, offset)` -- tanlangan range ni berilgan `node` da, `offset` pozitsiyasida boshlanib tugaydigan yangi bilan almashtirish.
- `setPosition(node, offset)` -- `collapse` ning taxallusi.
- `collapseToStart()` - tanlash boshiga yig'ish (bo'sh range bilan almashtirish),
- `collapseToEnd()` - tanlash oxiriga yig'ish,
- `extend(node, offset)` - tanlashning fokusini berilgan `node` ga, `offset` pozitsiyasiga o'tkazish,
- `setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset)` - tanlash range ni berilgan boshlang'ich `anchorNode/anchorOffset` va oxirgi `focusNode/focusOffset` bilan almashtirish. Ular orasidagi barcha kontent tanlanadi.
- `selectAllChildren(node)` -- `node` ning barcha bolalarini tanlash.
- `deleteFromDocument()` -- tanlangan kontentni hujjatdan olib tashlash.
- `containsNode(node, allowPartialContainment = false)` -- tanlash `node` ni o'z ichiga olgan-olmaganligini tekshiradi (ikkinchi argument `true` bo'lsa qisman ham).

Ko'pgina vazifalar uchun bu usullar etarli, asosiy `Range` obyektiga kirish kerak emas.

Masalan, `<p>` paragrafning butun kontentini tanlash:

```html run
<p id="p">Meni tanla: <i>italic</i> and <b>bold</b></p>

<script>
  // <p> ning 0-bolasidan oxirgi bolagacha tanlash
  document.getSelection().setBaseAndExtent(p, 0, p, p.childNodes.length);
</script>
```

Range lar yordamida bir xil narsa:

```html run
<p id="p">Meni tanla: <i>italic</i> and <b>bold</b></p>

<script>
  let range = new Range();
  range.selectNodeContents(p); // yoki <p> tegini ham tanlash uchun selectNode(p)

  document.getSelection().removeAllRanges(); // agar mavjud tanlash bor bo'lsa tozalash
  document.getSelection().addRange(range);
</script>
```

```smart header="Biror narsani tanlash uchun avval mavjud tanlashni olib tashlang"
Agar hujjatda tanlash allaqachon mavjud bo'lsa, avval uni `removeAllRanges()` bilan bo'shating. Va keyin range lar qo'shing. Aks holda, Firefox bundan mustasno barcha brauzerlar yangi range larni e'tiborsiz qoldiradi.

Istisno ba'zi tanlash usullari bo'lib, ular mavjud tanlashni almashtiradi, masalan `setBaseAndExtent`.
```

## Forma boshqaruvlarida tanlash

`input` va `textarea` kabi forma elementlari `Selection` yoki `Range` obyektlarisiz [tanlash uchun maxsus API](https://html.spec.whatwg.org/#textFieldSelection) taqdim etadi. Input qiymati HTML emas, balki sof matn bo'lgani uchun bunday obyektlarga ehtiyoj yo'q, hamma narsa ancha sodda.

Xossalar:
- `input.selectionStart` -- tanlash boshlanish pozitsiyasi (yozish mumkin),
- `input.selectionEnd` -- tanlash tugash pozitsiyasi (yozish mumkin),
- `input.selectionDirection` -- tanlash yo'nalishi, quyidagilardan biri: "forward", "backward" yoki "none" (masalan ikki marta sichqoncha bosish bilan tanlangan bo'lsa),

Hodisalar:
- `input.onselect` -- biror narsa tanlanganida ishga tushadi.

Usullar:

- `input.select()` -- matn boshqaruvida hamma narsani tanlaydi (`input` o'rniga `textarea` bo'lishi mumkin),
- `input.setSelectionRange(start, end, [direction])` -- tanlashni `start` pozitsiyasidan `end` gacha, berilgan yo'nalishda (ixtiyoriy) o'zgartirishadi.
- `input.setRangeText(replacement, [start], [end], [selectionMode])` -- matn oralig'ini yangi matn bilan almashtirish.

    Ixtiyoriy argumentlar `start` va `end`, agar berilgan bo'lsa, oraliq boshlanishi va tugashini belgilaydi, aks holda foydalanuvchi tanlashi ishlatiladi.

    Oxirgi argument, `selectionMode`, matn almashtirilgandan keyin tanlash qanday o'rnatilishini belgilaydi. Mumkin bo'lgan qiymatlar:

    - `"select"` -- yangi kiritilgan matn tanlanadi.
    - `"start"` -- tanlash oralig'i kiritilgan matndan darhol oldin yig'iladi (kursor uning darhol oldida bo'ladi).
    - `"end"` -- tanlash oralig'i kiritilgan matndan darhol keyin yig'iladi (kursor uning darhol keyin bo'ladi).
    - `"preserve"` -- tanlashni saqlashga harakat qiladi. Bu standart.

Endi bu usullarni amalda ko'raylik.

### Misol: tanlashni kuzatish

Masalan, bu kod tanlashni kuzatish uchun `onselect` hodisasidan foydalanadi:

```html run autorun
<textarea id="area" style="width:80%;height:60px">
Bu matndagi tanlash quyidagi qiymatlarni yangilaydi.
</textarea>
<br>
Dan <input id="from" disabled> – Gacha <input id="to" disabled>

<script>
  area.onselect = function() {
    from.value = area.selectionStart;
    to.value = area.selectionEnd;
  };
</script>
```

Esda tuting:
- `onselect` biror narsa tanlanganida ishga tushadi, lekin tanlash olib tashlanganida emas.
- [spec](https://w3c.github.io/selection-api/#dfn-selectionchange) ga ko'ra, forma boshqaruvi ichidagi tanlashlar uchun `document.onselectionchange` hodisasi ishga tushmasligi kerak, chunki u `document` tanlashi va range lari bilan bog'liq emas. Ba'zi brauzerlar uni hosil qiladi, lekin biz unga tayanmasligimiz kerak.

### Misol: kursorni harakatlantirish

Biz `selectionStart` va `selectionEnd` ni o'zgartirishimiz mumkin, bu tanlashni o'rnatadi.

Muhim chegara holati - `selectionStart` va `selectionEnd` bir-biriga teng bo'lganda. U holda bu aniq kursor pozitsiyasidir. Yoki boshqacha qilib aytganda, hech narsa tanlanmaganda, tanlash kursor pozitsiyasida yig'ilgan.

Shunday qilib, `selectionStart` va `selectionEnd` ni bir xil qiymatga o'rnatish orqali kursorni harakatlantiramiz.

Masalan:

```html run autorun
<textarea id="area" style="width:80%;height:60px">
Menga fokuslan, kursor 10-pozitsiyada bo'ladi.
</textarea>

<script>
  area.onfocus = () => {
    // brauzer "focus" harakat tugagandan keyin ishga tushishi uchun nol kechikish setTimeout
    setTimeout(() => {
      // biz har qanday tanlash o'rnatishimiz mumkin
      // agar start=end bo'lsa, kursor aniq o'sha joyda
      area.selectionStart = area.selectionEnd = 10;
    });
  };
</script>
```

### Misol: tanlashni o'zgartirish

Tanlash kontentini o'zgartirish uchun `input.setRangeText()` usulidan foydalanishimiz mumkin. Albatta, biz `selectionStart/End` ni o'qishimiz va tanlash haqida ma'lumot bilan `value` ning tegishli pastki qatorini o'zgartirishimiz mumkin, lekin `setRangeText` kuchliroq va ko'pincha qulayroq.

Bu biroz murakkab usul. Eng oddiy bir argumentli shaklida u foydalanuvchi tanlagan oraliqni almashtiradi va tanlashni olib tashlaydi.

Masalan, bu yerda foydalanuvchi tanlashi `*...*` bilan o'raladi:

```html run autorun
<input id="input" style="width:200px" value="Bu yerdan tanlab tugmani bosing">
<button id="button">Tanlashni yulduzchalar bilan o'rash *...*</button>

<script>
button.onclick = () => {
  if (input.selectionStart == input.selectionEnd) {
    return; // hech narsa tanlanmagan
  }

  let selected = input.value.slice(input.selectionStart, input.selectionEnd);
  input.setRangeText(`*${selected}*`);
};
</script>
```

Ko'proq argumentlar bilan biz `start` va `end` oralig'ini o'rnatishimiz mumkin.

Bu misolda biz input matnida `"BU"` ni topamiz, uni almashtiramiz va almashtirishni tanlangan holda saqlaymiz:

```html run autorun
<input id="input" style="width:200px" value="Matndagi BU so'zni almashtiring">
<button id="button">BU ni almashtirish</button>

<script>
button.onclick = () => {
  let pos = input.value.indexOf("BU");
  if (pos >= 0) {
    input.setRangeText("*BU*", pos, pos + 2, "select");
    input.focus(); // tanlashni ko'rinadigan qilish uchun fokus
  }
};
</script>
```

### Misol: kursor joyiga kiritish

Agar hech narsa tanlanmagan bo'lsa yoki `setRangeText` da teng `start` va `end` ishlatilsa, yangi matn shunchaki kiritiladi, hech narsa olib tashlanmaydi.

`setRangeText` yordamida "kursor joyiga" biror narsani kiritishimiz ham mumkin.

Mana kursor pozitsiyasiga `"SALOM"` kiritadigan va kursorni uning darhol keyin qo'yadigan tugma. Agar tanlash bo'sh bo'lmasa, u almashtiriladi (buni `selectionStart!=selectionEnd` ni solishtirib aniqlashimiz va o'rniga boshqa narsa qilishimiz mumkin):

```html run autorun
<input id="input" style="width:200px" value="Matn Matn Matn Matn Matn">
<button id="button">Kursor joyiga "SALOM" kiritish</button>

<script>
  button.onclick = () => {
    input.setRangeText("SALOM", input.selectionStart, input.selectionEnd, "end");
    input.focus();
  };    
</script>
```

## Tanlab bo'lmasligini ta'minlash

Biror narsani tanlab bo'lmasligi uchun uchta yo'l bor:

1. `user-select: none` CSS xossasidan foydalanish.

    ```html run
    <style>
    #elem {
      user-select: none;
    }
    </style>
    <div>Tanlanuvchi <div id="elem">Tanlanmaydigan</div> Tanlanuvchi</div>
    ```

    Bu tanlashning `elem` da boshlanishiga imkon bermaydi. Lekin foydalanuvchi tanlashni boshqa joydan boshlashi va `elem` ni unga kiritishi mumkin.

    Keyin `elem` `document.getSelection()` ning bir qismiga aylanadi, shuning uchun tanlash haqiqatda sodir bo'ladi, lekin uning kontenti odatda nusxa-joylashtirish da e'tiborga olinmaydi.

2. `onselectstart` yoki `mousedown` hodisalaridagi standart harakatni oldini olish.

    ```html run
    <div>Tanlanuvchi <div id="elem">Tanlanmaydigan</div> Tanlanuvchi</div>

    <script>
      elem.onselectstart = () => false;
    </script>
    ```

    Bu `elem` da tanlashni boshlashga to'sqinlik qiladi, lekin tashrif buyuruvchi uni boshqa elementda boshlashi, keyin `elem` ga kengaytirishi mumkin.

    Bu bir xil harakatda tanlashni ishga tushiradigan boshqa hodisa ishlov beruvchisi bo'lganida qulay (masalan `mousedown`). Shuning uchun biz ziddiyatni oldini olish uchun tanlashni o'chiramiz, lekin `elem` kontentlarini nusxalashga imkon beramiz.

3. Shuningdek, tanlash sodir bo'lgandan keyin `document.getSelection().empty()` bilan uni tozalashimiz mumkin. Bu kamdan-kam ishlatiladi, chunki tanlash paydo bo'lib-yo'qolishi natijasida istalmagan miltillashga sabab bo'ladi.

## Havolalar

- [DOM spec: Range](https://dom.spec.whatwg.org/#ranges)
- [Selection API](https://www.w3.org/TR/selection-api/#dom-globaleventhandlers-onselectstart)
- [HTML spec: APIs for the text control selections](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#textFieldSelection)

## Xulosa

Biz tanlashlar uchun ikkita turli API ni ko'rib chiqdik:

1. Hujjat uchun: `Selection` va `Range` obyektlari.
2. `input`, `textarea` uchun: qo'shimcha usullar va xossalar.

Ikkinchi API juda oddiy, chunki u matn bilan ishlaydi.

Eng ko'p ishlatiladigan retseptlar, ehtimol:

1. Tanlashni olish:
    ```js
    let selection = document.getSelection();

    let cloned = /* tanlangan tugunlarni nusxalash uchun element */;

    // keyin selection.getRangeAt(0) ga Range usullarini qo'llang
    // yoki bu kabi, multi-select ni qo'llab-quvvatlash uchun barcha range larga
    for (let i = 0; i < selection.rangeCount; i++) {
      cloned.append(selection.getRangeAt(i).cloneContents());
    }
    ```
2. Tanlashni o'rnatish:
    ```js
    let selection = document.getSelection();

    // to'g'ridan-to'g'ri:
    selection.setBaseAndExtent(...from...to...);

    // yoki biz range yaratishimiz va:
    selection.removeAllRanges();
    selection.addRange(range);
    ```

Va nihoyat, kursor haqida. `<textarea>` kabi tahrirlash mumkin bo'lgan elementlardagi kursor pozitsiyasi har doim tanlashning boshida yoki oxirida bo'ladi. Biz uni kursor pozitsiyasini olish yoki `elem.selectionStart` va `elem.selectionEnd` ni o'rnatish orqali kursorni harakatlantirish uchun ishlatishimiz mumkin.