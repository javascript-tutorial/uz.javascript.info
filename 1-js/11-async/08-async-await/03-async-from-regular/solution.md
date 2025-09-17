Ichkarida qanday ishlashini bilish foydalidir.

Faqat `async` chaqiruvini va'da sifatida ko'rib chiqing va unga `.then` qo'shib qo'ying.

```js run
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // 1 soniyadan keyin 10ni ko'rsatadi
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
