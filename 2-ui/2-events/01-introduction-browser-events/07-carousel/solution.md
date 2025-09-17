Tasvirlar tasmasi `<img>` `ul/li` tasvirlar ro`yxati sifatida ko`rsatilishi mumkin.

Odatda, bunday lenta keng bo'ladi, lekin biz uni "kesish" uchun atrofga qattiq o'lchamdagi `<div>` qo'yamiz, shunda lentaning faqat bir qismi ko'rinadi:

![](carousel1.svg)

Roʻyxatni gorizontal koʻrsatish uchun ʻ<li>ʻ uchun toʻgʻri CSS xususiyatlarini qoʻllashimiz kerak, masalan, `display: inline-block`.

`<img>` uchun biz `displey`ni ham sozlashimiz kerak, chunki sukut bo'yicha u `inline`. “Inline” elementlari ostida “harf dumlari” uchun qoʻshimcha joy ajratilgan, shuning uchun uni olib tashlash uchun “display:block” dan foydalanishimiz mumkin.

O'tkazish uchun biz `<ul>` ni siljitishimiz mumkin. Buni qilishning ko'plab usullari mavjud, masalan, `margin-left` ni o'zgartirish yoki (yaxshiroq ishlash) `transform: translateX()` dan foydalanish:

![](carousel2.svg)

Tashqi `<div>` belgilangan kenglikka ega, shuning uchun "qo'shimcha" tasvirlar kesiladi.

Butun karusel sahifadagi mustaqil `grafik komponent` dir, shuning uchun uni bitta `<div class="carousel">`ga o'rab, ichidagi narsalarni stilize qilganimiz ma'qul.
