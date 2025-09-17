# Va'dalar bilan ishlashda xato

Asinxron harakatlar ba'zan muvaffaqiyatsiz bo'lishi mumkin: xato bo'lsa, tegishli va'da rad etiladi. Masalan, masofaviy server mavjud bo'lmasa, `fetch` bajarilmaydi. Xatolarni (rad etishlarni) boshqarish uchun `.catch` dan foydalanishimiz mumkin.

Va'da zanjiri bu jihatdan juda yaxshi. Va'da rad etilganda, boshqaruv zanjir bo'ylab eng yaqin rad etuvchiga sakraydi. Bu amalda juda qulay.

Masalan, URL ostidagi kodda xato (bunday server yo'q) va `.catch` xatoni boshqaradi:

```js run
*!*
fetch('https://no-such-server.blabla') // rad etadi
*/!*
  .then(response => response.json())
  .catch(err => alert(err)) // TypeError: failed to fetch (the text may vary)
```

Yoki, ehtimol, hamma narsa serverda yaxshi, lekin javob to'g'ri emas JSON:

```js run
fetch('/') // fetch hozirda yaxshi ishlaydi, server muvaffaqiyatli javob beradi
*!*
  .then(response => response.json()) // rad etadi: sahifa HTML, yaroqli json emas
*/!*
  .catch(err => alert(err)) // SyntaxError: Unexpected token < in JSON at position 0
```

Barcha xatolarni ushlashning eng oson usuli - zanjirning oxiriga `.catch` qo'shilish:

```js run
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise((resolve, reject) => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
*!*
  .catch(error => alert(error.message));
*/!*
```

Odatda `.catch` umuman bajarilmaydi, chunki xatolar yo'q. Ammo agar yuqoridagi va'dalardan birortasi rad etsa (tarmoq muammosi yoki yaroqsiz json yoki boshqa narsalar), u buni bajaradi.

## Yashirin try..catch

Va'da ijrochisi va va'da ishlovchilarining kodi atrofida "ko'rinmas `try..catch`" bor. Agar xato yuz bersa, u ushlanib qoladi va rad etish sifatida qabul qilinadi.

Masalan, ushbu kod:

```js run
new Promise((resolve, reject) => {
*!*
  throw new Error("Whoops!");
*/!*
}).catch(alert); // Error: Whoops!
```

...Aynan shunday ishlaydi:

```js run
new Promise((resolve, reject) => {
*!*
  reject(new Error("Whoops!"));
*/!*
}).catch(alert); // Error: Whoops!
```

Ijrochining atrofidagi "ko'rinmas `try..catch`" avtomatik ravishda xatoni ushlaydi va uni rad etish sifatida qabul qiladi.

Bu nafaqat ijrochida, balki uning ishlovchilarida ham bo'ladi. Agar biz `.then` ishlov beruvchisiga `throw` qo'ysak, bu rad etilgan va'dani anglatadi, shuning uchun boshqaruv eng yaqin xato ishlov beruvchiga sakraydi.

Mana bir misol:

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
  throw new Error("Whoops!"); // va'dani rad etadi
*/!*
}).catch(alert); // Error: Whoops!
```

Bu faqat `throw` iborasi sabab bo'lgan xatolar uchun emas, balki barcha xatolar uchun sodir bo'ladi. Masalan, dasturiy xato:

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
  blabla(); // bunday funktsiya yo'q
*/!*
}).catch(alert); // ReferenceError: blabla is not defined
```

Yakuniy `.catch` nafaqat aniq rad etishlarni, balki yuqoridagi ishlovchilarda vaqti-vaqti bilan xatolarni ham ushlaydi.

## Xatolar tarqalishi

Biz allaqachon payqaganimizdek, `.catch` o'zini `try..catch` kabi tutadi. Biz istagancha `.then` ishlovchilarga ega bo'lishimiz mumkin, so'ngra ularning barchasida xatolarni boshqarish uchun oxirida bitta `.catch` dan foydalanishimiz mumkin.

Muntazam ravishda `try..catch` da biz xatoni tahlil qilamiz va agar uni uddalay olmasak, uni qayta tiklaymiz. Xuddi shu narsa va'dalar uchun ham mumkin.

Agar biz `.catch` ichiga `throw` qo'ysak, boshqaruv keyingi eng yaqin xato ishlovchilariga o'tadi. Agar biz xatoga yo'l qo'ysak va odatdagidek tugatsak, u eng yaqin muvaffaqiyatli `.then` da davom etadi.

Quyidagi misolda `.catch` xatoni muvaffaqiyatli hal qiladi:

```js run
// the execution: catch -> then
new Promise((resolve, reject) => {
  throw new Error("Whoops!");
})
  .catch(function (error) {
    alert("Xato ko'rib chiqildi, odatdagidek davom eting ");
  })
  .then(() => alert("Keyingi muvaffaqiyatli ishlov beruvchi ishlaydi"));
```

Bu yerda `.catch` bloki an'anaviy tarzda tugaydi. Shunday qilib, keyingi muvaffaqiyatli `.then` ishlov beruvchisi chaqiriladi.

Quyidagi misolda biz `.catch` bilan boshqa vaziyatni ko'ramiz. `(*)` ishlovchisi xatoni ushlaydi va uni hal qila olmaydi (masalan, faqat `URIErro`" bilan ishlashni biladi), shuning uchun uni qayta bajaradi:

```js run
// the execution: catch -> catch
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) { // (*)

  if (error instanceof URIError) {
    // uni bajaradi
  } else {
    alert("Bunday xatoni bajara olmaydi");

*!*
    throw error; // u yoki bu xatoni tashlab, keyingi catch-ga sakraydi
*/!*
  }

}).then(function() {
  /* hech qachon bu yerda ishlamaydi */
}).catch(error => { // (**)

  alert(`The unknown error has occurred: ${error}`);
  // hech narsa qaytarmaydi => ijro odatiy yo'l bilan ketadi

});
```

Keyin ijro birinchi `.catch` `(*)` dan keyingisi `(**)` zanjirga sakraydi.

Quyidagi bo'limda biz qayta ko'rib chiqishning amaliy namunasini ko'rib chiqamiz.

## Fetch xato bilan ishlash misoli

Keling, foydalanuvchini yuklash misoli uchun xatolar bilan ishlashni yaxshilaymiz.

[fetch](mdn:api/WindowOrWorkerGlobalScope/fetch) tomonidan qaytarilgan va'da so'rov yuborish imkonsiz bo'lganda rad etadi. Masalan, masofaviy server mavjud emas yoki URL manzili noto'g'ri. Ammo agar masofaviy server 404 yoki hatto 500 xatosi bilan javob bersa, u to'g'ri javob deb hisoblanadi.

Agar server JSON-ga tegishli bo'lmagan sahifani `(*)` satrida 500 xatosi bilan qaytarsa nima bo'ladi? Agar bunday foydalanuvchi bo'lmasa va github 404 xatosi bo'lgan sahifani `(**)` ga qaytarsa nima bo'ladi?

```js run
fetch("no-such-user.json") // (*)
  .then((response) => response.json())
  .then((user) => fetch(`https://api.github.com/users/${user.name}`)) // (**)
  .then((response) => response.json())
  .catch(alert); // SyntaxError: Unexpected token < in JSON at position 0
// ...
```

Hozirda kod nima bo'lishidan qat'iy nazar javobni JSON sifatida yuklashga harakat qiladi va sintaksis xatosi bilan o'ladi. Buni `no-such-user.json` fayli mavjud emasligi sababli yuqoridagi misolni ishga tushirish orqali ko'rishingiz mumkin.

Bu yaxshi emas, chunki xato shunchaki zanjir orqali tushadi, tafsilotlarsiz: nima muvaffaqiyatsiz tugadi va qayerda.

Shunday qilib, yana bir qadam qo'shamiz: biz HTTP holatiga ega bo'lgan `response.status` xususiyatini tekshirib ko'rishimiz kerak va agar u 200 bo'lmasa, xatoni chiqaring.

```js run
class HttpError extends Error {
  // (1)
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = "HttpError";
    this.response = response;
  }
}

function loadJson(url) {
  // (2)
  return fetch(url).then((response) => {
    if (response.status == 200) {
      return response.json();
    } else {
      throw new HttpError(response);
    }
  });
}

loadJson("no-such-user.json") // (3)
  .catch(alert); // HttpError: 404 for .../no-such-user.json
```

1. Biz ularni boshqa turdagi xatolardan ajratish uchun HTTP xatolari uchun maxsus klass tuzamiz. Bundan tashqari, yangi klassda `response` obyektini qabul qiladigan va uni xatoda saqlaydigan konstruktor mavjud. Shunday qilib, xatolarni boshqarish kodi unga kirish imkoniyatiga ega bo'ladi.
2. So'ngra biz `url` ni olib keladigan funktsiyaga va xatolarni ko'rib chiqish kodini birlashtirdik _va_ har qanday 200 ga teng bo'lmagan holatni xato deb hisoblaymiz. Bu juda qulay, chunki biz ko'pincha bunday mantiqqa muhtojmiz.
3. Endi `alert` yanada foydali tavsiflovchi xabarni ko'rsatadi.

Xatolar uchun o'z klassimizga ega bo'lishning eng yaxshi tomoni shundaki, uni xatolar bilan ishlash kodida osongina tekshirishimiz mumkin.

Masalan, biz so'rov yuborishimiz mumkin, keyin 404 kelib tushsa - foydalanuvchidan ma'lumotni o'zgartirishni so'rang.

Quyidagi kod foydalanuvchini github-dan ushbu ism bilan yuklaydi. Agar bunday foydalanuvchi bo'lmasa, u to'g'ri ismni so'raydi:

```js run
function demoGithubUser() {
  let name = prompt("Ism kiriting?", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      alert(`Full name: ${user.name}.`);
      return user;
    })
    .catch(err => {
*!*
      if (err instanceof HttpError && err.response.status == 404) {
*/!*
        alert("Bunday foydalanuvchi yo'q, iltimos qayta kiring.");
        return demoGithubUser();
      } else {
        throw err; // (*)
      }
    });
}

demoGithubUser();
```

Iltimos, diqqat qiling: `.catch` bu yerda barcha xatolarga yo'l qo'yadi, ammo u faqat `HttpError 404` bilan ishlashni biladi. Bunday holda, bu bunday foydalanuvchi yo'qligini anglatadi va `.catch` bu holda qayta urinib ko'radi.

Boshqa xatolar uchun, nima sodir bo'lishi mumkinligini bilmaydi. Ehtimol, dasturiy xato yoki boshqa narsa. Shunday qilib, uni `(*)` satrida qaytaradi.

## Ishlov berilmagan xatolar

Xato ko'rib chiqilmaganda nima bo'ladi? Masalan, yuqoridagi misolda `(*)` qayta tiklangandan keyin.

Yoki biz zanjirning oxiriga xato ishlov beruvchini qo'shishni unutishimiz mumkin, masalan:

```js untrusted run refresh
new Promise(function () {
  noSuchFunction(); // Bu erda xato (bunday funktsiya yo'q)
}).then(() => {
  // nol yoki ko'plab va'da beruvchi ishlovchilar
}); // oxirida .catch siz!
```

Xato bo'lsa, va'da holati "rad etilgan" bo'lib qoladi va ijro eng yaqin rad etuvchiga o'tishi kerak. Ammo yuqoridagi misollarda bunday ishlov beruvchi yo'q. Shunday qilib, xato "tiqilib qoladi".

Amalda, xuddi odatdagi ishlov berilmagan xatolar singari, bu ham biron bir narsa noto'g'ri ketganligini anglatadi, ehtimol skript o'lgan.

Ko'pgina JavaScript interpretatorlari bunday vaziyatlarni kuzatib boradi va bu holda global xatolarni keltirib chiqaradi. Buni konsolda ko'rishimiz mumkin.

Brauzerda biz `unhandledrejection` hodisasi yordamida bunday xatolarga yo'l qo'yamiz:

```js run
*!*
window.addEventListener('unhandledrejection', function(event) {
  // hodisa obyekti ikkita maxsus xususiyatga ega:
  alert(event.promise); // [object Promise] - xatoni keltirib chiqargan va'da
  alert(event.reason); // Error: Whoops! - ishlov berilmagan xato obyekti
});
*/!*

new Promise(function() {
  throw new Error("Whoops!");
}); // xatoni boshqarish uchun hech qanday catch yo'q
```

Tadbir [HTML standarti](https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections) qismidir.

Agar xatolik yuz bersa va `.catch` mavjud bo'lmasa, `unhandledrejection` ishlov beruvchini ishga tushiradi va xato haqida ma'lumot bilan `event` obyektini oladi, shuning uchun biz biror narsa qilishimiz mumkin.

Odatda bunday xatolar tiklanmaydi, shuning uchun bizning eng yaxshi yo'limiz foydalanuvchini muammo haqida xabardor qilish va ehtimol serverga hodisa haqida xabar berishdir.

Node.js kabi brauzerdan tashqari muhitda ishlov berilmagan xatolarni kuzatib borishning boshqa shunga o'xshash usullari mavjud.

## Xulosa

- `.catch` tutqichlari har qanday rad etishni va'da qiladi: `reject()` chaqiruvi yoki ishlov beruvchiga xato tashlanadi.
- Biz xatolarni ko'rib chiqishni va ularni qanday boshqarishni bilishni xohlagan joylarga `.catch` ni aniq joylashtirishimiz kerak. Ishlovchi xatolarni tahlil qilishi kerak (maxsus xato klasslari yordam beradi) va noma'lumlarini qayta tiklashi kerak.
- Xatolarni qanday hal qilishni bilmasak, `.catch` dan foydalanmaslik odatiy holdir (barcha xatolar tiklanmaydi).
- Qanday bo'lmasin, biz ishlov berilmagan xatolarni kuzatib borish va ular haqida foydalanuvchini (va ehtimol bizning serverimiz) xabardor qilish uchun `unhandledrejection` voqea ishlovchisiga ega bo'lishimiz kerak (brauzerlar va boshqa muhitlar uchun analoglar), shunda bizning dasturimiz hech qachon "shunchaki o'lmaydi" .

Va nihoyat, agar bizda yuklash ko'rsatkichi bo'lsa, u holda `.finally` bu olib kelish tugagandan so'ng uni to'xtatish uchun juda yaxshi ishlovchidir:

```js run
function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

*!*
  document.body.style.opacity = 0.3; // (1) ko'rsatkichni boshlash
*/!*

  return loadJson(`https://api.github.com/users/${name}`)
*!*
    .finally(() => { // (2) ko'rsatkichni to'xtatish
      document.body.style.opacity = '';
      return new Promise(resolve => setTimeout(resolve, 0)); // (*)
    })
*/!*
    .then(user => {
      alert(`To'liq ism: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("Bunday foydalanuvchi yo'q, iltimos qayta kiring.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();
```

Bu yerda `(1)` satrida biz hujjatni xiralashtirish orqali yuklanishni ko'rsatamiz. Usul muhim emas, buning o'rniga har qanday ko'rsatkichni ishlatishi mumkin.

Va'da bajarilgandan so'ng, u muvaffaqiyatli fetch yoki xato bo'ladimi, `finally` `(2)` satrida boshlanadi va ko'rsatkichni to'xtatadi.

`finally` dan nol-tanaffus va'dasini qaytarish bilan `(*)` brauzerning kichik hiyla-nayranglari mavjud. Buning sababi shundaki, ba'zi brauzerlar (masalan, Chrome) hujjatdagi o'zgarishlarni bo'yash uchun tashqarida va'da beruvchilarga "biroz vaqt" kerak. Shunday qilib, zanjirga o'tmasdan oldin ko'rsatkich vizual ravishda to'xtatilishini ta'minlaydi.
