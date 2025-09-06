# Brauzerni standart harakatlari

Ko'plab hodisalar avtomatik ravishda brauzer tomonidan ma'lum harakatlarni bajarishga olib keladi.

Masalan:

- Havolaga bosish - uning URL manziliga yo'naltiradi.
- Formani yuborish tugmasiga bosish - uni serverga yuborishni boshlaydi.
- Matn ustida sichqoncha tugmasini bosib uni siljitish - matnni tanlaydi.

Agar biz JavaScript-da hodisani qayta ishlasak, brauzerni mos harakatini xohlamasligimiz va o'rniga boshqa xatti-harakatni amalga oshirishni xohlashimiz mumkin.

## Brauzer harakatlarining oldini olish

Brauzerni harakat qilishini istamasligimizni aytishning ikki yo'li bor:

- Asosiy usul `event` obyektidan foydalanishdir. `event.preventDefault()` metodi mavjud.
- Agar ishlov beruvchi `on<event>` yordamida tayinlangan bo'lsa (`addEventListener` orqali emas), u holda `false` qaytarish ham bir xil ishlaydi.

Bu HTML kodida havolaga bosish yo'naltirish olib kelmaydi, brauzer hech narsa qilmaydi:

```html autorun height=60 no-beautify
<a href="/" onclick="return false">Bu yerga bosing</a>
yoki
<a href="/" onclick="event.preventDefault()">bu yerga</a>
```

Keyingi misolda biz ushbu texnikadan JavaScript asosidagi menyu yaratish uchun foydalanamiz.

```warn header="`false` qaytarish - istisno"
Hodisa ishlov beruvchisi tomonidan qaytariladigan qiymat odatda e'tiborga olinmaydi.

Yagona istisno - `on<event>` yordamida tayinlangan ishlov beruvchidan `return false`.

Barcha boshqa hollarda, `return` qiymati e'tiborga olinmaydi. Xususan, `true` qaytarishning ma'nosi yo'q.
```

### Misol: menyu

Sayt menyusini ko'rib chiqing:

```html
<ul id="menu" class="menu">
  <li><a href="/html">HTML</a></li>
  <li><a href="/javascript">JavaScript</a></li>
  <li><a href="/css">CSS</a></li>
</ul>
```

CSS bilan qanday ko'rinishi:

[iframe height=70 src="menu" link edit]

Menyu elementlari `<button>` tugmalari emas, balki HTML havola `<a>` sifatida amalga oshirilgan. Buning bir necha sabablari bor:

- Ko'p odamlar "o'ng bosish" -- "yangi oynada ochish" dan foydalanishni yoqtiradilar. Agar biz `<button>` yoki `<span>` dan foydalansak, bu ishlamaydi.
- Qidiruv tizimlari indekslash paytida `<a href="...">` havolalarni kuzatadilar.

Shuning uchun biz markup-da `<a>` dan foydalanamiz. Lekin odatda biz JavaScript-da bosilishlarni qayta ishlamoqchimiz. Shuning uchun brauzerni standart harakatining oldini olishimiz kerak.

Mana shunday:

```js
menu.onclick = function(event) {
  if (event.target.nodeName != 'A') return;

  let href = event.target.getAttribute('href');
  alert( href ); // ...serverdan yuklash, UI yaratish va h.k.

*!*
  return false; // brauzer harakatining oldini ol (URL ga o'tma)
*/!*
};
```

Agar biz `return false` ni qoldirsak, kodimiz bajarilgandan so'ng brauzer o'zini "standart harakati" ni bajaradi -- `href` dagi URL ga yo'naltiradi. Bu yerda bizga bu kerak emas, chunki biz bosishni o'zimiz qayta ishlamoqdamiz.

Aytgancha, bu yerda hodisa delegatsiyasidan foydalanish bizning menyumizni juda moslashuvchan qiladi. Biz ichki ro'yxatlar qo'shishimiz va ularni CSS yordamida "pastga sirpanish" uchun stillashtirshimiz mumkin.

````smart header="Keyingi hodisalar"
Ba'zi hodisalar bir-biriga oqib o'tadilar. Agar biz birinchi hodisaning oldini olsak, ikkinchisi bo'lmaydi.

Masalan, `<input>` maydoni ustidagi `mousedown` unga fokuslanishga olib keladi va `focus` hodisasi yuz beradi. Agar biz `mousedown` hodisasining oldini olsak, fokus bo'lmaydi.

Quyidagi birinchi `<input>` ga bosingchi -- `focus` hodisasi sodir bo'ladi. Lekin ikkinchisiga bossangiz, fokus bo'lmaydi.

```html run autorun
<input value="Fokus ishlaydi" onfocus="this.value=''">
<input *!*onmousedown="return false"*/!* onfocus="this.value=''" value="Menga bosing">
```

Buning sababi `mousedown` da brauzer harakati bekor qilingandir. Boshqa yo'l bilan kirish maydaniga kirish hali ham mumkin. Masalan, birinchi kirishdan ikkinchisiga o'tish uchun `key:Tab` tugmasi. Lekin sichqoncha bilan bosish endi mumkin emas.
````

## "Passiv" ishlov beruvchi parametri

`addEventListener` ning ixtiyoriy `passive: true` parametri brauzerni ishlov beruvchi `preventDefault()` ni chaqirmasligini bildiradi.

Bu nima uchun kerak bo'lishi mumkin?

Mobil qurilmalarda `touchmove` kabi ba'zi hodisalar mavjud (foydalanuvchi barmog'ini ekran bo'ylab siljitganda), ular sukut bo'yicha scroll qilishga sabab bo'ladi, lekin bu scroll `preventDefault()` yordamida ishlov beruvchida oldini olish mumkin.

Shuning uchun brauzer bunday hodisani aniqlaganda, u avval barcha ishlov beruvchilarni qayta ishlashi kerak, so'ngra agar `preventDefault` hech qayerda chaqirilmagan bo'lsa, u scroll bilan davom etishi mumkin. Bu UI da keraksiz kechikishlar va "tebranishlar" ga sabab bo'lishi mumkin.

`passive: true` parametri brauzerni ishlov beruvchi scroll ni bekor qilmasligini bildiradi. Keyin brauzer maksimal suyuq tajriba bilan darhol scroll qiladi va hodisa yo'l bo'yicha qayta ishlanadi.

Ba'zi brauzerlar uchun (Firefox, Chrome), `touchstart` va `touchmove` hodisalari uchun `passive` sukut bo'yicha `true` dir.

## event.defaultPrevented

`event.defaultPrevented` xossasi standart harakat oldini olingan bo'lsa `true`, aks holda `false` bo'ladi.

Buning uchun qiziqarli foydalanish holati bor.

<info:bubbling-and-capturing> bobida biz `event.stopPropagation()` va nima uchun bubbling ni to'xtatish yomon ekanligi haqida gaplashgandik.

Ba'zan biz `event.defaultPrevented` dan foydalanishimiz mumkin, boshqa hodisa ishlov beruvchilariga hodisa qayta ishlanganligini bildirish uchun.

Amaliy misolni ko'raylik.

Sukut bo'yicha brauzer `contextmenu` hodisasida (o'ng sichqoncha bosish) standart variantlar bilan kontekst menyusini ko'rsatadi. Biz buning oldini olib, o'zimiznikini ko'rsatishimiz mumkin:

```html autorun height=50 no-beautify run
<button>O'ng bosish brauzer kontekst menyusini ko'rsatadi</button>

<button *!*oncontextmenu="alert('Bizning menyumizni chizish'); return false"*/!*>
  O'ng bosish bizning kontekst menyumizni ko'rsatadi
</button>
```

Endi, kontekst menyudan tashqari, biz hujjat miqyosidagi kontekst menyusini amalga oshirishni istaymiz.

O'ng bosilganda, eng yaqin kontekst menyusi paydo bo'lishi kerak.

```html autorun height=80 no-beautify run
<p>Hujjat kontekst menyusi uchun bu yerga o'ng bosing</p>
<button id="elem">Tugma kontekst menyusi uchun bu yerga o'ng bosing</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Tugma kontekst menyusi");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Hujjat kontekst menyusi");
  };
</script>
```

Muammo shundaki, `elem` ga bosganimizda, biz ikkita menyu olamiz: tugma darajasidagi va (hodisa yuqoriga ko'tariladi) hujjat darajasidagi menyu.

Buni qanday tuzatish mumkin? Yechimlardan biri shunday o'ylashdir: "Tugma ishlov beruvchisida o'ng bosishni qayta ishlasak, uning bubbling ni to'xtating" va `event.stopPropagation()` dan foydalaning:

```html autorun height=80 no-beautify run
<p>Hujjat menyusi uchun o'ng bosish</p>
<button id="elem">Tugma menyusi uchun o'ng bosish (event.stopPropagation bilan tuzatilgan)</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
*!*
    event.stopPropagation();
*/!*
    alert("Tugma kontekst menyusi");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Hujjat kontekst menyusi");
  };
</script>
```

Endi tugma darajasidagi menyu mo'ljallangandek ishlaydi. Lekin narxi yuqori. Biz abadiy tashqi kodlar uchun o'ng bosishlar haqidagi ma'lumotlarga kirishni rad etamiz, shu jumladan statistikalarni yig'uvchi hisoblagichlar va boshqalar. Bu juda aqlsizlik.

Muqobil yechim `document` ishlov beruvchisida standart harakat oldini olinganligini tekshirish bo'ladi. Agar shunday bo'lsa, demak hodisa qayta ishlangan va biz unga javob berishimiz shart emas.

```html autorun height=80 no-beautify run
<p>Hujjat menyusi uchun o'ng bosish (event.defaultPrevented uchun tekshiruv qo'shildi)</p>
<button id="elem">Tugma menyusi uchun o'ng bosish</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Tugma kontekst menyusi");
  };

  document.oncontextmenu = function(event) {
*!*
    if (event.defaultPrevented) return;
*/!*

    event.preventDefault();
    alert("Hujjat kontekst menyusi");
  };
</script>
```

Endi hammasi ham to'g'ri ishlaydi. Agar bizda ichki elementlar bo'lsa va har birining o'z kontekst menyusi bo'lsa, bu ham ishlaydi. Har bir `contextmenu` ishlov beruvchisida `event.defaultPrevented` ni tekshirishni unutmang.

```smart header="event.stopPropagation() va event.preventDefault()"
Ko'rib turganimizdek, `event.stopPropagation()` va `event.preventDefault()` (`return false` sifatida ham tanilgan) ikki xil narsa. Ular bir-birlari bilan bog'liq emas.
```

```smart header="Ichki kontekst menyulari arxitekturasi"
Ichki kontekst menyularini amalga oshirishning boshqa usullari ham mavjud. Ulardan biri `document.oncontextmenu` uchun ishlov beruvchi va boshqa ishlov beruvchilarni saqlashga imkon beruvchi metodlarga ega yagona global obyektga ega bo'lish.

Obyekt har qanday o'ng bosishni ushlaydi, saqlangan ishlov beruvchilarni ko'rib chiqadi va tegishli birini ishga tushiradi.

Lekin keyin kontekst menyusini xohlaydigan har bir kod qismi ushbu obyekt haqida bilishi va o'z `contextmenu` ishlov beruvchisi o'rniga uning yordamidan foydalanishi kerak.
```

## Xulosa

Ko'plab standart brauzer harakatlari mavjud:

- `mousedown` -- tanlovni boshlaydi (tanlash uchun sichqonchani siljiting).
- `<input type="checkbox">` da `click` -- `input` ni belgilaydi/belgilamaydi.
- `submit` -- `<input type="submit">` ga bosish yoki forma maydonida `key:Enter` bosish ushbu hodisani sodir qiladi va brauzer undan so'ng formani yuboradi.
- `keydown` -- tugmani bosish maydonga belgi qo'shish yoki boshqa harakatlarga olib kelishi mumkin.
- `contextmenu` -- hodisa o'ng bosishda sodir bo'ladi, harakat brauzer kontekst menyusini ko'rsatishdir.
- ...va boshqalar...

Agar biz hodisani faqat JavaScript orqali qayta ishlamoqchi bo'lsak, barcha standart harakatlarning oldini olish mumkin.

Standart harakatning oldini olish uchun -- `event.preventDefault()` yoki `return false` dan foydalaning. Ikkinchi usul faqat `on<event>` bilan tayinlangan ishlov beruvchilar uchun ishlaydi.

`addEventListener` ning `passive: true` parametri brauzerni harakatning oldini olinmasligini bildiradi. Bu `touchstart` va `touchmove` kabi ba'zi mobil hodisalar uchun foydali, brauzerni scroll qilishdan oldin barcha ishlov beruvchilar tugashini kutmasligi kerakligini bildiradi.

Agar standart harakatning oldini olingan bo'lsa, `event.defaultPrevented` qiymati `true` bo'ladi, aks holda `false`.

```warn header="Semantikaga rioya qiling, suiiste'mol qilmang"
Texnik jihatdan, standart harakatlarning oldini olib, JavaScript qo'shish orqali biz har qanday elementlarning xatti-harakatlarini sozlashimiz mumkin. Masalan, biz havola `<a>` ni tugma kabi ishlatishimiz va tugma `<button>` ni havola kabi ishlashimiz mumkin (boshqa URL ga yo'naltirish yoki boshqa).

Lekin biz umuman HTML elementlarining semantik ma'nosini saqlab qolishimiz kerak. Masalan, `<a>` tugma emas, navigatsiya bajarishi kerak.

"Faqat yaxshi narsa" bo'lishdan tashqari, bu sizni HTML ni dostuplik nuqtai nazaridan yaxshiroq qiladi.

Shuningdek, agar biz `<a>` misolini ko'rsak, shuni yodda tutingki: brauzer bizga bunday havolalarni yangi oynada ochishga imkon beradi (ularni o'ng bosish va boshqa usullar orqali). Va odamlar buni yoqtiradilar. Lekin agar biz JavaScript yordamida tugmani havola kabi ishlashimiz va hattoki CSS yordamida havolaga o'xshatishimiz, `<a>` ga xos brauzer funksiyalari hali ham u uchun ishlamaydi.
```