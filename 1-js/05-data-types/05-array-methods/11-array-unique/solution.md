Keling, massiv elementlari bo'ylab yuraylik:
- Har bir element uchun, natijada olingan massivda ushbu element mavjudligini tekshiramiz.
- Agar shunday bo'lsa, unda e'tibor bermang, aks holda natijalarga qo'shing.

```js run demo
function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}

let strings = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(strings) ); // Hare, Krishna, :-O
```

Kod ishlaydi, lekin unda potentsial ishlash muammosi mavjud.

`result.include(str)` massivning ichida yuradi va `result` moslikni topish uchun har bir elementni `str` bilan taqqoslaydi.

Shunday qilib, agar `natija` da `100` element bo'lsa va hech kim `str` ​​ga to'g'ri kelmasa, u butun `natija` da yuradi va to'liq `100` taqqoslashni amalga oshiradi. Agar `natija` 10000 kabi katta bo'lsa, u holda 10000 taqqoslash bo'ladi.

Bu o'z-o'zidan muammo emas, chunki JavaScript-ni interpretatorlari juda tez, shuning uchun `10000` lik massivdan yurish mikrosaniyadagi masala.

Ammo biz `arr` ning har bir elementi uchun `for` tsiklida shunday test o'tkazamiz.

Shunday qilib, agar `arr.length` 10000 bo'lsa, bizda `10000 * 10000` = 100 million taqqoslash kabi narsa bo'ladi. Bu juda ko'p.

Shunday qilib, yechim faqat kichik massivlar uchun foydalidir.

Keyinchalik <info:map-set-weakmap-weakset> bobida biz uni qanday qilib optimallashtirishni ko'rib chiqamiz.
