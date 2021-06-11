Javob: **yo'q, bo'lmaydi**:

```js run
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```

Ushbu bobda aytilganidek, funktsiya kodi atrofida "yashirin `try..catch`" mavjud. Shunday qilib, barcha sinxron xatolar ko'rib chiqiladi.

Ammo bu yerda xato ijrochi ishlayotgan paytda emas, balki keyinchalik paydo bo'ladi. Shunday qilib, va'da uni bajara olmaydi.
