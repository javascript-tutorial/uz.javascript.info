# Promise API

<<<<<<< HEAD
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
=======
There are 6 static methods in the `Promise` class. We'll quickly cover their use cases here.

## Promise.all

Let's say we want many promises to execute in parallel and wait until all of them are ready.

For instance, download several URLs in parallel and process the content once they are all done.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

`Promise.all` shu uchundir.

Sintaksis:

```js
let promise = Promise.all([...promises...]);
```

<<<<<<< HEAD
Bu bir massiv va'dalarni talab qiladi (texnik jihatdan har qanday ketma-ket saraluvchanlar mumkin, lekin odatda massiv) va yangi va'dani qaytaradi.

Barcha berilgan va'dalar bajarilganda va ularning natijalari massivida yangi va'da hal etiladi.
=======
`Promise.all` takes an array of promises (it technically can be any iterable, but is usually an array) and returns a new promise.

<<<<<<< HEAD
The new promise resolves when all listed promises are settled, and the array of their results becomes its result.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
The new promise resolves when all listed promises are resolved, and the array of their results becomes its result.
>>>>>>> 6989312841d843f2350803ab552d9082437be569

Masalan, quyidagi `Promise.all` 3 soniyadan keyin o'rnatiladi va natijada `[1, 2, 3]` massivi hosil bo'ladi:

```js run
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 1,2,3 va'dalar tayyor bo'lganda: har bir va'da massiv a'zosiga yordam beradi
```

<<<<<<< HEAD
Iltimos, nisbiy buyurtma bir xil ekanligini unutmang. Garchi birinchi va'dani hal qilish uchun eng uzoq vaqt kerak bo'lsa ham, natijalar massivida u baribir birinchi o'rinda turadi.
=======
Please note that the order of the resulting array members is the same as in its source promises. Even though the first promise takes the longest time to resolve, it's still first in the array of results.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Oddiy hiyla-nayrang - bu ish haqidagi ma'lumotlar to'plamini va'dalar massiviga solishtirish va keyin ularni `Promise.all` ga o'rash.

Masalan, agar bizda bir qator URL-lar bo'lsa, biz ularning hammasini quyidagi tarzda olishimiz mumkin:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

<<<<<<< HEAD
// va'da berish uchun har bir urlni xaritalash (github url)
=======
// map every url to the promise of the fetch
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
let requests = urls.map(url => fetch(url));

// Promise.all barcha ish joylari hal bo'lguncha kutadi
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

<<<<<<< HEAD
Github foydalanuvchilari massivi uchun foydalanuvchi ma'lumotlarini o'z nomlari bilan olish bilan haqiqiy hayotiy misol (yoki biz ularning identifikatorlari bo'yicha bir massiv tovarlarni olib kelishimiz mumkin, mantiq bir xil):
=======
A bigger example with fetching user information for an array of GitHub users by their names (we could fetch an array of goods by their ids, the logic is identical):
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
<<<<<<< HEAD
    // barcha javoblar tayyor, biz HTTP holat kodlarini ko'rsatishimiz mumkin
=======
    // all responses are resolved successfully
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // har bir url uchun 200 ko'rsatadi
    }

    return responses;
  })
<<<<<<< HEAD
  // Ularning tarkibini o'qish uchun javoblar massivini response.json() massiviga solishtiring
=======
  // map array of responses into an array of response.json() to read their content
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  .then(responses => Promise.all(responses.map(r => r.json())))
  // barcha JSON javoblari tahlil qilinadi: "foydalanuvchilar" ularning massividir
  .then(users => users.forEach(user => alert(user.name)));
```

<<<<<<< HEAD
Agar va'dalarning birortasi rad etilsa, `Promise.all` darhol shu xato bilan rad etadi.
=======
**If any of the promises is rejected, the promise returned by `Promise.all` immediately rejects with that error.**
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
Bu yerda ikkinchi va'da ikki soniyada rad etadi. Bu `Promise.all` ni darhol rad etishga olib keladi, shuning uchun `.catch` bajaradi: rad etish xatosi butun `Promise.all` natijasiga aylanadi.

Muhim tafsilot shundaki, va'dalar ularning bajarilishini "bekor qilish" uchun hech qanday imkoniyat bermaydi. Shunday qilib, boshqa va'dalar amalga oshirishda davom etadi, so'ngra oxiriga yetkaziladi, ammo ularning barcha natijalari inobatga olinmaydi.

Bunga yo'l qo'ymaslik uchun usullar mavjud: xatolar yuz berganda va'dalarni `clearTimeout` ga qo'shimcha kod yozishimiz (yoki boshqa usul bilan bekor qilishimiz) yoki xatolar natijasida hosil bo'lgan massiv tarkibiga kirishi mumkin (ushbu bob ostidagi vazifaga qarang bu haqida).

````smart header="`Promise.all(...)` va'da bermaydigan narsalarga ruxsat beradi `iterable`"
Odatda, `Promise.all(...)` ketma-ket saraluvchan (ko'p hollarda massiv) va'dalarni qabul qiladi. Ammo ushbu obyektlardan birortasi va'da bermasa, u `Promise.resolve` ga o'ralgan.
=======
Here the second promise rejects in two seconds. That leads to an immediate rejection of `Promise.all`, so `.catch` executes: the rejection error becomes the outcome of the entire `Promise.all`.

```warn header="In case of an error, other promises are ignored"
If one promise rejects, `Promise.all` immediately rejects, completely forgetting about the other ones in the list. Their results are ignored.

For example, if there are multiple `fetch` calls, like in the example above, and one fails, the others will still continue to execute, but `Promise.all` won't watch them anymore. They will probably settle, but their results will be ignored.

`Promise.all` does nothing to cancel them, as there's no concept of "cancellation" in promises. In [another chapter](info:fetch-abort) we'll cover `AbortController` that can help with that, but it's not a part of the Promise API.
```

````smart header="`Promise.all(iterable)` allows non-promise \"regular\" values in `iterable`"
Normally, `Promise.all(...)` accepts an iterable (in most cases an array) of promises. But if any of those objects is not a promise, it's passed to the resulting array "as is".
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Masalan, natijalar `[1, 2, 3]`:

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
<<<<<<< HEAD
  2, // Promise.resolve(2) kabi muomala qilingan
  3  // Promise.resolve(3) kabi muomala qilingan
]).then(alert); // 1, 2, 3
```

Shunday qilib, biz va'da qilmaydigan qiymatlarni `Promise.all` ga qulay bo'lgan joyda o'tkaza olamiz.

=======
  2,
  3
]).then(alert); // 1, 2, 3
```

So we are able to pass ready values to `Promise.all` where convenient.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
````

## Promise.allSettled

[recent browser="new"]

`Promise.all` rejects as a whole if any promise rejects. That's good for "all or nothing" cases, when we need *all* results successful to proceed:

```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
]).then(render); // render method needs results of all fetches
```

`Promise.allSettled` just waits for all promises to settle, regardless of the result. The resulting array has:

- `{status:"fulfilled", value:result}` for successful responses,
- `{status:"rejected", reason:error}` for errors.

For example, we'd like to fetch the information about multiple users. Even if one request fails, we're still interested in the others.

Let's use `Promise.allSettled`:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => { // (*)
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
    });
  });
```

The `results` in the line `(*)` above will be:
```js
[
  {status: 'fulfilled', value: ...response...},
  {status: 'fulfilled', value: ...response...},
  {status: 'rejected', reason: ...error object...}
]
```

So for each promise we get its status and `value/error`.

### Polyfill

If the browser doesn't support `Promise.allSettled`, it's easy to polyfill:

```js
if (!Promise.allSettled) {
  const rejectHandler = reason => ({ status: 'rejected', reason });

  const resolveHandler = value => ({ status: 'fulfilled', value });

  Promise.allSettled = function (promises) {
    const convertedPromises = promises.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler));
    return Promise.all(convertedPromises);
  };
}
```

In this code, `promises.map` takes input values, turns them into promises (just in case a non-promise was passed) with `p => Promise.resolve(p)`, and then adds `.then` handler to every one.

That handler turns a successful result `value` into `{status:'fulfilled', value}`, and an error `reason` into `{status:'rejected', reason}`. That's exactly the format of `Promise.allSettled`.

Now we can use `Promise.allSettled` to get the results of *all* given promises, even if some of them reject.

## Promise.race

<<<<<<< HEAD
`Promise.all` ga o'xshash, bu takrorlanadigan va'dalarni talab qiladi, ammo ularning hammasi tugashini kutish o'rniga, birinchi natijani (yoki xato) kutib, kegin davom etadi.
=======
Similar to `Promise.all`, but waits only for the first settled promise and gets its result (or error).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
Shunday qilib, birinchi natija/xato butun `Promise.race` natijasiga aylanadi. Birinchi kelishilgan va'dadan keyin "musobaqada g'olib chiqadi", barcha boshqa natijalar/xatolar hisobga olinmaydi.
=======
The first promise here was fastest, so it became the result. After the first settled promise "wins the race", all further results/errors are ignored.


## Promise.any

Similar to `Promise.race`, but waits only for the first fulfilled promise and gets its result. If all of the given promises are rejected, then the returned promise is rejected with [`AggregateError`](mdn:js/AggregateError) - a special error object that stores all promise errors in its `errors` property.

The syntax is:

```js
let promise = Promise.any(iterable);
```

For instance, here the result will be `1`:

```js run
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

The first promise here was fastest, but it was rejected, so the second promise became the result. After the first fulfilled promise "wins the race", all further results are ignored.

Here's an example when all promises fail:

```js run
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error!")), 2000))
]).catch(error => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ouch!
  console.log(error.errors[1]); // Error: Error
});
```

As you can see, error objects for failed promises are available in the `errors` property of the `AggregateError` object.

## Promise.resolve/reject

Methods `Promise.resolve` and `Promise.reject` are rarely needed in modern code, because `async/await` syntax (we'll cover it [a bit later](info:async-await)) makes them somewhat obsolete.

We cover them here for completeness and for those who can't use `async/await` for some reason.

### Promise.resolve

`Promise.resolve(value)` creates a resolved promise with the result `value`.

Same as:

```js
let promise = new Promise(resolve => resolve(value));
```

The method is used for compatibility, when a function is expected to return a promise.

For example, the `loadCached` function below fetches a URL and remembers (caches) its content. For future calls with the same URL it immediately gets the previous content from cache, but uses `Promise.resolve` to make a promise of it, so the returned value is always a promise:

```js
let cache = new Map();

function loadCached(url) {
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

We can write `loadCached(url).then(…)`, because the function is guaranteed to return a promise. We can always use `.then` after `loadCached`. That's the purpose of `Promise.resolve` in the line `(*)`.

### Promise.reject

`Promise.reject(error)` creates a rejected promise with `error`.

Same as:

```js
let promise = new Promise((resolve, reject) => reject(error));
```

In practice, this method is almost never used.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Xulosa

<<<<<<< HEAD
`Promise` klassining 4 ta statik usuli mavjud:

1. `Promise.resolve(value)` -- berilgan qiymat bilan hal qilingan va'da yaratadi.
2. `Promise.reject(error)` -- berilgan xato bilan rad qilingan va'da yaratadi.
3. `Promise.all(promises)` -- barcha va'dalar yechilishini kutadi va natijalarining bir massivini qaytaradi. Agar berilgan va'dalarning birortasi rad etsa, bu `Promise.all` xatosiga aylanadi va boshqa natijalar e'tiborga olinmaydi.
4. `Promise.race(promises)` -- birinchi va'daning bajarilishini kutadi va uning natijasi/xatosi natijaga aylanadi.

Ushbu to'rttadan `Promise.all` amalda eng keng tarqalgan.
=======
There are 6 static methods of `Promise` class:

1. `Promise.all(promises)` -- waits for all promises to resolve and returns an array of their results. If any of the given promises rejects, it becomes the error of `Promise.all`, and all other results are ignored.
2. `Promise.allSettled(promises)` (recently added method) -- waits for all promises to settle and returns their results as an array of objects with:
    - `status`: `"fulfilled"` or `"rejected"`
    - `value` (if fulfilled) or `reason` (if rejected).
3. `Promise.race(promises)` -- waits for the first promise to settle, and its result/error becomes the outcome.
4. `Promise.any(promises)` (recently added method) -- waits for the first promise to fulfill, and its result becomes the outcome. If all of the given promises are rejected, [`AggregateError`](mdn:js/AggregateError) becomes the error of `Promise.any`.
5. `Promise.resolve(value)` -- makes a resolved promise with the given value.
6. `Promise.reject(error)` -- makes a rejected promise with the given error.

Of all these, `Promise.all` is probably the most common in practice.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
