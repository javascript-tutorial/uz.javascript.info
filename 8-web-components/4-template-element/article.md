# Template elementi

O'rnatilgan `<template>` elementi HTML markup shablonlari uchun saqlash joyi vazifasini bajaradi. Brauzer uning mazmunini e'tiborsiz qoldiradi, faqat sintaksis to'g'riligini tekshiradi, lekin biz JavaScript-da unga kirishimiz va boshqa elementlar yaratish uchun ishlatishimiz mumkin.

Nazariy jihatdan, biz HTML markup saqlash maqsadlari uchun HTML da istalgan ko'rinmas elementni yaratishimiz mumkin edi. `<template>`ning nima maxsus tomoni bor?

Birinchidan, uning mazmuni har qanday to'g'ri HTML bo'lishi mumkin, hatto u odatda to'g'ri o'ralgan tegni talab qilsa ham.

Masalan, biz u yerga jadval qatori `<tr>`ni qo'yishimiz mumkin:
```html
<template>
  <tr>
    <td>Mazmun</td>
  </tr>
</template>
```

Odatda, agar biz `<tr>`ni, aytaylik, `<div>` ichiga qo'yishga harakat qilsak, brauzer noto'g'ri DOM tuzilmasini aniqlaydi va uni "tuzatadi", atrofiga `<table>` qo'shadi. Bu biz xohlagan narsa emas. Boshqa tomondan, `<template>` biz u yerga qo'ygan narsani aynan saqlaydi.

Biz `<template>` ichiga uslublar va skriptlarni ham qo'yishimiz mumkin:

```html
<template>
  <style>
    p { font-weight: bold; }
  </style>
  <script>
    alert("Salom");
  </script>
</template>
```

Brauzer `<template>` mazmunini "hujjatdan tashqarida" deb hisoblaydi: uslublar qo'llanilmaydi, skriptlar ishga tushmaydi, `<video autoplay>` ishlamaydi va hokazo.

Mazmun uni hujjatga kiritganimizda jonli bo'ladi (uslublar qo'llaniladi, skriptlar ishlaydi va hokazo).

## Template kiritish

Shablonning mazmuni uning `content` xususiyatida [DocumentFragment](info:modifying-document#document-fragment) sifatida mavjud -- DOM tugunining maxsus turi.

Biz uni har qanday boshqa DOM tuguni kabi ko'rib chiqishimiz mumkin, bitta maxsus xususiyatdan tashqari: uni biror joyga kiritganimizda, uning bolalari o'rniga kiritiladi.

Masalan:

```html run
<template id="tmpl">
  <script>
    alert("Salom");
  </script>
  <div class="message">Salom, dunyo!</div>
</template>

<script>
  let elem = document.createElement('div');

*!*
  // Shablonning mazmunini bir necha marta qayta ishlatish uchun klonlash
  elem.append(tmpl.content.cloneNode(true));
*/!*

  document.body.append(elem);
  // Endi <template>dan skript ishlaydi
</script>
```

Oldingi bobdan Shadow DOM misolini `<template>` yordamida qayta yozaylik:

```html run untrusted autorun="no-epub" height=60
<template id="tmpl">
  <style> p { font-weight: bold; } </style>
  <p id="message"></p>
</template>

<div id="elem">Meni bosing</div>

<script>
  elem.onclick = function() {
    elem.attachShadow({mode: 'open'});

*!*
    elem.shadowRoot.append(tmpl.content.cloneNode(true)); // (*)
*/!*

    elem.shadowRoot.getElementById('message').innerHTML = "Soyalardan salom!";
  };
</script>
```

`(*)` satrida biz `tmpl.content`ni klonlab va kiritganimizda, u `DocumentFragment` bo'lgani uchun, uning bolalari (`<style>`, `<p>`) o'rniga kiritiladi.

Ular soya DOM ni hosil qiladi:

```html
<div id="elem">
  #shadow-root
    <style> p { font-weight: bold; } </style>
    <p id="message"></p>
</div>
```

## Xulosa

Xulosa qilib aytganda:

- `<template>` mazmuni har qanday sintaktik jihatdan to'g'ri HTML bo'lishi mumkin.
- `<template>` mazmuni "hujjatdan tashqarida" hisoblanadi, shuning uchun u hech narsaga ta'sir qilmaydi.
- Biz JavaScript-dan `template.content`ga kirishimiz mumkin, uni yangi komponentda qayta ishlatish uchun klonlashimiz mumkin.

`<template>` tegi juda noyob, chunki:

- Brauzer uning ichidagi HTML sintaksisini tekshiradi (skript ichidagi shablon satridan foydalanishdan farqli o'laroq).
- ...Lekin baribir har qanday yuqori darajadagi HTML teglaridan foydalanishga imkon beradi, hatto to'g'ri o'rashsiz ma'noga ega bo'lmagan teglar ham (masalan, `<tr>`).
- Mazmun interaktiv bo'ladi: skriptlar ishlaydi, `<video autoplay>` ijro etiladi va hokazo, hujjatga kiritilganda.

`<template>` elementi hech qanday iteratsiya mexanizmlari, ma'lumotlarni bog'lash yoki o'zgaruvchilarni almashtirish xususiyatlariga ega emas, lekin biz ularni uning ustiga amalga oshirishimiz mumkin.