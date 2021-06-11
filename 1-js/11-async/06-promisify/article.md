# Promisifikatsiya

Promisifikatsiya -- oddiy o'zgarish uchun uzun so'z. Qayta chaqiruvni qabul qiladigan funktsiyani va'da beradigan funktsiyaga aylantirish.

Boshqacha qilib aytganda, biz xuddi shu narsani bajaradigan, asl nusxasini ichki sifatida chaqiradigan, lekin va'da qaytaradigan funktsiyani yaratamiz.

Bunday o'zgartirishlar ko'pincha hayotda kerak bo'ladi, chunki ko'plab funktsiyalar va kutubxonalar qayta chaqiruvga asoslangan. Ammo va'dalar yanada qulayroq. Shunday qilib, ularni va'da qilish mantiqan.

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

Keling, buni va'da qilaylik. Yangi `loadScriptPromise(src)` funktsiyasi ham xuddi shunday qiladi, lekin faqat `src` ni qabul qiladi (qayta chaqiruv qilinmaydi) va va'da qaytaradi.

```js
let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err)
      else resolve(script);
    });
  })
}

// usage:
// loadScriptPromise('path/script.js').then(...)
```

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
        if (err) {
          return reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // argumentlar oxiriga qadar bizning maxsus qayta chaqiruvni qo'shing

      f.call(this, ...args); // asl funktsiyani chaqiring
    });
  };
};

// Foydalanish:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

Bu yerda biz asl funktsiya ikkita argumentli qayta chaqiruvni kutadi deb o'ylaymiz `(err, result)`. Biz tez-tez duch keladigan narsa. Keyin bizning odatiy qaytchaqiruv qilishimiz to'g'ri formatga ega va `promisify` bunday holat uchun juda yaxshi ishlaydi.

Ammo asl `f` `callback(err, res1, res2)` ni ko'proq argumentlar bilan qayta chaqirishni kutsa nima bo'ladi?

Ko'p sonli qayta chaqiruv natijalarini qaytaradigan `promisify` modifikatsiyasi:

```js
// promisify(f, true) natijalar massivini olish uchun
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function *!*callback(err, ...results*/!*) { //  bizning odatiy callback f uchun
        if (err) {
          return reject(err);
        } else {
          // manyArgs ko'rsatilgan bo'lsa, barcha callback natijalari bilan hal qiling
          *!*resolve(manyArgs ? results : results[0]);*/!*
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
};

// Foydalanish:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...)
```

Ba'zi hollarda, `err` umuman yo'q bo'lishi mumkin: `callback(result)`, yoki qayta chaqiruv qilish formatida ekzotik narsa bo'lsa, biz bunday funktsiyalarni qo'lda va'da qila olamiz.

Promisifikatsiya funktsiyalaridan biroz moslashuvchan bo'lgan modullar ham mavjud, masalan, [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify). Node.js-da buning uchun o'rnatilgan `util.promisify` funktsiyasi mavjud.

```smart
Promisifikatsiya - bu ajoyib yondashuv, ayniqsa `async/await` dan foydalanganda (keyingi bobga qarang), ammo qayta chaqiruvlarni to'liq almashtirish emas.

Yodda tuting, va'da faqat bitta natijaga ega bo'lishi mumkin, ammo texnik qayta chaqiruv ko'p marta chaqirilishi mumkin.

Shunday qilib, promisifikatsiya faqat qayta chaqiruvni chaqiradigan funktsiyalar uchun mo'ljallangan. Boshqa chaqiruvlar e'tiborga olinmaydi.
```
