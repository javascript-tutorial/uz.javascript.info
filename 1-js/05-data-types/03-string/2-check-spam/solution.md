Qidiruvni katta-kichik harflarga sezgir qilmaslik uchun satrni kichik harfga keltiramiz va keyin qidiramiz:

```js run demo
function checkSpam(str) {
  let lowerStr = str.toLowerCase();

  return lowerStr.includes("viagra") || lowerStr.includes("xxx");
}

alert(checkSpam("buy ViAgRA now"));
alert(checkSpam("free xxxxx"));
alert(checkSpam("innocent rabbit"));
```
