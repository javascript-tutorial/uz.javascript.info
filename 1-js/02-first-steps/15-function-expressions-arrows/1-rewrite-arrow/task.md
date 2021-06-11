
# O'q funktsiyalari bilan qayta yozing

Funktsiya ifodalarini koddagi o'q funktsiyalari bilan almashtiring:

```js run
function ask(savol, ha, yoq) {
  if (confirm(savol)) ha()
  else yoq();
}

ask(
  "Rozimisiz?",
  function() { alert("Rozisiz."); },
  function() { alert("Siz ijroni bekor qildingiz."); }
);
```
