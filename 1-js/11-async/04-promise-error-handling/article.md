
# Va'dalar bilan ishlashda xato

<<<<<<< HEAD
Asinxron harakatlar ba'zan muvaffaqiyatsiz bo'lishi mumkin: xato bo'lsa, tegishli va'da rad etiladi. Masalan, masofaviy server mavjud bo'lmasa, `fetch` bajarilmaydi. Xatolarni (rad etishlarni) boshqarish uchun `.catch` dan foydalanishimiz mumkin.

Va'da zanjiri bu jihatdan juda yaxshi. Va'da rad etilganda, boshqaruv zanjir bo'ylab eng yaqin rad etuvchiga sakraydi. Bu amalda juda qulay.

Masalan, URL ostidagi kodda xato (bunday server yo'q) va `.catch` xatoni boshqaradi:
=======
Promise chains are great at error handling. When a promise rejects, the control jumps to the closest rejection handler. That's very convenient in practice.

For instance, in the code below the URL to `fetch` is wrong (no such site) and `.catch` handles the error:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
*!*
fetch('https://no-such-server.blabla') // rad etadi
*/!*
  .then(response => response.json())
  .catch(err => alert(err)) // TypeError: failed to fetch (the text may vary)
```

<<<<<<< HEAD
Yoki, ehtimol, hamma narsa serverda yaxshi, lekin javob to'g'ri emas JSON:

```js run
fetch('/') // fetch hozirda yaxshi ishlaydi, server muvaffaqiyatli javob beradi
*!*
  .then(response => response.json()) // rad etadi: sahifa HTML, yaroqli json emas
*/!*
  .catch(err => alert(err)) // SyntaxError: Unexpected token < in JSON at position 0
```

Barcha xatolarni ushlashning eng oson usuli - zanjirning oxiriga `.catch` qo'shilish:
=======
As you can see, the `.catch` doesn't have to be immediate. It may appear after one or maybe several `.then`.

Or, maybe, everything is all right with the site, but the response is not valid JSON. The easiest way to catch all errors is to append `.catch` to the end of chain:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
Odatda `.catch` umuman bajarilmaydi, chunki xatolar yo'q. Ammo agar yuqoridagi va'dalardan birortasi rad etsa (tarmoq muammosi yoki yaroqsiz json yoki boshqa narsalar), u buni bajaradi.
=======
Normally, such `.catch` doesn't trigger at all. But if any of the promises above rejects (a network problem or invalid json or whatever), then it would catch it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Yashirin try..catch

<<<<<<< HEAD
Va'da ijrochisi va va'da ishlovchilarining kodi atrofida "ko'rinmas `try..catch`" bor. Agar xato yuz bersa, u ushlanib qoladi va rad etish sifatida qabul qilinadi.
=======
The code of a promise executor and promise handlers has an "invisible `try..catch`" around it. If an exception happens, it gets caught and treated as a rejection.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
Ijrochining atrofidagi "ko'rinmas `try..catch`" avtomatik ravishda xatoni ushlaydi va uni rad etish sifatida qabul qiladi.

Bu nafaqat ijrochida, balki uning ishlovchilarida ham bo'ladi. Agar biz `.then` ishlov beruvchisiga `throw` qo'ysak, bu rad etilgan va'dani anglatadi, shuning uchun boshqaruv eng yaqin xato ishlov beruvchiga sakraydi.
=======
The "invisible `try..catch`" around the executor automatically catches the error and turns it into rejected promise.

This happens not only in the executor function, but in its handlers as well. If we `throw` inside a `.then` handler, that means a rejected promise, so the control jumps to the nearest error handler.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
Yakuniy `.catch` nafaqat aniq rad etishlarni, balki yuqoridagi ishlovchilarda vaqti-vaqti bilan xatolarni ham ushlaydi.
=======
The final `.catch` not only catches explicit rejections, but also accidental errors in the handlers above.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Xatolar tarqalishi

<<<<<<< HEAD
Biz allaqachon payqaganimizdek, `.catch` o'zini `try..catch` kabi tutadi. Biz istagancha `.then` ishlovchilarga ega bo'lishimiz mumkin, so'ngra ularning barchasida xatolarni boshqarish uchun oxirida bitta `.catch` dan foydalanishimiz mumkin.

Muntazam ravishda `try..catch` da biz xatoni tahlil qilamiz va agar uni uddalay olmasak, uni qayta tiklaymiz. Xuddi shu narsa va'dalar uchun ham mumkin.

Agar biz `.catch` ichiga `throw` qo'ysak, boshqaruv keyingi eng yaqin xato ishlovchilariga o'tadi. Agar biz xatoga yo'l qo'ysak va odatdagidek tugatsak, u eng yaqin muvaffaqiyatli `.then` da davom etadi.
=======
As we already noticed, `.catch` at the end of the chain is similar to `try..catch`. We may have as many `.then` handlers as we want, and then use a single `.catch` at the end to handle errors in all of them.

In a regular `try..catch` we can analyze the error and maybe rethrow it if it can't be handled. The same thing is possible for promises.

If we `throw` inside `.catch`, then the control goes to the next closest error handler. And if we handle the error and finish normally, then it continues to the next closest successful `.then` handler.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Quyidagi misolda `.catch` xatoni muvaffaqiyatli hal qiladi:

```js run
// the execution: catch -> then
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) {

  alert("Xato ko'rib chiqildi, odatdagidek davom eting ");

}).then(() => alert("Keyingi muvaffaqiyatli ishlov beruvchi ishlaydi"));
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
<<<<<<< HEAD
  /* hech qachon bu yerda ishlamaydi */
=======
  /* doesn't run here */
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
}).catch(error => { // (**)

  alert(`The unknown error has occurred: ${error}`);
  // hech narsa qaytarmaydi => ijro odatiy yo'l bilan ketadi

});
```

<<<<<<< HEAD
Keyin ijro birinchi `.catch` `(*)` dan keyingisi `(**)` zanjirga sakraydi.

Quyidagi bo'limda biz qayta ko'rib chiqishning amaliy namunasini ko'rib chiqamiz.

## Fetch xato bilan ishlash misoli

Keling, foydalanuvchini yuklash misoli uchun xatolar bilan ishlashni yaxshilaymiz.

[fetch](mdn:api/WindowOrWorkerGlobalScope/fetch) tomonidan qaytarilgan va'da so'rov yuborish imkonsiz bo'lganda rad etadi. Masalan, masofaviy server mavjud emas yoki URL manzili noto'g'ri. Ammo agar masofaviy server 404 yoki hatto 500 xatosi bilan javob bersa, u to'g'ri javob deb hisoblanadi.

Agar server JSON-ga tegishli bo'lmagan sahifani `(*)` satrida 500 xatosi bilan qaytarsa nima bo'ladi? Agar bunday foydalanuvchi bo'lmasa va github 404 xatosi bo'lgan sahifani `(**)` ga qaytarsa nima bo'ladi?

```js run
fetch('no-such-user.json') // (*)
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`)) // (**)
  .then(response => response.json())
  .catch(alert); // SyntaxError: Unexpected token < in JSON at position 0
  // ...
```


Hozirda kod nima bo'lishidan qat'iy nazar javobni JSON sifatida yuklashga harakat qiladi va sintaksis xatosi bilan o'ladi. Buni `no-such-user.json` fayli mavjud emasligi sababli yuqoridagi misolni ishga tushirish orqali ko'rishingiz mumkin.

Bu yaxshi emas, chunki xato shunchaki zanjir orqali tushadi, tafsilotlarsiz: nima muvaffaqiyatsiz tugadi va qayerda.

Shunday qilib, yana bir qadam qo'shamiz: biz HTTP holatiga ega bo'lgan `response.status` xususiyatini tekshirib ko'rishimiz kerak va agar u 200 bo'lmasa, xatoni chiqaring.

```js run
class HttpError extends Error { // (1)
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

function loadJson(url) { // (2)
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    })
}

loadJson('no-such-user.json') // (3)
  .catch(alert); // HttpError: 404 for .../no-such-user.json
```

1. Biz ularni boshqa turdagi xatolardan ajratish uchun HTTP xatolari uchun maxsus klass tuzamiz. Bundan tashqari, yangi klassda `response` obyektini qabul qiladigan va uni xatoda saqlaydigan konstruktor mavjud. Shunday qilib, xatolarni boshqarish kodi unga kirish imkoniyatiga ega bo'ladi.
2. So'ngra biz `url` ni olib keladigan funktsiyaga va xatolarni ko'rib chiqish kodini birlashtirdik *va* har qanday 200 ga teng bo'lmagan holatni xato deb hisoblaymiz. Bu juda qulay, chunki biz ko'pincha bunday mantiqqa muhtojmiz.
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
=======
The execution jumps from the first `.catch` `(*)` to the next one `(**)` down the chain.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Ishlov berilmagan xatolar

<<<<<<< HEAD
Xato ko'rib chiqilmaganda nima bo'ladi? Masalan, yuqoridagi misolda `(*)` qayta tiklangandan keyin.

Yoki biz zanjirning oxiriga xato ishlov beruvchini qo'shishni unutishimiz mumkin, masalan:
=======
What happens when an error is not handled? For instance, we forgot to append `.catch` to the end of the chain, like here:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js untrusted run refresh
new Promise(function() {
  noSuchFunction(); // Bu erda xato (bunday funktsiya yo'q)
})
  .then(() => {
<<<<<<< HEAD
    // nol yoki ko'plab va'da beruvchi ishlovchilar
  }); // oxirida .catch siz!
```

Xato bo'lsa, va'da holati "rad etilgan" bo'lib qoladi va ijro eng yaqin rad etuvchiga o'tishi kerak. Ammo yuqoridagi misollarda bunday ishlov beruvchi yo'q. Shunday qilib, xato "tiqilib qoladi".

Amalda, xuddi odatdagi ishlov berilmagan xatolar singari, bu ham biron bir narsa noto'g'ri ketganligini anglatadi, ehtimol skript o'lgan.

Ko'pgina JavaScript interpretatorlari bunday vaziyatlarni kuzatib boradi va bu holda global xatolarni keltirib chiqaradi. Buni konsolda ko'rishimiz mumkin.
=======
    // successful promise handlers, one or more
  }); // without .catch at the end!
```

In case of an error, the promise becomes rejected, and the execution should jump to the closest rejection handler. But there is none. So the error gets "stuck". There's no code to handle it.

In practice, just like with regular unhandled errors in code, it means that something has gone terribly wrong.

What happens when a regular error occurs and is not caught by `try..catch`? The script dies with a message in the console. A similar thing happens with unhandled promise rejections.

The JavaScript engine tracks such rejections and generates a global error in that case. You can see it in the console if you run the example above.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
Node.js kabi brauzerdan tashqari muhitda ishlov berilmagan xatolarni kuzatib borishning boshqa shunga o'xshash usullari mavjud.

=======
In non-browser environments like Node.js there are other ways to track unhandled errors.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Xulosa

<<<<<<< HEAD
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
=======
- `.catch` handles errors in promises of all kinds: be it a `reject()` call, or an error thrown in a handler.
- `.then` also catches errors in the same manner, if given the second argument (which is the error handler).
- We should place `.catch` exactly in places where we want to handle errors and know how to handle them. The handler should analyze errors (custom error classes help) and rethrow unknown ones (maybe they are programming mistakes).
- It's ok not to use `.catch` at all, if there's no way to recover from an error.
- In any case we should have the `unhandledrejection` event handler (for browsers, and analogs for other environments) to track unhandled errors and inform the user (and probably our server) about them, so that our app never "just dies".
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
