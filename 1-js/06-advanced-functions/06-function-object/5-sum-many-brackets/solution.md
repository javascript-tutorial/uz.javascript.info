
1. Hammasi *qanday bo'lishidan qat'iy nazar* ishlashi uchun `sum` natijasi funktsiya bo'lishi kerak.
2. Ushbu funktsiya chaqiruvlar orasidagi joriy qiymatni xotirada saqlashi kerak.
3. Vazifaga ko'ra, funktsiya `==` ishlatilganda raqamga aylanishi kerak. Funktsiyalar obyektlardir, shuning uchun konvertatsiya <info:object-toprimitive> bobida tasvirlanganidek sodir bo'ladi va biz raqamni qaytaradigan o'z usulimizni taqdim etamiz..

Endi kod:

```js run
function sum(a) {

  let currentSum = a;

  function f(b) {
    currentSum += b;
    return f;
  }

  f.toString = function() {
    return currentSum;
  };

  return f;
}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1)(2) ); // 6
alert( sum(6)(-1)(-2)(-3) ); // 0
alert( sum(0)(1)(2)(3)(4)(5) ); // 15
```

Iltimos e'tibor bering, `sum` funktsiyasi aslida bir marta ishlaydi. Bu `f` funktsiyasini qaytaradi.

Keyin har bir keyingi chaqiruvda `f` o'z parametrini `currentSum` yig'indisiga qo'shadi va o'zini qaytaradi.

**`f` ning oxirgi satrida rekursiya mavjud emas.**

Rekursiya nimaga o'xshashi:

```js
function f(b) {
  currentSum += b;
  return f(); // <-- rekursiv chaqiruv
}
```

Va bizning holatimizda, biz faqatgina funktsiyani chaqirmasdan qaytaramiz:

```js
function f(b) {
  currentSum += b;
  return f; // <-- o'zini o'zi chaqirmaydi, o'zini qaytaradi
}
```

Ushbu `f` keyingi chaqiruvda ishlatiladi, yana o'zimi qaytaradi, kerak bo'lganda. Keyin raqam yoki matn sifatida ishlatilganda `toString` `currentSum` qiymatini qaytaradi. Konvertatsiya qilish uchun biz bu yerda `Symbol.toPrimitive` yoki `valueOf` dan ham foydalanishimiz mumkin.
