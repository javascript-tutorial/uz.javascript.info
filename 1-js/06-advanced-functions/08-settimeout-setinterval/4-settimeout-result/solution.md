
Har qanday `setTimeout` faqat joriy kod tugagandan so'ng ishlaydi.

`i` oxirgi bo'ladi: `100000000`.

```js run
let i = 0;

setTimeout(() => alert(i), 100); // 100000000

// ushbu funktsiyani bajarish vaqti> 100ms deb taxmin qiling
for(let j = 0; j < 100000000; j++) {
  i++; 
}
```
