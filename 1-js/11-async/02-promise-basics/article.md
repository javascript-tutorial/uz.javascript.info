# Va'da

O'zingizni eng yaxshi qo'shiqchi deb tasavvur qiling va muxlislar kechayu kunduz yaqinlashib kelayotgan qo'shig'ingizni so'rashadi.

Biroz yengil tortish uchun, u nashr qilinganda, ularga yuborishga va'da berasiz. Siz muxlislaringizga yangilanishlar uchun obuna bo'lishlari mumkin bo'lgan ro'yxatni berasiz. Ular elektron pochta manzillarini to'ldirishlari mumkin, shunda qo'shiq paydo bo'lganda, obuna bo'lgan barcha partiyalar uni darhol qabul qilishadi. Hatto biron bir narsa noto'g'ri bo'lsa ham, aytaylik, agar qo'shiqni nashr etish rejalari bekor qilinsa, ular bundan xabardor bo'lishadi.

Har bir inson baxtlidir! Siz baxtlisiz, chunki siz endi muxlislar tomonidan ta'qib qilinmaysiz va muxlislar endi yangi qo'shiqni sog'inishdan tashvishlanmasligi mumkin.

Bu biz dasturlashda tez-tez uchraydigan narsalar uchun haqiqiy hayotdagi o'xshashlik:

1. Biror narsani qiladigan va vaqt talab qiladigan "ishlab chiqaruvchi kod". Masalan, kod masofaviy skriptni yuklaydi. Bu "qo'shiqchi".
2. Tayyor bo'lgandan keyin "ishlab chiqarish kodi" natijasini istaydigan "iste'mol kod". Ko'pgina funktsiyalar ushbu natijaga muhtoj bo'lishi mumkin. Bular "muxlislar".
3. *Va'da* - bu "ishlab chiqaruvchi kod" va "iste'molchi kodi" ni bir-biriga bog'laydigan maxsus JavaScript obyekti. Analogiya nuqtai nazaridan: bu "obuna ro'yxati". "Ishlab chiqarish kodi" va'da qilingan natijani olish uchun zarur bo'lgan har qanday vaqtni oladi va "va'da" ushbu natijani obuna bo'lgan barcha kodlarga tayyor bo'lgandan keyin taqdim etadi.

Analogiya juda aniq emas, chunki JavaScript-ning va'dalari oddiy obuna ro'yxatiga qaraganda ancha murakkab: ular qo'shimcha funktsiyalar va cheklovlarga ega. Ammo bu boshlashga yaxshidir.

Va'da obyekti uchun konstruktor sintaksisi:

```js
let promise = new Promise(function(resolve, reject) {
  // ijrochi (ishlab chiqaruvchi kod, "qo'shiqchi")
});
```

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

```js run
let promise = new Promise(function(resolve, reject) {
  // va'da tuzilganda funktsiya avtomatik ravishda bajariladi

  // 1 soniya ichida "bajarilgan" natija bilan ish bajarilganligi to'g'risida signal
  setTimeout(() => *!*resolve("done")*/!*, 1000);
});
```

Yuqoridagi kodni ishga tushirish orqali biz ikkita narsani ko'rishimiz mumkin:

1. Ijrochi avtomatik va darhol chaqiriladi ( `new Promise` tomonidan).
2. Ijrochi ikkita argumentni oladi: `resolve` va `reject` - bu funktsiyalar JavaScript interpretator tomonidan oldindan belgilanadi. Shunday qilib, biz ularni yaratishga hojat yo'q. Buning o'rniga biz tayyor bo'lgandan keyin ularni chaqirish uchun ijrochini yozishimiz kerak.

"Ishlov berish" ning bir soniyasidan so'ng ijrochi natija berish uchun `resolve("done")` ni chaqiradi:

![](promise-resolve-1.svg)

Bu ishni muvaffaqiyatli yakunlashning misoli, "bajarilgan va'da" edi.

Va endi ijrochining va'dani xato bilan rad etishiga misol:

```js
let promise = new Promise(function(resolve, reject) {
  // 1 soniya ish xato bilan tugaganligini bildirgan signaldan keyin
  setTimeout(() => *!*reject(new Error("Whoops!"))*/!*, 1000);
});
```

![](promise-reject-1.svg)

Xulosa qilib aytganda, ijrochi ishni bajarishi kerak (odatda vaqt talab qiladigan narsa), so'ngra tegishli "Promise" obyektining holatini o'zgartirish uchun `resolve` yoki `reject` ni chaqirish kerak.

Yo'q qilingan yoki rad qilingan va'da, "pending" va'dadan farqli o'laroq, "settled" deb nomlanadi.

````smart header="Faqat bitta natija yoki xato bo'lishi mumkin"
Ijrochi faqat bitta `resolve` yoki bitta `reject` ni chaqirishi kerak. Va'daning o'zgarishi yakuniy hisoblanadi.

Boshqa barcha `resolve` va `reject` chaqiruvlari inobatga olinmaydi:

```js
let promise = new Promise(function(resolve, reject) {
  resolve("done");

  reject(new Error("…")); // inobatga olinmaydi
  setTimeout(() => resolve("…")); // inobatga olinmaydi
});
```

G'oya shundan iboratki, ijrochi tomonidan bajarilgan ishda faqat bitta natija yoki xato bo'lishi mumkin.

Bundan tashqari,  `resolve`/`reject` faqat bitta argumentni kutadi (yoki yo'q) va qo'shimcha argumentlarni e'tiborsiz qoldiradi.
````

```smart header="`Error` obyektlari bilan rad etish"
Agar biror narsa noto'g'ri bo'lsa, biz `reject` ni har qanday argument turi bilan chaqiramiz (xuddi `resolve` singari). Ammo `Error` obyektlaridan (yoki `Error` dan meros bo'lib o'tgan obyektlardan) foydalanish tavsiya etiladi. Buning sababi tez orada aniq bo'ladi.
```

````smart header="Darhol chaqirish `resolve`/`reject`"
Amalda, ijrochi odatda biron bir narsani asinxron tarzda bajaradi va bir muncha vaqt o'tgach `resolve`/`reject` ni chaqiradi, ammo bunga majbur emas. Shuningdek, biz darhol `resolve` yoki `reject` ni chaqirishimiz mumkin:

```js
let promise = new Promise(function(resolve, reject) {
  // not taking our time to do the job
  resolve(123); // immediately give the result: 123
});
```

Masalan, bu ishni boshlashni boshlaganimizda, lekin keyin hamma narsa tugallanganligini ko'rganimizda yuz berishi mumkin.

Juda soz. Bizda darhol va'da hal qilingan, bunda hech qanday yomon narsa yo'q.
````

```smart header="`state` va `result` ichki"
"Promise" obyektining `state` va `result` ichki xususiyatlarga ega. Biz ularga "iste'mol kodimiz" dan to'g'ridan-to'g'ri kira olmaymiz. Buning uchun `.then`/`.catch`/`.finally` usullaridan foydalanishimiz mumkin. Ular quyida tavsiflangan.
```

## Iste'molchilar: then, catch, finally

"Promise" obyekti ijrochi ("ishlab chiqaruvchi kod" yoki "qo'shiqchi") bilan iste'molchi funktsiyalari ("muxlislar") o'rtasida bog'liqlik bo'lib xizmat qiladi, natijada natija yoki xato qabul qiladi. Iste'mol funktsiyalarini `.then`,`.catch` va `.finally` usullaridan foydalangan holda ro'yxatdan o'tkazish (obuna bo'lish) mumkin.

### then

Eng muhimi, asosiysi `.then`.

Sintaksis:

```js
promise.then(
  function(result) { *!*/* muvaffaqiyatli natijaga erishish */*/!* },
  function(error) { *!*/* xatoga yo'l qo'yish */*/!* }
);
```

`.then` ning birinchi argumenti quyidagicha funktsiya:

1. va'da bajarilganda ishlaydi va
2. natijani oladi.

`.then` ning ikkinchi argumenti:

1. va'da rad etilganda ishlaydi va
2. natijani oladi.

Masalan, muvaffaqiyatli hal qilingan va'daga munosabat:

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

Va rad etish holatida - ikkinchisi:

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

### finally

Oddiy `try {...} catch {...}` da `finally` bandi bo'lgani kabi, va'da da ham `finally` bor.

`.finally(f)` chaqiruvi `.then(f, f)` ga o'xshaydi, chunki u har doim va'da bajarilganda ishlaydi: xoh qaror qabul qilinsin yoki rad etilsin.

`finally` tozalashni amalga oshirish uchun yaxshi ishlov beradi, masalan, bizning yuklash ko'rsatkichlarimizni to'xtatish, chunki natija qanday bo'lishidan qat'i nazar, endi ular kerak emas.

Shunga o'xshash:

```js
new Promise((resolve, reject) => {
  /* vaqt talab qiladigan narsani qilish va keyin resolve/reject ni chaqirish */
})
*!*
  // va'da qilinganidan keyin ishlaydi, muvaffaqiyatli yoki yo'q muhim emas
  .finally(() => stop loading indicator)
*/!*
  .then(result => show result, err => show error)
```

Bu aniq taxallus emas. Bir nechta muhim farqlar mavjud:

1. `finally` ishlov beruvchida argumentlar yo'q. `finally` da biz va'da muvaffaqiyatli yoki yo'qligini bilmaymiz. Hammasi yaxshi, chunki bizning vazifamiz odatda "umumiy" yakunlovchi protseduralarni bajarishdir.
2. Nihoyat, natijalar va xatolar orqali keyingi ishlov beruvchiga o'tadi.

    Masalan, bu yerda natija `finally` dan `then` ga uzatiladi:
    ```js run
    new Promise((resolve, reject) => {
      setTimeout(() => resolve("result"), 2000)
    })
      .finally(() => alert("Promise ready"))
      .then(result => alert(result)); // <-- .then natijani boshqaradi
    ```

    Va bu yerda `finally` dan `catch` ga o'tgan va'dada xato bor:

    ```js run
    new Promise((resolve, reject) => {
      throw new Error("error");
    })
      .finally(() => alert("Promise ready"))
      .catch(err => alert(err));  // <-- .catch xato obyektini boshqaradi
    ```  

    Bu juda qulay, chunki "finally" va'da qilingan natijalarni qayta ishlashga mo'ljallanmagan. Shunday qilib, bu ulardan o'tib ketadi.

    Va'da zanjiri va ishlovchilar o'rtasida natijalarni uzatish haqida keyingi bobda gaplashamiz.

3. So'nggi, lekin eng muhimi, `.finally(f)` - `.then(f, f)` dan ko'ra qulayroq sintaksis: funktsiyani takrorlashning hojati yo'q.

````smart header="Qabul qilingan va'dalar bo'yicha ishlovchilar darhol ishlaydi"
Agar va'da kutilayotgan bo'lsa, `.then/catch/finally` ishlovchilar natijani kutishadi. Aks holda, agar va'da allaqachon o'rnatilgan bo'lsa, darhol bajaradilar:

```js run
// darhol hal qilingan va'da
let promise = new Promise(resolve => resolve("done!"));

promise.then(alert); // done! (hozir paydo bo'ladi)
```

Yaxshi tomoni shundaki, `.then` ishlov beruvchisi va'da vaqtni oladimi yoki darhol hal qiladimi, ishlashiga kafolat beradi.
````

Keling, va'dalar asinxron kod yozishda qanday yordam berishi haqida ko'proq amaliy misollarni ko'rib chiqamiz.

## Misol: loadScript

Oldingi bobdan skriptni yuklash uchun bizda `loadScript` funktsiyasi mavjud.

Shuni eslatish uchun chaqiruvni qayta tiklashga asoslangan variant:

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error ` + src));

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
    script.onerror = () => reject(new Error("Skriptni yuklashda xato: " + src));

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

promise.then(script => alert('Boshqa bir narsa qilish uchun yana bitta ishlov beruvchi!'));
```

Qayta chaqiruvga asoslangan shablondan darhol bir nechta afzalliklarni ko'rishimiz mumkin:


| Promises | Callbacks |
|----------|-----------|
| Va'dalar bizni narsalarni tabiiy tartibda bajarishga imkon beradi. Birinchidan, biz `loadScript(script)` ni ishga tushiramiz va keyin `result` bilan nima qilishni yozamiz. | `LoadScript(script, callback)` ni chaqirishda bizda `callback` funktsiyasi bo'lishi kerak. Boshqacha qilib aytganda,  `loadScript` chaqirilishidan *oldin* natija bilan nima qilishni bilamiz. |
| Biz `.then` ni xohlagancha chaqirishimiz mumkin. Har safar biz "obuna ro'yxatiga" yangi "fanat", yangi obuna funktsiyasini qo'shmoqdamiz. Bu haqda keyingi bobda batafsil ma'lumot beramiz: [](info:promise-chaining). | Faqat bitta qayta chaqiruv bo'lishi mumkin. |

Shunday qilib, va'dalar bizga kod oqimini va moslashuvchanlikni beradi. Ammo yana ko'p narsalar mavjud. Buni keyingi boblarda ko'ramiz.
