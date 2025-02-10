# Va'da

<<<<<<< HEAD
O'zingizni eng yaxshi qo'shiqchi deb tasavvur qiling va muxlislar kechayu kunduz yaqinlashib kelayotgan qo'shig'ingizni so'rashadi.

Biroz yengil tortish uchun, u nashr qilinganda, ularga yuborishga va'da berasiz. Siz muxlislaringizga yangilanishlar uchun obuna bo'lishlari mumkin bo'lgan ro'yxatni berasiz. Ular elektron pochta manzillarini to'ldirishlari mumkin, shunda qo'shiq paydo bo'lganda, obuna bo'lgan barcha partiyalar uni darhol qabul qilishadi. Hatto biron bir narsa noto'g'ri bo'lsa ham, aytaylik, agar qo'shiqni nashr etish rejalari bekor qilinsa, ular bundan xabardor bo'lishadi.

Har bir inson baxtlidir! Siz baxtlisiz, chunki siz endi muxlislar tomonidan ta'qib qilinmaysiz va muxlislar endi yangi qo'shiqni sog'inishdan tashvishlanmasligi mumkin.
=======
Imagine that you're a top singer, and fans ask day and night for your upcoming song.

To get some relief, you promise to send it to them when it's published. You give your fans a list. They can fill in their email addresses, so that when the song becomes available, all subscribed parties instantly receive it. And even if something goes very wrong, say, a fire in the studio, so that you can't publish the song, they will still be notified.

Everyone is happy: you, because the people don't crowd you anymore, and fans, because they won't miss the song.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Bu biz dasturlashda tez-tez uchraydigan narsalar uchun haqiqiy hayotdagi o'xshashlik:

<<<<<<< HEAD
1. Biror narsani qiladigan va vaqt talab qiladigan "ishlab chiqaruvchi kod". Masalan, kod masofaviy skriptni yuklaydi. Bu "qo'shiqchi".
2. Tayyor bo'lgandan keyin "ishlab chiqarish kodi" natijasini istaydigan "iste'mol kod". Ko'pgina funktsiyalar ushbu natijaga muhtoj bo'lishi mumkin. Bular "muxlislar".
3. *Va'da* - bu "ishlab chiqaruvchi kod" va "iste'molchi kodi" ni bir-biriga bog'laydigan maxsus JavaScript obyekti. Analogiya nuqtai nazaridan: bu "obuna ro'yxati". "Ishlab chiqarish kodi" va'da qilingan natijani olish uchun zarur bo'lgan har qanday vaqtni oladi va "va'da" ushbu natijani obuna bo'lgan barcha kodlarga tayyor bo'lgandan keyin taqdim etadi.
=======
1. A "producing code" that does something and takes time. For instance, some code that loads the data over a network. That's a "singer".
2. A "consuming code" that wants the result of the "producing code" once it's ready. Many functions  may need that result. These are the "fans".
3. A *promise* is a special JavaScript object that links the "producing code" and the "consuming code" together. In terms of our analogy: this is the "subscription list". The "producing code" takes whatever time it needs to produce the promised result, and the "promise" makes that result available to all of the subscribed code when it's ready.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Analogiya juda aniq emas, chunki JavaScript-ning va'dalari oddiy obuna ro'yxatiga qaraganda ancha murakkab: ular qo'shimcha funktsiyalar va cheklovlarga ega. Ammo bu boshlashga yaxshidir.

Va'da obyekti uchun konstruktor sintaksisi:

```js
let promise = new Promise(function(resolve, reject) {
  // ijrochi (ishlab chiqaruvchi kod, "qo'shiqchi")
});
```

<<<<<<< HEAD
`new Promise` ga berilgan funktsiya *bajaruvchi* deb nomlanadi. Va'da yaratilganda, ushbu ijrochi funktsiya avtomatik ravishda ishlaydi. U natija berishi kerak bo'lgan ishlab chiqarish kodini o'z ichiga oladi. Yuqoridagi analogiya nuqtai nazaridan: ijrochi "qo'shiqchi".

Natijada `promise` obyekti ichki xususiyatlarga ega:

- `state` — dastlab "pending", keyin "fulfilled" yoki "rejected" ga o'zgartiriladi,
- `result` — o'zingiz belgilagan ixtiyoriy qiymat, dastlab `undefined`.

Ijrochi ishni tugatgandan so'ng, u argument sifatida qabul qilingan funktsiyalardan birini chaqirishi kerak:

- `resolve(value)` — ish muvaffaqiyatli tugaganligini ko'rsatish uchun:
    - `state` ni `"fulfilled"` ga o'rnatadi,
    - `result` ni `value` ga o'rnatadi.
- `reject(error)` — xato sodir bo'lganligini ko'rsatish uchun:
    - `state` ni `"rejected"` ga o'rnatadi,
    - `result` ni `error` ga o'rnatadi.

![](promise-resolve-reject.svg)

Keyinchalik ushbu o'zgarishlar qanday qilib "muxlislar" ga ma'lum bo'lishini ko'ramiz.

Va'da konstruktori va "ishlab chiqaruvchi kod" (`setTimeout`) bilan sodda ijrochi funktsiyasiga misol:
=======
The function passed to `new Promise` is called the *executor*. When `new Promise` is created, the executor runs automatically. It contains the producing code which should eventually produce the result. In terms of the analogy above: the executor is the "singer".

Its arguments `resolve` and `reject` are callbacks provided by JavaScript itself. Our code is only inside the executor.

When the executor obtains the result, be it soon or late, doesn't matter, it should call one of these callbacks:

- `resolve(value)` — if the job is finished successfully, with result `value`.
- `reject(error)` — if an error has occurred, `error` is the error object.

So to summarize: the executor runs automatically and attempts to perform a job. When it is finished with the attempt, it calls `resolve` if it was successful or `reject` if there was an error.

The `promise` object returned by the `new Promise` constructor has these internal properties:

- `state` — initially `"pending"`, then changes to either `"fulfilled"` when `resolve` is called or `"rejected"` when `reject` is called.
- `result` — initially `undefined`, then changes to `value` when `resolve(value)` is called or `error` when `reject(error)` is called.

So the executor eventually moves `promise` to one of these states:

![](promise-resolve-reject.svg)

Later we'll see how "fans" can subscribe to these changes.

Here's an example of a promise constructor and a simple executor function with  "producing code" that takes time (via `setTimeout`):
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
let promise = new Promise(function(resolve, reject) {
  // va'da tuzilganda funktsiya avtomatik ravishda bajariladi

  // 1 soniya ichida "bajarilgan" natija bilan ish bajarilganligi to'g'risida signal
  setTimeout(() => *!*resolve("done")*/!*, 1000);
});
```

Yuqoridagi kodni ishga tushirish orqali biz ikkita narsani ko'rishimiz mumkin:

<<<<<<< HEAD
1. Ijrochi avtomatik va darhol chaqiriladi ( `new Promise` tomonidan).
2. Ijrochi ikkita argumentni oladi: `resolve` va `reject` - bu funktsiyalar JavaScript interpretator tomonidan oldindan belgilanadi. Shunday qilib, biz ularni yaratishga hojat yo'q. Buning o'rniga biz tayyor bo'lgandan keyin ularni chaqirish uchun ijrochini yozishimiz kerak.

"Ishlov berish" ning bir soniyasidan so'ng ijrochi natija berish uchun `resolve("done")` ni chaqiradi:

![](promise-resolve-1.svg)
=======
1. The executor is called automatically and immediately (by `new Promise`).
2. The executor receives two arguments: `resolve` and `reject`. These functions are pre-defined by the JavaScript engine, so we don't need to create them. We should only call one of them when ready.

    After one second of "processing", the executor calls `resolve("done")` to produce the result. This changes the state of the `promise` object:

    ![](promise-resolve-1.svg)
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Bu ishni muvaffaqiyatli yakunlashning misoli, "bajarilgan va'da" edi.

Va endi ijrochining va'dani xato bilan rad etishiga misol:

```js
let promise = new Promise(function(resolve, reject) {
  // 1 soniya ish xato bilan tugaganligini bildirgan signaldan keyin
  setTimeout(() => *!*reject(new Error("Whoops!"))*/!*, 1000);
});
```

<<<<<<< HEAD
![](promise-reject-1.svg)

Xulosa qilib aytganda, ijrochi ishni bajarishi kerak (odatda vaqt talab qiladigan narsa), so'ngra tegishli "Promise" obyektining holatini o'zgartirish uchun `resolve` yoki `reject` ni chaqirish kerak.

Yo'q qilingan yoki rad qilingan va'da, "pending" va'dadan farqli o'laroq, "settled" deb nomlanadi.

````smart header="Faqat bitta natija yoki xato bo'lishi mumkin"
Ijrochi faqat bitta `resolve` yoki bitta `reject` ni chaqirishi kerak. Va'daning o'zgarishi yakuniy hisoblanadi.
=======
The call to `reject(...)` moves the promise object to `"rejected"` state:

![](promise-reject-1.svg)

To summarize, the executor should perform a job (usually something that takes time) and then call `resolve` or `reject` to change the state of the corresponding promise object.

A promise that is either resolved or rejected is called "settled", as opposed to an initially "pending" promise.

````smart header="There can be only a single result or an error"
The executor should call only one `resolve` or one `reject`. Any state change is final.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Boshqa barcha `resolve` va `reject` chaqiruvlari inobatga olinmaydi:

```js
let promise = new Promise(function(resolve, reject) {
*!*
  resolve("done");
*/!*

  reject(new Error("…")); // inobatga olinmaydi
  setTimeout(() => resolve("…")); // inobatga olinmaydi
});
```

G'oya shundan iboratki, ijrochi tomonidan bajarilgan ishda faqat bitta natija yoki xato bo'lishi mumkin.

Bundan tashqari,  `resolve`/`reject` faqat bitta argumentni kutadi (yoki yo'q) va qo'shimcha argumentlarni e'tiborsiz qoldiradi.
````

<<<<<<< HEAD
```smart header="`Error` obyektlari bilan rad etish"
Agar biror narsa noto'g'ri bo'lsa, biz `reject` ni har qanday argument turi bilan chaqiramiz (xuddi `resolve` singari). Ammo `Error` obyektlaridan (yoki `Error` dan meros bo'lib o'tgan obyektlardan) foydalanish tavsiya etiladi. Buning sababi tez orada aniq bo'ladi.
=======
```smart header="Reject with `Error` objects"
In case something goes wrong, the executor should call `reject`. That can be done with any type of argument (just like `resolve`). But it is recommended to use `Error` objects (or objects that inherit from `Error`). The reasoning for that will soon become apparent.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

````smart header="Darhol chaqirish `resolve`/`reject`"
Amalda, ijrochi odatda biron bir narsani asinxron tarzda bajaradi va bir muncha vaqt o'tgach `resolve`/`reject` ni chaqiradi, ammo bunga majbur emas. Shuningdek, biz darhol `resolve` yoki `reject` ni chaqirishimiz mumkin:

```js
let promise = new Promise(function(resolve, reject) {
  // not taking our time to do the job
  resolve(123); // immediately give the result: 123
});
```

<<<<<<< HEAD
Masalan, bu ishni boshlashni boshlaganimizda, lekin keyin hamma narsa tugallanganligini ko'rganimizda yuz berishi mumkin.

Juda soz. Bizda darhol va'da hal qilingan, bunda hech qanday yomon narsa yo'q.
````

```smart header="`state` va `result` ichki"
"Promise" obyektining `state` va `result` ichki xususiyatlarga ega. Biz ularga "iste'mol kodimiz" dan to'g'ridan-to'g'ri kira olmaymiz. Buning uchun `.then`/`.catch`/`.finally` usullaridan foydalanishimiz mumkin. Ular quyida tavsiflangan.
=======
For instance, this might happen when we start to do a job but then see that everything has already been completed and cached.

That's fine. We immediately have a resolved promise.
````

```smart header="The `state` and `result` are internal"
The properties `state` and `result` of the Promise object are internal. We can't directly access them. We can use the methods `.then`/`.catch`/`.finally` for that. They are described below.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

<<<<<<< HEAD
## Iste'molchilar: then, catch, finally

"Promise" obyekti ijrochi ("ishlab chiqaruvchi kod" yoki "qo'shiqchi") bilan iste'molchi funktsiyalari ("muxlislar") o'rtasida bog'liqlik bo'lib xizmat qiladi, natijada natija yoki xato qabul qiladi. Iste'mol funktsiyalarini `.then`,`.catch` va `.finally` usullaridan foydalangan holda ro'yxatdan o'tkazish (obuna bo'lish) mumkin.
=======
## Consumers: then, catch

A Promise object serves as a link between the executor (the "producing code" or "singer") and the consuming functions (the "fans"), which will receive the result or error. Consuming functions can be registered (subscribed) using the methods `.then` and `.catch`.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

### then

Eng muhimi, asosiysi `.then`.

Sintaksis:

```js
promise.then(
  function(result) { *!*/* muvaffaqiyatli natijaga erishish */*/!* },
  function(error) { *!*/* xatoga yo'l qo'yish */*/!* }
);
```

<<<<<<< HEAD
<<<<<<< HEAD
`.then` ning birinchi argumenti quyidagicha funktsiya:

1. va'da bajarilganda ishlaydi va
2. natijani oladi.

`.then` ning ikkinchi argumenti:

1. va'da rad etilganda ishlaydi va
2. natijani oladi.

Masalan, muvaffaqiyatli hal qilingan va'daga munosabat:
=======
The first argument of `.then` is a function that runs when the promise is resolved, and receives the result.
=======
The first argument of `.then` is a function that runs when the promise is resolved and receives the result.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

The second argument of `.then` is a function that runs when the promise is rejected and receives the error.

For instance, here's a reaction to a successfully resolved promise:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

// .then ning birinchi funktsiyasini bajaradi
promise.then(
*!*
  result => alert(result), // "done!" ko'rsatiladi 1 soniyadan keyin
*/!*
  error => alert(error) // bajarilmaydi
);
```

Birinchi funktsiya bajarildi.

<<<<<<< HEAD
Va rad etish holatida - ikkinchisi:
=======
And in the case of a rejection, the second one:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// rad etish .then ning ikkinchi funktsiyasini bajaradi
promise.then(
  result => alert(result), // bajarilmaydi
*!*
  error => alert(error) // "Error: Whoops!" ko'rsatiladi 1 soniyadan keyin
*/!*
);
```

Agar bizni faqat muvaffaqiyatli bajarishlar qiziqtirsa, unda `.then` uchun bitta funktsiya argumentini taqdim etamiz:

```js run
let promise = new Promise(resolve => {
  setTimeout(() => resolve("done!"), 1000);
});

*!*
promise.then(alert); // "done!" ko'rsatiladi 1 soniyadan keyin
*/!*
```

### catch

Agar bizni faqat xatolar qiziqtiradigan bo'lsa, unda birinchi argument sifatida `null` dan foydalanishimiz mumkin: `.then(null, errorHandlingFunction)`. Yoki `.catch(errorHandlingFunction)` dan foydalanishimiz mumkin, bular bir xil:


```js run
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

*!*
// .catch(f) is the same as promise.then(null, f)
promise.catch(alert); // "Error: Whoops!" ko'rsatiladi 1 soniyadan keyin
*/!*
```

`.catch(f)` chaqiruvi `.then(null, f)` ning to'liq analogidir, bu shunchaki stenografiya.

## Cleanup: finally

Oddiy `try {...} catch {...}` da `finally` bandi bo'lgani kabi, va'da da ham `finally` bor.

<<<<<<< HEAD
<<<<<<< HEAD
`.finally(f)` chaqiruvi `.then(f, f)` ga o'xshaydi, chunki u har doim va'da bajarilganda ishlaydi: xoh qaror qabul qilinsin yoki rad etilsin.

`finally` tozalashni amalga oshirish uchun yaxshi ishlov beradi, masalan, bizning yuklash ko'rsatkichlarimizni to'xtatish, chunki natija qanday bo'lishidan qat'i nazar, endi ular kerak emas.
=======
The call `.finally(f)` is similar to `.then(f, f)` in the sense that `f` always runs when the promise is settled: be it resolve or reject.

`finally` is a good handler for performing cleanup, e.g. stopping our loading indicators, as they are not needed anymore, no matter what the outcome is.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Shunga o'xshash:

```js
new Promise((resolve, reject) => {
  /* vaqt talab qiladigan narsani qilish va keyin resolve/reject ni chaqirish */
=======
The call `.finally(f)` is similar to `.then(f, f)` in the sense that `f` runs always, when the promise is settled: be it resolve or reject.

The idea of `finally` is to set up a handler for performing cleanup/finalizing after the previous operations are complete.

E.g. stopping loading indicators, closing no longer needed connections, etc.

Think of it as a party finisher. Irresepective of whether a party was good or bad, how many friends were in it, we still need (or at least should) do a cleanup after it.

The code may look like this:

```js
new Promise((resolve, reject) => {
  /* do something that takes time, and then call resolve or maybe reject */
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
})
*!*
  // va'da qilinganidan keyin ishlaydi, muvaffaqiyatli yoki yo'q muhim emas
  .finally(() => stop loading indicator)
  // so the loading indicator is always stopped before we go on
*/!*
  .then(result => show result, err => show error)
```

<<<<<<< HEAD
<<<<<<< HEAD
Bu aniq taxallus emas. Bir nechta muhim farqlar mavjud:

1. `finally` ishlov beruvchida argumentlar yo'q. `finally` da biz va'da muvaffaqiyatli yoki yo'qligini bilmaymiz. Hammasi yaxshi, chunki bizning vazifamiz odatda "umumiy" yakunlovchi protseduralarni bajarishdir.
2. Nihoyat, natijalar va xatolar orqali keyingi ishlov beruvchiga o'tadi.
=======
That said, `finally(f)` isn't exactly an alias of `then(f,f)` though. There are few subtle differences:

1. A `finally` handler has no arguments. In `finally` we don't know whether the promise is successful or not. That's all right, as our task is usually to perform "general" finalizing procedures.
2. A `finally` handler passes through results and errors to the next handler.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

    Masalan, bu yerda natija `finally` dan `then` ga uzatiladi:
=======
Please note that `finally(f)` isn't exactly an alias of `then(f,f)` though.

There are important differences:

1. A `finally` handler has no arguments. In `finally` we don't know whether the promise is successful or not. That's all right, as our task is usually to perform "general" finalizing procedures.

    Please take a look at the example above: as you can see, the `finally` handler has no arguments, and the promise outcome is handled by the next handler.
2. A `finally` handler "passes through" the result or error to the next suitable handler.

    For instance, here the result is passed through `finally` to `then`:

>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
    ```js run
    new Promise((resolve, reject) => {
      setTimeout(() => resolve("value"), 2000);
    })
<<<<<<< HEAD
      .finally(() => alert("Promise ready"))
      .then(result => alert(result)); // <-- .then natijani boshqaradi
    ```

    Va bu yerda `finally` dan `catch` ga o'tgan va'dada xato bor:
=======
      .finally(() => alert("Promise ready")) // triggers first
      .then(result => alert(result)); // <-- .then shows "value"
    ```

    As you can see, the `value` returned by the first promise is passed through `finally` to the next `then`.

    That's very convenient, because `finally` is not meant to process a promise result. As said, it's a place to do generic cleanup, no matter what the outcome was.

    And here's an example of an error, for us to see how it's passed through `finally` to `catch`:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

    ```js run
    new Promise((resolve, reject) => {
      throw new Error("error");
    })
<<<<<<< HEAD
      .finally(() => alert("Promise ready"))
<<<<<<< HEAD
      .catch(err => alert(err));  // <-- .catch xato obyektini boshqaradi
    ```  

    Bu juda qulay, chunki "finally" va'da qilingan natijalarni qayta ishlashga mo'ljallanmagan. Shunday qilib, bu ulardan o'tib ketadi.

    Va'da zanjiri va ishlovchilar o'rtasida natijalarni uzatish haqida keyingi bobda gaplashamiz.

3. So'nggi, lekin eng muhimi, `.finally(f)` - `.then(f, f)` dan ko'ra qulayroq sintaksis: funktsiyani takrorlashning hojati yo'q.

````smart header="Qabul qilingan va'dalar bo'yicha ishlovchilar darhol ishlaydi"
Agar va'da kutilayotgan bo'lsa, `.then/catch/finally` ishlovchilar natijani kutishadi. Aks holda, agar va'da allaqachon o'rnatilgan bo'lsa, darhol bajaradilar:

```js run
// darhol hal qilingan va'da
=======
      .catch(err => alert(err));  // <-- .catch handles the error object
=======
      .finally(() => alert("Promise ready")) // triggers first
      .catch(err => alert(err));  // <-- .catch shows the error
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
    ```

3. A `finally` handler also shouldn't return anything. If it does, the returned value is silently ignored.

    The only exception to this rule is when a `finally` handler throws an error. Then this error goes to the next handler, instead of any previous outcome.

To summarize:

- A `finally` handler doesn't get the outcome of the previous handler (it has no arguments). This outcome is passed through instead, to the next suitable handler.
- If a `finally` handler returns something, it's ignored.
- When `finally` throws an error, then the execution goes to the nearest error handler.

These features are helpful and make things work just the right way if we use `finally` how it's supposed to be used: for generic cleanup procedures.

````smart header="We can attach handlers to settled promises"
If a promise is pending, `.then/catch/finally` handlers wait for its outcome.

Sometimes, it might be that a promise is already settled when we add a handler to it.

In such case, these handlers just run immediately:

```js run
// the promise becomes resolved immediately upon creation
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
let promise = new Promise(resolve => resolve("done!"));

promise.then(alert); // done! (hozir paydo bo'ladi)
```

<<<<<<< HEAD
Yaxshi tomoni shundaki, `.then` ishlov beruvchisi va'da vaqtni oladimi yoki darhol hal qiladimi, ishlashiga kafolat beradi.
````

Keling, va'dalar asinxron kod yozishda qanday yordam berishi haqida ko'proq amaliy misollarni ko'rib chiqamiz.

## Misol: loadScript
=======
Note that this makes promises more powerful than the real life "subscription list" scenario. If the singer has already released their song and then a person signs up on the subscription list, they probably won't receive that song. Subscriptions in real life must be done prior to the event.

Promises are more flexible. We can add handlers any time: if the result is already there, they just execute.
````

## Example: loadScript [#loadscript]
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

<<<<<<< HEAD
Oldingi bobdan skriptni yuklash uchun bizda `loadScript` funktsiyasi mavjud.
=======
Next, let's see more practical examples of how promises can help us write asynchronous code.

We've got the `loadScript` function for loading a script from the previous chapter.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

Shuni eslatish uchun chaqiruvni qayta tiklashga asoslangan variant:

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}
```

Keling, uni va'dalar yordamida qayta yozaylik.

`loadScript` yangi funktsiyasi qayta chaqiruvni talab qilmaydi. Buning o'rniga, u yuklash tugagandan so'ng hal qilinadigan "Promise" obyektini yaratadi va qaytaradi. Tashqi kod unga `.then` yordamida ishlov beruvchilarni (obuna funktsiyalarni) qo'shishi mumkin:

```js run
function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
<<<<<<< HEAD
    script.onerror = () => reject(new Error("Skriptni yuklashda xato: " + src));
=======
    script.onerror = () => reject(new Error(`Script load error for ${src}`));
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

    document.head.append(script);
  });
}
```

Foydalanish:

```js run
let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then(
  script => alert(`${script.src} yuklandi!`),
  error => alert(`Error: ${error.message}`)
);

<<<<<<< HEAD
promise.then(script => alert('Boshqa bir narsa qilish uchun yana bitta ishlov beruvchi!'));
=======
promise.then(script => alert('Another handler...'));
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

Qayta chaqiruvga asoslangan shablondan darhol bir nechta afzalliklarni ko'rishimiz mumkin:


| Promises | Callbacks |
|----------|-----------|
| Va'dalar bizni narsalarni tabiiy tartibda bajarishga imkon beradi. Birinchidan, biz `loadScript(script)` ni ishga tushiramiz va keyin `result` bilan nima qilishni yozamiz. | `LoadScript(script, callback)` ni chaqirishda bizda `callback` funktsiyasi bo'lishi kerak. Boshqacha qilib aytganda,  `loadScript` chaqirilishidan *oldin* natija bilan nima qilishni bilamiz. |
| Biz `.then` ni xohlagancha chaqirishimiz mumkin. Har safar biz "obuna ro'yxatiga" yangi "fanat", yangi obuna funktsiyasini qo'shmoqdamiz. Bu haqda keyingi bobda batafsil ma'lumot beramiz: [](info:promise-chaining). | Faqat bitta qayta chaqiruv bo'lishi mumkin. |

<<<<<<< HEAD
Shunday qilib, va'dalar bizga kod oqimini va moslashuvchanlikni beradi. Ammo yana ko'p narsalar mavjud. Buni keyingi boblarda ko'ramiz.
=======
So promises give us better code flow and flexibility. But there's more. We'll see that in the next chapters.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
