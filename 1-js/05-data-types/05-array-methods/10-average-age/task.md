muhimlik: 4

---

# O'rtacha yoshni oling

`getAverageAge(users)` funktsiyasini yozing, bu `age` xususiyatiga ega bo'lgan obyektlar massivini oladi va o'rtacha qiymatni qaytaradi.

O'rtacha son uchun formula `(age1 + age2 + ... + ageN) / N`.

Misol uchun:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let arr = [john, pete, mary];

alert(getAverageAge(arr)); // (25 + 30 + 29) / 3 = 28
```
