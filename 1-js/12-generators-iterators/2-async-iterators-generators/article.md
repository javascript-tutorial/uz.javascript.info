
<<<<<<< HEAD
# Async ketma-ket saraluvchanlar va generatorlar

Asinxron ketma-ket saraluvchanlar, talab asosida, mos kelmaydigan ravishda keladigan ma'lumotlarni takrorlashga imkon beradi.

Masalan, biz birma-bir narsalarni yuklab olayotganimizda yoki voqealar asinxron tarzda bo'lishini kutganimizda va ular ustida takrorlashni xohlasak - mos kelmaydigan ketma-ket saraluvchanlar va generatorlar foydali bo'lishi mumkin. Sintaksisini tushunish uchun avval oddiy misolni ko'rib chiqamiz, so'ngra hayotdan foydalanish holatini ko'rib chiqamiz.

## Async ketma-ket saraluvchanlar

Asinxron ketma-ket saraluvchanlar odatiy ketma-ket saraluvchanlarga mutlaqo o'xshaydi va bir nechta sintaktik farqlar mavjud.

<Info:iterable> bobidagi "muntazam" takrorlanadigan obyekt quyidagicha ko'rinadi:
=======
# Async iteration and generators

Asynchronous iteration allow us to iterate over data that comes asynchronously, on-demand. Like, for instance, when we download something chunk-by-chunk over a network. And asynchronous generators make it even more convenient.

Let's see a simple example first, to grasp the syntax, and then review a real-life use case.

## Recall iterables

Let's recall the topic about iterables. 

The idea is that we have an object, such as `range` here:
```js
let range = {
  from: 1,
  to: 5
};
```

...And we'd like to use `for..of` loop on it, such as `for(value of range)`, to get values from `1` to `5`.

In other words, we want to add an *iteration ability* to the object.

That can be implemented using a special method with the name `Symbol.iterator`:

- This method is called in by the `for..of` construct when the loop is started, and it should return an object with the `next` method.
- For each iteration, the `next()` method is invoked for the next value.
- The `next()` should return a value in the form `{done: true/false, value:<loop value>}`, where `done:true` means the end of the loop.

Here's an implementation for the iterable `range`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let range = {
  from: 1,
  to: 5,

<<<<<<< HEAD
  // for..of bu usulni boshida bir marta chaqiradi
=======
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
*!*
  [Symbol.iterator]() { // called once, in the beginning of for..of
*/!*
<<<<<<< HEAD
    // ...ketma-ket saraluvchan obyektini qaytaradi:
    // for..of faqat shu obyekt bilan ishlaydi, undan keyingi qiymatlarni so'raydi
=======
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    return {
      current: this.from,
      last: this.to,

<<<<<<< HEAD
      // next() for..of tsikldan har bir takrorlanishda chaqiriladi
*!*
      next() { // (2)
        // u qiymatni obyekt sifatida qaytarishi kerak {done:.., value :...}
=======
*!*
      next() { // called every iteration, to get the next value
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
*/!*
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for(let value of range) {
  alert(value); // 1 so'ng 2, so'ng 3, so'ng 4, so'ng 5
}
```

<<<<<<< HEAD
Agar kerak bo'lsa, iltimos, muntazam takrorlanuvchilar haqida batafsil ma'lumot olish uchun [takrorlanadigan ma'lumotlar haqidagi bobga](info:iterable) murojaat qiling.

Obyektni asinxron qilib takrorlash uchun:
1. Biz `Symbol.iterator` o'rniga  `Symbol.asyncIterator` dan foydalanishimiz kerak.
2. `next()` va'dani qaytarishi kerak.
3. Bunday obyekt ustida takrorlash uchun biz `for await (let item of iterable)` tsikldan foydalanishimiz kerak.

Oldingi kabi takrorlanadigan `range` obyektini yarataylik, ammo endi u qiymatlarni asinxron ravishda bir soniyada bir marta qaytaradi:
=======
If anything is unclear, please visit the chapter [](info:iterable), it gives all the details about regular iterables.

## Async iterables

Asynchronous iteration is needed when values come asynchronously: after `setTimeout` or another kind of delay. 

The most common case is that the object needs to make a network request to deliver the next value, we'll see a real-life example of it a bit later.

To make an object iterable asynchronously:

1. Use `Symbol.asyncIterator` instead of `Symbol.iterator`.
2. The `next()` method should return a promise (to be fulfilled with the next value).
    - The `async` keyword handles it, we can simply make `async next()`.
3. To iterate over such an object, we should use a `for await (let item of iterable)` loop.
    - Note the `await` word.

As a starting example, let's make an iterable `range` object, similar like the one before, but now it will return values asynchronously, one per second.

All we need to do is to perform a few replacements in the code above:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let range = {
  from: 1,
  to: 5,

<<<<<<< HEAD
  // for await..of bu usulni boshida bir marta chaqiradi
*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    // ...ketma-ket saraluvchan obyektini qaytaradi:
    // for await..of faqat shu obyekt bilan ishlaydi, undan keyingi qiymatlarni so'raydi
=======
*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    return {
      current: this.from,
      last: this.to,

<<<<<<< HEAD
      // next() for..of tsikldan har bir takrorlanishda chaqiriladi
*!*
      async next() { // (2)
        // u qiymatni obyekt sifatida qaytarishi kerak {done:.., value :...}
        // (avtomatik ravishda async tomonidan va'daga o'ralgan)
*/!*

        // ichida await ishlatishi mumkin, async narsalarni bajaring:
=======
*!*
      async next() { // (2)
*/!*

*!*
        // note: we can use "await" inside the async next:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
*/!*

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {

*!*
  for await (let value of range) { // (4)
    alert(value); // 1,2,3,4,5
  }
*/!*

})()
```

<<<<<<< HEAD
Ko'rib turganimizdek, komponentlar odatiy ketma-ket saraluvchanlarga o'xshaydi:

1. Obyektni sinxron ravishda takrorlash uchun uning `Symbol.asyncIterator` `(1)` usuli bo'lishi kerak.
2. Obyektni `next()` usuli bilan qaytarib berish kerak `(2)`.
3. `Next()` usuli `async` bo'lishi shart emas, u va'dani qaytaradigan odatiy usul bo'lishi mumkin, ammo `async` ichidagi `await` dan foydalanishga imkon beradi. Bu yerda biz bir soniyani kechiktiramiz `(3)`.
4. Takrorlash uchun biz "kutish uchun (diapazonning qiymatiga yo'l qo'ying)" (4) dan foydalanamiz, ya'ni "for" dan keyin "await" ni qo'shamiz. U bir marta `range[Symbol.asyncIterator]()` oralig'ini, so'ngra qiymatlar uchun `next()` ni chaqiradi.

Mana kichik eslatma:
=======
As we can see, the structure is similar to regular iterators:

1. To make an object asynchronously iterable, it must have a method `Symbol.asyncIterator` `(1)`.
2. This method must return the object with `next()` method returning a promise `(2)`.
3. The `next()` method doesn't have to be `async`, it may be a regular method returning a promise, but `async` allows us to use `await`, so that's convenient. Here we just delay for a second `(3)`.
4. To iterate, we use `for await(let value of range)` `(4)`, namely add "await" after "for". It calls `range[Symbol.asyncIterator]()` once, and then its `next()` for values.

Here's a small table with the differences:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

|       | Ketma-ket saraluvchanlar | Async ketma-ket saraluvchanlar  |
|-------|-----------|-----------------|
<<<<<<< HEAD
| Takrorlanuvchanlikni ta'minlash uchun obyekt usuli | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` qaytish qiymati         | har qanday qiymat         | `Promise`  |
| tsiklash uchun                         | `for..of`         | `for await..of` |


````warn header="Tarqatish operatori asinxron ishlamaydi"
Muntazam, sinxron ketma-ket saraluvchanlar talab qiladigan xususiyatlar asinxron bilan ishlamaydi.

Masalan, tarqatuvchi operator ishlamaydi:
=======
| Object method to provide iterator | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` return value is              | any value         | `Promise`  |
| to loop, use                          | `for..of`         | `for await..of` |

````warn header="The spread syntax `...` doesn't work asynchronously"
Features that require regular, synchronous iterators, don't work with asynchronous ones.

For instance, a spread syntax won't work:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```js
alert( [...range] ); // Error, no Symbol.iterator
```

<<<<<<< HEAD
`Symbol.iterator` ni topishni kutganidek, bu tabiiy, `await` `for..of` uchun.
````

## Async generatorlar

JavaScript-da generatorlar taqdim etiladi, ular ham takrorlanadigan.

[](info:generators) bo'limidan ketma-ketlik generatorini eslaylik. U `start` dan `end` gacha bo'lgan qiymatlar ketma-ketligini hosil qiladi (boshqacha bo'lishi mumkin):
=======
That's natural, as it expects to find `Symbol.iterator`, not `Symbol.asyncIterator`.

It's also the case for `for..of`: the syntax without `await` needs `Symbol.iterator`.
````

## Recall generators

Now let's recall generators, as they allow to make iteration code much shorter. Most of the time, when we'd like to make an iterable, we'll use generators.

For sheer simplicity, omitting some important stuff, they are "functions that generate (yield) values". They are explained in detail in the chapter [](info:generators).

Generators are labelled with `function*` (note the star) and use `yield` to generate a value, then we can use `for..of` to loop over them.

This example generates a sequence of values from `start` to `end`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for(let value of generateSequence(1, 5)) {
  alert(value); // 1, so'ng 2, so'ng 3, so'ng 4, so'ng 5
}
```

As we already know, to make an object iterable, we should add `Symbol.iterator` to it.

```js
let range = {
  from: 1,
  to: 5,
*!*
  [Symbol.iterator]() {
    return <object with next to make range iterable>
  }
*/!*
}
```

A common practice for `Symbol.iterator` is to return a generator, it makes the code shorter, as you can see:

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1, then 2, then 3, then 4, then 5
}
```

<<<<<<< HEAD
Odatda biz generatorlarda `await` dan foydalana olmaymiz. Barcha qiymatlar sinxron tarzda kelishi kerak: `for..of` ni kechiktirishga o'rin yo'q.

Ammo generator korpusida `await` dan foydalanish kerak bo'lsa-chi? Masalan, tarmoq so'rovlarini bajarish uchun.

Muammo yo'q, uni `async` bilan oldindan yozing, shunga o'xshash:
=======
Please see the chapter [](info:generators) if you'd like more details.

In regular generators we can't use `await`. All values must come synchronously, as required by the `for..of` construct.

What if we'd like to generate values asynchronously? From network requests, for instance. 

Let's switch to asynchronous generators to make it possible.

## Async generators (finally)

For most practical applications, when we'd like to make an object that asynchronously generates a sequence of values, we can use an asynchronous generator.

The syntax is simple: prepend `function*` with `async`. That makes the generator asynchronous.

And then use `for await (...)` to iterate over it, like this:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
<<<<<<< HEAD
    // await dann foydalanish mumkin!
=======
    // Wow, can use await!
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
<<<<<<< HEAD
    alert(value); // 1, so'ng 2, so'ng 3, so'ng 4, so'ng 5
=======
    alert(value); // 1, then 2, then 3, then 4, then 5 (with delay between)
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  }

})();
```

<<<<<<< HEAD
Endi biz `for await...of` bilan takrorlanadigan asinxronizatsiya generatoriga egamiz.

Bu haqiqatan ham juda oddiy. Biz `async` kalit so'zini qo'shamiz va generator endi uning ichida `await` dan foydalanishi mumkin, va'da va boshqa asinxron funktsiyalarga tayanishi mumkin.

Texnik jihatdan, asinxron generatorning yana bir farqi shundaki, uning `generator.next()` usuli endi asinxron bo'lib, u va'dalarni qaytaradi.

Muntazam, asinxron generator uchun `result = generator.next()` o'rniga quyidagi qiymatlarni olish mumkin:
=======
As the generator is asynchronous, we can use `await` inside it, rely on promises, perform network requests and so on.

````smart header="Under-the-hood difference"
Technically, if you're an advanced reader who remembers the details about generators, there's an internal difference.

For async generators, the `generator.next()` method is asynchronous, it returns promises.

In a regular generator we'd use `result = generator.next()` to get values. In an async generator, we should add `await`, like this:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```
That's why async generators work with `for await...of`.
````

<<<<<<< HEAD
## Asinxron ravishda ajratilgan obyektlar

Obyektni ketma-ket saraluvchan qilishni xohlaganimizda, unga `Symbol.iterator` qo'shishimiz kerak.

```js
let range = {
  from: 1,
  to: 5,
*!*
  [Symbol.iterator]() { ...return object with next to make range iterable...  }
*/!*
}
```

`Symbol.iterator` uchun odatiy usul, oldingi misolda bo'lgani kabi `next` bilan oddiy obyektni emas, balki generatorni qaytarishdir.

[](info:generators) bo'limidan bir misolni eslaylik:

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1, so'ng 2, so'ng 3, so'ng 4, so'ng 5
}
```

Bu yerda moslashtirilgan `range` ob'ekti takrorlanadi va `*[Symbol.iterator]` generatori ro'yxat qiymatlari mantig'ini amalga oshiradi.

Agar biz generatorga asinxron amallarni qo'shishni xohlasak, biz `Symbol.iterator` o'rnini `Symbol.asyncIterator` bilan moslashtiramiz:
=======
### Async iterable range

Regular generators can be used as `Symbol.iterator` to make the iteration code shorter.

Similar to that, async generators can be used as `Symbol.asyncIterator` to implement the asynchronous iteration.

For instance, we can make the `range` object generate values asynchronously, once per second, by replacing synchronous `Symbol.iterator` with asynchronous `Symbol.asyncIterator`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let range = {
  from: 1,
  to: 5,

  // this line is same as [Symbol.asyncIterator]: async function*() {
*!*
<<<<<<< HEAD
  async *[Symbol.asyncIterator]() { // [Symbol.asyncIterator]: async function*() bilan bir xil
=======
  async *[Symbol.asyncIterator]() {
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
*/!*
    for(let value = this.from; value <= this.to; value++) {

      // qadriyatlar orasida pauza qiling, nimanidirni kuting
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {

  for *!*await*/!* (let value of range) {
    alert(value); // 1, so'ng 2, so'ng 3, so'ng 4, so'ng 5
  }

})();
```

Endi qiymatlar ular orasida 1 soniya kechikish bilan birga keladi.

<<<<<<< HEAD
## Hayotiy misol

Hozircha oddiy tushunchalarni olish uchun oddiy misollarni ko'rdik. Endi hayotdan foydalanish holatini ko'rib chiqamiz.

Sahifali ma'lumotlarni yetkazib beradigan ko'plab onlayn API-lar mavjud. Masalan, foydalanuvchilar ro'yxati kerak bo'lganda, uni sahifa qilib olishimiz mumkin: so'rov oldindan belgilangan hisobni qaytaradi (masalan, 100 ta foydalanuvchi) va keyingi sahifaga URL manzilini taqdim etadi.

Shablon juda keng tarqalgan, bu foydalanuvchilar haqida emas, balki hamma narsa haqida. Masalan, GitHub majburiyatlarni bir xil, sahifalashtirilgan tarzda olishga imkon beradi:

- Biz URL manziliga `https://api.github.com/repos/<repo>/commits` shaklida murojaat qilishimiz kerak.
- U 30 ta JSON bilan javob beradi va `Link` sarlavhasidagi keyingi sahifaga havola beradi.
- Keyin biz ushbu havolani keyingi so'rov uchun, ko'proq kommitlar olish uchun va hokazo uchun ishlatishimiz mumkin.

Biz xohlagan narsa - bu kommitlarning takrorlanadigan manbai, biz uni shunday ishlatishimiz uchun:

```js
let repo = 'javascript-tutorial/en.javascript.info'; // GitHub kommitlarni olish uchun repositoriy

for await (let commit of fetchCommits(repo)) {
  // kommit jarayonni 
}
```

`fetchCommits` biz uchun kommitlarni olishni xohlaydi, kerak bo'lganda so'rovlar yuboradi. Va bu barcha paginatsiya narsalariga g'amxo'rlik qilsa, biz uchun bu oddiy `for await..of` bo'ladi.

Async generatorlari bilan amalga oshirish juda oson:
=======
```smart
Technically, we can add both `Symbol.iterator` and `Symbol.asyncIterator` to the object, so it's both synchronously (`for..of`) and asynchronously (`for await..of`) iterable.

In practice though, that would be a weird thing to do.
```

## Real-life example: paginated data

So far we've seen basic examples, to gain understanding. Now let's review a real-life use case.

There are many online services that deliver paginated data. For instance, when we need a list of users, a request returns a pre-defined count (e.g. 100 users) - "one page", and provides a URL to the next page.

This pattern is very common. It's not about users, but just about anything. 

For instance, GitHub allows us to retrieve commits in the same, paginated fashion:

- We should make a request to `fetch` in the form `https://api.github.com/repos/<repo>/commits`.
- It responds with a JSON of 30 commits, and also provides a link to the next page in the `Link` header.
- Then we can use that link for the next request, to get more commits, and so on.

For our code, we'd like to have a simpler way to get commits.

Let's make a function `fetchCommits(repo)` that gets commits for us, making requests whenever needed. And let it care about all pagination stuff. For us it'll be a simple async iteration `for await..of`.

So the usage will be like this:

```js
for await (let commit of fetchCommits("username/repository")) {
  // process commit
}
```

Here's such function, implemented as async generator:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
<<<<<<< HEAD
      headers: {'User-Agent': 'Our script'}, // github user-agent sarlavhasini talab qiladi
    });

    const body = await response.json(); // (2) javobni JSON sifatida tahlil qiladi (bir massiv kommitlar)
=======
      headers: {'User-Agent': 'Our script'}, // github needs any user-agent header
    });

    const body = await response.json(); // (2) response is JSON (array of commits)
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

    // (3) keyingi sahifaning URL manzili sarlavhalarda, uni ajratib oladi
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage?.[1];

    url = nextPage;

    for(let commit of body) { // (4) sahifa tugamaguncha hosil birma-bir amalga oshiriladi
      yield commit;
    }
  }
}
```

<<<<<<< HEAD
1. Uzoq URL manzilidan yuklab olish uchun brauzerning `fetch` usulidan foydalanamiz. Agar kerak bo'lsa, avtorizatsiya va boshqa sarlavhalarni yetkazib berishga imkon beradi, bu yerda GitHub uchun `User-Agent` kerak.
2. Olingan natijalar JSON sifatida tahlil qilinadi, bu yana `fetch` ga xos usul.
3. Keyingi sahifaning URL manzilini javobning `Link` sarlavhasidan olishimiz mumkin. Uning maxsus formati bor, shuning uchun biz "regexp" dan foydalanamiz. Keyingi sahifa URL manzili quyidagicha ko'rinishi mumkin: `https://api.github.com/repositories/93253246/commits?page=2`, uni GitHub o'zi yaratadi.
4. Keyin biz olingan barcha majburiyatlarni bajaramiz va ular tugagandan so'ng - keyingi `while(url)` takrorlanishi yana bitta so'rovni keltirib chiqaradi.
=======
More explanations about how it works:

1. We use the browser [fetch](info:fetch) method to download the commits.

    - The initial URL is `https://api.github.com/repos/<repo>/commits`, and the next page will be in the `Link` header of the response.
    - The `fetch` method allows us to supply authorization and other headers if needed -- here GitHub requires `User-Agent`.
2. The commits are returned in JSON format.
3. We should get the next page URL from the `Link` header of the response. It has a special format, so we use a regular expression for that (we will learn this feature in [Regular expressions](info:regular-expressions)).
    - The next page URL may look like `https://api.github.com/repositories/93253246/commits?page=2`. It's generated by GitHub itself.
4. Then we yield the received commits one by one, and when they finish, the next `while(url)` iteration will trigger, making one more request.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Foydalanish namunasi (konsolda mualliflarning kommitlarini ko'rsatadi):

```js run
(async () => {

  let count = 0;

  for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

    console.log(commit.author.login);

    if (++count == 100) { // keling, 100 ta kommitlar bilan to'xtaylik
      break;
    }
  }

})();

// Note: If you are running this in an external sandbox, you'll need to paste here the function fetchCommits described above 
```

<<<<<<< HEAD
Bu biz xohlagan narsadir. Ichki paginatsiya mexanikasi tashqi tomondan ko'rinmas. Biz uchun bu faqat kommitlar qaytaradigan asinxron generator.
=======
That's just what we wanted. 

The internal mechanics of paginated requests is invisible from the outside. For us it's just an async generator that returns commits.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Xulosa

Muntazam ketma-ket saraluvchanlar va generatorlar ishlab chiqarish uchun vaqt talab qilmaydigan ma'lumotlar bilan yaxshi ishlaydi.

Ma'lumotlar asinxron tarzda, kechikishlar bilan kelishini kutganimizda, ularning asinxron analoglaridan foydalanish mumkin va `for..of` o'rniga `for await..of`.

Asinxron va oddiy ketma-ket saraluvchan o'rtasidagi sintaksis farqlari:

<<<<<<< HEAD
|       | Ketma-ket saraluvchanlar | Async ketma-ket saraluvchanlar  |
|-------|-----------|-----------------|
| Takrorlanuvchanlikni ta'minlash uchun obyekt usuli | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` qaytish qiymati         | har qanday qiymat         | `Promise`  |
=======
|       | Iterable | Async Iterable |
|-------|-----------|-----------------|
| Method to provide iterator | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` return value is          | `{value:…, done: true/false}`         | `Promise` that resolves to `{value:…, done: true/false}`  |
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Asinxron va oddiy generatorlar o'rtasidagi sintaksis farqlari:

|       | Generatorlar | Async generatorlar |
|-------|-----------|-----------------|
<<<<<<< HEAD
| Deklaratsiya | `function*` | `async function*` |
| `generator.next()` qaytaradi              | `{value:…, done: true/false}`         | `Promise` bu hal qiladi `{value:…, done: true/false}`  |
=======
| Declaration | `function*` | `async function*` |
| `next()` return value is          | `{value:…, done: true/false}`         | `Promise` that resolves to `{value:…, done: true/false}`  |
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Veb-ishlab chiqishda biz ma'lumotlar oqimlarini tez-tez uchratamiz, ular birma-bir oqib ketganda. Masalan, katta faylni yuklab olish yoki yuklash.

<<<<<<< HEAD
Bunday ma'lumotlarni qayta ishlash uchun biz asinxron generatorlardan foydalanishimiz mumkin edi, ammo yana bir oqim Stream deb nomlangan API mavjud, bu qulayroq bo'lishi mumkin, chunki u ma'lumotlarni o'zgartirishi va uni bir oqimdan boshqasiga o'tkazishi uchun maxsus interfeyslarni taqdim etadi (masalan, bir joydan yuklab olish va darhol boshqa joyga yuborish). Ammo ular yanada murakkab.

Streams API JavaScript til standartining bir qismi emas. Oqimlar va asinxron generatorlar bir-birini to'ldiradi, ikkalasi ham asinxron ma'lumotlar oqimlarini boshqarishning ajoyib usullari.
=======
We can use async generators to process such data. It's also noteworthy that in some environments, like in browsers, there's also another API called Streams, that provides special interfaces to work with such streams, to transform the data and to pass it from one stream to another (e.g. download from one place and immediately send elsewhere).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
