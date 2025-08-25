```js run demo
function readNumber() {
  let num;

  do {
    num = prompt("Iltimos raqam kiriting?", 0);
  } while (!isFinite(num));

  if (num === null || num === "") return null;

  return +num;
}

alert(`Read: ${readNumber()}`);
```

Yechim biroz murakkabroq, chunki biz `null`/bo'sh satrlarni boshqarishimiz kerak.

Shunday qilib, biz "raqam" bo'lguncha kirishni qabul qilamiz. Ikkala `null` (bekor qilish) va bo'sh satr ham ushbu shartga mos keladi, chunki raqamli shaklda ular `0` dir.

To'xtaganimizdan so'ng, biz `null` va bo'sh satrga maxsus ishlov berishimiz kerak (`null` ni qaytarish), chunki ularni raqamga aylantirish `0` ga teng.
