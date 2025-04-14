# Promisifikatsiya

<<<<<<< HEAD
Promisifikatsiya -- oddiy o'zgarish uchun uzun so'z. Qayta chaqiruvni qabul qiladigan funktsiyani va'da beradigan funktsiyaga aylantirish.

Boshqacha qilib aytganda, biz xuddi shu narsani bajaradigan, asl nusxasini ichki sifatida chaqiradigan, lekin va'da qaytaradigan funktsiyani yaratamiz.

Bunday o'zgartirishlar ko'pincha hayotda kerak bo'ladi, chunki ko'plab funktsiyalar va kutubxonalar qayta chaqiruvga asoslangan. Ammo va'dalar yanada qulayroq. Shunday qilib, ularni va'da qilish mantiqan.
=======
"Promisification" is a long word for a simple transformation. It's the conversion of a function that accepts a callback into a function that returns a promise.

Such transformations are often required in real-life, as many functions and libraries are callback-based. But promises are more convenient, so it makes sense to promisify them.

For better understanding, let's see an example.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Masalan, bizda <info:callbacks> bo'limidan `loadScript(src, callback)` mavjud.

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

// usage:
// loadScript('path/script.js', (err, script) => {...})
```

<<<<<<< HEAD
Keling, buni va'da qilaylik. Yangi `loadScriptPromise(src)` funktsiyasi ham xuddi shunday qiladi, lekin faqat `src` ni qabul qiladi (qayta chaqiruv qilinmaydi) va va'da qaytaradi.
=======
The function loads a script with the given `src`, and then calls `callback(err)` in case of an error, or `callback(null, script)` in case of successful loading. That's a widespread agreement for using callbacks, we saw it before.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Let's promisify it.

We'll make a new function `loadScriptPromise(src)`, that does the same (loads the script), but returns a promise instead of using callbacks.

In other words, we pass it only `src` (no `callback`) and get a promise in return, that resolves with `script` when the load is successful, and rejects with the error otherwise.

Here it is:
```js
let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  });
};

// usage:
// loadScriptPromise('path/script.js').then(...)
```

<<<<<<< HEAD
Endi `loadScriptPromise` bizning va'damizga asoslangan kodga mos keladi.

Ko'rib turganimizdek, u barcha ishni asl `loadScript` - ga topshiradi va `resolve/reject` va'dasini tarjima qiladigan o'z chaqiruvini qaytaradi.

Ko'p funktsiyalarni va'da qilishimiz kerak bo'lishi mumkinligi sababli, yordamchidan foydalanish mantiqan to'g'ri keladi.

Bu aslida juda oddiy -- `promisify(f)` quyida va'da berish uchun `f` funktsiyasini oladi va o'rash funktsiyasini qaytaradi.

Ushbu o'ram yuqoridagi kodda bo'lgani kabi ishlaydi: va'dani qaytaradi va chaqiruvni asl holatiga qaytaradi, natijada maxsus qayta chaqiruv natijasini kuzatadi:

```js
function promisify(f) {
  return function (...args) { // o'ram funktsiyasini qaytaradi
    return new Promise((resolve, reject) => {
      function callback(err, result) { //
=======
As we can see, the new function is a wrapper around the original `loadScript` function. It calls it providing its own callback that translates to promise `resolve/reject`.

Now `loadScriptPromise` fits well in promise-based code. If we like promises more than callbacks (and soon we'll see more reasons for that), then we will use it instead.

In practice we may need to promisify more than one function, so it makes sense to use a helper.

We'll call it `promisify(f)`: it accepts a to-promisify function `f` and returns a wrapper function.

```js
function promisify(f) {
  return function (...args) { // return a wrapper-function (*)
    return new Promise((resolve, reject) => {
      function callback(err, result) { // our custom callback for f (**)
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

<<<<<<< HEAD
      args.push(callback); // argumentlar oxiriga qadar bizning maxsus qayta chaqiruvni qo'shing
=======
      args.push(callback); // append our custom callback to the end of f arguments
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

      f.call(this, ...args); // asl funktsiyani chaqiring
    });
  };
}

// Foydalanish:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

<<<<<<< HEAD
Bu yerda biz asl funktsiya ikkita argumentli qayta chaqiruvni kutadi deb o'ylaymiz `(err, result)`. Biz tez-tez duch keladigan narsa. Keyin bizning odatiy qaytchaqiruv qilishimiz to'g'ri formatga ega va `promisify` bunday holat uchun juda yaxshi ishlaydi.

Ammo asl `f` `callback(err, res1, res2)` ni ko'proq argumentlar bilan qayta chaqirishni kutsa nima bo'ladi?

Ko'p sonli qayta chaqiruv natijalarini qaytaradigan `promisify` modifikatsiyasi:
=======
The code may look a bit complex, but it's essentially the same that we wrote above, while promisifying `loadScript` function.

A call to `promisify(f)` returns a wrapper around `f` `(*)`. That wrapper returns a promise and forwards the call to the original `f`, tracking the result in the custom callback `(**)`.

Here, `promisify` assumes that the original function expects a callback with exactly two arguments `(err, result)`. That's what we encounter most often. Then our custom callback is in exactly the right format, and `promisify` works great for such a case.

But what if the original `f` expects a callback with more arguments `callback(err, res1, res2, ...)`?

We can improve our helper. Let's make a more advanced version of `promisify`.

- When called as `promisify(f)` it should work similar to the version above.
- When called as `promisify(f, true)`, it should return the promise that resolves with the array of callback results. That's exactly for callbacks with many arguments.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
// promisify(f, true) natijalar massivini olish uchun
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function *!*callback(err, ...results*/!*) { //  bizning odatiy callback f uchun
        if (err) {
          reject(err);
        } else {
          // manyArgs ko'rsatilgan bo'lsa, barcha callback natijalari bilan hal qiling
          *!*resolve(manyArgs ? results : results[0]);*/!*
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
}

// Foydalanish:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...);
```

<<<<<<< HEAD
Ba'zi hollarda, `err` umuman yo'q bo'lishi mumkin: `callback(result)`, yoki qayta chaqiruv qilish formatida ekzotik narsa bo'lsa, biz bunday funktsiyalarni qo'lda va'da qila olamiz.
=======
As you can see it's essentially the same as above, but `resolve` is called with only one or all arguments depending on whether `manyArgs` is truthy.

For more exotic callback formats, like those without `err` at all: `callback(result)`, we can promisify such functions manually without using the helper.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Promisifikatsiya funktsiyalaridan biroz moslashuvchan bo'lgan modullar ham mavjud, masalan, [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify). Node.js-da buning uchun o'rnatilgan `util.promisify` funktsiyasi mavjud.

```smart
<<<<<<< HEAD
Promisifikatsiya - bu ajoyib yondashuv, ayniqsa `async/await` dan foydalanganda (keyingi bobga qarang), ammo qayta chaqiruvlarni to'liq almashtirish emas.
=======
Promisification is a great approach, especially when you use `async/await` (covered later in the chapter <info:async-await>), but not a total replacement for callbacks.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Yodda tuting, va'da faqat bitta natijaga ega bo'lishi mumkin, ammo texnik qayta chaqiruv ko'p marta chaqirilishi mumkin.

Shunday qilib, promisifikatsiya faqat qayta chaqiruvni chaqiradigan funktsiyalar uchun mo'ljallangan. Boshqa chaqiruvlar e'tiborga olinmaydi.
```
