Bu yerda aql-idrokka asoslangan tanlov `WeakSet`:

```js
let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];

let readMessages = new WeakSet();

// ikkita xabar o'qildi
readMessages.add(messages[0]);
readMessages.add(messages[1]);
// readMessages has 2 elements

// ...birinchi xabarni yana o'qiymiz!
readMessages.add(messages[0]);
// readMessages hali ham 2 ta noyob elementga ega

// javob: [0] xabar o'qilganmi?
alert("Read message 0: " + readMessages.has(messages[0])); // true

messages.shift();
// endi readMessages 1 ta elementga ega (texnik xotira keyinroq tozalanishi mumkin)
```

`WeakSet` xabarlar to'plamini saqlash va unda xabar mavjudligini osongina tekshirish imkonini beradi.

U o'zini avtomatik ravishda tozalaydi. Qizig'i shundaki, biz uni takrorlay olmaymiz. Biz "barcha o'qilgan xabarlarni" to'g'ridan-to'g'ri ololmaymiz. Ammo biz buni barcha xabarlarni takrorlash va to'plamdagi xabarlarni filtrlash orqali amalga oshirishimiz mumkin.

P.S. Har bir xabarga o'ziga xos xususiyatni qo'shish xavfli bo'lishi mumkin, agar xabarlar boshqa birovning kodi tomonidan boshqarilsa, lekin biz uni nizolardan qochish uchun belgiga aylantira olamiz.

Shunga o'xshash:
```js
// ramziy xususiyat faqat bizning kodimizga ma'lum
let isRead = Symbol("isRead");
messages[0][isRead] = true;
```

Endi boshqa birovning kodi xabar xususiyatlari uchun `for..in` tsikldan foydalansa ham, bizning maxfiy bayrog'imiz ko'rinmaydi.
