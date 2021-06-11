importance: 4

---

# SetTimeout-ni setInterval bilan qayta yozing

Ishni qismlarga bo'lish uchun ichki `setTimeout` dan foydalanadigan funksiya.

Uni `setInterval` ga qayta yozing:

```js run
let i = 0;

let start = Date.now();

function count() {

  if (i == 1000000000) {
    alert("Done in " + (Date.now() - start) + 'ms');
  } else {
    setTimeout(count);
  }

  // a piece of heavy job
  for(let j = 0; j < 1000000; j++) {
    i++;
  }

}

count();
```
