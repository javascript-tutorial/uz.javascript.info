# Massiv usullari

<<<<<<< HEAD
Massivlar juda ko'p usullarni taqdim etadi. Ishlarni engillashtirish uchun ushbu bobda ular guruhlarga bo'lingan.
=======
Arrays provide a lot of methods. To make things easier, in this chapter, they are split into groups.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

## Elementlarni qo'shish/olib tashlash

Biz allaqachon elementlarni boshidan yoki oxiridan qo'shib olib tashlaydigan usullarni bilamiz:

- `arr.push(...items)` -- oxiriga narsalarni qo'shadi,
- `arr.pop()` -- oxiridan elementni ajratib oladi,
- `arr.shift()` -- boshidan elementni ajratib oladi,
- `arr.unshift(...items)` -- elementlarni boshiga qo'shadi.

<<<<<<< HEAD
Mana boshqalar.
=======
Here are a few others.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

### splice

Massivdan elementni qanday o'chirish mumkin?

Massivlar obyektlardir, shuning uchun biz `delete` dan foydalanishga urinib ko'rishimiz mumkin:

```js run
let arr = ["I", "go", "home"];

delete arr[1]; // "go" olib tashlash 

alert( arr[1] ); // undefined

// hozir arr = ["I",  , "home"];
alert( arr.length ); // 3
```

Element o'chirildi, ammo massivda hali ham 3 ta element mavjud, biz buni ko'rishimiz mumkin `arr.length == 3`.

<<<<<<< HEAD
Bu tabiiy, chunki `obj.key` ni o'chirish `key` yordamida qiymatni olib tashlaydi. Hammasi shu. Obyektlar uchun yaxshi. Ammo massivlar uchun biz odatda qolgan elementlarning siljishini va bo'sh joyni egallashini istaymiz. Biz hozirda qisqaroq massivga ega bo'lishni kutmoqdamiz.
=======
That's natural, because `delete obj.key` removes a value by the `key`. It's all it does. Fine for objects. But for arrays we usually want the rest of the elements to shift and occupy the freed place. We expect to have a shorter array now.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

Shunday qilib, maxsus usullardan foydalanish kerak.

<<<<<<< HEAD
<<<<<<< HEAD
[arr.splice(str)](mdn:js/Array/splice) usuli - bu massivlar uchun "Shveytsariya armiyasining pichog'i". U hamma narsani qilishi mumkin: elementlarni qo'shish, olib tashlash va kiritish.
=======
The [arr.splice](mdn:js/Array/splice) method is a swiss army knife for arrays. It can do everything: insert, remove and replace elements.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
The [arr.splice](mdn:js/Array/splice) method is a Swiss army knife for arrays. It can do everything: insert, remove and replace elements.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

Sintaksis:

```js
arr.splice(start[, deleteCount, elem1, ..., elemN])
```

<<<<<<< HEAD
U `indeks` pozitsiyasidan boshlanadi: `deleteCount` elementlarini olib tashlaydi va keyin ularning o'rniga `elem1, ..., elemN` qo'shadi. O'chirilgan elementlar masssivini qaytaradi.
=======
It modifies `arr` starting from the index `start`: removes `deleteCount` elements and then inserts `elem1, ..., elemN` at their place. Returns the array of removed elements.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Ushbu usulni misollar yordamida tushunish oson.

O'chirish bilan boshlaymiz:

```js run
let arr = ["I", "study", "JavaScript"];

*!*
arr.splice(1, 1); // 1-indeksdan 1 ta elementni olib tashlang
*/!*

alert( arr ); // ["I", "JavaScript"]
```

Oson, to‘g‘rimi? `1` indeksidan boshlab, u `1` elementni olib tashladi.

<<<<<<< HEAD
Keyingi misolda biz uchta elementni olib tashlaymiz va ularni qolgan ikkitasi bilan almashtiramiz:
=======
In the next example, we remove 3 elements and replace them with the other two:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js run
let arr = [*!*"I", "study", "JavaScript",*/!* "right", "now"];

// birinchi uchta elementni olib tashlang va ularni boshqasiga almashtiring
arr.splice(0, 3, "Let's", "dance");

alert( arr ) // hozir [*!*"Let's", "dance"*/!*, "right", "now"]
```

Bu erda `splice` o'chirilgan elementlar massivini qaytarishini ko'rishimiz mumkin:

```js run
let arr = [*!*"I", "study",*/!* "JavaScript", "right", "now"];

// birinchi ikkita elementni olib tashlang
let removed = arr.splice(0, 2);

alert( removed ); // "I", "study" <-- o'chirilgan elementlarning massivi
```

<<<<<<< HEAD
`splice` usuli elementlarni hech qanday olib tashlamasdan kiritishga qodir. Buning uchun biz `deleteCount` ni `0` ga o'rnatishimiz kerak:
=======
The `splice` method is also able to insert the elements without any removals. For that, we need to set `deleteCount` to `0`:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js run
let arr = ["I", "study", "JavaScript"];

// indeks 2 dan
// o'chirish 0
// keyin "complex" va "language" ni kiriting
arr.splice(2, 0, "complex", "language");

alert( arr ); // "I", "study", "complex", "language", "JavaScript"
```

````smart header="Salbiy indekslarga ruxsat berilgan"
Bu yerda va boshqa massiv usullarida salbiy indekslarga yo'l qo'yiladi. Ular massiv oxiridan pozitsiyani quyidagicha ko'rsatadilar:

```js run
let arr = [1, 2, 5];

// from index -1 (oxiridan bir qadam)
// 0 elementni o'chirish,
// keyin 3 va 4 ni kiriting
arr.splice(-1, 0, 3, 4);

alert( arr ); // 1,2,3,4,5
```
````

### slice

<<<<<<< HEAD
[arr.slice](mdn:js/Array/slice) usuli  o'xshash `arr.splice` ga qaraganda ancha sodda.
=======
The method [arr.slice](mdn:js/Array/slice) is much simpler than the similar-looking `arr.splice`.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

Sintaksis:

```js
arr.slice([start], [end])
```

<<<<<<< HEAD
U `"start"` dan `"end"` gacha (`"end"` hisobga olinmagan) barcha elementlarni o'z ichiga olgan yangi massivni qaytaradi. Har ikkala `start` va `end` ham salbiy bo'lishi mumkin, bu holda massiv oxiridan pozitsiya qabul qilinadi.

U `str.slice` kabi ishlaydi, lekin submatnlar o'rniga submassivlar yaratadi.
=======
It returns a new array copying to it all items from index `start` to `end` (not including `end`). Both `start` and `end` can be negative, in that case position from array end is assumed.

<<<<<<< HEAD
It's similar to a string method `str.slice`, but instead of substrings it makes subarrays.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======
It's similar to a string method `str.slice`, but instead of substrings, it makes subarrays.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

Masalan:

```js run
let arr = ["t", "e", "s", "t"];

alert( arr.slice(1, 3) ); // e,s (copy from 1 to 3)

alert( arr.slice(-2) ); // s,t (copy from -2 till the end)
```

We can also call it without arguments: `arr.slice()` creates a copy of `arr`. That's often used to obtain a copy for further transformations that should not affect the original array.

### concat

<<<<<<< HEAD
Metod [arr.concat](mdn:js/Array/concat) massivni boshqa massivlar va/yoki elementlar bilan birlashtiradi.
=======
The method [arr.concat](mdn:js/Array/concat) creates a new array that includes values from other arrays and additional items.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Sintaksis:

```js
arr.concat(arg1, arg2...)
```

U har qanday argumentlarni qabul qiladi -- yoki massivlar, yoki qiymatlar.

Natijada `arr`, keyin `arg1`, `arg2` va hokazolarni o'z ichiga olgan yangi massiv hosil bo'ladi.

<<<<<<< HEAD
Agar argument massiv bo'lsa yoki `Symbol.isConcatSpreadable` xususiyatiga ega bo'lsa, unda uning barcha elementlari ko'chiriladi. Aks holda, argumentning o'zi ko'chiriladi.
=======
If an argument `argN` is an array, then all its elements are copied. Otherwise, the argument itself is copied.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Masalan:

```js run
let arr = [1, 2];

<<<<<<< HEAD
// arr ni [3,4] bilan birlashtirish
alert( arr.concat([3, 4])); // 1,2,3,4

// arr ni [3,4] va [5,6] bilan birlashtirish
alert( arr.concat([3, 4], [5, 6])); // 1,2,3,4,5,6

// arr ni [3,4] bilan birlashtirish, so'ngra 5 va 6 qiymatlarini qo'shish
alert( arr.concat([3, 4], 5, 6)); // 1,2,3,4,5,6
```

Odatda, u faqat elementlarni massivlardan ko'chiradi (ularni "tarqatadi"). Boshqa obyektlar, hatto ular massivga o'xshash bo'lsa ham, umuman qo'shiladi:
=======
// create an array from: arr and [3,4]
alert( arr.concat([3, 4]) ); // 1,2,3,4

// create an array from: arr and [3,4] and [5,6]
alert( arr.concat([3, 4], [5, 6]) ); // 1,2,3,4,5,6

// create an array from: arr and [3,4], then add values 5 and 6
alert( arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,6
```

Normally, it only copies elements from arrays. Other objects, even if they look like arrays, are added as a whole:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let arr = [1, 2];

let arrayLike = {
  0: "something",
  length: 1
};

alert( arr.concat(arrayLike) ); // 1,2,[object Object]
```

<<<<<<< HEAD
...Agar massivga o'xshash obyektda `Symbol.isConcatSpreadable` xususiyati bo'lsa, uning o'rniga uning elementlari qo'shiladi:
=======
...But if an array-like object has a special `Symbol.isConcatSpreadable` property, then it's treated as an array by `concat`: its elements are added instead:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let arr = [1, 2];

let arrayLike = {
  0: "something",
  1: "else",
*!*
  [Symbol.isConcatSpreadable]: true,
*/!*
  length: 2
};

alert( arr.concat(arrayLike) ); // 1,2,something,else
```

## Takrorlash: forEach

[arr.forEach](mdn:js/Array/forEach) usuli massivning har bir elementi uchun funktsiyani bajarishga imkon beradi.

Sintaksis:
```js
arr.forEach(function(item, index, array) {
<<<<<<< HEAD
  // ... item bilan biror narsa qilish
=======
  // ... do something with an item
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
});
```

Masalan, bu massivning har bir elementini ko'rsatadi:

```js run
// har bir element uchun ogohlantirish
["Bilbo", "Gandalf", "Nazgul"].forEach(alert);
```

Va ushbu kod maqsadli massivda ularning pozitsiyalari haqida batafsilroq ma'lumot berilgan:

```js run
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} ${array} massivida ${index} indeksida`);
});
```

Funktsiya natijasi (agar u biron bir narsani qaytarsa) tashlanadi va e'tiborga olinmaydi.


## Massivda qidirish

<<<<<<< HEAD
Bu massivda biror narsani qidirish usullari.
=======
Now let's cover methods that search in an array.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

### indexOf/lastIndexOf va includes

<<<<<<< HEAD
[arr.indexOf](mdn:js/Array/indexOf), [arr.lastIndexOf](mdn:js/Array/lastIndexOf) va [arr.includes](mdn:js/Array/include) usullari bir xil sintaksisga ega. va aslida ularning matnga o'xshashadi, lekin belgilar o'rniga elementlarda ishlashadi:
=======
The methods [arr.indexOf](mdn:js/Array/indexOf) and [arr.includes](mdn:js/Array/includes) have the similar syntax and do essentially the same as their string counterparts, but operate on items instead of characters:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

<<<<<<< HEAD
- `arr.indexOf(item, from)`  `from` indeksdan boshlab `item` ni qidiradi va topilgan joyning indeksini qaytaradi, aks holda `-1`.
- `arr.lastIndexOf(item, from)` -- xuddi shunday, lekin o'ngdan chapga qidiradi.
- `arr.includes(item, from)` -- `from` indeksdan boshlab `item` ni izlaydi, agar topilsa `true` qiymatini beradi.
=======
- `arr.indexOf(item, from)` -- looks for `item` starting from index `from`, and returns the index where it was found, otherwise `-1`.
- `arr.includes(item, from)` -- looks for `item` starting from index `from`, returns `true` if found.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

<<<<<<< HEAD
Masalan:
=======
Usually, these methods are used with only one argument: the `item` to search. By default, the search is from the beginning.

For instance:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js run
let arr = [1, 0, false];

alert( arr.indexOf(0) ); // 1
alert( arr.indexOf(false) ); // 2
alert( arr.indexOf(null) ); // -1

alert( arr.includes(1) ); // true
```

<<<<<<< HEAD
E'tibor bering, usullarda `===` taqqoslash qo'llaniladi. Shunday qilib, agar biz `false` ni qidirsak, u nolni emas, balki `false` ni topadi.

Agar biz inklyuziyani tekshirishni istasak va aniq indeksni bilmoqchi bo'lmasak, u holda `arr.includes` afzal.

Bundan tashqari, `include` ning juda oz farqi shundaki, u `indexOf/lastIndexOf` dan farqli o'laroq, `NaN` da to'g'ri ishlaydi.

```js run
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1 (0 bo'lishi kerak, lekin === tenglik NaN uchun ishlamaydi)
alert( arr.includes(NaN) );// true (to'g'ri)
=======
Please note that `indexOf` uses the strict equality `===` for comparison. So, if we look for `false`, it finds exactly `false` and not the zero.

If we want to check if `item` exists in the array and don't need the index, then `arr.includes` is preferred.

The method [arr.lastIndexOf](mdn:js/Array/lastIndexOf) is the same as `indexOf`, but looks for from right to left.

```js run
let fruits = ['Apple', 'Orange', 'Apple']

alert( fruits.indexOf('Apple') ); // 0 (first Apple)
alert( fruits.lastIndexOf('Apple') ); // 2 (last Apple)
```

````smart header="The `includes` method handles `NaN` correctly"
A minor, but noteworthy feature of `includes` is that it correctly handles `NaN`, unlike `indexOf`:

```js run
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1 (wrong, should be 0)
alert( arr.includes(NaN) );// true (correct)
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
```
That's because `includes` was added to JavaScript much later and uses the more up-to-date comparison algorithm internally.
````

<<<<<<< HEAD
### find va findIndex

Bizda bir obyektlar massivi mavjudligini tasavvur qiling. Muayyan shartli obyektni qanday topishimiz mumkin?
=======
### find and findIndex/findLastIndex

Imagine we have an array of objects. How do we find an object with a specific condition?
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

<<<<<<< HEAD
Bu yerda [arr.find](mdn:js/Array/find) usuli foydalidir.
=======
Here the [arr.find(fn)](mdn:js/Array/find) method comes in handy.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Sintaksis:
```js
let result = arr.find(function(item, index, array) {
  // agar true qaytarilsa, element qaytariladi va takrorlash to'xtatiladi
  // false senariy uchun undefined qaytariladi
});
```

<<<<<<< HEAD
Funktsiya massivning har bir elementi uchun takroriy ravishda chaqiriladi:
=======
The function is called for elements of the array, one after another:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

- `item` element hisoblanadi.
- `index` bu uning indeksidir.
- `array` massivning o'zi.

<<<<<<< HEAD
Agar u `true` ni qaytarsa, qidiruv to'xtatiladi, `item` qaytariladi. Hech narsa topilmasa, `undefined` qaytariladi.
=======
If it returns `true`, the search is stopped, the `item` is returned. If nothing is found, `undefined` is returned.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

Masalan, bizda foydalanuvchilar massivi bor, ularning har biri `id` va `name` argumentlariga ega. Keling, `id == 1` bilan topamiz:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

let user = users.find(item => item.id == 1);

alert(user.name); // John
```

<<<<<<< HEAD
Haqiqiy hayotda obyektlar massivi odatiy holdir, shuning uchun `find` usuli juda foydali.
=======
In real life, arrays of objects are a common thing, so the `find` method is very useful.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

<<<<<<< HEAD
E'tibor bering, biz misolda `item => item.id == 1` funktsiyasini bitta argument bilan `topish` ni ta'minlaymiz. Ushbu funktsiyaning boshqa argumentlari kamdan kam qo'llaniladi.
=======
Note that in the example we provide to `find` the function `item => item.id == 1` with one argument. That's typical, other arguments of this function are rarely used.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

<<<<<<< HEAD
[arr.findIndex](mdn:js/Array/findIndex) usuli asosan bir xil, ammo u elementning o'zi o'rniga element topilgan indeksni qaytaradi va hech narsa topilmaganda `-1` qaytariladi.
=======
The [arr.findIndex](mdn:js/Array/findIndex) method has the same syntax but returns the index where the element was found instead of the element itself. The value of `-1` is returned if nothing is found.

The [arr.findLastIndex](mdn:js/Array/findLastIndex) method is like `findIndex`, but searches from right to left, similar to `lastIndexOf`.

Here's an example:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"},
  {id: 4, name: "John"}
];

// Find the index of the first John
alert(users.findIndex(user => user.name == 'John')); // 0

// Find the index of the last John
alert(users.findLastIndex(user => user.name == 'John')); // 3
```
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

### filter

`find` usuli funktsiyani `true` qaytaradigan yagona (birinchi) elementni qidiradi.

Agar ko'p bo'lsa, biz [arr.filter(fn)](mdn:js/Array/filter) dan foydalanishimiz mumkin.

<<<<<<< HEAD
Sintaksis `find` ga o'xshaydi, lekin `true` allaqachon qaytarilgan bo'lsa ham, massivning barcha elementlari uchun filtr takrorlashni davom ettiradi:

```js
let results = arr.filter(function(item, index, array) {
  // agar true element natijalarga chiqarilsa va takrorlanish davom etsa
  // false senariy uchun bo'sh qatorni qaytaradi
=======
The syntax is similar to `find`, but `filter` returns an array of all matching elements:

```js
let results = arr.filter(function(item, index, array) {
  // if true item is pushed to results and the iteration continues
  // returns empty array if nothing found
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
});
```

Masalan:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

// dastlabki ikkita foydalanuvchi massivini qaytaradi
let someUsers = users.filter(item => item.id < 3);

alert(someUsers.length); // 2
```

## Massivni o'zgartirish

<<<<<<< HEAD
Ushbu bo'lim massivni o'zgartirish yoki qayta tartiblash usullari haqida.

=======
Let's move on to methods that transform and reorder an array.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

### map

[arr.map](mdn:js/Array/map) usuli eng foydali va tez-tez ishlatiladigan usullardan biridir.

<<<<<<< HEAD
Sintaksis:

```js
let result = arr.map(function(item, index, array) {
  // element o'rniga yangi qiymatni qaytaradi
})
```

U massivning har bir elementi uchun funktsiyani chaqiradi va natijalar massivini qaytaradi.

Masalan, biz har bir elementni uning uzunligiga aylantiramiz:
=======
It calls the function for each element of the array and returns the array of results.

The syntax is:

```js
let result = arr.map(function(item, index, array) {
  // returns the new value instead of item
});
```

For instance, here we transform each element into its length:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths); // 5,7,6
```

### sort(fn)

<<<<<<< HEAD
[arr.sort](mdn:js/Array/sort) usuli massivni *joyida* tartiblaydi.
=======
The call to [arr.sort()](mdn:js/Array/sort) sorts the array *in place*, changing its element order.

It also returns the sorted array, but the returned value is usually ignored, as `arr` itself is modified.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Masalan:

```js run
let arr = [ 1, 2, 15 ];

<<<<<<< HEAD
// usul arr tarkibini qayta tartibga soladi (va uni qaytaradi)
=======
// the method reorders the content of arr
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
arr.sort();

alert( arr );  // *!*1, 15, 2*/!*
```

Natijada qandaydir g'alati narsani sezdingizmi?

Tartib `1, 15, 2` bo'ldi. Noto'g'ri. Lekin nega?

**Sukut bo'yicha elementlar matn sifatida tartiblangan.**

<<<<<<< HEAD
To'g'ridan-to'g'ri, barcha elementlar matnlarga aylantiriladi va keyin taqqoslanadi. Shunday qilib, leksikografik tartib qo'llaniladi va haqiqatan ham `"2" > "15"`.

O'zimizning tartiblash usulimizdan foydalanish uchun biz ikkita argumentning funktsiyasini `array.sort()` argumenti sifatida ta'minlashimiz kerak.

Funktsiya shunday ishlashi kerak:
=======
Literally, all elements are converted to strings for comparisons. For strings, lexicographic ordering is applied and indeed `"2" > "15"`.

To use our own sorting order, we need to supply a function as the argument of `arr.sort()`.

The function should compare two arbitrary values and return:
<<<<<<< HEAD
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
=======

>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
```js
function compare(a, b) {
  if (a > b) return 1; // if the first value is greater than the second
  if (a == b) return 0; // if values are equal
  if (a < b) return -1; // if the first value is less than the second
}
```

<<<<<<< HEAD
Masalan:
=======
For instance, to sort as numbers:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

let arr = [ 1, 2, 15 ];

*!*
arr.sort(compareNumeric);
*/!*

alert(arr);  // *!*1, 2, 15*/!*
```

Endi u maqsadga muvofiq ishlaydi.

<<<<<<< HEAD
<<<<<<< HEAD
Keling, chetga chiqib, nima bo'layotganini o'ylab ko'raylik. `arr` har qanday narsaning massivi bo'lishi mumkin, shunday emasmi? Unda raqamlar yoki matnlar yoki HTML elementlari yoki boshqa narsalar bo'lishi mumkin. Bizda *bir narsa* to'plami mavjud. Uni saralash uchun uning elementlarini taqqoslashni biladigan *tartiblash funktsiyasi* kerak. Sukut bo'yicha matn tartibi.

`arr.sort(fn)` usuli tartiblash algoritmini o'rnatilgan dasturiga ega. Biz uning qanday ishlashiga ahamiyat berishimiz shart emas (ko'pincha optimallashtirilgan [quicksort](https://en.wikipedia.org/wiki/Quicksort)). U massivda yuradi, taqdim etilgan funktsiya yordamida elementlarini taqqoslaydi va ularni tartibini o'zgartiradi, bizga taqqoslashni amalga oshiradigan `fn` kerak bo'ladi.
=======
Let's step aside and think what's happening. The `arr` can be array of anything, right? It may contain numbers or strings or objects or whatever. We have a set of *some items*. To sort it, we need an *ordering function* that knows how to compare its elements. The default is a string order.
=======
Let's step aside and think about what's happening. The `arr` can be an array of anything, right? It may contain numbers or strings or objects or whatever. We have a set of *some items*. To sort it, we need an *ordering function* that knows how to compare its elements. The default is a string order.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

The `arr.sort(fn)` method implements a generic sorting algorithm. We don't need to care how it internally works (an optimized [quicksort](https://en.wikipedia.org/wiki/Quicksort) or [Timsort](https://en.wikipedia.org/wiki/Timsort) most of the time). It will walk the array, compare its elements using the provided function and reorder them, all we need is to provide the `fn` which does the comparison.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

<<<<<<< HEAD
Aytgancha, qaysi elementlar taqqoslanganligini bilmoqchi bo'lsak -- ularni ogohlantirishga hech narsa to'sqinlik qilmaydi:
=======
By the way, if we ever want to know which elements are compared -- nothing prevents us from alerting them:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js run
[1, -2, 15, 2, 0, 8].sort(function(a, b) {
  alert( a + " <> " + b );
  return a - b;
});
```

<<<<<<< HEAD
Algoritm bu jarayonda elementni bir necha marta taqqoslashi mumkin, ammo iloji boricha kamroq taqqoslashga harakat qiladi.

=======
The algorithm may compare an element with multiple others in the process, but it tries to make as few comparisons as possible.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

````smart header="Taqqoslash funktsiyasi istalgan raqamni qaytarishi mumkin"
Aslida, taqqoslash funktsiyasi faqat ijobiy sonni "kattaroq", manfiy raqamni "kamroq" deb qaytarish uchun talab qilinadi.

Bu qisqa funktsiyalarni yozishga imkon beradi:

```js run
let arr = [ 1, 2, 15 ];

arr.sort(function(a, b) { return a - b; });

alert(arr);  // *!*1, 2, 15*/!*
```
````

<<<<<<< HEAD
````smart header="O'q funktsiyalari eng yaxshisi"
Esingizdami [o'q funktsiyalar](info:function-expressions-arrows#arrow-functions)? Biz ularni bu yerda chiroyli tartiblash uchun ishlatishimiz mumkin:
=======
````smart header="Arrow functions for the best"
Remember [arrow functions](info:arrow-functions-basics)? We can use them here for neater sorting:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
arr.sort( (a, b) => a - b );
```

<<<<<<< HEAD
Bu yuqoridagi boshqa, uzoqroq versiya bilan bir xil ishlaydi.
=======
This works exactly the same as the longer version above.
````

````smart header="Use `localeCompare` for strings"
Remember [strings](info:string#correct-comparisons) comparison algorithm? It compares letters by their codes by default.

For many alphabets, it's better to use `str.localeCompare` method to correctly sort letters, such as `Ö`.

For example, let's sort a few countries in German:

```js run
let countries = ['Österreich', 'Andorra', 'Vietnam'];

alert( countries.sort( (a, b) => a > b ? 1 : -1) ); // Andorra, Vietnam, Österreich (wrong)

alert( countries.sort( (a, b) => a.localeCompare(b) ) ); // Andorra,Österreich,Vietnam (correct!)
```
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
````

### reverse

[arr.reverse](mdn:js/Array/reverse) usuli `arr` dagi elementlarning tartibini o'zgartiradi.

Masalan:

```js run
let arr = [1, 2, 3, 4, 5];
arr.reverse();

alert( arr ); // 5,4,3,2,1
```

Bu, shuningdek, `arr` massivni qaytaradi.

### split va join

<<<<<<< HEAD
Mana, hayotdagi holat. Biz xabar almashish dasturini yozmoqdamiz va odam qabul qiluvchilarning vergul bilan ajratilgan ro'yxatini kiritdi: `John, Pete, Mary`. Ammo biz uchun ismlar massivi bitta matnga qaraganda ancha qulayroq bo'lar edi. Qanday qilib olish mumkin?
=======
Here's the situation from real life. We are writing a messaging app, and the person enters the comma-delimited list of receivers: `John, Pete, Mary`. But for us an array of names would be much more comfortable than a single string. How to get it?
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

[str.split(delim)](mdn:js/String/split) usuli aynan shu narsani qiladi. U matnni berilgan massivga ajratadi `delim`.

<<<<<<< HEAD
Quyidagi misolda biz vergul bilan bo'sh joyni bo'ldik:
=======
In the example below, we split by a comma followed by a space:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js run
let names = 'Bilbo, Gandalf, Nazgul';

let arr = names.split(', ');

for (let name of arr) {
  alert( `A message to ${name}.` ); // A message to Bilbo  (va boshqa ismlar)
}
```

`split` usuli ixtiyoriy ikkinchi raqamli argumentga ega -- bu massiv uzunligining chegarasi. Agar u taqdim etilsa, unda qo'shimcha elementlar e'tiborga olinmaydi. Amalda u kamdan-kam hollarda qo'llaniladi:

```js run
let arr = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);

alert(arr); // Bilbo, Gandalf
```

````smart header="Harflarga bo'lish"
Bo'sh `s` bilan `split(s)` ni chaqirish matnni harflar massiviga ajratadi:

```js run
let str = "test";

alert( str.split('') ); // t,e,s,t
```
````

<<<<<<< HEAD
[arr.join(separator)](mdn:js/Array/join) chaqiruvi `split` ga teskari harakat qiladi. U orasida `separator` bilan yopishtirilgan `arr` matnini yaratadi.
=======
The call [arr.join(glue)](mdn:js/Array/join) does the reverse to `split`. It creates a string of `arr` items joined by `glue` between them.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Masalan:

```js run
let arr = ['Bilbo', 'Gandalf', 'Nazgul'];

let str = arr.join(';'); // glue the array into a string using ;

alert( str ); // Bilbo;Gandalf;Nazgul
```

### reduce/reduceRight

Biz massivni takrorlashimiz kerak bo'lganda -- `forEach`, `for` yoki `for..of` dan foydalanishimiz mumkin.

Har bir element uchun ma'lumotlarni takrorlash va qaytarish kerak bo'lganda biz `map` dan foydalanishimiz mumkin.

[arr.reduce](mdn:js/Array/reduce) va [arr.reduceRight](mdn:js/Array/reduceRight) usullari ham ushbu zotga tegishli, ammo biroz murakkabroq. Ular massiv asosida bitta qiymatni hisoblash uchun ishlatiladi.

Sintaksis:

```js
let value = arr.reduce(function(accumulator, item, index, array) {
  // ...
}, [initial]);
```

<<<<<<< HEAD
Funktsiya elementlarga qo'llaniladi. Siz 2-dan boshlab tanish bo'lgan argumentlarni ko'rishingiz mumkin:

- `item` -- joriy massiv elementi.
- `index` -- uning pozitsiyasi.
- `array` -- bu massiv.

Hozircha, `forEach/map` kabi. Ammo yana bir argument bor:

- `previousValue` -- oldingi funktsiya chaqiruvining natijasidir, birinchi chaqiruv uchun `boshlang'ich`.
=======
The function is applied to all array elements one after another and "carries on" its result to the next call.

Arguments:

- `accumulator` -- is the result of the previous function call, equals `initial` the first time (if `initial` is provided).
- `item` -- is the current array item.
- `index` -- is its position.
- `array` -- is the array.

As the function is applied, the result of the previous function call is passed to the next one as the first argument.

So, the first argument is essentially the accumulator that stores the combined result of all previous executions. And at the end, it becomes the result of `reduce`.

Sounds complicated?
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Buni tushunishning eng oson usuli, bu misol.

<<<<<<< HEAD
Bu erda biz bitta satrda massiv yig'indisini olamiz:
=======
Here we get a sum of an array in one line:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current, 0);

alert(result); // 15
```

<<<<<<< HEAD
Bu erda biz faqat 2 ta argumentdan foydalanadigan `reduce` ning eng keng tarqalgan variantini qo'lladik.
=======
The function passed to `reduce` uses only 2 arguments, that's typically enough.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Keling, nima bo'layotganini batafsil ko'rib chiqamiz.

<<<<<<< HEAD
1. Birinchi bajarilishda `sum` - boshlang'ich qiymat (`reduce` ning so'nggi argumenti), `0` ga teng, va `joriy` qiymat - bu birinchi massiv elementi, `1` ga teng. Shunday qilib natija `1` dir.
2. Ikkinchi bajarilishda `sum = 1`, unga ikkinchi massiv elementini (`2`) qo'shamiz va qaytaramiz.
3. Uchinchi bajarilishda `sum = 3` va unga yana bitta element qo'shamiz va hokazo...
=======
1. On the first run, `sum` is the `initial` value (the last argument of `reduce`), equals `0`, and `current` is the first array element, equals `1`. So the function result is `1`.
2. On the second run, `sum = 1`, we add the second array element (`2`) to it and return.
3. On the 3rd run, `sum = 3` and we add one more element to it, and so on...
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Hisoblash oqimi:

![](reduce.svg)

Yoki jadval shaklida, bu yerda har bir satr keyingi qator elementidagi funktsiya chaqiruvini ifodalaydi:

|   |`sum`|`current`|result|
|---|-----|---------|---------|
|birinchi chaqiruv|`0`|`1`|`1`|
|ikkinchi chaqiruvl|`1`|`2`|`3`|
|uchinchi chaqiruv|`3`|`3`|`6`|
|to'rtinchi chaqiruv|`6`|`4`|`10`|
|beshinchi chaqiruv|`10`|`5`|`15`|

<<<<<<< HEAD

Ko'rib turganimizdek, avvalgi qo'ng'iroq natijasi keyingisining birinchi argumentiga aylanadi.
=======
Here we can clearly see how the result of the previous call becomes the first argument of the next one.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Shuningdek, biz dastlabki qiymatni qoldirib yuborishimiz mumkin:

```js run
let arr = [1, 2, 3, 4, 5];

// reduce dan boshlang'ich qiymat o'chirildi (0 yo'q)
let result = arr.reduce((sum, current) => sum + current);

alert( result ); // 15
```

Natija bir xil. Buning sababi shundaki, agar boshlang'ich bo'lmasa, unda `reduce` massivning birinchi elementini boshlang'ich qiymati sifatida qabul qiladi va takrorlashni 2-elementdan boshlaydi.

Hisoblash jadvali yuqoridagi kabi, birinchi qatorni olib tashlagach.

Ammo bunday foydalanish juda ehtiyotkorlik talab qiladi. Agar massiv bo'sh bo'lsa, u holda `reduce` chaqiruvi xatolikka olib keladi.

Mana bir misol:

```js run
let arr = [];

// Xato: boshlang'ich qiymati bo'lmagan bo'sh massivni kamaytirish
// agar boshlang'ich qiymat mavjud bo'lsa, reduce uni bo'sh arr uchun qaytaradi.
arr.reduce((sum, current) => sum + current);
```

<<<<<<< HEAD

<<<<<<< HEAD
Shuning uchun har doim boshlang'ich qiymatni ko'rsatish tavsiya etiladi.
=======
So it's advised to always specify the initial value.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

[arr.reduceRight](mdn:js/Array/reduceRight) usuli ham xuddi shunday qiladi, lekin o'ngdan chapga ishlaydi.

=======
The method [arr.reduceRight](mdn:js/Array/reduceRight) does the same but goes from right to left.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

## Array.isArray

Massivlar alohida til turini hosil qilmaydi. Ular obyektlarga asoslangan.

Shunday qilib, `typeof` oddiy obyektni massivdan ajratishga yordam bermaydi:

```js run
<<<<<<< HEAD
alert(typeof {}); // obyekt
alert(typeof []); // bir xil
=======
alert(typeof {}); // object
alert(typeof []); // object (same)
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
```

...Ammo massivlar shu qadar tez-tez ishlatiladiki, buning uchun maxsus usul mavjud: [Array.isArray(value)](mdn:js/Array/isArray). Agar `value` massiv bo'lsa, `true`, aks holda `false` ni qaytaradi.

```js run
alert(Array.isArray({})); // false

alert(Array.isArray([])); // true
```

## Ko'p usullar "thisArg" ni qo'llab-quvvatlaydi 

`find`, `filter`, `map` kabi funktsiyalarni chaqiradigan deyarli barcha massiv usullari, `sort` dan tashqari, `thisArg` qo'shimcha parametrlarini qabul qiladi.

<<<<<<< HEAD
Ushbu parametr yuqoridagi bo'limlarda tushuntirilmagan, chunki u kamdan kam qo'llaniladi. Ammo to'liqlik uchun biz buni qoplashimiz kerak.
=======
That parameter is not explained in the sections above, because it's rarely used. But for completeness, we have to cover it.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

Mana ushbu usullarning to'liq sintaksisi:

```js
arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
// ...
// thisArg ixtiyoriy oxirgi argument
```

`thisArg` parametrining qiymati `func` uchun `this` ga aylanadi.

<<<<<<< HEAD
Masalan, bu erda biz filtr sifatida obyekt usulidan foydalanamiz va `thisArg` foydalidir:
=======
For example, here we use a method of `army` object as a filter, and `thisArg` passes the context:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  }
};

let users = [
  {age: 16},
  {age: 20},
  {age: 23},
  {age: 30}
];

*!*
<<<<<<< HEAD
// barcha user userdan yoshroq deb toping
let youngerUsers = users.filter(user.younger, user);
=======
// find users, for who army.canJoin returns true
let soldiers = users.filter(army.canJoin, army);
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
*/!*

alert(soldiers.length); // 2
alert(soldiers[0].age); // 20
alert(soldiers[1].age); // 23
```

<<<<<<< HEAD
Yuqoridagi qo'ng'iroqda biz `user.younger` dan filtr sifatida foydalanamiz va buning uchun kontekst sifatida `user` ni taqdim etamiz. Agar biz kontekstni taqdim qilmagan bo'lsak, `users.filter(user.younger)` `user.younger` ni mustaqil funktsiya sifatida `this = undefined` bilan chaqiradi. Bu darhol xato degani.
=======
If in the example above we used `users.filter(army.canJoin)`, then `army.canJoin` would be called as a standalone function, with `this=undefined`, thus leading to an instant error.

A call to `users.filter(army.canJoin, army)` can be replaced with `users.filter(user => army.canJoin(user))`, that does the same. The latter is used more often, as it's a bit easier to understand for most people.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Xulosa

<<<<<<< HEAD
Massiv usullaridan qo'llanma:

- Elementlarni qo'shish/olib tashlash uchun:
  - `push(...items)` -- oxiriga elementlarni qo'shadi,
  - `pop()` -- elementni oxiridan ajratib oladi,
  - `shift()` -- boshidan elementni ajratib oladi,
  - `unshift(...items)` -- elementlarni boshiga qo'shadi.
  - `splice(pos, deleteCount, ...items)` -- `pos` indeksda `deleteCount` elementlarni o'chirish va `items` ni qo'shish.
  - `slice(start, end)` -- yangi massiv yaratadi, elementlarni `start` dan `end` gacha (shu jumladan emas) massivga ko'chiradi.
  - `concat(...items)` -- yangi massivni qaytaradi: mavjud bo'lgan barcha a'zolarni nusxalaydi va unga `items` larni qo'shadi. Agar `items` ning birortasi massiv bo'lsa, unda uning elementlari olinadi.

- Elementlar orasida qidirish uchun:
  - `indexOf/lastIndexOf(item, pos)` -- `pos` holatidan boshlab `item` ni qidiradi, va indeksni qaytaradi, topilmasa `-1` ni.
  - `includes(value)` -- agar massivda `value` bo'lsa `true`, aks holda `false` qaytariladi.
  - `find/filter(func)` -- funktsiya orqali elementlar filtrlaniladi, `true` qaytaradigan barcha qiymatlarni qaytaradi.
  - `findIndex` `find` ga o'xshaydi, lekin qiymat o'rniga indeksni qaytaradi.
  
- Elementlar ustida takrorlash uchun:
  - `forEach(func)` -- har bir element uchun `func` ni chaqiradi, hech narsa qaytarmaydi.

- Massivni o'zgartirish uchun:
  - `map(func)` -- har bir element uchun `func` ni chaqirish natijalaridan yangi massiv yaratadi.
  - `sort(func)` -- massivni joyida saralaydi, keyin qaytaradi.
  - `reverse()` -- massivni teskariga o'zgartiradi, keyin qaytaradi.
  - `split/join` -- matnni massivga va orqaga aylantiradi.
  - `reduce(func, initial)` -- har bir element uchun `func` chaqirib, chaqiruvlar orasidagi oraliq natijani berib, massiv ustida bitta qiymatni hisoblaydi.
=======
A cheat sheet of array methods:

- To add/remove elements:
  - `push(...items)` -- adds items to the end,
  - `pop()` -- extracts an item from the end,
  - `shift()` -- extracts an item from the beginning,
  - `unshift(...items)` -- adds items to the beginning.
  - `splice(pos, deleteCount, ...items)` -- at index `pos` deletes `deleteCount` elements and inserts `items`.
  - `slice(start, end)` -- creates a new array, copies elements from index `start` till `end` (not inclusive) into it.
  - `concat(...items)` -- returns a new array: copies all members of the current one and adds `items` to it. If any of `items` is an array, then its elements are taken.

- To search among elements:
  - `indexOf/lastIndexOf(item, pos)` -- look for `item` starting from position `pos`, and return the index or `-1` if not found.
  - `includes(value)` -- returns `true` if the array has `value`, otherwise `false`.
  - `find/filter(func)` -- filter elements through the function, return first/all values that make it return `true`.
  - `findIndex` is like `find`, but returns the index instead of a value.

- To iterate over elements:
  - `forEach(func)` -- calls `func` for every element, does not return anything.

- To transform the array:
  - `map(func)` -- creates a new array from results of calling `func` for every element.
  - `sort(func)` -- sorts the array in-place, then returns it.
  - `reverse()` -- reverses the array in-place, then returns it.
  - `split/join` -- convert a string to array and back.
  - `reduce/reduceRight(func, initial)` -- calculate a single value over the array by calling `func` for each element and passing an intermediate result between the calls.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

<<<<<<< HEAD
- Qo'shimcha:
  - `Array.isArray(arr)` `arr` massiv ekanligini tekshiradi.
=======
- Additionally:
  - `Array.isArray(value)` checks `value` for being an array, if so returns `true`, otherwise `false`.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

Iltimos e'tibor bering, `sort`, `reverse` va `splice` usullari massivni o'zini o'zgartiradi.

Ushbu usullar eng ko'p ishlatiladigan usullar bo'lib, ular 99% holatlarni qamrab oladi. Ammo boshqalar ham bor:

<<<<<<< HEAD
- [arr.some(fn)](mdn:js/Array/some)/[arr.every(fn)](mdn:js/Array/every) massivni tekshiradi.
=======
- [arr.some(fn)](mdn:js/Array/some)/[arr.every(fn)](mdn:js/Array/every) check the array.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

  `fn` funktsiyasi massivning har bir elementida `map` ga o'xshash chaqiriladi. Agar natijala/natijalar `true` bo'lsa, `true`, aks holda `false` ni qaytaradi.

<<<<<<< HEAD
- [arr.fill(value, start, end)](mdn:js/Array/fill) -- qatorni `start` dan `end` gacha takrorlanadigan `value` bilan to'ldiradi.
=======
  These methods behave sort of like `||` and `&&` operators: if `fn` returns a truthy value, `arr.some()` immediately returns `true` and stops iterating over the rest of items; if `fn` returns a falsy value, `arr.every()` immediately returns `false` and stops iterating over the rest of items as well.

  We can use `every` to compare arrays:

  ```js run
  function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
  }

  alert( arraysEqual([1, 2], [1, 2])); // true
  ```

- [arr.fill(value, start, end)](mdn:js/Array/fill) -- fills the array with repeating `value` from index `start` to `end`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

- [arr.copyWithin(target, start, end)](mdn:js/Array/copyWithin) -- uning elementlarini `start` pozitsiyasidan `end` pozitsiyasiga *o'ziga*, `target` pozitsiyasida nusxalash (mavjudligini qayta yozish).

<<<<<<< HEAD
To'liq ro'yxat uchun [qo'llanma](mdn:js/Array) ga qarang..

Birinchi qarashdan juda ko'p usullar borligi esga olinishi qiyin tuyulishi mumkin. Ammo aslida bu ko'rinadiganidan ancha osonroq.

Ulardan xabardor bo'lish uchun qo'llanmani ko'rib chiqing. Keyin ushbu bobning vazifalarini amaliy ravishda hal qiling, shunda siz massiv usullari bilan tajribangizga ega bo'lasiz.

Keyinchalik, qachondir siz massiv bilan biror narsa qilishingiz kerak bo'lsa va qanday qilishni bilmasangiz - bu yerga keling, qo'llanmaga qarang va to'g'ri usulni toping. Uni to'g'ri yozishga misollar yordam beradi. Yaqinda siz usullarni avtomatik ravishda eslab qolasiz.
=======
- [arr.flat(depth)](mdn:js/Array/flat)/[arr.flatMap(fn)](mdn:js/Array/flatMap) create a new flat array from a multidimensional array.

For the full list, see the [manual](mdn:js/Array).

At first sight, it may seem that there are so many methods, quite difficult to remember. But actually, that's much easier.

Look through the cheat sheet just to be aware of them. Then solve the tasks of this chapter to practice, so that you have experience with array methods.

Afterwards whenever you need to do something with an array, and you don't know how -- come here, look at the cheat sheet and find the right method. Examples will help you to write it correctly. Soon you'll automatically remember the methods, without specific efforts from your side.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
