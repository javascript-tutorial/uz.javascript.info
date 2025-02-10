<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
# Qoldiq parametrlari va kengaytirish operatori
=======
# Rest parameters and spread syntax
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Ko'pgina JavaScript-ning o'rnatilgan funktsiyalari ko'plab argumentlarni qo'llab-quvvatlaydi.

Masalan:

- `Math.max(arg1, arg2, ..., argN)` -- argumentlarning eng kattasini qaytaradi.
- `Object.assign(dest, src1, ..., srcN)` -- xususiyatlarini `src1..N` dan `dest` ga ko'chiradi.
- ...va hokazo.

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
Ushbu bobda biz ham xuddi shunday qilishni o'rganamiz. Va bundan ham muhimi, qanday qilib bunday funktsiyalar va massivlar bilan ishlashni qulay his qilish.
=======
In this chapter we'll learn how to do the same. And also, how to pass arrays to such functions as parameters.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

## Qoldiq parametrlari `...`

Funktsiyani qanday aniqlanishidan qat'i nazar, istalgan sonli argumentlar bilan chaqirish mumkin.

Xuddi shunday:
```js run
function sum(a, b) {
  return a + b;
}

alert( sum(1, 2, 3, 4, 5) );
```

<<<<<<< HEAD
"Haddan tashqari" argumentlar tufayli xato bo'lmaydi. Ammo, albatta, natijada faqat dastlabki ikkitasi hisobga olinadi.
=======
There will be no error because of "excessive" arguments. But of course in the result only the first two will be counted, so the result in the code above is `3`.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
Qoldiq parametrlarni funktsiya ta'rifida uchta nuqta bilan yozish mumkin `...`. Ular so'zma-so'z "qolgan parametrlarni qatorga yig'ish" degan ma'noni anglatadi.
=======
The rest of the parameters can be included in the function definition by using three dots `...` followed by the name of the array that will contain them. The dots literally mean "gather the remaining parameters into an array".
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Masalan, barcha argumentlarni `args` massiviga to'plash uchun:

```js run
function sumAll(...args) { // args - bu massivning nomi
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
}

alert( sumAll(1) ); // 1
alert( sumAll(1, 2) ); // 3
alert( sumAll(1, 2, 3) ); // 6
```

Biz birinchi parametrlarni o'zgaruvchanlar sifatida olishni va faqat qolganlarini to'plashni tanlashimiz mumkin.

Bu yerda dastlabki ikkita argument o'zgaruvchanga kiradi, qolganlari esa `titles` massiviga kiradi:

```js run
function showName(firstName, lastName, ...titles) {
  alert( firstName + ' ' + lastName ); // Julius Caesar

  // qolganlari titles massiviga kiradi
  // i.e. titles = ["Consul", "Imperator"]
  alert( titles[0] ); // Consul
  alert( titles[1] ); // Imperator
  alert( titles.length ); // 2
}

showName("Julius", "Caesar", "Consul", "Imperator");
```

````warn header="Qoldiq parametrlari oxirida bo'lishi kerak"
Qoldiq parametrlar boshqa barcha argumentlarni to'playdi, shuning uchun ulardan keyin biror narsa yozish befoyda. Bu xatoga olib keladi:

```js
function f(arg1, ...rest, arg2) { // arg2 after ...rest ?!
  // xato
}
```

`...rest` har doim oxirgi bo'lishi kerak.
````

## "Argumentlar" o'zgaruvchani

Barcha argumentlarni o'z indekslari bo'yicha o'z ichiga olgan `argumentlar` deb nomlangan maxsus massivga-o'xshash obyekt mavjud.

Masalan:

```js run
function showName() {
  alert( arguments.length );
  alert( arguments[0] );
  alert( arguments[1] );

  // bu ketma-ket saraluvhan
  // for(let arg of arguments) alert(arg);
}

// ko'rsatadi: 2, Julius, Caesar
showName("Julius", "Caesar");

// ko'rsatadi: 1, Ilya, undefined (ikkinchi argument yo'q)
showName("Ilya");
```

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
Qadimgi vaqtlarda, qoldiq parametrlari tilda mavjud emas edi va `argumentlar` dan foydalanish, ularning umumiy sonidan qat'i nazar, funktsiyalarning barcha argumentlarini olishning yagona usuli edi.

Va u hali ham ishlaydi, bugun uni ishlatishimiz mumkin.
=======
In old times, rest parameters did not exist in the language, and using `arguments` was the only way to get all arguments of the function. And it still works, we can find it in the old code.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Ammo salbiy tomoni shundaki, `argumentlar` ham massivga-o'xshash, ham ketma-ket saraluvchan bo'lsa ham, bu massiv emas. Bu massiv usullarini qo'llab-quvvatlamaydi, shuning uchun biz `argument.map(...)` deb chaqira ololmaymiz.

Bundan tashqari, u har doim barcha argumentlarni o'z ichiga oladi. Biz ularni qisman bajara ololmaymiz, xuddi qoldiq parametrlari singari.

Shunday qilib, ushbu xususiyatlar kerak bo'lganda, keyin qoldiq parametrlariga ustunlik beriladi.

````smart header="O'q funktsiyalari `\"arguments\"` ega emas"
Agar biz `argumentlar` obyektiga o'q funktsiyasidan kirsak, bu ularni tashqi "normal" funktsiyadan oladi.

Mana bir misol:

```js run
function f() {
  let showArg = () => alert(arguments[0]);
  showArg();
}

f(1); // 1
```

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
Esimizda bo'lsa, o'q funktsiyalari o'ziga xos `this` ga ega emas. Endi biz ularda maxsus `argumentlar` obyekti yo'qligini bilib oldik.

## Kengaytirish operatori
=======
As we remember, arrow functions don't have their own `this`. Now we know they don't have the special `arguments` object either.
````


## Spread syntax [#spread-syntax]
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Parametrlar ro'yxatidan qanday qilib massivni olishni ko'rib chiqdik.

Ammo ba'zida biz buning aksini qilishimiz kerak.

Masalan, ro'yxatdagi eng katta sonni qaytaradigan [Math.max](mdn:js/Math/max)funktsiyasi mavjud:

```js run
alert( Math.max(3, 5, 1) ); // 5
```

Endi bizda bir massiv bor deylik `[3, 5, 1]`. U bilan `Math.max` ni qanday chaqiramiz?

Uni "boricha" topshirish ishlamaydi, chunki `Math.max` bitta massiv emas, balki raqamli argumentlar ro'yxatini kutadi:

```js run
let arr = [3, 5, 1];

*!*
alert( Math.max(arr) ); // NaN
*/!*
```

Va, albatta, biz `Math.max(arr[0], arr[1], arr[2])` kodidagi elementlarni qo'lda ro'yxatlay olmaymiz, chunki ularning soni qancha ekanligiga ishonchimiz komil emas. Bizning skriptimiz bajarilayotganda juda ko'p bo'lishi mumkin yoki yo'q bo'lishi mumkin. Va bu juda hunuk bo'lar edi.

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
*Kengaytirish operatori* qutqaruvhimiz! U qoldiq parametrlariga o'xshaydi, shuningdek `...` dan foydalanadi, ammo aksincha.
=======
*Spread syntax* to the rescue! It looks similar to rest parameters, also using `...`, but does quite the opposite.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Funktsiya chaqiruvida `... arr` ishlatilganda, u `arr` takrorlanadigan obyektini argumentlar ro'yxatiga "kengaytiradi".

`Math.max` uchun:

```js run
let arr = [3, 5, 1];

alert( Math.max(...arr) ); // 5 (kengaytirish massivni argumentlar ro'yxatiga aylantiradi)
```

Shuningdek, biz bir nechta takrorlanadigan ma'lumotlarni shu tarzda o'tkaza olamiz:

```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(...arr1, ...arr2) ); // 8
```

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
Biz hatto kengaytirish operatorini normal qiymatlar bilan birlashtira olamiz:
=======
We can even combine the spread syntax with normal values:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/06-advanced-functions/02-rest-parameters-spread/article.md


```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25
```

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
Shuningdek, kengaytirish operatoridan massivlarni birlashtirish uchun foydalanish mumkin:
=======
Also, the spread syntax can be used to merge arrays:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

```js run
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

*!*
let merged = [0, ...arr, 2, ...arr2];
*/!*

alert(merged); // 0,3,5,1,2,8,9,15 (0, so'ng arr, so'ng 2, so'ng arr2)
```

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
Yuqoridagi misollarda biz kengaytirish operatorini namoyish qilish uchun massivdan foydalandik, ammo har qanday takrorlanadigan narsa bajaradi.

Masalan, bu yerda biz matnni belgilar massiviga aylantirish uchun kengaytirish operatoridan foydalanamiz:
=======
In the examples above we used an array to demonstrate the spread syntax, but any iterable will do.

For instance, here we use the spread syntax to turn the string into array of characters:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

```js run
let str = "Salom";

alert( [...str] ); // S,a,l,o,m
```

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
Kengaytirish operatori elementlarni ichki yig'ish uchun ketma-ket saraluchanlardan foydalanadi.
=======
The spread syntax internally uses iterators to gather elements, the same way as `for..of` does.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/06-advanced-functions/02-rest-parameters-spread/article.md


Shunday qilib, matn uchun `for..of` belgilarini qaytaradi va `... str` `"S", "a", "l", "o" "m"` ga aylanadi. Belgilar ro'yxati `[...str]` massivga uzatiladi.

Ushbu maxsus topshiriq uchun biz `Array.from` dan ham foydalanishimiz mumkin, chunki u ketma-ket saraluchanni (matn kabi) massivga aylantiradi:

```js run
let str = "Salom";

// Array.from takrorlanuvchanni massivga o'zgartiradi
alert( Array.from(str) ); // S,a,l,o,m
```

Natijada `[...str]` bilan bir xil bo'ladi.

Ammo `Array.from(obj)` va `[...obj]` o'rtasida juda katta farq bor:

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
- `Array.from` massivga-o'xshash va takrorlanadigan qurilmalarda ishlaydi.
- Kengaytirish operatori faqat takrorlanuvchi qurilmalarda ishlaydi.
=======
- `Array.from` operates on both array-likes and iterables.
- The spread syntax works only with iterables.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Shunday qilib, biror narsani massivga aylantirish vazifasi uchun `Array.from` ko'proq universal bo'lishga intiladi.


<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
## Xulosa

Kodda `...` ni ko'rganimizda, bu qoldiq parametrlari yoki kengaytirish operatori.
=======
## Copy an array/object

Remember when we talked about `Object.assign()` [in the past](info:object-copy#cloning-and-merging-object-assign)?

It is possible to do the same thing with the spread syntax.

```js run
let arr = [1, 2, 3];

*!*
let arrCopy = [...arr]; // spread the array into a list of parameters
                        // then put the result into a new array
*/!*

// do the arrays have the same contents?
alert(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true

// are the arrays equal?
alert(arr === arrCopy); // false (not same reference)

// modifying our initial array does not modify the copy:
arr.push(4);
alert(arr); // 1, 2, 3, 4
alert(arrCopy); // 1, 2, 3
```

Note that it is possible to do the same thing to make a copy of an object:

```js run
let obj = { a: 1, b: 2, c: 3 };

*!*
let objCopy = { ...obj }; // spread the object into a list of parameters
                          // then return the result in a new object
*/!*

// do the objects have the same contents?
alert(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// are the objects equal?
alert(obj === objCopy); // false (not same reference)

// modifying our initial object does not modify the copy:
obj.d = 4;
alert(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
alert(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}
```

This way of copying an object is much shorter than `let objCopy = Object.assign({}, obj)` or for an array `let arrCopy = Object.assign([], arr)` so we prefer to use it whenever we can.


## Summary

When we see `"..."` in the code, it is either rest parameters or the spread syntax.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Ularni farqlashning oson yo'li mavjud:

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
- `...` funktsiya parametrlarining oxirida bo'lsa, u `qoldiq parametrlari` bo'ladi va argumentlar ro'yxatining qolgan qismini massivga to'playdi.
- Agar `...` funktsiya chaqiruvida bo'lsa, u `kengaytirish operatori` deb nomlanadi va qatorni ro'yxatga kengaytiradi.
=======
- When `...` is at the end of function parameters, it's "rest parameters" and gathers the rest of the list of arguments into an array.
- When `...` occurs in a function call or alike, it's called a "spread syntax" and expands an array into a list.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Shablonlardan foydalaning:

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
- Qoldiq parametrlari istalgan miqdordagi argumentlarni qabul qiladigan funktsiyalarni yaratish uchun ishlatiladi.
- Kengaytirish operatori odatda ko'plab argumentlar ro'yxatini talab qiladigan funktsiyalarga massivni uzatish uchun ishlatiladi.
=======
- Rest parameters are used to create functions that accept any number of arguments.
- The spread syntax is used to pass an array to functions that normally require a list of many arguments.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Ular birgalikda ro'yxat va parametrlar massivi orasida osonlikcha harakatlanishga yordam beradi.

Funksiya chaqiruvining barcha argumentlari "eski uslub" `argumentlarida` ham mavjud: massivga-o'xshash takrorlanadigan obyekt.
