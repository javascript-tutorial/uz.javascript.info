

```js run
Function.prototype.defer = function(ms) {
  setTimeout(this, ms);
};

function f() {
  alert("Salom!");
}

f.defer(1000); // 1 soniyadan keyin "Salom!" ko'rsatadi
```
