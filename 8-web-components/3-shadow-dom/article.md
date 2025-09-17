# Shadow DOM

Shadow DOM inkapsulyatsiya uchun xizmat qiladi. U komponentga o'zining "soya" DOM daraxtiga ega bo'lish imkonini beradi, unga asosiy hujjatdan tasodifan kirish mumkin emas, mahalliy uslub qoidalari bo'lishi mumkin va boshqalar.

## O'rnatilgan shadow DOM

Siz hech qachon murakkab brauzer boshqaruv elementlari qanday yaratilishi va shakllantirilanishi haqida o'ylab ko'rganmisiz?

Masalan `<input type="range">`:

<p>
<input type="range">
</p>

Brauzer ularni chizish uchun ichkarida DOM/CSS dan foydalanadi. Bu DOM tuzilmasi odatda bizdan yashiringan, lekin biz uni dasturchi vositalarida ko'rishimiz mumkin. Masalan, Chrome da biz Dev Tools da "Show user agent shadow DOM" opsiyasini yoqishimiz kerak.

Keyin `<input type="range">` quyidagicha ko'rinadi:

![](shadow-dom-range.png)

`#shadow-root` ostida ko'rayotgan narsa "shadow DOM" deb ataladi.

Biz o'rnatilgan shadow DOM elementlarini oddiy JavaScript chaqiruvlari yoki selektorlar orqali ola olmaymiz. Bular oddiy bolalar emas, balki kuchli inkapsulyatsiya texnikasi.

Yuqoridagi misolda biz foydali `pseudo` atributini ko'rishimiz mumkin. Bu nostandart, tarixiy sabablarga ko'ra mavjud. Biz uni CSS bilan subelementlarni shakllantirish uchun ishlatishimiz mumkin:

```html run autorun
<style>
/* slayder yo'lini qizil qiling */
input::-webkit-slider-runnable-track {
  background: red;
}
</style>

<input type="range">
```

Yana bir bor, `pseudo` nostandart atribut. Xronologik jihatdan, brauzerlar avval boshqaruv elementlarini amalga oshirish uchun ichki DOM tuzilmalari bilan tajriba qila boshladilar va keyin vaqt o'tgach, shadow DOM standartlashtirildi, bizga, dasturchilarga xuddi shunday ishni qilish imkonini berish uchun.

Bundan keyin biz [DOM spec](https://dom.spec.whatwg.org/#shadow-trees) va boshqa tegishli spetsifikatsiyalar tomonidan qamrab olingan zamonaviy shadow DOM standartidan foydalanamiz.

## Shadow darakti

DOM elementi ikkita turdagi DOM subdaraxtlariga ega bo'lishi mumkin:

1. Light tree -- HTML bolalardan tuzilgan oddiy DOM subdaxti. Oldingi boblarda ko'rgan barcha subdaxtlar "light" edi.
2. Shadow tree -- yashirin DOM subdaxti, HTML da aks etmaydi, ko'zlardan yashiringan.

Agar elementda ikkalasi ham bo'lsa, brauzer faqat shadow daraxtini render qiladi. Lekin biz shadow va light daxtlar o'rtasida qandaydir kompozitsiya ham o'rnatishimiz mumkin. Tafsilotlarni keyinroq <info:slots-composition> bobida ko'ramiz.

Shadow tree Custom Elements da komponent ichki qismlarini yashirish va komponent-mahalliy uslublarni qo'llash uchun ishlatilishi mumkin.

Masalan, bu `<show-hello>` elementi o'zining ichki DOM ini shadow tree da yashiradi:

```html run autorun height=60
<script>
customElements.define('show-hello', class extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({mode: 'open'});
    shadow.innerHTML = `<p>
      Salom, ${this.getAttribute('name')}
    </p>`;
  }  
});
</script>

<show-hello name="John"></show-hello>
```

Chrome dev tools da natijada paydo bo'lgan DOM quyidagicha ko'rinadi, barcha kontent "#shadow-root" ostida:

![](shadow-dom-say-hello.png)

Birinchi, `elem.attachShadow({mode: …})` ga chaqiruv shadow daraxtini yaratadi.

Ikkita cheklov bor:
1. Biz har bir element uchun faqat bitta shadow root yaratishimiz mumkin.
2. `elem` custom element yoki quyidagilardan biri bo'lishi kerak: "article", "aside", "blockquote", "body", "div", "footer", "h1..h6", "header", "main" "nav", "p", "section", yoki "span". Boshqa elementlar, masalan `<img>`, shadow tree ni joylashtirib bo'lmaydi.

`mode` opsiyasi inkapsulyatsiya darajasini belgilaydi. U ikkita qiymatdan birini olishi kerak:
- `"open"` -- shadow root `elem.shadowRoot` sifatida mavjud.

    Har qanday kod `elem` ning shadow tree ga kirishga qodir.   
- `"closed"` -- `elem.shadowRoot` har doim `null`.

    Biz shadow DOM ga faqat `attachShadow` tomonidan qaytarilgan havola orqali kirishimiz mumkin (va ehtimol klass ichida yashiringan). Brauzer-mahalliy shadow daxtlari, masalan `<input type="range">`, yopiq. Ularga kirish yo'li yo'q.

`attachShadow` tomonidan qaytarilgan [shadow root](https://dom.spec.whatwg.org/#shadowroot) element kabi: biz uni to'ldirish uchun `innerHTML` yoki `append` kabi DOM metodlaridan foydalanishimiz mumkin.

Shadow root ga ega element "shadow tree host" deb ataladi va shadow root `host` xususiyati sifatida mavjud:

```js
// {mode: "open"} deb faraz qilsak, aks holda elem.shadowRoot null
alert(elem.shadowRoot.host === elem); // true
```

## Inkapsulyatsiya

Shadow DOM asosiy hujjatdan qattiq ajratilgan:

1. Shadow DOM elementlari light DOM dan `querySelector` uchun ko'rinmaydi. Xususan, Shadow DOM elementlarida light DOM dagi bilan to'qnashadigan id lar bo'lishi mumkin. Ular faqat shadow tree ichida noyob bo'lishi kerak.
2. Shadow DOM o'z stylesheetlariga ega. Tashqi DOM dan uslub qoidalari qo'llanilmaydi.

Masalan:

```html run untrusted height=40
<style>
*!*
  /* hujjat uslubi #elem ichidagi shadow tree ga qo'llanilmaydi (1) */
*/!*
  p { color: red; }
</style>

<div id="elem"></div>

<script>
  elem.attachShadow({mode: 'open'});
*!*
    // shadow tree o'z uslubiga ega (2)
*/!*
  elem.shadowRoot.innerHTML = `
    <style> p { font-weight: bold; } </style>
    <p>Salom, John!</p>
  `;

*!*
  // <p> faqat shadow tree ichidagi so'rovlardan ko'rinadi (3)
*/!*
  alert(document.querySelectorAll('p').length); // 0
  alert(elem.shadowRoot.querySelectorAll('p').length); // 1
</script>  
```

1. Hujjatdagi uslub shadow tree ga ta'sir qilmaydi.
2. ...Lekin ichkaridagi uslub ishlaydi.
3. Shadow tree dagi elementlarni olish uchun biz daraxt ichidan so'rov qilishimiz kerak.

## Manbalar

- DOM: <https://dom.spec.whatwg.org/#shadow-trees>
- Muvofiqlik: <https://caniuse.com/#feat=shadowdomv1>
- Shadow DOM ko'plab boshqa spetsifikatsiyalarda ham eslatib o'tiladi, masalan [DOM Parsing](https://w3c.github.io/DOM-Parsing/#the-innerhtml-mixin) shadow root `innerHTML` ga ega ekanligini belgilaydi.

## Xulosa

Shadow DOM komponent-mahalliy DOM yaratish usuli.

1. `shadowRoot = elem.attachShadow({mode: open|closed})` -- `elem` uchun shadow DOM yaratadi. Agar `mode="open"` bo'lsa, u `elem.shadowRoot` xususiyati sifatida mavjud.
2. Biz `shadowRoot` ni `innerHTML` yoki boshqa DOM metodlar yordamida to'ldirishimiz mumkin.

Shadow DOM elementlari:
- O'z id makoniga ega,
- Asosiy hujjatdan JavaScript selektorlari, masalan `querySelector` uchun ko'rinmaydi,
- Asosiy hujjatdan emas, faqat shadow tree dan uslublarni ishlatadi.

Shadow DOM, agar mavjud bo'lsa, "light DOM" (oddiy bolalar) deb ataladigan narsaning o'rniga brauzer tomonidan render qilinadi. <info:slots-composition> bobida biz ularni qanday birlashtirish mumkinligini ko'ramiz.