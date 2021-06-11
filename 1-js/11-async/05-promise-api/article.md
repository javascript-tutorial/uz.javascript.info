# Promise API

`Promise` klassida 4 ta statik usul mavjud. Bu yerda ulardan foydalanish holatlarini tezda ko'rib chiqamiz.

## Promise.resolve

Sintaksis:

```js
let promise = Promise.resolve(value);
```

Berilgan `value` bilan hal qilingan va'dani qaytaradi.

Bilan bir xil:

```js
let promise = new Promise(resolve => resolve(value));
```

Usul bizda allaqachon qiymatga ega bo'lganda qo'llaniladi, lekin uni va'da ichiga "o'ralgan" qilishni xohlaymiz.

Masalan, quyida joylashgan `loadCached` funktsiyasi `url` ni oladi va natijani eslab qoladi, shunda kelajakdagi bir xil URL manzilidagi chaqiruvlar uni darhol qaytaradi:

```js
function loadCached(url) {
  let cache = loadCached.cache || (loadCached.cache = new Map());

  if (cache.has(url)) {
*!*
    return Promise.resolve(cache.get(url)); // (*)
*/!*
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
```

Biz `loadCached(url).then(...)` dan foydalanishimiz mumkin, chunki funktsiya va'da berishiga kafolat beradi. `Promise.resolve` maqsadi `(*)` satrida xizmat qiladi: bu interfeys birlashtirilganligiga ishonch hosil qiladi. `loadCached` dan keyin har doim `.then` dan foydalanishimiz mumkin.

## Promise.reject

Sintaksis:

```js
let promise = Promise.reject(error);
```

Rad etilgan va'dani `error` bilan yarating.

Bilan bir xil:

```js
let promise = new Promise((resolve, reject) => reject(error));
```

To'liqligi uchun biz bu yerda qamrab olamiz, kamdan-kam hollarda haqiqiy kodda ishlatiladi.

## Promise.all

Parallel ravishda bajarish uchun ko'plab va'dalarni berishni va ularning barchasi tayyor bo'lguncha kutishni xohlaymiz deylik.

Masalan, bir nechta URL-larni parallel ravishda yuklab oling va barchasi tugagandan so'ng tarkibni bajaring.

`Promise.all` shu uchundir.

Sintaksis:

```js
let promise = Promise.all([...promises...]);
```

Bu bir massiv va'dalarni talab qiladi (texnik jihatdan har qanday ketma-ket saraluvchanlar mumkin, lekin odatda massiv) va yangi va'dani qaytaradi.

Barcha berilgan va'dalar bajarilganda va ularning natijalari massivida yangi va'da hal etiladi.

Masalan, quyidagi `Promise.all` 3 soniyadan keyin o'rnatiladi va natijada `[1, 2, 3]` massivi hosil bo'ladi:

```js run
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 1,2,3 va'dalar tayyor bo'lganda: har bir va'da massiv a'zosiga yordam beradi
```

Iltimos, nisbiy buyurtma bir xil ekanligini unutmang. Garchi birinchi va'dani hal qilish uchun eng uzoq vaqt kerak bo'lsa ham, natijalar massivida u baribir birinchi o'rinda turadi.

Oddiy hiyla-nayrang - bu ish haqidagi ma'lumotlar to'plamini va'dalar massiviga solishtirish va keyin ularni `Promise.all` ga o'rash.

Masalan, agar bizda bir qator URL-lar bo'lsa, biz ularning hammasini quyidagi tarzda olishimiz mumkin:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// va'da berish uchun har bir urlni xaritalash (github url)
let requests = urls.map(url => fetch(url));

// Promise.all barcha ish joylari hal bo'lguncha kutadi
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

Github foydalanuvchilari massivi uchun foydalanuvchi ma'lumotlarini o'z nomlari bilan olish bilan haqiqiy hayotiy misol (yoki biz ularning identifikatorlari bo'yicha bir massiv tovarlarni olib kelishimiz mumkin, mantiq bir xil):

```js run
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // barcha javoblar tayyor, biz HTTP holat kodlarini ko'rsatishimiz mumkin
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // har bir url uchun 200 ko'rsatadi
    }

    return responses;
  })
  // Ularning tarkibini o'qish uchun javoblar massivini response.json() massiviga solishtiring
  .then(responses => Promise.all(responses.map(r => r.json())))
  // barcha JSON javoblari tahlil qilinadi: "foydalanuvchilar" ularning massividir
  .then(users => users.forEach(user => alert(user.name)));
```

Agar va'dalarning birortasi rad etilsa, `Promise.all` darhol shu xato bilan rad etadi.

Masalan:

```js run
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
*!*
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
*/!*
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: Whoops!
```

Bu yerda ikkinchi va'da ikki soniyada rad etadi. Bu `Promise.all` ni darhol rad etishga olib keladi, shuning uchun `.catch` bajaradi: rad etish xatosi butun `Promise.all` natijasiga aylanadi.

Muhim tafsilot shundaki, va'dalar ularning bajarilishini "bekor qilish" uchun hech qanday imkoniyat bermaydi. Shunday qilib, boshqa va'dalar amalga oshirishda davom etadi, so'ngra oxiriga yetkaziladi, ammo ularning barcha natijalari inobatga olinmaydi.

Bunga yo'l qo'ymaslik uchun usullar mavjud: xatolar yuz berganda va'dalarni `clearTimeout` ga qo'shimcha kod yozishimiz (yoki boshqa usul bilan bekor qilishimiz) yoki xatolar natijasida hosil bo'lgan massiv tarkibiga kirishi mumkin (ushbu bob ostidagi vazifaga qarang bu haqida).

````smart header="`Promise.all(...)` va'da bermaydigan narsalarga ruxsat beradi `iterable`"
Odatda, `Promise.all(...)` ketma-ket saraluvchan (ko'p hollarda massiv) va'dalarni qabul qiladi. Ammo ushbu obyektlardan birortasi va'da bermasa, u `Promise.resolve` ga o'ralgan.

Masalan, natijalar `[1, 2, 3]`:

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2, // Promise.resolve(2) kabi muomala qilingan
  3  // Promise.resolve(3) kabi muomala qilingan
]).then(alert); // 1, 2, 3
```

Shunday qilib, biz va'da qilmaydigan qiymatlarni `Promise.all` ga qulay bo'lgan joyda o'tkaza olamiz.

````

## Promise.race

`Promise.all` ga o'xshash, bu takrorlanadigan va'dalarni talab qiladi, ammo ularning hammasi tugashini kutish o'rniga, birinchi natijani (yoki xato) kutib, kegin davom etadi.

Sintaksis:

```js
let promise = Promise.race(iterable);
```

Masalan, bu yerda natija `1` bo'ladi:

```js run
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

Shunday qilib, birinchi natija/xato butun `Promise.race` natijasiga aylanadi. Birinchi kelishilgan va'dadan keyin "musobaqada g'olib chiqadi", barcha boshqa natijalar/xatolar hisobga olinmaydi.

## Xulosa

`Promise` klassining 4 ta statik usuli mavjud:

1. `Promise.resolve(value)` -- berilgan qiymat bilan hal qilingan va'da yaratadi.
2. `Promise.reject(error)` -- berilgan xato bilan rad qilingan va'da yaratadi.
3. `Promise.all(promises)` -- barcha va'dalar yechilishini kutadi va natijalarining bir massivini qaytaradi. Agar berilgan va'dalarning birortasi rad etsa, bu `Promise.all` xatosiga aylanadi va boshqa natijalar e'tiborga olinmaydi.
4. `Promise.race(promises)` -- birinchi va'daning bajarilishini kutadi va uning natijasi/xatosi natijaga aylanadi.

Ushbu to'rttadan `Promise.all` amalda eng keng tarqalgan.
