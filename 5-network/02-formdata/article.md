# FormData

Bu bob HTML formalarni yuborish haqida: fayllar bilan yoki faylsiz, qo'shimcha maydonlar bilan va hokazo.

[FormData](https://xhr.spec.whatwg.org/#interface-formdata) obyektlari bunda yordam berishi mumkin. Taxmin qilganingiz kabi, bu HTML form ma'lumotlarini ifodalash uchun obyekt.

Konstruktor:
```js
let formData = new FormData([form]);
```

Agar HTML `form` elementi berilsa, u avtomatik ravishda uning maydonlarini oladi.

`FormData` ning o'ziga xos tomoni shundaki, `fetch` kabi tarmoq usullari `FormData` obyektini body sifatida qabul qilishi mumkin. U kodlanadi va `Content-Type: multipart/form-data` bilan yuboriladi.

Server nuqtai nazaridan, bu odatiy form yuborish kabi ko'rinadi.

## Oddiy formani yuborish

Avval oddiy formani yuboraylik.

Ko'rib turganingizdek, bu deyarli bir qator:

```html run autorun
<form id="formElem">
  <input type="text" name="name" value="John">
  <input type="text" name="surname" value="Smith">
  <input type="submit">
</form>

<script>
  formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/article/formdata/post/user', {
      method: 'POST',
*!*
      body: new FormData(formElem)
*/!*
    });

    let result = await response.json();

    alert(result.message);
  };
</script>
```

Ushbu misolda server kodi ko'rsatilmagan, chunki u bizning doiramizdan tashqarida. Server POST so'rovni qabul qiladi va "Foydalanuvchi saqlandi" deb javob beradi.

## FormData Metodlari

`FormData` da maydonlarni metodlar bilan o'zgartirishimiz mumkin:

- `formData.append(name, value)` - berilgan `name` va `value` bilan form maydoni qo'shish,
- `formData.append(name, blob, fileName)` - maydonni `<input type="file">` kabi qo'shish, uchinchi argument `fileName` fayl nomini o'rnatadi (form maydon nomi emas), xuddi foydalanuvchi fayl tizimidagi faylning nomi kabi,
- `formData.delete(name)` - berilgan `name` li maydonni o'chirish,
- `formData.get(name)` - berilgan `name` li maydonning qiymatini olish,
- `formData.has(name)` - agar berilgan `name` li maydon mavjud bo'lsa `true`, aks holda `false` qaytaradi

Texnik jihatdan form bir xil `name` li ko'plab maydonga ega bo'lishi mumkin, shuning uchun `append` ga bir necha marta chaqirish bir xil nomli ko'proq maydonlar qo'shadi.

`append` bilan bir xil sintaksisga ega `set` metodi ham bor. Farqi shundaki, `.set` berilgan `name` li barcha maydonlarni o'chiradi, so'ngra yangi maydon qo'shadi. Shunday qilib, u bunday `name` li faqat bitta maydon mavjudligiga ishonch hosil qiladi, qolganlari `append` kabi:

- `formData.set(name, value)`,
- `formData.set(name, blob, fileName)`.

Shuningdek, `for..of` sikli yordamida formData maydonlari bo'ylab takrorlashimiz mumkin:

```js run
let formData = new FormData();
formData.append('key1', 'value1');
formData.append('key2', 'value2');

// Kalit/qiymat juftliklarini ro'yxatlash
for(let [name, value] of formData) {
  alert(`${name} = ${value}`); // key1 = value1, keyin key2 = value2
}
```

## Fayl bilan formani yuborish

Form har doim `Content-Type: multipart/form-data` sifatida yuboriladi, bu kodlash fayllarni yuborish imkonini beradi. Shunday qilib, `<input type="file">` maydonlari ham odatiy form yuborish kabi yuboriladi.

Bunday form bilan misol:

```html run autorun
<form id="formElem">
  <input type="text" name="firstName" value="John">
  Rasm: <input type="file" name="picture" accept="image/*">
  <input type="submit">
</form>

<script>
  formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/article/formdata/post/user-avatar', {
      method: 'POST',
*!*
      body: new FormData(formElem)
*/!*
    });

    let result = await response.json();

    alert(result.message);
  };
</script>
```

## Blob ma'lumotlar bilan formani yuborish

<info:fetch> bobida ko'rganimizdek, masalan, tasvir kabi dinamik yaratilgan ikkilik ma'lumotlarni `Blob` sifatida yuborish oson. Uni to'g'ridan-to'g'ri `fetch` parametri `body` sifatida berish mumkin.

Amalda esa, tasvirni alohida emas, balki "name" va boshqa metadata kabi qo'shimcha maydonlar bilan formaning bir qismi sifatida yuborish ko'pincha qulay.

Bundan tashqari, serverlar odatda xom ikkilik ma'lumotlardan ko'ra multipart-kodlangan formalarni qabul qilish uchun ko'proq mos keladi.

Ushbu misol `<canvas>` dan tasvirni boshqa maydonlar bilan birga `FormData` yordamida form sifatida yuboradi:

```html run autorun height="90"
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Yuborish" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let imageBlob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));

*!*
      let formData = new FormData();
      formData.append("firstName", "John");
      formData.append("image", imageBlob, "image.png");
*/!*    

      let response = await fetch('/article/formdata/post/image-form', {
        method: 'POST',
        body: formData
      });
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

Tasvir `Blob` qanday qo'shilganiga e'tibor bering:

```js
formData.append("image", imageBlob, "image.png");
```

Bu formada `<input type="file" name="image">` mavjud bo'lgani kabi va tashrif buyuruvchi o'z fayl tizimidan `imageBlob` ma'lumotlari (2-chi argument) bilan `"image.png"` nomli faylni (3-chi argument) yuborgan kabi.

Server form ma'lumotlari va faylini odatiy form yuborish kabi o'qiydi.

## Xulosa

[FormData](https://xhr.spec.whatwg.org/#interface-formdata) obyektlari HTML formani olish va uni `fetch` yoki boshqa tarmoq usuli bilan yuborish uchun ishlatiladi.

Biz HTML formidan `new FormData(form)` yaratishimiz mumkin yoki umuman formasiz obyekt yaratib, keyin metodlar bilan maydonlar qo'shishimiz mumkin:

- `formData.append(name, value)`
- `formData.append(name, blob, fileName)`
- `formData.set(name, value)`
- `formData.set(name, blob, fileName)`

Bu yerda ikkita xususiyatni qayd etamiz:

1. `set` metodi bir xil nomli maydonlarni o'chiradi, `append` o'chirmaydi. Ular orasidagi yagona farq shu.
2. Faylni yuborish uchun 3 argumentli sintaksis kerak, oxirgi argument fayl nomi bo'lib, u odatda `<input type="file">` uchun foydalanuvchi fayl tizimidan olinadi.

Boshqa metodlar:

- `formData.delete(name)`
- `formData.get(name)`
- `formData.has(name)`

Hammasi shu!