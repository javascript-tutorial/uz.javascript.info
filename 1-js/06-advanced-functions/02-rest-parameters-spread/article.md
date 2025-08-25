# Qoldiq parametrlari va kengaytirish operatori

Ko'pgina JavaScript-ning o'rnatilgan funktsiyalari ko'plab argumentlarni qo'llab-quvvatlaydi.

Masalan:

- `Math.max(arg1, arg2, ..., argN)` -- argumentlarning eng kattasini qaytaradi.
- `Object.assign(dest, src1, ..., srcN)` -- xususiyatlarini `src1..N` dan `dest` ga ko'chiradi.
- ...va hokazo.

Ushbu bobda biz ham xuddi shunday qilishni o'rganamiz. Va bundan ham muhimi, qanday qilib bunday funktsiyalar va massivlar bilan ishlashni qulay his qilish.

## Qoldiq parametrlari `...`

Funktsiyani qanday aniqlanishidan qat'i nazar, istalgan sonli argumentlar bilan chaqirish mumkin.

Xuddi shunday:

```js run
function sum(a, b) {
  return a + b;
}

alert(sum(1, 2, 3, 4, 5));
```

"Haddan tashqari" argumentlar tufayli xato bo'lmaydi. Ammo, albatta, natijada faqat dastlabki ikkitasi hisobga olinadi.

Qoldiq parametrlarni funktsiya ta'rifida uchta nuqta bilan yozish mumkin `...`. Ular so'zma-so'z "qolgan parametrlarni qatorga yig'ish" degan ma'noni anglatadi.

Masalan, barcha argumentlarni `args` massiviga to'plash uchun:

```js run
function sumAll(...args) {
  // args - bu massivning nomi
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
}

alert(sumAll(1)); // 1
alert(sumAll(1, 2)); // 3
alert(sumAll(1, 2, 3)); // 6
```

Biz birinchi parametrlarni o'zgaruvchanlar sifatida olishni va faqat qolganlarini to'plashni tanlashimiz mumkin.

Bu yerda dastlabki ikkita argument o'zgaruvchanga kiradi, qolganlari esa `titles` massiviga kiradi:

```js run
function showName(firstName, lastName, ...titles) {
  alert(firstName + " " + lastName); // Julius Caesar

  // qolganlari titles massiviga kiradi
  // i.e. titles = ["Consul", "Imperator"]
  alert(titles[0]); // Consul
  alert(titles[1]); // Imperator
  alert(titles.length); // 2
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
  alert(arguments.length);
  alert(arguments[0]);
  alert(arguments[1]);

  // bu ketma-ket saraluvhan
  // for(let arg of arguments) alert(arg);
}

// ko'rsatadi: 2, Julius, Caesar
showName("Julius", "Caesar");

// ko'rsatadi: 1, Ilya, undefined (ikkinchi argument yo'q)
showName("Ilya");
```

Qadimgi vaqtlarda, qoldiq parametrlari tilda mavjud emas edi va `argumentlar` dan foydalanish, ularning umumiy sonidan qat'i nazar, funktsiyalarning barcha argumentlarini olishning yagona usuli edi.

Va u hali ham ishlaydi, bugun uni ishlatishimiz mumkin.

Ammo salbiy tomoni shundaki, `argumentlar` ham massivga-o'xshash, ham ketma-ket saraluvchan bo'lsa ham, bu massiv emas. Bu massiv usullarini qo'llab-quvvatlamaydi, shuning uchun biz `argument.map(...)` deb chaqira ololmaymiz.

Bundan tashqari, u har doim barcha argumentlarni o'z ichiga oladi. Biz ularni qisman bajara ololmaymiz, xuddi qoldiq parametrlari singari.

Shunday qilib, ushbu xususiyatlar kerak bo'lganda, keyin qoldiq parametrlariga ustunlik beriladi.

````smart header="O'q funktsiyalari `\"arguments\"`ega emas"
Agar biz`argumentlar` obyektiga o'q funktsiyasidan kirsak, bu ularni tashqi "normal" funktsiyadan oladi.

Mana bir misol:

```js run
function f() {
  let showArg = () => alert(arguments[0]);
  showArg();
}

f(1); // 1
```

Esimizda bo'lsa, o'q funktsiyalari o'ziga xos `this` ga ega emas. Endi biz ularda maxsus `argumentlar` obyekti yo'qligini bilib oldik.

## Kengaytirish operatori

Parametrlar ro'yxatidan qanday qilib massivni olishni ko'rib chiqdik.

Ammo ba'zida biz buning aksini qilishimiz kerak.

Masalan, ro'yxatdagi eng katta sonni qaytaradigan [Math.max](mdn:js/Math/max)funktsiyasi mavjud:

```js run
alert(Math.max(3, 5, 1)); // 5
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

_Kengaytirish operatori_ qutqaruvhimiz! U qoldiq parametrlariga o'xshaydi, shuningdek `...` dan foydalanadi, ammo aksincha.

Funktsiya chaqiruvida `... arr` ishlatilganda, u `arr` takrorlanadigan obyektini argumentlar ro'yxatiga "kengaytiradi".

`Math.max` uchun:

```js run
let arr = [3, 5, 1];

alert(Math.max(...arr)); // 5 (kengaytirish massivni argumentlar ro'yxatiga aylantiradi)
```

Shuningdek, biz bir nechta takrorlanadigan ma'lumotlarni shu tarzda o'tkaza olamiz:

```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert(Math.max(...arr1, ...arr2)); // 8
```

Biz hatto kengaytirish operatorini normal qiymatlar bilan birlashtira olamiz:

```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert(Math.max(1, ...arr1, 2, ...arr2, 25)); // 25
```

Shuningdek, kengaytirish operatoridan massivlarni birlashtirish uchun foydalanish mumkin:

```js run
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

*!*
let merged = [0, ...arr, 2, ...arr2];
*/!*

alert(merged); // 0,3,5,1,2,8,9,15 (0, so'ng arr, so'ng 2, so'ng arr2)
```

Yuqoridagi misollarda biz kengaytirish operatorini namoyish qilish uchun massivdan foydalandik, ammo har qanday takrorlanadigan narsa bajaradi.

Masalan, bu yerda biz matnni belgilar massiviga aylantirish uchun kengaytirish operatoridan foydalanamiz:

```js run
let str = "Salom";

alert([...str]); // S,a,l,o,m
```

Kengaytirish operatori elementlarni ichki yig'ish uchun ketma-ket saraluchanlardan foydalanadi.

Shunday qilib, matn uchun `for..of` belgilarini qaytaradi va `... str` `"S", "a", "l", "o" "m"` ga aylanadi. Belgilar ro'yxati `[...str]` massivga uzatiladi.

Ushbu maxsus topshiriq uchun biz `Array.from` dan ham foydalanishimiz mumkin, chunki u ketma-ket saraluchanni (matn kabi) massivga aylantiradi:

```js run
let str = "Salom";

// Array.from takrorlanuvchanni massivga o'zgartiradi
alert(Array.from(str)); // S,a,l,o,m
```

Natijada `[...str]` bilan bir xil bo'ladi.

Ammo `Array.from(obj)` va `[...obj]` o'rtasida juda katta farq bor:

- `Array.from` massivga-o'xshash va takrorlanadigan qurilmalarda ishlaydi.
- Kengaytirish operatori faqat takrorlanuvchi qurilmalarda ishlaydi.

Shunday qilib, biror narsani massivga aylantirish vazifasi uchun `Array.from` ko'proq universal bo'lishga intiladi.

## Xulosa

Kodda `...` ni ko'rganimizda, bu qoldiq parametrlari yoki kengaytirish operatori.

Ularni farqlashning oson yo'li mavjud:

- `...` funktsiya parametrlarining oxirida bo'lsa, u `qoldiq parametrlari` bo'ladi va argumentlar ro'yxatining qolgan qismini massivga to'playdi.
- Agar `...` funktsiya chaqiruvida bo'lsa, u `kengaytirish operatori` deb nomlanadi va qatorni ro'yxatga kengaytiradi.

Shablonlardan foydalaning:

- Qoldiq parametrlari istalgan miqdordagi argumentlarni qabul qiladigan funktsiyalarni yaratish uchun ishlatiladi.
- Kengaytirish operatori odatda ko'plab argumentlar ro'yxatini talab qiladigan funktsiyalarga massivni uzatish uchun ishlatiladi.

Ular birgalikda ro'yxat va parametrlar massivi orasida osonlikcha harakatlanishga yordam beradi.

Funksiya chaqiruvining barcha argumentlari "eski uslub" `argumentlarida` ham mavjud: massivga-o'xshash takrorlanadigan obyekt.
