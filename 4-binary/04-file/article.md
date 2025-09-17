# File va FileReader

[File](https://www.w3.org/TR/FileAPI/#dfn-file) obyekti `Blob` dan meros bo'lib oladi va fayl tizimi bilan bog'liq imkoniyatlar bilan kengaytiriladi.

Uni olishning ikki usuli bor.

Birinchisi, `Blob` ga o'xshash konstruktor:

```js
new File(fileParts, fileName, [options])
```

- **`fileParts`** -- Blob/BufferSource/String qiymatlarining arrayi.
- **`fileName`** -- fayl nomi stringi.
- **`options`** -- ixtiyoriy obyekt:
    - **`lastModified`** -- oxirgi o'zgartirishning vaqt belgisi (butun son sana).

Ikkinchisi, ko'pincha biz faylni `<input type="file">` yoki drag'n'drop yoki boshqa brauzer interfeyslaridan olamiz. Bu holda fayl bu ma'lumotni OS dan oladi.

`File` `Blob` dan meros bo'lib olgani uchun `File` obyektlari bir xil xossalarga ega, qo'shimcha:
- `name` -- fayl nomi,
- `lastModified` -- oxirgi o'zgartirishning vaqt belgisi.

Mana `<input type="file">` dan `File` obyektini qanday olishimiz mumkin:

```html run
<input type="file" onchange="showFile(this)">

<script>
function showFile(input) {
  let file = input.files[0];

  alert(`Fayl nomi: ${file.name}`); // masalan my.png
  alert(`Oxirgi o'zgargan: ${file.lastModified}`); // masalan 1552830408824
}
</script>
```

```smart
Input bir nechta fayllarni tanlashi mumkin, shuning uchun `input.files` ular bilan array-ga o'xshash obyekt. Bu yerda bizda faqat bitta fayl bor, shuning uchun biz shunchaki `input.files[0]` ni olamiz.
```

## FileReader

[FileReader](https://www.w3.org/TR/FileAPI/#dfn-filereader) `Blob` (va shuning uchun `File` ham) obyektlardan ma'lumotlarni o'qishning yagona maqsadi bo'lgan obyekt.

U hodisalar orqali ma'lumotlarni etkazadi, chunki diskdan o'qish vaqt talab qilishi mumkin.

Konstruktor:

```js
let reader = new FileReader(); // argumentsiz
```

Asosiy usullar:

- **`readAsArrayBuffer(blob)`** -- ma'lumotlarni binary format `ArrayBuffer` da o'qish.
- **`readAsText(blob, [encoding])`** -- ma'lumotlarni berilgan kodlash bilan matn stringi sifatida o'qish (standart bo'yicha `utf-8`).
- **`readAsDataURL(blob)`** -- binary ma'lumotlarni o'qish va uni base64 data url sifatida kodlash.
- **`abort()`** -- operatsiyani bekor qilish.

`read*` usulini tanlash biz qanday formatni afzal ko'rishimiz, ma'lumotlarni qanday ishlatishimizga bog'liq.

- `readAsArrayBuffer` -- binary fayllar uchun, past darajadagi binary operatsiyalarni bajarish uchun. Yuqori darajadagi operatsiyalar uchun, masalan slicing, `File` `Blob` dan meros bo'lib oladi, shuning uchun biz ularni o'qimasdan to'g'ridan-to'g'ri chaqirishimiz mumkin.
- `readAsText` -- matn fayllari uchun, string olishni xohlaganimizda.
- `readAsDataURL` -- bu ma'lumotlarni `img` yoki boshqa teg uchun `src` da ishlatishni xohlaganimizda. Buning uchun faylni o'qishning muqobil usuli bor, <info:blob> bobida muhokama qilinganidek: `URL.createObjectURL(file)`.

O'qish davom etayotgan vaqtda hodisalar bo'ladi:
- `loadstart` -- yuklash boshlandi.
- `progress` -- o'qish davomida sodir bo'ladi.
- `load` -- xato yo'q, o'qish tugadi.
- `abort` -- `abort()` chaqirildi.
- `error` -- xato yuz berdi.
- `loadend` -- o'qish muvaffaqiyat yoki muvaffaqiyatsizlik bilan tugadi.

O'qish tugaganda natijaga kirish mumkin:
- `reader.result` natija (agar muvaffaqiyatli bo'lsa)
- `reader.error` xato (agar muvaffaqiyatsiz bo'lsa).

Eng keng ishlatiladigan hodisalar, albatta, `load` va `error`.

Mana faylni o'qish misoli:

```html run
<input type="file" onchange="readFile(this)">

<script>
function readFile(input) {
  let file = input.files[0];

  let reader = new FileReader();

  reader.readAsText(file);

  reader.onload = function() {
    console.log(reader.result);
  };

  reader.onerror = function() {
    console.log(reader.error);
  };

}
</script>
```

```smart header="Blob lar uchun `FileReader`"
<info:blob> bobida eslatib o'tilganidek, `FileReader` faqat fayllarni emas, har qanday blob larni ham o'qiy oladi.

Biz uni blob ni boshqa formatga aylantirish uchun ishlatishimiz mumkin:
- `readAsArrayBuffer(blob)` -- `ArrayBuffer` ga,
- `readAsText(blob, [encoding])` -- stringga (`TextDecoder` ga alternativa),
- `readAsDataURL(blob)` -- base64 data url ga.
```

```smart header="`FileReaderSync` Web Workers ichida mavjud"
Web Workers uchun `FileReader` ning sinxron varianti ham mavjud, [FileReaderSync](https://www.w3.org/TR/FileAPI/#FileReaderSync) deb ataladi.

Uning `read*` o'qish usullari hodisalarni yaratmaydi, balki oddiy funksiyalar kabi natijani qaytaradi.

Bu faqat Web Worker ichida, chunki fayllardan o'qishda mumkin bo'lgan sinxron chaqiruvlardagi kechikishlar Web Workers da kamroq muhim. Ular sahifaga ta'sir qilmaydi.
```

## Xulosa

`File` obyektlari `Blob` dan meros oladi.

`Blob` usullari va xossalariga qo'shimcha, `File` obyektlari ham `name` va `lastModified` xossalariga ega, shuningdek fayl tizimidan o'qishning ichki imkoniyati. Biz odatda `File` obyektlarini `<input>` yoki Drag'n'Drop hodisalari (`ondragend`) kabi foydalanuvchi kiritishidan olamiz.

`FileReader` obyektlari fayl yoki blob dan uchta formatdan birida o'qiy oladi:
- String (`readAsText`).
- `ArrayBuffer` (`readAsArrayBuffer`).
- Data url, base-64 kodlangan (`readAsDataURL`).

Ko'p hollarda, biz fayl kontentini o'qishimiz shart emas. Blob lar bilan qilganingiz kabi, biz `URL.createObjectURL(file)` bilan qisqa url yaratishimiz va uni `<a>` yoki `<img>` ga tayinlashimiz mumkin. Shunday qilib, fayl yuklab olinishi yoki rasm sifatida, canvas ning bir qismi sifatida ko'rsatilishi mumkin.

Va agar biz `File` ni tarmoq orqali yubormoqchi bo'lsak, bu ham oson: `XMLHttpRequest` yoki `fetch` kabi tarmoq API si `File` obyektlarini tabiiy ravishda qabul qiladi.