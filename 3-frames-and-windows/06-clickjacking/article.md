# Clickjacking hujumi

"Clickjacking" hujumi yomon sahifaga tashrif buyuruvchi nomidan "jabrlanuvchi sayt"da bosish imkonini beradi.

Ko'plab saytlar shu tariqa buzilgan, jumladan Twitter, Facebook, Paypal va boshqa saytlar. Albatta, ularning hammasi tuzatilgan.

## G'oya

G'oya juda oddiy.

Mana Facebook bilan clickjacking qanday amalga oshirilgan:

1. Tashrif buyuruvchi yomon sahifaga aldatiladi. Bu qanday bo'lishi muhim emas.
2. Sahifada zararsiz ko'rinadigan havola bor ("hozir boyib ket" yoki "bu yerda bos, juda kulgili" kabi).
3. O'sha havolaning ustiga yomon sahifa facebook.com dan `src` bilan shaffof `<iframe>` ni joylashtiradi, shunday qilib "Like" tugmasi o'sha havolaning to'g'ri ustida bo'ladi. Odatda bu `z-index` bilan amalga oshiriladi.
4. Havolani bosishga harakat qilganda, tashrif buyuruvchi aslida tugmani bosadi.

## Demo

Mana yomon sahifa qanday ko'rinadi. Narsalarni aniqlashtirish uchun `<iframe>` yarim shaffof (haqiqiy yomon sahifalarda u to'liq shaffof):

```html run height=120 no-beautify
<style>
iframe { /* jabrlanuvchi saytdan iframe */
  width: 400px;
  height: 100px;
  position: absolute;
  top:0; left:-20px;
*!*
  opacity: 0.5; /* haqiqatda opacity:0 */
*/!*
  z-index: 1;
}
</style>

<div>Hozir boyib ketish uchun bos:</div>

<!-- Jabrlanuvchi saytdan url -->
*!*
<iframe src="/clickjacking/facebook.html"></iframe>

<button>Bu yerda bos!</button>
*/!*

<div>...Va siz zo'rsiz (Men aslida zo'r hacker man)!</div>
```

Hujumning to'liq demosi:

[codetabs src="clickjacking-visible" height=160]

Bu yerda bizda yarim shaffof `<iframe src="facebook.html">` bor va misolda uni tugma ustida suzayotganini ko'rishimiz mumkin. Tugmani bosish aslida iframe ni bosadi, lekin bu foydalanuvchi uchun ko'rinmaydi, chunki iframe shaffof.

Natijada, agar tashrif buyuruvchi Facebook da avtorizatsiyalangan bo'lsa ("meni eslab qol" odatda yoqilgan), u holda "Like" qo'shadi. Twitter da bu "Follow" tugmasi bo'lardi.

Mana bir xil misol, lekin haqiqatga yaqinroq, `<iframe>` uchun `opacity:0` bilan:

[codetabs src="clickjacking" height=160]

Hujum qilish uchun bizga kerak bo'lgan narsa -- yomon sahifada `<iframe>` ni shunday joylashtirishki, tugma havolaning to'g'ri ustida bo'lsin. Shunda foydalanuvchi havolani bosganda, ular aslida tugmani bosadi. Bu odatda CSS bilan amalga oshirilishi mumkin.

```smart header="Clickjacking bosishlar uchun, klaviatura uchun emas"
Hujum faqat sichqoncha harakatlariga ta'sir qiladi (yoki mobilda tegish kabi shunga o'xshashlar).

Klaviatura kiritishini yo'naltirish ancha qiyin. Texnik jihatdan, agar buzish uchun matn maydonimiz bo'lsa, iframe ni shunday joylashtirishimiz mumkinki, matn maydonlari bir-birining ustiga tushsin. Shunda tashrif buyuruvchi sahifada ko'rgan kiritishga fokuslanishga harakat qilganda, ular aslida iframe ichidagi kiritishga fokuslanadi.

Lekin keyin muammo bor. Tashrif buyuruvchi yozgan hamma narsa yashirin bo'ladi, chunki iframe ko'rinmaydi.

Odamlar odatda ekranda yangi belgilarining chop etilayotganini ko'ra olmasalar, yozishni to'xtatadilar.
```

## Eski maktab mudofaasi (zaif)

Eng qadimiy mudofaa sahifani ramkada ochishni taqiqlovchi bir oz JavaScript (so'zma-so'z "framebusting" deb ataladi).

Bu shunday ko'rinadi:

```js
if (top != window) {
  top.location = window.location;
}
```

Ya'ni: agar oyna o'zining yuqorida emasligini bilsa, u avtomatik ravishda o'zini yuqoriga qo'yadi.

Bu ishonchli mudofaa emas, chunki uni buzishning ko'plab usullari mavjud. Bir nechtasini ko'rib chiqaylik.

### Top-navigation ni bloklash

Biz [beforeunload](info:onload-ondomcontentloaded#window.onbeforeunload) hodisa ishlov beruvchisida `top.location` ni o'zgartirish sabab bo'lgan o'tishni bloklay olamiz.

Yuqori sahifa (o'rab turuvchi, hackerga tegishli) unga oldini oluvchi ishlov beruvchi o'rnatadi:

```js
window.onbeforeunload = function() {
  return false;
};
```

`iframe` `top.location` ni o'zgartirishga harakat qilganda, tashrif buyuruvchi chiqishni xohlash-xohlamasligini so'raydigan xabar oladi.

Ko'p hollarda tashrif buyuruvchi salbiy javob beradi, chunki ular iframe haqida bilmaydi - ular faqat yuqori sahifani ko'rishadi, chiqish uchun hech qanday sabab yo'q. Shunday qilib `top.location` o'zgarmaydi!

Amalda:

[codetabs src="top-location"]

### Sandbox xossasi

`sandbox` xossasi tomonidan cheklanadigan narsalardan biri navigatsiyadir. Sandbox qilingan iframe `top.location` ni o'zgartira olmaydi.

Shunday qilib, biz iframe ni `sandbox="allow-scripts allow-forms"` bilan qo'shishimiz mumkin. Bu cheklovlarni yumshatadi, skriptlar va formalarga ruxsat beradi. Lekin biz `allow-top-navigation` ni qoldiramiz, shunda `top.location` ni o'zgartirish taqiqlanadi.

Mana kod:

```html
<iframe *!*sandbox="allow-scripts allow-forms"*/!* src="facebook.html"></iframe>
```

Bu oddiy himoyani chetlab o'tishning boshqa usullari ham bor.

## X-Frame-Options

Server tomonidagi `X-Frame-Options` sarlavhasi sahifani ramka ichida ko'rsatishga ruxsat berishi yoki taqiqlashi mumkin.

U aniq HTTP-sarlavha sifatida yuborilishi kerak: brauzer uni HTML `<meta>` tegida topsa e'tiborsiz qoldiradi. Shuning uchun `<meta http-equiv="X-Frame-Options"...>` hech narsa qilmaydi.

Sarlavha 3 ta qiymatga ega bo'lishi mumkin:

`DENY`
: Sahifani hech qachon ramka ichida ko'rsatmang.

`SAMEORIGIN`
: Agar ota hujjat bir xil kelib chiqishdan kelsa, ramka ichida ruxsat bering.

`ALLOW-FROM domain`
: Agar ota hujjat berilgan domendan bo'lsa, ramka ichida ruxsat bering.

Masalan, Twitter `X-Frame-Options: SAMEORIGIN` dan foydalanadi.

````online
Mana natija:

```html
<iframe src="https://twitter.com"></iframe>
```

<!-- ebook: prerender/ chrome headless dies and timeouts on this iframe -->
<iframe src="https://twitter.com"></iframe>

Brauzeringizga qarab, yuqoridagi `iframe` yo bo'sh yoki brauzer o'sha sahifani bu tarzda navigatsiya qilishga ruxsat bermasligini bildiradigan ogohlantirish.
````

## O'chirilgan funksionallik bilan ko'rsatish

`X-Frame-Options` sarlavhasining yon ta'siri bor. Boshqa saytlar bizning sahifamizni ramkada ko'rsata olmaydi, hatto ularda buning uchun yaxshi sabablari bo'lsa ham.

Shuning uchun boshqa yechimlar mavjud... Masalan, biz sahifani `height: 100%; width: 100%;` stillari bilan `<div>` bilan "qoplashimiz" mumkin, shunda u barcha bosishlarni to'sadi. Agar `window == top` bo'lsa yoki himoya kerak emasligini aniqlasak, o'sha `<div>` olib tashlanishi kerak.

Mana shunday:

```html
<style>
  #protector {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99999999;
  }
</style>

<div id="protector">
  <a href="/" target="_blank">Saytga o'ting</a>
</div>

<script>
  // yuqori oyna boshqa kelib chiqishdan bo'lsa xato bo'ladi
  // lekin bu yerda bu yaxshi
  if (top.document.domain == document.domain) {
    protector.remove();
  }
</script>
```

Demo:

[codetabs src="protector"]

## Samesite cookie xossasi

`samesite` cookie xossasi ham clickjacking hujumlarini oldini olishi mumkin.

Bunday xossaga ega cookie faqat veb-saytga to'g'ridan-to'g'ri ochilganda yuboriladi, ramka orqali yoki boshqacha yo'l bilan emas. <info:cookie#samesite> bobida ko'proq ma'lumot.

Agar Facebook kabi sayt o'zining autentifikatsiya cookie sida `samesite` xossasiga ega bo'lsa, masalan:

```
Set-Cookie: authorization=secret; samesite
```

...U holda bunday cookie Facebook boshqa saytdan iframe da ochilganda yuborilmaydi. Shunday qilib hujum muvaffaqiyatsiz bo'ladi.

`samesite` cookie xossasi cookie lar ishlatilmaganda ta'sir qilmaydi. Bu boshqa veb-saytlarga bizning ochiq, autentifikatsiyalanmagan sahifalarimizni iframe larda osongina ko'rsatish imkonini berishi mumkin.

Biroq, bu clickjacking hujumlarining bir necha cheklangan hollarda ishlashiga ham imkon berishi mumkin. Masalan, IP manzillarni tekshirish orqali takroriy ovoz berishning oldini oladigan anonim so'rov veb-sayti hali ham clickjacking uchun zaif bo'ladi, chunki u cookie lar yordamida foydalanuvchilarni autentifikatsiya qilmaydi.

## Xulosa

Clickjacking foydalanuvchilarni nima sodir bo'layotganini bilmasdan ham jabrlanuvchi saytni bosishga "aldash" usulidir. Muhim bosish bilan faollashadigan harakatlar bo'lsa, bu xavfli.

Hacker o'zining yomon sahifasiga havolani xabarda joylashtirishishi yoki tashrif buyuruvchilarni boshqa usullar bilan o'z sahifasiga jalb qilishi mumkin. Ko'plab variantlar mavjud.

Bir tomondan -- hujum "chuqur emas": hacker faqat bitta bosishni to'sib oladi. Lekin boshqa tomondan, agar hacker bosishdan keyin boshqa boshqaruv paydo bo'lishini bilsa, u holda ular foydalanuvchini ularni ham bosishga majburlash uchun ayyor xabarlardan foydalanishi mumkin.

Hujum juda xavfli, chunki UI ni loyihalashtirishda biz odatda hackerning tashrif buyuruvchi nomidan bosishini kutmaymiz. Shuning uchun zaifliklar butunlay kutilmagan joylarda topilishi mumkin.

- Ramka ichida ko'rishga mo'ljallanmagan sahifalarda (yoki butun veb-saytlarda) `X-Frame-Options: SAMEORIGIN` dan foydalanish tavsiya etiladi.
- Agar sahifalarimizni iframe larda ko'rsatishga ruxsat berishni xohlasak, lekin xavfsiz bo'lishni istasak, qoplaydi `<div>` dan foydalaning.