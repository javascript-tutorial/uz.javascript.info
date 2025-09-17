# Long Polling (Uzoq so'rov)

Long polling - bu WebSocket yoki Server Side Events kabi maxsus protokollardan foydalanmagan holda server bilan doimiy aloqani ta'minlashning eng oddiy usuli.

Amalga oshirish juda oson bo'lib, ko'p hollarda yetarlicha yaxshi.

## Oddiy Polling

Serverdan yangi ma'lumot olishning eng oddiy usuli - bu davriy so'rov. Ya'ni, serverga muntazam so'rovlar: "Salom, men shu yerdaman, mening uchun biror ma'lumot bormi?". Masalan, har 10 soniyada bir marta.

Javobda server birinchi navbatda mijoz onlayn ekanligini o'ziga qayd etadi, ikkinchidan esa o'sha paytgacha olgan xabarlar paketini yuboradi.

Bu ishlaydi, lekin kamchiliklari bor:
1. Xabarlar 10 soniyagacha kechikish bilan uzatiladi (so'rovlar orasida).
2. Hatto xabarlar bo'lmasa ham, server har 10 soniyada so'rovlar bilan bombardimon qilinadi, hatto foydalanuvchi boshqa joyga o'tgan yoki uxlab qolgan bo'lsa ham. Bu ishlash nuqtai nazaridan ko'rib chiqganda, ancha katta yuklamadir.

Shunday qilib, agar biz juda kichik xizmat haqida gapiraysak, bu yondashuv maqbul bo'lishi mumkin, lekin umuman olganda, yaxshilanish kerak.

## Long Polling

"Long polling" deb ataladigan usul - bu serverga so'rov yuborishning ancha yaxshi usuli.

Uni amalga oshirish ham juda oson va xabarlarni kechiktirishlarsiz yetkazadi.

Jarayon:

1. Serverga so'rov yuboriladi.
2. Server yuborish uchun xabar bo'lgunga qadar ulanishni yopmaydi.
3. Xabar paydo bo'lganda - server so'rovga u bilan javob beradi.
4. Brauzer darhol yangi so'rov yaratadi.

Brauzer so'rov yuborgan va server bilan kutilayotgan ulanishga ega bo'lgan vaziyat bu usul uchun standartdir. Faqat xabar yetkazilganda ulanish qayta tiklanadi.

![](long-polling.svg)

Agar tarmoq xatosi tufayli ulanish uzilsa, brauzer darhol yangi so'rov yuboradi.

Uzoq so'rovlar qiladigan mijoz tomonidagi `subscribe` funktsiyasining eskizi:

```js
async function subscribe() {
  let response = await fetch("/subscribe");

  if (response.status == 502) {
    // Status 502 - bu ulanish vaqti tugashi xatosi,
    // ulanish juda uzoq kutilganda sodir bo'lishi mumkin,
    // va masofaviy server yoki proksi uni yopgan
    // qayta ulanaylik
    await subscribe();
  } else if (response.status != 200) {
    // Xato - uni ko'rsataylik
    showMessage(response.statusText);
    // Bir soniyadan keyin qayta ulanish
    await new Promise(resolve => setTimeout(resolve, 1000));
    await subscribe();
  } else {
    // Xabarni olish va ko'rsatish
    let message = await response.text();
    showMessage(message);
    // Keyingi xabarni olish uchun subscribe() ni qayta chaqirish
    await subscribe();
  }
}

subscribe();
```

Ko'rib turganingizdek, `subscribe` funktsiyasi fetch qiladi, keyin javobni kutadi, uni boshqaradi va o'zini qayta chaqiradi.

```warn header="Server ko'plab kutilayotgan ulanishlar bilan ishlashga tayyor bo'lishi kerak"
Server arxitekturasi ko'plab kutilayotgan ulanishlar bilan ishlashga qodir bo'lishi kerak.

Muayyan server arxitektualari har bir ulanish uchun bitta jarayonni ishga tushiradi, natijada ulanishlar soni qancha bo'lsa, shuncha jarayon bo'ladi, har bir jarayon esa ancha xotira sarflaydi. Shunday qilib, juda ko'p ulanishlar hammasi sarflab yuboradi.

Bu ko'pincha PHP va Ruby kabi tillarda yozilgan backend'lar uchun xosdir.

Node.js yordamida yozilgan serverlar odatda bunday muammolarga duch kelmaydi.

Biroq, bu dasturlash tili muammosi emas. Ko'pgina zamonaviy tillar, jumladan PHP va Ruby ham to'g'ri backend'ni amalga oshirish imkonini beradi. Faqat server arxitekturangiz ko'plab bir vaqtdagi ulanishlar bilan yaxshi ishlashiga ishonch hosil qiling.
```

## Demo: chat

Mana demo chat, siz uni yuklab olishingiz va mahalliy ravishda ishga tushirishingiz mumkin (agar Node.js bilan tanish bo'lsangiz va modullarni o'rnatishingiz mumkin bo'lsa):

[codetabs src="longpoll" height=500]

Brauzer kodi `browser.js` da.

## Foydalanish sohasi

Long polling xabarlar kamdan-kam kelganda juda yaxshi ishlaydi.

Agar xabarlar juda tez-tez kelsa, yuqorida chizilgan so'rov-qabul qilish xabarlari jadvali arra ko'rinishida bo'ladi.

Har bir xabar - bu header'lar, autentifikatsiya yuklamasi va boshqalar bilan ta'minlangan alohida so'rov.

Shunday qilib, bu holatda [Websocket](info:websocket) yoki [Server Sent Events](info:server-sent-events) kabi boshqa usullar afzalroq.