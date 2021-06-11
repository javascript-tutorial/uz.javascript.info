```js run
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => alert('3 soniyadan keyin ishlaydi'));
```

Iltimos, ushbu vazifada `resolve` argumentlarsiz chaqirilishini unutmang. Biz `delay` dan hech qanday qiymat qaytarmaymiz, faqat kechikishni ta'minlaymiz.
