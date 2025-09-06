# Shadow DOM va hodisalar

Shadow daraxt g'oyasi komponentning ichki amalga oshirish tafsilotlarini inkapsulyatsiya qilishdir.

Aytaylik, `<user-card>` komponentining shadow DOM ichida click hodisasi sodir bo'ldi. Lekin asosiy hujjatdagi skriptlar shadow DOM ning ichki qismlari haqida hech narsa bilmaydi, ayniqsa komponent uchinchi tomon kutubxonasidan kelgan bo'lsa.

Shuning uchun tafsilotlarni inkapsulyatsiya qilib saqlash uchun brauzer hodisani *qayta yo'naltiradi*.

**Shadow DOM da sodir bo'ladigan hodisalar komponentdan tashqarida ushlanganda host elementni maqsad sifatida oladi.**

Mana oddiy misol:

```html run autorun="no-epub" untrusted height=60
<user-card></user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<p>
      <button>Meni bosing</button>
    </p>`;
    this.shadowRoot.firstElementChild.onclick =
      e => alert("Ichki maqsad: " + e.target.tagName);
  }
});

document.onclick =
  e => alert("Tashqi maqsad: " + e.target.tagName);
</script>
```

Agar siz tugmani bossangiz, xabarlar quyidagicha bo'ladi:

1. Ichki maqsad: `BUTTON` -- ichki hodisa ishlovchisi to'g'ri maqsadni oladi, shadow DOM ichidagi element.
2. Tashqi maqsad: `USER-CARD` -- hujjat hodisa ishlovchisi shadow host ni maqsad sifatida oladi.

Hodisani qayta yo'naltirish ajoyib narsa, chunki tashqi hujjat komponent ichki qismlari haqida bilishi shart emas. Uning nuqtai nazaridan, hodisa `<user-card>` da sodir bo'ldi.

**Agar hodisa slotlangan elementda sodir bo'lsa, qayta yo'naltirish sodir bo'lmaydi, chunki u fizik jihatdan light DOM da yashaydi.**

Masalan, agar foydalanuvchi quyidagi misoldagi `<span slot="username">` ni bosса, hodisaning maqsadi aynan shu `span` elementi bo'ladi, ham shadow ham light ishlovchilar uchun:

```html run autorun="no-epub" untrusted height=60
<user-card id="userCard">
*!*
  <span slot="username">Jon Smit</span>
*/!*
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div>
      <b>Ism:</b> <slot name="username"></slot>
    </div>`;

    this.shadowRoot.firstElementChild.onclick =
      e => alert("Ichki maqsad: " + e.target.tagName);
  }
});

userCard.onclick = e => alert(`Tashqi maqsad: ${e.target.tagName}`);
</script>
```

Agar "Jon Smit" ga bosish sodir bo'lsa, ham ichki ham tashqi ishlovchilar uchun maqsad `<span slot="username">` bo'ladi. Bu light DOM dan element, shuning uchun qayta yo'naltirish yo'q.

Boshqa tomondan, agar bosish shadow DOM dan kelib chiqqan elementda sodir bo'lsa, masalan `<b>Ism</b>` da, u shadow DOM dan ko'piklanib chiqayotganda, uning `event.target` i `<user-card>` ga qayta o'rnatiladi.

## Ko'piklanish, event.composedPath()

Hodisalarning ko'piklanishi maqsadlari uchun tekislangan DOM ishlatiladi.

Shunday qilib, agar bizda slotlangan element bo'lsa va hodisa uning ichida biror joyda sodir bo'lsa, u `<slot>` gacha va yuqoriga ko'piklanadi.

Barcha shadow elementlar bilan asl hodisa maqsadiga to'liq yo'lni `event.composedPath()` yordamida olish mumkin. Metodning nomidan ko'rib turganimizdek, bu yo'l kompozitsiyadan keyin olinadi.

Yuqoridagi misolda tekislangan DOM:

```html
<user-card id="userCard">
  #shadow-root
    <div>
      <b>Ism:</b>
      <slot name="username">
        <span slot="username">Jon Smit</span>
      </slot>
    </div>
</user-card>
```

Shunday qilib, `<span slot="username">` ga bosish uchun `event.composedPath()` ga chaqiruv massiv qaytaradi: [`span`, `slot`, `div`, `shadow-root`, `user-card`, `body`, `html`, `document`, `window`]. Bu kompozitsiyadan keyin tekislangan DOM dagi maqsad elementdan aynan ota-ona zanjiri.

```warn header="Shadow daraxt tafsilotlari faqat `{mode:'open'}` daraxtlar uchun taqdim etiladi"
Agar shadow daraxt `{mode: 'closed'}` bilan yaratilgan bo'lsa, kompozitsiya yo'li host dan boshlanadi: `user-card` va yuqoriga.

Bu shadow DOM bilan ishlaydigan boshqa metodlar uchun ham xuddi shunday printsip. Yopiq daraxtlarning ichki qismlari butunlay yashirilgan.
```

## event.composed

Ko'pgina hodisalar shadow DOM chegarasi orqali muvaffaqiyatli ko'piklanadi. Ko'piklanmaydigan bir nechta hodisalar mavjud.

Bu `composed` hodisa ob'ekti xususiyati bilan boshqariladi. Agar u `true` bo'lsa, hodisa chegarani kesib o'tadi. Aks holda, u faqat shadow DOM ichidan ushlilishi mumkin.

Agar siz [UI Events spetsifikatsiyasi](https://www.w3.org/TR/uievents) ga qarасаngiz, ko'pgina hodisalar `composed: true` ga ega:

- `blur`, `focus`, `focusin`, `focusout`,
- `click`, `dblclick`,
- `mousedown`, `mouseup` `mousemove`, `mouseout`, `mouseover`,
- `wheel`,
- `beforeinput`, `input`, `keydown`, `keyup`.

Barcha touch hodisalari va pointer hodisalari ham `composed: true` ga ega.

`composed: false` ga ega bo'lgan ba'zi hodisalar mavjud:

- `mouseenter`, `mouseleave` (ular umuman ko'piklanmaydi),
- `load`, `unload`, `abort`, `error`,
- `select`,
- `slotchange`.

Bu hodisalar faqat hodisaning maqsadi joylashgan bir xil DOM dagi elementlarda ushlilishi mumkin.

## Maxsus hodisalar

Maxsus hodisalarni yuborayotganda, uni komponentdan yuqoriga va tashqariga ko'piklanishi uchun ham `bubbles` ham `composed` xususiyatlarini `true` ga o'rnatishimiz kerak.

Masalan, bu yerda biz `div#outer` ning shadow DOM ida `div#inner` yaratamiz va unda ikkita hodisani ishga tushiramiz. Faqat `composed: true` bilan bo'lgani hujjatga chiqadi:

```html run untrusted height=0
<div id="outer"></div>

<script>
outer.attachShadow({mode: 'open'});

let inner = document.createElement('div');
outer.shadowRoot.append(inner);

/*
div(id=outer)
  #shadow-dom
    div(id=inner)
*/

document.addEventListener('test', event => alert(event.detail));

inner.dispatchEvent(new CustomEvent('test', {
  bubbles: true,
*!*
  composed: true,
*/!*
  detail: "composed"
}));

inner.dispatchEvent(new CustomEvent('test', {
  bubbles: true,
*!*
  composed: false,
*/!*
  detail: "not composed"
}));
</script>
```

## Xulosa

Hodisalar faqat ularning `composed` bayrog'i `true` ga o'rnatilgan bo'lsa, shadow DOM chegaralarini kesib o'tadi.

O'rnatilgan hodisalar asosan `composed: true` ga ega, tegishli spetsifikatsiyalarda tasvirlanganidek:

- UI Events <https://www.w3.org/TR/uievents>.
- Touch Events <https://w3c.github.io/touch-events>.
- Pointer Events <https://www.w3.org/TR/pointerevents>.
- ...Va hokazo.

`composed: false` ga ega bo'lgan ba'zi o'rnatilgan hodisalar:

- `mouseenter`, `mouseleave` (shuningdek ko'piklanmaydi),
- `load`, `unload`, `abort`, `error`,
- `select`,
- `slotchange`.

Bu hodisalar faqat bir xil DOM dagi elementlarda ushlilishi mumkin.

Agar biz `CustomEvent` yuborayotgan bo'lsak, `composed: true` ni aniq o'rnatishimiz kerak.

Ichki komponentlar holatida bir shadow DOM boshqasiga ichkarilashishi mumkinligini unutmang. Bunday holatda composed hodisalar barcha shadow DOM chegaralari orqali ko'piklanadi. Shunday qilib, agar hodisa faqat bevosita o'rab turgan komponent uchun mo'ljallangan bo'lsa, biz uni shadow host da ham yuborishimiz va `composed: false` ni o'rnatishimiz mumkin. Unda u komponent shadow DOM dan chiqadi, lekin yuqori darajadagi DOM ga ko'piklanmaydi.