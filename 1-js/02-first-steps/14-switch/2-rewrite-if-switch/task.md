muhimlik: 4

---

# "If" ni "switch" ga qayta yozing

Bitta `switch` ifodasu yordamida quyidagi kodni qayta yozing:

```js run
let a = +prompt("a?", "");

if (a == 0) {
  alert(0);
}
if (a == 1) {
  alert(1);
}

if (a == 2 || a == 3) {
  alert("2,3");
}
```
