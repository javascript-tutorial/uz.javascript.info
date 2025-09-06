# XMLHttpRequest

`XMLHttpRequest` - bu JavaScript da HTTP so'rovlar qilish imkonini beruvchi o'rnatilgan brauzer obyekti.

Nomida "XML" so'zi bo'lishiga qaramay, u nafaqat XML formatida, balki har qanday ma'lumotlar bilan ishlashi mumkin. Biz fayllarni yuklash/yuklab olish, jarayonni kuzatish va boshqa ko'p narsalarni qilishimiz mumkin.

Hozirda `XMLHttpRequest` ni bir oz eskirgan holda qoldiradigan boshqa, zamonaviyroq `fetch` metodi mavjud.

Zamonaviy veb-ishlanmada `XMLHttpRequest` uch sabab bilan ishlatiladi:

1. Tarixiy sabablar: biz `XMLHttpRequest` bilan mavjud script'larni qo'llab-quvvatlashimiz kerak.
2. Biz eski brauzerlarni qo'llab-quvvatlashimiz va polyfill'lar ishlatishni xohlamaymiz (masalan, script'larni kichik saqlash uchun).
3. Bizga `fetch` hali qila olmaydigan narsa kerak, masalan yuklash jarayonini kuzatish.

Bu tanish tuyuladimi? Agar ha bo'lsa, `XMLHttpRequest` bilan davom eting. Aks holda, <info:fetch> ga o'ting.

## Asoslar

XMLHttpRequest ikkita ishlash rejimiga ega: sinxron va asinxron.

Avval asinxronni ko'raylik, chunki u ko'pchilik hollarda ishlatiladi.

So'rov qilish uchun bizga 3 qadam kerak:

1. `XMLHttpRequest` yaratish:
    ```js
    let xhr = new XMLHttpRequest();
    ```
    Konstruktor hech qanday argumentga ega emas.

2. Uni ishga tushirish, odatda `new XMLHttpRequest` dan keyin darhol:
    ```js
    xhr.open(method, URL, [async, user, password])
    ```

    Bu metod so'rovning asosiy parametrlarini belgilaydi:

    - `method` -- HTTP-metod. Odatda `"GET"` yoki `"POST"`.
    - `URL` -- so'rov qilinadigan URL, string, [URL](info:url) obyekti bo'lishi mumkin.
    - `async` -- agar aniq ravishda `false` ga o'rnatilsa, so'rov sinxron bo'ladi, buni biroz keyinroq ko'rib chiqamiz.
    - `user`, `password` -- asosiy HTTP auth uchun login va parol (agar kerak bo'lsa).

    Diqqat qiling, `open` chaqiruvi, nomiga qaramay, ulanishni ochmaydi. U faqat so'rovni sozlaydi, lekin tarmoq faolligi faqat `send` chaqiruvi bilan boshlanadi.

3. Uni yuborish.

    ```js
    xhr.send([body])
    ```

    Bu metod ulanishni ochadi va so'rovni serverga yuboradi. Ixtiyoriy `body` parametri so'rov tanasini o'z ichiga oladi.

    `GET` kabi ba'zi so'rov metodlari tanaga ega emas. `POST` kabi ba'zilari esa ma'lumotlarni serverga yuborish uchun `body` dan foydalanadi. Buning misollarini keyinroq ko'ramiz.

4. Javob uchun `xhr` event'larini tinglash.

    Bu uchta event eng keng qo'llaniladi:
    - `load` -- so'rov tugallanganda (HTTP status 400 yoki 500 bo'lsa ham), va javob to'liq yuklab olinganda.
    - `error` -- so'rov qilinmagan bo'lsa, masalan tarmoq ishlamay qolganda yoki noto'g'ri URL.
    - `progress` -- javob yuklanayotganda vaqti-vaqti bilan ishga tushadi, qancha yuklanganini xabar beradi.

    ```js
    xhr.onload = function() {
      alert(`Yuklandi: ${xhr.status} ${xhr.response}`);
    };

    xhr.onerror = function() { // faqat so'rov umuman qilinmagan bo'lsa ishga tushadi
      alert(`Tarmoq Xatosi`);
    };

    xhr.onprogress = function(event) { // vaqti-vaqti bilan ishga tushadi
      // event.loaded - necha bayt yuklab olingan
      // event.lengthComputable = agar server Content-Length header yuborgan bo'lsa true
      // event.total - umumiy baytlar soni (agar lengthComputable bo'lsa)
      alert(`${event.total} dan ${event.loaded} qabul qilindi`);
    };
    ```

Mana to'liq misol. Quyidagi kod serverdan `/article/xmlhttprequest/example/load` URL'ini yuklaydi va jarayonni chop etadi:

```js run
// 1. Yangi XMLHttpRequest obyektini yaratish
let xhr = new XMLHttpRequest();

// 2. Uni sozlash: /article/.../load URL uchun GET-so'rov
xhr.open('GET', '/article/xmlhttprequest/example/load');

// 3. So'rovni tarmoq orqali yuborish
xhr.send();

// 4. Bu javob olingandan keyin chaqiriladi
xhr.onload = function() {
  if (xhr.status != 200) { // javobning HTTP statusini tahlil qilish
    alert(`Xato ${xhr.status}: ${xhr.statusText}`); // masalan 404: Not Found
  } else { // natijani ko'rsatish
    alert(`Tayyor, ${xhr.response.length} bayt olindi`); // response - server javobi
  }
};

xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    alert(`${event.total} dan ${event.loaded} bayt qabul qilindi`);
  } else {
    alert(`${event.loaded} bayt qabul qilindi`); // Content-Length yo'q
  }
};

xhr.onerror = function() {
  alert("So'rov muvaffaqiyatsiz");
};
```

Server javob bergandan keyin, biz natijani quyidagi `xhr` xususiyatlarida olishimiz mumkin:

`status`
: HTTP status kodi (raqam): `200`, `404`, `403` va boshqalar, HTTP bo'lmagan muvaffaqiyatsizlik holatida `0` bo'lishi mumkin.

`statusText`
: HTTP status xabari (string): odatda `200` uchun `OK`, `404` uchun `Not Found`, `403` uchun `Forbidden` va boshqalar.

`response` (eski script'lar `responseText` dan foydalanishi mumkin)
: Server javob tanasi.

Shuningdek, tegishli xususiyat yordamida timeout belgilashimiz mumkin:

```js
xhr.timeout = 10000; // ms da timeout, 10 soniya
```

Agar so'rov berilgan vaqt ichida muvaffaqiyatli bo'lmasa, u bekor qilinadi va `timeout` eventi ishga tushadi.

````smart header="URL qidiruv parametrlari"
URL ga `?name=value` kabi parametrlar qo'shish va to'g'ri kodlashni ta'minlash uchun [URL](info:url) obyektidan foydalanishimiz mumkin:

```js
let url = new URL('https://google.com/search');
url.searchParams.set('q', 'test me!');

// 'q' parametri kodlangan
xhr.open('GET', url); // https://google.com/search?q=test+me%21
```

````

## Javob Turi

Javob formatini belgilash uchun `xhr.responseType` xususiyatidan foydalanishimiz mumkin:

- `""` (standart) -- string sifatida olish,
- `"text"` -- string sifatida olish,
- `"arraybuffer"` -- `ArrayBuffer` sifatida olish (ikkilik ma'lumotlar uchun, <info:arraybuffer-binary-arrays> bobiga qarang),
- `"blob"` -- `Blob` sifatida olish (ikkilik ma'lumotlar uchun, <info:blob> bobiga qarang),
- `"document"` -- XML hujjat (XPath va boshqa XML metodlaridan foydalanish mumkin) yoki HTML hujjat sifatida olish (olingan ma'lumotlarning MIME turiga asoslanib),
- `"json"` -- JSON sifatida olish (avtomatik parse qilinadi).

Masalan, javobni JSON sifatida olaylik:

```js run
let xhr = new XMLHttpRequest();

xhr.open('GET', '/article/xmlhttprequest/example/json');

*!*
xhr.responseType = 'json';
*/!*

xhr.send();

// javob {"message": "Hello, world!"}
xhr.onload = function() {
  let responseObj = xhr.response;
  alert(responseObj.message); // Hello, world!
};
```

```smart
Eski script'larda `xhr.responseText` va hatto `xhr.responseXML` xususiyatlarini ham topishingiz mumkin.

Ular tarixiy sabablarga ko'ra mavjud, string yoki XML hujjat olish uchun. Hozirda biz formatni `xhr.responseType` da o'rnatish va yuqorida ko'rsatilganidek `xhr.response` olish kerak.
```

## Tayyor holatlar

`XMLHttpRequest` jarayon davomida holatlar o'rtasida o'zgaradi. Joriy holat `xhr.readyState` sifatida mavjud.

[Spetsifikatsiya](https://xhr.spec.whatwg.org/#states)dagi barcha holatlar:

```js
UNSENT = 0; // boshlang'ich holat
OPENED = 1; // open chaqirilgan
HEADERS_RECEIVED = 2; // javob header'lari olingan
LOADING = 3; // javob yuklanmoqda (ma'lumot paketi olingan)
DONE = 4; // so'rov tugallangan
```

`XMLHttpRequest` obyekti ularni `0` -> `1` -> `2` -> `3` -> ... -> `3` -> `4` tartibida bosib o'tadi. Holat `3` tarmoq orqali har safar ma'lumot paketi olinganda takrorlanadi.

Biz ularni `readystatechange` event yordamida kuzatib borishimiz mumkin:

```js
xhr.onreadystatechange = function() {
  if (xhr.readyState == 3) {
    // yuklanmoqda
  }
  if (xhr.readyState == 4) {
    // so'rov tugallangan
  }
};
```

Siz `readystatechange` listener'larini haqiqatan ham eski kodda topishingiz mumkin, u tarixiy sabablarga ko'ra mavjud, chunki `load` va boshqa event'lar bo'lmagan vaqt bor edi. Hozirda `load/error/progress` handler'lari uni eskirgan holga keltiradi.

## So'rovni to'xtatish

Biz so'rovni istalgan vaqtda to'xtatishimiz mumkin. Buning uchun `xhr.abort()` chaqiruvi:

```js
xhr.abort(); // so'rovni to'xtatish
```

Bu `abort` event'ini ishga tushiradi va `xhr.status` `0` bo'ladi.

## Sinxron so'rovlar

Agar `open` metodida uchinchi parametr `async` `false` ga o'rnatilsa, so'rov sinxron amalga oshiriladi.

Boshqacha qilib aytganda, JavaScript ijrosi `send()` da to'xtaydi va javob olinganidan keyin davom etadi. `alert` yoki `prompt` buyruqlari kabi.

Mana qayta yozilgan misol, `open` ning 3-parametri `false`:

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', '/article/xmlhttprequest/hello.txt', *!*false*/!*);

try {
  xhr.send();
  if (xhr.status != 200) {
    alert(`Xato ${xhr.status}: ${xhr.statusText}`);
  } else {
    alert(xhr.response);
  }
} catch(err) { // onerror o'rniga
  alert("So'rov muvaffaqiyatsiz");
}
```

Bu yaxshi ko'rinishi mumkin, lekin sinxron chaqiruvlar kamdan-kam ishlatiladi, chunki ular yuklash tugagunicha sahifadagi JavaScript'ni bloklaydi. Ba'zi brauzerlarda scroll qilish imkonsiz bo'ladi. Agar sinxron chaqiruv juda ko'p vaqt olsa, brauzer "osilib qolgan" veb-sahifani yopishni taklif qilishi mumkin.

`XMLHttpRequest` ning ko'plab ilg'or imkoniyatlari, masalan boshqa domendan so'rov qilish yoki timeout belgilash, sinxron so'rovlar uchun mavjud emas. Shuningdek, ko'rib turganingizdek, progress ko'rsatkichi yo'q.

Bularning barchasiga ko'ra, sinxron so'rovlar juda kam, deyarli hech qachon ishlatilmaydi. Biz ular haqida endi gapirmaymiz.

## HTTP-header'lar

`XMLHttpRequest` maxsus header'larni yuborish va javobdan header'larni o'qish imkonini beradi.

HTTP-header'lar uchun 3 ta metod bor:

`setRequestHeader(name, value)`
: Berilgan `name` va `value` bilan so'rov header'ini o'rnatadi.

    Masalan:

    ```js
    xhr.setRequestHeader('Content-Type', 'application/json');
    ```

    ```warn header="Header'lar cheklovlari"
    Bir nechta header'lar faqat brauzer tomonidan boshqariladi, masalan `Referer` va `Host`.
    To'liq ro'yxat [spetsifikatsiyada](https://xhr.spec.whatwg.org/#the-setrequestheader()-method).

    `XMLHttpRequest` ga foydalanuvchi xavfsizligi va so'rov to'g'riligi uchun ularni o'zgartirish ruxsat etilmagan.
    ```

    ````warn header="Header'ni o'chirib bo'lmaydi"
    `XMLHttpRequest` ning yana bir xususiyati shundaki, `setRequestHeader` ni bekor qilib bo'lmaydi.

    Header o'rnatilgandan keyin, u o'rnatilgan. Qo'shimcha chaqiruvlar header'ga ma'lumot qo'shadi, uni qayta yozmaydi.

    Masalan:

    ```js
    xhr.setRequestHeader('X-Auth', '123');
    xhr.setRequestHeader('X-Auth', '456');

    // header quyidagicha bo'ladi:
    // X-Auth: 123, 456
    ```
    ````

`getResponseHeader(name)`
: Berilgan `name` bilan javob header'ini oladi (`Set-Cookie` va `Set-Cookie2` bundan mustasno).

    Masalan:

    ```js
    xhr.getResponseHeader('Content-Type')
    ```

`getAllResponseHeaders()`
: `Set-Cookie` va `Set-Cookie2` bundan mustasno, barcha javob header'larini qaytaradi.

    Header'lar bitta qator sifatida qaytariladi, masalan:

    ```http
    Cache-Control: max-age=31536000
    Content-Length: 4260
    Content-Type: image/png
    Date: Sat, 08 Sep 2012 16:53:16 GMT
    ```

    Header'lar orasidagi qator uzilishi har doim `"\r\n"` (OS ga bog'liq emas), shuning uchun biz uni alohida header'larga osonlik bilan bo'lishimiz mumkin. Nom va qiymat o'rtasidagi ajratuvchi har doim ikki nuqta va bo'shliq `": "`. Bu spetsifikatsiyada belgilangan.

    Shunday qilib, agar biz nom/qiymat juftligi bilan obyekt olishni istasak, biroz JS qo'shishimiz kerak.

    Masalan (agar ikkita header bir xil nomga ega bo'lsa, keyingisi avvalgisini qayta yozadi deb faraz qilib):

    ```js
    let headers = xhr
      .getAllResponseHeaders()
      .split('\r\n')
      .reduce((result, current) => {
        let [name, value] = current.split(': ');
        result[name] = value;
        return result;
      }, {});

    // headers['Content-Type'] = 'image/png'
    ```

## POST, FormData

POST so'rovi qilish uchun biz o'rnatilgan [FormData](mdn:api/FormData) obyektidan foydalanishimiz mumkin.

Sintaksis:

```js
let formData = new FormData([form]); // obyekt yaratadi, ixtiyoriy ravishda <form> dan to'ldiradi
formData.append(name, value); // maydon qo'shadi
```

Biz uni yaratamiz, ixtiyoriy ravishda formdan to'ldiramiz, kerak bo'lsa ko'proq maydonlar `append` qilamiz, so'ngra:

1. `xhr.open('POST', ...)` – `POST` metodidan foydalanish.
2. `xhr.send(formData)` formani serverga yuborish.

Masalan:

```html run refresh
<form name="person">
  <input name="name" value="John">
  <input name="surname" value="Smith">
</form>

<script>
  // FormData ni formdan oldindan to'ldirish
  let formData = new FormData(document.forms.person);

  // yana bir maydon qo'shish
  formData.append("middle", "Lee");

  // uni yuborish
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/article/xmlhttprequest/post/user");
  xhr.send(formData);

  xhr.onload = () => alert(xhr.response);
</script>
```

Forma `multipart/form-data` kodlash bilan yuboriladi.

Yoki, agar biz JSON ni ko'proq yoqtirsak, `JSON.stringify` qilib, string sifatida yuboramiz.

Faqat `Content-Type: application/json` header'ini o'rnatishni unutmang, ko'plab server-side framework'lari JSON ni u bilan avtomatik dekodlaydi:

```js
let xhr = new XMLHttpRequest();

let json = JSON.stringify({
  name: "John",
  surname: "Smith"
});

xhr.open("POST", '/submit')
xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

xhr.send(json);
```

`.send(body)` metodi juda omnivor (hamma yeydi). U `Blob` va `BufferSource` obyektlari kabilarni qo'shganda deyarli har qanday `body` ni yuborishi mumkin.

## Yuklash jarayoni

`progress` eventi faqat yuklab olish bosqichida ishga tushadi.

Ya'ni: agar biz biror narsani `POST` qilsak, `XMLHttpRequest` avval bizning ma'lumotlarimizni (so'rov tanasi) yuklaydi, so'ngra javobni yuklab oladi.

Agar biz katta narsani yuklayotgan bo'lsak, yuklash jarayonini kuzatish ancha qiziq. Lekin `xhr.onprogress` bu yerda yordam bermaydi.

Faqat yuklash event'larini kuzatish uchun metodlarsiz boshqa obyekt mavjud: `xhr.upload`.

U `xhr` ga o'xshash event'lar yaratadi, lekin `xhr.upload` ularni faqat yuklashda ishga tushiradi:

- `loadstart` -- yuklash boshlandi.
- `progress` -- yuklash davomida vaqti-vaqti bilan ishga tushadi.
- `abort` -- yuklash to'xtatildi.
- `error` -- HTTP bo'lmagan xato.
- `load` -- yuklash muvaffaqiyatli tugallandi.
- `timeout` -- yuklash vaqti tugadi (`timeout` xususiyati o'rnatilgan bo'lsa).
- `loadend` -- yuklash muvaffaqiyat yoki xato bilan tugallandi.

Handler'lar misoli:

```js
xhr.upload.onprogress = function(event) {
  alert(`${event.total} dan ${event.loaded} bayt yuklandi`);
};

xhr.upload.onload = function() {
  alert(`Yuklash muvaffaqiyatli tugallandi.`);
};

xhr.upload.onerror = function() {
  alert(`Yuklash paytida xato: ${xhr.status}`);
};
```

Mana haqiqiy hayotdagi misol: jarayon ko'rsatkichi bilan fayl yuklash:

```html run
<input type="file" onchange="upload(this.files[0])">

<script>
function upload(file) {
  let xhr = new XMLHttpRequest();

  // yuklash jarayonini kuzatish
*!*
  xhr.upload.onprogress = function(event) {
    console.log(`${event.total} dan ${event.loaded} yuklandi`);
  };
*/!*

  // tugallanishni kuzatish: muvaffaqiyatli yoki yo'q
  xhr.onloadend = function() {
    if (xhr.status == 200) {
      console.log("muvaffaqiyat");
    } else {
      console.log("xato " + this.status);
    }
  };

  xhr.open("POST", "/article/xmlhttprequest/post/upload");
  xhr.send(file);
}
</script>
```

## Cross-origin so'rovlar

`XMLHttpRequest` [fetch](info:fetch-crossorigin) bilan bir xil CORS siyosatini ishlatib, cross-origin so'rovlar qilishi mumkin.

Xuddi `fetch` kabi, u sukut bo'yicha boshqa origin ga cookie va HTTP-authorization yubormaydi. Ularni yoqish uchun `xhr.withCredentials` ni `true` ga o'rnating:

```js
let xhr = new XMLHttpRequest();
*!*
xhr.withCredentials = true;
*/!*

xhr.open('POST', 'http://anywhere.com/request');
...
```

Cross-origin header'lar haqida batafsil ma'lumot uchun <info:fetch-crossorigin> bobiga qarang.

## Xulosa

`XMLHttpRequest` bilan GET-so'rovning odatiy kodi:

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', '/my/url');

xhr.send();

xhr.onload = function() {
  if (xhr.status != 200) { // HTTP xatosi?
    // xatoni boshqarish
    alert( 'Xato: ' + xhr.status);
    return;
  }

  // javobni xhr.response dan olish
};

xhr.onprogress = function(event) {
  // jarayonni xabar qilish
  alert(`${event.total} dan ${event.loaded} yuklandi`);
};

xhr.onerror = function() {
  // HTTP bo'lmagan xatoni boshqarish (masalan, tarmoq ishlamaydi)
};
```

Aslida ko'proq event'lar bor, [zamonaviy spetsifikatsiya](https://xhr.spec.whatwg.org/#events) ularni ro'yxatlaydi (hayot sikli tartibida):

- `loadstart` -- so'rov boshlandi.
- `progress` -- javobning ma'lumot paketi keldi, ayni paytdagi butun javob tanasi `response` da.
- `abort` -- so'rov `xhr.abort()` chaqiruvi bilan bekor qilindi.
- `error` -- ulanish xatosi yuz berdi, masalan noto'g'ri domen nomi. 404 kabi HTTP-xatolari uchun sodir bo'lmaydi.
- `load` -- so'rov muvaffaqiyatli tugallandi.
- `timeout` -- so'rov timeout tufayli bekor qilindi (faqat o'rnatilgan bo'lsa sodir bo'ladi).
- `loadend` -- `load`, `error`, `timeout` yoki `abort` dan keyin ishga tushadi.

`error`, `abort`, `timeout` va `load` event'lari bir-birini istisno qiladi. Ulardan faqat bittasi sodir bo'lishi mumkin.

Eng ko'p ishlatiladigan event'lar yuklash tugallandi (`load`), yuklash muvaffaqiyatsiz (`error`), yoki biz bitta `loadend` handler ishlatib, nima bo'lganini ko'rish uchun so'rov obyekti `xhr` xususiyatlarini tekshirishimiz mumkin.

Biz yana bir event ni ko'rdik: `readystatechange`. Tarixan, u ancha oldin, spetsifikatsiya barqarorlashishidan oldin paydo bo'lgan. Hozirda uni ishlatish shart emas, biz uni yangi event'lar bilan almashtirishimiz mumkin, lekin uni eski script'larda tez-tez topish mumkin.

Agar biz maxsus ravishda yuklashni kuzatishimiz kerak bo'lsa, `xhr.upload` obyektidagi bir xil event'larni tinglashimiz kerak.