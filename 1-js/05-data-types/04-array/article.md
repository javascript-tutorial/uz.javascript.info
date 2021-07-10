# Massivlar

Obyektlar qadriyatlar to'plamini saqlashga imkon beradi. Juda soz.

Ammo ko'pincha biz *ro'yhatlangan to'plamga* ehtiyoj sezamiz, bu yerda bizda 1 chi, 2 chi, 3 chi element va hk. Masalan, biz biror narsaning ro'yxatini saqlashimiz kerak: foydalanuvchilar, tovarlar, HTML elementlari va boshqalar.

Bu erda obyektni ishlatish qulay emas, chunki u elementlarning tartibini boshqarish usullarini taqdim etmaydi. Mavjud bo'lganlar orasida "o'rtasiga" yangi xususiyat kiritolmaymiz. Obyektlar bunday foydalanish uchun mo'ljallanmagan.

Ro'yhatlangan to'plamlarni saqlash uchun `Array` nomli maxsus ma'lumotlar tuzilishi mavjud.

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


````smart header="Osilgan vergul"
Massiv, xuddi obyekt singari, vergul bilan tugashi mumkin:
```js 
let fruits = [
  "Olma", 
  "Apelsin", 
  "Uzum"*!*,*/!*
];
```

"Osilgan vergul" uslubi elementlarni kiritishni/olib tashlashni osonlashtiradi, chunki barcha satrlar bir xil bo'ladi.
````


## Usullar pop/push, shift/unshift

A [navbat](https://en.wikipedia.org/wiki/Queue_(abstract_data_type)) - bu massivning eng keng tarqalgan ishlatilishlaridan biri. Kompyuter fanida bu ikkita operatsiyani qo'llab-quvvatlaydigan elementlarning tartiblangan to'plamini anglatadi:

- `push` elementni oxiriga qo'shib qo'yadi.
- `shift` boshidagi element olib tashlanadi, shunday qilib, ikkinchi element birinchiga aylanadi.

![](queue.svg)

Massivlar ikkala operatsiyani qo'llab-quvvatlaydi.

Amalda bu bizga ko'pincha kerak. Masalan, ekranda ko'rsatilishi kerak bo'lgan xabarlar navbati.

Massivlar uchun yana bir holat mavjud - [stek](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)) deb nomlangan ma'lumotlar tuzilishi .

U ikkita operatsiyani qo'llab-quvvatlaydi:

- `push` oxiriga element qo'shadi.
- `pop` oxiridan element oladi.

Shunday qilib, yangi elementlar har doim "oxiridan" qo'shiladi yoki olinadi.

Stek odatda kartalar to'plami sifatida tasvirlanadi: yuqoriga yangi kartalar qo'shiladi yoki yuqoridan olinadi:

![](stack.svg)

JavaScript-dagi massivlar navbat sifatida ham, stek sifatida ham ishlashi mumkin. Ular sizga elementlarni boshiga yoki oxiriga qo'shish/olib tashlash imkonini beradi.

Kompyuter fanida bunga imkon beradigan ma'lumotlar tuzilishi [deque](https://en.wikipedia.org/wiki/Double-ended_queue) deb nomlanadi.

**Massiv oxiri bilan ishlaydigan usullar:**

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

    ```js
    let fruits = ["Olma", "Apelsin", "Nok"];

    alert( fruits.shift() ); // Olmani olib tashlaydi va qaytaradi

    alert( fruits ); // Apelsin, Nok
    ```

`unshift`
: Elementni massiv boshiga qo'shadi:

    ```js
    let fruits = ["Apelsin", "Nok"];

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

Massiv - obyektlarning maxsus turdagi ko'rinishi. `arr[0]` xususiyatiga kirish uchun ishlatiladigan kvadrat qavslar asosan `obj[key]` kabi oddiy kalit kirish sintaksisidir, bu yerda `obj` rolida massiv va `key` sifatida raqamli indeks mavjud.

Ular ro'yhatlangan ma'lumotlar to'plamlari va `length` xususiyati bilan ishlash uchun maxsus usullarni taqdim etadigan obyektlarni kengaytiradi. Ammo aslida bu hali ham obyekt.

Esingizda bo'lsa, JavaScript-da faqat 7 ta asosiy tur mavjud. Massiv obyektdir va shu bilan obyekt kabi o'zini tutadi.

Masalan, u havola orqali ko'chiriladi:

```js run
let fruits = ["Banan"]

let arr = fruits; // havola orqali nusxalash (ikkita o'zgaruvchan bir massivga murojaat qiladi)

alert( arr === fruits ); // true
 
arr.push("Nok"); // havola yordamida massivni o'zgartiring

alert( fruits ); // Banan, Nok - 2 items now
```

...Ammo massivlarni chindan ham maxsus qiladigan narsa ularning ichki ko'rinishi. Interpretatorlar o'z elementlarini tutashgan xotira maydonida, xuddi shu bobdagi rasmlarda tasvirlanganidek, ketma-ket saqlashga harakat qiladi va massivlarni chindan ham tez ishlashini ta'minlash uchun boshqa optimallashtirishlar ham mavjud.

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

- `arr.test = 5` kabi raqamli bo'lmagan xususiyatni qo'shish. 
- Teshiklarni yaratish, masalan: `arr[0]` va keyin `arr[1000]` qo'shish (va ular orasida hech narsa yo'q).
- Massivni teskari tartibda to'ldirish, masalan `arr[1000]`, `arr[999]` va boshqalar.

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

Texnik jihatdan, massivlar obyekt bo'lgani uchun `for..in` dan foydalanish ham mumkin:

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
    Brauzerda va boshqa muhitda "massivga o'xshash" deb nomlangan obyektlar mavjud, ular *massivlarga o'xshaydi*. Ya'ni, ular `length` va indekslar xususiyatlariga ega, ammo ular boshqa raqamli bo'lmagan xususiyatlar va usullarga ham ega bo'lishi mumkin, ular odatda bizga kerak emas. `for..in` tsikl ularni ro'yxatlaydi. Agar biz massivga o'xshash narsalar bilan ishlashimiz kerak bo'lsa, unda bu "qo'shimcha" xususiyatlar muammoga aylanishi mumkin.

2. `for..in` tsikli massivlar uchun emas, balki umumiy obyektlar uchun optimallashtirilgan va shuning uchun 10-100 marta sekinroq. Albatta, bu hali ham juda tez. Tezlashish faqat to'siqlarda muhim bo'lishi mumkin yoki ahamiyatsiz bo'lib tuyulishi mumkin. Ammo shunga qaramay, farqni bilishimiz kerak.

Odatda, biz `for..in` massivlar uchun ishlatmasligimiz kerak.


## "Length" haqida so'z

Biz massivni o'zgartirganda `length` xususiyati avtomatik ravishda yangilanadi. Aniqroq aytganda, bu aslida massivdagi qiymatlar soni emas, balki eng katta sonli indeks va plyus bir.

Masalan, katta indeksli bitta element katta uzunlikni beradi:

```js run
let fruits = [];
fruits[123] = "Olma";

alert( fruits.length ); // 124
```

E'tibor bering, biz odatda bunday massivlardan foydalanmaymiz.

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

Yuqoridagi kodda `new Array(raqam)` barcha elementlari `undefined`.

Bunday kutilmagan hodisalardan qochish uchun, odatda nima qilayotganimizni bilmasak, to'rtburchak qavslardan foydalanamiz.

## Ko'p o'lchovli massivlar

Massivlar massiv bo'lgan elementlarga ega bo'lishi mumkin. Matritsalarni saqlash uchun biz uni ko'p o'lchovli massivlar uchun ishlatishimiz mumkin:

```js run
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

alert( matrix[1][1] ); // markaziy element
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

## Xulosa

Array - ro'yhatlangan ma'lumotlar elementlarini saqlash va boshqarish uchun mos bo'lgan maxsus obyekt turi.

- Deklaratsiya:

    ```js
    // kvadrat qavslar (odatiy)
    let arr = [item1, item2...];

    // new Array (juda kam ishlatiladi)
    let arr = new Array(item1, item2...);
    ```

    `new Arryay(raqam)` berilgan uzunlikdagi, ammo elementlarsiz massivni yaratadi.

- `length` xususiyati - bu massiv uzunligi yoki aniqrog'i, uning oxirgi son ko'rsatkichi plyus bir. U massiv usullari bilan avtomatik ravishda o'rnatiladi.
- Agar `length` ni qo`lda qisqartirsak, massiv qisqartiriladi.

Biz quyidagi amallar bilan massivni ishlatishimiz mumkin:

- `push(...ma'lumot)` oxiriga `ma'lumot` qo'shiladi.
- `pop()` elementni oxiridan olib tashlaydi va qaytaradi.
- `shift()` elementni boshidan olib tashlaydi va qaytaradi.
- `unshift(...ma'lumot)` elementlarni boshiga qo'shadi.

Massiv elementlari bo'ylab yurish uchun:
  - `for (let i=0; i<arr.length; i++)` -- eng tez ishlaydi, eski brauzerga mos keladi.
  - `for (let items of arr)` -- faqat buyumlar(items) uchun zamonaviy sintaksis,
  - `for (let i in arr)` -- hech qachon foydalanmang.

Biz qatorlarga qaytamiz va <info:array-methods> bobida elementlarni qo'shish, olib tashlash, ajratish va saralash uchun ko'proq usullarni o'rganamiz.

