# Atributlar va xususiyatlar

Brauzer sahifani yukladiganda, u HTML ni "o'qiydi" (boshqa so'z bilan aytganda: "tahlil qiladi") va undan DOM obyektlarini yaratadi. Element tugunlari uchun standart HTML atributlarining ko'pchiligi avtomatik ravishda DOM obyektlarining xususiyatlariga aylanadi.

Masalan, agar teg `<body id="page">` bo'lsa, DOM obyekti `body.id="page"` ga ega bo'ladi.

Ammo atribut-xususiyat moslashtirish bir-birga to'liq mos kelmaydi! Ushbu bo'limda biz ushbu ikki tushunchani ajratishga e'tibor qaratamiz, ular bilan qanday ishlashni, qachon bir xil va qachon farq qilishlarini ko'rib chiqamiz.

## DOM xususiyatlari

Biz allaqachon o'rnatilgan DOM xususiyatlarini ko'rganmiz. Ular juda ko'p. Ammo texnik jihatdan hech kim bizni cheklamaydi va agar yetarli bo'lmasa, biz o'zimiznikini qo'sha olamiz.

DOM tugunlari oddiy JavaScript obyektlaridir. Biz ularni o'zgartira olamiz.

Masalan, `document.body`da yangi xususiyat yarataylik:

```js run
document.body.myData = {
  name: 'Caesar',
  title: 'Imperator'
};

alert(document.body.myData.title); // Imperator
```

Usul ham qo'sha olamiz:

```js run
document.body.sayTagName = function() {
  alert(this.tagName);
};

document.body.sayTagName(); // BODY (usulidagi "this" qiymati document.body)
```

Shuningdek, biz `Element.prototype` kabi o'rnatilgan prototiplarni o'zgartirib, barcha elementlarga yangi usullar qo'sha olamiz:

```js run
Element.prototype.sayHi = function() {
  alert(`Salom, men ${this.tagName}`);
};

document.documentElement.sayHi(); // Salom, men HTML
document.body.sayHi(); // Salom, men BODY
```

Shunday qilib, DOM xususiyatlari va usullari xuddi oddiy JavaScript obyektlari kabi harakat qiladi:

- Ular har qanday qiymatga ega bo'lishi mumkin.
- Ular katta-kichik harflarga sezgir (`elem.nodeType` yozing, `elem.NoDeTyPe` emas).

## HTML atributlari

HTML da teglar atributlarga ega bo'lishi mumkin. Brauzer teglar uchun DOM obyektlarini yaratish uchun HTML ni tahlil qilganda, u *standart* atributlarni tan oladi va ulardan DOM xususiyatlarini yaratadi.

Shunday qilib, element `id` yoki boshqa *standart* atributga ega bo'lsa, tegishli xususiyat yaratiladi. Ammo bu atribut standart bo'lmasa sodir bo'lmaydi.

Masalan:
```html run
<body id="test" something="non-standard">
  <script>
    alert(document.body.id); // test
*!*
    // standart bo'lmagan atribut xususiyat yaratmaydi
    alert(document.body.something); // undefined
*/!*
  </script>
</body>
```

E'tibor bering, bir element uchun standart atribut boshqasi uchun noma'lum bo'lishi mumkin. Masalan, `"type"` `<input>` ([HTMLInputElement](https://html.spec.whatwg.org/#htmlinputelement)) uchun standart, lekin `<body>` ([HTMLBodyElement](https://html.spec.whatwg.org/#htmlbodyelement)) uchun emas. Standart atributlar tegishli element sinfi spetsifikatsiyasida tasvirlangan.

Buni ko'rishimiz mumkin:
```html run
<body id="body" type="...">
  <input id="input" type="text">
  <script>
    alert(input.type); // text
*!*
    alert(body.type); // undefined: DOM xususiyat yaratilmagan, chunki u standart emas
*/!*
  </script>
</body>
```

Shunday qilib, agar atribut standart bo'lmasa, uning uchun DOM-xususiyat bo'lmaydi. Bunday atributlarga kirish usuli bormi?

Albatta. Barcha atributlarga quyidagi usullar orqali kirish mumkin:

- `elem.hasAttribute(name)` -- mavjudligini tekshiradi.
- `elem.getAttribute(name)` -- qiymatni oladi.
- `elem.setAttribute(name, value)` -- qiymatni o'rnatadi.
- `elem.removeAttribute(name)` -- atributni olib tashlaydi.

Bu usullar HTML da yozilgan narsalar bilan to'liq ishlaydi.

Shuningdek, `elem.attributes` yordamida barcha atributlarni o'qish mumkin: o'rnatilgan [Attr](https://dom.spec.whatwg.org/#attr) sinfiga tegishli, `name` va `value` xususiyatlariga ega obyektlar to'plami.

Mana standart bo'lmagan xususiyatni o'qish namunasi:

```html run
<body something="non-standard">
  <script>
*!*
    alert(document.body.getAttribute('something')); // non-standard
*/!*
  </script>
</body>
```

HTML atributlari quyidagi xususiyatlarga ega:

- Ularning nomi katta-kichik harflarga sezgir emas (`id` `ID` bilan bir xil).
- Ularning qiymatlari har doim satrlar.

Mana atributlar bilan ishlashning kengaytirilgan namunasi:

```html run
<body>
  <div id="elem" about="Elephant"></div>

  <script>
    alert( elem.getAttribute('About') ); // (1) 'Elephant', o'qish

    elem.setAttribute('Test', 123); // (2), yozish

    alert( elem.outerHTML ); // (3), atribut HTML da borligini ko'ring (ha)

    for (let attr of elem.attributes) { // (4) hammasini ro'yxatlash
      alert( `${attr.name} = ${attr.value}` );
    }
  </script>
</body>
```

E'tibor bering:

1. `getAttribute('About')` -- bu yerda birinchi harf katta, HTML da esa barchasi kichik. Ammo bu muhim emas: atribut nomlari katta-kichik harflarga sezgir emas.
2. Atributga har qanday narsani belgilashimiz mumkin, lekin u satrga aylanadi. Shuning uchun bu yerda qiymat sifatida `"123"` bor.
3. Biz o'rnatgan atributlar ham kiritmak barcha atributlar `outerHTML` da ko'rinadi.
4. `attributes` to'plami iteratsiya qilinadi va elementning barcha atributlarini (standart va standart bo'lmagan) `name` va `value` xususiyatlariga ega obyektlar sifatida saqlaydi.

## Xususiyat-atribut sinxronizatsiyasi

Standart atribut o'zgarsa, tegishli xususiyat avtomatik yangilanadi va (ba'zi istisnolar bilan) aksincha ham.

Quyidagi misolda `id` atribut sifatida o'zgartiriladi va xususiyat ham o'zgarganini ko'ramiz. Keyin aksi yo'nalishda ham:

```html run
<input>

<script>
  let input = document.querySelector('input');

  // atribut => xususiyat
  input.setAttribute('id', 'id');
  alert(input.id); // id (yangilandi)

  // xususiyat => atribut
  input.id = 'newId';
  alert(input.getAttribute('id')); // newId (yangilandi)
</script>
```

Ammo istisnolar mavjud, masalan `input.value` faqat atribut -> xususiyatga sinxronlanadi, lekin orqaga emas:

```html run
<input>

<script>
  let input = document.querySelector('input');

  // atribut => xususiyat
  input.setAttribute('value', 'text');
  alert(input.value); // text

*!*
  // EMAS xususiyat => atribut
  input.value = 'newValue';
  alert(input.getAttribute('value')); // text (yangilanmadi!)
*/!*
</script>
```

Yuqoridagi misolda:
- `value` atributini o'zgartirish xususiyatni yangilaydi.
- Ammo xususiyat o'zgarishi atributga ta'sir qilmaydi.

Bu "xususiyat" aslida foydali bo'lishi mumkin, chunki foydalanuvchi harakatlari `value` o'zgarishlariga olib kelishi mumkin va keyin, agar biz HTML dan "asl" qiymatni tiklashni istasak, u atributda.

## DOM xususiyatlari turli xil

DOM xususiyatlari har doim satr emas. Masalan, `input.checked` xususiyati (belgilash katakchalari uchun) boolean hisoblanadi:

```html run
<input id="input" type="checkbox" checked> checkbox

<script>
  alert(input.getAttribute('checked')); // atribut qiymati: bo'sh satr
  alert(input.checked); // xususiyat qiymati: true
</script>
```

Boshqa misollar ham bor. `style` atributi satr, ammo `style` xususiyati obyekt:

```html run
<div id="div" style="color:red;font-size:120%">Salom</div>

<script>
  // satr
  alert(div.getAttribute('style')); // color:red;font-size:120%

  // obyekt
  alert(div.style); // [object CSSStyleDeclaration]
  alert(div.style.color); // red
</script>
```

Ko'pchilik xususiyatlar satrlardir.

Juda kam hollarda, DOM xususiyat turi satr bo'lsa ham, u atributdan farq qilishi mumkin. Masalan, `href` DOM xususiyati har doim *to'liq* URL, hatto atribut nisbiy URL yoki faqat `#hash` ni o'z ichiga olsa ham.

Mana bir misol:

```html height=30 run
<a id="a" href="#hello">havola</a>
<script>
  // atribut
  alert(a.getAttribute('href')); // #hello

  // xususiyat
  alert(a.href ); // http://site.com/page#hello shaklidagi to'liq URL
</script>
```

Agar bizga `href` qiymati yoki boshqa har qanday atribut HTML da yozilganidek kerak bo'lsa, `getAttribute` dan foydalanishimiz mumkin.

## Standart bo'lmagan atributlar, dataset

HTML yozishda biz ko'plab standart atributlardan foydalanamiz. Ammo standart bo'lmagan, maxsus atributlar haqida nima deyish mumkin? Avvalo, ular foydali yoki yo'qligini ko'rib chiqaylik? Nima uchun?

Ba'zan standart bo'lmagan atributlar HTML dan JavaScript ga maxsus ma'lumotlarni uzatish yoki JavaScript uchun HTML elementlarini "belgilash" uchun ishlatiladi.

Masalan:

```html run
<!-- div ni bu yerda "name" ko'rsatish uchun belgilash -->
<div *!*show-info="name"*/!*></div>
<!-- va bu yerda yosh -->
<div *!*show-info="age"*/!*></div>

<script>
  // kod belgi bilan elementni topadi va so'ralgan narsani ko'rsatadi
  let user = {
    name: "Pete",
    age: 25
  };

  for(let div of document.querySelectorAll('[show-info]')) {
    // tegishli ma'lumotni maydonga qo'yish
    let field = div.getAttribute('show-info');
    div.innerHTML = user[field]; // birinchi "name" ga Pete, keyin "age" ga 25
  }
</script>
```

Ular shuningdek elementni uslublash uchun ham ishlatilishi mumkin.

Masalan, bu yerda buyurtma holati uchun `order-state` atributi ishlatiladi:

```html run
<style>
  /* uslublar maxsus "order-state" atributiga tayanadi */
  .order[order-state="new"] {
    color: green;
  }

  .order[order-state="pending"] {
    color: blue;
  }

  .order[order-state="canceled"] {
    color: red;
  }
</style>

<div class="order" order-state="new">
  Yangi buyurtma.
</div>

<div class="order" order-state="pending">
  Kutilayotgan buyurtma.
</div>

<div class="order" order-state="canceled">
  Bekor qilingan buyurtma.
</div>
```

Nima uchun atributdan foydalanish `.order-state-new`, `.order-state-pending`, `.order-state-canceled` kabi sinflarga ega bo'lishdan afzal?

Chunki atributni boshqarish qulayroq. Holatni o'zgartirish quyidagidek oson:

```js
// eski sinfni olib tashlash/yangi sinf qo'shishdan biroz oddiyroq
div.setAttribute('order-state', 'canceled');
```

Ammo maxsus atributlar bilan mumkin bo'lgan muammo bo'lishi mumkin. Agar biz o'z maqsadlarimiz uchun standart bo'lmagan atributdan foydalansak va keyinroq standart uni joriy qilib, biror narsa qilsa-chi? HTML tili tirik, u o'sib boradi va dasturchilar ehtiyojlarini qondirish uchun ko'proq atributlar paydo bo'ladi. Bunday holda kutilmagan ta'sirlar bo'lishi mumkin.

Ziddiyatlarni oldini olish uchun [data-*](https://html.spec.whatwg.org/#embedding-custom-non-visible-data-with-the-data-*-attributes) atributlari mavjud.

**"data-" bilan boshlanadignan barcha atributlar dasturchilar foydalanishi uchun ajratilgan. Ular `dataset` xususiyatida mavjud.**

Masalan, agar `elem` da `"data-about"` nomli atribut bo'lsa, u `elem.dataset.about` sifatida mavjud.

Masalan:

```html run
<body data-about="Elephants">
<script>
  alert(document.body.dataset.about); // Elephants
</script>
```

`data-order-state` kabi ko'p so'zli atributlar camelCase ga aylanadi: `dataset.orderState`.

Mana qayta yozilgan "buyurtma holati" misoli:

```html run
<style>
  .order[data-order-state="new"] {
    color: green;
  }

  .order[data-order-state="pending"] {
    color: blue;
  }

  .order[data-order-state="canceled"] {
    color: red;
  }
</style>

<div id="order" class="order" data-order-state="new">
  Yangi buyurtma.
</div>

<script>
  // o'qish
  alert(order.dataset.orderState); // new

  // o'zgartirish
  order.dataset.orderState = "pending"; // (*)
</script>
```

`data-*` atributlaridan foydalanish maxsus ma'lumotlarni uzatishning to'g'ri, xavfsiz usulidir.

E'tibor bering, biz nafaqat o'qiy olmaymiz, balki data-atributlarni ham o'zgartirishimiz mumkin. Keyin CSS ko'rinishni mos ravishda yangilaydi: yuqoridagi misolda oxirgi satr `(*)` rangni ko'k rangga o'zgartiradi.

## Xulosa

- Atributlar -- HTML da yozilgan narsa.
- Xususiyatlar -- DOM obyektlarida mavjud bo'lgan narsa.

Kichik taqqoslash:

|            | Xususiyatlar | Atributlar |
|------------|------------|------------|
|Tur|Har qanday qiymat, standart xususiyatlar spetsifikatsiyada tasvirlangan turlarga ega|Satr|
|Nom|Nom katta-kichik harflarga sezgir|Nom katta-kichik harflarga sezgir emas|

Atributlar bilan ishlash usullari:

- `elem.hasAttribute(name)` -- mavjudligini tekshirish.
- `elem.getAttribute(name)` -- qiymatni olish.
- `elem.setAttribute(name, value)` -- qiymatni o'rnatish.
- `elem.removeAttribute(name)` -- atributni olib tashlash.
- `elem.attributes` barcha atributlar to'plami.

Ko'pgina holatlarda DOM xususiyatlaridan foydalanish afzalroq. Biz atributlarga faqat DOM xususiyatlari bizga mos kelmaganida, biz aniq atributlarga muhtoj bo'lganimizda murojaat qilishimiz kerak, masalan:

- Bizga standart bo'lmagan atribut kerak. Ammo u `data-` bilan boshlansa, `dataset` dan foydalanishimiz kerak.
- Biz HTML da "yozilganidek" qiymatni o'qishni xohlaymiz. DOM xususiyat qiymati boshqacha bo'lishi mumkin, masalan `href` xususiyati har doim to'liq URL va biz "asl" qiymatni olishni istashimiz mumkin.

export default ({ children }) => <div>{children}</div>;