Biz ikkita ishlov beruvchidan foydalanishimiz kerak: `document.onkeydown` va `document.onkeyup`.

Hozir bosilgan tugmachalarni ushlab turish uchun `pressed = new Set()` to'plamini yarataylik.

Birinchi ishlov beruvchi unga qo'shadi, ikkinchisi esa undan olib tashlaydi. Har safar `keydown` da bizda yetarlicha tugmalar bosilganligini tekshiramiz va agar shunday bo'lsa, funktsiyani ishga tushiramiz.
