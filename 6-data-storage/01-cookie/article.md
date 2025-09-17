# Cookies, document.cookie

Cookie'lar to'g'ridan-to'g'ri brauzerde saqlanadigan kichik ma'lumot satr'laridir. Ular [RFC 6265](https://tools.ietf.org/html/rfc6265) spetsifikatsiyasi bilan belgilangan HTTP protokolining bir qismidir.

Cookie'lar odatda veb-server tomonidan `Set-Cookie` HTTP-header javobidan foydalanib o'rnatiladi. Keyin brauzer ularni bir xil domanga deyarli har bir so'rovga `Cookie` HTTP-header yordamida avtomatik qo'shadi.

Eng keng tarqalgan foydalanish holatlaridan biri autentifikatsiya:

1. Tizimga kirishda server javobda noyob "sessiya identifikatori" bilan cookie o'rnatish uchun `Set-Cookie` HTTP-header'idan foydalanadi.
2. Keyingi safar bir xil domanga so'rov yuborilganda, brauzer `Cookie` HTTP-header yordamida cookie'ni tarmoq orqali yuboradi.
3. Shuning uchun server kim so'rov qilganini biladi.

Biz cookie'larga brauzerdan ham `document.cookie` xususiyati orqali kira olamiz.

Cookie'lar va ularning opsiyalari haqida ko'plab murakkab narsalar bor. Ushbu bobda biz ularni batafsil ko'rib chiqamiz.

## document.cookie dan o'qish

```online
Sizning brauzeringiz ushbu saytdan biron cookie'larni saqlaydimi? Keling, ko'raylik:
```

```offline
Veb-saytda ekanligingizni hisobga olsak, undan cookie'larni ko'rishingiz mumkin:
```

```js run
// javascript.info da biz statistika uchun Google Analytics ishlatamiz,
// shuning uchun ba'zi cookie'lar bo'lishi kerak
alert( document.cookie ); // cookie1=value1; cookie2=value2;...
```

`document.cookie` ning qiymati `; ` bilan ajratilgan `name=value` juftliklaridan iborat. Har biri alohida cookie.

Ma'lum bir cookie'ni topish uchun `document.cookie` ni `; ` bo'yicha ajratib, keyin to'g'ri nomni topishimiz mumkin. Buning uchun regular expression yoki array funktsiyalaridan foydalanishimiz mumkin.

Buni o'quvchi uchun mashq sifatida qoldiramiz. Bundan tashqari, bob oxirida cookie'larni boshqarish uchun yordamchi funktsiyalarni topasiz.

## document.cookie ga yozish

Biz `document.cookie` ga yoza olamiz. Lekin bu ma'lumot xususiyati emas, bu accessor (getter/setter). Unga tayinlash maxsus ravishda qaraladi.

**`document.cookie` ga yozish operatsiyasi faqat unda eslatilgan cookie'larni yangilaydi, lekin boshqa cookie'larga tegmaydi.**

Masalan, bu chaqiruv `user` nomi va `John` qiymati bilan cookie o'rnatadi:

```js run
document.cookie = "user=John"; // faqat 'user' nomli cookie'ni yangilash
alert(document.cookie); // barcha cookie'larni ko'rsatish
```

Agar siz buni ishga tushirsangiz, ehtimol bir nechta cookie'larni ko'rasiz. Buning sababi `document.cookie=` operatsiyasi barcha cookie'larni qayta yozmaydi. U faqat eslatilgan `user` cookie'sini o'rnatadi.

Texnik jihatdan, nom va qiymat har qanday belgilarga ega bo'lishi mumkin. To'g'ri formatni saqlash uchun ular o'rnatilgan `encodeURIComponent` funktsiyasi yordamida kodlanishi kerak:

```js run
// maxsus belgilar (bo'shliqlar), kodlash kerak
let name = "mening ismim";
let value = "John Smith"

// cookie'ni my%20name=John%20Smith sifatida kodlaydi
document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

alert(document.cookie); // ...; my%20name=John%20Smith
```

```warn header="Cheklovlar"
Bir nechta cheklovlar bor:
- `encodeURIComponent` dan keyingi `name=value` juftligi 4KB dan oshmasligi kerak. Shuning uchun cookie'da juda katta narsalarni saqlay olmaymiz.
- Har bir domen uchun cookie'larning umumiy soni taxminan 20+ ga cheklangan, aniq chegara brauzerga bog'liq.
```

Cookie'lar bir nechta opsiyalarga ega, ularning ko'pchiligi muhim va o'rnatilishi kerak.

Opsiyalar `key=value` dan keyin, `;` bilan ajratilgan holda ro'yxatlanadi:

```js run
document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"
```

## path

- **`path=/mypath`**

URL yo'l prefiksi mutlaq bo'lishi kerak. Bu cookie'ni o'sha yo'l ostidagi sahifalar uchun kirish mumkin qiladi. Sukut bo'yicha, bu joriy yo'l.

Agar cookie `path=/admin` bilan o'rnatilgan bo'lsa, u `/admin` va `/admin/something` sahifalarida ko'rinadi, lekin `/home` yoki `/adminpage` da emas.

Odatda biz `path` ni ildizga o'rnatishimiz kerak: `path=/` cookie'ni barcha veb-sayt sahifalaridan kirish mumkin qilish uchun.

## domain

- **`domain=site.com`**

Domen cookie qayerda kirish mumkinligini belgilaydi. Amalda cheklovlar bor. Biz har qanday domenni o'rnata olmaymiz.

Sukut bo'yicha, cookie faqat uni o'rnatgan domenda kirish mumkin. Shunday qilib, agar cookie `site.com` tomonidan o'rnatilgan bo'lsa, biz uni `other.com` da olmaymiz.

...Lekin yanada murakkabi, biz cookie'ni subdomen `forum.site.com` da ham olmaymiz!

```js
// site.com da
document.cookie = "user=John"

// forum.site.com da
alert(document.cookie); // user yo'q
```

**Cookie'ni boshqa 2-darajali domendan kirish mumkin qilishning yo'li yo'q, shuning uchun `other.com` hech qachon `site.com` da o'rnatilgan cookie'ni olmaydi.**

Bu xavfsizlik cheklovi, bizga cookie'larda maxfiy ma'lumotlarni saqlash imkonini beradi, bu faqat bitta saytda mavjud bo'lishi kerak.

...Lekin agar biz `forum.site.com` kabi subdomenlarning cookie olishiga ruxsat bermoqchi bo'lsak, bu mumkin. `site.com` da cookie o'rnatishda `domain` opsiyasini ildiz domenga aniq o'rnatishimiz kerak: `domain=site.com`:

```js
// site.com da
// cookie'ni har qanday subdomen *.site.com da kirish mumkin qilish:
document.cookie = "user=John; domain=site.com"

// keyinroq

// forum.site.com da
alert(document.cookie); // user=John cookie'si mavjud
```

Tarixiy sabablarga ko'ra, `domain=.site.com` (`site.com` dan oldingi nuqta) ham xuddi shu tarzda ishlaydi, subdomenlardan cookie'ga kirishga imkon beradi. Bu eski yozuv va agar juda eski brauzerlarni qo'llab-quvvatlashimiz kerak bo'lsa, ishlatilishi kerak.

Shunday qilib, `domain` opsiyasi cookie'ni subdomenlardan kirish mumkin qilish imkonini beradi.

## expires, max-age

Sukut bo'yicha, agar cookie'da ushbu opsiyalardan biri bo'lmasa, brauzer yopilganda u yo'qoladi. Bunday cookie'lar "sessiya cookie'lari" deb ataladi.

Cookie'larning brauzer yopilishidan omon qolishi uchun `expires` yoki `max-age` opsiyasini o'rnatishimiz mumkin.

- **`expires=Tue, 19 Jan 2038 03:14:07 GMT`**

Cookie amal qilish muddati brauzer uni avtomatik o'chiradigan vaqtni belgilaydi.

Sana aynan shu formatda, GMT vaqt zonasida bo'lishi kerak. Uni olish uchun `date.toUTCString` dan foydalanishimiz mumkin. Masalan, cookie'ni 1 kun ichida tugashiga o'rnatishimiz mumkin:

```js
// hozirgidan +1 kun
let date = new Date(Date.now() + 86400e3);
date = date.toUTCString();
document.cookie = "user=John; expires=" + date;
```

Agar `expires` ni o'tmishdagi sanaga o'rnatsak, cookie o'chiriladi.

-  **`max-age=3600`**

`expires` ga alternativ bo'lib, cookie'ning joriy momentdan boshlab soniyalarda amal qilish muddatini belgilaydi.

Agar nol yoki manfiy qiymatga o'rnatilsa, cookie o'chiriladi:

```js
// cookie hozirgidan +1 soat ichida o'ladi
document.cookie = "user=John; max-age=3600";

// cookie'ni o'chirish (hoziroq tugashini)
document.cookie = "user=John; max-age=0";
```

## secure

- **`secure`**

Cookie faqat HTTPS orqali uzatilishi kerak.

**Sukut bo'yicha, agar biz `http://site.com` da cookie o'rnatsak, u `https://site.com` da ham paydo bo'ladi va aksincha.**

Ya'ni, cookie'lar domenlarga asoslangan, ular protokollarni ajratmaydi.

Ushbu opsiya bilan, agar cookie `https://site.com` tomonidan o'rnatilgan bo'lsa, bir xil sayt HTTP orqali `http://site.com` sifatida kirilganda paydo bo'lmaydi. Shunday qilib, agar cookie'da shifrlash orqali yuborilmasligi kerak bo'lgan maxfiy kontent bo'lsa, `secure` bayrog'i to'g'ri narsa.

```js
// https:// da ekanligimizni taxmin qilib
// cookie'ni secure qilish (faqat HTTPS orqali kirish mumkin)
document.cookie = "user=John; secure";
```  

## samesite

Bu yana bir xavfsizlik atributi `samesite`. U XSRF (cross-site request forgery) hujumlaridan himoyalash uchun mo'ljallangan.

Uning qanday ishlashini va qachon foydali ekanligini tushunish uchun XSRF hujumlariga qaraylik.

### XSRF hujumi

Tasavvur qiling, siz `bank.com` saytiga kirgansiz. Ya'ni: o'sha saytdan autentifikatsiya cookie'si bor. Sizning brauzeringiz uni har so'rov bilan `bank.com` ga yuboradi, shuning uchun u sizni taniydi va barcha maxfiy moliyaviy operatsiyalarni bajaradi.

Endi boshqa oynada vebni ko'rib chiqayotganda siz tasodifan boshqa sayt `evil.com` ga keldingiz. O'sha saytda hakerning hisobiga tranzaksiyani boshlaydigan maydonlar bilan `bank.com` ga `<form action="https://bank.com/pay">` shakli yuboradigan JavaScript kodi bor.

Brauzer `bank.com` saytiga har safar kirganingizda cookie'larni yuboradi, hatto forma `evil.com` dan yuborilgan bo'lsa ham. Shuning uchun bank sizni taniydi va to'lovni haqiqatan ham amalga oshiradi.

![](cookie-xsrf.svg)

Bu "Cross-Site Request Forgery" (qisqacha XSRF) hujumi deb ataladi.

Haqiqiy banklar albatta bundan himoyalangan. `bank.com` tomonidan yaratilgan barcha formalarda maxsus maydon, "XSRF himoya tokeni" deb ataladigan narsalar bor, yomon sahifa buni yarata olmaydi yoki masofaviy sahifadan ajrata olmaydi. U formani yuborishi mumkin, lekin ma'lumotni qaytarib ololmaydi. `bank.com` sayt qabul qiladigan har bir formada bunday tokenni tekshiradi.

Bunday himoya amalga oshirish vaqt talab qiladi. Har bir formada kerakli token maydoni borligini ta'minlashimiz va barcha so'rovlarni ham tekshirishimiz kerak.

### Cookie samesite opsiyasi

Cookie `samesite` opsiyasi bunday hujumlardan himoyalanishning yana bir usulini taqdim etadi, bu (nazariy jihatdan) "xsrf himoya tokenlarini" talab qilmasligi kerak.

Uning ikkita mumkin bo'lgan qiymati bor:

- **`samesite=strict` (`samesite` qiymatsiz bilan bir xil)**

`samesite=strict` bilan cookie foydalanuvchi bir xil saytdan tashqaridan kelsa hech qachon yuborilmaydi.

Boshqacha qilib aytganda, foydalanuvchi o'z pochtasidan havolaga amal qilsa yoki `evil.com` dan forma yubor sa, yoki boshqa domendan boshqa operatsiyani bajaris , cookie yuborilmaydi.

Agar autentifikatsiya cookie'larida `samesite` opsiyasi bo'lsa, XSRF hujumi muvaffaq bo'lish imkoni yo'q, chunki `evil.com` dan yuborish cookie'larsiz keladi. Shuning uchun `bank.com` foydalanuvchini tanimaydi va to'lov bilan davom etmaydi.

Himoya ancha ishonchli. Faqat `bank.com` dan kelgan operatsiyalar `samesite` cookie'sini yuboradi, masalan `bank.com` dagi boshqa sahifadan forma yuborish.

Garchi, kichik noqulaylik bor.

Foydalanuvchi o'z eslatmalaridan kabi `bank.com` ga qonuniy havolaga amal qilganda, `bank.com` uni tanimasligidan hayron bo'ladi. Haqiqatan ham, `samesite=strict` cookie'lari bunday holatda yuborilmaydi.

Biz buni ikkita cookie ishlatib hal qilishimiz mumkin: biri "umumiy tanish" uchun, faqat "Salom, John" deyish maqsadi uchun, ikkinchisi esa `samesite=strict` bilan ma'lumot o'zgartiradigan operatsiyalar uchun. Keyin saytdan tashqaridan kelgan odam xush kelibsizni ko'radi, lekin to'lovlar ikkinchi cookie yuborilishi uchun bank veb-saytidan boshlanishi kerak.

- **`samesite=lax`**

XSRF dan himoyaladigan va foydalanuvchi tajribasini buzmaydigan yanada yumshoq yondashuv.

Lax rejimi, xuddi `strict` kabi, brauzerni saytdan tashqaridan kelganda cookie'lar yuborishni taqiqlaydi, lekin istisno qo'shadi.

`samesite=lax` cookie agar ikkala shart ham to'g'ri bo'lsa yuboriladi:
1. HTTP metodi "xavfsiz" (masalan GET, lekin POST emas).

    Xavfsiz HTTP metodlarning to'liq ro'yxati [RFC7231 spetsifikatsiyasi](https://tools.ietf.org/html/rfc7231) da. Asosan, bular o'qish uchun ishlatilishi kerak bo'lgan metodlar, yozish uchun emas. Ular hech qanday ma'lumot o'zgartiradigan operatsiyalarni bajarmasligi kerak. Havolaga amal qilish har doim GET, xavfsiz metod.

2. Operatsiya yuqori darajali navigatsiyani amalga oshiradi (brauzer manzil satrida URL ni o'zgartiradi).

    Bu odatda to'g'ri, lekin navigatsiya `<iframe>` da amalga oshirilsa, u yuqori darajada emas. Shuningdek, tarmoq so'rovlari uchun JavaScript metodlari hech qanday navigatsiyani amalga oshirmaydi, shuning uchun ular mos kelmaydi.

Shunday qilib, `samesite=lax` ning qilishi asosan eng keng tarqalgan "URL ga o'tish" operatsiyasiga cookie'lar bo'lishiga ruxsat beradi. Masalan, bu shartlarni qanoatlantiruvchi eslatmalardan veb-sayt havolasini ochish.

Lekin yanada murakkab narsa, boshqa saytdan tarmoq so'rovi yoki forma yuborish kabi, cookie'larni yo'qotadi.

Agar bu sizga mos kelsa, `samesite=lax` qo'shish ehtimol foydalanuvchi tajribasini buzmaydi va himoya qo'shadi.

Umuman olganda, `samesite` ajoyib opsiya.

Kamchiligi bor:

- `samesite` juda eski brauzerlar tomonidan e'tiborga olinmaydi (qo'llab-quvvatlanmaydi), 2017-yil atrofida.

**Shuning uchun agar biz faqat himoya berish uchun `samesite` ga tayanadigan bo'lsak, eski brauzerlar zaif bo'ladi.**

Lekin biz himoyaning qo'shimcha qatlamini qo'shish uchun `samesite` ni xsrf tokenlari kabi boshqa himoya choralari bilan birga ishlatishimiz mumkin va keyin, kelajakda eski brauzerlar yo'q bo'lganda, ehtimol xsrf tokenlarini tashlab qo'ya olamiz.

## httpOnly

Bu opsiyaning JavaScript bilan hech qanday aloqasi yo'q, lekin to'liqlik uchun uni eslatishimiz kerak.

Veb-server cookie o'rnatish uchun `Set-Cookie` header'idan foydalanadi. Shuningdek, u `httpOnly` opsiyasini o'rnatishi mumkin.

Bu opsiya cookie'ga har qanday JavaScript kirishni taqiqlaydi. Biz bunday cookie'ni ko'ra olmaymiz yoki `document.cookie` yordamida manipulyatsiya qila olmaymiz.

Bu haker sahifaga o'z JavaScript kodini kiritib, foydalanuvchi o'sha sahifaga tashrif buyurishini kutganida ba'zi hujumlardan himoyalanish uchun ehtiyot chorasi sifatida ishlatiladi. Bu umuman mumkin bo'lmasligi kerak, hakerlar bizning saytimizga o'z kodlarini kirita olmasligi kerak, lekin buni amalga oshirishga imkon beruvchi xatolar bo'lishi mumkin.

Odatda, agar bunday narsa sodir bo'lsa va foydalanuvchi haker JavaScript kodi bilan veb-sahifaga tashrif buyursa, o'sha kod ijro etiladi va autentifikatsiya ma'lumotlarini o'z ichiga olgan foydalanuvchi cookie'lari bilan `document.cookie` ga kirishni oladi. Bu yomon.

Lekin agar cookie `httpOnly` bo'lsa, `document.cookie` uni ko'rmaydi, shuning uchun u himoyalangan.

## Ilova: Cookie funktsiyalari

Mana cookie'lar bilan ishlash uchun kichik funktsiyalar to'plami, `document.cookie` ni qo'lda o'zgartirishdan ko'ra qulayroq.

Buning uchun ko'plab cookie kutubxonalari mavjud, shuning uchun bular demo maqsadlari uchun. Garchi to'liq ishlaydigan.

### getCookie(name)

Cookie'ga kirishning eng qisqa yo'li [regular expression](info:regular-expressions) dan foydalanish.

`getCookie(name)` funktsiyasi berilgan `name` bilan cookie'ni qaytaradi:

```js
// berilgan nomdagi cookie'ni qaytaradi,
// topilmasa undefined
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
```

Bu yerda `new RegExp` dinamik ravishda yaratiladi, `; name=<value>` ga mos kelish uchun.

Diqqat qiling, cookie qiymati kodlangan, shuning uchun `getCookie` uni dekodlash uchun o'rnatilgan `decodeURIComponent` funktsiyasidan foydalanadi.

### setCookie(name, value, options)

Cookie'ning `name` ini berilgan `value` ga sukut bo'yicha `path=/` bilan o'rnatadi (boshqa standartlarni qo'shish uchun o'zgartirilishi mumkin):

```js run
function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // kerak bo'lsa bu yerga boshqa standartlarni qo'shing
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

// Foydalanish misoli:
setCookie('user', 'John', {secure: true, 'max-age': 3600});
```

### deleteCookie(name)

Cookie'ni o'chirish uchun uni manfiy amal qilish sanasi bilan chaqirishimiz mumkin:

```js
function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}
```

```warn header="Yangilash yoki o'chirish bir xil path va domain ishlatishi kerak"
Diqqat qiling: cookie'ni yangilaganimizda yoki o'chirganimizda, uni o'rnatganimizda ishlatgan path va domain opsiyalarini aynan bir xil ishlatishimiz kerak.
```

Birga: [cookie.js](cookie.js).

## Ilova: Uchinchi tomon cookie'lari

Cookie foydalanuvchi tashrif buyurayotgan sahifadan boshqa domen tomonidan joylashtirilgan bo'lsa, "uchinchi tomon" deb ataladi.

Masalan:
1. `site.com` dagi sahifa boshqa saytdan banner yuklaydi: `<img src="https://ads.com/banner.png">`.
2. Banner bilan birga, `ads.com` dagi masofaviy server `id=1234` kabi cookie bilan `Set-Cookie` header'ini o'rnatishi mumkin. Bunday cookie `ads.com` domenidan kelib chiqadi va faqat `ads.com` da ko'rinadi:

    ![](cookie-third-party.svg)

3. Keyingi safar `ads.com` ga kirilganda, masofaviy server `id` cookie'sini oladi va foydalanuvchini taniydi:

    ![](cookie-third-party-2.svg)

4. Yanada muhimi, foydalanuvchi `site.com` dan banneri ham bo'lgan boshqa sayt `other.com` ga o'tganda, `ads.com` cookie'ni oladi, chunki u `ads.com` ga tegishli, shuning uchul tashrif buyuruvchini taniydi va u saytlar orasida harakatlanayotganda kuzatib boradi:

    ![](cookie-third-party-3.svg)

Uchinchi tomon cookie'lari an'anaviy ravishda kuzatuv va reklama xizmatlari uchun ishlatiladi, ularning tabiatiga ko'ra. Ular kelib chiqqan domenga bog'langan, shuning uchun `ads.com` turli saytlar orasida bir xil foydalanuvchini kuzatib borishi mumkin, agar ularning barchasi unga kirsa.

Tabiiyki, ba'zi odamlar kuzatuvni yoqtirmaydi, shuning uchun brauzerlar bunday cookie'larni o'chirishga imkon beradi.

Shuningdek, ba'zi zamonaviy brauzerlar bunday cookie'lar uchun maxsus siyosatlar ishlatadi:
- Safari uchinchi tomon cookie'lariga umuman ruxsat bermaydi.
- Firefox uchinchi tomon cookie'larini bloklaydigan uchinchi tomon domenlarining "qora ro'yxati" bilan keladi.

```smart
Agar biz uchinchi tomon domenidan script yuklasakuchinchi tomon domenidan script yuklasak, masalan `<script src="https://google-analytics.com/analytics.js">`, va bu script cookie o'rnatish uchun `document.cookie` dan foydalansa, bunday cookie uchinchi tomon emas.

Agar script cookie o'rnatsa, script qayerdan kelganidan qat'i nazar -- cookie joriy veb-sahifa domeniga tegishli.
```

## Ilova: GDPR

Bu mavzu JavaScript bilan umuman bog'liq emas, faqat cookie'lar o'rnatishda yodda tutish kerak bo'lgan narsa.

Evropada foydalanuvchilar shaxsiyligini hurmat qilish uchun veb-saytlar qoididlari majmini majburlash uchun GDPR deb ataladigan qonun bor. Bu qoidalardan biri foydalanuvchidan kuzatuv cookie'lari uchun aniq ruxsatni talab qiladi.

Diqqat qiling, bu faqat kuzatuv/identifikatsiya/avtorizatsiya cookie'lari haqida.

Shunday qilib, agar biz faqat ba'zi ma'lumotlarni saqlaydigan, lekin foydalanuvchini kuzatmaydigan yoki identifikatsiya qilmaydigan cookie o'rnatsak, uni erkin qilishimiz mumkin.

Lekin agar biz autentifikatsiya sessiyasi yoki kuzatuv id'si bilan cookie o'rnatmoqchi bo'lsak, foydalanuvchi bunga ruxsat berishi kerak.

Veb-saytlarda odatda GDPR ga rioya qilishning ikkita varianti bor. Ikkalasini ham vebda allaqachon ko'rganingiz kerak:

1. Agar veb-sayt kuzatuv cookie'larini faqat autentifikatsiya qilingan foydalanuvchilar uchun o'rnatmoqchi bo'lsa.

    Buning uchun ro'yxatdan o'tish formasida "shaxsiy hayot siyosatini qabul qilaman" (cookie'lar qanday ishlatilishini tasvirlaydigan) kabi checkbox bo'lishi kerak, foydalanuvchi uni belgilashi kerak, keyin veb-sayt auth cookie'larini o'rnatishda erkin.

2. Agar veb-sayt hamma uchun kuzatuv cookie'larini o'rnatmoqchi bo'lsa.

    Buni qonuniy qilish uchun veb-sayt yangi kelganlar uchun modal "splash screen" ko'rsatadi va ulardan cookie'larga rozi bo'lishni talab qiladi. Keyin veb-sayt ularni o'rnatishi va odamlarga kontentni ko'rishga imkon berishi mumkin. Bu yangi tashrif buyuruvchilar uchun bezovta qiluvchi bo'lishi mumkin. Hech kim kontent o'rniga bunday "bosish kerak" modal splash screen'larni ko'rishni yoqtirmaydi. Lekin GDPR aniq kelishuvni talab qiladi.

GDPR faqat cookie'lar haqida emas, balki boshqa shaxsiy hayot bilan bog'liq masalalar haqida ham, lekin bu bizning doiramizdan juda tashqarida.

## Xulosa

`document.cookie` cookie'larga kirish imkonini beradi
- yozish operatsiyalari faqat unda eslatilgan cookie'larni o'zgartiradi.
- nom/qiymat kodlanishi kerak.
- bitta cookie 4KB dan oshmasligi kerak, har bir sayt uchun 20+ cookie (brauzerga bog'liq).

Cookie opsiyalari:
- `path=/`, sukut bo'yicha joriy yo'l, cookie'ni faqat o'sha yo'l ostida ko'rinishini ta'minlaydi.
- `domain=site.com`, sukut bo'yicha cookie faqat joriy domenda ko'rinadi. Agar domen aniq o'rnatilgan bo'lsa, cookie subdomenlarda ko'rinadigan bo'ladi.
- `expires` yoki `max-age` cookie amal qilish vaqtini o'rnatadi. Ularsiz cookie brauzer yopilganda o'ladi.
- `secure` cookie'ni faqat HTTPS ga aylantiradi.
- `samesite` brauzerni saytdan tashqaridan kelayotgan so'rovlar bilan cookie yuborishni taqiqlaydi. Bu XSRF hujumlarining oldini olishga yordam beradi.

Qo'shimcha:
- Uchinchi tomon cookie'lari brauzer tomonidan taqiqlanishi mumkin, masalan Safari buni sukut bo'yicha qiladi.
- Yevropa fuqarolari uchun kuzatuv cookie'sini o'rnatishda GDPR ruxsat so'rashni talab qiladi.