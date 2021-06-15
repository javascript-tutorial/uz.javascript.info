
<<<<<<< HEAD
# Mikrovazifalar va hodisalar tsikli
=======
# Microtasks
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

`.then`/`.catch`/`.finally` ishlovchilari doimo asinxrondir.

<<<<<<< HEAD
Va'da zudlik bilan hal qilingan taqdirda ham, sizning `.then`/`.catch`/`.finally` satrlaringizdagidan *quyidagi* kod birinchi bo'lib bajariladi.

Buni ko'rsatadigan kod:
=======
Even when a Promise is immediately resolved, the code on the lines *below* `.then`/`.catch`/`.finally` will still execute before these handlers.

Here's a demo:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let promise = Promise.resolve();

<<<<<<< HEAD
promise.then(() => alert("va'da bajarildi"));
=======
promise.then(() => alert("promise done!"));
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

alert("kod tugadi"); // birinchi navbatda ushbu ogohlantirish ko'rsatiladi
```

<<<<<<< HEAD
Agar siz uni ishlatsangiz, avval `kod tugadi`, so'ngra `va'da tugadi` ni ko'rasiz.
=======
If you run it, you see `code finished` first, and then `promise done!`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Bu g'alati, chunki va'da boshidanoq albatta amalga oshiriladi.

Nima uchun `.then` keyin bajariladi? Nima bo'lyapti?

<<<<<<< HEAD
# Mikrovazifalar

Asinxron vazifalar to'g'ri boshqaruvga muhtoj. Buning uchun standart `PromiseJobs` ichki navbatini belgilaydi, ko'pincha "mikrovazifa navbat" deb nomlanadi (v8 atama).

[Spetsifikatsiyada](https://tc39.github.io/ecma262/#sec-jobs-and-job-queues) aytilganidek:
=======
## Microtasks queue

Asynchronous tasks need proper management. For that, the ECMA standard specifies an internal queue `PromiseJobs`, more often referred to as the "microtask queue" (V8 term).

As stated in the [specification](https://tc39.github.io/ecma262/#sec-jobs-and-job-queues):
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

- Navbat birinchi bo'lib amalga oshiriladi: birinchi navbatda vazifalar bo'lib bajariladi.
- Vazifani bajarish faqat boshqa hech narsa ishlamay qolganda boshlanadi.

<<<<<<< HEAD
Yoki sodda qilib aytganda, va'da tayyor bo'lganda, uning `.then/catch/finally` ishlovchilari navbatga qo'yiladi. Ular hali bajarilmagan. JavaScript interpretatori navbatdan vazifani oladi va joriy koddan qutilganda uni bajaradi.
=======
Or, to put it more simply, when a promise is ready, its `.then/catch/finally` handlers are put into the queue; they are not executed yet. When the JavaScript engine becomes free from the current code, it takes a task from the queue and executes it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Shuning uchun yuqoridagi misolda "kod tugadi" birinchi bo'lib ko'rsatilgan.

![](promiseQueue.svg)

<<<<<<< HEAD
Va'da beruvchilar doimo ushbu ichki navbatdan o'tadilar.

Agar bir nechta `.then/catch/finally` zanjiri mavjud bo'lsa, unda ularning har biri asinxron tarzda bajariladi. Ya'ni, u avval navbatga qo'yiladi va joriy kod tugagandan va avval navbatda turgan ishlovchilar tugagandan so'ng bajariladi.

**Agar navbat biz uchun muhim bo'lsachi? Qanday qilib `kod tugadi` ni `va'da bajarilgandan` keyin ishlashimiz mumkin?**
=======
Promise handlers always go through this internal queue.

If there's a chain with multiple `.then/catch/finally`, then every one of them is executed asynchronously. That is, it first gets queued, then executed when the current code is complete and previously queued handlers are finished.

**What if the order matters for us? How can we make `code finished` appear after `promise done`?**
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Oson, uni `.then` bilan navbatga qo'ying.

```js run
Promise.resolve()
  .then(() => alert("va'da bajarilgandan!"))
  .then(() => alert("kod tugadi"));
```

Endi navbat maqsadga muvofiq.

<<<<<<< HEAD
## Hodisa tsikli

Brauzer ichidagi JavaScript, shuningdek Node.js *hodisa tsikliga* asoslangan.

"Hodisa tsikli" - bu interpretator uxlab yotgan va hodisalarni kutib turadgan, keyin ularga javob beradigan va yana uxlaydigan jarayon.

Hodisalar misollari:
- `mousemove`, foydalanuvchi sichqonchani harakatga keltirdi.
- `setTimeout` ishlov beruvchi chaqirildi.
- tashqi `<script src ="...">` yuklangan, bajarishga tayyor.
- tarmoq operatsiyasi, masalan. `fetch` tugallandi.
- ...va h.k.

Hodisalar sodir bo'ladi - interpretator ularni boshqaradi - va yana ko'p narsalar bo'lishini kutadi (uxlash paytida va nolga yaqin CPU iste'mol qilganda).

![](eventLoop.svg)

Ko'rib turganingizdek, bu yerda ham navbat bor. "Makrovazifa navbat" deb nomlangan (v8 atama).

Hodisa sodir bo'lganda, interpretator band bo'lganda, uni boshqarish qulay bo'ladi.

Masalan, interpretator `fetch` tarmog'ini qayta ishlash bilan band bo'lganida, foydalanuvchi sichqonchani siljitib, `mousemove` keltirib chiqarishi mumkin, va `setTimeout` xuddi yuqoridagi rasmda tasvirlanganidek bo'lishi kerak.

Makrovazifa navbatidagi hodisalar "birinchi kelish - birinchi xizmat" tamoyili asosida qayta ishlanadi. Interpretator brauzeri `fetch` tugagandan so'ng, u `mousemove` hodisasini, keyin `setTimeout` ishlov beruvchisini va boshqalarni boshqaradi.

Hozircha juda sodda, to'g'rimi? Interpretator band, shuning uchun boshqa vazifalar navbatda turadi.

Endi muhim narsalar.

**Mikrovazifa navbatida makrovazifa navbatiga qaraganda ustunlik yuqori.**

Boshqacha qilib aytganda, interpretator avval barcha mikrovazifalarni bajaradi, so'ngra makrovazifalarni oladi. Va'da bilan ishlash har doim birinchi o'ringa ega.

Masalan, qarang:

```js run
setTimeout(() => alert("timeout"));

Promise.resolve()
  .then(() => alert("promise"));

alert("code");
```

Navbat qanday?

1. `code` birinchi navbatda ko'rsatiladi, chunki bu muntazam sinxron chaqiruv.
2. `promise` ikkinchi bo'lib ko'rsatiladi, chunki `.then` mikrovazifa navbatidan o'tadi va joriy koddan keyin ishlaydi.
3. `timeout` oxirgi o'rinda ko'rsatiladi, chunki bu makrovazifa.

Ehtimol, makrovazifada ishlash paytida yangi va'dalar paydo bo'lishi mumkin.

Yoki, aksincha, mikrovazifa makrovazifani rejalashtiradi (masalan, `setTimeout`).

Masalan, `.then` `setTimeout` ni rejalashtiradi:

```js run
Promise.resolve()
  .then(() => {
    setTimeout(() => alert("timeout"), 0);
  })
  .then(() => {
    alert("promise");
  });
```

Tabiiyki, avval `promise` paydo bo'ladi, chunki `setTimeout` makrovazifani unchalik ahamiyatga ega bo'lmagan makrovazifa navbatida kutmoqda.

Mantiqiy natija sifatida makrovazifalar faqat interpretatorga "bo'sh vaqt" berganda amalga oshiriladi. Shunday qilib, agar bizda hech narsa kutmaydigan va'da zanjiri bo'lsa, unda `setTimeout` yoki hodisa ishlovchilari kabi narsalar hech qachon o'rtaga kira olmaydi.


## Ishlov berilmagan rad etish

<info:promise-error-handling> bobidagi "ishlov berilmagan rad etish" hodisasini eslaysizmi?

Endi mikrovazifalarni tushunish bilan biz uni rasmiylashtira olamiz.

**"Ishlov berilmagan rad etish" - bu mikrovazifa navbatining oxirida va'da xatosi ko'rib chiqilmaganda sodir bo'ladi.**

Masalan, ushbu kodni ko'rib chiqing:
=======
## Unhandled rejection

Remember the `unhandledrejection` event from the article <info:promise-error-handling>?

Now we can see exactly how JavaScript finds out that there was an unhandled rejection.

**An "unhandled rejection" occurs when a promise error is not handled at the end of the microtask queue.**

Normally, if we expect an error, we add `.catch` to the promise chain to handle it:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let promise = Promise.reject(new Error("Promise Failed!"));
*!*
promise.catch(err => alert('caught'));
*/!*

// doesn't run: error handled
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

<<<<<<< HEAD
Biz rad etilgan `promise` ni yaratamiz va xatoni ko'rib chiqmaymiz. Shunday qilib bizda "ishlov berilmagan rad etish" hodisasi mavjud (brauzer konsolida ham yozilgan).

Agar `.catch` qo'shsak, bizda bunday bo'lmaydi:
=======
But if we forget to add `.catch`, then, after the microtask queue is empty, the engine triggers the event:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let promise = Promise.reject(new Error("Promise Failed!"));

<<<<<<< HEAD
// hech qanday xato yo'q, hammasi tinch
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

Endi aytaylik, biz xatoga yo'l qo'yamiz, ammo `etTimeout` dan keyin:
=======
// Promise Failed!
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

What if we handle the error later? Like this:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let promise = Promise.reject(new Error("Promise Failed!"));
*!*
setTimeout(() => promise.catch(err => alert('caught')), 1000);
*/!*

// Error: Promise Failed!
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

<<<<<<< HEAD
Endi ishlov berilmagan rad etish yana paydo bo'ladi. Nima uchun? Mikrovazifada navbat tugagandan so'ng, "ishlov berilmagan rad etish" paydo bo'ladi. Interpretator va'dalarni tekshiradi va agar ulardan biri "rad etilgan" holatda bo'lsa, unda hodisa sodir bo'ladi.

Masalan, `setTimeout` tomonidan qo'shilgan `.catch` ham ishga tushadi, albatta, lekin `unhandledrejection` allaqachon sodir bo'lgandan so'ng.

## Xulosa

- Va'dalarni boshqarish har doim ham mos kelmaydi, chunki barcha va'da qilingan harakatlar "mikrovazifa navbati" (v8 atama) deb nomlangan ichki "va'da ishi" navbatidan o'tadi.

    **Shunday qilib, `.then/catch/finally` joriy kod tugagandan so'ng chaqiriladi.**

    Agar kodning bir qismi `.then/catch/finally` dan keyin bajarilishini kafolatlashimiz kerak bo'lsa, uni zanjirlangan `.then` chaqiruviga qo'shganimiz ma'qul.

- Shuningdek, turli xil hodisalarni, tarmoq ish natijalarini,`"setTimeout` rejalashtirilgan chaqiruvlarni va boshqalarni saqlaydigan "makrovazifa navbati" mavjud. Ular "makrovazifalar" (v8 atama) deb ham ataladi.

    Interpretator ularni tashqi ko'rinish tartibida boshqarish uchun makrovazifalrdan foydalanadi.

    **Makrovazifalar kod tugagandan so'ng ishlaydi *va* mikrovazifalar navbati bo'sh bo'lgandan keyin.**

    Boshqacha qilib aytganda, ularning ustunligi pastroq.

Shunday qilib, navbat quyidagicha: odatdagi kod, keyin va'da bilan ishlash, so'ngra hamma narsa, masalan hodisalar va boshqalar.
=======
Now, if we run it, we'll see `Promise Failed!` first and then `caught`.

If we didn't know about the microtasks queue, we could wonder: "Why did `unhandledrejection` handler run? We did catch and handle the error!"

But now we understand that `unhandledrejection` is generated when the microtask queue is complete: the engine examines promises and, if any of them is in the "rejected" state, then the event triggers.

In the example above, `.catch` added by `setTimeout` also triggers. But it does so later, after `unhandledrejection` has already occurred, so it doesn't change anything.

## Summary

Promise handling is always asynchronous, as all promise actions pass through the internal "promise jobs" queue, also called "microtask queue" (V8 term).

So `.then/catch/finally` handlers are always called after the current code is finished.

If we need to guarantee that a piece of code is executed after `.then/catch/finally`, we can add it into a chained `.then` call.

In most Javascript engines, including browsers and Node.js, the concept of microtasks is closely tied with the "event loop" and "macrotasks". As these have no direct relation to promises, they are covered in another part of the tutorial, in the article <info:event-loop>.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
