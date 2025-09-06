# Server Sent Events (Server tomonidan yuborilgan event'lar)

[Server-Sent Events](https://html.spec.whatwg.org/multipage/comms.html#the-eventsource-interface) spetsifikatsiyasi server bilan ulanishni saqlaydigan va undan event'larni qabul qilishga imkon beruvchi o'rnatilgan `EventSource` klassini tasvirlaydi.

`WebSocket` ga o'xshab, ulanish doimiydir.

Lekin bir nechta muhim farqlar bor:

| `WebSocket` | `EventSource` |
|-------------|---------------|
| Ikki tomonlama: ham mijoz, ham server xabar almashinuvi mumkin | Bir tomonlama: faqat server ma'lumot yuboradi |
| Ikkilik va matn ma'lumotlari | Faqat matn |
| WebSocket protokoli | Oddiy HTTP |

`EventSource` - bu server bilan muloqot qilishning `WebSocket` ga nisbatan kamroq kuchli usuli.

Nega uni ishlatish kerak?

Asosiy sabab: u oddiyroq. Ko'pgina ilovalarda `WebSocket` ning kuchi biroz ortiqcha.

Bizga serverdan ma'lumot oqimini qabul qilish kerak: ehtimol chat xabarlari yoki bozor narxlari, yoki boshqa narsalar. `EventSource` aynan shu uchun yaxshi. Bundan tashqari, u avtomatik qayta ulanishni qo'llab-quvvatlaydi, buni `WebSocket` bilan qo'lda amalga oshirishimiz kerak. Bundan tashqari, bu yangi protokol emas, balki oddiy eski HTTP.

## Xabarlarni olish

Xabarlarni qabul qilishni boshlash uchun faqat `new EventSource(url)` yaratishimiz kerak.

Brauzer `url` ga ulanadi va event'larni kutib ulanishni ochiq saqlaydi.

Server 200 status va `Content-Type: text/event-stream` header bilan javob berishi, keyin ulanishni saqlab, xabarlarni maxsus formatda yozishi kerak, masalan:

```
data: Xabar 1

data: Xabar 2

data: Xabar 3
data: ikki qatorli
```

- Xabar matni `data:` dan keyin keladi, ikki nuqtadan keyingi bo'shliq ixtiyoriy.
- Xabarlar ikki qatorli uzilish `\n\n` bilan ajratiladi.
- Qator uzilishi `\n` yuborish uchun darhol yana bir `data:` yuborishimiz mumkin (yuqoridagi 3-xabar).

Amalda murakkab xabarlar odatda JSON-kodlangan holda yuboriladi. Qator uzilishlari ularda `\n` sifatida kodlanadi, shuning uchun ko'p qatorli `data:` xabarlari kerak emas.

Masalan:

```js
data: {"user":"John","message":"Birinchi qator*!*\n*/!* Ikkinchi qator"}
```

...Shunday qilib, biz bitta `data:` aynan bitta xabarni saqlaydi deb taxmin qilishimiz mumkin.

Har bir bunday xabar uchun `message` eventi yaratiladi:

```js
let eventSource = new EventSource("/events/subscribe");

eventSource.onmessage = function(event) {
  console.log("Yangi xabar", event.data);
  // yuqoridagi ma'lumot oqimi uchun 3 marta log qiladi
};

// yoki eventSource.addEventListener('message', ...)
```

### Cross-origin so'rovlari

`EventSource` `fetch` va boshqa tarmoq metodlari kabi cross-origin so'rovlarni qo'llab-quvvatlaydi. Biz har qanday URL dan foydalanishimiz mumkin:

```js
let source = new EventSource("https://another-site.com/events");
```

Masofaviy server `Origin` header'ini oladi va davom etish uchun `Access-Control-Allow-Origin` bilan javob berishi kerak.

Hisob ma'lumotlarini uzatish uchun qo'shimcha `withCredentials` opsiyasini o'rnatishimiz kerak, masalan:

```js
let source = new EventSource("https://another-site.com/events", {
  withCredentials: true
});
```

Cross-origin header'lar haqida batafsil ma'lumot uchun <info:fetch-crossorigin> bobiga qarang.

## Qayta ulanish

Yaratilganda `new EventSource` serverga ulanadi va agar ulanish uzilsa -- qayta ulanadi.

Bu juda qulay, chunki bu haqda g'amxo'rlik qilishimiz shart emas.

Qayta ulanishlar orasida kichik kechikish bor, sukut bo'yicha bir necha soniya.

Server javobda `retry:` yordamida tavsiya etilgan kechikishni o'rnatishi mumkin (millisekundlarda):

```js
retry: 15000
data: Salom, men qayta ulanish kechikishini 15 soniyaga o'rnatdim
```

`retry:` ba'zi ma'lumotlar bilan birga yoki mustaqil xabar sifatida kelishi mumkin.

Brauzer qayta ulanishdan oldin shuncha millisekund kutishi kerak. Yoki uzoqroq, masalan agar brauzer (OS dan) hozir tarmoq ulanishi yo'qligini bilsa, u ulanish paydo bo'lguncha kutib, keyin qayta urinishi mumkin.

- Agar server brauzerning qayta ulanishni to'xtatishini xohlasa, u HTTP status 204 bilan javob berishi kerak.
- Agar brauzer ulanishni yopmoqchi bo'lsa, `eventSource.close()` ni chaqirishi kerak:

```js
let eventSource = new EventSource(...);

eventSource.close();
```

Bundan tashqari, agar javob noto'g'ri `Content-Type` ga ega bo'lsa yoki uning HTTP statusi 301, 307, 200 va 204 dan farq qilsa, qayta ulanish bo'lmaydi. Bunday hollarda `"error"` eventi chiqariladi va brauzer qayta ulanmaydi.

```smart
Ulanish nihoyat yopilganda, uni "qayta ochish" imkoni yo'q. Agar qayta ulanmoqchi bo'lsak, faqat yangi `EventSource` yarating.
```

## Xabar id'si

Tarmoq muammolari tufayli ulanish uzilganda, hech bir tomon qaysi xabarlar qabul qilingan va qaysilari qabul qilinmaganiga ishonch hosil qila olmaydi.

Ulanishni to'g'ri davom ettirish uchun har bir xabar `id` maydoniga ega bo'lishi kerak, masalan:

```
data: Xabar 1
id: 1

data: Xabar 2
id: 2

data: Xabar 3
data: ikki qatorli
id: 3
```

`id:` bilan xabar qabul qilinganda, brauzer:

- `eventSource.lastEventId` xususiyatini uning qiymatiga o'rnatadi.
- Qayta ulanishda server keyingi xabarlarni qayta yuborishi uchun o'sha `id` bilan `Last-Event-ID` header'ini yuboradi.

```smart header="`id:` ni `data:` dan keyin qo'ying"
Diqqat qiling: xabar qabul qilingandan keyin `lastEventId` yangilanishini ta'minlash uchun server tomonidan `id` xabar `data` dan pastga qo'shiladi.
```

## Ulanish holati: readyState

`EventSource` obyektining uchta qiymatdan biriga ega `readyState` xususiyati bor:

```js no-beautify
EventSource.CONNECTING = 0; // ulanmoqda yoki qayta ulanmoqda
EventSource.OPEN = 1;       // ulangan
EventSource.CLOSED = 2;     // ulanish yopilgan
```

Obyekt yaratilganda yoki ulanish uzilganda, u har doim `EventSource.CONNECTING` (0 ga teng).

`EventSource` holatini bilish uchun ushbu xususiyatni so'rashimiz mumkin.

## Event turlari

Sukut bo'yicha `EventSource` obyekti uchta event yaratadi:

- `message` -- xabar qabul qilindi, `event.data` sifatida mavjud.
- `open` -- ulanish ochiq.
- `error` -- ulanish o'rnatilmadi, masalan server HTTP 500 statusini qaytardi.

Server event boshida `event: ...` bilan boshqa event turi belgilashi mumkin.

Masalan:

```
event: join
data: Bob

data: Salom

event: leave
data: Bob
```

Maxsus event'larni boshqarish uchun `onmessage` emas, `addEventListener` dan foydalanishimiz kerak:

```js
eventSource.addEventListener('join', event => {
  alert(`Qo'shildi ${event.data}`);
});

eventSource.addEventListener('message', event => {
  alert(`Aytdi: ${event.data}`);
});

eventSource.addEventListener('leave', event => {
  alert(`Ketdi ${event.data}`);
});
```

## To'liq misol

Mana `1`, `2`, `3`, keyin `bye` bilan xabarlar yuborib ulanishni uzadigan server.

Keyin brauzer avtomatik qayta ulanadi.

[codetabs src="eventsource"]

## Xulosa

`EventSource` obyekti avtomatik ravishda doimiy ulanish o'rnatadi va server uning ustida xabarlar yuborish imkonini beradi.

U quyidagilarni taklif etadi:
- Sozlanadigan `retry` timeout bilan avtomatik qayta ulanish.
- Event'larni davom ettirish uchun xabar id'lari, qayta ulanishda oxirgi qabul qilingan identifikator `Last-Event-ID` header'ida yuboriladi.
- Joriy holat `readyState` xususiyatida.

Bu `EventSource` ni `WebSocket` ga muqobil variant qiladi, chunki ikkinchisi past darajadagi va bunday o'rnatilgan xususiyatlarga ega emas (garchi ularni amalga oshirish mumkin bo'lsa ham).

Ko'pgina real hayot ilovalarida `EventSource` ning kuchi yetarli.

Barcha zamonaviy brauzerlarda qo'llab-quvvatlanadi (IE bundan mustasno).

Sintaksis:

```js
let source = new EventSource(url, [credentials]);
```

Ikkinchi argument faqat bitta mumkin bo'lgan opsiyaga ega: `{ withCredentials: true }`, u cross-origin hisob ma'lumotlarini yuborishga imkon beradi.

Umuman cross-origin xavfsizligi `fetch` va boshqa tarmoq metodlari bilan bir xil.

### `EventSource` obyektining xususiyatlari

`readyState`
: Joriy ulanish holati: `EventSource.CONNECTING (=0)`, `EventSource.OPEN (=1)` yoki `EventSource.CLOSED (=2)`.

`lastEventId`
: Oxirgi qabul qilingan `id`. Qayta ulanishda brauzer uni `Last-Event-ID` header'ida yuboradi.

### Metodlar

`close()`
: Ulanishni yopadi.

### Event'lar

`message`
: Xabar qabul qilindi, ma'lumot `event.data` da.

`open`
: Ulanish o'rnatildi.

`error`
: Xatolik holatida, jumladan yo'qolgan ulanish (avtomatik qayta ulanadi) va halokatli xatolar. Qayta ulanish urinilayotganini ko'rish uchun `readyState` ni tekshirishimiz mumkin.

Server `event:` da maxsus event nomini o'rnatishi mumkin. Bunday event'lar `on<event>` emas, `addEventListener` yordamida boshqarilishi kerak.

### Server javob formati

Server `\n\n` bilan ajratilgan xabarlarni yuboradi.

Xabarda quyidagi maydonlar bo'lishi mumkin:

- `data:` -- xabar tanasi, bir nechta `data` ketma-ketligi qismlar orasida `\n` bilan bitta xabar sifatida talqin qilinadi.
- `id:` -- `lastEventId` ni yangilaydi, qayta ulanishda `Last-Event-ID` da yuboriladi.
- `retry:` -- qayta ulanishlar uchun ms da retry kechikishini tavsiya etadi. JavaScript'dan uni o'rnatishning yo'li yo'q.
- `event:` -- event nomi, `data:` dan oldin bo'lishi kerak.

Xabar har qanday tartibda bir yoki bir nechta maydonlarni o'z ichiga olishi mumkin, lekin `id:` odatda oxirgi bo'ladi.