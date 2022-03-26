using `setInterval`

```js run
let i = 0;

let start = Date.now();

function count() {

  if (i == 1000000000) {
    alert("Done in " + (Date.now() - start) + 'ms');
  } else {
      setTimeout(() => { clearInterval(count) }, 5000);
  }

  // a piece of heavy job
  for(let j = 0; j < 1000000; j++) {
    i++;
  }

}

count();
```
