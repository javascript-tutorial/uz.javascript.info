```js demo
function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    isThrottled = true;

    func.apply(this, arguments); // (1)

    setTimeout(function() {
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

<<<<<<< HEAD
1. Birinchi chaqiruv paytida, `wrapper` shunchaki `func` funktsiyasini bajaradi va sovutish holatini o'rnatadi (`isThrottled = true`).
2. Ushbu holatda barcha `savedArgs/savedThis` da yodlangan chaqiruvlar. Iltimos, kontekst va argumentlar bir xil ahamiyatga ega va ularni yodlash kerak. Chaqiruvni takrorlash uchun ularga bir vaqtning o'zida kerak.
3. ...Keyin `ms` millisoniyalar o'tgandan so'ng, `setTimeout` triggerlar. Sovutish holati olib tashlandi (`isThrottled = false`). Agar biz chaqiruvni e'tiborsiz qoldirgan bo'lsak, u holda `wrapper` oxirgi yodlangan argumentlar va kontekst bilan bajariladi.
=======
1. During the first call, the `wrapper` just runs `func` and sets the cooldown state (`isThrottled = true`).
2. In this state all calls are memorized in `savedArgs/savedThis`. Please note that both the context and the arguments are equally important and should be memorized. We need them simultaneously to reproduce the call.
3. After `ms` milliseconds pass, `setTimeout` triggers. The cooldown state is removed (`isThrottled = false`) and, if we had ignored calls, `wrapper` is executed with the last memorized arguments and context.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

3-qadam `func` emas, balki `wrapper` ni ishga tushiradi, chunki biz nafaqat `func` ni bajarishimiz kerak, balki yana bir marta kutish holatiga kiramiz va uni tiklash uchun vaqt tugashini o'rnatamiz.
