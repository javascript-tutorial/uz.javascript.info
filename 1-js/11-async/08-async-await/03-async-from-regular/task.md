
# Async-ga mos kelmaydigandan chaqiring

Bizda "muntazam" funktsiya mavjud. Undan `async` ga qanday chaqiruv bajarish va uning natijasidan foydalanish kerak?

```js
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // ...bu yerda nima yozish kerak?
  // async wait() ni chaqirishimiz va 10 ni kutishimiz kerak 
  // esda tuting, biz "await" dan foydalana olmaymiz
}
```

P.S. Vazifa texnik jihatdan juda sodda, ammo async/await uchun yangi dasturchilar uchun savol juda keng tarqalgan.
