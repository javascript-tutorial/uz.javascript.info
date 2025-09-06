# Fetch API

Hozirgacha biz `fetch` haqida ancha bilim oldik.

API ning qolgan qismini ko'rib chiqaylik, uning barcha imkoniyatlarini qamrab olish uchun.

```smart
Diqqat qiling: bu opsiyalarning ko'pchiligi kamdan-kam ishlatiladi. Siz bu bobni o'tkazib yuborib, `fetch` dan yaxshi foydalanishingiz mumkin.

Shunga qaramay, `fetch` nima qila olishini bilish yaxshi, shuning uchun ehtiyoj tug'ilsa, qaytib kelib batafsil ma'lumotlarni o'qishingiz mumkin.
```

Mana barcha mumkin bo'lgan `fetch` opsiyalarining to'liq ro'yxati ularning standart qiymatlari bilan (izohlarda muqobillar):

```js
let promise = fetch(url, {
  method: "GET", // POST, PUT, DELETE va boshqalar.
  headers: {
    // content type header qiymati odatda avtomatik o'rnatiladi
    // request body ga bog'liq holda
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined // string, FormData, Blob, BufferSource, yoki URLSearchParams
  referrer: "about:client", // yoki Referer header yubormaslik uchun "",
  // yoki joriy origin dan url
  referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
  mode: "cors", // same-origin, no-cors
  credentials: "same-origin", // omit, include
  cache: "default", // no-store, reload, no-cache, force-cache, yoki only-if-cached
  redirect: "follow", // manual, error
  integrity: "", // hash, masalan "sha256-abcdef1234567890"
  keepalive: false, // true
  signal: undefined, // so'rovni to'xtatish uchun AbortController
  window: window // null
});
```

Ta'sirchan ro'yxat, to'g'rimi?

Biz <info:fetch> bobida `method`, `headers` va `body` ni to'liq ko'rib chiqdik.

`signal` opsiyasi <info:fetch-abort> da ko'rilgan.

Endi qolgan imkoniyatlarni o'rganaylik.

## referrer, referrerPolicy

Bu opsiyalar `fetch` HTTP `Referer` header'ini qanday o'rnatishini boshqaradi.

Odatda bu header avtomatik o'rnatiladi va so'rov qilgan sahifaning url'ini o'z ichiga oladi. Ko'pgina stsenariylarda bu umuman muhim emas, ba'zida xavfsizlik maqsadida uni olib tashlash yoki qisqartirish mantiqiy.

**`referrer` opsiyasi istalgan `Referer` ni (joriy origin ichida) o'rnatish yoki uni olib tashlash imkonini beradi.**

Hech qanday referer yubormaslik uchun bo'sh string o'rnating:
```js
fetch('/page', {
*!*
  referrer: "" // Referer header yo'q
*/!*
});
```

Joriy origin ichida boshqa url o'rnatish uchun:

```js
fetch('/page', {
  // https://javascript.info da ekanligimizni faraz qilamiz
  // biz istalgan Referer header o'rnatishimiz mumkin, lekin faqat joriy origin ichida
*!*
  referrer: "https://javascript.info/anotherpage"
*/!*
});
```

**`referrerPolicy` opsiyasi `Referer` uchun umumiy qoidalarni o'rnatadi.**

So'rovlar 3 turga bo'linadi:

1. Bir xil origin ga so'rov.
2. Boshqa origin ga so'rov.
3. HTTPS dan HTTP ga so'rov (xavfsiz protokoldan xavfsiz bo'lmagan protokolga).

Aniq `Referer` qiymatini o'rnatish imkonini beruvchi `referrer` opsiyasidan farqli o'laroq, `referrerPolicy` brauzerga har bir so'rov turi uchun umumiy qoidalarni aytadi.

Mumkin bo'lgan qiymatlar [Referrer Policy spetsifikatsiyasi](https://w3c.github.io/webappsec-referrer-policy/)da tasvirlangan:

- **`"no-referrer-when-downgrade"`** -- standart qiymat: to'liq `Referer` har doim yuboriladi, faqat HTTPS dan HTTP ga (kamroq xavfsiz protokolga) so'rov yuborganimizda bundan mustasno.
- **`"no-referrer"`** -- hech qachon `Referer` yubormaslik.
- **`"origin"`** -- `Referer` da faqat origin yuborish, to'liq sahifa URL emas, masalan `http://site.com/path` o'rniga faqat `http://site.com`.
- **`"origin-when-cross-origin"`** -- bir xil origin ga to'liq `Referer` yuborish, lekin cross-origin so'rovlar uchun faqat origin qismi (yuqoridagidek).
- **`"same-origin"`** -- bir xil origin ga to'liq `Referer` yuborish, lekin cross-origin so'rovlar uchun `Referer` yo'q.
- **`"strict-origin"`** -- faqat origin yuborish, HTTPS→HTTP so'rovlar uchun `Referer` yo'q.
- **`"strict-origin-when-cross-origin"`** -- same-origin uchun to'liq `Referer` yuborish, cross-origin uchun faqat origin, agar HTTPS→HTTP so'rov bo'lmasa, unda hech narsa yubormaslik.
- **`"unsafe-url"`** -- har doim to'liq url ni `Referer` da yuborish, hatto HTTPS→HTTP so'rovlar uchun ham.

Mana barcha kombinatsiyalar bilan jadval:

| Qiymat | Bir xil origin ga | Boshqa origin ga | HTTPS→HTTP |
|--------|------------------|------------------|------------|
| `"no-referrer"` | - | - | - |
| `"no-referrer-when-downgrade"` yoki `""` (standart) | to'liq | to'liq | - |
| `"origin"` | origin | origin | origin |
| `"origin-when-cross-origin"` | to'liq | origin | origin |
| `"same-origin"` | to'liq | - | - |
| `"strict-origin"` | origin | origin | - |
| `"strict-origin-when-cross-origin"` | to'liq | origin | - |
| `"unsafe-url"` | to'liq | to'liq | to'liq |

Faraz qilaylik, bizda saytdan tashqarida ma'lum bo'lmasligi kerak bo'lgan URL strukturasiga ega admin zonasi bor.

Agar biz `fetch` yuborsak, sukut bo'yicha u har doim sahifamizning to'liq url'i bilan `Referer` header'ini yuboradi (HTTPS dan HTTP ga so'rov yuborganimizda bundan mustasno, o'shanda `Referer` yo'q).

Masalan `Referer: https://javascript.info/admin/secret/paths`.

Agar boshqa veb-saytlar faqat origin qismini bilishini istasak, URL-path ni emas, opsiyani o'rnatishimiz mumkin:

```js
fetch('https://another.com/page', {
  // ...
  referrerPolicy: "origin-when-cross-origin" // Referer: https://javascript.info
});
```

Biz buni barcha `fetch` chaqiruvlariga qo'yishimiz mumkin, ehtimol loyihamizdagi barcha so'rovlarni bajaradigan va ichida `fetch` dan foydalanadigan JavaScript kutubxonasiga integratsiya qilishimiz mumkin.

Standart xatti-harakatdan yagona farqi shundaki, boshqa origin ga so'rovlar uchun `fetch` faqat URL ning origin qismini yuboradi (masalan `https://javascript.info`, yo'lsiz). Bizning origin ga so'rovlar uchun biz hali ham to'liq `Referer` ni olamiz (debug maqsadlari uchun foydali bo'lishi mumkin).

```smart header="Referrer policy faqat `fetch` uchun emas"
[Spetsifikatsiya](https://w3c.github.io/webappsec-referrer-policy/)da tasvirlangan Referrer policy faqat `fetch` uchun emas, balki ko'proq global.

Xususan, `Referrer-Policy` HTTP header yordamida butun sahifa uchun standart siyosatni yoki `<a rel="noreferrer">` bilan har bir havola uchun o'rnatish mumkin.
```

## mode

`mode` opsiyasi tasodifiy cross-origin so'rovlarni oldini oluvchi himoya-qorovul:

- **`"cors"`** -- standart, cross-origin so'rovlariga ruxsat beriladi, <info:fetch-crossorigin>da tasvirlanganidek,
- **`"same-origin"`** -- cross-origin so'rovlari taqiqlangan,
- **`"no-cors"`** -- faqat xavfsiz cross-origin so'rovlariga ruxsat beriladi.

Bu opsiya `fetch` uchun URL uchinchi tomondan kelganda va cross-origin imkoniyatlarni cheklash uchun "o'chirish tugmasi" ni xohlaganimizda foydali bo'lishi mumkin.

## credentials

`credentials` opsiyasi `fetch` so'rov bilan cookie va HTTP-Authorization header'larini yuborishini belgilaydi.

- **`"same-origin"`** -- standart, cross-origin so'rovlar uchun yubormaslik,
- **`"include"`** -- har doim yuborish, JavaScript javobga kirishi uchun cross-origin serverdan `Accept-Control-Allow-Credentials` talab qiladi, bu <info:fetch-crossorigin> bobida ko'rilgan,
- **`"omit"`** -- hech qachon yubormaslik, hatto same-origin so'rovlar uchun ham.

## cache

Sukut bo'yicha, `fetch` so'rovlari standart HTTP-keshlashdan foydalanadi. Ya'ni, u `Expires` va `Cache-Control` header'larini hurmat qiladi, `If-Modified-Since` va boshqalarni yuboradi. Xuddi oddiy HTTP-so'rovlar qilgani kabi.

`cache` opsiyalari HTTP-keshni e'tiborsiz qoldirish yoki uning ishlatilishini nozik sozlash imkonini beradi:

- **`"default"`** -- `fetch` standart HTTP-kesh qoidalari va header'larini ishlatadi,
- **`"no-store"`** -- HTTP-keshni butunlay e'tiborsiz qoldirish, agar biz `If-Modified-Since`, `If-None-Match`, `If-Unmodified-Since`, `If-Match`, yoki `If-Range` header'ini o'rnatsak, bu rejim standart bo'ladi,
- **`"reload"`** -- HTTP-keshdan natija olmaydi (agar mavjud bo'lsa), lekin javob bilan keshni to'ldiradi (agar javob header'lari bu harakatga ruxsat bersa),
- **`"no-cache"`** -- keshlangan javob mavjud bo'lsa shartli so'rov yaratadi, aks holda oddiy so'rov. HTTP-keshni javob bilan to'ldiradi,
- **`"force-cache"`** -- HTTP-keshdan javobdan foydalanadi, hatto eski bo'lsa ham. Agar HTTP-keshda javob bo'lmasa, oddiy HTTP-so'rov qiladi, normal harakat qiladi,
- **`"only-if-cached"`** -- HTTP-keshdan javobdan foydalanadi, hatto eski bo'lsa ham. Agar HTTP-keshda javob bo'lmasa, xato. Faqat `mode` `"same-origin"` bo'lganda ishlaydi.

## redirect

Odatda, `fetch` HTTP-redirectlarni (301, 302 va boshqalar) shaffof ravishda kuzatib boradi.

`redirect` opsiyasi buni o'zgartirishga imkon beradi:

- **`"follow"`** -- standart, HTTP-redirectlarni kuzatib borish,
- **`"error"`** -- HTTP-redirect bo'lsa xato,
- **`"manual"`** -- HTTP-redirectlarni qo'lda qayta ishlash imkonini beradi. Redirect bo'lsa, biz `response.type="opaqueredirect"` va nol/bo'sh status va boshqa ko'pgina xususiyatlar bilan maxsus javob obyektini olamiz.

## integrity

`integrity` opsiyasi javob oldindan ma'lum bo'lgan checksumga mos kelishini tekshirish imkonini beradi.

[Spetsifikatsiya](https://w3c.github.io/webappsec-subresource-integrity/)da tasvirlanganidek, qo'llab-quvvatlanadigan hash-funktsiyalar SHA-256, SHA-384 va SHA-512, brauzerga qarab boshqalari ham bo'lishi mumkin.

Masalan, biz fayl yuklamoqdamiz va uning SHA-256 checksum'i "abcdef" ekanligini bilamiz (haqiqiy checksum uzunroq, albatta).

Biz uni `integrity` opsiyasiga quyidagicha qo'yishimiz mumkin:

```js
fetch('http://site.com/file', {
  integrity: 'sha256-abcdef'
});
```

Keyin `fetch` o'z-o'zidan SHA-256 ni hisoblab, bizning stringimiz bilan solishtiradi. Mos kelmaslik holatida xato yuzaga keladi.

## keepalive

`keepalive` opsiyasi so'rov uni boshlagan veb-sahifadan "uzoqroq yashashi" mumkinligini ko'rsatadi.

Masalan, biz joriy tashrif buyuruvchi sahifamizni qanday ishlatiganini (sichqoncha bosilishlari, u ko'radigan sahifa qismlari) to'playmiz, foydalanuvchi tajribasini tahlil qilish va yaxshilash uchun.

Tashrif buyuruvchi sahifamizni tark etganda -- biz ma'lumotlarni serverimizga saqlashni xohlaymiz.

Buning uchun `window.onunload` event'idan foydalanishimiz mumkin:

```js run
window.onunload = function() {
  fetch('/analytics', {
    method: 'POST',
    body: "statistika",
*!*
    keepalive: true
*/!*
  });
};
```

Odatda, hujjat yukdan tushirilganda, barcha bog'liq tarmoq so'rovlari to'xtatiladi. Lekin `keepalive` opsiyasi brauzerga sahifani tark etgandan keyin ham so'rovni fonda bajarishni aytadi. Shunday qilib, bu opsiya bizning so'rovimiz muvaffaqiyatli bo'lishi uchun muhim.

Uning bir nechta cheklovlari bor:

- Biz megabaytlar yubora olmaymiz: `keepalive` so'rovlar uchun body chegarasi 64KB.
    - Agar tashrif haqida ko'p statistika to'plashimiz kerak bo'lsa, uni muntazam ravishda paketlarda yuborishimiz kerak, shunda oxirgi `onunload` so'rov uchun ko'p narsa qolmaydi.
    - Bu chegara barcha `keepalive` so'rovlariga birgalikda tegishli. Boshqacha qilib aytganda, biz bir nechta `keepalive` so'rovlarni parallel bajarishimiz mumkin, lekin ularning body uzunliklari yig'indisi 64KB dan oshmasligi kerak.
- Hujjat yukdan tushirilgan bo'lsa, server javobini boshqara olmaymiz. Shunday qilib, bizning misolimizda `keepalive` tufayli `fetch` muvaffaqiyatli bo'ladi, lekin keyingi funktsiyalar ishlamaydi.
    - Statistika yuborish kabi ko'pgina hollarda bu muammo emas, chunki server shunchaki ma'lumotlarni qabul qiladi va odatda bunday so'rovlarga bo'sh javob yuboradi.