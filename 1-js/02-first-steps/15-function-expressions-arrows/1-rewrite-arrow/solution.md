
```js run
function ask(savol, ha, yoq) {
  if (confirm(savol)) ha()
  else yoq();
}

ask(
  "Rozimisiz?",
*!*
  () => alert("Rozisiz."),
  () => alert("Siz ijroni bekor qildingiz.")
*/!*
);
```

Qisqa va toza ko'rinadi, to'g'rimi?
