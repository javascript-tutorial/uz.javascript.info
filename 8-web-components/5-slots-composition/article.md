# Shadow DOM slotlar, kompozitsiya

Ko'plab komponent turlari, masalan tablar, menyular, rasm galereyalari va boshqalar, render qilish uchun kontentga muhtoj.

Xuddi o'rnatilgan brauzer `<select>` elementi `<option>` elementlarini kutganidek, bizning `<custom-tabs>` ham haqiqiy tab kontentini qabul qilishi mumkin. Va `<custom-menu>` menyu elementlarini kutishi mumkin.

`<custom-menu>`dan foydalanadigan kod quyidagicha ko'rinishi mumkin:

```html
<custom-menu>
  <title>Shirinlik menyusi</title>
  <item>Lolipop</item>
  <item>Mevali tost</item>
  <item>Kek</item>
</custom-menu>
```

...Keyin bizning komponentimiz uni to'g'ri render qilishi kerak, berilgan sarlavha va elementlar bilan chiroyli menyu sifatida, menyu hodisalarini boshqarishi va hokazo.

Buni qanday amalga oshirish mumkin?

Biz element kontentini tahlil qilishga va DOM tugunlarini dinamik ravishda nusxalash-qayta tartibga solishga harakat qilishimiz mumkin. Bu mumkin, lekin agar biz elementlarni shadow DOM ga ko'chirayotgan bo'lsak, unda hujjatdan CSS uslublari u yerda qo'llanilmaydi, shuning uchun vizual uslub yo'qolishi mumkin. Shuningdek, bu biroz kodlashni talab qiladi.

Yaxshiyamki, bizga buni qilish shart emas. Shadow DOM `<slot>` elementlarini qo'llab-quvvatlaydi, ular light DOM dan kontent bilan avtomatik to'ldiriladi.

## Nomlangan slotlar

Slotlar qanday ishlashini oddiy misolda ko'raylik.

Bu yerda `<user-card>` shadow DOM ikki slot taqdim etadi, light DOM dan to'ldiriladi:

```html run autorun="no-epub" untrusted height=80
<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <div>Ism:
*!*
        <slot name="username"></slot>
*/!*
      </div>
      <div>Tug'ilgan kun:
*!*
        <slot name="birthday"></slot>
*/!*
      </div>
    `;
  }
});
</script>

<user-card>
  <span *!*slot="username"*/!*>Jon Smit</span>
  <span *!*slot="birthday"*/!*>01.01.2001</span>
</user-card>
```

Shadow DOM da `<slot name="X">` "kiritish nuqtasi"ni belgilaydi, `slot="X"` bo'lgan elementlar render qilinadigan joy.

Keyin brauzer "kompozitsiya" amalga oshiradi: u light DOM dan elementlarni oladi va ularni shadow DOM ning tegishli slotlarida render qiladi. Oxirida biz aynan xohlagan narsaga ega bo'lamiz -- ma'lumotlar bilan to'ldirilishi mumkin bo'lgan komponent.

Mana kompozitsiyani hisobga olmasdan skriptdan keyingi DOM tuzilmasi:

```html
<user-card>
  #shadow-root
    <div>Ism:
      <slot name="username"></slot>
    </div>
    <div>Tug'ilgan kun:
      <slot name="birthday"></slot>
    </div>
  <span slot="username">Jon Smit</span>
  <span slot="birthday">01.01.2001</span>
</user-card>
```

Biz shadow DOM yaratdik, demak u `#shadow-root` ostida. Endi elementda ham light, ham shadow DOM bor.

Render qilish maqsadlari uchun shadow DOM dagi har bir `<slot name="...">` uchun brauzer light DOM da bir xil nomga ega `slot="..."` ni qidiradi. Bu elementlar slotlar ichida render qilinadi:

![](shadow-dom-user-card.svg)

Natija "tekislangan" DOM deb ataladi:

```html
<user-card>
  #shadow-root
    <div>Ism:
      <slot name="username">
        <!-- slotlangan element slot ichiga kiritiladi -->
        <span slot="username">Jon Smit</span>
      </slot>
    </div>
    <div>Tug'ilgan kun:
      <slot name="birthday">
        <span slot="birthday">01.01.2001</span>
      </slot>
    </div>
</user-card>
```

...Lekin tekislangan DOM faqat render qilish va hodisalarni boshqarish maqsadlari uchun mavjud. Bu bir navi "virtual". Narsalar shunday ko'rsatiladi. Lekin hujjatdagi tugunlar aslida harakatlantirilmaydi!

Buni agar `querySelectorAll` ni ishga tushirsak, osongina tekshirish mumkin: tugunlar hali ham o'z joylarida:

```js
// light DOM <span> tugunlari hali ham bir xil joyda, `<user-card>` ostida
alert( document.querySelectorAll('user-card span').length ); // 2
```

Shunday qilib, tekislangan DOM slotlarni kiritish orqali shadow DOM dan olinadi. Brauzer uni render qiladi va uslub merosi, hodisalar tarqalishi uchun ishlatadi (bu haqda keyinroq). Lekin JavaScript hali ham hujjatni "bor hol"da, tekislashdan oldin ko'radi.

````warn header="Faqat yuqori darajadagi bolalar slot=\"...\" atributiga ega bo'lishi mumkin"
`slot="..."` atributi faqat shadow host ning bevosita bolalari uchun to'g'ri (bizning misolimizda `<user-card>` elementi). Ichki joylashgan elementlar uchun u e'tiborga olinmaydi.

Masalan, bu yerdagi ikkinchi `<span>` e'tiborga olinmaydi (`<user-card>` ning yuqori darajadagi bolasi emas):
```html
<user-card>
  <span slot="username">Jon Smit</span>
  <div>
    <!-- noto'g'ri slot, user-card ning bevosita bolasi bo'lishi kerak -->
    <span slot="birthday">01.01.2001</span>
  </div>
</user-card>
```
````

Agar light DOM da bir xil slot nomiga ega bir nechta element bo'lsa, ular slotga birin-ketin qo'shiladi.

Masalan, bu:
```html
<user-card>
  <span slot="username">Jon</span>
  <span slot="username">Smit</span>
</user-card>
```

`<slot name="username">` da ikki element bilan bunday tekislangan DOM ni beradi:

```html
<user-card>
  #shadow-root
    <div>Ism:
      <slot name="username">
        <span slot="username">Jon</span>
        <span slot="username">Smit</span>
      </slot>
    </div>
    <div>Tug'ilgan kun:
      <slot name="birthday"></slot>
    </div>
</user-card>
```

## Slot zaxira kontenti

Agar biz `<slot>` ichiga biror narsa qo'ysak, u zaxira, "sukut bo'yicha" kontent bo'ladi. Brauzer light DOM da tegishli to'ldiruvchi bo'lmasa, uni ko'rsatadi.

Masalan, shadow DOM ning ushbu qismida, agar light DOM da `slot="username"` bo'lmasa, `Anonim` render qilinadi.

```html
<div>Ism:
  <slot name="username">Anonim</slot>
</div>
```

## Sukut bo'yicha slot: birinchi nomsiz

Shadow DOM dagi nomi bo'lmagan birinchi `<slot>` "sukut bo'yicha" slot hisoblanadi. U light DOM dan boshqa joyga slotlanmagan barcha tugunlarni oladi.

Masalan, keling, foydalanuvchi haqida barcha slotlanmagan ma'lumotlarni ko'rsatadigan sukut bo'yicha slotni `<user-card>` ga qo'shaylik:

```html run autorun="no-epub" untrusted height=140
<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
    <div>Ism:
      <slot name="username"></slot>
    </div>
    <div>Tug'ilgan kun:
      <slot name="birthday"></slot>
    </div>
    <fieldset>
      <legend>Boshqa ma'lumotlar</legend>
*!*
      <slot></slot>
*/!*
    </fieldset>
    `;
  }
});
</script>

<user-card>
*!*
  <div>Men suzishni yaxshi ko'raman.</div>
*/!*
  <span slot="username">Jon Smit</span>
  <span slot="birthday">01.01.2001</span>
*!*
  <div>...Va voleybol o'ynashni ham!</div>
*/!*
</user-card>
```

Barcha slotlanmagan light DOM kontenti "Boshqa ma'lumotlar" fieldset ichiga tushadi.

Elementlar slotga birin-ketin qo'shiladi, shuning uchun ikkala slotlanmagan ma'lumot bo'lagi sukut bo'yicha slotda birga bo'ladi.

Tekislangan DOM quyidagicha ko'rinadi:

```html
<user-card>
  #shadow-root
    <div>Ism:
      <slot name="username">
        <span slot="username">Jon Smit</span>
      </slot>
    </div>
    <div>Tug'ilgan kun:
      <slot name="birthday">
        <span slot="birthday">01.01.2001</span>
      </slot>
    </div>
    <fieldset>
      <legend>Boshqa ma'lumotlar</legend>
*!*
      <slot>
        <div>Men suzishni yaxshi ko'raman.</div>
        <div>...Va voleybol o'ynashni ham!</div>
      </slot>
*/!*
    </fieldset>
</user-card>
```

## Menyu misoli

Endi bob boshida tilga olingan `<custom-menu>` ga qaytaylik.

Biz elementlarni taqsimlash uchun slotlardan foydalanishimiz mumkin.

Mana `<custom-menu>` uchun markup:

```html
<custom-menu>
  <span slot="title">Shirinlik menyusi</span>
  <li slot="item">Lolipop</li>
  <li slot="item">Mevali tost</li>
  <li slot="item">Kek</li>
</custom-menu>
```

To'g'ri slotlar bilan shadow DOM shabloni:

```html
<template id="tmpl">
  <style> /* menyu uslublari */ </style>
  <div class="menu">
    <slot name="title"></slot>
    <ul><slot name="item"></slot></ul>
  </div>
</template>
```

1. `<span slot="title">` `<slot name="title">` ga boradi.
2. Shablonda ko'plab `<li slot="item">` bor, lekin shablonda faqat bitta `<slot name="item">`. Shuning uchun barcha bunday `<li slot="item">` lar `<slot name="item">` ga birin-ketin qo'shiladi va shunday qilib ro'yxat hosil bo'ladi.

Tekislangan DOM quyidagicha bo'ladi:

```html
<custom-menu>
  #shadow-root
    <style> /* menyu uslublari */ </style>
    <div class="menu">
      <slot name="title">
        <span slot="title">Shirinlik menyusi</span>
      </slot>
      <ul>
        <slot name="item">
          <li slot="item">Lolipop</li>
          <li slot="item">Mevali tost</li>
          <li slot="item">Kek</li>
        </slot>
      </ul>
    </div>
</custom-menu>
```

To'g'ri DOM da `<li>` `<ul>` ning bevosita bolasi bo'lishi kerakligini payqash mumkin. Lekin bu tekislangan DOM, u komponent qanday render qilinishini tasvirlaydi, bunday narsa bu yerda tabiiy ravishda sodir bo'ladi.

Biz faqat ro'yxatni ochish/yopish uchun `click` ishlovchisini qo'shishimiz kerak va `<custom-menu>` tayyor:

```js
customElements.define('custom-menu', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});

    // tmpl shadow DOM shabloni (yuqorida)
    this.shadowRoot.append( tmpl.content.cloneNode(true) );

    // biz light DOM tugunlarini tanlay olmaymiz, shuning uchun slotdagi bosishlarni boshqaraylik
    this.shadowRoot.querySelector('slot[name="title"]').onclick = () => {
      // menyuni ochish/yopish
      this.shadowRoot.querySelector('.menu').classList.toggle('closed');
    };
  }
});
```

Mana to'liq demo:

[iframe src="menu" height=140 edit]

Albatta, biz unga ko'proq funksionallik qo'shishimiz mumkin: hodisalar, metodlar va hokazo.

## Slotlarni yangilash

Agar tashqi kod dinamik ravishda menyu elementlarini qo'shish/olib tashlashni xohlasa-chi?

**Brauzer slotlarni kuzatadi va slotlangan elementlar qo'shilsa/olib tashlansa, renderni yangilaydi.**

Shuningdek, light DOM tugunlari nusxalanmagani, faqat slotlarda render qilingani uchun, ular ichidagi o'zgarishlar darhol ko'rinadigan bo'ladi.

Shuning uchun renderni yangilash uchun hech narsa qilishimiz shart emas. Lekin agar komponent kodi slot o'zgarishlari haqida bilishni xohlasa, `slotchange` hodisasi mavjud.

Masalan, bu yerda menyu elementi 1 soniyadan keyin dinamik ravishda kiritiladi va sarlavha 2 soniyadan keyin o'zgaradi:

```html run untrusted height=80
<custom-menu id="menu">
  <span slot="title">Shirinlik menyusi</span>
</custom-menu>

<script>
customElements.define('custom-menu', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div class="menu">
      <slot name="title"></slot>
      <ul><slot name="item"></slot></ul>
    </div>`;

    // shadowRoot da hodisa ishlovchilari bo'lishi mumkin emas, shuning uchun birinchi boladan foydalanamiz
    this.shadowRoot.firstElementChild.addEventListener('slotchange',
      e => alert("slotchange: " + e.target.name)
    );
  }
});

setTimeout(() => {
  menu.insertAdjacentHTML('beforeEnd', '<li slot="item">Lolipop</li>')
}, 1000);

setTimeout(() => {
  menu.querySelector('[slot="title"]').innerHTML = "Yangi menyu";
}, 2000);
</script>
```

Menyu render bizning aralashuvimiz siz har safar yangilanadi.

Bu yerda ikkita `slotchange` hodisasi bor:

1. Initsializatsiyada:

    `slotchange: title` darhol ishga tushadi, chunki light DOM dan `slot="title"` tegishli slotga tushadi.
2. 1 soniyadan keyin:

    `slotchange: item` ishga tushadi, yangi `<li slot="item">` qo'shilganda.

E'tibor bering: 2 soniyadan keyin `slotchange` hodisasi yo'q, `slot="title"` kontenti o'zgartirilganda. Buning sababi slot o'zgarishi yo'q. Biz slotlangan element ichidagi kontentni o'zgartiramiz, bu boshqa narsa.

Agar biz JavaScript dan light DOM ning ichki o'zgarishlarini kuzatishni xohlasak, bu ham umumiyroq mexanizm yordamida mumkin: [MutationObserver](info:mutation-observer).

## Slot API

Nihoyat, slot bilan bog'liq JavaScript metodlarini eslatib o'taylik.

Avval ko'rganimizdek, JavaScript "haqiqiy" DOM ga, tekislashsiz qaradi. Lekin agar shadow daraxt `{mode: 'open'}` ga ega bo'lsa, biz qaysi elementlar slotga tayinlanganini va aksincha, element bo'yicha slotni aniqlay olamiz:

- `node.assignedSlot` -- `node` tayinlangan `<slot>` elementini qaytaradi.
- `slot.assignedNodes({flatten: true/false})` -- slotga tayinlangan DOM tugunlari. `flatten` opsiyasi sukut bo'yicha `false`. Agar aniq ravishda `true` ga o'rnatilsa, u tekislangan DOM ga chuqurroq qaradi, ichki komponentlar holatida ichki slotlarni va hech qanday tugun tayinlanmagan bo'lsa zaxira kontentni qaytaradi.
- `slot.assignedElements({flatten: true/false})` -- slotga tayinlangan DOM elementlari (yuqoridagi bilan bir xil, lekin faqat element tugunlari).

Bu metodlar biz slotlangan kontentni ko'rsatishimiz shart bo'lmaganda, balki JavaScript da uni kuzatishimiz kerak bo'lganda foydali.

Masalan, agar `<custom-menu>` komponenti nima ko'rsatayotganini bilishni xohlasa, u `slotchange` ni kuzatishi va `slot.assignedElements` dan elementlarni olishi mumkin:

```html run untrusted height=120
<custom-menu id="menu">
  <span slot="title">Shirinlik menyusi</span>
  <li slot="item">Lolipop</li>
  <li slot="item">Mevali tost</li>
</custom-menu>

<script>
customElements.define('custom-menu', class extends HTMLElement {
  items = []

  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div class="menu">
      <slot name="title"></slot>
      <ul><slot name="item"></slot></ul>
    </div>`;

    // slot kontenti o'zgarsa ishga tushadi
*!*
    this.shadowRoot.firstElementChild.addEventListener('slotchange', e => {
      let slot = e.target;
      if (slot.name == 'item') {
        this.items = slot.assignedElements().map(elem => elem.textContent);
        alert("Elementlar: " + this.items);
      }
    });
*/!*
  }
});

// elementlar 1 soniyadan keyin yangilanadi
setTimeout(() => {
  menu.insertAdjacentHTML('beforeEnd', '<li slot="item">Kek</li>')
}, 1000);
</script>
```

## Xulosa

Odatda, agar elementda shadow DOM bo'lsa, uning light DOM ko'rsatilmaydi. Slotlar light DOM dan elementlarni shadow DOM ning belgilangan joylarida ko'rsatish imkonini beradi.

Ikki xil slot mavjud:

- Nomlangan slotlar: `<slot name="X">...</slot>` -- `slot="X"` bilan light bolalarni oladi.
- Sukut bo'yicha slot: nomsiz birinchi `<slot>` (keyingi nomsiz slotlar e'tiborga olinmaydi) -- slotlanmagan light bolalarni oladi.
- Agar bir xil slot uchun ko'plab elementlar bo'lsa -- ular birin-ketin qo'shiladi.
- `<slot>` elementining kontenti zaxira sifatida ishlatiladi. Slot uchun light bolalar bo'lmasa ko'rsatiladi.

Slotlangan elementlarni ularning slotlari ichida render qilish jarayoni "kompozitsiya" deb ataladi. Natija "tekislangan DOM" deb ataladi.

Kompozitsiya aslida tugunlarni siljitmaydi, JavaScript nuqtai nazaridan DOM hali ham bir xil.

JavaScript slotlarga metodlar yordamida kirishi mumkin:
- `slot.assignedNodes/Elements()` -- `slot` ichidagi tugunlar/elementlarni qaytaradi.
- `node.assignedSlot` -- teskari xususiyat, tugun bo'yicha slotni qaytaradi.

Agar biz nimani ko'rsatayotganimizni bilishni xohlasak, slot kontentini quyidagilar yordamida kuzatishimiz mumkin:
- `slotchange` hodisasi -- slot birinchi marta to'ldirilganda va slotlangan elementning har qanday qo'shish/olib tashlash/almashtirish operatsiyasida ishga tushadi, lekin uning bolalari emas. Slot `event.target` hisoblanadi.
- [MutationObserver](info:mutation-observer) slot kontentiga chuqurroq kirish, uning ichidagi o'zgarishlarni kuzatish uchun.

Endi light DOM dan elementlarni shadow DOM da qanday ko'rsatishni bilganimizdan keyin, ularni to'g'ri uslublash haqida ko'raylik. Asosiy qoida shundaki, shadow elementlar ichkarida, light elementlar esa tashqarida uslublanadi, lekin sezilarli istisnolar bor.

Tafsilotlarni keyingi bobda ko'ramiz.