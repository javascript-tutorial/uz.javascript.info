# Uslublar va sinflar

JavaScript ning uslublar va sinflar bilan ishlash usullarini ko'rib chiqishdan oldin -- mana muhim qoida. Umid qilamanki, bu yetarlicha aniq, lekin baribir ta'kidlashimiz kerak.

Elementni uslublashning ikki yo'li mavjud:

1. CSS da sinf yarating va uni qo'shing: `<div class="...">`
2. Xususiyatlarni to'g'ridan-to'g'ri `style` ga yozing: `<div style="...">`.

JavaScript ham sinflarni ham `style` xususiyatlarini o'zgartirishi mumkin.

Biz har doim `style` ga nisbatan CSS sinflarini afzal ko'rishimiz kerak. Ikkinchisidan faqat sinflar "buni hal qila olmasa" foydalanish kerak.

Masalan, agar biz element koordinatalarini dinamik ravishda hisoblaymiz va ularni JavaScript dan o'rnatishni istasak, `style` qabul qilinadi:

```js
let top = /* murakkab hisob-kitoblar */;
let left = /* murakkab hisob-kitoblar */;

elem.style.left = left; // masalan '123px', ishlash vaqtida hisoblanadi
elem.style.top = top; // masalan '456px'
```

Boshqa holatlarda, masalan matnni qizil qilish, fon belgisini qo'shish -- buni CSS da tasvirlab, keyin sinf qo'shing (JavaScript buni qila oladi). Bu yanada moslashuvchan va qo'llab-quvvatlash osonroq.

## className va classList

Sinfni o'zgartirish skriptlarda eng ko'p ishlatiladigan amallardan biri.

Qadimiy zamonda JavaScript da cheklov bor edi: `"class"` kabi zahiralangan so'z obyekt xususiyati bo'la olmaydi. Bu cheklov endi mavjud emas, lekin o'sha paytda `elem.class` kabi `"class"` xususiyatiga ega bo'lish mumkin emas edi.

Shunday qilib sinflar uchun o'xshash ko'rinishdagi `"className"` xususiyati joriy qilindi: `elem.className` `"class"` atributiga mos keladi.

Masalan:

```html run
<body class="main page">
  <script>
    alert(document.body.className); // main page
  </script>
</body>
```

Agar biz `elem.className` ga biror narsa belgilasak, u sinflarning butun satrini almashtiradi. Ba'zida bizga aynan shu kerak, lekin ko'pincha bitta sinfni qo'shish/olib tashlashni xohlaymiz.

Buning uchun boshqa xususiyat mavjud: `elem.classList`.

`elem.classList` - bitta sinfni `add/remove/toggle` qilish usullari bo'lgan maxsus obyekt.

Masalan:

```html run
<body class="main page">
  <script>
    *!*
        // sinf qo'shish
        document.body.classList.add('article');
    */!*

        alert(document.body.className); // main page article
  </script>
</body>
```

Shunday qilib, biz `className` yordamida to'liq sinf satri yoki `classList` yordamida alohida sinflar ustida amal bajarishimiz mumkin. Nimani tanlashimiz ehtiyojlarimizga bog'liq.

`classList` usullari:

- `elem.classList.add/remove("class")` -- sinfni qo'shadi/olib tashlaydi.
- `elem.classList.toggle("class")` -- agar sinf mavjud bo'lmasa qo'shadi, aks holda olib tashlaydi.
- `elem.classList.contains("class")` -- berilgan sinfni tekshiradi, `true/false` qaytaradi.

Bundan tashqari, `classList` iteratsiya qilinadi, shuning uchun biz `for..of` bilan barcha sinflarni ro'yxatlashimiz mumkin:

```html run
<body class="main page">
  <script>
    for (let name of document.body.classList) {
      alert(name); // main, keyin page
    }
  </script>
</body>
```

## Element uslubi

`elem.style` xususiyati `"style"` atributida yozilgan narsaga mos keladigan obyekt. `elem.style.width="100px"` o'rnatish xuddi `style` atributida `width:100px` satri bo'lgani kabi ishlaydi.

Ko'p so'zli xususiyat uchun camelCase ishlatiladi:

```js no-beautify
background-color  => elem.style.backgroundColor
z-index           => elem.style.zIndex
border-left-width => elem.style.borderLeftWidth
```

Masalan:

```js run
document.body.style.backgroundColor = prompt("fon rangi?", "green");
```

````smart header="Prefiksli xususiyatlar"
`-moz-border-radius`, `-webkit-border-radius` kabi brauzer prefiksli xususiyatlar ham xuddi shunday qoidaga amal qiladi: tire katta harfni anglatadi.

Masalan:

```js
button.style.MozBorderRadius = '5px';
button.style.WebkitBorderRadius = '5px';
```
````

## Uslub xususiyatini tiklash

Ba'zan biz uslub xususiyatini belgilamoqchimiz va keyinroq uni olib tashlamoqchimiz.

Masalan, elementni yashirish uchun `elem.style.display = "none"` ni o'rnatishimiz mumkin.

Keyin `style.display` ni go'yo o'rnatilmagandek olib tashlashni xohlashimiz mumkin. `delete elem.style.display` o'rniga unga bo'sh satr belgilashimiz kerak: `elem.style.display = ""`.

```js run
// agar bu kodni ishga tushirsak, <body> miltillaydi
document.body.style.display = "none"; // yashirish

setTimeout(() => (document.body.style.display = ""), 1000); // normalga qaytarish
```

Agar `style.display` ni bo'sh satrga o'rnatdik, brauzer CSS sinflarini va o'zining o'rnatilgan uslublarini normal ravishda qo'llaydi, go'yo bunday `style.display` xususiyati umuman yo'qdek.

````smart header="`style.cssText`bilan to'liq qayta yozish"
Odatda biz alohida uslub xususiyatlarini belgilash uchun`style.\*`dan foydalanamiz. Biz`div.style="color: red; width: 100px"`kabi to'liq uslubni o'rnatay olmaymiz, chunki`div.style` obyekt va u faqat o'qish uchun.

To'liq uslubni satr sifatida o'rnatish uchun maxsus `style.cssText` xususiyati mavjud:

```html run
<div id="div">Tugma</div>

<script>
  // bu yerda "important" kabi maxsus uslub bayroqlarini o'rnatishimiz mumkin
  div.style.cssText = `color: red !important;
    background-color: yellow;
    width: 100px;
    text-align: center;
  `;

  alert(div.style.cssText);
</script>
```

Bu xususiyat kamdan-kam ishlatiladi, chunki bunday belgilash barcha mavjud uslublarni olib tashlaydi: u qo'shmaydi, balki almashtiradi. Vaqti-vaqti bilan kerakli narsani o'chirishi mumkin. Ammo biz mavjud uslubni o'chirmasligimizni bilganimizda yangi elementlar uchun uni xavfsiz ishlatishimiz mumkin.

Xuddi shunga atribut o'rnatish orqali ham erishish mumkin: `div.setAttribute('style', 'color: red...')`.

`````

## Birliklarni unutmang

CSS birliklarini qiymatlarga qo'shishni unutmang.

Masalan, biz `elem.style.top` ni `10` ga o'rnatmasligimiz, balki `10px` ga o'rnatishimiz kerak. Aks holda ishlamaydi:

```html run height=100
<body>
  <script>
  *!*
    // ishlamaydi!
    document.body.style.margin = 20;
    alert(document.body.style.margin); // '' (bo'sh satr, belgilash e'tiborsiz qoldirildi)
  */!*

    // endi CSS birligini (px) qo'shing - va ishlaydi
    document.body.style.margin = '20px';
    alert(document.body.style.margin); // 20px

    alert(document.body.style.marginTop); // 20px
    alert(document.body.style.marginLeft); // 20px
  </script>
</body>
```

E'tibor bering: brauzer oxirgi satrlarda `style.margin` xususiyatini "ochib beradi" va undan `style.marginLeft` va `style.marginTop` ni chiqaradi.

## Hisoblangan uslublar: getComputedStyle

Uslubni o'zgartirish oson. Ammo uni qanday *o'qish* mumkin?

Masalan, biz elementning o'lchami, marjinlari, rangini bilishni xohlaymiz. Buni qanday qilish kerak?

**`style` xususiyati faqat `"style"` atributi qiymatida ishlaydi, hech qanday CSS kaskadisiz.**

Shuning uchun biz `elem.style` yordamida CSS sinflaridan kelgan hech narsani o'qiy olmaymiz.

Masalan, bu yerda `style` marjinni ko'rmaydi:

```html run height=60 no-beautify
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  Qizil matn
  <script>
*!*
    alert(document.body.style.color); // bo'sh
    alert(document.body.style.marginTop); // bo'sh
*/!*
  </script>
</body>
```

...Ammo agar bizga, masalan, marjinni `20px` ga oshirish kerak bo'lsa-chi? Biz uning joriy qiymatini xohlaymiz.

Buning uchun boshqa usul mavjud: `getComputedStyle`.

Sintaksis:

```js
getComputedStyle(element, [pseudo])
```

element
: Qiymat o'qish uchun element.

pseudo
: Kerak bo'lsa psevdo-element, masalan `::before`. Bo'sh satr yoki argument yo'qligi elementning o'zini anglatadi.

Natija `elem.style` kabi uslublar bilan obyekt, lekin endi barcha CSS sinflarini hisobga olgan holda.

Masalan:

```html run height=100
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  <script>
    let computedStyle = getComputedStyle(document.body);

    // endi biz undan marjin va rangni o'qiy olamiz

    alert( computedStyle.marginTop ); // 5px
    alert( computedStyle.color ); // rgb(255, 0, 0)
  </script>

</body>
```

```smart header="Hisoblangan va hal qilingan qiymatlar"
[CSS](https://drafts.csswg.org/cssom/#resolved-values) da ikki tushuncha bor:

1. *Hisoblangan* uslub qiymati - CSS kaskadi natijasida barcha CSS qoidalari va CSS merosi qo'llanilgandan keyingi qiymat. U `height:1em` yoki `font-size:125%` ko'rinishida bo'lishi mumkin.
2. *Hal qilingan* uslub qiymati - elementga oxir-oqibat qo'llaniladigan qiymat. `1em` yoki `125%` kabi qiymatlar nisbiy. Brauzer hisoblangan qiymatni oladi va barcha birliklarni sobit va mutlaq qiladi, masalan: `height:20px` yoki `font-size:16px`. Geometrik xususiyatlar uchun hal qilingan qiymatlar `width:50.5px` kabi suzuvchi nuqtaga ega bo'lishi mumkin.

Uzoq vaqt oldin `getComputedStyle` hisoblangan qiymatlarni olish uchun yaratilgan, lekin hal qilingan qiymatlar ancha qulay ekanligi ma'lum bo'ldi va standart o'zgartirildi.

Shunday qilib, hozirda `getComputedStyle` aslida xususiyatning hal qilingan qiymatini qaytaradi, odatda geometriya uchun `px` da.
```

````warn header="`getComputedStyle` to'liq xususiyat nomini talab qiladi"
Biz har doim xohlagan aniq xususiyatni so'rashimiz kerak, masalan `paddingLeft` yoki `marginTop` yoki `borderTopWidth`. Aks holda to'g'ri natija kafolatlanmaydi.

Masalan, agar `paddingLeft/paddingTop` xususiyatlari bo'lsa, `getComputedStyle(elem).padding` uchun nimani olishimiz kerak? Hech narsa yoki ma'lum paddinglardan "yaratilgan" qiymatmi? Bu yerda standart qoida yo'q.

Boshqa nomuvofiqliklar ham bor. Misol tariqasida, ba'zi brauzerlar (Chrome) quyidagi hujjatda `10px` ko'rsatadi, ba'zilari (Firefox) esa ko'rsatmaydi:

```html run
<style>
  body {
    margin: 10px;
  }
</style>
<script>
  let style = getComputedStyle(document.body);
  alert(style.margin); // Firefox da bo'sh satr
</script>
```
`````

```smart header="`:visited`havolalarga qo'llaniladigan uslublar yashirin!"
Tashrif buyurilgan havolalar`:visited` CSS psevdosinfi yordamida ranglanishi mumkin.

Ammo `getComputedStyle` o'sha rangga kirish imkonini bermaydi, aks holda ixtiyoriy sahifa foydalanuvchi havolaga tashrif buyurganligini bilib olishi mumkin edi - sahifada uni yaratib, uslublarni tekshirish orqali.

JavaScript `:visited` tomonidan qo'llaniladigan uslublarni ko'rmaydi. Shuningdek, CSS da `:visited` da geometriyani o'zgartiradigan uslublarni qo'llashni taqiqlovchi cheklov mavjud. Bu yovuz sahifa havolaga tashrif buyurilganligini sinab ko'rish va shaxsiylikni buzish uchun yonbosh yo'l yo'qligini kafolatlash uchun.

```

## Xulosa

Sinflarni boshqarish uchun ikkita DOM xususiyati mavjud:

- `className` -- satr qiymati, sinflarning butun to'plamini boshqarish uchun yaxshi.
- `classList` -- `add/remove/toggle/contains` usullari bo'lgan obyekt, alohida sinflar uchun yaxshi.

Uslublarni o'zgartirish uchun:

- `style` xususiyati camelCase uslublari bo'lgan obyekt. Uni o'qish va yozish `"style"` atributidagi alohida xususiyatlarni o'zgartirishga teng ma'noni beradi. `important` va boshqa kam uchraydigan narsalarni qo'llash usulini ko'rish uchun -- [MDN](mdn:api/CSSStyleDeclaration) da usullar ro'yxati mavjud.

- `style.cssText` xususiyati butun `"style"` atributiga, uslublarning to'liq satrga mos keladi.

Hal qilingan uslublarni o'qish uchun (barcha sinflarni hisobga olgan holda, barcha CSS qo'llanilgandan va yakuniy qiymatlar hisoblab chiqilgandan keyin):

- `getComputedStyle(elem, [pseudo])` ular bilan uslub-o'xshash obyektni qaytaradi. Faqat o'qish uchun.

export default ({ children }) => <div>{children}</div>;
```
