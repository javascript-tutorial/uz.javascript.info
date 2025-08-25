# Promiz bilan kechiktirish

O'rnatilgan `setTimeout` funktsiyasi qayta chaqiruvlardan foydalanadi. Promizga asoslangan alternativani yarating.

`delay(ms)` funktsiyasi Promiz berishi kerak. Ushbu Promiz `ms` milisoniyadan keyin hal qilinishi kerak, shunda biz unga `.then` qo'sha olamiz, shunga o'xshash:

```js
function delay(ms) {
  // sizning kodingiz
}

delay(3000).then(() => alert("3 soniyadan keyin ishlaydi"));
```
