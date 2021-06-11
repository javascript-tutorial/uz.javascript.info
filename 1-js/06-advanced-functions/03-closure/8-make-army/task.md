importance: 5

---

# Funktsiyalar armiyasi

Quyidagi kod `shooters` massivini yaratadi.

Har qanday funktsiya o'z raqamini chiqarishga mo'ljallangan. Lekin bir narsa noto'g'ri...

```js run
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // shooter funktsiya
      alert( i ); // uning raqamini ko'rsatishi kerak
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

army[0](); // shooter 0-raqami 10 ko'rsatadi
army[5](); // va 5-raqam ham 10 ko'rsatadi ...
// ... barcha shooters 10 ko'rsatadi 0, 1, 2, 3 o'rniga...
```

Nima uchun barcha shooters bir xil narsani namoyish qilishadi? Kodni maqsadga muvofiq ishlashi uchun tuzating.

