
# Async ketma-ket saraluvchanlar va generatorlar

Asinxron ketma-ket saraluvchanlar, talab asosida, mos kelmaydigan ravishda keladigan ma'lumotlarni takrorlashga imkon beradi.

Masalan, biz birma-bir narsalarni yuklab olayotganimizda yoki voqealar asinxron tarzda bo'lishini kutganimizda va ular ustida takrorlashni xohlasak - mos kelmaydigan ketma-ket saraluvchanlar va generatorlar foydali bo'lishi mumkin. Sintaksisini tushunish uchun avval oddiy misolni ko'rib chiqamiz, so'ngra hayotdan foydalanish holatini ko'rib chiqamiz.

## Async ketma-ket saraluvchanlar

Asinxron ketma-ket saraluvchanlar odatiy ketma-ket saraluvchanlarga mutlaqo o'xshaydi va bir nechta sintaktik farqlar mavjud.

<Info:iterable> bobidagi "muntazam" takrorlanadigan obyekt quyidagicha ko'rinadi:

```js run
let range = {
  from: 1,
  to: 5,

  // for..of bu usulni boshida bir marta chaqiradi
*!*
  [Symbol.iterator]() {
*/!*
    // ...ketma-ket saraluvchan obyektini qaytaradi:
    // for..of faqat shu obyekt bilan ishlaydi, undan keyingi qiymatlarni so'raydi
    return {
      current: this.from,
      last: this.to,

      // next() for..of tsikldan har bir takrorlanishda chaqiriladi
*!*
      next() { // (2)
        // u qiymatni obyekt sifatida qaytarishi kerak {done:.., value :...}
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

Agar kerak bo'lsa, iltimos, muntazam takrorlanuvchilar haqida batafsil ma'lumot olish uchun [takrorlanadigan ma'lumotlar haqidagi bobga](info:iterable) murojaat qiling.

Obyektni asinxron qilib takrorlash uchun:
1. Biz `Symbol.iterator` o'rniga  `Symbol.asyncIterator` dan foydalanishimiz kerak.
2. `next()` promisni qaytarishi kerak.
3. Bunday obyekt ustida takrorlash uchun biz `for await (let item of iterable)` tsikldan foydalanishimiz kerak.

Oldingi kabi takrorlanadigan `range` obyektini yarataylik, ammo endi u qiymatlarni asinxron ravishda bir soniyada bir marta qaytaradi:

```js run
let range = {
  from: 1,
  to: 5,

  // for await..of bu usulni boshida bir marta chaqiradi
*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    // ...ketma-ket saraluvchan obyektini qaytaradi:
    // for await..of faqat shu obyekt bilan ishlaydi, undan keyingi qiymatlarni so'raydi
    return {
      current: this.from,
      last: this.to,

      // next() for..of tsikldan har bir takrorlanishda chaqiriladi
*!*
      async next() { // (2)
        // u qiymatni obyekt sifatida qaytarishi kerak {done:.., value :...}
        // (avtomatik ravishda async tomonidan promisga o'ralgan)
*/!*

        // ichida await ishlatishi mumkin, async narsalarni bajaring:
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)

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

Ko'rib turganimizdek, komponentlar odatiy ketma-ket saraluvchanlarga o'xshaydi:

1. Obyektni sinxron ravishda takrorlash uchun uning `Symbol.asyncIterator` `(1)` usuli bo'lishi kerak.
2. Obyektni `next()` usuli bilan qaytarib berish kerak `(2)`.
3. `Next()` usuli `async` bo'lishi shart emas, u promisni qaytaradigan odatiy usul bo'lishi mumkin, ammo `async` ichidagi `await` dan foydalanishga imkon beradi. Bu yerda biz bir soniyani kechiktiramiz `(3)`.
4. Takrorlash uchun biz "kutish uchun (diapazonning qiymatiga yo'l qo'ying)" (4) dan foydalanamiz, ya'ni "for" dan keyin "await" ni qo'shamiz. U bir marta `range[Symbol.asyncIterator]()` oralig'ini, so'ngra qiymatlar uchun `next()` ni chaqiradi.

Mana kichik eslatma:

|       | Ketma-ket saraluvchanlar | Async ketma-ket saraluvchanlar  |
|-------|-----------|-----------------|
| Takrorlanuvchanlikni ta'minlash uchun obyekt usuli | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` qaytish qiymati         | har qanday qiymat         | `Promise`  |
| tsiklash uchun                         | `for..of`         | `for await..of` |


````warn header="Tarqatish operatori asinxron ishlamaydi"
Muntazam, sinxron ketma-ket saraluvchanlar talab qiladigan xususiyatlar asinxron bilan ishlamaydi.

Masalan, tarqatuvchi operator ishlamaydi:
```js
alert( [...range] ); // Error, no Symbol.iterator
```

`Symbol.iterator` ni topishni kutganidek, bu tabiiy, `await` `for..of` uchun.
````

## Async generatorlar

JavaScript-da generatorlar taqdim etiladi, ular ham takrorlanadigan.

[](info:generators) bo'limidan ketma-ketlik generatorini eslaylik. U `start` dan `end` gacha bo'lgan qiymatlar ketma-ketligini hosil qiladi (boshqacha bo'lishi mumkin):

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


Odatda biz generatorlarda `await` dan foydalana olmaymiz. Barcha qiymatlar sinxron tarzda kelishi kerak: `for..of` ni kechiktirishga o'rin yo'q.

Ammo generator korpusida `await` dan foydalanish kerak bo'lsa-chi? Masalan, tarmoq so'rovlarini bajarish uchun.

Muammo yo'q, uni `async` bilan oldindan yozing, shunga o'xshash:

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
    // await dann foydalanish mumkin!
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
    alert(value); // 1, so'ng 2, so'ng 3, so'ng 4, so'ng 5
  }

})();
```

Endi biz `for await...of` bilan takrorlanadigan asinxronizatsiya generatoriga egamiz.

Bu haqiqatan ham juda oddiy. Biz `async` kalit so'zini qo'shamiz va generator endi uning ichida `await` dan foydalanishi mumkin, promis va boshqa asinxron funktsiyalarga tayanishi mumkin.

Texnik jihatdan, asinxron generatorning yana bir farqi shundaki, uning `generator.next()` usuli endi asinxron bo'lib, u promislarni qaytaradi.

Muntazam, asinxron generator uchun `result = generator.next()` o'rniga quyidagi qiymatlarni olish mumkin:

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```

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

Bu yerda moslashtirilgan `range` obyekti takrorlanadi va `*[Symbol.iterator]` generatori ro'yxat qiymatlari mantig'ini amalga oshiradi.

Agar biz generatorga asinxron amallarni qo'shishni xohlasak, biz `Symbol.iterator` o'rnini `Symbol.asyncIterator` bilan moslashtiramiz:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  async *[Symbol.asyncIterator]() { // [Symbol.asyncIterator]: async function*() bilan bir xil
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

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
      headers: {'User-Agent': 'Our script'}, // github user-agent sarlavhasini talab qiladi
    });

    const body = await response.json(); // (2) javobni JSON sifatida tahlil qiladi (bir massiv kommitlar)

    // (3) keyingi sahifaning URL manzili sarlavhalarda, uni ajratib oladi
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage && nextPage[1];

    url = nextPage;

    for(let commit of body) { // (4) sahifa tugamaguncha hosil birma-bir amalga oshiriladi
      yield commit;
    }
  }
}
```

1. Uzoq URL manzilidan yuklab olish uchun brauzerning `fetch` usulidan foydalanamiz. Agar kerak bo'lsa, avtorizatsiya va boshqa sarlavhalarni yetkazib berishga imkon beradi, bu yerda GitHub uchun `User-Agent` kerak.
2. Olingan natijalar JSON sifatida tahlil qilinadi, bu yana `fetch` ga xos usul.
3. Keyingi sahifaning URL manzilini javobning `Link` sarlavhasidan olishimiz mumkin. Uning maxsus formati bor, shuning uchun biz "regexp" dan foydalanamiz. Keyingi sahifa URL manzili quyidagicha ko'rinishi mumkin: `https://api.github.com/repositories/93253246/commits?page=2`, uni GitHub o'zi yaratadi.
4. Keyin biz olingan barcha majburiyatlarni bajaramiz va ular tugagandan so'ng - keyingi `while(url)` takrorlanishi yana bitta so'rovni keltirib chiqaradi.

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
```

Bu biz xohlagan narsadir. Ichki paginatsiya mexanikasi tashqi tomondan ko'rinmas. Biz uchun bu faqat kommitlar qaytaradigan asinxron generator.

## Xulosa

Muntazam ketma-ket saraluvchanlar va generatorlar ishlab chiqarish uchun vaqt talab qilmaydigan ma'lumotlar bilan yaxshi ishlaydi.

Ma'lumotlar asinxron tarzda, kechikishlar bilan kelishini kutganimizda, ularning asinxron analoglaridan foydalanish mumkin va `for..of` o'rniga `for await..of`.

Asinxron va oddiy ketma-ket saraluvchan o'rtasidagi sintaksis farqlari:

|       | Ketma-ket saraluvchanlar | Async ketma-ket saraluvchanlar  |
|-------|-----------|-----------------|
| Takrorlanuvchanlikni ta'minlash uchun obyekt usuli | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` qaytish qiymati         | har qanday qiymat         | `Promise`  |

Asinxron va oddiy generatorlar o'rtasidagi sintaksis farqlari:

|       | Generatorlar | Async generatorlar |
|-------|-----------|-----------------|
| Deklaratsiya | `function*` | `async function*` |
| `generator.next()` qaytaradi              | `{value:…, done: true/false}`         | `Promise` bu hal qiladi `{value:…, done: true/false}`  |

Veb-ishlab chiqishda biz ma'lumotlar oqimlarini tez-tez uchratamiz, ular birma-bir oqib ketganda. Masalan, katta faylni yuklab olish yoki yuklash.

Bunday ma'lumotlarni qayta ishlash uchun biz asinxron generatorlardan foydalanishimiz mumkin edi, ammo yana bir oqim Stream deb nomlangan API mavjud, bu qulayroq bo'lishi mumkin, chunki u ma'lumotlarni o'zgartirishi va uni bir oqimdan boshqasiga o'tkazishi uchun maxsus interfeyslarni taqdim etadi (masalan, bir joydan yuklab olish va darhol boshqa joyga yuborish). Ammo ular yanada murakkab.

Streams API JavaScript til standartining bir qismi emas. Oqimlar va asinxron generatorlar bir-birini to'ldiradi, ikkalasi ham asinxron ma'lumotlar oqimlarini boshqarishning ajoyib usullari.
