# O'q funktsiyalarni takrorlayamiz

Keling, o'q funktsiyalarini qayta ko'rib chiqaylik.

O'q funktsiyalari faqat kamroq yozish uchun "qisqartirish" emas. Ular boshqa foydali xususiyatlarga ega.

JavaScript biz boshqa joyda bajarilgan kichik funktsiyani yozishimiz kerak bo'lgan vaziyatlarga to'la.

Masalan:

- `arr.forEach(func)` -- `func` har bir massiv elementi uchun` forEach` tomonidan bajariladi.
- `setTimeout(func)` -- `func` o'rnatilgan rejalashtiruvchi tomonidan bajariladi.
- ...ko'proq bor.

Funktsiyani yaratish va uni biron bir joyga yetkazish JavaScript-ni ruhiga mos keladi.

Va bunday funktsiyalarda biz odatda hozirgi kontekstni tark etishni xohlamaymiz.

## O'q funktsiyalarida "this" yo'q

<info:object-methods> bobidan eslaganimizdek, o'q funktsiyalari `this` ega emas. Agar `this` ga kirilsa, u tashqaridan olinadi.

Masalan, biz uni obyekt usuli ichida takrorlash uchun ishlatishimiz mumkin:

```js run
let group = {
  title: "Bizning guruhimiz",
  students: ["John", "Pete", "Alice"],

  showList() {
*!*
    this.students.forEach(
      student => alert(this.title + ': ' + student)
    );
*/!*
  }
};

group.showList();
```

Bu yerda `forEach` da o'q funktsiyasi ishlatiladi, shuning uchun undagi `this.title` tashqi ko'rinish `showList` bilan bir xil. Ya'ni: `group.title`.

Agar biz "muntazam" funktsiyadan foydalansak, xato bo'ladi:

```js run
let group = {
  title: "Bizning guruhimiz",
  students: ["John", "Pete", "Alice"],

  showList() {
*!*
    this.students.forEach(function(student) {
      // Error: Cannot read property 'title' of undefined
      alert(this.title + ': ' + student);
    });
*/!*
  }
};

group.showList();
```

Xatolik yuzaga keldi, chunki `forEach` sukut bo'yicha `this=undefined` bilan ishlaydi, shuning uchun `undefined.title` ga kirish uchun harakat amalga oshiriladi.

Bu o'q funktsiyalariga ta'sir qilmaydi, chunki ularda `this` yo'q.

```warn header="O'q funktsiyalari `new`bilan ishlamaydi"`this`ga ega bo'lmaslik tabiiy ravishda yana bir cheklovni anglatadi: o'q funktsiyalarini konstruktor sifatida ishlatish mumkin emas. Ularni`new` bilan chaqirish mumkin emas.

````

```smart header="O'q funktsiyalar VS bind"
`=>` O'q funktsiyasi va `.bind(this)` bilan chaqirilgan muntazam funktsiya o'rtasida nozik farq bor:

- `.bind(this)` funktsiyaning "bog'langan versiyasi" ni yaratadi.
- `=>` o'qi hech qanday bog'lanish yaratmaydi. Funktsiyada oddiygina `this` mavjud emas. `this` ni qidirish doimiy o'zgaruvchan qidirish bilan bir xil tarzda amalga oshiriladi: tashqi leksik muhitda.
````

## O'qlarda "argumentlar" yo'q

O'q funktsiyalarida `argumentlar` o'zgaruvchani yo'q.

Bu hozirgi `this` va `argumentlar` bilan chaqirishimiz kerak bo'lganda, bu dekorativlar uchun juda yaxshi.

Masalan, `defer(f, ms)` funktsiyani oladi va atrofida chaqiruvni `ms` millisoniyalarda kechiktiradigan o'ramni(wrapper) qaytaradi:

```js run
function defer(f, ms) {
  return function () {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(who) {
  alert("Salom, " + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John"); // Salom, John 2 soniyadan so'ng
```

Xuddi shu o'q funktsiyasiz quyidagicha ko'rinadi:

```js
function defer(f, ms) {
  return function (...args) {
    let ctx = this;
    setTimeout(function () {
      return f.apply(ctx, args);
    }, ms);
  };
}
```

`setTimeout` ichidagi funktsiya ularni qabul qilishi uchun biz `args` va `ctx` qo'shimcha parametrlarini yaratishga majbur bo'ldik.

## Xulosa

O'q funktsiyalari:

- `this` ga ega emas.
- `argumentlar` ga ega emas.
- `new` bilan chaqirib bo'lmaydi.
- (Ularda `super` yo'q, lekin biz buni hali o'rganmadik. <info:class-inheritance> bo'limida bo'ladi).

Buning sababi shundaki, ular o'zlarining "kontekstlari" bo'lmagan, aksincha hozirgi holatida ishlaydigan qisqa kodlar uchun mo'ljallangan. Va ular, albatta, ushbu foydalanish holatida porlaydilar.
