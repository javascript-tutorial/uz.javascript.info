Javob: `null`.

```js run
function f() {
  alert(this); // null
}

let user = {
  g: f.bind(null),
};

user.g();
```

Bog'langan funktsiya konteksti qat'iy belgilangan. Buni yanada o'zgartirishning iloji yo'q.

Shunday qilib, biz `user.g()` ni ishga tushirganimizda ham asl funktsiya `this=null` bilan chaqiriladi.
