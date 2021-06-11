Barcha anagrammalarni topish uchun har bir so'zni harflarga ajratamiz va ularni saralaymiz. Xat tartibida barcha anagrammalar bir xil bo'ladi.

Masalan:

```
nap, pan -> anp
ear, era, are -> aer
cheaters, hectares, teachers -> aceehrst
...
```

Harflarga ajratilgan variantlarni xarita(map) kalitlari sifatida har bir kalit uchun bittadan qiymat saqlash uchun foydalanamiz:

```js run
function aclean(arr) {
  let map = new Map();

  for (let word of arr) {
    // so'zni harflar bilan ajratadi, ularni saralaydi va qayta qo'shadi
*!*
    let sorted = word.toLowerCase().split('').sort().join(''); // (*)
*/!*
    map.set(sorted, word);
  }

  return Array.from(map.values());
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```

Xatlarni saralash `(*)` satridagi chaqiruvlar zanjiri orqali amalga oshiriladi.

Qulaylik uchun uni bir nechta satrlarga ajratamiz:

```js
let sorted = arr[i] // PAN
  .toLowerCase() // pan
  .split('') // ['p','a','n']
  .sort() // ['a','n','p']
  .join(''); // anp
```

Ikki xil so'z `'PAN'` va `'nap'` bir xil harflar tartibida `'anp'` shaklini oladi.

Keyingi satr so'zni Map obyektga kiritdi:

```js
map.set(sorted, word);
```

Agar biz yana biron bir harf bilan saralangan shaklda so'zni uchratsak, u avvalgi qiymatni obyektdagi bir xil kalit bilan qayta yozib qo'yadi. Shunday qilib, biz har doim bitta harf uchun bitta so'zga ega bo'lamiz.

Oxirida `Array.from(map.values())` obyekt qiymatlari bo'yicha ketma-ket saraluvchanni oladi (natijada bizga kalit kerak emas) va ularning massivini qaytaradi.

Bu erda biz `Map` o'rniga oddiy obyektdan ham foydalanishimiz mumkin edi, chunki kalitlar matnlardir.

Yechim shu tarzda ko'rinishi mumkin:

```js run demo
function aclean(arr) {
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    let sorted = arr[i].toLowerCase().split("").sort().join("");
    obj[sorted] = arr[i];
  }

  return Object.values(obj);
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```
