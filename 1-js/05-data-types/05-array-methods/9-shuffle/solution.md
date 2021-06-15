Oddiy yechim bo'lishi mumkin:

```js run
*!*
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
*/!*

let arr = [1, 2, 3];
shuffle(arr);
alert(arr);
```

Bu biroz ishlaydi, chunki `Math.random() - 0.5` tasodifiy son bo'lib, u ijobiy yoki salbiy bo'lishi mumkin, shuning uchun saralash funktsiyasi elementlarni tasodifiy tartibda o'zgartiradi.

Ammo saralash funktsiyasi shu tarzda ishlatilishi mumkin emasligi sababli, barcha almashtirishlar bir xil ehtimollikka ega emas.

Masalan, quyidagi kodni ko'rib chiqing. U `aralashtirib` 1000000 marta ishlaydi va barcha mumkin bo'lgan natijalarning ko'rinishini hisoblaydi:

```js run
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// barcha mumkin bo'lgan almashtirishlar uchun ko'rinishlarning soni
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join('')]++;
}

// barcha mumkin bo'lgan almashtirishlarning sonlarini ko'rsatish
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

<<<<<<< HEAD
Misol natijasi (for V8, July 2017):
=======
An example result (depends on JS engine):
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
123: 250706
132: 124425
213: 249618
231: 124880
312: 125148
321: 125223
```

Ikkilanishni aniq ko'rishimiz mumkin: `123` va `213` boshqalarga qaraganda tez-tez ko'rinadi.

Kod natijasi JavaScript interpretator o'rtasida farq qilishi mumkin, ammo biz allaqachon yondashuv ishonchsizligini ko'rmoqdamiz.

Nima uchun u ishlamayapti? Umuman aytganda, `sort` "qora quti" dir: biz unga qator va taqqoslash funktsiyasini tashlaymiz va massivning tartiblanishini kutamiz. Ammo taqqoslashning mutlaqo tasodifiyligi tufayli qora quti aqldan ozadi va uning aynan qay darajada aqldan ozishi interpretator orasidagi farqning aniq bajarilishiga bog'liq.

Vazifani bajarishning boshqa yaxshi usullari mavjud. Masalan, [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) deb nomlangan ajoyib algoritm mavjud. Maqsad massivni teskari tartibda o'tkazosh va har bir elementni tasodifiy element bilan almashtirishdir:

```js
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
<<<<<<< HEAD
    let j = Math.floor(Math.random() * (i + 1)); // 0 dan i gacha bo'lgan tasodifiy indeks
    [array[i], array[j]] = [array[j], array[i]]; // elementlarni almashtirish 
=======
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  }
}
```

Keling, xuddi shu tarzda sinab ko'raylik:

```js run
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// barcha mumkin bo'lgan almashtirishlar uchun ko'rinishlarning soni
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join('')]++;
}

// barcha mumkin bo'lgan almashtirishlarning sonlarini ko'rsatish
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

Misol natijasi:

```js
123: 166693
132: 166647
213: 166628
231: 167517
312: 166199
321: 166316
```

Hozir yaxshi ko'rinishga ega: barcha almashtirishlar bir xil ehtimollik bilan paydo bo'ladi.

Shuningdek, Fisher-Yates algoritmi ishlash samaradorligi jihatidan ancha yaxshi, ortiqcha "saralash" mavjud emas.
