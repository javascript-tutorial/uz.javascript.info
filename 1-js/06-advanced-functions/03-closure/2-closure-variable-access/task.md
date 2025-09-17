muhimlik: 5

---

# Qaysi o'zgaruvchilar mavjud?

Quyidagi `makeWorker` funktsiyasi boshqa funktsiya yaratadi va uni qaytaradi. O'sha yangi funktsiya boshqa joydan chaqirilishi mumkin.

U o'zining yaratilgan joyidagi tashqi o'zgaruvchilarga, yoki chaqirilgan joyidagiga, yoki ikkala joyidagiga ham kirish huquqiga ega bo'ladimi?

```js
function makeWorker() {
  let name = "Pete";

  return function () {
    alert(name);
  };
}

let name = "John";

// funktsiya yaratish
let work = makeWorker();

// uni chaqirish
work(); // nima ko'rsatadi?
```

Qaysi qiymatni ko'rsatadi? "Pete" yoki "John"?
