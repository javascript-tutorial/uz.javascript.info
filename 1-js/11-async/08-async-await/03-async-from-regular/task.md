
# Async-ga mos kelmaydigandan chaqiring

<<<<<<< HEAD
Bizda "muntazam" funktsiya mavjud. Undan `async` ga qanday chaqiruv bajarish va uning natijasidan foydalanish kerak?
=======
We have a "regular" function called `f`. How can you call the `async` function `wait()` and use its result inside of `f`?
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
<<<<<<< HEAD
  // ...bu yerda nima yozish kerak?
  // async wait() ni chaqirishimiz va 10 ni kutishimiz kerak 
  // esda tuting, biz "await" dan foydalana olmaymiz
=======
  // ...what should you write here?
  // we need to call async wait() and wait to get 10
  // remember, we can't use "await"
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
}
```

P.S. Vazifa texnik jihatdan juda sodda, ammo async/await uchun yangi dasturchilar uchun savol juda keng tarqalgan.
