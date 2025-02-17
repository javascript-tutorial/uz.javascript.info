
# Tsiklda ko’rib chiqish imokniyatiga ega ma’lumot turlari

<<<<<<< HEAD
*Ketma-ket sarraluvchan* obyektlar - bu massivlarni umumlashtirish. Bu har qanday obyektni `for..of` tsiklida foydalanishga imkon beradigan kontseptsiya.

Albatta, massivlar o'zlari ketma-ket sarraluvchandir. Biroq, masalan, matnlar kabi boshqa ichki ketma-ket sarraluvchan narsalar ham mavjud.

Agar obyekt biron bir narsaning to'plamini (ro'yxati, to'plami) ifodalasa, unda `for..of` uni tsiklash uchun ajoyib sintaksis, shuning uchun uni qanday ishlashini ko'rib chiqamiz.
=======
*Iterable* objects are a generalization of arrays. That's a concept that allows us to make any object useable in a `for..of` loop.

Of course, Arrays are iterable. But there are many other built-in objects, that are iterable as well. For instance, strings are also iterable.

If an object isn't technically an array, but represents a collection (list, set) of something, then `for..of` is a great syntax to loop over it, so let's see how to make it work.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c


## Symbol.iterator

Biz ulardan birini yaratib, ketma-ket sarraluvchanning qurilma tamoyilini osongina tushunamiz.

<<<<<<< HEAD
Masalan, bizda obyekt mavjud, bu massiv emas, lekin `for..of` ga mos keladi.
=======
For instance, we have an object that is not an array, but looks suitable for `for..of`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Raqamlar oralig'ini ifodalovchi `range` obyekti kabi:

```js
let range = {
  from: 1,
  to: 5
};

// Biz for..of ishlashni xohlaymiz:
// for(let num of range) ... num=1,2,3,4,5
```

<<<<<<< HEAD
`range` ni ketma-ket sarraluvchan qilish uchun (va shunday qilib `for..of` ishlash uchun) biz obyektga `Symbol.iterator` nomli usulni qo'shishimiz kerak (buning uchun maxsus o'rnatilgan belgi).

1. `for..of` boshlanganda, u ushbu usulni bir marta chaqiradi (yoki topilmasa xatoni). Usul *ketma-ket sarraluvchan* -- obyektni `next` usuli bilan qaytarishi kerak.
2. Aytgancha, `for..of` *faqat qaytib kelgan obyekt bilan ishlaydi*.
3. Agar `for..of` keyingi qiymatni xohlasa, u obyektda `next()` ni chaqiradi.
4. `next()` ning natijasi `{done: Boolean, value: any}` shaklida bo'lishi kerak, bu yerda `done = true` takrorlanish tugaganligini anglatadi, aks holda `value` yangi qiymat bo'lishi kerak.

`range` uchun to'liq dastur:
=======
To make the `range` object iterable (and thus let `for..of` work) we need to add a method to the object named `Symbol.iterator` (a special built-in symbol just for that).

1. When `for..of` starts, it calls that method once (or errors if not found). The method must return an *iterator* -- an object with the method `next`.
2. Onward, `for..of` works *only with that returned object*.
3. When `for..of` wants the next value, it calls `next()` on that object.
4. The result of `next()` must have the form `{done: Boolean, value: any}`, where `done=true` means that the loop is finished, otherwise `value` is the next value.

Here's the full implementation for `range` with remarks:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let range = {
  from: 1,
  to: 5
};

// 1. for..of chaqiruvi this ni chaqiradi
range[Symbol.iterator] = function() {

<<<<<<< HEAD
  // ...ketma-ket sarraluvchan obyektini qaytaradi:
  // 2. for..of faqat ushbu ketma-ket sarraluvchan bilan ishlaydi, undan keyingi qiymatlarni so'raydi
=======
  // ...it returns the iterator object:
  // 2. Onward, for..of works only with the iterator object below, asking it for next values
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
  return {
    current: this.from,
    last: this.to,

    // 3. next() for..of tsikldan har bir takrorlanishda chaqiriladi
    next() {
      // 4. u qiymatni obyekt sifatida qaytarishi kerak {done:.., value :...}
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// endi u ishlaydi!
for (let num of range) {
  alert(num); // 1, so'ng 2, 3, 4, 5
}
```

<<<<<<< HEAD
Iltimos, ketma-ket sarraluvchanning asosiy xususiyatiga e'tibor bering: muhim tashvislarni ajratish:

- `range` ning o'zida `next()` usuli mavjud emas.
- Buning o'rniga `range[Symbol.iterator]()` ga chaqiruv qilish orqali yana bir `ketma-ket sarraluvchan` deb nomlangan obyekt yaratiladi va u butun takrorlashni boshqaradi.
=======
Please note the core feature of iterables: separation of concerns.

- The `range` itself does not have the `next()` method.
- Instead, another object, a so-called "iterator" is created by the call to `range[Symbol.iterator]()`, and its `next()` generates values for the iteration.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Shunday qilib, ketma-ket sarraluvchan obyekt takrorlanadigan obyektdan ajralib turadi.

Texnik jihatdan biz ularni birlashtira olamiz va kodni soddalashtirish uchun `range` ning o'zini ketma-ket sarraluvchan sifatida ishlatamiz.

Shunga o'xshash:

```js run
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  }
};

for (let num of range) {
  alert(num); // 1, so'ng 2, 3, 4, 5
}
```

Endi `range[Symbol.iterator]()` `range` obyekti o'zini qaytaradi: u kerakli `next()` uslubiga ega va `this.current` da amaldagi takrorlanish jarayonini eslab qoladi. Qisqaroqmi? Ha. Va ba'zida bu ham yaxshi.

<<<<<<< HEAD
Salbiy tomoni shundaki, endi obyekt ustida bir vaqtning o'zida ikkita `for..of` tsikl o'tishi mumkin emas: ular takrorlanish holatini bo'lishadi, chunki faqat bitta ketma-ket sarraluvchan bor -- obyektning o'zi. Ammo ikkita parallel holat kamdan-kam uchraydigan narsa bo'lib, ba'zi bir asenkron stsenariylar bilan bajarilishi mumkin.
=======
The downside is that now it's impossible to have two `for..of` loops running over the object simultaneously: they'll share the iteration state, because there's only one iterator -- the object itself. But two parallel for-ofs is a rare thing, even in async scenarios.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```smart header="Cheksiz ketma-ket sarraluvchanlar"
Cheksiz ketma-ket sarraluvchanlar ham mumkin. Masalan, `range` cheksiz bo'ladi qachonki biz `range.to = Infinity` tayinlasak. Yoki, biz yolg'on tasodifiy sonlarning cheksiz ketma-ketligini yaratadigan `range` obyektini yaratishimiz mumkin. 

`next` uchun cheklovlar yo'q, u tobora ko'proq qiymatlarni qaytarishi mumkin, bu normal holat.

Albatta, bunday takrorlanadigan `for..of` tsikli cheksiz bo'ladi. Ammo biz uni har doim `break` yordamida to'xtata olamiz.
```


## String- ketma-ket sarraluvchan obyekt

Massivlar va matnlar eng ko'p ishlatiladigan ichki ketma-ket sarraluvchan dasturlardan biri.

Matn uchun, `for..of` tsikli belgilarni ko'rib chiqadi:

```js run
for (let char of "test") {
  // 4 marta ishga tushiradi: har bir belgi uchun bir martadan
  alert( char ); // t, so'ng e, so'ng s, so'ng t
}
```

Va surrogat juftlari bilan to'g'ri ishlaydi!

```js run
let str = '𝒳😂';
for (let char of str) {
    alert( char ); // 𝒳, va so'ng 😂
}
```

## Ketma-ket sarraluvchanni aniq chaqirish

<<<<<<< HEAD
Odatda, takrorlanadigan ma'lumotlarning ichki qismi tashqi koddan yashiringan. `for..of` tsikli mavjud, u ishlaydi, shuni bilishimiz kerak.

Ammo narsalarni biroz chuqurroq tushunish uchun keling, qanday qilib ketma-ket sarraluvchanni aniq yaratishni ko'rib chiqaylik.

Biz matnni `for..of` singari takrorlaymiz, lekin to'g'ridan-to'g'ri chaqiruvlar bilan. Ushbu kod matn ketma-ket sarraluvchanini oladi va uni "qo'lda" chaqiradi:
=======
For deeper understanding, let's see how to use an iterator explicitly.

We'll iterate over a string in exactly the same way as `for..of`, but with direct calls. This code creates a string iterator and gets values from it "manually":
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let str = "Hello";

// xuddi shunday qiladi
// for (let char of str) alert(char);

*!*
let iterator = str[Symbol.iterator]();
*/!*

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // belgilarni birma-bir chiqaradi
}
```

Bu kamdan-kam hollarda kerak bo'ladi, lekin bizga `for..of` dan ko'ra ko'proq jarayonni boshqarish imkonini beradi. Masalan, takrorlash jarayonini ikkiga bo'lishimiz mumkin: biroz takrorlang, so'ng to'xtab, yana bir narsa qiling va keyinroq davom eting.

## Ketma-ket sarraluvchan va massivga-o'xshash narsalar

<<<<<<< HEAD
Tashqi ko'rinishiga o'xshash, ammo juda farq qiladigan ikkita rasmiy atama mavjud. Chalkashmaslik uchun ularni yaxshi tushunganingizga ishonch hosil qiling.
=======
Two official terms look similar, but are very different. Please make sure you understand them well to avoid the confusion.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

- *Ketma-ket sarraluvchan* - bu yuqorida tavsiflanganidek, `Symbol.iterator` usulini amalga oshiruvchi obyektlar.
- *Massivga-o'xshash* indekslari va `uzunligi` bo'lgan obyektlar, shuning uchun ular massivga o'xshaydi.

<<<<<<< HEAD
Tabiiyki, bu xususiyatlar birlashtirilishi mumkin. Masalan, satrlar ketma-ket sarraluvchan (`for..of` ularda ishlaydi) va massivga-o'xshash (ularning raqamli ko'rsatkichlari va `uzunligi` mavjud).
=======
When we use JavaScript for practical tasks in a browser or any other environment, we may meet objects that are iterables or array-likes, or both.

For instance, strings are both iterable (`for..of` works on them) and array-like (they have numeric indexes and `length`).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

<<<<<<< HEAD
Ammo ketma-ket sarraluvchan massivga-o'xshash bo'lmasligi mumkin. Va aksincha, massivga-o'xshash ketma-ket sarraluvchan bo'lmasligi mumkin.
=======
But an iterable may not be array-like. And vice versa an array-like may not be iterable.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Masalan, yuqoridagi misolda `range` ketma-ket sarraluvchan, lekin massivga-o'xshash emas, chunki u indekslangan xususiyatlarga va `uzunlikka` ega emas.

Va bu yerda obyekt massivga-o'xshash, ketma-ket sarraluvchan obyekt emas:

```js run
let arrayLike = { // indekslarga va uzunlikka ega => massivga-o'xshash
  0: "Hello",
  1: "World",
  length: 2
};

*!*
// Xato (Symbol.iterator yo'q)
for (let item of arrayLike) {}
*/!*
```

<<<<<<< HEAD
Ularning umumiy jihatlari nimada? Ikkala ketma-ket sarraluvchan va massivga-o'xshash obyektlar odatda *massiv emas*, ularda `push`, `pop` va boshqa usullar yo'q. Agar bizda bunday obyekt bo'lsa va u bilan massivda ishlashni xohlasak, bu juda noqulay.

## Array.from

Ularni birlashtiradigan universal usul [Array.from](mdn:js/Array/from) mavjud. Bu ketma-ket sarraluvchan yoki massivga-o'xshash qiymatni oladi va undan "haqiqiy" `Array` hosil qiladi. Keyin biz unga massiv usullarini chaqira olamiz.
=======
Both iterables and array-likes are usually *not arrays*, they don't have `push`, `pop` etc. That's rather inconvenient if we have such an object and want to work with it as with an array. E.g. we would like to work with `range` using array methods. How to achieve that?

## Array.from

There's a universal method [Array.from](mdn:js/Array/from) that takes an iterable or array-like value and makes a "real" `Array` from it. Then we can call array methods on it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Masalan:

```js run
let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2
};

*!*
let arr = Array.from(arrayLike); // (*)
*/!*
alert(arr.pop()); // World (usul ishlaydi)
```

<<<<<<< HEAD
`(*)` satridagi `Array.from` obyektni oladi, uni ketma-ket sarraluvchan yoki massivga-o'xshashligini tekshiradi, so'ngra yangi massiv hosil qiladi va u yerga barcha elementlarni ko'chiradi.
=======
`Array.from` at the line `(*)` takes the object, examines it for being an iterable or array-like, then makes a new array and copies all items to it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Xuddi shu narsa ketma-ket sarraluvchan uchun sodir bo'ladi:

<<<<<<< HEAD
```js
// ushbu range yuqoridagi misoldan olingan deb taxmin qilsak
=======
```js run
// assuming that range is taken from the example above
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 (toString massivning konversiyasi ishlaydi)
```

<<<<<<< HEAD
`Array.from` uchun to'liq sintaksis ixtiyoriy "xaritalash" funktsiyasini ta'minlashga imkon beradi:
=======
The full syntax for `Array.from` also allows us to provide an optional "mapping" function:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```js
Array.from(obj[, mapFn, thisArg])
```

<<<<<<< HEAD
Ikkinchi argument `mapFn` massivga qo'shilishdan oldin har bir elementga tatbiq etiladigan funktsiya bo'lishi kerak va `thisArg` buning uchun `this` ni o'rnatishga imkon beradi.
=======
The optional second argument `mapFn` can be a function that will be applied to each element before adding it to the array, and `thisArg` allows us to set `this` for it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Masalan:

<<<<<<< HEAD
```js
// ushbu range yuqoridagi misoldan olingan deb taxmin qilsak
=======
```js run
// assuming that range is taken from the example above
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

// har bir sonning kvadrati
let arr = Array.from(range, num => num * num);

alert(arr); // 1,4,9,16,25
```

Bu erda biz qatorni belgilar massiviga aylantirish uchun `Array.from` dan foydalanamiz:

```js run
let str = '𝒳😂';

// massivni belgilar qatoriga ajratadi
let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2
```

`str.split` dan farqli o'laroq, u matnning takrorlanadigan xususiyatiga asoslanadi va shunga o'xshash, `for..of` uchun, surrogat juftlar bilan to'g'ri ishlaydi.

Texnik jihatdan bu yerda u quyidagilarni bajaradi:

```js run
let str = '𝒳😂';

let chars = []; // Array.from ichki bir xil tsikl bajaradi
for (let char of str) {
  chars.push(char);
}

alert(chars);
```

<<<<<<< HEAD
<<<<<<< HEAD
...Ammo qisqaroq.
=======
...But it is shorter.    
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
...But it is shorter.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Hatto surrogat juftlarini qo'llab-quvvatlaydigan `slice` yaratishimiz mumkin:

```js run
function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}

let str = '𝒳😂𩷶';

alert( slice(str, 1, 3) ); // 😂𩷶

<<<<<<< HEAD
// mahalliy usul surrogat juftlarni qo'llab-quvvatlamaydi
alert( str.slice(1, 3) ); // axlat (har xil surrogat juftlaridan ikki dona)
=======
// the native method does not support surrogate pairs
alert( str.slice(1, 3) ); // garbage (two pieces from different surrogate pairs)
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```


## Xulosa

`for..of` da ishlatilishi mumkin bo'lgan obyektlar *ketma-ket sarraluvchan* deb nomlanadi.

<<<<<<< HEAD
- Texnik jihatdan, takrorlanadigan ma'lumotlar `Symbol.iterator` nomli usulni amalga oshirishi kerak.
    - `Obj[Symbol.iterator]` natijasi *ketma-ket sarraluvchan* deb nomlanadi. Bu keyingi takrorlash jarayonini boshqaradi.
    - Takrorlash moslamasida `next()` deb nomlangan usul bo'lishi kerak, u `{done: Boolean, value: any}` obyektini qaytaradi, bu yerda `done: true` takrorlanish oxirini bildiradi, aks holda `value` keyingi qiymatdir.
- `Symbol.iterator` usuli avtomatik ravishda `for..of` tomonidan chaqiriladi, lekin biz buni to'g'ridan-to'g'ri amalga oshirishimiz mumkin.
- Matnlar yoki massivlar singari o'rnatilgan ketma-ket sarraluvchan narsalar, shuningdek, `Symbol.iterator` ni amalga oshiradi.
- Matn ketma-ket sarraluvchani surrogat juftliklari haqida biladi.
=======
- Technically, iterables must implement the method named `Symbol.iterator`.
    - The result of `obj[Symbol.iterator]()` is called an *iterator*. It handles further iteration process.
    - An iterator must have the method named `next()` that returns an object `{done: Boolean, value: any}`, here `done:true` denotes the end of the iteration process, otherwise the `value` is the next value.
- The `Symbol.iterator` method is called automatically by `for..of`, but we also can do it directly.
- Built-in iterables like strings or arrays, also implement `Symbol.iterator`.
- String iterator knows about surrogate pairs.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c


Indekslangan xususiyatlarga va `uzunlikka` ega bo'lgan obyektlar *massivga-o'xshash* deb nomlanadi. Bunday obyektlar boshqa xususiyat va usullarga ham ega bo'lishi mumkin, ammo massivlarning o'rnatilgan usullari yetishmayadi.

Agar biz spetsifikatsiyani ko'rib chiqsak -- aksariyat o'rnatilgan usullar ularni "haqiqiy" massivlar o'rniga ketma-ket sarraluvchan yoki massivga-o'xshash obyektlar bilan ishlaydi deb o'ylashadi, chunki bu mavhumroq.

<<<<<<< HEAD
`Array.from(obj[, mapFn, thisArg])` ketma-ket sarraluvchan yoki massivga-o'xshash `obj` ning haqiqiy `Array`ini hosil qiladi va biz undan keyin massiv usullaridan foydalanishimiz mumkin. `mapFn` va `thisArg` ixtiyoriy argumentlari har bir element uchun funktsiyani qo'llashimizga imkon beradi.
=======
`Array.from(obj[, mapFn, thisArg])` makes a real `Array` from an iterable or array-like `obj`, and we can then use array methods on it. The optional arguments `mapFn` and `thisArg` allow us to apply a function to each item.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
