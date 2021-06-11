
# Generatorlar

Muntazam funktsiyalar faqat bitta, yagona qiymatni qaytaradi (yoki hech narsa).

Generatorlar talabga binoan bir nechta qiymatlarni, ehtimol cheksiz ko'p qiymatlarni qaytarishlari mumkin. Ular ma'lumotlar oqimlarini osongina yaratishga imkon beradigan [ketma-ket saraluvchan](info:iterable) bilan juda yaxshi ishlaydi.

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

`generateSequence()` chaqirilganda, u kodni bajarmaydi. Buning o'rniga u "generator" deb nomlangan maxsus obyektni qaytaradi.

```js
// "generator funktsiya" "generator obyektni" yaratadi
let generator = generateSequence();
```

`Generator` obyekti "muzlatilgan funktsiya chaqiruvi" sifatida qabul qilinishi mumkin:

![](generateSequence-1.svg)

Yaratilgandan so'ng, kodni bajarishning eng boshida to'xtatiladi.

Generatorning asosiy usuli `next()`. Chaqirilganda, u eng yaqin `yield <value>` ifodagacha bajarilishni davom ettiradi. Keyin ijro to'xtaydi va qiymat tashqi kodga qaytariladi.

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

`next()` natijasi har doim obyekt:
- `value`: olingan qiymat.
- `done`: `false` agar kod hali tugamagan bo'lsa, aks holda `true`.

Hozirda biz faqat birinchi qiymatni oldik:

![](generateSequence-2.svg)

Yana `generator.next()` ni chaqiraylik. U ijro etilishini davom ettiradi va keyingi `yield` ni qaytaradi:

```js
let two = generator.next();

alert(JSON.stringify(two)); // {value: 2, done: false}
```

![](generateSequence-3.svg)

Va agar biz uni uchinchi marta chaqirsak, unda funktsiya tugaydigan `return` ifodasiga yetadi:

```js
let three = generator.next();

alert(JSON.stringify(three)); // {value: 3, *!*done: true*/!*}
```

![](generateSequence-4.svg)

Endi generator tugadi. Biz buni yakunlangan natija sifatida `done:true` va jarayonning `value:3` qiymatidan ko'rishimiz kerak.

`generator.next()` yangi chaqiruvlari endi mantiqiy emas. Agar biz ularni qilsak, ular xuddi shu obyektni qaytaradilar: `{done: true}`.

Generatorni "orqaga qaytarish" imkoni yo'q. Ammo `generateSequence()` ni chaqirib boshqasini yaratishimiz mumkin.

Hozircha eng muhim narsani tushunish kerakki, generator funktsiyalari, odatdagi funktsiyalardan farqi o'laroq, kodni bajarmaydi. Ular "generator zavodlari" sifatida xizmat qiladi. `function*` ishga tushirish generatorni qaytaradi va biz undan qiymatlarni so'raymiz.

```smart header="`function* f(…)` yoki `function *f(…)`?"
Bu kichik diniy savol, ikkala sintaksis ham to'g'ri.

Ammo odatda birinchi sintaksisga afzallik beriladi, chunki `*` yulduzi bu generator funktsiyasi ekanligini anglatadi, u ismni emas, balki turini tavsiflaydi, shuning uchun u `function` kalit so'ziga ulanishi kerak.
```

## Generatorlar ketma-ket saraluvchandir

Ehtimol, `next()` usulini ko'rib chiqishni taxmin qilganingizdek, generatorlar [ketma-ket saraluvchan](info:iterable).

Biz qiymatlar bo'yicha `for..of` orqali tsiklashimiz mumkin:

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

Bu generatorlar bilan ishlashning `.next().value` chaqirishdan ko'ra ancha yaxshi usulidir, to'g'rimi?

...Iltimos, diqqat qiling: yuqoridagi misolda `1`, keyin `2` ko'rsatilgan va barchasi shu. `3` ko'rsatilmaydi!

Buning sababi, takrorlash uchun oxirgi `value`, `done: true` ni e'tiborsiz qoldiradi. Shunday qilib, agar biz barcha natijalarni `for..of` bilan ko'rsatishni istasak, ularni `yield` bilan qaytarishimiz kerak:

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

Tabiiyki, generatorlar takrorlanadigan bo'lgani uchun biz barcha tegishli funktsiyalarni chaqira olamiz, masalan. tarqatish operatori `...`:

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let sequence = [0, ...generateSequence()];

alert(sequence); // 0, 1, 2, 3
```

Yuqoridagi kodda `...generateSequence()` ketma-ket saraluvchanlarni narsalar massiviga aylantiradi ([](info:rest-parameters-spread-operator#spread-operator) bo'limidagi tarqatish operatori haqida ko'proq ma'lumot oling)

## Ketma-ket saraluvchanlarning o'rniga generatorlardan foydalanish

Bir muncha vaqt oldin, [](info:iterable) bo'limida biz qiymatlarni `from-to` ga qaytaradigan, ketma-ket saraluvchan `range` obyektini yaratdik.

Keling, kodni eslab qolaylik:

```js run
let range = {
  from: 1,
  to: 5,

  // for..of bu usulni boshida bir marta chaqiradi
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

alert([...range]); // 1,2,3,4,5
```

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
```

## Generatorlar tarkibi

Generator tarkibi - generatorlarni bir-biriga shaffof ravishda "joylashtirish" imkonini beradigan generatorlarning o'ziga xos xususiyati.

Masalan, biz ketma-ketlikni yaratmoqchimiz:
- `0..9` raqamlari (belgilar kodlari 48..57),
- keyin alifbo harflari `a..z` (belgilar kodlari 65..90)
- keyin katta harflar `A..Z` (belgilar kodlari 97..122)

Keyin biz undan belgilarni tanlash orqali parollar yaratishni rejalashtirmoqdamiz (sintaksis belgilarini ham qo'shishi mumkin), lekin oldin ketma-ketlikni yaratishimiz kerak.

Bizda allaqachon `function* generateSequence(start, end)` mavjud. Keling, uni uchta ketma-ketlikni yetkazib berish uchun qayta ishlataylik, birgalikda ular bizga kerakli narsadir.

Muntazam funktsiyalarda bir nechta boshqa funktsiyalar natijalarini birlashtirish uchun biz ularni chaqiramiz, natijalarni saqlaymiz va so'ngra birlashtiramiz.

Generatorlar uchun biz quyidagilarni yaxshiroq qilishimiz mumkin:

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

Misol uchun maxsus `yield*` direktivasi kompozitsiya uchun javobgardir. Bu ijroni boshqa generatorga *topshiradi*. Yoki, oddiy qilib aytganda, u generatorlarni bajaradi va shaffof ravishda ularning hosilini tashqarida, xuddi chaqiruvchi generatorning o'zi bajargandek qilib uzatadi.

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

Generator tarkibi - bu bir generatorning oqimini boshqasiga kiritishning tabiiy usuli.

Ichki generatordan qiymatlar oqimi cheksiz bo'lsa ham ishlaydi. Bu oddiy va oraliq natijalarni saqlash uchun qo'shimcha xotiradan foydalanilmaydi.

## "yield" bu ikki tomonlama yo'l

Shu paytgacha generatorlar "steroidlardagi ketma-ket saraluvchan" kabi edi. Va shuning uchun ular tez-tez ishlatiladi.

Ammo aslida ular ancha kuchli va moslashuvchan.

Buning sababi shundaki, `yield` ikki tomonlama yo'ldir: u nafaqat natijani tashqariga qaytaradi, balki generator ichidagi qiymatni ham o'tkazishi mumkin.

Buning uchun argument bilan `generator.next(arg)` ni chaqirishimiz kerak. Ushbu argument `yield` natijasiga aylanadi.

Keling, bir misolni ko'rib chiqaylik:

```js run
function* gen() {
*!*
  // Savolni tashqi kodga o'tkazing va javobni kuting
  let result = yield "2 + 2?"; // (*)
*/!*

  alert(result);
}

let generator = gen();

let question = generator.next().value; // <-- yield qiymatni qaytaradi

generator.next(4); // --> natijani generatorga o'tkazish
```

![](genYield2.svg)

1. Birinchi chaqiruv `generator.next()` har doim argumentsiz. U ijroni boshlaydi va birinchi `yield` ("2+2?") natijasini qaytaradi. Shu nuqtada generator bajarilishini to'xtatadi (hali ham o'sha satrda).
2. Keyin, yuqoridagi rasmda ko'rsatilgandek, `yield` natijasi chaqiruv kodidagi `question` o'zgaruvchanga tushadi.
3. `generator.next(4)` da generator qayta ishlaydi va natijada `4` oladi: `let result = 4`.

Iltimos, e'tibor bering, tashqi kod darhol `next(4)` chaqirish shart emas. Qiymatni hisoblash uchun vaqt kerak bo'lishi mumkin. Bu shuningdek yaroqli kod:

```js
// bir muncha vaqt o'tgach generatorni davom ettiring
setTimeout(() => generator.next(4), 1000);
```

Sintaksis biroz g'alati tuyulishi mumkin. Funktsiya va chaqiruv kodi qiymatlarni bir-biriga o'tkazishi juda kam uchraydi. Ammo aynan shu narsa sodir bo'lmoqda.

Ishni yanada aniqroq qilish uchun yana bir misol, qo'shimcha chaqiruvlar:

```js run
function* gen() {
  let ask1 = yield "2 + 2?";

  alert(ask1); // 4

  let ask2 = yield "3 * 3?"

  alert(ask2); // 9
}

let generator = gen();

alert( generator.next().value ); // "2 + 2?"

alert( generator.next(4).value ); // "3 * 3?"

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

Masalan, `"2 + 2?"` hosilasi xatolikka olib keladi:

```js run
function* gen() {
  try {
    let result = yield "2 + 2?"; // (1)

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

`(2)` satridagi generatorga tashlangan xato `(1)` satrida `yield` bilan istisnoga olib keladi. Yuqoridagi misolda `try..catch` uni ushlaydi va ko'rsatadi.

Agar biz uni ushlamasak, unda har qanday istisno kabi, u generatorni chaqiruv kodiga "tushiradi".

Chaqiruv kodining joriy satri `(2)` deb belgilangan `generator.throw` satridir. Shunday qilib, biz uni shu yerda ushlashimiz mumkin:

```js run
function* generate() {
  let result = yield "2 + 2?"; // Ushbu satrda xatolik yuz berdi
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

- Generatorlar generator funktsiyalari tomonidan yaratiladi `function*(…) {…}`.
- Generatorlar ichida (faqat) `yield` operatori mavjud.
- Tashqi kod va generator `next/yield` chaqiruvlar orqali natijalarni almashtirishi mumkin.

Zamonaviy JavaScript-da generatorlar kamdan kam qo'llaniladi. Ammo ba'zida ular foydali bo'ladi, chunki bajarilish paytida funktsiyani chaqirish kodi bilan ma'lumot almashish qobiliyati juda noyobdir.

Shuningdek, keyingi bobda biz `for` tsiklida mos kelmaydigan ma'lumotlar oqimlarini o'qish uchun ishlatiladigan asinxron generatorlarni o'rganamiz.

Veb-dasturlashda biz ko'pincha oqim ma'lumotlari bilan ishlaymiz, masalan, sahifalangan natijalarni olish kerak, shuning uchun bu juda muhim holat.
