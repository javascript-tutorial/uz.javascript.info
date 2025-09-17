# Blob

`ArrayBuffer` va view lar ECMA standartining bir qismi, JavaScript ning bir qismi.

Brauzerde [File API](https://www.w3.org/TR/FileAPI/) da tasvirlangan qo'shimcha yuqori darajadagi obyektlar mavjud, xususan `Blob`.

`Blob` ixtiyoriy string `type` (odatda MIME-type) va `blobParts` dan iborat -- boshqa `Blob` obyektlari, stringlar va `BufferSource` ketma-ketligi.

![](blob.svg)

Konstruktor sintaksisi:

```js
new Blob(blobParts, options);
```

- **`blobParts`** `Blob`/`BufferSource`/`String` qiymatlarining arrayi.
- **`options`** ixtiyoriy obyekt:
  - **`type`** -- `Blob` turi, odatda MIME-type, masalan `image/png`,
  - **`endings`** -- `Blob` ni joriy OS yangitolri (`\r\n` yoki `\n`) ga mos kelishi uchun qator oxirini o'zgartirish kerakmi. Standart bo'yicha `"transparent"` (hech narsa qilmaydi), lekin `"native"` (o'zgartirish) ham bo'lishi mumkin.

Masalan:

```js
// string dan Blob yaratish
let blob = new Blob(["<html>…</html>"], {type: 'text/html'});
// esda tuting: birinchi argument array bo'lishi kerak [...]
```

```js
// typed array va stringlardan Blob yaratish
let hello = new Uint8Array([72, 101, 108, 108, 111]); // "Hello" binary shaklda

let blob = new Blob([hello, ' ', 'world'], {type: 'text/plain'});
```

Biz `Blob` bo'laklarini quyidagi bilan chiqarishimiz mumkin:

```js
blob.slice([byteStart], [byteEnd], [contentType]);
```

- **`byteStart`** -- boshlanish bayti, standart bo'yicha 0.
- **`byteEnd`** -- oxirgi bayt (eksklyuziv, standart bo'yicha oxirigacha).
- **`contentType`** -- yangi blob ning `type` i, standart bo'yicha manba bilan bir xil.

Argumentlar `array.slice` ga o'xshash, manfiy sonlarga ham ruxsat berilgan.

```smart header="`Blob` obyektlar o'zgarmas"
Biz `Blob` da ma'lumotlarni to'g'ridan-to'g'ri o'zgartira olmaymiz, lekin `Blob` ning qismlarini kesib olishimiz, ulardan yangi `Blob` obyektlarini yaratishimiz, ularni yangi `Blob` ga aralashtirishimiz va hokazolarni qilishimiz mumkin.

Bu xatti-harakat JavaScript stringlariga o'xshash: biz stringdagi belgini o'zgartira olmaymiz, lekin yangi tuzatilgan string yasashimiz mumkin.
```

## URL sifatida Blob

Blob uning kontentini ko'rsatish uchun `<a>`, `<img>` yoki boshqa teglar uchun URL sifatida osongina ishlatilishi mumkin.

`type` tufayli biz `Blob` obyektlarini yuklab olish/yuklash ham mumkin va `type` tabiiy ravishda tarmoq so'rovlarida `Content-Type` ga aylanadi.

Keling, oddiy misol bilan boshlaylik. Havola bosganda siz dinamik yaratilgan `Blob` ni `hello world` kontenti bilan fayl sifatida yuklab olasiz:

```html run
<!-- download xossasi brauzerga navigatsiya qilish o'rniga yuklab olishga majburlaydi -->
<a download="hello.txt" href='#' id="link">Yuklab olish</a>

<script>
let blob = new Blob(["Salom, dunyo!"], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);
</script>
```

Shuningdek, biz JavaScript da dinamik ravishda havola yaratishimiz va `link.click()` orqali bosishni simulyatsiya qilishimiz mumkin, keyin yuklab olish avtomatik boshlandi.

Mana hech qanday HTML siz dinamik yaratilgan `Blob` ni foydalanuvchiga yuklab olishiga sabab bo'ladigan shunga o'xshash kod:

```js run
let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Salom, dunyo!'], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);

link.click();

URL.revokeObjectURL(link.href);
```

`URL.createObjectURL` `Blob` ni oladi va uning uchun `blob:<origin>/<uuid>` shaklida noyob URL yaratadi.

`link.href` ning qiymati shunday ko'rinadi:

```
blob:https://javascript.info/1e67e00e-860d-40a5-89ae-6ab0cbee6273
```

`URL.createObjectURL` tomonidan yaratilgan har bir URL uchun brauzer ichki ravishda URL -> `Blob` mapping ni saqlaydi. Shunday qilib, bunday URL lar qisqa, lekin `Blob` ga kirish imkonini beradi.

Yaratilgan URL (va shuning uchun u bilan havola) faqat joriy hujjat ichida, u ochiq bo'lgan vaqtda amal qiladi. Va u `<img>`, `<a>`, asosan URL kutadigan boshqa har qanday obyektda `Blob` ga murojaat qilish imkonini beradi.

Biroq, yon ta'sir bor. `Blob` uchun mapping mavjud bo'lsa-yu, `Blob` ning o'zi xotirada joylashgan. Brauzer uni bo'shatish mumkin emas.

Hujjat yuklanishida mapping avtomatik ravishda tozalanadi, shuning uchun `Blob` obyektlar o'shanda bo'shatiladi. Lekin agar ilova uzoq umr ko'rsa, bu tez sodir bo'lmaydi.

**Shunday qilib, agar biz URL yaratadigan bo'lsak, o'sha `Blob` endi kerak bo'lmasa ham xotirada osiladi.**

`URL.revokeObjectURL(url)` ichki mapping dan havolani olib tashlaydi, shu tariqa `Blob` ni o'chirish imkonini beradi (agar boshqa havolalar bo'lmasa) va xotirani bo'shatish.

Oxirgi misolda biz `Blob` ning faqat bir marta, darhol yuklab olish uchun ishlatilishini maqsad qilganimiz uchun darhol `URL.revokeObjectURL(link.href)` ni chaqiramiz.

Bosiladigan HTML-havolali oldingi misolda biz `URL.revokeObjectURL(link.href)` ni chaqirmaymiz, chunki bu `Blob` url ni yaroqsiz qiladi. Bekor qilingandan keyin, mapping olib tashlanganidan so'ng, URL endi ishlamaydi.

## Blob dan base64 ga

`URL.createObjectURL` ga alternativa `Blob` ni base64-kodlangan stringga aylantirish.

Bu kodlash binary ma'lumotlarni 0 dan 64 gacha ASCII-kodlari bilan o'ta xavfsiz "o'qilishi mumkin" belgilar stringi sifatida ifodalaydi. Va eng muhimi -- biz bu kodlashni "data-url"larda ishlatishimiz mumkin.

[Data url](mdn:/http/Data_URIs) `data:[<mediatype>][;base64],<data>` shaklida. Biz bunday url larni hamma joyda "oddiy" url lar bilan bir qatorda ishlatishimiz mumkin.

Masalan, mana smayl:

```html
<img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">
```

Brauzer stringni decode qiladi va rasmni ko'rsatadi: <img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">

`Blob` ni base64 ga aylantirish uchun biz o'rnatilgan `FileReader` obyektidan foydalanamiz. U Blob lardan ko'plab formatlarda ma'lumotlarni o'qiy oladi. [Keyingi bobda](info:file) biz uni chuqurroq ko'rib chiqamiz.

Mana blob yuklab olishning demosi, endi base-64 orqali:

```js run
let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Salom, dunyo!'], {type: 'text/plain'});

*!*
let reader = new FileReader();
reader.readAsDataURL(blob); // blob ni base64 ga aylantiradi va onload ni chaqiradi
*/!*

reader.onload = function() {
  link.href = reader.result; // data url
  link.click();
};
```

`Blob` dan URL yasashning ikkala usuli ham foydalanish mumkin. Lekin odatda `URL.createObjectURL(blob)` sodda va tezroq.

```compare title-plus="URL.createObjectURL(blob)" title-minus="Blob dan data url ga"
+ Xotira haqida qayg'ursak, ularni bekor qilishimiz kerak.
+ Blob ga to'g'ridan-to'g'ri kirish, "kodlash/dekodlash" yo'q
- Hech narsani bekor qilish kerak emas.
- Kodlash uchun katta `Blob` obyektlarda ishlash va xotira yo'qotishlari.
```

## Rasm dan blob ga

Biz rasmning `Blob` ini, rasm qismini yaratishimiz yoki hatto sahifa skrinshoti olishimiz mumkin. Buni biror joyga yuklash uchun qulay.

Rasm operatsiyalari `<canvas>` elementi orqali amalga oshiriladi:

1. [canvas.drawImage](mdn:/api/CanvasRenderingContext2D/drawImage) yordamida canvasda rasm (yoki uning qismi) chizing.
2. Canvas usuli [.toBlob(callback, format, quality)](mdn:/api/HTMLCanvasElement/toBlob) ni chaqiring, bu `Blob` yaratadi va tugaganda `callback` ni u bilan ishga tushiradi.

Quyidagi misolda rasm shunchaki nusxalanadi, lekin biz undan kesishimiz yoki blob yasashdan oldin canvasda uni o'zgartirishimiz mumkin:

```js run
// har qanday rasmni oling
let img = document.querySelector('img');

// bir xil o'lchamdagi <canvas> yasang
let canvas = document.createElement('canvas');
canvas.width = img.clientWidth;
canvas.height = img.clientHeight;

let context = canvas.getContext('2d');

// rasmni unga nusxalang (bu usul rasmni kesish imkonini beradi)
context.drawImage(img, 0, 0);
// biz context.rotate() va canvasda ko'plab boshqa narsalarni qilishimiz mumkin

// toBlob async operatsiya, callback tugaganda chaqiriladi
canvas.toBlob(function(blob) {
  // blob tayyor, uni yuklab oling
  let link = document.createElement('a');
  link.download = 'example.png';

  link.href = URL.createObjectURL(blob);
  link.click();

  // brauzer xotiradan tozalash uchun ichki blob havolasini o'chiring
  URL.revokeObjectURL(link.href);
}, 'image/png');
```

Agar biz callback o'rniga `async/await` ni afzal korsak:
```js
let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
```

Sahifani skrinshot qilish uchun biz <https://github.com/niklasvh/html2canvas> kabi kutubxonadan foydalanishimiz mumkin. U shunchaki sahifani aylanib o'tadi va uni `<canvas>` da chizadi. Keyin biz yuqoridagi kabi uning `Blob` ini olishimiz mumkin.

## Blob dan ArrayBuffer ga

`Blob` konstruktori har qanday `BufferSource` dan boshlab deyarli har qanday narsadan blob yaratish imkonini beradi.

Lekin agar bizga past darajadagi qayta ishlash kerak bo'lsa, `blob.arrayBuffer()` dan eng past darajadagi `ArrayBuffer` ni olishimiz mumkin:

```js
// blob dan arrayBuffer olish
const bufferPromise = await blob.arrayBuffer();

// yoki
blob.arrayBuffer().then(buffer => /* ArrayBuffer ni qayta ishlang */);
```

## Blob dan stream ga

`2 GB` dan ortiq blob ga o'qish va yozishda `arrayBuffer` dan foydalanish biz uchun ko'proq xotira talab qiladi. Bu vaqtda biz blob ni to'g'ridan-to'g'ri stream ga aylantira olamiz.

Stream undan qism-qism o'qish (yoki unga yozish) imkonini beradigan maxsus obyekt. Bu bizning doiramizdan tashqarida, lekin mana misol va siz <https://developer.mozilla.org/en-US/docs/Web/API/Streams_API> da ko'proq o'qishingiz mumkin. Stream lar qism-qism qayta ishlashga mos ma'lumotlar uchun qulay.

`Blob` interfeysining `stream()` usuli o'qilganda `Blob` ichidagi ma'lumotlarni qaytaradigan `ReadableStream` ni qaytaradi.

Keyin biz undan shunday o'qiy olamiz:

```js
// blob dan readableStream olish
const readableStream = blob.stream();
const stream = readableStream.getReader();

while (true) {
  // har bir takrorlash uchun: value keyingi blob fragmenti
  let { done, value } = await stream.read();
  if (done) {
    // stream da boshqa ma'lumot yo'q
    console.log('barcha blob qayta ishlandi.');
    break;
  }

   // blob dan hozirgina o'qigan ma'lumot qismi bilan biror narsa qiling
  console.log(value);
}
```

## Xulosa

`ArrayBuffer`, `Uint8Array` va boshqa `BufferSource` "binary ma'lumot" bo'lsa, [Blob](https://www.w3.org/TR/FileAPI/#dfn-Blob) "turi bilan binary ma'lumot" ni ifodalaydi.

Bu Blob larni brauzerde juda keng tarqalgan yuklash/yuklab olish operatsiyalari uchun qulay qiladi.

[XMLHttpRequest](info:xmlhttrequest), [fetch](info:fetch) va hokazo kabi veb-so'rovlarni bajaradigan usullar `Blob` bilan boshqa binary turlar bilan birga tabiiy ravishda ishlashi mumkin.

Biz `Blob` va past darajadagi binary ma'lumot turlari orasida osongina aylantira olamiz:

- `new Blob(...)` konstruktori yordamida typed array dan `Blob` yasashimiz mumkin.
- `blob.arrayBuffer()` yordamida Blob dan `ArrayBuffer` ni qaytarib olishimiz va keyin past darajadagi binary qayta ishlash uchun uning ustida view yaratishimiz mumkin.

Katta blob ni boshqarish kerak bo'lganda konversiya stream lar juda foydali. Siz blob dan osongina `ReadableStream` yaratishingiz mumkin. `Blob` interfeysining `stream()` usuli o'qilganda blob ichidagi ma'lumotlarni qaytaradigan `ReadableStream` ni qaytaradi.