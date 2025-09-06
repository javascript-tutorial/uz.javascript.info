---
libs:
  - d3
  - domtree
---

# DOM daraxti

HTML hujjatining asosi - bu teglardir.

Hujjat obyekti modeli (DOM)ga ko'ra, har bir HTML tegi obyektdir. Ichki joylashgan teglar tashqi tegning "bolalari" hisoblanadi. Teg ichidagi matn ham obyekt hisoblanadi.

Bu barcha obyektlar JavaScript yordamida murojaat qilinishi mumkin va biz ulardan sahifani o'zgartirish uchun foydalanishimiz mumkin.

Masalan, `document.body` - bu `<body>` tegini ifodalovchi obyekt.

Ushbu kodni ishga tushirish `<body>` ni 3 soniya davomida qizil rangga o'zgartiradi:

```js run
document.body.style.background = 'red'; // fon rangini qizilga o'zgartirish

setTimeout(() => document.body.style.background = '', 3000); // qaytarish
```

Bu yerda biz `document.body` ning fon rangini o'zgartirish uchun `style.background` ishlatdik, lekin boshqa ko'plab xususiyatlar ham mavjud, masalan:

- `innerHTML` -- tugunning HTML tarkibi.
- `offsetWidth` -- tugun kengligi (piksel hisobida)
- ...va hokazo.

Tez orada DOM bilan ishlashning ko'proq usullarini o'rganamiz, lekin avval uning tuzilishi haqida bilishimiz kerak.

## DOM misolli

Keling, quyidagi oddiy hujjat bilan boshlaylik:

```html run no-beautify
<!DOCTYPE HTML>
<html>
<head>
  <title>Bug'u haqida</title>
</head>
<body>
  Bug'u haqidagi haqiqat.
</body>
</html>
```

DOM HTML ni teglarning daraxt tuzilishi sifatida ifodalaydi. Qanday ko'rinishi:

<div className="domtree"></div>

<script>
{`let node1 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\\n  "},{"name":"TITLE","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Bug'u haqida"}]},{"name":"#text","nodeType":3,"content":"\\n"}]},{"name":"#text","nodeType":3,"content":"\\n"},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\\n  Bug'u haqidagi haqiqat.\\n\\n\\n"}]}]}

drawHtmlTree(node1, 'div.domtree', 690, 320);`}
</script>

```online
Yuqoridagi rasmda siz element tugunlariga bosgingizda, ularning bolalari ochiladi/yopiladi.
```

Har bir daraxt tuguni obyekt hisoblanadi.

Teglar *element tugunlari* (yoki shunchaki elementlar) bo'lib, daraxt tuzilishini hosil qiladi: `<html>` ildizda, keyin `<head>` va `<body>` uning bolalari va hokazo.

Elementlar ichidagi matn *matn tugunlarini* hosil qiladi, ular `#text` deb belgilanadi. Matn tuguni faqat qator saqlaydi. U bolalarga ega bo'lishi mumkin emas va har doim daraxtning bargidir.

Masalan, `<title>` tegi `"Bug'u haqida"` matniga ega.

Matn tugunlaridagi maxsus belgilarga e'tibor bering:

- yangi qator: `↵` (JavaScript da `\n` deb tanilgan)
- bo'sh joy: `␣`

Bo'shliqlar va yangi qatorlar harflar va raqamlar kabi to'liq haqiqiy belgilardir. Ular matn tugunlarini hosil qiladi va DOM ning bir qismiga aylanadi. Shunday qilib, masalan, yuqoridagi misolda `<head>` tegi `<title>` dan oldin ba'zi bo'shliqlarni o'z ichiga oladi va bu matn `#text` tuguni bo'ladi (u faqat yangi qator va ba'zi bo'shliqlarni o'z ichiga oladi).

Faqat ikkita yuqori darajadagi istisnolar mavjud:
1. `<head>` dan oldingi bo'shliqlar va yangi qatorlar tarixiy sabablarga ko'ra e'tiborga olinmaydi.
2. Agar biz `</body>` dan keyin biror narsa qo'ysak, u avtomatik ravishda `body` ichiga, oxirigacha ko'chiriladi, chunki HTML spetsifikatsiyasi barcha tarkib `<body>` ichida bo'lishini talab qiladi. Shuning uchun `</body>` dan keyin hech qanday bo'shliq bo'lishi mumkin emas.

Boshqa hollarda hamma narsa oddiy - agar hujjatda bo'shliqlar bo'lsa (boshqa belgilar kabi), ular DOM da matn tugunlariga aylanadi va agar biz ularni olib tashlasak, unda hech qanday bo'shliq qolmaydi.

Bu yerda faqat bo'shliqli matn tugunlari yo'q:

```html no-beautify
<!DOCTYPE HTML>
<html><head><title>Bug'u haqida</title></head><body>Bug'u haqidagi haqiqat.</body></html>
```

<div className="domtree"></div>

<script>
{`let node2 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[{"name":"TITLE","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Bug'u haqida"}]}]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Bug'u haqidagi haqiqat."}]}]}

drawHtmlTree(node2, 'div.domtree', 690, 210);`}
</script>

```smart header="Qator boshi/oxiridagi bo'shliqlar va faqat bo'shliqli matn tugunlari odatda vositalarda yashirinadi"
DOM bilan ishlaydigan brauzer vositalari (tez orada yoritiladi) odatda matn boshi/oxiridagi bo'shliqlarni va teglar orasidagi bo'sh matn tugunlarini (qator uzilishlari) ko'rsatmaydi.

Dasturchi vositalari bu tarzda ekran joyini tejaydi.

Keyingi DOM rasmlarida biz ba'zan ularni ahamiyatsiz bo'lganda tashlab qo'yamiz. Bunday bo'shliqlar odatda hujjat qanday ko'rsatilishiga ta'sir qilmaydi.
```

## Avtomatik tuzatish

Agar brauzer noto'g'ri HTML ga duch kelsa, u DOM yaratishda avtomatik ravishda uni tuzatadi.

Masalan, eng yuqori teg har doim `<html>` hisoblanadi. Hatto u hujjatda mavjud bo'lmasa ham, u DOM da mavjud bo'ladi, chunki brauzer uni yaratadi. Xuddi shuningdek `<body>` uchun ham.

Masalan, agar HTML fayl bitta "Salom" so'zi bo'lsa, brauzer uni `<html>` va `<body>` ga o'raydi va kerakli `<head>` ni qo'shadi, va DOM quyidagicha bo'ladi:

<div className="domtree"></div>

<script>
{`let node3 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Salom"}]}]}

drawHtmlTree(node3, 'div.domtree', 690, 150);`}
</script>

DOM yaratishda brauzerlar hujjatdagi xatolikni avtomatik ravishda qayta ishlaydi, teglarni yopadi va hokazo.

Yopilmagan tegli hujjat:

```html no-beautify
<p>Salom
<li>Ona
<li>va
<li>Ota
```

...brauzer teglarni o'qib, etishmayotgan qismlarni tiklashda oddiy DOM ga aylanadi:

<div className="domtree"></div>

<script>
{`let node4 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"P","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Salom"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Ona"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"va"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Ota"}]}]}]}

drawHtmlTree(node4, 'div.domtree', 690, 360);`}
</script>

````warn header="Jadvallar har doim `<tbody>` ga ega"
Qiziqarli "maxsus holat" - bu jadvallar. DOM spetsifikatsiyasiga ko'ra, ular `<tbody>` tegiga ega bo'lishi kerak, lekin HTML matn uni tashlab qo'yishi mumkin. Keyin brauzer DOM da `<tbody>` ni avtomatik ravishda yaratadi.

HTML uchun:

```html no-beautify
<table id="table"><tr><td>1</td></tr></table>
```

DOM tuzilishi quyidagicha bo'ladi:
<div className="domtree"></div>

<script>
{`let node5 = {"name":"TABLE","nodeType":1,"children":[{"name":"TBODY","nodeType":1,"children":[{"name":"TR","nodeType":1,"children":[{"name":"TD","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"1"}]}]}]}]};

drawHtmlTree(node5,  'div.domtree', 600, 200);`}
</script>

Ko'rdingizmi? `<tbody>` yo'qdan paydo bo'ldi. Jadvallar bilan ishlashda kutilmagan vaziyatlardan qochish uchun buni yodda tutishimiz kerak.
````

## Boshqa tugun turlari

Elementlar va matn tugunlaridan tashqari boshqa tugun turlari ham mavjud.

Masalan, izohlar:

```html
<!DOCTYPE HTML>
<html>
<body>
  Bug'u haqidagi haqiqat.
  <ol>
    <li>Bug'u aqlli hayvondir</li>
*!*
    <!-- izoh -->
*/!*
    <li>...va ayyor hayvon!</li>
  </ol>
</body>
</html>
```

<div className="domtree"></div>

<script>
{`let node6 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\\n  Bug'u haqidagi haqiqat.\\n  "},{"name":"OL","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\\n    "},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Bug'u aqlli hayvondir"}]},{"name":"#text","nodeType":3,"content":"\\n    "},{"name":"#comment","nodeType":8,"content":"izoh"},{"name":"#text","nodeType":3,"content":"\\n    "},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"...va ayyor hayvon!"}]},{"name":"#text","nodeType":3,"content":"\\n  "}]},{"name":"#text","nodeType":3,"content":"\\n\\n\\n"}]}]};

drawHtmlTree(node6, 'div.domtree', 690, 500);`}
</script>

Bu yerda biz yangi daraxt tuguni turini ko'rishimiz mumkin - *izoh tuguni*, `#comment` deb belgilangan, ikki matn tuguni orasida.

Biz o'ylashimiz mumkin - nima uchun izoh DOM ga qo'shilgan? U vizual tasvirga hech qanday ta'sir qilmaydi. Lekin bir qoida bor - agar HTML da biror narsa bo'lsa, u DOM daraxtida ham bo'lishi kerak.

**HTML dagi hamma narsa, hatto izohlar ham, DOM ning bir qismi bo'ladi.**

Hatto HTML ning eng boshidagi `<!DOCTYPE...>` direktivi ham DOM tuguni hisoblanadi. U DOM daraxtida `<html>` dan oldin joylashgan. Buni kam odam biladi. Biz bu tugunga tegmaymiz, hatto diagrammalarda chizmaymiz ham, lekin u bor.

Butun hujjatni ifodalovchi `document` obyekti ham rasman DOM tuguni hisoblanadi.

[12 ta tugun turi](https://dom.spec.whatwg.org/#node) mavjud. Amaliyotda biz odatda ulardan 4 tasi bilan ishlaymiz:

1. `document` -- DOM ga "kirish nuqtasi".
2. element tugunlari -- HTML-teglar, daraxt qurish bloklari.
3. matn tugunlari -- matnni o'z ichiga oladi.
4. izohlar -- ba'zan biz u yerga ma'lumot qo'yishimiz mumkin, u ko'rsatilmaydi, lekin JS uni DOM dan o'qishi mumkin.

## O'zingiz ko'ring

DOM tuzilishini real vaqtda ko'rish uchun [Live DOM Viewer](http://software.hixie.ch/utilities/js/live-dom-viewer/) ni sinab ko'ring. Shunchaki hujjatni yozing va u bir zumda DOM sifatida ko'rsatiladi.

DOM ni o'rganishning boshqa usuli - brauzer dasturchi vositalaridan foydalanish. Aslida, biz rivojlanishda shu usuldan foydalanamiz.

Buning uchun [elk.html](elk.html) veb-sahifasini oching, brauzer dasturchi vositalarini yoqing va Elements tabiga o'ting.

Bu quyidagicha ko'rinishi kerak:

![](elk.svg)

Siz DOM ni ko'rishingiz, elementlarga bosishingiz, ularning tafsilotlarini ko'rishingiz va hokazo mumkin.

E'tibor bering, dasturchi vositalaridagi DOM tuzilishi soddalashtirilgan. Matn tugunlari shunchaki matn sifatida ko'rsatilgan. Va hech qanday "bo'sh" (faqat bo'shliqli) matn tugunlari yo'q. Bu yaxshi, chunki ko'pincha biz element tugunlariga qiziqamiz.

Chap yuqori burchakdagi <span className="devtools" style={{backgroundPosition:'-328px -124px'}}></span> tugmasini bosish bizga sichqoncha (yoki boshqa ko'rsatish qurilmalari) yordamida veb-sahifadan tugun tanlash va uni "tekshirish" imkonini beradi (Elements tabida unga scroll qilish). Bu bizda katta HTML sahifa (va mos ravishda katta DOM) bo'lganda va ma'lum bir elementning joylashgan joyini ko'rishni xohlaganimizda juda yaxshi ishlaydi.

Boshqa usul - veb-sahifaga o'ng tugmacha bosish va kontekst menyusida "Inspect" ni tanlash.

![](inspect.svg)

Vositalarning o'ng qismida quyidagi pastki tablar mavjud:
- **Styles** -- biz joriy elementga qo'llangan CSS ni qoida bo'yicha ko'rishimiz mumkin, shu jumladan ichki qoidalar (kulrang). Deyarli hamma narsani joyida tahrir qilish mumkin, shu jumladan pastdagi qutining o'lchamlari/chetlari/to'ldirishlari.
- **Computed** -- elementga xususiyat bo'yicha qo'llangan CSS ni ko'rish uchun: har bir xususiyat uchun biz uni beradigan qoidani ko'rishimiz mumkin (CSS meroschiligi va shunga o'xshashlarni hisobga olgan holda).
- **Event Listeners** -- DOM elementlariga biriktirilgan voqea tinglovchilarini ko'rish uchun (biz ularni o'quv qo'llanmaning keyingi qismida yoritamiz).
- ...va hokazo.

Ularni o'rganishning eng yaxshi usuli - atrofga bosish. Ko'pgina qiymatlarni joyida tahrir qilish mumkin.

## Konsol bilan o'zaro aloqa

DOM bilan ishlashda biz unga JavaScript qo'llashni ham xohlashimiz mumkin. Masalan: tugun olish va uni o'zgartirish uchun ba'zi kodlarni ishga tushirish, natijani ko'rish. Elements tab va konsol orasida sayohat qilish uchun bir nechta maslahatlar:

Boshlash uchun:

1. Elements tabida birinchi `<li>` ni tanlang.
2. `key:Esc` tugmasini bosing -- bu Elements tabining pastida konsolni ochadi.

Endi oxirgi tanlangan element `$0` sifatida, avval tanlangan `$1` sifatida va hokazo mavjud.

Biz ularda buyruqlar bajarishimiz mumkin. Masalan, `$0.style.background = 'red'` tanlangan ro'yxat elementini qizil qiladi, quyidagicha:

![](domconsole0.svg)

Elements dan Konsolga tugun olishning usuli shu.

Teskari yo'l ham bor. Agar DOM tuguniga havola qiluvchi o'zgaruvchi bo'lsa, unda biz uni Elements panelida ko'rish uchun Konsolda `inspect(node)` buyrug'idan foydalanishimiz mumkin.

Yoki biz shunchaki DOM tugunini konsolda chiqarib, "joyida" o'rganishimiz mumkin, quyidagi `document.body` kabi:

![](domconsole1.svg)

Bu, albatta, disk raskadrovka maqsadlari uchun. Keyingi bobdan boshlab biz DOM ga JavaScript yordamida murojaat qilamiz va uni o'zgartiramiz.

Brauzer dasturchi vositalari rivojlanishda ajoyib yordam beradi: biz DOM ni tekshirishimiz, narsalarni sinab ko'rishimiz va nima noto'g'ri ekanligini ko'rishimiz mumkin.

## Xulosa

HTML/XML hujjati brauzer ichida DOM daraxt sifatida ifodalanadi.

- Teglar element tugunlariga aylanadi va tuzilishni hosil qiladi.
- Matn matn tugunlariga aylanadi.
- ...va hokazo, HTML dagi hamma narsaning DOM da o'z o'rni bor, hatto izohlar ham.

Biz DOM ni tekshirish va uni qo'lda o'zgartirish uchun dasturchi vositalaridan foydalanishimiz mumkin.

Bu yerda biz asosiy bilimlarni, eng ko'p ishlatiladigan va muhim amallarni yoritdik. Chrome Developer Tools haqida keng qamrovli hujjatlar <https://developers.google.com/web/tools/chrome-devtools> da mavjud. Vositalarni o'rganishning eng yaxshi usuli - u yerda va bu yerda bosish, menyularni o'qish: ko'pgina variantlar aniq. Keyinchalik, ularni umumiy bilganingizda, hujjatlarni o'qing va qolganini o'rganib oling.

DOM tugunlari ular orasida sayohat qilish, ularni o'zgartirish, sahifa bo'ylab harakat qilish va boshqa ko'p narsalar uchun xususiyatlar va usullarga ega. Biz keyingi boblarda ularga to'xtalamiz.