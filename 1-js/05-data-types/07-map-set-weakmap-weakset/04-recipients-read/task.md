importance: 5

---

# "O'qilmagan" bayroqlarni saqlang

Bir xabarlar massivi mavjud:

```js
let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];
```

Sizning kodingiz unga kirishi mumkin, ammo xabarlarni boshqa birovning kodi boshqaradi. Yangi xabarlar qo'shiladi, eskirganlar muntazam ravishda ushbu kod orqali olib tashlanadi va biz aniq qachon bajarilishini bilmaymiz.

Xabar "o'qilganmi" yoki yo'qligini saqlash uchun qaysi ma'lumotlar tuzilmasidan foydalanishingiz mumkin? "O'qilganmi?" degan javobni berish uchun struktura juda mos bo'lishi kerak, berilgan xabar obyekti uchun.

P.S. Xabar `messages` dan olib tashlanganida, u sizning tuzilmangizdan ham yo'qolishi kerak.

P.P.S. Biz xabar obyektlarini to'g'ridan-to'g'ri o'zgartirmasligimiz kerak. Agar ular boshqalarning kodlari tomonidan boshqarilsa, ularga qo'shimcha xususiyatlarni qo'shish yomon oqibatlarga olib kelishi mumkin.