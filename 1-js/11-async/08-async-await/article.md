# Async/await

Va'dalar bilan ishlash uchun `async/await` deb nomlangan maxsus sintaksis mavjud. Buni tushunish va ishlatish hayratlanarli darajada oson.

## Async funktsiyalari

`Async` kalit so'zidan boshlaymiz. Uni quyidagi funktsiyadan oldin qo'yish mumkin:

```js
async function f() {
  return 1;
}
```

<<<<<<< HEAD
"Async" so'zi funktsiyadan oldin bitta oddiy narsani anglatadi: funktsiya har doim va'da qaytaradi. Agar funktsiya haqiqatan ham va'da bermaydigan qiymatni qaytarsa ham, funktsiya ta'rifini "async" kalit so'zi bilan oldindan belgilash JavaScript-ni ushbu qiymatni hal qilingan va'da bilan avtomatik ravishda o'rashga yo'naltiradi.

Masalan, yuqoridagi kod `1` natijasi bilan yechilgan va'dani qaytaradi, keling uni sinab ko'raylik:
=======
The word "async" before a function means one simple thing: a function always returns a promise. Other values are wrapped in a resolved promise automatically.

For instance, this function returns a resolved promise with the result of `1`; let's test it:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
async function f() {
  return 1;
}

f().then(alert); // 1
```

<<<<<<< HEAD
...Biz aniq bir va'dani qaytara olamiz, xuddi shunday bo'lishi mumkin:
=======
...We could explicitly return a promise, which would be the same:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

Shunday qilib, `async` funktsiya va'dani qaytarishini ta'minlaydi va undagi va'dalarni yopadi. Yetarlicha sodda, to'g'rimi? Ammo bu nafaqat. Faqat `async` funktsiyalarida ishlaydigan yana bir `await` kalit so'zi bor va bu juda ajoyib.

## Await

Sintaksis:

```js
// faqat async funktsiyalar ichida ishlaydi
let value = await promise;
```

`await` kalit so'zi JavaScript-ni ushbu va'da amalga oshguncha kutib turishiga va natijasini qaytarishiga olib keladi.

1 sekund ichida hal qilinadigan va'da bilan misol:
```js run
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

*!*
<<<<<<< HEAD
  let result = await promise; // va'da hal bo'lguncha kuting (*)
=======
  let result = await promise; // wait until the promise resolves (*)
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
*/!*

  alert(result); // "done!"
}

f();
```

Funktsiyaning bajarilishi `(*)`satrrida "to'xtaydi" va va'da bajarilgandan so'ng davom etadi, natijada `result` uning natijasiga aylanadi. Shunday qilib, yuqoridagi kod "done!" ko'rsatadi bir soniyada.

<<<<<<< HEAD
Keling, ta'kidlab o'tamiz: `await` so'zma-so'z JavaScript-ni va'da tugaguncha kutib turishi va natija bilan davom etishi kerak. Bu hech qanday CPU resurslarini talab qilmaydi, chunki interpretator boshqa ishlarni bajarishi mumkin: boshqa skriptlarni bajarish, hodisalarni boshqarish va hk.

Bu va'da natijasini olish uchun va'daga ko'ra oqlangan sintaksis `promise.then` , o'qish va yozish osonroq.

````warn header="Muntazam funktsiyalarda `await` dan foydalanib bo'lmaydi"
Agar mos kelmaydigan funktsiyada `await` dan foydalanishga harakat qilsak, sintaksis xatosi bo'ladi:
=======
Let's emphasize: `await` literally suspends the function execution until the promise settles, and then resumes it with the promise result. That doesn't cost any CPU resources, because the JavaScript engine can do other jobs in the meantime: execute other scripts, handle events, etc.

It's just a more elegant syntax of getting the promise result than `promise.then`. And, it's easier to read and write.

````warn header="Can't use `await` in regular functions"
If we try to use `await` in a non-async function, there would be a syntax error:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
function f() {
  let promise = Promise.resolve(1);
*!*
  let result = await promise; // Syntax error
*/!*
}
```

<<<<<<< HEAD
Agar funktsiyadan oldin `async` qo'ymasak, bu xato bo'ladi. Yuqorida aytib o'tilganidek, `await` faqat `async function` ichida ishlaydi.
=======
We may get this error if we forget to put `async` before a function. As stated earlier, `await` only works inside an `async` function.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
````

<info:promise-chaining> bobidagi `showAvatar()` misolini olamiz va uni `async/await` yordamida qayta yozamiz:

1. Biz `.then` chaqiruvlarini `await` bilan almashtirishimiz kerak.
2. Shuningdek, ular ishlashi uchun `async` funktsiyani bajarishimiz kerak.

```js run
async function showAvatar() {

  // bizning JSON-ni o'qish
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // github foydalanuvchisini o'qish
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // avatarni ko'rsatish
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // 3 soniya kuting
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

Juda toza va o'qish oson, to'g'rimi? Oldingiga qaraganda ancha yaxshi.

<<<<<<< HEAD
````smart header="`await` yuqori darajadagi kodda ishlamaydi"
`await` dan foydalanishni yangi boshlagan odamlar, biz `await` dan yuqori darajadagi kodda foydalana olmasligimizni unutishadi. Masalan, bu ishlamaydi:

```js run
// yuqori darajadagi kodda sintaksis xatosi
=======
````smart header="Modern browsers allow top-level `await` in modules"
In modern browsers, `await` on top level works just fine, when we're inside a module. We'll cover modules in article <info:modules-intro>.

For instance:

```js run module
// we assume this code runs at top level, inside a module
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();

console.log(user);
```

<<<<<<< HEAD
<<<<<<< HEAD
Biz buni noma'lum async funktsiyasiga o'rashimiz mumkin, masalan:
=======
But we can wrap it into an anonymous async function, like this:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
If we're not using modules, or [older browsers](https://caniuse.com/mdn-javascript_operators_await_top_level) must be supported, there's a universal recipe: wrapping into an anonymous async function.

Like this:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```

````
<<<<<<< HEAD
````smart header="`await` \"thenables\" ni qabul qiladi"
`promise.then` singari, `await` ham ishlatilishi mumkin bo'lgan obyektlardan foydalanishga imkon beradi (`then` usuli bilan chaqirish mumkin). G'oya shundan iboratki, uchinchi tomon obyekti va'da bo'lmasligi mumkin, ammo va'daga mos kelishi mumkin: agar u `.then` ni qo'llab-quvvatlasa, `await` bilan ishlatish kifoya.

Demo `Thenable` klassi, quyida `await` uning holatlarini qabul qiladi:
=======

````smart header="`await` accepts \"thenables\""
Like `promise.then`, `await` allows us to use thenable objects (those with a callable `then` method). The idea is that a third-party object may not be a promise, but promise-compatible: if it supports `.then`, that's enough to use it with `await`.

Here's a demo `Thenable` class; the `await` below accepts its instances:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // 1000ms dan keyin this.num*2 bilan hal qilish
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
}

async function f() {
  // 1 soniyani kutadi, keyin natija 2 ga teng bo'ladi
  let result = await new Thenable(1);
  alert(result);
}

f();
```

<<<<<<< HEAD
Agar `await` `.then` bilan va'da qilinmagan obyektga ega bo'lsa, u ushbu funktsiyani mahalliy funktsiyalarni `resolve`, `reject` argument sifatida chaqiradi. Keyin `await` ulardan bittasi chaqirilguncha kutadi (yuqoridagi misolda u `(*)` satrida bo'ladi) va natijada bilan davom etadi.
````

````smart header="Async usullari"
Async klass usulini e'lon qilish uchun uni `async` bilan qo'shib qo'ying:
=======
If `await` gets a non-promise object with `.then`, it calls that method providing the built-in functions `resolve` and `reject` as arguments (just as it does for a regular `Promise` executor). Then `await` waits until one of them is called (in the example above it happens in the line `(*)`) and then proceeds with the result.
````

````smart header="Async class methods"
To declare an async class method, just prepend it with `async`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
class Waiter {
*!*
  async wait() {
*/!*
    return await Promise.resolve(1);
  }
}

new Waiter()
  .wait()
  .then(alert); // 1 (this is the same as (result => alert(result)))
```
Ma'nosi bir xil: qaytarilgan qiymat va'da bo'lishini ta'minlaydi va `await` ga imkon beradi.

````
## Xato ishlov beruvchi
Agar va'da odatdagidek hal qilinsa, `await promise` natijani qaytaradi. Ammo rad etilgan taqdirda, u xuddi shu satrda `throw` iborasi bo'lganidek, xatoga yo'l qo'yadi.

<<<<<<< HEAD
Ushbu kod:
=======
If a promise resolves normally, then `await promise` returns the result. But in the case of a rejection, it throws the error, just as if there were a `throw` statement at that line.

This code:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
async function f() {
*!*
  await Promise.reject(new Error("Whoops!"));
*/!*
}
```

<<<<<<< HEAD
...Bu xuddi shunday:
=======
...is the same as this:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
async function f() {
*!*
  throw new Error("Whoops!");
*/!*
}
```

<<<<<<< HEAD
Haqiqiy vaziyatlarda va'da rad etilishidan oldin biroz vaqt talab qilishi mumkin. Shunday qilib, `await` kutadi va keyin xato bo'ladi.
=======
In real situations, the promise may take some time before it rejects. In that case there will be a delay before `await` throws an error.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Ushbu xatoni odatiy `throw` singari `try..catch` yordamida topishimiz mumkin:

```js run
async function f() {

  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
*!*
    alert(err); // TypeError: failed to fetch
*/!*
  }
}

f();
```

<<<<<<< HEAD
Xato bo'lsa, boshqaruv `catch` blokiga o'tadi. Shuningdek, biz bir nechta satrlarni o'rashimiz mumkin:
=======
In the case of an error, the control jumps to the `catch` block. We can also wrap multiple lines:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
async function f() {

  try {
    let response = await fetch('/no-user-here');
    let user = await response.json();
  } catch(err) {
    // fetch va response.json-da xatolarga yo'l qo'yadi
    alert(err);
  }
}

f();
```

Agar bizda `try..catch` bo'lmasa, u holda `f()` async funktsiya chaqiruvi natijasida hosil bo'lgan va'da rad etiladi. Buni boshqarish uchun `.catch` qo'shib qo'yishimiz mumkin:

```js run
async function f() {
  let response = await fetch('http://no-such-url');
}

// f() rad qilingan va'daga aylanadi
*!*
f().catch(alert); // TypeError: failed to fetch // (*)
*/!*
```

<<<<<<< HEAD
Agar u yerga `.catch` qo'shishni unutib qo'ysak, unda ishlov berilmagan va'da xatosi paydo bo'ladi (konsolda ko'rish mumkin). Biz <info:promise-error-handling> bobida tasvirlangan hodisalarni global ishlov beruvchisi yordamida bunday xatolarga yo'l qo'yamiz.


```smart header="`async/await` va `promise.then/catch`"
Biz `async/await` dan foydalanganda kamdan-kam hollarda `.then` kerak bo'ladi, chunki `await` bizga kutishni boshqaradi. Va `.catch` o'rniga odatdagi `try..catch` dan foydalanishimiz mumkin. Bu odatda (har doim ham) qulayroq emas.

Ammo kodning yuqori darajasida, har qanday `async` funktsiyasidan tashqarida bo'lganimizda, sintaktik ravishda `await` dan foydalana olmaymiz, shuning uchun yakuniy natijani boshqarish uchun `.then/catch` yoki xatolarni qo'shish odatiy holdir.

Yuqoridagi misolning `(*)` satridagi kabi.
=======
If we forget to add `.catch` there, then we get an unhandled promise error (viewable in the console). We can catch such errors using a global `unhandledrejection` event handler as described in the chapter <info:promise-error-handling>.


```smart header="`async/await` and `promise.then/catch`"
When we use `async/await`, we rarely need `.then`, because `await` handles the waiting for us. And we can use a regular `try..catch` instead of `.catch`. That's usually (but not always) more convenient.

But at the top level of the code, when we're outside any `async` function, we're syntactically unable to use `await`, so it's a normal practice to add `.then/catch` to handle the final result or falling-through error, like in the line `(*)` of the example above.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

````smart header="`async/await` `Promise.all` bilan yaxshi ishlaydi"
Bir nechta va'dalarni kutish kerak bo'lganda, ularni `Promise.all` ga o'rab, keyin `await` orqali kutish mumkin:

```js
// natijalar massivini kutish
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
```

<<<<<<< HEAD
Xato bo'lsa, u odatdagidek tarqaladi: bajarilmagan va'dadan `Promise.all` gacha va keyin biz chaqiruv atrofida `try..catch` yordamida ushlab qolishimiz mumkin bo'lgan istisnoga aylanadi.

````

## Mikrovazifa navbat

<info:microtask-queue> bobida ko'rganimizdek, va'da beruvchilar asinxron tarzda bajariladi. Har bir `.then/catch/finally` ishlov beruvchisi avval "mikrovazifa navbatiga" kiradi va joriy kod tugagandan so'ng bajariladi.

`Async/await` va'dalarga asoslanadi, shuning uchun u bir xil mikrovazifalarda navbatni ichki sifatida ishlatadi va makrovazifalarga nisbatan bir xil ustuvorlikka ega.

Masalan, bizda:
- `setTimeout(handler, 0)`, nol kechikish bilan `handler` ni ishga tushirishi kerak.
- `let x = await f()`, function `f()` bu async, lekin darhol qaytadi.

Kodda `await` ning *ostida* `setTimeout` bo'lsa, qaysi biri birinchi ishlaydi?

```js run
async function f() {
  return 1;
}

(async () => {
    setTimeout(() => alert('timeout'), 0);

    await f();

    alert('await');
})();
```

Bu yerda noaniqlik yo'q: `await` har doim birinchi bo'lib tugaydi, chunki (mikrovazifa) u `setTimeout` ishlov berishdan yuqori ustuvorlikka ega.

## Xulosa
=======
In the case of an error, it propagates as usual, from the failed promise to `Promise.all`, and then becomes an exception that we can catch using `try..catch` around the call.

````

## Summary
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Funktsiyadan oldin `async` kalit so'zi ikkita ta'sirga ega:

<<<<<<< HEAD
1. Har doim va'dasini qaytaradi.
2. Unda `await` dan foydalanishga ruxsat beradi.
=======
1. Makes it always return a promise.
2. Allows `await` to be used in it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Va'da oldidan `await` kalit so'zi JavaScript-ni ushbu va'da bajarilishini kutib turishiga majbur qiladi va keyin:

<<<<<<< HEAD
<<<<<<< HEAD
1. Agar bu xato bo'lsa, istisno yaratiladi, xuddi o'sha joyda `throw error` chaqirilgandek.
2. Aks holda, natijani qaytaradi, shuning uchun biz uni qiymatga belgilashimiz mumkin.

Ular birgalikda asinxron kod yozish uchun ajoyib asos yaratadilar, bu ham o'qilishi, ham yozilishi oson.

`Async/await` bilan biz kamdan-kam hollarda `promise.then/catch` deb yozishimiz kerak, ammo biz hali ham ularning va'dalarga asoslanganligini unutmasligimiz kerak, chunki ba'zida (masalan, tashqi tomondan) biz ushbu usullardan foydalanishimiz kerak. Shuningdek, `Promise.all` bir vaqtning o'zida ko'plab vazifalarni kutish uchun foydali narsa.
=======
1. If it's an error, the exception is generated — same as if `throw error` were called at that very place.
=======
1. If it's an error, an exception is generated — same as if `throw error` were called at that very place.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
2. Otherwise, it returns the result.

Together they provide a great framework to write asynchronous code that is easy to both read and write.

With `async/await` we rarely need to write `promise.then/catch`, but we still shouldn't forget that they are based on promises, because sometimes (e.g. in the outermost scope) we have to use these methods. Also `Promise.all` is nice when we are waiting for many tasks simultaneously.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
