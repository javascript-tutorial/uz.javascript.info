Bizga `Origin` kerak, chunki ba'zida `Referer` yo'q. Misol uchun, biz HTTPS-dan HTTP-sahifani `fetch` paytida (xavfsizroqdan kamroq xavfsizroq kirish), keyin esa `Referer` yo'q.

[Kontent xavfsizligi siyosati](http://en.wikipedia.org/wiki/Content_Security_Policy) “Referer”ni yuborishni taqiqlashi mumkin.

Ko'rib turganimizdek, `fetch` `Referer`ni yuborishga to'sqinlik qiluvchi va hatto uni o'zgartirishga ruxsat beruvchi variantlarga ega (bir xil sayt ichida).

Spetsifikatsiyaga ko'ra, `Referer` ixtiyoriy HTTP sarlavhasidir.

Aynan `Referer` ishonchsiz bo'lgani uchun `Origin` ixtiro qilingan. Brauzer o'zaro kelib chiqish so'rovlari uchun to'g'ri `Origin` ni kafolatlaydi.
