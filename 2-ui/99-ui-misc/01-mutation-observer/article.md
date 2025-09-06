# Mutation observer

`MutationObserver` - bu DOM elementini kuzatuvchi va o'zgarish aniqlanganida callback ishga tushiruvchi ichki obyekt.

Avval sintaksisga qarab, keyin real foydalanish misolini o'rganamiz va bunday narsa qayerda foydali bo'lishi mumkinligini ko'ramiz.

## Sintaksis

`MutationObserver` dan foydalanish oson.

Birinchi, biz callback-funksiya bilan kuzatuvchi yaratamiz:

```js
let observer = new MutationObserver(callback);
```

So'ngra uni DOM tuguniga bog'laymiz:

```js
observer.observe(node, config);
```

`config` - bu "qanday o'zgarishlarga javob berish" haqidagi boolean variantlar bilan obyekt:
- `childList` -- `node` ning bevosita bolalarida o'zgarishlar,
- `subtree` -- `node` ning barcha avlodlarida,
- `attributes` -- `node` ning atributlarida,
- `attributeFilter` -- atribut nomlari massivi, faqat tanlanganlarini kuzatish uchun.
- `characterData` -- `node.data` ni (matn mazmuni) kuzatish kerakmi,

Boshqa variantlar:
- `attributeOldValue` -- agar `true` bo'lsa, atributning eski va yangi qiymatini callback ga uzatadi (quyida ko'ring), aks holda faqat yangisini (`attributes` varianti kerak),
- `characterDataOldValue` -- agar `true` bo'lsa, `node.data` ning eski va yangi qiymatini callback ga uzatadi (quyida ko'ring), aks holda faqat yangisini (`characterData` varianti kerak).

Keyin har qanday o'zgarishlardan so'ng `callback` bajariladi: o'zgarishlar birinchi argumentda [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) obyektlari ro'yxati sifatida, kuzatuvchining o'zi ikkinchi argument sifatida uzatiladi.

[MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) obyektlari quyidagi xususiyatlarga ega:

- `type` -- mutatsiya turi, quyidagilardan biri:
    - `"attributes"`: atribut o'zgartirildi
    - `"characterData"`: ma'lumot o'zgartirildi, matn tugunlari uchun ishlatiladi,
    - `"childList"`: bola elementlar qo'shildi/o'chirildi,
- `target` -- o'zgarish qayerda sodir bo'ldi: `"attributes"` uchun element, `"characterData"` uchun matn tuguni yoki `"childList"` mutatsiyasi uchun element,
- `addedNodes/removedNodes` -- qo'shilgan/o'chirilgan tugunlar,
- `previousSibling/nextSibling` -- qo'shilgan/o'chirilgan tugunlarning oldingi va keyingi qo'shnilari,
- `attributeName/attributeNamespace` -- o'zgartirilgan atributning nomi/nomlar maydoni (XML uchun),
- `oldValue` -- oldingi qiymat, faqat atribut yoki matn o'zgarishlari uchun, agar mos variant o'rnatilgan bo'lsa `attributeOldValue`/`characterDataOldValue`.

Masalan, mana `contentEditable` atributli `<div>`. Bu atribut bizga unga e'tibor qaratish va tahrirlash imkonini beradi.

```html run
<div contentEditable id="elem">Bosing va <b>tahrirlang</b>, iltimos</div>

<script>
let observer = new MutationObserver(mutationRecords => {
  console.log(mutationRecords); // console.log(o'zgarishlar)
});

// atributlardan tashqari hammani kuzat
observer.observe(elem, {
  childList: true, // bevosita bolalarni kuzat
  subtree: true, // pastki avlodlarni ham
  characterDataOldValue: true // eski ma'lumotni callback ga uzat
});
</script>
```

Agar biz bu kodni brauzerda ishga tushirib, berilgan `<div>` ga e'tibor qaratib, `<b>tahrirlang</b>` ichidagi matnni o'zgartirsak, `console.log` bitta mutatsiyani ko'rsatadi:

```js
mutationRecords = [{
  type: "characterData",
  oldValue: "tahrirlang",
  target: <text node>,
  // boshqa xususiyatlar bo'sh
}];
```

Agar biz murakkabroq tahrirlash operatsiyalarini bajarsak, masalan `<b>tahrirlang</b>` ni o'chirsak, mutatsiya hodisasi bir nechta mutatsiya yozuvlarini o'z ichiga olishi mumkin:

```js
mutationRecords = [{
  type: "childList",
  target: <div#elem>,
  removedNodes: [<b>],
  nextSibling: <text node>,
  previousSibling: <text node>
  // boshqa xususiyatlar bo'sh
}, {
  type: "characterData"
  target: <text node>
  // ...mutatsiya tafsilotlari brauzerning bunday o'chirishni qanday hal qilishiga bog'liq
  // u ikki qo'shni matn tugunlarini "tahrirlang " va ", iltimos" ni bitta tugunga birlashtirishi mumkin
  // yoki ularni alohida matn tugunlari sifatida qoldirishi mumkin
}];
```

Demak, `MutationObserver` DOM pastdaraxtidagi har qanday o'zgarishlarga javob berish imkonini beradi.

## Integratsiya uchun foydalanish

Bunday narsa qachon foydali bo'lishi mumkin?

Foydali funksiyani o'z ichiga olgan, lekin ayni paytda keraksiz narsalarni, masalan reklamalarni `<div class="ads">Keraksiz reklamalar</div>` ko'rsatadigan uchinchi tomon skriptini qo'shishingiz kerak bo'lgan vaziyatni tasavvur qiling.

Tabiiyki, uchinchi tomon skripti uni o'chirish uchun hech qanday mexanizm bermaydi.

`MutationObserver` dan foydalanib, keraksiz element bizning DOM da paydo bo'lganini aniqlab, uni o'chirishimiz mumkin.

Uchinchi tomon skripti bizning hujjatimizga biror narsa qo'shadigan va biz buni aniqlamoqchi bo'lgan, sahifamizni moslashtiramiz, dinamik ravishda biror narsani o'lchamini o'zgartiramiz va hokazolar qiladigan boshqa vaziyatlar ham bor.

`MutationObserver` buni amalga oshirish imkonini beradi.

## Arxitektura uchun foydalanish

`MutationObserver` arxitektura nuqtayi nazaridan yaxshi bo'lgan vaziyatlar ham bor.

Aytaylik, biz dasturlash haqida veb-sayt yaratyapmiz. Tabiiyki, maqolalar va boshqa materiallar kod qisqichlarini o'z ichiga olishi mumkin.

HTML belgilashda bunday qisqich quyidagicha ko'rinadi:

```html
...
<pre class="language-javascript"><code>
  // mana kod
  let hello = "world";
</code></pre>
...
```

Yaxshiroq o'qilishi va ayni paytda uni chiroylashtiramiz uchun saytimizda JavaScript sintaksis ta'kidlash kutubxonasidan, masalan [Prism.js](https://prismjs.com/) dan foydalanamiz. Yuqoridagi qisqich uchun Prism da sintaksis ta'kidlashni olish uchun `Prism.highlightElem(pre)` chaqiriladi, bu bunday `pre` elementlarining mazmunini tekshiradi va rangli sintaksis ta'kidlash uchun maxsus teglar va stillarni qo'shadi, xuddi bu sahifadagi misollarda ko'rganingizdek.

Aynan qachon bu ta'kidlash usulini ishga tushirishimiz kerak? Biz buni `DOMContentLoaded` hodisasida qilishimiz yoki skriptni sahifaning pastki qismiga qo'yishimiz mumkin. DOM tayyor bo'lgan paytda biz `pre[class*="language"]` elementlarini qidiribo, ularga `Prism.highlightElem` chaqirishimiz mumkin:

```js
// sahifadagi barcha kod qisqichlarini ta'kidlash
document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElem);
```

Hozircha hammasi oddiy, shunday emasmi? Biz HTML da kod qisqichlarini topamiz va ularni ta'kidlaymiz.

Endi davom etaylik. Aytaylik, biz serverdan dinamik ravishda materiallarni yuklamoqchimiz. Buning usullarini keyinroq o'rganamiz. Hozir faqat veb-serverdan HTML maqola yuklab, uni talab bo'yicha ko'rsatishimiz muhim:

```js
let article = /* serverdan yangi kontent yuklash */
articleElem.innerHTML = article;
```

Yangi `article` HTML kod qisqichlarini o'z ichiga olishi mumkin. Ularga `Prism.highlightElem` chaqirishimiz kerak, aks holda ular ta'kidlanmaydi.

**Dinamik yuklangan maqola uchun `Prism.highlightElem` ni qayerda va qachon chaqirish kerak?**

Biz bu chaqiruvni maqola yuklaydigan kodga qo'shishimiz mumkin:

```js
let article = /* serverdan yangi kontent yuklash */
articleElem.innerHTML = article;

let snippets = articleElem.querySelectorAll('pre[class*="language-"]');
snippets.forEach(Prism.highlightElem);
```

...Lekin tasavvur qiling, kodda kontent yuklaydigan ko'p joylar bor - maqolalar, viktorinalar, forum postlari va hokazo. Ta'kidlash chaqiruvini har yerga qo'yishimiz kerakmi, yuklagandan keyin kontentdagi kodni ta'kidlash uchun? Bu unchalik qulay emas.

Va agar kontent uchinchi tomon moduli tomonidan yuklanayotgan bo'lsa-chi? Masalan, bizda kimdir tomonidan yozilgan, kontentni dinamik yuklaydigaan forum bor va biz unga sintaksis ta'kidlashni qo'shmoqchimiz. Hech kim uchinchi tomon skriptlarini yamoqlashni yoqtirmaydi.

Yaxshiyamki, boshqa variant bor.

Biz kod qisqichlari sahifaga qo'shilganini avtomatik aniqlash va ularni ta'kidlash uchun `MutationObserver` dan foydalanishimiz mumkin.

Shunday qilib biz ta'kidlash funksiyasini bir joyda boshqaramiz, uni integratsiya qilish ehtiyojidan xalos bo'lamiz.

### Dinamik ta'kidlash namoyishi

Mana ishlaydigan misol.

Agar siz bu kodni ishga tushirsangiz, u quyidagi elementni kuzata boshlaydi va u yerda paydo bo'ladigan har qanday kod qisqichlarini ta'kidlaydi:

```js run
let observer = new MutationObserver(mutations => {

  for(let mutation of mutations) {
    // yangi tugunlarni tekshir, ta'kidlanadigan narsa bormi?

    for(let node of mutation.addedNodes) {
      // faqat elementlarni kuzatamiz, boshqa tugunlarni (masalan matn tugunlarini) o'tkazib yuboramiz
      if (!(node instanceof HTMLElement)) continue;

      // qo'shilgan elementni kod qisqichi ekanligini tekshir
      if (node.matches('pre[class*="language-"]')) {
        Prism.highlightElement(node);
      }

      // yoki uning pastdaraxtida kod qisqichi bormi?
      for(let elem of node.querySelectorAll('pre[class*="language-"]')) {
        Prism.highlightElement(elem);
      }
    }
  }

});

let demoElem = document.getElementById('highlight-demo');

observer.observe(demoElem, {childList: true, subtree: true});
```

Bu yerda, pastda HTML-element va uni `innerHTML` yordamida dinamik to'ldiradigan JavaScript bor.

Iltimos, oldingi kodni ishga tushiring (yuqorida, u elementni kuzatadi), keyin quyidagi kodni. `MutationObserver` qisqichni qanday aniqlab, ta'kidlashini ko'rasiz.

Quyidagi kod uning `innerHTML` ni to'ldiradi, bu `MutationObserver` ning javob berishiga va mazmunini ta'kidlashiga sabab bo'ladi:

```js run
let demoElem = document.getElementById('highlight-demo');

// kod qisqichlari bilan kontentni dinamik qo'shish
demoElem.innerHTML = `Quyida kod qisqichi bor:
  <pre class="language-javascript"><code> let hello = "world!"; </code></pre>
  <div>Yana biri:</div>
  <div>
    <pre class="language-css"><code>.class { margin: 5px; } </code></pre>
  </div>
`;
```

Endi bizda kuzatiladigan elementlar yoki butun `document` da barcha ta'kidlashlarni kuzata oladigan `MutationObserver` bor. Biz bu haqida o'ylamasdan HTML da kod qisqichlarini qo'shish/o'chirish mumkin.

## Qo'shimcha usullar

Tugunni kuzatishni to'xtatish usuli mavjud:

- `observer.disconnect()` -- kuzatishni to'xtatadi.

Kuzatishni to'xtatganimizda, ba'zi o'zgarishlar hali kuzatuvchi tomonidan qayta ishlanmagan bo'lishi mumkin. Bunday hollarda biz quyidagini ishlatamiz:

- `observer.takeRecords()` -- qayta ishlanmagan mutatsiya yozuvlari ro'yxatini oladi - sodir bo'lgan, lekin callback ularni hal qilmagan.

Bu usullarni birgalikda ishlatish mumkin:

```js
// qayta ishlanmagan mutatsiyalar ro'yxatini olish
// uzishdan oldin chaqirilishi kerak,
// agar yaqinda hal qilinmagan mutatsiyalar haqida qayg'ursangiz
let mutationRecords = observer.takeRecords();

// o'zgarishlarni kuzatishni to'xtat
observer.disconnect();
...
```

**`observer.takeRecords()` tomonidan qaytarilgan yozuvlar qayta ishlash navbatidan o'chiriladi**
**Callback `observer.takeRecords()` tomonidan qaytarilgan yozuvlar uchun chaqirilmaydi.**

**Axlat yig'ish bilan o'zaro ta'sir**
**Kuzatuvchilar ichkarida tugunlarga zaif havolalardan foydalanadi. Ya'ni, agar tugun DOM dan o'chirilsa va erishib bo'lmaydigan bo'lsa, u axlat yig'ilishi mumkin.**

**DOM tuguni kuzatilayotgani axlat yig'ishning oldini olmaydi.**

## Xulosa

`MutationObserver` DOM dagi o'zgarishlarga javob bera oladi - atributlar, matn mazmuni va elementlar qo'shish/o'chirish.

Biz uni kodimizning boshqa qismlari tomonidan kiritilgan o'zgarishlarni kuzatish, shuningdek uchinchi tomon skriptlari bilan integratsiya qilish uchun ishlatishimiz mumkin.

`MutationObserver` har qanday o'zgarishlarni kuzata oladi. "Nimani kuzatish" konfiguratsiya variantlari keraksiz callback chaqiruvlariga resurs sarflamaslik uchun optimallashtirishlar uchun ishlatiladi.