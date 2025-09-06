Birinchidan, buni qanday qilish kerakligini ko'rib chiqamiz:

```js
function clear(elem) {
  for (let i = 0; i < elem.childNodes.length; i++) {
    elem.childNodes[i].remove();
  }
}
```

Bu ishlamaydi, chunki `remove()` chaqiruvi `elem.childNodes` to‘plamini o‘zgartiradi, shuning uchun elementlar har safar `0` indeksidan boshlanadi. Lekin `i` ortadi va ba`zi elementlar o'tkazib yuboriladi.

`for..of` sikli ham xuddi shunday qiladi.

To'g'ri variant quyidagilar bo'lishi mumkin:

```js
function clear(elem) {
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
}
```

Bundan tashqari, xuddi shunday qilishning oddiy usuli bor:

```js
function clear(elem) {
  elem.innerHTML = "";
}
```
