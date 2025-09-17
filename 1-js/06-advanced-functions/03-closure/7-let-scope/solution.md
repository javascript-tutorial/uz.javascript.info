Natija: **xato**.

Buni ishga tushirib ko'ring:

```js run
let x = 1;

function func() {
*!*
  console.log(x); // ReferenceError: Cannot access 'x' before initialization
*/!*
  let x = 2;
}

func();
```

Ushbu misolda biz "mavjud bo'lmagan" va "ishga tushirilmagan" o'zgaruvchi o'rtasidagi g'alati farqni kuzatishimiz mumkin.

[](info:closure) maqolasida o'qiganimizdek, o'zgaruvchi ijro kod blokiga (yoki funktsiyaga) kirgandan boshlab "ishga tushirilmagan" holatda boshlanadi. Va u tegishli `let` ifodagacha ishga tushirilmagan qoladi.

Boshqacha qilib aytganda, o'zgaruvchi texnik jihatdan mavjud, lekin `let` dan oldin ishlatilmaydi.

Yuqoridagi kod buni ko'rsatadi.

```js
function func() {
*!*
  // mahalliy x o'zgaruvchisi funktsiya boshidanoq mexanizmga ma'lum,
  // lekin let gacha "ishga tushirilmagan" (foydalanib bo'lmaydigan) ("o'lik zona")
  // shuning uchun xato
*/!*

  console.log(x); // ReferenceError: Cannot access 'x' before initialization

  let x = 2;
}
```

O'zgaruvchining vaqtinchalik foydalanib bo'lmaydigan bu zonasi (kod bloki boshidan `let` gacha) ba'zan "o'lik zona" (dead zone) deb ataladi.
