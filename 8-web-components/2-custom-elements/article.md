# Custom elementlar

Biz o'z klassimiz bilan tasvirlangan custom HTML elementlarni yaratishimiz mumkin, o'z metodlari va xususiyatlari, hodisalari va boshqalar bilan.

Custom element aniqlangandan so'ng, biz uni o'rnatilgan HTML elementlar bilan teng darajada ishlatishimiz mumkin.

Bu ajoyib, chunki HTML lug'ati boy, lekin cheksiz emas. `<easy-tabs>`, `<sliding-carousel>`, `<beautiful-upload>` elementlari yo'q... Bizga kerak bo'lishi mumkin bo'lgan boshqa har qanday tegni o'ylab ko'ring.

Biz ularni maxsus klass bilan aniqlay olamiz va keyin ular har doim HTML ning bir qismi bo'lgandek ishlatamiz.

Custom elementlarning ikki turi mavjud:

1. **Avtonom custom elementlar** -- "mutlaqo yangi" elementlar, abstrakt `HTMLElement` klassini kengaytiradi.
2. **Moslashtirilgan o'rnatilgan elementlar** -- o'rnatilgan elementlarni kengaytiradi, masalan `HTMLButtonElement` asosidagi moslashtirilgan tugma va boshqalar.

Avval avtonom elementlarni ko'rib chiqamiz, keyin moslashtirilgan o'rnatilganlarga o'tamiz.

Custom element yaratish uchun biz brauzerga u haqida bir nechta tafsilotlarni aytishimiz kerak: uni qanday ko'rsatish kerak, element sahifaga qo'shilganda yoki olib tashlaganda nima qilish kerak va hokazo.

Bu maxsus metodlar bilan klass yaratish orqali amalga oshiriladi. Bu oson, chunki metodlar kam va ularning barchasi ixtiyoriy.

Mana to'liq ro'yxat bilan eskiz:

```js
class MyElement extends HTMLElement {
  constructor() {
    super();
    // element yaratildi
  }

  connectedCallback() {
    // element hujjatga qo'shilganda brauzer bu metodini chaqiradi
    // (agar element qayta-qayta qo'shilsa/olib tashlansa, ko'p marta chaqirilishi mumkin)
  }

  disconnectedCallback() {
    // element hujjatdan olib tashlaganda brauzer bu metodini chaqiradi
    // (agar element qayta-qayta qo'shilsa/olib tashlansa, ko'p marta chaqirilishi mumkin)
  }

  static get observedAttributes() {
    return [/* o'zgarishlarni kuzatish uchun atribut nomlari massivi */];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // yuqorida sanab o'tilgan atributlardan biri o'zgartirilganda chaqiriladi
  }

  adoptedCallback() {
    // element yangi hujjatga ko'chirilganda chaqiriladi
    // (document.adoptNode da sodir bo'ladi, juda kamdan-kam ishlatiladi)
  }

  // boshqa element metodlari va xususiyatlari bo'lishi mumkin
}
```

Shundan so'ng, elementni ro'yxatdan o'tkazishimiz kerak:

```js
// brauzerga <my-element> bizning yangi klassimiz tomonidan xizmat qilinishini bildiring
customElements.define("my-element", MyElement);
```

Endi `<my-element>` tegi bilan har qanday HTML elementlari uchun `MyElement`ning nusxasi yaratiladi va yuqorida aytilgan metodlar chaqiriladi. Shuningdek, biz JavaScript da `document.createElement('my-element')` ni chaqirishimiz mumkin.

```smart header="Custom element nomi tire `-` ni o'z ichiga olishi kerak"
Custom element nomi tire `-`ni o'z ichiga olishi kerak, masalan `my-element` va `super-button` to'g'ri nomlar, lekin `myelement` emas.

Bu o'rnatilgan va custom HTML elementlar o'rtasida nom to'qnashuvlari yo'qligini ta'minlash uchun.
```

## Misol: "time-formatted"

Masalan, HTML da sana/vaqt uchun `<time>` elementi allaqachon mavjud. Lekin u o'zi hech qanday formatlashni qilmaydi.

Keling, vaqtni chiroyli, tilga mos formatda ko'rsatadigan `<time-formatted>` elementini yarataylik:

```html run height=50 autorun="no-epub"
<script>
*!*
class TimeFormatted extends HTMLElement { // (1)
*/!*

  connectedCallback() {
    let date = new Date(this.getAttribute('datetime') || Date.now());

    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }

}

*!*
customElements.define("time-formatted", TimeFormatted); // (2)
*/!*
</script>

<!-- (3) -->
*!*
<time-formatted datetime="2019-12-01"
*/!*
  year="numeric" month="long" day="numeric"
  hour="numeric" minute="numeric" second="numeric"
  time-zone-name="short"
></time-formatted>
```

1. Klassda faqat bitta `connectedCallback()` metodi bor -- `<time-formatted>` elementi sahifaga qo'shilganda (yoki HTML parser uni aniqlayotganda) brauzer uni chaqiradi va chiroyli formatlangan vaqtni ko'rsatish uchun brauzerlarda yaxshi qo'llab-quvvatlanadigan o'rnatilgan [Intl.DateTimeFormat](mdn:/JavaScript/Reference/Global_Objects/DateTimeFormat) ma'lumot formatlovchisidan foydalanadi.
2. Biz yangi elementimizni `customElements.define(tag, class)` orqali ro'yxatdan o'tkazishimiz kerak.
3. Va keyin uni hamma joyda ishlatishimiz mumkin.

```smart header="Custom elementlar yangilanishi"
Agar brauzer `customElements.define` dan oldin `<time-formatted>` elementlarga duch kelsa, bu xato emas. Lekin element hali noma'lum, har qanday nostandart teg kabi.

Bunday "aniqlanmagan" elementlarni CSS selektori `:not(:defined)` bilan shakllantirish mumkin.

`customElement.define` chaqirilganda, ular "yangilanadi": har biri uchun `TimeFormatted` ning yangi nusxasi yaratiladi va `connectedCallback` chaqiriladi. Ular `:defined` bo'ladi.

Custom elementlar haqida ma'lumot olish uchun metodlar mavjud:
- `customElements.get(name)` -- berilgan `name` bilan custom element uchun klassni qaytaradi,
- `customElements.whenDefined(name)` -- berilgan `name` bilan custom element aniqlanganda hal qilinadigan promise qaytaradi (qiymatsiz).
```

```smart header="`connectedCallback` da render qilish, `constructor` da emas"
Yuqoridagi misolda element mazmuni `connectedCallback` da render qilinadi (yaratiladi).

Nima uchun `constructor` da emas?

Sabab oddiy: `constructor` chaqirilganda, hali juda erta. Element yaratilgan, lekin brauzer hali bu bosqichda atributlarni qayta ishlamagan/tayinlamagan: `getAttribute` ga chaqiruvlar `null` qaytaradi. Shuning uchun biz u yerda haqiqatan ham render qila olmaymiz.

Bundan tashqari, agar bu haqida o'ylasangiz, bu ishlash nuqtai nazaridan yaxshiroq -- ishni haqiqatan ham kerak bo'lgunga qadar kechiktirish.

`connectedCallback` element hujjatga qo'shilganda ishga tushadi. Boshqa elementga farzand sifatida qo'shilgandagina emas, balki haqiqatan ham sahifaning bir qismiga aylanganida. Shunday qilib, biz ajratilgan DOM qurish, elementlar yaratish va ularni keyingi foydalanish uchun tayyorlashimiz mumkin. Ular faqat sahifaga kirganda haqiqatan ham render qilinadi.
```

## Atributlarni kuzatish

`<time-formatted>` ning joriy amalga oshirilishida element render qilingandan keyin atributlarning keyingi o'zgarishlari hech qanday ta'sir ko'rsatmaydi. Bu HTML element uchun g'alati. Odatda, `a.href` kabi atributni o'zgartirganimizda, o'zgarish darhol ko'rinadigan bo'lishini kutamiz. Keling, buni tuzataylik.

Biz ularning ro'yxatini `observedAttributes()` statik getter da taqdim etish orqali atributlarni kuzatishimiz mumkin. Bunday atributlar uchun ular o'zgartirilganda `attributeChangedCallback` chaqiriladi. Bu boshqa, ro'yxatga kiritilmagan atributlar uchun ishga tushmaydi (bu ishlash sabablari uchun).

Mana atributlar o'zgartirilganda avtomatik yangilanadigan yangi `<time-formatted>`:

```html run autorun="no-epub" height=50
<script>
class TimeFormatted extends HTMLElement {

*!*
  render() { // (1)
*/!*
    let date = new Date(this.getAttribute('datetime') || Date.now());

    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }

*!*
  connectedCallback() { // (2)
*/!*
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }

*!*
  static get observedAttributes() { // (3)
*/!*
    return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'time-zone-name'];
  }

*!*
  attributeChangedCallback(name, oldValue, newValue) { // (4)
*/!*
    this.render();
  }

}

customElements.define("time-formatted", TimeFormatted);
</script>

<time-formatted id="elem" hour="numeric" minute="numeric" second="numeric"></time-formatted>

<script>
*!*
setInterval(() => elem.setAttribute('datetime', new Date()), 1000); // (5)
*/!*
</script>
```

1. Render mantigi `render()` yordamchi metodiga ko'chirilgan.
2. Element sahifaga kiritilganda uni bir marta chaqiramiz.
3. `observedAttributes()` da sanab o'tilgan atributning o'zgarishi uchun `attributeChangedCallback` ishga tushadi.
4. ...va elementni qayta render qiladi.
5. Oxirida biz osongina jonli taymer yasashimiz mumkin.

## Render qilish tartibi

HTML parser DOM qurganda, elementlar ketma-ket qayta ishlanadi, ota-onalar bolalardan oldin. Masalan, agar bizda `<outer><inner></inner></outer>` bo'lsa, `<outer>` elementi avval yaratiladi va DOM ga ulanadi, keyin `<inner>`.

Bu custom elementlar uchun muhim oqibatlarga olib keladi.

Masalan, agar custom element `connectedCallback` da `innerHTML` ga kirishga harakat qilsa, u hech narsa olmaydi:

```html run height=40
<script>
customElements.define('user-info', class extends HTMLElement {

  connectedCallback() {
*!*
    alert(this.innerHTML); // bo'sh (*)
*/!*
  }

});
</script>

*!*
<user-info>John</user-info>
*/!*
```

Agar uni ishga tushirsangiz, `alert` bo'sh.

Bu aynan shu bosqichda bolalar yo'qligi sababli, DOM tugallanmagan. HTML parser custom element `<user-info>` ni uladi va uning bolalariga o'tishga tayyor, lekin hali yo'q.

Agar biz custom elementga ma'lumot uzatmoqchi bo'lsak, atributlardan foydalanishimiz mumkin. Ular darhol mavjud.

Yoki, agar bizga haqiqatan ham bolalar kerak bo'lsa, nol kechikishli `setTimeout` bilan ularga kirishni kechiktirishimiz mumkin.

Bu ishlaydi:

```html run height=40
<script>
customElements.define('user-info', class extends HTMLElement {

  connectedCallback() {
*!*
    setTimeout(() => alert(this.innerHTML)); // John (*)
*/!*
  }

});
</script>

*!*
<user-info>John</user-info>
*/!*
```

Endi `(*)` satridagi `alert` "John" ni ko'rsatadi, chunki biz uni HTML tahlili tugagandan keyin asinxron ravishda ishga tushiramiz. Agar kerak bo'lsa, bolalarni qayta ishlashimiz va initsializatsiyani tugatishimiz mumkin.

Boshqa tomondan, bu yechim ham mukammal emas. Agar ichki custom elementlar ham o'zlarini initsializatsiya qilish uchun `setTimeout` dan foydalansa, ular navbatga turadilar: tashqi `setTimeout` avval, keyin ichki ishga tushadi.

Shunday qilib, tashqi element ichki elementdan oldin initsializatsiyani tugatadi.

Keling, buni misolda ko'rsataylik:

```html run height=0
<script>
customElements.define('user-info', class extends HTMLElement {
  connectedCallback() {
    alert(`${this.id} connected.`);
    setTimeout(() => alert(`${this.id} initialized.`));
  }
});
</script>

*!*
<user-info id="outer">
  <user-info id="inner"></user-info>
</user-info>
*/!*
```

Chiqish tartibi:

1. outer connected.
2. inner connected.
3. outer initialized.
4. inner initialized.

Tashqi element ichki elementdan `(4)` oldin `(3)` initsializatsiyani tugatishini aniq ko'rishimiz mumkin.

Ichki elementlar tayyor bo'lgandan keyin ishga tushadigan o'rnatilgan callback yo'q. Agar kerak bo'lsa, buni o'zimiz amalga oshirishimiz mumkin. Masalan, ichki elementlar `initialized` kabi hodisalarni jo'natishi mumkin va tashqi elementlar ularni tinglashi va ularga javob berishi mumkin.

## Moslashtirilgan o'rnatilgan elementlar

Biz yaratgan yangi elementlar, masalan `<time-formatted>`, hech qanday bog'liq semantikaga ega emas. Ular qidiruv tizimlariga noma'lum va accessibility qurilmalari ularni boshqara olmaydi.

Lekin bunday narsalar muhim bo'lishi mumkin. Masalan, qidiruv tizimi biz haqiqatan ham vaqt ko'rsatayotganimizni bilishdan manfaatdor bo'ladi. Va agar biz maxsus turdagi tugma yasayotgan bo'lsak, nima uchun mavjud `<button>` funksionalligini qayta ishlatmaymiz?

Biz ularning klasslaridan meros olib o'rnatilgan HTML elementlarni kengaytirishimiz va moslashtira olamiz.

Masalan, tugmalar `HTMLButtonElement` nusxalari, keling, uni asosga olaylik.

1. Klassimiz bilan `HTMLButtonElement` ni kengaytiring:

    ```js
    class HelloButton extends HTMLButtonElement { /* custom element metodlari */ }
    ```

2. Tegni belgilaydigan `customElements.define` ga uchinchi argumentni taqdim eting:
    ```js
    customElements.define('hello-button', HelloButton, *!*{extends: 'button'}*/!*);
    ```    

    Bir xil DOM-klassni baham ko'radigan turli teglar bo'lishi mumkin, shuning uchun `extends` ni belgilash kerak.

3. Oxirida, custom elementimizdan foydalanish uchun oddiy `<button>` tegini kiriting, lekin unga `is="hello-button"` qo'shing:
    ```html
    <button is="hello-button">...</button>
    ```

Mana to'liq misol:

```html run autorun="no-epub"
<script>
// Bosilganda "hello" deb aytadigan tugma
class HelloButton extends HTMLButtonElement {
*!*
  constructor() {
*/!*
    super();
    this.addEventListener('click', () => alert("Hello!"));
  }
}

*!*
customElements.define('hello-button', HelloButton, {extends: 'button'});
*/!*
</script>

*!*
<button is="hello-button">Meni bosing</button>
*/!*

*!*
<button is="hello-button" disabled>O'chirilgan</button>
*/!*
```

Bizning yangi tugmamiz o'rnatilgan tugmani kengaytiradi. Shunday qilib, u bir xil uslublar va `disabled` atributi kabi standart xususiyatlarni saqlaydi.

## Manbalar

- HTML Living Standard: <https://html.spec.whatwg.org/#custom-elements>.
- Muvofiqlik: <https://caniuse.com/#feat=custom-elementsv1>.

## Xulosa

Custom elementlar ikki turdagi bo'lishi mumkin:

1. "Avtonom" -- `HTMLElement` ni kengaytiradigan yangi teglar.

    Ta'rif sxemasi:

    ```js
    class MyElement extends HTMLElement {
      constructor() { super(); /* ... */ }
      connectedCallback() { /* ... */ }
      disconnectedCallback() { /* ... */  }
      static get observedAttributes() { return [/* ... */]; }
      attributeChangedCallback(name, oldValue, newValue) { /* ... */ }
      adoptedCallback() { /* ... */ }
     }
    customElements.define('my-element', MyElement);
    /* <my-element> */
    ```

2. "Moslashtirilgan o'rnatilgan elementlar" -- mavjud elementlarning kengaytmalari.

    Yana bitta `.define` argumenti va HTML da `is="..."` talab qiladi:
    ```js
    class MyButton extends HTMLButtonElement { /*...*/ }
    customElements.define('my-button', MyElement, {extends: 'button'});
    /* <button is="my-button"> */
    ```

Custom elementlar brauzerlar orasida yaxshi qo'llab-quvvatlanadi. Polyfill mavjud <https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs>.