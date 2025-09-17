Biz chertishni boshqarish uchun `mouse.onclick` dan foydalanishimiz va sichqonchani `position:fixed` bilan "harakatlanuvchi" qilishimiz mumkin, so'ngra o'q tugmalarini boshqarish uchun `mouse.onkeydown`.

Yagona muammo shundaki, `keydown` faqat diqqat markazida bo'lgan elementlarni ishga tushiradi. Shunday qilib, biz elementga `tabindex` qo'shishimiz kerak. Bizga HTMLni oʻzgartirish taqiqlanganligi sababli, biz buning uchun `mouse.tabIndex` xususiyatidan foydalanishimiz mumkin.

P.S. Shuningdek, biz `mouse.onclick` ni `mouse.onfocus` bilan almashtirishimiz mumkin.
