muhimlik: 5

---

# "O'qilmagan" belgilarni saqlash

Xabarlar massivi bor:

```js
let messages = [
  { text: "Salom", from: "John" },
  { text: "Ishlar qalay?", from: "John" },
  { text: "Ko'rishguncha", from: "Alice" },
];
```

Sizning kodingiz unga kirish imkoniga ega, lekin xabarlar boshqa birovning kodi tomonidan boshqariladi. Yangi xabarlar qo'shiladi, eskilari o'sha kod tomonidan muntazam ravishda olib tashlanadi va siz bu qachon sodir bo'lishini aniq bilmaysiz.

Endi, xabar "o'qilgan" yoki yo'qligini saqlash uchun qaysi ma'lumotlar strukturasidan foydalanishingiz mumkin? Struktura berilgan xabar objekti uchun "u o'qildimi?" savoliga javob berishga mos kelishi kerak.

P.S. Xabar `messages` dan olib tashlanganida, u sizning strukturangizdan ham yo'qolishi kerak.

P.P.S. Biz xabar objektlarini o'zgartirishimiz, ularga o'z xususiyatlarimizni qo'shishimiz kerak emas. Ular boshqa birovning kodi tomonidan boshqarilganligi sababli, bu yomon oqibatlarga olib kelishi mumkin.
