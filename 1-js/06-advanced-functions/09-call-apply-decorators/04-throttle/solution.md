```js demo
function throttle(func, ms) {
  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {
    if (isThrottled) {
      // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    isThrottled = true;

    func.apply(this, arguments); // (1)

    setTimeout(function () {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
```

`throttle(func, ms)` ga chaqiruv `wrapper` qaytaradi.

1. Birinchi chaqiruv paytida, `wrapper` shunchaki `func` funktsiyasini bajaradi va sovutish holatini o'rnatadi (`isThrottled = true`).
2. Ushbu holatda barcha `savedArgs/savedThis` da yodlangan chaqiruvlar. Iltimos, kontekst va argumentlar bir xil ahamiyatga ega va ularni yodlash kerak. Chaqiruvni takrorlash uchun ularga bir vaqtning o'zida kerak.
3. ...Keyin `ms` millisoniyalar o'tgandan so'ng, `setTimeout` triggerlar. Sovutish holati olib tashlandi (`isThrottled = false`). Agar biz chaqiruvni e'tiborsiz qoldirgan bo'lsak, u holda `wrapper` oxirgi yodlangan argumentlar va kontekst bilan bajariladi.

3-qadam `func` emas, balki `wrapper` ni ishga tushiradi, chunki biz nafaqat `func` ni bajarishimiz kerak, balki yana bir marta kutish holatiga kiramiz va uni tiklash uchun vaqt tugashini o'rnatamiz.
