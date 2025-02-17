# Sekin yechim

Biz barcha mumkin bo'lgan subsummalarni hisoblashimiz mumkin.

Eng oson yo'l har bir elementni olish va undan boshlangan barcha submassivlar yig'indilarini hisoblash.

Masalan, `[-1, 2, 3, -9, 11]` uchun:

```js no-beautify
// -1 dan boshlab:
-1
-1 + 2
-1 + 2 + 3
-1 + 2 + 3 + (-9)
-1 + 2 + 3 + (-9) + 11

// 2 dan boshlab:
2
2 + 3
2 + 3 + (-9)
2 + 3 + (-9) + 11

// 3 dan boshlab:
3
3 + (-9)
3 + (-9) + 11

// -9 dan boshlab:
-9
-9 + 11

// 11 dan boshlab:
11
```

Kod aslida ichki joylashtirilgan tsikl: massiv elementlari ustidagi tashqi tsikl va ichki element joriy elementdan boshlab yig'indilarni hisoblaydi.

```js run
function getMaxSubSum(arr) {
  let maxSum = 0; // agar biz hech qanday element olmasak, nol qaytariladi

  for (let i = 0; i < arr.length; i++) {
    let sumFixedStart = 0;
    for (let j = i; j < arr.length; j++) {
      sumFixedStart += arr[j];
      maxSum = Math.max(maxSum, sumFixedStart);
    }
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
```

<<<<<<< HEAD
Yechim vaqt murakkabligiga ega [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation). Boshqacha qilib aytadigan bo'lsak, massiv hajmini 2 baravar oshirsak, algoritm 4 barobar sekinroq ishlaydi.
=======
The solution has a time complexity of [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation). In other words, if we increase the array size 2 times, the algorithm will work 4 times longer.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

<<<<<<< HEAD
Katta massivlar uchun (1000, 10000 va undan ortiq elementlar) bunday algoritmlar jiddiy sustkashlikka olib kelishi mumkin.
=======
For big arrays (1000, 10000 or more items) such algorithms can lead to serious sluggishness.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

# Tez yechim

Massiv bo'ylab borib, elementlarning joriy qisman yig'indisini `s` o'zgaruvchanida saqlaylik. Agar biron bir vaqtda `s` salbiyga aylanib qolsa, u holda `s = 0` ni belgilang. Bularning barchasining maksimal qiymati natija bo'ladi.

Agar tavsif juda noaniq bo'lsa, iltimos kodni ko'ring, bu juda qisqa:

```js run demo
function getMaxSubSum(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) { // massivning har bir elementi uchun
    partialSum += item; // partialSum ga uni qo'shish
    maxSum = Math.max(maxSum, partialSum); // maksimal qiymatni eslab qoling
    if (partialSum < 0) partialSum = 0; // manfiy bo'lsa, nol
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([-1, -2, -3]) ); // 0
```

Algoritm uchun to'liq 1 massiv o'tishi kerak, shuning uchun vaqtning murakkabligi O (n) ga teng.

<<<<<<< HEAD
Algoritm haqida batafsil ma'lumotni bu erda topishingiz mumkin: [Maksimal submassiv muammosi](http://en.wikipedia.org/wiki/Maximum_subarray_problem). Agar bu hali ham aniq bo'lmasa, iltimos, yuqoridagi misollar bo'yicha algoritmni kuzating, qanday ishlashini ko'ring, bu har qanday so'zdan yaxshiroqdir.
=======
You can find more detailed information about the algorithm here: [Maximum subarray problem](http://en.wikipedia.org/wiki/Maximum_subarray_problem). If it's still not obvious why that works, then please trace the algorithm on the examples above, see how it works, that's better than any words.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
