# Tashqi burchaklar

Tashqi burchaklar asosan [elem.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/DOM/element.getBoundingClientRect) dan oladigan narsadir.

Yuqori chap burchakdagi `answer1` va pastki o'ng burchakdagi `answer2` koordinatalari:

```js
let coords = elem.getBoundingClientRect();

let answer1 = [coords.left, coords.top];
let answer2 = [coords.right, coords.bottom];
```

# Chap-yuqori ichki burchak

Bu tashqi burchakdan chegara kengligi bilan farq qiladi. Masofani olishning ishonchli usuli bu `clientLeft/clientTop`:

```js
let answer3 = [coords.left + field.clientLeft, coords.top + field.clientTop];
```

# O'ng-pastki ichki burchak

Bizning holatda biz tashqi koordinatalardan chegara o'lchamini olib tashlashimiz kerak.

Biz CSS usulidan foydalanishimiz mumkin:

```js
let answer4 = [
  coords.right - parseInt(getComputedStyle(field).borderRightWidth),
  coords.bottom - parseInt(getComputedStyle(field).borderBottomWidth),
];
```

Chap-yuqori burchakning koordinatalariga `clientWidth/clientHeight` ni qo‘shish muqobil usul bo‘ladi. Bu, ehtimol, undan ham yaxshiroq:

```js
let answer4 = [
  coords.left + elem.clientLeft + elem.clientWidth,
  coords.top + elem.clientTop + elem.clientHeight,
];
```
