# Shadow DOM uslublash

Shadow DOM ham `<style>` ham `<link rel="stylesheet" href="…">` teglarini o'z ichiga olishi mumkin. Oxirgi holatda uslub jadvallari HTTP keshida saqlanadi, shuning uchun bir xil shablondan foydalanadigan bir nechta komponentlar uchun qayta yuklanmaydi.

Umumiy qoida sifatida, mahalliy uslublar faqat shadow daraxt ichida ishlaydi va hujjat uslublari undan tashqarida ishlaydi. Lekin bir nechta istisnolar mavjud.

## :host

`:host` selektori shadow host (shadow daraxtni o'z ichiga olgan element)ni tanlash imkonini beradi.

Masalan, biz markazlashtirish kerak bo'lgan `<custom-dialog>` elementini yasayapmiz. Buning uchun `<custom-dialog>` elementining o'zini uslublashimiz kerak.

`:host` aynan shuni qiladi:

```html run autorun="no-epub" untrusted height=80
<template id="tmpl">
  <style>
    /* uslub ichkaridan custom-dialog elementiga qo'llaniladi */
    :host {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: inline-block;
      border: 1px solid red;
      padding: 10px;
    }
  </style>
  <slot></slot>
</template>

<script>
customElements.define('custom-dialog', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'}).append(tmpl.content.cloneNode(true));
  }
});
</script>

<custom-dialog>
  Salom!
</custom-dialog>
```

## Kaskadlash

Shadow host (`<custom-dialog>` ning o'zi) light DOM da joylashgan, shuning uchun u hujjat CSS qoidalariga ta'sir qiladi.

Agar xususiyat ham `:host` da mahalliy, ham hujjatda uslublangan bo'lsa, hujjat uslubi ustunlik qiladi.

Masalan, agar hujjatda bizda quyidagi bo'lsa:
```html
<style>
custom-dialog {
  padding: 0;
}
</style>
```
...Unda `<custom-dialog>` padding siz bo'ladi.

Bu juda qulay, chunki biz komponentning "sukut bo'yicha" uslublarini uning `:host` qoidasida o'rnatishimiz va keyin ularni hujjatda osongina bekor qilishimiz mumkin.

Istisno - mahalliy xususiyat `!important` bilan belgilanganida, bunday xususiyatlar uchun mahalliy uslublar ustunlik qiladi.

## :host(selector)

`:host` bilan bir xil, lekin faqat shadow host `selector` ga mos kelganda qo'llaniladi.

Masalan, biz `<custom-dialog>` ni faqat `centered` atributiga ega bo'lganda markazlashtirmoqchimiz:

```html run autorun="no-epub" untrusted height=80
<template id="tmpl">
  <style>
*!*
    :host([centered]) {
*/!*
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-color: blue;
    }

    :host {
      display: inline-block;
      border: 1px solid red;
      padding: 10px;
    }
  </style>
  <slot></slot>
</template>

<script>
customElements.define('custom-dialog', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'}).append(tmpl.content.cloneNode(true));
  }
});
</script>


<custom-dialog centered>
  Markazlashtirilgan!
</custom-dialog>

<custom-dialog>
  Markazlashtirilmagan.
</custom-dialog>
```

Endi qo'shimcha markazlashtirish uslublari faqat birinchi dialogga qo'llaniladi: `<custom-dialog centered>`.

Xulosa qilib aytganda, biz komponentning asosiy elementini uslublash uchun `:host` selektorlar oilasidan foydalanishimiz mumkin. Bu uslublar (`!important` bo'lmasa) hujjat tomonidan bekor qilinishi mumkin.

## Slotlangan kontentni uslublash

Endi slotlar bilan vaziyatni ko'rib chiqaylik.

Slotlangan elementlar light DOM dan keladi, shuning uchun ular hujjat uslublarini ishlatadi. Mahalliy uslublar slotlangan kontentga ta'sir qilmaydi.

Quyidagi misolda slotlangan `<span>` hujjat uslubiga ko'ra qalin, lekin mahalliy uslubdan `background` olmaydi:

```html run autorun="no-epub" untrusted height=80
<style>
*!*
  span { font-weight: bold }
*/!*
</style>

<user-card>
  <div slot="username">*!*<span>Jon Smit</span>*/!*</div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      span { background: red; }
*/!*
      </style>
      Ism: <slot name="username"></slot>
    `;
  }
});
</script>
```

Natija qalin, lekin qizil emas.

Agar biz komponentimizda slotlangan elementlarni uslublashni xohlasak, ikkita tanlov mavjud.

Birinchidan, biz `<slot>` ning o'zini uslublashimiz va CSS merosiga tayanishimiz mumkin:

```html run autorun="no-epub" untrusted height=80
<user-card>
  <div slot="username">*!*<span>Jon Smit</span>*/!*</div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      slot[name="username"] { font-weight: bold; }
*/!*
      </style>
      Ism: <slot name="username"></slot>
    `;
  }
});
</script>
```

Bu yerda `<p>Jon Smit</p>` qalin bo'ladi, chunki `<slot>` va uning mazmuni o'rtasida CSS merosi amal qiladi. Lekin CSS da o'zida barcha xususiyatlar meros qilib olinmaydi.

Boshqa variant `::slotted(selector)` psevdo-klassidan foydalanish. U ikkita shartga asoslanib elementlarni moslashtiradi:

1. Bu light DOM dan kelgan slotlangan element. Slot nomi muhim emas. Faqat har qanday slotlangan element, lekin faqat elementning o'zi, uning bolalari emas.
2. Element `selector` ga mos keladi.

Bizning misolimizda `::slotted(div)` aynan `<div slot="username">` ni tanlaydi, lekin uning bolalarini emas:

```html run autorun="no-epub" untrusted height=80
<user-card>
  <div slot="username">
    <div>Jon Smit</div>
  </div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      ::slotted(div) { border: 1px solid red; }
*/!*
      </style>
      Ism: <slot name="username"></slot>
    `;
  }
});
</script>
```

E'tibor bering, `::slotted` selektor slotga chuqurroq kirib bora olmaydi. Bu selektorlar noto'g'ri:

```css
::slotted(div span) {
  /* bizning slotlangan <div> bunga mos kelmaydi */
}

::slotted(div) p {
  /* light DOM ichiga kira olmaydi */
}
```

Shuningdek, `::slotted` faqat CSS da ishlatilishi mumkin. Biz uni `querySelector` da ishlatib bo'lmaydi.

## Maxsus xususiyatlar bilan CSS hook'lar

Asosiy hujjatdan komponentning ichki elementlarini qanday uslublaymiz?

`:host` kabi selektorlar `<custom-dialog>` elementi yoki `<user-card>` ga qoidalar qo'llaydi, lekin ular ichidagi shadow DOM elementlarini qanday uslublash mumkin?

Hujjatdan shadow DOM uslublariga to'g'ridan-to'g'ri ta'sir qiluvchi selektor yo'q. Lekin biz komponentimiz bilan o'zaro ta'sir qilish uchun metodlarni ta'minlaganingizdek, uni uslublash uchun CSS o'zgaruvchilarini (maxsus CSS xususiyatlari) ta'minlashimiz mumkin.

**Maxsus CSS xususiyatlari barcha darajalarda, ham light ham shadow da mavjud.**

Masalan, shadow DOM da biz maydonlarni uslublash uchun `--user-card-field-color` CSS o'zgaruvchisidan foydalanishimiz mumkin va tashqi hujjat uning qiymatini o'rnatishi mumkin:

```html
<style>
  .field {
    color: var(--user-card-field-color, black);
    /* agar --user-card-field-color aniqlanmagan bo'lsa, qora rangdan foydalaning */
  }
</style>
<div class="field">Ism: <slot name="username"></slot></div>
<div class="field">Tug'ilgan kun: <slot name="birthday"></slot></div>
```

Keyin biz bu xususiyatni `<user-card>` uchun tashqi hujjatda e'lon qilishimiz mumkin:

```css
user-card {
  --user-card-field-color: green;
}
```

Maxsus CSS xususiyatlari shadow DOM ni bosib o'tadi, ular hamma joyda ko'rinadi, shuning uchun ichki `.field` qoidasi undan foydalanadi.

Mana to'liq misol:

```html run autorun="no-epub" untrusted height=80
<style>
*!*
  user-card {
    --user-card-field-color: green;
  }
*/!*
</style>

<template id="tmpl">
  <style>
*!*
    .field {
      color: var(--user-card-field-color, black);
    }
*/!*
  </style>
  <div class="field">Ism: <slot name="username"></slot></div>
  <div class="field">Tug'ilgan kun: <slot name="birthday"></slot></div>
</template>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.append(document.getElementById('tmpl').content.cloneNode(true));
  }
});
</script>

<user-card>
  <span slot="username">Jon Smit</span>
  <span slot="birthday">01.01.2001</span>
</user-card>
```

## Xulosa

Shadow DOM `<style>` yoki `<link rel="stylesheet">` kabi uslublarni o'z ichiga olishi mumkin.

Mahalliy uslublar quyidagilarga ta'sir qilishi mumkin:
- shadow daraxt,
- `:host` va `:host()` psevdo-klasslari bilan shadow host,
- slotlangan elementlar (light DOM dan kelgan), `::slotted(selector)` slotlangan elementlarning o'zini tanlash imkonini beradi, lekin ularning bolalarini emas.

Hujjat uslublari quyidagilarga ta'sir qilishi mumkin:
- shadow host (u tashqi hujjatda yashagani uchun)
- slotlangan elementlar va ularning mazmuni (bu ham tashqi hujjatda)

CSS xususiyatlari zid kelganda, odatda hujjat uslublari ustunlik qiladi, agar xususiyat `!important` deb belgilanmagan bo'lsa. Unda mahalliy uslublar ustunlik qiladi.

CSS maxsus xususiyatlari shadow DOM ni bosib o'tadi. Ular komponentni uslublash uchun "hook" sifatida ishlatiladi:

1. Komponent asosiy elementlarni uslublash uchun maxsus CSS xususiyatidan foydalanadi, masalan `var(--component-name-title, <sukut qiymat>)`.
2. Komponent muallifi bu xususiyatlarni dasturchilar uchun e'lon qiladi, ular boshqa ommaviy komponent metodlari kabi muhim.
3. Dasturchi sarlavhani uslublashni xohlaganda, ular shadow host yoki undan yuqori uchun `--component-name-title` CSS xususiyatini tayinlaydi.
4. Foyda!