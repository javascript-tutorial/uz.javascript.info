# Sekin yechim

Biz barcha mumkin bo'lgan qismiy yig'indilarni hisoblashimiz mumkin.

Eng oddiy usul - har bir elementni olib, undan boshlanadigan barcha subarray'larning yig'indisini hisoblashdir.

Masalan, `[-1, 2, 3, -9, 11]` uchun:

```js no-beautify
// -1 dan boshlash:
-1 - 1 + 2 - 1 + 2 + 3 - 1 + 2 + 3 + -9 - 1 + 2 + 3 + -9 + 11;

// 2 dan boshlash:
2;
2 + 3;
2 + 3 + -9;
2 + 3 + -9 + 11;

// 3 dan boshlash:
3;
3 + -9;
3 +
  -9 +
  11 -
  // -9 dan boshlash
  9 -
  9 +
  11;

// 11 dan boshlash
11;
```

Kod aslida ichma-ich tsikl: tashqi tsikl array elementlari bo'ylab, ichki esa joriy elementdan boshlanadigan qismiy yig'indilarni hisoblaydi.

```js run
function getMaxSubSum(arr) {
  let maxSum = 0; // agar hech qanday element olmasak, nol qaytariladi

  for (let i = 0; i < arr.length; i++) {
    let sumFixedStart = 0;
    for (let j = i; j < arr.length; j++) {
      sumFixedStart += arr[j];
      maxSum = Math.max(maxSum, sumFixedStart);
    }
  }

  return maxSum;
}

alert(getMaxSubSum([-1, 2, 3, -9])); // 5
alert(getMaxSubSum([-1, 2, 3, -9, 11])); // 11
alert(getMaxSubSum([-2, -1, 1, 2])); // 3
alert(getMaxSubSum([1, 2, 3])); // 6
alert(getMaxSubSum([100, -9, 2, -3, 5])); // 100
```

Bu yechimning vaqt murakkabligi [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation). Boshqacha qilib aytganda, agar array hajmini 2 marta oshirsak, algoritm 4 marta sekinroq ishlaydi.

Katta array'lar (1000, 10000 yoki undan ko'p elementlar) uchun bunday algoritmlar jiddiy sekinlikka olib kelishi mumkin.

# Tez yechim

Array bo'ylab yuramiz va elementlarning joriy qismiy yig'indisini `s` o'zgaruvchida saqlaymiz. Agar `s` qandaydir nuqtada salbiy bo'lib qolsa, `s=0` qilib belgilaymiz. Barcha bunday `s` larning maksimali javob bo'ladi.

Agar tavsif juda noaniq bo'lsa, kodni ko'ring, u yetarlicha qisqa:

```js run demo
function getMaxSubSum(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) {
    // arr ning har bir elementi uchun
    partialSum += item; // uni partialSum ga qo'sh
    maxSum = Math.max(maxSum, partialSum); // maksimalni eslab qol
    if (partialSum < 0) partialSum = 0; // agar salbiy bo'lsa nolga teng
  }

  return maxSum;
}

alert(getMaxSubSum([-1, 2, 3, -9])); // 5
alert(getMaxSubSum([-1, 2, 3, -9, 11])); // 11
alert(getMaxSubSum([-2, -1, 1, 2])); // 3
alert(getMaxSubSum([100, -9, 2, -3, 5])); // 100
alert(getMaxSubSum([1, 2, 3])); // 6
alert(getMaxSubSum([-1, -2, -3])); // 0
```

Algoritm aynan 1 marta array'ni o'tishni talab qiladi, shuning uchun vaqt murakkabligi O(n).

Algoritm haqida batafsil ma'lumotni bu yerda topishingiz mumkin: [Maximum subarray problem](http://en.wikipedia.org/wiki/Maximum_subarray_problem). Agar hali ham nima uchun ishlashi aniq bo'lmasa, yuqoridagi misollarda algoritmni kuzatib boring, qanday ishlashini ko'ring - bu har qanday so'zdan yaxshiroq.
