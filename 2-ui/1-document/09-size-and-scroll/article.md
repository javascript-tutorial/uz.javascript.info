# Element o'lchami va skrolling

Element kengligi, balandligi va boshqa geometrik xususiyatlar haqida ma'lumot o'qishga imkon beradigan ko'plab JavaScript xususiyatlari mavjud.

JavaScript da elementlarni ko'chirish yoki joylashtirish paytida bizga ular tez-tez kerak bo'ladi.

## Namuna element

Xususiyatlarni namoyish etish uchun namuna element sifatida quyidagini ishlatamiz:

```html no-beautify
<div id="example">...Matn...</div>
<style>
  #example {
    width: 300px;
    height: 200px;
    border: 25px solid #e8c48f;
    padding: 20px;
    overflow: auto;
  }
</style>
```

Unda chegara, padding va skrolling mavjud. Xususiyatlarning to'liq to'plami. Marjinlar yo'q, chunki ular elementning o'zining qismi emas va ular uchun maxsus xususiyatlar yo'q.

Element quyidagicha ko'rinadi:

![](metric-css.svg)

Siz [hujjatni sandbox da ochishingiz](sandbox:metric) mumkin.

```smart header="Skrollbarga e'tibor bering"
Yuqoridagi rasm elementda skrollbar mavjud bo'lgan eng murakkab holatni ko'rsatadi. Ba'zi brauzerlar (hammasi emas) uni kontent maydonidan olib (yuqorida "kontent kengligi" deb belgilangan) joy ajratadilar.

Shunday qilib, skrollbarsiz kontent kengligi `300px` bo'ladi, lekin agar skrollbar `16px` keng bo'lsa (kenglik qurilmalar va brauzerlar orasida farq qilishi mumkin), faqat `300 - 16 = 284px` qoladi va buni hisobga olishimiz kerak. Shuning uchun ushbu bo'limdagi misollar skrollbar mavjud deb faraz qiladi. Usiz ba'zi hisob-kitoblar oddiyroq.
```

```smart header="`padding-bottom`maydoni matn bilan to'ldirilishi mumkin"
Odatda paddinglar bizning rasmlarimizda bo'sh ko'rsatiladi, lekin agar elementda juda ko'p matn bo'lsa va u to'lib ketsa, brauzerlar "to'lib ketgan" matnni`padding-bottom` da ko'rsatadilar, bu normal holat.

````

## Geometriya

Mana geometrik xususiyatlar bilan umumiy rasm:

![](metric-all.svg)

Bu xususiyatlarning qiymatlari texnik jihatdan sonlar, lekin bu sonlar "piksellardan" iborat, ya'ni piksel o'lchamlari.

Elementning tashqi qismidan boshlab xususiyatlarni o'rganishni boshlaymiz.

## offsetParent, offsetLeft/Top

Bu xususiyatlar kamdan-kam kerak bo'ladi, lekin baribir ular "eng tashqi" geometrik xususiyatlar, shuning uchun ular bilan boshlaymiz.

`offsetParent` - brauzer rendering paytida koordinatalarni hisoblash uchun foydalanadigan eng yaqin ajdod.

Bu quyidagilardan birining eng yaqin ajdodi:

1. CSS-joylashtirilgan (`position` `absolute`, `relative`, `fixed` yoki `sticky`), yoki
2. `<td>`, `<th>`, yoki `<table>`, yoki
3. `<body>`.

`offsetLeft/offsetTop` xususiyatlari `offsetParent` ning chap yuqori burchagiga nisbatan x/y koordinatalarini beradi.

Quyidagi misolda ichki `<div>` `<main>` ni `offsetParent` sifatida oladi va `offsetLeft/offsetTop` uning chap yuqori burchagidan (`180`) siljiydi:

```html run height=10
<main style="position: relative" id="main">
  <article>
    <div id="example" style="position: absolute; left: 180px; top: 180px">...</div>
  </article>
</main>
<script>
  alert(example.offsetParent.id); // main
  alert(example.offsetLeft); // 180 (e'tibor: raqam, "180px" satri emas)
  alert(example.offsetTop); // 180
</script>
````

![](metric-offset-parent.svg)

`offsetParent` ning `null` bo'ladigan bir necha holati bor:

1. Ko'rsatilmagan elementlar uchun (`display:none` yoki hujjatda yo'q).
2. `<body>` va `<html>` uchun.
3. `position:fixed` bo'lgan elementlar uchun.

## offsetWidth/Height

Endi elementning o'ziga o'tamiz.

Bu ikki xususiyat eng oddiy. Ular elementning "tashqi" kengligi/balandligini beradi. Yoki boshqacha aytganda, chegaralar bilan birga to'liq o'lcham.

![](metric-offset-width-height.svg)

Bizning namuna elementimiz uchun:

- `offsetWidth = 390` -- tashqi kenglik, ichki CSS-kenglik (`300px`) plus paddinglar (`2 * 20px`) va chegaralar (`2 * 25px`) sifatida hisoblanishi mumkin.
- `offsetHeight = 290` -- tashqi balandlik.

````smart header="Ko'rsatilmagan elementlar uchun geometrik xususiyatlar nol/null"
Geometrik xususiyatlar faqat ko'rsatilgan elementlar uchun hisoblanadi.

Agar element (yoki uning ajdodlaridan biri) `display:none` ga ega bo'lsa yoki hujjatda bo'lmasa, barcha geometrik xususiyatlar nolga teng (`offsetParent` uchun `null`).

Masalan, biz element yaratganimizda, lekin uni hali hujjatga qo'ymaganimizda yoki u (yoki uning ajdodi) `display:none` ga ega bo'lganda `offsetParent` `null` va `offsetWidth`, `offsetHeight` `0` bo'ladi.

Biz buni element yashirin ekanligini tekshirish uchun ishlatishimiz mumkin:

```js
function isHidden(elem) {
  return !elem.offsetWidth && !elem.offsetHeight;
}
```

E'tibor bering, bunday `isHidden` ekranda bo'lgan, lekin nol o'lchamga ega elementlar (bo'sh `<div>` kabi) uchun `true` qaytaradi.
````

## clientTop/Left

Element ichida chegaralar mavjud.

Ularni o'lchash uchun `clientTop` va `clientLeft` xususiyatlari mavjud.

Bizning misolimizda:

- `clientLeft = 25` -- chap chegara kengligi
- `clientTop = 25` -- yuqori chegara kengligi

![](metric-client-left-top.svg)

...Ammo aniq aytganda -- bu xususiyatlar chegara kengligi/balandligi emas, balki tashqi tomondan ichki tomonning nisbiy koordinatalari.

Farq nimada?

Bu hujjat o'ngdan chapga (operatsion tizim arab yoki ibroniy tillarida) bo'lganda ko'rinadi. Skrollbar u holda o'ngda emas, balki chapda bo'ladi va keyin `clientLeft` skrollbar kengligini ham o'z ichiga oladi.

Bu holda `clientLeft` `25` emas, balki skrollbar kengligi bilan `25 + 16 = 41` bo'ladi.

Mana ibroniycha misol:

![](metric-client-left-top-rtl.svg)

## clientWidth/Height

Bu xususiyatlar element chegaralari ichidagi maydon o'lchamini beradi.

Ular paddinglar bilan birga kontent kengligini o'z ichiga oladi, lekin skrollbarsiz:

![](metric-client-width-height.svg)

Yuqoridagi rasmda avval `clientHeight` ni ko'rib chiqaylik.

Gorizontal skrollbar yo'q, shuning uchun bu chegaralar ichidagilarning aniq yig'indisi: CSS-balandlik `200px` plus yuqori va pastki paddinglar (`2 * 20px`) jami `240px`.

Endi `clientWidth` -- bu yerda kontent kengligi `300px` emas, balki `284px`, chunki `16px` ni skrollbar egallagan. Demak, yig'indi `284px` plus chap va o'ng paddinglar, jami `324px`.

**Agar paddinglar bo'lmasa, `clientWidth/Height` aniq kontent maydoni, chegaralar va skrollbar (agar mavjud bo'lsa) ichida.**

![](metric-client-width-nopadding.svg)

Shunday qilib, padding bo'lmaganda kontent maydoni o'lchamini olish uchun `clientWidth/clientHeight` dan foydalanishimiz mumkin.

## scrollWidth/Height

Bu xususiyatlar `clientWidth/clientHeight` ga o'xshaydi, lekin ular skroll qilingan (yashirin) qismlarni ham o'z ichiga oladi:

![](metric-scroll-width-height.svg)

Yuqoridagi rasmda:

- `scrollHeight = 723` -- skroll qilingan qismlar bilan birga kontent maydonining to'liq ichki balandligi.
- `scrollWidth = 324` -- to'liq ichki kenglik, bu yerda gorizontal skroll yo'q, shuning uchun `clientWidth` ga teng.

Bu xususiyatlarni elementni to'liq kenglik/balandlikgacha kengaytirish uchun ishlatishimiz mumkin.

Masalan:

```js
// elementni to'liq kontent balandligiga kengaytirish
element.style.height = `${element.scrollHeight}px`;
```

```online
Elementni kengaytirish uchun tugmani bosing:

<div id="element" style="width:300px;height:200px; padding: 0;overflow: auto; border:1px solid black;">matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn matn</div>

<button style="padding:0" onclick="element.style.height = `${element.scrollHeight}px`">element.style.height = `${element.scrollHeight}px`</button>
```

## scrollLeft/scrollTop

`scrollLeft/scrollTop` xususiyatlari elementning yashirin, skroll qilingan qismining kengligi/balandligi.

Quyidagi rasmda vertikal skrolli blok uchun `scrollHeight` va `scrollTop` ni ko'rishimiz mumkin.

![](metric-scroll-top.svg)

Boshqacha qilib aytganda, `scrollTop` - bu "qancha yuqoriga skroll qilingan".

````smart header="`scrollLeft/scrollTop`ni o'zgartirish mumkin"
Bu yerdagi geometrik xususiyatlarning ko'pchiligi faqat o'qish uchun, lekin`scrollLeft/scrollTop` ni o'zgartirish mumkin va brauzer elementni skroll qiladi.

```online
Agar quyidagi elementni bossangiz, `elem.scrollTop += 10` kodi bajariladi. Bu element kontentini `10px` pastga skroll qiladi.

<div onclick="this.scrollTop+=10" style="cursor:pointer;border:1px solid black;width:100px;height:80px;overflow:auto">Click<br>Me<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9</div>
```

`scrollTop` ni `0` yoki `1e9` kabi katta qiymatga o'rnatish elementni eng yuqoriga/pastga skroll qiladi.

````

## CSS dan kenglik/balandlik olmang

Biz hozirgina DOM elementlarining geometrik xususiyatlarini ko'rib chiqdik, ular kenglik, balandlik olish va masofalarni hisoblash uchun ishlatilishi mumkin.

Ammo <info:styles-and-classes> bo'limidan bilganimizdek, biz `getComputedStyle` yordamida CSS-balandlik va kenglikni o'qiy olamiz.

Unda nima uchun elementning kengligini `getComputedStyle` bilan o'qimaslik kerak, masalan:

```js run
let elem = document.body;

alert( getComputedStyle(elem).width ); // elem uchun CSS kengligini ko'rsatish
```

Nima uchun geometrik xususiyatlardan foydalanishimiz kerak? Buning ikki sababi bor:

1. Birinchidan, CSS `width/height` boshqa xususiyatga bog'liq: `box-sizing` CSS kenglik va balandligi "nima ekanligini" belgilaydi. CSS maqsadlari uchun `box-sizing` ni o'zgartirish bunday JavaScript ni buzishi mumkin.
2. Ikkinchidan, CSS `width/height` `auto` bo'lishi mumkin, masalan inline element uchun:

    ```html run
    <span id="elem">Salom!</span>

    <script>
    *!*
      alert( getComputedStyle(elem).width ); // auto
    */!*
    </script>
    ```

    CSS nuqtai nazaridan `width:auto` juda normal, lekin JavaScript da bizga hisob-kitoblarda ishlatishimiz mumkin bo'lgan `px` dagi aniq o'lcham kerak. Demak, bu yerda CSS kengligi foydasiz.

Va yana bir sabab bor: skrollbar. Ba'zan skrollbarsiz yaxshi ishlaydigan kod u bilan xatolikka yo'l qo'yadi, chunki skrollbar ba'zi brauzerlarda kontentdan joy oladi. Shunday qilib, kontent uchun mavjud bo'lgan haqiqiy kenglik CSS kengligidan *kamroq*. Va `clientWidth/clientHeight` buni hisobga oladi.

...Ammo `getComputedStyle(elem).width` bilan vaziyat boshqacha. Ba'zi brauzerlar (masalan, Chrome) skrollbarni minus qilib haqiqiy ichki kenglikni qaytaradi, ba'zilari (masalan, Firefox) esa CSS kengligini (skrollbarni e'tiborsiz qoldiradi). Bunday brauzerlararo farqlar `getComputedStyle` dan foydalanmaslik va geometrik xususiyatlarga tayanish sababidir.

```online
Agar brauzeringiz skrollbar uchun joy ajratsa (Windows uchun ko'pchilik brauzerlar shunday qiladi), uni quyida sinab ko'rishingiz mumkin.

[iframe src="cssWidthScroll" link border=1]

Matnli element CSS `width:300px` ga ega.

Desktop Windows OS da Firefox, Chrome, Edge hammasi skrollbar uchun joy ajratadilar. Lekin Firefox `300px` ko'rsatadi, Chrome va Edge esa kamroq. Buning sababi Firefox CSS kengligini qaytaradi, boshqa brauzerlar esa "haqiqiy" kenglikni qaytaradi.
```

E'tibor bering, tasvirlangan farq faqat JavaScript dan `getComputedStyle(...).width` ni o'qish haqida, vizual jihatdan hamma narsa to'g'ri.

## Xulosa

Elementlar quyidagi geometrik xususiyatlarga ega:

- `offsetParent` -- eng yaqin joylashtirilgan ajdod yoki `td`, `th`, `table`, `body`.
- `offsetLeft/offsetTop` -- `offsetParent` ning chap yuqori chetiga nisbatan koordinatalar.
- `offsetWidth/offsetHeight` -- chegaralar bilan birga elementning "tashqi" kengligi/balandligi.
- `clientLeft/clientTop` -- chap yuqori tashqi burchakdan chap yuqori ichki (kontent + padding) burchakgacha bo'lgan masofalar. Chapdan o'ngga OS lar uchun ular har doim chap/yuqori chegaralar kengligi. O'ngdan chapga OS lar uchun vertikal skrollbar chapda joylashgan, shuning uchun `clientLeft` uning kengligini ham o'z ichiga oladi.
- `clientWidth/clientHeight` -- paddinglar bilan birga kontentning kengligi/balandligi, lekin skrollbarsiz.
- `scrollWidth/scrollHeight` -- kontentning kengligi/balandligi, `clientWidth/clientHeight` kabi, lekin elementning skroll qilingan, ko'rinmaydigan qismini ham o'z ichiga oladi.
- `scrollLeft/scrollTop` -- elementning chap yuqori burchagidan boshlab skroll qilingan yuqori qismning kengligi/balandligi.

Barcha xususiyatlar faqat o'qish uchun, `scrollLeft/scrollTop` dan tashqari - ular o'zgartirilsa brauzer elementni skroll qiladi.

export default ({ children }) => <div>{children}</div>;
````
