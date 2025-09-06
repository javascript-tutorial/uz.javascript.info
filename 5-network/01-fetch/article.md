# Fetch

JavaScript server bilan tarmoq so'rovlarini yuborishi va kerakli paytda yangi ma'lumotlarni yuklashi mumkin.

Masalan, biz tarmoq so'rovidan quyidagilar uchun foydalanishimiz mumkin:

- Buyurtma yuborish,
- Foydalanuvchi ma'lumotlarini yuklash,
- Serverdan eng so'nggi yangilanishlarni olish,
- ...va hokazo.

...Va bularning barchasini sahifani qayta yuklamasdan!

JavaScript'dan tarmoq so'rovlari uchun "AJAX" (<b>A</b>sinxron <b>J</b>avaScript <b>v</b>a <b>X</b>ML) atamasi mavjud. Garchi XML ishlatishimiz shart emas: bu atama eski davrlardan qolgan, shuning uchun bu so'z mavjud. Bu atamani eshitgan bo'lishingiz mumkin.

Tarmoq so'rovini yuborish va serverdan ma'lumot olishning bir nechta yo'li bor.

`fetch()` usuli zamonaviy va ko'p qirrali, shuning uchun undan boshlaymiz. Eski brauzerlar tomonidan qo'llab-quvvatlanmaydi (polyfill qilinishi mumkin), lekin zamonaviy brauzerlar orasida juda yaxshi qo'llab-quvvatlanadi.

Asosiy sintaksis:

```js
let promise = fetch(url, [options])
```

- **`url`** -- kirishga mo'ljallangan URL.
- **`options`** -- ixtiyoriy parametrlar: method, headers va boshqalar.

`options` bo'lmasa, bu oddiy GET so'rovi bo'lib, `url` ning mazmunini yuklab oladi.

Brauzer so'rovni darhol boshlaydi va chaqiruvchi kod natijani olish uchun ishlatishi kerak bo'lgan promise'ni qaytaradi.

Javob olish odatda ikki bosqichli jarayon.

**Birinchidan, server headers bilan javob berganda, `fetch` tomonidan qaytarilgan `promise` built-in [Response](https://fetch.spec.whatwg.org/#response-class) klassining obyekti bilan resolve qilinadi.**

Bu bosqichda biz HTTP statusni tekshirishimiz mumkin, u muvaffaqiyatli yoki yo'qligini ko'rish, headers'larni tekshirish mumkin, lekin hali body'miz yo'q.

Agar `fetch` HTTP-so'rovni bajarish imkoniyatiga ega bo'lmasa, masalan, tarmoq muammolari yoki bunday sayt mavjud bo'lmasa, promise rad etiladi. 404 yoki 500 kabi g'ayritabiiy HTTP-statuslar xatolikka sabab bo'lmaydi.

HTTP-statusni response xususiyatlarida ko'rishimiz mumkin:

- **`status`** -- HTTP status kodi, masalan 200.
- **`ok`** -- boolean, agar HTTP status kodi 200-299 bo'lsa `true`.

Masalan:

```js
let response = await fetch(url);

if (response.ok) { // agar HTTP-status 200-299 bo'lsa
  // response body'ni oling (usul quyida tushuntirilgan)
  let json = await response.json();
} else {
  alert("HTTP-Xato: " + response.status);
}
```

**Ikkinchidan, response body'ni olish uchun qo'shimcha method chaqiruvidan foydalanishimiz kerak.**

`Response` body'ga turli formatlarda kirish uchun bir nechta promise-asoslangan methodlarni taqdim etadi:

- **`response.text()`** -- javobni o'qish va matn sifatida qaytarish,
- **`response.json()`** -- javobni JSON sifatida parse qilish,
- **`response.formData()`** -- javobni `FormData` obyekti sifatida qaytarish ([keyingi bob](info:formdata)da tushuntirilgan),
- **`response.blob()`** -- javobni [Blob](info:blob) sifatida qaytarish (turi bilan ikkilik ma'lumot),
- **`response.arrayBuffer()`** -- javobni [ArrayBuffer](info:arraybuffer-binary-arrays) sifatida qaytarish (ikkilik ma'lumotlarning past darajadagi ko'rinishi),
- qo'shimcha ravishda, `response.body` - [ReadableStream](https://streams.spec.whatwg.org/#rs-class) obyekti, u body'ni chunk-by-chunk o'qish imkonini beradi, keyinroq misolni ko'ramiz.

Masalan, GitHub'dan eng so'nggi commitlar bilan JSON-obyektni olaylik:

```js run async
let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
let response = await fetch(url);

*!*
let commits = await response.json(); // response body'ni o'qish va JSON sifatida parse qilish
*/!*

alert(commits[0].author.login);
```

Yoki, `await` bo'lmagan holda, toza promises sintaksisi yordamida:

```js run
fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(response => response.json())
  .then(commits => alert(commits[0].author.login));
```

Response matnini olish uchun `.json()` o'rniga `await response.text()`:

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

let text = await response.text(); // response body'ni matn sifatida o'qish

alert(text.slice(0, 80) + '...');
```

Ikkilik formatda o'qishning namunasi sifatida, ["fetch" spetsifikatsiyasi](https://fetch.spec.whatwg.org)ning logotip rasmini yuklab olaylik va ko'rsataylik (`Blob` operatsiyalari haqida batafsil ma'lumot uchun [Blob](info:blob) bobiga qarang):

```js async run
let response = await fetch('/article/fetch/logo-fetch.svg');

*!*
let blob = await response.blob(); // Blob obyekti sifatida yuklash
*/!*

// buning uchun <img> yaratish
let img = document.createElement('img');
img.style = 'position:fixed;top:10px;left:10px;width:100px';
document.body.append(img);

// ko'rsatish
img.src = URL.createObjectURL(blob);

setTimeout(() => { // uch soniyadan keyin yashirish
  img.remove();
  URL.revokeObjectURL(img.src);
}, 3000);
```

````warn
Biz faqat bitta body-o'qish usulini tanlashimiz mumkin.

Agar biz allaqachon `response.text()` bilan javob olgan bo'lsak, `response.json()` ishlamaydi, chunki body mazmuni allaqachon qayta ishlangan.

```js
let text = await response.text(); // response body iste'mol qilindi
let parsed = await response.json(); // ishlamaydi (allaqachon iste'mol qilingan)
```
````

## Response headers

Response headers `response.headers` da Map-ga o'xshash headers obyektida mavjud.

Bu aynan Map emas, lekin nom bo'yicha alohida header'larni olish yoki ularni takrorlash uchun shunga o'xshash methodlarga ega:

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

// bitta header olish
alert(response.headers.get('Content-Type')); // application/json; charset=utf-8

// barcha header'lar bo'ylab takrorlash
for (let [key, value] of response.headers) {
  alert(`${key} = ${value}`);
}
```

## Request headers

`fetch` da request header'ini o'rnatish uchun `headers` opsiyasidan foydalanishimiz mumkin. Unda chiquvchi header'lar bilan obyekt bor, masalan:

```js
let response = fetch(protectedUrl, {
  headers: {
    Authentication: 'secret'
  }
});
```

...Lekin o'rnata olmaydigan [taqiqlangan HTTP header'lar](https://fetch.spec.whatwg.org/#forbidden-header-name) ro'yxati mavjud:

- `Accept-Charset`, `Accept-Encoding`
- `Access-Control-Request-Headers`
- `Access-Control-Request-Method`
- `Connection`
- `Content-Length`
- `Cookie`, `Cookie2`
- `Date`
- `DNT`
- `Expect`
- `Host`
- `Keep-Alive`
- `Origin`
- `Referer`
- `TE`
- `Trailer`
- `Transfer-Encoding`
- `Upgrade`
- `Via`
- `Proxy-*`
- `Sec-*`

Bu header'lar to'g'ri va xavfsiz HTTP'ni ta'minlaydi, shuning uchun ular faqat brauzer tomonidan nazorat qilinadi.

## POST so'rovlar

`POST` so'rovini yoki boshqa method bilan so'rov yaratish uchun `fetch` opsiyalaridan foydalanishimiz kerak:

- **`method`** -- HTTP-method, masalan `POST`,
- **`body`** -- so'rov tanasi, quyidagilardan biri:
  - string (masalan JSON-kodlangan),
  - `FormData` obyekti, ma'lumotlarni `form/multipart` sifatida yuborish uchun,
  - ikkilik ma'lumotlarni yuborish uchun `Blob`/`BufferSource`,
  - ma'lumotlarni `x-www-form-urlencoded` kodlashda yuborish uchun [URLSearchParams](info:url), kamdan-kam ishlatiladi.

JSON format ko'pincha ishlatiladi.

Masalan, bu kod `user` obyektini JSON sifatida yuboradi:

```js run async
let user = {
  name: 'John',
  surname: 'Smith'
};

*!*
let response = await fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)
});
*/!*

let result = await response.json();
alert(result.message);
```

Diqqat qiling, agar so'rov `body` string bo'lsa, `Content-Type` header sukut bo'yicha `text/plain;charset=UTF-8` ga o'rnatiladi.

Lekin, biz JSON yuborayotganimiz uchun, JSON-kodlangan ma'lumotlar uchun to'g'ri `Content-Type` bo'lgan `application/json` ni yuborish uchun `headers` opsiyasidan foydalanamiz.

## Rasm yuborish

Shuningdek, `Blob` yoki `BufferSource` obyektlari yordamida `fetch` bilan ikkilik ma'lumotlarni yuborishimiz mumkin.

Ushbu misolda, ustida sichqonchani harakatlantirib chizish mumkin bo'lgan `<canvas>` mavjud. "Submit" tugmasini bosish rasmni serverga yuboradi:

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
      let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
      let response = await fetch('/article/fetch/post/image', {
        method: 'POST',
        body: blob
      });

      // server tasdiqlash va rasm o'lchami bilan javob beradi
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

Diqqat qiling, bu yerda `Content-Type` header'ini qo'lda o'rnatmaymiz, chunki `Blob` obyekti o'rnatilgan turga ega (bu yerda `image/png`, `toBlob` tomonidan yaratilgan). `Blob` obyektlari uchun bu tur `Content-Type` ning qiymatiga aylanadi.

`submit()` funksiyasini `async/await` bo'lmagan holda quyidagicha qayta yozish mumkin:

```js
function submit() {
  canvasElem.toBlob(function(blob) {        
    fetch('/article/fetch/post/image', {
      method: 'POST',
      body: blob
    })
      .then(response => response.json())
      .then(result => alert(JSON.stringify(result, null, 2)))
  }, 'image/png');
}
```

## Xulosa

Odatiy fetch so'rovi ikkita `await` chaqiruvidan iborat:

```js
let response = await fetch(url, options); // response headers bilan resolve qilinadi
let result = await response.json(); // body'ni json sifatida o'qish
```

Yoki, `await` bo'lmagan holda:

```js
fetch(url, options)
  .then(response => response.json())
  .then(result => /* natijani qayta ishlash */)
```

Response xususiyatlari:
- `response.status` -- javobning HTTP kodi,
- `response.ok` -- agar status 200-299 bo'lsa `true`.
- `response.headers` -- HTTP headers bilan Map-ga o'xshash obyekt.

Response body'ni olish usullari:
- **`response.text()`** -- javobni matn sifatida qaytarish,
- **`response.json()`** -- javobni JSON obyekti sifatida parse qilish,
- **`response.formData()`** -- javobni `FormData` obyekti sifatida qaytarish (form/multipart kodlash, keyingi bobga qarang),
- **`response.blob()`** -- javobni [Blob](info:blob) sifatida qaytarish (turi bilan ikkilik ma'lumot),
- **`response.arrayBuffer()`** -- javobni [ArrayBuffer](info:arraybuffer-binary-arrays) sifatida qaytarish (past darajadagi ikkilik ma'lumot),

Hozircha Fetch opsiyalari:
- `method` -- HTTP-method,
- `headers` -- so'rov headers bilan obyekt (har qanday header ruxsat etilmagan),
- `body` -- `string`, `FormData`, `BufferSource`, `Blob` yoki `UrlSearchParams` obyekti sifatida yuborish uchun ma'lumot (so'rov tanasi).

Keyingi boblarda biz `fetch` ning ko'proq opsiyalari va foydalanish holatlarini ko'ramiz.