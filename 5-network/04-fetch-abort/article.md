# Fetch: To'xtatish

Ma'lumki, `fetch` promise'ni qaytaradi. Va JavaScript'da umuman "promise'ni to'xtatish" tushunchasi yo'q. Unda davom etayotgan `fetch`'ni qanday bekor qilishimiz mumkin? Masalan, agar saytimizda foydalanuvchi harakatlari `fetch` endi kerak emasligini ko'rsatsa.

Bunday maqsadlar uchun maxsus o'rnatilgan obyekt mavjud: `AbortController`. U nafaqat `fetch`'ni, balki boshqa asinxron vazifalarni ham to'xtatish uchun ishlatilishi mumkin.

Foydalanish juda oddiy:

## AbortController obyekti

Controller yarating:

```js
let controller = new AbortController();
```

Controller juda oddiy obyekt.

- Uning bitta `abort()` metodi bor,
- Va bitta `signal` xususiyati bor, u ustiga event listener'larini o'rnatish imkonini beradi.

`abort()` chaqirilganda:
- `controller.signal` `"abort"` event'ini chiqaradi.
- `controller.signal.aborted` xususiyati `true` bo'ladi.

<<<<<<< HEAD
Umuman olganda, jarayonda ikkita tomon bor:
1. Bekor qilinadigan operatsiyani bajaradigan tomon, u `controller.signal` ustiga listener o'rnatadi.
2. Bekor qiladigan tomon: kerak bo'lganda `controller.abort()` ni chaqiradi.
=======
Generally, we have two parties in the process:
1. The one that performs a cancelable operation, it sets a listener on `controller.signal`.
2. The one that cancels: it calls `controller.abort()` when needed.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

Mana to'liq misol (hali `fetch` bo'lmagan):

```js run
let controller = new AbortController();
let signal = controller.signal;

<<<<<<< HEAD
// Bekor qilinadigan operatsiyani bajaradigan tomon
// "signal" obyektini oladi
// va controller.abort() chaqirilganda ishga tushishi uchun listener o'rnatadi
signal.addEventListener('abort', () => alert("to'xtatildi!"));
=======
// The party that performs a cancelable operation
// gets the "signal" object
// and sets the listener to trigger when controller.abort() is called
signal.addEventListener('abort', () => alert("abort!"));
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

// Boshqa tomon, bekor qiladigan (keyinchalik istalgan paytda):
controller.abort(); // to'xtatildi!

// Event ishga tushadi va signal.aborted true bo'ladi
alert(signal.aborted); // true
```

Ko'rib turganingizdek, `AbortController` faqat `abort()` chaqirilganda `abort` event'larini uzatish vositasidir.

Biz `AbortController` obyektisiz ham o'z kodimizda xuddi shunday event listening'ni amalga oshirishimiz mumkin.

Lekin qimmatli tomoni shundaki, `fetch` `AbortController` obyekti bilan qanday ishlashni biladi. U unda integratsiya qilingan.

## fetch bilan ishlatish

`fetch`'ni bekor qilish uchun, `AbortController`ning `signal` xususiyatini `fetch` opsiyasi sifatida bering:

```js
let controller = new AbortController();
fetch(url, {
  signal: controller.signal
});
```

`fetch` metodi `AbortController` bilan qanday ishlashni biladi. U `signal` ustidagi `abort` event'larini tinglaydi.

Endi to'xtatish uchun `controller.abort()` ni chaqiring:

```js
controller.abort();
```

Tugadi: `fetch` `signal`dan event'ni oladi va so'rovni to'xtatadi.

Fetch to'xtatilganda, uning promise'si `AbortError` xatosi bilan rad etiladi, shuning uchun biz uni, masalan, `try..catch` da boshqarishimiz kerak.

Mana 1 soniyadan keyin to'xtatilgan `fetch` bilan to'liq misol:

```js run async
// 1 soniyada to'xtatish
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

try {
  let response = await fetch('/article/fetch-abort/demo/hang', {
    signal: controller.signal
  });
} catch(err) {
  if (err.name == 'AbortError') { // abort() ni boshqarish
    alert("To'xtatildi!");
  } else {
    throw err;
  }
}
```

## AbortController miqyoslanadigan

`AbortController` miqyoslanadigan. U bir vaqtning o'zida bir nechta fetch'larni bekor qilish imkonini beradi.

Mana parallel ravishda ko'plab `url`'larni fetch qiladigan va ularning barchasini to'xtatish uchun bitta controller dan foydalanadigan kodning eskizi:

```js
let urls = [...]; // parallel fetch qilinadigan url'lar ro'yxati

let controller = new AbortController();

// fetch promise'lari massivi
let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

// agar controller.abort() istalgan joydan chaqirilsa,
// u barcha fetch'larni to'xtatadi
```

Agar bizning `fetch`dan farq qiladigan o'z asinxron vazifalarimiz bo'lsa, fetch'lar bilan birga ularni to'xtatish uchun bitta `AbortController`dan foydalanishimiz mumkin.

Biz faqat o'z vazifalarimizda uning `abort` event'ini tinglashimiz kerak:

```js
let urls = [...];
let controller = new AbortController();

let ourJob = new Promise((resolve, reject) => { // bizning vazifamiz
  ...
  controller.signal.addEventListener('abort', reject);
});

let fetchJobs = urls.map(url => fetch(url, { // fetch'lar
  signal: controller.signal
}));

// Fetch'lar va bizning vazifamizni parallel kutish
let results = await Promise.all([...fetchJobs, ourJob]);

// agar controller.abort() istalgan joydan chaqirilsa,
// u barcha fetch'lar va ourJob'ni to'xtatadi
```

## Xulosa

<<<<<<< HEAD
- `AbortController` - `abort()` metodi chaqirilganda o'zining `signal` xususiyatida `abort` event'ini yaratadigan oddiy obyekt (va shuningdek `signal.aborted` ni `true` ga o'rnatadi).
- `fetch` u bilan integratsiyalashgan: biz `signal` xususiyatini opsiya sifatida beramiz, so'ngra `fetch` uni tinglaydi, shuning uchun `fetch`'ni to'xtatish mumkin.
- Biz `AbortController`ni o'z kodimizda ishlatishimiz mumkin. "`abort()` ni chaqirish" -> "`abort` event'ini tinglash" o'zaro ta'siri oddiy va universal. Biz uni hatto `fetch`siz ham ishlatishimiz mumkin.
=======
- `AbortController` is a simple object that generates an `abort` event on its `signal` property when the `abort()` method is called (and also sets `signal.aborted` to `true`).
- `fetch` integrates with it: we pass the `signal` property as the option, and then `fetch` listens to it, so it's possible to abort the `fetch`.
- We can use `AbortController` in our code. The "call `abort()`" -> "listen to `abort` event" interaction is simple and universal. We can use it even without `fetch`.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
