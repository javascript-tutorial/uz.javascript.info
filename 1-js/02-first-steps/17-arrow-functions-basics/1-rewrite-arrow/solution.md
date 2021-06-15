
```js run
<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions-arrows/1-rewrite-arrow/solution.md
function ask(savol, ha, yoq) {
  if (confirm(savol)) ha()
  else yoq();
=======
function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/17-arrow-functions-basics/1-rewrite-arrow/solution.md
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
