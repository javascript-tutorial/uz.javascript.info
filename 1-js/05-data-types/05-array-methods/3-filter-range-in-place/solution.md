```js run demo
function filterRangeInPlace(arr, a, b) {

  for (let i = 0; i < arr.length; i++) {
    let val = arr[i];

    // intervaldan tashqarida bo'lsa olib tashlang
    if (val < a || val > b) {
      arr.splice(i, 1);
      i--;
    }
  }

}

let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // 1 dan 4 gacha raqamalrdan tashqari raqamlarni chiqarib tashladi

alert( arr ); // [3, 1]
```
