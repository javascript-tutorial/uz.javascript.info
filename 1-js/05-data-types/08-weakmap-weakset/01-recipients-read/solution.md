# WeakSet yordamida o'qilgan xabarlarni saqlash

Keling, o'qilgan xabarlarni `WeakSet` da saqlaylik:

```js run
let messages = [
  { text: "Salom", from: "John" },
  { text: "Ishlar qalay?", from: "John" },
  { text: "Ko'rishguncha", from: "Alice" },
];

let readMessages = new WeakSet();

// ikkita xabar o'qildi
readMessages.add(messages[0]);
readMessages.add(messages[1]);
// readMessages da 2 ta element bor

// ...keling birinchi xabarni yana o'qiylik!
readMessages.add(messages[0]);
// readMessages hali ham 2 ta noyob elementga ega

// javob: messages[0] o'qildimi?
alert("0-xabar o'qildi: " + readMessages.has(messages[0])); // true

messages.shift();
// endi readMessages da 1 ta element bor (texnik jihatdan xotira keyinroq tozlanishi mumkin)
```

`WeakSet` xabarlar to'plamini saqlashga va unda xabarning mavjudligini oson tekshirishga imkon beradi.

U o'zini avtomatik ravishda tozlaydi. Buning evaziga biz uni iterate qila olmaymiz, undan to'g'ridan-to'g'ri "barcha o'qilgan xabarlar"ni ololmaymiz. Ammo biz buni barcha xabarlar bo'ylab iterate qilib va to'plamda bo'lganlarini filtrlash orqali amalga oshirishimiz mumkin.

## Muqobil yechim - Simbolik xususiyat

Boshqa, boshqacha yechim xabar o'qilgandan keyin unga `message.isRead=true` kabi xususiyat qo'shish bo'lishi mumkin. Xabar objektlari boshqa kod tomonidan boshqarilganligi sababli, bu odatda tavsiya etilmaydi, lekin konfliktlardan qochish uchun simbolik xususiyatdan foydalanishimiz mumkin.

Mana bunday:

```js
// simbolik xususiyat faqat bizning kodimizga ma'lum
let isRead = Symbol("isRead");
messages[0][isRead] = true;
```

Endi uchinchi tomon kodi bizning qo'shimcha xususiyatimizni ko'rmasligi mumkin.

## Yondashuvlarni taqqoslash

| Yondashuv | Afzalliklari | Kamchiliklari |
|-----------|--------------|---------------|
| **WeakSet** | • Avtomatik tozlanish<br>• Arxitektura jihatdan toza<br>• Noyoblikni ta'minlaydi | • Iterate qilib bo'lmaydi<br>• To'g'ridan-to'g'ri barcha elementlarni olib bo'lmaydi |
| **Simbolik xususiyat** | • Iterate qilish mumkin<br>• Konfliktlar ehtimoli past | • Qo'lda boshqarish kerak<br>• Objektni o'zgartirish |

Garchi simbollar muammolar ehtimolini pasaytirishga yordam bersa ham, arxitektura nuqtai nazaridan `WeakSet` dan foydalanish yaxshiroqdir.

## Nima uchun WeakSet yaxshiroq?

1. **Toza arxitektura**: Biz boshqa kodning objektlarini o'zgartirmaymiz
2. **Avtomatik tozlanish**: Xabar yo'q qilinganda, o'qish holati ham avtomatik o'chadi  
3. **Xotira samaradorligi**: Keraksiz ma'lumotlar to'planmaydi
4. **Enkapsulatsiya**: O'qish holati alohida boshqariladi

Bu misol WeakSet ning real loyihalarda qanday ishlatilishini ko'rsatadi - vaqtinchalik holatni saqlash va avtomatik tozlanishdan foydalanish uchun.