
# O'q funktsiyalari bilan qayta yozing

<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions-arrows/1-rewrite-arrow/task.md
Funktsiya ifodalarini koddagi o'q funktsiyalari bilan almashtiring:

```js run
function ask(savol, ha, yoq) {
  if (confirm(savol)) ha()
  else yoq();
=======
Replace Function Expressions with arrow functions in the code below:

```js run
function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/17-arrow-functions-basics/1-rewrite-arrow/task.md
}

ask(
  "Rozimisiz?",
  function() { alert("Rozisiz."); },
  function() { alert("Siz ijroni bekor qildingiz."); }
);
```
