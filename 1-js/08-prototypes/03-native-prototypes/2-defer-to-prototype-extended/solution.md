```js run
Function.prototype.defer = function (ms) {
  let f = this;
  return function (...args) {
    setTimeout(() => f.apply(this, args), ms);
  };
};

// uni tekshirish
function f(a, b) {
  alert(a + b);
}

f.defer(1000)(1, 2); // 1 soniyadan keyin 3 ni ko'rsatadi
```

E'tibor bering: bizning dekoratsiya objekt metodlari uchun ishlashi uchun `f.apply` da `this` dan foydalanamiz.

Shunday qilib, agar wrapper funktsiya objekt metodi sifatida chaqirilsa, u holda `this` asl `f` metodiga uzatiladi.

```js run
Function.prototype.defer = function (ms) {
  let f = this;
  return function (...args) {
    setTimeout(() => f.apply(this, args), ms);
  };
};

let user = {
  name: "John",
  sayHi() {
    alert(this.name);
  },
};

user.sayHi = user.sayHi.defer(1000);

user.sayHi(); // 1 soniyadan keyin "John" ni ko'rsatadi
```
