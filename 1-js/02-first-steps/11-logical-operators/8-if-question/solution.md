Javob: birinchi va uchinchisi ijro etiladi.

Tafsilotlar:

```js run
// Ishlaydi.
// -1 || 0 = -1 ning natijasi, to'g'ri
if (-1 || 0) alert("birinchi");

// Ishlamaydi.
// -1 && 0 = 0 ning natijasi, noto'g'ri
if (-1 && 0) alert("ikinchi");

// Ijro etiladi
// Operator && ning ustunligi || ga qaraganda yuqori
// Shunday qilib, birinchi navbatda -1 && 1 bajariladi:
// null || -1 && 1  ->  null || 1  ->  1
if (null || (-1 && 1)) alert("uchinchi");
```
