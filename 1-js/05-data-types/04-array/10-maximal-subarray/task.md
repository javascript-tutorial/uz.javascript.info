importance: 2

---

# Maksimal submassiv

Kirish raqamlar massivi, masalan. `arr = [1, -2, 3, 4, -9, 6]`.

Vazifa quyidagicha: elementlarning maksimal yig'indisi bilan `arr` ning tutashgan submassivini toping.

Ushbu summani qaytaradigan `getMaxSubSum(arr)` funktsiyasini yozing.

Masalan: 

```js
getMaxSubSum([-1, *!*2, 3*/!*, -9]) = 5 (the sum of highlighted items)
getMaxSubSum([*!*2, -1, 2, 3*/!*, -9]) = 6
getMaxSubSum([-1, 2, 3, -9, *!*11*/!*]) = 11
getMaxSubSum([-2, -1, *!*1, 2*/!*]) = 3
getMaxSubSum([*!*100*/!*, -9, 2, -3, 5]) = 100
getMaxSubSum([*!*1, 2, 3*/!*]) = 6 (take all)
```

Agar barcha narsalar salbiy bo'lsa, demak biz hech narsani olmaymiz (submasssiv bo'sh), shuning uchun yig'indisi nolga teng:

```js
getMaxSubSum([-1, -2, -3]) = 0
```

Iltimos, tezkor echimni o'ylab ko'ring: [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation) yoki hatto imkoningiz bo'lsa, O(n).
