muhimlik: 5

---

# Funktsiyalar armiyasi

Quyidagi kod `shooters` massivini yaratadi.

Har bir funktsiya o'z raqamini chiqarishi kerak. Lekin nimadir noto'g'ri...

```js run
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // shooter funktsiyasini yaratish,
      alert( i ); // o'z raqamini ko'rsatishi kerak
    };
    shooters.push(shooter); // uni massivga qo'shish
    i++;
  }

  // ...va shooterlar massivini qaytarish
  return shooters;
}

let army = makeArmy();

*!*
// barcha shooterlar o'z raqamlari 0, 1, 2, 3... o'rniga 10 ni ko'rsatadi
army[0](); // 0-raqamli shooterdan 10
army[1](); // 1-raqamli shooterdan 10
army[2](); // 10 ...va hokazo.
*/!*
```

Nima uchun barcha shooterlar bir xil qiymatni ko'rsatadi?

Kod mo'ljallangandek ishlashi uchun uni tuzating.
