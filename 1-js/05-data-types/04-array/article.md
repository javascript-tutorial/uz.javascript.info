<<<<<<< HEAD
# Massivlar
=======
# Arrays
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Obyektlar qadriyatlar to'plamini saqlashga imkon beradi. Juda soz.

<<<<<<< HEAD
Ammo ko'pincha biz *ro'yhatlangan to'plamga* ehtiyoj sezamiz, bu yerda bizda 1 chi, 2 chi, 3 chi element va h.k. Masalan, biz biror narsaning ro'yxatini saqlashimiz kerak: foydalanuvchilar, tovarlar, HTML elementlari va boshqalar.
=======
But quite often we find that we need an *ordered collection*, where we have a 1st, a 2nd, a 3rd element and so on. For example, we need that to store a list of something: users, goods, HTML elements etc.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Bu erda obyektni ishlatish qulay emas, chunki u elementlarning tartibini boshqarish usullarini taqdim etmaydi. Mavjud bo'lganlar orasida "o'rtasiga" yangi xususiyat kiritolmaymiz. Obyektlar bunday foydalanish uchun mo'ljallanmagan.

<<<<<<< HEAD
Ro'yhatlangan to'plamlarni saqlash uchun `Array` nomli maxsus ma'lumotlar tuzilishi mavjud.
=======
There exists a special data structure named `Array`, to store ordered collections.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Deklaratsiya

Bo'sh massiv yaratish uchun ikkita sintaksis mavjud:

```js
let arr = new Array();
let arr = [];
```

Deyarli har doim ikkinchi sintaksis ishlatiladi. Qavsda dastlabki elementlarni yetkazib berishimiz mumkin:

```js
let fruits = ["Olma", "Apelsin", "Uzum"];
```

Massiv elementlari noldan boshlab raqamlangan.

Elementni to'rtburchak qavs ichida uning soniga ko'ra olishimiz mumkin:

```js run
let fruits = ["Olma", "Apelsin", "Uzum"];

alert( fruits[0] ); // Olma
alert( fruits[1] ); // Apelsin
alert( fruits[2] ); // Uzum
```

Biz elementni almashtirishimiz mumkin:

```js
fruits[2] = 'Nok'; // now ["Olma", "Apelsin", "Nok"]
```

...Yoki massivga yangisini qo'shish:

```js
fruits[3] = 'Limon'; // now ["Olma", "Apelsin", "Nok", "Limon"]
```

Massivdagi elementlarning umumiy soni uning uzunligi `length` dir:

```js run
let fruits = ["Olma", "Apelsin", "Uzum"];

alert( fruits.length ); // 3
```

Biz massivni to'liq ko'rsatish uchun `alert` dan ham foydalanishimiz mumkin.

```js run
let fruits = ["Olma", "Apelsin", "Uzum"];

alert( fruits ); // Olma,Apelsin,Uzum
```

Massiv har qanday turdagi elementlarni saqlashi mumkin.

Masalan:

```js run no-beautify
// qiymatlar aralashmasi
let arr = [ 'Olma', { name: 'Oybek' }, true, function() { alert('salom'); } ];

// obyektni 1 chi indeksini oling va keyin uning nomini ko'rsating
alert( arr[1].name ); // Oybek

// funktsiyani 3 chi indeksini oling va uni ishga tushiring
arr[3](); // salom
```


<<<<<<< HEAD
````smart header="Osilgan vergul"
Massiv, xuddi obyekt singari, vergul bilan tugashi mumkin:
```js 
let fruits = [
  "Olma", 
  "Apelsin", 
  "Uzum"*!*,*/!*
=======
````smart header="Trailing comma"
An array, just like an object, may end with a comma:
```js
let fruits = [
  "Apple",
  "Orange",
  "Plum"*!*,*/!*
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
];
```

"Osilgan vergul" uslubi elementlarni kiritishni/olib tashlashni osonlashtiradi, chunki barcha satrlar bir xil bo'ladi.
````


## Usullar pop/push, shift/unshift

<<<<<<< HEAD
A [navbat](https://en.wikipedia.org/wiki/Queue_(abstract_data_type)) - bu massivning eng keng tarqalgan ishlatilishlaridan biri. Kompyuter fanida bu ikkita operatsiyani qo'llab-quvvatlaydigan elementlarning tartiblangan to'plamini anglatadi:
=======
A [queue](https://en.wikipedia.org/wiki/Queue_(abstract_data_type)) is one of the most common uses of an array. In computer science, this means an ordered collection of elements which supports two operations:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

- `push` elementni oxiriga qo'shib qo'yadi.
- `shift` boshidagi element olib tashlanadi, shunday qilib, ikkinchi element birinchiga aylanadi.

![](queue.svg)

Massivlar ikkala operatsiyani qo'llab-quvvatlaydi.

Amalda bu bizga ko'pincha kerak. Masalan, ekranda ko'rsatilishi kerak bo'lgan xabarlar navbati.

<<<<<<< HEAD
Massivlar uchun yana bir holat mavjud - [stek](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)) deb nomlangan ma'lumotlar tuzilishi .
=======
There's another use case for arrays -- the data structure named [stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

U ikkita operatsiyani qo'llab-quvvatlaydi:

- `push` oxiriga element qo'shadi.
- `pop` oxiridan element oladi.

Shunday qilib, yangi elementlar har doim "oxiridan" qo'shiladi yoki olinadi.

Stek odatda kartalar to'plami sifatida tasvirlanadi: yuqoriga yangi kartalar qo'shiladi yoki yuqoridan olinadi:

![](stack.svg)

JavaScript-dagi massivlar navbat sifatida ham, stek sifatida ham ishlashi mumkin. Ular sizga elementlarni boshiga yoki oxiriga qo'shish/olib tashlash imkonini beradi.

<<<<<<< HEAD
Kompyuter fanida bunga imkon beradigan ma'lumotlar tuzilishi [deque](https://en.wikipedia.org/wiki/Double-ended_queue) deb nomlanadi.

**Massiv oxiri bilan ishlaydigan usullar:**
=======
Arrays in JavaScript can work both as a queue and as a stack. They allow you to add/remove elements both to/from the beginning or the end.

In computer science the data structure that allows this, is called [deque](https://en.wikipedia.org/wiki/Double-ended_queue).

**Methods that work with the end of the array:**
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

`pop`
: Massivning oxirgi elementini ajratib oladi va qaytaradi:

    ```js run
    let fruits = ["Olma", "Apelsin", "Nok"];

    alert( fruits.pop() ); // "Nok" ni olib tashlang va chiqaring

    alert( fruits ); // Olma, Apelsin
    ```

`push`
: Elementni massivning oxiriga qo'shadi:

    ```js run
    let fruits = ["Olma", "Apelsin"];

    fruits.push("Nok");

    alert( fruits ); // Olma, Apelsin, Nok
    ```

    `fruits.push(...) chaqiruvi `fruits[fruits.length] = ...` ga teng.

**Massivning boshi bilan ishlaydigan usullar:**

`shift`
: Massivning birinchi elementini ajratib oladi va uni qaytaradi:

<<<<<<< HEAD
    ```js
    let fruits = ["Olma", "Apelsin", "Nok"];
=======
    ```js run
    let fruits = ["Apple", "Orange", "Pear"];
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

    alert( fruits.shift() ); // Olmani olib tashlaydi va qaytaradi

    alert( fruits ); // Apelsin, Nok
    ```

`unshift`
: Elementni massiv boshiga qo'shadi:

<<<<<<< HEAD
    ```js
    let fruits = ["Apelsin", "Nok"];
=======
    ```js run
    let fruits = ["Orange", "Pear"];
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

    fruits.unshift('Olma');

    alert( fruits ); // Olma, Apelsin, Nok
    ```

`push` va `unshift` usullari bir vaqtning o'zida bir nechta elementlarni qo'shishi mumkin:

```js run
let fruits = ["Olma"];

fruits.push("Apelsin", "Nok");
fruits.unshift("Ananas", "Limon");

// ["Ananas", "Limon", "Olma", "Apelsin", "Nok"]
alert( fruits );
```

## Ichki massiv qurilma

<<<<<<< HEAD
Massiv - obyektlarning maxsus turdagi ko'rinishi. `arr[0]` xususiyatiga kirish uchun ishlatiladigan kvadrat qavslar asosan `obj[key]` kabi oddiy kalit kirish sintaksisidir, bu yerda `obj` rolida massiv va `key` sifatida raqamli indeks mavjud.
=======
An array is a special kind of object. The square brackets used to access a property `arr[0]` actually come from the object syntax. That's essentially the same as `obj[key]`, where `arr` is the object, while numbers are used as keys.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Ular ro'yhatlangan ma'lumotlar to'plamlari va `length` xususiyati bilan ishlash uchun maxsus usullarni taqdim etadigan obyektlarni kengaytiradi. Ammo aslida bu hali ham obyekt.

<<<<<<< HEAD
Esingizda bo'lsa, JavaScript-da faqat 7 ta asosiy tur mavjud. Massiv obyektdir va shu bilan obyekt kabi o'zini tutadi.
=======
Remember, there are only eight basic data types in JavaScript (see the [Data types](info:types) chapter for more info). Array is an object and thus behaves like an object.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Masalan, u havola orqali ko'chiriladi:

```js run
let fruits = ["Banan"]

let arr = fruits; // havola orqali nusxalash (ikkita o'zgaruvchan bir massivga murojaat qiladi)

alert( arr === fruits ); // true
<<<<<<< HEAD
 
arr.push("Nok"); // havola yordamida massivni o'zgartiring
=======

arr.push("Pear"); // modify the array by reference
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

alert( fruits ); // Banan, Nok - 2 items now
```

<<<<<<< HEAD
...Ammo massivlarni chindan ham maxsus qiladigan narsa ularning ichki ko'rinishi. Interpretatorlar o'z elementlarini tutashgan xotira maydonida, xuddi shu bobdagi rasmlarda tasvirlanganidek, ketma-ket saqlashga harakat qiladi va massivlarni chindan ham tez ishlashini ta'minlash uchun boshqa optimallashtirishlar ham mavjud.
=======
...But what makes arrays really special is their internal representation. The engine tries to store its elements in the contiguous memory area, one after another, just as depicted on the illustrations in this chapter, and there are other optimizations as well, to make arrays work really fast.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Ammo biz "ro'yhatlangan to'plam" singari massiv bilan ishlashni to'htatsak va u bilan odatdagi obyekt kabi ishlay boshlasak, ularning barchasi buziladi.

Masalan, texnik jihatdan biz buni qila olamiz:

```js
let fruits = []; // massiv yaratish

fruits[99999] = 5; // indeks uzunligidan ancha kattaroq xususiyatni tayinlash

fruits.age = 25; // hohlagan nom bilan xususiyat yaratish
```

Bu mumkin, chunki massivlar aslida obyektlardir. Biz ularga har qanday xususiyatlarni qo'shishimiz mumkin.

Ammo interpretator biz oddiy obyekt kabi massiv bilan ishlayotganimizni ko'radi. Massivga xos optimallashtirish bunday holatlarga mos kelmaydi va o'chiriladi, ularning foydalari yo'qoladi.

Massivni noto'g'ri ishlatish usullari:

<<<<<<< HEAD
- `arr.test = 5` kabi raqamli bo'lmagan xususiyatni qo'shish. 
- Teshiklarni yaratish, masalan: `arr[0]` va keyin `arr[1000]` qo'shish (va ular orasida hech narsa yo'q).
- Massivni teskari tartibda to'ldirish, masalan `arr[1000]`, `arr[999]` va boshqalar.
=======
- Add a non-numeric property like `arr.test = 5`.
- Make holes, like: add `arr[0]` and then `arr[1000]` (and nothing between them).
- Fill the array in the reverse order, like `arr[1000]`, `arr[999]` and so on.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Iltimos, *ro'yhatlangan massivlar* bilan ishlash uchun massivlarni maxsus tuzilmalar deb hisoblang. Buning uchun ular maxsus usullarni taqdim etishadi. Massivlar ketma ket ro'yhatlangan ma'lumotlar bilan ishlash uchun JavaScript interpretatorining ichida ehtiyotkorlik bilan sozlangan, iltimos ularni shu tarzda ishlating. Agar sizga kalitlangan xususiyatlar kerak bo'lsa, ehtimol siz odatdagi obyektni `{}` ishlatishiz kerak.

## Samaradorlik

`push/pop` tez ishlaydi, `shift/unshift` esa sekin ishlaydi.

![](array-speed.svg)

Nega massivning boshidan ko'ra uning oxiri bilan ishlash tezroq? Keling, ijro paytida nima bo'lishini ko'rib chiqaylik:

```js
fruits.shift(); // boshidan 1 ta elementni oling
```

Elementni `0` raqami bilan olib tashlash yetarli emas. Boshqa elementlarning ham raqamlarini o'zgartirish kerak.

`shift` operatsiyasi uchta narsani bajarishi kerak:

1. `0` indeksli elementni olib tashlash.
2. Barcha elementlarni chapga siljitish, ularning raqamlarini `1` dan `0` ga, `2` dan `1` ga va hokazo.
3. `length` xususiyatini yangilash.

![](array-shift.svg)

**Massivda qancha element bo'lsa, ularni siljitish uchun ko'proq vaqt, xotira ishlari ko'proq bo'ladi.**

Shunga o'xshash narsa `unshift` bilan sodir bo'ladi: massiv boshiga element qo'shish uchun avval mavjud elementlarni indekslarini oshirib, o'ng tomonga siljitishi kerak.

Va `push/pop` nima? Ular hech narsani siljitishga hojat yo'q. Elementni oxiridan ajratib olish uchun `pop` usuli indeksni tozalaydi va `length` ni qisqartiradi.

`pop` operatsiyasi uchun harakatlar:

```js
fruits.pop(); // oxiridan 1 ta elementni oling
```

![](array-pop.svg)

**`pop` usuli hech narsani siljitishni hojat yo'q, chunki boshqa elementlar o'z indekslarini saqlaydi. Shuning uchun u juda tezkor.**

Shunga o'xshash narsa `push` usuli bilan.

## Tsiklar

Elementlarni ro'yhatlashning eng qadimgi usullaridan biri bu `for` tsikli:

```js run
let arr = ["Olma", "Apelsin", "Nok"];

*!*
for (let i = 0; i < arr.length; i++) {
*/!*
  alert( arr[i] );
}
```

Ammo massivlar uchun `for..of` tsiklning yana bir shakli mavjud:

```js run
let fruits = ["Olma", "Apelsin", "Uzum"];

// massiv elementlari ustida takrorlanadi
for (let fruit of fruits) {
  alert( fruit );
}
```

`for..of` joriy element raqamiga kirish huquqini bermaydi, faqat uning qiymatiga, lekin aksariyat hollarda bu yetarli. Va bu qisqaroq.

Texnik jihatdan, massivlar ob'ekt bo'lgani uchun `for..in` dan foydalanish ham mumkin:

```js run
let arr = ["Olma", "Apelsin", "Nok"];

*!*
for (let key in arr) {
*/!*
  alert( arr[key] ); // Olma, Apelsin, Nok
}
```

Ammo bu aslida yomon fikr. U bilan bog'liq muammolar mavjud:

1. `For..in` tsikli nafaqat raqamli xususiyatlarni, balki *barcha xususiyatlarni* takrorlaydi.
    Brauzerda va boshqa muhitda "massivga o'xshash" deb nomlangan ob'ektlar mavjud, ular *massivlarga o'xshaydi*. Ya'ni, ular `length` va indekslar xususiyatlariga ega, ammo ular boshqa raqamli bo'lmagan xususiyatlar va usullarga ham ega bo'lishi mumkin, ular odatda bizga kerak emas. `for..in` tsikl ularni ro'yxatlaydi. Agar biz massivga o'xshash narsalar bilan ishlashimiz kerak bo'lsa, unda bu "qo'shimcha" xususiyatlar muammoga aylanishi mumkin.

<<<<<<< HEAD
2. `for..in` tsikli massivlar uchun emas, balki umumiy obyektlar uchun optimallashtirilgan va shuning uchun 10-100 marta sekinroq. Albatta, bu hali ham juda tez. Tezlashish faqat to'siqlarda muhim bo'lishi mumkin yoki ahamiyatsiz bo'lib tuyulishi mumkin. Ammo shunga qaramay, farqni bilishimiz kerak.
=======
2. The `for..in` loop is optimized for generic objects, not arrays, and thus is 10-100 times slower. Of course, it's still very fast. The speedup may only matter in bottlenecks. But still we should be aware of the difference.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Odatda, biz `for..in` massivlar uchun ishlatmasligimiz kerak.


## "Length" haqida so'z

Biz massivni o'zgartirganda `length` xususiyati avtomatik ravishda yangilanadi. Aniqroq aytganda, bu aslida massivdagi qiymatlar soni emas, balki eng katta sonli indeks va plyus bir.

Masalan, katta indeksli bitta element katta uzunlikni beradi:

```js run
let fruits = [];
fruits[123] = "Olma";

alert( fruits.length ); // 124
```

<<<<<<< HEAD
E'tibor bering, biz odatda bunday massivlardan foydalanmaymiz.
=======
Note that we usually don't use arrays like that.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

`length` xususiyati bilan bog'liq yana bir qiziq narsa shundaki, u tayinlanishi mumkin.

Agar uni qo'lda oshirsak, qiziq narsa bo'lmaydi. Ammo biz uni kamaytirsak, massiv qisqartiriladi. Jarayon qaytarib bo'lmaydigan, bu yerda misol:

```js run
let arr = [1, 2, 3, 4, 5];

arr.length = 2; // 2 ta elementgacha qisqartiring
alert( arr ); // [1, 2]

arr.length = 5; // uzunlikni qaytaring
alert( arr[3] ); // undefined: qiymatlar qayta qaytarilmaydi
```

Shunday qilib, massivni tozalashning eng oddiy usuli: `arr.length = 0;`.


## new Array() 

Massiv yaratish uchun yana bitta sintaksis mavjud:

```js
let arr = *!*new Array*/!*("Olma", "Nok", "va hokazo");
```

U kamdan-kam qo'llaniladi, chunki to'rtburchaklar `[]` qisqaroq. Bundan tashqari, bu bilan juda ayyor xususiyati mavjud.

Agar `new Array` raqamli bitta argument bilan chaqirilsa, u *elementlarsiz, lekin berilgan uzunlikdagi* massivni yaratadi.

Keling, qanday qilib ayanchli xizmatni taqdim etishni ko'rib chiqaylik:

```js run
let arr = new Array(2); // u [2] massiv yaratadimi?

alert( arr[0] ); // undefined! elementlar yo'q.

alert( arr.length ); // length 2
```

<<<<<<< HEAD
Yuqoridagi kodda `new Array(raqam)` barcha elementlari `undefined`.

Bunday kutilmagan hodisalardan qochish uchun, odatda nima qilayotganimizni bilmasak, to'rtburchak qavslardan foydalanamiz.
=======
To avoid such surprises, we usually use square brackets, unless we really know what we're doing.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Ko'p o'lchovli massivlar

<<<<<<< HEAD
Massivlar massiv bo'lgan elementlarga ega bo'lishi mumkin. Matritsalarni saqlash uchun biz uni ko'p o'lchovli massivlar uchun ishlatishimiz mumkin:
=======
Arrays can have items that are also arrays. We can use it for multidimensional arrays, for example to store matrices:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

<<<<<<< HEAD
alert( matrix[1][1] ); // markaziy element
=======
alert( matrix[1][1] ); // 5, the central element
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

## toString

Massivlar elementlarning vergul bilan ajratilgan ro'yxatini qaytaradigan `toString` usulini o'z ichiga oladi.

Masalan:


```js run
let arr = [1, 2, 3];

alert( arr ); // 1,2,3
alert( String(arr) === '1,2,3' ); // true
```

Bundan tashqari, buni sinab ko'raylik:

```js run
alert( [] + 1 ); // "1"
alert( [1] + 1 ); // "11"
alert( [1,2] + 1 ); // "1,21"
```

Massivlarda `Symbol.toPrimitive`, shuningdek, hatto `valueOf` yo'q, ular faqat `toString` konvertatsiyasini amalga oshiradilar, shuning uchun bu erda `[]` bo'sh satrga aylanadi, `[1]` `"1"` "va `[1,2]` `"1,2"` ga aylanadi.

Binar plyus `"+"` operatori massivga biror narsa qo'shganda, u matnga aylantiriladi, shuning uchun keyingi qadam quyidagicha ko'rinadi:

```js run
alert( "" + 1 ); // "1"
alert( "1" + 1 ); // "11"
alert( "1,2" + 1 ); // "1,21"
```

<<<<<<< HEAD
## Xulosa
=======
## Don't compare arrays with ==

Arrays in JavaScript, unlike some other programming languages, shouldn't be compared with operator `==`.

This operator has no special treatment for arrays, it works with them as with any objects.

Let's recall the rules:

- Two objects are equal `==` only if they're references to the same object.
- If one of the arguments of `==` is an object, and the other one is a primitive, then the object gets converted to primitive, as explained in the chapter <info:object-toprimitive>.
- ...With an exception of `null` and `undefined` that equal `==` each other and nothing else.

The strict comparison `===` is even simpler, as it doesn't convert types. 

So, if we compare arrays with `==`, they are never the same, unless we compare two variables that reference exactly the same array.

For example:
```js run
alert( [] == [] ); // false
alert( [0] == [0] ); // false
```

These arrays are technically different objects. So they aren't equal. The `==` operator doesn't do item-by-item comparison.

Comparison with primitives may give seemingly strange results as well:

```js run
alert( 0 == [] ); // true

alert('0' == [] ); // false
```

Here, in both cases, we compare a primitive with an array object. So the array `[]` gets converted to primitive for the purpose of comparison and becomes an empty string `''`. 

Then the comparison process goes on with the primitives, as described in the chapter <info:type-conversions>:

```js run
// after [] was converted to ''
alert( 0 == '' ); // true, as '' becomes converted to number 0

alert('0' == '' ); // false, no type conversion, different strings
```

So, how to compare arrays?

That's simple: don't use the `==` operator. Instead, compare them item-by-item in a loop or using iteration methods explained in the next chapter.

## Summary
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Array - ro'yhatlangan ma'lumotlar elementlarini saqlash va boshqarish uchun mos bo'lgan maxsus ob'ekt turi.

- Deklaratsiya:

    ```js
    // kvadrat qavslar (odatiy)
    let arr = [item1, item2...];

    // new Array (juda kam ishlatiladi)
    let arr = new Array(item1, item2...);
    ```

    `new Arryay(raqam)` berilgan uzunlikdagi, ammo elementlarsiz massivni yaratadi.

<<<<<<< HEAD
- `length` xususiyati - bu massiv uzunligi yoki aniqrog'i, uning oxirgi son ko'rsatkichi plyus bir. U massiv usullari bilan avtomatik ravishda o'rnatiladi.
- Agar `length` ni qo`lda qisqartirsak, massiv qisqartiriladi.
=======
- The `length` property is the array length or, to be precise, its last numeric index plus one. It is auto-adjusted by array methods.
- If we shorten `length` manually, the array is truncated.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Biz quyidagi amallar bilan massivni ishlatishimiz mumkin:

<<<<<<< HEAD
- `push(...ma'lumot)` oxiriga `ma'lumot` qo'shiladi.
- `pop()` elementni oxiridan olib tashlaydi va qaytaradi.
- `shift()` elementni boshidan olib tashlaydi va qaytaradi.
- `unshift(...ma'lumot)` elementlarni boshiga qo'shadi.
=======
- `push(...items)` adds `items` to the end.
- `pop()` removes the element from the end and returns it.
- `shift()` removes the element from the beginning and returns it.
- `unshift(...items)` adds `items` to the beginning.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Massiv elementlari bo'ylab yurish uchun:
  - `for (let i=0; i<arr.length; i++)` -- eng tez ishlaydi, eski brauzerga mos keladi.
  - `for (let items of arr)` -- faqat buyumlar(items) uchun zamonaviy sintaksis,
  - `for (let i in arr)` -- hech qachon foydalanmang.

<<<<<<< HEAD
Biz qatorlarga qaytamiz va <info:array-methods> bobida elementlarni qo'shish, olib tashlash, ajratish va saralash uchun ko'proq usullarni o'rganamiz.
=======
To compare arrays, don't use the `==` operator (as well as `>`, `<` and others), as they have no special treatment for arrays. They handle them as any objects, and it's not what we usually want.

Instead you can use `for..of` loop to compare arrays item-by-item.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

We will continue with arrays and study more methods to add, remove, extract elements and sort arrays in the next chapter <info:array-methods>.
