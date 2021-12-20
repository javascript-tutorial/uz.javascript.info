<<<<<<< HEAD

# Generatorlar
=======
# Generators
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Muntazam funktsiyalar faqat bitta, yagona qiymatni qaytaradi (yoki hech narsa).

<<<<<<< HEAD
Generatorlar talabga binoan bir nechta qiymatlarni, ehtimol cheksiz ko'p qiymatlarni qaytarishlari mumkin. Ular ma'lumotlar oqimlarini osongina yaratishga imkon beradigan [ketma-ket saraluvchan](info:iterable) bilan juda yaxshi ishlaydi.
=======
Generators can return ("yield") multiple values, one after another, on-demand. They work great with [iterables](info:iterable), allowing to create data streams with ease.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Generator funktsiyalari

Generator yaratish uchun biz maxsus sintaksis konstruktsiyasiga muhtojmiz: "generator funktsiyasi" deb nomlangan `function*`.

Bunga o'xshaydi:

```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}
```

<<<<<<< HEAD
`generateSequence()` chaqirilganda, u kodni bajarmaydi. Buning o'rniga u "generator" deb nomlangan maxsus obyektni qaytaradi.

```js
// "generator funktsiya" "generator obyektni" yaratadi
=======
Generator functions behave differently from regular ones. When such function is called, it doesn't run its code. Instead it returns a special object, called "generator object", to manage the execution.

Here, take a look:

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

// "generator function" creates "generator object"
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
let generator = generateSequence();
*!*
alert(generator); // [object Generator]
*/!*
```

<<<<<<< HEAD
`Generator` obyekti "muzlatilgan funktsiya chaqiruvi" sifatida qabul qilinishi mumkin:

![](generateSequence-1.svg)

Yaratilgandan so'ng, kodni bajarishning eng boshida to'xtatiladi.

Generatorning asosiy usuli `next()`. Chaqirilganda, u eng yaqin `yield <value>` ifodagacha bajarilishni davom ettiradi. Keyin ijro to'xtaydi va qiymat tashqi kodga qaytariladi.
=======
The function code execution hasn't started yet:

![](generateSequence-1.svg)

The main method of a generator is `next()`. When called, it runs the execution until the nearest `yield <value>` statement (`value` can be omitted, then it's `undefined`). Then the function execution pauses, and the yielded `value` is returned to the outer code.

The result of `next()` is always an object with two properties:
- `value`: the yielded value.
- `done`: `true` if the function code has finished, otherwise `false`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Masalan, bu yerda biz generatorni yaratamiz va uning dastlabki qiymatini olamiz:

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

*!*
let one = generator.next();
*/!*

alert(JSON.stringify(one)); // {value: 1, done: false}
```

<<<<<<< HEAD
`next()` natijasi har doim obyekt:
- `value`: olingan qiymat.
- `done`: `false` agar kod hali tugamagan bo'lsa, aks holda `true`.

Hozirda biz faqat birinchi qiymatni oldik:

![](generateSequence-2.svg)

Yana `generator.next()` ni chaqiraylik. U ijro etilishini davom ettiradi va keyingi `yield` ni qaytaradi:
=======
As of now, we got the first value only, and the function execution is on the second line:

![](generateSequence-2.svg)

Let's call `generator.next()` again. It resumes the code execution and returns the next `yield`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
let two = generator.next();

alert(JSON.stringify(two)); // {value: 2, done: false}
```

![](generateSequence-3.svg)

<<<<<<< HEAD
Va agar biz uni uchinchi marta chaqirsak, unda funktsiya tugaydigan `return` ifodasiga yetadi:
=======
And, if we call it a third time, the execution reaches the `return` statement that finishes the function:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
let three = generator.next();

alert(JSON.stringify(three)); // {value: 3, *!*done: true*/!*}
```

![](generateSequence-4.svg)

Endi generator tugadi. Biz buni yakunlangan natija sifatida `done:true` va jarayonning `value:3` qiymatidan ko'rishimiz kerak.

<<<<<<< HEAD
`generator.next()` yangi chaqiruvlari endi mantiqiy emas. Agar biz ularni qilsak, ular xuddi shu obyektni qaytaradilar: `{done: true}`.

Generatorni "orqaga qaytarish" imkoni yo'q. Ammo `generateSequence()` ni chaqirib boshqasini yaratishimiz mumkin.

Hozircha eng muhim narsani tushunish kerakki, generator funktsiyalari, odatdagi funktsiyalardan farqi o'laroq, kodni bajarmaydi. Ular "generator zavodlari" sifatida xizmat qiladi. `function*` ishga tushirish generatorni qaytaradi va biz undan qiymatlarni so'raymiz.

```smart header="`function* f(…)` yoki `function *f(…)`?"
Bu kichik diniy savol, ikkala sintaksis ham to'g'ri.
=======
New calls to `generator.next()` don't make sense any more. If we do them, they return the same object: `{done: true}`.

```smart header="`function* f(…)` or `function *f(…)`?"
Both syntaxes are correct.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Ammo odatda birinchi sintaksisga afzallik beriladi, chunki `*` yulduzi bu generator funktsiyasi ekanligini anglatadi, u ismni emas, balki turini tavsiflaydi, shuning uchun u `function` kalit so'ziga ulanishi kerak.
```

## Generatorlar ketma-ket saraluvchandir

Ehtimol, `next()` usulini ko'rib chiqishni taxmin qilganingizdek, generatorlar [ketma-ket saraluvchan](info:iterable).

<<<<<<< HEAD
Biz qiymatlar bo'yicha `for..of` orqali tsiklashimiz mumkin:
=======
We can loop over their values using `for..of`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1, then 2
}
```

<<<<<<< HEAD
Bu generatorlar bilan ishlashning `.next().value` chaqirishdan ko'ra ancha yaxshi usulidir, to'g'rimi?
=======
Looks a lot nicer than calling `.next().value`, right?
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

...Iltimos, diqqat qiling: yuqoridagi misolda `1`, keyin `2` ko'rsatilgan va barchasi shu. `3` ko'rsatilmaydi!

<<<<<<< HEAD
Buning sababi, takrorlash uchun oxirgi `value`, `done: true` ni e'tiborsiz qoldiradi. Shunday qilib, agar biz barcha natijalarni `for..of` bilan ko'rsatishni istasak, ularni `yield` bilan qaytarishimiz kerak:
=======
It's because `for..of` iteration ignores the last `value`, when `done: true`. So, if we want all results to be shown by `for..of`, we must return them with `yield`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
function* generateSequence() {
  yield 1;
  yield 2;
*!*
  yield 3;
*/!*
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1, so'ng 2, keyin 3
}
```

<<<<<<< HEAD
Tabiiyki, generatorlar takrorlanadigan bo'lgani uchun biz barcha tegishli funktsiyalarni chaqira olamiz, masalan. tarqatish operatori `...`:
=======
As generators are iterable, we can call all related functionality, e.g. the spread syntax `...`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let sequence = [0, ...generateSequence()];

alert(sequence); // 0, 1, 2, 3
```

<<<<<<< HEAD
Yuqoridagi kodda `...generateSequence()` ketma-ket saraluvchanlarni narsalar massiviga aylantiradi ([](info:rest-parameters-spread-operator#spread-operator) bo'limidagi tarqatish operatori haqida ko'proq ma'lumot oling)

## Ketma-ket saraluvchanlarning o'rniga generatorlardan foydalanish
=======
In the code above, `...generateSequence()` turns the iterable generator object into an array of items (read more about the spread syntax in the chapter [](info:rest-parameters-spread#spread-syntax))

## Using generators for iterables
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Bir muncha vaqt oldin, [](info:iterable) bo'limida biz qiymatlarni `from-to` ga qaytaradigan, ketma-ket saraluvchan `range` obyektini yaratdik.

Keling, kodni eslab qolaylik:

```js run
let range = {
  from: 1,
  to: 5,

<<<<<<< HEAD
  // for..of bu usulni boshida bir marta chaqiradi
=======
  // for..of range calls this method once in the very beginning
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  [Symbol.iterator]() {
    // ...ketma-ket saraluvchan obyektini qaytaradi:
    // oldinga, for..of faqat shu obyekt bilan ishlaydi, undan keyingi qiymatlarni so'raydi
    return {
      current: this.from,
      last: this.to,

      // next() for..of tsikldan har bir iteratsiyada chaqiriladi
      next() {
        // u qiymatni obyekt sifatida qaytarishi kerak {done:.., value :...}
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

// iteration over range returns numbers from range.from to range.to
alert([...range]); // 1,2,3,4,5
```

<<<<<<< HEAD
Ketma-ket saraluchanni yaratish uchun generatordan foydalanish juda ham oqlangan:

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

let sequence = [...generateSequence(1,5)];

alert(sequence); // 1, 2, 3, 4, 5
```

...Ammo, agar biz odatiy `range` obyektini saqlamoqchi bo'lsak nima bo'ladi?

## Symbol.iterator-ni generatorga aylantirish

Biz generatorni `Symbol.iterator` sifatida taqdim etish orqali har ikkala dunyodan eng yaxshisini olishimiz mumkin:
=======
We can use a generator function for iteration by providing it as `Symbol.iterator`.

Here's the same `range`, but much more compact:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // [Symbol.iterator]: function*() uchun qisqartirma
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

alert( [...range] ); // 1,2,3,4,5
```

<<<<<<< HEAD
`range` obyekti endi ketma-ket saraluvchan.

Bu juda yaxshi ishlaydi, chunki qachon `range[Symbol.iterator]` chaqiriladi:
- u obyektni qaytaradi (endi generator)
- `.next()` usuliga ega (ha, generatorda mavjud)
- qiymatlarni `{value: ..., done: true/false}` shaklida qaytaradi (tekshiring, aynan nimani generator bajaradi).

Bu tasodif emas, albatta. Generatorlar ketma-ket saraluvchanlarni osonlashtirishni maqsad qilib qo'yishgan, shuning uchun biz buni ko'rishimiz mumkin.

Generatordagi so'nggi variant asl takrorlanadigan kodga qaraganda ancha ixcham va bir xil funktsiyani saqlaydi.

```smart header="Generatorlar abadiy davom etishi mumkin"
Yuqoridagi misollarda biz cheklangan ketma-ketliklarni yaratdik, ammo abadiy qiymatlarni beradigan generatorni ham yaratishimiz mumkin. Masalan, soxta tasodifiy sonlarning tugamaydigan ketma-ketligi.

Buning uchun `for..of` ning `break` usuli kerak bo'ladi, aks holda bu halqa abadiy takrorlanib, osilib qoladi
=======
That works, because `range[Symbol.iterator]()` now returns a generator, and generator methods are exactly what `for..of` expects:
- it has a `.next()` method
- that returns values in the form `{value: ..., done: true/false}`

That's not a coincidence, of course. Generators were added to JavaScript language with iterators in mind, to implement them easily.

The variant with a generator is much more concise than the original iterable code of `range`, and keeps the same functionality.

```smart header="Generators may generate values forever"
In the examples above we generated finite sequences, but we can also make a generator that yields values forever. For instance, an unending sequence of pseudo-random numbers.

That surely would require a `break` (or `return`) in `for..of` over such generator. Otherwise, the loop would repeat forever and hang.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

## Generatorlar tarkibi

Generator tarkibi - generatorlarni bir-biriga shaffof ravishda "joylashtirish" imkonini beradigan generatorlarning o'ziga xos xususiyati.

<<<<<<< HEAD
Masalan, biz ketma-ketlikni yaratmoqchimiz:
- `0..9` raqamlari (belgilar kodlari 48..57),
- keyin alifbo harflari `a..z` (belgilar kodlari 65..90)
- keyin katta harflar `A..Z` (belgilar kodlari 97..122)

Keyin biz undan belgilarni tanlash orqali parollar yaratishni rejalashtirmoqdamiz (sintaksis belgilarini ham qo'shishi mumkin), lekin oldin ketma-ketlikni yaratishimiz kerak.

Bizda allaqachon `function* generateSequence(start, end)` mavjud. Keling, uni uchta ketma-ketlikni yetkazib berish uchun qayta ishlataylik, birgalikda ular bizga kerakli narsadir.
=======
For instance, we have a function that generates a sequence of numbers:

```js
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}
```

Now we'd like to reuse it to generate a more complex sequence:
- first, digits `0..9` (with character codes 48..57),
- followed by uppercase alphabet letters `A..Z` (character codes 65..90)
- followed by lowercase alphabet letters `a..z` (character codes 97..122)

We can use this sequence e.g. to create passwords by selecting characters from it (could add syntax characters as well), but let's generate it first.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Muntazam funktsiyalarda bir nechta boshqa funktsiyalar natijalarini birlashtirish uchun biz ularni chaqiramiz, natijalarni saqlaymiz va so'ngra birlashtiramiz.

<<<<<<< HEAD
Generatorlar uchun biz quyidagilarni yaxshiroq qilishimiz mumkin:
=======
For generators, there's a special `yield*` syntax to "embed" (compose) one generator into another.

The composed generator:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {

*!*
  // 0..9
  yield* generateSequence(48, 57);

  // A..Z
  yield* generateSequence(65, 90);

  // a..z
  yield* generateSequence(97, 122);
*/!*

}

let str = '';

for(let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
```

<<<<<<< HEAD
Misol uchun maxsus `yield*` direktivasi kompozitsiya uchun javobgardir. Bu ijroni boshqa generatorga *topshiradi*. Yoki, oddiy qilib aytganda, u generatorlarni bajaradi va shaffof ravishda ularning hosilini tashqarida, xuddi chaqiruvchi generatorning o'zi bajargandek qilib uzatadi.
=======
The `yield*` directive *delegates* the execution to another generator. This term means that `yield* gen` iterates over the generator `gen` and transparently forwards its yields outside. As if the values were yielded by the outer generator.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Natija xuddi biz ichki o'rnatilgan generatorlardan kodni kiritganimiz bilan bir xil:

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generateAlphaNum() {

*!*
  // yield* generateSequence(48, 57);
  for (let i = 48; i <= 57; i++) yield i;

  // yield* generateSequence(65, 90);
  for (let i = 65; i <= 90; i++) yield i;

  // yield* generateSequence(97, 122);
  for (let i = 97; i <= 122; i++) yield i;
*/!*

}

let str = '';

for(let code of generateAlphaNum()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
```

<<<<<<< HEAD
Generator tarkibi - bu bir generatorning oqimini boshqasiga kiritishning tabiiy usuli.

Ichki generatordan qiymatlar oqimi cheksiz bo'lsa ham ishlaydi. Bu oddiy va oraliq natijalarni saqlash uchun qo'shimcha xotiradan foydalanilmaydi.

## "yield" bu ikki tomonlama yo'l

Shu paytgacha generatorlar "steroidlardagi ketma-ket saraluvchan" kabi edi. Va shuning uchun ular tez-tez ishlatiladi.

Ammo aslida ular ancha kuchli va moslashuvchan.

Buning sababi shundaki, `yield` ikki tomonlama yo'ldir: u nafaqat natijani tashqariga qaytaradi, balki generator ichidagi qiymatni ham o'tkazishi mumkin.
=======
A generator composition is a natural way to insert a flow of one generator into another. It doesn't use extra memory to store intermediate results.

## "yield" is a two-way street

Until this moment, generators were similar to iterable objects, with a special syntax to generate values. But in fact they are much more powerful and flexible.

That's because `yield` is a two-way street: it not only returns the result to the outside, but also can pass the value inside the generator.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Buning uchun argument bilan `generator.next(arg)` ni chaqirishimiz kerak. Ushbu argument `yield` natijasiga aylanadi.

Keling, bir misolni ko'rib chiqaylik:

```js run
function* gen() {
*!*
<<<<<<< HEAD
  // Savolni tashqi kodga o'tkazing va javobni kuting
  let result = yield "2 + 2?"; // (*)
=======
  // Pass a question to the outer code and wait for an answer
  let result = yield "2 + 2 = ?"; // (*)
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
*/!*

  alert(result);
}

let generator = gen();

let question = generator.next().value; // <-- yield qiymatni qaytaradi

generator.next(4); // --> natijani generatorga o'tkazish
```

![](genYield2.svg)

<<<<<<< HEAD
1. Birinchi chaqiruv `generator.next()` har doim argumentsiz. U ijroni boshlaydi va birinchi `yield` ("2+2?") natijasini qaytaradi. Shu nuqtada generator bajarilishini to'xtatadi (hali ham o'sha satrda).
2. Keyin, yuqoridagi rasmda ko'rsatilgandek, `yield` natijasi chaqiruv kodidagi `question` o'zgaruvchanga tushadi.
3. `generator.next(4)` da generator qayta ishlaydi va natijada `4` oladi: `let result = 4`.

Iltimos, e'tibor bering, tashqi kod darhol `next(4)` chaqirish shart emas. Qiymatni hisoblash uchun vaqt kerak bo'lishi mumkin. Bu shuningdek yaroqli kod:
=======
1. The first call `generator.next()` should be always made without an argument (the argument is ignored if passed). It starts the execution and returns the result of the first `yield "2+2=?"`. At this point the generator pauses the execution, while staying on the line `(*)`.
2. Then, as shown at the picture above, the result of `yield` gets into the `question` variable in the calling code.
3. On `generator.next(4)`, the generator resumes, and `4` gets in as the result: `let result = 4`.

Please note, the outer code does not have to immediately call `next(4)`. It may take time. That's not a problem: the generator will wait.

For instance:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
// bir muncha vaqt o'tgach generatorni davom ettiring
setTimeout(() => generator.next(4), 1000);
```

<<<<<<< HEAD
Sintaksis biroz g'alati tuyulishi mumkin. Funktsiya va chaqiruv kodi qiymatlarni bir-biriga o'tkazishi juda kam uchraydi. Ammo aynan shu narsa sodir bo'lmoqda.
=======
As we can see, unlike regular functions, a generator and the calling code can exchange results by passing values in `next/yield`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Ishni yanada aniqroq qilish uchun yana bir misol, qo'shimcha chaqiruvlar:

```js run
function* gen() {
  let ask1 = yield "2 + 2 = ?";

  alert(ask1); // 4

  let ask2 = yield "3 * 3 = ?"

  alert(ask2); // 9
}

let generator = gen();

alert( generator.next().value ); // "2 + 2 = ?"

alert( generator.next(4).value ); // "3 * 3 = ?"

alert( generator.next(9).done ); // true
```

Ijro etiladigan rasm:

![](genYield2-2.svg)

1. Birinchi `.next()` bajarilishini boshlaydi... Birinchi `yield` ga yetadi.
2. Natijada tashqi kodga qaytariladi.
3. Ikkinchi `.next(4)` birinchi `yield` natijasida `4` ni generatorga qaytaradi va bajarilishini davom ettiradi.
4. ...U generatorning chaqiruvi natijasi bo'lgan ikkinchi `yield` ga yetadi.
5. Uchinchi `.next(9)` ikkinchi `yield` natijasida generatorga `9` o'tadi va funktsiya oxirigacha bajarilishini davom ettiradi, shunday qilib `done: true`.

Bu "stol tennis" o'yiniga o'xshaydi. Har bir `next(value)` (birinchisidan tashqari) generatorga qiymatni o'tkazadi, bu joriy `yield` natijasiga aylanadi va keyin keyingi `yield` natijasini qaytaradi.

## generator.throw

Yuqoridagi misollarda kuzatganimizdek, tashqi kod `yield` natijasida generatorga qiymat o'tkazishi mumkin.

...Ammo u yerda ham xato boshlanishi (tashlanishi) mumkin. Bu tabiiy, chunki xato - bu natija.

Xatolikni `yield` ga o'tkazish uchun biz `generator.throw(err)` deb nomlashimiz kerak. Bunday holda, `err` shu `yield` bilan bir satrga tashlanadi.

<<<<<<< HEAD
Masalan, `"2 + 2?"` hosilasi xatolikka olib keladi:
=======
For instance, here the yield of `"2 + 2 = ?"` leads to an error:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
function* gen() {
  try {
    let result = yield "2 + 2 = ?"; // (1)

    alert("Ijro etish bu yerga yetib bormaydi, chunki istisno yuqoriga tashlangan");
  } catch(e) {
    alert(e); // xatoni ko'rsatadi
  }
}

let generator = gen();

let question = generator.next().value;

*!*
generator.throw(new Error("Javob mening ma'lumotlar bazasida topilmadi")); // (2)
*/!*
```

<<<<<<< HEAD
`(2)` satridagi generatorga tashlangan xato `(1)` satrida `yield` bilan istisnoga olib keladi. Yuqoridagi misolda `try..catch` uni ushlaydi va ko'rsatadi.
=======
The error, thrown into the generator at line `(2)` leads to an exception in line `(1)` with `yield`. In the example above, `try..catch` catches it and shows it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Agar biz uni ushlamasak, unda har qanday istisno kabi, u generatorni chaqiruv kodiga "tushiradi".

Chaqiruv kodining joriy satri `(2)` deb belgilangan `generator.throw` satridir. Shunday qilib, biz uni shu yerda ushlashimiz mumkin:

```js run
function* generate() {
<<<<<<< HEAD
  let result = yield "2 + 2?"; // Ushbu satrda xatolik yuz berdi
=======
  let result = yield "2 + 2 = ?"; // Error in this line
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
}

let generator = generate();

let question = generator.next().value;

*!*
try {
  generator.throw(new Error("Javob mening ma'lumotlar bazasida topilmadi"));
} catch(e) {
  alert(e); // xatoni ko'rsatadi
}
*/!*
```

Agar biz u yerda xatoga yo'l qo'ymasak, u odatdagidek, tashqi chaqiruv kodiga tushadi (agar mavjud bo'lsa) va agar tutilmasa, skriptni o'ldiradi.

## Xulosa

<<<<<<< HEAD
- Generatorlar generator funktsiyalari tomonidan yaratiladi `function*(…) {…}`.
- Generatorlar ichida (faqat) `yield` operatori mavjud.
- Tashqi kod va generator `next/yield` chaqiruvlar orqali natijalarni almashtirishi mumkin.

Zamonaviy JavaScript-da generatorlar kamdan kam qo'llaniladi. Ammo ba'zida ular foydali bo'ladi, chunki bajarilish paytida funktsiyani chaqirish kodi bilan ma'lumot almashish qobiliyati juda noyobdir.

<<<<<<< HEAD
Shuningdek, keyingi bobda biz `for` tsiklida mos kelmaydigan ma'lumotlar oqimlarini o'qish uchun ishlatiladigan asinxron generatorlarni o'rganamiz.
=======
## generator.return

`generator.return(value)` finishes the generator execution and return the given `value`.

```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

const g = gen();

g.next();        // { value: 1, done: false }
g.return('foo'); // { value: "foo", done: true }
g.next();        // { value: undefined, done: true }
```

If we again use `generator.return()` in a completed generator, it will return that value again ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/return)).

Often we don't use it, as most of time we want to get all returning values, but it can be useful when we want to stop generator in a specific condition.

## Summary
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

Veb-dasturlashda biz ko'pincha oqim ma'lumotlari bilan ishlaymiz, masalan, sahifalangan natijalarni olish kerak, shuning uchun bu juda muhim holat.
=======
- Generators are created by generator functions `function* f(…) {…}`.
- Inside generators (only) there exists a `yield` operator.
- The outer code and the generator may exchange results via `next/yield` calls.

In modern JavaScript, generators are rarely used. But sometimes they come in handy, because the ability of a function to exchange data with the calling code during the execution is quite unique. And, surely, they are great for making iterable objects.

Also, in the next chapter we'll learn async generators, which are used to read streams of asynchronously generated data (e.g paginated fetches over a network) in `for await ... of` loops.

In web-programming we often work with streamed data, so that's another very important use case.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
