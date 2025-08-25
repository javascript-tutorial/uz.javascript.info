# Asinxron iteratsiya va generatorlar

Asinxron iteratsiya bizga asinxron ravishda keladigan ma'lumotlarni, talabga binoan iteratsiya qilish imkonini beradi. Masalan, tarmoq orqali biror narsani qism-qismlar bo'ylab yuklaganimizda. Va asinxron generatorlar buni yanada qulayroq qiladi.

Sintaksisni tushunish uchun avval oddiy misolni ko'ramiz, keyin haqiqiy foydalanish holatini ko'rib chiqamiz.

## Iterablelarni esga olish

Iterablelar mavzusini esga olaylik.

G'oya shundan iboratki, bizda obyekt bor, masalan bu yerda `range`:

```js
let range = {
  from: 1,
  to: 5
};
```

...Va biz unda `for..of` siklidan foydalanishni xohlaymiz, masalan `for(value of range)`, `1` dan `5` gacha qiymatlar olish uchun.

Boshqacha qilib aytganda, biz obyektga *iteratsiya qobiliyati*ni qo'shishni xohlaymiz.

Buni `Symbol.iterator` nomli maxsus metod yordamida amalga oshirish mumkin:

- Bu metod `for..of` konstruktsiyasi tomonidan sikl boshlanganida chaqiriladi va u `next` metodiga ega obyektni qaytarishi kerak.
- Har bir iteratsiya uchun keyingi qiymat uchun `next()` metodi chaqiriladi.
- `next()` qiymatni `{done: true/false, value:<sikl qiymati>}` ko'rinishida qaytarishi kerak, bu yerda `done:true` sikl oxirini anglatadi.

Mana iterable `range` uchun amalga oshirish:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  [Symbol.iterator]() { // for..of boshida bir marta chaqiriladi
*/!*
    return {
      current: this.from,
      last: this.to,

*!*
      next() { // har iteratsiyada keyingi qiymatni olish uchun chaqiriladi
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
  alert(value); // 1, keyin 2, keyin 3, keyin 4, keyin 5
}
```

Agar biror narsa tushunarsiz bo'lsa, [](info:iterable) bobiga tashrif buyuring, u oddiy iterablelar haqida barcha tafsilotlarni beradi.

## Asinxron iterablelar

Qiymatlar asinxron ravishda kelganda asinxron iteratsiya kerak: `setTimeout` dan keyin yoki boshqa turdagi kechikishdan keyin.

Eng keng tarqalgan holat - obyekt keyingi qiymatni yetkazib berish uchun tarmoq so'rovi qilishi kerak, biz buning haqiqiy misolini biroz keyinroq ko'ramiz.

Obyektni asinxron ravishda iterable qilish uchun:

1. `Symbol.iterator` o'rniga `Symbol.asyncIterator` dan foydalaning.
2. `next()` metodi promise qaytarishi kerak (keyingi qiymat bilan bajarilish uchun).
    - `async` kalit so'zi buni hal qiladi, biz oddiy `async next()` qila olamiz.
3. Bunday obyektni iteratsiya qilish uchun biz `for await (let item of iterable)` siklidan foydalanishimiz kerak.
    - `await` so'ziga e'tibor bering.

Boshlang'ich misol sifatida, oldingisiga o'xshash iterable `range` obyektini yarataylik, lekin endi u qiymatlarni asinxron ravishda, sekundiga bittadan qaytaradi.

Bizga yuqoridagi kodda bir nechta almashtirishlar qilish kerak:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    return {
      current: this.from,
      last: this.to,

*!*
      async next() { // (2)
*/!*

*!*
        // eslatma: biz async next ichida "await" dan foydalanishimiz mumkin:
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

Ko'rib turganingizdek, struktura oddiy iteratorlarga o'xshash:

1. Obyektni asinxron iterable qilish uchun u `Symbol.asyncIterator` `(1)` metodiga ega bo'lishi kerak.
2. Bu metod promise qaytaradigan `next()` metodi bilan obyektni qaytarishi kerak `(2)`.
3. `next()` metodi `async` bo'lishi shart emas, u promise qaytaradigan oddiy metod bo'lishi mumkin, lekin `async` bizga `await` ishlatish imkonini beradi, shuning uchun bu qulay. Bu yerda biz faqat bir soniya kutamiz `(3)`.
4. Iteratsiya qilish uchun biz `for await(let value of range)` `(4)` dan foydalanamiz, ya'ni "for" dan keyin "await" qo'shamiz. U `range[Symbol.asyncIterator]()` ni bir marta chaqiradi, keyin qiymatlar uchun uning `next()` ini.

Mana farqlar bilan kichik jadval:

|       | Iteratorlar | Asinxron iteratorlar |
|-------|-----------|-----------------|
| Iterator taqdim etish uchun obyekt metodi | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` qaytarish qiymati              | har qanday qiymat         | `Promise`  |
| sikl uchun foydalaning                          | `for..of`         | `for await..of` |

````warn header="Spread sintaksisi `...` asinxron ishlaydi"
Oddiy, sinxron iteratorlarni talab qiladigan xususiyatlar asinxronlar bilan ishlamaydi.

Masalan, spread sintaksisi ishlamaydi:
```js
alert( [...range] ); // Xato, Symbol.iterator yo'q
```

Bu tabiiy, chunki u `Symbol.asyncIterator` emas, `Symbol.iterator` ni topishni kutadi.

Bu `for..of` uchun ham amal qiladi: `await` siz sintaksis `Symbol.iterator` ni talab qiladi.
````

## Generatorlarni esga olish

Endi generatorlarni esga olaylik, chunki ular iteratsiya kodini ancha qisqartirish imkonini beradi. Ko'pincha iterable yaratishni xohlaganimizda, biz generatorlardan foydalanamiz.

Oddiy soddalik uchun, ba'zi muhim narsalarni tashlab qoldirib, ular "qiymatlar ishlab chiqaradigan (yield) funktsiyalar". Ular [](info:generators) bobida batafsil tushuntirilgan.

Generatorlar `function*` bilan belgilanadi (yulduzchaga e'tibor bering) va qiymat ishlab chiqarish uchun `yield` dan foydalanadi, keyin biz ular ustida sikl qilish uchun `for..of` dan foydalanishimiz mumkin.

Bu misol `start` dan `end` gacha qiymatlar ketma-ketligini hosil qiladi:

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for(let value of generateSequence(1, 5)) {
  alert(value); // 1, keyin 2, keyin 3, keyin 4, keyin 5
}
```

Allaqachon bilganimizdek, obyektni iterable qilish uchun unga `Symbol.iterator` qo'shishimiz kerak.

```js
let range = {
  from: 1,
  to: 5,
*!*
  [Symbol.iterator]() {
    return <range ni iterable qilish uchun next bilan obyekt>
  }
*/!*
}
```

`Symbol.iterator` uchun umumiy amaliyot - generator qaytarish, bu kodini qisqartiradi, ko'rib turganingizdek:

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // [Symbol.iterator]: function*() uchun qisqartma
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1, keyin 2, keyin 3, keyin 4, keyin 5
}
```

Ko'proq tafsilotlar kerak bo'lsa, [](info:generators) bobiga qarang.

Oddiy generatorlarda biz `await` dan foydalana olmaymiz. Barcha qiymatlar sinxron ravishda kelishi kerak, `for..of` konstruktsiyasi talab qilganidek.

Agar biz qiymatlarni asinxron ravishda ishlab chiqarishni xohlasak-chi? Masalan, tarmoq so'rovlaridan.

Buni amalga oshirish uchun asinxron generatorlarga o'taylik.

## Asinxron generatorlar (nihoyat)

Amaliy dasturlashning ko'plab ilovalari uchun, biz qiymatlar ketma-ketligini asinxron ravishda ishlab chiqaradigan obyekt yaratishni xohlaganimizda, asinxron generatordan foydalanishimiz mumkin.

Sintaksis oddiy: `function*` oldiga `async` qo'shing. Bu generatorni asinxron qiladi.

Va keyin uni iteratsiya qilish uchun `for await (...)` dan foydalaning:

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
    // Voy, await ishlatishimiz mumkin!
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
    alert(value); // 1, keyin 2, keyin 3, keyin 4, keyin 5 (oralarda kechikish bilan)
  }

})();
```

Generator asinxron bo'lganligi sababli, biz uning ichida `await` dan foydalanishimiz, promiselarga tayanishimiz, tarmoq so'rovlarini bajarishimiz va hokazo mumkin.

````smart header="Ichki farq"
Texnik jihatdan, agar siz generatorlar haqidagi tafsilotlarni eslaydigan ilg'or o'quvchi bo'lsangiz, ichki farq mavjud.

Asinxron generatorlar uchun `generator.next()` metodi asinxron, u promiselar qaytaradi.

Oddiy generatorda biz qiymatlarni olish uchun `result = generator.next()` dan foydalanardik. Asinxron generatorda biz `await` qo'shishimiz kerak:

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```
Shuning uchun asinxron generatorlar `for await...of` bilan ishlaydi.
````

### Asinxron iterable range

Oddiy generatorlar iteratsiya kodini qisqartirish uchun `Symbol.iterator` sifatida ishlatilishi mumkin.

Xuddi shunday, asinxron generatorlar asinxron iteratsiyani amalga oshirish uchun `Symbol.asyncIterator` sifatida ishlatilishi mumkin.

Masalan, sinxron `Symbol.iterator` ni asinxron `Symbol.asyncIterator` bilan almashtirish orqali `range` obyektini sekundiga bir marta qiymatlar asinxron ravishda ishlab chiqaradigan qilishimiz mumkin:

```js run
let range = {
  from: 1,
  to: 5,

  // bu qator [Symbol.asyncIterator]: async function*() { bilan bir xil
*!*
  async *[Symbol.asyncIterator]() {
*/!*
    for(let value = this.from; value <= this.to; value++) {

      // qiymatlar orasida pauza qiling, biror narsani kuting  
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {

  for *!*await*/!* (let value of range) {
    alert(value); // 1, keyin 2, keyin 3, keyin 4, keyin 5
  }

})();
```

Endi qiymatlar orasida 1 soniya kechikish bilan keladi.

```smart
Texnik jihatdan, biz obyektga `Symbol.iterator` va `Symbol.asyncIterator` ni qo'shishimiz mumkin, shuning uchun u ham sinxron (`for..of`) ham asinxron (`for await..of`) iterable bo'ladi.

Biroq, amalda bu g'alati narsa bo'ladi.
```

## Haqiqiy misol: sahifalangan ma'lumotlar

Hozirgacha biz tushunishni oshirish uchun asosiy misollarni ko'rdik. Endi haqiqiy foydalanish holatini ko'rib chiqaylik.

Sahifalangan ma'lumotlarni etkazib beradigan ko'plab onlayn xizmatlar mavjud. Masalan, foydalanuvchilar ro'yxati kerak bo'lganda, so'rov oldindan belgilangan soni (masalan, 100 foydalanuvchi) - "bir sahifa" ni qaytaradi va keyingi sahifaga URL taqdim etadi.

Bu naqsh juda keng tarqalgan. Bu foydalanuvchilar haqida emas, balki har qanday narsa haqida.

Masalan, GitHub bizga commitlarni xuddi shu sahifalangan tarzda olish imkonini beradi:

- Biz `https://api.github.com/repos/<repo>/commits` ko'rinishida `fetch` ga so'rov yuborishimiz kerak.
- U 30 ta commit bilan JSON javob beradi va `Link` headerida keyingi sahifaga havolani ham taqdim etadi.
- Keyin biz ko'proq commitlar olish uchun keyingi so'rov uchun shu havoladan foydalanishimiz mumkin va hokazo.

Bizning kodimiz uchun commitlarni olishning oddiyroq usuli bo'lishini xohlaymiz.

Keling, bizga commitlar olib beradigan, kerak bo'lganda so'rovlar yuboradigan `fetchCommits(repo)` funktsiyasini yarataylik. Va u barcha sahifalash narsalarini o'zi hal qilsin. Biz uchun bu oddiy asinxron iteratsiya `for await..of` bo'ladi.

Shunday qilib, foydalanish shunday bo'ladi:

```js
for await (let commit of fetchCommits("username/repository")) {
  // commitni qayta ishlash
}
```

Mana asinxron generator sifatida amalga oshirilgan bunday funktsiya:

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
      headers: {'User-Agent': 'Our script'}, // github har qanday user-agent headerini talab qiladi
    });

    const body = await response.json(); // (2) javob JSON (commitlar massivi)

    // (3) keyingi sahifaning URL manzili headerlarda, uni chiqarib olish
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage?.[1];

    url = nextPage;

    for(let commit of body) { // (4) sahifa tugaguncha commitlarni birma-bir yield qilish
      yield commit;
    }
  }
}
```

Qanday ishlashi haqida ko'proq tushuntirishlar:

1. Commitlarni yuklab olish uchun brauzer [fetch](info:fetch) metodidan foydalanamiz.

    - Boshlang'ich URL `https://api.github.com/repos/<repo>/commits`, va keyingi sahifa javobning `Link` headerida bo'ladi.
    - `fetch` metodi kerak bo'lsa avtorizatsiya va boshqa headerlarni taqdim etish imkonini beradi -- bu yerda GitHub `User-Agent` ni talab qiladi.
2. Commitlar JSON formatida qaytariladi.
3. Biz javobning `Link` headeridan keyingi sahifa URL manzilini olishimiz kerak. Unda maxsus format bor, shuning uchun buning uchun muntazam ifodadan foydalanamiz (biz bu xususiyatni [Muntazam ifodalar](info:regular-expressions) da o'rganamiz).
    - Keyingi sahifa URL manzili `https://api.github.com/repositories/93253246/commits?page=2` ko'rinishida bo'lishi mumkin. U GitHub ning o'zi tomonidan yaratilgan.
4. Keyin biz olingan commitlarni birma-bir yield qilamiz va ular tugaganda, keyingi `while(url)` iteratsiyasi ishga tushadi va yana bitta so'rov yuboradi.

Foydalanish misoli (commit mualliflarini konsolda ko'rsatadi):

```js run
(async () => {

  let count = 0;

  for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

    console.log(commit.author.login);

    if (++count == 100) { // 100 ta commitda to'xtatamiz
      break;
    }
  }

})();

// Eslatma: Agar siz buni tashqi sandbox da ishga tushirayotgan bo'lsangiz, yuqorida tasvirlangan fetchCommits funktsiyasini bu yerga joylashtirishing kerak bo'ladi
```

Bu aynan biz xohlagan narsa edi.

Sahifalangan so'rovlarning ichki mexanikasi tashqaridan ko'rinmaydi. Biz uchun bu commitlar qaytaradigan oddiy asinxron generator.

## Xulosa

Oddiy iteratorlar va generatorlar yaratishga vaqt talab qilmaydigan ma'lumotlar bilan yaxshi ishlaydi.

Ma'lumotlar kechikishlar bilan asinxron ravishda kelishini kutganimizda, ularning asinxron hamkasblari ishlatilishi mumkin va `for..of` o'rniga `for await..of`.

Asinxron va oddiy iteratorlar o'rtasidagi sintaksis farqlari:

|       | Iterable | Asinxron Iterable |
|-------|-----------|-----------------|
| Iterator taqdim etish metodi | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` qaytarish qiymati          | `{value:…, done: true/false}`         | `{value:…, done: true/false}` ga hal qilinuvchi `Promise`  |

Asinxron va oddiy generatorlar o'rtasidagi sintaksis farqlari:

|       | Generatorlar | Asinxron generatorlar |
|-------|-----------|-----------------|
| E'lon | `function*` | `async function*` |
| `next()` qaytarish qiymati          | `{value:…, done: true/false}`         | `{value:…, done: true/false}` ga hal qilinuvchi `Promise`  |

Web-ishlab chiqishda biz ko'pincha ma'lumotlar oqimlariga duch kelamiz, u qism-qism oqadi. Masalan, katta fayl yuklab olish yoki yuklash.

Biz bunday ma'lumotlarni qayta ishlash uchun asinxron generatorlardan foydalanishimiz mumkin. Shuningdek, ba'zi muhitlarda, masalan brauzerlarda, bunday oqimlar bilan ishlash, ma'lumotlarni o'zgartirish va uni bir oqimdan boshqasiga o'tkazish uchun maxsus interfeyslarni taqdim etuvchi Streams deb ataladigan boshqa API ham borligini ta'kidlash kerak (masalan, bir joydan yuklab olish va boshqa joyga darhol yuborish).