Yechim:

```js run demo
function delay(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

}

let f1000 = delay(alert, 1000);

f1000("test"); // 1000ms dan keyin "test" ni ko'rsatadi
```

Iltimos, bu yerda o'q funktsiyasidan qanday foydalanilganiga e'tibor bering. Ma'lumki, o'q funktsiyalari o'zlarining `this` va `argumentlari` ga ega emas, shuning uchun `f.apply(this, arguments)` `this` va `argumentlarni` o'ramdan oladi.

Agar biz odatdagi funktsiyani o'tkazsak, `setTimeout` uni argumentlarsiz chaqiradi va `this=window` (biz brauzerda ekanligimizni taxmin qilamiz).

Biz hali ham `this` dan oraliq o'zgaruvchanni ishlatib o'tishimiz mumkin, ammo bu biroz noqulayroq:

```js
function delay(f, ms) {

  return function(...args) {
    let savedThis = this; // buni oraliq o'zgaruvchanga saqlang
    setTimeout(function() {
      f.apply(savedThis, args); // bu yerda ishlating
    }, ms);
  };

}
```
