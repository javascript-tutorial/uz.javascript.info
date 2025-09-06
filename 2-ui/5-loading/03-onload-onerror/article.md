# Resurslarni yuklash: onload va onerror

Brauzer bizga tashqi resurslarning yuklanishini kuzatish imkonini beradi -- skriptlar, iframe'lar, rasmlar va hokazo.

Buning uchun ikkita hodisa mavjud:

- `onload` -- muvaffaqiyatli yuklash,
- `onerror` -- xatolik yuz berdi.

## Skriptni yuklash

Aytaylik, bizga uchinchi tomon skriptini yuklash va u erdagi funksiyani chaqirish kerak.

Biz uni dinamik ravishda yuklashimiz mumkin:

```js
let script = document.createElement('script');
script.src = "my.js";

document.head.append(script);
```

Lekin shu skript ichida e'lon qilingan funksiyani qanday ishga tushiramiz? Skript yuklanishini kutishimiz va faqat shundan keyin uni chaqirishimiz kerak.

**O'zimizning skriptlarimiz uchun JavaScript modullaridan foydalanishimiz mumkin, lekin ular uchinchi tomon kutubxonalari tomonidan keng qo'llanilmaydi.**

### script.onload

Asosiy yordamchi `load` hodisasidir. U skript yuklangan va bajarilgandan keyin ishga tushadi.

Masalan:

```js
let script = document.createElement('script');

// har qanday skriptni, har qanday domendan yuklash mumkin
script.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"
document.head.append(script);

script.onload = function() {
  // skript "_" o'zgaruvchisini yaratadi
  alert( _.VERSION ); // kutubxona versiyasini ko'rsatadi
};
```

Shunday qilib, `onload` da biz skript o'zgaruvchilarini ishlatishimiz, funksiyalarni ishga tushirishimiz va hokazolarni qilishimiz mumkin.

Va agar yuklash muvaffaqiyatsiz bo'lsa-chi? Masalan, bunday skript yo'q (404 xatolik) yoki server ishlamaydi (mavjud emas).

### script.onerror

Skriptni yuklash vaqtida yuz beradigan xatoliklarni `error` hodisasida kuzatish mumkin.

Masalan, mavjud bo'lmagan skriptni so'rab ko'ramiz:

```js
let script = document.createElement('script');
script.src = "https://example.com/404.js"; // bunday skript yo'q
document.head.append(script);

script.onerror = function() {
  alert("Xatolik yuz berdi: " + this.src); // Xatolik yuz berdi: https://example.com/404.js
};
```

E'tibor bering, biz bu yerda HTTP xatolik tafsilotlarini ola olmaymiz. 404 yoki 500 yoki boshqa narsa ekanligini bilmaymiz. Faqat yuklanishning muvaffaqiyatsiz ekanligini bilamiz.

**`onload`/`onerror` hodisalari faqat yuklanishning o'zini kuzatadi.**

**Skriptni qayta ishlash va bajarish vaqtida yuz berishi mumkin bo'lgan xatoliklar bu hodisalar doirasidan tashqarida. Ya'ni: agar skript muvaffaqiyatli yuklangan bo'lsa, `onload` ishga tushadi, hatto unda dasturlash xatoliklari bo'lsa ham. Skript xatoliklarini kuzatish uchun `window.onerror` global ishlov beruvchisidan foydalanish mumkin.**

## Boshqa resurslar

`load` va `error` hodisalari boshqa resurslar uchun ham ishlaydi, asosan tashqi `src` ga ega bo'lgan har qanday resurs uchun.

Masalan:

```js
let img = document.createElement('img');
img.src = "https://js.cx/clipart/train.gif"; // (*)

img.onload = function() {
  alert(`Rasm yuklandi, o'lchami ${img.width}x${img.height}`);
};

img.onerror = function() {
  alert("Rasmni yuklashda xatolik yuz berdi");
};
```

Ba'zi eslatmalar mavjud:

- Ko'pgina resurslar hujjatga qo'shilganda yuklashni boshlaydi. Lekin `<img>` istisno. U `src` ni olganda yuklashni boshlaydi `(*)`.
- `<iframe>` uchun, `iframe.onload` hodisasi iframe yuklash tugaganda ishga tushadi, ham muvaffaqiyatli yuklash uchun, ham xatolik holatida.

Bu tarixiy sabablarga ko'ra.

## Crossorigin siyosati

Qoida mavjud: bir saytdagi skriptlar boshqa saytning mazmuniga kira olmaydi. Masalan, `https://facebook.com` dagi skript `https://gmail.com` dagi foydalanuvchi pochta qutisini o'qiy olmaydi.

Yoki aniqroq qilib aytganda, bir manba (domen/port/protokol uchligi) boshqasining mazmuniga kira olmaydi. Shuning uchun subdomen yoki boshqa port bo'lsa ham, bular bir-biriga kirish huquqi bo'lmagan turli manbalar.

Bu qoida boshqa domenlardan kelgan resurslar uchun ham amal qiladi.

Agar biz boshqa domendagi skriptdan foydalansak va unda xatolik bo'lsa, xatolik tafsilotlarini ola olmaymiz.

Masalan, bitta (noto'g'ri) funksiya chaqiruvidan iborat `error.js` skriptini olamiz:
```js
// 📁 error.js
noSuchFunction();
```

Endi uni joylashgan saytdan yuklaymiz:

```html
<script>
window.onerror = function(message, url, line, col, errorObj) {
  alert(`${message}\n${url}, ${line}:${col}`);
};
</script>
<script src="/article/onload-onerror/crossorigin/error.js"></script>
```

Yaxshi xatolik hisobotini ko'rishimiz mumkin:

```
Uncaught ReferenceError: noSuchFunction is not defined
https://javascript.info/article/onload-onerror/crossorigin/error.js, 1:1
```

Endi xuddi shu skriptni boshqa domendan yuklaymiz:

```html
<script>
window.onerror = function(message, url, line, col, errorObj) {
  alert(`${message}\n${url}, ${line}:${col}`);
};
</script>
<script src="https://cors.javascript.info/article/onload-onerror/crossorigin/error.js"></script>
```

Hisobot boshqacha bo'ladi:

```
Script error.
, 0:0
```

Tafsilotlar brauzerga qarab farq qilishi mumkin, lekin g'oya bir xil: skriptning ichki ma'lumotlari, jumladan xatolik stack trace'lari yashirilgan. Aynan boshqa domendan bo'lgani uchun.

Nega bizga xatolik tafsilotlari kerak?

`window.onerror` yordamida global xatoliklarni tinglaydigan, xatoliklarni saqlaydigan va ularga kirish va tahlil qilish interfeysini taqdim etadigan ko'plab xizmatlar mavjud (va biz o'zimiznikini qura olamiz). Bu ajoyib, chunki biz foydalanuvchilarimiz tomonidan yuzaga kelgan haqiqiy xatoliklarni ko'rishimiz mumkin. Lekin agar skript boshqa manbadan kelsa, unda xatoliklar haqida ko'p ma'lumot bo'lmaydi.

Xuddi shunday cross-origin siyosati (CORS) boshqa turdagi resurslar uchun ham qo'llaniladi.

**Cross-origin kirishga ruxsat berish uchun `<script>` tegi `crossorigin` atributiga ega bo'lishi va masofaviy server maxsus sarlavhalarni taqdim etishi kerak.**

Cross-origin kirishning uch darajasi mavjud:

1. **`crossorigin` atributi yo'q** -- kirish taqiqlanган.
2. **`crossorigin="anonymous"`** -- agar server `Access-Control-Allow-Origin` sarlavhasi bilan `*` yoki bizning manbamiz bilan javob bersa, kirish ruxsat etiladi. Brauzer masofaviy serverga avtorizatsiya ma'lumotlari va cookie'larni jo'natmaydi.
3. **`crossorigin="use-credentials"`** -- agar server bizning manbamiz bilan `Access-Control-Allow-Origin` va `Access-Control-Allow-Credentials: true` sarlavhalarini yuborsa, kirish ruxsat etiladi. Brauzer masofaviy serverga avtorizatsiya ma'lumotlari va cookie'larni jo'natadi.

**Cross-origin kirish haqida batafsil ma'lumotni fetch bo'limida o'qishingiz mumkin. U tarmoq so'rovlari uchun `fetch` usulini tavsiflaydi, lekin siyosat aynan bir xil.**

Bizning holatimizda crossorigin atributi yo'q edi. Shuning uchun cross-origin kirish taqiqlangan edi. Keling, uni qo'shamiz.

Biz `"anonymous"` (cookie'lar jo'natilmaydi, bitta server tomoni sarlavhasi kerak) va `"use-credentials"` (cookie'lar ham jo'natiladi, ikkita server tomoni sarlavhasi kerak) o'rtasida tanlashimiz mumkin.

Agar cookie'lar bizga muhim bo'lmasa, `"anonymous"` to'g'ri tanlov:

```html
<script>
window.onerror = function(message, url, line, col, errorObj) {
  alert(`${message}\n${url}, ${line}:${col}`);
};
</script>
<script crossorigin="anonymous" src="https://cors.javascript.info/article/onload-onerror/crossorigin/error.js"></script>
```

Endi server `Access-Control-Allow-Origin` sarlavhasini taqdim etganini hisobga olsak, hammasi joyida. Bizda to'liq xatolik hisoboti bor.

## Xulosa

Rasmlar `<img>`, tashqi stillar, skriptlar va boshqa resurslar ularning yuklanishini kuzatish uchun `load` va `error` hodisalarini taqdim etadi:

- `load` muvaffaqiyatli yuklashda ishga tushadi,
- `error` muvaffaqiyatsiz yuklashda ishga tushadi.

Yagona istisno `<iframe>`: tarixiy sabablarga ko'ra u har doim `load` ni ishga tushiradi, har qanday yuklash tugashida, hatto sahifa topilmasa ham.

`readystatechange` hodisasi ham resurslar uchun ishlaydi, lekin kamdan-kam ishlatiladi, chunki `load/error` hodisalari soddaroq.