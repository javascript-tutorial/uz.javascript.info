# Cross-window aloqa

"Same Origin" (bir xil sayt) siyosati oynalar va ramkalarning bir-biriga kirishini cheklaydi.

G'oya shundaki, agar foydalanuvchida ikkita sahifa ochildi bo'lsa: biri `john-smith.com` dan, ikkinchisi esa `gmail.com` dan, u holda ular `john-smith.com` dan skriptning `gmail.com` dan bizning pochtamizni o'qishini xohlamaydi. Shunday qilib, "Same Origin" siyosatining maqsadi foydalanuvchilarni ma'lumotlar o'g'irlanishidan himoya qilishdir.

## Same Origin [#same-origin]

Ikki URL bir xil protokol, domen va portga ega bo'lsa, ularning "bir xil kelib chiqishi" bor deyiladi.

Bu URLlar hammasi bir xil kelib chiqishni baham ko'radi:

- `http://site.com`
- `http://site.com/`
- `http://site.com/my/page.html`

Bular esa yo'q:

- <code>http://<b>www.</b>site.com</code> (boshqa domen: `www.` muhim)
- <code>http://<b>site.org</b></code> (boshqa domen: `.org` muhim)
- <code><b>https://</b>site.com</code> (boshqa protokol: `https`)
- <code>http://site.com:<b>8080</b></code> (boshqa port: `8080`)

"Same Origin" siyosati quyidagicha:

- agar bizda boshqa oynaga havola bor bo'lsa, masalan `window.open` tomonidan yaratilgan popup yoki `<iframe>` ichidagi oyna, va bu oyna bir xil kelib chiqishdan kelsa, u holda bizda o'sha oynaga to'liq kirish huquqi bor.
- aks holda, agar u boshqa kelib chiqishdan kelsa, u holda biz o'sha oynaning kontentiga kira olmaymiz: o'zgaruvchilar, hujjat, hech narsa. Yagona istisno `location`: biz uni o'zgartirishimiz mumkin (shu bilan foydalanuvchini yo'naltirish). Lekin biz location ni *o'qiy* olmaymiz (shuning uchun foydalanuvchi hozir qayerda ekanligini ko'ra olmaymiz, ma'lumot sizib chiqishi yo'q).

### Amalda: iframe

`<iframe>` tegi o'zining alohida `document` va `window` obyektlari bilan alohida o'rnatilgan oynani joylashtiradi.

Biz ularga xossalar orqali kirishimiz mumkin:

- `iframe.contentWindow` `<iframe>` ichidagi oynani olish uchun.
- `iframe.contentDocument` `<iframe>` ichidagi hujjatni olish uchun, `iframe.contentWindow.document` ning qisqartmasi.

O'rnatilgan oyna ichidagi biror narsaga kirganimizda, brauzer iframe ning bir xil kelib chiqishga ega ekanligini tekshiradi. Agar bunday bo'lmasa, kirish rad etiladi (`location` ga yozish istisno, u hali ham ruxsat etilgan).

Masalan, boshqa kelib chiqishdan `<iframe>` ga o'qish va yozishga harakat qilaylik:

```html run
<iframe src="https://example.com" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // biz ichki oynaga havolani olishimiz mumkin
*!*
    let iframeWindow = iframe.contentWindow; // OK
*/!*
    try {
      // ...lekin uning ichidagi hujjatga emas
*!*
      let doc = iframe.contentDocument; // ERROR
*/!*
    } catch(e) {
      alert(e); // Security Error (boshqa kelib chiqish)
    }

    // shuningdek, biz iframe dagi sahifaning URL ini o'qiy olmaymiz
    try {
      // Location obyektidan URL ni o'qib bo'lmaydi
*!*
      let href = iframe.contentWindow.location.href; // ERROR
*/!*
    } catch(e) {
      alert(e); // Security Error
    }

    // ...biz location ga YOZishimiz mumkin (va shu tariqa iframe ga boshqa narsani yuklash)!
*!*
    iframe.contentWindow.location = '/'; // OK
*/!*

    iframe.onload = null; // handleni tozalash, location o'zgarishidan keyin uni ishga tushirmaslik uchun
  };
</script>
```

Yuqoridagi kod quyidagilar bundan mustasno barcha operatsiyalar uchun xatolarni ko'rsatadi:

- Ichki oyna `iframe.contentWindow` ga havola olish - bu ruxsat etilgan.
- `location` ga yozish.

Bunga qarama-qarshi ravishda, agar `<iframe>` bir xil kelib chiqishga ega bo'lsa, biz u bilan hamma narsani qila olamiz:

```html run
<!-- bir xil saytdan iframe -->
<iframe src="/" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // har qanday narsani qiling
    iframe.contentDocument.body.prepend("Salom, dunyo!");
  };
</script>
```

```smart header="`iframe.onload` vs `iframe.contentWindow.onload`"
`iframe.onload` hodisasi (`<iframe>` tegida) asosan `iframe.contentWindow.onload` (o'rnatilgan oyna obyektida) bilan bir xil. U o'rnatilgan oyna barcha resurslar bilan to'liq yuklanganida ishga tushadi.

...Lekin boshqa kelib chiqishdan iframe uchun `iframe.contentWindow.onload` ga kira olmaymiz, shuning uchun `iframe.onload` dan foydalanamiz.
```

## Subdomenardagi oynalar: document.domain

Ta'rifga ko'ra, turli domenlarga ega ikki URL turli kelib chiqishlarga ega.

Lekin agar oynalar bir xil ikkinchi darajali domenni baham ko'rsa, masalan `john.site.com`, `peter.site.com` va `site.com` (shuning uchun ularning umumiy ikkinchi darajali domeni `site.com`), biz brauzerni bu farqni e'tiborsiz qoldirishga majburlashimiz mumkin, shunda ular cross-window aloqa maqsadlari uchun "bir xil kelib chiqish"dan kelayotgan deb hisoblanishi mumkin.

Buni ishlashi uchun, har bir bunday oyna quyidagi kodni ishga tushirishi kerak:

```js
document.domain = 'site.com';
```

Hammasi shu. Endi ular cheklovsiz o'zaro ta'sir qilishlari mumkin. Yana, bu faqat bir xil ikkinchi darajali domenga ega sahifalar uchun mumkin.

## Iframe: noto'g'ri hujjat tuzoq

Iframe bir xil kelib chiqishdan kelganda va biz uning `document` iga kirishimiz mumkin bo'lganda, tuzoq bor. Bu cross-origin narsalar bilan bog'liq emas, lekin bilish muhim.

Yaratilgandan so'ng iframe darhol hujjatga ega bo'ladi. Lekin bu hujjat unga yuklanadigan hujjatdan farq qiladi!

Shuning uchun agar biz hujjat bilan darhol biror narsa qilsak, bu ehtimol yo'qoladi.

Bu yerda qarang:

```html run
<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;
  iframe.onload = function() {
    let newDoc = iframe.contentDocument;
*!*
    // yuklangan hujjat dastlabki bilan bir xil emas!
    alert(oldDoc == newDoc); // false
*/!*
  };
</script>
```

Biz hali yuklanmagan iframe hujjati bilan ishlamasligimiz kerak, chunki bu *noto'g'ri hujjat*. Agar unga biror hodisa ishlov beruvchilarini o'rnatsak, ular e'tiborsiz qoldiriladi.

Hujjat mavjud bo'lgan paytni qanday aniqlash mumkin?

To'g'ri hujjat `iframe.onload` ishga tushganda aniq joyida. Lekin u faqat butun iframe barcha resurslar bilan yuklangandagina ishga tushadi.

Biz `setInterval` dagi tekshiruvlar yordamida oldinroq paytni ushlashga harakat qilishimiz mumkin:

```html run
<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;

  // har 100 ms da hujjatning yangi ekanligi tekshiriladi
  let timer = setInterval(() => {
    let newDoc = iframe.contentDocument;
    if (newDoc == oldDoc) return;

    alert("Yangi hujjat bu yerda!");

    clearInterval(timer); // setInterval ni bekor qilish, endi kerak emas
  }, 100);
</script>
```

## To'plam: window.frames

`<iframe>` uchun oyna obyektini olishning muqobil usuli -- uni `window.frames` nomli to'plamdan olish:

- Raqam bo'yicha: `window.frames[0]` -- hujjatdagi birinchi ramka uchun oyna obyekti.
- Nom bo'yicha: `window.frames.iframeName` -- `name="iframeName"` ga ega ramka uchun oyna obyekti.

Masalan:

```html run
<iframe src="/" style="height:80px" name="win" id="iframe"></iframe>

<script>
  alert(iframe.contentWindow == frames[0]); // true
  alert(iframe.contentWindow == frames.win); // true
</script>
```

Iframe o'z ichida boshqa iframe larga ega bo'lishi mumkin. Tegishli `window` obyektlari ierarxiya hosil qiladi.

Navigatsiya havolalari:

- `window.frames` -- "bola" oynalar to'plami (ichki ramkalar uchun).
- `window.parent` -- "ota-ona" (tashqi) oynaga havola.
- `window.top` -- eng yuqori ota-ona oynasiga havola.

Masalan:

```js run
window.frames[0].parent === window; // true
```

Joriy hujjat ramka ichida ochilgan yoki yo'qligini tekshirish uchun `top` xossasidan foydalanishimiz mumkin:

```js run
if (window == top) { // joriy oyna == window.top?
  alert('Skript eng yuqori oynada, ramkada emas');
} else {
  alert('Skript ramkada ishlayapti!');
}
```

## "sandbox" iframe xossasi

`sandbox` xossasi ishonchsiz kodni bajarishga to'sqinlik qilish uchun `<iframe>` ichida ma'lum harakatlarni istisno qilish imkonini beradi. U iframe ni boshqa kelib chiqishdan kelayotgan deb hisoblash va/yoki boshqa cheklovlarni qo'llash orqali "sandbox"lash qiladi.

`<iframe sandbox src="...">` uchun qo'llaniladigan "standart to'plam" cheklovlar mavjud. Lekin agar biz qo'llanilmasligi kerak bo'lgan cheklovlarning bo'shliq bilan ajratilgan ro'yxatini xossa qiymati sifatida berсак, uni yumshatishimiz mumkin, masalan: `<iframe sandbox="allow-forms allow-popups">`.

Boshqacha qilib aytganda, bo'sh `"sandbox"` xossasi eng qattiq cheklovlarni qo'yadi, lekin biz olib tashlamoqchi bo'lganlarning bo'shliq bilan ajratilgan ro'yxatini qo'yishimiz mumkin.

Mana cheklovlar ro'yxati:

`allow-same-origin`
: Standart bo'yicha `"sandbox"` iframe uchun "turli kelib chiqish" siyosatini majburlaydi. Boshqacha qilib aytganda, u brauzerni `iframe` ni boshqa kelib chiqishdan kelayotgan deb hisoblashga majbur qiladi, hatto uning `src` si bir xil saytga ishora qilsa ham. Skriptlar uchun barcha nazarda tutilgan cheklovlar bilan. Bu parametr bu xususiyatni olib tashlaydi.

`allow-top-navigation`
: `iframe` ga `parent.location` ni o'zgartirishga ruxsat beradi.

`allow-forms`
: `iframe` dan formalarni yuborishga ruxsat beradi.

`allow-scripts`
: `iframe` dan skriptlarni ishga tushirishga ruxsat beradi.

`allow-popups`
: `iframe` dan `window.open` popuplariga ruxsat beradi.

Ko'proq uchun [qo'llanma](mdn:/HTML/Element/iframe)ga qarang.

Quyidagi misol standart cheklovlar to'plami bilan sandbox qilingan iframe ni ko'rsatadi: `<iframe sandbox src="...">`. Unda biroz JavaScript va forma bor.

Hech narsa ishlamasligini esda tuting. Shunday qilib standart to'plam haqiqatan ham qattiq:

[codetabs src="sandbox" height=140]

```smart
`"sandbox"` xossasining maqsadi faqat *ko'proq* cheklovlarni *qo'shish*dir. U ularni olib tashlay olmaydi. Xususan, agar iframe boshqa kelib chiqishdan kelsa, u same-origin cheklovlarini yumshatish mumkin emas.
```

## Cross-window xabar almashish

`postMessage` interfeysi oynalarga qaysi kelib chiqishdan bo'lishidan qat'i nazar bir-biri bilan gaplashish imkonini beradi.

Shunday qilib, bu "Same Origin" siyosatini chetlab o'tish usuli. U `john-smith.com` dan oynaga `gmail.com` bilan gaplashish va ma'lumot almashish imkonini beradi, lekin faqat ikkisi ham rozi bo'lsa va tegishli JavaScript funksiyalarini chaqirsa. Bu foydalanuvchilar uchun xavfsiz qiladi.

Interfeys ikki qismdan iborat.

### postMessage

Xabar yubormoqchi bo'lgan oyna qabul qiluvchi oynaning [postMessage](mdn:api/Window.postMessage) usulini chaqiradi. Boshqacha qilib aytganda, agar biz `win` ga xabar yubormoqchi bo'lsak, `win.postMessage(data, targetOrigin)` ni chaqirishimiz kerak.

Argumentlar:

`data`
: Yuboriladigan ma'lumotlar. Har qanday obyekt bo'lishi mumkin, ma'lumotlar "tuzilgan seriyalashtirish algoritmi" yordamida nusxalanadi. IE faqat qatorlarni qo'llab-quvvatlaydi, shuning uchun o'sha brauzerni qo'llab-quvvatlash uchun murakkab obyektlarni `JSON.stringify` qilishimiz kerak.

`targetOrigin`
: Maqsadli oyna uchun kelib chiqishni belgilaydi, shuning uchun faqat berilgan kelib chiqishdan oyna xabarni oladi.

`targetOrigin` xavfsizlik chorasi. Esda tuting, agar maqsadli oyna boshqa kelib chiqishdan kelsa, biz jo'natuvchi oynada uning `location` ini o'qiy olmaymiz. Shuning uchun maqsadli oynada hozir qaysi sayt ochilganiga ishonch hosil qila olmaymiz: foydalanuvchi boshqa joyga o'tgan bo'lishi mumkin va jo'natuvchi oyna bu haqda hech qanday tasavvurga ega emas.

`targetOrigin` ni belgilash oyna faqat to'g'ri saytda bo'lganda ma'lumotlarni olishini ta'minlaydi. Ma'lumotlar nozik bo'lganda muhim.

Masalan, bu yerda `win` faqat `http://example.com` kelib chiqishidan hujjatga ega bo'lsa xabarni oladi:

```html no-beautify
<iframe src="http://example.com" name="example">

<script>
  let win = window.frames.example;

  win.postMessage("message", "http://example.com");
</script>
```

Agar bu tekshirishni xohlamasak, `targetOrigin` ni `*` ga o'rnatishimiz mumkin.

```html no-beautify
<iframe src="http://example.com" name="example">

<script>
  let win = window.frames.example;

*!*
  win.postMessage("message", "*");
*/!*
</script>
```

### onmessage

Xabar qabul qilish uchun maqsadli oyna `message` hodisasida ishlov beruvchiga ega bo'lishi kerak. U `postMessage` chaqirilganda (va `targetOrigin` tekshiruvi muvaffaqiyatli bo'lganda) ishga tushadi.

Hodisa obyekti maxsus xossalarga ega:

`data`
: `postMessage` dan ma'lumotlar.

`origin`
: Jo'natuvchining kelib chiqishi, masalan `http://javascript.info`.

`source`
: Jo'natuvchi oynaga havola. Agar xohlasak, darhol `source.postMessage(...)` orqali javob berishimiz mumkin.

Bu ishlov beruvchini tayinlash uchun `addEventListener` dan foydalanishimiz kerak, qisqa sintaksis `window.onmessage` ishlamaydi.

Mana misol:

```js
window.addEventListener("message", function(event) {
  if (event.origin != 'http://javascript.info') {
    // noma'lum domendan biror narsa, uni e'tiborsiz qoldiraylik
    return;
  }

  alert( "qabul qilindi: " + event.data );

  // event.source.postMessage(...) yordamida qaytib xabar yuborish mumkin
});
```

To'liq misol:

[codetabs src="postmessage" height=120]

## Xulosa

Boshqa oynaning usullarini chaqirish va uning kontentiga kirish uchun avval unga havola bo'lishi kerak.

Popuplar uchun bizda bu havolalar bor:
- Ochuvchi oynadan: `window.open` -- yangi oyna ochadi va unga havolani qaytaradi,
- Popup dan: `window.opener` -- popup dan ochuvchi oynaga havola.

Iframe lar uchun biz ota-ona/bola oynalarga kirish uchun:
- `window.frames` -- ichki oyna obyektlarining to'plami,
- `window.parent`, `window.top` ota-ona va yuqori oynalarga havolalar,
- `iframe.contentWindow` `<iframe>` tegi ichidagi oyna.

Agar oynalar bir xil kelib chiqishga ega bo'lsa (host, port, protokol), oynalar bir-biri bilan xohlagan narsalarni qilishlari mumkin.

Aks holda, faqat mumkin bo'lgan harakatlar:
- Boshqa oynaning `location` ini o'zgartirish (faqat yozish kirishi).
- Unga xabar yuborish.

Istisnolar:
- Bir xil ikkinchi darajali domenni baham ko'radigan oynalar: `a.site.com` va `b.site.com`. Keyin ikkalasida ham `document.domain='site.com'` ni o'rnatish ularni "bir xil kelib chiqish" holatiga qo'yadi.
- Agar iframe `sandbox` xossasiga ega bo'lsa, xossa qiymatida `allow-same-origin` belgilanmagan bo'lsa, u majburiy ravishda "turli kelib chiqish" holatiga qo'yiladi. Bu bir xil saytdan iframe larda ishonchsiz kodni ishga tushirish uchun ishlatilishi mumkin.

`postMessage` interfeysi har qanday kelib chiqishga ega ikki oynaga gaplashish imkonini beradi:

1. Jo'natuvchi `targetWin.postMessage(data, targetOrigin)` ni chaqiradi.
2. Agar `targetOrigin` `'*'` bo'lmasa, brauzer `targetWin` oynasi `targetOrigin` kelib chiqishiga ega ekanligini tekshiradi.
3. Agar shunday bo'lsa, `targetWin` maxsus xossalar bilan `message` hodisasini ishga tushiradi:
    - `origin` -- jo'natuvchi oynaning kelib chiqishi (`http://my.site.com` kabi)
    - `source` -- jo'natuvchi oynaga havola.
    - `data` -- ma'lumotlar, faqat qatorlarni qo'llab-quvvatlovchi IE dan tashqari hamma joyda har qanday obyekt.

    Bu hodisa uchun ishlov beruvchini maqsadli oyna ichida o'rnatish uchun `addEventListener` dan foydalanishimiz kerak.